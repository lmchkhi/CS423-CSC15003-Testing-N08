param(
    [Parameter(Mandatory = $true)]
    [string]$RunDirectory
)

$ErrorActionPreference = "Stop"
$workspace = (Resolve-Path (Join-Path $PSScriptRoot "../../..")).Path
$backend = Join-Path $workspace "src/eshop-sut/backend"
$collection = Join-Path $workspace "tests/api-testing/collections/23127464_FR11_Order_History.postman_collection.json"
$environment = Join-Path $workspace "tests/api-testing/environments/fr-11-local.postman_environment.json"
$data = Join-Path $workspace "tests/api-testing/data/fr-11-run-data.json"
$fixture = Join-Path $workspace "tests/api-testing/scripts/prepare-fr11-fixture.js"
$newman = "C:\Users\DELL\AppData\Roaming\npm\node_modules\newman\bin\newman.js"
$runPath = (Resolve-Path $RunDirectory).Path
$stdout = Join-Path $runPath "sut-live-stdout.log"
$stderr = Join-Path $runPath "sut-live-stderr.log"
$console = Join-Path $runPath "newman-console.txt"
$json = Join-Path $runPath "newman-report.json"
$html = Join-Path $runPath "newman-report.html"
$fixtureLog = Join-Path $runPath "fixture-output.txt"
$commandLog = Join-Path $runPath "newman-command.txt"
$metadataPath = Join-Path $runPath "execution-metadata.json"
$startedAt = Get-Date
$sut = $null
$newmanExit = $null
$ready = $false

try {
    $sut = Start-Process -FilePath node -ArgumentList "server.js" -WorkingDirectory $backend -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru

    foreach ($attempt in 1..30) {
        if ($sut.HasExited) {
            throw "SUT exited before readiness with exit code $($sut.ExitCode)"
        }
        try {
            $health = Invoke-WebRequest -Uri "http://127.0.0.1:3000/api/products" -Method Get -TimeoutSec 2
            if ($health.StatusCode -ge 200 -and $health.StatusCode -lt 500) {
                $ready = $true
                break
            }
        }
        catch {
            Start-Sleep -Milliseconds 500
        }
    }
    if (-not $ready) {
        throw "SUT did not become reachable on http://127.0.0.1:3000"
    }

    & node $fixture 2>&1 | Tee-Object -FilePath $fixtureLog
    $fixtureExit = $LASTEXITCODE
    if ($fixtureExit -ne 0) {
        throw "Fixture preparation failed with exit code $fixtureExit"
    }

    $displayCommand = "node `"$newman`" run `"$collection`" -e `"$environment`" -d `"$data`" --reporters cli,json,htmlextra --reporter-json-export `"$json`" --reporter-htmlextra-export `"$html`""
    Set-Content -LiteralPath $commandLog -Value $displayCommand -Encoding UTF8

    & node $newman run $collection -e $environment -d $data --reporters "cli,json,htmlextra" --reporter-json-export $json --reporter-htmlextra-export $html 2>&1 | Tee-Object -FilePath $console
    $newmanExit = $LASTEXITCODE
}
finally {
    $endedAt = Get-Date
    if ($sut -and -not $sut.HasExited) {
        Stop-Process -Id $sut.Id
        $sut.WaitForExit(5000) | Out-Null
    }

    $metadata = [ordered]@{
        scope = "FR-11"
        host = "http://127.0.0.1:3000"
        working_directory = $workspace
        started_at = $startedAt.ToString("o")
        ended_at = $endedAt.ToString("o")
        sut_pid = if ($sut) { $sut.Id } else { $null }
        sut_ready = $ready
        node_version = (& node --version)
        newman_version = (& node $newman --version)
        newman_exit_code = $newmanExit
        collection = $collection
        environment = $environment
        data = $data
        console = $console
        json_report = $json
        html_report = $html
        header_screenshot = "PENDING HUMAN CAPTURE"
    }
    Set-Content -LiteralPath $metadataPath -Value ($metadata | ConvertTo-Json -Depth 5) -Encoding UTF8
}

if ($null -eq $newmanExit) { exit 2 }
exit $newmanExit
