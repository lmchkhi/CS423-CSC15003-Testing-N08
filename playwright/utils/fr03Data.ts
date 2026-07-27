import fs from 'node:fs';
import path from 'node:path';

export const fr03Kinds = [
  'stepOneIndicator',
  'backToLogin',
  'emailInputType',
  'emptyEmailRejected',
  'invalidEmailRejected',
  'unregisteredEmailRejected',
  'otpSixDigits',
  'stepTwoIndicator',
  'resetFormFields',
  'weakPasswordRejected',
  'mismatchedConfirmRejected',
  'wrongOtpRejected',
  'otpEmailScope',
  'successfulReset'
] as const;

export type Fr03Kind = (typeof fr03Kinds)[number];

export type Fr03Case = {
  id: string;
  kind: Fr03Kind;
  category: string;
  title: string;
  sourceRequirement: 'FR-03';
  loginPath?: string;
  forgotPasswordPath?: string;
  accountName?: string;
  emailPrefix?: string;
  emailDomain?: string;
  requestEmail?: string;
  initialPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  otpOverride?: string;
  expectedStepOnePattern?: string;
  expectedStepTwoPattern?: string;
  expectedBackToLoginPattern?: string;
  expectedEmailType?: string;
  expectedOtpPattern?: string;
  otpExtractionPattern?: string;
  expectedPasswordInputCount?: number;
  expectedSuccessPattern?: string;
};

const validKinds = new Set<string>(fr03Kinds);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(row: Record<string, unknown>, field: keyof Fr03Case, index: number): void {
  if (typeof row[field] !== 'string' || row[field].trim() === '') {
    throw new Error(`FR03 data row ${index} is missing required string field '${field}'.`);
  }
}

function validateFr03Case(value: unknown, index: number): Fr03Case {
  if (!isRecord(value)) {
    throw new Error(`FR03 data row ${index} must be an object.`);
  }

  requireString(value, 'id', index);
  requireString(value, 'kind', index);
  requireString(value, 'category', index);
  requireString(value, 'title', index);
  requireString(value, 'sourceRequirement', index);

  if (value.sourceRequirement !== 'FR-03') {
    throw new Error(`FR03 data row ${index} must map to sourceRequirement 'FR-03'.`);
  }

  if (!validKinds.has(String(value.kind))) {
    throw new Error(`FR03 data row ${index} uses unknown kind '${String(value.kind)}'.`);
  }

  if (
    value.expectedPasswordInputCount !== undefined &&
    (typeof value.expectedPasswordInputCount !== 'number' || value.expectedPasswordInputCount < 1)
  ) {
    throw new Error(`FR03 data row ${index} has invalid expectedPasswordInputCount.`);
  }

  return value as Fr03Case;
}

export function loadFr03Cases(): Fr03Case[] {
  const dataPath = path.resolve('test-data/fr03-forgot-reset-password.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error('FR03 test data must be a JSON array.');
  }

  if (parsed.length < 12) {
    throw new Error('FR03 must contain at least 12 distinct logical test cases.');
  }

  const cases = parsed.map(validateFr03Case);
  const ids = new Set<string>();
  for (const testCase of cases) {
    if (ids.has(testCase.id)) {
      throw new Error(`Duplicate FR03 test case id '${testCase.id}'.`);
    }
    ids.add(testCase.id);
  }

  return cases;
}
