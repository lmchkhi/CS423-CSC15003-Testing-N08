# FR-14 Category CRUD – Extended Test Cases

## Student-Added Test Cases (≥5)

These test cases were identified through manual analysis and address gaps the AI missed, particularly around **access control** and **resource validation**.

### TC-FR14-041: Non-admin user creates category (Role Escalation)

**Category:** Security / Access Control  
**Input:** `POST /api/categories` with `{"name":"Escalated Category"}`, user token (non-admin)  
**Precondition:** Authenticated as regular user (`test@eshop.com`), not admin  
**Expected (per spec):** 403 Forbidden — spec §3.3 states admin operations  
**Actual (observed):** 200 OK, `{message:"Category created", id:<int>}`  
**Verdict:** **BUG-FR14-001** — Broken access control  

**Why AI missed it:**
The AI assumed role-based access control (RBAC) was implemented based on spec §6 "Admin API" section. However, it did not verify that category CRUD endpoints are explicitly protected by admin role checks. The SUT only validates JWT token existence (`authenticateToken` middleware), not the user's role. This is a **critical security vulnerability** (OWASP A01:2021 Broken Access Control).

---

### TC-FR14-042: Non-admin user deletes category (Role Escalation)

**Category:** Security / Access Control  
**Input:** `DELETE /api/categories/:id`, user token (non-admin)  
**Precondition:** Authenticated as regular user, category id exists  
**Expected (per spec):** 403 Forbidden  
**Actual (observed):** 200 OK, `{message:"Category deleted"}`  
**Verdict:** **BUG-FR14-001** — Same broken access control issue  

**Why AI missed it:**
The AI generated TC-FR14-033 covering this scenario but incorrectly expected 403. It didn't recognize that the SUT's actual implementation lacks role validation. This demonstrates the AI's **spec-optimism bias** — assuming security controls exist when the spec implies but doesn't mandate them.

---

### TC-FR14-043: PUT non-existent category id returns success (No resource validation)

**Category:** API Contract / Error Handling  
**Input:** `PUT /api/categories/999999` with `{"name":"Ghost Update"}`, admin token  
**Precondition:** Category id 999999 does not exist  
**Expected (per spec):** 404 Not Found — standard REST convention  
**Actual (observed):** 200 OK, `{message:"Category updated"}`  
**Verdict:** **BUG-FR14-002** — Missing resource existence validation  

**Why AI missed it:**
The AI correctly included this scenario (TC-FR14-026) but assumed the SUT follows REST best practices (404 for missing resources). In reality, the backend executes `UPDATE categories SET name=? WHERE id=?` without checking `affectedRows`. The database returns success even when zero rows match. The AI didn't anticipate this **implementation shortcut**.

---

### TC-FR14-044: DELETE non-existent category id returns success (No resource validation)

**Category:** API Contract / Error Handling  
**Input:** `DELETE /api/categories/999999`, admin token  
**Precondition:** Category id 999999 does not exist  
**Expected (per spec):** 404 Not Found  
**Actual (observed):** 200 OK, `{message:"Category deleted"}`  
**Verdict:** **BUG-FR14-002** — Same missing validation as PUT  

**Why AI missed it:**
Same root cause as TC-FR14-043. The AI assumed RESTful error handling but didn't test against the actual implementation. This reveals a **gap in AI's runtime validation capability** — it generates tests based on spec/standards, not observed behavior.

---

### TC-FR14-045: Duplicate category name accepted (No uniqueness constraint)

**Category:** Data Integrity / Business Logic  
**Input:** `POST /api/categories` with `{"name":"Điện thoại"}` twice (admin token)  
**Precondition:** Category "Điện thoại" already exists  
**Expected (per spec):** 400 Bad Request or 409 Conflict — business logic should enforce unique category names  
**Actual (observed):** 200 OK both times, two categories with identical names created  
**Verdict:** **BUG-FR14-003** — No uniqueness constraint on category name  

**Why AI missed it:**
The AI included this scenario (TC-FR14-010) but assumed the database enforces uniqueness. The SUT's SQLite schema has no `UNIQUE` constraint on `categories.name`, allowing duplicates. This violates basic e-commerce data integrity (categories should be unique for UI navigation). The AI lacks **database schema awareness** — it reasons from API contracts, not underlying data models.

---

### TC-FR14-046: Empty category name accepted (No input validation)

**Category:** Input Validation  
**Input:** `POST /api/categories` with `{"name":""}`, admin token  
**Precondition:** None  
**Expected (per spec):** 400 Bad Request — category name should not be empty  
**Actual (observed):** 200 OK, `{message:"Category created", id:<int>}`  
**Verdict:** **BUG-FR14-004** — Missing input validation on required field  

**Why AI missed it:**
The AI generated TC-FR14-003 for this but assumed validation exists. Express.js without explicit validation middleware (like Joi or express-validator) accepts empty strings. The AI didn't recognize that **absence of validation is the default** in minimalist Node.js apps.

---

### TC-FR14-047: Whitespace-only category name accepted (Input sanitization gap)

**Category:** Input Validation / Data Quality  
**Input:** `POST /api/categories` with `{"name":"   "}` (3 spaces), admin token  
**Precondition:** None  
**Expected (per spec):** 400 Bad Request — whitespace-only names are semantically invalid  
**Actual (observed):** 200 OK, category created with name="   "  
**Verdict:** **BUG-FR14-004** — Same validation gap as empty string  

**Why AI missed it:**
The AI covered this (TC-FR14-005) but assumed trimming/validation. The SUT stores the value exactly as received. This reflects the AI's **framework-agnostic assumptions** — it doesn't know that raw Express without middleware does zero sanitization.

---

## Summary

**Total student-added cases:** 7 (exceeds ≥5 requirement)

**Bug distribution:**
- **BUG-FR14-001** (Access Control): TC-FR14-041, 042 — **Critical severity**
- **BUG-FR14-002** (Resource Validation): TC-FR14-043, 044 — **Medium severity**
- **BUG-FR14-003** (Uniqueness): TC-FR14-045 — **Low severity**
- **BUG-FR14-004** (Input Validation): TC-FR14-046, 047 — **Medium severity**

**Why AI systematically missed these:**

1. **Spec-optimism bias:** Assumes security/validation exists when spec is vague
2. **No runtime oracle:** Generates tests from spec, not observed SUT behavior
3. **Framework assumptions:** Expects validation/RBAC middleware that isn't present
4. **Schema blindness:** Cannot inspect database constraints

**Collaboration principle learned:**
AI excels at **exhaustive coverage** (40 cases across partitions) but fails at **reality checking**. The student must **validate assumptions against the running SUT** before encoding tests. The AI is a **coverage amplifier**, not a security auditor.
