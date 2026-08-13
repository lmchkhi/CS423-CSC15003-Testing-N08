[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$CsvPath,

    [Parameter(Mandatory = $true)]
    [string]$EvidencePath,

    [string]$BaseUrl = "http://127.0.0.1:3000",

    [string]$Scenario = "Load",

    [int]$ExpectedCount = 20
)

$ErrorActionPreference = "Stop"

$resolvedCsv = (Resolve-Path -LiteralPath $CsvPath).Path
if ((Get-Item -LiteralPath $resolvedCsv).Length -eq 0) {
    throw "Provisioning CSV is empty: $resolvedCsv"
}

$evidenceParent = Split-Path -Parent $EvidencePath
if (-not (Test-Path -LiteralPath $evidenceParent -PathType Container)) {
    throw "Evidence directory does not exist: $evidenceParent"
}
if (Test-Path -LiteralPath $EvidencePath) {
    throw "Provisioning evidence already exists; refusing overwrite: $EvidencePath"
}

$rows = @(
    Import-Csv -LiteralPath $resolvedCsv |
        Where-Object { $_.scenario -eq $Scenario } |
        Sort-Object { [int]$_.vuIndex }
)

if ($rows.Count -ne $ExpectedCount) {
    throw "Expected $ExpectedCount provisioning rows for $Scenario, found $($rows.Count)"
}

$requiredColumns = @("scenario", "vuIndex", "name", "email", "password")
foreach ($row in $rows) {
    foreach ($column in $requiredColumns) {
        if ([string]::IsNullOrWhiteSpace([string]$row.$column)) {
            throw "Empty required field '$column' in provisioning row VU $($row.vuIndex)"
        }
    }
}

$uniqueEmailCount = @($rows.email | ForEach-Object { $_.ToLowerInvariant() } | Sort-Object -Unique).Count
if ($uniqueEmailCount -ne $ExpectedCount) {
    throw "Provisioning email pool is not unique: $uniqueEmailCount/$ExpectedCount"
}

$created = 0
$createFailed = 0
$loginWithToken = 0
$loginFailed = 0
$emptyCartVerified = 0
$emptyOrdersVerified = 0
$failureDetails = [System.Collections.Generic.List[string]]::new()

foreach ($row in $rows) {
    $registerBody = @{
        name = $row.name
        email = $row.email
        password = $row.password
    } | ConvertTo-Json -Compress

    try {
        $registerResponse = Invoke-WebRequest `
            -UseBasicParsing `
            -Method Post `
            -Uri "$BaseUrl/api/register" `
            -ContentType "application/json" `
            -Body $registerBody `
            -TimeoutSec 10

        $registerJson = $registerResponse.Content | ConvertFrom-Json
        if ($registerResponse.StatusCode -eq 200 -and $registerJson.id) {
            $created++
        }
        else {
            $createFailed++
            $failureDetails.Add("VU $($row.vuIndex): register response invalid")
        }
    }
    catch {
        $createFailed++
        $failureDetails.Add("VU $($row.vuIndex): register failed: $($_.Exception.Message)")
    }

    $loginBody = @{
        email = $row.email
        password = $row.password
    } | ConvertTo-Json -Compress

    $token = $null
    try {
        $loginResponse = Invoke-WebRequest `
            -UseBasicParsing `
            -Method Post `
            -Uri "$BaseUrl/api/login" `
            -ContentType "application/json" `
            -Body $loginBody `
            -TimeoutSec 10

        $loginJson = $loginResponse.Content | ConvertFrom-Json
        $token = [string]$loginJson.token
        if ($loginResponse.StatusCode -ne 200 -or [string]::IsNullOrWhiteSpace($token)) {
            throw "Login did not return a non-empty token"
        }

        $loginWithToken++
    }
    catch {
        $loginFailed++
        $failureDetails.Add("VU $($row.vuIndex): login failed: $($_.Exception.Message)")
    }

    if (-not [string]::IsNullOrWhiteSpace($token)) {
        $headers = @{ Authorization = "Bearer $token" }
        try {
        $cartResponse = Invoke-WebRequest `
            -UseBasicParsing `
            -Method Get `
            -Uri "$BaseUrl/api/cart" `
            -Headers $headers `
            -TimeoutSec 10
        $cartJson = $cartResponse.Content | ConvertFrom-Json
        if ($cartResponse.StatusCode -eq 200 -and @($cartJson).Count -eq 0) {
            $emptyCartVerified++
        }
        else {
            $failureDetails.Add("VU $($row.vuIndex): cart is not empty")
        }
        }
        catch {
            $failureDetails.Add("VU $($row.vuIndex): cart verification failed: $($_.Exception.Message)")
        }

        try {
        $ordersResponse = Invoke-WebRequest `
            -UseBasicParsing `
            -Method Get `
            -Uri "$BaseUrl/api/orders/my-orders" `
            -Headers $headers `
            -TimeoutSec 10
        $ordersJson = $ordersResponse.Content | ConvertFrom-Json
        if ($ordersResponse.StatusCode -eq 200 -and @($ordersJson).Count -eq 0) {
            $emptyOrdersVerified++
        }
        else {
            $failureDetails.Add("VU $($row.vuIndex): order history is not empty")
        }
        }
        catch {
            $failureDetails.Add("VU $($row.vuIndex): order-history verification failed: $($_.Exception.Message)")
        }
    }
}

$evidenceLines = @(
    "Timestamp: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))"
    "Scenario: $Scenario"
    "Base URL: $BaseUrl"
    "CSV: $resolvedCsv"
    "Requested: $ExpectedCount"
    "Created: $created"
    "Create failed: $createFailed"
    "Unique email: $uniqueEmailCount"
    "Login with non-empty token: $loginWithToken"
    "Login failed: $loginFailed"
    "Empty cart verified: $emptyCartVerified"
    "Empty order history verified: $emptyOrdersVerified"
)

if ($failureDetails.Count -gt 0) {
    $evidenceLines += "Failures:"
    $evidenceLines += $failureDetails
}

$evidenceLines | Set-Content -LiteralPath $EvidencePath -Encoding UTF8
$evidenceLines | ForEach-Object { Write-Output $_ }

$success = (
    $created -eq $ExpectedCount -and
    $createFailed -eq 0 -and
    $uniqueEmailCount -eq $ExpectedCount -and
    $loginWithToken -eq $ExpectedCount -and
    $loginFailed -eq 0 -and
    $emptyCartVerified -eq $ExpectedCount -and
    $emptyOrdersVerified -eq $ExpectedCount
)

if (-not $success) {
    throw "Provisioning/state verification failed. Do not start the measured workload."
}

Write-Output "PROVISIONING_OK"
