import type { Locator, Page } from '@playwright/test';
import { config } from '../utils/config';

/**
 * Admin order management on :5174. Locators and actions only — assertions live
 * in the spec so a failure names the case that failed.
 *
 * Navigation note: the admin app does not route its sections by URL. Opening
 * `:5174/orders` directly still renders the dashboard; the order table is only
 * reachable by activating the `Đơn hàng` item in the sidebar, so `goto()`
 * reproduces what an administrator actually does.
 */
export class AdminOrdersPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(config.adminUrl);
    await this.page.getByText('Đơn hàng', { exact: true }).click();
    await this.page
      .getByRole('heading', { name: 'Quản lý Đơn hàng' })
      .waitFor({ state: 'visible' });
  }

  /**
   * Scoped by the order's own id cell, anchored so `#3` cannot also match the
   * row for `#30`. Never by row position: a positional locator would quietly
   * follow a re-sort instead of failing.
   */
  rowFor(orderId: number): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name: `#${orderId}`, exact: true }),
    });
  }

  /**
   * The status badge. It is the row's only `span`, and carries no ARIA role or
   * test id of its own, so the element type is the sole available handle —
   * matching on the status text instead would make the locator depend on the
   * very value being asserted.
   */
  statusBadge(orderId: number): Locator {
    return this.rowFor(orderId).locator('td span');
  }

  /** Every status badge in the table, for the in-domain vocabulary check. */
  get allStatusBadges(): Locator {
    return this.page.locator('tbody tr td span');
  }

  /**
   * The transition controls the row offers. Recon showed the admin app renders
   * one button per permitted transition rather than a status dropdown, so this
   * set is the system's own claim about which transitions are legal here.
   */
  controlsFor(orderId: number): Locator {
    return this.rowFor(orderId).getByRole('button');
  }

  control(orderId: number, label: string): Locator {
    return this.rowFor(orderId).getByRole('button', { name: label, exact: true });
  }

  async activate(orderId: number, label: string): Promise<void> {
    await this.control(orderId, label).click();
  }
}
