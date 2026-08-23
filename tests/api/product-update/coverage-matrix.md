# Ma trận bao phủ — PUT /api/products/:id

| Input/state | Valid | Invalid / missing / boundary / interaction | Requirement |
|---|---|---|---|
| Path `id` | ID số nguyên dương đang tồn tại | `0`, `-1`, `1.5`, chữ, SQLi-like, ID không tồn tại | FR-15, SEC-05 |
| Header `Authorization` | JWT admin hợp lệ | thiếu, token lỗi, token user, Bearer rỗng | FR-12, SEC-02, SEC-03 |
| Header `Content-Type` | `application/json` | `text/plain`, không có body | Contract, safe error handling |
| `name` | 1 ký tự, Unicode, đúng 255 ký tự | thiếu, null, rỗng, whitespace, array, object, 256 ký tự | FR-15 |
| `price` | số dương, gồm `0.01` | thiếu, null, `0`, âm, string, array, boolean | FR-15 |
| `description` | string, Unicode | null trong interaction case; đặc tả không quy định bắt buộc/giới hạn | API specification / specification gap |
| `imageUrl` | URL string | null trong interaction case; đặc tả không quy định format | API specification / specification gap |
| `category_id` | ID danh mục tồn tại | thiếu, null, `0`, không tồn tại, string, array | FR-15 |
| Body top-level | JSON object đầy đủ | array, string, nhiều trường invalid cùng lúc, unknown field `role` | FR-15, SEC-03 |
| State | update → GET thấy giá trị mới | repeated PUT, sản phẩm khác bất biến, mass assignment không xuất hiện | FR-15 |
| Response schema | success/error JSON | status, Content-Type, required error/message, không lộ field ngoài contract | Contract / specification gap |

Ghi chú oracle: specification không chốt status và schema response thành công của endpoint. Các case tương ứng dùng oracle bảo thủ và được đánh dấu `agentAudit: INCOMPLETE`; `humanReview` giữ nguyên `PENDING`.
