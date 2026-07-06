# FR-03: Quên mật khẩu & Đặt lại mật khẩu - Test Design Analysis (Use Case Testing)

## Requirement ID

FR-03

## Technique

Use Case Testing

## Source Documents

| Source | Relevant information |
| --- | --- |
| `SystemRequirementsSpecification.md` | FR-03 mô tả luồng 2 bước: lấy OTP bằng email đã đăng ký, OTP 6 chữ số hiển thị trong demo, Step Indicator, nút Quay lại đăng nhập, nhập OTP/mật khẩu mới/xác nhận mật khẩu mới, mật khẩu theo rule FR-01, confirm phải khớp, OTP chỉ hợp lệ cho email đã yêu cầu. |
| `api_specification.md` | `POST /api/forgot-password` nhận `email` và trả `resetToken`; `POST /api/reset-password` nhận `email`, `resetToken`, `newPassword`. |
| `requirement.md` | FR03 thuộc pool Authentication, Categories, and Products. |
| `reports/main-report.md` | Phần FR-03 Domain Testing đã xác định các biến/flow quan trọng: email, Step Indicator, nút quay lại đăng nhập, trạng thái đã/chưa lấy OTP, OTP, mật khẩu mới, xác nhận mật khẩu mới. |

## Scope

Phân tích này mô hình hóa FR-03 ở mức use case: mục tiêu của actor, precondition, postcondition, main success scenario, alternative flows và exception flows. File này dùng làm nguồn thiết kế trước khi tạo test case chi tiết trong:

```text
tests/test-cases/FR-03-forgot-password/use-case-testing/
```

## Black-box Principles

- Không dùng source code, database schema, controller, model hoặc implementation detail để thiết kế use case/flow.
- Expected result dựa trên SRS và API specification công khai.
- Nếu UI/API thực tế khác đặc tả, giữ expected result theo đặc tả và ghi nhận bug/test observation khi thực thi.
- Use Case Testing tập trung vào mục tiêu người dùng và luồng từ đầu đến cuối; không thay thế Domain Testing/BVA đã có cho từng input field.

## Assumptions

- Actor chính là guest/user đã có tài khoản nhưng không đăng nhập được vì quên mật khẩu.
- Email `test@eshop.com` là email đã đăng ký trong môi trường test.
- Mật khẩu mới hợp lệ mẫu là `NewPass123!` hoặc chuỗi tương đương đáp ứng rule FR-01.
- SRS yêu cầu UI có trường Xác nhận mật khẩu mới; `api_specification.md` chỉ nêu `newPassword`, nên test use case trên UI vẫn phải kiểm tra confirm password như một bước bắt buộc.
- Demo hiển thị OTP trực tiếp trên màn hình thay vì gửi email thật; khi thực thi không ghi OTP thật còn hiệu lực vào report/log.

## Use Case Model

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Supporting systems | Frontend Web, Backend API, OTP/reset token demo |
| Goal | Lấy OTP cho email đã đăng ký và đặt lại mật khẩu để có thể đăng nhập lại |
| Trigger | Actor chọn chức năng Quên mật khẩu từ màn hình Đăng nhập |
| Preconditions | Hệ thống EShop đang hoạt động; actor có email đã đăng ký; actor đang ở trạng thái chưa đăng nhập hoặc không dùng được mật khẩu hiện tại |
| Success postconditions | OTP hợp lệ được dùng đúng email; mật khẩu tài khoản được đổi sang mật khẩu mới hợp lệ; actor được điều hướng về Login hoặc có thể đăng nhập bằng mật khẩu mới |
| Failure postconditions | Mật khẩu cũ không bị thay đổi; không sinh OTP/reset token khi email không hợp lệ; không reset khi OTP/password/confirm không hợp lệ; actor nhận thông báo lỗi phù hợp |

### Actors And Responsibilities

| Actor / System | Responsibility |
| --- | --- |
| Guest/user đã có tài khoản | Nhập email, nhận/đọc OTP demo, nhập OTP, nhập mật khẩu mới và xác nhận mật khẩu mới |
| Frontend Web | Hiển thị flow 2 bước, Step Indicator, nút Quay lại đăng nhập, validation message, điều hướng sau thành công |
| Backend API | Sinh OTP/reset token qua `POST /api/forgot-password`, xác thực OTP/email/password qua `POST /api/reset-password`, cập nhật mật khẩu nếu hợp lệ |

## Main Success Scenario

| Step | Actor action | System response / Expected state |
| --- | --- | --- |
| MF-01.1 | Actor mở chức năng Quên mật khẩu từ Login | Hệ thống hiển thị bước lấy OTP, Step Indicator và nút Quay lại đăng nhập. |
| MF-01.2 | Actor nhập email đã đăng ký, ví dụ `test@eshop.com` | Hệ thống chấp nhận email hợp lệ. |
| MF-01.3 | Actor gửi yêu cầu lấy OTP | Hệ thống gọi/ xử lý `POST /api/forgot-password`, sinh OTP 6 chữ số và hiển thị OTP trong môi trường demo. |
| MF-01.4 | Actor chuyển sang bước đặt lại mật khẩu | Hệ thống hiển thị form nhập OTP, mật khẩu mới và xác nhận mật khẩu mới. |
| MF-01.5 | Actor nhập OTP đúng, mật khẩu mới hợp lệ và confirm khớp | Hệ thống chấp nhận dữ liệu reset. |
| MF-01.6 | Actor submit đặt lại mật khẩu | Hệ thống gọi/ xử lý `POST /api/reset-password`, đổi mật khẩu thành công. |
| MF-01.7 | Actor hoàn tất flow | Hệ thống điều hướng về Login hoặc cho phép đăng nhập lại bằng mật khẩu mới. |

## Alternative Flows

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| AF-01 | Alternative | Actor chọn nút Quay lại đăng nhập ở bước lấy OTP | Actor được điều hướng về màn hình Đăng nhập; không sinh OTP mới; mật khẩu không đổi. |
| AF-02 | Alternative | Actor request OTP lại cho cùng email đã đăng ký nếu UI/API cho phép retry | OTP mới hợp lệ thay thế/đại diện cho lần request mới; actor vẫn ở flow đặt lại mật khẩu; mật khẩu chưa đổi cho đến khi reset thành công. |
| AF-03 | Alternative | Actor nhập email đã đăng ký với khác biệt chữ hoa/thường hoặc khoảng trắng đầu/cuối nếu UI cho phép | Hệ thống xử lý nhất quán theo đặc tả/validation công khai; nếu email được normalize thì vẫn sinh OTP cho đúng tài khoản, nếu không thì báo lỗi phù hợp. |

## Exception Flows

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-01 | Exception | Email rỗng ở bước lấy OTP | Không gọi reset flow thành công; không sinh OTP; hiển thị lỗi bắt buộc nhập email; mật khẩu không đổi. |
| EF-02 | Exception | Email sai định dạng ở bước lấy OTP | Không sinh OTP; hiển thị lỗi định dạng email; không dùng chung message với email chưa đăng ký nếu UI có khả năng phân biệt. |
| EF-03 | Exception | Email đúng định dạng nhưng chưa đăng ký | Không sinh OTP cho tài khoản không tồn tại; hiển thị lỗi phù hợp; không tiết lộ thông tin nhạy cảm ngoài phạm vi đặc tả. |
| EF-04 | Exception | Actor cố reset khi chưa lấy OTP hợp lệ | Reset bị từ chối; mật khẩu không đổi; actor nhận message yêu cầu OTP hợp lệ. |
| EF-05 | Exception | OTP sai hoặc không khớp email đã yêu cầu | Reset bị từ chối; mật khẩu không đổi; actor nhận lỗi OTP/email không hợp lệ. |
| EF-06 | Exception | OTP được lấy cho email khác rồi dùng để reset `test@eshop.com` | Reset bị từ chối vì OTP không thuộc email cần reset; mật khẩu của cả hai tài khoản không đổi. |
| EF-07 | Exception | Mật khẩu mới yếu/không đáp ứng rule FR-01 | Reset bị từ chối; mật khẩu không đổi; actor nhận lỗi password strength. |
| EF-08 | Exception | Xác nhận mật khẩu mới không khớp mật khẩu mới | Reset bị từ chối ở UI/use case; mật khẩu không đổi; actor nhận lỗi confirm mismatch. |
| EF-09 | Exception | Mật khẩu mới rỗng | Reset bị từ chối; mật khẩu không đổi; actor nhận lỗi bắt buộc nhập mật khẩu mới. |

## Use Case Coverage Matrix

| Candidate TC | Flow ID | Coverage reason | Expected result summary |
| --- | --- | --- | --- |
| TC-FR03-UC-001 | MF-01 | Bao phủ happy path end-to-end: lấy OTP bằng email đã đăng ký và reset bằng OTP/mật khẩu/confirm hợp lệ. | Mật khẩu được đổi thành công; actor về Login hoặc đăng nhập được bằng mật khẩu mới. |
| TC-FR03-UC-002 | AF-01 | Bao phủ alternative navigation: actor thoát flow bằng nút Quay lại đăng nhập. | Điều hướng về Login; không sinh OTP mới; mật khẩu không đổi. |
| TC-FR03-UC-003 | EF-01 | Bao phủ exception ở bước đầu use case: thiếu email. | Không sinh OTP; hiển thị lỗi bắt buộc nhập email. |
| TC-FR03-UC-004 | EF-02 | Bao phủ exception validation: email sai định dạng. | Không sinh OTP; hiển thị lỗi định dạng email phù hợp. |
| TC-FR03-UC-005 | EF-03 | Bao phủ exception business rule: email chưa đăng ký. | Không sinh OTP; flow không chuyển sang reset thành công. |
| TC-FR03-UC-006 | EF-04 | Bao phủ lỗi precondition: reset khi chưa lấy OTP. | Reset bị từ chối; mật khẩu không đổi. |
| TC-FR03-UC-007 | EF-05 | Bao phủ lỗi OTP sai trong bước reset. | Reset bị từ chối; mật khẩu không đổi. |
| TC-FR03-UC-008 | EF-06 | Bao phủ ràng buộc liên actor/data: OTP của email khác. | Reset bị từ chối; OTP không dùng chéo tài khoản. |
| TC-FR03-UC-009 | EF-07 | Bao phủ lỗi mật khẩu mới yếu. | Reset bị từ chối; mật khẩu không đổi. |
| TC-FR03-UC-010 | EF-08 | Bao phủ lỗi confirm password không khớp. | Reset bị từ chối; mật khẩu không đổi. |
| TC-FR03-UC-011 | EF-09 | Bao phủ lỗi mật khẩu mới rỗng. | Reset bị từ chối; mật khẩu không đổi. |
| TC-FR03-UC-012 | AF-02 | Bao phủ retry/request OTP lại nếu UI/API hỗ trợ. | OTP mới được sinh/hiển thị; flow vẫn cho reset bằng OTP hợp lệ mới; mật khẩu chưa đổi trước khi submit reset. |

## Test Data Guidance

| Data item | Suggested value / rule |
| --- | --- |
| Registered email | `test@eshop.com` |
| Secondary registered email | Một tài khoản phụ dùng cho OTP của email khác, ví dụ `fr03.other@example.com`, cần chuẩn bị trước nếu chưa có. |
| Unregistered email | `fr03.unregistered@example.com` |
| Invalid email format | `invalid-email` |
| Valid new password | `NewPass123!` hoặc password mạnh tương đương theo FR-01 |
| Weak new password | `weakpass` hoặc chuỗi thiếu chữ hoa/số/ký tự đặc biệt |
| Empty password | Chuỗi rỗng |
| Wrong OTP | Một OTP sai nhưng không ghi OTP thật còn hiệu lực vào report/log |

## Risks / AI Gap Notes

- API reset-password chỉ nêu `newPassword`, trong khi SRS/UI yêu cầu thêm xác nhận mật khẩu mới. Khi tạo test case, phải ghi rõ test UI kiểm tra confirm password; API-level test không thể thay thế đầy đủ use case UI này.
- Demo hiển thị OTP trực tiếp trên màn hình; khi thực thi cần tránh ghi OTP thật còn hiệu lực vào prompt log, bug report hoặc public artifact.
- Một số candidate flow trùng một phần với Domain Testing đã có, nhưng Use Case Testing phải giữ trọng tâm actor goal, precondition, postcondition và end-to-end flow thay vì chỉ phân lớp input.
- Nếu UI không hỗ trợ request OTP lại, giữ AF-02 dưới dạng optional/assumption hoặc bỏ khi tạo test case chi tiết.
