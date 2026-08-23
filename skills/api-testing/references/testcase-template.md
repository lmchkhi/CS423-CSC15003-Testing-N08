# Testcase Markdown template

Use Vietnamese content. Preserve technical terms where they improve precision.

```markdown
# TC-<MODULE>-<NNN>: <Tiêu đề ngắn>

## Requirement ID
<FR/SEC/schema requirement IDs>

## Module / Test type / Technique
<Module> / <Functional|Security|Contract|State> / <EP|BVA|State Transition|Negative Testing|Schema Validation|...>

## Preconditions
- <Điều kiện có thể kiểm chứng>

## Test data
| Trường | Giá trị |
|---|---|
| ... | ... |

## Test steps
1. <Bước thực thi cụ thể>

## Expected result
- HTTP status: `<status>`
- Content-Type: `<type>`
- <Oracle về response body/schema/state>

## Status / Related bugs
Not Run / None

## Automation mapping
- Data row: `<TC-ID>`
- Coverage: `<coverage families>`
```

Do not include an `AI audit` section in testcase Markdown. Keep `source`, `agentAudit`, and `humanReview` in `suite.manifest.json`. Agent-audit results may be summarized in the test-run summary or an explicitly dedicated `Agent audit (AI recommendation)` section, but never in a main-report section or table labeled `Human review` or `Audit - Human review`. Leave human-review placeholders unchanged unless the student explicitly supplies decisions for named testcases. The skill must emit source `ai-generated` only. Use `student-authored` only when the student explicitly provides the testcase content. Never mark `humanReview` as complete without an explicit student decision. Never place live bearer tokens or passwords in the file; use named variables or redacted values.
