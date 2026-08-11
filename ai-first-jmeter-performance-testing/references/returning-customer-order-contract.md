# Returning Customer Search and Order — Contract and JMeter Conventions

## Canonical identity

- Business name: Returning Customer Search and Order
- Vietnamese display name: Khách hàng quay lại tìm kiếm và đặt hàng
- Folder slug: `returning-customer-order`
- JMeter technical prefix: `RCO`
- Workflow description: A returning customer logs in, searches for a product, views product details, checks the cart, adds the selected product, performs checkout, and verifies the created order in order history.

## Fixed workflow

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> GET /api/cart
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/my-orders
```

| Step | Group | Auth | Dynamic output |
| --- | --- | --- | --- |
| Login | Auth-heavy | No | `token` |
| Search | Read-heavy | No | `productId`, `productName` |
| Product detail | Read-heavy | No | `detailPrice` |
| Get cart | Transactional | Bearer | cart state |
| Add cart | Transactional | Bearer | add result |
| Checkout | Transactional | Bearer | `orderId` |
| My orders | Transactional | Bearer | order verification |

Verify actual paths, ports, payloads and response shapes against the repository/API at Phase A. Treat this table as the intended workflow, not proof of runtime behavior.

## Data and correlation

Use the final workflow CSV header:

```csv
email,password,keyword,quantity,shippingAddress
```

Do not put runtime tokens or personal/production secrets in CSV. Do not hard-code `productId` or `totalAmount`:

```text
CSV credentials -> login -> token
search(keyword) -> productId/productName
detail(productId) -> price
price * quantity -> totalAmount
checkout -> orderId
my-orders -> verify orderId
```

Normalize numeric or string price forms before calculation. With Groovy, validate empty values and use `BigDecimal`; avoid floating-point magic numbers.

Map each VU to an isolated account where the SUT state model requires it. Provision and validate the pool before measured work; keep registration/setup outside measured transactions. Define CSV sharing, recycle and stop-thread behavior explicitly. Verify cart cleanup, order accumulation and three-failure login lockout.

## Common JMeter structure

Use one logical transaction `RCO-E2E-ReturningCustomerOrder` with samplers:

```text
RCO-01-Login
RCO-02-Search
RCO-03-ProductDetail
RCO-04-GetCart
RCO-05-AddCart
RCO-06-Checkout
RCO-07-MyOrders
```

Use variables:

```text
baseUrl, email, password, keyword, quantity, shippingAddress
token, productId, productName, detailPrice, normalizedPrice, totalAmount, orderId
```

Keep identical correlation, assertions, data policy and business flow in Load, Stress and Spike. Vary threads/VUs, ramp-up, duration, arrival pattern or spike level only.

## Functional assertions

- Login: valid status/body and non-empty token.
- Search: 200, JSON collection, at least one product and extractable product ID.
- Detail: 200, matching ID and present price.
- Cart: authenticated response with expected JSON shape.
- Add cart: success and no unexpected 4xx/5xx.
- Checkout: success and non-empty order ID.
- My orders: 200 and the newly created order appears.

Fast HTTP 200 responses are not successful performance samples when business assertions fail.

## Workload design defaults

Treat these only as `INITIAL_PROPOSAL`, never an SLA or measured threshold:

| Scenario | Starting proposal |
| --- | --- |
| Load | 10–20 VU; 30–60 s ramp-up; 3–5 min steady |
| Stress | steps 10, 20, 40, 60, 80 VU; about 60 s each |
| Spike | 5 VU baseline -> 50 VU spike -> 5 VU recovery |
| Endurance | derive after Stress; heuristic 60–70% of highest stable load for 10–15 min |

Use randomized 1–3 second think time as an initial policy and keep it consistent unless human review approves a change.

Default distinct listeners: Load = Summary Report, Stress = Aggregate Report, Spike = View Results Tree. Treat raw JTL and HTML as metric sources; View Results Tree can distort load and is mainly a required view/debug aid.

## File placement

```text
tests/returning-customer-order/data/returning-customer-order.csv
tests/returning-customer-order/data/account-provisioning.csv
tests/returning-customer-order/test-cases/smoke/returning-customer-order-smoke.jmx
tests/returning-customer-order/test-cases/{load,stress,spike}/23127464_<Scenario>_<YYYYMMDD>.jmx
tests/returning-customer-order/test-cases/endurance/returning-customer-order-endurance.jmx
```
