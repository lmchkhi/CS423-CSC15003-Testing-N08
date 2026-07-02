# Phân tích Decision Table và Pairwise: FR-02 — Đăng nhập & Khóa tài khoản

## 1. Phạm vi và nguồn

| Field | Value |
|---|---|
| Requirement | FR-02: Đăng nhập & Khóa tài khoản |
| Nguồn chính | Requirement FR-02 do người dùng cung cấp |
| Nguồn bổ sung | Không sử dụng |
| Phương pháp | Black-box; không đọc source code, database, server log hoặc đặc tả ngoài requirement |
| Ngoài phạm vi | Độ mạnh mật khẩu, đăng ký, quên mật khẩu, thuật toán/khoá ký JWT, hành vi chi tiết của endpoint được bảo vệ khi thiếu token |

## 2. Requirement đã chuẩn hóa

**Tóm tắt hành vi:** Người dùng đăng nhập bằng email và mật khẩu. Email sai định dạng bị HTML5 validation chặn. Với tài khoản chưa khóa, thông tin đúng tạo JWT; thông tin sai tăng bộ đếm đúng một đơn vị. Lần sai liên tiếp thứ ba kích hoạt khóa 30 giây. Trong thời gian khóa không được cấp token. JWT được lưu phía client và gắn vào mọi request cần xác thực dưới dạng Bearer token.

| Thành phần | Nội dung trích xuất |
|---|---|
| Actor | Người dùng chưa đăng nhập; client web; backend xác thực |
| Entry point / Trigger | Form đăng nhập; request đăng nhập; request tới tài nguyên cần xác thực |
| Input | Email, mật khẩu |
| Trạng thái / Lịch sử | Số lần đăng nhập sai liên tiếp; tài khoản chưa khóa/đang khóa/hết hạn khóa |
| Ngưỡng / Thời gian | Khóa tại lần sai liên tiếp thứ 3; thời gian khóa đúng 30 giây |
| Output / Side effect | Lỗi phù hợp; tăng counter; khóa tài khoản; trả JWT; lưu token phía client; gắn Authorization header |
| Security / Privacy | Không tiết lộ email có tồn tại, mật khẩu sai hay chi tiết nội bộ; không cấp token khi xác thực thất bại/đang khóa |
| UI / API observable behavior | `type="email"`, HTML5 format validation, `Authorization: Bearer <token>` |

## 3. Atomic rules

| ID | Quy tắc nguyên tử | Loại | Nguồn |
|---|---|---|---|
| AR-01 | Người dùng nhập Email và Mật khẩu để đăng nhập. | Input | FR-02 |
| AR-02 | Mỗi lần đăng nhập sai làm bộ đếm tăng đúng 1. | State / Counter | FR-02 |
| AR-03 | Lần sai liên tiếp thứ 3 kích hoạt khóa tài khoản. | Threshold / State | FR-02 |
| AR-04 | Tài khoản bị khóa trong 30 giây. | Timing / State | FR-02 |
| AR-05 | Lỗi phải phù hợp và không tiết lộ chi tiết nguyên nhân xác thực thất bại. | Security | FR-02 |
| AR-06 | Đăng nhập thành công trả về JWT Token. | API / Security | FR-02 |
| AR-07 | JWT được lưu phía client. | Client state | FR-02 |
| AR-08 | Mọi request cần xác thực gửi `Authorization: Bearer <token>`. | Client / Security | FR-02 |
| AR-09 | Trường email có thuộc tính `type="email"`. | UI | FR-02 |
| AR-10 | Email sai format bị HTML5 validation xử lý. | UI validation | FR-02 |

## 4. Giả định, mơ hồ và xung đột

| ID | Nội dung | Phân loại | Cách xử lý / Ảnh hưởng |
|---|---|---|---|
| AQ-01 | “Liên tiếp” được hiểu là một lần đăng nhập thành công kết thúc và reset chuỗi thất bại. | Giả định suy ra | Thiết kế TC-FR-02-013; cần xác nhận nếu hệ thống dùng quy tắc reset khác. |
| AQ-02 | Counter gắn với tài khoản đã tồn tại; cách đếm email không tồn tại chưa được nêu. | Mơ hồ | Không khẳng định counter cho email không tồn tại; chỉ kiểm tra lỗi không làm lộ sự tồn tại tài khoản. |
| AQ-03 | Hành vi counter và timer khi có request trong lúc đang khóa chưa được nêu. | Mơ hồ | Chỉ khẳng định request bị từ chối và không cấp token; không khẳng định counter tăng hay timer khởi động lại. |
| AQ-04 | Giá trị counter ngay sau khi hết 30 giây chưa được nêu. | Mơ hồ | Kiểm tra đăng nhập đúng được phép sau khi hết khóa; nhánh đăng nhập sai ngay sau hết khóa là coverage gap. |
| AQ-05 | Cơ chế lưu JWT phía client và thời gian tồn tại token chưa được nêu. | Mơ hồ | Chấp nhận cơ chế client storage được thiết kế, miễn token có thể được lấy để gắn Bearer header; không áp đặt `localStorage` hay `sessionStorage`. |
| AQ-06 | Nội dung/status code lỗi cụ thể và độ chính xác đồng hồ chưa được nêu. | Mơ hồ | So sánh tính nhất quán và không lộ nguyên nhân; dùng đồng hồ bấm giờ để kiểm tra ngay trước và sau 30 giây. |

## 5. Điều kiện và lớp tương đương

| ID | Điều kiện | Các mức / lớp giá trị | Cơ sở |
|---|---|---|---|
| C1 | Format email ở form web | Hợp lệ; không hợp lệ | HTML5 `type="email"` |
| C2 | Trạng thái khóa | Chưa khóa; đang khóa `<30s`; hết hạn `>=30s` | Quy tắc khóa 30 giây |
| C3 | Thông tin xác thực | Đúng; sai | Kết quả xác thực |
| C4 | Số lần sai liên tiếp trước request | `0`; `1`; `2` | Biên ngưỡng lần thứ 3 |
| C5 | Loại nguyên nhân thất bại | Email không tồn tại; mật khẩu sai; tài khoản đang khóa | Kiểm tra không lộ chi tiết |

## 6. Hành động và kết quả

| ID | Hành động / Kết quả quan sát được |
|---|---|
| A1 | HTML5 validation chặn submit; không gửi request đăng nhập. |
| A2 | Trả lỗi xác thực phù hợp, không lộ chi tiết; không cấp JWT. |
| A3 | Tăng counter đúng 1. |
| A4 | Tài khoản vẫn chưa khóa. |
| A5 | Kích hoạt khóa 30 giây. |
| A6 | Từ chối đăng nhập khi khóa còn hiệu lực. |
| A7 | Đăng nhập thành công và trả JWT. |
| A8 | Lưu JWT phía client. |
| A9 | Gắn `Authorization: Bearer <token>` vào request cần xác thực. |

## 7. Constraint và tổ hợp không khả thi

| ID | Constraint | Tổ hợp bị loại | Lý do |
|---|---|---|---|
| K1 | Email sai format bị browser chặn trước backend. | C1 = không hợp lệ cùng với đánh giá credentials/counter | Không có request đăng nhập để backend đánh giá. |
| K2 | Khi khóa còn hiệu lực, credentials không quyết định việc cấp token. | C2 = đang khóa cùng với nhánh thành công | Trạng thái khóa phải chặn đăng nhập. |
| K3 | Chỉ lần sai khi chưa khóa mới dùng ngưỡng `0/1/2` trong mô hình xác định. | C2 = đang khóa cùng C4 | Counter trong lúc khóa chưa được đặc tả. |
| K4 | Đăng nhập sai ngay sau khi khóa hết hạn chưa có expected state đầy đủ. | C2 = hết hạn, C3 = sai | Requirement không nói counter reset/tiếp tục sau timeout. |

## 8. Decision Table đầy đủ

Các cột dưới đây là tám nhánh khả thi có expected result xác định. Nhánh “hết hạn khóa + credentials sai” được ghi ở AQ-04/K4 thay vì tạo rule không xác định.

| Conditions / Actions | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| C1 — Email format hợp lệ | F | T | T | T | T | T | T | T |
| C2 — Trạng thái khóa | — | Chưa khóa | Chưa khóa | Chưa khóa | Chưa khóa | `<30s` | `<30s` | `>=30s` |
| C3 — Credentials | — | Đúng | Sai | Sai | Sai | Đúng | Sai | Đúng |
| C4 — Số lần sai trước request | — | `0–2` | `0` | `1` | `2` | — | — | — |
| **A1 — Browser chặn submit** | X |  |  |  |  |  |  |  |
| **A2 — Lỗi an toàn, không JWT** |  |  | X | X | X | X | X |  |
| **A3 — Counter +1** |  |  | X | X | X | ? | ? |  |
| **A4 — Chưa khóa** |  |  | X | X |  |  |  |  |
| **A5 — Khóa 30 giây** |  |  |  |  | X |  |  |  |
| **A6 — Từ chối do khóa còn hiệu lực** |  |  |  |  |  | X | X |  |
| **A7 — Thành công, trả JWT** |  | X |  |  |  |  |  | X |
| **A8 — Client lưu JWT** |  | X |  |  |  |  |  | X |
| **A9 — Request xác thực có Bearer header** |  | X |  |  |  |  |  | X |

`?` là side effect chưa được requirement xác định, không phải expected result của test.

## 9. Rút gọn Decision Table

### 9.1 Phép gộp

| Rule nguồn | Rule sau gộp | Don't care | Cơ sở an toàn |
|---|---|---|---|
| R6 + R7 | R6' | Credentials | Khi khóa còn hiệu lực, cả hai đều phải bị từ chối và không cấp JWT; không khẳng định counter/timer. |

### 9.2 Bảng sau rút gọn

| Conditions / Actions | R1 | R2 | R3 | R4 | R5 | R6' | R7' |
|---|---:|---:|---:|---:|---:|---:|---:|
| Email format hợp lệ | F | T | T | T | T | T | T |
| Trạng thái khóa | — | Chưa khóa | Chưa khóa | Chưa khóa | Chưa khóa | `<30s` | `>=30s` |
| Credentials | — | Đúng | Sai | Sai | Sai | — | Đúng |
| Số lần sai trước request | — | `0–2` | `0` | `1` | `2` | — | — |
| Browser chặn submit | X |  |  |  |  |  |  |
| Lỗi an toàn, không JWT |  |  | X | X | X | X |  |
| Counter +1 |  |  | X | X | X | ? |  |
| Chưa khóa |  |  | X | X |  |  |  |
| Khóa 30 giây |  |  |  |  | X |  |  |
| Thành công, trả/lưu JWT |  | X |  |  |  |  | X |

## 10. Phân tích Pairwise

### 10.1 Kết luận áp dụng

**Kết luận: Không áp dụng Pairwise.**

Các factor format email, trạng thái khóa, thời gian, credentials và counter có constraint nhân quả chặt, đồng thời requirement chứa ngưỡng, chuỗi sự kiện, timeout và invariant bảo mật. Pairwise có thể bỏ sót chính lần sai thứ ba hoặc biên 30 giây. Phép rút gọn an toàn duy nhất là gộp R6/R7 bằng Decision Table.

### 10.2 Factor, level và constraint

| Factor | Levels | Constraint / Ghi chú |
|---|---|---|
| Format email | Hợp lệ; không hợp lệ | Không hợp lệ chặn toàn bộ backend flow. |
| Trạng thái khóa | Chưa khóa; `<30s`; `>=30s` | Phụ thuộc lịch sử ba lần sai và thời gian. |
| Credentials | Đúng; sai | Trở thành don't care khi đang khóa. |
| Counter trước request | `0`; `1`; `2` | Chỉ có nghĩa trong chuỗi sai khi chưa khóa. |

### 10.3 Test bắt buộc nằm ngoài phần rút gọn Pairwise

| Scenario / Rule | Lý do phải giữ |
|---|---|
| R3/R4/R5 | Chứng minh counter +1 và biên lần sai thứ 2/3. |
| R6' và biên 29 giây | Trạng thái khóa và timing. |
| R7' tại 30 giây | Biên hết hạn khóa. |
| JWT storage/Bearer header | Side effect bảo mật phía client. |
| So sánh lỗi email không tồn tại/mật khẩu sai | Chống account enumeration và lộ nguyên nhân. |

### 10.4 Tập Pairwise và bằng chứng pair coverage

Không áp dụng; không tuyên bố pair coverage.

### 10.5 Số liệu rút gọn

| Chỉ số | Số lượng |
|---|---:|
| Tổ hợp exhaustive khả thi | N/A — có một nhánh chưa được đặc tả đầy đủ |
| Rule xác định trước rút gọn | 8 |
| Rule sau rút gọn Decision Table | 7 |
| Test bắt buộc | 13 |
| Test do Pairwise bổ sung | 0 |
| Test trùng được loại | 0 |
| Test cuối cùng | 13 |
| Tỷ lệ rút gọn | Không có ý nghĩa vì rule logic và test bổ sung khác phạm vi |

## 11. Danh sách test case

| Test Case ID | Mô tả | Technique | Decision rule / Scenario nguồn |
|---|---|---|---|
| TC-FR-02-001 | Trường Email dùng `type="email"` | UI Inspection | AR-09 |
| TC-FR-02-002 | HTML5 chặn email sai format | Decision Table / HTML5 Validation | R1 |
| TC-FR-02-003 | Credentials đúng trả JWT | Decision Table | R2 |
| TC-FR-02-004 | Client lưu JWT sau đăng nhập | Functional / Security | R2, AR-07 |
| TC-FR-02-005 | Request xác thực có Bearer header | Functional / Security | R2, AR-08 |
| TC-FR-02-006 | Lần sai thứ nhất chưa khóa tài khoản | Decision Table / State Transition | R3 |
| TC-FR-02-007 | Lần sai thứ hai liên tiếp vẫn chưa khóa | Decision Table / BVA | R4 |
| TC-FR-02-008 | Lần sai thứ ba liên tiếp kích hoạt khóa | Decision Table / BVA | R5 |
| TC-FR-02-009 | Lỗi không tiết lộ email tồn tại hay mật khẩu sai | Security Testing | AR-05 |
| TC-FR-02-010 | Khóa chặn cả credentials đúng và sai | Decision Table / State Transition | R6' |
| TC-FR-02-011 | Tài khoản vẫn khóa ngay trước 30 giây | BVA / State Transition | R6' |
| TC-FR-02-012 | Đăng nhập lại được sau 30 giây | Decision Table / BVA | R7' |
| TC-FR-02-013 | Đăng nhập thành công kết thúc chuỗi sai liên tiếp | State Transition | AQ-01, R2–R4 |

## 12. Ma trận truy vết

| Atomic Rule | Decision rule / Scenario | Test Case ID | Coverage |
|---|---|---|---|
| AR-01 | R1–R7' | TC-FR-02-002, TC-FR-02-003, TC-FR-02-006–013 | Covered |
| AR-02 | R3–R5 | TC-FR-02-006–008 | Covered gián tiếp qua hành vi tại lần sai 1/2/3; giá trị counter nội bộ không quan sát trực tiếp trong black-box |
| AR-03 | R4–R5; AQ-01 | TC-FR-02-007, TC-FR-02-008, TC-FR-02-013 | Covered với giả định AQ-01 |
| AR-04 | R5–R7' | TC-FR-02-008, TC-FR-02-010–012 | Covered |
| AR-05 | Failure/security scenarios | TC-FR-02-006–011 | Covered |
| AR-06 | R2, R7' | TC-FR-02-003, TC-FR-02-012 | Covered |
| AR-07 | Success side effect | TC-FR-02-004 | Covered |
| AR-08 | Authenticated request side effect | TC-FR-02-005 | Covered trên các request xác thực quan sát được trong phạm vi test |
| AR-09 | UI inspection | TC-FR-02-001 | Covered |
| AR-10 | R1 | TC-FR-02-002 | Covered |

## 13. Câu hỏi còn mở và coverage gap

| ID | Nội dung | Ảnh hưởng | Trạng thái |
|---|---|---|---|
| GAP-01 | Counter là trạng thái nội bộ không được public interface mô tả. | Black-box chỉ suy ra quy luật `+1` qua lần sai 1/2 chưa khóa và lần sai 3 bị khóa; không thể đọc trực tiếp từng giá trị counter. | Open |
| GAP-02 | Counter/timer thay đổi thế nào khi có attempt trong lúc khóa? | Không thể assert side effect cho R6'. | Open |
| GAP-03 | Counter sau khi hết 30 giây reset về 0 hay giữ giá trị cũ? | Chưa thiết kế expected result cho đăng nhập sai ngay sau timeout. | Open |
| GAP-04 | Requirement không liệt kê đầy đủ các request “có xác thực”. | TC-FR-02-005 chỉ có thể kiểm tra những request xác thực quan sát được trong các flow thuộc phạm vi test. | Open |
| GAP-05 | Sai số cho phép quanh mốc 30 giây là bao nhiêu? | Black-box dùng mốc ngay trước/sau 30 giây; kết quả có thể chịu sai số thao tác thủ công. | Open |
