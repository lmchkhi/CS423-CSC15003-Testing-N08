# Review Notes — Returning Customer Search and Order

## Thông tin review

| Hạng mục | Giá trị |
| --- | --- |
| Workflow | Returning Customer Search and Order |
| Sinh viên | 23127464 — Trần Minh Quang |
| Stage | Phase A — Verify and reconcile (A1–A9) |
| Artifact set | `reports/returning-customer-order/`, `tests/returning-customer-order/evidence/{hardware,baseline}/` |
| Reviewer | User |
| Thời gian agent thực hiện | 13/08/2026, Asia/Ho_Chi_Minh |
| Command measured test | Không có — Phase A không chạy performance test |
| Exit code measured test | Không áp dụng |

## Bảng reconciliation

| Item | Requirement / Expected | Actual Observation | Source Type | Status | Evidence | Impact / Action |
| --- | --- | --- | --- | --- | --- | --- |
| Assignment/workflow owner | HW05-AI; student 23127464; Returning Customer Search and Order | Khớp phạm vi được giao. | Assignment | Khớp | `2026.HW05.Performance_Testing_En_2.md`; prompt Phase A | Giữ scope này ở các phase sau. |
| Repository README | Nên mô tả submission HW05 hiện tại. | Root `README.md` vẫn là HW03 GUI & Usability. | Source inspection | Lệch | `README.md` | Human review quyết định cập nhật cuối cùng cho HW05; hiện không dùng README root làm bằng chứng HW05. |
| SUT path | SUT tại `src/eshop-sut`. | Resolve được `E:\Testing\CS423-CSC15003-Testing-N08\src\eshop-sut`. | Runtime observation | Khớp | Output `Resolve-Path`; source tree | Không có action Phase A. |
| Backend base URL | API spec: `http://localhost:3000`. | Source dùng port 3000; runtime reachable qua `http://127.0.0.1:3000`. | API specification + Source inspection + Runtime observation | Khớp | `api_specification.md`; `server.js`; probe 21:44 | Dùng base URL có thể cấu hình, không hard-code IP khác. |
| Login contract | `POST /api/login`, JSON email/password, 200 có token/user. | Source và runtime khớp; token không rỗng. | API specification + Source inspection + Runtime observation | Khớp | `server.js:32-65`; probe 21:44 | Correlate token; không lưu token vào artifact. |
| Search contract | `GET /api/products?search=keyword`, 200 array. | Source/runtime khớp; keyword `iPhone` trả product ID 1. | API specification + Source inspection + Runtime observation | Khớp | `server.js:141-157`; probe 21:44 | Assert array không rỗng; lưu ý query nối SQL trực tiếp. |
| Product detail contract | `GET /api/products/:id`, 200 object có price. | Runtime ID 1 trả object/price numeric. Source: ID chẵn trả price string, missing ID trả `200 {}`. | API specification + Source inspection + Runtime observation | Lệch | `server.js:159-165`; probe 21:44 | Human review chấp nhận rủi ro; Phase B đặc tả normalization, Phase C hiện thực/verify trong JMX; assert object/price hợp lệ. |
| Get cart contract | `GET /api/cart`, Bearer, trả cart. | Source/runtime khớp; cart array theo user ID. | API specification + Source inspection + Runtime observation | Khớp | `server.js:284-288`; probe 21:44 | Account sharing sẽ chia sẻ state. |
| Add cart contract | `POST /api/cart`, Bearer, body id/name/price/quantity. | Source/runtime trả 200 message; implementation push nguyên body, không merge item trùng/validate. | API specification + Source inspection + Runtime observation | Lệch | `server.js:290-295`; SUT README FR-07; probe 21:44 | Human review ghi nhận defect, không sửa SUT; xử lý bằng account isolation và reset strategy. |
| Checkout contract | Auth; backend phải tự tính tổng và clear cart sau thành công. | Implementation tin `total_amount` client và không clear cart; runtime checkout 200/order ID 1, cart còn 1 item sau checkout. | SUT requirement + Source inspection + Runtime observation | Lệch | SUT README FR-08; `server.js:297-309`; check 21:58 | Human review ghi nhận checkout không clear cart; không sửa SUT; dùng account mới mỗi scenario và restart/reset giữa scenario. |
| My-orders contract | Bearer; chỉ order của user; trả history. | Source query bằng user ID; runtime tìm thấy order ID 1. | API specification + Source inspection + Runtime observation | Khớp | `server.js:311-319`; probe 21:44 | Verify theo exact order ID. |
| Full correlation | token → productId/name → price × quantity → orderId → history. | Tất cả correlation khả thi trong probe một lần; total `30000000`. | Runtime observation | Khớp | Probe 21:44 | Không suy luận performance từ probe. |
| Login failed-attempt increment | Mỗi sai tăng 1. | Source tăng `login_attempts + 2`. | SUT requirement + Source inspection | Lệch | SUT README FR-02; `server.js:54` | Human review xác nhận đã hiểu; Phase B phải phản ánh trong reset strategy, validate credential ngoài measured interval và dùng 1 account/VU. |
| Login lock duration | Khóa sau 3 lần sai, 30 giây. | Source khóa khi counter >=3 và đặt 180000 ms; do +2 nên sai lần thứ hai kích hoạt khóa. | SUT requirement + Source inspection | Lệch | `server.js:54-62` | Validate/reset account ngoài measured interval. |
| Lockout runtime | Runtime phải phản ánh contract hoặc implementation. | Chưa chạy chuỗi login sai để tránh khóa account trong Phase A. | Runtime observation | Không xác định | Không có runtime evidence | Xác minh an toàn sau khi human review reset strategy. |
| Account sharing | Tránh state contamination giữa VU. | Cart và orders đều gắn user ID; CSV account pool hiện rỗng. | Source inspection | Lệch | `userCarts[userId]`; order query; CSV 0 byte | Human review quyết định 1 account/VU và account mới mỗi scenario; CSV/pool được thiết kế ở Phase B. |
| Cart persistence | Checkout phải clear; scenario nên có starting state xác định. | Cart in-memory persist cho đến restart; runtime còn item sau checkout. | Source inspection + Runtime observation | Lệch | `server.js`; check 21:58 | Human review quyết định account mới và restart SUT giữa scenario; không sửa SUT. |
| Order accumulation | Starting state cần tái lập. | Order insert vào SQLite và my-orders trả toàn history; probe đã tạo order 1. | Source inspection + Runtime observation | Lệch | `server.js`; check 21:58 | Restart/reset giữa scenario và provision account pool sau restart; ghi count trước/sau. |
| Account reset API | Cần procedure reset lockout/account. | Không tìm thấy API/script reset riêng. | Source inspection | Không xác định | SUT source/API spec | Phase B phải chốt procedure; không tự sửa SUT. |
| SUT reset/restart | Setup guide: `node database.js` để reset, `node server.js` để start. | `server.js` import `database.js`; module luôn drop/create/seed DB, nên start cũng reset DB; restart xóa cart in-memory. | Source inspection | Lệch | `server.js:4`; `database.js`; `setup_guide.md` | Human review chọn restart giữa scenario. Phase B phải provision lại account pool sau restart và ghi PID/reset result. |
| Deterministic state | Các scenario cần trạng thái bắt đầu tái lập. | Có thể reset bằng startup/reset seed; restart xóa toàn DB và cart in-memory. | Source inspection + Runtime observation | Không xác định | Source + probe | Direction đã có: restart → health check → provision account mới → validate. Chi tiết runbook thuộc Phase B và chưa được thiết kế. |
| Java | Java sẵn sàng. | OpenJDK 17.0.16 LTS 64-bit. | Runtime observation | Khớp | `evidence/hardware/java-version.png` | Không blocker. |
| JMeter | JMeter sẵn sàng tại `D:\apache-jmeter-5.6.3\bin`. | User xác nhận path; runtime `-v` trả Apache JMeter 5.6.3, có warning plugin scanning. | Runtime observation | Khớp | `evidence/hardware/jmeter-version.png`, `jmeter-version-command.log` | Warning không chặn Phase A; chưa tạo/chạy JMX. |
| JMeter repo config | Inspect config hiện có. | `jmeter/` rỗng; install `user.properties` không có active property, `system.properties` bật restricted headers. | Source inspection + Runtime observation | Không xác định | Directory/config inspection | Phase B/C phải review config trước tạo plan. |
| Hardware attribution | Có hostname, OS, CPU, logical processors, RAM. | Máy TMQ, Windows 11 Pro, i7-12700H, 20 logical processors, 32768 MB RAM. | Runtime observation | Khớp | `evidence/hardware/hardware-system-info.png`, `hardware-cpu-memory.png` | Evidence do user cung cấp khớp lệnh CIM. |
| Backend idle attribution | Đúng backend process/PID và CPU/memory idle. | node.exe PID 25832; 5 mẫu kết thúc 22:03:16: CPU backend avg 0%, working set avg 46.16 MiB, private avg 55.69 MiB. Screenshot xác nhận process/PID/CPU nhưng không hiện working set tuyệt đối. | Runtime observation | Khớp | `evidence/baseline/backend-idle-resource.png`, `baseline-measurement.txt` | PID chỉ đúng cho process hiện tại; cập nhật nếu restart. Giữ limitation của screenshot khi bàn giao. |
| System idle baseline | Ghi CPU và memory hệ thống. | 5 mẫu: CPU avg 22.40%, memory used avg 45.56%; ảnh user tức thời 14% và 14.3/31.7 GB (45%). | Runtime observation | Khớp | `evidence/baseline/environment-baseline.png`, `baseline-measurement.txt` | Baseline dao động; không coi là SLA/threshold. |
| Runtime probe scope | Tối đa 1 user × 1 logical workflow, không phải performance test. | Chạy đúng một workflow, không dùng JMeter/JMX, không tạo JTL. | Runtime observation | Khớp | Probe timestamps 21:44:42–21:44:43 | Probe tạo 1 cart item và 1 order; state drift đã ghi. |
| Phase A exclusions | Không workload design, JMX, measured performance run/threshold. | Không tạo JMX/JTL/HTML; không thiết kế thông số/threshold. | Source inspection | Khớp | Git/file inspection | Hard stop tại human review. |

## Tổng hợp trạng thái

### Khớp

- SUT path, backend port/base URL và toàn bộ chuỗi endpoint có thể gọi được.
- Auth/token và correlation đến exact order ID khả thi trong minimal probe.
- Java 17.0.16 và JMeter 5.6.3 sẵn sàng.
- Hardware và backend baseline có evidence gắn với máy `TMQ` và PID `25832`.

### Lệch

- Root README còn là HW03.
- Detail có price không đồng nhất kiểu dữ liệu và missing product trả `200 {}`.
- Add-cart không merge duplicate; checkout tin total client và không clear cart.
- Login tăng failed attempts +2 và khóa 180 giây, trái với +1/3 lần/30 giây trong requirement.
- Startup backend tự reset toàn DB do import `database.js`, khác cách diễn đạt trong setup guide.
- CSV workflow/account provisioning tồn tại nhưng rỗng, chưa hỗ trợ account isolation.

### Không xác định

- Lockout runtime thật chưa probe để tránh khóa account.
- Chưa có account-only reset API/procedure.
- Direction reset/isolation đã có, nhưng chi tiết provisioning/runbook và khả năng thực thi lặp lại chưa được thiết kế/verify.
- Chưa xác định JMeter config cuối cùng cho test plan; đây thuộc Phase B/C.

## Phản hồi human review ngày 13/08/2026 22:17

- Chấp nhận price không đồng nhất kiểu dữ liệu; normalize ở Phase B/C.
- Ghi nhận defect add-cart không merge và checkout không clear cart; không sửa SUT.
- Dùng 1 account/VU, account mới cho mỗi scenario, restart SUT giữa scenario.
- Thiết kế CSV ở phase sau.
- Thiết kế reset strategy phải tính đến failed-attempt tăng `+2`.
- Root README được cập nhật cuối cùng cho HW05.
- JMeter path: `D:\apache-jmeter-5.6.3\bin`.

Hệ quả kỹ thuật đã được phản hồi lại: restart SUT drop/reseed database, vì vậy account pool phải được provision lại sau mỗi restart và trước measured interval.

## Blockers trước Phase B

- Các correction/direction đã được ghi nhận, nhưng chưa có quyết định rõ `Approve Phase A` hoặc `Authorize Phase B` theo checkpoint gate.
- Chi tiết account provisioning/reset runbook chưa được thiết kế vì thuộc Phase B.

## Rủi ro cho Phase B

- Reuse account làm cart/order history tăng và trộn state giữa VU.
- Credential sai có thể khóa account sớm 180 giây và làm kết quả performance vô hiệu.
- Reset/restart không đúng thời điểm sẽ xóa dữ liệu toàn SUT và thay PID backend/evidence attribution.
- Price có thể là number hoặc string; correlation yếu sẽ tạo functional failure bị nhầm là performance issue.
- Search query nối SQL và my-orders trả toàn history có thể làm behavior phụ thuộc input/state; cần assertions và data policy ở Phase B.

## Human Decision

- [ ] Approved
- [ ] Approved with corrections
- [ ] Rejected

## Approval Gate

- Phase/checkpoint reviewed:
- Artifact/run folder reviewed:
- Same-run evidence verified:
- Corrections required:
- Next phase authorized:
- Reviewer name/date:

## Human Correction

_Đã ghi nhận correction/direction ngày 13/08/2026 22:17. Chờ người dùng nêu rõ quyết định phê duyệt Phase A và authorization Phase B. Agent không tự đánh dấu approval._

**PENDING HUMAN REVIEW**
