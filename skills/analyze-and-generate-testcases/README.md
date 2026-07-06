# Skill: Analyze & Generate Test Cases

## Purpose

This skill enables an AI agent to analyze a functional requirement (FR) using **Domain Testing** and **Boundary Value Analysis (BVA)** techniques, then automatically generate:

1. **Analysis report** — appended to `reports/main-report.md`
2. **Individual test case files** — in `tests/test-cases/FR-XX-name/TC-FR-XX-NNN.md`
3. **Test run file** — in `tests/test-runs/FR-XX-name-run.md`

## How to Use

Provide a functional requirement in the following format:

```
FR-XX: Feature Name

- Requirement detail 1
- Requirement detail 2
- ...
```

The agent will then:
1. Parse the requirement to identify inputs, outputs, and constraints
2. Perform Domain Testing (Equivalence Partitioning)
3. Perform Boundary Value Analysis (3-point boundary)
4. Generate all output files

## File Structure

```
skills/analyze-and-generate-testcases/
├── README.md                    # This file
├── skill.md                     # Main skill instructions
├── templates/
│   ├── main-report-section.md   # Template for report section
│   ├── test-case.md             # Template for individual test case
│   └── test-run.md              # Template for test run file
```

## Output Language

- Skill instructions: English
- Generated output: Vietnamese
