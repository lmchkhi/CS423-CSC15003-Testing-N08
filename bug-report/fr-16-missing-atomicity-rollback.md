# POST /api/admin/import-products không rollback batch khi có dòng lỗi

- **Mã vấn đề:** `FR16-FUNC-002`
- **Mức độ:** `High / Functional`
- **Endpoint:** `POST /api/admin/import-products`
- **Phạm vi:** Pool C — FR-16
- **Phân loại:** `LOI_CHUC_NANG_SUT` — Missing Atomicity / Partial Commit
- **Trạng thái xuất bản:** `BẢN NHÁP CỤC BỘ`
- **GitHub Issue:** `NOT CREATED`

## Mô tả

README FR-16 yêu cầu import theo cơ chế all-or-nothing: nếu bất kỳ dòng nào lỗi thì toàn bộ batch phải rollback. Thực tế endpoint insert riêng từng dòng; các dòng hợp lệ vẫn được commit vào DB khi cùng batch có dòng invalid.

## Điều kiện tái hiện

- SUT chạy tại `http://localhost:3000`.
- Có JWT admin hợp lệ tại `<ADMIN_VALID_TOKEN>`.
- Có `category_id` hợp lệ tại `<CATEGORY_ID>`.
- Student ID của repository: `23127464`.
- Ghi nhận danh sách hoặc product count trước request.

## Các bước tái hiện

1. Gửi batch gồm một dòng hợp lệ, một dòng có `name = ""`, rồi một dòng hợp lệ:

```bash
curl -i \
  -X POST \
  -H "Authorization: Bearer <ADMIN_VALID_TOKEN>" \
  -H "X-Student-Id: 23127464" \
  -H "Content-Type: application/json" \
  --data '{"products":[{"name":"FR16-ATOM-REPRO-A","price":100,"description":"valid before","imageUrl":"https://example.test/a.png","category_id":<CATEGORY_ID>},{"name":"","price":100,"description":"invalid middle","imageUrl":"https://example.test/invalid.png","category_id":<CATEGORY_ID>},{"name":"FR16-ATOM-REPRO-B","price":200,"description":"valid after","imageUrl":"https://example.test/b.png","category_id":<CATEGORY_ID>}]}' \
  "http://localhost:3000/api/admin/import-products"
```

2. Đọc lại danh sách product hoặc truy vấn DB bằng cơ chế quan sát được phê duyệt.
3. Tìm marker `FR16-ATOM-REPRO-A` và `FR16-ATOM-REPRO-B`.

## Expected vs Actual

### Expected

- Dòng có `name = ""` phải làm batch thất bại.
- Không product nào của batch được lưu vào DB.
- Trạng thái dữ liệu sau request phải giữ nguyên so với baseline đối với các marker của batch.

### Actual

- Server trả `200 OK` với kết quả import một phần.
- Các product hợp lệ vẫn tồn tại trong DB; batch bị partial commit thay vì rollback toàn bộ.

## Evidence

- Canonical run: `tests/api-testing/evidence/fr-16/20260821-024915/`
- Newman console: `tests/api-testing/evidence/fr-16/20260821-024915/newman-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-16/20260821-024915/newman-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-16/20260821-024915/newman-report.html`
- Execution analysis: `reports/api-testing/fr-16-phase-d-execution-analysis.md`

Các assertion liên quan:

| Test case | Bằng chứng |
|---|---|
| `FR16-ATOM-001` | Dòng lỗi ở giữa; marker của dòng hợp lệ vẫn tồn tại. |
| `FR16-ATOM-002` | Dòng lỗi ở đầu; marker trong batch vẫn tồn tại. |
| `FR16-ATOM-003` | Dòng lỗi ở cuối; dòng hợp lệ đã xử lý trước vẫn tồn tại. |
| `FR16-ATOM-004` | Kiểm tra DB sau failed mixed batch vẫn tìm thấy marker của batch. |

## Root cause — quan sát source

Tại `src/eshop-sut/backend/server.js:209-231`, endpoint tạo prepared statement rồi gọi `stmt.run` riêng cho từng phần tử trong `rows.forEach`. Dòng invalid chỉ được thêm vào mảng `errors` và bỏ qua bằng `return` của callback:

```js
rows.forEach((row, index) => {
  if (!row.name) {
    errors.push(`Hàng ${index + 2}: Thiếu tên sản phẩm`);
    return;
  }
  stmt.run(/* từng product */);
});
```

Không có `db.run("BEGIN TRANSACTION")`, không có `db.run("ROLLBACK")`, và response được gửi sau `stmt.finalize` tại dòng 234-239. Vì vậy những insert thành công không được hoàn tác khi batch có lỗi. Quan sát source phù hợp với partial persistence trong bốn test atomicity.

## Nguồn yêu cầu

- `src/eshop-sut/README.md` — FR-16: nếu có lỗi ở bất kỳ dòng nào, toàn bộ import phải rollback theo giao dịch nguyên tử all-or-nothing.
- `reports/api-testing/fr-16-phase-a-contract.md` — rollback/atomicity contract và planned persistence verification cho FR-16.

## Tác động

Caller không thể tin rằng một batch thất bại để lại dữ liệu nguyên vẹn. Partial commit có thể tạo catalog thiếu hoặc không đồng bộ, gây khó retry vì các dòng đã được lưu, sinh duplicate và làm tăng chi phí khôi phục dữ liệu thủ công.

## Trạng thái Phase E

PHASE E: COMPLETE — LOCAL BUG REPORT CREATED

GITHUB ISSUE: NOT CREATED

CI/CD: NOT CREATED FOR FR-16

AI CRITIQUE: NOT CREATED
