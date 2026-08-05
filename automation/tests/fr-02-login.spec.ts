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
          // Pattern 1 — navigation.
          await expect(page).toHaveURL(`${config.webUrl}/`);
          // Pattern 2 — value equality on client state the oracle mandates.
          expect(
            await loginPage.storedToken(),
            'FR-02 requires a successful login to store a JWT client-side',
          ).toBeTruthy();
          break;
        }

        case 'login-rejected': {
          // Pattern 3 — visibility.
          await expect(loginPage.errorMessage).toBeVisible();
          await expect(page).toHaveURL(/\/login/);
          expect(
            await loginPage.storedToken(),
            'a rejected login must not store a token',
          ).toBeFalsy();
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
          await expect(page).toHaveURL(/\/login/);
          expect(await loginPage.storedToken()).toBeFalsy();
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
          await expect(page).toHaveURL(/\/login/);
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
    });
  }
});
