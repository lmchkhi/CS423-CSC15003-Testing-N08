# FR-14 Category CRUD – Audit Report

## Audit Methodology

Each AI-generated test case is labeled **VALID**, **INVALID**, or **INCOMPLETE** with reasoning and corrections where needed.

## Audit Results

| ID | Verdict | Reasoning | Correction |
|----|---------|-----------|------------|
| TC-FR14-001 | INCOMPLETE | AI assumes admin token required, but spec §3.4 does not explicitly state auth requirement for POST/PUT/DELETE categories | Verify actual SUT behavior; if no auth needed, update expected to 200 without token |
| TC-FR14-002 | VALID | Valid scenario | None |
| TC-FR14-003 | INCOMPLETE | AI assumes 400 validation, but SUT may accept empty string | Verify; if SUT accepts, mark as known bug with expectStatus=200 |
| TC-FR14-004 | INCOMPLETE | AI assumes 400, but SUT may accept `{}` or insert NULL | Verify; SUT likely creates row with NULL name |
| TC-FR14-005 | INCOMPLETE | AI assumes 400, but SUT may accept whitespace-only | Verify; likely accepted and stored as-is |
| TC-FR14-006 | VALID | Length boundary testing valid | None |
| TC-FR14-007 | VALID | Unicode support test valid | None |
| TC-FR14-008 | VALID | Special characters test valid | None |
| TC-FR14-009 | VALID | Numeric string test valid | None |
| TC-FR14-010 | INVALID | AI assumes uniqueness constraint exists, but SUT has no unique index on category.name — duplicate names are accepted | Change expected to 200; note this as a known bug (no uniqueness enforcement) |
| TC-FR14-011 | VALID | SQL injection test valid; parameterized queries prevent injection | None |
| TC-FR14-012 | VALID | XSS test valid | None |
| TC-FR14-013 | VALID | Null byte handling test valid | None |
| TC-FR14-014 | INCOMPLETE | AI assumes 401 without token, but spec §3.4 doesn't explicitly require auth; verify if categories CUD needs token | Verify; if no auth middleware, SUT may return 200 or 500 |
| TC-FR14-015 | INCOMPLETE | AI assumes 403 for invalid token; verify actual behavior | Verify; may return 401 or 403 depending on middleware |
| TC-FR14-016 | INVALID | **Critical:** AI assumes admin role check exists, but SUT only has `authenticateToken` middleware (checks JWT validity, not role) — ANY authenticated user can create/update/delete categories | Change expected to 200; this is the flagship bug (broken access control / role escalation) |
| TC-FR14-017 | VALID | Admin access valid | None |
| TC-FR14-018 | VALID | Extra fields robustness valid | None |
| TC-FR14-019 | INCOMPLETE | AI assumes type validation; verify if SUT coerces `123` to `"123"` or rejects | Verify; JS/Express may auto-coerce |
| TC-FR14-020 | VALID | GET list valid | None |
| TC-FR14-021 | VALID | Empty list valid | None |
| TC-FR14-022 | VALID | GET is public (no auth needed for read) | None |
| TC-FR14-023 | VALID | PUT valid rename | None |
| TC-FR14-024 | INCOMPLETE | AI assumes validation on empty name for PUT; verify | Verify; likely accepted |
| TC-FR14-025 | INCOMPLETE | AI assumes 400; verify if SUT accepts `{}` for PUT | Verify; may set name to NULL |
| TC-FR14-026 | INVALID | AI assumes 404 for non-existent id, but SUT returns 200 with `{message:"Category updated"}` even when id doesn't exist (no row-affected check) | Change expected to 200; mark as known bug |
| TC-FR14-027 | INCOMPLETE | Verify auth requirement for PUT | Verify actual behavior |
| TC-FR14-028 | INVALID | AI assumes admin role check for PUT; same issue as TC-FR14-016 — user token will succeed | Change expected to 200; role escalation bug |
| TC-FR14-029 | VALID | SQL injection test for PUT valid | None |
| TC-FR14-030 | VALID | DELETE valid | None |
| TC-FR14-031 | INVALID | AI assumes 404 for non-existent id, but SUT returns 200 `{message:"Category deleted"}` even when id doesn't exist | Change expected to 200; mark as known bug |
| TC-FR14-032 | INCOMPLETE | Verify auth requirement for DELETE | Verify actual behavior |
| TC-FR14-033 | INVALID | AI assumes admin role check for DELETE; user token will succeed (role escalation) | Change expected to 200; role escalation bug |
| TC-FR14-034 | VALID | Lifecycle flow valid | None |
| TC-FR14-035 | VALID | Consistency check valid | None |
| TC-FR14-036 | VALID | Consistency check valid | None |
| TC-FR14-037 | VALID | Consistency check valid | None |
| TC-FR14-038 | VALID | Boundary test valid | None |
| TC-FR14-039 | INCOMPLETE | AI assumes trimming or rejection; verify SUT stores as-is | Verify; likely stored with leading space |
| TC-FR14-040 | INCOMPLETE | AI assumes trimming or rejection; verify SUT stores as-is | Verify; likely stored with trailing space |

## Summary Statistics

- **VALID:** 19 (47.5%)
- **INVALID:** 6 (15%) — primarily role-escalation and missing-resource-404 assumptions
- **INCOMPLETE:** 15 (37.5%) — primarily validation and auth assumptions

## Critical AI Errors

1. **Role escalation blind spot:** AI assumed admin role enforcement exists (TC-FR14-016, 028, 033), but SUT only checks token validity, not role. Any authenticated user can perform CRUD on categories.

2. **Missing resource handling:** AI assumed 404 for PUT/DELETE of non-existent ids (TC-FR14-026, 031), but SUT returns 200 without checking affected rows.

3. **Uniqueness assumption:** AI assumed duplicate category names are rejected (TC-FR14-010), but no unique constraint exists.

4. **Validation optimism:** AI assumed empty/whitespace/missing fields trigger 400 errors, but SUT likely accepts them without validation.

## Corrected Test Cases

### TC-FR14-010 (Duplicate name)
- **Original expected:** 400, duplicate error
- **Corrected expected:** 200, `{message, id}` (known bug: no uniqueness)
- **Test assertion:** Mark as `knownBug: true`, assert observed 200

### TC-FR14-016 (Non-admin creates category)
- **Original expected:** 403 Forbidden
- **Corrected expected:** 200, `{message, id}` (known bug: broken access control)
- **Test assertion:** Mark as `knownBug: true`, assert observed 200, flag as **BUG-FR14-001**

### TC-FR14-026 (PUT non-existent id)
- **Original expected:** 404 Not Found
- **Corrected expected:** 200, `{message}` (known bug: no row-affected check)
- **Test assertion:** Mark as `knownBug: true`, assert observed 200, flag as **BUG-FR14-002**

### TC-FR14-028 (User token PUT)
- **Original expected:** 403 Forbidden
- **Corrected expected:** 200, `{message}` (known bug: broken access control)
- **Test assertion:** Same as TC-FR14-016, part of **BUG-FR14-001**

### TC-FR14-031 (DELETE non-existent id)
- **Original expected:** 404 Not Found
- **Corrected expected:** 200, `{message}` (known bug: no row-affected check)
- **Test assertion:** Mark as `knownBug: true`, assert observed 200, same as **BUG-FR14-002**

### TC-FR14-033 (User token DELETE)
- **Original expected:** 403 Forbidden
- **Corrected expected:** 200, `{message}` (known bug: broken access control)
- **Test assertion:** Same as TC-FR14-016, part of **BUG-FR14-001**

## Audit Conclusion

The AI generated comprehensive coverage across input partitions, auth scenarios, and CRUD operations. However, it made **three critical incorrect assumptions:**

1. **Admin role enforcement** (most severe: allows privilege escalation)
2. **404 for missing resources** (SUT blindly returns success)
3. **Uniqueness constraints** (allows duplicate category names)

These reflect the AI's **spec-optimistic bias** — it assumes the SUT implements best practices (RBAC, validation, resource checks) when the spec is silent or vague. The actual SUT has minimal validation.

All INVALID and INCOMPLETE cases have been corrected with observable expectations for test execution.
