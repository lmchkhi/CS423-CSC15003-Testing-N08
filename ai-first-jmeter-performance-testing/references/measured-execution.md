# Measured Execution Governance

## Mô hình bắt buộc

Áp dụng chuỗi sau cho mọi D1 Load, D2 Stress, D3 Spike và D4 Endurance:

```text
PREPARE ONLY
-> USER EXECUTES
-> AGENT ANALYZES UPLOADED EVIDENCE
-> HUMAN REVIEW
```

Agent không được chạy measured workload bằng JMeter GUI, non-GUI, wrapper hoặc script. Agent chỉ được validate JMX/CSV, chuẩn bị folder/lệnh/checklist và phân tích artifact thật sau khi người dùng chạy. Smoke Phase C không phải measured workload và chỉ được agent chạy trong giới hạn của playbook.

## Human Review và quyền execution theo phase

| Phase | Execution được phép | Người thực hiện | Human Review bắt buộc |
| --- | --- | --- | --- |
| A | Probe chức năng tối đa 1 user × 1 workflow; thu thập hardware/idle baseline | Agent có thể chạy probe; user cung cấp evidence màn hình khi cần | Duyệt contract, state risk, environment và baseline trước Phase B |
| B | Không chạy workload | Không áp dụng | Duyệt workflow, CSV, correlation, assertion và workload proposal trước Phase C |
| C | Smoke 1 thread × 1 iteration | Agent có thể chạy | Duyệt smoke evidence và ba graded JMX trước D1 |
| D1 Load | Measured workload | Chỉ user | Duyệt evidence analysis trước D2 |
| D2 Stress | Measured workload | Chỉ user | Duyệt evidence analysis trước D3 |
| D3 Spike | Measured workload | Chỉ user | Duyệt evidence analysis trước D4 |
| D4 Endurance | Measured workload 10–15 phút | Chỉ user | Duyệt evidence analysis trước Phase E |
| E | Không chạy measured workload | Không áp dụng | Duyệt phân tích, critique, báo cáo và đề xuất CI cuối |

Approval phải nêu rõ phase/checkpoint, artifact hoặc run folder được duyệt, quyết định và correction nếu có. Việc user chỉ gửi artifact hoặc hỏi câu tiếp theo không tự động được xem là approval.

## Checkpoint 1 — Dn Precheck / Command Preparation

Dùng [measured-command-preparation.md](../assets/templates/measured-command-preparation.md) và ghi:

- scenario, JMX, CSV và base URL;
- workload, ramp-up, duration, think time và listener;
- run folder mới, raw JTL, HTML, JMeter log và backend-resource path;
- exact command để người dùng chạy;
- reset/provision, resource-monitor và visual-evidence checklist;
- risks và limitations.

Đọc và áp dụng [measured-user-runbook.md](measured-user-runbook.md). Artifact bàn giao phải có command PowerShell hoàn chỉnh cho đúng repository/máy hiện tại, milestone evidence riêng của scenario, cách đọc console, post-run artifact verification và user execution note. Không bàn giao placeholder như `<JMX>`, `<PLAN_DATE>` hoặc `<PID>` như thể đó là lệnh chạy được. Nếu đầu vào thật còn thiếu, ghi blocker và dừng ở preparation; không đoán path hoặc dữ liệu.

Run folder phải có dạng:

```text
tests/returning-customer-order/test-runs/<scenario>/YYYYMMDD-HHMMSS-user-executed/
```

Folder phải mới và rỗng. Không overwrite hoặc trộn với run cũ. Kết thúc bằng command-ready status và `PENDING USER EXECUTION`, rồi dừng.

## Runbook user execution

### Các hành động chạy tuần tự trước measured interval

1. Xác nhận JMX, CSV, base URL và workload đúng bản đã Human Review.
2. Tạo run folder timestamp mới và HTML subfolder rỗng; xác minh chưa có JTL/log/resource result.
3. Dừng/reset backend hoặc database theo quy trình đã review và seed deterministic state.
4. Khởi động backend trong terminal riêng, chờ ổn định và giữ terminal này mở.
5. Xác định đúng backend PID, lưu `backend-pid.txt` và kiểm tra endpoint trả HTTP 200.
6. Provision 80 account ngoài measured interval; chỉ tiếp tục khi `Created: 80`, `Create failed: 0`, `Login with non-empty token: 80`, `Login failed: 0` hoặc tiêu chí thay thế đã được review.
7. Mở Task Manager/Resource Monitor, lọc đúng `node.exe` và PID, hiển thị CPU và Memory.
8. Chuẩn bị terminal execution tại repository root và exact commands nhưng chưa chạy JMeter.
9. Khởi động backend resource monitor, sau đó bắt đầu screen recorder.
10. User tự chạy exact measured JMeter command cuối cùng.

Không chạy reset, seed, provisioning, smoke hoặc HTML generation song song với measured workload. Setup traffic không được tính vào performance metric.

### Các thành phần chạy song song trong measured interval

| Thành phần | Yêu cầu |
| --- | --- |
| Backend terminal | `node.exe` chạy xuyên suốt; giữ output để nhận biết crash/stack trace |
| JMeter terminal | User chạy non-GUI measured command và giữ output hiển thị |
| Resource monitor script | Lấy mẫu đúng backend PID vào `backend-resource.csv` |
| Task Manager/Resource Monitor UI | Hiển thị đúng `node.exe`, PID, CPU và Memory |
| Screen recorder | Ghi JMeter terminal và backend resource UI trong cùng frame |
| User observation | Ghi stage, timeout, 4xx/5xx, lockout, crash và anomaly |

Thứ tự khởi động:

```text
backend -> Task Manager -> resource monitor -> screen recorder -> JMeter
```

Thứ tự kết thúc:

```text
JMeter completes
-> record exit code/end time
-> signal resource monitor to stop
-> wait until resource CSV is flushed
-> capture final backend state
-> stop screen recorder
-> verify artifacts
-> generate HTML if needed
```

### Bố trí terminal và màn hình

Dùng tối thiểu hai terminal:

- `Terminal A — Backend`: chỉ chạy backend; mở trước workload và giữ nguyên đến khi run kết thúc.
- `Terminal B — Execution/Control`: chạy precheck/provision tuần tự trước run, khởi động monitor, sau đó user chạy JMeter và dừng monitor.

Frame khuyến nghị:

```text
┌──────────────────────────────────┬──────────────────────────┐
│ Terminal B — JMeter non-GUI      │ Task Manager             │
│ command/output/timing/error       │ node.exe + đúng PID      │
│                                  │ CPU + Memory             │
└──────────────────────────────────┴──────────────────────────┘
```

JMeter terminal nên chiếm khoảng 60–70% màn hình; Task Manager khoảng 30–40%. Không che command/output, PID, CPU hoặc Memory. Terminal A có thể ở màn hình khác hoặc phía sau nhưng nên xuất hiện ở đầu/cuối video. Không để password, token hoặc secret xuất hiện.

### Nội dung visual evidence và thuyết minh

Đầu mỗi scenario phải thể hiện hoặc đọc bằng tiếng Việt: mã sinh viên, scenario, JMX, run folder, base URL, workload, backend PID và `Executor: User`.

Trong run, evidence phải thể hiện:

- Load: ramp-up, gần 20 VU, steady state và cuối run.
- Stress: 10, 20, 40, 60 và 80 VU.
- Spike: baseline, spike và recovery.
- Endurance: tối thiểu T+0, T+2, T+5, T+10 và T+15 nếu chạy 15 phút.

User thuyết minh stage/VU, CPU/RAM và mọi timeout, 4xx/5xx, lockout hoặc crash. Cuối video cho thấy JMeter đã kết thúc, trạng thái backend, run folder và artifact vừa tạo.

### Tạo HTML report

Ưu tiên tách HTML generation khỏi measured interval:

```text
JMeter workload tạo JTL/log
-> dừng resource monitor và recording
-> jmeter -g <JTL> -o <EMPTY_HTML_FOLDER>
```

Nếu dùng `-e -o` trong measured command, ghi rõ HTML được tạo trước khi JMeter process kết thúc và giới hạn resource analysis theo actual workload interval. HTML output folder luôn phải rỗng.

## Checkpoint 2 — Dn Evidence Analysis

Chỉ bắt đầu khi người dùng cung cấp exact run folder và evidence. Dùng [measured-evidence-analysis.md](../assets/templates/measured-evidence-analysis.md); đọc raw JTL, JMeter log, HTML, backend resource CSV/log, visual evidence và user notes.

Phân loại `VALID`, `VALID WITH LIMITATION` hoặc `INVALID`; chỉ tính metric có artifact thật hỗ trợ. Kết thúc `PENDING HUMAN REVIEW`, rồi dừng. Không tự chuyển sang scenario tiếp theo.

## Điều kiện reset và provision

Setup nằm ngoài measured duration. Yêu cầu quy trình đã review để reset/seed state, khởi động backend và ghi PID, provision 80 account, xác minh 80/80 login/token, kiểm tra reachability và xác nhận run folder rỗng trước khi người dùng chạy.

## Evidence bắt buộc

Trong lúc chạy, người dùng ghi lại JMeter/terminal và backend resource monitor trong cùng frame, đúng PID và time window. Sau khi chạy, cùng một run phải có:

- raw JTL không rỗng;
- JMeter log;
- HTML report;
- backend resource CSV/log;
- screenshot/video hoặc exact visual-evidence path;
- user note về start/end, exit code và anomaly.

User note phải ghi tối thiểu:

```text
Executor: User
Scenario:
JMX:
Run folder:
Start time:
End time:
JMeter exit code:
Backend PID:
Visual evidence path:
Reset/provision result:
Observed anomalies:
```

Nếu rerun để bổ sung visual evidence, phải tạo một bộ JTL/log/HTML/resource mới. Không ghép visual evidence của run mới với dữ liệu run cũ.

Không sửa tay raw JTL, không tái sử dụng resource CSV, không overwrite run `INVALID` và không ghép screenshot/video từ run khác.

## Human Review sau evidence analysis

User kiểm tra executor, timestamp/run folder, same-run coherence, correlation/assertion, lockout/401, metric từ raw JTL, backend PID/resource attribution và giới hạn kết luận. Ghi một trong các quyết định `Approved`, `Approved with corrections` hoặc `Rejected`. Chỉ approval rõ ràng của D1, D2, D3 hoặc D4 mới mở gate tiếp theo.

## AI Audit

Ghi tool, timestamp thật, checkpoint, prompt, action thực tế, command chỉ được chuẩn bị, user-executed artifact paths, kết quả phân tích, evidence thiếu và current status. Không relabel một agent-executed historical run thành user-executed.
