# FR-12 Phase A — Black-box API Evidence

## Run metadata

| Mục | Giá trị |
| --- | --- |
| Feature | `FR-12 Access Control` |
| Run by | `23127464` |
| SUT | `http://localhost:3000` |
| Thời điểm chạy | `07/08/2026 08:37` |
| Kiểm tra cleanup | `07/08/2026 08:38` |
| Cách chạy | PowerShell HTTP client (`Invoke-WebRequest`), tương tác hộp đen; token chỉ giữ trong bộ nhớ và không ghi vào artifact |
| Exit code harness | `0` |
| Login user/admin | `200` / `200` |

## Kết quả 40 test case

Các thao tác có khả năng xóa/sửa dữ liệu seed dùng resource tạm sinh runtime. Điều này giữ nguyên partition access-control, method và endpoint pattern của HW02 nhưng không phá hủy user/product/category seed.

| ID | Request/đối tượng thực chạy | Expected HW02 | Actual | Đối chiếu | Bằng chứng quan sát |
| --- | --- | ---: | ---: | --- | --- |
| `DT-001` | `GET /api/admin/users`, không token | 401 | 401 | Khớp | Request bị từ chối. |
| `DT-002` | `GET /api/admin/users`, `Bearer invalid_token_xyz123` | 401 | 403 | Lệch / Fail | Người dùng đã duyệt giữ expected 401; actual khác expected phải Fail. Đây là case duy nhất thực sự gửi invalid token. |
| `DT-003` | `GET /api/admin/users`, token user | 403 | 200 | Lệch | Trả danh sách users, gồm cả role. |
| `DT-004` | `GET /api/admin/users`, token admin | 200 | 200 | Khớp | Trả danh sách users. |
| `DT-005` | `DELETE /api/admin/users/3`, không token | 401 | 401 | Khớp | Dùng user tạm thay ID 2 để không xóa tài khoản seed. |
| `DT-006` | `DELETE /api/admin/users/4`, token user | 403 | 200 | Lệch | Body `User deleted`; user tạm thực sự bị xóa. |
| `DT-007` | `DELETE /api/admin/users/5`, token admin | 200 | 200 | Khớp | Body `User deleted`. |
| `DT-008` | `GET /api/admin/orders`, không token | 401 | 401 | Khớp | Request bị từ chối. |
| `DT-009` | `GET /api/admin/orders`, token user | 403 | 200 | Lệch | Trả danh sách orders. |
| `DT-010` | `GET /api/admin/orders`, token admin | 200 | 200 | Khớp | Trả danh sách orders. |
| `DT-011` | `PUT /api/admin/orders/1/status`, không token | 401 | 401 | Khớp | Không đổi trạng thái order. |
| `DT-012` | `PUT /api/admin/orders/1/status`, token user | 403 | 200 | Lệch | Body `Order status updated`; order 1 đổi `pending` → `confirmed`. |
| `DT-013` | `PUT /api/admin/orders/1/status`, token admin | 200 | 200 | Khớp | Rerun cô lập sau reset: checkout tạo order 1 `pending`; admin cập nhật thành `confirmed`, body `Order status updated`. |
| `DT-014` | `POST /api/admin/import-products`, không token | 401 | 401 | Khớp | Không import sản phẩm. |
| `DT-015` | `POST /api/admin/import-products`, token user | 403 | 200 | Lệch | `1/1` sản phẩm được thêm; đã cleanup. |
| `DT-016` | `POST /api/admin/import-products`, token admin | 200 | 200 | Khớp | `1/1` sản phẩm được thêm; đã cleanup. |
| `DT-017` | `POST /api/admin/coupons`, không token | 401 | 401 | Khớp | Không tạo coupon. |
| `DT-018` | `POST /api/admin/coupons`, token user | 403 | 200 | Lệch | Coupon tạm ID 5 được tạo; đã cleanup. |
| `DT-019` | `POST /api/admin/coupons`, token admin | 200 | 200 | Khớp | Coupon tạm ID 6 được tạo; đã cleanup. |
| `DT-020` | `DELETE /api/admin/coupons/7`, không token | 401 | 401 | Khớp | Coupon tạm không bị xóa bởi request này; cleanup bằng admin. |
| `DT-021` | `DELETE /api/admin/coupons/8`, token user | 403 | 200 | Lệch | Body `Coupon deleted`. |
| `DT-022` | `DELETE /api/admin/coupons/9`, token admin | 200 | 200 | Khớp | Body `Coupon deleted`. |
| `DT-023` | `POST /api/products`, không token | 401 | 200 | Lệch | Product tạm ID 8 được tạo; đã cleanup. |
| `DT-024` | `POST /api/products`, token user | 403 | 200 | Lệch | Product tạm ID 9 được tạo; đã cleanup. |
| `DT-025` | `POST /api/products`, token admin | 200 | 200 | Khớp | Product tạm ID 10 được tạo; đã cleanup. |
| `DT-026` | `PUT /api/products/11`, không token | 401 | 200 | Lệch | Body `Product updated`; resource tạm đã cleanup. |
| `DT-027` | `PUT /api/products/12`, token user | 403 | 200 | Lệch | Body `Product updated`; resource tạm đã cleanup. |
| `DT-028` | `PUT /api/products/13`, token admin | 200 | 200 | Khớp | Body `Product updated`; resource tạm đã cleanup. |
| `DT-029` | `DELETE /api/products/14`, không token | 401 | 200 | Lệch | Body `Product deleted`. |
| `DT-030` | `DELETE /api/products/15`, token user | 403 | 200 | Lệch | Body `Product deleted`. |
| `DT-031` | `DELETE /api/products/16`, token admin | 200 | 200 | Khớp | Body `Product deleted`. |
| `DT-032` | `POST /api/categories`, không token | 401 | 401 | Khớp | Không tạo category. |
| `DT-033` | `POST /api/categories`, token user | 403 | 200 | Lệch | Category tạm ID 4 được tạo; đã cleanup. |
| `DT-034` | `POST /api/categories`, token admin | 200 | 200 | Khớp | Category tạm ID 5 được tạo; đã cleanup. |
| `DT-035` | `PUT /api/categories/6`, không token | 401 | 401 | Khớp | Category tạm không bị sửa; đã cleanup bằng admin. |
| `DT-036` | `PUT /api/categories/7`, token user | 403 | 200 | Lệch | Body `Category updated`; đã cleanup. |
| `DT-037` | `PUT /api/categories/8`, token admin | 200 | 200 | Khớp | Body `Category updated`; đã cleanup. |
| `DT-038` | `DELETE /api/categories/9`, không token | 401 | 401 | Khớp | Category tạm không bị xóa; đã cleanup bằng admin. |
| `DT-039` | `DELETE /api/categories/10`, token user | 403 | 200 | Lệch | Body `Category deleted`. |
| `DT-040` | `DELETE /api/categories/11`, token admin | 200 | 200 | Khớp | Body `Category deleted`. |

Tổng hợp giữ nguyên expected HW02 sau rerun DT-013: `23 Khớp`, `17 Lệch`, `0 Không xác định`.

## DT-013 — probe cả ID 1 và ID 2

Trước lần chạy không có order. Hai lần checkout hộp đen đã tạo order ID 1 và 2 ở trạng thái `pending` để thỏa precondition.

| ID request | Trạng thái ngay trước request admin DT-013 | Actual | Kết quả |
| --- | --- | ---: | --- |
| `/api/admin/orders/1/status` | `confirmed` do DT-012 vừa chứng minh token user có thể cập nhật | 400 | Không thể xác nhận expected 200 trong chuỗi chạy hiện tại. |
| `/api/admin/orders/2/status` | `pending`, chưa bị case trước tác động | 200 | Body `Order status updated`; chuyển sang `confirmed`. |

Kết quả chứng minh ID trong bước 3 ảnh hưởng trực tiếp đến tính độc lập của test. ID 2 cho kết quả 200 khi chạy sau DT-012; ID 1 bị phụ thuộc trạng thái do DT-012. Không tự chọn ID thay người thiết kế HW02.

Quyết định của người dùng tại `07/08/2026 08:56`: giữ ID 1 và tái kiểm chứng từ state sạch. Người dùng reset backend; lần rerun lúc `07/08/2026 09:03` quan sát không có order, checkout trả 200 và tạo order 1 ở `pending`; `PUT /api/admin/orders/1/status` với admin token trả 200, body `Order status updated`, order 1 chuyển sang `confirmed`. Expected 200 được giữ nguyên và DT-013 được chốt `Khớp`.

## Invalid-token inventory

- Chỉ `TC-FR12-DT-002` chứa một input cụ thể thực thi invalid token (`invalid_token_xyz123`).
- Cả 40 file đều lặp mô tả domain tổng quát “Sai/hết hạn”, nhưng 39 file còn lại chỉ thực thi partition không-token, valid-user hoặc valid-admin; chúng không phải invalid-token test case riêng.
- FR-08 DT-003 ban đầu cho phép `401/403`, nhưng artifact cuối của FR-08 đã chốt `403` theo quan sát/duyệt. Người dùng đã quyết định FR-12 DT-002 giữ expected duy nhất `401`; actual 403 được đánh Fail.

## Hai mẫu lỗi access-control quan sát được

### Mẫu A — valid user token vượt quyền

13 case valid-user nhận 200 thay vì 403:

`DT-003`, `DT-006`, `DT-009`, `DT-012`, `DT-015`, `DT-018`, `DT-021`, `DT-024`, `DT-027`, `DT-030`, `DT-033`, `DT-036`, `DT-039`.

Con số 13 **bao gồm** 3 case `/api/products` (`DT-024/027/030`). Nếu loại `/api/products`, còn đúng 10 case, không phải 13.

### Mẫu B — product mutations chấp nhận cả request không token

`DT-023`, `DT-026`, `DT-029` nhận 200 và thực sự tạo/sửa/xóa product khi không có `Authorization`.

Đối chứng `/api/categories`:

- Không token: `DT-032/035/038` đều 401.
- Token user: `DT-033/036/039` đều 200 thay vì 403.

Vì vậy có hai tầng hành vi khác nhau: categories/admin endpoints có authentication gate nhưng thiếu authorization theo role; product mutations còn chấp nhận request hoàn toàn không xác thực. Quan sát hộp đen không thể khẳng định cấu trúc middleware nội bộ, nhưng đủ chứng minh đây không phải cùng một biểu hiện bề mặt.

## Cleanup và side effects

- Lần chạy ma trận ban đầu đã cleanup 3 user tạm, 11 product tạm, 8 category tạm và 5 coupon tạm. Sau đó người dùng đã reset backend nên state/order của lần chạy ban đầu không còn là state hiện hành.
- Rerun DT-013 tạo một order ID 1 qua checkout để thỏa precondition; order này hiện ở trạng thái `confirmed`. Không có API công khai để xóa order hoặc đưa `confirmed` về `pending`.
