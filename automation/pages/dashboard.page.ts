import type { Locator, Page } from '@playwright/test';
import { config } from '../utils/config';

/**
 * FR-13 dashboard metrics on :5174. Locators and actions only — assertions
 * live in the spec so a failure names the case that failed.
 *
 * Recon: the admin app is a single route gated entirely client-side by
 * whether a token is present — there is no `/dashboard` vs `/login` URL to
 * assert on, only which heading is on screen (`Dashboard` once authenticated,
 * `Admin Login` otherwise). Each metric is a `<h3>` heading (its accessible
 * name is the metric label) immediately followed by a `<p>` holding the
 * formatted value inside the same card; the value `<p>` carries no role or
 * test id of its own, so the parent hop below is a DOM-structure
 * relationship anchored on the heading, not a positional guess.
 */
export class DashboardPage {
  readonly dashboardHeading: Locator;
  readonly loginHeading: Locator;

  constructor(private readonly page: Page) {
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 2 });
    this.loginHeading = page.getByRole('heading', { name: 'Admin Login', level: 2 });
  }

  async goto(): Promise<void> {
    await this.page.goto(config.adminUrl);
    await this.dashboardHeading.waitFor({ state: 'visible' });
  }

  private metricValue(label: string): Locator {
    return this.page
      .getByRole('heading', { name: label, level: 3 })
      .locator('xpath=..')
      .locator('p');
  }

  /** Revenue is rendered as formatted currency ("<số> ₫"); the oracle is a
   *  plain number, so every non-digit is stripped before comparison. */
  async revenueValue(): Promise<number> {
    const text = await this.metricValue('Tổng doanh thu (Delivered)').innerText();
    return Number(text.replace(/[^0-9]/g, ''));
  }

  async orderCountValue(): Promise<number> {
    const text = await this.metricValue('Tổng số đơn hàng').innerText();
    return Number(text.replace(/[^0-9]/g, ''));
  }
}
