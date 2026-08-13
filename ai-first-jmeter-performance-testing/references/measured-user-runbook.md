# D1–D4 Measured User Execution Runbook

## Mục đích và cách dùng

Reference này bắt buộc được dùng khi agent chuẩn bị D1 Load, D2 Stress, D3 Spike hoặc D4 Endurance. Mỗi command-preparation artifact phải cụ thể như một runbook vận hành, gồm `trước run -> trong run -> sau run -> gửi evidence -> AI phân tích`.

Các command dưới đây là pattern để agent điền. Trước khi bàn giao, agent phải inspect repository/môi trường và thay mọi giá trị ví dụ bằng path, port, filename, workload và support script thật. Nếu JMX/CSV/script/backend entry thiếu hoặc rỗng, không xuất một command giả vờ chạy được; ghi blocker và kết thúc preparation.

Agent tuyệt đối không chạy measured command. User là executor và tự điều khiển screen recorder/Task Manager.

## Bộ cửa sổ chuẩn

### Terminal A — Backend

Chỉ khởi động và giữ backend chạy. Không dùng terminal này để provision, monitor, chạy JMeter hoặc tạo HTML. Giữ output để nhận biết startup error, crash và stack trace.

Pattern:

```powershell
Set-Location "<ACTUAL_BACKEND_DIRECTORY>"
<ACTUAL_REVIEWED_BACKEND_START_COMMAND>
```

### Terminal B — Execution/Control

Chạy tuần tự precheck, provisioning, monitor start, measured JMeter, monitor stop, artifact verification và HTML generation. User không chạy các bước setup trong measured interval.

### Task Manager và screen recorder

Task Manager `Details` hoặc công cụ tương đương phải hiển thị đúng backend process, PID, CPU và Memory. Trong measured interval, frame chính:

```text
┌──────────────────────────────────────┬──────────────────────────┐
│ Terminal B — JMeter non-GUI          │ Task Manager             │
│ command/summary/thread/error output  │ node.exe + đúng PID      │
│                                      │ CPU + Memory             │
└──────────────────────────────────────┴──────────────────────────┘
```

JMeter nên chiếm 60–70%, Task Manager 30–40%. Terminal A có thể ở màn hình khác nhưng phải được cho thấy ở đầu/cuối video. Không để secret, password hoặc token xuất hiện.

## Command library bắt buộc phải cụ thể hóa

### 1. Tạo run folder mới

```powershell
Set-Location "<ACTUAL_REPOSITORY_ROOT>"

$scenario = "<load|stress|spike|endurance>"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$runDir = "tests\returning-customer-order\test-runs\$scenario\$stamp-user-executed"
$htmlDir = Join-Path $runDir "html-report"

if (Test-Path -LiteralPath $runDir) {
    throw "Run folder already exists; choose a new timestamp: $runDir"
}

New-Item -ItemType Directory -Path $runDir | Out-Null
New-Item -ItemType Directory -Path $htmlDir | Out-Null

if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) {
    throw "HTML folder must be empty"
}
```

### 2. Resolve path và fail-fast

```powershell
$jmeter = "<ACTUAL_JMETER_BAT>"
$jmx = (Resolve-Path "<ACTUAL_REVIEWED_JMX>").Path
$dataFile = (Resolve-Path "<ACTUAL_REVIEWED_CSV>").Path
$monitorScript = (Resolve-Path "<ACTUAL_MONITOR_SCRIPT>").Path
$provisionScript = (Resolve-Path "<ACTUAL_PROVISION_SCRIPT>").Path

$jtl = Join-Path $runDir "<ACTUAL_RESULT_NAME>.jtl"
$jmeterLog = Join-Path $runDir "jmeter.log"
$consoleLog = Join-Path $runDir "jmeter-console.log"
$resourceOutput = Join-Path $runDir "backend-resource.csv"
$stopFile = Join-Path $runDir "monitor.stop"
$pidEvidence = Join-Path $runDir "backend-pid.txt"
$provisionEvidence = Join-Path $runDir "account-provisioning.txt"

foreach ($path in @($jmeter, $jmx, $dataFile, $monitorScript, $provisionScript)) {
    if (-not (Test-Path -LiteralPath $path)) { throw "Missing required input: $path" }
}

if ((Get-Item -LiteralPath $dataFile).Length -eq 0) {
    throw "CSV is empty: $dataFile"
}
```

### 3. Backend PID và reachability

Agent thay port/URL/process bằng giá trị đã review:

```powershell
$backendPid = (Get-NetTCPConnection -LocalPort <ACTUAL_PORT> -State Listen).OwningProcess
$backendProcess = Get-Process -Id $backendPid -ErrorAction Stop
$backendProcess | Select-Object Id,ProcessName,StartTime,WorkingSet64 | Out-File $pidEvidence

$status = (Invoke-WebRequest -UseBasicParsing -Uri "<ACTUAL_REACHABILITY_URL>" -TimeoutSec 5).StatusCode
if ($status -ne 200) { throw "Backend reachability failed: HTTP $status" }
```

### 4. Provisioning ngoài measured interval

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $provisionScript -EvidencePath $provisionEvidence
Get-Content -LiteralPath $provisionEvidence
```

Preparation phải ghi exact success conditions, ví dụ `Created: 80`, `Create failed: 0`, `Login with non-empty token: 80`, `Login failed: 0`. Nếu không đạt, user dừng trước measured run.

### 5. Start monitor

```powershell
$monitor = Start-Process powershell.exe `
    -ArgumentList @(
        "-NoProfile", "-ExecutionPolicy", "Bypass",
        "-File", $monitorScript,
        "-BackendPid", $backendPid,
        "-OutputPath", $resourceOutput,
        "-StopFile", $stopFile,
        "-IntervalSeconds", "2"
    ) `
    -WindowStyle Hidden `
    -PassThru

if ($monitor.HasExited) { throw "Resource monitor exited before workload start" }
```

Sau monitor start: user bắt đầu recorder, đọc opening narration, xác nhận cùng-frame rồi mới chạy measured command.

### 6. Measured command và console capture

```powershell
$startTime = Get-Date

& $jmeter `
    -n `
    -t $jmx `
    -JdataFile=$dataFile `
    <ACTUAL_REVIEWED_JMETER_PROPERTIES> `
    -l $jtl `
    -j $jmeterLog `
    2>&1 | Tee-Object -FilePath $consoleLog

$jmeterExitCode = $LASTEXITCODE
$endTime = Get-Date

"Start time: $($startTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"End time: $($endTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"JMeter exit code: $jmeterExitCode"
```

Preparation phải thay `<ACTUAL_REVIEWED_JMETER_PROPERTIES>` bằng property thật hoặc bỏ dòng đó. Không để placeholder trong command user nhận.

### 7. Cách theo dõi console

Output thường có dạng:

```text
summary + 1200 in 00:00:30 = 40.0/s Avg: 220 Min: 25 Max: 1800 Err: 3 (0.25%) Active: 20 Started: 20 Finished: 0
```

- `summary +`: interval gần nhất; `summary =`: tích lũy.
- `40.0/s`: throughput quan sát ở console.
- `Avg/Min/Max`: response-time, không phải p95.
- `Err`: lỗi sample và tỷ lệ.
- `Active/Started/Finished`: trạng thái thread.

User đọc/ghi nhận stage, Active, rate, Err, CPU và Memory. User phải nêu anomaly khi có mass 401/lockout, connection refused, timeout surge, OOM, backend crash, monitor chết, không đạt target VU hoặc thread kết thúc sớm. Console chỉ là supporting evidence; raw JTL là nguồn metric chính thức.

### 8. Stop monitor sau JMeter

```powershell
New-Item -ItemType File -Path $stopFile -Force | Out-Null
Wait-Process -Id $monitor.Id

if (-not (Test-Path -LiteralPath $resourceOutput)) {
    throw "Resource output was not created"
}
```

User quay final backend state rồi mới dừng recorder.

### 9. Tạo HTML sau measured interval

```powershell
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) {
    throw "HTML folder must be empty before generation"
}

$htmlStartTime = Get-Date
& $jmeter -g $jtl -o $htmlDir
$htmlExitCode = $LASTEXITCODE
$htmlEndTime = Get-Date

"HTML start: $($htmlStartTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML end: $($htmlEndTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML exit code: $htmlExitCode"
```

### 10. Verify artifact

```powershell
$requiredArtifacts = @(
    $jtl,
    $jmeterLog,
    $consoleLog,
    $resourceOutput,
    $pidEvidence,
    $provisionEvidence,
    (Join-Path $htmlDir "index.html")
)

$artifactCheck = $requiredArtifacts | ForEach-Object {
    [pscustomobject]@{
        Path = $_
        Exists = Test-Path -LiteralPath $_
        Bytes = if (Test-Path -LiteralPath $_) { (Get-Item -LiteralPath $_).Length } else { 0 }
    }
}

$artifactCheck | Format-Table -AutoSize

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) {
    throw "Raw JTL is missing or empty"
}
if (-not (Test-Path -LiteralPath $resourceOutput) -or (Get-Item -LiteralPath $resourceOutput).Length -eq 0) {
    throw "Resource evidence is missing or empty"
}
```

User điền bản copy của [user-execution-note.md](../assets/templates/user-execution-note.md) bằng giá trị thật và đặt trong run folder.

## D1 — Load

### Trước run

- Require explicit Phase C approval and reviewed Load JMX/CSV.
- Verify 20 VU, ramp-up 60 giây, duration 360 giây, think time random 1–3 giây hoặc cấu hình mới đã duyệt.
- Thực hiện Command library bước 1–5 theo thứ tự.
- Opening narration: student ID, `D1 Load`, `Executor: User`, JMX, run folder, base URL, workload và backend PID.

### Trong run

| Milestone | Nội dung evidence |
| --- | --- |
| Start/T+0 | Command bắt đầu; JMeter và đúng PID/CPU/Memory cùng frame |
| Ramp-up khoảng T+30 | Active threads đang tăng; rate/Err; CPU/RAM |
| Target khoảng T+60 | Active gần/bằng 20; rate/Err; CPU/RAM |
| Steady state | Ít nhất một mốc giữa run; Active/throughput/error và backend resource |
| Completion | Exit/end state; backend còn sống hay crash |

User không gọi Avg là p95 và không kết luận capacity chỉ từ terminal.

### Sau run

Thực hiện bước 8–10, điền execution note và gửi exact run folder/visual path/exit code/anomaly cho agent.

### AI phải trả sau khi nhận evidence

- Overall và per-sampler: Samples, Failed, Error %, Avg, Median, p90, p95, p99, throughput.
- Backend: sample count, missing samples, average/max CPU, average/max working set/private memory.
- Execution: start/end, measured duration, exit code, PID match và same-run coherence.
- Validity và limitation; kết thúc `LOAD RESULT PENDING HUMAN REVIEW`.

## D2 — Stress

### Trước run

- Require explicit Human Review approval of D1 analysis.
- Verify reviewed step model, mặc định `10 -> 20 -> 40 -> 60 -> 80 VU`, stage timing và scheduler cutoff.
- Verify account pool đáp ứng peak VU; reset lockout/cart/order state.
- Thực hiện Command library bước 1–5.
- Opening narration nêu toàn bộ stage/timing và backend PID.

### Trong run

Preparation phải tính exact time window từ JMX, không đoán. Với model mặc định:

| Time window | Stage evidence |
| --- | --- |
| 0–59 giây | 10 VU, rate/Err, CPU/RAM |
| 60–119 giây | 20 VU, rate/Err, CPU/RAM |
| 120–179 giây | 40 VU, rate/Err, CPU/RAM |
| 180–239 giây | 60 VU, rate/Err, CPU/RAM |
| 240–299 giây | 80 VU, rate/Err, CPU/RAM |
| Completion | Exit code, cutoff/anomaly và backend final state |

User nói rõ stage đang quan sát; ghi timeout, 5xx, blanket 401, lockout, throughput plateau, early finish và crash.

### Sau run

Thực hiện bước 8–10. Không dùng highest VU reached làm stable threshold.

### AI phải trả

Ngoài overall/per-sampler metrics, tạo bảng theo từng stage: Samples, Failed, Error %, throughput, p95, p99, CPU avg/max, RAM avg/max. Chỉ ra vùng throughput plateau/latency degradation bằng raw evidence; kết thúc `STRESS RESULT PENDING HUMAN REVIEW`.

## D3 — Spike

### Trước run

- Require valid, Human-Reviewed Load/Stress evidence.
- Derive/confirm baseline VU, spike VU, spike start/end và recovery observation window từ evidence đã duyệt.
- Nếu dùng View Results Tree, ghi overhead risk và approval.
- Thực hiện Command library bước 1–5.
- Opening narration nêu baseline, spike magnitude/timing, recovery window và backend PID.

### Trong run

| Milestone | Nội dung evidence |
| --- | --- |
| Baseline start/stable | Baseline Active/rate/Err và CPU/RAM |
| Spike start | Timestamp và Active tăng nhanh |
| Spike peak | Peak Active/rate/Err, CPU/RAM, timeout/5xx |
| Spike end | Timestamp tải giảm |
| Recovery | Active trở về baseline; response/error/resource recovery observation |
| Completion | Exit code và backend final state |

User không tự tuyên bố recovered nếu chưa có tiêu chí recovery đã review.

### Sau run

Thực hiện bước 8–10 và ghi các timestamp baseline/spike/recovery vào execution note.

### AI phải trả

Tạo bảng Baseline/Spike/Recovery với Samples, Error %, throughput, p95/p99, CPU và RAM; tính mức đổi p95/error/throughput và recovery time theo định nghĩa đã duyệt. Kết thúc `SPIKE RESULT PENDING HUMAN REVIEW`.

## D4 — Endurance

### Trước run

- Require valid, Human-Reviewed Stress evidence và preceding gates.
- Derive sustained VU/RPS từ vùng ổn định đã review; duration 10–15 phút.
- Reset deterministic state; ghi rõ cart/order/MyOrders payload có thể tích lũy.
- Thực hiện Command library bước 1–5.
- Opening narration nêu sustained load, duration, milestone times và backend PID.

### Trong run

| Milestone | Nội dung evidence |
| --- | --- |
| T+0 | Start state, Active/rate/Err, CPU/RAM |
| T+2 phút | Active/rate/Err, CPU/RAM, anomaly |
| T+5 phút | Active/rate/Err, CPU/RAM, anomaly |
| T+10 phút | Active/rate/Err, CPU/RAM, anomaly |
| T+15 phút | Bắt buộc nếu duration 15 phút |
| Completion | Exit code và backend final state |

User ghi memory tăng/ổn định/giảm như observation, không gọi đó là leak.

### Sau run

Thực hiện bước 8–10; execution note ghi chính xác duration và tất cả milestone evidence.

### AI phải trả

Tạo overall/per-sampler metrics và time-bucket table (ưu tiên mỗi phút): Samples, RPS, Error %, p95, CPU avg/max, RAM avg/max. Tính RAM delta/slope, p95/error đầu-cuối và kiểm tra stability; không kết luận leak trước khi loại trừ state/payload/JVM/load-generator effects. Endurance statement chỉ dùng số thật và kết thúc `ENDURANCE RESULT PENDING HUMAN REVIEW`.

## AI terminal tracking boundary

Agent không thể tự nhìn một terminal/Task Manager/recorder do user mở độc lập và không được khởi chạy measured workload để theo dõi thay user. `Tee-Object` biến console thành `jmeter-console.log`; sau run agent có thể đọc console log, JTL, JMeter log, HTML, resource CSV, PID/provision evidence và execution note.

Agent phải nói rõ dữ liệu nào là:

- console observation;
- raw JTL metric;
- resource CSV metric;
- visual evidence observation;
- user note;
- không xác định do thiếu evidence.

Không lấy console Avg thay cho p95, không lấy screenshot làm nguồn percentile và không bịa con số bị thiếu.
