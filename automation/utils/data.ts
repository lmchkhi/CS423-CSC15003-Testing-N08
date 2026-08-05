import * as fs from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';

const DATA_DIR = path.resolve(__dirname, '..', 'test-data');

/**
 * HW04 §6 forbids inline case arrays: every case must come from an external
 * .json/.csv file. This loader is the only sanctioned way into that data, and
 * it fails loudly at collection time rather than letting a malformed record
 * surface as a confusing mid-test error.
 */
export interface LoadOptions {
  /** §6 requires >= 12 automated cases per feature. */
  minCases?: number;
}

export function loadCases<S extends z.ZodTypeAny>(
  fileName: string,
  schema: S,
  options: LoadOptions = {},
): z.infer<S>[] {
  const { minCases = 12 } = options;
  const filePath = path.join(DATA_DIR, fileName);

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (cause) {
    throw new Error(`Cannot read test-data file ${filePath}: ${String(cause)}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (cause) {
    throw new Error(`${fileName} is not valid JSON: ${String(cause)}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`${fileName} must be a JSON array of case records.`);
  }

  const cases = parsed.map((record, index) => {
    const result = schema.safeParse(record);
    if (!result.success) {
      throw new Error(
        `${fileName}[${index}] failed validation:\n${result.error.toString()}`,
      );
    }
    return result.data as z.infer<S>;
  });

  const ids = cases.map((c) => (c as { caseId?: unknown }).caseId).map(String);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) {
    throw new Error(
      `${fileName} has duplicate caseId values: ${[...new Set(duplicates)].join(', ')}`,
    );
  }

  if (cases.length < minCases) {
    throw new Error(
      `${fileName} has ${cases.length} cases but HW04 §6 requires at least ${minCases} per feature.`,
    );
  }

  return cases;
}

/** Fields every feature's records share. Extend it per feature, don't fork it. */
export const baseCaseSchema = z.object({
  caseId: z.string().regex(/^F\d{2}-TC-\d{3}$/, 'caseId must look like F02-TC-001'),
  title: z.string().min(1),
  category: z.enum(['positive', 'negative', 'boundary', 'state', 'security']),
  /** HW02 case this carries over from, or null when newly designed in HW04. */
  hw02CaseId: z.string().nullable(),
  /** Clause in sut-requirements.md the assertion encodes. */
  requirement: z.string().min(1),
});

export type BaseCase = z.infer<typeof baseCaseSchema>;

/**
 * FR-02 — login and account lockout.
 *
 * `account` decides how the test obtains its identity. Recon showed EShop
 * rejects the third attempt outright (the lock lands after only two failures)
 * and HW02 measured the lock lasting ~180s, so any case that submits a wrong
 * password registers its own throwaway user: sharing `test@eshop.com` would
 * lock the seeded account for the rest of the matrix.
 *
 * `assertion` is the small vocabulary the spec dispatches on — the alternative
 * (branching on `caseId`) hardcodes case knowledge into the script, which §6
 * forbids just as much as an inline case array.
 */
export const loginCaseSchema = baseCaseSchema.extend({
  account: z.enum(['seeded-user', 'throwaway', 'unregistered']),
  emailSource: z.enum(['account', 'literal', 'blank']),
  emailLiteral: z.string().nullable(),
  /** `@correct` resolves to the account's real password at runtime. */
  password: z.string(),
  /** Consecutive wrong-password submissions before the asserted attempt. */
  priorFailures: z.number().int().min(0).max(4),
  /** Wall-clock pause before the asserted attempt, for the 30s lock boundary. */
  waitSeconds: z.number().int().min(0).max(60),
  assertion: z.enum([
    'login-succeeds',
    'login-rejected',
    'blocked-by-browser-validation',
    'email-input-is-type-email',
    'response-excludes-password',
    'error-message-is-generic',
  ]),
  expected: z.object({
    urlContains: z.string().nullable(),
    tokenStored: z.boolean(),
  }),
});

export type LoginCase = z.infer<typeof loginCaseSchema>;
