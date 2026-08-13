# D4 Endurance — Chuẩn bị lệnh User execution

Tài liệu này chỉ chuẩn bị lệnh. Agent **không chạy** JMeter Endurance, wrapper hoặc script tạo JTL/kết quả đo.

## Plan đã duyệt và precheck thực tế

- Phase/scenario: `D4 — Endurance`; Executor: `User`; sinh viên: `23127464`.
- JMX: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\endurance\23127464_Endurance_20260814.jmx`.
- Workflow CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv`.
- Provisioning CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv`, pool `Endurance`.
- Base URL: `http://127.0.0.1:3000`.
- Workload: 20 VU, ramp-up 30 giây, sustained 1770 giây, tổng 1800 giây (30 phút).
- Think time: 6 Uniform Random Timer, 1–3 giây giữa các business step.
- Listener: đúng một `Response Time Graph`; không trùng Load/Stress/Spike. Raw JTL/HTML là nguồn metric chính.
- D3 Spike đã được User approve `VALID WITH LIMITATION` lúc `14/08/2026 02:39 +07:00`; D4 preparation đã được authorize.
- JMX SHA-256 `16E92DE61486600CBCFC5B2C580B5EF3A51A309774FF4E16AD19128E88120674`.
- Static validation: đúng 1 `ThreadGroup.main_controller`, `LoopController.loops=-1`, 7 HTTP sampler, 14 assertion, 6 timer, 1 Response Time Graph; schedule `(20, 0, 30, 1770, 0)`.
- Workflow CSV 170 row tổng (Load 20, Stress 80, Spike 50, Endurance 20); Endurance window 20 email unique offset 150. Provisioning CSV 170 row tổng; Endurance 20 unique; overlap giữa 4 pool = 0.
- `jmeter.bat`, plugin Ultimate Thread Group, generator, provision/monitor scripts đều tồn tại.
- Precheck lúc 02:46 không có listener port 3000. Không tạo `backend-pid.txt` giả và không dùng PID D3; User phải restart rồi resolve PID mới/HTTP 200.
- Monitor interval: **5 giây** (thay vì 2 giây của D1–D3) do thời lượng dài 30 phút; vẫn tạo ~360 data point đủ cho time-bucket analysis.

## Run folder đã chuẩn bị

- Run folder: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed`.
- `html-report/`: rỗng.
- Chưa có `result.jtl`, `jmeter.log`, `jmeter-console.log`, `backend-resource.csv`, `monitor.stop`, `backend-pid.txt`, `account-provisioning.txt` hoặc HTML result.
- Đã copy đúng cấu trúc `user-execution-note.md`; User tự điền giá trị thật.

## Lệnh chuẩn bị tuần tự

### Terminal A — restart/reset/seed backend

Giữ terminal này mở suốt run (đặc biệt quan trọng vì run kéo dài 30 phút):

```powershell
$ErrorActionPreference = "Stop"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed"
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
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\endurance\23127464_Endurance_20260814.jmx"
$dataFile = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$monitorScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\monitor-backend-resource.ps1"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed"
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
foreach ($path in @($jmeter,$plugin,$jmx,$dataFile,$provisionCsv,$monitorScript,$provisionScript)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing required input: $path" }
}
foreach ($csv in @($dataFile,$provisionCsv)) { if ((Get-Item -LiteralPath $csv).Length -eq 0) { throw "CSV empty: $csv" } }
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if ((Get-FileHash -Algorithm SHA256 -LiteralPath $jmx).Hash -ne "16E92DE61486600CBCFC5B2C580B5EF3A51A309774FF4E16AD19128E88120674") { throw "Approved Endurance JMX changed" }
[xml]$jmxXml = Get-Content -Raw -Encoding UTF8 -LiteralPath $jmx
$main = @($jmxXml.SelectNodes("//elementProp[@name='ThreadGroup.main_controller' and @elementType='LoopController']"))
$loops = @($jmxXml.SelectNodes("//elementProp[@name='ThreadGroup.main_controller']/intProp[@name='LoopController.loops']"))
if ($main.Count -ne 1 -or $loops.Count -ne 1 -or $loops[0].InnerText -ne "-1") { throw "main_controller/loops correction missing" }
if (@($jmxXml.SelectNodes("//HTTPSamplerProxy")).Count -ne 7) { throw "Expected 7 samplers" }
if (@($jmxXml.SelectNodes("//*[self::ResponseAssertion or self::JSR223Assertion]")).Count -ne 14) { throw "Expected 14 assertions" }
if (@($jmxXml.SelectNodes("//UniformRandomTimer")).Count -ne 6) { throw "Expected 6 timers" }
$enduranceFlow = @(Import-Csv -LiteralPath $dataFile | Where-Object { $_.email -like "rco.endurance.*@perf.test" })
$enduranceProvision = @(Import-Csv -LiteralPath $provisionCsv | Where-Object { $_.scenario -eq "Endurance" })
if ($enduranceFlow.Count -ne 20 -or @($enduranceFlow.email | Sort-Object -Unique).Count -ne 20) { throw "Workflow Endurance pool invalid" }
if ($enduranceProvision.Count -ne 20 -or @($enduranceProvision.email | Sort-Object -Unique).Count -ne 20) { throw "Provision Endurance pool invalid" }
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

### Terminal B — provision 20 account Endurance ngoài measured interval

```powershell
$ErrorActionPreference = "Stop"
$provisionScript = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\support\provision-load-accounts.ps1"
$provisionCsv = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\account-provisioning.csv"
$provisionEvidence = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed\account-provisioning.txt"
$baseUrl = "http://127.0.0.1:3000"
if (Test-Path -LiteralPath $provisionEvidence) { throw "Provision evidence exists; refusing overwrite" }
$provisionArgs = @{ CsvPath=$provisionCsv; EvidencePath=$provisionEvidence; BaseUrl=$baseUrl; Scenario="Endurance"; ExpectedCount=20 }
& $provisionScript @provisionArgs
Get-Content -LiteralPath $provisionEvidence
```

Gate thành công bắt buộc: `Created: 20`, `Create failed: 0`, `Unique email: 20`, `Login with non-empty token: 20`, `Login failed: 0`, `Empty cart verified: 20`, `Empty order history verified: 20`, `PROVISIONING_OK`.

## Resource monitor — gate cứng chống lặp lỗi D2

### Start và chờ ít nhất 3 sample (interval 5 giây)

```powershell
foreach ($target in @($resourceOutput,$stopFile)) { if (Test-Path -LiteralPath $target) { throw "Monitor target exists: $target" } }
$monitor = Start-Process powershell.exe -ArgumentList @("-NoProfile","-ExecutionPolicy","Bypass","-File",$monitorScript,"-BackendPid",$backendPid,"-OutputPath",$resourceOutput,"-StopFile",$stopFile,"-IntervalSeconds","5") -WindowStyle Hidden -PassThru
$gateDeadline = (Get-Date).AddSeconds(25)
$resourceRows = @()
do {
    Start-Sleep -Seconds 2
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

## Exact measured command User cần chạy

Agent không chạy khối này. Không có `-e -o`. Vì Endurance chạy 30 phút, hệ thống sẽ ghi heartbeat vào console log mỗi 60 giây để xác nhận monitor vẫn sống.

```powershell
$ErrorActionPreference = "Stop"
$repoRoot = "E:\Testing\CS423-CSC15003-Testing-N08"
Set-Location $repoRoot
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jmx = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\endurance\23127464_Endurance_20260814.jmx"
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed"
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

# --- Heartbeat job: kiểm tra monitor vẫn sống mỗi 60 giây ---
$heartbeatJob = Start-Job -ScriptBlock {
    param($resourceCsv, $consoleLogPath)
    $iteration = 0
    while ($true) {
        Start-Sleep -Seconds 60
        $iteration++
        $now = Get-Date
        $msg = "[HEARTBEAT T+$($iteration)m] $($now.ToString('HH:mm:ss'))"
        try {
            $rows = @(Import-Csv -LiteralPath $resourceCsv)
            $last = [datetimeoffset]::Parse($rows[-1].Timestamp)
            $age = [Math]::Round(([datetimeoffset]$now - $last).TotalSeconds, 1)
            $msg += " monitor_rows=$($rows.Count) last_age=${age}s"
            if ($age -gt 15) { $msg += " WARNING:MONITOR_MAY_BE_STALE" }
        } catch {
            $msg += " WARNING:CANNOT_READ_RESOURCE_CSV"
        }
        Add-Content -LiteralPath $consoleLogPath -Value $msg -Encoding UTF8
    }
} -ArgumentList $resourceOutput, $consoleLog

$postRunGuardOk = $false
$startTime = Get-Date
$lastResourceTimestamp = [datetimeoffset]::Parse($preStartRows[-1].Timestamp)
$monitorSkewSeconds = [Math]::Abs(([datetimeoffset]$startTime - $lastResourceTimestamp).TotalSeconds)
"Start time: $($startTime.ToString('o'))" | Tee-Object -FilePath $consoleLog
"Monitor last sample: $($lastResourceTimestamp.ToString('o'))" | Tee-Object -FilePath $consoleLog -Append
"Monitor/start difference seconds: $([Math]::Round($monitorSkewSeconds,3))" | Tee-Object -FilePath $consoleLog -Append
"Expected duration: 1800 seconds (30 minutes)" | Tee-Object -FilePath $consoleLog -Append
if ($monitorSkewSeconds -gt 5) { throw "MONITOR_START_ALIGNMENT_FAILED: difference $monitorSkewSeconds seconds; JMeter was NOT started" }
& $jmeter -n -t $jmx "-JbaseUrl=$baseUrl" -l $jtl -j $jmeterLog 2>&1 | Tee-Object -FilePath $consoleLog -Append
$jmeterExitCode = $LASTEXITCODE
$endTime = Get-Date
@("End time: $($endTime.ToString('o'))","JMeter exit code: $jmeterExitCode","Actual duration seconds: $([Math]::Round(($endTime-$startTime).TotalSeconds,1))") | Tee-Object -FilePath $consoleLog -Append

# --- Dừng heartbeat ---
Stop-Job -Job $heartbeatJob -ErrorAction SilentlyContinue
Remove-Job -Job $heartbeatJob -Force -ErrorAction SilentlyContinue

if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL missing or empty" }
$sampleCount = @(Import-Csv -LiteralPath $jtl).Count
if ($sampleCount -le 0) { throw "JMeter produced zero samples" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Property ThreadGroup.main_controller is unset" -Quiet) { throw "Fatal main_controller error in jmeter.log" }
if (Select-String -LiteralPath $jmeterLog -SimpleMatch "Test failed!" -Quiet) { throw "jmeter.log contains Test failed!" }
if ($jmeterExitCode -ne 0) { throw "JMeter exit code $jmeterExitCode" }
$postRunGuardOk = $true
[pscustomobject]@{ StartTime=$startTime.ToString('o'); EndTime=$endTime.ToString('o'); ExitCode=$jmeterExitCode; Guard='POST_RUN_GUARD_OK'; Samples=$sampleCount; DurationSeconds=[Math]::Round(($endTime-$startTime).TotalSeconds,1) } | Export-Csv -LiteralPath $timingEvidence -NoTypeInformation -Encoding UTF8
"POST_RUN_GUARD_OK SAMPLES=$sampleCount DURATION=$([Math]::Round(($endTime-$startTime).TotalSeconds,1))s" | Tee-Object -FilePath $consoleLog -Append
```

## Stop resource monitor — chỉ sau measured command

Chỉ chạy khối này khi measured command phía trên đã in cả `JMeter exit code: 0` và `POST_RUN_GUARD_OK`:

```powershell
if ($jmeterExitCode -ne 0 -or -not $postRunGuardOk) { throw "STOP_BLOCKED: require JMeter exit code 0 and POST_RUN_GUARD_OK" }
$coverageDeadline = (Get-Date).AddSeconds(15)
do {
    $lastRowBeforeStop = @(Import-Csv -LiteralPath $resourceOutput | Select-Object -Last 1)
    if ($lastRowBeforeStop.Count -eq 1 -and [datetimeoffset]::Parse($lastRowBeforeStop[0].Timestamp) -ge [datetimeoffset]$endTime) { break }
    Start-Sleep -Seconds 2
} while ((Get-Date) -lt $coverageDeadline)
if ($lastRowBeforeStop.Count -ne 1 -or [datetimeoffset]::Parse($lastRowBeforeStop[0].Timestamp) -lt [datetimeoffset]$endTime) { throw "STOP_BLOCKED: resource tail has not covered JMeter end time" }
if (Test-Path -LiteralPath $stopFile) { throw "Stop file already exists" }
New-Item -ItemType File -Path $stopFile | Out-Null
Wait-Process -Id $monitor.Id
if (-not (Test-Path -LiteralPath $resourceOutput) -or (Get-Item -LiteralPath $resourceOutput).Length -eq 0) { throw "Resource output missing/empty" }
"RESOURCE_MONITOR_STOPPED_AFTER_GUARD"
```

## HTML generation sau measured interval

```powershell
$jmeter = "D:\apache-jmeter-5.6.3\bin\jmeter.bat"
$jtl = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed\result.jtl"
$htmlDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed\html-report"
$htmlLog = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed\html-generation.log"
if ((Get-ChildItem -Force -LiteralPath $htmlDir).Count -ne 0) { throw "HTML folder must be empty" }
if (-not (Test-Path -LiteralPath $jtl) -or (Get-Item -LiteralPath $jtl).Length -eq 0) { throw "JTL missing/empty" }
& $jmeter -g $jtl -o $htmlDir -j $htmlLog
$htmlExitCode = $LASTEXITCODE
"HTML exit code: $htmlExitCode"
if ($htmlExitCode -ne 0) { throw "HTML generation failed" }
```

## Post-run artifact verification và coverage (bao gồm kiểm tra mật độ đều đặn)

```powershell
$runDir = "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed"
$required = @("result.jtl","jmeter.log","jmeter-console.log","backend-resource.csv","backend-pid.txt","account-provisioning.txt","jmeter-timing.csv","html-report\index.html") | ForEach-Object { Join-Path $runDir $_ }
$checks = @($required | ForEach-Object { $exists=Test-Path -LiteralPath $_ -PathType Leaf; [pscustomobject]@{Status=if($exists){'PRESENT'}else{'MISSING'};Bytes=if($exists){(Get-Item -LiteralPath $_).Length}else{0};Path=$_} })
$checks | Format-Table -AutoSize -Wrap
$missing = @($checks | Where-Object { $_.Status -eq 'MISSING' -or $_.Bytes -le 0 })
if ($missing.Count -gt 0) { throw "Missing/empty artifacts: $($missing.Count); do not fabricate" }

# --- Kiểm tra coverage toàn bộ duration ---
$timing = Import-Csv -LiteralPath (Join-Path $runDir "jmeter-timing.csv")
$resource = @(Import-Csv -LiteralPath (Join-Path $runDir "backend-resource.csv"))
$start = [datetimeoffset]::Parse($timing.StartTime); $end = [datetimeoffset]::Parse($timing.EndTime)
$first = [datetimeoffset]::Parse($resource[0].Timestamp); $last = [datetimeoffset]::Parse($resource[-1].Timestamp)
$durationSeconds = ($end-$start).TotalSeconds
$expectedMinRows = [Math]::Floor($durationSeconds/5)

# --- Kiểm tra mật độ đều đặn: không có khoảng trống > 15 giây ---
$maxGapSeconds = 0
for ($i = 1; $i -lt $resource.Count; $i++) {
    $prev = [datetimeoffset]::Parse($resource[$i-1].Timestamp)
    $curr = [datetimeoffset]::Parse($resource[$i].Timestamp)
    $gap = ($curr - $prev).TotalSeconds
    if ($gap -gt $maxGapSeconds) { $maxGapSeconds = $gap }
}
$densityOk = ($maxGapSeconds -le 15)
$coverageOk = ($first -le $start -and $last -ge $end -and $resource.Count -ge $expectedMinRows -and $densityOk)
[pscustomobject]@{
    JMeterStart=$start.ToString('o')
    JMeterEnd=$end.ToString('o')
    DurationSeconds=[Math]::Round($durationSeconds,1)
    ResourceFirst=$first.ToString('o')
    ResourceLast=$last.ToString('o')
    ResourceRows=$resource.Count
    ExpectedMinRows=$expectedMinRows
    MaxGapSeconds=[Math]::Round($maxGapSeconds,1)
    DensityOk=$densityOk
    CoverageOk=$coverageOk
} | Format-List
if (-not $coverageOk) {
    if (-not $densityOk) { Write-Warning "RESOURCE_DENSITY_LIMITATION: max gap $([Math]::Round($maxGapSeconds,1))s exceeds 15s; monitor may have stalled mid-run" }
    Write-Warning "RESOURCE_COVERAGE_LIMITATION: CSV does not fully/densely cover measured interval; record this limitation"
} else { "RESOURCE_COVERAGE_OK" }

# --- Heartbeat summary ---
$heartbeats = @(Select-String -LiteralPath (Join-Path $runDir "jmeter-console.log") -Pattern "\[HEARTBEAT" -SimpleMatch)
"Heartbeat entries found: $($heartbeats.Count)"
$staleWarnings = @($heartbeats | Where-Object { $_.Line -match "MONITOR_MAY_BE_STALE" })
if ($staleWarnings.Count -gt 0) { Write-Warning "HEARTBEAT_STALE_WARNINGS: $($staleWarnings.Count) entries; check monitor continuity" }
```

# Hướng dẫn thực thi cho User

## A. Chuẩn bị màn hình trước khi chạy

- Mở `Terminal A — Backend`, chỉ chạy backend và giữ log suốt run.
- Mở `Terminal B — D4 Endurance Execution/Control`; frame chính: Terminal B 60–70%, Task Manager 30–40%.
- Task Manager → `Details` → tìm `node.exe`; bật cột PID nếu thiếu, đối chiếu đúng PID vừa resolve trong `backend-pid.txt`; giữ CPU và Memory hiển thị.
- Terminal A xuất hiện đầu/cuối video; trong run giữ JMeter và đúng node PID/CPU/Memory cùng frame.
- **ĐẶC BIỆT QUAN TRỌNG VÌ RUN DÀI 30 PHÚT:**
  - **Tắt hẳn chế độ Sleep/Hibernate của máy**: Settings → System → Power & battery → Screen and sleep → đặt "Never" cho cả hai mục "Put my device to sleep".
  - **Tắt Screensaver**: Settings → Personalization → Lock screen → Screen saver → chọn "None".
  - **Kiểm tra ổ đĩa**: cần ít nhất 500 MB trống cho JTL/log/resource CSV dài.
  - **Screen recorder**: đảm bảo recorder có thể ghi liên tục > 35 phút (kiểm tra dung lượng đĩa và giới hạn thời lượng recording).
  - Bật Focus Assist/tắt notification; không để máy hibernate/lock giữa chừng.
- Không mở CSV/token/password trên hình.

## B. Trình tự thao tác từng bước

1. **Terminal A:** chạy nguyên khối restart/reset/seed. Kỳ vọng ba dòng startup và terminal tiếp tục mở. Lỗi thì dừng, không provision/JMeter.

   ```powershell
   # (Dán nguyên khối "Terminal A — restart/reset/seed backend" ở mục trên)
   ```

2. **Terminal B:** chạy nguyên khối resolve path/PID/HTTP. Kỳ vọng `INPUT_PID_HTTP_PRECHECK_OK BACKEND_PID=<số thật>` và HTTP 200.

   ```powershell
   # (Dán nguyên khối "Terminal B — resolve path, PID mới và HTTP 200" ở mục trên)
   ```

3. Chạy khối provisioning splatting. Chỉ qua bước sau khi đủ 20/0/20/0, cart/orders 20/20 và `PROVISIONING_OK`.

   ```powershell
   # (Dán nguyên khối "Terminal B — provision 20 account Endurance" ở mục trên)
   ```

4. Mở Task Manager bằng `taskmgr.exe`, chọn Details/đúng node PID, bố trí 65/35. Nếu PID/layout sai, sửa trước recorder.

   *(Không có lệnh — thao tác giao diện)*

5. Chạy khối monitor Start. **Gate cứng:** phải thấy `MONITOR_GATE_OK`, ít nhất 3 sample, age ≤5 giây.

   ```powershell
   # (Dán nguyên khối "Start và chờ ít nhất 3 sample" ở mục trên)
   ```

6. Bắt đầu recorder. Đọc mở đầu bằng tiếng Việt:

   > "Tôi là sinh viên 23127464. Đây là D4 Endurance, Executor: User. JMX là 23127464_Endurance_20260814.jmx. Run folder là 20260814-024700-user-executed. Base URL là http://127.0.0.1:3000. Workload 20 VU sustained trong 30 phút, ramp-up 30 giây. Backend PID là [đọc số thật trên màn hình]. Duration dự kiến 30 phút."

7. Dán nguyên văn khối measured command. Ngay sau `$startTime`, lệnh tự đọc tail CSV/in chênh lệch; >5 giây sẽ throw trước `jmeter.bat`.

   ```powershell
   # (Dán nguyên khối "Exact measured command User cần chạy" ở mục trên)
   ```

   Kỳ vọng JMeter non-GUI chạy ~30 phút. Console sẽ in `summary +/=` mỗi 30 giây. Heartbeat job ghi vào console log mỗi 60 giây.

8. **Trong run — theo dõi định kỳ theo bảng C (bên dưới).** Đặc biệt chú ý:
   - Memory có **tăng dần liên tục** qua các mốc không → dấu hiệu leak.
   - Response time có **chậm dần** dù VU không đổi → dấu hiệu degradation.
   - CPU có **tăng dần** → dấu hiệu backend không stable.
   - Đây là mục tiêu chính của Endurance — phát hiện xu hướng theo thời gian, không chỉ số liệu tức thời.

9. Sau JMeter (~30 phút), xác nhận cuối console có end time, exit code 0, duration ~1800 giây và `POST_RUN_GUARD_OK`. Nếu thiếu, giữ artifact/monitor và báo Agent.

10. Chỉ khi bước 9 đạt, chạy khối Stop monitor.

    ```powershell
    # (Dán nguyên khối "Stop resource monitor" ở mục trên)
    ```

11. Ghi trạng thái cuối backend:

    ```powershell
    Get-Process -Id $backendPid -ErrorAction Stop | Select-Object Id,ProcessName,StartTime,CPU,WorkingSet64,PrivateMemorySize64 | Format-List
    ```

    Quay Task Manager/Terminal A. Nếu crash, quay stack trace và không restart trong cùng run.

12. Dừng recorder sau final frame, lưu/mở thử video. Video phải bao phủ toàn bộ ~30 phút.

13. Chạy nguyên khối HTML generation sau đo. Kỳ vọng exit 0 và `html-report/index.html`.

    ```powershell
    # (Dán nguyên khối "HTML generation" ở mục trên)
    ```

14. Chạy artifact verification. Không được có `MISSING`; cần `RESOURCE_COVERAGE_OK` và không có `HEARTBEAT_STALE_WARNINGS`.

    ```powershell
    # (Dán nguyên khối "Post-run artifact verification" ở mục trên)
    ```

15. Mở và điền execution note:

    ```powershell
    notepad.exe "E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\endurance\20260814-024700-user-executed\user-execution-note.md"
    ```

    Điền thời gian/exit/PID/video/anomaly thật. Đặc biệt ghi rõ memory trend qua các mốc.

## C. Bảng chỉ số cần theo dõi tại từng mốc thời gian

| Mốc thời gian | VU kỳ vọng | Active/Started/Finished | rate .../s, Err | CPU %, Memory MiB | Ghi chú xu hướng |
| --- | ---: | --- | --- | --- | --- |
| T+0 (start) | 0→20 ramp | Ghi Active tăng | Rate ban đầu, Err | CPU %, Memory MiB | PID/frame xác nhận |
| T+30s (ramp hoàn tất) | 20 | Active=20, Started=20 | Rate ổn, Err=0? | CPU %, Memory MiB | Baseline so sánh cho các mốc sau |
| T+2 phút | 20 | Active=20 | Rate ổn, Err | CPU %, Memory MiB | So sánh với T+30s |
| T+5 phút | 20 | Active=20 | Rate, Err | CPU %, Memory MiB | Baseline comparison point |
| T+10 phút | 20 | Active=20 | Rate, Err | CPU %, Memory MiB | Memory tăng so với T+5? |
| T+15 phút | 20 | Active=20 | Rate, Err | CPU %, Memory MiB | Nửa chặng — memory trend rõ chưa? |
| T+30 phút (completion) | 20→0 | Active=0, Finished=20 | Rate cuối, Err | CPU %, Memory MiB | So sánh tổng thể với T+2: memory, CPU, response time |

**Cách đọc xu hướng:**
- **Memory tăng dần liên tục** qua nhiều mốc (T+5→T+10→T+15→T+30): có thể là dấu hiệu memory leak. Nhưng cũng cần xem xét order/cart accumulation trong mỗi VU — đây là confounder đã biết do SUT không clear cart.
- **Response time tăng dần** dù VU không đổi: dấu hiệu degradation, thường do payload/state tăng.
- **CPU tăng dần**: ít phổ biến hơn nhưng có thể xảy ra nếu backend có tích lũy nào đó.
- **Ổn định**: memory/response time/CPU không thay đổi đáng kể qua các mốc → SUT bền vững ở mức tải này.

## D. Danh sách bất thường cần dừng lại và báo ngay

| Tình huống | Cách xử lý |
| --- | --- |
| Mass 401/403/lockout | Nếu ở provisioning: không đo. Nếu trong run: đọc timestamp/Err, thường để hết run rồi báo Agent. |
| Connection refused/timeout hàng loạt | Quay Terminal A/Task Manager. Nếu backend còn sống, để hết run. Nếu crash hoàn toàn mới kết thúc. |
| `OutOfMemoryError` JMeter hoặc backend | Quay rõ process/log. Chỉ dừng sớm nếu process chết hoặc máy không thể tiếp tục an toàn. |
| Backend crash giữa run (Terminal A tắt/báo lỗi) | Nói timestamp, **không restart** trong measured interval; giữ JTL/log/resource/video. Đây là finding quan trọng. |
| Active không đạt 20 hoặc thread kết thúc sớm | Đọc Active/Started/Finished/Err. Không thêm thread; để hết rồi báo limitation. |
| Monitor chết hoặc heartbeat báo `MONITOR_MAY_BE_STALE` | Trước JMeter: lệnh throw và không chạy. Trong run: ghi rõ, giữ workload nếu backend/JMeter còn hoạt động. |
| **Memory tăng liên tục không giảm qua nhiều mốc** | Đây là **finding quan trọng nhất của Endurance** — vẫn nên để chạy hết nếu máy còn ổn định. Ghi chi tiết giá trị memory ở mỗi mốc. **Không phải lỗi cần hủy ngay.** |
| **Response time tăng dần đều dù VU không đổi** | Tương tự memory — đây là degradation finding. Để chạy hết, ghi evidence. |
| Máy sleep/hibernate giữa run | Nếu xảy ra, run bị gián đoạn nghiêm trọng. Ghi timestamp, kiểm tra JTL/resource CSV có khoảng trống. Có thể phải rerun. |
| Screen recorder tự dừng | Ghi timestamp. Run vẫn tiếp tục nhưng video evidence sẽ thiếu phần sau. |

**Nguyên tắc chung cho Endurance:** Trừ khi máy/process crash hoàn toàn hoặc có vấn đề an toàn, luôn để run hoàn tất 30 phút. Memory leak, degradation, tăng latency — tất cả đều là finding cần giữ evidence, không phải lý do hủy run.

## E. Checklist xác nhận trước khi gửi evidence lại cho agent

- [ ] `result.jtl` không rỗng, Import-Csv sample >0.
- [ ] `jmeter.log` tồn tại, không có main-controller unset/`Test failed!`.
- [ ] `jmeter-console.log` được Tee-Object, có start/end/exit 0/`POST_RUN_GUARD_OK`; có heartbeat entries.
- [ ] `backend-resource.csv` có first timestamp ≤ start, last ≥ end, row count đủ interval 5 giây (~360 rows cho 30 phút); `RESOURCE_COVERAGE_OK` và **mật độ đều đặn xuyên suốt** (không có khoảng trống >15 giây do máy sleep/monitor treo).
- [ ] `backend-pid.txt` khớp PID thật Task Manager/video.
- [ ] `account-provisioning.txt` có 20/0/20/0 và cart/orders 20/20.
- [ ] `html-report/index.html` tồn tại và không rỗng.
- [ ] Video bao phủ toàn bộ ~30 phút, có JMeter + Task Manager cùng frame; ghi được các mốc milestone T+0, T+2, T+5, T+10, T+15, T+30.
- [ ] `user-execution-note.md` điền đầy đủ timestamp/exit/video/anomaly thật, bao gồm memory/CPU/response trend qua các mốc.
- [ ] Không lộ secret/token/password; không ghép artifact từ run khác.

## Risks / limitations

- **Duration dài 30 phút** dễ bị gián đoạn: máy sleep, hibernate, ổ đĩa đầy, scheduler cutoff, recorder tự dừng, mất điện.
- **Dung lượng ổ đĩa**: JTL lớn (dự kiến ~500 KB), resource CSV (~20 KB), console log (~100 KB), video (~1–3 GB cho 30 phút recording).
- **Máy sleep/hibernate**: phải tắt trước khi chạy; nếu xảy ra giữa run, resource CSV và JTL sẽ có khoảng trống.
- Pool Endurance đúng 20; thiếu/trùng/hết pool hoặc lockout làm sai isolation.
- Checkout không clear cart, orders tích lũy trong SQLite; mỗi VU chạy ~90 workflow trong 30 phút, tạo ~90 orders. Payload my-orders tăng dần là confounder đã biết — phải tách khi phân tích memory/latency trend.
- Response Time Graph có overhead tối thiểu trên load generator; không dùng UI listener làm nguồn percentile chính.
- Monitor interval 5 giây (thay vì 2 giây) giảm granularity nhưng đủ cho time-bucket analysis.
- Agent precheck thấy backend đang dừng; PID thật chỉ có sau User restart/resolve/HTTP 200.
- Khả năng phát hiện leak phụ thuộc độ dài run; 30 phút là minimum thực tế — leak chậm có thể cần run dài hơn.

## Current status

`D4 ENDURANCE COMMAND READY — PENDING USER EXECUTION`
