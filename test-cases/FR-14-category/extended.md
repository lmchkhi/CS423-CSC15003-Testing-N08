# FR-14 Category CRUD - Test case mở rộng do sinh viên bổ sung

Các test case này được bổ sung sau human review để bắt các khoảng trống AI bỏ sót, đặc biệt là **access control**, **resource validation**, **uniqueness** và **input validation**.

---

## Danh sách case bổ sung

| ID | Mô tả | Dữ liệu / Hành động | Kết quả đúng theo spec | Hành vi quan sát được | Bug liên quan |
|---|---|---|---|---|---|
| TC-FR14-041 | User thường tạo category (role escalation) | `POST /api/categories` với user token | Phải trả 403 Forbidden | Quan sát được 200 OK | BUG-FR14-001 |
| TC-FR14-042 | User thường xóa category (role escalation) | `DELETE /api/categories/:id` với user token | Phải trả 403 Forbidden | Quan sát được 200 OK | BUG-FR14-001 |
| TC-FR14-043 | PUT id không tồn tại vẫn thành công | `PUT /api/categories/999999` | Phải trả 404 Not Found | Quan sát được 200 OK | BUG-FR14-002 |
| TC-FR14-044 | DELETE id không tồn tại vẫn thành công | `DELETE /api/categories/999999` | Phải trả 404 Not Found | Quan sát được 200 OK | BUG-FR14-002 |
| TC-FR14-045 | Tên category trùng được chấp nhận | POST category `Điện thoại` hai lần | Phải trả 400/409 | Quan sát được 200 OK cả hai lần | BUG-FR14-003 |
| TC-FR14-046 | Tên category rỗng được chấp nhận | `POST /api/categories` với `{ "name": "" }` | Phải trả 400 Bad Request | Quan sát được 200 OK | BUG-FR14-004 |
| TC-FR14-047 | Tên category chỉ gồm khoảng trắng được chấp nhận | `POST /api/categories` với `{ "name": "   " }` | Phải trả 400 Bad Request | Quan sát được 200 OK | BUG-FR14-004 |

---

## Vì sao AI bỏ sót

1. **Spec-optimism bias:** AI giả định hệ thống đã enforce role admin, validation và uniqueness theo best practices.
2. **Không có runtime oracle:** AI sinh test từ spec nên không tự phát hiện implementation shortcut như không kiểm tra `affectedRows`.
3. **Framework assumptions:** AI kỳ vọng có middleware validate/RBAC, trong khi Express app tối giản không tự enforce nếu code không viết rõ.
4. **Schema blindness:** AI không nhìn thấy database constraint nên dễ giả định `UNIQUE` tồn tại.

Tổng cộng **7** case bổ sung, vượt yêu cầu tối thiểu ≥5 case.
