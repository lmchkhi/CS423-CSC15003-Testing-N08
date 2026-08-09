import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { config } from '../utils/config';
import { createUser, uniqueEmail } from '../utils/api';
import { loadCases, loginCaseSchema, type LoginCase } from '../utils/data';

/**
 * FR-02 — Đăng nhập & khóa tài khoản.
 * Oracle: sut-requirements.md §2. Every case is read from
 * test-data/fr-02-login.cases.json (HW04 §6 forbids inline case data), and the
 * spec dispatches on the record's `assertion` field rather than on its caseId.
 */
const cases = loadCases('fr-02-login.cases.json', loginCaseSchema);

interface Identity {
  email: string;
  correctPassword: string;
}

/**
 * A case that submits a wrong password gets its own freshly registered user.
 * EShop locks an account after two consecutive failures and holds the lock far
 * longer than the specified 30s, so reusing the seeded account here would lock
 * it for the rest of the matrix and turn later cases red for the wrong reason.
 */
async function resolveIdentity(testCase: LoginCase): Promise<Identity> {
  if (testCase.account === 'throwaway') {
    const user = await createUser('fr02');
    return { email: user.email, correctPassword: user.password };
  }
  if (testCase.account === 'unregistered') {
    return { email: uniqueEmail('never-registered'), correctPassword: 'Test1234!' };
  }
  return {
    email: config.accounts.user.email,
    correctPassword: config.accounts.user.password,
  };
}

function resolveEmail(testCase: LoginCase, identity: Identity): string {
  if (testCase.emailSource === 'blank') return '';
  if (testCase.emailSource === 'literal') return testCase.emailLiteral ?? '';
  return identity.email;
}

/** Escapes a URL so it can be embedded in an anchored RegExp. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test.describe('FR-02 — Đăng nhập & khóa tài khoản', () => {
  for (const testCase of cases) {
    test(`${testCase.caseId} — ${testCase.title}`, async ({ page }) => {
      const identity = await resolveIdentity(testCase);
      const email = resolveEmail(testCase, identity);
      const password =
        testCase.password === '@correct'
          ? identity.correctPassword
          : testCase.password;

      const loginPage = new LoginPage(page);
      await loginPage.goto();

      // Drive the consecutive-failure counter to this case's starting point.
      for (let attempt = 0; attempt < testCase.priorFailures; attempt += 1) {
        await loginPage.attemptLogin(identity.email, 'DefinitelyWrong!9');
        await expect(loginPage.errorMessage).toBeVisible();
      }

      if (testCase.waitSeconds > 0) {
        // A real wall-clock wait. FR-02's window is defined in seconds and
        // cannot be shortened without testing a different rule.
        await page.waitForTimeout(testCase.waitSeconds * 1000);
      }

      // The response-inspecting case must be listening before it submits.
      const loginResponse =
        testCase.assertion === 'response-excludes-password'
          ? page.waitForResponse((r) => r.url().includes('/api/login'))
          : null;

      await loginPage.fillCredentials(email, password);
      await loginPage.submit();

      switch (testCase.assertion) {
        case 'login-succeeds': {
          // No branch-specific oracle: this case is fully described by the
          // record's `expected` block, asserted for every case below.
          break;
        }

        case 'login-rejected': {
          // Pattern 3 — visibility.
          await expect(loginPage.errorMessage).toBeVisible();
          break;
        }

        case 'blocked-by-browser-validation': {
          // Both fields are `required`, so the browser must refuse to submit.
          const emailValid = await loginPage.emailInput.evaluate(
            (el) => (el as HTMLInputElement).validity.valid,
          );
          const passwordValid = await loginPage.passwordInput.evaluate(
            (el) => (el as HTMLInputElement).validity.valid,
          );
          expect(
            emailValid && passwordValid,
            'a required field left blank must fail browser validation',
          ).toBe(false);
          break;
        }

        case 'email-input-is-type-email': {
          // Pattern 4 — attribute. The oracle names type="email" explicitly, so
          // the browser itself must reject a malformed address.
          await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
          const valid = await loginPage.emailInput.evaluate(
            (el) => (el as HTMLInputElement).validity.valid,
          );
          expect(valid, 'a malformed email must fail HTML5 validation').toBe(false);
          break;
        }

        case 'response-excludes-password': {
          const response = await loginResponse;
          const body = await response!.text();
          expect(
            body,
            'the login response must return a JWT, not the stored account record',
          ).not.toContain('"password"');
          break;
        }

        case 'error-message-is-generic': {
          // Non-disclosure: a wrong password and an unknown address must be
          // indistinguishable to the user.
          const wrongPasswordMessage = await loginPage.errorMessage.innerText();

          await loginPage.goto();
          await loginPage.attemptLogin(uniqueEmail('unknown'), 'Whatever!9');
          const unknownEmailMessage = await loginPage.errorMessage.innerText();

          // Pattern 5 — equality between two observed strings.
          expect(
            wrongPasswordMessage.trim(),
            'the error must not reveal whether the account exists',
          ).toBe(unknownEmailMessage.trim());
          break;
        }
      }

      // Every record carries these two expectations, so they are asserted for
      // every case here rather than restated in each branch — which also means
      // the JSON, not the script, decides where a case must land. Anchoring on
      // the whole origin + path matters: a substring test for `/` would match
      // every URL the app could possibly be on.
      // Pattern 1 — navigation.
      await expect(
        page,
        `${testCase.caseId} must finish on ${testCase.expected.urlContains}`,
      ).toHaveURL(
        new RegExp(
          `^${escapeRegExp(config.webUrl + testCase.expected.urlContains)}(?:[?#].*)?$`,
        ),
      );

      // Pattern 2 — value equality on the client state the oracle mandates: a
      // JWT is stored if and only if the login actually succeeded. Polled so a
      // successful login gets the same auto-wait the URL assertion has.
      await expect
        .poll(async () => Boolean(await loginPage.storedToken()), {
          message: 'FR-02 stores a JWT only for a login that succeeded',
        })
        .toBe(testCase.expected.tokenStored);
    });
  }
});
