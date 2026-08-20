# POST /api/admin/import-products không validate price > 0

- **Mã vấn đề:** `FR16-FUNC-001`
- **Mức độ:** `Medium / Functional`
- **Endpoint:** `POST /api/admin/import-products`
- **Phạm vi:** Pool C — FR-16
- **Phân loại:** `LOI_CHUC_NANG_SUT` — Missing Price Validation
- **Trạng thái xuất bản:** `BẢN NHÁP CỤC BỘ`
- **GitHub Issue:** `NOT CREATED`

## Mô tả

README FR-16 yêu cầu `price > 0`, nhưng endpoint chấp nhận cả `price = 0` và price âm rồi lưu các product này vào DB. Do đó dữ liệu không hợp lệ vượt qua validation của bulk import.

## Điều kiện tái hiện

- SUT chạy tại `http://localhost:3000`.
- Có JWT admin hợp lệ tại `<ADMIN_VALID_TOKEN>`.
- Có `category_id` hợp lệ tại `<CATEGORY_ID>`.
- Student ID của repository: `23127464`.
- Ghi nhận trạng thái product trước request để kiểm tra persistence.

## Các bước tái hiện

### 1. Import product có price bằng 0

```bash
curl -i \
  -X POST \
  -H "Authorization: Bearer <ADMIN_VALID_TOKEN>" \
  -H "X-Student-Id: 23127464" \
  -H "Content-Type: application/json" \
  --data '{"products":[{"name":"FR16-PRICE-ZERO-REPRO","price":0,"description":"zero price","imageUrl":"https://example.test/fr16.png","category_id":<CATEGORY_ID>}]}' \
  "http://localhost:3000/api/admin/import-products"
```

### 2. Import product có price âm

```bash
curl -i \
  -X POST \
  -H "Authorization: Bearer <ADMIN_VALID_TOKEN>" \
  -H "X-Student-Id: 23127464" \
  -H "Content-Type: application/json" \
  --data '{"products":[{"name":"FR16-PRICE-NEGATIVE-REPRO","price":-1,"description":"negative price","imageUrl":"https://example.test/fr16.png","category_id":<CATEGORY_ID>}]}' \
  "http://localhost:3000/api/admin/import-products"
```

3. Đọc lại danh sách product hoặc truy vấn DB bằng cơ chế quan sát được phê duyệt.
4. Tìm hai marker `FR16-PRICE-ZERO-REPRO` và `FR16-PRICE-NEGATIVE-REPRO`.

## Expected vs Actual

### Expected

- Mỗi product có `price <= 0` phải bị xem là dòng lỗi.
- Request phải bị từ chối theo semantic contract và toàn bộ batch phải rollback theo FR-16.
- Không product nào của batch lỗi được lưu.

### Actual

- Server trả `200 OK` cho cả hai request.
- Product có `price = 0` và product có `price = -1` đều được import và lưu vào DB.

## Evidence

- Canonical run: `tests/api-testing/evidence/fr-16/20260821-024915/`
- Newman console: `tests/api-testing/evidence/fr-16/20260821-024915/newman-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-16/20260821-024915/newman-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-16/20260821-024915/newman-report.html`
- Execution analysis: `reports/api-testing/fr-16-phase-d-execution-analysis.md`

Các assertion liên quan:

| Test case | Bằng chứng |
|---|---|
| `FR16-PRICE-002` | Product có `price = 0` vẫn xuất hiện trong trạng thái persistence sau request. |
| `FR16-PRICE-003` | Product có `price = -1` vẫn xuất hiện trong trạng thái persistence sau request. |

## Root cause — quan sát source

Tại `src/eshop-sut/backend/server.js:213-217`, vòng lặp chỉ kiểm tra `name`:

```js
rows.forEach((row, index) => {
  if (!row.name) {
    errors.push(`Hàng ${index + 2}: Thiếu tên sản phẩm`);
    return;
  }
```

Sau đó `row.price` được chuyển thẳng vào prepared statement tại dòng 218-230. Không có điều kiện kiểm tra `price <= 0` trước khi insert. Quan sát source phù hợp với hai product giá không hợp lệ đã được lưu trong canonical run.

## Nguồn yêu cầu

- `src/eshop-sut/README.md` — FR-16: validation trước import yêu cầu `price` phải là số dương.
- `reports/api-testing/fr-16-phase-a-contract.md` — price validation và rollback/atomicity contract cho FR-16.

## Tác động

Catalog có thể chứa sản phẩm miễn phí hoặc giá âm trái với quy tắc nghiệp vụ. Dữ liệu này có thể làm sai kết quả hiển thị, tính tiền, báo cáo và các quy trình downstream sử dụng price.

## Trạng thái Phase E

PHASE E: COMPLETE — LOCAL BUG REPORT CREATED

GITHUB ISSUE: NOT CREATED

CI/CD: NOT CREATED FOR FR-16

AI CRITIQUE: NOT CREATED
