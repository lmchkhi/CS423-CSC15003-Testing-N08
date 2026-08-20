# FR-01 Register Test Cases — Extended (Student-Added)

**Added by:** Student (Hà Bảo Ngọc, 23127300)  
**Date:** 2026-08-20  
**Basis:** Audit findings + missing edge cases

---

## Student-Added Cases (≥5)

### TC-EX-001: Duplicate Email Accepted (No Uniqueness Constraint)

**Why AI Missed:** AI assumed typical RDBMS behavior (unique constraint on email). Spec does not explicitly mandate uniqueness; SUT implementation has no constraint.

**Test Case:**
```
Precondition: Register "Alice" / "alice@hw06.test" / "Password123!" → succeeds, returns id=1

Action: Register "Bob" / "alice@hw06.test" / "Password123!" (same email, different name)

Expected (per spec): 400 Bad Request (email must be unique) or 409 Conflict

Observed (SUT): 200 OK, returns id=2 (second row inserted with duplicate email)

Oracle: Response code === 200 AND response.id === <new_int>

Bug Flag: knownBug:true (no email uniqueness constraint)
```

---

### TC-EX-002: Empty Body Accepted (NULLs Inserted)

**Why AI Missed:** AI did not test completely empty request body in JSON context. Spec requires name, email, password but does not explicitly say what happens with `{}`.

**Test Case:**
```
Action: POST /api/register with body: {}

Expected (per spec): 400 Bad Request (missing required fields)

Observed (SUT): Check actual behavior—may accept and insert row with NULLs (implementation bug)

Oracle: Response code === 400 (expected) or report actual code if different

Bug Flag: If SUT returns 200, knownBug:true (accepts empty object)
```

---

### TC-EX-003: Plaintext Password Disclosed via /api/users/me

**Why AI Missed:** AI focused on registration endpoint; did not test password exposure in *subsequent* user profile endpoint after login.

**Test Case:**
```
Precondition: 
  1. Register "Charlie" / "charlie@hw06.test" / "SecurePass123!"
  2. Login with same credentials → receive JWT token
  3. Call GET /api/users/me with Authorization: Bearer <token>

Expected (per spec): User object should contain {id, name, email, ...} but NOT password

Observed (SUT): Check if password field is present in /api/users/me response

Oracle: pm.response.json().password === undefined (password must not be exposed)

Bug Flag: If password is present, knownBug:true (plaintext password leak; SEC-03 vulnerability)
```

---

### TC-EX-004: Weak Password Accepted (No Complexity Enforcement)

**Why AI Missed:** Spec example shows "Password123!" but does not explicitly enforce complexity rules. AI marked "no-digit" / "no-uppercase" as OBSERVE; this directly tests weakness.

**Test Case:**
```
Action: Register "David" / "david@hw06.test" / "123" (3 chars, no special char, no uppercase)

Expected (per spec): 400 Bad Request (weak password; should enforce complexity)

Observed (SUT): Check if SUT accepts weak passwords

Oracle: Response code === 400 (expected) OR report actual code

Bug Flag: If SUT returns 200, knownBug:true (no password complexity enforcement)
```

---

### TC-EX-005: Whitespace-Only Email Accepted

**Why AI Missed:** AI tested "leading space" (TC-FR01-015) but not *only* whitespace. Spec does not say to trim or reject pure whitespace.

**Test Case:**
```
Action: Register "Eve" / "    " (four spaces) / "Password123!"

Expected (per spec): 400 Bad Request (email is invalid/empty after trim)

Observed (SUT): Check if SUT accepts or rejects

Oracle: Response code === 400 (expected) OR report actual code

Bug Flag: If SUT returns 200, knownBug:true (accepts whitespace-only email)
```

---

## Summary

| ID | Category | Why Missed | Expected | Bug Flag |
|----|----------|-----------|----------|----------|
| TC-EX-001 | No Email Uniqueness | AI assumed typical DB constraint | 400 | knownBug:true |
| TC-EX-002 | Empty Body NULLs | Not tested in JSON context | 400 | knownBug:true if 200 |
| TC-EX-003 | Password Leak | Tested endpoint, not downstream | undefined in /me | knownBug:true if exposed |
| TC-EX-004 | Weak Password | Spec example ≠ enforcement | 400 | knownBug:true if 200 |
| TC-EX-005 | Whitespace Email | Only leading space tested | 400 | knownBug:true if 200 |

**Total Extended:** 5 cases (all critical edge cases + security)
