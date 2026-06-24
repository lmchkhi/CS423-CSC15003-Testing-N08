# Skill: Summarize Conversation

## Purpose

This skill enables an AI agent to summarize the current conversation into structured audit report entries and append them to `reports/ai-audit-report.md`. Each entry captures:

1. **User prompt** (verbatim copy)
2. **AI response** (verbatim copy)
3. **Tool/model** used and **timestamp**
4. **Verdict, Reasoning, Student Fix** — left as placeholders for the user to fill in

## How to Use

Simply ask the agent to summarize the conversation:

```
Tóm tắt cuộc trò chuyện hiện tại vào reports/ai-audit-report.md
```

Or specify which interactions:

```
Tóm tắt 2 prompt gần nhất vào ai-audit-report
```

The agent will then:
1. Read the conversation history
2. Read `reports/ai-audit-report.md` to find the next entry number
3. Create entries with verbatim copies of prompts and outputs
4. Append entries to the report, leaving review sections as placeholders

## File Structure

```
skills/summarize-conversation/
├── README.md              # This file
├── skill.md               # Main skill instructions
└── templates/
    └── entry.md           # Template for a single audit entry
```

## Output

Entries are appended to `reports/ai-audit-report.md` following the existing format.

## Key Rules

- User prompts and AI outputs are **never** paraphrased — always verbatim
- Verdict, Reasoning, and Student Fix are **always** left as placeholders
- Nested code blocks use appropriate backtick levels to avoid markdown conflicts
- Entry numbers continue sequentially from existing entries

## Output Language

- Skill instructions: English
- Generated output: Vietnamese (following conversation language)
