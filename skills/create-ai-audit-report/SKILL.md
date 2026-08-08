---
name: create-ai-audit-report
description: Create or append a Markdown AI audit report from the current conversation or a supplied chat transcript, recording a human-readable local chat-start timestamp and exact model identity for every entry. Use when the user asks to audit, archive, document, or summarize LLM interactions as one entry per request-response pair while preserving the user-visible request and agent output verbatim, especially for Vietnamese coursework reports such as ai-audit-report.md.
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
3. Resolve the conversation metadata before composing entries:
   - Capture the exact start timestamp for each chat represented in the source.
   - Capture the exact model identifier or display name that produced each response.
   - For a Codex task, follow **Codex metadata resolution** below before using a missing-data placeholder.
   - For other sources, inspect available task/thread metadata or machine-readable transcript metadata.
4. Collect every complete user request and corresponding user-visible agent response in chronological order from the available conversation or supplied transcript.
5. Exclude:
   - the request that invokes this skill and the response to that request;
   - system, developer, and hidden orchestration messages;
   - hidden reasoning, chain-of-thought, raw tool-call payloads, and other text the user could not see;
   - incomplete requests that do not yet have a corresponding agent response;
   - pairs already present in the report.
6. Append one entry per remaining pair, continuing the highest existing `Entry #N` number.
7. Validate the completed file against the exactness checklist below.

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
| **Tool**          | <tên model cụ thể>              |
| **Timestamp**     | <DD/MM/YYYY HH:mm:ss>           |
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

### Codex metadata resolution

For the current or another Codex task, exhaust these sources in order:

1. Find the task through the Codex app's thread-listing capability. Match the active task using its ID when available; otherwise use the active status, workspace `cwd`, title, and prompt preview together. Do not select a task from title alone.
2. Read the task with the thread-reading capability. Paginate through older turns until the first user-visible message is reached. Use that turn's `startedAt` as the chat-start instant; do not use the task's `createdAt` when an actual user-message turn timestamp exists.
3. Resolve the task's local rollout file and exact model with the bundled script:

   ```bash
   python3 <skill-dir>/scripts/resolve_codex_metadata.py --thread-id <thread-id>
   ```

   The script reads only the matching Codex session JSONL and returns the first turn timestamp, timezone, stable model ID, human-readable model name, and per-turn model metadata. Use `model_display_name` for **Tool**. Use the thread reader's first user-message timestamp for **Timestamp**; use the script's `chat_started_at` only when thread turns are unavailable.
4. Convert the selected instant using the task timezone returned by the session metadata. If the task timezone is absent, fall back to the explicit workspace/session timezone.

If the entry combines multiple response turns, check `turns` from the resolver. Use one Tool value only when all represented response turns used the same model. If models differ, list the exact distinct display names separated by `; ` rather than silently choosing one.

For a supplied Codex transcript without an accessible local task, prefer its exported `startedAt`, `model`, and `timezone` fields. Only use the missing-data placeholder after both task metadata and the matching rollout record are unavailable.

- Keep `Tool`, `Timestamp`, and `Artifact type` outside the verbatim quotations.
- Set `Timestamp` to the start time of the chat, not the request time, response time, report-generation time, or current system time.
- Resolve chat start time in this order:
  1. the timestamp of the earliest user-visible message in that chat;
  2. explicit conversation `started_at` metadata when individual message timestamps are unavailable;
  3. a chat-start time explicitly supplied by the user.
- Do not use task, thread, session, container, or workspace `created_at` as the chat start when it predates the first user-visible message. Infrastructure may be initialized well before the user begins the conversation.
- Convert the resolved start instant to the user/task timezone before formatting. Resolve that timezone from explicit task or transcript metadata, then from an explicit user preference, then from the current workspace/session timezone. Do not use an unrelated machine timezone.
- Format `Timestamp` exactly as `DD/MM/YYYY HH:mm:ss`, for example `03/08/2026 12:56:16`. Omit milliseconds, timezone names, `Z`, and UTC offsets from the displayed value.
- If the source timestamp has no timezone information, preserve its wall-clock date and time rather than inventing an offset.
- Use the same formatted chat-start timestamp for every entry originating from the same chat. For a transcript containing multiple chats, resolve a separate start timestamp for each chat.
- Set `Tool` to the exact model that produced the response, not a generic product or provider name. Prefer an explicit human-facing model name from runtime or transcript metadata.
- When only a stable runtime model ID is available, convert separators and casing without changing the model identity; for example, `gpt-5.6-sol` becomes `GPT-5.6 Sol` and `gpt-5.6-terra` becomes `GPT-5.6 Terra`.
- Do not write only `Codex`, `ChatGPT`, `Claude`, `Gemini`, or another product/family name when a more specific model is available.
- Do not infer a model version from product branding, capabilities, dates, or prose. If either the exact model or chat-start time is genuinely unavailable after checking accessible metadata, use `_[Không có trong dữ liệu hội thoại]_` for only that missing field.
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
7. Confirm every `Tool` value names a specific model when model metadata exists.
8. Confirm every `Timestamp` is the local start time of its source chat, matches `DD/MM/YYYY HH:mm:ss`, contains no timezone suffix, and is identical across entries from the same chat.
9. For a Codex task, confirm that thread metadata and the matching rollout record were checked before accepting a missing Tool or Timestamp.
10. Report the target path and the entry numbers added.
