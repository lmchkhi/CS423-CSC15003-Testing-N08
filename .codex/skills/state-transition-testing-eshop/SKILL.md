---
name: state-transition-testing-eshop
description: Dùng khi cần áp dụng kỹ thuật State Transition Testing cho bài HW02 EShop, mô hình hóa trạng thái-sự kiện-điều kiện-hành động, tạo state table/state diagram textual, thiết kế test case Markdown, viết phần giải thích trong main report và rà soát coverage dựa trên requirement.md, SystemRequirementsSpecification.md, api_specification.md; có gợi ý sẵn cho FR-02, FR-03, FR-11, FR-14, FR-23 và có thể áp dụng cho FR khác nếu hành vi phụ thuộc trạng thái.
---

# State Transition Testing cho HW02 EShop

## Mục tiêu

Dùng skill này khi cần tạo hoặc rà soát test case State Transition Testing cho EShop trong bài HW02. Ngôn ngữ đầu ra mặc định là tiếng Việt. Các feature có gợi ý sẵn:

- FR-02: Login and account lockout
- FR-03: Forgot password and password reset (two steps)
- FR-11: Order history view (user)
- FR-14: Category management CRUD
- FR-23: Quên mật khẩu & Đặt lại mật khẩu trên Mobile, tương đương FR-03 nhưng kiểm thử trên React Native/Expo

## Nguyên tắc black-box

- State Transition Testing trong bài này là black-box testing: không dùng source code để thiết kế test case.
- Chỉ dựa trên SRS, requirement, API specification công khai, UI/flow quan sát được, thông báo lỗi, role, session, dữ liệu test và hành vi hệ thống khi thao tác như người dùng.
- Expected result phải theo đặc tả. Nếu SUT chạy khác đặc tả, ghi bug/test observation thay vì sửa expected theo implementation.
- Chỉ dùng kỹ thuật này khi hành vi phụ thuộc vào trạng thái trước đó hoặc chuỗi sự kiện. Nếu test chỉ là giá trị input độc lập, ưu tiên Domain Testing/BVA.

## Đầu vào cần đọc trước khi viết

- `requirement.md` để nắm yêu cầu nộp bài, AI audit, bug report và commit log.
- `SystemRequirementsSpecification.md` là nguồn đặc tả đúng của các FR; ưu tiên tài liệu này khi xác định state, event, guard và expected result.
- `api_specification.md` là nguồn black-box mô tả endpoint, body, query, header và response công khai; dùng để đối chiếu event API và state có thể quan sát.
- `tests/test-design/<FR-xx-...>.md` là nguồn test design analysis bắt buộc phải đọc trước khi tạo test case nếu đã tồn tại. Nếu chưa có file test design analysis cho feature/kỹ thuật đang làm, tạo hoặc đề xuất tạo file này trước rồi mới sinh test case chi tiết.
- Template test case hiện có trong `tests/test-cases/FR-01-register/` và các test case FR đang có để giữ format nhất quán.
- UI/flow của SUT nếu chạy được: màn hình, nút, route, disabled/enabled state, message, điều hướng sau mỗi thao tác.
- Nếu đặc tả thiếu state hoặc transition, ghi rõ trong `Assumptions`; không mở source code để lấp khoảng trống.

## Quy trình State Transition Testing

1. Xác định object có vòng đời trạng thái: user session, forgot-password flow, order, category, mobile screen flow, OTP/reset token.
2. Liệt kê state có thể quan sát được. Đặt tên state theo góc nhìn tester, ví dụ `Logged out`, `OTP requested`, `Reset completed`, `Order list empty`.
3. Liệt kê event/trigger: click button, submit form, call API, nhập OTP, đổi role, truy cập route, xóa item.
4. Xác định guard/condition cho mỗi transition: role, token hợp lệ, OTP đúng, order thuộc user, category tồn tại, đang ở bước nào.
5. Xác định action/observable result: hiện message, đổi màn hình, cập nhật danh sách, trả HTTP status, vô hiệu hóa button, không thay đổi state.
6. Tạo state transition table. Mỗi dòng nên có `From state`, `Event`, `Guard/Input`, `To state`, `Expected`.
7. Chọn coverage:
   - Valid transition: mỗi transition hợp lệ quan trọng có ít nhất một test.
   - Invalid transition: mỗi event quan trọng khi sai state/guard có ít nhất một test.
   - State coverage: mỗi state quan trọng được vào ít nhất một lần.
   - Sequence coverage: với flow nhiều bước, tạo ít nhất một chuỗi end-to-end thành công và các chuỗi fail tại điểm chuyển.
8. Trước khi viết test case, đọc test design analysis tương ứng trong `tests/test-design/` và dùng state model/transition table/coverage matrix trong đó làm nguồn chính. Nếu file này chưa có, tạo test design analysis trước, sau đó mới tạo test case.
9. Viết test case Markdown theo template bên dưới. Mỗi test case nên nêu rõ transition nào đang kiểm tra và tham chiếu file test design analysis đã dùng.
10. Trong `reports/main-report.md`, viết phần `Technique Application Explanation`: giải thích cách suy ra state model, transition table và từng test case từ các dòng transition.
11. Ghi AI gap analysis nếu AI bỏ sót state, tạo transition không có căn cứ, nhầm expected state, hoặc không tạo invalid transition.

## Gợi ý state theo feature

### FR-02 Login and account lockout

- Object: login session, failed-login counter, account lockout timer, JWT token.
- State gợi ý: `Login form`, `Login failed count = 0`, `Login failed count = 1`, `Login failed count = 2`, `Account locked`, `Lockout expired`, `Authenticated session`.
- Event: submit email/password hợp lệ, submit sai mật khẩu, submit email sai định dạng, submit khi tài khoản đang bị khóa, chờ hết 30 giây khóa, login thành công sau khi hết khóa.
- Guard/condition quan trọng: email đúng format, password đúng/sai, số lần sai liên tiếp dưới 3 hoặc từ 3 trở lên, lockout timer còn hạn/hết hạn, token được trả về sau login thành công.
- Valid transition quan trọng: `Login form` -> `Authenticated session` khi credential đúng; `Account locked` -> `Login form` hoặc trạng thái cho phép login lại sau 30 giây.
- Invalid transition quan trọng: login sai lần 1/2 không được khóa ngay; login sai lần 3 phải chuyển sang `Account locked`; login khi đang bị khóa không được trả JWT; email sai format không nên làm tăng counter nếu đặc tả/UI coi đây là lỗi validation trước khi submit.
- API spec: `POST /api/login`; SRS yêu cầu login thành công trả JWT token và gửi token trong header `Authorization: Bearer <token>` cho các request cần xác thực.

### FR-03 Forgot password and password reset

- Object: password reset flow/OTP.
- State gợi ý: `Login screen`, `Forgot password step 1`, `OTP requested`, `Reset form step 2`, `Reset completed`, `Reset rejected`.
- Event: mở Forgot Password, submit email hợp lệ, submit email sai/không tồn tại, submit OTP đúng, submit OTP sai, submit password yếu, quay lại login.
- Invalid transition quan trọng: reset khi chưa request OTP, dùng OTP của email khác, reset sau khi token bị từ chối, submit step 2 với password/confirm không hợp lệ.
- API spec: `POST /api/forgot-password`, `POST /api/reset-password`.

### FR-11 Order history view

- Object: user session và order history view.
- State gợi ý: `Logged out`, `Logged in user`, `Order history loading`, `Order history empty`, `Order history populated`, `Order detail opened`, `Access denied`.
- Event: truy cập My Orders, gọi API không token, gọi API với token hợp lệ, mở order của mình, mở order của user khác, refresh danh sách.
- Invalid transition quan trọng: guest truy cập lịch sử đơn hàng, user truy cập order detail của user khác, user không có đơn nhưng vẫn thấy dữ liệu người khác.

### FR-14 Category management CRUD

- Object: category entity và admin session.
- State gợi ý: `Guest/user without admin permission`, `Admin category list`, `Category exists`, `Category created`, `Category updated`, `Category deleted`, `Operation rejected`.
- Event: create, view list, update, delete, repeat delete, thao tác với id không tồn tại, thao tác bằng user thường/guest.
- Invalid transition quan trọng: user thường create/update/delete, delete category đã bị xóa, update/delete category không tồn tại, create/update với name không hợp lệ nếu đặc tả yêu cầu.

### FR-23 Mobile Forgot Password and Password Reset

- Object: mobile forgot-password screen flow/OTP.
- State gợi ý tương tự FR-03, bổ sung `Mobile keyboard active`, `Network/request pending`, `Mobile error displayed`, `Returned to Login`.
- Event: nhập email trên mobile, submit email, chuyển sang bước OTP, submit reset, quay lại login, retry khi lỗi.
- Invalid transition quan trọng: reset khi mobile chưa nhận OTP, UI không cho quay lại login, lỗi hiển thị không vừa màn hình, OTP/token bị từ chối nhưng app vẫn coi như thành công.

## Định dạng file test case

Đặt file theo cấu trúc:

```text
tests/test-cases/<FR-xx-slug>/state-transition-testing/TC-FRxx-ST-001.md
```

Dùng nội dung Markdown sau:

```markdown
# TC-FRxx-ST-001: <Tên test case ngắn gọn> (State Transition Testing)

## Requirement ID
FR-xx

## Module / Test type / Technique
<Module> / Functional / State Transition Testing

## Assumptions
- <Chỉ ghi nếu đặc tả thiếu state/transition; không dựa trên source code>

## Test Design Reference
`tests/test-design/<FR-xx-...>.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S1: <state> | <màn hình/message/API data có thể quan sát> |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T1 | S1 | <event> | <condition> | S2 | <observable result> |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-001 | T1 | Valid transition / Invalid transition / Sequence |

## Preconditions
- <Trạng thái ban đầu cần có>

## Test data

| Field | Value |
| --- | --- |
| <field> | <value> |

## Test steps
1. <Bước đưa hệ thống về From state>
2. <Kích hoạt event>
3. <Quan sát To state/action>

## Expected result
<Kết quả mong đợi có thể quan sát/kiểm chứng>

## Status / Related bugs
Not Run / None
```

## Tiêu chuẩn chất lượng

- Mỗi test case phải chỉ ra transition hoặc chuỗi transition được cover.
- Tạo cả positive transition và negative/invalid transition; không chỉ tạo happy path.
- State phải có bằng chứng quan sát được: UI screen, route, message, HTTP status, data hiển thị, disabled/enabled state.
- Không vẽ state diagram bằng hình nếu không cần; textual state table đủ rõ ràng và dễ trace trong Markdown.
- Không trộn với BVA: nếu điểm chính là 5/6/7 ký tự, dùng BVA. Không trộn với Domain Testing: nếu điểm chính là lớp input độc lập, dùng Domain Testing.
- Sau khi tạo test, cập nhật `reports/main-report.md`, `ai-gap-analysis/`, bug report nếu phát hiện lỗi, `README.md` summary và `reports/prompt_log.md` nếu người dùng yêu cầu dùng skill prompt log.
