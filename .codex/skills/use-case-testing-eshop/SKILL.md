---
name: use-case-testing-eshop
description: Dùng khi cần áp dụng kỹ thuật Use Case Testing cho bài HW02 EShop, xác định actor-goal-precondition-main flow-alternative flow-exception flow, thiết kế và phát sinh test case Markdown, viết phần giải thích trong main report và rà soát coverage dựa trên requirement.md, SystemRequirementsSpecification.md, api_specification.md; có gợi ý sẵn cho FR-03, FR-11, FR-14, FR-23 và có thể áp dụng cho FR khác nếu cần kiểm thử theo mục tiêu actor và luồng use case.
---

# Use Case Testing cho HW02 EShop

## Mục tiêu

Dùng skill này khi cần tạo hoặc rà soát test case Use Case Testing cho EShop trong bài HW02. Ngôn ngữ đầu ra mặc định là tiếng Việt. Các feature có gợi ý sẵn:

- FR-03: Forgot password and password reset (two steps)
- FR-11: Order history view (user)
- FR-14: Category management CRUD
- FR-23: Quên mật khẩu & Đặt lại mật khẩu trên Mobile, tương đương FR-03 nhưng kiểm thử trên React Native/Expo

## Nguyên tắc black-box

- Use Case Testing trong bài này là black-box testing: không dùng source code để thiết kế test case.
- Chỉ dựa trên SRS, requirement, API specification công khai, UI/flow quan sát được, role, precondition, postcondition, thông báo lỗi và hành vi hệ thống khi thao tác như người dùng.
- Expected result phải theo đặc tả. Nếu SUT chạy khác đặc tả, ghi bug/test observation thay vì sửa expected theo implementation.
- Ưu tiên test theo mục tiêu người dùng và luồng từ đầu đến cuối. Nếu test chỉ tập trung vào một input field, dùng Domain Testing/BVA. Nếu test chủ yếu là state hợp lệ/không hợp lệ sau sự kiện, có thể dùng State Transition Testing.

## Đầu vào cần đọc trước khi viết

- `requirement.md` để nắm yêu cầu nộp bài, AI audit, bug report và commit log.
- `SystemRequirementsSpecification.md` là nguồn đặc tả đúng của các FR; ưu tiên tài liệu này khi xác định actor, goal, trigger, precondition, main flow và postcondition.
- `api_specification.md` là nguồn black-box mô tả endpoint, body, query, header và response công khai; dùng để đối chiếu flow API/UI và expected result.
- `tests/test-design/<FR-xx-...>.md` là nguồn test design analysis bắt buộc phải đọc trước khi tạo test case nếu đã tồn tại. Nếu chưa có file test design analysis cho feature/kỹ thuật đang làm, tạo hoặc đề xuất tạo file này trước rồi mới sinh test case chi tiết.
- Template test case hiện có trong `tests/test-cases/FR-01-register/` và các test case FR đang có để giữ format nhất quán.
- UI/flow của SUT nếu chạy được: màn hình, form, navigation, message, role permission, empty state, success state.
- Nếu đặc tả thiếu flow phụ hoặc exception flow, ghi rõ trong `Assumptions`; không mở source code để lấp khoảng trống.

## Quy trình Use Case Testing

1. Xác định use case: tên use case, requirement ID, actor chính, actor phụ, goal, trigger.
2. Xác định precondition: role/session, dữ liệu tồn tại, trạng thái hệ thống, network/backend, thiết bị web/mobile.
3. Xác định postcondition thành công và postcondition thất bại: dữ liệu thay đổi/không thay đổi, màn hình đích, message, token/session.
4. Viết main success scenario theo các bước người dùng thực hiện và hệ thống phản hồi.
5. Liệt kê alternative flows: luồng hợp lệ khác với happy path, ví dụ danh sách rỗng, user có nhiều đơn, quay lại login, admin xem list trước khi CRUD.
6. Liệt kê exception flows: input sai, không đủ quyền, token thiếu/sai, dữ liệu không tồn tại, API lỗi, mobile không kết nối nếu có căn cứ quan sát.
7. Tạo use case coverage matrix. Mỗi test case cover một main/alternative/exception flow rõ ràng; nếu một flow có nhiều biến thể quan trọng, tách thành nhiều test.
8. Trước khi viết test case, đọc test design analysis tương ứng trong `tests/test-design/` và dùng use case summary/flow coverage matrix trong đó làm nguồn chính. Nếu file này chưa có, tạo test design analysis trước, sau đó mới tạo test case.
9. Viết test case Markdown theo template bên dưới. Mỗi test case phải trace về flow ID, actor, precondition, postcondition và tham chiếu file test design analysis đã dùng.
10. Trong `reports/main-report.md`, viết phần `Technique Application Explanation`: giải thích cách lấy actor/goal/flow từ SRS/API và cách phát sinh từng test case từ coverage matrix.
11. Ghi AI gap analysis nếu AI bỏ sót actor/role, chỉ viết happy path, nhầm precondition, không nêu postcondition, hoặc tạo test trùng lặp với Domain/BVA mà không có lý do.

## Gợi ý use case theo feature

### FR-03 Forgot password and password reset

- Actor chính: Guest/user đã có tài khoản.
- Goal: lấy OTP/reset token và đặt lại mật khẩu để đăng nhập lại.
- Main flow: mở Forgot Password, nhập email đã đăng ký, nhận OTP, nhập OTP và mật khẩu mới hợp lệ, hệ thống reset thành công và quay về login/cho đăng nhập.
- Alternative flow: quay lại login, request OTP lại nếu UI hỗ trợ, dùng email uppercase/lowercase nếu đặc tả/hành vi công khai cho phép.
- Exception flow: email rỗng/sai định dạng/không tồn tại, OTP sai, OTP của email khác, mật khẩu yếu, confirm không khớp, reset khi chưa request OTP.
- API spec: `POST /api/forgot-password`, `POST /api/reset-password`.

### FR-11 Order history view

- Actor chính: authenticated user.
- Goal: xem lịch sử đơn hàng của chính mình và thông tin cần thiết của mỗi đơn.
- Main flow: user đăng nhập, mở Order History, hệ thống tải danh sách đơn, hiện mã đơn/ngày/tổng tiền/trạng thái.
- Alternative flow: user không có đơn và thấy empty state; user có nhiều đơn; user mở chi tiết đơn của mình nếu UI/API hỗ trợ.
- Exception flow: guest truy cập order history, token hết hạn/sai, user truy cập order của người khác, API lỗi/tải thất bại nếu có thể quan sát.
- API spec: `GET /api/orders/my-orders`, `GET /api/orders/:id`.

### FR-14 Category management CRUD

- Actor chính: Admin.
- Actor phụ/ngoại lệ: user thường, guest.
- Goal: quản lý danh mục sản phẩm bằng thao tác xem, thêm, sửa, xóa.
- Main flow: admin đăng nhập, mở category management, xem danh sách, thêm category hợp lệ, cập nhật nếu API/UI hỗ trợ, xóa category.
- Alternative flow: danh sách rỗng; danh sách có nhiều category; admin hủy thao tác; delete rồi refresh list.
- Exception flow: guest/user thường thao tác admin, name rỗng/không hợp lệ, update/delete id không tồn tại, delete lặp lại category đã xóa.
- API spec: `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`.

### FR-23 Mobile Forgot Password and Password Reset

- Actor chính: mobile user có tài khoản.
- Goal: đặt lại mật khẩu trên ứng dụng React Native/Expo.
- Main flow: mở mobile Forgot Password, nhập email, sang bước OTP, nhập OTP và mật khẩu mới hợp lệ, reset thành công, điều hướng về Login.
- Alternative flow: quay lại Login, retry sau lỗi hiển thị, request lại OTP nếu UI hỗ trợ.
- Exception flow: email rỗng/sai/không tồn tại, OTP sai, password yếu, confirm không khớp, không có nút quay lại, lỗi hiển thị không phù hợp mobile, mất kết nối nếu có thể quan sát.
- API spec dùng chung FR-03: `POST /api/forgot-password`, `POST /api/reset-password`.

## Định dạng file test case

Đặt file theo cấu trúc:

```text
tests/test-cases/<FR-xx-slug>/use-case-testing/TC-FRxx-UC-001.md
```

Dùng nội dung Markdown sau:

```markdown
# TC-FRxx-UC-001: <Tên test case ngắn gọn> (Use Case Testing)

## Requirement ID
FR-xx

## Module / Test type / Technique
<Module> / Functional / Use Case Testing

## Assumptions
- <Chỉ ghi nếu đặc tả thiếu actor/flow/postcondition; không dựa trên source code>

## Test Design Reference
`tests/test-design/<FR-xx-...>.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FRxx-01 |
| Use case name | <name> |
| Primary actor | <actor> |
| Goal | <goal> |
| Trigger | <trigger> |
| Preconditions | <preconditions> |
| Success postconditions | <postconditions> |
| Failure postconditions | <postconditions> |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| MF-01 | Main success | <happy path> | <success state> |
| AF-01 | Alternative | <valid variation> | <valid postcondition> |
| EF-01 | Exception | <error/permission case> | <failure postcondition> |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-001 | MF-01 | <lý do chọn flow này> |

## Preconditions
- <Điều kiện trước khi test>

## Test data

| Field | Value |
| --- | --- |
| <field> | <value> |

## Test steps
1. <Bước của actor>
2. <Phản hồi/kiểm tra của hệ thống>
3. <Bước tiếp theo của actor>

## Expected result
<Kết quả mong đợi có thể quan sát/kiểm chứng, gồm postcondition>

## Status / Related bugs
Not Run / None
```

## Tiêu chuẩn chất lượng

- Mỗi test case phải trace về một flow ID trong use case coverage matrix.
- Phải có ít nhất một main success flow và các exception flow quan trọng của actor/role/session.
- Test case phải nêu precondition và postcondition rõ ràng; đây là điểm khác với test input đơn lẻ.
- Không chỉ viết UI steps; phải nói mục tiêu actor và kết quả sau cùng của use case.
- Không tạo test trùng với Domain/BVA nếu không thêm giá trị use-case-level như actor goal, end-to-end flow, alternative/exception flow.
- Sau khi tạo test, cập nhật `reports/main-report.md`, `ai-gap-analysis/`, bug report nếu phát hiện lỗi, `README.md` summary và `reports/prompt_log.md` nếu người dùng yêu cầu dùng skill prompt log.
