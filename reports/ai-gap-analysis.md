# AI Gap Analysis - FR-12

## Phạm vi

Phân tích này đánh giá bộ test case FR-12 được tạo bằng Decision Table Testing và Pairwise Testing theo skill `decision-table-pairwise-fr12-eshop`.

## Đã cover

| Khu vực | Coverage |
| --- | --- |
| Web Admin UI | User thường bị từ chối truy cập phân hệ Admin. |
| `/api/admin/*` | Thiếu token, token không hợp lệ, token user, token admin. |
| API ghi dữ liệu products/categories/coupons | Thiếu token, token không hợp lệ, token user, token admin. |
| Endpoint ngoài phạm vi FR-12 | Kiểm tra public read API không bị bắt admin sai. |
| Pairwise bổ sung | Resource x method x auth state cho nhóm API ghi dữ liệu sau khi rút gọn decision table. |

## Khoảng trống còn lại

| Gap | Ảnh hưởng | Follow-up đề xuất |
| --- | --- | --- |
| SRS/API không quy định HTTP status code và message chính xác | Expected result không thể assert mã lỗi/message cụ thể | Khi chạy SUT, ghi lại response thực tế và báo bug nếu hành vi trái với requirement. |
| Chưa test token hết hạn thật | Token invalid đại diện cho token không hợp lệ, nhưng token expired có thể có xử lý riêng | Bổ sung test nếu có cách tạo token expired từ public flow hoặc test fixture hợp lệ. |
| Chưa exhaust tất cả endpoint `/api/admin/*` | Decision table test đại diện theo rule chung | Nếu có thời gian, lập endpoint inventory và thêm smoke test cho từng admin endpoint. |
| Khác biệt `/api/coupons` và `/api/admin/coupons` trong tài liệu | Có thể gây nhầm khi map endpoint coupon | Khi execute, ghi observation nếu một endpoint trong FR-12 không tồn tại hoặc endpoint thay thế không được bảo vệ đúng. |
| `PUT /api/coupons/:id` không tồn tại trong SUT | Pairwise case `TC-FR12-PW-006` không đánh giá được access-control cho route này | Cần xác nhận lại phạm vi FR-12/API specification: nếu route này phải có thì bổ sung bug chức năng thiếu endpoint; nếu không thuộc scope thì đánh dấu test case là N/A. |

## Ghi chú

Bộ test hiện tại ưu tiên black-box theo SRS/API. Không sử dụng source code, database schema, controller hay implementation để thiết kế expected result.
