# Skill: Generate Bug Report

## Purpose

This skill enables an AI agent to generate structured bug reports from test case failures. When given a bug description and a related test case ID, the agent will:

1. **Read the test case** to extract steps to reproduce, expected result, and test data
2. **Assess severity & priority** based on the bug's impact
3. **Generate a bug report** file in `bug-reports/BUG-FR-XX-NNN.md`
4. **Optionally update** the test case status and test run file

## How to Use

Provide a bug description mentioning the test case that found it:

```
TC-FR-01-013 bị lỗi: hệ thống cho phép đăng ký thành công dù xác nhận mật khẩu không khớp
```

Or more detailed:

```
Bug từ TC-FR-01-013:
- Xác nhận mật khẩu không khớp nhưng vẫn đăng ký được
- Hệ thống báo thành công và tạo tài khoản mới
```

The agent will then:
1. Read `tests/test-cases/FR-01-register/TC-FR-01-013.md` to get steps & expected result
2. Assess severity (High) and priority (P2)
3. Create `bug-reports/BUG-FR-01-001.md` with full details
4. Update test case status to `Failed / BUG-FR-01-001`

## File Structure

```
skills/generate-bug-report/
├── README.md              # This file
├── skill.md               # Main skill instructions
└── templates/
    └── bug-report.md      # Template for bug report
```

## Output

Bug reports are created in the `bug-reports/` directory:

```
bug-reports/
├── BUG-FR-01-001.md
├── BUG-FR-01-002.md
├── screenshots/           # For manual evidence attachment
└── ...
```

## Output Language

- Skill instructions: English
- Generated output: Vietnamese
