import { DashboardPage } from '../pages/dashboard.page';
import { expect, seedAdminToken, test } from '../fixtures/auth.fixture';
import { config } from '../utils/config';
import {
  createPendingOrder,
  createUser,
  expectedDashboardTotals,
  setOrderStatus,
} from '../utils/api';
import { dashboardCaseSchema, loadCases } from '../utils/data';

/**
 * FR-13 — Dashboard. Oracle: sut-requirements.md §4.
 *
 * The suite never resets the SQLite file between cells, so no case compares
 * against a hardcoded number: every case reads a live baseline through the
 * API immediately before seeding its own orders, then expects the Dashboard
 * to show baseline + exactly what this case just added.
 */
const cases = loadCases('fr-13-dashboard.cases.json', dashboardCaseSchema);

/**
 * Sequential admin transitions needed to walk a fresh `pending` order to
 * each status, per sut-requirements.md §3 — the Dashboard has no order
 * detail UI of its own, so seeding goes through the admin API, and the state
 * machine only allows one-step transitions (a direct pending -> shipping
 * write is illegal even via the API).
 */
const STATUS_PATH: Record<string, string[]> = {
  pending: [],
  confirmed: ['confirmed'],
  shipping: ['confirmed', 'shipping'],
  delivered: ['confirmed', 'shipping', 'delivered'],
  canceled: ['canceled'],
};

async function seedOrder(
  adminToken: string,
  status: string,
): Promise<{ orderId: number; totalAmount: number }> {
  const { orderId, totalAmount } = await createPendingOrder('fr13');
  for (const step of STATUS_PATH[status] ?? []) {
    await setOrderStatus(adminToken, orderId, step);
  }
  return { orderId, totalAmount };
}

test.describe('FR-13 — Dashboard', () => {
  for (const testCase of cases) {
    test(`${testCase.caseId} — ${testCase.title}`, async ({ page, admin }) => {
      // FR-12 guard cases: no order data is seeded, the Dashboard must simply
      // not render for this session. Recon found the admin app gates itself
      // entirely client-side (no `/login` route to assert on), so the only
      // observable oracle is which heading is on screen.
      if (
        testCase.assertion === 'access-denied-anonymous' ||
        testCase.assertion === 'access-denied-non-admin'
      ) {
        if (testCase.assertion === 'access-denied-non-admin') {
          // Inject a non-admin user's token under the admin app's own
          // storage key/origin (not the shop's) — the guard being tested is
          // "does the admin app itself reject a non-admin token", so the
          // token must actually reach the surface being tested.
          const user = await createUser('fr13');
          await seedAdminToken(page, user.token);
        } else {
          await page.goto(config.adminUrl);
        }
        const dashboard = new DashboardPage(page);
        // Pattern: presence/absence keyed off `expected.dashboardVisible`.
        await expect(
          dashboard.dashboardHeading,
          'FR-12: only an admin-role session may see the Dashboard heading',
        ).toHaveCount(testCase.expected.dashboardVisible ? 1 : 0);
        return;
      }

      // Every other case: capture the live baseline first, seed this case's
      // own orders, then compare the rendered metrics to
      // baseline + what this case just added.
      const baseline = await expectedDashboardTotals(admin.token);

      let deliveredIncrease = 0;
      for (const status of testCase.seedOrders) {
        const seeded = await seedOrder(admin.token, status);
        if (status === 'delivered') deliveredIncrease += seeded.totalAmount;
      }

      let promotedCount = 0;
      if (testCase.assertion === 'revenue-tracks-promotion' && testCase.promoteTo) {
        // Baseline is captured before this order exists at all, so its whole
        // lifecycle — from `pending` to `promoteTo` — happens inside the case.
        const seeded = await seedOrder(admin.token, 'pending');
        for (const step of STATUS_PATH[testCase.promoteTo] ?? []) {
          await setOrderStatus(admin.token, seeded.orderId, step);
        }
        if (testCase.promoteTo === 'delivered') {
          deliveredIncrease += seeded.totalAmount;
        }
        promotedCount = 1;
      }

      await seedAdminToken(page, admin.token);
      const dashboard = new DashboardPage(page);
      await dashboard.goto();

      const shownRevenue = await dashboard.revenueValue();
      const shownCount = await dashboard.orderCountValue();
      const expectedCount =
        baseline.orderCount + testCase.seedOrders.length + promotedCount;

      // Pattern: numeric equality against a live-computed oracle. Covers
      // every "delivered counts, everything else doesn't" case at once —
      // an order this case seeded as anything other than `delivered`
      // contributes 0 to `deliveredIncrease`, which is exactly §4's rule.
      expect(
        shownRevenue,
        'revenue must equal baseline + the delivered orders this case added',
      ).toBe(baseline.deliveredRevenue + deliveredIncrease);

      // Pattern: numeric equality — the order count is never filtered by
      // status, unlike revenue.
      expect(
        shownCount,
        'order count must include every status this case seeded, not just delivered',
      ).toBe(expectedCount);
    });
  }
});
