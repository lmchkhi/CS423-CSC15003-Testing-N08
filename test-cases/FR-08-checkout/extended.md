# FR-08 Checkout Test Cases — Student Extended Cases

**Author:** Student (23127300)  
**Date:** 2026-08-20  
**Reference:** Audit findings from `audit.md`

---

## Extended Test Cases (5 additional cases)

These cases target specific gaps and bugs the AI missed or incorrectly assumed.

| ID | Category | Input / Action | Precondition | Expected | Why AI Missed |
|----|----------|----------------|--------------|----------|---------------|
| TC-FR08-EXT-001 | Security - IDOR Read Without Auth | GET /api/orders/{{lastOrderId}} with **no Authorization header** | Order exists from previous checkout | **Observed: 200 OK** (IDOR bug); **Should be: 401 Unauthorized** | AI assumed auth is required for GET /api/orders/:id, but SUT does not enforce it. This is BUG-FR08-001. |
| TC-FR08-EXT-002 | Business Logic - Negative Total | POST /api/checkout with total_amount=-10000, valid shipping_address, user token | Valid user token | **Observed: 200 OK** (order created with negative total); **Should be: 400 Bad Request** | AI assumed negative total_amount would be rejected, but SUT accepts any client-supplied value without validation. This is BUG-FR08-002. |
| TC-FR08-EXT-003 | State Machine - Illegal canceled→delivered | PUT /api/admin/orders/{{lastOrderId}}/status with {"status":"delivered"} and admin token | Order status is "canceled" | **Observed: 200 OK** (transition accepted); **Should be: 400 Bad Request** | AI correctly listed this as illegal, but SUT wrongly accepts it. This is BUG-FR08-003. |
| TC-FR08-EXT-004 | Business Logic - Empty Cart Checkout | POST /api/checkout with valid total_amount and shipping_address, user token | User cart is empty (no items added) | **Observed: 200 OK** (order created despite empty cart); **Should be: 400 Bad Request** | AI did not test cart state validation. SUT creates orders even when cart is empty, allowing orders with no items. Business logic flaw. |
| TC-FR08-EXT-005 | Type Coercion - String total_amount | POST /api/checkout with total_amount="50000" (string instead of number), valid shipping_address, user token | Valid user token | **Observed: 200 OK** (string coerced to number); **Expected: 400 Bad Request or type validation** | AI listed non-numeric strings like "abc" but not numeric strings. SUT may accept and coerce "50000" string to integer 50000, showing weak type validation. |

---

## Detailed Reasoning

### TC-FR08-EXT-001: IDOR on GET /api/orders/:id

**Why it matters:** The AI assumed that `GET /api/orders/:id` requires authentication and would return 401 without a token. However, the SUT does not enforce any authorization on this endpoint. Any anonymous user can retrieve any order by guessing or enumerating order IDs. This is a critical security vulnerability (IDOR - Insecure Direct Object Reference).

**Test steps:**
1. User A performs a successful checkout → receives `orderId` (e.g., 123).
2. Anonymous request: `GET http://localhost:3000/api/orders/123` with **no Authorization header**.
3. Observe: SUT returns 200 OK with full order details.
4. Expected per security best practice: 401 Unauthorized.

**Evidence:** Black-box observation via Postman/Newman; response body contains order data without auth.

---

### TC-FR08-EXT-002: Negative total_amount Accepted

**Why it matters:** The AI correctly identified that negative `total_amount` should be rejected (400), but the SUT does not validate this field. A malicious client can submit `total_amount=-10000` and create an order with a negative total, potentially exploiting refund or accounting logic.

**Test steps:**
1. User logs in, obtains valid token.
2. POST /api/checkout with `{"total_amount": -10000, "shipping_address": "123 Le Loi"}` and `Authorization: Bearer <token>`.
3. Observe: SUT returns 200 OK and creates the order.
4. Expected per business logic: 400 Bad Request (total_amount must be positive).

**Evidence:** Black-box observation via Postman/Newman; response confirms order creation with negative total.

---

### TC-FR08-EXT-003: Illegal canceled→delivered Transition

**Why it matters:** The AI listed this transition as illegal (should return 400), but the SUT actually accepts it. Orders in "canceled" state are terminal and should not transition to any active state like "delivered". This breaks the order state machine.

**Test steps:**
1. Admin creates an order and sets status to "canceled".
2. Admin attempts: PUT /api/admin/orders/:id/status with `{"status": "delivered"}` and admin token.
3. Observe: SUT returns 200 OK and updates status to "delivered".
4. Expected per state machine rules: 400 Bad Request (illegal transition).

**Evidence:** Black-box observation via Postman/Newman; order status changes from canceled to delivered.

---

### TC-FR08-EXT-004: Empty Cart Checkout

**Why it matters:** The AI did not consider whether the SUT validates that the cart has items before allowing checkout. The spec mentions `POST /api/cart` to add items and `POST /api/checkout`, but does not explicitly link them. A robust system should reject checkout if the cart is empty.

**Test steps:**
1. User logs in, does **not** add any items to cart.
2. POST /api/checkout with valid total_amount and shipping_address.
3. Observe: SUT returns 200 OK and creates an order.
4. Expected per business logic: 400 Bad Request (cart must have items).

**Evidence:** Black-box observation; order created despite empty cart.

---

### TC-FR08-EXT-005: String total_amount Coerced

**Why it matters:** The AI tested non-numeric strings like "abc" (which should return 400), but did not test numeric strings like "50000". JavaScript and many frameworks automatically coerce numeric strings to numbers. Weak type validation allows clients to send `"50000"` instead of `50000`, potentially bypassing validation logic.

**Test steps:**
1. User logs in, obtains valid token.
2. POST /api/checkout with `{"total_amount": "50000", "shipping_address": "123 Le Loi"}` (note: string instead of number).
3. Observe: SUT returns 200 OK (string coerced to number).
4. Expected per strict schema validation: 400 Bad Request (type mismatch).

**Evidence:** Black-box observation; order created with string total_amount.

---

## Summary

All five extended cases expose real SUT bugs or missing validations that the AI either assumed were enforced (IDOR, negative total, illegal state transition) or did not consider (empty cart, type coercion). These cases will be implemented in the Postman collection and reported as:
- **BUG-FR08-001:** IDOR on GET /api/orders/:id
- **BUG-FR08-002:** Unvalidated total_amount (negative, zero, unvalidated against cart)
- **BUG-FR08-003:** Illegal canceled→delivered state transition
- Additional observations: empty cart checkout, type coercion
