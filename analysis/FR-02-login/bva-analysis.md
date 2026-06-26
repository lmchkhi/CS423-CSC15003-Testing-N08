# Phân tích Boundary Value Analysis — FR-02: Đăng nhập & Khóa tài khoản

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-02 |
| Tên chức năng | Đăng nhập & Khóa tài khoản |
| Input | Email, Mật khẩu; trạng thái hệ thống gồm số lần đăng nhập sai liên tiếp và trạng thái/thời gian khóa tài khoản. |
| Validation rules | Trường email phải dùng `type="email"` và có validate HTML5 format. |
| Business rules | Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên đúng 1 đơn vị. Nếu đăng nhập sai từ 3 lần trở lên liên tiếp, tài khoản bị tạm khóa 30 giây trong môi trường demo. |
| Preconditions | Người dùng truy cập màn hình đăng nhập. Tài khoản test có thể được đưa về trạng thái không khóa trước từng nhóm test. |
| Success condition | Đăng nhập thành công trả về JWT Token; theo API spec, `POST /api/login` thành công trả `200 OK` với `token` và `user`. Token được lưu phía client và gửi kèm request xác thực qua header `Authorization: Bearer <token>`. |
| Error condition | Đăng nhập sai bị từ chối; từ 3 lần sai liên tiếp trở lên tài khoản bị khóa tạm thời; hệ thống trả thông báo lỗi phù hợp và không để lộ chi tiết nguyên nhân. |

## 2. Các biến có biên

| Variable | Type | Constraint | Lower boundary | Upper boundary | Inclusive / Exclusive | Unit | Nominal value | Requirement source | Thông tin còn thiếu |
|---|---|---|---:|---:|---|---|---|---|---|
| `failed_login_count` | Integer system state | Tài khoản chuyển sang trạng thái khóa khi đăng nhập sai từ 3 lần trở lên liên tiếp | 3 | Chưa được đặc tả | Lower inclusive cho trạng thái khóa: `>= 3` | lần sai liên tiếp | 2 lần sai để kiểm tra chưa khóa; 3 lần sai để kiểm tra transition sang khóa | FR-02 | Không có UI/API được đặc tả để quan sát trực tiếp giá trị counter. Không đặc tả counter có tiếp tục tăng khi tài khoản đã khóa hay không. |
| `account_lock_state` | System state phụ thuộc | Sau khi đạt `failed_login_count = 3`, tài khoản ở trạng thái khóa trong 30 giây | Tạo khóa ngay sau lần sai thứ 3 | Hết khóa sau 30 giây | Phụ thuộc vào boundary của `failed_login_count` và `lock_elapsed_time` | trạng thái | Đang khóa ngay sau lần sai thứ 3 | FR-02 | Không đặc tả mã trạng thái nội bộ hoặc response cụ thể khi thử đăng nhập trong lúc khóa. |
| `lock_elapsed_time` | Time duration | Tài khoản bị tạm khóa 30 giây | 30 | 30 | `30` giây là transition threshold: trước 30 giây còn khóa; từ đúng 30 giây trở đi kỳ vọng hết khóa | giây | 31 giây sau khi khóa để tránh nhiễu thao tác khi cần kiểm tra trạng thái hết khóa | FR-02 | Không đặc tả dung sai đo thời gian, đồng hồ server/client, hoặc thông báo countdown. |

Các field `email` và `password` không được đưa vào BVA vì FR-02 không đặc tả min/max length, numeric range hoặc ngưỡng có thứ tự cho hai field này. Email format được validate bằng HTML5 nhưng đó là phân vùng format, phù hợp Domain Testing hơn BVA.

## 3. Phương pháp BVA được sử dụng

- Phương pháp: Robust BVA có chọn lọc quanh các ngưỡng được đặc tả rõ trong FR-02.
- Lý do lựa chọn: FR-02 có ngưỡng trạng thái `3` lần đăng nhập sai và transition threshold `30` giây cho thời gian khóa. Chỉ các giá trị sát ngưỡng và hành vi phụ thuộc trực tiếp vào ngưỡng được chọn.
- Quy ước ON/OFF:
  - Với ngưỡng bắt đầu khóa `failed_login_count >= 3`: `OFF⁻ = 2` là ngay dưới ngưỡng và kỳ vọng chưa khóa; `ON = 3` là đúng ngưỡng chuyển sang khóa. `OFF⁺ = 4` không được dùng để kết luận counter tăng thành 4, vì FR-02 không đặc tả hành vi counter khi tài khoản đã khóa.
  - Với transition threshold hết khóa sau `30` giây: `OFF⁻ = 29` là chưa đủ thời gian nên kỳ vọng vẫn khóa; `ON = 30` là đúng mốc chuyển trạng thái từ khóa sang hết khóa; `OFF⁺ = 31` là sau mốc chuyển trạng thái và kỳ vọng hết khóa.

## 4. Xác định ON, OFF⁻ và OFF⁺

| Variable | Boundary | OFF⁻ | ON | OFF⁺ | Ghi chú |
|---|---|---:|---:|---:|---|
| `failed_login_count` | Ngưỡng bắt đầu khóa `>= 3` lần sai liên tiếp | 2 | 3 | Chưa chọn | Đây là lower boundary inclusive của trạng thái khóa. OFF⁺ = 4 không được chọn làm boundary value vì FR-02 không đặc tả counter có tăng tiếp khi tài khoản đã khóa. |
| `account_lock_state` | Hành vi thử đăng nhập khi trạng thái khóa vừa được tạo | N/A | Đang khóa ngay sau lần sai thứ 3 | N/A | Đây là dependent boundary/state behavior, không phải kết luận counter tăng lên 4. |
| `lock_elapsed_time` | Transition threshold hết khóa 30 giây | 29 | 30 | 31 | OFF⁻ là còn trong thời gian khóa; ON là đúng mốc transition; OFF⁺ là đã qua transition. |

## 5. Boundary Value Derivation

| Boundary Value ID | Variable | Constraint | Boundary type | Boundary point | Công thức suy ra | Test value | Expected lock state | Expected behavior | Requirement reference |
|---|---|---|---|---|---|---|---|---|---|
| BV-FAILEDCOUNT-001 | `failed_login_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Lower inclusive threshold for locked state | OFF⁻ | `3 - 1` | 2 lần sai liên tiếp | Unlocked | Sau 2 lần sai liên tiếp, các lần sai không trả JWT Token nhưng tài khoản chưa bị khóa; đăng nhập đúng ngay sau đó được chấp nhận nếu không có lỗi khác. | FR-02 |
| BV-FAILEDCOUNT-002 | `failed_login_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Lower inclusive threshold for locked state | ON | `3` | 3 lần sai liên tiếp | Locked | Sau lần sai thứ 3, tài khoản chuyển sang trạng thái khóa tạm 30 giây; không trả JWT Token. | FR-02 |
| BV-LOCKSTATE-001 | `account_lock_state` | Tài khoản đang khóa sau khi đạt ngưỡng 3 lần sai liên tiếp | Dependent state after ON boundary | ON-state | Phụ thuộc `failed_login_count = 3` | Thử đăng nhập trong 30 giây khóa ngay sau khi khóa được tạo | Locked | Login attempt trong trạng thái khóa bị từ chối và không trả JWT Token. Không kết luận counter tăng thêm. | FR-02 |
| BV-LOCKTIME-001 | `lock_elapsed_time` | Tài khoản bị tạm khóa 30 giây | Transition threshold | OFF⁻ | `30 - 1` | 29 giây sau khi khóa | Locked | Đăng nhập bằng mật khẩu đúng tại 29 giây vẫn bị từ chối; không trả JWT Token. | FR-02 |
| BV-LOCKTIME-002 | `lock_elapsed_time` | Tài khoản bị tạm khóa 30 giây | Transition threshold | ON | `30` | 30 giây sau khi khóa | Unlocked theo requirement, cần đo chính xác | Đăng nhập bằng mật khẩu đúng tại thời điểm đủ 30 giây được chấp nhận và trả JWT Token. Đây là mốc dễ nhiễu timing khi execution. | FR-02 |
| BV-LOCKTIME-003 | `lock_elapsed_time` | Tài khoản bị tạm khóa 30 giây | Transition threshold | OFF⁺ | `30 + 1` | 31 giây sau khi khóa | Unlocked | Đăng nhập bằng mật khẩu đúng sau 31 giây được chấp nhận và trả JWT Token. | FR-02 |

## 6. Dependent Boundaries

| ID | Quan hệ | Boundary values | Expected behavior | Requirement reference | Ghi chú |
|---|---|---|---|---|---|
| DB-01 | `failed_login_count` đạt ON `3` thì tài khoản chuyển sang `account_lock_state = locked` và bắt đầu cửa sổ khóa 30 giây | BV-FAILEDCOUNT-002, BV-LOCKSTATE-001, BV-LOCKTIME-001, BV-LOCKTIME-002, BV-LOCKTIME-003 | Sau 3 lần sai liên tiếp, hành vi đăng nhập phụ thuộc vào trạng thái khóa và thời gian đã trôi qua từ lúc khóa. | FR-02 | Đây là dependent boundary giữa counter threshold và lock-state/time threshold. |
| DB-02 | Khi đang khóa, thông tin đăng nhập đúng hoặc sai đều không phải trọng tâm BVA; trọng tâm là trạng thái khóa từ chối login attempt | BV-LOCKSTATE-001, BV-LOCKTIME-001 | Trong cửa sổ khóa, login attempt bị từ chối và không trả JWT Token. | FR-02 | Không suy ra counter tăng thêm khi login attempt diễn ra trong trạng thái khóa. |
| DB-03 | Mốc 30 giây là transition threshold từ locked sang unlocked | BV-LOCKTIME-001, BV-LOCKTIME-002, BV-LOCKTIME-003 | 29 giây: vẫn khóa; 30 giây: kỳ vọng hết khóa; 31 giây: hết khóa. | FR-02 | TC tại đúng 30 giây cần công cụ đo thời gian chính xác hoặc cơ chế kiểm soát thời gian. |

## 7. BVA Test Matrix

| Test Condition | Target variable | Boundary Value ID | Boundary point | Test value | Các ràng buộc khác | Expected locked/unlocked state | Expected behavior | Lý do lựa chọn |
|---|---|---|---|---|---|---|---|---|
| COND-FR02-BVA-001 | `failed_login_count` | BV-FAILEDCOUNT-001 | OFF⁻ | 2 lần sai liên tiếp | Email `test@eshop.com`; password sai `Wrong123!`; sau đó thử password đúng `Test1234!` | Unlocked | Hai lần sai bị từ chối nhưng chưa khóa; lần đăng nhập đúng ngay sau đó được chấp nhận. | Kiểm tra ngay dưới ngưỡng khóa. |
| COND-FR02-BVA-002 | `failed_login_count` | BV-FAILEDCOUNT-002 | ON | 3 lần sai liên tiếp | Email `test@eshop.com`; password sai `Wrong123!` | Locked | Sau lần sai thứ 3, tài khoản chuyển sang khóa 30 giây và không trả JWT Token. | Kiểm tra đúng ngưỡng bắt đầu khóa. |
| COND-FR02-BVA-003 | `account_lock_state` | BV-LOCKSTATE-001 | ON-state sau counter threshold | Thử đăng nhập trong 30 giây khóa ngay sau 3 lần sai | Tài khoản đã khóa; dùng `test@eshop.com`; password thử `Wrong123!` để không tạo thêm kết luận về credential đúng | Locked | Login attempt trong trạng thái khóa bị từ chối và không trả JWT Token. Không kết luận đây là lần tăng counter thứ 4. | Phân biệt hành vi locked state với boundary của counter. |
| COND-FR02-BVA-004 | `lock_elapsed_time` | BV-LOCKTIME-001 | OFF⁻ | 29 giây sau khi khóa | Tài khoản đã bị khóa do 3 lần sai; email/password đúng | Locked | Đăng nhập đúng tại 29 giây bị từ chối và không trả JWT Token. | Kiểm tra ngay trước transition threshold 30 giây. |
| COND-FR02-BVA-005 | `lock_elapsed_time` | BV-LOCKTIME-002 | ON | 30 giây sau khi khóa | Tài khoản đã bị khóa do 3 lần sai; email/password đúng; cần đo thời gian chính xác | Unlocked theo requirement | Đăng nhập đúng tại thời điểm đủ 30 giây được chấp nhận và trả JWT Token. | Kiểm tra đúng transition threshold; rủi ro timing được ghi rõ. |
| COND-FR02-BVA-006 | `lock_elapsed_time` | BV-LOCKTIME-003 | OFF⁺ | 31 giây sau khi khóa | Tài khoản đã bị khóa do 3 lần sai; email/password đúng | Unlocked | Đăng nhập đúng sau 31 giây được chấp nhận và trả JWT Token. | Kiểm tra ngay sau transition threshold. |

## 8. Quá trình lựa chọn test case

Các test case được chọn theo Robust BVA có chọn lọc quanh hai ngưỡng có ý nghĩa trong FR-02: counter threshold `3` lần sai và transition threshold `30` giây. Email `test@eshop.com` và password đúng `Test1234!` được dùng làm valid nominal values khi mục tiêu là thời gian khóa; password sai `Wrong123!` được dùng để tạo số lần đăng nhập sai.

Không chọn `failed_login_count = 4` làm boundary value vì FR-02 không đặc tả hành vi counter khi tài khoản đã khóa. Test case TC-FR02-BVA-003 được giữ lại nhưng được phân loại là dependent lock-state behavior: thử đăng nhập trong trạng thái khóa sau khi counter đã đạt ngưỡng ON `3`, không phải chứng minh counter tăng lên 4.

Không tạo tổ hợp BVA cho email/password vì requirement không nêu biên độ dài hoặc range. Không tạo thêm các mốc thời gian như 0 giây, 15 giây, 60 giây vì chúng không nằm sát transition threshold 30 giây và không tăng giá trị BVA.

## 9. Ma trận truy vết

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected locked/unlocked state | Requirement Reference |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | BV-FAILEDCOUNT-001 | `failed_login_count` OFF⁻ so với ngưỡng 3 | 2 lần sai liên tiếp | Unlocked | FR-02 |
| TC-FR02-BVA-002 | BV-FAILEDCOUNT-002 | `failed_login_count` ON tại ngưỡng 3 | 3 lần sai liên tiếp | Locked | FR-02 |
| TC-FR02-BVA-003 | BV-LOCKSTATE-001 | `account_lock_state` ngay sau khi counter đạt ngưỡng 3 | Thử đăng nhập trong 30 giây khóa | Locked | FR-02 |
| TC-FR02-BVA-004 | BV-LOCKTIME-001 | `lock_elapsed_time` OFF⁻ so với transition threshold 30 giây | 29 giây | Locked | FR-02 |
| TC-FR02-BVA-005 | BV-LOCKTIME-002 | `lock_elapsed_time` ON tại transition threshold 30 giây | 30 giây | Unlocked theo requirement, cần đo chính xác | FR-02 |
| TC-FR02-BVA-006 | BV-LOCKTIME-003 | `lock_elapsed_time` OFF⁺ so với transition threshold 30 giây | 31 giây | Unlocked | FR-02 |

## 10. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng biến có biên / dependent state đã phân tích | 3 |
| Tổng lower boundaries | 1 |
| Tổng transition thresholds | 1 |
| Tổng dependent boundaries | 3 |
| Phương pháp BVA | Robust BVA có chọn lọc |
| Tổng boundary values | 6 |
| Tổng test cases | 6 |
| Boundary values đã cover | 6 |
| Boundary values chưa cover | 0 |

| Boundary Value ID | Trạng thái | Test case cover | Ghi chú |
|---|---|---|---|
| BV-FAILEDCOUNT-001 | Đã cover | TC-FR02-BVA-001 | Ngay dưới ngưỡng khóa; expected state là unlocked. |
| BV-FAILEDCOUNT-002 | Đã cover | TC-FR02-BVA-002 | Đúng ngưỡng khóa; expected state là locked. |
| BV-LOCKSTATE-001 | Đã cover | TC-FR02-BVA-003 | Hành vi thử đăng nhập trong trạng thái khóa, không kết luận counter tăng thành 4. |
| BV-LOCKTIME-001 | Đã cover | TC-FR02-BVA-004 | 29 giây sau khi khóa; expected state là locked. |
| BV-LOCKTIME-002 | Đã cover | TC-FR02-BVA-005 | Đúng 30 giây sau khi khóa; transition threshold, cần đo chính xác. |
| BV-LOCKTIME-003 | Đã cover | TC-FR02-BVA-006 | 31 giây sau khi khóa; expected state là unlocked. |

| Requirement gap | Trạng thái | Ghi chú |
|---|---|---|
| Quan sát trực tiếp `failed_login_count` tăng đúng 1 đơn vị | Bị chặn do thiếu requirement | FR-02 không đặc tả UI/API/log để xem counter. Test BVA kiểm chứng gián tiếp qua hành vi tại 2 và 3 lần sai liên tiếp. |
| Counter khi login attempt diễn ra trong trạng thái khóa | Bị chặn do thiếu requirement | Không kết luận lần thử trong lúc khóa làm counter tăng tiếp. |
| Độ chính xác/tolerance của mốc 30 giây | Bị chặn do thiếu requirement | FR-02 không nêu dung sai đo thời gian. TC-FR02-BVA-005 tại đúng 30 giây cần công cụ đo hoặc thao tác rất cẩn thận. |
| Reset counter sau đăng nhập thành công hoặc sau hết khóa | Bị chặn do thiếu requirement | FR-02 không đặc tả cơ chế reset. |

## 11. Giả định và thông tin chưa được đặc tả

- Giả định cần xác nhận: Tài khoản `test@eshop.com` / `Test1234!` tồn tại theo tài khoản mặc định trong tài liệu và có thể được đưa về trạng thái không khóa trước từng test độc lập.
- Giả định cần xác nhận: Có thể thực hiện thao tác ở các mốc 29, 30 và 31 giây sau thời điểm khóa bằng đồng hồ hoặc công cụ kiểm thử đủ chính xác.
- Chưa được đặc tả: UI/API/log để quan sát trực tiếp giá trị `failed_login_count`.
- Chưa được đặc tả: Nội dung chính xác của thông báo lỗi khi bị khóa hoặc khi đăng nhập sai.
- Chưa được đặc tả: Sai mật khẩu hoặc bất kỳ login attempt nào trong lúc tài khoản đang khóa có tiếp tục tăng counter hay không.
- Chưa được đặc tả: Dung sai chấp nhận quanh transition threshold 30 giây.
