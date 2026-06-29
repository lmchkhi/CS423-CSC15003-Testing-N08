# HW02 - Main Report

## 1. Scope

Các feature được kiểm thử:

| Feature | Tên feature | Platform |
| --- | --- | --- |
| FR-03 | Quên mật khẩu & Đặt lại mật khẩu | Web/API |
| FR-11 | Xem lịch sử đơn hàng | Web/API |
| FR-14 | Quản lý danh mục CRUD | Web Admin/API |
| FR-23 | Quên mật khẩu & Đặt lại mật khẩu trên Mobile | Mobile/API |

Nguồn đặc tả black-box:

- `requirement.md`
- `SystemRequirementsSpecification.md`
- `api_specification.md`
- UI/flow/API response quan sát được khi kiểm thử

## 2. Domain Testing Report

> Theo hướng dẫn của giảng viên, phần này cần trình bày các bước để tạo ra từng Domain Testing test case, không chỉ mô tả tổng quan.

### 2.1 FR-03 - Domain Testing

#### Domain Analysis Summary

| Input/State | Valid Domains | Invalid/Special Domains |
| --- | --- | --- |
| Email lấy OTP | Email đã đăng ký, đúng định dạng | Rỗng, sai định dạng, chưa đăng ký |
| Điều hướng bước 1 | Có Step Indicator, có nút Quay lại đăng nhập | Thiếu nút quay lại hoặc không quay về trang Đăng nhập |
| Trạng thái luồng | Đã lấy OTP trước khi reset | Reset khi chưa lấy OTP |
| OTP | OTP đúng 6 chữ số, thuộc email đã yêu cầu | Sai OTP, OTP của email khác |
| Mật khẩu mới | Tuân thủ rule FR-01: >=8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt | Rỗng, yếu/không đủ rule |
| Xác nhận mật khẩu mới | Khớp Mật khẩu mới | Không khớp |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR03-DT-001 | Chọn miền hợp lệ của Bước 1: email đã đăng ký và đúng định dạng. Expected dựa trên SRS/API: hệ thống sinh OTP 6 chữ số và hiển thị trong môi trường demo. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-001.md` |
| TC-FR03-DT-002 | Tách riêng yêu cầu giao diện của Bước 1: phải có nút Quay lại đăng nhập. Test xác minh hành vi điều hướng không phụ thuộc dữ liệu email. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-002.md` |
| TC-FR03-DT-003 | Lấy lớp tương đương invalid của Email: rỗng. Các biến khác không cần nhập để cô lập lỗi bắt buộc nhập email. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-003.md` |
| TC-FR03-DT-004 | Lấy lớp tương đương invalid của Email: sai định dạng. Expected là lỗi định dạng email và không sinh OTP. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-004.md` |
| TC-FR03-DT-005 | Lấy lớp tương đương invalid của Email: đúng định dạng nhưng chưa đăng ký. Expected là từ chối vì FR-03 yêu cầu email đã đăng ký. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-005.md` |
| TC-FR03-DT-006 | Chọn tổ hợp hợp lệ của Bước 2: email đã lấy OTP, OTP đúng, mật khẩu mạnh, confirm khớp. Đây là happy path cho reset password. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-006.md` |
| TC-FR03-DT-007 | Kiểm tra ràng buộc luồng 2 bước: reset không được thành công nếu chưa thực hiện lấy OTP. Các input còn lại dùng giá trị hợp lệ để cô lập lỗi trạng thái. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-007.md` |
| TC-FR03-DT-008 | Lấy lớp tương đương invalid của OTP: đúng format 6 chữ số nhưng sai giá trị. Expected là lỗi OTP sai và không đổi mật khẩu. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-008.md` |
| TC-FR03-DT-009 | Kiểm tra ràng buộc liên biến Email-OTP: OTP chỉ hợp lệ cho email đã yêu cầu, không dùng được cho email khác. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-009.md` |
| TC-FR03-DT-010 | Lấy lớp tương đương invalid của mật khẩu mới: mật khẩu yếu, không thỏa rule FR-01. OTP và confirm giữ hợp lệ để cô lập lỗi password. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-010.md` |
| TC-FR03-DT-011 | Lấy lớp tương đương invalid của confirm password: không khớp mật khẩu mới. Mật khẩu mới và OTP đều hợp lệ. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-011.md` |
| TC-FR03-DT-012 | Lấy lớp tương đương invalid của mật khẩu mới: rỗng. Expected là lỗi bắt buộc nhập mật khẩu mới, không đổi mật khẩu. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-012.md` |

### 2.2 FR-11 - Domain Testing

#### Domain Analysis Summary

| Input/State | Valid Domains | Invalid/Special Domains |
| --- | --- | --- |
| TBD | TBD | TBD |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR11-DT-001 | TBD | TBD |

### 2.3 FR-14 - Domain Testing

#### Domain Analysis Summary

| Input/State | Valid Domains | Invalid/Special Domains |
| --- | --- | --- |
| TBD | TBD | TBD |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR14-DT-001 | TBD | TBD |

### 2.4 FR-23 - Domain Testing

#### Domain Analysis Summary

| Input/State | Valid Domains | Invalid/Special Domains |
| --- | --- | --- |
| TBD | TBD | TBD |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR23-DT-001 | TBD | TBD |

## 3. Boundary Value Analysis Report

> Theo hướng dẫn của giảng viên, phần này cần trình bày các bước để tạo ra từng BVA test case, bao gồm nguồn boundary, điểm ON/OFF và expected result.

### 3.1 FR-03 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| OTP length | SRS FR-03: OTP 6 chữ số | 5 (OFF-), 6 (ON), 7 (OFF+) |
| newPassword.length | SRS FR-03 tham chiếu rule mật khẩu mạnh FR-01: tối thiểu 8 ký tự | 7 (OFF-), 8 (ON), 9 (OFF+) |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR03-BVA-001 | Chọn điểm ON của OTP length: OTP hệ thống sinh phải đúng 6 chữ số. Các input khác giữ hợp lệ để xác nhận điểm biên được chấp nhận. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-001.md` |
| TC-FR03-BVA-002 | Chọn điểm OFF- của OTP length: 5 chữ số, nhỏ hơn ràng buộc đúng 6 chữ số. Expected là bị từ chối. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-002.md` |
| TC-FR03-BVA-003 | Chọn điểm OFF+ của OTP length: 7 chữ số, lớn hơn ràng buộc đúng 6 chữ số. Expected là bị từ chối. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-003.md` |
| TC-FR03-BVA-004 | Chọn điểm OFF- của độ dài mật khẩu mới: 7 ký tự. Chuỗi vẫn có đủ loại ký tự để lỗi chỉ do length. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-004.md` |
| TC-FR03-BVA-005 | Chọn điểm ON của độ dài mật khẩu mới: đúng 8 ký tự và đủ rule mật khẩu mạnh. Expected là được chấp nhận. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-005.md` |
| TC-FR03-BVA-006 | Chọn điểm OFF+ theo min boundary: 9 ký tự, vẫn là giá trị hợp lệ vì lớn hơn min và đủ rule mật khẩu mạnh. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-006.md` |

### 3.2 FR-11 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| TBD | TBD | TBD |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR11-BVA-001 | TBD | TBD |

### 3.3 FR-14 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| TBD | TBD | TBD |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR14-BVA-001 | TBD | TBD |

### 3.4 FR-23 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| TBD | TBD | TBD |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR23-BVA-001 | TBD | TBD |

## 4. Execution Summary

| Feature | Technique | Designed | Executed | Passed | Failed | Not Run | Related bugs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-03 | Domain Testing | 12 | 0 | 0 | 0 | 12 | None |
| FR-03 | BVA | 6 | 0 | 0 | 0 | 6 | None |
| FR-11 | Domain Testing | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-11 | BVA | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-14 | Domain Testing | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-14 | BVA | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-23 | Domain Testing | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-23 | BVA | TBD | TBD | TBD | TBD | TBD | TBD |

## 5. AI Gap Analysis Summary

| Feature | Technique | Missed test cases / bugs | Reason | Correction |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |
