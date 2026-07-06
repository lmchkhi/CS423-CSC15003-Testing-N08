# Skill: Summarize Conversation to AI Audit Report Entry

## Role

You are a **QA Documentation Assistant**. Your task is to summarize the current conversation between the user and the AI agent into structured audit report entries, then append them to `reports/ai-audit-report.md`.

---

## Input

The user will invoke this skill when they want to summarize one or more interactions from the **current conversation** into AI audit report entries.

The user may optionally specify:
- Which interactions to include (e.g., "tóm tắt 2 prompt gần nhất")
- If not specified, summarize **all substantive user requests and complete AI outcomes** in the current conversation

---

## Processing Steps

### Step 1 — Read the Current Conversation

Review the full conversation history between the user and the AI agent. Identify each distinct **substantive user request → complete AI outcome** pair.

#### Handling implementation plans and approval messages

Sometimes the agent first replies with an implementation plan, waits for the user to approve it, and only then performs the actual implementation. Treat that whole workflow as **one audit entry**, not two.

Use these rules:
- The original substantive user request is the entry's **User prompt**.
- The agent's implementation plan, follow-up work after approval, tool/action summaries, and final conclusion are all part of the same entry's **AI response**.
- A user message whose only purpose is approval or continuation (for example: "approve", "ok", "tiếp tục", "thực hiện đi", "đồng ý với plan") is a **control message**, not a new audit entry.
- Do **not** create a separate entry for the approval message.
- Do **not** treat the approval message as a separate artifact.
- If the approval message also changes requirements, adds constraints, or asks for extra work, keep it in the same entry as part of the user prompt context, preserving it verbatim after the original request. Still do not split it into a separate entry unless it clearly starts an unrelated task.

In short: when one user request leads to a plan, approval, implementation, and final answer, it still counts as **one input and one output** for the audit report.

For each request/outcome group, extract:
- **User prompt**: The full, verbatim text authored by the user (the request/instruction). Exclude IDE context, environment context, open-file lists, system metadata, and any other context automatically injected by the client or system. If the interface labels a section such as `My request for Codex`, copy only the user's authored request beneath that label.
- **AI response**: The **COMPLETE** verbatim text the AI agent responded with. This includes **ALL** of the following:
  1. Tool calls and research steps (Listed directory, Viewed file, etc.)
  2. File creation/modification actions (Created file, Edited file, etc.)
  3. Intermediate commentary and reasoning
  4. **The final summary/conclusion message sent to the user** — this is the text that appears AFTER all tool calls, often containing tables, bullet points, or a wrap-up paragraph. Do NOT stop capturing before this final message.
- **Timestamp**: The time the interaction occurred (use the conversation metadata or current time if unavailable)
- **Tool used**: The AI tool/model used (e.g., `Claude Opus 4.6`, `Gemini 3.5 Flash`)

> **IMPORTANT**: The most common mistake is to omit the agent's final summary paragraph or conclusion that comes after the tool calls. You MUST include everything the agent sent to the user, from the very first line to the very last line of the response.

### Step 2 — Read the Existing Audit Report

Read `reports/ai-audit-report.md` to:
1. Determine the **next Entry number** (find the highest `## Entry #N` and increment by 1)
2. Understand the existing format and style for consistency

### Step 3 — Determine Artifact Type

For each request/outcome group, identify what the AI produced. Common artifact types:
- Agent skill (e.g., `Agent skill 'generate-bug-report'`)
- Bug report (e.g., `Bug report cho TC-FR-01-001`)
- Test cases (e.g., `Test cases cho FR-01`)
- Test run (e.g., `Test run cho FR-01`)
- Code changes / fixes
- Analysis / documentation
- Other — describe briefly

### Step 4 — Compose Each Entry

For each substantive user request → complete AI outcome pair, read the template at `skills/summarize-conversation/templates/entry.md` and replace the placeholders:
- `{{ENTRY_NUMBER}}`: The entry number (e.g., `1`, `2`)
- `{{TOOL_NAME}}`: The exact tool/model used (e.g., `Gemini 3.5 Flash`)
- `{{TIMESTAMP}}`: The conversation timestamp formatted as `HH:MM AM/PM DD/MM/YYYY`
- `{{ARTIFACT_TYPE}}`: The type of artifact produced (e.g., `Bug report cho TC-FR-01-001`, `Agent skill 'generate-bug-report'`)
- `{{USER_PROMPT_VERBATIM}}`: The user's full prompt, copied verbatim (character-for-character)
- `{{AI_OUTPUT_VERBATIM}}`: The AI's complete response text, copied verbatim (character-for-character)


### Step 5 — Handle Nested Code Blocks

**CRITICAL**: The user prompt and AI output MUST be copied **verbatim**. Since they may contain triple backticks (` ``` `), you MUST use the appropriate number of backticks to avoid breaking the markdown:

- If the content contains ` ``` `, wrap with ` ```` ` (4 backticks)
- If the content contains ` ```` `, wrap with ` ````` ` (5 backticks)
- If the content contains ` ````` `, wrap with ` `````` ` (6 backticks)
- Continue adding backtick levels as needed

Similarly for single quotes `'''` in prompts — preserve them exactly as the user typed.

### Step 6 — Append to the Report

Append all new entries to the **end** of `reports/ai-audit-report.md`, maintaining:
- Consistent spacing (blank lines between sections)
- Sequential entry numbering
- No modification to existing entries

---

## Output Format Rules

1. **Verbatim copy**: User prompts and AI outputs must be copied **exactly as they appear**. Do NOT paraphrase, summarize, shorten, or modify them in any way.
   - For the user prompt, “verbatim” means the user's own authored words only. Do NOT include automatically injected IDE/environment context or system metadata.
2. **Placeholders for review**: Sections (3) Verdict, (4) Reasoning, and (5) Student Fix must always be left as placeholders for the user to fill in manually.
3. **Timestamp format**: Use `HH:MM AM/PM DD/MM/YYYY` (e.g., `04:26 PM 24/06/2026`)
4. **Tool name**: Use the exact model name (e.g., `Claude Opus 4.6`, `Gemini 3.5 Flash`, `Claude Opus 4.6 (Thinking)`)
5. **Entry numbering**: Must be sequential, continuing from the last entry in the existing report

---

## Output Summary

After appending entries, provide a brief summary:

```
✅ Đã thêm N entry vào reports/ai-audit-report.md
📝 Entry #X: [artifact type brief description]
📝 Entry #Y: [artifact type brief description]
...
```

---

## Constraints

- Do NOT modify any existing entries in `reports/ai-audit-report.md`
- Do NOT fill in the Verdict, Reasoning, or Student Fix sections — these are **always** left as placeholders
- Do NOT paraphrase or summarize the user prompt or AI output — they must be **verbatim copies**
- Do NOT omit any part of the user prompt or AI response — especially do NOT truncate the AI response before its final summary/conclusion paragraph
- The AI output section must capture EVERYTHING the agent sent to the user, from the first line to the absolute last line
- Do NOT split implementation-plan approval workflows into multiple entries: the plan, approval continuation, implementation work, and final answer belong to the same entry for the original substantive request
- The skill instructions are in English, but the generated output content follows the language used in the conversation (typically Vietnamese)

---

## Quality Checklist

Before finalizing, verify:
- [ ] Entry numbers are sequential and correct
- [ ] User prompt is copied **verbatim** (character-for-character)
- [ ] AI output is copied **verbatim** (character-for-character)
- [ ] Nested code blocks use enough backtick levels to avoid markdown conflicts
- [ ] Timestamp is in the correct format
- [ ] Tool name matches the actual AI model used
- [ ] Artifact type accurately describes what was produced
- [ ] Implementation plan + approval workflows are grouped into one entry when they belong to the same original request
- [ ] Verdict, Reasoning, and Student Fix are left as placeholders
- [ ] No existing entries were modified
