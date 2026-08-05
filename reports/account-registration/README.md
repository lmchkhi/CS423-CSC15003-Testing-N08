# FR-01 Account Registration — Automation Summary

- StudentID: `23127062`
- SUT: `http://127.0.0.1:5173/register`
- Build: `a934bf2d7871413aae4b6d46f820995e04170595`
- Automated cases: 15 / 15
- Unautomated cases: None

| Browser | Timestamp | Passed | Failed | HTML report |
|---|---|---:|---:|---|
| Chromium 151.0.7922.34 | 2026-08-05T09:16:18Z | 9 | 6 | `reports/account-registration/chromium/index.html` |
| Firefox 153.0 | 2026-08-05T09:18:49Z | 9 | 6 | `reports/account-registration/firefox/index.html` |
| WebKit 26.5 | 2026-08-05T09:20:19Z | 9 | 6 | `reports/account-registration/webkit/index.html` |

## Failure triage

The six consistently failing cases map to four confirmed product defects:

- TC-REG-001 → BUG-REG-001: compliant special-character password is rejected.
- TC-REG-005 and TC-REG-006 → BUG-REG-002: invalid email format is accepted.
- TC-REG-007 → BUG-REG-003: duplicate email is accepted.
- TC-REG-014 and TC-REG-015 → BUG-REG-004: confirmation-password control and comparison are absent.

No environment/infrastructure failures remain in the official runs.

GitHub authentication succeeded outside the sandbox through the system keyring. All four defects matched existing `Module: Register` issues, so the existing verified issues were reused rather than creating duplicates:

- BUG-REG-001 → https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/2
- BUG-REG-002 → https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3
- BUG-REG-003 → https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7
- BUG-REG-004 → https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8

## Human review corrections

The first generated data used a compliant password in the malformed-email and duplicate-email cases. Because the product's broken password regex rejected that input before submission, those cases appeared to pass without exercising their target rule.

The data was corrected only for these two isolation cases to pass through the current UI regex, then rerun. A second review found that checking the page URL immediately after clicking submit could pass before the asynchronous API call completed. The final script waits for `POST /api/register` and asserts its response status, making the email or uniqueness oracle deterministic.
