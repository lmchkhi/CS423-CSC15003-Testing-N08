# D2 Stress — Chuẩn bị lệnh User execution

Tài liệu này chỉ chuẩn bị lệnh. Agent không chạy JMeter Stress, wrapper hoặc script tạo JTL/kết quả đo.

## Scenario và plan đã duyệt

- Phase/scenario: `D2 — Stress`
- Executor: `User`
- Student: `23127464`
- JMX: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\stress\23127464_Stress_20260813.jmx`
- Workflow CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv`
- Provisioning CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv`, lọc `scenario=Stress`
- Base URL: `http://127.0.0.1:3000`
- Workload: staircase `10 → 20 → 40 → 60 → 80 VU`, mỗi bậc 60 giây, tổng cửa sổ scheduler 300 giây.
- Think time: 6 Uniform Random Timer, delay `1.000 ms` + random range `2.000 ms`, tức 1–3 giây giữa RCO-02 đến RCO-07.
- Listener: đúng một `Aggregate Report`, khác `Summary Report` của D1 Load.

## Preconditions và precheck Agent đã thực hiện

- [x] D1 Load run `20260814-001003-user-executed` được User duyệt `VALID WITH LIMITATION`; D2 Stress được authorize lúc `14/08/2026 00:59 +07:00`.
- [x] JMX parse XML thành công; SHA-256 `55C3A971DE7FF8DA8389A6A35541EA1A9EF5B853A39D22D80FCEF54591BB5A09`.
- [x] Generator được vá lúc `14/08/2026 00:08:59 +07:00`; JMX Stress được sinh sau đó lúc `14/08/2026 00:09:07 +07:00`.
- [x] Ultimate Thread Group có đúng 1 `ThreadGroup.main_controller`, `LoopController.loops=-1`.
- [x] 7 HTTP sampler, 14 assertion, 6 Uniform Random Timer và 1 Aggregate Report còn nguyên.
- [x] Schedule row: `(10,0,1,299,0)`, `(10,60,1,239,0)`, `(20,120,1,179,0)`, `(20,180,1,119,0)`, `(20,240,1,59,0)`. Tổng active kỳ vọng theo cửa sổ là 10/20/40/60/80 VU.
- [x] Workflow CSV: 12.768 byte, 150 row; window Stress có đúng 80 email unique.
- [x] Provisioning CSV: 10.090 byte, 150 row; pool Stress có đúng 80 email unique; không có email tái sử dụng chéo pool.
- [x] `jmeter.bat`, Node, generator và hai helper PowerShell tồn tại; hai helper PowerShell parse không lỗi.
- [x] Run folder mới được tạo bằng fail-if-exists lúc `14/08/2026 01:26:26 +07:00`; `html-report/` rỗng.
- [ ] Backend đang dừng tại precheck: không có listener port 3000, nên chưa có PID/HTTP 200 hiện hành. Quan sát thật được lưu ở `backend-precheck.txt`; không bịa `backend-pid.txt`.
- [ ] User bắt buộc restart/reset backend, xác minh PID mới và HTTP 200, rồi mới tạo `backend-pid.txt` trước measured interval.
- [ ] Reset/seed, provisioning, resource monitor và Stress chưa chạy.

Không cần tái sinh JMX vì bản Stress hiện tại đã có bản vá main-controller. `generate-phase-c-jmx.js` chỉ là input được validate, không được chạy trong lượt này.

## Run folder đã chuẩn bị

- Run folder: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed`
- HTML folder: `...\html-report\` — rỗng.
- Raw JTL dự kiến: `result.jtl`
- JMeter log: `jmeter.log`
- Console log: `jmeter-console.log`
- Resource CSV: `backend-resource.csv`
- PID evidence measured run: `backend-pid.txt` — chỉ User tạo sau restart/HTTP 200.
- Precheck evidence: `backend-precheck.txt`
- Provision evidence: `account-provisioning.txt`
- Monitor stop file: `monitor.stop`
- User note: `user-execution-note.md` — giữ đúng cấu trúc template, User tự điền.

## Lệnh tuần tự chuẩn bị và thực thi

### Terminal A — restart/reset/seed backend

Mở PowerShell riêng, đặt tên `Terminal A — Backend`, dán nguyên khối. Terminal này phải giữ mở suốt run.

```powershell
$ErrorActionPreference = "Stop"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed"
$oldPidEvidence = Join-Path $runDir "backend-old-pid.txt"
$node = "C:\Program Files\nodejs\node.exe"
$backendDir = "E:\Testing\CS423-CSC15003-Testing-N08\src\eshop-sut\backend"

if (-not (Test-Path -LiteralPath $node -PathType Leaf)) { throw "Missing node.exe: $node" }
if (-not (Test-Path -LiteralPath (Join-Path $backendDir "server.js") -PathType Leaf)) { throw "Missing backend entry point" }
if (Test-Path -LiteralPath $oldPidEvidence) { throw "Old PID evidence exists; refusing overwrite" }

$listenMatches = @(netstat -ano | Select-String -Pattern '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)\s*$')
$oldPids = @($listenMatches | ForEach-Object { [int]$_.Matches[0].Groups[1].Value } | Sort-Object -Unique)
if ($oldPids.Count -gt 1) { throw "More than one listener on port 3000: $($oldPids -join ', ')" }
if ($oldPids.Count -eq 1) {
    $oldBackendPid = $oldPids[0]
    $oldProcess = Get-Process -Id $oldBackendPid -ErrorAction Stop
    if ($oldProcess.ProcessName -ne "node") { throw "Port 3000 belongs to $($oldProcess.ProcessName), not node" }
    "Old backend PID: $oldBackendPid" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
    Stop-Process -Id $oldBackendPid
    while (Get-Process -Id $oldBackendPid -ErrorAction SilentlyContinue) { Start-Sleep -Milliseconds 250 }
} else {
    "Old backend PID: NONE" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
}

Set-Location $backendDir
& $node ".\server.js"
```

Chỉ qua bước sau khi Terminal A hiện `Connected to database`, `Database initialized and seeded (Phase 2).` và `Server is running on http://localhost:3000`. Startup này reset database/cart có chủ đích và nằm ngoài measured interval.

### Terminal B — resolve path, fail-fast, PID mới và HTTP 200

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot

$baseUrl = "http://127.0.0.1:3000"
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$plugin = "D:\apache-jmeter-5.6.3\lib\ext\jmeter-plugins-casutg-3.1.1.jar"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\stress\23127464_Stress_20260813.jmx"
$dataFile = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$generator = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\generate-phase-c-jmx.js"
$monitorScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\monitor-backend-resource.ps1"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed"
$htmlDir = Join-Path $runDir "html-report"
$jtl = Join-Path $runDir "result.jtl"
$jmeterLog = Join-Path $runDir "jmeter.log"
$consoleLog = Join-Path $runDir "jmeter-console.log"
$resourceOutput = Join-Path $runDir "backend-resource.csv"
$stopFile = Join-Path $runDir "monitor.stop"
$pidEvidence = Join-Path $runDir "backend-pid.txt"
$oldPidEvidence = Join-Path $runDir "backend-old-pid.txt"
$provisionEvidence = Join-Path $runDir "account-provisioning.txt"
$htmlGenerationLog = Join-Path $runDir "html-generation.log"

foreach ($path in @($jmeter,$plugin,$jmx,$dataFile,$provisionCsv,$generator,$monitorScript,$provisionScript)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing required input: $path" }
}
foreach ($csv in @($dataFile,$provisionCsv)) {
    if ((Get-Item -LiteralPath $csv).Length -eq 0) { throw "CSV is empty: $csv" }
}
if (-not (Test-Path -LiteralPath $runDir -PathType Container)) { throw "Missing run folder" }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }

if ((Get-FileHash -Algorithm SHA256 -LiteralPath $jmx).Hash -ne "55C3A971DE7FF8DA8389A6A35541EA1A9EF5B853A39D22D80FCEF54591BB5A09") { throw "Approved Stress JMX changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $dataFile).Hash -ne "00F1C7BA5EBDF68E14B078C2E3A881A927FD81736B685AC62886CCA941A1AD3D") { throw "Approved workflow CSV changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $provisionCsv).Hash -ne "1185D10BE10DC755E99E176F6BEDC24BF89FA4540A1A5DDDE72986451940EC7D") { throw "Approved provisioning CSV changed" }

[xml]$jmxXml = Get-Content -Raw -Encoding UTF8 -LiteralPath $jmx
$mainControllers = @($jmxXml.SelectNodes("//*[local-name()='elementProp' and @name='ThreadGroup.main_controller']"))
$loopValues = @($jmxXml.SelectNodes("//*[local-name()='elementProp' and @name='ThreadGroup.main_controller']/*[@name='LoopController.loops']") | ForEach-Object InnerText)
if ($mainControllers.Count -ne 1 -or $loopValues.Count -ne 1 -or $loopValues[0] -ne "-1") { throw "Stress JMX main_controller/loops correction missing" }
if (@($jmxXml.SelectNodes("//*[local-name()='HTTPSamplerProxy']")).Count -ne 7) { throw "Stress JMX must have 7 samplers" }
if (@($jmxXml.SelectNodes("//*[local-name()='ResponseAssertion' or local-name()='JSR223Assertion']")).Count -ne 14) { throw "Stress JMX must have 14 assertions" }
if (@($jmxXml.SelectNodes("//*[local-name()='UniformRandomTimer']")).Count -ne 6) { throw "Stress JMX must have 6 timers" }

$stressWorkflowRows = @(Import-Csv -LiteralPath $dataFile | Where-Object { $_.email -like "rco.stress.*@perf.test" })
$stressProvisionRows = @(Import-Csv -LiteralPath $provisionCsv | Where-Object { $_.scenario -eq "Stress" })
if ($stressWorkflowRows.Count -ne 80 -or @($stressWorkflowRows.email | Sort-Object -Unique).Count -ne 80) { throw "Workflow Stress pool is not 80 unique accounts" }
if ($stressProvisionRows.Count -ne 80 -or @($stressProvisionRows.email | Sort-Object -Unique).Count -ne 80) { throw "Provisioning Stress pool is not 80 unique accounts" }
$crossPoolReuse = @((Import-Csv -LiteralPath $provisionCsv) | Group-Object email | Where-Object Count -gt 1)
if ($crossPoolReuse.Count -ne 0) { throw "Account email reused across scenario pools" }

$listenMatches = @(netstat -ano | Select-String -Pattern '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)\s*$')
$backendPids = @($listenMatches | ForEach-Object { [int]$_.Matches[0].Groups[1].Value } | Sort-Object -Unique)
if ($backendPids.Count -ne 1) { throw "Expected exactly one listener PID on port 3000, found $($backendPids.Count)" }
$backendPid = $backendPids[0]
$backendProcess = Get-Process -Id $backendPid -ErrorAction Stop
if ($backendProcess.ProcessName -ne "node") { throw "PID $backendPid is $($backendProcess.ProcessName), not node" }
if (Test-Path -LiteralPath $pidEvidence) { throw "backend-pid.txt exists; refusing overwrite" }
$response = Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/api/products" -TimeoutSec 5
$products = $response.Content | ConvertFrom-Json
if ($response.StatusCode -ne 200 -or @($products).Count -eq 0) { throw "Backend reachability/product seed verification failed" }
@(
    "Timestamp: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "Backend PID: $backendPid"
    "Process name: $($backendProcess.ProcessName)"
    "Process start time: $($backendProcess.StartTime.ToString('o'))"
    "Port: 3000"
    "Reachability: HTTP 200"
    "URL: $baseUrl/api/products"
) | Set-Content -LiteralPath $pidEvidence -Encoding UTF8
"INPUT_PID_HTTP_PRECHECK_OK BACKEND_PID=$backendPid"
```

### Terminal B — provision 80 account Stress ngoài measured interval

```powershell
$ErrorActionPreference = "Stop"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$provisionEvidence = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\account-provisioning.txt"
$baseUrl = "http://127.0.0.1:3000"

foreach ($path in @($provisionScript,$provisionCsv)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing provisioning input: $path" }
}
if (Test-Path -LiteralPath $provisionEvidence) { throw "Provisioning evidence exists; refusing overwrite" }

$provisionArgs = @{
    CsvPath = $provisionCsv
    EvidencePath = $provisionEvidence
    BaseUrl = $baseUrl
    Scenario = "Stress"
    ExpectedCount = 80
}
& $provisionScript @provisionArgs
Get-Content -LiteralPath $provisionEvidence
```

Lưu ý correction ngày `14/08/2026 01:37 +07:00`: phải có call operator `&` ở dòng
`& $provisionScript @provisionArgs`. Nếu chỉ gõ `$provisionScript` rồi xuống dòng, PowerShell coi đó là biểu thức
chuỗi và báo `Unexpected token '-CsvPath'`; provisioning chưa chạy. Bản dùng splatting ở trên tránh phụ thuộc vào
backtick continuation và tự khai báo lại toàn bộ path thật.

Chỉ tiếp tục nếu đúng toàn bộ: `Requested: 80`, `Created: 80`, `Create failed: 0`, `Unique email: 80`, `Login with non-empty token: 80`, `Login failed: 0`, `Empty cart verified: 80`, `Empty order history verified: 80`, `PROVISIONING_OK`. Nếu lệch bất kỳ count nào, không bắt đầu đo.

## Resource monitor command

### Start — sau provisioning, trước recorder/JMeter

```powershell
$monitor = Start-Process powershell.exe `
    -ArgumentList @(
        "-NoProfile","-ExecutionPolicy","Bypass",
        "-File",$monitorScript,
        "-BackendPid",$backendPid,
        "-OutputPath",$resourceOutput,
        "-StopFile",$stopFile,
        "-IntervalSeconds","2"
    ) `
    -WindowStyle Hidden `
    -PassThru
Start-Sleep -Seconds 3
if ($monitor.HasExited) { throw "Resource monitor exited before workload start" }
if (-not (Test-Path -LiteralPath $resourceOutput)) { throw "Resource monitor did not create backend-resource.csv" }
"RESOURCE_MONITOR_RUNNING MONITOR_PID=$($monitor.Id) BACKEND_PID=$backendPid INTERVAL=2s"
```

### Stop — chỉ sau khi JMeter kết thúc

```powershell
if (Test-Path -LiteralPath $stopFile) { throw "Stop file already exists; monitor state is ambiguous" }
New-Item -ItemType File -Path $stopFile | Out-Null
Wait-Process -Id $monitor.Id
if (-not (Test-Path -LiteralPath $resourceOutput) -or (Get-Item -LiteralPath $resourceOutput).Length -eq 0) { throw "Resource output missing or empty" }
Get-Content -LiteralPath $resourceOutput | Select-Object -Last 3
```

## Exact measured command User cần chạy

Agent không chạy khối này. Không có `-e -o`; HTML tách riêng sau measured interval.

```powershell
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\stress\23127464_Stress_20260813.jmx"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\result.jtl"
$jmeterLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\jmeter.log"
$consoleLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\jmeter-console.log"
$baseUrl = "http://127.0.0.1:3000"

foreach ($resultTarget in @($jtl,$jmeterLog,$consoleLog)) {
    if (Test-Path -LiteralPath $resultTarget) { throw "Refusing to overwrite existing result: $resultTarget" }
}
$startTime = Get-Date
& $jmeter `
    -n `
    -t $jmx `
    "-JbaseUrl=$baseUrl" `
    -l $jtl `
    -j $jmeterLog `
    2>&1 | Tee-Object -FilePath $consoleLog
$jmeterExitCode = $LASTEXITCODE
$endTime = Get-Date
@(
    "Start time: $($startTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "End time: $($endTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "JMeter exit code: $jmeterExitCode"
) | Tee-Object -FilePath $consoleLog -Append

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JMeter did not create a non-empty JTL" }
$sampleCount = @(Import-Csv -LiteralPath $jtl).Count
if ($sampleCount -eq 0) { throw "JMeter produced zero samples; preserve run and inspect jmeter.log" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Property ThreadGroup.main_controller is unset" -Quiet) { throw "Fatal main-controller error found in jmeter.log" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Test failed!" -Quiet) { throw "JMeter log contains Test failed!; run is not automatically valid" }
if ($jmeterExitCode -ne 0) { throw "JMeter exited with code $jmeterExitCode; preserve artifacts" }
"POST_RUN_GUARD_OK SAMPLES=$sampleCount"
```

## HTML generation — sau measured interval

```powershell
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\result.jtl"
$htmlDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\html-report"
$htmlGenerationLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\html-generation.log"
if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL missing or empty" }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if (Test-Path -LiteralPath $htmlGenerationLog) { throw "HTML generation log exists; refusing overwrite" }
$htmlStartTime = Get-Date
& $jmeter -g $jtl -o $htmlDir -j $htmlGenerationLog
$htmlExitCode = $LASTEXITCODE
$htmlEndTime = Get-Date
"HTML start: $($htmlStartTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML end: $($htmlEndTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML exit code: $htmlExitCode"
if ($htmlExitCode -ne 0) { throw "HTML generation failed with exit code $htmlExitCode" }
```

## Post-run artifact verification

```powershell
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed"
$requiredArtifacts = @(
    (Join-Path $runDir "result.jtl"),(Join-Path $runDir "jmeter.log"),
    (Join-Path $runDir "jmeter-console.log"),(Join-Path $runDir "backend-resource.csv"),
    (Join-Path $runDir "backend-pid.txt"),(Join-Path $runDir "account-provisioning.txt"),
    (Join-Path $runDir "html-report\index.html")
)
$artifactCheck = $requiredArtifacts | ForEach-Object {
    $exists = Test-Path -LiteralPath $_ -PathType Leaf
    [pscustomobject]@{ Status=if($exists){"PRESENT"}else{"MISSING"}; Bytes=if($exists){(Get-Item -LiteralPath $_).Length}else{0}; Path=$_ }
}
$artifactCheck | Format-Table -AutoSize -Wrap
$missing = @($artifactCheck | Where-Object { $_.Status -eq "MISSING" -or $_.Bytes -eq 0 })
if ($missing.Count -ne 0) { throw "Missing or empty required artifacts: $($missing.Count)" }
"ARTIFACT_VERIFICATION_OK"
```

# Hướng dẫn thực thi cho User

## A. Chuẩn bị màn hình trước khi chạy

- Mở `Terminal A — Backend`: chỉ chạy `node server.js`, giữ log startup/crash, không chạy provisioning/JMeter trong cửa sổ này.
- Mở `Terminal B — D2 Stress Execution/Control`: chạy toàn bộ precheck, provisioning, monitor, JMeter, HTML và verification.
- Mở Task Manager, chọn `Details`, bấm cột `Name` và tìm `node.exe`; đối chiếu cột `PID` với số trong `backend-pid.txt`. Nếu chưa có cột PID, right-click hàng tiêu đề → `Select columns` → bật `PID`; giữ các cột `CPU` và `Memory (active private working set)`/Memory nhìn thấy.
- Bố trí frame chính: Terminal B bên trái 60–70%; Task Manager bên phải 30–40%. Terminal A xuất hiện ở đầu/cuối video.
- Tắt notification/Focus Assist; auto-hide taskbar hoặc che thông tin nhạy cảm; đóng cửa sổ có password/token. Không quay nội dung CSV credential.

## B. Trình tự thao tác từng bước

### 1. Mở Terminal A, restart backend và chờ ổn định

- Lệnh: dùng nguyên khối `Terminal A — restart/reset/seed backend` ở trên.
- Kỳ vọng: ba dòng database connected/seeded/server running; Terminal A tiếp tục mở.
- Nếu thất bại: không qua bước 2, không provision, không chạy JMeter; giữ lỗi startup để báo Agent.

### 2. Mở Terminal B, resolve input/PID và verify HTTP 200

- Lệnh: dùng nguyên khối `Terminal B — resolve path, fail-fast, PID mới và HTTP 200` ở trên.
- Kỳ vọng: dòng `INPUT_PID_HTTP_PRECHECK_OK` kèm số PID thật do PowerShell in và `backend-pid.txt` có HTTP 200.
- Nếu thất bại: dừng trước measured run. Không sửa hash/JMX/CSV hoặc tự điền PID.

### 3. Provision 80 account Stress và verify state sạch

- Lệnh: dùng nguyên khối `Terminal B — provision 80 account Stress ngoài measured interval` ở trên.
- Kỳ vọng: Created 80, Create failed 0, token 80, Login failed 0, cart rỗng 80, orders rỗng 80, `PROVISIONING_OK`.
- Nếu thất bại: không chạy JMeter. Restart/reset lại và dùng run folder mới nếu artifact/evidence đã xung đột; không retry password trong measured interval.

### 4. Mở Task Manager và sắp xếp frame

- Lệnh mở: `taskmgr.exe`; thao tác UI theo mục A, tab Details, đúng `node.exe` và PID trong `backend-pid.txt`.
- Kỳ vọng: PID, CPU, Memory cùng nhìn thấy với Terminal B ở tỷ lệ 65/35 xấp xỉ.
- Nếu thất bại: sửa filter/layout trước khi bật recorder/JMeter.

### 5. Bắt đầu resource monitor

- Lệnh: dùng nguyên khối `Resource monitor command — Start` ở trên.
- Kỳ vọng: `RESOURCE_MONITOR_RUNNING`, đúng backend PID, interval 2 giây; CSV bắt đầu có dữ liệu.
- Nếu thất bại: không bật recorder/JMeter; kiểm tra helper/PID/path, không tạo CSV giả.

### 6. Bắt đầu ghi màn hình và đọc opening narration

- Thao tác: bật recorder; quay Terminal A vài giây rồi về frame Terminal B + Task Manager.
- Đọc: “Tôi là sinh viên 23127464. Đây là D2 Stress, Executor: User. JMX là 23127464_Stress_20260813.jmx. Run folder là 20260814-012626-user-executed. Base URL là http://127.0.0.1:3000. Workload staircase 10, 20, 40, 60, 80 VU, mỗi bậc khoảng 60 giây, think time ngẫu nhiên 1 đến 3 giây, Aggregate Report. Backend PID là số đang hiển thị trong backend-pid.txt và Task Manager.” Sau đó đọc số PID thật trên màn hình.
- Nếu recorder/layout/narration lỗi: dừng và làm lại trước khi chạy JMeter; không ghép video run khác.

### 7. Chạy measured JMeter

- Lệnh: dán nguyên văn khối `Exact measured command User cần chạy` ở trên.
- Kỳ vọng: non-GUI summary xuất hiện; JTL/log/console ghi đúng folder. Khối tự ghi start/end/exit và chạy guard.
- Nếu lỗi: giữ nguyên artifact; không overwrite/rerun cùng folder. Nếu process còn chạy, làm theo mục D.

### 8. Theo dõi và đọc to milestone

- Không chạy lệnh khác. Theo bảng mục C, đọc `Active/Started/Finished`, rate, `Err`, CPU/Memory đúng PID tại T+0, ~60, ~120, ~180, ~240 và completion.
- Xác nhận Active đạt bậc kỳ vọng sau ramp của từng nhóm. Ghi rõ bậc đầu tiên error rate/response time tăng mạnh để tìm breaking point.
- Nếu Active lệch hoặc lỗi tăng: nói to timestamp/stage; thường vẫn để run hoàn tất.

### 9. Ghi exit code/end time và guard

- Lệnh hiển thị cuối log: `Get-Content -LiteralPath "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\jmeter-console.log" | Select-Object -Last 6`
- Kỳ vọng: có start/end, exit code 0 và dòng `POST_RUN_GUARD_OK` kèm số sample thật.
- Nếu thiếu/exit khác 0/guard throw: không xóa artifact; ghi note và báo Agent.

### 10. Dừng resource monitor

- Lệnh: dùng nguyên khối `Resource monitor command — Stop` ở trên.
- Kỳ vọng: monitor thoát sau stop-file, CSV không rỗng và ba row cuối được in.
- Nếu thất bại: không fabricate/đụng CSV; giữ lỗi và báo Agent.

### 11. Ghi trạng thái backend cuối

- Lệnh: `Get-Process -Id $backendPid -ErrorAction Stop | Select-Object Id,ProcessName,StartTime,CPU,WorkingSet64,PrivateMemorySize64 | Format-List`
- Kỳ vọng: cùng PID còn sống; Task Manager và Terminal A được quay rõ.
- Nếu crash: quay stack trace/process mất, nói timestamp, không restart trong cùng run.

### 12. Dừng screen recorder

- Dừng sau final backend frame; lưu và mở thử video.
- Kỳ vọng: cùng-frame xuyên suốt các mốc chuyển bậc, âm thanh rõ, không secret.
- Nếu video hỏng/thiếu: không ghép với artifact run khác; báo Agent.

### 13. Generate HTML report

- Lệnh: dùng nguyên khối `HTML generation — sau measured interval` ở trên.
- Kỳ vọng: HTML exit code 0 và `html-report/index.html` tồn tại.
- Nếu thất bại: giữ JTL/log; không overwrite output dở dang.

### 14. Verify artifact

- Lệnh: dùng nguyên khối `Post-run artifact verification` ở trên.
- Kỳ vọng: mọi file `PRESENT`, Bytes > 0, `ARTIFACT_VERIFICATION_OK`, không `MISSING`.
- Nếu thất bại: báo đúng path/byte bị thiếu; không copy artifact từ run khác.

### 15. Điền user-execution-note.md

- Mở: `notepad.exe "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\stress\20260814-012626-user-executed\user-execution-note.md"`
- Điền thời gian thật, PID, exit code, provisioning counts, video path và anomaly theo từng bậc.
- Nếu không biết giá trị: ghi `Không xác định — lý do thật`, không đoán.

## C. Bảng chỉ số theo dõi tại từng mốc

| Mốc thời gian | Bậc VU kỳ vọng | Chỉ số console cần đọc | Task Manager | Ghi chú/anomaly |
| --- | ---: | --- | --- | --- |
| T+0 / 0–59s | 10 | `summary +/=`, rate `/s`, Avg/Min/Max, Err, Active/Started/Finished | CPU %, Memory MiB đúng PID | Xác nhận bắt đầu 10 VU; ghi startup error |
| ~T+60s / 60–119s | 20 | Active gần 20, Started, Finished, rate, Err | CPU %, Memory MiB | Nêu thời điểm đạt 20; latency/error có đổi không |
| ~T+120s / 120–179s | 40 | Active gần 40, rate, Err, Avg/Min/Max | CPU %, Memory MiB | Tìm throughput plateau/timeout đầu tiên |
| ~T+180s / 180–239s | 60 | Active gần 60, rate, Err, Finished | CPU %, Memory MiB | Nêu error rate/response time tăng đột biến nếu có |
| ~T+240s / 240–299s | 80 — peak | Active gần 80, rate, Err, Avg/Min/Max | CPU %, Memory MiB | Mốc quan trọng nhất để tìm breaking point; ghi 4xx/5xx/timeout/crash |
| Completion/ramp-down ~T+300s+ | Active về 0, Finished 80 kỳ vọng | summary cuối, rate/Err tổng, Active/Started/Finished, exit/guard | CPU %, Memory MiB, process alive | Ghi cutoff, early finish, backend final state |

`summary +` là interval gần nhất; `summary =` là tích lũy; `/s` là throughput quan sát. `Avg/Min/Max` không phải p95. Raw JTL là nguồn metric chính thức. Đặc biệt ghi bậc đầu tiên error rate tăng rõ hoặc response time tăng đột biến: đây là dấu hiệu breaking point cần phân tích ở D2 Evidence Analysis.

## D. Bất thường cần dừng lại và báo ngay

| Tình huống | User nên làm gì |
| --- | --- |
| Mass 401/403 hoặc lockout | Nói stage/timestamp/Err; thường để run hoàn tất rồi báo Agent. Nếu xảy ra khi provisioning, không được bắt đầu đo. Không retry password. |
| Connection refused | Quan sát Terminal A/Task Manager; nếu backend còn sống, để run hết. Nếu backend crash hoàn toàn và workload không thể tiếp tục, giữ evidence và kết thúc có kiểm soát. |
| Timeout hàng loạt | Đọc Active/rate/Err/CPU/RAM; không đổi timeout hoặc VU giữa run; để chạy hết nếu hệ thống còn hoạt động. Đây có thể là breaking point hợp lệ. |
| `OutOfMemoryError` | Quay rõ JMeter/Terminal A/Task Manager; không xóa artifact. Nếu process chết hoàn toàn thì dừng sau khi lấy final evidence. |
| Backend crash/Terminal A dừng log | Nói “backend crash” và timestamp; không restart trong measured interval; giữ artifact để Agent phân loại. |
| Active không đạt đúng bậc sau ramp | Nói Active/Started/Finished và Err; không thêm thread thủ công; để run hoàn tất rồi báo limitation. |
| Thread kết thúc sớm bất thường | Nói mốc và Finished; không rerun vào cùng folder; giữ evidence để kiểm tra assertion/CSV/scheduler cutoff. |
| Resource monitor chết | Nói rõ; không tạo số thủ công. Nếu backend/JMeter còn chạy, để workload hoàn tất rồi báo limitation. |

Trong Stress test, error tăng ở bậc cao có thể là kết quả dự kiến, không phải lý do tự ý hủy. Chỉ dừng sớm khi backend/JMeter crash hoàn toàn hoặc máy không thể tiếp tục an toàn; mọi trường hợp khác để chạy hết rồi Agent đánh giá `VALID WITH LIMITATION` hay `INVALID` từ evidence.

## E. Checklist trước khi gửi evidence lại cho Agent

- [ ] `result.jtl` không rỗng và Import-Csv có sample > 0.
- [ ] `jmeter.log` tồn tại, không có main-controller error hoặc `Test failed!`.
- [ ] `jmeter-console.log` lưu qua Tee-Object, có start/end/exit và `POST_RUN_GUARD_OK`.
- [ ] `backend-resource.csv` có dữ liệu interval 2 giây đủ cả 5 bậc.
- [ ] `backend-pid.txt` khớp PID thật trong Task Manager/video.
- [ ] `account-provisioning.txt` có 80/0/80/0 và cart/orders rỗng 80/80.
- [ ] `html-report/index.html` tồn tại, không rỗng.
- [ ] Video ghi JMeter + Task Manager cùng frame xuyên suốt, đặc biệt mốc 10/20/40/60/80 VU và completion.
- [ ] Terminal A xuất hiện đầu/cuối; narration tiếng Việt đầy đủ.
- [ ] `user-execution-note.md` điền thời gian, exit code, PID, video path và anomaly thật.
- [ ] Không có secret/token/password trong video/ảnh/log chia sẻ.
- [ ] Không ghép JTL/log/resource/video từ run khác.

Gửi lại exact run folder, video/screenshot path, exit code thật và anomaly note. Chỉ khi đó Agent mới chuyển sang D2 Evidence Analysis.

## Risks / limitations

- Ultimate Thread Group có scheduler cutoff tại khoảng 300 giây; workflow đang chạy có thể bị cắt ở biên, cần đọc JTL/log.
- Pool Stress đúng 80 account; thiếu/trùng/hết pool làm sai VU isolation và phải fail-fast.
- Sai credential có thể gây lockout 180 giây; provisioning 401/403 bắt buộc reset/reprovision trước đo.
- Checkout không clear cart và order history tăng qua iteration; payload/state drift có thể làm latency tăng theo thời gian, không chỉ do VU.
- Breaking point có thể xuất hiện trước 80 VU; error ở bậc cao là dữ liệu Stress dự kiến nếu harness/backend vẫn chạy đúng.
- Aggregate Report và load generator có overhead; console Avg không phải p95, và không có resource metric load generator nếu User không thu riêng.
- Precheck Agent thấy backend đang dừng; PID measured chỉ hợp lệ sau User restart và HTTP 200. Không dùng PID D1 hoặc `backend-precheck.txt` thay `backend-pid.txt`.
- Thiếu same-frame milestone/video hoặc resource interval có thể làm kết quả `VALID WITH LIMITATION` hoặc `INVALID`.

## Current status

`D2 STRESS COMMAND READY — PENDING USER EXECUTION`
