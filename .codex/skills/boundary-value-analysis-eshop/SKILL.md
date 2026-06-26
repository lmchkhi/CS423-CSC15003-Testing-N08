---
name: boundary-value-analysis-eshop
description: Dùng khi cần áp dụng kỹ thuật Boundary Value Analysis cho bài HW02 EShop, xác định biên min/max, tạo BVA matrix, viết test case Markdown, viết phần giải thích trong main report và rà soát coverage dựa trên requirement.md, SystemRequirementsSpecification.md, api_specification.md cho FR-03, FR-11, FR-14, FR-23.
---

# Boundary Value Analysis cho HW02 EShop

## Mục tiêu

Dùng skill này khi cần tạo hoặc rà soát test case Boundary Value Analysis (BVA) cho EShop trong bài HW02. Ngôn ngữ đầu ra mặc định là tiếng Việt. Các feature đang làm:

- FR-03: Forgot password and password reset (two steps)
- FR-11: Order history view (user)
- FR-14: Category management CRUD
- FR-23: Quên mật khẩu & Đặt lại mật khẩu trên Mobile, tương đương FR-03 nhưng kiểm thử trên React Native/Expo

## Nguyên tắc black-box

- Boundary Value Analysis trong bài này là black-box testing: không dùng source code để thiết kế test case.
- Chỉ dùng boundary được nêu trong SRS/requirement, API specification công khai, tài liệu bài tập, UI/validation message quan sát được, hoặc hành vi công khai của hệ thống khi thao tác như người dùng.
- Không lấy min/max từ database schema, model, controller hoặc implementation. Nếu UI/SRS không nêu max, không tự tạo max; ghi `Assumptions` hoặc chỉ test boundary có căn cứ.
- Expected result phải theo đặc tả. Nếu SUT xử lý khác đặc tả, ghi bug/test observation thay vì sửa expected theo implementation.

## Đầu vào cần đọc trước khi viết

- `requirement.md` để nắm yêu cầu nộp bài và phần AI Audit Report.
- `SystemRequirementsSpecification.md` là nguồn đặc tả đúng của các FR; ưu tiên tài liệu này khi xác định expected result và boundary.
- `api_specification.md` là nguồn black-box mô tả endpoint, body, query, header và response công khai; dùng để xác định input API và các field có thể áp dụng BVA.
- Template BVA hiện có trong `tests/test-cases/FR-01-register/bva/`.
- UI/flow của SUT nếu chạy được: field constraint, browser/mobile keyboard type, validation message, disabled/enabled state, pagination, timeout/cooldown hiển thị.
- Tài khoản mặc định, dữ liệu test được cung cấp trong SRS, và dữ liệu bạn tự chuẩn bị trong vai trò tester.
- Nếu không tìm thấy boundary trong đặc tả/UI, không bịa boundary; ghi rõ thiếu căn cứ và ưu tiên test Domain Testing cho rule đó.

## Quy trình BVA

1. Xác định các biến có thứ tự hoặc giới hạn: length, number, date/time, count, page, page size, file size, expiry time, retry count, status transition index.
2. Với mỗi biến, ghi rõ constraint: min, max, allowed set, inclusive/exclusive, default value, nullable hay required.
3. Chọn điểm biên:
   - Min boundary: `min-1`, `min`, `min+1`.
   - Max boundary: `max-1`, `max`, `max+1`.
   - Nếu chỉ có min: `min-1`, `min`, `min+1`.
   - Nếu chỉ có max: `max-1`, `max`, `max+1`.
   - Nếu biến là date/time: trước biên, đúng tại biên, sau biên; chú ý timezone.
   - Nếu biến là enum/trạng thái: dùng Domain Testing trước; BVA chỉ áp dụng nếu có thứ tự/chuyển trạng thái có giới hạn.
4. Giữ các biến khác ở nominal valid value để isolate biến đang test.
5. Tạo BVA matrix, mỗi dòng ghi boundary point và expected result.
6. Viết test case Markdown cho từng điểm biên quan trọng hoặc gom thành một file nếu bài yêu cầu cho phép; mỗi test case vẫn phải có dữ liệu cụ thể.
7. Trong `reports/main-report.md`, viết phần `Technique Application Explanation` cho toàn bộ BVA test cases của feature: giải thích nguồn boundary, ON/OFF points và lý do tạo từng test case.
8. Rà soát expected result bằng đặc tả. Nếu AI đoán giới hạn mà không có căn cứ, ghi trong `Assumptions` và không dùng làm expected chính.
9. Ghi AI gap analysis nếu AI bỏ qua biến, dùng sai min/max, không isolate biến, hoặc không xét exclusive/inclusive boundary.

## Gợi ý biên theo feature

### FR-03 Forgot password and password reset

- API spec: `POST /api/forgot-password` với `email`; `POST /api/reset-password` với `email`, `resetToken`, `newPassword`.
- Email length: min nếu required, max theo SRS/UI nếu có.
- OTP length: 5, 6, 7 chữ số vì đặc tả yêu cầu OTP 6 chữ số.
- Password length: `min-1`, `min`, `min+1`, và `max-1`, `max`, `max+1` nếu có max.
- Confirm password: không phải BVA nếu chỉ là match/not match; đưa vào Domain Testing.
- Rate limit/retry count nếu có: `limit-1`, `limit`, `limit+1`.

### FR-11 Order history view

- API spec: `GET /api/orders/my-orders` yêu cầu token; nếu API/UI có pagination hoặc filter công khai thì mới áp dụng BVA cho page/page size/date.
- Số lượng đơn hàng hiển thị: 0, 1, nhiều đơn.
- Nếu SUT có pagination dù spec không nêu rõ: page `0/1/2`, trang cuối, quá trang cuối.
- Nếu SUT có date/filter dù spec không nêu rõ: dùng BVA cho ngày đầu/cuối có order và ghi rõ trong `Assumptions`.
- Tổng tiền/order amount không phải BVA cho FR-11 trừ khi SUT có filter min/max amount.

### FR-14 Category management CRUD

- API spec: `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`; body thêm mới có `name`.
- Category name length: 0 vì tên bắt buộc, 1, và `max-1/max/max+1` nếu SRS/UI nêu max rõ ràng.
- Số lượng category trong list: 0, 1, nhiều category.
- Nếu SUT có pagination/search dù spec không nêu rõ: page, page size, số item 0/1/page size/page size + 1.
- Delete lặp lại: lần 1 tồn tại, lần 2 không tồn tại; đây gần Domain Testing hơn BVA nhưng có thể dùng như boundary theo số lần thao tác nếu báo cáo giải thích rõ.

### FR-23 Mobile Forgot Password and Password Reset

- API spec dùng chung endpoint với FR-03: `POST /api/forgot-password` và `POST /api/reset-password`; boundary trên mobile vẫn dựa vào input/validation public, không dựa vào source.
- OTP length: 5, 6, 7 chữ số vì đặc tả yêu cầu OTP 6 chữ số.
- Password length: `min-1`, `min`, `min+1`, và `max-1`, `max`, `max+1` nếu có max.
- Email length: min nếu required, max theo SRS/UI nếu có.
- Step flow: bước 1 và bước 2 không phải boundary số học chính, nhưng cần kiểm tra trạng thái trước/sau khi lấy OTP bằng Domain Testing.
- Mobile-specific boundary: nếu UI có timeout/retry hoặc resend OTP cooldown, dùng `limit-1`, `limit`, `limit+1`; nếu không có constraint rõ ràng thì không tự bịa boundary.

## Định dạng file test case

Đặt file theo cấu trúc:

```text
tests/test-cases/<FR-xx-slug>/bva/TC-FRxx-BVA-001.md
```

Dùng nội dung Markdown sau:

```markdown
# TC-FRxx-BVA-001: <Tên test case ngắn gọn> (Boundary Value Analysis)

## Requirement ID
FR-xx

## Module / Test type / Technique
<Module> / Functional / Boundary Value Analysis (BVA)

## Assumptions
- <Chỉ ghi nếu giới hạn không được nêu rõ trong đặc tả; không dựa trên source code>

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| <variable> | <min/max/range> | <Min/Max/Range> | <min-1>, <min>, <min+1> |

### BVA Test Matrix

| TC | Variable Value | Boundary Point | Other Inputs | Expected |
| --- | --- | --- | --- | --- |
| BVA-001 | <value> | ON | Nominal valid | <kết quả mong đợi> |
| BVA-002 | <value> | OFF- | Nominal valid | <lỗi mong đợi> |
| BVA-003 | <value> | OFF+ | Nominal valid | <kết quả mong đợi> |

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

- Mỗi BVA test phải nói rõ biến nào đang được test và điểm biên nào đang được dùng.
- Phần giải thích áp dụng kỹ thuật phải đặt trong `reports/main-report.md`, không chỉ rải rác trong từng file test case. Với yêu cầu của giảng viên, nếu feature có 7 BVA test cases thì main report cần giải thích cách tạo ra đủ 7 test cases đó.
- File test case có thể giữ gọn ở mức boundary matrix, test data, steps, expected result; nếu muốn trace nhanh thì thêm dòng tham chiếu đến mục giải thích trong main report.
- Các input khác phải giữ hợp lệ để lỗi thất bại nếu có là do biến đang test.
- Không tạo BVA cho biến không có thứ tự/giới hạn; các trường hợp enum/role/status thường thuộc Domain Testing.
- Không tự đặt min/max nếu không có căn cứ. Nếu phải suy luận, ghi rõ căn cứ trong `Assumptions`.
- Sau khi tạo test, cập nhật report, AI gap analysis, bug report nếu phát hiện lỗi, và commit log theo yêu cầu bài.
