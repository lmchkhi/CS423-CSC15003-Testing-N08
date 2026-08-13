[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [int]$BackendPid,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath,

    [Parameter(Mandatory = $true)]
    [string]$StopFile,

    [ValidateRange(1, 60)]
    [int]$IntervalSeconds = 2
)

$ErrorActionPreference = "Stop"

$outputParent = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $outputParent -PathType Container)) {
    throw "Output directory does not exist: $outputParent"
}
if (Test-Path -LiteralPath $OutputPath) {
    throw "Resource output already exists; refusing overwrite: $OutputPath"
}
if (Test-Path -LiteralPath $StopFile) {
    throw "Monitor stop file already exists: $StopFile"
}

$logicalProcessors = [Environment]::ProcessorCount
$initialProcess = Get-Process -Id $BackendPid -ErrorAction Stop
if ($initialProcess.ProcessName -ne "node") {
    throw "PID $BackendPid is '$($initialProcess.ProcessName)', expected node"
}

$previousCpuSeconds = $initialProcess.TotalProcessorTime.TotalSeconds
$previousTimestamp = Get-Date
$firstRow = $true

while (-not (Test-Path -LiteralPath $StopFile)) {
    Start-Sleep -Seconds $IntervalSeconds
    $timestamp = Get-Date
    $processAlive = $true
    $processName = "node"
    $cpuPercent = $null
    $workingSetMiB = $null
    $privateMemoryMiB = $null

    try {
        $process = Get-Process -Id $BackendPid -ErrorAction Stop
        $elapsedSeconds = ($timestamp - $previousTimestamp).TotalSeconds
        $currentCpuSeconds = $process.TotalProcessorTime.TotalSeconds
        if ($elapsedSeconds -gt 0) {
            $cpuPercent = [Math]::Round(
                (($currentCpuSeconds - $previousCpuSeconds) / $elapsedSeconds / $logicalProcessors) * 100,
                3
            )
        }
        $workingSetMiB = [Math]::Round($process.WorkingSet64 / 1MB, 3)
        $privateMemoryMiB = [Math]::Round($process.PrivateMemorySize64 / 1MB, 3)
        $processName = $process.ProcessName
        $previousCpuSeconds = $currentCpuSeconds
        $previousTimestamp = $timestamp
    }
    catch {
        $processAlive = $false
    }

    $row = [pscustomobject]@{
        Timestamp = $timestamp.ToString("o")
        BackendPid = $BackendPid
        ProcessName = $processName
        ProcessAlive = $processAlive
        CpuPercentNormalized = $cpuPercent
        WorkingSetMiB = $workingSetMiB
        PrivateMemoryMiB = $privateMemoryMiB
        LogicalProcessors = $logicalProcessors
        IntervalSeconds = $IntervalSeconds
    }

    if ($firstRow) {
        $row | Export-Csv -LiteralPath $OutputPath -NoTypeInformation -Encoding UTF8
        $firstRow = $false
    }
    else {
        $row | Export-Csv -LiteralPath $OutputPath -NoTypeInformation -Encoding UTF8 -Append
    }
}

if ($firstRow) {
    throw "Monitor stopped before any resource sample was written"
}

Write-Output "RESOURCE_MONITOR_STOPPED: $OutputPath"
