import type { Locator, Page } from '@playwright/test';
import { config } from '../utils/config';

/**
 * The shopper's own order history on :5173 — FR-11's view, and FR-10's
 * user-side oracle.
 *
 * Location note: the shop has no `/orders` route (it reports no matching
 * route). The history lives in the `Lịch sử đơn hàng` panel of `/profile`.
 */
export class MyOrdersPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(`${config.webUrl}/profile`);
  }

  rowFor(orderId: number): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name: `#${orderId}`, exact: true }),
    });
  }

  /** The status badge — the row's only `span`, as on the admin table. */
  statusBadge(orderId: number): Locator {
    return this.rowFor(orderId).locator('td span');
  }

  controlsFor(orderId: number): Locator {
    return this.rowFor(orderId).getByRole('button');
  }

  control(orderId: number, label: string): Locator {
    return this.rowFor(orderId).getByRole('button', { name: label, exact: true });
  }

  async activate(orderId: number, label: string): Promise<void> {
    await this.control(orderId, label).click();
  }

  /** What the page shows instead of the history when nobody is signed in. */
  get loginPrompt(): Locator {
    return this.page.getByText('Vui lòng đăng nhập');
  }
}
