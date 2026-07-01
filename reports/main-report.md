# Main Report - HW02 Domain Testing on EShop

> Sinh viên: Hà Bảo Ngọc - 23127300  
> Nhóm: N08  
> Môn học: CS423 / CSC15003 - Kiểm thử Phần mềm  
> Phạm vi hiện tại: FR-02, FR-10, FR-13, FR-26.

## 1. Tổng quan

Báo cáo này tổng hợp quá trình thiết kế và thực thi test theo Domain Testing và Boundary Value Analysis (BVA) cho các artifact hiện có trong repository. Hệ thống được xem như black-box; Expected Result được đối chiếu từ `requirements/system-requirements.md`. Tài liệu `requirements/api-specification.md` chỉ được dùng để xác minh cách truy cập chức năng khi cần, không dùng để bịa thêm business rule ngoài requirement.

### 1.1. Tài liệu và artifact sử dụng

| Nhóm tài liệu | Đường dẫn |
|---|---|
| Đề bài | `2026.HW02.Domain Testing_En.pdf` |
| Requirement nguồn | `requirements/system-requirements.md` |
| API specification | `requirements/api-specification.md` |
| Analysis | `analysis/FR-02-login/`, `analysis/FR-10-order-state-machine/`, `analysis/FR-13-dashboard/`, `analysis/FR-26-mobile-cart/` |
| Test case | `tests/test-cases/FR-02-login/`, `tests/test-cases/FR-10-order-state-machine/`, `tests/test-cases/FR-13-dashboard/`, `tests/test-cases/FR-26-mobile-cart/` |
| Review | `reviews/FR-02-login/`, `reviews/FR-10-order-state-machine/`, `reviews/FR-13-dashboard/`, `reviews/FR-26-mobile-cart/` |
| Test run | `tests/test-runs/FR-02-login-run.md`, `tests/test-runs/FR-10-order-state-machine-run.md`, `tests/test-runs/FR-13-dashboard-run.md`, `tests/test-runs/FR-26-mobile-cart-run.md` |
| Bug report | `bug-reports/BUG-FR02-*.md`, `bug-reports/BUG-FR10-*.md`, `bug-reports/BUG-FR13-001.md`, `bug-reports/BUG-FR26-*.md` |

### 1.2. Feature selection

| Pool | Feature ID | Feature name | Platform | Trạng thái |
|---|---|---|---|---|
| A | FR-02 | Đăng nhập và khóa tài khoản | Web | Hoàn tất analysis, review, execution, bug report |
| B | FR-10 | Trạng thái đơn hàng | Web / Admin | Hoàn tất analysis, review, execution, bug report |
| C | FR-13 | Dashboard | Web Admin | Hoàn tất analysis, review, execution, bug report |
| D | FR-26 | Giỏ hàng trên Mobile | Mobile | Hoàn tất analysis, review, execution, bug report |

## 2. Phương pháp thực hiện

### 2.1. Domain Testing

Với mỗi feature, quy trình Domain Testing gồm:

1. Đọc requirement và xác định actor, preconditions, input, output, validation rule, business rule, success condition và error condition.
2. Xác định các input condition và system state có ảnh hưởng đến kết quả.
3. Chia valid equivalence class và invalid equivalence class.
4. Xác định dependent condition giữa input và state.
5. Lập Domain Matrix, mỗi test condition gắn với equivalence class hoặc dependency cụ thể.
6. Sinh test case riêng cho từng condition và review trước execution.

### 2.2. Boundary Value Analysis

BVA chỉ được áp dụng khi requirement có boundary, threshold, range, quantity hoặc state threshold rõ ràng. Các boundary được ghi theo convention ON, OFF- và OFF+. Nếu requirement không có boundary hợp lệ, báo cáo ghi rõ `Không áp dụng` thay vì tạo test case gượng ép.

### 2.3. Cách đảm bảo traceability

Mỗi feature được tổ chức theo chuỗi artifact nhất quán:

| Bước | Artifact | Mục đích |
|---|---|---|
| 1 | Requirement trong `requirements/system-requirements.md` | Xác định rule đúng của hệ thống |
| 2 | `analysis/<feature>/domain-testing-analysis.md` hoặc `bva-analysis.md` | Chứng minh cách suy ra class, dependency, boundary và test condition |
| 3 | `tests/test-cases/<feature>/.../TC-*.md` | Chuyển từng condition thành test case có dữ liệu cụ thể |
| 4 | `reviews/<feature>/*-review.md` | Human review để kiểm tra expected result, duplicate, invalid isolation và gap |
| 5 | `tests/test-runs/<feature>-run.md` | Ghi Actual Result sau execution |
| 6 | `bug-reports/BUG-*.md` | Báo cáo bug cho các test case Failed có evidence |

Report này không thay thế các file analysis chi tiết. Thay vào đó, report trình bày reasoning chính để người chấm thấy được quy trình áp dụng kỹ thuật, còn artifact gốc giữ vai trò evidence chi tiết.

### 2.4. Human review và nguyên tắc không bịa requirement

Các output do AI hỗ trợ đều được review trước khi đưa vào execution. Trong quá trình review, các điểm sau được kiểm tra thủ công:

- Expected Result phải quan sát được qua UI/API, không dùng thông báo lỗi cụ thể nếu requirement không đặc tả.
- BVA chỉ dùng boundary có thật; không tạo min/max, length, stock limit hoặc pagination limit nếu requirement không nêu.
- Invalid case ưu tiên isolate một điều kiện sai chính; input còn lại giữ valid nominal.
- Test case Failed chỉ được chuyển thành bug report khi có Actual Result và evidence hoặc mô tả quan sát được.

## 3. Tổng kết test hiện tại

| Feature | Technique | Designed | Executed | Passed | Failed | Blocked | Not Run | Bug count |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| FR-02 | Domain Testing | 9 | 9 | 3 | 6 | 0 | 0 | 5 |
| FR-02 | BVA | 6 | 6 | 3 | 3 | 0 | 0 | 2 linked |
| FR-10 | Domain Testing | 14 | 14 | 11 | 3 | 0 | 0 | 3 |
| FR-10 | BVA | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| FR-13 | Domain Testing | 6 | 6 | 3 | 3 | 0 | 0 | 1 |
| FR-13 | BVA | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| FR-26 | Domain Testing | 14 | 14 | 5 | 9 | 0 | 0 | 5 |
| FR-26 | BVA | 5 | 5 | 3 | 2 | 0 | 0 | 2 linked |
| **Total** |  | **54** | **54** | **28** | **26** | **0** | **0** | **14 unique bugs** |

Ghi chú: cột `Bug count` theo từng dòng technique có thể trùng bug khi một bug được phát hiện bởi nhiều test case. Tổng bug duy nhất hiện có là 14: `BUG-FR02-001` đến `BUG-FR02-005`, `BUG-FR10-001` đến `BUG-FR10-003`, `BUG-FR13-001`, và `BUG-FR26-001` đến `BUG-FR26-005`.

## 4. FR-02 - Đăng nhập và khóa tài khoản

### 4.1. Requirement summary

FR-02 yêu cầu người dùng nhập Email và Mật khẩu để đăng nhập. Đăng nhập thành công trả về JWT Token và token được lưu phía client. Mỗi lần đăng nhập sai làm bộ đếm tăng đúng 1 đơn vị; nếu sai từ 3 lần liên tiếp trở lên, tài khoản bị khóa tạm thời 30 giây trong môi trường demo. Trường email phải dùng `type="email"` và validate HTML5 format. Thông báo lỗi phải phù hợp và không lộ chi tiết nguyên nhân.

### 4.2. Domain Testing analysis

| Nhóm condition | Valid domain | Invalid domain / risk |
|---|---|---|
| Email | Email đúng HTML5 format và thuộc tài khoản đã đăng ký, ví dụ `test@eshop.com` | Email sai format `abc`, email đúng format nhưng không tồn tại, email trống |
| Password | Mật khẩu khớp với email, ví dụ `Test1234!` | Mật khẩu sai `Wrong123!`, mật khẩu trống |
| Account state | Tài khoản không bị khóa hoặc đã hết 30 giây khóa | Tài khoản đang trong thời gian khóa |
| Failed login counter | 0-2 lần sai liên tiếp chưa khóa | Từ 3 lần sai liên tiếp trở lên phải khóa 30 giây |
| Token/authenticated state | Đăng nhập thành công có token và vào trạng thái authenticated | Đăng nhập thất bại không tạo token |

Quy trình phân tích Domain Testing cho FR-02 bắt đầu từ hai input trực tiếp là Email và Mật khẩu, sau đó mở rộng sang các system state có ảnh hưởng đến kết quả đăng nhập: tài khoản tồn tại hay không, tài khoản đang bị khóa hay không, số lần sai liên tiếp, và trạng thái token sau login. Đây là điểm quan trọng vì nếu chỉ kiểm thử field input, bộ test sẽ bỏ sót rule khóa tài khoản, trong khi requirement nhấn mạnh lockout là hành vi chính.

Các equivalence class invalid được chọn theo nguyên tắc isolate: email sai format được kiểm với password hợp lệ; email không tồn tại được kiểm với format hợp lệ; password sai được kiểm với email đã đăng ký. Với các case lockout, test case dùng chuỗi thao tác vì bộ đếm đăng nhập sai là state nội bộ không quan sát trực tiếp được. Do requirement không đặc tả text lỗi chính xác, Expected Result chỉ yêu cầu bị từ chối, không tạo token và không lộ chi tiết nguyên nhân.

Domain Matrix được rút gọn thành 9 test case, mỗi case cover một miền chính:

| Test Case ID | Mục tiêu | Expected Result |
|---|---|---|
| TC-FR02-DT-001 | Đăng nhập thành công với tài khoản hợp lệ | Có token, người dùng vào trạng thái đã đăng nhập |
| TC-FR02-DT-002 | Email sai HTML5 format | Form từ chối hoặc báo lỗi format, không đăng nhập |
| TC-FR02-DT-003 | Email đúng format nhưng không tồn tại | Từ chối đăng nhập, không lộ chi tiết nguyên nhân |
| TC-FR02-DT-004 | Sai mật khẩu dưới ngưỡng khóa | Từ chối nhưng chưa khóa tài khoản |
| TC-FR02-DT-005 | Sai mật khẩu lần thứ 3 | Kích hoạt khóa tạm thời 30 giây |
| TC-FR02-DT-006 | Tài khoản đang khóa nhưng nhập mật khẩu đúng | Vẫn bị từ chối, không tạo token |
| TC-FR02-DT-007 | Đăng nhập lại sau khi hết 30 giây | Được chấp nhận lại và có token |
| TC-FR02-DT-008 | Email trống | Từ chối đăng nhập |
| TC-FR02-DT-009 | Mật khẩu trống | Từ chối đăng nhập, password field không hiện rõ ký tự |

### 4.3. Boundary Value Analysis

FR-02 có hai boundary phù hợp BVA: ngưỡng số lần đăng nhập sai liên tiếp và thời lượng khóa tài khoản.

| Boundary variable | OFF- | ON | OFF+ | Expected behavior |
|---|---:|---:|---:|---|
| `failed_login_attempt_count` | 2 lần sai | 3 lần sai | 4 lần sai | Dưới 3 chưa khóa; từ 3 trở lên bị khóa |
| `elapsed_lock_time` | 29 giây | 30 giây | 31 giây | Trước 30 giây vẫn khóa; đủ 30 giây hoặc sau đó được đăng nhập lại theo requirement |

BVA được áp dụng theo Robust BVA cho state threshold. Với `failed_login_attempt_count`, ON là đúng ngưỡng kích hoạt khóa `3`, OFF- là `2` để phát hiện khóa quá sớm, và OFF+ là `4` để xác nhận vùng đã vượt ngưỡng vẫn bị khóa. Với `elapsed_lock_time`, ON là `30 giây`; OFF- và OFF+ lần lượt là `29 giây` và `31 giây` để phát hiện unlock quá sớm hoặc quá muộn.

Các boundary khác như độ dài email, độ dài password, giới hạn số lần sai tối đa hoặc nội dung thông báo lỗi không được tạo vì FR-02 không đặc tả các giới hạn đó. Riêng mốc đúng 30 giây được review đánh dấu là giả định cần xác nhận do requirement không nêu dung sai đo thời gian, nhưng vẫn giữ lại vì đây là ON boundary bắt buộc của rule khóa 30 giây.

| Test Case ID | Boundary point | Result khi execution |
|---|---|---|
| TC-FR02-BVA-001 | 2 lần sai liên tiếp | Failed |
| TC-FR02-BVA-002 | 3 lần sai liên tiếp | Passed |
| TC-FR02-BVA-003 | 4 lần sai liên tiếp | Passed |
| TC-FR02-BVA-004 | Thử lại sau 29 giây | Passed |
| TC-FR02-BVA-005 | Thử lại tại mốc 30 giây | Failed |
| TC-FR02-BVA-006 | Thử lại sau 31 giây | Failed |

### 4.4. Execution result và bugs

| Bug ID | Tóm tắt | Severity / Priority | Test case liên quan |
|---|---|---|---|
| BUG-FR02-001 | API đăng nhập trả về mật khẩu người dùng ở dạng không mã hóa | Critical / P1 | TC-FR02-DT-001 |
| BUG-FR02-002 | Form đăng nhập dùng sai input type cho email và mật khẩu | High / P2 | TC-FR02-DT-002, TC-FR02-DT-009 |
| BUG-FR02-003 | Tài khoản bị khóa sau 2 lần nhập sai mật khẩu | High / P1 | TC-FR02-DT-004, TC-FR02-BVA-001 |
| BUG-FR02-004 | Frontend không hiển thị thông báo tài khoản bị khóa từ backend | Low / P3 | TC-FR02-DT-006 |
| BUG-FR02-005 | Thời gian khóa tài khoản kéo dài khoảng 180 giây thay vì 30 giây | High / P1 | TC-FR02-DT-007, TC-FR02-BVA-005, TC-FR02-BVA-006 |

### 4.5. Kết luận FR-02

FR-02 có coverage tốt cho cả miền dữ liệu và boundary state threshold. Execution phát hiện các lỗi nghiêm trọng ở bảo mật response, HTML5 validation, ngưỡng khóa và thời lượng khóa. Các lỗi này ảnh hưởng trực tiếp đến luồng đăng nhập và nên ưu tiên sửa trước khi release.

## 5. FR-10 - Trạng thái Đơn hàng

### 5.1. Requirement summary

FR-10 yêu cầu đơn hàng tuân theo state machine gồm 5 trạng thái: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. Các chuyển đổi hợp lệ là `pending` -> `confirmed`, `confirmed` -> `shipping`, `shipping` -> `delivered`, `pending` -> `canceled`, và `confirmed` -> `canceled`. `delivered` và `canceled` là final states, không được chuyển tiếp. User không được tự hủy đơn hàng ở trạng thái `shipping`; các thao tác xác nhận, giao hàng và hoàn tất là thao tác dành cho Admin.

### 5.2. Domain Testing analysis

| Nhóm condition | Valid domain | Invalid domain / risk |
|---|---|---|
| Current status | `pending`, `confirmed`, `shipping` có chuyển đổi hợp lệ tương ứng | Trạng thái ngoài domain như `returned` |
| Final state | `delivered`, `canceled` là trạng thái kết thúc | Hệ thống vẫn cho phép chuyển tiếp từ final state |
| Actor | Admin thực hiện thao tác quản lý; User hủy ở trạng thái được phép | User thực hiện thao tác Admin hoặc actor chưa đăng nhập thao tác trạng thái |
| Target status/action | Chỉ chuyển theo cạnh state machine được đặc tả | Bước nhảy, bước lùi, trạng thái đích ngoài domain |
| Transition dependency | Hợp lệ khi tổ hợp current status, actor và target status khớp rule | Một input hợp lệ riêng lẻ nhưng tổ hợp chuyển đổi không hợp lệ |

Phân tích FR-10 tập trung vào quan hệ phụ thuộc giữa trạng thái hiện tại, actor và trạng thái đích. Đây là feature dạng state machine nên test case được chọn theo cạnh chuyển đổi thay vì tạo Cartesian product giữa mọi trạng thái nguồn và trạng thái đích. Bộ test bao phủ 5 chuyển đổi hợp lệ chính, các nhóm invalid quan trọng như bước nhảy, bước lùi, chuyển từ final state, trạng thái ngoài domain, và rule quyền actor.

Các invalid case được isolate theo mục tiêu: khi kiểm tra bước nhảy thì actor vẫn là Admin hợp lệ; khi kiểm tra User tự hủy đơn đang giao thì trạng thái hiện tại là `shipping` hợp lệ và lỗi chính là tổ hợp actor/action bị cấm. `TC-FR10-DT-014` dùng actor Guest/chưa đăng nhập và đã được đánh dấu là giả định cần xác nhận vì FR-10 không mô tả trực tiếp điều kiện này, nhưng thao tác trạng thái là thao tác ảnh hưởng dữ liệu nên vẫn được giữ như một representative security/system-state case.

Domain Matrix được rút gọn thành 14 test case:

| Test Case ID | Mục tiêu | Result |
|---|---|---|
| TC-FR10-DT-001 | Admin xác nhận đơn hàng đang chờ xử lý | Passed |
| TC-FR10-DT-002 | Admin chuyển đơn hàng đã xác nhận sang đang giao | Passed |
| TC-FR10-DT-003 | Admin hoàn tất đơn hàng đang giao | Passed |
| TC-FR10-DT-004 | User hủy đơn hàng đang chờ xử lý | Passed |
| TC-FR10-DT-005 | Admin hủy đơn hàng đã xác nhận | Passed |
| TC-FR10-DT-006 | Từ chối Admin chuyển `pending` thẳng sang `shipping` | Passed |
| TC-FR10-DT-007 | Từ chối Admin chuyển `confirmed` về `pending` | Passed |
| TC-FR10-DT-008 | Từ chối chuyển trạng thái từ đơn hàng đã giao | Passed |
| TC-FR10-DT-009 | Từ chối chuyển trạng thái từ đơn hàng đã hủy | Failed |
| TC-FR10-DT-010 | Từ chối User tự hủy đơn hàng đang giao | Failed |
| TC-FR10-DT-011 | Từ chối User xác nhận đơn hàng đang chờ xử lý | Failed |
| TC-FR10-DT-012 | Từ chối trạng thái đích ngoài domain | Passed |
| TC-FR10-DT-013 | Từ chối xử lý đơn hàng có trạng thái hiện tại ngoài domain | Passed |
| TC-FR10-DT-014 | Từ chối actor chưa đăng nhập hủy đơn hàng | Passed |

### 5.3. Boundary Value Analysis

BVA không được áp dụng cho FR-10 vì requirement không có biến dạng số, độ dài, ngày giờ, số lần thử, quantity limit hoặc threshold. Các input chính của FR-10 là trạng thái và actor dạng categorical; con số "5 trạng thái" là số phần tử của mô hình state machine, không phải input range có thể kiểm thử bằng ON/OFF.

Review tại `reviews/FR-10-order-state-machine/bva-review.md` kết luận không nên tạo test case BVA gượng ép. Kỹ thuật phù hợp hơn cho FR-10 là Domain Testing hoặc state transition testing, và phần Domain Testing đã bao phủ các cạnh hợp lệ cùng các nhóm chuyển đổi không hợp lệ quan trọng.

### 5.4. Execution result và bugs

| Bug ID | Tóm tắt | Severity / Priority | Test case liên quan |
|---|---|---|---|
| BUG-FR10-001 | Đơn hàng đã hủy vẫn có thể bị chuyển sang đã giao | High / P2 | TC-FR10-DT-009 |
| BUG-FR10-002 | User vẫn hủy được đơn hàng đang giao | High / P2 | TC-FR10-DT-010 |
| BUG-FR10-003 | User thường gọi được API Admin để cập nhật trạng thái đơn hàng | Critical / P1 | TC-FR10-DT-011 |

### 5.5. Kết luận FR-10

FR-10 có coverage tốt cho state machine và quyền thao tác theo actor. Execution cho thấy các chuyển đổi hợp lệ và nhiều invalid transition được chặn đúng, nhưng vẫn tồn tại lỗi nghiêm trọng ở final state `canceled`, rule User không được hủy khi `shipping`, và đặc biệt là kiểm soát quyền API Admin. `BUG-FR10-003` cần ưu tiên cao vì ảnh hưởng trực tiếp đến bảo mật và toàn vẹn dữ liệu đơn hàng.

## 6. FR-13 - Dashboard

### 6.1. Requirement summary

FR-13 yêu cầu Dashboard Admin hiển thị tổng doanh thu và tổng số đơn hàng. Tổng doanh thu chỉ được tính bằng tổng `total_amount` của các đơn có `status = 'delivered'`. Tổng số đơn hàng là số lượng đơn trong hệ thống. Feature phụ thuộc vào quyền truy cập Admin của FR-12.

### 6.2. Domain Testing analysis

| Nhóm condition | Valid domain | Invalid domain / risk |
|---|---|---|
| Admin session | Tài khoản có `role = 'admin'` truy cập dashboard | User không có quyền admin nhìn thấy dashboard |
| Order dataset | Không có đơn, một đơn, nhiều đơn | Dataset bị tính sai hoặc dashboard dùng dữ liệu không đúng |
| Order status | `delivered` được tính vào doanh thu | `pending`, `confirmed`, `shipping`, `canceled` bị cộng sai vào doanh thu |
| Revenue amount | Tổng bằng sum `total_amount` của delivered orders | Doanh thu bị nhân đôi, tính sai, hoặc lấy đơn không delivered |
| Order count | Tổng số đơn hàng phản ánh toàn bộ dataset | Đếm thiếu hoặc đếm sai filter |

Quy trình Domain Testing cho FR-13 tập trung vào rule nghiệp vụ của dashboard thay vì thao tác nhập liệu. Input chính của feature là dataset đơn hàng và role truy cập. Vì requirement nói rõ doanh thu chỉ tính đơn `delivered`, các class được chia theo trạng thái đơn hàng: dataset rỗng, chỉ có delivered, nhiều delivered, trộn delivered với trạng thái khác, không có delivered, và user không có quyền Admin.

Bộ test không tạo Cartesian product giữa mọi trạng thái đơn hàng vì điều đó làm nhiều case trùng mục tiêu. Thay vào đó, mỗi test case đại diện cho một miền rủi ro có ý nghĩa: phép cộng cơ bản, cộng dồn, loại trừ trạng thái không delivered, dataset không có doanh thu, và access control representative. Cách chọn này giúp phát hiện lỗi tính doanh thu mà vẫn giữ bộ test gọn và truy vết được.

Bộ Domain Testing gồm 6 test case:

| Test Case ID | Mục tiêu | Result |
|---|---|---|
| TC-FR13-DT-001 | Dashboard khi chưa có đơn hàng | Passed |
| TC-FR13-DT-002 | Tính doanh thu với một đơn delivered | Failed |
| TC-FR13-DT-003 | Cộng dồn doanh thu của nhiều đơn delivered | Failed |
| TC-FR13-DT-004 | Chỉ tính delivered khi dataset có nhiều trạng thái | Failed |
| TC-FR13-DT-005 | Doanh thu bằng 0 khi không có delivered order | Passed |
| TC-FR13-DT-006 | Từ chối hiển thị dashboard cho user không có quyền Admin | Passed |

### 6.3. Boundary Value Analysis

BVA không được áp dụng cho FR-13 vì requirement không đặc tả min/max, length, range, threshold, quantity limit, date/time range hoặc giới hạn phân trang. `status = 'delivered'` là categorical condition nên phù hợp Domain Testing hơn BVA. Review tại `reviews/FR-13-dashboard/bva-review.md` kết luận không nên tạo test case BVA gượng ép cho feature này.

Quyết định không tạo BVA cho FR-13 là một phần của phân tích kỹ thuật, không phải thiếu sót test. Các giá trị như số tiền doanh thu, số lượng đơn hàng hoặc số dòng hiển thị đều có thể là dữ liệu số, nhưng requirement không đưa ra ngưỡng hành vi nào như min/max, giới hạn phân trang, rule làm tròn hoặc khoảng thời gian thống kê. Vì vậy, tạo boundary cho các biến này sẽ là bịa constraint và có nguy cơ làm Expected Result vượt quá đặc tả.

### 6.4. Execution result và bug

| Bug ID | Tóm tắt | Severity / Priority | Test case liên quan |
|---|---|---|---|
| BUG-FR13-001 | Dashboard hiển thị sai tổng doanh thu cho các tập dữ liệu đơn hàng | High / P2 | TC-FR13-DT-002, TC-FR13-DT-003, TC-FR13-DT-004 |

### 6.5. Kết luận FR-13

Domain Testing cho thấy dashboard đúng với dataset rỗng, dataset không có delivered order và access-control representative, nhưng sai với các miền có delivered order. Lỗi chính nằm ở rule tính tổng doanh thu: dashboard không phản ánh đúng tổng `total_amount` của riêng các đơn `delivered`.

## 7. FR-26 - Giỏ hàng trên Mobile

### 7.1. Requirement summary

FR-26 yêu cầu Mobile App hỗ trợ Giỏ hàng tương đương FR-07. Màn hình phải hiển thị danh sách sản phẩm với Sản phẩm, Đơn giá, Số lượng có nút +/-, Thành tiền và Thao tác. Thêm cùng một sản phẩm phải tăng số lượng, không tạo dòng mới. Xóa sản phẩm phải có dialog xác nhận. Có nút Tiếp tục mua sắm để quay về trang chủ. Tổng tiền phải hiển thị nhãn chính xác `Tổng cộng`; giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.

### 7.2. Domain Testing analysis

| Nhóm condition | Valid domain | Invalid domain / risk |
|---|---|---|
| Cart state | Giỏ có sản phẩm hoặc giỏ trống có empty state | Giỏ trống không có hình minh họa/thông báo |
| Cart row display | Đủ thông tin Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác | Thiếu thông tin hoặc dùng nhãn sai |
| Quantity control | Có nút + và nút - để chỉnh số lượng | Chỉ cho nhập text hoặc thiếu nút |
| Same product add | Thêm sản phẩm đã có thì tăng số lượng dòng hiện có | Tạo dòng trùng sản phẩm |
| Delete flow | Bấm xóa hiện dialog; xác nhận mới xóa; hủy thì giữ lại | Xóa ngay không xác nhận |
| Continue shopping | Có nút Tiếp tục mua sắm và quay về trang chủ | Thiếu nút hoặc wording sai với requirement |
| Total label | Hiển thị `Tổng cộng` | Hiển thị `Tổng tạm tính` hoặc nhãn khác |

Quy trình Domain Testing cho FR-26 bắt đầu từ requirement “Mobile tương đương FR-07”, nên analysis kế thừa các nghĩa vụ chính của giỏ hàng web nhưng điều chỉnh context sang Mobile App. Các class không chỉ kiểm tra dữ liệu giỏ hàng mà còn kiểm tra tính đầy đủ của UI mobile: nhãn `Đơn giá`, control `+/-`, dialog xác nhận xóa, nút `Tiếp tục mua sắm`, nhãn tổng tiền `Tổng cộng`, empty state và cách hiển thị nhiều sản phẩm.

Bộ test được tách thành 14 case thay vì gộp nhiều assertion vào vài test lớn. Lý do là FR-26 có nhiều requirement UI độc lập; nếu gộp vào một case, khi Failed sẽ khó xác định requirement nào bị vi phạm và khó tạo bug report theo root cause. Review cũng đã điều chỉnh để dữ liệu test cụ thể hơn, ví dụ dùng `iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` với đơn giá rõ ràng.

Bộ Domain Testing gồm 14 test case để đồng bộ mức chi tiết với FR-07:

| Test Case ID | Mục tiêu | Result |
|---|---|---|
| TC-FR26-DT-001 | Hiển thị danh sách sản phẩm với đủ thông tin | Passed |
| TC-FR26-DT-002 | Hiển thị đúng nhãn Đơn giá | Failed |
| TC-FR26-DT-003 | Cột Số lượng có nút + và nút - | Failed |
| TC-FR26-DT-004 | Bấm nút + để tăng số lượng | Failed |
| TC-FR26-DT-005 | Bấm nút - để giảm số lượng | Failed |
| TC-FR26-DT-006 | Thêm cùng sản phẩm tăng số lượng, không tạo dòng mới | Passed |
| TC-FR26-DT-007 | Nút xóa hiện dialog xác nhận trước khi xóa | Failed |
| TC-FR26-DT-008 | Xác nhận xóa sản phẩm khỏi giỏ | Failed |
| TC-FR26-DT-009 | Hủy xóa sản phẩm trong dialog | Failed |
| TC-FR26-DT-010 | Nút Tiếp tục mua sắm quay về trang chủ Mobile | Failed |
| TC-FR26-DT-011 | Nhãn tổng tiền là Tổng cộng | Failed |
| TC-FR26-DT-012 | Giỏ hàng trống có hình minh họa và thông báo | Passed |
| TC-FR26-DT-013 | Thành tiền bằng Đơn giá nhân Số lượng | Passed |
| TC-FR26-DT-014 | Nhiều sản phẩm khác nhau hiển thị nhiều dòng riêng | Passed |

### 7.3. Boundary Value Analysis

FR-26 có boundary có thể quan sát được quanh lower boundary của số lượng dòng giỏ hàng và boundary empty/non-empty của collection giỏ hàng.

| Boundary variable | OFF- | ON | OFF+ | Ghi chú |
|---|---:|---:|---:|---|
| `cartLineQuantity` | 0 | 1 | 2 | Số lượng dòng sản phẩm tồn tại không được hiển thị 0; lower boundary hợp lệ là 1 |
| `cartItemCount` | Không tạo -1 | 0 | 1 | `-1` không executable qua black-box; 0 là giỏ trống, 1 là ngay trên empty boundary |

BVA cho FR-26 được áp dụng cẩn trọng vì requirement không nêu max quantity, tồn kho hoặc số dòng tối đa. Boundary hợp lệ nhất là lower boundary của số lượng dòng sản phẩm trong giỏ: một dòng tồn tại phải có số lượng tối thiểu là 1; trạng thái 0 không được hiển thị như một dòng hợp lệ. Boundary thứ hai là empty/non-empty của collection giỏ hàng: `0` dòng kích hoạt empty state, `1` dòng là ngay trên biên empty và phải hiển thị danh sách sản phẩm.

Không tạo test cho `cartItemCount = -1` vì trạng thái này không thể tạo qua black-box UI. Không tạo upper-bound case vì requirement không đặc tả giới hạn số lượng, stock hoặc maximum cart size. Điều này giúp bộ BVA phản ánh đúng requirement thay vì suy đoán thêm rule.

| Test Case ID | Boundary point | Result |
|---|---|---|
| TC-FR26-BVA-001 | Số lượng dòng giỏ hàng bằng 1 | Passed |
| TC-FR26-BVA-002 | Không cho dòng giỏ hàng tồn tại với số lượng 0 | Failed |
| TC-FR26-BVA-003 | Số lượng tăng lên 2 ngay trên biên dưới | Failed |
| TC-FR26-BVA-004 | Giỏ hàng có 0 dòng sản phẩm | Passed |
| TC-FR26-BVA-005 | Giỏ hàng có 1 dòng sản phẩm | Passed |

### 7.4. Execution result và bugs

| Bug ID | Tóm tắt | Severity / Priority | Test case liên quan |
|---|---|---|---|
| BUG-FR26-001 | Nhãn đơn giá hiển thị là `Giá` thay vì `Đơn giá` | Low / P2 | TC-FR26-DT-002 |
| BUG-FR26-002 | Khu vực số lượng không có nút + và nút - | Medium / P2 | TC-FR26-DT-003, TC-FR26-DT-004, TC-FR26-DT-005, TC-FR26-BVA-003 |
| BUG-FR26-003 | Xóa sản phẩm khỏi giỏ hàng không hiện dialog xác nhận | High / P2 | TC-FR26-DT-007, TC-FR26-DT-008, TC-FR26-DT-009, TC-FR26-BVA-002 |
| BUG-FR26-004 | Nút tiếp tục mua sắm hiển thị `Mua tiếp` | Low / P3 | TC-FR26-DT-010 |
| BUG-FR26-005 | Nhãn tổng tiền hiển thị `Tổng tạm tính` | Low / P2 | TC-FR26-DT-004, TC-FR26-DT-005, TC-FR26-DT-011 |

### 7.5. Kết luận FR-26

FR-26 đã cover các miền UI và hành vi chính của giỏ hàng Mobile. Execution cho thấy các tính toán và trạng thái cơ bản như thành tiền, empty state, thêm cùng sản phẩm và nhiều sản phẩm khác nhau hoạt động đúng. Tuy nhiên, các yêu cầu UI/interaction quan trọng bị sai: thiếu nút +/-, không có dialog xác nhận xóa, và sai nhãn `Đơn giá`, `Tổng cộng`, `Tiếp tục mua sắm`.

## 8. Review và readiness

| Feature | Technique | Review file | Kết luận review |
|---|---|---|---|
| FR-02 | Domain Testing | `reviews/FR-02-login/domain-testing-review.md` | Sẵn sàng execution |
| FR-02 | BVA | `reviews/FR-02-login/bva-review.md` | Sẵn sàng execution, có lưu ý mốc đúng 30 giây |
| FR-10 | Domain Testing | `reviews/FR-10-order-state-machine/domain-testing-review.md` | Sẵn sàng execution |
| FR-10 | BVA | `reviews/FR-10-order-state-machine/bva-review.md` | Bị chặn do thiếu boundary trong requirement |
| FR-13 | Domain Testing | `reviews/FR-13-dashboard/domain-testing-review.md` | Sẵn sàng execution |
| FR-13 | BVA | `reviews/FR-13-dashboard/bva-review.md` | Bị chặn do thiếu boundary trong requirement |
| FR-26 | Domain Testing | `reviews/FR-26-mobile-cart/domain-testing-review.md` | Sẵn sàng execution |
| FR-26 | BVA | `reviews/FR-26-mobile-cart/bva-review.md` | Sẵn sàng execution |

## 9. Traceability overview

| Feature | Requirement focus | Analysis evidence | Test case evidence | Execution evidence | Bug evidence |
|---|---|---|---|---|---|
| FR-02 | Email/password login, lockout threshold, 30-second lock duration, JWT token | `analysis/FR-02-login/domain-testing-analysis.md`, `analysis/FR-02-login/bva-analysis.md` | 9 DT + 6 BVA test cases | `tests/test-runs/FR-02-login-run.md` | `BUG-FR02-001` to `BUG-FR02-005` |
| FR-10 | Order state machine, final states, actor permissions, invalid transitions | `analysis/FR-10-order-state-machine/domain-testing-analysis.md`, `analysis/FR-10-order-state-machine/bva-analysis.md` | 14 DT test cases; BVA not applicable | `tests/test-runs/FR-10-order-state-machine-run.md` | `BUG-FR10-001` to `BUG-FR10-003` |
| FR-13 | Dashboard revenue only from delivered orders and total order count | `analysis/FR-13-dashboard/domain-testing-analysis.md`, `analysis/FR-13-dashboard/bva-analysis.md` | 6 DT test cases; BVA not applicable | `tests/test-runs/FR-13-dashboard-run.md` | `BUG-FR13-001` |
| FR-26 | Mobile cart display, quantity controls, delete confirmation, total label, empty state | `analysis/FR-26-mobile-cart/domain-testing-analysis.md`, `analysis/FR-26-mobile-cart/bva-analysis.md` | 14 DT + 5 BVA test cases | `tests/test-runs/FR-26-mobile-cart-run.md` | `BUG-FR26-001` to `BUG-FR26-005` |

Coverage được xem là đủ cho phạm vi hiện tại khi mỗi requirement rule chính có ít nhất một test case truy vết được từ analysis sang execution. Các rule chưa có boundary hoặc thiếu chi tiết trong requirement được ghi vào mục gap thay vì biến thành expected result tự suy đoán.

## 10. AI gap analysis và điều chỉnh sau review

Trong quá trình dùng AI, các kết quả ban đầu không được dùng trực tiếp mà được review và chỉnh lại để sát kỹ thuật kiểm thử hơn.

| Feature | Gap / điểm AI dễ sai | Cách review đã sửa |
|---|---|---|
| FR-02 | AI có xu hướng xem login chỉ là cặp input email/password, dễ bỏ sót state của bộ đếm sai liên tiếp và lock duration | Bổ sung system state `failed_login_attempt_count`, `account lock state`, `elapsed_lock_time`; tách Domain Testing và BVA cho lockout |
| FR-02 | Mốc đúng 30 giây dễ bị diễn giải quá tự tin | Review đánh dấu đây là giả định cần xác nhận do requirement không nêu dung sai thời gian |
| FR-10 | AI có thể cố xem thứ tự state machine là boundary số học | Review loại trừ BVA cho enum trạng thái và ghi rõ không suy diễn `pending = 1`, `confirmed = 2`, ... |
| FR-10 | AI dễ tạo quá nhiều tổ hợp trạng thái nguồn/đích hoặc bỏ sót quyền actor | Domain Testing chọn representative theo cạnh hợp lệ, bước nhảy, bước lùi, final state, trạng thái ngoài domain và actor permission |
| FR-13 | AI có thể cố tạo BVA cho số tiền hoặc số đơn dù requirement không nêu boundary | Review kết luận BVA không áp dụng, tránh bịa min/max hoặc range |
| FR-26 | AI ban đầu dễ gộp nhiều UI assertion vào một test case lớn | Review tách thành 14 Domain Testing case để traceability rõ với từng rule của FR-07/FR-26 |
| FR-26 | AI có thể ép hành vi cụ thể khi số lượng giảm về 0 | Expected Result được viết lại theo requirement: không hiển thị dòng số lượng 0; nếu thao tác dẫn tới xóa thì phải có dialog xác nhận |

Nguyên tắc rút ra là AI hữu ích để tạo khung phân tích và đề xuất class/boundary, nhưng người kiểm thử phải kiểm tra lại từng constraint với requirement. Những gì requirement không nói rõ phải được ghi là `Chưa được đặc tả` hoặc `Giả định cần xác nhận`, không biến thành rule kiểm thử cứng.

## 11. Requirement gaps và assumptions

| Feature | Gap / assumption | Ảnh hưởng |
|---|---|---|
| FR-02 | Chưa đặc tả thông báo lỗi chính xác cho credential sai, tài khoản khóa, email trống, password trống | Test chỉ kiểm tra thông báo phù hợp và không lộ chi tiết nguyên nhân |
| FR-02 | Chưa đặc tả dung sai thời gian tại mốc 30 giây | TC-FR02-BVA-005 cần ghi Actual Result cẩn thận tại đúng boundary |
| FR-10 | Chưa đặc tả thông báo lỗi chính xác cho từng chuyển đổi không hợp lệ | Test chỉ kiểm tra trạng thái không đổi và lỗi phù hợp |
| FR-10 | Chưa đặc tả cách chuẩn bị dữ liệu đơn hàng ở từng trạng thái | Execution cần tạo hoặc chọn đơn hàng có trạng thái hiện tại rõ ràng |
| FR-10 | Actor Guest/chưa đăng nhập không được FR-10 đặc tả trực tiếp | TC-FR10-DT-014 được ghi là giả định cần xác nhận |
| FR-10 | Không có boundary hợp lệ cho BVA | Không tạo BVA test case cho FR-10 |
| FR-13 | Chưa đặc tả cách chuẩn bị dataset đơn hàng cho dashboard | Execution cần tạo data test có status và total amount rõ ràng |
| FR-13 | Không có boundary hợp lệ cho BVA | Không tạo BVA test case cho FR-13 |
| FR-26 | Chưa đặc tả text chính xác của dialog xác nhận xóa và empty-state message | Test kiểm tra ý nghĩa hành vi thay vì wording chi tiết |
| FR-26 | Chưa đặc tả max quantity, tồn kho, hoặc số dòng giỏ hàng tối đa | BVA không tạo upper-bound case |

## 12. Kết luận chung

Project đã thiết kế và thực thi 54 test case cho 4 feature: FR-02, FR-10, FR-13 và FR-26. Kết quả có 28 test case Passed và 26 test case Failed, tạo 14 bug report duy nhất. Các lỗi có mức ảnh hưởng cao nhất tập trung ở FR-02 và FR-10: FR-02 có lỗi lộ mật khẩu trong response, khóa tài khoản sai ngưỡng và thời gian khóa dài hơn requirement; FR-10 có lỗi kiểm soát quyền API Admin cho phép User thường cập nhật trạng thái đơn hàng. FR-13 phát hiện lỗi tính doanh thu dashboard. FR-26 phát hiện nhiều lỗi UI/interaction trên Mobile, đặc biệt là thiếu nút +/-, thiếu dialog xác nhận xóa và sai nhãn tổng tiền.

Phạm vi Pool A, B, C và D đã có artifact analysis, review, execution và bug report tương ứng. Với các feature không có boundary hợp lệ như FR-10 và FR-13, báo cáo chủ động ghi `Không áp dụng BVA` để tránh tạo test case vượt quá requirement.
