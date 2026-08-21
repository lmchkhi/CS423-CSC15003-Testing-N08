# POST /api/admin/import-products thiếu kiểm tra role admin

- **Mã vấn đề:** `FR16-SEC-001`
- **Mức độ:** `Critical / Security`
- **Endpoint:** `POST /api/admin/import-products`
- **Phạm vi:** Pool C — FR-16
- **Phân loại:** `LOI_BAO_MAT_SUT` — Missing Admin Role Authorization
- **Trạng thái xuất bản:** `BẢN NHÁP CỤC BỘ`
- **GitHub Issue:** `NOT CREATED`

## Mô tả

Endpoint gắn middleware `authenticateToken` nhưng không kiểm tra `role = 'admin'` trong JWT payload. Vì vậy user thường có JWT hợp lệ vẫn có thể gọi chức năng bulk import và tạo product trong cơ sở dữ liệu.

Canonical run đã chứng minh lỗi bằng cả một product đơn lẻ và một batch ba product của non-admin. Đây là bypass authorization trên endpoint admin có khả năng thay đổi dữ liệu hàng loạt.

## Điều kiện tái hiện

- SUT chạy tại `http://localhost:3000`.
- Có JWT hợp lệ của một user không có role admin tại `<NON_ADMIN_VALID_TOKEN>`.
- Có `category_id` hợp lệ tại `<CATEGORY_ID>`.
- Student ID của repository: `23127464`.
- Ghi nhận danh sách hoặc product count trước request để kiểm tra persistence.

## Các bước tái hiện

1. Gửi batch hợp lệ bằng JWT của user thường:

```bash
curl -i \
  -X POST \
  -H "Authorization: Bearer <NON_ADMIN_VALID_TOKEN>" \
  -H "X-Student-Id: 23127464" \
  -H "Content-Type: application/json" \
  --data '{"products":[{"name":"FR16-NONADMIN-REPRO","price":100,"description":"non-admin import","imageUrl":"https://example.test/fr16.png","category_id":<CATEGORY_ID>}]}' \
  "http://localhost:3000/api/admin/import-products"
```

2. Đọc lại danh sách product hoặc truy vấn DB bằng cơ chế quan sát được phê duyệt.
3. Tìm marker `FR16-NONADMIN-REPRO` và so sánh trạng thái trước/sau request.

## Expected vs Actual

### Expected

- Request của non-admin phải bị từ chối theo FR-12 và SEC-03.
- Không product nào trong batch được tạo.
- Không tự đặt exact rejection status code hoặc error schema vì contract không công bố các chi tiết này.

### Actual

- Server trả `200 OK`.
- Product có marker của non-admin được lưu vào DB.
- Canonical run quan sát cùng hành vi với batch một product và batch ba product.

## Evidence

- Final run: `tests/api-testing/evidence/fr-16/20260821-223035/`
- Newman console: `tests/api-testing/evidence/fr-16/20260821-223035/newman-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-16/20260821-223035/newman-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-16/20260821-223035/newman-report.html`
- Execution analysis: `reports/api-testing/fr-16-phase-d-execution-analysis.md`
- Kết quả final: 105 assertions, 16 failed assertions, Newman exit code `1`.

Các assertion liên quan:

| Test case | Bằng chứng |
|---|---|
| `FR16-AUTH-002` | Non-admin gửi một product hợp lệ; marker vẫn xuất hiện trong danh sách sau request. |
| `FR16-H05` | Non-admin gửi batch ba product hợp lệ; marker `FR16-H05-A` vẫn tồn tại sau request. |

## Root cause — quan sát source

Tại `src/eshop-sut/backend/server.js:199`, route chỉ gắn middleware xác thực:

```js
app.post("/api/admin/import-products", authenticateToken, (req, res) => {
```

Middleware tại `src/eshop-sut/backend/server.js:100-110` chỉ lấy token, verify signature/expiry, gán payload vào `req.user` rồi gọi `next()`:

```js
jwt.verify(token, SECRET_KEY, (err, user) => {
  if (err) return res.status(403).json({ error: "Forbidden" });
  req.user = user;
  next();
});
```

Không có điều kiện kiểm tra `req.user.role === 'admin'` trước khi thực hiện import. Quan sát source phù hợp với unauthorized persistence được tái hiện trong canonical run.

## Nguồn yêu cầu

- `src/eshop-sut/README.md` — FR-12: mọi `/api/admin/*` yêu cầu JWT hợp lệ và `role = 'admin'` trong token.
- `src/eshop-sut/README.md` — SEC-03: API Admin phải kiểm tra role admin, không chỉ kiểm tra token.
- `src/eshop-sut/api_specification.md` — phần 6 “API Dành cho Admin” yêu cầu tài khoản có quyền Admin; §6.3 công bố endpoint import.
- `reports/api-testing/fr-16-phase-a-contract.md` — authentication/admin requirement áp dụng trực tiếp cho FR-16.

## Tác động bảo mật

Bất kỳ tài khoản user thường nào có JWT hợp lệ đều có thể vượt qua ranh giới quyền admin để tạo sản phẩm hàng loạt. Lỗi có thể gây chèn dữ liệu trái phép, làm sai lệch catalog, tăng nhanh số bản ghi và ảnh hưởng tính toàn vẹn dữ liệu kinh doanh.

## Trạng thái Phase E

PHASE E: COMPLETE — LOCAL BUG REPORT CREATED

GITHUB ISSUE: NOT CREATED

CI/CD: NOT CREATED FOR FR-16

AI CRITIQUE: NOT CREATED
