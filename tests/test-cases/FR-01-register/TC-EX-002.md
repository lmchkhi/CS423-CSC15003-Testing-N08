# TC-EX-002: Body rỗng được chấp nhận (chèn NULL)

## Mã yêu cầu
FR-01, SEC-01, SEC-05

## Module / Loại kiểm thử / Kỹ thuật
Register API / Functional / Bảo mật / Kiểm thử miền API / Schema / Bảo mật

## Phân tích miền

### Biến đầu vào & miền giá trị

| Biến | Kiểu | Miền giá trị / Ràng buộc |
|---|---|---|
| name | String | Họ tên người dùng là bắt buộc; bao phủ rỗng, thiếu field, chỉ khoảng trắng, quá dài, Unicode, chỉ số và ký tự đặc biệt. |
| email | String | Email là bắt buộc và phải duy nhất; bao phủ định dạng hợp lệ, sai định dạng, trùng, khoảng trắng, quá dài, payload SQL/XSS. |
| password | String | Mật khẩu là bắt buộc; bao phủ hợp lệ, rỗng, thiếu field, quá ngắn, yếu, chỉ khoảng trắng, quá dài và payload dạng injection. |
| response contract | HTTP + JSON | Thành công trả 200 với message và id kiểu integer; input không hợp lệ phải bị từ chối hoặc ghi nhận theo hành vi thực tế của SUT. |

### Ma trận miền

| TC | Dữ liệu / Hành động | Tiền điều kiện | Kết quả mong đợi | Oracle kiểm thử |
|---|---|---|---|---|
| TC-EX-002 | POST body JSON rỗng `{}`. | Không có. | Phải từ chối thiếu field bắt buộc với 400. | Nếu SUT trả 200, hệ thống đã chấp nhận body rỗng không hợp lệ và cần báo bug. |

## Tiền điều kiện
- Backend API đang chạy tại `http://localhost:3000`.
- Request có header `X-Student-Id: 23127300`.
- Trạng thái database đã được reset hoặc dùng email động duy nhất khi cần.

## Dữ liệu kiểm thử

| Trường | Giá trị |
|---|---|
| Endpoint | `POST /api/register` |
| Body | `{}` |

## Các bước kiểm thử
1. Gửi API request theo dữ liệu kiểm thử đã mô tả.
2. Ghi nhận HTTP status, content type và response body.
3. Đối chiếu response với status/schema mong đợi và oracle bảo mật.
4. Nếu hành vi quan sát được vi phạm yêu cầu, liên kết bug report tương ứng.

## Kết quả mong đợi
Phải từ chối thiếu field bắt buộc với 400.

Oracle: Nếu SUT trả 200, hệ thống đã chấp nhận body rỗng không hợp lệ và cần báo bug.

## Trạng thái / Bug liên quan
Đã thiết kế / Có bao phủ bug đã biết / [BUG-FR01-002](../../../bug-reports/BUG-FR01-002.md)
