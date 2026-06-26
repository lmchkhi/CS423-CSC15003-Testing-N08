# Phân tích Domain Testing — FR-02: Đăng nhập & Khóa tài khoản

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-02 |
| Tên chức năng | Đăng nhập & Khóa tài khoản |
| Actor | Người dùng |
| Preconditions | Người dùng truy cập màn hình đăng nhập. Tài khoản có thể tồn tại hoặc không tồn tại tùy test condition. |
| Input | Email, Mật khẩu, trạng thái tài khoản/bộ đếm đăng nhập sai. |
| Output | JWT Token khi đăng nhập thành công; thông báo lỗi phù hợp khi đăng nhập thất bại hoặc tài khoản bị khóa. |
| Business rules | Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên đúng 1 đơn vị. Nếu đăng nhập sai từ 3 lần trở lên liên tiếp, tài khoản bị tạm khóa 30 giây trong môi trường demo. |
| Validation rules | Trường email phải dùng `type="email"` và có validate HTML5 format. |
| Dependency | Token được lưu phía client và gửi kèm các yêu cầu có xác thực qua header `Authorization: Bearer <token>`. |
| Success condition | Đăng nhập thành công trả về JWT Token. |
| Error conditions | Email không đúng format HTML5; email/mật khẩu không hợp lệ; đăng nhập sai từ 3 lần liên tiếp trở lên; tài khoản đang trong thời gian khóa. |

## 2. Biến đầu vào và ràng buộc

| Variable / Condition | Type | Required | Domain / Constraints | Valid conditions | Invalid conditions | Dependency | Requirement source |
|---|---|---|---|---|---|---|---|
| `email` | String / HTML email input | Có | Phải là email hợp lệ theo validate HTML5 vì field dùng `type="email"` | Email có format hợp lệ, ví dụ `test@eshop.com` | Email rỗng hoặc không đạt HTML5 email format, ví dụ `not-an-email` | Kết hợp với `password` để xác thực tài khoản | FR-02: "Người dùng nhập Email"; "Trường email phải dùng `type=\"email\"`" |
| `email_account_state` | System state | Có | Email có thể thuộc tài khoản đã đăng ký hoặc không tồn tại | Email thuộc tài khoản hợp lệ, ví dụ `test@eshop.com` | Email không thuộc tài khoản nào, ví dụ `unknown-login-fr02@example.com` | Khi không tồn tại, hệ thống vẫn không được để lộ chi tiết nguyên nhân | FR-02: đăng nhập thành công/thất bại và không để lộ chi tiết nguyên nhân |
| `password` | String | Có | Requirement không đặc tả format riêng cho mật khẩu khi đăng nhập; phải nhập mật khẩu | Mật khẩu đúng với tài khoản, ví dụ `Test1234!` | Mật khẩu rỗng hoặc không khớp tài khoản, ví dụ `Wrong123!` | Kết hợp với email đã tồn tại để xác định đăng nhập thành công/thất bại | FR-02: "Người dùng nhập Email và Mật khẩu" |
| `failed_login_count` | Integer system state | Có | Số lần đăng nhập sai liên tiếp của tài khoản | 0, 1, 2 lần sai liên tiếp và chưa bị khóa | Từ 3 lần sai liên tiếp trở lên dẫn đến khóa tạm thời | Chỉ thay đổi sau đăng nhập sai; dùng để xác định lock state | FR-02: tăng bộ đếm đúng 1; khóa nếu sai từ 3 lần trở lên liên tiếp |
| `account_lock_state` | System state | Có | Tài khoản không khóa, đang khóa trong 30 giây, hoặc đã hết thời gian khóa | Không khóa hoặc đã hết 30 giây khóa | Đang trong 30 giây khóa | Phụ thuộc vào `failed_login_count` và thời điểm kiểm thử | FR-02: khóa tạm 30 giây |
| `client_token_storage` | Client state | Có sau login thành công | Client lưu JWT Token sau đăng nhập thành công | Token tồn tại và được gửi qua `Authorization: Bearer <token>` cho request cần xác thực | Không có token sau login thất bại hoặc khi bị khóa | Phụ thuộc kết quả xác thực thành công | FR-02: Token được lưu phía client và gửi kèm request xác thực |

## 3. Phân vùng tương đương

| Class ID | Variable / Condition | Mô tả | Validity | Giá trị đại diện | Requirement source | Ghi chú |
|---|---|---|---|---|---|---|
| EC-EMAIL-V01 | `email` | Email đúng HTML5 format | Valid | `test@eshop.com` | FR-02 | Tài khoản mặc định có trong tài liệu hệ thống. |
| EC-EMAIL-I01 | `email` | Email rỗng | Invalid | `` | FR-02 | Suy ra từ yêu cầu người dùng nhập Email. |
| EC-EMAIL-I02 | `email` | Email sai HTML5 format | Invalid | `not-an-email` | FR-02 | Hệ thống cần validate bằng HTML5 email input. |
| EC-ACCOUNT-V01 | `email_account_state` | Email thuộc tài khoản đã đăng ký | Valid | `test@eshop.com` | FR-02 và tài khoản mặc định | Dùng để kiểm tra success và sai mật khẩu. |
| EC-ACCOUNT-I01 | `email_account_state` | Email không thuộc tài khoản nào | Invalid | `unknown-login-fr02@example.com` | FR-02 | Hệ thống không được để lộ nguyên nhân là email không tồn tại. |
| EC-PASSWORD-V01 | `password` | Mật khẩu đúng với tài khoản | Valid | `Test1234!` | FR-02 và tài khoản mặc định | Dùng với `test@eshop.com`. |
| EC-PASSWORD-I01 | `password` | Mật khẩu rỗng | Invalid | `` | FR-02 | Suy ra từ yêu cầu người dùng nhập Mật khẩu. |
| EC-PASSWORD-I02 | `password` | Mật khẩu không khớp tài khoản | Invalid | `Wrong123!` | FR-02 | Dùng để kiểm tra login sai và cơ chế khóa. |
| EC-FAILEDCOUNT-V01 | `failed_login_count` | Số lần sai liên tiếp dưới ngưỡng khóa | Valid | 0, 1 hoặc 2 | FR-02 | Sau lần sai thứ 1 hoặc thứ 2, tài khoản chưa bị khóa. |
| EC-FAILEDCOUNT-I01 | `failed_login_count` | Sai từ 3 lần liên tiếp trở lên | Invalid | 3 | FR-02 | Kích hoạt khóa 30 giây. |
| EC-LOCK-V01 | `account_lock_state` | Tài khoản không bị khóa | Valid | Không khóa | FR-02 | Cho phép đăng nhập nếu email/mật khẩu đúng. |
| EC-LOCK-V02 | `account_lock_state` | Tài khoản đã hết thời gian khóa 30 giây | Valid | Sau ít nhất 31 giây | FR-02 | Dùng để kiểm tra có thể đăng nhập lại sau khi hết khóa. |
| EC-LOCK-I01 | `account_lock_state` | Tài khoản đang bị khóa trong 30 giây | Invalid | Trong 30 giây sau lần sai thứ 3 | FR-02 | Đăng nhập phải bị từ chối dù nhập đúng mật khẩu. |
| EC-TOKEN-V01 | `client_token_storage` | Token được lưu và gửi trong header đúng định dạng | Valid | `Authorization: Bearer <token>` | FR-02 | Kiểm tra sau đăng nhập thành công. |
| EC-TOKEN-I01 | `client_token_storage` | Không có token khi đăng nhập thất bại | Invalid | Không có JWT Token | FR-02 | Áp dụng cho các case bị từ chối. |

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

| ID | Điều kiện phụ thuộc | Valid condition | Invalid condition | Requirement source | Ghi chú |
|---|---|---|---|---|---|
| DC-01 | `email` và `password` phải cùng khớp một tài khoản hợp lệ để đăng nhập thành công | `test@eshop.com` + `Test1234!` | Email không tồn tại hoặc password không khớp | FR-02 | Không được để lộ chi tiết nguyên nhân khi thất bại. |
| DC-02 | Mỗi lần đăng nhập sai làm tăng `failed_login_count` đúng 1 đơn vị | Một lần sai làm counter tăng từ N lên N+1 | Counter không tăng, tăng sai, hoặc reset sai khi vẫn là chuỗi sai liên tiếp | FR-02 | Giá trị counter nội bộ chưa được đặc tả cách quan sát trực tiếp. |
| DC-03 | `failed_login_count >= 3` làm tài khoản bị khóa 30 giây | Sau 3 lần sai liên tiếp, tài khoản bị khóa 30 giây | Không khóa, khóa sớm hơn 3 lần, hoặc khóa quá/ngắn hơn 30 giây | FR-02 | Có thể kiểm chứng black-box bằng hành vi đăng nhập đúng trong/ngoài cửa sổ khóa. |
| DC-04 | Khi tài khoản đang khóa, đăng nhập phải bị từ chối | Trong 30 giây khóa, request login không trả JWT Token | Vẫn trả token khi nhập đúng mật khẩu trong thời gian khóa | FR-02 | Error message phải phù hợp và không lộ chi tiết nguyên nhân. |
| DC-05 | Sau đăng nhập thành công, token phải được lưu client và gửi kèm request xác thực | Request xác thực có `Authorization: Bearer <token>` | Không lưu token hoặc không gửi header | FR-02 | Cần một request yêu cầu xác thực để quan sát header/hành vi. |

## 5. Domain Matrix

| Test Condition | Email / Account | Password | Failed count / Lock state | Expected validity | Expected behavior | Covered classes / DC | Lý do chọn |
|---|---|---|---|---|---|---|
| COND-FR02-DT-001 | `test@eshop.com`, account tồn tại | `Test1234!` | Không khóa | Valid | Đăng nhập thành công, client nhận/lưu JWT Token và request xác thực tiếp theo gửi `Authorization: Bearer <token>` | EC-EMAIL-V01, EC-ACCOUNT-V01, EC-PASSWORD-V01, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-V01, DC-01, DC-05 | Bao phủ happy path chính của FR-02. |
| COND-FR02-DT-002 | `` | `Test1234!` | Không khóa | Invalid | Hệ thống chặn submit hoặc từ chối đăng nhập vì thiếu email; không trả JWT Token | EC-EMAIL-I01, EC-TOKEN-I01 | Isolate email rỗng, password valid nominal. |
| COND-FR02-DT-003 | `not-an-email` | `Test1234!` | Không khóa | Invalid | HTML5 email validation chặn submit hoặc báo email không đúng format; không trả JWT Token | EC-EMAIL-I02, EC-TOKEN-I01 | Kiểm tra ràng buộc `type="email"`. |
| COND-FR02-DT-004 | `test@eshop.com`, account tồn tại | `` | Không khóa | Invalid | Hệ thống chặn submit hoặc từ chối đăng nhập vì thiếu mật khẩu; không trả JWT Token | EC-PASSWORD-I01, EC-TOKEN-I01 | Isolate password rỗng, email valid nominal. |
| COND-FR02-DT-005 | `unknown-login-fr02@example.com`, account không tồn tại | `Test1234!` | Không khóa | Invalid | Đăng nhập bị từ chối, không trả JWT Token, thông báo không tiết lộ email không tồn tại | EC-EMAIL-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-01 | Kiểm tra không lộ chi tiết nguyên nhân khi email không tồn tại. |
| COND-FR02-DT-006 | `test@eshop.com`, account tồn tại | `Wrong123!` | Trước test có 0 lần sai liên tiếp | Invalid | Lần đăng nhập sai bị từ chối, không trả JWT Token; tài khoản chưa bị khóa sau lần sai thứ 1 | EC-PASSWORD-I02, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-I01, DC-02 | Bao phủ sai mật khẩu dưới ngưỡng khóa. |
| COND-FR02-DT-007 | `test@eshop.com`, account tồn tại | `Wrong123!` lặp 3 lần liên tiếp | Sau lần sai thứ 3 | Invalid | Sau lần sai thứ 3, tài khoản bị khóa tạm 30 giây; không trả JWT Token | EC-PASSWORD-I02, EC-FAILEDCOUNT-I01, EC-LOCK-I01, EC-TOKEN-I01, DC-02, DC-03 | Bao phủ ngưỡng khóa chính. |
| COND-FR02-DT-008 | `test@eshop.com`, account tồn tại | `Test1234!` | Đang trong 30 giây khóa | Invalid | Đăng nhập bị từ chối dù mật khẩu đúng, không trả JWT Token, có thông báo lỗi phù hợp | EC-PASSWORD-V01, EC-LOCK-I01, EC-TOKEN-I01, DC-04 | Kiểm tra lock state override credential đúng. |
| COND-FR02-DT-009 | `test@eshop.com`, account tồn tại | `Test1234!` | Sau ít nhất 31 giây từ khi bị khóa | Valid | Đăng nhập thành công sau khi hết thời gian khóa, client nhận JWT Token | EC-PASSWORD-V01, EC-LOCK-V02, EC-TOKEN-V01, DC-03, DC-05 | Kiểm tra thời hạn khóa 30 giây trong môi trường demo. |

## 6. Quá trình lựa chọn test case

Các test case được chọn theo nguyên tắc mỗi case tập trung vào một domain hoặc một dependent condition chính. Các input không phải mục tiêu được giữ ở giá trị hợp lệ danh nghĩa như `test@eshop.com` và `Test1234!`.

Không tạo Cartesian product giữa mọi email, password và lock state vì nhiều tổ hợp không bổ sung coverage mới. Ví dụ email sai format kết hợp với password sai không cần thiết, vì validation email đã đủ chặn luồng đăng nhập và sẽ che khuất mục tiêu kiểm thử password. Các case liên quan khóa tài khoản được tách thành: một lần sai dưới ngưỡng, đúng ngưỡng 3 lần, đăng nhập đúng khi đang khóa, và đăng nhập lại sau khi hết 30 giây.

## 7. Ma trận truy vết

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|
| TC-FR02-DT-001 | COND-FR02-DT-001 | EC-EMAIL-V01, EC-ACCOUNT-V01, EC-PASSWORD-V01, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-V01, DC-01, DC-05 | FR-02 | Happy path đăng nhập và token. |
| TC-FR02-DT-002 | COND-FR02-DT-002 | EC-EMAIL-I01, EC-TOKEN-I01 | FR-02 | Email là input bắt buộc. |
| TC-FR02-DT-003 | COND-FR02-DT-003 | EC-EMAIL-I02, EC-TOKEN-I01 | FR-02 | Kiểm tra HTML5 email validation. |
| TC-FR02-DT-004 | COND-FR02-DT-004 | EC-PASSWORD-I01, EC-TOKEN-I01 | FR-02 | Password là input bắt buộc. |
| TC-FR02-DT-005 | COND-FR02-DT-005 | EC-EMAIL-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-01 | FR-02 | Kiểm tra thất bại không lộ nguyên nhân email không tồn tại. |
| TC-FR02-DT-006 | COND-FR02-DT-006 | EC-PASSWORD-I02, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-I01, DC-02 | FR-02 | Kiểm tra sai password dưới ngưỡng khóa. |
| TC-FR02-DT-007 | COND-FR02-DT-007 | EC-PASSWORD-I02, EC-FAILEDCOUNT-I01, EC-LOCK-I01, EC-TOKEN-I01, DC-02, DC-03 | FR-02 | Kiểm tra ngưỡng khóa sau 3 lần sai liên tiếp. |
| TC-FR02-DT-008 | COND-FR02-DT-008 | EC-PASSWORD-V01, EC-LOCK-I01, EC-TOKEN-I01, DC-04 | FR-02 | Kiểm tra tài khoản đang khóa chặn cả credential đúng. |
| TC-FR02-DT-009 | COND-FR02-DT-009 | EC-PASSWORD-V01, EC-LOCK-V02, EC-TOKEN-V01, DC-03, DC-05 | FR-02 | Kiểm tra hết khóa sau 30 giây. |

## 8. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng input/condition đã phân tích | 6 |
| Tổng valid equivalence class | 7 |
| Tổng invalid equivalence class | 8 |
| Tổng dependent condition | 5 |
| Tổng test condition | 9 |
| Tổng test case | 9 |

| Class / DC | Trạng thái | Test case cover | Ghi chú |
|---|---|---|---|
| EC-EMAIL-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008, TC-FR02-DT-009 | Email format hợp lệ. |
| EC-EMAIL-I01 | Đã cover | TC-FR02-DT-002 | Email rỗng. |
| EC-EMAIL-I02 | Đã cover | TC-FR02-DT-003 | Email sai format. |
| EC-ACCOUNT-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008, TC-FR02-DT-009 | Account tồn tại. |
| EC-ACCOUNT-I01 | Đã cover | TC-FR02-DT-005 | Account không tồn tại. |
| EC-PASSWORD-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-008, TC-FR02-DT-009 | Password đúng. |
| EC-PASSWORD-I01 | Đã cover | TC-FR02-DT-004 | Password rỗng. |
| EC-PASSWORD-I02 | Đã cover | TC-FR02-DT-006, TC-FR02-DT-007 | Password sai. |
| EC-FAILEDCOUNT-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-006 | Dưới ngưỡng khóa. |
| EC-FAILEDCOUNT-I01 | Đã cover | TC-FR02-DT-007 | Đạt ngưỡng khóa. |
| EC-LOCK-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-006 | Không khóa. |
| EC-LOCK-V02 | Đã cover | TC-FR02-DT-009 | Hết khóa. |
| EC-LOCK-I01 | Đã cover | TC-FR02-DT-007, TC-FR02-DT-008 | Đang khóa. |
| EC-TOKEN-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-009 | Có token khi thành công. |
| EC-TOKEN-I01 | Đã cover | TC-FR02-DT-002, TC-FR02-DT-003, TC-FR02-DT-004, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008 | Không có token khi thất bại. |
| DC-01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-005 | Quan hệ email/password/account. |
| DC-02 | Đã cover | TC-FR02-DT-006, TC-FR02-DT-007 | Kiểm tra qua hành vi dưới ngưỡng và đạt ngưỡng; quan sát trực tiếp counter cần hỗ trợ môi trường. |
| DC-03 | Đã cover | TC-FR02-DT-007, TC-FR02-DT-009 | Khóa và hết khóa. |
| DC-04 | Đã cover | TC-FR02-DT-008 | Đang khóa chặn login đúng. |
| DC-05 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-009 | Token sau login thành công. |

| Coverage item | Trạng thái | Lý do loại trừ hoặc gap |
|---|---|---|
| Quan sát trực tiếp giá trị `failed_login_count` tăng đúng 1 | Bị chặn do thiếu requirement | Requirement không đặc tả UI/API/log/admin nào để xem giá trị counter. Test case hiện kiểm chứng gián tiếp qua hành vi khóa sau 3 lần sai liên tiếp. |
| Nội dung chính xác của thông báo lỗi | Bị chặn do thiếu requirement | Requirement chỉ nêu "thông báo lỗi phù hợp" và "không để lộ chi tiết nguyên nhân", không nêu message cụ thể. |
| Reset counter sau đăng nhập thành công hoặc sau hết khóa | Bị chặn do thiếu requirement | FR-02 không đặc tả reset counter. |

## 9. Giả định và thông tin chưa được đặc tả

- Giả định cần xác nhận: `test@eshop.com` / `Test1234!` tồn tại và đang ở trạng thái không khóa trước khi bắt đầu từng test độc lập, theo tài khoản mặc định trong tài liệu.
- Giả định cần xác nhận: Có thể dùng trình duyệt hoặc công cụ kiểm thử để quan sát local storage/session storage/cookie/network header nhằm xác nhận JWT Token được lưu và gửi qua `Authorization: Bearer <token>`.
- Chưa được đặc tả: Hình thức hiển thị thông báo lỗi cụ thể cho login thất bại hoặc tài khoản bị khóa.
- Chưa được đặc tả: Cách quan sát trực tiếp bộ đếm đăng nhập sai để xác minh "tăng đúng 1 đơn vị" ngoài kiểm tra gián tiếp qua ngưỡng khóa.
- Chưa được đặc tả: Bộ đếm đăng nhập sai có reset sau đăng nhập thành công, sau hết thời gian khóa, hoặc theo cơ chế khác hay không.
