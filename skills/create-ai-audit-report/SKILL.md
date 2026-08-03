---
name: create-ai-audit-report
description: Create or append a Markdown AI audit report from the current conversation or a supplied chat transcript. Use when the user asks to audit, archive, document, or summarize LLM interactions as one entry per request-response pair while preserving the user-visible request and agent output verbatim, especially for Vietnamese coursework reports such as ai-audit-report.md.
---

# Create AI Audit Report

Produce Vietnamese audit entries based on the five-part structure already used in the target report. Preserve quoted chat content exactly and leave the evaluation fields for the user.

## Workflow

1. Resolve the target report:
   - Use the path named by the user.
   - Otherwise, prefer an existing `submissions/bug-reports/ai-audit-report.md`.
   - Otherwise, prefer an existing `ai-audit-report.md`.
   - If neither exists, create `ai-audit-report.md` in the current workspace.
2. Read the entire existing report before editing. Preserve its header, student information, formatting conventions, and existing entries.
3. Collect every complete user request and corresponding user-visible agent response in chronological order from the available conversation or supplied transcript.
4. Exclude:
   - the request that invokes this skill and the response to that request;
   - system, developer, and hidden orchestration messages;
   - hidden reasoning, chain-of-thought, raw tool-call payloads, and other text the user could not see;
   - incomplete requests that do not yet have a corresponding agent response;
   - pairs already present in the report.
5. Append one entry per remaining pair, continuing the highest existing `Entry #N` number.
6. Validate the completed file against the exactness checklist below.

## Verbatim Rules

- Copy the request and response character-for-character from the user-visible transcript. Preserve the original language, spelling, capitalization, punctuation, emoji, Markdown, links, code, and line breaks.
- Include user-visible progress updates and tool activity in their displayed order when the transcript exposes them as part of the response. Exclude internal-only representations.
- Do not translate, summarize, normalize whitespace, repair typos, expand truncated text, or reconstruct missing content inside either quotation.
- Do not add speaker labels inside quoted content unless those labels are part of the visible transcript.
- Treat consecutive user messages answered by one agent response as one request block, preserving their visible order and separation.
- If the available context is compacted, truncated, or otherwise lacks the exact visible text, stop rather than inventing it. Tell the user which conversation portion must be pasted or exported to continue.

## Fence Rules

The fences are wrappers and are not part of the copied content.

- Wrap the full prompt in a backtick fence. Use at least three backticks and choose a fence longer than every run of backticks in the prompt.
- Wrap the full AI output in a fence made only of consecutive single-quote characters. Start with `'''`. If the response contains that sequence anywhere, use one more single quote than the longest consecutive run of single quotes in the response.
- Put every opening and closing fence on its own line.
- Never escape or modify quoted content to make a fence work; change only the wrapper length.

## Entry Template

Follow the existing report's spacing and table style. Use this structure for each new entry:

`````markdown
## Entry #<N>

### (1) Prompt + Tool

| Field             | Content                         |
| ----------------- | ------------------------------- |
| **Tool**          | <tên công cụ hoặc mô hình>      |
| **Timestamp**     | <thời gian của yêu cầu>         |
| **Artifact type** | <mô tả ngắn bằng tiếng Việt>    |

**Full prompt:**

````
<verbatim user request>
````

### (2) AI Output

'''
<verbatim user-visible agent response>
'''

### (3) Verdict

**`[NGƯỜI DÙNG TỰ ĐIỀN]`**

### (4) Reasoning

- _[Người dùng tự điền]_

### (5) Student Fix

- _[Người dùng tự điền]_
`````

The four-backtick prompt wrapper shown in the template is illustrative. Select the actual wrapper using the fence rules.

## Metadata Rules

- Keep `Tool`, `Timestamp`, and `Artifact type` outside the verbatim quotations.
- Use the exact tool/model and timestamp supplied by transcript metadata when available.
- Do not guess missing metadata. Use `_[Không có trong dữ liệu hội thoại]_` when unavailable.
- Write `Artifact type` as a concise Vietnamese description of the work product or purpose.
- Keep the sample's section names and field names so appended entries remain consistent with the existing report.

## Validation Checklist

Before finishing:

1. Compare every quoted request and response against the source transcript character-for-character.
2. Confirm there is exactly one entry for every eligible complete pair.
3. Confirm the invocation pair is absent.
4. Confirm numbering is continuous and no existing entry changed.
5. Confirm each AI output uses a safe single-quote fence.
6. Confirm Verdict, Reasoning, and Student Fix contain only the Vietnamese placeholders.
7. Report the target path and the entry numbers added.
