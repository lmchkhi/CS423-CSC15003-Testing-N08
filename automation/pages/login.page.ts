import type { Locator, Page } from '@playwright/test';
import { config } from '../utils/config';

/**
 * FR-02 login form on the shop frontend (:5173).
 *
 * Locators and actions only — assertions live in the spec so a failure names
 * the case that failed.
 *
 * Locator note: the form's two inputs carry no `name`, `id`, `placeholder` or
 * test id, and its `<label>` elements are not associated with them (no
 * `for`/`id` pair, no wrapping), so neither `getByRole('textbox', { name })`
 * nor `getByLabel()` can reach them. The fields are therefore anchored to the
 * visible label text of their containing block — the only stable, semantic
 * handle the DOM offers. Positional `nth()` was rejected: it would silently
 * follow a field reorder instead of failing.
 */
export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = this.fieldLabelled('Username');
    this.passwordInput = this.fieldLabelled('Mật khẩu');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
  }

  private fieldLabelled(labelText: string): Locator {
    return this.page
      .locator('form div')
      .filter({
        has: this.page.locator('label', {
          hasText: new RegExp(`^${labelText}$`),
        }),
      })
      .locator('input');
  }

  /**
   * The failure banner, rendered as a sibling after the form rather than inside
   * it. It carries no ARIA role in this build, so `getByRole('alert')` cannot
   * reach it and the styling class is the only handle; matching on the message
   * text instead would couple every negative case to Vietnamese copy that the
   * oracle deliberately leaves unspecified.
   */
  get errorMessage(): Locator {
    return this.page.locator('div[class*="bg-red"]').first();
  }

  async goto(): Promise<void> {
    await this.page.goto(`${config.webUrl}/login`);
    await this.submitButton.waitFor({ state: 'visible' });
  }

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** One complete attempt, used to drive the consecutive-failure counter. */
  async attemptLogin(email: string, password: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.submit();
  }

  /** The JWT the oracle requires a successful login to store client-side. */
  async storedToken(): Promise<string | null> {
    return this.page.evaluate(() => window.localStorage.getItem('token'));
  }
}
