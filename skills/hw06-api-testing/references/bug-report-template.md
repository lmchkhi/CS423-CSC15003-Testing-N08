# Bug report Markdown template

Use one file per reproducible defect and Vietnamese content. Keep the title convention from the repository.

```markdown
# [BUG][<Module>] <Mô tả triệu chứng cụ thể>

## Found by Test Case
TC-<MODULE>-<NNN>

## Also detected by
- TC-<MODULE>-<NNN>

## Requirement liên quan
<FR/SEC/schema requirement>

## Severity / Priority
<Critical|Major|Minor|Trivial|Block> / <P0|P1|P2|P3>

## Environment
- Base URL: <actual host>
- Endpoint: `<METHOD /path>`
- Commit/build: <sha or build>
- Executed at: <ISO timestamp and timezone>
- Student ID header: <actual ID>

## Steps to reproduce
1. <Minimal, deterministic steps>

## Expected result
<Documented oracle>

## Actual result
<Observed status, headers, body, or state>

## Evidence
- Screenshot: [<file>](<relative-path>)
- Raw response/log: [<file>](<relative-path>)
- Newman report: [<file>](<relative-path>)

## Reproducibility
<N/N attempts and notes>

## Duplicate check
- Query: `<search terms>`
- Result: `No duplicate found` or `Existing issue #<n>`
```

Do not report a defect without real execution evidence. Redact credentials, tokens, cookies, OTP values, and unrelated personal data.
