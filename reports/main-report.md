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

#### Step 1 - Xác định phạm vi và tác nhân

FR-03 là luồng Quên mật khẩu và Đặt lại mật khẩu trên Web/API, gồm 2 bước:

1. Bước 1 - Lấy OTP: người dùng nhập email đã đăng ký để hệ thống sinh OTP.
2. Bước 2 - Reset password: người dùng nhập OTP, mật khẩu mới và xác nhận mật khẩu mới.

Tác nhân chính là người dùng chưa đăng nhập hoặc người dùng quên mật khẩu. Expected result được lấy từ `SystemRequirementsSpecification.md` và `api_specification.md`, không dựa trên source code.

#### Step 2 - Xác định biến đầu vào và trạng thái cần kiểm thử

| Nhóm | Biến / trạng thái | Nguồn đặc tả | Ý nghĩa kiểm thử |
| --- | --- | --- | --- |
| Bước 1 | Email | SRS FR-03, API `POST /api/forgot-password` | Quyết định hệ thống có sinh OTP hay không |
| Bước 1 | Step Indicator | SRS FR-03, GUI-02 | Giao diện phải thể hiện đây là luồng 2 bước |
| Bước 1 | Nút Quay lại đăng nhập | SRS FR-03 | Người dùng phải có đường quay lại Login |
| Luồng | Trạng thái đã/chưa lấy OTP | SRS FR-03 | Không được reset password nếu chưa có OTP hợp lệ |
| Bước 2 | OTP | SRS FR-03, API `POST /api/reset-password` | OTP phải đúng và thuộc email đã yêu cầu |
| Bước 2 | Mật khẩu mới | SRS FR-03 tham chiếu FR-01 | Mật khẩu mới phải là mật khẩu mạnh |
| Bước 2 | Xác nhận mật khẩu mới | SRS FR-03 | Hai trường mật khẩu phải khớp |

#### Step 3 - Phân hoạch tương đương

| Biến / trạng thái | Lớp hợp lệ | Lớp không hợp lệ / đặc biệt |
| --- | --- | --- |
| Email | Email đã đăng ký, đúng định dạng: `test@eshop.com` | Rỗng; sai định dạng; đúng định dạng nhưng chưa đăng ký |
| Nút Quay lại đăng nhập | Nút tồn tại và điều hướng về trang Đăng nhập | Không có nút hoặc nút không điều hướng đúng |
| Trạng thái luồng | Đã lấy OTP trước khi reset | Gửi reset khi chưa lấy OTP |
| OTP | OTP đúng cho chính email đã yêu cầu | Sai OTP; OTP của email khác |
| Mật khẩu mới | Đủ rule FR-01: >=8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt | Rỗng; yếu/thiếu một hoặc nhiều điều kiện mật khẩu mạnh |
| Xác nhận mật khẩu mới | Khớp mật khẩu mới | Không khớp mật khẩu mới |

#### Step 4 - Xác định ràng buộc liên biến

| Ràng buộc | Cách áp dụng vào test case |
| --- | --- |
| OTP phải gắn với email đã yêu cầu | Tạo TC-FR03-DT-009 để dùng OTP của email khác cho `test@eshop.com` |
| Reset password chỉ hợp lệ sau khi lấy OTP | Tạo TC-FR03-DT-007 để gửi reset khi chưa thực hiện bước lấy OTP |
| Mật khẩu mới và xác nhận mật khẩu mới phải khớp | Tạo TC-FR03-DT-011 để cô lập lỗi confirm mismatch |
| Khi kiểm thử một lớp lỗi, các biến còn lại giữ giá trị hợp lệ nếu có thể | Ví dụ TC-FR03-DT-008 chỉ làm sai OTP, còn mật khẩu mới và confirm giữ hợp lệ |

#### Step 5 - Tổng hợp test case từ các lớp tương đương

| Test case ID | Lớp miền được chọn | Lý do chọn / cách tổng hợp | Test case file |
| --- | --- | --- | --- |
| TC-FR03-DT-001 | Email hợp lệ đã đăng ký | Kiểm tra happy path của Bước 1: email thuộc lớp hợp lệ nên hệ thống phải sinh OTP 6 chữ số. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-001.md` |
| TC-FR03-DT-002 | Nút Quay lại đăng nhập hợp lệ | Tách yêu cầu điều hướng khỏi dữ liệu email để xác minh UI có đủ nút quay lại Login. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-002.md` |
| TC-FR03-DT-003 | Email rỗng | Đại diện lớp invalid "missing required email"; expected là không sinh OTP và báo lỗi bắt buộc nhập. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-003.md` |
| TC-FR03-DT-004 | Email sai định dạng | Đại diện lớp invalid format; expected là lỗi định dạng email, khác với lỗi email chưa đăng ký. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-004.md` |
| TC-FR03-DT-005 | Email chưa đăng ký | Đại diện lớp đúng format nhưng không tồn tại; expected là từ chối vì FR-03 yêu cầu email đã đăng ký. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-005.md` |
| TC-FR03-DT-006 | Bước 2 hợp lệ toàn bộ | Kết hợp các lớp hợp lệ: đã lấy OTP, OTP đúng, mật khẩu mạnh và confirm khớp để kiểm tra happy path reset password. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-006.md` |
| TC-FR03-DT-007 | Chưa lấy OTP | Đại diện lỗi trạng thái luồng; các input reset còn lại dùng giá trị hợp lệ để lỗi chỉ đến từ việc chưa có OTP hợp lệ. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-007.md` |
| TC-FR03-DT-008 | OTP sai | Đại diện lớp OTP sai giá trị; email và mật khẩu mới giữ hợp lệ để cô lập lỗi OTP. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-008.md` |
| TC-FR03-DT-009 | OTP của email khác | Đại diện ràng buộc liên biến email-OTP; kiểm tra OTP không được dùng chéo giữa các tài khoản. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-009.md` |
| TC-FR03-DT-010 | Mật khẩu mới yếu | Đại diện lớp invalid password strength; OTP và confirm giữ hợp lệ để lỗi tập trung ở password mới. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-010.md` |
| TC-FR03-DT-011 | Confirm password không khớp | Đại diện lớp invalid confirm mismatch; mật khẩu mới vẫn mạnh để cô lập lỗi xác nhận mật khẩu. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-011.md` |
| TC-FR03-DT-012 | Mật khẩu mới rỗng | Đại diện lớp missing required password; expected là từ chối reset và không đổi mật khẩu. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-012.md` |

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
| FR-03 | Domain Testing | 12 | 12 | 6 | 6 | 0 | BUG-FR03-001, BUG-FR03-002, BUG-FR03-003, BUG-FR03-004, BUG-FR03-005 |
| FR-03 | BVA | 6 | 6 | 1 | 5 | 0 | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 |
| FR-11 | Domain Testing | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-11 | BVA | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-14 | Domain Testing | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-14 | BVA | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-23 | Domain Testing | TBD | TBD | TBD | TBD | TBD | TBD |
| FR-23 | BVA | TBD | TBD | TBD | TBD | TBD | TBD |

## 5. AI Gap Analysis Summary

| Feature | Technique | Missed test cases / bugs | Reason | Correction |
| --- | --- | --- | --- | --- |
| FR-03 | Domain Testing / BVA | AI ban đầu chưa tách rõ lỗi frontend và backend cho reset password; TC-FR03-DT-009 cũng phụ thuộc chuẩn bị tài khoản thứ hai qua UI nên bị cản bởi lỗi frontend. | Prompt/test design ban đầu tập trung vào expected result theo SRS, chưa dự phòng bước API verification khi UI bị chặn. | Gọi API trực tiếp để xác nhận backend sinh OTP 4 chữ số, email sai định dạng trả `User not found`, mật khẩu mạnh được backend chấp nhận, OTP của email khác bị từ chối đúng; cập nhật test run, bug reports và `ai-gap-analysis/FR-03-forgot-password.md`. |
