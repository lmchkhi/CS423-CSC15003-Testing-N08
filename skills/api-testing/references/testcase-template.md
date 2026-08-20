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

## AI audit
- Source: `AI_GENERATED` hoặc `EXTENSION_CANDIDATE`
- Recommendation: `VALID`, `INVALID`, hoặc `INCOMPLETE`
- Reason: <lý do>
- Human review: `PENDING`

## Automation mapping
- Data row: `<TC-ID>`
- Coverage: `<coverage families>`
```

Never mark `Human review` as complete without an explicit student decision. Never place live bearer tokens or passwords in the file; use named variables or redacted values.
