# Phân tích Domain Testing — FR-02: Đăng nhập va Khóa tài khoản

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-02 |
| Tên chức năng | Đăng nhập va Khóa tài khoản |
| Actor | Người dùng đã có tài khoản |
| Preconditions | Tài khoản cần kiểm thử tồn tại trong hệ thống khi kiểm thử các trường hợp đăng nhập với tài khoản đã đăng ký. Trạng thái bộ đếm đăng nhập sai cần được đưa về giá trị danh nghĩa trước mỗi nhóm test liên quan đến lockout. |
| Input | Email, Mật khẩu, trang thai tai khoan/bo dem đăng nhập sai liên tiếp |
| Output | Đăng nhập thành công trả về JWT Token; đăng nhập sai bị từ chối và hiện thông báo lỗi phù hợp; tài khoản bị tạm khóa 30 giây nếu sai từ 3 lần trở lên liên tiếp. |
| Business rules | Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên đúng 1 đơn vị. Đăng nhập sai tu 3 lan tro len liên tiếp thi tài khoản bị tạm khóa 30 giây trong môi trường demo. Thông báo lỗi không để lộ chi tiết nguyên nhân. |
| Validation rules | Trường email phải dùng `type="email"` và có validate HTML5 format. |
| Dependency | Kết quả đăng nhập phụ thuộc vào quan hệ giữa email, mật khẩu, tai khoan tồn tại, trạng thái khóa và số lần sai liên tiếp. |
| Success condition | Đăng nhập thành công trả về JWT Token; token được lưu phía client và được gửi kèm các yêu cầu có xác thực qua header `Authorization: Bearer <token>`. |
| Error conditions | Email sai format; email/mật khẩu không hợp lệ; tai khoan dang bi tạm khóa; đăng nhập sai tu 3 lan tro len liên tiếp. |

## 2. Biến đầu vào và ràng buộc

| Variable / Condition | Type | Required | Domain / Constraints | Valid conditions | Invalid conditions | Dependency | Requirement source |
|---|---|---|---|---|---|---|---|
| Email | String / HTML email input | Có, suy ra từ yêu cầu người dùng nhập Email | Phải dùng `type="email"` va validate HTML5 format; email hợp lệ có dạng như `user@domain.com`. | Email co format hợp lệ; voi login thành công phai thuộc tài khoản đã đăng ký. | Email sai HTML5 format; email hợp lệ ve format nhung không ứng với tài khoản có thể đăng nhập; email trống: Chưa được đặc tả rõ cách validation. | Phụ thuộc với Password và trạng thái tai khoan. | FR-02, FR-22 |
| Password | String / password input | Có, suy ra từ yêu cầu người dùng nhập Mật khẩu | FR-02 không nêu ràng buộc độ dài/format riêng cho password đăng nhập; FR-22 yêu cầu trường Mật khẩu dùng `type="password"`. | Mật khẩu khớp với tài khoản tương ứng. | Mật khẩu không khớp; mật khẩu trống: Chưa được đặc tả rõ cách validation. | Phu thuoc voi Email va trang thai tai khoan. | FR-02, FR-22 |
| Account existence | System state | Có khi kiểm thử tài khoản đã đăng ký | Tài khoản có thể tồn tại hoặc không tồn tại trong hệ thống. | Email tương ứng với tài khoản đã đăng ký. | Email hợp lệ ve format nhung không tồn tại hoặc không được phép đăng nhập. | Phu thuoc voi Email. | FR-02 |
| Account lock state | System state | Có với luồng lockout | Tài khoản có thể không bị khóa, đang bị tạm khóa trong 30 giây, hoặc đã hết thời gian tạm khóa. | Không bị khóa; hoặc đã qua 30 giây tạm khóa. | Đang trong 30 giây tạm khóa. | Phụ thuộc với Failed login counter và thời gian. | FR-02 |
| Failed login counter | Integer system state | Có với luồng đăng nhập sai | Tăng đúng 1 sau mỗi lần đăng nhập sai; nếu sai từ 3 lần trở lên liên tiếp thi tạm khóa 30 giây. | 0-2 lan sai liên tiếp: chưa khóa tài khoản. | Từ 3 lần sai liên tiếp trở lên: tài khoản bị tạm khóa. | Phụ thuộc với kết quả đăng nhập trước đó của cùng tài khoản. | FR-02 |
| Token storage / authenticated state | Client/system state | Có sau đăng nhập thành công | Đăng nhập thành công trả về JWT Token; token được lưu phía client và gửi kèm request xác thực bằng `Authorization: Bearer <token>`. | Sau đăng nhập thành công có token và người dùng vào trang/chức năng cần xác thực. | Đăng nhập thất bại không có token và không vào được trang/chức năng cần xác thực. | Phụ thuộc với kết quả đăng nhập. | FR-02 |

## 3. Phân vùng tương đương

| Class ID | Variable / Condition | Mô tả | Validity | Giá trị đại diện | Requirement source | Ghi chú |
|---|---|---|---|---|---|---|
| EC-EMAIL-V01 | Email | Email dung HTML5 format va thuộc tài khoản đã đăng ký | Valid | `test@eshop.com` | FR-02 | Dùng tài khoản mặc định trong SRS. |
| EC-EMAIL-V02 | Email | Email dung HTML5 format nhung không tồn tại trong hệ thống | Invalid | `notfound.fr02@example.com` | FR-02 | Invalid theo nghia không thể đăng nhập thành công; thông báo không được lộ nguyên nhân. |
| EC-EMAIL-I01 | Email | Email sai HTML5 format | Invalid | `abc` | FR-02, FR-22 | UI phai chặn hoặc báo lỗi format email theo HTML5. |
| EC-EMAIL-I02 | Email | Email trống | Invalid | `` | FR-02 | Bắt buộc nhập Email là suy ra từ mô tả luồng đăng nhập; cách hiển thị lỗi Chưa được đặc tả. |
| EC-PASSWORD-V01 | Password | Mật khẩu khớp với email/tài khoản | Valid | `Test1234!` | FR-02 | Dùng tài khoản mặc định trong SRS. |
| EC-PASSWORD-I01 | Password | Mật khẩu khong khớp với email/tài khoản | Invalid | `Wrong123!` | FR-02 | Phải tăng bộ đếm sai đúng 1 đơn vị. |
| EC-PASSWORD-I02 | Password | Mật khẩu trống | Invalid | `` | FR-02 | Bắt buộc nhập Mật khẩu là suy ra từ mô tả luồng đăng nhập; cách hiển thị lỗi Chưa được đặc tả. |
| EC-ACCOUNT-V01 | Account lock state | Tài khoản không bị khóa | Valid | `test@eshop.com` ở trạng thái chưa có lần sai liên tiếp | FR-02 | Giá trị danh nghĩa cho login. |
| EC-ACCOUNT-V02 | Account lock state | Tài khoản da het 30 giây tạm khóa | Valid | `test@eshop.com` sau khi đợi hơn 30 giây từ lúc bị khóa | FR-02 | Requirement neu thoi gian khoa 30 giây trong môi trường demo. |
| EC-ACCOUNT-I01 | Account lock state | Tài khoản đang trống 30 giây tạm khóa | Invalid | `test@eshop.com` ngay sau 3 lan sai liên tiếp | FR-02 | Mọi đăng nhập trong trạng thái khóa bị từ chối. |
| EC-COUNTER-V01 | Failed login counter | Số lần sai liên tiếp từ 0 đến 2 | Valid | 2 lan nhap `Wrong123!` liên tiếp | FR-02 | Chưa đủ ngưỡng khóa. |
| EC-COUNTER-I01 | Failed login counter | Số lần sai liên tiếp từ 3 trở lên | Invalid | 3 lan nhap `Wrong123!` liên tiếp | FR-02 | Tài khoản bi tạm khóa 30 giây. |
| EC-TOKEN-V01 | Token storage / authenticated state | Đăng nhập thành công co JWT Token được lưu phía client | Valid | Sau login `test@eshop.com` / `Test1234!` | FR-02 | Có thể quan sát qua trạng thái đã đăng nhập/chức năng yêu cầu xác thực. |
| EC-TOKEN-I01 | Token storage / authenticated state | Đăng nhập thất bại khong co token | Invalid | Sau login sai password | FR-02 | Người dùng không được vào khu vực cần xác thực. |

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

| ID | Điều kiện phụ thuộc | Valid condition | Invalid condition | Requirement source | Ghi chú |
|---|---|---|---|---|---|
| DC-01 | Email va Password phai tương ứng voi cung mot tai khoan đã đăng ký | Email đã đăng ký + password khớp + tài khoản không bị khóa | Email khong tồn tại, password khong khop, hoac tai khoan bi khoa | FR-02 | Không được để lộ chi tiết nguyên nhân khi lỗi. |
| DC-02 | Moi lan đăng nhập sai phải tăng bộ đếm lên đúng 1 | 1-2 lan sai liên tiếp chưa khóa tài khoản; lần sai thứ 3 mới kích hoạt khóa | Bộ đếm tăng sai dẫn đến khóa quá sớm, khóa quá muộn, hoặc không khóa | FR-02 | Kiểm thử black-box bằng chuỗi lần thử. |
| DC-03 | Ngưỡng khóa tài khoản phụ thuộc vào số lần sai liên tiếp | Dưới 3 lần sai liên tiếp không khóa; từ 3 lần trở lên thì khóa 30 giây | Không khóa sau 3 lần sai hoặc khóa trước 3 lần sai | FR-02 | Thời gian khóa là 30 giây trong môi trường demo. |
| DC-04 | Trạng thái khoa uu tien hon mật khẩu dung | Trong 30 giây khóa, đăng nhập bị từ chối và không cấp token | Đang trong thời gian khóa nhưng vẫn đăng nhập thành công | FR-02 | Thông báo lỗi phù hợp nhung không lộ chi tiết nguyên nhân. |
| DC-05 | Ket qua đăng nhập thành công phải tạo trạng thái xác thực phía client | Có JWT Token được lưu và người dùng vào được chức năng cần xác thực | Khong co token, token không được lưu, hoac vẫn ở trạng thái chua xac thuc | FR-02 | Chi tiết kỹ thuật cụ thể không đưa vào test case theo yêu cầu người dùng. |

## 5. Domain Matrix

| Test Condition | Email | Password | Account / Counter state | Expected validity | Expected behavior | Covered classes | Lý do chọn |
|---|---|---|---|---|---|---|---|
| COND-FR02-DT-001 | `test@eshop.com` | `Test1234!` | Tài khoản không bị khóa | Valid | Đăng nhập được chấp nhận, token được lưu phía client, người dùng vào trạng thái đã xác thực. | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-V01, EC-TOKEN-V01, DC-01, DC-05 | Bao phủ luồng thành công danh nghĩa. |
| COND-FR02-DT-002 | `abc` | `Test1234!` | Tài khoản không bị khóa | Invalid | Trình duyệt/UI chặn submit hoặc báo lỗi format email HTML5; không tạo token. | EC-EMAIL-I01, EC-PASSWORD-V01, EC-TOKEN-I01 | Isolate email sai format. |
| COND-FR02-DT-003 | `notfound.fr02@example.com` | `Test1234!` | Email khong co tai khoan | Invalid | Đăng nhập bị từ chối bằng thông báo lỗi chung; không để lộ rằng email không tồn tại; không tạo token. | EC-EMAIL-V02, EC-PASSWORD-V01, EC-TOKEN-I01, DC-01 | Bao phủ email hợp format nhưng không đăng nhập được. |
| COND-FR02-DT-004 | `test@eshop.com` | `Wrong123!` | Lan sai thứ 1 va 2 liên tiếp | Invalid | Moi lan sai bị từ chối, không tạo token; tai khoan chưa bị khóa trước lần sai thứ 3. | EC-EMAIL-V01, EC-PASSWORD-I01, EC-ACCOUNT-V01, EC-COUNTER-V01, EC-TOKEN-I01, DC-02 | Kiểm tra bộ đếm không khóa quá sớm và mỗi lần sai được tính riêng. |
| COND-FR02-DT-005 | `test@eshop.com` | `Wrong123!` | Lan sai thứ 3 liên tiếp | Invalid | Tài khoản bi tạm khóa 30 giây; hệ thống trả lời lỗi phù hợp, không lộ chi tiết nguyên nhân, không tạo token. | EC-EMAIL-V01, EC-PASSWORD-I01, EC-COUNTER-I01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-02, DC-03 | Bao phủ ngưỡng khóa tài khoản. |
| COND-FR02-DT-006 | `test@eshop.com` | `Test1234!` | Tài khoản đang trống 30 giây tạm khóa | Invalid | Đăng nhập bị từ chối dù password đúng; không tạo token. | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-04 | Kiểm tra trạng thái khóa ưu tiên hơn credential đúng. |
| COND-FR02-DT-007 | `test@eshop.com` | `Test1234!` | Da qua hon 30 giây từ lúc bị khóa | Valid | Đăng nhập được chấp nhận lại, token được lưu phía client. | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-V02, EC-TOKEN-V01, DC-03, DC-05 | Bao phủ hết thời gian khóa 30 giây. |
| COND-FR02-DT-008 | Email trống | `Test1234!` | Tài khoản không bị khóa | Invalid | Form không chấp nhận đăng nhập khi email trống; không tạo token. | EC-EMAIL-I02, EC-PASSWORD-V01, EC-TOKEN-I01 | Bao phủ input bắt buộc nhập email; thông báo cụ thể Chưa được đặc tả. |
| COND-FR02-DT-009 | `test@eshop.com` | Mật khẩu trống | Tài khoản không bị khóa | Invalid | Form không chấp nhận đăng nhập khi mật khẩu trống; không tạo token. | EC-EMAIL-V01, EC-PASSWORD-I02, EC-TOKEN-I01 | Bao phu input bat buoc nhap mật khẩu; thong bao cu the Chưa được đặc tả. |

## 6. Quá trình lựa chọn test case

Bộ test được chọn theo nguyên tắc mỗi test condition tập trung vào một miền chính, các biến còn lại giữ ở giá trị valid nominal.

- `COND-FR02-DT-001` là luồng thành công danh nghĩa, cần có để đối chiếu với các invalid case.
- `COND-FR02-DT-002` chỉ làm sai format email để xác minh HTML5 email validation.
- `COND-FR02-DT-003` dung email đúng format nhung khong tồn tại de kiem tra thong bao loi không lộ chi tiết nguyên nhân.
- `COND-FR02-DT-004` va `COND-FR02-DT-005` được tách vì requirement có ngưỡng 3 lần sai liên tiếp; cần kiểm tra cả miền dưới ngưỡng và tại ngưỡng.
- `COND-FR02-DT-006` kiểm tra quan hệ phụ thuộc giữa trạng thái khóa và credential đúng.
- `COND-FR02-DT-007` kiểm tra thời hạn khóa 30 giây.
- `COND-FR02-DT-008` va `COND-FR02-DT-009` bao phủ trường trống, nhưng expected message cụ thể được ghi là Chưa được đặc tả.

Không tạo Cartesian product giữa email sai format, password sai, tài khoản khóa và email không tồn tại vì các tổ hợp đó không tăng thêm giá trị coverage rõ ràng và có nguy cơ che lấp nguyên nhân lỗi.

## 7. Ma trận truy vết

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|
| TC-FR02-DT-001 | COND-FR02-DT-001 | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-V01, EC-TOKEN-V01, DC-01, DC-05 | FR-02 | Luồng đăng nhập thành công danh nghĩa. |
| TC-FR02-DT-002 | COND-FR02-DT-002 | EC-EMAIL-I01, EC-PASSWORD-V01, EC-TOKEN-I01 | FR-02, FR-22 | Xác minh email input validate HTML5 format. |
| TC-FR02-DT-003 | COND-FR02-DT-003 | EC-EMAIL-V02, EC-PASSWORD-V01, EC-TOKEN-I01, DC-01 | FR-02 | Xác minh lỗi chung với email không tồn tại. |
| TC-FR02-DT-004 | COND-FR02-DT-004 | EC-EMAIL-V01, EC-PASSWORD-I01, EC-ACCOUNT-V01, EC-COUNTER-V01, EC-TOKEN-I01, DC-02 | FR-02 | Xác minh sai dưới ngưỡng không khóa quá sớm. |
| TC-FR02-DT-005 | COND-FR02-DT-005 | EC-EMAIL-V01, EC-PASSWORD-I01, EC-COUNTER-I01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-02, DC-03 | FR-02 | Xác minh ngưỡng 3 lần sai kích hoạt khóa 30 giây. |
| TC-FR02-DT-006 | COND-FR02-DT-006 | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-04 | FR-02 | Xac minh tai khoan dang khoa van bị từ chối dù password đúng. |
| TC-FR02-DT-007 | COND-FR02-DT-007 | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-V02, EC-TOKEN-V01, DC-03, DC-05 | FR-02 | Xác minh hết 30 giây thì có thể đăng nhập lại. |
| TC-FR02-DT-008 | COND-FR02-DT-008 | EC-EMAIL-I02, EC-PASSWORD-V01, EC-TOKEN-I01 | FR-02 | Bao phủ email trống. |
| TC-FR02-DT-009 | COND-FR02-DT-009 | EC-EMAIL-V01, EC-PASSWORD-I02, EC-TOKEN-I01 | FR-02, FR-22 | Bao phu mật khẩu trống va password field. |

## 8. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng input/condition đã phân tích | 6 |
| Tổng valid classes | 6 |
| Tổng invalid classes | 8 |
| Tổng dependent conditions | 5 |
| Tổng test conditions | 9 |
| Tổng test cases | 9 |
| Classes đã cover | 14 |
| Classes chưa cover | 0 |

| Class / Condition | Trạng thái | Test case cover | Ghi chú |
|---|---|---|---|
| EC-EMAIL-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-004, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-009 | Giá trị danh nghĩa cho tai khoan đã đăng ký. |
| EC-EMAIL-V02 | Đã cover | TC-FR02-DT-003 | Email đúng format nhưng không tồn tại. |
| EC-EMAIL-I01 | Đã cover | TC-FR02-DT-002 | HTML5 email validation. |
| EC-EMAIL-I02 | Đã cover | TC-FR02-DT-008 | Message cu the Chưa được đặc tả. |
| EC-PASSWORD-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-002, TC-FR02-DT-003, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008 | Giá trị danh nghĩa. |
| EC-PASSWORD-I01 | Đã cover | TC-FR02-DT-004, TC-FR02-DT-005 | Password sai và lockout. |
| EC-PASSWORD-I02 | Đã cover | TC-FR02-DT-009 | Message cu the Chưa được đặc tả. |
| EC-ACCOUNT-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-004 | Tài khoản không bị khóa. |
| EC-ACCOUNT-V02 | Đã cover | TC-FR02-DT-007 | Hết 30 giây tạm khóa. |
| EC-ACCOUNT-I01 | Đã cover | TC-FR02-DT-005, TC-FR02-DT-006 | Đang trong thời gian khóa. |
| EC-COUNTER-V01 | Đã cover | TC-FR02-DT-004 | Dưới ngưỡng 3 lần. |
| EC-COUNTER-I01 | Đã cover | TC-FR02-DT-005 | Tại ngưỡng 3 lần. |
| EC-TOKEN-V01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-007 | Đăng nhập thành công. |
| EC-TOKEN-I01 | Đã cover | TC-FR02-DT-002, TC-FR02-DT-003, TC-FR02-DT-004, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-008, TC-FR02-DT-009 | Đăng nhập thất bại. |
| DC-01 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-003 | Quan hệ email-password-account. |
| DC-02 | Đã cover | TC-FR02-DT-004, TC-FR02-DT-005 | Tăng bộ đếm và ngưỡng khóa. |
| DC-03 | Đã cover | TC-FR02-DT-005, TC-FR02-DT-007 | Khóa 30 giây. |
| DC-04 | Đã cover | TC-FR02-DT-006 | Khóa ưu tiên hơn password đúng. |
| DC-05 | Đã cover | TC-FR02-DT-001, TC-FR02-DT-007 | Token/trạng thái xác thực sau login thành công. |

Khong co class nao bi chu dong loai tru. Cac chi tiet thong bao loi cu the khong duoc cover bang noi dung text chinh xac vi requirement chi yeu cau thong bao loi phù hợp va không lộ chi tiết nguyên nhân.

## 9. Giả định và thông tin chưa được đặc tả

- Chưa được đặc tả thông báo lỗi chính xác cho email sai format, email trống, password trống, credential sai và tài khoản bị khóa.
- Chưa được đặc tả bộ đếm đăng nhập sai có reset về 0 sau khi đăng nhập thành công hay sau khi hết 30 giây khóa hay không.
- Chưa được đặc tả cách người kiểm thử quan sát trực tiếp giá trị bộ đếm nội bộ; vì vậy các test case suy luận qua hành vi khóa tài khoản theo chuỗi lần thử.
- Giả định cần xác nhận: tài khoản mặc định `test@eshop.com` / `Test1234!` tồn tại và có thể dùng cho kiểm thử login.
- Gia dinh can xac nhan: có thể đưa tài khoản về trạng thái không bị khóa trước mỗi test case bằng cách đợi hết 30 giây hoặc reset dữ liệu môi trường demo.
