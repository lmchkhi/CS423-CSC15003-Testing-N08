# Phân tích Boundary Value Analysis — FR-02: Đăng nhập và Khóa tài khoản

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-02 |
| Tên chức năng | Đăng nhập và Khóa tài khoản |
| Input | Email, Mật khẩu, số lần đăng nhập sai liên tiếp, thời gian đã trôi qua kể từ khi tài khoản bị khóa |
| Preconditions | Tài khoản kiểm thử tồn tại; có thể đưa tài khoản về trạng thái không bị khóa trước mỗi test; hệ thống đang hoạt động. |
| Validation rules | Trường email phải dùng `type="email"` và validate HTML5 format. |
| Business rules | Sau mỗi lần đăng nhập sai, bộ đếm tăng đúng 1 đơn vị. Nếu đăng nhập sai từ 3 lần trở lên liên tiếp, tài khoản bị tạm khóa 30 giây trong môi trường demo. |
| Success condition | Đăng nhập thành công trả về JWT Token; token được lưu phía client và dùng cho yêu cầu xác thực. |
| Error conditions | Đăng nhập sai bị từ chối; tài khoản đang bị tạm khóa bị từ chối; thông báo lỗi phù hợp và không lộ chi tiết nguyên nhân. |
| Tài liệu đối chiếu | `requirements/api-specification.md` chỉ được dùng để xác minh rằng chức năng đăng nhập có tồn tại trong đặc tả kỹ thuật; không đưa endpoint, method, request body hoặc công cụ kiểm thử vào artifact. |

FR-02 phù hợp để áp dụng Boundary Value Analysis vì có hai ngưỡng có thứ tự rõ ràng: ngưỡng số lần đăng nhập sai liên tiếp là `3 lần trở lên`, và thời lượng khóa là `30 giây`.

## 2. Các biến có biên

| Variable | Type | Constraint | Lower boundary | Upper boundary | Inclusive / Exclusive | Unit | Nominal value | Requirement source | Thông tin còn thiếu |
|---|---|---|---:|---:|---|---|---|---|---|
| `failed_login_attempt_count` | Integer system state | Nếu đăng nhập sai từ 3 lần trở lên liên tiếp thì tài khoản bị tạm khóa | 3 | Chưa được đặc tả | Inclusive tại ngưỡng khóa: `>= 3` | lần sai liên tiếp | 1 lần sai hoặc 0 lần sai trước test | FR-02 | Không quan sát trực tiếp được bộ đếm; cần suy luận qua hành vi khóa. Không đặc tả giới hạn trên. |
| `elapsed_lock_time` | Time duration system state | Tài khoản bị tạm khóa 30 giây | 30 | 30 | Giả định cần xác nhận: hết đủ 30 giây thì được đăng nhập lại | giây | 31 giây sau khi khóa hoặc tài khoản chưa khóa | FR-02 | Không đặc tả dung sai đo thời gian; không đặc tả chính xác hành vi tại đúng thời điểm 30.000 giây. |

Các field `Email` và `Mật khẩu` không được chọn làm biến BVA trong FR-02 vì requirement không nêu min/max length hoặc numeric range cho hai field này. Email format là miền hợp lệ/không hợp lệ phù hợp hơn với Domain Testing.

## 3. Phương pháp BVA được sử dụng

- Phương pháp: Robust BVA có điều chỉnh cho state threshold.
- Lý do lựa chọn: FR-02 có ngưỡng lỗi ở đúng điểm `3 lần` và ngưỡng thời gian `30 giây`. Cần kiểm tra cả ngay dưới ngưỡng, tại ngưỡng và ngay trên ngưỡng để phát hiện khóa quá sớm, khóa quá muộn hoặc hết khóa sai thời điểm.
- Quy tắc isolate: Khi kiểm thử một boundary, các input không phải mục tiêu dùng giá trị valid nominal: Email `test@eshop.com`, mật khẩu đúng `Test1234!`, mật khẩu sai `Wrong123!`, tài khoản tồn tại và không bị khóa khi bắt đầu chuỗi tạo trạng thái.
- Không tạo Cartesian product giữa hai biến vì mỗi biến yêu cầu chuỗi trạng thái riêng; kết hợp tất cả giá trị biên sẽ làm test case dài và che mất mục tiêu kiểm thử chính.

## 4. Xác định ON, OFF⁻ và OFF⁺

| Variable | Boundary | OFF⁻ | ON | OFF⁺ | Ghi chú |
|---|---|---:|---:|---:|---|
| `failed_login_attempt_count` | Minimum threshold kích hoạt khóa | 2 lần sai liên tiếp | 3 lần sai liên tiếp | 4 lần sai liên tiếp | Với minimum boundary, `OFF⁻ = min - 1` là ngay dưới ngưỡng nên chưa bị khóa; `ON = min` là đúng ngưỡng nên bị khóa; `OFF⁺ = min + 1` nằm trong vùng `>= 3` nên vẫn bị khóa. |
| `elapsed_lock_time` | Duration threshold hết khóa | 29 giây | 30 giây | 31 giây | Với boundary thời gian khóa, `OFF⁻ = 30 - 1` vẫn trong thời gian khóa; `ON = 30` là đúng thời lượng khóa; `OFF⁺ = 30 + 1` đã qua thời lượng khóa. Hành vi chính xác tại đúng 30 giây là giả định cần xác nhận. |

## 5. Boundary Value Derivation

| Boundary Value ID | Variable | Constraint | Boundary type | Point | Formula | Test value | Validity | Expected behavior | Requirement reference |
|---|---|---|---|---|---|---|---|---|---|
| BV-FAILED-001 | `failed_login_attempt_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Minimum threshold | OFF⁻ | `3 - 1` | 2 lần nhập sai liên tiếp | Valid đối với trạng thái chưa khóa | Hai lần đăng nhập sai đều bị từ chối, nhưng tài khoản chưa bị khóa trước lần sai thứ 3. | FR-02 |
| BV-FAILED-002 | `failed_login_attempt_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Minimum threshold | ON | `3` | 3 lần nhập sai liên tiếp | Invalid đối với trạng thái đăng nhập tiếp theo | Lần sai thứ 3 kích hoạt khóa tạm thời 30 giây; không tạo token. | FR-02 |
| BV-FAILED-003 | `failed_login_attempt_count` | Khóa nếu sai từ 3 lần trở lên liên tiếp | Minimum threshold | OFF⁺ | `3 + 1` | 4 lần nhập sai liên tiếp | Invalid | Tài khoản vẫn bị từ chối vì đã ở vùng `>= 3`; không tạo token và không lộ chi tiết nguyên nhân. | FR-02 |
| BV-LOCKTIME-001 | `elapsed_lock_time` | Khóa tạm thời 30 giây | Time threshold | OFF⁻ | `30 - 1` | 29 giây sau khi kích hoạt khóa | Invalid | Đăng nhập vẫn bị từ chối vì còn trong thời gian khóa; không tạo token. | FR-02 |
| BV-LOCKTIME-002 | `elapsed_lock_time` | Khóa tạm thời 30 giây | Time threshold | ON | `30` | 30 giây sau khi kích hoạt khóa | Valid theo giả định hết đủ 30 giây | Đăng nhập với credential đúng được chấp nhận lại; token được lưu phía client. | FR-02 |
| BV-LOCKTIME-003 | `elapsed_lock_time` | Khóa tạm thời 30 giây | Time threshold | OFF⁺ | `30 + 1` | 31 giây sau khi kích hoạt khóa | Valid | Đăng nhập với credential đúng được chấp nhận lại; token được lưu phía client. | FR-02 |

## 6. Dependent Boundaries

| ID | Quan hệ | Boundary values | Expected behavior |
|---|---|---|---|
| DB-01 | `failed_login_attempt_count` phụ thuộc vào chuỗi đăng nhập sai liên tiếp của cùng một tài khoản | BV-FAILED-001, BV-FAILED-002, BV-FAILED-003 | Mỗi lần sai tăng bộ đếm đúng 1; dưới 3 chưa khóa, từ 3 trở lên khóa 30 giây. |
| DB-02 | `elapsed_lock_time` chỉ có ý nghĩa sau khi đã kích hoạt khóa bằng 3 lần sai liên tiếp | BV-LOCKTIME-001, BV-LOCKTIME-002, BV-LOCKTIME-003 | Trong thời gian khóa bị từ chối; hết thời lượng khóa thì có thể đăng nhập lại với credential đúng. |

## 7. BVA Test Matrix

| Test Condition | Target variable | Boundary Value ID | Boundary point | Test value | Các ràng buộc khác | Expected validity | Expected behavior | Lý do lựa chọn |
|---|---|---|---|---|---|---|---|---|
| COND-FR02-BVA-001 | `failed_login_attempt_count` | BV-FAILED-001 | OFF⁻ | 2 lần nhập sai liên tiếp | Email `test@eshop.com`, mật khẩu sai `Wrong123!`, tài khoản ban đầu không bị khóa | Valid đối với trạng thái chưa khóa | Hai lần sai bị từ chối nhưng chưa khóa tài khoản; lần thử đúng ngay sau đó được chấp nhận. | Kiểm tra không khóa quá sớm ở ngay dưới ngưỡng. |
| COND-FR02-BVA-002 | `failed_login_attempt_count` | BV-FAILED-002 | ON | 3 lần nhập sai liên tiếp | Email `test@eshop.com`, mật khẩu sai `Wrong123!`, tài khoản ban đầu không bị khóa | Invalid | Lần sai thứ 3 kích hoạt khóa 30 giây; đăng nhập đúng ngay sau đó vẫn bị từ chối. | Kiểm tra đúng ngưỡng khóa. |
| COND-FR02-BVA-003 | `failed_login_attempt_count` | BV-FAILED-003 | OFF⁺ | 4 lần nhập sai liên tiếp | Email `test@eshop.com`, mật khẩu sai `Wrong123!`, tài khoản ban đầu không bị khóa | Invalid | Sau khi đạt vùng `>= 3`, lần thử tiếp theo vẫn bị từ chối do tài khoản đang khóa. | Kiểm tra vùng ngay trên ngưỡng vẫn bị khóa. |
| COND-FR02-BVA-004 | `elapsed_lock_time` | BV-LOCKTIME-001 | OFF⁻ | 29 giây sau khi khóa | Tài khoản đã bị khóa bằng 3 lần sai; dùng mật khẩu đúng `Test1234!` ở lần kiểm tra | Invalid | Đăng nhập bị từ chối vì còn trong thời gian khóa; không tạo token. | Kiểm tra không hết khóa quá sớm. |
| COND-FR02-BVA-005 | `elapsed_lock_time` | BV-LOCKTIME-002 | ON | 30 giây sau khi khóa | Tài khoản đã bị khóa bằng 3 lần sai; dùng mật khẩu đúng `Test1234!` ở lần kiểm tra | Valid theo giả định cần xác nhận | Đăng nhập được chấp nhận lại sau đủ 30 giây; token được lưu phía client. | Kiểm tra đúng mốc hết thời lượng khóa. |
| COND-FR02-BVA-006 | `elapsed_lock_time` | BV-LOCKTIME-003 | OFF⁺ | 31 giây sau khi khóa | Tài khoản đã bị khóa bằng 3 lần sai; dùng mật khẩu đúng `Test1234!` ở lần kiểm tra | Valid | Đăng nhập được chấp nhận lại; token được lưu phía client. | Kiểm tra ngay trên mốc thời gian khóa. |

## 8. Quá trình lựa chọn test case

Mỗi boundary condition được chuyển thành một test case riêng để dễ truy vết và tránh trộn nhiều mục tiêu kiểm thử. Với boundary số lần sai, test case sử dụng chuỗi thao tác đăng nhập sai liên tiếp trên cùng tài khoản vì bộ đếm là trạng thái nội bộ không quan sát trực tiếp. Với boundary thời gian khóa, test case trước tiên tạo trạng thái khóa bằng 3 lần đăng nhập sai, sau đó chỉ thay đổi thời điểm thử lại bằng credential đúng.

Giá trị danh nghĩa:

- Email hợp lệ và đã đăng ký: `test@eshop.com`.
- Mật khẩu đúng: `Test1234!`.
- Mật khẩu sai: `Wrong123!`.
- Tài khoản bắt đầu ở trạng thái không bị khóa.

Các boundary bị loại trừ:

- Độ dài Email và Mật khẩu: FR-02 không đặc tả min/max length cho login.
- Giới hạn trên của số lần sai liên tiếp: Chưa được đặc tả.
- Nội dung chính xác của thông báo lỗi: Chưa được đặc tả.

## 9. Ma trận truy vết

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | BV-FAILED-001 | `failed_login_attempt_count` OFF⁻ | 2 lần nhập sai liên tiếp | Valid đối với trạng thái chưa khóa | FR-02 |
| TC-FR02-BVA-002 | BV-FAILED-002 | `failed_login_attempt_count` ON | 3 lần nhập sai liên tiếp | Invalid | FR-02 |
| TC-FR02-BVA-003 | BV-FAILED-003 | `failed_login_attempt_count` OFF⁺ | 4 lần nhập sai liên tiếp | Invalid | FR-02 |
| TC-FR02-BVA-004 | BV-LOCKTIME-001 | `elapsed_lock_time` OFF⁻ | 29 giây sau khi khóa | Invalid | FR-02 |
| TC-FR02-BVA-005 | BV-LOCKTIME-002 | `elapsed_lock_time` ON | 30 giây sau khi khóa | Valid theo giả định cần xác nhận | FR-02 |
| TC-FR02-BVA-006 | BV-LOCKTIME-003 | `elapsed_lock_time` OFF⁺ | 31 giây sau khi khóa | Valid | FR-02 |

## 10. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng biến có biên | 2 |
| Tổng lower boundaries | 2 |
| Tổng upper boundaries | 0 |
| Tổng dependent boundaries | 2 |
| Phương pháp BVA | Robust BVA có điều chỉnh cho state threshold |
| Tổng boundary values | 6 |
| Tổng test cases | 6 |
| Boundary values đã cover | 6 |
| Boundary values chưa cover | 0 |

| Boundary Value ID | Trạng thái | Test case cover | Ghi chú |
|---|---|---|---|
| BV-FAILED-001 | Đã cover | TC-FR02-BVA-001 | Ngay dưới ngưỡng khóa. |
| BV-FAILED-002 | Đã cover | TC-FR02-BVA-002 | Đúng ngưỡng khóa. |
| BV-FAILED-003 | Đã cover | TC-FR02-BVA-003 | Ngay trên ngưỡng khóa. |
| BV-LOCKTIME-001 | Đã cover | TC-FR02-BVA-004 | Ngay trước khi hết 30 giây. |
| BV-LOCKTIME-002 | Đã cover | TC-FR02-BVA-005 | Đúng mốc 30 giây, có giả định cần xác nhận. |
| BV-LOCKTIME-003 | Đã cover | TC-FR02-BVA-006 | Ngay sau mốc 30 giây. |

## 11. Giả định và thông tin chưa được đặc tả

- Chưa được đặc tả thông báo lỗi chính xác cho đăng nhập sai và tài khoản bị khóa; expected result chỉ yêu cầu thông báo phù hợp và không lộ chi tiết nguyên nhân.
- Chưa được đặc tả cách quan sát trực tiếp bộ đếm đăng nhập sai; test case suy luận qua hành vi khóa/không khóa.
- Chưa được đặc tả bộ đếm có reset sau khi đăng nhập thành công hoặc sau khi hết 30 giây khóa hay không.
- Giả định cần xác nhận: tại đúng thời điểm đủ 30 giây kể từ lúc khóa, tài khoản được phép đăng nhập lại.
- Chưa được đặc tả dung sai thời gian khi kiểm thử mốc 29/30/31 giây; người kiểm thử cần ghi Actual Result theo thời điểm quan sát thực tế khi execution.
