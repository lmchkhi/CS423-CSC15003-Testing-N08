---
name: domain-testing-eshop
description: Dùng khi cần áp dụng kỹ thuật Domain Testing cho bài HW02 EShop, thiết kế test case Markdown, lập ma trận miền đầu vào, viết phần giải thích trong main report, phân tích AI gap và báo cáo dựa trên requirement.md, SystemRequirementsSpecification.md, api_specification.md cho FR-03, FR-11, FR-14, FR-23.
---

# Domain Testing cho HW02 EShop

## Mục tiêu

Dùng skill này khi cần tạo hoặc rà soát test case Domain Testing cho EShop trong bài HW02. Ngôn ngữ đầu ra mặc định là tiếng Việt. Các feature đang làm:

- FR-03: Forgot password and password reset (two steps)
- FR-11: Order history view (user)
- FR-14: Category management CRUD
- FR-23: Quên mật khẩu & Đặt lại mật khẩu trên Mobile, tương đương FR-03 nhưng kiểm thử trên React Native/Expo

## Nguyên tắc black-box

- Domain Testing trong bài này là black-box testing: không dùng source code để thiết kế test case.
- Chỉ dựa trên đặc tả, yêu cầu bài, API specification công khai, UI/flow quan sát được, thông báo lỗi, tài khoản/dữ liệu test được cung cấp, và hành vi hệ thống khi thao tác như người dùng.
- Không suy ra expected result từ implementation. Nếu SUT chạy khác đặc tả, expected result vẫn theo SRS; phần khác biệt được ghi thành bug hoặc AI gap/test observation.

## Đầu vào cần đọc trước khi viết

- `requirement.md` để nắm yêu cầu nộp bài, AI audit, AI critique, bug report và commit log.
- `SystemRequirementsSpecification.md` là nguồn đặc tả đúng của các FR; ưu tiên tài liệu này khi xác định expected result.
- `api_specification.md` là nguồn black-box mô tả endpoint, body, query, header và response công khai; dùng để thiết kế test ở mức API hoặc đối chiếu input/output của UI.
- Template test case hiện có trong `tests/test-cases/FR-01-register/domain-testing/`.
- UI/flow của SUT nếu chạy được: màn hình, form field, label, validation message, điều hướng, trạng thái sau thao tác.
- Tài khoản mặc định, dữ liệu test được cung cấp trong SRS, và dữ liệu bạn tự chuẩn bị trong vai trò tester.
- Nếu đặc tả thiếu chi tiết, ghi rõ trong `Assumptions`; không mở source code để lấp khoảng trống.

## Quy trình Domain Testing

1. Xác định mục tiêu feature và tác nhân chính: user, admin, guest, mobile user.
2. Liệt kê input variables, bao gồm field trên UI, query/filter, route parameter, state hệ thống, role/permission, dữ liệu đã tồn tại trong hệ thống, và điều kiện session.
3. Với mỗi variable, chia miền thành các lớp tương đương:
   - Valid domain: giá trị hợp lệ, được chấp nhận.
   - Invalid domain: rỗng, sai định dạng, sai role, không tồn tại, trùng lặp, hết hạn, trạng thái không cho phép.
   - Special domain: Unicode tiếng Việt, khoảng trắng đầu/cuối, case sensitivity, dữ liệu đã bị xóa mềm, dữ liệu của user khác, dữ liệu lớn.
4. Xác định ràng buộc liên biến: các field phụ thuộc nhau, rule theo role, rule theo trạng thái đơn hàng, rule duy nhất, rule bảo mật.
5. Tạo domain matrix. Mỗi test case nên isolate một miền lỗi chính; nếu cần kiểm tra kết hợp, ghi rõ lý do.
6. Chọn test data cụ thể, có thể lặp lại. Email, tên category, mã reset, order id phải tránh trùng với test khác.
7. Viết test case thành từng file Markdown theo template bên dưới.
8. Trong `reports/main-report.md`, viết phần `Technique Application Explanation` cho toàn bộ test cases của feature: giải thích từng bước để tạo ra từng test case hoặc từng dòng trong domain matrix.
9. Rà soát coverage: mỗi input variable có ít nhất một valid và các invalid quan trọng; mỗi rule nghiệp vụ quan trọng có ít nhất một test.
10. Ghi AI gap analysis nếu AI bỏ sót miền, hiểu sai rule, tạo test trùng lặp, hoặc không xét trạng thái/permission.

## Gợi ý miền theo feature

### FR-03 Forgot password and password reset

- API spec: `POST /api/forgot-password` với body `email`; `POST /api/reset-password` với body `email`, `resetToken`, `newPassword`.
- Email: rỗng, sai định dạng, không tồn tại, tồn tại, uppercase/lowercase, có khoảng trắng.
- OTP: đúng 6 chữ số, rỗng, sai định dạng, sai mã, ít hơn/nhiều hơn 6 chữ số, của email khác.
- Password mới: hợp lệ, rỗng, yếu theo FR-01. Confirm password là input UI theo SRS; API reset-password chỉ nêu `newPassword`, vì vậy test UI và test API cần ghi rõ khác biệt này trong Assumptions/Observation.
- Luồng 2 bước: hiển thị Step Indicator, có nút Quay lại đăng nhập, không cho reset nếu chưa lấy OTP.
- Bảo mật: OTP chỉ hợp lệ cho email đã yêu cầu, không dùng được cho email khác.

### FR-11 Order history view

- API spec: `GET /api/orders/my-orders` yêu cầu `Authorization: Bearer <token>`; `GET /api/orders/:id` dùng để kiểm tra chi tiết/ownership nếu cần.
- User state: chưa đăng nhập, đã đăng nhập, user không có đơn, user có đơn.
- Ownership: chỉ thấy đơn của chính user, không truy cập được order id của user khác.
- Dữ liệu hiển thị: mã đơn, ngày đặt, tổng tiền, trạng thái hiện tại.
- Trạng thái: phải được dịch sang tiếng Việt rõ ràng và phân biệt màu sắc.
- Trường hợp phụ: danh sách rỗng, nhiều đơn, đơn ở các trạng thái khác nhau theo FR-10.

### FR-14 Category management CRUD

- API spec: `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`; thao tác thêm/sửa/xóa cần xét quyền admin theo SRS.
- Role: admin hợp lệ, user thường, guest.
- Create fields: tên category rỗng, hợp lệ, chỉ khoảng trắng, Unicode tiếng Việt, ký tự đặc biệt.
- Read/list: danh sách rỗng, danh sách có nhiều category.
- Delete: category tồn tại, category không tồn tại, xóa lặp lại.
- Access control: chỉ admin được thêm/xem/xóa danh mục; user thường/guest không được truy cập thao tác admin.

### FR-23 Mobile Forgot Password and Password Reset

- API spec dùng chung endpoint với FR-03: `POST /api/forgot-password` và `POST /api/reset-password`; khác biệt chính nằm ở client mobile/React Native flow.
- Email: rỗng, sai định dạng, không tồn tại, tồn tại, uppercase/lowercase, có khoảng trắng.
- OTP: đúng 6 chữ số, rỗng, sai định dạng, sai mã, ít hơn/nhiều hơn 6 chữ số, của email khác.
- Password mới: hợp lệ, rỗng, yếu theo rule FR-01, confirm không khớp.
- Luồng 2 bước trên mobile: hiển thị Step Indicator, có nút Quay lại đăng nhập, không cho reset nếu chưa lấy OTP.
- Mobile-specific domain: bàn phím email/password đúng loại, lỗi hiển thị vừa màn hình, điều hướng về màn hình Đăng nhập sau khi reset thành công, xử lý mất mạng/chậm mạng nếu SUT có.

## Định dạng file test case

Đặt file theo cấu trúc:

```text
tests/test-cases/<FR-xx-slug>/domain-testing/TC-FRxx-DT-001.md
```

Dùng nội dung Markdown sau:

```markdown
# TC-FRxx-DT-001: <Tên test case ngắn gọn> (Domain Testing)

## Requirement ID
FR-xx

## Module / Test type / Technique
<Module> / Functional / Domain Testing

## Assumptions
- <Chỉ ghi nếu đặc tả thiếu chi tiết; không dựa trên source code>

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| <variable> | <type> | <valid/invalid/special domains> |

### Domain Matrix

| TC | <variable 1> | <variable 2> | Expected |
| --- | --- | --- | --- |
| DT-001 | Valid | Valid | <kết quả mong đợi> |
| DT-002 | Invalid: <lý do> | Valid | <lỗi mong đợi> |

## Preconditions
- <Điều kiện trước khi test>

## Test data

| Field | Value |
| --- | --- |
| <field> | <value> |

## Test steps
1. <Bước 1>
2. <Bước 2>

## Expected result
<Kết quả mong đợi có thể quan sát/kiểm chứng>

## Status / Related bugs
Not Run / None
```

## Tiêu chuẩn chất lượng

- Không chỉ prompt AI tạo test case chung chung; phải thể hiện các bước phân tích miền.
- Phần giải thích áp dụng kỹ thuật phải đặt trong `reports/main-report.md`, không chỉ rải rác trong từng file test case. Với yêu cầu của giảng viên, nếu feature có 12 Domain Testing test cases thì main report cần giải thích cách tạo ra đủ 12 test cases đó.
- File test case có thể giữ gọn ở mức domain matrix, test data, steps, expected result; nếu muốn trace nhanh thì thêm dòng tham chiếu đến mục giải thích trong main report.
- Mỗi expected result phải rõ ràng, kiểm chứng được, và gắn với rule của feature.
- Không trộn Domain Testing với BVA: nếu test chủ yếu là giá trị biên số/length/date/page thì đưa sang skill BVA.
- Test case phải có dữ liệu cụ thể, precondition cụ thể, và bước thực thi đủ để tester khác lặp lại.
- Sau khi tạo test, cập nhật report, AI gap analysis, bug report nếu phát hiện lỗi, và commit log theo yêu cầu bài.
