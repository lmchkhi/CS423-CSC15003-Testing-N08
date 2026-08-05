import * as path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

function required(name: string): string {
  const value = process.env[name];
  if (value === undefined || value.trim() === '') {
    throw new Error(
      `Missing required env var ${name}. Copy automation/.env.example to automation/.env and fill it in.`,
    );
  }
  return value.trim();
}

function optional(name: string, fallback: string): string {
  const value = process.env[name];
  return value === undefined || value.trim() === '' ? fallback : value.trim();
}

/**
 * One matrix cell = one feature on one browser. The runner
 * (scripts/run-matrix.ts) sets FEATURE_SLUG / FEATURE_NAME / REPORT_DIR;
 * a plain `npx playwright test` falls back to the "ad-hoc" values so a
 * developer run never silently overwrites a matrix report.
 */
export const featureSlug = optional('FEATURE_SLUG', 'ad-hoc');
export const featureName = optional('FEATURE_NAME', 'Ad-hoc run');
export const reportDir = optional(
  'REPORT_DIR',
  path.join('..', 'reports', 'html', '_ad-hoc'),
);
export const browserLabel = optional('BROWSER', 'all-projects');

/**
 * Kept outside `reportDir`: the HTML reporter wipes its own output folder when
 * it writes, which would delete a JSON report placed inside it.
 */
export const jsonReportPath = optional(
  'REPORT_JSON',
  path.join('..', 'reports', 'json', 'ad-hoc.json'),
);

/**
 * ISO 8601 carrying the machine's UTC offset (`2026-08-06T00:42:13+07:00`)
 * instead of `toISOString()`'s UTC `Z`. Same instant either way, but the SUT,
 * the commits and the demo video all happen on Vietnam time (UTC+7): a run
 * before 07:00 ICT stamped in UTC reads as the *previous* day and would not
 * match its own commit date. §11 asks for an ISO timestamp; this is one, and
 * it tells the same story as the git log.
 */
export function localIsoTimestamp(date = new Date()): string {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const pad = (value: number): string =>
    String(Math.floor(Math.abs(value))).padStart(2, '0');
  const shifted = new Date(date.getTime() + offsetMinutes * 60_000);
  return (
    shifted.toISOString().replace(/\.\d{3}Z$/, '') +
    `${sign}${pad(offsetMinutes / 60)}:${pad(offsetMinutes % 60)}`
  );
}

/** Stamped once per process so every artifact of one cell shares a timestamp. */
export const runTimestamp = optional('RUN_TIMESTAMP', localIsoTimestamp());

export const config = {
  studentId: required('STUDENT_ID'),
  studentName: required('STUDENT_NAME'),
  webUrl: required('WEB_URL'),
  adminUrl: required('ADMIN_URL'),
  apiUrl: required('API_URL'),
  headless: optional('HEADLESS', 'true') !== 'false',
  accounts: {
    admin: {
      email: required('ADMIN_EMAIL'),
      password: required('ADMIN_PASSWORD'),
    },
    user: {
      email: required('USER_EMAIL'),
      password: required('USER_PASSWORD'),
    },
  },
} as const;

/**
 * HW04 §11 / §6: this exact string must be visible in every HTML report —
 * the literal `Run by: <StudentID>` plus an ISO timestamp.
 */
export const runLabel =
  `Run by: ${config.studentId} | ${config.studentName} | ` +
  `${featureName} | ${browserLabel} | ${runTimestamp}`;

/** Shown in the HTML report's metadata panel as a second, structured copy. */
export const runMetadata = {
  'Run by': config.studentId,
  Student: config.studentName,
  Feature: featureName,
  Browser: browserLabel,
  Timestamp: runTimestamp,
} as const;
