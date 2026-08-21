---
title: "[BUG][FR-16] POST /api/admin/import-products không validate price > 0"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

FR16-PRICE-002, FR16-PRICE-003

## Requirement liên quan

FR-16

## Severity / Priority

Medium / P1

## Environment

- OS: Windows 11
- Node.js: v22.18.0
- SUT: http://localhost:3000
- Newman: 6.2.2
- Student ID: 23127464

## Steps to reproduce

1. Import product có price bằng 0:

```bash
curl -i \
  -X POST \
  -H "Authorization: Bearer <ADMIN_VALID_TOKEN>" \
  -H "X-Student-Id: 23127464" \
  -H "Content-Type: application/json" \
  --data '{"products":[{"name":"FR16-PRICE-ZERO-REPRO","price":0,"description":"zero price","imageUrl":"https://example.test/fr16.png","category_id":<CATEGORY_ID>}]}' \
  "http://localhost:3000/api/admin/import-products"
```

2. Import product có price âm:

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

## Expected result

- Mỗi product có `price <= 0` phải bị xem là dòng lỗi.
- Request phải bị từ chối theo semantic contract và toàn bộ batch phải rollback theo FR-16.
- Không product nào của batch lỗi được lưu.

## Actual result

- Server trả `200 OK` cho cả hai request.
- Product có `price = 0` và product có `price = -1` đều được import và lưu vào DB.

## Evidence

- Final run: `tests/api-testing/evidence/fr-16/20260821-223035/`
- Newman console: `tests/api-testing/evidence/fr-16/20260821-223035/newman-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-16/20260821-223035/newman-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-16/20260821-223035/newman-report.html`
- Execution analysis: `reports/api-testing/fr-16-phase-d-execution-analysis.md`

Các assertion liên quan:

| Test case | Bằng chứng |
|---|---|
| `FR16-PRICE-002` | Product có `price = 0` vẫn xuất hiện trong trạng thái persistence sau request. |
| `FR16-PRICE-003` | Product có `price = -1` vẫn xuất hiện trong trạng thái persistence sau request. |

## Root cause

Tại `src/eshop-sut/backend/server.js:213-217`, vòng lặp chỉ kiểm tra `name`:

```js
rows.forEach((row, index) => {
  if (!row.name) {
    errors.push(`Hàng ${index + 2}: Thiếu tên sản phẩm`);
    return;
  }
```

Sau đó `row.price` được chuyển thẳng vào prepared statement tại dòng 218-230. Không có điều kiện kiểm tra `price <= 0` trước khi insert. Quan sát source phù hợp với hai product giá không hợp lệ đã được lưu trong canonical run.

## Impact

Catalog có thể chứa sản phẩm miễn phí hoặc giá âm trái với quy tắc nghiệp vụ. Dữ liệu này có thể làm sai kết quả hiển thị, tính tiền, báo cáo và các quy trình downstream sử dụng price.
