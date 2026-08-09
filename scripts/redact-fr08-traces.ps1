param(
    [string[]]$Roots = @(
        'test-results/fr08-phase-d',
        'playwrite-test/FR-08-checkout/playwright-report/data'
    )
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$redactions = @(
    @{
        Name = 'JWT'
        Pattern = 'eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+'
        Replacement = 'REDACTED.JWT.VALUE'
    },
    @{
        Name = 'RuntimeEmail'
        Pattern = 'fr08(?:\.ui)?\.[a-z0-9-]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@eshop\.test'
        Replacement = 'redacted-user@eshop.test'
    },
    @{
        Name = 'RuntimePassword'
        Pattern = 'Tmp-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-Aa1!'
        Replacement = 'REDACTED-RUNTIME-PASSWORD'
    }
)

$textEntryPattern = '\.(trace|network|stacks|txt|json)$'
$zipPaths = @(
    foreach ($root in $Roots) {
        if (Test-Path -LiteralPath $root) {
            Get-ChildItem -LiteralPath $root -Recurse -File -Filter '*.zip' |
                Where-Object { $_.Name -notlike '.redacted-*' } |
                Select-Object -ExpandProperty FullName
        }
    }
) | Sort-Object -Unique

$changedZipCount = 0
$replacementCount = 0

foreach ($zipPath in $zipPaths) {
    $resolvedZipPath = [IO.Path]::GetFullPath($zipPath)
    $zipDirectory = [IO.Path]::GetDirectoryName($resolvedZipPath)
    $temporaryZipPath = Join-Path $zipDirectory ('.redacted-' + [IO.Path]::GetRandomFileName() + '.zip')
    $zipChanged = $false

    $sourceZip = [IO.Compression.ZipFile]::OpenRead($resolvedZipPath)
    $targetStream = [IO.File]::Open(
        $temporaryZipPath,
        [IO.FileMode]::CreateNew,
        [IO.FileAccess]::ReadWrite,
        [IO.FileShare]::None
    )
    $targetZip = [IO.Compression.ZipArchive]::new(
        $targetStream,
        [IO.Compression.ZipArchiveMode]::Create,
        $true
    )

    try {
        foreach ($sourceEntry in $sourceZip.Entries) {
            $targetEntry = $targetZip.CreateEntry(
                $sourceEntry.FullName,
                [IO.Compression.CompressionLevel]::Optimal
            )
            $targetEntry.LastWriteTime = $sourceEntry.LastWriteTime

            if ($sourceEntry.FullName.EndsWith('/')) {
                continue
            }

            $sourceStream = $sourceEntry.Open()
            $memory = [IO.MemoryStream]::new()
            try {
                $sourceStream.CopyTo($memory)
                $entryBytes = $memory.ToArray()
            }
            finally {
                $memory.Dispose()
                $sourceStream.Dispose()
            }

            if ($sourceEntry.FullName -match $textEntryPattern) {
                $originalText = [Text.Encoding]::UTF8.GetString($entryBytes)
                $redactedText = $originalText
                foreach ($redaction in $redactions) {
                    $matches = [regex]::Matches(
                        $redactedText,
                        $redaction.Pattern,
                        [Text.RegularExpressions.RegexOptions]::IgnoreCase
                    )
                    if ($matches.Count -gt 0) {
                        $replacementCount += $matches.Count
                        $redactedText = [regex]::Replace(
                            $redactedText,
                            $redaction.Pattern,
                            $redaction.Replacement,
                            [Text.RegularExpressions.RegexOptions]::IgnoreCase
                        )
                    }
                }
                if ($redactedText -cne $originalText) {
                    $entryBytes = [Text.Encoding]::UTF8.GetBytes($redactedText)
                    $zipChanged = $true
                }
            }

            $targetEntryStream = $targetEntry.Open()
            try {
                $targetEntryStream.Write($entryBytes, 0, $entryBytes.Length)
            }
            finally {
                $targetEntryStream.Dispose()
            }
        }
    }
    finally {
        $targetZip.Dispose()
        $targetStream.Dispose()
        $sourceZip.Dispose()
    }

    if ($zipChanged) {
        Move-Item -LiteralPath $temporaryZipPath -Destination $resolvedZipPath -Force
        $changedZipCount += 1
    }
    else {
        [IO.File]::Delete($temporaryZipPath)
    }
}

Write-Output "Trace ZIP scanned: $($zipPaths.Count)"
Write-Output "Trace ZIP changed: $changedZipCount"
Write-Output "Sensitive values replaced: $replacementCount"
