import type { Page } from '@playwright/test';
import { AdminOrdersPage } from '../pages/admin-orders.page';
import { MyOrdersPage } from '../pages/my-orders.page';
import {
  expect,
  seedAdminToken,
  seedUserToken,
  test,
} from '../fixtures/auth.fixture';
import { createPendingOrder, setOrderStatus } from '../utils/api';
import { config } from '../utils/config';
import { loadCases, orderStateCaseSchema } from '../utils/data';

/**
 * FR-10 — Trạng thái đơn hàng. Oracle: sut-requirements.md §3.
 *
 * Every case is read from test-data/fr-10-order-state.cases.json (HW04 §6
 * forbids inline case data) and the spec dispatches on the record's
 * `assertion` field, never on its caseId.
 *
 * Each case creates its own order and walks it to the starting state through
 * the admin API. That is setup only — the behaviour under test is always
 * exercised through the UI, so no case can be disturbed by another's outcome.
 */
const cases = loadCases('fr-10-order-state.cases.json', orderStateCaseSchema);

/** The only status labels §3's five states may render as. */
const STATUS_LABEL_DOMAIN = [
  'Chờ xác nhận',
  'Đã xác nhận',
  'Đang giao',
  'Đã giao',
  'Đã hủy',
];

/** Both order surfaces expose the same vocabulary, so cases can share code. */
type OrderSurface = AdminOrdersPage | MyOrdersPage;

function required<T>(value: T | null, field: string, caseId: string): T {
  if (value === null) {
    throw new Error(`${caseId}: data record is missing \`${field}\`.`);
  }
  return value;
}

async function openAdminOrders(page: Page, token: string): Promise<AdminOrdersPage> {
  await seedAdminToken(page, token);
  const adminOrders = new AdminOrdersPage(page);
  await adminOrders.goto();
  return adminOrders;
}

async function openMyOrders(page: Page, token: string): Promise<MyOrdersPage> {
  await seedUserToken(page, token);
  const myOrders = new MyOrdersPage(page);
  await myOrders.goto();
  return myOrders;
}

test.describe('FR-10 — Trạng thái đơn hàng', () => {
  for (const testCase of cases) {
    test(`${testCase.caseId} — ${testCase.title}`, async ({
      page,
      context,
      admin,
    }) => {
      const { user, orderId } = await createPendingOrder('fr10');
      for (const status of testCase.setupPath) {
        await setOrderStatus(admin.token, orderId, status);
      }
      const statusLabel = required(
        testCase.expected.statusLabel,
        'expected.statusLabel',
        testCase.caseId,
      );

      switch (testCase.assertion) {
        case 'transition-succeeds': {
          const surface: OrderSurface =
            testCase.actor === 'admin'
              ? await openAdminOrders(page, admin.token)
              : await openMyOrders(page, user.token);

          // Pattern 1 — count. The order must appear exactly once before the
          // case acts, so a miss is reported as a setup failure, not as a
          // mysterious timeout on the control.
          await expect(surface.rowFor(orderId)).toHaveCount(1);

          await surface.activate(
            orderId,
            required(testCase.control, 'control', testCase.caseId),
          );

          // Pattern 2 — text content. The transition is legal, so the row must
          // settle on the target state's label.
          await expect(
            surface.statusBadge(orderId),
            'a legal transition must move the order to its target state',
          ).toHaveText(statusLabel);
          break;
        }

        case 'controls-exactly': {
          const adminOrders = await openAdminOrders(page, admin.token);
          await expect(adminOrders.rowFor(orderId)).toHaveCount(1);
          await expect(adminOrders.statusBadge(orderId)).toHaveText(statusLabel);

          // Pattern 3 — list equality. The admin app offers one button per
          // transition it permits, so the button set is the system's own claim
          // about the outgoing edges of this state. Asserting the exact set
          // proves both halves of §3 at once: no legal transition is missing,
          // and no transition outside the diagram is offered.
          await expect(
            adminOrders.controlsFor(orderId),
            `state \`${statusLabel}\` must offer exactly the transitions §3 allows`,
          ).toHaveText(
            required(testCase.expectedControls, 'expectedControls', testCase.caseId),
          );
          break;
        }

        case 'control-not-offered': {
          const myOrders = await openMyOrders(page, user.token);
          await expect(myOrders.rowFor(orderId)).toHaveCount(1);
          await expect(myOrders.statusBadge(orderId)).toHaveText(statusLabel);

          // Pattern 4 — absence. §3 forbids the actor this action entirely, so
          // the control must not be offered at all.
          await expect(
            myOrders.control(
              orderId,
              required(testCase.control, 'control', testCase.caseId),
            ),
            'the user must not be offered a control §3 forbids them',
          ).toHaveCount(0);
          break;
        }

        case 'status-labels-in-domain': {
          const adminOrders = await openAdminOrders(page, admin.token);
          await expect(adminOrders.rowFor(orderId)).toHaveCount(1);

          const rendered = await adminOrders.allStatusBadges.allTextContents();
          const outsideDomain = [...new Set(rendered.map((t) => t.trim()))].filter(
            (label) => !STATUS_LABEL_DOMAIN.includes(label),
          );

          // Pattern 5 — set membership. §3 specifies five states; a label
          // outside that vocabulary means an order reached a state the spec
          // does not define.
          expect(
            outsideDomain,
            'no order may show a status outside the five §3 specifies',
          ).toEqual([]);
          break;
        }

        case 'privileged-transition-refused': {
          const myOrders = await openMyOrders(page, user.token);
          await expect(myOrders.statusBadge(orderId)).toHaveText(statusLabel);

          // Reproduced the way HW02 found it: the request is issued from
          // inside the shopper's own signed-in browser session, using the very
          // token the browser holds. The web UI offers no control for this, so
          // no UI path exists — but the privilege boundary is what §3 (with
          // FR-12) constrains, and the outcome is still read back from the UI.
          const probe = await page.evaluate(
            async ({ apiUrl, id, status }) => {
              const response = await fetch(
                `${apiUrl}/api/admin/orders/${id}/status`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                  },
                  body: JSON.stringify({ status }),
                },
              );
              return { ok: response.ok, status: response.status };
            },
            {
              apiUrl: config.apiUrl,
              id: orderId,
              status: required(testCase.targetStatus, 'targetStatus', testCase.caseId),
            },
          );

          expect(
            probe.ok,
            'a shopper session must not be able to drive an admin transition',
          ).toBe(false);

          await page.reload();
          await expect(
            myOrders.statusBadge(orderId),
            'the order must still be in the state it started from',
          ).toHaveText(statusLabel);
          break;
        }

        case 'history-requires-login': {
          // No token is seeded: this page has never been signed in.
          const myOrders = new MyOrdersPage(page);
          await myOrders.goto();

          await expect(myOrders.loginPrompt).toBeVisible();
          await expect(
            myOrders.rowFor(orderId),
            'an anonymous session must not see anyone else’s order',
          ).toHaveCount(0);
          await expect(
            myOrders.control(
              orderId,
              required(testCase.control, 'control', testCase.caseId),
            ),
          ).toHaveCount(0);

          // The order itself must be untouched — checked where an anonymous
          // visitor cannot reach, in the admin list.
          const adminOrders = await openAdminOrders(
            await context.newPage(),
            admin.token,
          );
          await expect(
            adminOrders.statusBadge(orderId),
            'an anonymous visitor must not have changed the order',
          ).toHaveText(statusLabel);
          break;
        }

        case 'orders-are-owner-scoped': {
          const other = await createPendingOrder('fr10-other');
          const myOrders = await openMyOrders(page, user.token);

          await expect(myOrders.rowFor(orderId)).toHaveCount(1);
          await expect(myOrders.statusBadge(orderId)).toHaveText(statusLabel);
          await expect(
            myOrders.rowFor(other.orderId),
            'a shopper must only see their own orders',
          ).toHaveCount(0);
          break;
        }
      }
    });
  }
});
