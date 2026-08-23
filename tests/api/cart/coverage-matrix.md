# Ma trận coverage — POST /api/cart

## Oracle và phạm vi

- Endpoint: `POST /api/cart`; base URL: `http://localhost:3000`.
- Authentication: bắt buộc `Authorization: Bearer <token>` theo API specification và SEC-02.
- Body JSON được mô tả gồm `id`, `name`, `price`, `quantity`.
- FR-06 quy định `quantity` là số nguyên dương, tối thiểu `1`; FR-07 quy định thêm lại cùng sản phẩm phải tăng số lượng và không tạo dòng mới.
- API specification không chốt exact success/error status hoặc response schema cho endpoint này. Những case dựa trên conventional status được đánh dấu `agentAudit.status = INCOMPLETE`.

| Thành phần | Valid | Invalid / missing / boundary / interaction | Testcase |
|---|---|---|---|
| Header `Authorization` | user JWT, admin JWT | missing, invalid JWT, empty Bearer | TC-CART-001–002, 035–038 |
| Header `Content-Type` | `application/json` | `text/plain`, missing | TC-CART-003–040, 041–042 |
| Body top-level | object | empty object, array, missing body | TC-CART-032–034 |
| `id` | positive number | missing, null, empty, string, object | TC-CART-003–013 |
| `name` | normal string, Unicode | missing, null, empty, whitespace, number, injection probes | TC-CART-003–005, 014–018, 039–040 |
| `price` | positive number, decimal, large safe number | missing, null, zero, negative, string, object | TC-CART-003–007, 019–024 |
| `quantity` | integer `1`, integer `>1` | missing, null, `0`, negative, decimal, string, array | TC-CART-003–004, 025–031 |
| Unknown fields | harmless extra fields | `user_id`, `role` mass assignment attempt | TC-CART-008 |
| State transition | empty → one item | repeat same product → merge and sum quantity | TC-CART-001–002 |
| Ownership | independent user/admin carts | cross-account leakage check | TC-CART-001, 038 |
| Security | valid JWT, safe input | auth bypass, type confusion, SQLi/XSS probes, content-type confusion | TC-CART-008, 022, 024, 028, 031, 033, 035–042 |
| Schema | JSON response and expected state | controlled JSON error; no accepted invalid item | TC-CART-001–003, 009–037, 041–042 |

## Coverage family count

- `domain-partition`: 30 cases.
- `state-transition`: 2 cases.
- `security`: 15 cases.
- `schema-validation`: 28 cases.
- Tổng cộng: 42 AI-generated cases; human review vẫn `PENDING`.
