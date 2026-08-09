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

/** The five order states sut-requirements.md §3 specifies, and nothing else. */
export const orderStatusSchema = z.enum([
  'pending',
  'confirmed',
  'shipping',
  'delivered',
  'canceled',
]);

/**
 * FR-10 — order state machine.
 *
 * `setupPath` walks a freshly created order to the state the case starts from,
 * using the admin API. That is setup only: the transition under test is always
 * driven through the UI.
 *
 * Recon showed the admin app exposes each legal transition as its own button
 * rather than a status dropdown, so the set of buttons a row offers *is* the
 * set of transitions the system permits from that state. `expectedControls`
 * therefore encodes the oracle's outgoing edges for the starting state, and
 * `controls-exactly` proves both directions at once: every legal transition is
 * offered, and no illegal one is.
 */
export const orderStateCaseSchema = baseCaseSchema.extend({
  setupPath: z.array(orderStatusSchema),
  actor: z.enum(['admin', 'user', 'guest']),
  /** Visible label of the control the case clicks, or asserts is not offered. */
  control: z.string().nullable(),
  /** Exact set of controls the row must offer. Used by `controls-exactly`. */
  expectedControls: z.array(z.string()).nullable(),
  /** Status the privilege probe attempts to force. Used by the FR-12 case. */
  targetStatus: orderStatusSchema.nullable(),
  assertion: z.enum([
    'transition-succeeds',
    'controls-exactly',
    'control-not-offered',
    'status-labels-in-domain',
    'privileged-transition-refused',
    'history-requires-login',
    'orders-are-owner-scoped',
  ]),
  expected: z.object({
    /** Vietnamese label the order must show once the case's action is done. */
    statusLabel: z.string().nullable(),
    /**
     * The complete set of labels §3's five states may render as. Only
     * `status-labels-in-domain` reads it; it lives here rather than as a
     * constant in the spec because it *is* that case's expected value.
     */
    statusDomain: z.array(z.string()).nullable(),
  }),
});

export type OrderStateCase = z.infer<typeof orderStateCaseSchema>;

/**
 * FR-13 — Dashboard.
 *
 * The suite never resets the SQLite file between cells, so no case may
 * hardcode an expected number: `seedOrders` names the statuses this case
 * creates before the assertion (each walked there from a fresh `pending`
 * order through the legal §3 path), and the spec computes the expected delta
 * from those records plus a live baseline read through the API
 * (`utils/api.ts`'s `expectedDashboardTotals`) — never from a number written
 * into this JSON.
 */
export const dashboardCaseSchema = baseCaseSchema.extend({
  auth: z.enum(['admin', 'non-admin', 'anonymous']),
  seedOrders: z.array(orderStatusSchema),
  /** Only read by `revenue-tracks-promotion`: the status a freshly seeded
   *  order is walked on to, after the baseline is captured. */
  promoteTo: orderStatusSchema.nullable(),
  assertion: z.enum([
    'revenue-tracks-delivered-seed',
    'revenue-tracks-promotion',
    'count-includes-all-statuses',
    'access-denied-anonymous',
    'access-denied-non-admin',
  ]),
  expected: z.object({
    /** Whether the Dashboard heading itself must appear at all (FR-12 guard cases only). */
    dashboardVisible: z.boolean(),
  }),
});

export type DashboardCase = z.infer<typeof dashboardCaseSchema>;
