hả# Review Notes — Returning Customer Search and Order

## Thông tin review

| Hạng mục | Giá trị |
| --- | --- |
| Workflow | Returning Customer Search and Order |
| Sinh viên | 23127464 — Trần Minh Quang |
| Stage | Phase C — Generate JMeter and validate smoke (C1–C7) |
| Artifact set | `reports/returning-customer-order/`, `tests/returning-customer-order/{data,test-cases,test-runs}/` |
| Reviewer | User |
| Thời gian agent thực hiện | 13/08/2026, Asia/Ho_Chi_Minh |
| Command measured test | Không có — Phase B không chạy workload |
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

- Không còn blocker về approval gate: người dùng đã phê duyệt Phase A và authorize Phase B.
- Chi tiết account provisioning/reset runbook chưa được thiết kế; đây là nội dung cần thực hiện trong Phase B, không phải phần còn thiếu của Phase A.

## Rủi ro cho Phase B

- Reuse account làm cart/order history tăng và trộn state giữa VU.
- Credential sai có thể khóa account sớm 180 giây và làm kết quả performance vô hiệu.
- Reset/restart không đúng thời điểm sẽ xóa dữ liệu toàn SUT và thay PID backend/evidence attribution.
- Price có thể là number hoặc string; correlation yếu sẽ tạo functional failure bị nhầm là performance issue.
- Search query nối SQL và my-orders trả toàn history có thể làm behavior phụ thuộc input/state; cần assertions và data policy ở Phase B.

## Human Decision

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected

## Approval Gate

- Phase/checkpoint reviewed: Phase A — Verify and reconcile (A1–A9)
- Artifact/run folder reviewed: `reports/returning-customer-order/`; `tests/returning-customer-order/evidence/hardware/`; `tests/returning-customer-order/evidence/baseline/`
- Same-run evidence verified: Không áp dụng cho measured run; Phase A chỉ có minimal functional probe và environment/baseline evidence đã được đối chiếu.
- Corrections required: Các correction/direction ngày 13/08/2026 22:17 đã được ghi vào tài liệu.
- Next phase authorized: Phase B — Design workload and data
- Reviewer name/date: User — 13/08/2026 22:24, Asia/Ho_Chi_Minh

## Human Correction

_Correction/direction được ghi nhận ngày 13/08/2026 22:17. Người dùng phê duyệt rõ ràng bằng câu “Approve Phase A. Authorize Phase B.” ngày 13/08/2026 22:24._

**PHASE A APPROVED — PHASE B AUTHORIZED**

## Phase B — nội dung trình Human Review

### Thiết kế đã hoàn thành

| Hạng mục | Đề xuất/quyết định Phase B | Căn cứ | Cần reviewer xác nhận |
| --- | --- | --- | --- |
| Workflow | Khóa `RCO-01` Login -> `RCO-02` Search -> `RCO-03` Product Detail -> `RCO-04` Get Cart -> `RCO-05` Add Cart -> `RCO-06` Checkout -> `RCO-07` My Orders. | Contract + Phase A source/runtime reconciliation | Đúng thứ tự và không bỏ sampler. |
| Correlation | `token -> productId/productName -> detailPrice -> normalizedPrice -> totalAmount -> orderId`; giá number/string normalize bằng `BigDecimal`, quantity integer dương. | Finding Phase A và contract | Chấp nhận thiết kế fail-fast khi correlation/parse lỗi. |
| Assertions | Mỗi bước có HTTP + JSON shape + business assertion; HTTP 200 không đủ nếu token/product/order không hợp lệ. | Bảng Functional assertions trong contract | Chấp nhận criteria chi tiết trong `WORKFLOW_DESIGN.md`. |
| Workflow CSV | 150 fixture row, header chuẩn; ba window Load 20, Stress 80, Spike 50; không có token/productId/totalAmount. | Peak VU `INITIAL_PROPOSAL` | Xác nhận fixture test local và cơ chế window/projection. |
| Provisioning CSV | Schema `scenario,vuIndex,name,email,password`; 150 danh tính unique, pool không giao nhau. | Quyết định 1 account/VU, pool riêng/scenario | Xác nhận account count 20/80/50; Endurance để trống. |
| CSV exhaustion | Share trong Thread Group của scenario, atomic one-row/VU, recycle false, hết row thì stop test. | Tránh chạy thiếu VU/trùng account | Xác nhận stop-test fail-fast. |
| Reset | Restart backend giữa scenario; verify PID mới + HTTP 200 + seed log; provision/validate lại ngoài measured interval. | `server.js` reset DB khi startup | Xác nhận đây là reset destructive có chủ đích trên SUT local. |
| Lockout | Source: sai password tăng +2, khóa 180 giây; nếu 401/403 thì hủy run, restart/reprovision toàn pool. | Phase A source finding; runtime lockout chưa probe | Xác nhận không chờ/retry trong measured interval. |
| State drift | Cart không clear, orders tích lũy trong scenario; không cleanup/SUT change; restart xóa state giữa scenario. | Phase A runtime + source | Chấp nhận residual risk và yêu cầu phân tích payload growth. |

### Workload cần Human Review — INITIAL_PROPOSAL

Đây **không phải SLA, threshold chính thức hoặc kết quả đo**. Assignment không cung cấp SLA nghiệp vụ chính thức.

| Scenario | INITIAL_PROPOSAL | Account | Report view |
| --- | --- | ---: | --- |
| Load | 20 VU, ramp-up 60 giây, steady 360 giây | 20 | Summary Report |
| Stress | 10 -> 20 -> 40 -> 60 -> 80 VU, 60 giây/bậc | 80 | Aggregate Report |
| Spike | 5 VU/60 giây -> ramp 5 giây lên 50 -> giữ 60 giây -> ramp 5 giây về 5 -> recovery 60 giây | 50 | View Results Tree |
| Endurance | `UNDECIDED`; derive từ Stress evidence đã review ở D4 | Chưa xác định | Chưa xác định |

Think time đề xuất: random 1–3 giây giữa các business step, giống nhau ở ba plan.

### Open questions / risks cho Phase C

- Cần chọn implementation JMeter dễ audit để chỉ đọc đúng window của một scenario trong CSV canonical; có thể tạo projection có row count/checksum ngoài measured interval.
- Phải preflight 150 row tĩnh và các keyword trước smoke; CSV hiện là designed fixture, chưa được provision hoặc runtime-validate.
- Smoke phải kiểm chứng normalization với cả price JSON number và numeric string; probe Phase A mới xác nhận runtime numeric, còn string là source-derived.
- View Results Tree có thể gây overhead đáng kể cho Spike; cần review cách thu report view mà không coi nó là nguồn metric chính.
- Cart/order tăng qua iteration làm response payload và DB state không cố định. Account isolation loại cross-VU contamination nhưng không loại state growth trong một VU.
- Runtime lockout +2/180 giây chưa được chủ động probe; không được coi source finding là runtime evidence.

### Blockers

- Không có blocker để hoàn tất thiết kế Phase B.
- Approval gate Phase C đã được mở bằng human decision lúc `13/08/2026 22:42 — Asia/Ho_Chi_Minh`; Phase C chưa được thực hiện trong interaction ghi nhận approval này.

## Human Decision — Phase B

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected

### Approval Gate — Phase B

- Phase/checkpoint reviewed: Phase B — Design workload and data (B1–B7)
- Artifact reviewed: `WORKFLOW_DESIGN.md`, `REVIEW_NOTES.md`, `returning-customer-order.csv`, `account-provisioning.csv`
- Measured evidence: Không áp dụng — chưa chạy workload và không có JMX/JTL.
- Next phase authorized: Phase C — Generate JMeter and validate smoke.
- Reviewer name/date: User — `13/08/2026 22:42`, Asia/Ho_Chi_Minh.

## Human Correction — Phase B

Không có correction kèm theo. Người dùng phê duyệt nguyên trạng bằng câu **“Approve Phase B. Authorize Phase C.”**

**PHASE B APPROVED — PHASE C AUTHORIZED**

## Phase C — nội dung trình Human Review

### Fixture validation

| Kiểm tra | Kết quả |
| --- | --- |
| Workflow CSV | 150 row: Load 20, Stress 80, Spike 50 |
| Provisioning CSV | 150 row: Load 20, Stress 80, Spike 50 |
| Row/field rỗng | 0 |
| Quantity không phải integer dương | 0 |
| Email trùng trong cùng scenario pool | 0 |
| Shipping address rỗng | 0 |
| Keyword không match seed SUT | 0; cả 5 keyword match `database.js:98-102` |

Preflight provision hai account Load đầu tiên: requested 2, created 2, login token không rỗng 2. Wrapper đếm array rỗng bằng `Invoke-RestMethod` ban đầu báo sai `0/2`; kiểm tra lại raw HTTP body xác nhận cả cart và my-orders đều trả `[]`. Đây là lỗi quan sát của script hỗ trợ, không phải lỗi fixture/SUT; raw response được dùng làm kết luận.

### Smoke execution log

Lệnh smoke number cuối:

```powershell
D:\apache-jmeter-5.6.3\bin\jmeter.bat -n -t .\tests\returning-customer-order\test-cases\smoke\returning-customer-order-smoke.jmx -JcsvRowOffset=0 -l .\tests\returning-customer-order\test-runs\smoke\20260813-2255-number-final\result.jtl -j .\tests\returning-customer-order\test-runs\smoke\20260813-2255-number-final\jmeter.log
```

- Start/end: `2026-08-13 22:54:43–22:55:02 +07:00`.
- Exit code: `0`; sample: 8 = 7 HTTP + 1 transaction; failed sample: 0; assertion failure: 0.
- Token khác rỗng nhưng không log giá trị; search match iPhone ID 1/name; price runtime `Integer`; normalized `30000000`; total `30000000`; add-cart đúng message; checkout order ID 5; my-orders tìm exact ID 5.

Lệnh smoke string cuối:

```powershell
D:\apache-jmeter-5.6.3\bin\jmeter.bat -n -t .\tests\returning-customer-order\test-cases\smoke\returning-customer-order-smoke.jmx -JcsvRowOffset=1 -l .\tests\returning-customer-order\test-runs\smoke\20260813-2255-string-final\result.jtl -j .\tests\returning-customer-order\test-runs\smoke\20260813-2255-string-final\jmeter.log
```

- Start/end: `2026-08-13 22:55:10–22:55:29 +07:00`.
- Exit code: `0`; sample: 8 = 7 HTTP + 1 transaction; failed sample: 0; assertion failure: 0.
- Token khác rỗng nhưng không log giá trị; search match Samsung ID 2/name; price runtime `String`; normalized `28000000`; total `28000000`; add-cart đúng message; checkout order ID 6; my-orders tìm exact ID 6.

### Harness corrections và các lượt chạy

| Lượt | Kết quả kỹ thuật | Human/AI verification | Correction |
| --- | --- | --- | --- |
| `20260813-2253-number` | Exit 0, 8 sample, 0 assertion failure | Chưa đủ observability cho correlation/BigDecimal | Thêm `RCO_VERIFY` không chứa token/secret. |
| `20260813-2254-number-rerun` | Exit 0, 8 sample, 0 assertion failure | Phát hiện Search không gửi keyword và chọn product đầu tiên | Sửa outer HTTPArgument name thành `search`; assertion phải match keyword CSV. |
| `20260813-2254-string` | Exit 0, 8 sample, 0 assertion failure | Offset chọn đúng email row 2 nhưng vẫn ra iPhone, xác nhận lỗi query/assertion | Áp dụng cùng correction; không coi lượt này là smoke pass đúng nghiệp vụ. |
| Hai lượt `2255-*-final` | Exit 0, mỗi lượt 8 sample, 0 failure | Correlation, number/string normalization, total, add-cart, checkout và exact order lookup đều đúng | Không cần correction thêm. |

AI ban đầu làm sai vì dựng `HTTPArgument` theo shape raw body (name rỗng) cho query parameter và assertion Search chỉ kiểm tra collection/id/name, chưa buộc kết quả khớp keyword input. JMeter exit 0 và assertion 0 failure vì vậy không đủ để tự kết luận; log correlation và review dữ liệu đã tìm ra false positive.

### Graded JMX structural review

| File | Listener | Workload | Pool |
| --- | --- | --- | --- |
| `load/23127464_Load_20260813.jmx` | Summary Report | 20 VU; ramp 60s; hold 360s | offset 0 / 20 Load account |
| `stress/23127464_Stress_20260813.jmx` | Aggregate Report | 10→20→40→60→80; 60s/bậc; 300s | offset 20 / 80 Stress account |
| `spike/23127464_Spike_20260813.jmx` | View Results Tree | 5 baseline → 50 spike → 5 recovery | offset 100 / 50 Spike account |

Static validation: ba XML well-formed; mỗi plan có đúng 7 sampler, 7 HTTP assertion, 7 business assertion, 6 timer; ba listener khác loại; workflow subtree SHA-256 giống nhau. Filename đúng convention và ngày thật `20260813`. Không dùng kết quả static này như runtime evidence.

### Open questions / risks cho Phase D

- Cart/order history hiện đã drift do smoke và checkout không clear cart; D1 phải restart backend, verify PID/HTTP/seed log, provision và validate đúng 20 account ngoài measured interval.
- Runtime lockout `+2/180 giây` vẫn chưa được chủ động probe; bất kỳ 401/403 nào ở provisioning phải hủy run và reset/reprovision.
- Ultimate Thread Group plugin đã cài, nhưng D1 vẫn phải precheck plan/plugin/JMeter trên đúng máy trước khi giao lệnh user-run.
- View Results Tree của Spike có overhead; ở D3 phải giữ distinction giữa required report view và raw JTL/HTML metric source.
- Console summariser của smoke hiện dòng `0 sample` trong khi raw JTL có 8 sample. Phase D phải lấy raw JTL làm nguồn đếm chính và không dựa vào một dòng console.

### Blockers

- Không có blocker kỹ thuật còn lại trong Phase C.
- Gate quy trình: chưa có Human Review/approval Phase C, vì vậy chưa được chuẩn bị hoặc chạy D1.

## Human Decision — Phase C

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected

### Approval Gate — Phase C

- Phase/checkpoint reviewed: Phase C — Generate JMeter and validate smoke (C1–C7).
- Artifact reviewed: `WORKFLOW_DESIGN.md`, `REVIEW_NOTES.md`, smoke JMX/JTL/log và ba graded JMX ngày `20260813`.
- Smoke evidence: hai lượt cuối number/string, mỗi lượt 8 sample, 0 failed sample, 0 assertion failure, exit code 0.
- Graded execution evidence: Không có — đúng phạm vi Phase C, chưa chạy Load/Stress/Spike/Endurance.
- Corrections required: Không có correction kèm theo approval.
- Next phase authorized: Phase D1 — Load, bắt đầu bằng **PREPARE ONLY** trong một interaction tiếp theo.
- Reviewer name/date: User — `13/08/2026 23:21`, Asia/Ho_Chi_Minh.

## Human Correction — Phase C

Không có correction kèm theo. Người dùng phê duyệt rõ ràng bằng câu **“Approve Phase C. Authorize Phase D1.”**

**PHASE C APPROVED — PHASE D1 AUTHORIZED**

Interaction phê duyệt này chưa chuẩn bị command/run folder D1 và chưa chạy measured workload.

## D1 Load — invalid attempt và correction ngày 14/08/2026

### User-executed attempt bị loại

- Run folder: `tests/returning-customer-order/test-runs/load/20260813-233819-user-executed/`.
- User execution: `2026-08-14 00:04:37–00:04:41 +07:00`; JMeter exit code 0.
- Raw evidence: console `summary = 0`; JTL 164 byte chỉ có header, 0 data row; JMeter log có
  20 lỗi `Property ThreadGroup.main_controller is unset`.
- Classification: `INVALID`. Exit code 0 chỉ phản ánh process kết thúc, không chứng minh workload chạy.
- Không có request/sample measured để phân tích; không generate HTML và không dùng resource CSV làm
  performance evidence.

### Root cause và correction

- Root cause: generator tạo Ultimate Thread Group có schedule nhưng thiếu
  `ThreadGroup.main_controller`, khiến cả 20 thread fail trong `JMeterThread.initRun`.
- Phạm vi: cùng defect tồn tại trong Load, Stress và Spike vì dùng chung `ultimateThreadGroup()`.
- Correction: thêm Loop Controller với `continue_forever=false`, `loops=-1` vào generator và tái tạo
  cả ba graded JMX.
- Static validation sau correction: mỗi graded JMX có đúng một main controller/loops -1, 7 HTTP
  sampler, 7 HTTP assertion, 7 business assertion, 6 timer; common workflow SHA-256
  `5B3CB4BEA48546B805575E4DFE540F37ECEA25EA09FD7234CE6ED37CA0C723CD`.
- Không chạy measured workload trong correction. D1 vẫn cần User rerun trong folder mới và cần
  Human Review correction trước khi dùng kết quả.

### Human Decision — D1 main-controller correction

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected

- Correction reviewed: thêm `ThreadGroup.main_controller`/Loop Controller `loops=-1` vào generator
  và ba graded JMX; giữ nguyên workload/workflow/data/assertion/listener.
- Invalid run retained: `20260813-233819-user-executed`.
- Authorized rerun folder: `20260814-001003-user-executed`.
- Reviewer/date: User — `14/08/2026 00:17`, Asia/Ho_Chi_Minh.
- Exact approval: **“Approve D1 main-controller correction. Authorize D1 Load rerun using
  20260814-001003-user-executed.”**

**D1 MAIN-CONTROLLER CORRECTION APPROVED — LOAD RERUN AUTHORIZED**

## D1 Load — evidence analysis ngày 14/08/2026

- Run được phân tích: `tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`.
- Executor: `User`; thời gian `00:20:33–00:27:36 +07:00`; JMeter exit code `0`.
- Provisioning: 20/20 account, 20/20 token, 0 failure; backend PID `15308`, HTTP 200 trước run.
- Raw JTL: 5.207 dòng, gồm 4.547 HTTP request và 660 transaction row; 640 workflow đủ bảy bước,
  không có failed sample/assertion và toàn bộ response code là 200.
- HTTP-only: avg `3.448 ms`, median `3 ms`, p90 `7 ms`, p95 `9 ms`, p99 `13 ms`,
  throughput `10.951 req/s`.
- Completed E2E workflow: avg `11,954.092 ms`, p95 `14,295 ms`, throughput `1.535 workflow/s`;
  thời gian E2E bao gồm sáu think timer 1–3 giây.
- Backend trong measured command window: CPU avg/max `0.163% / 0.542%`, working set avg/max
  `54.416 / 56.730 MiB`; PID sống ở toàn bộ 210 resource sample.
- Visual evidence bổ sung: `tests/returning-customer-order/evidence/load/20260814-001003-user-executed/d1-load-completion-jmeter-backend-pid-15308.png`; cùng frame có JMeter completion và Task Manager `node.exe` PID `15308`. Ảnh chụp sau measured interval và cột memory là `Working set delta`, nên không dùng làm CPU/RAM trong tải.
- Classification: `VALID WITH LIMITATION`. Chỉ có completion screenshot, thiếu ramp-up/steady-state visual milestone
  và resource của máy chạy JMeter; vì vậy không kết luận load generator chắc chắn không phải bottleneck và không
  dùng run này để suy ra maximum capacity/SLA phổ quát.
- Báo cáo chi tiết: `reports/returning-customer-order/D1_LOAD_RESULT_ANALYSIS.md`.

**LOAD RESULT PENDING HUMAN REVIEW**

### Human Decision — D1 Load result

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected
- Reviewed run: `tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`.
- Accepted result: `VALID WITH LIMITATION`; các giới hạn về visual milestone và load-generator resource
  vẫn phải đi kèm khi sử dụng metric D1.
- Exact approval: **“Approve D1 Load result. Authorize D2 Stress.”**
- Reviewer/date: User — `14/08/2026 00:59`, Asia/Ho_Chi_Minh.
- Next phase authorized: Phase D2 — Stress, bắt đầu bằng checkpoint PREPARE ONLY trong interaction riêng.
- Không chuẩn bị hoặc chạy measured Stress trong interaction phê duyệt này.

**D1 LOAD RESULT APPROVED — PHASE D2 AUTHORIZED**

## Phase D2 — Stress PRECHECK / COMMAND PREPARATION

- D1 result gate: User đã approve run `20260814-001003-user-executed` với classification `VALID WITH LIMITATION` và authorize D2.
- JMX reviewed: `23127464_Stress_20260813.jmx`, SHA-256 `55C3A971DE7FF8DA8389A6A35541EA1A9EF5B853A39D22D80FCEF54591BB5A09`.
- Correction verified: JMX được sinh sau generator patch; đúng 1 `ThreadGroup.main_controller`, `loops=-1`, 7 sampler, 14 assertion, 6 timer và Aggregate Report.
- Workload verified: `10 → 20 → 40 → 60 → 80 VU`, các cửa sổ 60 giây trong scheduler 300 giây; pool Stress có 80 account unique, không dùng chéo pool.
- Prepared run: `tests/returning-customer-order/test-runs/stress/20260814-012626-user-executed/`; `html-report/` rỗng, không có JTL/log/resource result.
- Agent precheck backend: 0 listener port 3000; backend đang dừng, nên chưa có PID measured/HTTP 200 và không tạo evidence giả. User phải restart/reset, resolve PID mới, verify HTTP 200, provision/verify 80 account rồi mới chạy measured command.
- Command/runbook: `reports/returning-customer-order/D2_STRESS_COMMAND_PREPARATION.md`; 8 PowerShell block parse tĩnh, 0 syntax error, 0 placeholder dạng góc.
- Agent không chạy JMeter, reset, provisioning, monitor hoặc measured workload.

**D2 STRESS COMMAND READY — PENDING USER EXECUTION**

## Phase D2 — Stress Evidence Analysis

- User-executed run: `tests/returning-customer-order/test-runs/stress/20260814-012626-user-executed/`.
- JMeter actual interval: `2026-08-14 01:40:19.912–01:45:21.031 +07:00`; exit code `0`; guard transcript `POST_RUN_GUARD_OK SAMPLES=8370`.
- Provisioning: 80/80 account, 80/80 token, 0 failure; cart/orders rỗng 80/80; backend PID `16488`, HTTP 200.
- JTL: 7.293 HTTP requests, 997 completed workflow, 80 scheduler-cutoff transaction rows, 0 failed sample, error `0,00%`, max `allThreads=80`.
- HTTP overall: Avg `8,581 ms`, median `3 ms`, p90 `28 ms`, p95 `37 ms`, p99 `55,08 ms`, throughput `24,220 req/s` trên actual span `301,119 giây`.
- Stage throughput 10/20/40/60/80 VU: `5,467 / 11,283 / 22,883 / 34,750 / 46,267 req/s`; stage error đều `0,00%`; HTTP p95 `36 / 27,2 / 39 / 44 / 31 ms`. Không thấy plateau/error breaking point trong request metrics đến 80 VU.
- Limitation: resource monitor dừng lúc `01:39:44`, trước JMeter start; 6 resource rows chỉ pre-run và không được dùng cho Stress CPU/RAM. Screenshot start cùng frame xác nhận JMeter + node PID 16488, nhưng không có Active threads/RAM tuyệt đối; milestone 20/40/60/80 VU, completion và narration/video chưa xác minh.
- Visual evidence: `tests/returning-customer-order/evidence/stress/20260814-012626-user-executed/d2-stress-start-jmeter-backend-pid-16488.png`; không thấy secret, chỉ dùng làm start/PID attribution.
- Classification: `VALID WITH LIMITATION`; chỉ hỗ trợ request-level JTL findings, không hỗ trợ backend resource capacity, stable threshold hoặc endurance threshold.
- Analysis: `reports/returning-customer-order/D2_STRESS_RESULT_ANALYSIS.md`.
- D3 chưa được authorize; chờ Human Review rõ ràng cho D2.

**STRESS RESULT PENDING HUMAN REVIEW**

### Human Decision — D2 Stress result

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected
- Reviewed run: `tests/returning-customer-order/test-runs/stress/20260814-012626-user-executed/`.
- Accepted classification: `VALID WITH LIMITATION`; mọi downstream use phải giữ giới hạn resource monitor không bao phủ workload và visual evidence chỉ có start screenshot.
- Exact approval: **“Approve D2 Stress result with documented limitations. Authorize D3 Spike preparation.”**
- Reviewer/date: User — `14/08/2026 01:59`, Asia/Ho_Chi_Minh.
- Next phase authorized: Phase D3 — Spike, bắt đầu bằng checkpoint PREPARE ONLY trong interaction riêng.
- Không chuẩn bị command/folder D3 và không chạy measured Spike trong interaction phê duyệt này.

**D2 STRESS RESULT APPROVED — PHASE D3 AUTHORIZED**
