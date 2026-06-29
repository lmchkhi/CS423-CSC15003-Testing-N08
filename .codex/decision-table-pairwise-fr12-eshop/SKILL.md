---

name: decision-table-pairwise-fr12-eshop
description: Dùng khi cần áp dụng Decision Table Testing cho FR-12 trong HW02 EShop, tạo bảng điều kiện/hành động, rút gọn test case, sau đó rà soát các vùng đáng ngờ có nguy cơ thiếu test case quan trọng và chỉ áp dụng Pairwise Testing để mở rộng những phần đó.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Decision Table + Pairwise cho FR-12 HW02 EShop

## Mục tiêu

Dùng skill này khi cần tạo hoặc rà soát test case cho FR-12 trong bài HW02 EShop bằng kỹ thuật Decision Table Testing. Sau khi đã tạo được bộ test case rút gọn từ decision table, tiếp tục đánh giá các phần có nguy cơ thiếu test case quan trọng. Chỉ với các phần đáng ngờ đó mới áp dụng Pairwise Testing để mở rộng thêm test case.

Ngôn ngữ đầu ra mặc định là tiếng Việt.

Feature đang làm:

* FR-12: <Ghi tên chính xác của FR-12 theo SystemRequirementsSpecification.md>

## Nguyên tắc black-box

* Decision Table Testing và Pairwise Testing trong bài này là black-box testing.
* Không dùng source code, database schema, model, controller hoặc implementation để thiết kế test case.
* Chỉ dùng requirement, SRS, API specification công khai, UI/validation message quan sát được, hoặc hành vi công khai của hệ thống.
* Expected result phải theo đặc tả. Nếu SUT xử lý khác đặc tả, ghi bug/test observation thay vì sửa expected theo implementation.
* Pairwise chỉ dùng để bổ sung cho vùng rủi ro sau khi decision table đã được rút gọn, không dùng để thay thế toàn bộ decision table.

## Đầu vào cần đọc trước khi viết

* `requirement.md` để nắm yêu cầu nộp bài và phần AI Audit Report.
* `SystemRequirementsSpecification.md` là nguồn đặc tả chính của FR-12.
* `api_specification.md` để xác định endpoint, body, query, header, response công khai liên quan FR-12.
* UI/flow của SUT nếu chạy được: field, trạng thái enabled/disabled, validation message, role, status, filter, button, modal, confirmation dialog.
* Template test case hiện có trong `tests/test-cases/`.
* Dữ liệu test mặc định trong SRS và dữ liệu tester tự chuẩn bị.
* Nếu thiếu thông tin trong đặc tả/UI, không tự bịa rule; ghi vào `Assumptions`.

## Quy trình Decision Table Testing

1. Đọc FR-12 và xác định business rule chính.
2. Liệt kê các điều kiện ảnh hưởng đến kết quả:

   * Role/quyền truy cập.
   * Trạng thái dữ liệu.
   * Input hợp lệ/không hợp lệ.
   * Điều kiện tồn tại/không tồn tại.
   * Điều kiện phụ thuộc giữa các field.
   * Trạng thái trước/sau thao tác nếu FR-12 có workflow.
3. Liệt kê các action/result có thể xảy ra:

   * Cho phép thao tác.
   * Từ chối thao tác.
   * Hiển thị lỗi validation.
   * Trả về danh sách rỗng/dữ liệu.
   * Cập nhật dữ liệu thành công.
   * Không thay đổi dữ liệu.
   * Redirect hoặc thông báo lỗi.
4. Tạo full decision table với các condition là hàng và rule là cột.
5. Đánh dấu `Y/N/-`:

   * `Y`: điều kiện đúng.
   * `N`: điều kiện sai.
   * `-`: không ảnh hưởng hoặc không cần xét trong rule đó.
6. Rút gọn decision table:

   * Gộp các rule có cùng expected result và khác nhau ở điều kiện không ảnh hưởng.
   * Không gộp nếu điều kiện đó có thể làm thay đổi business logic.
   * Ghi rõ lý do rút gọn.
7. Tạo test case từ bảng rút gọn:

   * Mỗi rule quan trọng tương ứng ít nhất một test case.
   * Dữ liệu test phải cụ thể.
   * Expected result phải quan sát được.
8. Ghi phần `Technique Application Explanation` trong `reports/main-report.md`.

## Rà soát sau khi rút gọn

Sau khi có test case từ decision table rút gọn, phải kiểm tra xem có phần nào đáng ngờ bị thiếu test case quan trọng không.

Các dấu hiệu cần nghi ngờ:

* Có nhiều condition bị gộp thành `-`.
* Có nhiều input/field cùng ảnh hưởng đến một kết quả.
* Có role/status/filter kết hợp với nhau nhưng decision table chỉ test từng phần riêng lẻ.
* Có dependency giữa các field.
* Có nhiều enum hoặc trạng thái có thể tương tác với nhau.
* Có rule bị rút gọn quá mạnh chỉ còn 1 test case cho nhiều tổ hợp.
* Có lỗi nghiêm trọng nếu bỏ sót tổ hợp, ví dụ sai quyền, sai trạng thái, sai dữ liệu trả về, hoặc thao tác không hợp lệ vẫn được chấp nhận.

Nếu không có vùng đáng ngờ, ghi rõ:

> Sau khi rà soát decision table rút gọn, không phát hiện vùng có nguy cơ thiếu test case quan trọng nên không áp dụng Pairwise bổ sung.

## Khi nào áp dụng Pairwise

Chỉ áp dụng Pairwise cho một phần nhỏ có nguy cơ thiếu coverage quan trọng, không áp dụng cho toàn bộ FR-12 nếu không cần.

Pairwise phù hợp khi có nhiều factor dạng enum/bool/range đại diện, ví dụ:

* Role: Guest / User / Admin
* Auth state: Not logged in / Logged in
* Entity status: Active / Inactive / Deleted
* Filter status: All / Pending / Completed / Cancelled
* Sort order: Asc / Desc
* Search keyword: Empty / Valid / No match
* Data ownership: Own data / Other user data
* API result size: 0 / 1 / Many

Không dùng Pairwise cho:

* Field chỉ có 1 rule đơn giản.
* Boundary numeric rõ ràng, khi đó dùng BVA.
* Rule bắt buộc phải cover toàn bộ tổ hợp vì có ràng buộc nghiệp vụ mạnh.
* Trường hợp bảo mật/quyền truy cập nghiêm trọng cần test đầy đủ theo decision table.

## Quy trình Pairwise bổ sung

1. Chọn đúng vùng đáng ngờ sau khi decision table đã rút gọn.
2. Xác định các factor và value.
3. Loại bỏ tổ hợp không hợp lệ hoặc không có ý nghĩa.
4. Tạo pairwise matrix chỉ cho vùng đó.
5. So sánh với test case đã có từ decision table:

   * Nếu pairwise case đã được cover, không tạo lại.
   * Nếu pairwise case chưa được cover và có giá trị kiểm thử, thêm test case mới.
6. Ghi rõ trong report:

   * Vì sao vùng này đáng ngờ.
   * Các factor/value được chọn.
   * Pairwise đã bổ sung những tổ hợp nào.
   * Vì sao không áp dụng pairwise cho toàn bộ feature.

## Định dạng file test case

Đặt file theo cấu trúc:

```text
tests/test-cases/FR-12-<slug>/decision-table/TC-FR12-DT-001.md
tests/test-cases/FR-12-<slug>/pairwise/TC-FR12-PW-001.md
```

## Template Decision Table Test Case

```markdown
# TC-FR12-DT-001: <Tên test case> (Decision Table Testing)

## Requirement ID
FR-12

## Module / Test type / Technique
<Module> / Functional / Decision Table Testing

## Decision Rule
Rule ID: R1

## Conditions

| Condition | Value |
| --- | --- |
| <condition 1> | Y/N/- |
| <condition 2> | Y/N/- |

## Actions / Expected Outcome

| Action | Expected |
| --- | --- |
| <action/result> | <expected result> |

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

## Template Pairwise Test Case

```markdown
# TC-FR12-PW-001: <Tên test case> (Pairwise Testing)

## Requirement ID
FR-12

## Module / Test type / Technique
<Module> / Functional / Pairwise Testing

## Reason for Pairwise Expansion
- <Giải thích vì sao vùng này đáng ngờ sau khi rút gọn decision table>

## Pairwise Factors

| Factor | Value used in this TC |
| --- | --- |
| <factor 1> | <value> |
| <factor 2> | <value> |
| <factor 3> | <value> |

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

## Nội dung cần viết trong main report

Trong `reports/main-report.md`, thêm phần:

```markdown
## FR-12 - Decision Table Testing

### Technique Application Explanation

FR-12 được kiểm thử bằng Decision Table Testing vì requirement có nhiều điều kiện nghiệp vụ ảnh hưởng trực tiếp đến kết quả xử lý. Các condition được lấy từ SystemRequirementsSpecification.md, api_specification.md và hành vi UI/API công khai.

### Full Decision Table

| Conditions / Rules | R1 | R2 | R3 | R4 |
| --- | --- | --- | --- | --- |
| <condition 1> | Y | Y | N | - |
| <condition 2> | Y | N | - | Y |
| <action 1> | X |  |  | X |
| <action 2> |  | X | X |  |

### Reduced Decision Table

| Conditions / Rules | R1 | R2 | R3 |
| --- | --- | --- | --- |
| <condition 1> | Y | N | - |
| <condition 2> | Y | - | N |
| <action> | X | X | X |

### Test Case Derivation

| Rule | Test Case | Reason |
| --- | --- | --- |
| R1 | TC-FR12-DT-001 | Covers successful path |
| R2 | TC-FR12-DT-002 | Covers invalid/denied path |
| R3 | TC-FR12-DT-003 | Covers alternative/error path |

### Post-reduction Risk Review

Sau khi rút gọn decision table, nhóm rà soát các điều kiện bị gộp và các tổ hợp có thể bị thiếu. Những vùng sau được xem là có nguy cơ thiếu test case quan trọng:

| Risk Area | Reason | Need Pairwise? |
| --- | --- | --- |
| <area> | <reason> | Yes/No |

### Pairwise Expansion

Pairwise Testing chỉ được áp dụng cho các vùng có nguy cơ thiếu coverage quan trọng sau khi rút gọn decision table. Không áp dụng pairwise cho toàn bộ FR-12 vì decision table đã cover các business rule chính.

| Pairwise TC | Added Combination | Reason |
| --- | --- | --- |
| TC-FR12-PW-001 | <combination> | Covers missing interaction between factors |
```

## Tiêu chuẩn chất lượng

* Decision table phải thể hiện rõ condition, action và rule.
* Mỗi test case decision table phải trace được về một rule.
* Phải có bảng rút gọn và giải thích vì sao rút gọn.
* Không được rút gọn nếu làm mất rule nghiệp vụ quan trọng.
* Pairwise chỉ dùng sau bước rà soát rủi ro.
* Pairwise chỉ mở rộng vùng đáng ngờ, không tạo hàng loạt test case không cần thiết.
* Test case pairwise không được trùng hoàn toàn với test case decision table đã có.
* Expected result phải dựa trên đặc tả, không dựa trên source code.
* Nếu thiếu căn cứ, ghi vào `Assumptions`.
* Sau khi tạo test case, cập nhật main report, AI gap analysis, bug report nếu có, và commit log theo yêu cầu bài.
