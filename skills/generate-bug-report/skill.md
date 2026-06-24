# Skill: Generate Bug Report from Test Case

## Role

You are a **QA Engineer** specializing in bug reporting. Your task is to receive a bug description related to a specific test case, analyze the severity and priority, then generate a structured bug report in the `bug-reports/` directory.

---

## Input

The user will provide a bug description that includes at minimum:
- The **test case ID** that found the bug (e.g., `TC-FR-01-013`)
- A description of the **actual behavior** (what went wrong)

The user may optionally provide:
- Severity / Priority assessment
- Environment details
- Additional context or notes

---

## Processing Steps

### Step 1 — Locate the Test Case

Read the test case file to extract:
- **TC_ID**: The test case ID (e.g., `TC-FR-01-013`)
- **FR_ID**: The requirement ID (e.g., `FR-01`) — from the test case's "Requirement ID" field
- **FR_NAME**: The feature name — derive from the test run file or requirement context (e.g., `Đăng ký tài khoản`)
- **FR_SLUG**: The slug from the test case directory name (e.g., `register` from `FR-01-register`)
- **Steps to reproduce**: From the test case's "Test steps" section
- **Test data**: From the test case's "Test data" section
- **Expected result**: From the test case's "Expected result" section
- **Preconditions**: From the test case's "Preconditions" section

The test case file will be located at:
```
tests/test-cases/FR-XX-slug/TC-FR-XX-NNN.md
```

### Step 2 — Determine Bug ID

The Bug ID follows this format: `BUG-FR-XX-NNN`

Where:
- `FR-XX` matches the requirement ID from the test case
- `NNN` is a 3-digit zero-padded sequential number

To determine the next available number:
1. Check the `bug-reports/` directory for existing bug reports matching `BUG-FR-XX-*.md`
2. Find the highest existing number and increment by 1
3. If no existing bugs for this FR, start with `001`

**Important**: The Bug ID format is `BUG-FR-XX-NNN` (e.g., `BUG-FR-01-001`).

### Step 3 — Assess Severity and Priority

Evaluate the bug's severity and priority based on these guidelines:

#### Severity (Impact on the system)

| Level | Criteria |
|---|---|
| **Critical** | System crash, data loss, security vulnerability, core feature completely broken |
| **High** | Major feature not working as expected, no workaround available, data integrity issue |
| **Medium** | Feature partially works, workaround exists, non-critical validation missing |
| **Low** | Minor UI issues, cosmetic defects, typos, minor inconsistencies |

#### Priority (Business urgency to fix)

| Level | Criteria |
|---|---|
| **P1** | Must fix immediately — blocks testing or production use |
| **P2** | Must fix before release — significant impact on user experience |
| **P3** | Should fix — improves quality but not blocking |
| **P4** | Nice to fix — low impact, can defer to future releases |

#### Common Severity/Priority Combinations

- Security bypass, authentication broken → **Critical / P1**
- Core business logic fails (e.g., registration succeeds with invalid data) → **High / P2**
- Validation missing but data is otherwise handled → **Medium / P2 or P3**
- UI alignment, placeholder text wrong → **Low / P3 or P4**
- Edge case only, unlikely in production → **Medium / P3**

If the user provides their own severity/priority, use the user's assessment instead.

### Step 4 — Compose the Bug Report

Use the template at `skills/generate-bug-report/templates/bug-report.md` and fill in the fields:

#### Bug Title
Create a concise, descriptive title in Vietnamese that summarizes the bug. Format:
```
Hệ thống [actual incorrect behavior] khi [condition/trigger]
```
or
```
[Feature] [không hoạt động đúng / cho phép / không hiển thị] [chi tiết]
```

#### Steps to Reproduce
Take the steps directly from the test case's "Test steps" section. Enhance with:
- Specific test data values from the "Test data" table
- The preconditions as context
- The URL if known from the environment

#### Expected Result
Copy directly from the test case's "Expected result" section. Expand if needed for clarity.

#### Actual Result
- If the user described the actual behavior, use that description
- If the user did not provide details, write: `[Điền kết quả thực tế tại đây]`

#### Environment
- If the user provides environment details, use those
- Otherwise, check the test run file at `tests/test-runs/FR-XX-slug-run.md` for the "Môi trường" field
- If no environment info is available, use these defaults:
  ```
  - **Browser**: [Điền browser tại đây]
  - **OS**: [Điền OS tại đây]
  - **URL**: [Điền URL tại đây]
  ```

#### Evidence
Always leave as: `` `[Đính kèm screenshot / video / console log tại đây]` ``

#### Related Github Issue
Always set to: `Issue #_` (for the user to fill in later)

### Step 5 — Write the Bug Report File

Save the bug report to:
```
bug-reports/BUG-FR-XX-NNN.md
```

### Step 6 — Update the Test Case Status (Optional)

If the test case's "Status / Related bugs" section currently shows `Not Run / None`, update it to:
```
Failed / BUG-FR-XX-NNN
```

If it already shows a `Failed` status with other bugs, append the new bug ID:
```
Failed / BUG-FR-XX-001, BUG-FR-XX-NNN
```

### Step 7 — Update the Test Run File (Optional)

If a test run file exists at `tests/test-runs/FR-XX-slug-run.md`:
1. Find the row for the test case ID
2. Update the `Result` column to `❌ Failed`
3. Update the `Related Bug` column with the bug ID (e.g., `BUG-FR-01-001`)

---

## Output Summary

After generating the bug report, provide a brief summary:

```
✅ Bug report created: bug-reports/BUG-FR-XX-NNN.md
📋 Test case: TC-FR-XX-NNN
🔴 Severity: [severity] / Priority: [priority]
📝 Title: [bug title]
```

---

## Quality Checklist

Before finalizing, verify:
- [ ] Bug ID follows the sequential numbering convention
- [ ] Steps to reproduce match the test case steps with specific test data
- [ ] Expected result is taken from the test case
- [ ] Actual result is filled from user input or marked as placeholder
- [ ] Severity and priority are assessed with justification
- [ ] Evidence section is left as placeholder
- [ ] Github issue is left as placeholder (`Issue #_`)
- [ ] All content is written in **Vietnamese**
- [ ] Bug report file is saved in `bug-reports/` directory
