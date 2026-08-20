# FR-08 Checkout Test Cases — AI-Generated

**API Endpoint:** `POST /api/checkout`  
**Base URL:** `http://localhost:3000`  
**Spec Reference:** Section 4.3 (api-specification.md)  
**Student ID:** 23127300  
**Technique:** Domain partition (total_amount/shipping_address), auth (SEC), state transitions (FR-10), IDOR (SEC), business logic

---

## Test Case Matrix (≥35 rows)

| ID | Category | Input (total_amount / shipping_address / authMode) | Precondition | Expected (per spec) | Oracle |
|----|----------|-----------------------------------------------------|--------------|---------------------|--------|
| TC-FR08-001 | Valid Checkout | 200000 / "123 Le Loi, Q1, TP.HCM" / user | Valid user token | 200 OK; `{message:"Checkout successful", orderId:<int>}` | Response code 200; schema match; orderId is integer |
| TC-FR08-002 | Auth - No Token | 200000 / "123 Le Loi, Q1" / none | No Authorization header | 401 Unauthorized | Response code 401 |
| TC-FR08-003 | Auth - Invalid Token | 200000 / "123 Le Loi, Q1" / invalid | Malformed token "Bearer not.a.real.token" | 403 Forbidden | Response code 403 |
| TC-FR08-004 | Auth - Valid User Token | 150000 / "456 Nguyen Hue, Q3" / user | Valid user token | 200 OK | Response code 200; orderId returned |
| TC-FR08-005 | total_amount - Zero | 0 / "123 Le Loi, Q1" / user | Valid user token | 400 Bad Request (should reject) | Response code 400 |
| TC-FR08-006 | total_amount - Negative | -5000 / "123 Le Loi, Q1" / user | Valid user token | 400 Bad Request (should reject) | Response code 400 |
| TC-FR08-007 | total_amount - Positive Small | 1 / "123 Le Loi, Q1" / user | Valid user token | 200 OK (boundary) | Response code 200 |
| TC-FR08-008 | total_amount - Positive Large | 999999999 / "123 Le Loi, Q1" / user | Valid user token | 200 OK | Response code 200 |
| TC-FR08-009 | total_amount - Float | 199.99 / "123 Le Loi, Q1" / user | Valid user token | 200 OK (accepted) or 400 | Check if float handled correctly |
| TC-FR08-010 | total_amount - Missing | (omitted) / "123 Le Loi, Q1" / user | Valid user token | 400 Bad Request | Response code 400 |
| TC-FR08-011 | total_amount - Non-numeric String | "abc" / "123 Le Loi, Q1" / user | Valid user token | 400 Bad Request | Response code 400 |
| TC-FR08-012 | total_amount - Empty String | "" / "123 Le Loi, Q1" / user | Valid user token | 400 Bad Request | Response code 400 |
| TC-FR08-013 | shipping_address - Valid | 200000 / "789 Tran Hung Dao, Q5, TP.HCM" / user | Valid user token | 200 OK | Response code 200 |
| TC-FR08-014 | shipping_address - Empty | 200000 / "" / user | Valid user token | 400 Bad Request (should reject) | Response code 400 |
| TC-FR08-015 | shipping_address - Missing | 200000 / (omitted) / user | Valid user token | 400 Bad Request | Response code 400 |
| TC-FR08-016 | shipping_address - Very Long | 200000 / ("A" * 500) / user | Valid user token | 400 Bad Request (length limit) | Response code 400 |
| TC-FR08-017 | shipping_address - Unicode | 200000 / "123 Lê Lợi, Quận 1, Thành phố Hồ Chí Minh" / user | Valid user token | 200 OK (unicode supported) | Response code 200 |
| TC-FR08-018 | shipping_address - Whitespace Only | 200000 / "   " / user | Valid user token | 400 Bad Request | Response code 400 |
| TC-FR08-019 | Schema - Empty Body | {} / user | Valid user token | 400 Bad Request | Response code 400 |
| TC-FR08-020 | Schema - Extra Fields | 200000 / "123 Le Loi" / user + {"extra":"field"} | Valid user token | 200 OK (ignore extra) or 400 | Check strict schema |
| TC-FR08-021 | Business - Cart Validation | 50000 / "123 Le Loi" / user | Cart total is 200000 (mismatch) | 400 Bad Request (should validate) | Response code 400 |
| TC-FR08-022 | State - Order Created | 200000 / "123 Le Loi" / user | Valid checkout | Order exists with status "pending" | Query DB or GET /api/orders/:id confirms pending |
| TC-FR08-023 | State - Pending to Confirmed | Admin updates orderId with status "confirmed" | Order is pending | 200 OK; status updated | PUT /api/admin/orders/:id/status returns 200 |
| TC-FR08-024 | State - Confirmed to Shipping | Admin updates orderId with status "shipping" | Order is confirmed | 200 OK; status updated | PUT /api/admin/orders/:id/status returns 200 |
| TC-FR08-025 | State - Shipping to Delivered | Admin updates orderId with status "delivered" | Order is shipping | 200 OK; status updated | PUT /api/admin/orders/:id/status returns 200 |
| TC-FR08-026 | State - Illegal Pending to Delivered | Admin updates orderId with status "delivered" | Order is pending | 400 Bad Request (illegal jump) | Response code 400 |
| TC-FR08-027 | State - Illegal Pending to Shipping | Admin updates orderId with status "shipping" | Order is pending | 400 Bad Request (must confirm first) | Response code 400 |
| TC-FR08-028 | State - Legal Pending to Canceled | Admin updates orderId with status "canceled" | Order is pending | 200 OK | Response code 200 |
| TC-FR08-029 | State - Illegal Canceled to Delivered | Admin updates orderId with status "delivered" | Order is canceled | 400 Bad Request (canceled is terminal) | Response code 400 |
| TC-FR08-030 | Security - IDOR Read Order | GET /api/orders/:id with no token | Order exists | 401 Unauthorized (should require auth) | Response code 401 |
| TC-FR08-031 | Security - IDOR Read Other User Order | GET /api/orders/:id with userB token | Order belongs to userA | 403 Forbidden (should deny) | Response code 403 |
| TC-FR08-032 | SQL Injection - shipping_address | 200000 / "123' OR '1'='1" / user | Valid user token | 200 OK (parameterized) or 400 | Check if safely stored |
| TC-FR08-033 | XSS - shipping_address | 200000 / "<script>alert('xss')</script>" / user | Valid user token | 400 Bad Request or sanitized | Response code 400 or stored safely |
| TC-FR08-034 | Boundary - total_amount = 1 | 1 / "123 Le Loi" / user | Valid user token | 200 OK | Response code 200 |
| TC-FR08-035 | Boundary - total_amount = MAX_INT | 2147483647 / "123 Le Loi" / user | Valid user token | 200 OK | Response code 200 |

---

## Notes

- **Spec §4.3 Success:** Exact schema `{message:"Checkout successful", orderId:<int>}` on HTTP 200
- **Auth:** Requires `Authorization: Bearer <token>`; no token → 401; invalid token → 403
- **Order State:** Created order has status `pending`; transitions via PUT /api/admin/orders/:id/status
- **State Machine (FR-10):** Legal: pending→confirmed→shipping→delivered, pending→canceled; Illegal: pending→delivered, pending→shipping, canceled→delivered
- **IDOR:** GET /api/orders/:id should require authentication (401 without token, 403 for other user's order)
- **Business Logic:** Spec does not mention cart validation; SUT may accept any client-supplied total_amount
- **SQL/XSS:** Parameterized queries prevent injection; sanitization expected

---

## Generation Process

**Prompt 1 (total_amount Partition):**
```
Generate exhaustive domain partitions for the "total_amount" field in POST /api/checkout:
- positive values (small boundary 1, normal 200000, large 999999999, MAX_INT)
- zero
- negative
- missing field
- non-numeric string ("abc", "")
- float (199.99)
Map each to expected HTTP status per spec. Use test IDs TC-FR08-001 through TC-FR08-012.
```

**Prompt 2 (shipping_address Partition):**
```
Generate exhaustive domain partitions for the "shipping_address" field in POST /api/checkout:
- valid address
- empty string
- missing field
- very long (500+ chars)
- unicode characters
- whitespace-only
- SQL injection (' OR '1'='1)
- XSS (<script>alert('xss')</script>)
Map each to expected HTTP status per spec. Use test IDs TC-FR08-013 through TC-FR08-018, TC-FR08-032, TC-FR08-033.
```

**Prompt 3 (Authentication):**
```
Generate test cases for authentication requirements:
- no Authorization header → 401
- malformed/invalid token → 403
- valid user token → 200
Use test IDs TC-FR08-002 through TC-FR08-004.
```

**Prompt 4 (State Transitions + IDOR):**
```
Generate test cases for order state machine (FR-10) and security:
(a) Order created with status "pending"
(b) Legal transitions: pending→confirmed→shipping→delivered, pending→canceled
(c) Illegal transitions: pending→delivered, pending→shipping, canceled→delivered
(d) IDOR: GET /api/orders/:id without token should return 401
(e) IDOR: GET /api/orders/:id with another user's token should return 403
Use test IDs TC-FR08-022 through TC-FR08-031.
Expected outcomes per state machine rules and security best practices.
```

**Prompt 5 (Business Logic + Schema):**
```
Generate test cases for:
(a) Schema validation: empty body, extra fields
(b) Business logic: client-supplied total_amount not validated against cart
(c) Boundary values for total_amount
Use test IDs TC-FR08-019 through TC-FR08-021, TC-FR08-034, TC-FR08-035.
```
