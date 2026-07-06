# FR-02: Đăng nhập & Khóa tài khoản - Test Design Analysis (State Transition Testing)

## Requirement ID

FR-02

## Technique

State Transition Testing

## Source Documents

| Source | Relevant information |
| --- | --- |
| `SystemRequirementsSpecification.md` | FR-02 yêu cầu nhập Email/Mật khẩu, tăng bộ đếm sau mỗi lần đăng nhập sai, khóa tạm 30 giây sau từ 3 lần sai liên tiếp, trả JWT khi đăng nhập thành công, email input dùng `type="email"`. |
| `api_specification.md` | `POST /api/login` nhận `email`, `password`; phản hồi thành công `200 OK` trả `token` và thông tin `user`. |
| `requirement.md` | FR02 thuộc pool Authentication, Categories, and Products. |

## Scope

Phân tích này mô hình hóa vòng đời đăng nhập và khóa tài khoản của FR-02 từ góc nhìn black-box. File này dùng làm nguồn thiết kế trước khi tạo test case chi tiết trong:

```text
tests/test-cases/FR-02-login/state-transition-testing/
```

## Black-box Principles

- Không dùng source code, database schema, controller, model hoặc implementation detail để thiết kế state/transition.
- Expected result dựa trên SRS và API specification công khai.
- Nếu UI/API thực tế khác đặc tả, giữ expected result theo đặc tả và ghi nhận bug/test observation khi thực thi.
- Các trạng thái phải quan sát được qua UI message, token response, HTTP status, khả năng gọi API đã xác thực, hoặc thời gian khóa 30 giây.

## Assumptions

- "Đăng nhập sai liên tiếp" được hiểu là các lần submit credential sai liên tiếp cho cùng một tài khoản; một lần đăng nhập thành công sẽ kết thúc chuỗi sai liên tiếp.
- Email sai định dạng trên UI không được submit vì SRS yêu cầu input email dùng `type="email"`; nếu kiểm thử trực tiếp API với email sai định dạng thì ghi rõ là API-level observation.
- SRS không nêu chính xác nội dung message lỗi, chỉ yêu cầu thông báo phù hợp và không để lộ chi tiết nguyên nhân. Vì vậy expected result kiểm tra tính chung chung/an toàn của message thay vì exact text.
- Lockout timer 30 giây được tính theo môi trường demo trong SRS; khi thực thi cần dùng đồng hồ hoặc timestamp để quan sát trước/sau mốc 30 giây.

## State Model

### State Definitions

| State ID | State name | Meaning / Observable evidence |
| --- | --- | --- |
| S0 | Login form ready | Người dùng đang ở màn hình/form đăng nhập, chưa có JWT token hợp lệ từ lần login hiện tại. |
| S1 | Failed count = 1 | Sau 1 lần nhập sai liên tiếp cho tài khoản hợp lệ; hệ thống báo lỗi đăng nhập nhưng chưa khóa tài khoản. |
| S2 | Failed count = 2 | Sau 2 lần nhập sai liên tiếp; hệ thống báo lỗi đăng nhập nhưng chưa khóa tài khoản. |
| S3 | Account locked | Sau lần sai thứ 3 trở lên liên tiếp; tài khoản bị khóa tạm thời 30 giây, login bị từ chối dù credential đúng. |
| S4 | Lockout expired | Đã qua thời gian khóa 30 giây; tài khoản có thể thử đăng nhập lại. |
| S5 | Authenticated session | Đăng nhập thành công, response có JWT token và client dùng token cho request cần xác thực. |
| S6 | Client-side validation blocked | Email sai định dạng bị chặn ở UI trước khi submit do field email dùng `type="email"`. |

### Events

| Event ID | Event | Input / Trigger |
| --- | --- | --- |
| E1 | Submit valid credentials | Email đã đăng ký, mật khẩu đúng. |
| E2 | Submit wrong password | Email đã đăng ký, mật khẩu sai. |
| E3 | Submit invalid email format | Email sai định dạng ở UI. |
| E4 | Submit while locked | Submit credential trong thời gian tài khoản đang bị khóa. |
| E5 | Wait 30 seconds | Chờ hết thời gian khóa demo. |
| E6 | Use returned token | Gửi request cần xác thực với `Authorization: Bearer <token>`. |

### Guards / Conditions

| Guard ID | Guard / Condition | Source |
| --- | --- | --- |
| G1 | Email đúng format và mật khẩu đúng | SRS FR-02, API `POST /api/login` |
| G2 | Email đúng format nhưng mật khẩu sai | SRS FR-02 |
| G3 | Số lần sai liên tiếp trước event nhỏ hơn 2 | SRS: khóa nếu sai từ 3 lần trở lên |
| G4 | Số lần sai liên tiếp sau event đạt 3 hoặc hơn | SRS: khóa nếu sai từ 3 lần trở lên |
| G5 | Lockout timer vẫn còn trong 30 giây | SRS: tạm khóa 30 giây |
| G6 | Lockout timer đã hết 30 giây | SRS: tạm khóa 30 giây |
| G7 | Email sai định dạng | SRS: field email dùng `type="email"` |
| G8 | JWT token hợp lệ đã được trả về | SRS/API: login thành công trả JWT token |

## State Transition Table

| Transition ID | From state | Event | Guard / Input | To state | Expected result |
| --- | --- | --- | --- | --- | --- |
| T1 | S0 | E1 | G1 | S5 | Login thành công; response có JWT token và thông tin user. |
| T2 | S0 | E2 | G2 + G3 | S1 | Login thất bại; bộ đếm tăng lên đúng 1; chưa khóa tài khoản; không trả JWT. |
| T3 | S1 | E2 | G2 + G3 | S2 | Login thất bại lần 2 liên tiếp; bộ đếm tăng lên đúng 1; chưa khóa tài khoản; không trả JWT. |
| T4 | S2 | E2 | G2 + G4 | S3 | Login thất bại lần 3 liên tiếp; tài khoản bị khóa tạm 30 giây; không trả JWT. |
| T5 | S3 | E4 | G5, kể cả credential đúng | S3 | Login tiếp tục bị từ chối trong thời gian khóa; không trả JWT; message không lộ chi tiết nguyên nhân. |
| T6 | S3 | E5 | G6 | S4 | Hết thời gian khóa 30 giây; tài khoản được phép thử đăng nhập lại. |
| T7 | S4 | E1 | G1 | S5 | Login thành công sau khi hết khóa; response có JWT token và thông tin user. |
| T8 | S0 | E3 | G7 | S6 | UI chặn submit do email sai định dạng; không gọi API login; không tăng failed counter. |
| T9 | S5 | E6 | G8 | S5 | Request cần xác thực gửi header `Authorization: Bearer <token>` và được xử lý như authenticated user. |
| T10 | S1 | E1 | G1 | S5 | Đăng nhập thành công sau 1 lần sai; chuỗi sai liên tiếp kết thúc; response có JWT token. |
| T11 | S2 | E1 | G1 | S5 | Đăng nhập thành công sau 2 lần sai; tài khoản không bị khóa vì chưa đạt lần sai thứ 3; response có JWT token. |

## Coverage Strategy

| Coverage target | Required coverage |
| --- | --- |
| State coverage | Vào được các state S0, S1, S2, S3, S4, S5, S6. |
| Valid transition coverage | Cover T1, T6, T7, T9, T10, T11. |
| Invalid/error transition coverage | Cover T2, T3, T4, T5, T8. |
| Sequence coverage | Cover chuỗi `S0 -> S1 -> S2 -> S3 -> S4 -> S5` cho lockout rồi login lại sau 30 giây. |
| Security coverage | Không trả JWT khi login sai hoặc khi tài khoản đang khóa; message lỗi không để lộ chi tiết nguyên nhân. |

## Candidate Test Case Derivation

| Candidate TC | Transition(s) | Purpose | Expected result summary |
| --- | --- | --- | --- |
| TC-FR02-ST-001 | T1, T9 | Happy path login và sử dụng JWT token. | Login đúng trả token; request authenticated gửi `Authorization: Bearer <token>`. |
| TC-FR02-ST-002 | T2 | Sai mật khẩu lần 1. | Failed count tăng 1; chưa khóa; không có token. |
| TC-FR02-ST-003 | T2, T3 | Sai mật khẩu lần 2 liên tiếp. | Failed count tăng từ 1 lên 2; chưa khóa; không có token. |
| TC-FR02-ST-004 | T2, T3, T4 | Sai mật khẩu lần 3 liên tiếp. | Tài khoản chuyển sang khóa 30 giây; không có token. |
| TC-FR02-ST-005 | T5 | Login bằng credential đúng khi đang bị khóa. | Vẫn bị từ chối; không có token; message phù hợp và không lộ nguyên nhân chi tiết. |
| TC-FR02-ST-006 | T6, T7 | Hết 30 giây khóa rồi login lại. | Sau 30 giây, credential đúng được chấp nhận và trả token. |
| TC-FR02-ST-007 | T8 | Email sai định dạng ở UI. | UI chặn submit bằng HTML5 validation; không gọi API; không tăng failed counter. |
| TC-FR02-ST-008 | T2, T10 | Sai 1 lần rồi đăng nhập đúng. | Login đúng thành công; chuỗi sai liên tiếp kết thúc trước khi khóa. |
| TC-FR02-ST-009 | T2, T3, T11 | Sai 2 lần rồi đăng nhập đúng. | Login đúng thành công; không bị khóa vì chưa sai lần thứ 3. |

## Test Data Guidance

| Data item | Suggested value / rule |
| --- | --- |
| Valid existing email | Dùng tài khoản test hợp lệ do SRS hoặc môi trường test cung cấp, ví dụ `test@eshop.com` nếu đã được xác nhận tồn tại. |
| Valid password | Mật khẩu đúng của tài khoản test; không ghi password thật vào report nếu đó là dữ liệu nhạy cảm. |
| Wrong password | Một chuỗi sai nhưng không chứa dữ liệu nhạy cảm, ví dụ `WrongPassword123!`. |
| Invalid email format | `invalid-email` để kiểm tra HTML5 email validation trên UI. |
| Lockout wait time | Chờ ít nhất 30 giây sau khi tài khoản bị khóa; ghi timestamp bắt đầu/kết thúc khi thực thi. |

## Risks / AI Gap Notes

- SRS không nói rõ response code/message cho từng lỗi login, vì vậy test case sau này cần expected result ở mức quan sát an toàn: bị từ chối, không có JWT, thông báo phù hợp, không lộ chi tiết nguyên nhân.
- Nếu backend API vẫn nhận email sai định dạng khi gọi trực tiếp, cần phân biệt bug/API observation với UI requirement `type="email"`.
- Kiểm thử lockout có thể phụ thuộc dữ liệu tài khoản dùng chung; khi thực thi nên dùng tài khoản riêng để tránh ảnh hưởng các test khác.
- Khi tạo test case chi tiết, không gom quá nhiều transition vào một case nếu làm khó xác định lỗi; sequence lockout có thể cần một test end-to-end và các test nhỏ cho từng transition quan trọng.
