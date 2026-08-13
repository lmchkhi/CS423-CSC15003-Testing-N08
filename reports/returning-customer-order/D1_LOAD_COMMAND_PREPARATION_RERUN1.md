# D1 Load — Chuẩn bị lệnh User rerun sau correction main controller

Runbook này thay thế bản chuẩn bị cho run `20260813-233819-user-executed` đã bị phân loại `INVALID`.
Không copy hoặc chạy lại command vào folder cũ.

## Scenario

- Phase/scenario: `D1 — Load`
- Executor: `User`
- Student: `23127464`
- JMX: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx`
- Workflow CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv`
- Account provisioning CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv`, lọc `scenario=Load`
- Base URL: `http://127.0.0.1:3000`

## Preconditions và kết quả precheck của Agent

- [x] Phase C được User phê duyệt lúc `13/08/2026 23:21 — Asia/Ho_Chi_Minh`; D1 được authorize ở chế độ `PREPARE ONLY`.
- [x] JMX XML parse thành công; SHA-256 `1C52367FC08532D92DD0C6A5F9561AA69A81BACB3E9B5C3932EDDC97CEA3D5D5`.
- [x] Correction: Ultimate Thread Group có đúng một `ThreadGroup.main_controller`,
  `LoopController.continue_forever=false` và `LoopController.loops=-1`.
- [x] User approved main-controller correction và authorized rerun bằng folder
  `20260814-001003-user-executed` lúc `14/08/2026 00:17 — Asia/Ho_Chi_Minh`.
- [x] Ultimate Thread Group: 20 thread, delay 0 giây, ramp-up 60 giây, hold 360 giây, shutdown 0 giây.
- [x] JMX có 7 HTTP sampler, 7 HTTP assertion, 7 business assertion, 6 Uniform Random Timer và đúng một Summary Report.
- [x] Workflow CSV không rỗng: 150 row tổng; pool Load có đúng 20 email unique, không field rỗng, quantity đều là integer dương.
- [x] Provisioning CSV không rỗng: 150 row tổng; `scenario=Load` có đúng 20 email unique.
- [x] `D:\apache-jmeter-5.6.3\bin\jmeter.bat` tồn tại; Ultimate Thread Group plugin `jmeter-plugins-casutg-3.1.1.jar` tồn tại.
- [x] Hai helper PowerShell parse thành công, 0 syntax error.
- [x] Precheck lúc `13/08/2026 23:36–23:39 +07:00`: `GET http://127.0.0.1:3000/api/products` trả HTTP 200; listener port 3000 thuộc PID cũ, process `node.exe`.
- [ ] PID cũ chỉ là quan sát trước reset. User bắt buộc restart backend và resolve PID mới; không được dùng PID cũ làm evidence measured run.
- [ ] Reset/seed, provisioning và measured execution chưa chạy.

## Empty output folder prepared

- Run folder: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed`
- Created: `14/08/2026 00:10:03 +07:00`
- Raw JTL: `result.jtl`
- JMeter workload log: `jmeter.log`
- Console log: `jmeter-console.log`
- HTML folder: `html-report\` — đã tạo và đang rỗng
- HTML generation log: `html-generation.log`
- Backend resource output: `backend-resource.csv`
- Backend PID evidence: `backend-pid.txt`
- Old backend PID evidence: `backend-old-pid.txt`
- Provisioning evidence: `account-provisioning.txt`
- Monitor stop file: `monitor.stop`
- User note: `user-execution-note.md` — đã copy; User phải điền giá trị thật sau run

Run folder không có JTL/log/resource result ở thời điểm chuẩn bị. Không đổi tên, không tái sử dụng và không chép artifact từ run khác vào folder này.

## Workload đã duyệt

| Hạng mục | Giá trị |
| --- | --- |
| VU | 20 |
| Ramp-up | 60 giây |
| Steady/hold | 360 giây |
| Tổng thời gian workload dự kiến | khoảng 420 giây cộng startup/shutdown overhead |
| Think time | Uniform random 1–3 giây giữa RCO-02 đến RCO-07 |
| Listener | Summary Report |
| Base URL | `http://127.0.0.1:3000` |
| Account pool | đúng 20 account Load, một account/VU |

`Avg` trên console không phải p95. Raw JTL mới là nguồn metric chính thức; console, resource CSV, video và user note là evidence hỗ trợ.

## Sequential setup commands

### Terminal A — restart/reset/seed backend

Mở PowerShell mới tên `Terminal A — Backend`, dán nguyên khối sau. Lệnh chỉ dừng process đang thật sự listen port 3000 nếu process đó là `node`, ghi PID cũ, rồi chạy backend bằng entry point đã review. Terminal này phải mở xuyên suốt workload.

```powershell
$ErrorActionPreference = "Stop"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed"
$oldPidEvidence = Join-Path $runDir "backend-old-pid.txt"
$node = "C:\Program Files\nodejs\node.exe"
$backendDir = "E:\Testing\CS423-CSC15003-Testing-N08\src\eshop-sut\backend"

if (-not (Test-Path -LiteralPath $node -PathType Leaf)) { throw "Missing node.exe: $node" }
if (-not (Test-Path -LiteralPath (Join-Path $backendDir "server.js") -PathType Leaf)) { throw "Missing backend entry point" }
if (Test-Path -LiteralPath $oldPidEvidence) { throw "Old PID evidence already exists; do not overwrite this run" }

$listenMatches = @(netstat -ano | Select-String -Pattern '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)\s*$')
$oldPids = @($listenMatches | ForEach-Object { [int]$_.Matches[0].Groups[1].Value } | Sort-Object -Unique)
if ($oldPids.Count -gt 1) { throw "More than one PID is listening on port 3000: $($oldPids -join ', ')" }

if ($oldPids.Count -eq 1) {
    $oldBackendPid = $oldPids[0]
    $oldProcess = Get-Process -Id $oldBackendPid -ErrorAction Stop
    if ($oldProcess.ProcessName -ne "node") { throw "Port 3000 belongs to $($oldProcess.ProcessName), not node" }
    "Old backend PID: $oldBackendPid" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
    Stop-Process -Id $oldBackendPid
    while (Get-Process -Id $oldBackendPid -ErrorAction SilentlyContinue) { Start-Sleep -Milliseconds 250 }
    "Stopped old backend PID: $oldBackendPid"
}
else {
    "Old backend PID: NONE" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
    "No existing listener on port 3000"
}

Set-Location $backendDir
& $node ".\server.js"
```

Chờ Terminal A hiện đủ `Connected to database`, `Database initialized and seeded (Phase 2).` và `Server is running on http://localhost:3000`. Không đóng Terminal A.

### Terminal B — resolve và validate toàn bộ input/run folder

Mở PowerShell mới tên `Terminal B — Execution/Control`; dùng duy nhất terminal này cho các bước còn lại. Dán nguyên khối:

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot

$baseUrl = "http://127.0.0.1:3000"
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$plugin = "D:\apache-jmeter-5.6.3\lib\ext\jmeter-plugins-casutg-3.1.1.jar"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx"
$dataFile = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$monitorScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\monitor-backend-resource.ps1"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed"
$htmlDir = Join-Path $runDir "html-report"
$jtl = Join-Path $runDir "result.jtl"
$jmeterLog = Join-Path $runDir "jmeter.log"
$consoleLog = Join-Path $runDir "jmeter-console.log"
$resourceOutput = Join-Path $runDir "backend-resource.csv"
$stopFile = Join-Path $runDir "monitor.stop"
$pidEvidence = Join-Path $runDir "backend-pid.txt"
$oldPidEvidence = Join-Path $runDir "backend-old-pid.txt"
$provisionEvidence = Join-Path $runDir "account-provisioning.txt"
$userNote = Join-Path $runDir "user-execution-note.md"
$htmlGenerationLog = Join-Path $runDir "html-generation.log"

foreach ($path in @($jmeter, $plugin, $jmx, $dataFile, $provisionCsv, $monitorScript, $provisionScript)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing required input: $path" }
}
if (-not (Test-Path -LiteralPath $runDir -PathType Container)) { throw "Missing prepared run folder: $runDir" }
if (-not (Test-Path -LiteralPath $htmlDir -PathType Container)) { throw "Missing HTML folder: $htmlDir" }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if ((Get-Item -LiteralPath $dataFile).Length -eq 0) { throw "Workflow CSV is empty" }
if ((Get-Item -LiteralPath $provisionCsv).Length -eq 0) { throw "Provisioning CSV is empty" }

$allowedPreparedItems = @("html-report", "user-execution-note.md", "backend-old-pid.txt")
$unexpectedItems = @(Get-ChildItem -Force -LiteralPath $runDir | Where-Object { $_.Name -notin $allowedPreparedItems })
if ($unexpectedItems.Count -ne 0) { throw "Run folder contains result/unknown artifacts: $($unexpectedItems.Name -join ', ')" }

$expectedJmxHash = "1C52367FC08532D92DD0C6A5F9561AA69A81BACB3E9B5C3932EDDC97CEA3D5D5"
$expectedWorkflowCsvHash = "00F1C7BA5EBDF68E14B078C2E3A881A927FD81736B685AC62886CCA941A1AD3D"
$expectedProvisionCsvHash = "1185D10BE10DC755E99E176F6BEDC24BF89FA4540A1A5DDDE72986451940EC7D"
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $jmx).Hash -ne $expectedJmxHash) { throw "Approved JMX changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $dataFile).Hash -ne $expectedWorkflowCsvHash) { throw "Approved workflow CSV changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $provisionCsv).Hash -ne $expectedProvisionCsvHash) { throw "Approved provisioning CSV changed" }

[xml]$jmxXml = Get-Content -Raw -Encoding UTF8 -LiteralPath $jmx
$schedule = $jmxXml.SelectSingleNode("//*[local-name()='kg.apc.jmeter.threads.UltimateThreadGroup']/*[local-name()='collectionProp']/*[local-name()='collectionProp']")
$scheduleValues = @{}
foreach ($node in $schedule.ChildNodes) { $scheduleValues[$node.name] = $node.InnerText }
if ($scheduleValues["c0_0"] -ne "20" -or $scheduleValues["c0_2"] -ne "60" -or $scheduleValues["c0_3"] -ne "360") {
    throw "JMX workload is not approved 20 VU / 60s ramp / 360s hold"
}

$loadWorkflowRows = @(Import-Csv -LiteralPath $dataFile | Where-Object { $_.email -like "rco.load.*@perf.test" })
$loadProvisionRows = @(Import-Csv -LiteralPath $provisionCsv | Where-Object { $_.scenario -eq "Load" })
if ($loadWorkflowRows.Count -ne 20 -or @($loadWorkflowRows.email | Sort-Object -Unique).Count -ne 20) { throw "Workflow Load pool is not 20 unique accounts" }
if ($loadProvisionRows.Count -ne 20 -or @($loadProvisionRows.email | Sort-Object -Unique).Count -ne 20) { throw "Provisioning Load pool is not 20 unique accounts" }

"INPUT_PRECHECK_OK"
```

### Terminal B — resolve PID mới và verify HTTP 200

Chạy khối này sau khi Terminal A đã in đủ ba dòng startup/seed. Vì PowerShell hiện tại không có quyền dùng `Get-NetTCPConnection`, khối lệnh dùng `netstat -ano`, sau đó xác minh process bằng `Get-Process`.

```powershell
$listenMatches = @(netstat -ano | Select-String -Pattern '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)\s*$')
$backendPids = @($listenMatches | ForEach-Object { [int]$_.Matches[0].Groups[1].Value } | Sort-Object -Unique)
if ($backendPids.Count -ne 1) { throw "Expected exactly one listener PID on port 3000, found $($backendPids.Count)" }

$backendPid = $backendPids[0]
$backendProcess = Get-Process -Id $backendPid -ErrorAction Stop
if ($backendProcess.ProcessName -ne "node") { throw "PID $backendPid is $($backendProcess.ProcessName), not node" }

$oldPidText = Get-Content -Raw -LiteralPath $oldPidEvidence
if ($oldPidText -match 'Old backend PID:\s*(\d+)') {
    $oldBackendPid = [int]$Matches[1]
    if ($backendPid -eq $oldBackendPid) { throw "Backend PID did not change after restart: $backendPid" }
}

$ready = $false
for ($attempt = 1; $attempt -le 15; $attempt++) {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/api/products" -TimeoutSec 5
        $products = $response.Content | ConvertFrom-Json
        if ($response.StatusCode -eq 200 -and @($products).Count -gt 0) { $ready = $true; break }
    }
    catch { }
    Start-Sleep -Seconds 2
}
if (-not $ready) { throw "Backend did not reach HTTP 200 with non-empty products" }

@(
    "Timestamp: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "Backend PID: $backendPid"
    "Process name: $($backendProcess.ProcessName)"
    "Process start time: $($backendProcess.StartTime.ToString('o'))"
    "Executable: $($backendProcess.Path)"
    "Port: 3000"
    "Reachability: HTTP 200"
    "URL: $baseUrl/api/products"
) | Set-Content -LiteralPath $pidEvidence -Encoding UTF8

Get-Content -LiteralPath $pidEvidence
```

### Terminal B — provision đúng 20 account ngoài measured interval

Chỉ chạy sau reset/PID/HTTP thành công. Lệnh không ghi password hoặc token vào evidence.

```powershell
& $provisionScript `
    -CsvPath $provisionCsv `
    -EvidencePath $provisionEvidence `
    -BaseUrl $baseUrl `
    -Scenario "Load" `
    -ExpectedCount 20

if ($LASTEXITCODE -notin @(0, $null)) { throw "Provision helper failed with exit code $LASTEXITCODE" }
Get-Content -LiteralPath $provisionEvidence
```

Chỉ tiếp tục nếu thấy đủ tất cả điều kiện:

```text
Requested: 20
Created: 20
Create failed: 0
Unique email: 20
Login with non-empty token: 20
Login failed: 0
Empty cart verified: 20
Empty order history verified: 20
PROVISIONING_OK
```

Provisioning phải kết thúc trước khi bật monitor/recorder/JMeter; không chạy song song với measured interval.

## Resource monitor command

### Start — chạy trong Terminal B

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

Start-Sleep -Seconds 3
if ($monitor.HasExited) { throw "Resource monitor exited before workload start" }
if (-not (Test-Path -LiteralPath $resourceOutput)) { throw "Resource monitor did not create backend-resource.csv" }
"RESOURCE_MONITOR_RUNNING PID=$($monitor.Id) BACKEND_PID=$backendPid INTERVAL=2s"
```

### Stop — chỉ chạy sau khi JMeter kết thúc

```powershell
New-Item -ItemType File -Path $stopFile | Out-Null
Wait-Process -Id $monitor.Id
if (-not (Test-Path -LiteralPath $resourceOutput)) { throw "Resource output was not created" }
if ((Get-Item -LiteralPath $resourceOutput).Length -eq 0) { throw "Resource output is empty" }
Get-Content -LiteralPath $resourceOutput | Select-Object -Last 3
```

## Exact measured command for User to run

Agent không chạy khối này. User dán nguyên khối trong cùng Terminal B sau khi monitor đang chạy, Task Manager đã đúng PID và screen recorder đã bắt đầu.

```powershell
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\result.jtl"
$jmeterLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\jmeter.log"
$consoleLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\jmeter-console.log"
$baseUrl = "http://127.0.0.1:3000"

foreach ($resultTarget in @($jtl, $jmeterLog, $consoleLog)) {
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

$timingLines = @(
    "Start time: $($startTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "End time: $($endTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "JMeter exit code: $jmeterExitCode"
)
$timingLines | Tee-Object -FilePath $consoleLog -Append

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) {
    throw "JMeter did not create a non-empty JTL"
}
$sampleCount = @(Import-Csv -LiteralPath $jtl).Count
if ($sampleCount -eq 0) {
    throw "JMeter produced zero samples; preserve this run and inspect jmeter.log"
}
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Property ThreadGroup.main_controller is unset" -Quiet) {
    throw "Fatal main-controller error found in jmeter.log"
}
"POST_RUN_GUARD_OK SAMPLES=$sampleCount"
```

Không có `-e -o` trong measured command. HTML được tạo riêng sau khi monitor và recorder đã dừng, nên thời gian generate HTML không lẫn vào resource analysis.

## HTML generation command — sau measured interval

```powershell
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\result.jtl"
$htmlDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\html-report"
$htmlGenerationLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\html-generation.log"

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL is missing or empty" }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty before generation" }
if (Test-Path -LiteralPath $htmlGenerationLog) { throw "HTML generation log already exists" }

$htmlStartTime = Get-Date
& $jmeter -g $jtl -o $htmlDir -j $htmlGenerationLog
$htmlExitCode = $LASTEXITCODE
$htmlEndTime = Get-Date

"HTML start: $($htmlStartTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML end: $($htmlEndTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML exit code: $htmlExitCode"
if ($htmlExitCode -ne 0) { throw "HTML generation failed with exit code $htmlExitCode" }
```

## Post-run artifact verification command

Khối này chỉ báo giá trị thật trên filesystem. Artifact thiếu được đánh dấu `MISSING`; không tạo giá trị thay thế.

```powershell
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed"
$requiredArtifacts = @(
    (Join-Path $runDir "result.jtl"),
    (Join-Path $runDir "jmeter.log"),
    (Join-Path $runDir "jmeter-console.log"),
    (Join-Path $runDir "backend-resource.csv"),
    (Join-Path $runDir "backend-pid.txt"),
    (Join-Path $runDir "account-provisioning.txt"),
    (Join-Path $runDir "html-report\index.html")
)

$artifactCheck = $requiredArtifacts | ForEach-Object {
    $exists = Test-Path -LiteralPath $_ -PathType Leaf
    [pscustomobject]@{
        Status = if ($exists) { "PRESENT" } else { "MISSING" }
        Bytes = if ($exists) { (Get-Item -LiteralPath $_).Length } else { 0 }
        Path = $_
    }
}
$artifactCheck | Format-Table -AutoSize -Wrap

$missing = @($artifactCheck | Where-Object { $_.Status -eq "MISSING" -or $_.Bytes -eq 0 })
if ($missing.Count -ne 0) {
    $missing | Format-Table -AutoSize -Wrap
    throw "Missing or empty required artifacts: $($missing.Count)"
}
"ARTIFACT_VERIFICATION_OK"
```

# Hướng dẫn thực thi cho User

Phần này là trình tự vận hành độc lập. Không bỏ qua hoặc đổi thứ tự giữa reset, provisioning, monitor, recorder và JMeter.

## A. Chuẩn bị màn hình trước khi chạy

Mở đúng 4 cửa sổ/ứng dụng:

1. `Terminal A — Backend`: PowerShell chạy `node server.js`; đặt ở màn hình phụ nếu có. Nếu chỉ một màn hình, để phía sau hoặc thu nhỏ sau khi đã quay rõ ba dòng startup. Phải đưa lại lên hình ở cuối video.
2. `Terminal B — Execution/Control + JMeter`: PowerShell dùng cho precheck, provisioning, monitor và JMeter. Trong measured interval, cửa sổ này chiếm 65% bên trái màn hình.
3. `Task Manager — Details`: chiếm 35% bên phải, cùng frame với Terminal B xuyên suốt measured interval.
4. `Screen Recorder`: mở control trước, chọn ghi toàn màn hình chứa Terminal B và Task Manager; sau khi bắt đầu có thể thu nhỏ control nếu nó che evidence.

Trong Task Manager:

1. Nhấn `Ctrl+Shift+Esc`; nếu thấy giao diện rút gọn, chọn `More details`.
2. Chọn tab `Details`.
3. Nhấp phải hàng tiêu đề cột, chọn `Select columns`; bật `PID`, `CPU`, `Memory (active private working set)` hoặc cột Memory tương đương đang có.
4. Dùng ô search phía trên và nhập `node`, hoặc click cột `Name` rồi tìm `node.exe`.
5. Đối chiếu số PID với dòng `Backend PID:` trong `backend-pid.txt`. Không chọn một process `node.exe` khác chỉ vì cùng tên.
6. Giữ `Name`, `PID`, `CPU`, `Memory` nhìn rõ; không để Terminal B che các cột này.

Trước khi record: bật Do Not Disturb/tắt notification, đóng email/chat, ẩn taskbar nếu có tên tài khoản hoặc nội dung nhạy cảm, dọn clipboard history nếu cần, kiểm tra Terminal không hiển thị password/token. Provision helper không in token, nhưng User vẫn phải rà soát màn hình trước khi quay.

## B. Trình tự thao tác từng bước

### 1. Mở Terminal A, restart backend và chờ ổn định

- Thao tác: mở PowerShell mới, đặt tên cửa sổ `Terminal A — Backend`, rồi dán nguyên khối:

```powershell
$ErrorActionPreference = "Stop"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed"
$oldPidEvidence = Join-Path $runDir "backend-old-pid.txt"
$node = "C:\Program Files\nodejs\node.exe"
$backendDir = "E:\Testing\CS423-CSC15003-Testing-N08\src\eshop-sut\backend"

if (-not (Test-Path -LiteralPath $node -PathType Leaf)) { throw "Missing node.exe: $node" }
if (-not (Test-Path -LiteralPath (Join-Path $backendDir "server.js") -PathType Leaf)) { throw "Missing backend entry point" }
if (Test-Path -LiteralPath $oldPidEvidence) { throw "Old PID evidence already exists; do not overwrite this run" }

$listenMatches = @(netstat -ano | Select-String -Pattern '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)\s*$')
$oldPids = @($listenMatches | ForEach-Object { [int]$_.Matches[0].Groups[1].Value } | Sort-Object -Unique)
if ($oldPids.Count -gt 1) { throw "More than one PID is listening on port 3000: $($oldPids -join ', ')" }

if ($oldPids.Count -eq 1) {
    $oldBackendPid = $oldPids[0]
    $oldProcess = Get-Process -Id $oldBackendPid -ErrorAction Stop
    if ($oldProcess.ProcessName -ne "node") { throw "Port 3000 belongs to $($oldProcess.ProcessName), not node" }
    "Old backend PID: $oldBackendPid" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
    Stop-Process -Id $oldBackendPid
    while (Get-Process -Id $oldBackendPid -ErrorAction SilentlyContinue) { Start-Sleep -Milliseconds 250 }
    "Stopped old backend PID: $oldBackendPid"
}
else {
    "Old backend PID: NONE" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
    "No existing listener on port 3000"
}

Set-Location $backendDir
& $node ".\server.js"
```

Lệnh `node server.js` giữ Terminal A bận là bình thường; không nhấn `Ctrl+C` trong lúc chuẩn bị hoặc chạy Load.
- Kỳ vọng: PID cũ được dừng hoặc báo không có listener; sau đó hiện `Connected to database`, `Database initialized and seeded (Phase 2).`, `Server is running on http://localhost:3000`.
- Nếu thất bại: không provision và không chạy JMeter. Giữ nguyên log lỗi để gửi Agent; sửa startup trước khi tiếp tục.

### 2. Mở Terminal B, resolve PID mới và verify HTTP 200

- Thao tác: mở PowerShell thứ hai, đặt tên `Terminal B — Execution/Control`, rồi dán nguyên khối dưới đây. Khối này vừa khai báo các path được dùng ở bước sau, vừa fail-fast input, resolve PID mới và ghi `backend-pid.txt`.

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot

$baseUrl = "http://127.0.0.1:3000"
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$plugin = "D:\apache-jmeter-5.6.3\lib\ext\jmeter-plugins-casutg-3.1.1.jar"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx"
$dataFile = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$monitorScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\monitor-backend-resource.ps1"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed"
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

foreach ($path in @($jmeter, $plugin, $jmx, $dataFile, $provisionCsv, $monitorScript, $provisionScript)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing required input: $path" }
}
if (-not (Test-Path -LiteralPath $runDir -PathType Container)) { throw "Missing prepared run folder: $runDir" }
if (-not (Test-Path -LiteralPath $htmlDir -PathType Container)) { throw "Missing HTML folder: $htmlDir" }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if ((Get-Item -LiteralPath $dataFile).Length -eq 0) { throw "Workflow CSV is empty" }
if ((Get-Item -LiteralPath $provisionCsv).Length -eq 0) { throw "Provisioning CSV is empty" }

$allowedPreparedItems = @("html-report", "user-execution-note.md", "backend-old-pid.txt")
$unexpectedItems = @(Get-ChildItem -Force -LiteralPath $runDir | Where-Object { $_.Name -notin $allowedPreparedItems })
if ($unexpectedItems.Count -ne 0) { throw "Run folder contains result/unknown artifacts: $($unexpectedItems.Name -join ', ')" }

$expectedJmxHash = "1C52367FC08532D92DD0C6A5F9561AA69A81BACB3E9B5C3932EDDC97CEA3D5D5"
$expectedWorkflowCsvHash = "00F1C7BA5EBDF68E14B078C2E3A881A927FD81736B685AC62886CCA941A1AD3D"
$expectedProvisionCsvHash = "1185D10BE10DC755E99E176F6BEDC24BF89FA4540A1A5DDDE72986451940EC7D"
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $jmx).Hash -ne $expectedJmxHash) { throw "Approved JMX changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $dataFile).Hash -ne $expectedWorkflowCsvHash) { throw "Approved workflow CSV changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $provisionCsv).Hash -ne $expectedProvisionCsvHash) { throw "Approved provisioning CSV changed" }

$loadWorkflowRows = @(Import-Csv -LiteralPath $dataFile | Where-Object { $_.email -like "rco.load.*@perf.test" })
$loadProvisionRows = @(Import-Csv -LiteralPath $provisionCsv | Where-Object { $_.scenario -eq "Load" })
if ($loadWorkflowRows.Count -ne 20 -or @($loadWorkflowRows.email | Sort-Object -Unique).Count -ne 20) { throw "Workflow Load pool is not 20 unique accounts" }
if ($loadProvisionRows.Count -ne 20 -or @($loadProvisionRows.email | Sort-Object -Unique).Count -ne 20) { throw "Provisioning Load pool is not 20 unique accounts" }

$listenMatches = @(netstat -ano | Select-String -Pattern '^\s*TCP\s+\S+:3000\s+\S+\s+LISTENING\s+(\d+)\s*$')
$backendPids = @($listenMatches | ForEach-Object { [int]$_.Matches[0].Groups[1].Value } | Sort-Object -Unique)
if ($backendPids.Count -ne 1) { throw "Expected exactly one listener PID on port 3000, found $($backendPids.Count)" }

$backendPid = $backendPids[0]
$backendProcess = Get-Process -Id $backendPid -ErrorAction Stop
if ($backendProcess.ProcessName -ne "node") { throw "PID $backendPid is $($backendProcess.ProcessName), not node" }

$oldPidText = Get-Content -Raw -LiteralPath $oldPidEvidence
if ($oldPidText -match 'Old backend PID:\s*(\d+)') {
    $oldBackendPid = [int]$Matches[1]
    if ($backendPid -eq $oldBackendPid) { throw "Backend PID did not change after restart: $backendPid" }
}

$ready = $false
for ($attempt = 1; $attempt -le 15; $attempt++) {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/api/products" -TimeoutSec 5
        $products = $response.Content | ConvertFrom-Json
        if ($response.StatusCode -eq 200 -and @($products).Count -gt 0) { $ready = $true; break }
    }
    catch { }
    Start-Sleep -Seconds 2
}
if (-not $ready) { throw "Backend did not reach HTTP 200 with non-empty products" }

@(
    "Timestamp: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "Backend PID: $backendPid"
    "Process name: $($backendProcess.ProcessName)"
    "Process start time: $($backendProcess.StartTime.ToString('o'))"
    "Executable: $($backendProcess.Path)"
    "Port: 3000"
    "Reachability: HTTP 200"
    "URL: $baseUrl/api/products"
) | Set-Content -LiteralPath $pidEvidence -Encoding UTF8

Get-Content -LiteralPath $pidEvidence
"INPUT_PID_HTTP_PRECHECK_OK"
```
- Kỳ vọng: `INPUT_PRECHECK_OK`; đúng một listener, process `node`; PID mới khác PID cũ nếu có; products trả HTTP 200 và không rỗng; `backend-pid.txt` được tạo.
- Nếu thất bại: dừng trước measured run. Không sửa hash/JMX/CSV để lách precheck; không dùng PID cũ nếu backend đã restart.

### 3. Provision 20 account và verify state sạch

- Thao tác: trong cùng Terminal B của bước 2, dán:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass `
    -File "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1" `
    -CsvPath "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv" `
    -EvidencePath "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\account-provisioning.txt" `
    -BaseUrl "http://127.0.0.1:3000" `
    -Scenario "Load" `
    -ExpectedCount 20
if ($LASTEXITCODE -ne 0) { throw "Provisioning failed with exit code $LASTEXITCODE" }
```
- Kỳ vọng: `Created: 20`, `Create failed: 0`, `Login with non-empty token: 20`, `Login failed: 0`, cart rỗng 20/20, order history rỗng 20/20 và `PROVISIONING_OK`.
- Nếu thất bại: tuyệt đối không bắt đầu JMeter. Restart backend lại, dùng run folder mới nếu evidence/result đã bị tạo, rồi provision lại toàn bộ pool; không chờ lockout trong measured interval.

### 4. Mở Task Manager và sắp xếp frame

- Lệnh mở Task Manager trong Terminal B:

```powershell
taskmgr.exe
```

- Thao tác giao diện sau lệnh: vào `Details`, lọc `node.exe`, đối chiếu PID với `backend-pid.txt`; đặt Terminal B 65% trái và Task Manager 35% phải. Không có thêm lệnh PowerShell cho việc chọn cột/layout.
- Kỳ vọng: command/output JMeter cùng PID/CPU/Memory nhìn được đồng thời.
- Nếu thất bại: chưa record/chưa chạy JMeter; sửa layout hoặc chọn đúng PID trước.

### 5. Bắt đầu resource monitor

- Thao tác: trong cùng Terminal B, dán nguyên khối. Biến `$backendPid` được giữ từ bước 2 và biến `$monitor` phải được giữ đến bước 10.

```powershell
$monitor = Start-Process powershell.exe `
    -ArgumentList @(
        "-NoProfile", "-ExecutionPolicy", "Bypass",
        "-File", "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\monitor-backend-resource.ps1",
        "-BackendPid", $backendPid,
        "-OutputPath", "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\backend-resource.csv",
        "-StopFile", "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\monitor.stop",
        "-IntervalSeconds", "2"
    ) `
    -WindowStyle Hidden `
    -PassThru

Start-Sleep -Seconds 3
if ($monitor.HasExited) { throw "Resource monitor exited before workload start" }
if (-not (Test-Path -LiteralPath "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\backend-resource.csv")) {
    throw "Resource monitor did not create backend-resource.csv"
}
"RESOURCE_MONITOR_RUNNING MONITOR_PID=$($monitor.Id) BACKEND_PID=$backendPid INTERVAL=2s"
```
- Kỳ vọng: hiện `RESOURCE_MONITOR_RUNNING`, backend PID đúng, interval 2 giây và `backend-resource.csv` tồn tại.
- Nếu thất bại: không record/chạy JMeter; kiểm tra PID/path/helper. Không tự tạo CSV giả.

### 6. Bắt đầu screen recorder và đọc opening narration

- Lệnh thực thi: không có lệnh PowerShell vì recorder là thao tác giao diện. Bấm `Record/Start recording` trong phần mềm quay màn hình, ghi toàn màn hình chứa Terminal B + Task Manager; đưa Terminal A lên vài giây để quay startup log rồi trở lại frame chính.
- Đọc rõ: “Tôi là sinh viên 23127464. Đây là D1 Load, Executor: User. JMX là 23127464_Load_20260813.jmx. Run folder là 20260814-001003-user-executed. Base URL là http://127.0.0.1:3000. Workload gồm 20 VU, ramp-up 60 giây, steady state 360 giây, think time ngẫu nhiên 1 đến 3 giây, Summary Report. Backend PID hiện tại là [đọc số thật trong backend-pid.txt].”
- Kỳ vọng: video nghe rõ narration, thấy đúng PID và không lộ secret.
- Nếu thất bại: dừng recorder và quay lại từ đầu trước khi chạy JMeter; không ghép video của run khác.

### 7. User chạy measured JMeter command

- Thao tác: dán nguyên khối dưới đây trong cùng Terminal B:

```powershell
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\result.jtl"
$jmeterLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\jmeter.log"
$consoleLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\jmeter-console.log"
$baseUrl = "http://127.0.0.1:3000"

foreach ($resultTarget in @($jtl, $jmeterLog, $consoleLog)) {
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

$timingLines = @(
    "Start time: $($startTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "End time: $($endTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "JMeter exit code: $jmeterExitCode"
)
$timingLines | Tee-Object -FilePath $consoleLog -Append

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) {
    throw "JMeter did not create a non-empty JTL"
}
$sampleCount = @(Import-Csv -LiteralPath $jtl).Count
if ($sampleCount -eq 0) {
    throw "JMeter produced zero samples; preserve this run and inspect jmeter.log"
}
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Property ThreadGroup.main_controller is unset" -Quiet) {
    throw "Fatal main-controller error found in jmeter.log"
}
"POST_RUN_GUARD_OK SAMPLES=$sampleCount"
```

- Kỳ vọng: JMeter non-GUI bắt đầu, console summary xuất hiện, result/log/console được ghi vào đúng run folder.
- Nếu thất bại trước khi JMeter khởi chạy: giữ lỗi, không overwrite/retry trong folder này nếu đã tạo artifact. Báo Agent để quyết định folder mới.

### 8. Theo dõi và đọc to milestone

- Lệnh thực thi: không dán lệnh mới trong lúc JMeter đang chạy. Quan sát output của chính command bước 7 và Task Manager. Tại T+0, khoảng T+30s, T+60s, T+240s và completion, đọc stage; `Active/Started/Finished`, rate, `Err`; CPU và Memory của đúng PID. Dùng bảng mục C.
- Kỳ vọng: ramp tăng dần, gần 20 Active ở khoảng T+60, duy trì quanh 20 trong steady state, rồi Finished tăng khi hoàn tất.
- Nếu có anomaly: nói to loại lỗi và mốc thời gian. Thông thường vẫn để run hoàn tất; chỉ dừng nếu backend crash hoàn toàn/JMeter không thể tiếp tục, rồi giữ toàn bộ evidence.

### 9. Ghi exit code và end time

- Thao tác: command bước 7 tự in và append ba dòng. Khi prompt trở lại, chạy lệnh sau để hiển thị lại ba dòng cuối:

```powershell
Get-Content -LiteralPath "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\jmeter-console.log" | Select-Object -Last 3
```

Đọc to Start time, End time và JMeter exit code; quay rõ console.
- Kỳ vọng: có giá trị thật và được append vào `jmeter-console.log`.
- Nếu exit code khác 0: không sửa/xóa artifact; ghi bất thường trong note và gửi Agent đánh giá validity.

### 10. Dừng resource monitor đúng cách

- Thao tác: trong cùng Terminal B đang giữ `$monitor`, dán:

```powershell
$stopFile = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\monitor.stop"
$resourceOutput = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\backend-resource.csv"

if (Test-Path -LiteralPath $stopFile) { throw "Stop file already exists; monitor state is ambiguous" }
New-Item -ItemType File -Path $stopFile | Out-Null
Wait-Process -Id $monitor.Id
if (-not (Test-Path -LiteralPath $resourceOutput)) { throw "Resource output was not created" }
if ((Get-Item -LiteralPath $resourceOutput).Length -eq 0) { throw "Resource output is empty" }
Get-Content -LiteralPath $resourceOutput | Select-Object -Last 3
```
- Kỳ vọng: monitor đã thoát; `backend-resource.csv` tồn tại và không rỗng.
- Nếu thất bại: không kill tùy tiện trước khi chờ flush; giữ lỗi và báo Agent. Không tự tạo/chỉnh CSV.

### 11. Quay trạng thái backend cuối

- Lệnh kiểm tra nhanh trong Terminal B:

```powershell
Get-Process -Id $backendPid -ErrorAction Stop |
    Select-Object Id, ProcessName, StartTime, CPU, WorkingSet64, PrivateMemorySize64 |
    Format-List
```

- Thao tác giao diện: giữ Task Manager đúng PID trong frame, đọc CPU/Memory cuối; đưa Terminal A lên để cho thấy backend còn sống hoặc log crash.
- Kỳ vọng: video ghi được trạng thái cuối của cùng backend PID.
- Nếu backend crash: nói rõ “backend crash”, giữ stack trace và mọi artifact.

### 12. Dừng screen recorder

- Lệnh thực thi: không có lệnh PowerShell. Bấm `Stop recording` sau final backend frame, đặt tên/lưu video vào vị trí User biết rõ rồi mở thử file.
- Kỳ vọng: video mở lại được, có Terminal B + Task Manager cùng frame xuyên suốt các milestone.
- Nếu video hỏng/thiếu same-frame: không ghép với run khác. Báo Agent; rerun nếu được yêu cầu phải dùng run folder/artifact mới.

### 13. Generate HTML sau measured interval

- Thao tác: sau khi monitor và recorder đã dừng, dán nguyên khối trong Terminal B:

```powershell
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\result.jtl"
$htmlDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\html-report"
$htmlGenerationLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\html-generation.log"

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL is missing or empty" }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty before generation" }
if (Test-Path -LiteralPath $htmlGenerationLog) { throw "HTML generation log already exists" }

$htmlStartTime = Get-Date
& $jmeter -g $jtl -o $htmlDir -j $htmlGenerationLog
$htmlExitCode = $LASTEXITCODE
$htmlEndTime = Get-Date

"HTML start: $($htmlStartTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML end: $($htmlEndTime.ToString('yyyy-MM-dd HH:mm:ss zzz'))"
"HTML exit code: $htmlExitCode"
if ($htmlExitCode -ne 0) { throw "HTML generation failed with exit code $htmlExitCode" }
```
- Kỳ vọng: exit code 0 và `html-report/index.html` tồn tại.
- Nếu thất bại: giữ JTL/log gốc, không xóa; báo lỗi generate HTML. Chỉ retry khi `html-report` còn rỗng, nếu đã có output dở thì hỏi Agent thay vì overwrite.

### 14. Verify artifact

- Thao tác: dán nguyên khối:

```powershell
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed"
$requiredArtifacts = @(
    (Join-Path $runDir "result.jtl"),
    (Join-Path $runDir "jmeter.log"),
    (Join-Path $runDir "jmeter-console.log"),
    (Join-Path $runDir "backend-resource.csv"),
    (Join-Path $runDir "backend-pid.txt"),
    (Join-Path $runDir "account-provisioning.txt"),
    (Join-Path $runDir "html-report\index.html")
)

$artifactCheck = $requiredArtifacts | ForEach-Object {
    $exists = Test-Path -LiteralPath $_ -PathType Leaf
    [pscustomobject]@{
        Status = if ($exists) { "PRESENT" } else { "MISSING" }
        Bytes = if ($exists) { (Get-Item -LiteralPath $_).Length } else { 0 }
        Path = $_
    }
}
$artifactCheck | Format-Table -AutoSize -Wrap

$missing = @($artifactCheck | Where-Object { $_.Status -eq "MISSING" -or $_.Bytes -eq 0 })
if ($missing.Count -ne 0) {
    $missing | Format-Table -AutoSize -Wrap
    throw "Missing or empty required artifacts: $($missing.Count)"
}
"ARTIFACT_VERIFICATION_OK"
```
- Kỳ vọng: mọi dòng `PRESENT`, Bytes lớn hơn 0 và `ARTIFACT_VERIFICATION_OK`; không có `MISSING`.
- Nếu thất bại: ghi đúng path/Bytes bị thiếu, không fabricate, không copy artifact từ run khác.

### 15. Điền user-execution-note.md

- Lệnh mở note bằng Notepad:

```powershell
notepad.exe "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed\user-execution-note.md"
```

- Thao tác: thay mọi dòng `Chưa chạy` bằng thời gian, exit code, PID, provisioning count, video path và quan sát thật; lưu file.
- Kỳ vọng: note đầy đủ, `Executor: User`, khớp cùng run/PID/artifact.
- Nếu thiếu thông tin: để `Không xác định — lý do thật`; không đoán metric hoặc anomaly.

## C. Chỉ số theo dõi tại từng mốc

| Mốc thời gian | VU/Active kỳ vọng | Chỉ số console cần đọc | Task Manager cần đọc | Ghi chú/anomaly cần nói to |
| --- | ---: | --- | --- | --- |
| Start / T+0 | 0, bắt đầu tăng; Started bắt đầu > 0 | Active/Started/Finished, rate, Err | CPU %, Memory MiB của đúng PID | Command bắt đầu, PID đúng, có/không lỗi startup |
| Ramp-up ~T+30s | xấp xỉ 10 Active, có dao động do thread startup | `summary +` interval gần nhất; Active/Started/Finished; rate; Err | CPU %, Memory MiB | Nói rõ nếu Active đứng yên, 401/403, timeout hoặc connection refused |
| Target ~T+60s | gần/bằng 20 Active; Started gần/bằng 20 | Cả `summary +` và `summary =` nếu có; rate; Err; Active | CPU %, Memory MiB | Nói rõ có đạt 20 VU hay không và thời điểm thực tế |
| Giữa steady state ~T+240s | quanh 20 Active | rate interval và cumulative, Err, Active/Started/Finished, Avg/Min/Max | CPU %, Memory MiB | Nêu tăng latency/error/resource bất thường; Avg không phải p95 |
| Completion ~T+420s trở đi | Active về 0; Finished 20 | `summary =` cuối, total rate/Err, Active 0, Finished 20, exit code | CPU %, Memory MiB, process còn sống hay không | Nói end time, exit code, early finish/scheduler cutoff/crash nếu có |

`summary +` chỉ là interval báo cáo gần nhất; `summary =` là tích lũy từ đầu. Rate `x/s` là throughput quan sát ở console. `Avg/Min/Max` là response-time summary, tuyệt đối không gọi `Avg` là p95. p95 chỉ được Agent tính/đọc từ raw JTL/HTML sau khi User gửi evidence.

## D. Bất thường cần báo ngay

| Dấu hiệu nhìn thấy | User làm gì |
| --- | --- |
| Mass 401/403 liên tục hoặc lockout | Nói rõ mốc và tỷ lệ Err; thường để run hoàn tất để bảo toàn evidence, sau đó báo Agent. Không retry password. Nếu xuất hiện ở provisioning thì không được bắt đầu measured run. |
| `Connection refused` | Kiểm tra Terminal A/Task Manager bằng mắt, nói mốc; nếu backend vẫn sống thì để run hoàn tất. Nếu backend chết hoàn toàn và JMeter không thể tiếp tục, ghi crash và giữ evidence. |
| Timeout hàng loạt | Đọc rate/Err/Active và CPU/RAM; không tự giảm VU hay đổi timeout giữa run; để hoàn tất nếu process còn chạy. |
| `OutOfMemoryError` | Quay rõ console/Terminal A/Task Manager; coi là nghiêm trọng. Không xóa artifact; nếu backend/JMeter đã dừng hoàn toàn thì kết thúc recording sau final evidence và báo Agent. |
| Backend crash, Terminal A dừng log/process biến mất | Nói “backend crash” và timestamp; không restart trong cùng measured interval. Giữ run để Agent phân loại `INVALID` hoặc `VALID WITH LIMITATION`. |
| Active không đạt 20 sau ramp-up | Đọc Active/Started/Finished và Err; không thêm thread thủ công; để run hoàn tất và báo Agent. |
| Thread kết thúc sớm, Finished tăng trước completion | Nói mốc/giá trị; không rerun vào cùng folder; giữ artifact để kiểm tra CSV exhaustion/assertion/scheduler cutoff. |
| Resource monitor chết hoặc CSV ngừng tăng | Nói rõ trên video; không tạo số thủ công. Để workload hoàn tất nếu backend/JMeter còn chạy, sau đó báo limitation. |

Không tự ý hủy giữa chừng chỉ vì thấy lỗi sample. Ngoại lệ thực tế là backend/JMeter crash hoàn toàn hoặc hệ thống không thể tiếp tục; khi đó giữ mọi evidence và không restart vào cùng run folder.

## E. Checklist trước khi gửi evidence lại cho Agent

- [ ] `result.jtl` tồn tại và không rỗng.
- [ ] `jmeter.log` tồn tại và không rỗng.
- [ ] `jmeter-console.log` được lưu qua `Tee-Object`, có start/end/exit code.
- [ ] `backend-resource.csv` có nhiều row dữ liệu đúng PID, interval 2 giây.
- [ ] `backend-pid.txt` khớp PID thật trong Task Manager/video.
- [ ] `account-provisioning.txt` có 20 created, 0 create failed, 20 login token, 0 login failed, 20 cart rỗng, 20 orders rỗng.
- [ ] `html-report/index.html` tồn tại và không rỗng.
- [ ] Video ghi Terminal B/JMeter và Task Manager đúng PID/CPU/Memory trong cùng frame tại T+0, T+30, T+60, steady và completion.
- [ ] Terminal A xuất hiện ở đầu/cuối video; narration tiếng Việt có student, D1 Load, Executor User, JMX, run folder, base URL, workload và PID.
- [ ] `user-execution-note.md` đã điền thời gian/exit code/PID/video path/anomaly thật.
- [ ] Không có password, token hoặc secret trong video/ảnh/log chia sẻ.
- [ ] Không ghép JTL/log/resource/video của run khác.

Sau đó gửi Agent: exact run folder ở trên, path/link video thật, JMeter exit code thật và ghi chú anomaly. Agent chỉ chuyển sang D1 Evidence Analysis khi nhận đủ same-run evidence.

## Risks / limitations

- Ultimate Thread Group có scheduler cutoff; thread kết thúc sớm phải được kiểm tra từ JTL/log, không suy từ console.
- Sai credential có thể gây lockout 180 giây; provisioning fail thì reset/reprovision, không chạy measured workload.
- Pool chỉ có đúng 20 account Load; thiếu/trùng row làm sai VU/account isolation và phải fail-fast.
- Checkout không clear cart; cart/orders và payload my-orders tăng trong run, có thể ảnh hưởng latency theo thời gian.
- Summary Report/listener và load generator có overhead; raw JTL là nguồn metric, không dùng console Avg làm p95.
- Mọi PID của run cũ không được dùng sau restart; PID measured phải lấy từ `backend-pid.txt` mới.
- Video thiếu same-frame hoặc monitor chết có thể làm run `VALID WITH LIMITATION` hoặc `INVALID`; không thể bù bằng screenshot/run khác.

## Current status

`D1 LOAD RERUN COMMAND READY — PENDING USER EXECUTION`

