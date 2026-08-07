# Test Cases — `FR-12: Access Control`

## Thông tin nguồn

| Mục | Giá trị |
| --- | --- |
| Đường dẫn HW02 | Người dùng cung cấp `test/test-cases/FR-12-access/domain-testing`; đường dẫn tồn tại thực tế: `tests/test-cases/FR-12-access/domain-testing/` |
| Trạng thái nguồn | Có HW02 — đủ `TC-FR12-DT-001` đến `TC-FR12-DT-040` |
| Lý do ngoại lệ | N/A |
| URL SUT | `http://localhost:3000` |
| Ngày đối chiếu | `2026-08-07T09:03:02.0373462+07:00` |
| Checkpoint A | Đã duyệt bằng prompt `approved, continue phase B` tại `2026-08-07T14:07:57.9159088+07:00` |

## Bảng đối chiếu ban đầu

| ID HW02 | Mô tả gốc | Quan sát thực tế | Trạng thái | Bằng chứng | Đề xuất xử lý |
| --- | --- | --- | --- | --- | --- |
| `TC-FR12-DT-001` | Danh sách users — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Giữ nguyên |
| `TC-FR12-DT-002` | Danh sách users — invalid token | Expected 401, actual 403 | Lệch / Fail | `evidence/phase-a-api-results.md` | Giữ expected 401 theo duyệt |
| `TC-FR12-DT-003` | Danh sách users — token user | 200 và trả users thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected 403 |
| `TC-FR12-DT-004` | Danh sách users — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Giữ nguyên |
| `TC-FR12-DT-005` | Xóa user — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Dùng user tạm runtime |
| `TC-FR12-DT-006` | Xóa user — token user | 200, user bị xóa thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng user tạm runtime |
| `TC-FR12-DT-007` | Xóa user — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Dùng user tạm runtime |
| `TC-FR12-DT-008` | Danh sách orders — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Giữ nguyên |
| `TC-FR12-DT-009` | Danh sách orders — token user | 200 và trả orders thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected 403 |
| `TC-FR12-DT-010` | Danh sách orders — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Giữ nguyên |
| `TC-FR12-DT-011` | Update order status — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Giữ order ID 1; state sạch |
| `TC-FR12-DT-012` | Update order status — token user | 200 và đổi status thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; cô lập state khỏi DT-013 |
| `TC-FR12-DT-013` | Update order status — token admin | Rerun sạch với order 1 pending trả 200 | Khớp | `evidence/phase-a-api-results.md#dt-013--probe-cả-id-1-và-id-2` | Giữ ID 1; sửa bước 3 từ ID 2 về ID 1 theo duyệt |
| `TC-FR12-DT-014` | Import products — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Payload tên unique runtime |
| `TC-FR12-DT-015` | Import products — token user | 200, import 1/1 thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; cleanup product tạm |
| `TC-FR12-DT-016` | Import products — token admin | 200, import 1/1 | Khớp | `evidence/phase-a-api-results.md` | Cleanup product tạm |
| `TC-FR12-DT-017` | Tạo coupon — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Code unique runtime |
| `TC-FR12-DT-018` | Tạo coupon — token user | 200 và tạo coupon thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; cleanup coupon tạm |
| `TC-FR12-DT-019` | Tạo coupon — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Cleanup coupon tạm |
| `TC-FR12-DT-020` | Xóa coupon — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Dùng coupon tạm runtime |
| `TC-FR12-DT-021` | Xóa coupon — token user | 200 và xóa coupon thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng coupon tạm runtime |
| `TC-FR12-DT-022` | Xóa coupon — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Dùng coupon tạm runtime |
| `TC-FR12-DT-023` | Tạo product — không token | 200 và tạo product thay vì 401 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; cleanup product tạm |
| `TC-FR12-DT-024` | Tạo product — token user | 200 và tạo product thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; cleanup product tạm |
| `TC-FR12-DT-025` | Tạo product — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Cleanup product tạm |
| `TC-FR12-DT-026` | Update product — không token | 200 và sửa product thay vì 401 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng product tạm runtime |
| `TC-FR12-DT-027` | Update product — token user | 200 và sửa product thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng product tạm runtime |
| `TC-FR12-DT-028` | Update product — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Dùng product tạm runtime |
| `TC-FR12-DT-029` | Xóa product — không token | 200 và xóa product thay vì 401 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng product tạm runtime |
| `TC-FR12-DT-030` | Xóa product — token user | 200 và xóa product thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng product tạm runtime |
| `TC-FR12-DT-031` | Xóa product — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Dùng product tạm runtime |
| `TC-FR12-DT-032` | Tạo category — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Name unique runtime |
| `TC-FR12-DT-033` | Tạo category — token user | 200 và tạo category thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; cleanup category tạm |
| `TC-FR12-DT-034` | Tạo category — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Cleanup category tạm |
| `TC-FR12-DT-035` | Update category — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Dùng category tạm runtime |
| `TC-FR12-DT-036` | Update category — token user | 200 và sửa category thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng category tạm runtime |
| `TC-FR12-DT-037` | Update category — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Dùng category tạm runtime |
| `TC-FR12-DT-038` | Xóa category — không token | 401 | Khớp | `evidence/phase-a-api-results.md` | Dùng category tạm runtime |
| `TC-FR12-DT-039` | Xóa category — token user | 200 và xóa category thay vì 403 | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; dùng category tạm runtime |
| `TC-FR12-DT-040` | Xóa category — token admin | 200 | Khớp | `evidence/phase-a-api-results.md` | Dùng category tạm runtime |

## Bộ test case cuối

| ID | Tiêu đề | Loại | Tiền điều kiện | Input / fixture key | Bước chính | Expected | Nguồn | Ghi chú thay đổi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TC-FR12-DT-001` | Danh sách users không token | negative | SUT hoạt động | `cases.DT001` | GET admin users, không Authorization | HTTP 401; không trả tài nguyên | HW02 | Không đổi |
| `TC-FR12-DT-002` | Danh sách users với invalid token | negative | SUT hoạt động | `cases.DT002` | GET admin users với invalid bearer | HTTP **401**; mọi status khác là Fail | HW02 | Expected 401 được duyệt giữ nguyên |
| `TC-FR12-DT-003` | Danh sách users với token user | negative | Login user thành công | `cases.DT003` | GET admin users với user token | HTTP 403; không trả danh sách users | HW02 | Không đổi expected |
| `TC-FR12-DT-004` | Danh sách users với token admin | positive | Login admin thành công | `cases.DT004` | GET admin users với admin token | HTTP 200; trả danh sách users | HW02 | Không đổi |
| `TC-FR12-DT-005` | Xóa user không token | negative | Tạo user tạm riêng cho case | `cases.DT005` | DELETE admin users/{runtimeUserId}, không token | HTTP 401; user vẫn tồn tại | HW02 | Thay ID 2 bằng user tạm để bảo vệ seed |
| `TC-FR12-DT-006` | Xóa user với token user | negative | Login user; tạo user tạm riêng | `cases.DT006` | DELETE admin users/{runtimeUserId} với user token | HTTP 403; user vẫn tồn tại | HW02 | Thay ID 2 bằng user tạm; expected không đổi |
| `TC-FR12-DT-007` | Xóa user với token admin | positive | Login admin; tạo user tạm riêng | `cases.DT007` | DELETE admin users/{runtimeUserId} với admin token | HTTP 200; user bị xóa | HW02 | Thay ID 2 bằng user tạm |
| `TC-FR12-DT-008` | Danh sách orders không token | negative | SUT hoạt động | `cases.DT008` | GET admin orders, không token | HTTP 401; không trả orders | HW02 | Không đổi |
| `TC-FR12-DT-009` | Danh sách orders với token user | negative | Login user; có order mẫu | `cases.DT009` | GET admin orders với user token | HTTP 403; không trả orders | HW02 | Không đổi expected |
| `TC-FR12-DT-010` | Danh sách orders với token admin | positive | Login admin; có order mẫu | `cases.DT010` | GET admin orders với admin token | HTTP 200; trả orders | HW02 | Không đổi |
| `TC-FR12-DT-011` | Update order 1 không token | negative | Backend state sạch; tạo order ID 1 pending | `cases.DT011` | PUT admin orders/1/status, không token | HTTP 401; status order không đổi | HW02 | Cô lập state trước case |
| `TC-FR12-DT-012` | Update order 1 với token user | negative | Backend state sạch; login user; tạo order ID 1 pending | `cases.DT012` | PUT admin orders/1/status với user token | HTTP 403; status order không đổi | HW02 | Cô lập state; expected không đổi |
| `TC-FR12-DT-013` | Update order 1 với token admin | positive | Backend state sạch; login admin; flow checkout tạo order ID 1 pending | `cases.DT013` | PUT admin orders/1/status với admin token | HTTP 200; order 1 thành `confirmed` | HW02 | Đã duyệt giữ ID 1; sửa bước 3 từ ID 2 về ID 1 |
| `TC-FR12-DT-014` | Import products không token | negative | Payload có product name unique | `cases.DT014` | POST admin import-products, không token | HTTP 401; không tạo product | HW02 | Dữ liệu unique runtime |
| `TC-FR12-DT-015` | Import products với token user | negative | Login user; payload unique | `cases.DT015` | POST admin import-products với user token | HTTP 403; không tạo product | HW02 | Expected không đổi; cleanup nếu SUT lệch |
| `TC-FR12-DT-016` | Import products với token admin | positive | Login admin; payload unique | `cases.DT016` | POST admin import-products với admin token | HTTP 200; import thành công | HW02 | Cleanup product tạm sau case |
| `TC-FR12-DT-017` | Tạo coupon không token | negative | Coupon code unique | `cases.DT017` | POST admin coupons, không token | HTTP 401; không tạo coupon | HW02 | Dữ liệu unique runtime |
| `TC-FR12-DT-018` | Tạo coupon với token user | negative | Login user; coupon code unique | `cases.DT018` | POST admin coupons với user token | HTTP 403; không tạo coupon | HW02 | Expected không đổi; cleanup nếu SUT lệch |
| `TC-FR12-DT-019` | Tạo coupon với token admin | positive | Login admin; coupon code unique | `cases.DT019` | POST admin coupons với admin token | HTTP 200; coupon được tạo | HW02 | Cleanup coupon tạm |
| `TC-FR12-DT-020` | Xóa coupon không token | negative | Tạo coupon tạm riêng | `cases.DT020` | DELETE admin coupons/{runtimeCouponId}, không token | HTTP 401; coupon vẫn tồn tại | HW02 | Thay ID 1 bằng coupon tạm |
| `TC-FR12-DT-021` | Xóa coupon với token user | negative | Login user; tạo coupon tạm riêng | `cases.DT021` | DELETE admin coupons/{runtimeCouponId} với user token | HTTP 403; coupon vẫn tồn tại | HW02 | Thay ID 1 bằng coupon tạm; expected không đổi |
| `TC-FR12-DT-022` | Xóa coupon với token admin | positive | Login admin; tạo coupon tạm riêng | `cases.DT022` | DELETE admin coupons/{runtimeCouponId} với admin token | HTTP 200; coupon bị xóa | HW02 | Thay ID 1 bằng coupon tạm |
| `TC-FR12-DT-023` | Tạo product không token | negative | Product name unique | `cases.DT023` | POST products, không token | HTTP 401; không tạo product | HW02 | Cleanup nếu SUT lệch |
| `TC-FR12-DT-024` | Tạo product với token user | negative | Login user; product name unique | `cases.DT024` | POST products với user token | HTTP 403; không tạo product | HW02 | Expected không đổi; cleanup nếu SUT lệch |
| `TC-FR12-DT-025` | Tạo product với token admin | positive | Login admin; product name unique | `cases.DT025` | POST products với admin token | HTTP 200; product được tạo | HW02 | Cleanup product tạm |
| `TC-FR12-DT-026` | Update product không token | negative | Tạo product tạm riêng | `cases.DT026` | PUT products/{runtimeProductId}, không token | HTTP 401; product không đổi | HW02 | Thay ID 1 bằng product tạm |
| `TC-FR12-DT-027` | Update product với token user | negative | Login user; tạo product tạm riêng | `cases.DT027` | PUT products/{runtimeProductId} với user token | HTTP 403; product không đổi | HW02 | Thay ID 1 bằng product tạm; expected không đổi |
| `TC-FR12-DT-028` | Update product với token admin | positive | Login admin; tạo product tạm riêng | `cases.DT028` | PUT products/{runtimeProductId} với admin token | HTTP 200; product được cập nhật | HW02 | Thay ID 1 bằng product tạm |
| `TC-FR12-DT-029` | Xóa product không token | negative | Tạo product tạm riêng | `cases.DT029` | DELETE products/{runtimeProductId}, không token | HTTP 401; product vẫn tồn tại | HW02 | Thay ID 1 bằng product tạm |
| `TC-FR12-DT-030` | Xóa product với token user | negative | Login user; tạo product tạm riêng | `cases.DT030` | DELETE products/{runtimeProductId} với user token | HTTP 403; product vẫn tồn tại | HW02 | Thay ID 1 bằng product tạm; expected không đổi |
| `TC-FR12-DT-031` | Xóa product với token admin | positive | Login admin; tạo product tạm riêng | `cases.DT031` | DELETE products/{runtimeProductId} với admin token | HTTP 200; product bị xóa | HW02 | Thay ID 1 bằng product tạm |
| `TC-FR12-DT-032` | Tạo category không token | negative | Category name unique | `cases.DT032` | POST categories, không token | HTTP 401; không tạo category | HW02 | Dữ liệu unique runtime |
| `TC-FR12-DT-033` | Tạo category với token user | negative | Login user; category name unique | `cases.DT033` | POST categories với user token | HTTP 403; không tạo category | HW02 | Expected không đổi; cleanup nếu SUT lệch |
| `TC-FR12-DT-034` | Tạo category với token admin | positive | Login admin; category name unique | `cases.DT034` | POST categories với admin token | HTTP 200; category được tạo | HW02 | Cleanup category tạm |
| `TC-FR12-DT-035` | Update category không token | negative | Tạo category tạm riêng | `cases.DT035` | PUT categories/{runtimeCategoryId}, không token | HTTP 401; category không đổi | HW02 | Thay ID 1 bằng category tạm |
| `TC-FR12-DT-036` | Update category với token user | negative | Login user; tạo category tạm riêng | `cases.DT036` | PUT categories/{runtimeCategoryId} với user token | HTTP 403; category không đổi | HW02 | Thay ID 1 bằng category tạm; expected không đổi |
| `TC-FR12-DT-037` | Update category với token admin | positive | Login admin; tạo category tạm riêng | `cases.DT037` | PUT categories/{runtimeCategoryId} với admin token | HTTP 200; category được cập nhật | HW02 | Thay ID 1 bằng category tạm |
| `TC-FR12-DT-038` | Xóa category không token | negative | Tạo category tạm riêng | `cases.DT038` | DELETE categories/{runtimeCategoryId}, không token | HTTP 401; category vẫn tồn tại | HW02 | Thay ID 1 bằng category tạm |
| `TC-FR12-DT-039` | Xóa category với token user | negative | Login user; tạo category tạm riêng | `cases.DT039` | DELETE categories/{runtimeCategoryId} với user token | HTTP 403; category vẫn tồn tại | HW02 | Thay ID 1 bằng category tạm; expected không đổi |
| `TC-FR12-DT-040` | Xóa category với token admin | positive | Login admin; tạo category tạm riêng | `cases.DT040` | DELETE categories/{runtimeCategoryId} với admin token | HTTP 200; category bị xóa | HW02 | Thay ID 1 bằng category tạm |

## Kiểm tra số lượng và nguồn

| Chỉ số | Giá trị |
| --- | ---: |
| Tổng case HW02 | 40 |
| Tổng case bổ sung | 0 |
| Tổng cuối | 40 |
| Case lệch đã được duyệt điều chỉnh | 2 (`DT-002` giữ expected 401; `DT-013` thống nhất ID 1 và state sạch) |

Không có case `Trùng lặp`: 40 case khác nhau về endpoint/method hoặc partition token/role và được giữ là 40 điểm kiểm tra độc lập.

## Điểm chưa rõ

| STT | Giả định / điểm chưa rõ | Case ảnh hưởng | Câu hỏi cần xác nhận | Quyết định người duyệt |
| ---: | --- | --- | --- | --- |
| 1 | Dùng resource tạm sinh runtime thay ID seed cho thao tác xóa/sửa nguy hiểm | `DT-005–007`, `DT-020–022`, `DT-026–031`, `DT-035–040` | Có duyệt chiến lược resource tạm để giữ độc lập và bảo vệ seed không? | Đã duyệt |
| 2 | Các mutation negative thực tế có thể thành công do SUT defect | `DT-006`, `DT-012`, `DT-015`, `DT-018`, `DT-021`, `DT-023–024`, `DT-026–027`, `DT-029–030`, `DT-033`, `DT-036`, `DT-039` | Có duyệt cleanup best-effort trong teardown nhưng vẫn giữ assertion expected nguyên bản không? | Đã duyệt |
| 3 | DT-011/012/013 cùng dùng ID 1 nhưng không được chia sẻ state | `DT-011–013` | Có duyệt reset/tạo lại order 1 cho từng case để tránh phụ thuộc thứ tự không? | Đã duyệt; khuyến nghị chạy lại `node database.js` trước từng DT-011/012/013 |

## Quy trình khởi động được cung cấp

Chạy từ workspace trước khi bắt đầu test:

1. Backend: tại `src/eshop-sut/backend`, chạy `node database.js`, sau đó `node server.js`.
2. Frontend Web: tại `src/eshop-sut/frontend-web`, chạy `npm run dev`.
3. Frontend Admin: tại `src/eshop-sut/frontend-admin`, chạy `npm run dev`.

Các server dài hạn phải chạy nền và được kiểm tra health/port trước suite. Người dùng đã cho phép và khuyến nghị chạy lại `node database.js` trước từng DT-011/012/013 để cô lập order ID 1; automation phải kiểm tra reset thành công trước khi tiếp tục case.

## Checkpoint B

- Trạng thái: `Đã duyệt`
- Người duyệt: Người dùng
- Bằng chứng xác nhận: prompt duyệt ba quyết định tại `2026-08-07T14:13:22.3716335+07:00`
- Chỉ bắt đầu viết code sau khi trạng thái là `Đã duyệt`.
