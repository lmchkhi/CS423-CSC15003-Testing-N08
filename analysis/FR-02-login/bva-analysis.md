# Phân tích Boundary Value Analysis — FR-02: Đăng nhập & Khóa tài khoản

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-02 |
| Tên chức năng | Đăng nhập & Khóa tài khoản |
| Input | Email, Mật khẩu; trạng thái hệ thống gồm số lần đăng nhập sai liên tiếp và thời gian khóa tài khoản. |
| Validation rules | Trường email phải dùng `type="email"` và có validate HTML5 format. |
| Business rules | Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên đúng 1 đơn vị. Nếu đăng nhập sai từ 3 lần trở lên liên tiếp, tài khoản bị tạm khóa 30 giây trong môi trường demo. |
| Preconditions | Người dùng truy cập màn hình đăng nhập. Tài khoản test có thể được đưa về trạng thái không khóa trước từng nhóm test. |
| Success condition | Đăng nhập thành công trả về JWT Token. Token được lưu phía client và gửi kèm request xác thực qua header `Authorization: Bearer <token>`. |
| Error condition | Đăng nhập sai bị từ chối; từ 3 lần sai liên tiếp trở lên tài khoản bị khóa tạm thời; hệ thống trả thông báo lỗi phù hợp và không để lộ chi tiết nguyên nhân. |

## 2. Các biến có biên

| Variable | Type | Constraint | Lower boundary | Upper boundary | Inclusive / Exclusive | Unit | Nominal value | Requirement source | Thông tin còn thiếu |
|---|---|---|---:|---:|---|---|---|---|---|
| `failed_login_count` | Integer system state | Tài khoản bị khóa nếu đăng nhập sai từ 3 lần trở lên liên tiếp | 3 | Chưa được đặc tả | Lower inclusive cho trạng thái khóa: `>= 3` | lần sai liên tiếp | 1 lần sai dưới ngưỡng, hoặc 3 lần sai để tạo trạng thái khóa | FR-02 | Không có UI/API được đặc tả để quan sát trực tiếp giá trị counter. |
| `lock_elapsed_time` | Time duration | Tài khoản bị tạm khóa 30 giây | 30 | 30 | Thời gian khóa kết thúc sau 30 giây; tại thời điểm đủ 30 giây kỳ vọng không còn bị khóa | giây | 31 giây sau khi khóa để tránh nhiễu thao tác khi cần kiểm tra trạng thái hết khóa | FR-02 | Không đặc tả dung sai đo thời gian, đồng hồ server/client, hoặc thông báo countdown. |

Các field `email` và `password` không được đưa vào BVA vì FR-02 không đặc tả min/max length, numeric range hoặc ngưỡng có thứ tự cho hai field này. Email format được validate bằng HTML5 nhưng đó là phân vùng format, phù hợp Domain Testing hơn BVA.

## 3. Phương pháp BVA được sử dụng

- Phương pháp: Robust BVA quanh các ngưỡng được đặc tả rõ trong FR-02.
- Lý do lựa chọn: FR-02 có ngưỡng trạng thái `3` lần đăng nhập sai và thời hạn khóa `30` giây. Robust BVA giúp kiểm tra ngay dưới ngưỡng, đúng ngưỡng và ngay trên ngưỡng, gồm cả giá trị hợp lệ và không hợp lệ.
- Quy ước ON/OFF:
  - Với ngưỡng bắt đầu khóa `failed_login_count >= 3`: `OFF⁻ = 2` là ngay dưới ngưỡng và chưa khóa; `ON = 3` là đúng ngưỡng bắt đầu khóa; `OFF⁺ = 4` là ngay trên ngưỡng và vẫn thuộc miền bị khóa.
  - Với ngưỡng hết khóa sau `30` giây: `OFF⁻ = 29` là chưa đủ thời gian nên vẫn khóa; `ON = 30` là đúng thời hạn khóa; `OFF⁺ = 31` là sau thời hạn khóa và phải hết khóa.

## 4. Xác định ON, OFF⁻ và OFF⁺

| Variable | Boundary | OFF⁻ | ON | OFF⁺ | Ghi chú |
|---|---|---:|---:|---:|---|
| `failed_login_count` | Ngưỡng bắt đầu khóa `>= 3` lần sai liên tiếp | 2 | 3 | 4 | Đây là lower boundary inclusive của trạng thái khóa. OFF⁻ là chưa khóa; ON và OFF⁺ là khóa. |
| `lock_elapsed_time` | Thời hạn khóa 30 giây | 29 | 30 | 31 | OFF⁻ là còn trong thời gian khóa; ON là vừa đủ 30 giây; OFF⁺ là đã qua thời hạn khóa. |

## 5. Boundary Value Derivation

| Boundary Value ID | Variable | Constraint | Boundary type | Boundary point | Công thức suy ra | Test value | Validity | Expected behavior | Requirement reference |
|---|---|---|---|---|---|---|---|---|---|
| BV-FAILEDCOUNT-001 | `failed_login_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Lower inclusive threshold for locked state | OFF⁻ | `3 - 1` | 2 lần sai liên tiếp | Valid, chưa khóa | Sau 2 lần sai liên tiếp, không trả JWT Token cho các lần sai nhưng tài khoản chưa bị khóa; đăng nhập đúng ngay sau đó được chấp nhận nếu không có lỗi khác. | FR-02 |
| BV-FAILEDCOUNT-002 | `failed_login_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Lower inclusive threshold for locked state | ON | `3` | 3 lần sai liên tiếp | Invalid, bị khóa | Sau lần sai thứ 3, tài khoản bị tạm khóa 30 giây; không trả JWT Token. | FR-02 |
| BV-FAILEDCOUNT-003 | `failed_login_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Lower inclusive threshold for locked state | OFF⁺ | `3 + 1` | 4 lần sai liên tiếp | Invalid, vẫn bị khóa | Lần thử sai thứ 4 vẫn bị từ chối trong trạng thái khóa; không trả JWT Token. | FR-02 |
| BV-LOCKTIME-001 | `lock_elapsed_time` | Tài khoản bị tạm khóa 30 giây | Unlock-time threshold | OFF⁻ | `30 - 1` | 29 giây sau khi khóa | Invalid, vẫn khóa | Đăng nhập bằng mật khẩu đúng tại 29 giây vẫn bị từ chối; không trả JWT Token. | FR-02 |
| BV-LOCKTIME-002 | `lock_elapsed_time` | Tài khoản bị tạm khóa 30 giây | Unlock-time threshold | ON | `30` | 30 giây sau khi khóa | Valid, hết khóa | Đăng nhập bằng mật khẩu đúng tại thời điểm đủ 30 giây được chấp nhận và trả JWT Token. | FR-02 |
| BV-LOCKTIME-003 | `lock_elapsed_time` | Tài khoản bị tạm khóa 30 giây | Unlock-time threshold | OFF⁺ | `30 + 1` | 31 giây sau khi khóa | Valid, hết khóa | Đăng nhập bằng mật khẩu đúng sau 31 giây được chấp nhận và trả JWT Token. | FR-02 |

## 6. Dependent Boundaries

| ID | Quan hệ | Boundary values | Expected behavior | Requirement reference | Ghi chú |
|---|---|---|---|---|---|
| DB-01 | `failed_login_count` đạt ON `3` thì bắt đầu tạo `lock_elapsed_time = 0` cho cửa sổ khóa 30 giây | BV-FAILEDCOUNT-002, BV-LOCKTIME-001, BV-LOCKTIME-002, BV-LOCKTIME-003 | Sau 3 lần sai liên tiếp, hành vi đăng nhập phụ thuộc vào thời gian đã trôi qua từ lúc khóa. | FR-02 | Đây là dependent boundary giữa số lần sai và thời gian khóa. |
| DB-02 | Khi đang khóa, password đúng không đủ để đăng nhập thành công cho tới khi hết 30 giây | BV-LOCKTIME-001, BV-LOCKTIME-002, BV-LOCKTIME-003 | Tại 29 giây bị từ chối; tại 30/31 giây được chấp nhận nếu email/password đúng. | FR-02 | Dùng email/password hợp lệ làm nominal values. |

## 7. BVA Test Matrix

| Test Condition | Target variable | Boundary Value ID | Boundary point | Test value | Các ràng buộc khác | Expected validity | Expected behavior | Lý do lựa chọn |
|---|---|---|---|---|---|---|---|---|
| COND-FR02-BVA-001 | `failed_login_count` | BV-FAILEDCOUNT-001 | OFF⁻ | 2 lần sai liên tiếp | Email `test@eshop.com`; password sai `Wrong123!`; sau đó thử password đúng `Test1234!` | Valid, chưa khóa | Hai lần sai bị từ chối nhưng chưa khóa; lần đăng nhập đúng ngay sau đó được chấp nhận. | Kiểm tra ngay dưới ngưỡng khóa. |
| COND-FR02-BVA-002 | `failed_login_count` | BV-FAILEDCOUNT-002 | ON | 3 lần sai liên tiếp | Email `test@eshop.com`; password sai `Wrong123!` | Invalid, bị khóa | Sau lần sai thứ 3, tài khoản bị khóa 30 giây và không trả JWT Token. | Kiểm tra đúng ngưỡng bắt đầu khóa. |
| COND-FR02-BVA-003 | `failed_login_count` | BV-FAILEDCOUNT-003 | OFF⁺ | 4 lần sai liên tiếp | Email `test@eshop.com`; password sai `Wrong123!`; lần thứ 4 diễn ra trong 30 giây khóa | Invalid, vẫn bị khóa | Lần sai thứ 4 trong trạng thái khóa vẫn bị từ chối và không trả JWT Token. | Kiểm tra ngay trên ngưỡng khóa. |
| COND-FR02-BVA-004 | `lock_elapsed_time` | BV-LOCKTIME-001 | OFF⁻ | 29 giây sau khi khóa | Tài khoản đã bị khóa do 3 lần sai; email/password đúng | Invalid, vẫn khóa | Đăng nhập đúng tại 29 giây bị từ chối và không trả JWT Token. | Kiểm tra ngay trước thời điểm hết khóa. |
| COND-FR02-BVA-005 | `lock_elapsed_time` | BV-LOCKTIME-002 | ON | 30 giây sau khi khóa | Tài khoản đã bị khóa do 3 lần sai; email/password đúng | Valid, hết khóa | Đăng nhập đúng tại thời điểm đủ 30 giây được chấp nhận và trả JWT Token. | Kiểm tra đúng boundary thời hạn khóa. |
| COND-FR02-BVA-006 | `lock_elapsed_time` | BV-LOCKTIME-003 | OFF⁺ | 31 giây sau khi khóa | Tài khoản đã bị khóa do 3 lần sai; email/password đúng | Valid, hết khóa | Đăng nhập đúng sau 31 giây được chấp nhận và trả JWT Token. | Kiểm tra ngay sau thời hạn khóa. |

## 8. Quá trình lựa chọn test case

Các test case được chọn theo Robust BVA quanh hai boundary có ý nghĩa trong FR-02. Mỗi test case chỉ nhắm một boundary point chính. Email `test@eshop.com` và password đúng `Test1234!` được dùng làm valid nominal values khi mục tiêu là trạng thái khóa/thời gian khóa; password sai `Wrong123!` được dùng để tạo số lần đăng nhập sai.

Không tạo tổ hợp BVA cho email/password vì requirement không nêu biên độ dài hoặc range. Không tạo thêm các mốc thời gian như 0 giây, 15 giây, 60 giây vì chúng không nằm sát boundary 30 giây và không tăng giá trị BVA.

## 9. Ma trận truy vết

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | BV-FAILEDCOUNT-001 | `failed_login_count` OFF⁻ so với ngưỡng 3 | 2 lần sai liên tiếp | Valid, chưa khóa | FR-02 |
| TC-FR02-BVA-002 | BV-FAILEDCOUNT-002 | `failed_login_count` ON tại ngưỡng 3 | 3 lần sai liên tiếp | Invalid, bị khóa | FR-02 |
| TC-FR02-BVA-003 | BV-FAILEDCOUNT-003 | `failed_login_count` OFF⁺ so với ngưỡng 3 | 4 lần sai liên tiếp | Invalid, vẫn bị khóa | FR-02 |
| TC-FR02-BVA-004 | BV-LOCKTIME-001 | `lock_elapsed_time` OFF⁻ so với 30 giây | 29 giây | Invalid, vẫn khóa | FR-02 |
| TC-FR02-BVA-005 | BV-LOCKTIME-002 | `lock_elapsed_time` ON tại 30 giây | 30 giây | Valid, hết khóa | FR-02 |
| TC-FR02-BVA-006 | BV-LOCKTIME-003 | `lock_elapsed_time` OFF⁺ so với 30 giây | 31 giây | Valid, hết khóa | FR-02 |

## 10. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng biến có biên | 2 |
| Tổng lower boundaries | 2 |
| Tổng upper boundaries | 0 |
| Tổng dependent boundaries | 2 |
| Phương pháp BVA | Robust BVA |
| Tổng boundary values | 6 |
| Tổng test cases | 6 |
| Boundary values đã cover | 6 |
| Boundary values chưa cover | 0 |

| Boundary Value ID | Trạng thái | Test case cover | Ghi chú |
|---|---|---|---|
| BV-FAILEDCOUNT-001 | Đã cover | TC-FR02-BVA-001 | Ngay dưới ngưỡng khóa. |
| BV-FAILEDCOUNT-002 | Đã cover | TC-FR02-BVA-002 | Đúng ngưỡng khóa. |
| BV-FAILEDCOUNT-003 | Đã cover | TC-FR02-BVA-003 | Ngay trên ngưỡng khóa; kiểm tra qua lần thử tiếp theo khi đã khóa. |
| BV-LOCKTIME-001 | Đã cover | TC-FR02-BVA-004 | 29 giây sau khi khóa. |
| BV-LOCKTIME-002 | Đã cover | TC-FR02-BVA-005 | Đúng 30 giây sau khi khóa. |
| BV-LOCKTIME-003 | Đã cover | TC-FR02-BVA-006 | 31 giây sau khi khóa. |

| Requirement gap | Trạng thái | Ghi chú |
|---|---|---|
| Quan sát trực tiếp `failed_login_count` tăng đúng 1 đơn vị | Bị chặn do thiếu requirement | FR-02 không đặc tả UI/API/log để xem counter. Test BVA kiểm chứng gián tiếp qua hành vi tại 2, 3 và sau ngưỡng. |
| Độ chính xác/tolerance của mốc 30 giây | Bị chặn do thiếu requirement | FR-02 không nêu dung sai đo thời gian. TC-FR02-BVA-005 tại đúng 30 giây cần công cụ đo hoặc thao tác rất cẩn thận. |
| Reset counter sau đăng nhập thành công hoặc sau hết khóa | Bị chặn do thiếu requirement | FR-02 không đặc tả cơ chế reset. |

## 11. Giả định và thông tin chưa được đặc tả

- Giả định cần xác nhận: Tài khoản `test@eshop.com` / `Test1234!` tồn tại theo tài khoản mặc định trong tài liệu và có thể được đưa về trạng thái không khóa trước từng test độc lập.
- Giả định cần xác nhận: Có thể thực hiện thao tác ở các mốc 29, 30 và 31 giây sau thời điểm khóa bằng đồng hồ hoặc công cụ kiểm thử đủ chính xác.
- Chưa được đặc tả: UI/API/log để quan sát trực tiếp giá trị `failed_login_count`.
- Chưa được đặc tả: Nội dung chính xác của thông báo lỗi khi bị khóa hoặc khi đăng nhập sai.
- Chưa được đặc tả: Sai mật khẩu trong lúc tài khoản đang khóa có tiếp tục tăng counter hay không.
