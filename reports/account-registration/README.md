# FR-01 Account Registration — Automation Summary

- StudentID: `23127062`
- SUT: `http://127.0.0.1:5173/register`
- Build: `fc8cc4d0eb3263440e9e5b3c4fc2d076aea08b5c`
- Automated cases: 15 / 15
- Unautomated cases: None

| Browser | Timestamp | Passed | Failed | HTML report |
|---|---|---:|---:|---|
| Chromium 151.0.7922.34 | 2026-08-08T03:08:07Z | 9 | 6 | `reports/account-registration/chromium/index.html` |
| Firefox 153.0 | 2026-08-08T02:59:44Z | 9 | 6 | `reports/account-registration/firefox/index.html` |
| WebKit 26.5 | 2026-08-08T03:00:34Z | 9 | 6 | `reports/account-registration/webkit/index.html` |

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
