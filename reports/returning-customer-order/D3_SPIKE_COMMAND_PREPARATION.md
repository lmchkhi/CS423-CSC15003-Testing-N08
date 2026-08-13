# D3 Spike — Chuẩn bị lệnh User execution

Tài liệu này chỉ chuẩn bị lệnh. Agent **không chạy** JMeter Spike, wrapper hoặc script tạo JTL/kết quả đo.

## Plan đã duyệt và precheck thực tế

- Phase/scenario: `D3 — Spike`; Executor: `User`; sinh viên: `23127464`.
- JMX: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\spike\23127464_Spike_20260813.jmx`.
- Workflow CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv`.
- Provisioning CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv`, pool `Spike`.
- Base URL: `http://127.0.0.1:3000`.
- Workload: 5 VU ramp 5 giây, baseline giữ đến T+60; thêm 45 VU trong 5 giây để đạt 50; giữ peak 60 giây; giảm 45 VU trong 5 giây; recovery 5 VU đến T+185; kết thúc khoảng T+190.
- Think time: 6 Uniform Random Timer, 1–3 giây giữa các business step.
- Listener: đúng một `View Results Tree`; đây là report view đã duyệt nhưng có overhead load-generator. Raw JTL/HTML mới là nguồn metric chính.
- D2 Stress đã được User approve `VALID WITH LIMITATION` lúc `14/08/2026 01:59 +07:00`; D3 preparation đã được authorize.
- JMX SHA-256 `AB01BD4FEBB0FC3D4879590420CECADCFB37EA38DFD1D0D2E60FD9A769CBDFF5`; generator sửa lúc `00:08:59`, JMX sinh sau đó lúc `00:09:07` ngày 14/08/2026.
- Static validation: đúng 1 `ThreadGroup.main_controller`, `LoopController.loops=-1`, 7 HTTP sampler, 14 assertion, 6 timer, 1 View Results Tree; schedule rows `(5,0,5,180,5)` và `(45,60,5,60,5)`.
- Workflow CSV 12.768 byte/150 row; Spike window 50 email unique. Provision CSV 10.090 byte/150 row; Spike 50 unique; overlap Load/Stress/Spike = 0.
- `jmeter.bat`, plugin Ultimate Thread Group, generator, provision/monitor scripts đều tồn tại. Không cần tái sinh JMX.
- Precheck lúc 02:10 không có listener port 3000. Không tạo `backend-pid.txt` giả và không dùng PID D2; User phải restart rồi resolve PID mới/HTTP 200.

## Run folder đã chuẩn bị

- Run folder: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed`.
- `html-report/`: rỗng.
- Chưa có `result.jtl`, `jmeter.log`, `jmeter-console.log`, `backend-resource.csv`, `monitor.stop`, `backend-pid.txt`, `account-provisioning.txt` hoặc HTML result.
- Đã copy đúng cấu trúc `user-execution-note.md`; User tự điền giá trị thật.

## Lệnh chuẩn bị tuần tự

### Terminal A — restart/reset/seed backend

Giữ terminal này mở suốt run:

```powershell
$ErrorActionPreference = "Stop"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed"
$oldPidEvidence = Join-Path $runDir "backend-old-pid.txt"
$node = "C:\Program Files\nodejs\node.exe"
$backendDir = "E:\Testing\CS423-CSC15003-Testing-N08\src\eshop-sut\backend"
if (-not (Test-Path -LiteralPath $node -PathType Leaf)) { throw "Missing node.exe: $node" }
if (-not (Test-Path -LiteralPath (Join-Path $backendDir "server.js") -PathType Leaf)) { throw "Missing server.js" }
if (Test-Path -LiteralPath $oldPidEvidence) { throw "backend-old-pid.txt exists; refusing overwrite" }
$listeners = @(Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue)
$oldPids = @($listeners.OwningProcess | Sort-Object -Unique)
if ($oldPids.Count -gt 1) { throw "Multiple listeners on port 3000: $($oldPids -join ', ')" }
if ($oldPids.Count -eq 1) {
    $oldProcess = Get-Process -Id $oldPids[0] -ErrorAction Stop
    if ($oldProcess.ProcessName -ne "node") { throw "Port 3000 is not owned by node.exe" }
    "Old backend PID: $($oldPids[0])" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
    Stop-Process -Id $oldPids[0]
    while (Get-Process -Id $oldPids[0] -ErrorAction SilentlyContinue) { Start-Sleep -Milliseconds 250 }
} else {
    "Old backend PID: NONE" | Set-Content -LiteralPath $oldPidEvidence -Encoding UTF8
}
Set-Location $backendDir
& $node ".\server.js"
```

Chỉ tiếp tục khi có `Connected to database`, `Database initialized and seeded (Phase 2).` và `Server is running on http://localhost:3000`. Startup này reset DB/cart có chủ đích, ngoài measured interval.

### Terminal B — resolve path, PID mới và HTTP 200

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$baseUrl = "http://127.0.0.1:3000"
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$plugin = "D:\apache-jmeter-5.6.3\lib\ext\jmeter-plugins-casutg-3.1.1.jar"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\spike\23127464_Spike_20260813.jmx"
$dataFile = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$generator = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\generate-phase-c-jmx.js"
$monitorScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\monitor-backend-resource.ps1"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed"
$htmlDir = Join-Path $runDir "html-report"
$jtl = Join-Path $runDir "result.jtl"
$jmeterLog = Join-Path $runDir "jmeter.log"
$consoleLog = Join-Path $runDir "jmeter-console.log"
$resourceOutput = Join-Path $runDir "backend-resource.csv"
$stopFile = Join-Path $runDir "monitor.stop"
$pidEvidence = Join-Path $runDir "backend-pid.txt"
$provisionEvidence = Join-Path $runDir "account-provisioning.txt"
$timingEvidence = Join-Path $runDir "jmeter-timing.csv"
$htmlGenerationLog = Join-Path $runDir "html-generation.log"
foreach ($path in @($jmeter,$plugin,$jmx,$dataFile,$provisionCsv,$generator,$monitorScript,$provisionScript)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing required input: $path" }
}
foreach ($csv in @($dataFile,$provisionCsv)) { if ((Get-Item -LiteralPath $csv).Length -eq 0) { throw "CSV empty: $csv" } }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $jmx).Hash -ne "AB01BD4FEBB0FC3D4879590420CECADCFB37EA38DFD1D0D2E60FD9A769CBDFF5") { throw "Approved Spike JMX changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $dataFile).Hash -ne "00F1C7BA5EBDF68E14B078C2E3A881A927FD81736B685AC62886CCA941A1AD3D") { throw "Workflow CSV changed" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $provisionCsv).Hash -ne "1185D10BE10DC755E99E176F6BEDC24BF89FA4540A1A5DDDE72986451940EC7D") { throw "Provision CSV changed" }
[xml]$jmxXml = Get-Content -Raw -Encoding UTF8 -LiteralPath $jmx
$main = @($jmxXml.SelectNodes("//elementProp[@name='ThreadGroup.main_controller' and @elementType='LoopController']"))
$loops = @($jmxXml.SelectNodes("//elementProp[@name='ThreadGroup.main_controller']/intProp[@name='LoopController.loops']"))
if ($main.Count -ne 1 -or $loops.Count -ne 1 -or $loops[0].InnerText -ne "-1") { throw "main_controller/loops correction missing" }
if (@($jmxXml.SelectNodes("//HTTPSamplerProxy")).Count -ne 7) { throw "Expected 7 samplers" }
if (@($jmxXml.SelectNodes("//*[self::ResponseAssertion or self::JSR223Assertion]")).Count -ne 14) { throw "Expected 14 assertions" }
if (@($jmxXml.SelectNodes("//UniformRandomTimer")).Count -ne 6) { throw "Expected 6 timers" }
$spikeFlow = @(Import-Csv -LiteralPath $dataFile | Where-Object { $_.email -like "rco.spike.*@perf.test" })
$spikeProvision = @(Import-Csv -LiteralPath $provisionCsv | Where-Object { $_.scenario -eq "Spike" })
if ($spikeFlow.Count -ne 50 -or @($spikeFlow.email | Sort-Object -Unique).Count -ne 50) { throw "Workflow Spike pool invalid" }
if ($spikeProvision.Count -ne 50 -or @($spikeProvision.email | Sort-Object -Unique).Count -ne 50) { throw "Provision Spike pool invalid" }
if (@((Import-Csv -LiteralPath $provisionCsv) | Group-Object email | Where-Object Count -gt 1).Count -ne 0) { throw "Cross-pool account reuse" }
$listeners = @(Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue)
$backendPids = @($listeners.OwningProcess | Sort-Object -Unique)
if ($backendPids.Count -ne 1) { throw "Expected exactly one listener PID on port 3000, found $($backendPids.Count)" }
$backendPid = [int]$backendPids[0]
$backendProcess = Get-Process -Id $backendPid -ErrorAction Stop
if ($backendProcess.ProcessName -ne "node") { throw "PID $backendPid is not node.exe" }
$response = Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/api/products" -TimeoutSec 5
if ($response.StatusCode -ne 200 -or @(($response.Content | ConvertFrom-Json)).Count -eq 0) { throw "Backend/products check failed" }
if (Test-Path -LiteralPath $pidEvidence) { throw "backend-pid.txt exists; refusing overwrite" }
@("Timestamp: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))","Backend PID: $backendPid","Process: node.exe","Start: $($backendProcess.StartTime.ToString('o'))","HTTP: 200","URL: $baseUrl/api/products") | Set-Content -LiteralPath $pidEvidence -Encoding UTF8
"INPUT_PID_HTTP_PRECHECK_OK BACKEND_PID=$backendPid"
```

### Terminal B — provision 50 account Spike ngoài measured interval

```powershell
$ErrorActionPreference = "Stop"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$provisionEvidence = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed\account-provisioning.txt"
$baseUrl = "http://127.0.0.1:3000"
if (Test-Path -LiteralPath $provisionEvidence) { throw "Provision evidence exists; refusing overwrite" }
$provisionArgs = @{ CsvPath=$provisionCsv; EvidencePath=$provisionEvidence; BaseUrl=$baseUrl; Scenario="Spike"; ExpectedCount=50 }
& $provisionScript @provisionArgs
Get-Content -LiteralPath $provisionEvidence
```

Gate thành công bắt buộc: `Created: 50`, `Create failed: 0`, `Unique email: 50`, `Login with non-empty token: 50`, `Login failed: 0`, `Empty cart verified: 50`, `Empty order history verified: 50`, `PROVISIONING_OK`. Cấu trúc splatting và call operator `&` giữ correction D2.

## Resource monitor — gate cứng chống lặp lỗi D2

### Start và chờ ít nhất 3 sample

```powershell
foreach ($target in @($resourceOutput,$stopFile)) { if (Test-Path -LiteralPath $target) { throw "Monitor target exists: $target" } }
$monitor = Start-Process powershell.exe -ArgumentList @("-NoProfile","-ExecutionPolicy","Bypass","-File",$monitorScript,"-BackendPid",$backendPid,"-OutputPath",$resourceOutput,"-StopFile",$stopFile,"-IntervalSeconds","2") -WindowStyle Hidden -PassThru
$gateDeadline = (Get-Date).AddSeconds(15)
$resourceRows = @()
do {
    Start-Sleep -Seconds 1
    if ($monitor.HasExited) { throw "Resource monitor exited before gate" }
    if (Test-Path -LiteralPath $resourceOutput) { try { $resourceRows = @(Import-Csv -LiteralPath $resourceOutput) } catch { $resourceRows = @() } }
} while ($resourceRows.Count -lt 3 -and (Get-Date) -lt $gateDeadline)
if ($resourceRows.Count -lt 3) { throw "MONITOR_GATE_FAILED: fewer than 3 samples; do not run JMeter" }
$gateNow = Get-Date
$gateLast = [datetimeoffset]::Parse($resourceRows[-1].Timestamp)
$gateAgeSeconds = [Math]::Abs(([datetimeoffset]$gateNow - $gateLast).TotalSeconds)
if ($gateAgeSeconds -gt 5) { throw "MONITOR_GATE_FAILED: last sample is $gateAgeSeconds seconds from now" }
"MONITOR_GATE_OK SAMPLES=$($resourceRows.Count) LAST=$($gateLast.ToString('o')) AGE_SECONDS=$([Math]::Round($gateAgeSeconds,3))"
```

Không được đảo thứ tự: `monitor start → ≥3 sample + fresh ≤5s → recorder → JMeter`.

**DỪNG TẠI ĐÂY sau khi thấy `MONITOR_GATE_OK`. Không chạy lệnh Stop monitor. Bước kế tiếp bắt buộc là measured command ngay bên dưới.**

Nếu timestamp gate >5 giây, JMeter chưa được gọi: sửa monitor/PID, xác nhận lại ≥3 sample rồi dùng folder mới nếu đã tạo output xung đột.

## Exact measured command User cần chạy

Agent không chạy khối này. Không có `-e -o`.

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\spike\23127464_Spike_20260813.jmx"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed"
$jtl = Join-Path $runDir "result.jtl"
$jmeterLog = Join-Path $runDir "jmeter.log"
$consoleLog = Join-Path $runDir "jmeter-console.log"
$resourceOutput = Join-Path $runDir "backend-resource.csv"
$timingEvidence = Join-Path $runDir "jmeter-timing.csv"
$baseUrl = "http://127.0.0.1:3000"
foreach ($target in @($jtl,$jmeterLog,$consoleLog,$timingEvidence)) { if (Test-Path -LiteralPath $target) { throw "Refusing overwrite: $target" } }
if (-not $monitor -or $monitor.HasExited) { throw "Resource monitor is not running" }
$preStartRows = @(Import-Csv -LiteralPath $resourceOutput)
if ($preStartRows.Count -lt 3) { throw "Need at least 3 monitor samples before JMeter" }
$postRunGuardOk = $false
$startTime = Get-Date
$lastResourceTimestamp = [datetimeoffset]::Parse($preStartRows[-1].Timestamp)
$monitorSkewSeconds = [Math]::Abs(([datetimeoffset]$startTime - $lastResourceTimestamp).TotalSeconds)
"Start time: $($startTime.ToString('o'))" | Tee-Object -FilePath $consoleLog
"Monitor last sample: $($lastResourceTimestamp.ToString('o'))" | Tee-Object -FilePath $consoleLog -Append
"Monitor/start difference seconds: $([Math]::Round($monitorSkewSeconds,3))" | Tee-Object -FilePath $consoleLog -Append
if ($monitorSkewSeconds -gt 5) { throw "MONITOR_START_ALIGNMENT_FAILED: difference $monitorSkewSeconds seconds; JMeter was NOT started" }
& $jmeter -n -t $jmx "-JbaseUrl=$baseUrl" -l $jtl -j $jmeterLog 2>&1 | Tee-Object -FilePath $consoleLog -Append
$jmeterExitCode = $LASTEXITCODE
$endTime = Get-Date
@("End time: $($endTime.ToString('o'))","JMeter exit code: $jmeterExitCode") | Tee-Object -FilePath $consoleLog -Append
if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL missing or empty" }
$sampleCount = @(Import-Csv -LiteralPath $jtl).Count
if ($sampleCount -le 0) { throw "JMeter produced zero samples" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Property ThreadGroup.main_controller is unset" -Quiet) { throw "Fatal main_controller error in jmeter.log" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Test failed!" -Quiet) { throw "jmeter.log contains Test failed!" }
if ($jmeterExitCode -ne 0) { throw "JMeter exit code $jmeterExitCode" }
$postRunGuardOk = $true
[pscustomobject]@{ StartTime=$startTime.ToString('o'); EndTime=$endTime.ToString('o'); ExitCode=$jmeterExitCode; Guard='POST_RUN_GUARD_OK'; Samples=$sampleCount } | Export-Csv -LiteralPath $timingEvidence -NoTypeInformation -Encoding UTF8
"POST_RUN_GUARD_OK SAMPLES=$sampleCount" | Tee-Object -FilePath $consoleLog -Append
```

## Stop resource monitor — chỉ sau measured command

Chỉ chạy khối này khi measured command phía trên đã in cả `JMeter exit code: 0` và `POST_RUN_GUARD_OK`:

```powershell
if ($jmeterExitCode -ne 0 -or -not $postRunGuardOk) { throw "STOP_BLOCKED: require JMeter exit code 0 and POST_RUN_GUARD_OK" }
$coverageDeadline = (Get-Date).AddSeconds(8)
do {
    $lastRowBeforeStop = @(Import-Csv -LiteralPath $resourceOutput | Select-Object -Last 1)
    if ($lastRowBeforeStop.Count -eq 1 -and [datetimeoffset]::Parse($lastRowBeforeStop[0].Timestamp) -ge [datetimeoffset]$endTime) { break }
    Start-Sleep -Seconds 1
} while ((Get-Date) -lt $coverageDeadline)
if ($lastRowBeforeStop.Count -ne 1 -or [datetimeoffset]::Parse($lastRowBeforeStop[0].Timestamp) -lt [datetimeoffset]$endTime) { throw "STOP_BLOCKED: resource tail has not covered JMeter end time" }
if (Test-Path -LiteralPath $stopFile) { throw "Stop file already exists" }
New-Item -ItemType File -Path $stopFile | Out-Null
Wait-Process -Id $monitor.Id
if (-not (Test-Path -LiteralPath $resourceOutput) -or (Get-Item -LiteralPath $resourceOutput).Length -eq 0) { throw "Resource output missing/empty" }
"RESOURCE_MONITOR_STOPPED_AFTER_GUARD"
```

Nếu JMeter đã kết thúc nhưng guard thất bại, giữ monitor/evidence và báo Agent; không chạy normal stop như thể run hợp lệ.

## HTML generation sau measured interval

```powershell
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed\result.jtl"
$htmlDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed\html-report"
$htmlLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed\html-generation.log"
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL missing/empty" }
& $jmeter -g $jtl -o $htmlDir -j $htmlLog
$htmlExitCode = $LASTEXITCODE
"HTML exit code: $htmlExitCode"
if ($htmlExitCode -ne 0) { throw "HTML generation failed" }
```

## Post-run artifact verification và coverage

```powershell
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed"
$required = @("result.jtl","jmeter.log","jmeter-console.log","backend-resource.csv","backend-pid.txt","account-provisioning.txt","jmeter-timing.csv","html-report\index.html") | ForEach-Object { Join-Path $runDir $_ }
$checks = @($required | ForEach-Object { $exists=Test-Path -LiteralPath $_ -PathType Leaf; [pscustomobject]@{Status=if($exists){'PRESENT'}else{'MISSING'};Bytes=if($exists){(Get-Item -LiteralPath $_).Length}else{0};Path=$_} })
$checks | Format-Table -AutoSize -Wrap
$missing = @($checks | Where-Object { $_.Status -eq 'MISSING' -or $_.Bytes -le 0 })
if ($missing.Count -gt 0) { throw "Missing/empty artifacts: $($missing.Count); do not fabricate" }
$timing = Import-Csv -LiteralPath (Join-Path $runDir "jmeter-timing.csv")
$resource = @(Import-Csv -LiteralPath (Join-Path $runDir "backend-resource.csv"))
$start = [datetimeoffset]::Parse($timing.StartTime); $end = [datetimeoffset]::Parse($timing.EndTime)
$first = [datetimeoffset]::Parse($resource[0].Timestamp); $last = [datetimeoffset]::Parse($resource[-1].Timestamp)
$durationSeconds = ($end-$start).TotalSeconds
$expectedMinRows = [Math]::Floor($durationSeconds/2)
$coverageOk = ($first -le $start -and $last -ge $end -and $resource.Count -ge $expectedMinRows)
[pscustomobject]@{JMeterStart=$start.ToString('o');JMeterEnd=$end.ToString('o');ResourceFirst=$first.ToString('o');ResourceLast=$last.ToString('o');ResourceRows=$resource.Count;ExpectedMinRows=$expectedMinRows;CoverageOk=$coverageOk}|Format-List
if (-not $coverageOk) { Write-Warning "RESOURCE_COVERAGE_LIMITATION: CSV does not fully/densely cover measured interval; record this limitation in user-execution-note and report" } else { "RESOURCE_COVERAGE_OK" }
```

# Hướng dẫn thực thi cho User

## A. Chuẩn bị màn hình trước khi chạy

- Mở `Terminal A — Backend`, chỉ chạy backend và giữ log suốt run.
- Mở `Terminal B — D3 Spike Execution/Control`; frame chính: Terminal B 60–70%, Task Manager 30–40%.
- Task Manager → `Details` → tìm `node.exe`; bật cột PID nếu thiếu (`right-click header → Select columns → PID`), đối chiếu đúng PID vừa resolve trong `backend-pid.txt`; giữ CPU và Memory hiển thị.
- Terminal A xuất hiện đầu/cuối video; trong run giữ JMeter và đúng node PID/CPU/Memory cùng frame.
- Bật Focus Assist/tắt notification; auto-hide taskbar hoặc che thông tin nhạy cảm; không mở CSV/token/password trên hình.

## B. Trình tự thao tác từng bước

1. **Terminal A:** chạy nguyên khối restart/reset/seed. Kỳ vọng ba dòng startup và terminal tiếp tục mở. Lỗi thì dừng, không provision/JMeter.
2. **Terminal B:** chạy nguyên khối resolve path/PID/HTTP. Kỳ vọng `INPUT_PID_HTTP_PRECHECK_OK BACKEND_PID=<số thật>` và HTTP 200. Lỗi thì không đi tiếp; không dùng PID D2.
3. Chạy khối provisioning splatting. Chỉ qua bước sau khi đủ 50/0/50/0, cart/orders 50/50 và `PROVISIONING_OK`; nếu sai, không đo và restart/reprovision trong run folder mới khi cần.
4. Mở Task Manager bằng `taskmgr.exe`, chọn Details/đúng node PID, bố trí 65/35. Nếu PID/layout sai, sửa trước recorder.
5. Chạy khối monitor Start. **Gate cứng:** phải thấy `MONITOR_GATE_OK`, ít nhất 3 sample, age ≤5 giây. Nếu fail, tuyệt đối không chạy JMeter.
6. Bắt đầu recorder. Đọc: “Tôi là sinh viên 23127464. Đây là D3 Spike, Executor: User. JMX là 23127464_Spike_20260813.jmx. Run folder là 20260814-021040-user-executed. Base URL là http://127.0.0.1:3000. Workload baseline 5 VU, spike đột ngột lên 50 VU, rồi recovery về 5 VU. Backend PID là [đọc số thật trên màn hình].”
7. Dán nguyên văn lệnh đo dưới đây. Ngay sau `$startTime`, lệnh tự đọc tail CSV/in chênh lệch; >5 giây sẽ throw trước `jmeter.bat`.

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\spike\23127464_Spike_20260813.jmx"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed"
$jtl = Join-Path $runDir "result.jtl"
$jmeterLog = Join-Path $runDir "jmeter.log"
$consoleLog = Join-Path $runDir "jmeter-console.log"
$resourceOutput = Join-Path $runDir "backend-resource.csv"
$timingEvidence = Join-Path $runDir "jmeter-timing.csv"
$baseUrl = "http://127.0.0.1:3000"
foreach ($target in @($jtl,$jmeterLog,$consoleLog,$timingEvidence)) { if (Test-Path -LiteralPath $target) { throw "Refusing overwrite: $target" } }
if (-not $monitor -or $monitor.HasExited) { throw "Resource monitor is not running" }
$preStartRows = @(Import-Csv -LiteralPath $resourceOutput)
if ($preStartRows.Count -lt 3) { throw "Need at least 3 monitor samples before JMeter" }
$postRunGuardOk = $false
$startTime = Get-Date
$lastResourceTimestamp = [datetimeoffset]::Parse($preStartRows[-1].Timestamp)
$monitorSkewSeconds = [Math]::Abs(([datetimeoffset]$startTime - $lastResourceTimestamp).TotalSeconds)
"Start time: $($startTime.ToString('o'))" | Tee-Object -FilePath $consoleLog
"Monitor last sample: $($lastResourceTimestamp.ToString('o'))" | Tee-Object -FilePath $consoleLog -Append
"Monitor/start difference seconds: $([Math]::Round($monitorSkewSeconds,3))" | Tee-Object -FilePath $consoleLog -Append
if ($monitorSkewSeconds -gt 5) { throw "MONITOR_START_ALIGNMENT_FAILED: difference $monitorSkewSeconds seconds; JMeter was NOT started" }
& $jmeter -n -t $jmx "-JbaseUrl=$baseUrl" -l $jtl -j $jmeterLog 2>&1 | Tee-Object -FilePath $consoleLog -Append
$jmeterExitCode = $LASTEXITCODE
$endTime = Get-Date
@("End time: $($endTime.ToString('o'))","JMeter exit code: $jmeterExitCode") | Tee-Object -FilePath $consoleLog -Append
if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL missing or empty" }
$sampleCount = @(Import-Csv -LiteralPath $jtl).Count
if ($sampleCount -le 0) { throw "JMeter produced zero samples" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Property ThreadGroup.main_controller is unset" -Quiet) { throw "Fatal main_controller error in jmeter.log" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Test failed!" -Quiet) { throw "jmeter.log contains Test failed!" }
if ($jmeterExitCode -ne 0) { throw "JMeter exit code $jmeterExitCode" }
$postRunGuardOk = $true
[pscustomobject]@{ StartTime=$startTime.ToString('o'); EndTime=$endTime.ToString('o'); ExitCode=$jmeterExitCode; Guard='POST_RUN_GUARD_OK'; Samples=$sampleCount } | Export-Csv -LiteralPath $timingEvidence -NoTypeInformation -Encoding UTF8
"POST_RUN_GUARD_OK SAMPLES=$sampleCount" | Tee-Object -FilePath $consoleLog -Append
```

Kỳ vọng JMeter non-GUI chạy, cuối cùng exit 0 và `POST_RUN_GUARD_OK`. Nếu lệnh throw, giữ toàn bộ artifact đã có; không overwrite/rerun cùng folder.
8. Trong run, đọc to mốc bảng C; đặc biệt T+60–65 khi nhảy 5→50: Active/Started/Finished, rate, Err, CPU/RAM và phản ứng trễ. Error spike tức thời có thể là kết quả mong đợi; quan trọng là có phục hồi sau T+130 không.
9. Sau JMeter, xác nhận cuối console có end time, exit code 0 và `POST_RUN_GUARD_OK`. Nếu thiếu, giữ artifact/monitor và báo Agent; không tuyên bố pass.
10. Chỉ khi bước 9 đạt, chạy khối Stop monitor. Khối đợi tail resource ≥ end time rồi mới tạo stop-file/wait flush. Không stop “cho gọn”.
11. Ghi trạng thái cuối: `Get-Process -Id $backendPid -ErrorAction Stop | Select-Object Id,ProcessName,StartTime,CPU,WorkingSet64,PrivateMemorySize64 | Format-List`; quay Task Manager/Terminal A. Nếu crash, quay stack trace và không restart trong cùng run.
12. Dừng recorder sau final frame, lưu/mở thử video. Video hỏng không được ghép với run khác.
13. Chạy nguyên khối HTML generation sau đo. Kỳ vọng exit 0 và `html-report/index.html`.
14. Chạy artifact verification. Không được có `MISSING`; đặc biệt cần `RESOURCE_COVERAGE_OK`. Nếu warning limitation, ghi nguyên văn vào note/report, không bỏ qua hay fabricate.
15. Mở `notepad.exe "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\spike\20260814-021040-user-executed\user-execution-note.md"`; điền thời gian/exit/PID/video/anomaly thật, nhất là tại spike và recovery.

## C. Bảng chỉ số cần theo dõi

| Mốc thời gian | VU kỳ vọng | Console cần đọc | Task Manager đúng PID | Ghi chú/anomaly |
| --- | ---: | --- | --- | --- |
| T+0–5 | 0→5 | Active/Started/Finished, rate `/s`, Err | CPU %, Memory MiB | Ramp baseline; xác nhận đạt 5 |
| T+5–60 baseline ổn định | 5 | `summary +/=`, rate, Err, Avg/Min/Max | CPU %, Memory MiB | Lấy trạng thái nền trước spike |
| T+60–65 spike start — quan trọng nhất | 5→50 | Active tăng nhanh, Started, rate, Err tức thời | CPU spike, Memory MiB | Đọc timestamp; quan sát latency/error/backend phản ứng trễ |
| Khoảng T+95 giữa spike | 50 | Active gần 50, rate, Err, Finished | CPU %, Memory MiB | Timeout/5xx/plateau hoặc thread sớm |
| T+125–130 spike end | 50→5 | Active giảm, Finished tăng, rate/Err | CPU %, Memory MiB | Tải bắt đầu giảm |
| T+130–185 recovery | 5 | Active gần 5, rate, Err | CPU/RAM trở về gần baseline? | Backend có phục hồi hay error/latency còn cao |
| T+185–190/completion | 5→0 | summary cuối, Active 0, Finished 50, exit/guard | Process alive, CPU/RAM cuối | Ghi cutoff/anomaly/final state |

`summary +` là interval gần nhất, `summary =` là tích lũy; `/s` là throughput quan sát; `Avg/Min/Max` không phải p95. Mục tiêu Spike là phản ứng tức thời khi tải nhảy vọt và khả năng phục hồi, khác Stress tìm breaking point tăng dần. Đặc biệt kiểm tra error/latency có tăng vọt trễ ngay sau spike và backend có hồi phục khi về 5 VU.

## D. Bất thường cần báo ngay

| Tình huống | Cách xử lý |
| --- | --- |
| Mass 401/403/lockout | Nếu ở provisioning: không đo. Nếu trong run: đọc timestamp/Err, thường để hết run rồi báo Agent; không retry password. |
| Connection refused/timeout hàng loạt | Quay Terminal A/Task Manager, đọc stage. Nếu backend còn sống, thường để hết run; nếu crash hoàn toàn/máy không an toàn mới kết thúc có kiểm soát. |
| `OutOfMemoryError` | Quay rõ process/log, không xóa artifact; chỉ dừng sớm nếu process chết hoặc máy không thể tiếp tục an toàn. |
| Backend crash | Nói timestamp, không restart trong measured interval; giữ JTL/log/resource/video. |
| Active không đạt 5/50/5 hoặc thread kết thúc sớm | Đọc Active/Started/Finished/Err, không thêm thread; để hết nếu có thể rồi báo limitation. |
| Monitor chết hoặc tail >5 giây | Trước JMeter: lệnh throw và **không chạy**. Trong run: ghi rõ, giữ workload nếu backend/JMeter còn hoạt động và báo limitation. |
| Error tăng đột biến đúng spike | Không tự hủy: đây có thể là kết quả dự kiến. Quan sát xem error/latency/CPU có tự giảm ở recovery. Chỉ đáng lo nghiêm trọng nếu không phục hồi sau khi về 5 VU. |

Thông thường vẫn để run hoàn tất để Agent phân loại `VALID WITH LIMITATION` hay `INVALID`; không tự hủy giữa chừng trừ crash hoàn toàn hoặc vấn đề an toàn máy.

## E. Checklist trước khi gửi evidence

- [ ] `result.jtl` không rỗng, Import-Csv sample >0.
- [ ] `jmeter.log` tồn tại, không có main-controller unset/`Test failed!`.
- [ ] `jmeter-console.log` được Tee-Object, có start/end/exit 0/`POST_RUN_GUARD_OK`.
- [ ] `backend-resource.csv` có first timestamp ≤ start, last ≥ end, row count đủ interval 2 giây; `RESOURCE_COVERAGE_OK`, không lặp lỗi D2.
- [ ] `backend-pid.txt` khớp PID thật Task Manager/video.
- [ ] `account-provisioning.txt` có 50/0/50/0 và cart/orders 50/50.
- [ ] `html-report/index.html` tồn tại và không rỗng.
- [ ] Video có JMeter + Task Manager cùng frame xuyên suốt, đặc biệt đúng T+60–65 spike và recovery.
- [ ] `user-execution-note.md` điền đầy đủ timestamp/exit/video/anomaly thật.
- [ ] Không lộ secret/token/password; không ghép artifact từ run khác.

## Risks / limitations

- Ultimate Thread Group kết thúc khoảng T+190; workflow ở biên có thể bị scheduler cutoff.
- Pool Spike đúng 50; thiếu/trùng/hết pool hoặc lockout làm sai isolation.
- Checkout không clear cart, orders tích lũy; payload/state drift có thể ảnh hưởng latency.
- View Results Tree có overhead trên load generator; không dùng UI listener làm nguồn percentile chính.
- Monitor có thể drift/chết; hai gate 3-sample/≤5s và coverage first≤start/last≥end giúp phát hiện, không tự sửa evidence.
- Backend có thể phản ứng trễ hoặc không phục hồi sau spike; đây là finding cần evidence, không phải lý do làm đẹp run.
- Agent precheck thấy backend đang dừng; PID thật chỉ có sau User restart/resolve/HTTP 200.

## Current status

`D3 SPIKE COMMAND READY — PENDING USER EXECUTION`
