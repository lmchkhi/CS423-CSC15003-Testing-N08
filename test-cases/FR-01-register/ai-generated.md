# FR-01 Register Test Cases — AI-Generated

**API Endpoint:** `POST /api/register`  
**Base URL:** `http://localhost:3000`  
**Spec Reference:** Section 1.1 (api-specification.md)  
**Student ID:** 23127300  
**Technique:** Domain partition (name/email/password), schema validation, security (SEC), account state

---

## Test Case Matrix (≥35 rows)

| ID | Category | Input (name / email / password) | Precondition | Expected (per spec) | Oracle |
|----|----------|----------------------------------|--------------|---------------------|--------|
| TC-FR01-001 | Valid Registration | "Nguyen Van A" / "valid@hw06.test" / "Password123!" | Fresh account | 200 OK; `{message:"User registered successfully", id:<int>}` | Response code 200; schema match |
| TC-FR01-002 | Name - Empty | "" / "email@hw06.test" / "Password123!" | Fresh account | 400 Bad Request; validation error | Response code 400 |
| TC-FR01-003 | Name - Missing | (omitted) / "email@hw06.test" / "Password123!" | Fresh account | 400 Bad Request; validation error | Response code 400 |
| TC-FR01-004 | Name - Whitespace Only | "   " / "email@hw06.test" / "Password123!" | Fresh account | 400 Bad Request; whitespace rejection | Response code 400 |
| TC-FR01-005 | Name - Very Long | "A" * 300 / "email@hw06.test" / "Password123!" | Fresh account | 400 Bad Request; length limit | Response code 400 |
| TC-FR01-006 | Name - Unicode | "Nguyễn Văn Á" / "email@hw06.test" / "Password123!" | Fresh account | 200 OK (if supported) or 400 | Accept or reject unicode consistently |
| TC-FR01-007 | Name - Numeric Only | "12345" / "email@hw06.test" / "Password123!" | Fresh account | 200 OK (numeric allowed?) or 400 | Accept or reject per spec |
| TC-FR01-008 | Name - Special Chars | "John@O'Brien#" / "email@hw06.test" / "Password123!" | Fresh account | 200 OK or 400 | Accept or reject special chars |
| TC-FR01-009 | Email - Valid | "Test User" / "valid.email@domain.com" / "Password123!" | Fresh account | 200 OK | Response code 200 |
| TC-FR01-010 | Email - Empty | "Test User" / "" / "Password123!" | Fresh account | 400 Bad Request; validation | Response code 400 |
| TC-FR01-011 | Email - Missing | "Test User" / (omitted) / "Password123!" | Fresh account | 400 Bad Request; validation | Response code 400 |
| TC-FR01-012 | Email - No @ Symbol | "Test User" / "invalidemail.com" / "Password123!" | Fresh account | 400 Bad Request; email format | Response code 400 |
| TC-FR01-013 | Email - No Domain | "Test User" / "user@" / "Password123!" | Fresh account | 400 Bad Request; incomplete email | Response code 400 |
| TC-FR01-014 | Email - No TLD | "Test User" / "user@domain" / "Password123!" | Fresh account | 400 Bad Request or 200 (depends on validation) | Check email format strictness |
| TC-FR01-015 | Email - Leading Space | "Test User" / " user@hw06.test" / "Password123!" | Fresh account | 400 Bad Request; whitespace | Response code 400 |
| TC-FR01-016 | Email - Trailing Space | "Test User" / "user@hw06.test " / "Password123!" | Fresh account | 400 Bad Request or trimmed | Check trim behavior |
| TC-FR01-017 | Email - SQL Meta (OR) | "Test User" / "a' OR '1'='1" / "Password123!" | Fresh account | 400 Bad Request; SQL injection protection | Response code 400; no injection |
| TC-FR01-018 | Email - SQL Meta (Union) | "Test User" / "a' UNION SELECT" / "Password123!" | Fresh account | 400 Bad Request; SQL injection protection | Response code 400; no injection |
| TC-FR01-019 | Email - XSS Script Tag | "Test User" / "<script>alert('xss')</script>" / "Password123!" | Fresh account | 400 Bad Request; XSS protection | Response code 400; no XSS |
| TC-FR01-020 | Email - XSS Event | "Test User" / "test@hw06.test' onclick='alert(1)'" / "Password123!" | Fresh account | 400 Bad Request; XSS protection | Response code 400 |
| TC-FR01-021 | Email - 320 Char | "Test User" / "a" * 300 + "@test.com" / "Password123!" | Fresh account | 400 Bad Request; length limit | Response code 400 |
| TC-FR01-022 | Email - Duplicate (Spec) | "User A" / "dup@hw06.test" / "Password123!" | Account with dup@hw06.test exists | Per spec: should reject 400 or 409 | Check uniqueness enforcement |
| TC-FR01-023 | Password - Valid | "Test User" / "email@hw06.test" / "Password123!" | Fresh account | 200 OK | Response code 200 |
| TC-FR01-024 | Password - Empty | "Test User" / "email@hw06.test" / "" | Fresh account | 400 Bad Request; validation | Response code 400 |
| TC-FR01-025 | Password - Missing | "Test User" / "email@hw06.test" / (omitted) | Fresh account | 400 Bad Request; validation | Response code 400 |
| TC-FR01-026 | Password - Too Short (3) | "Test User" / "email@hw06.test" / "abc" | Fresh account | 400 Bad Request; min length 8 | Response code 400 |
| TC-FR01-027 | Password - Too Short (7) | "Test User" / "email@hw06.test" / "Pass12!" | Fresh account | 400 Bad Request; min length 8 | Response code 400 |
| TC-FR01-028 | Password - No Uppercase | "Test User" / "email@hw06.test" / "password123!" | Fresh account | 400 Bad Request; complexity | Response code 400 or 200 (check spec) |
| TC-FR01-029 | Password - No Digit | "Test User" / "email@hw06.test" / "Password!" | Fresh account | 400 Bad Request; complexity | Response code 400 or 200 |
| TC-FR01-030 | Password - No Special | "Test User" / "email@hw06.test" / "Password123" | Fresh account | 400 Bad Request; complexity | Response code 400 or 200 |
| TC-FR01-031 | Password - Only Spaces | "Test User" / "email@hw06.test" / "        " | Fresh account | 400 Bad Request; whitespace | Response code 400 |
| TC-FR01-032 | Password - Very Long (500) | "Test User" / "email@hw06.test" / "Pass" * 125 | Fresh account | 400 Bad Request; length limit | Response code 400 |
| TC-FR01-033 | Schema - Empty Body | (empty JSON {}) | Fresh account | 400 Bad Request; missing fields | Response code 400 |
| TC-FR01-034 | Schema - Extra Fields | "Test" / "email@hw06.test" / "Password123!" + {"extra":"field"} | Fresh account | 200 OK (ignore extra) or 400 | Check strict schema |
| TC-FR01-035 | State - New Account | "Alice" / "alice@hw06.test" / "Password123!" | No prior account | 200 OK; id issued | Response code 200; id is integer |
| TC-FR01-036 | State - Duplicate Email (Known Bug) | "Bob" / "bob@hw06.test" / "Password123!" | bob@hw06.test already exists | **Should reject (400)** but **SUT inserts 2nd row + 200** | Response code **200** (BUG) |
| TC-FR01-037 | Security - Plaintext Pwd Leak | "Charlie" / "charlie@hw06.test" / "SecurePass123!" | After registration via /login | Expect password NOT visible in /api/users/me | Check /users/me response |
| TC-FR01-038 | Security - Mass Register | Same email base, +1/+2 variations × 100 rapid | No auth/rate limit | 200 OK but flood server | Observe if rate-limit applied |
| TC-FR01-039 | Security - SQL Injection in Name | "'; DROP TABLE users; --" / "email@hw06.test" / "Password123!" | Fresh account | 400 Bad Request; no injection | Verify table still exists post-test |
| TC-FR01-040 | Security - SQL Injection in Password | "Test User" / "email@hw06.test" / "Pass' OR '1'='1" | Fresh account | 400 Bad Request or 200 (parameterized) | Check if stored safely |

---

## Notes

- **Spec §1.1 Success:** Exact schema `{message:"User registered successfully", id:<int>}` on HTTP 200
- **Duplicate Email:** Brief notes "SUT has **no unique constraint** → actually inserts a second row and returns 200 — that is a spec bug"
- **Plaintext Leak:** Brief notes "plaintext-password exposure via subsequent login/`/users/me`"
- **Rate Limit:** Not mentioned in spec; test for observed behavior
- **SQL Injection:** Parameterized queries prevent injection; expect 400 or sanitization
- **XSS:** Email field should validate format or sanitize

---

## Generation Process

**Prompt 1 (Name Partition):**
```
Generate exhaustive domain partitions for the "name" field in POST /api/register:
- valid name
- empty string
- missing field
- very long (300+ chars)
- unicode characters
- whitespace-only
- numeric-only
- special characters
Map each to expected HTTP status per spec. Use test IDs TC-FR01-001 through TC-FR01-008.
```

**Prompt 2 (Email Partition):**
```
Generate exhaustive domain partitions for the "email" field in POST /api/register:
- valid email
- empty / missing
- malformed (no @, no domain, no TLD)
- whitespace (leading/trailing)
- duplicate of existing
- SQL injection attempts (' OR '1'='1, UNION SELECT)
- XSS attempts (<script>, onclick)
- very long (320+ chars)
Map each to expected HTTP status per spec. Use test IDs TC-FR01-009 through TC-FR01-022.
```

**Prompt 3 (Password Partition):**
```
Generate exhaustive domain partitions for the "password" field in POST /api/register:
- valid password (per spec complexity)
- empty / missing
- too short (< 8 chars)
- no uppercase
- no digit
- no special character
- only spaces
- very long (500+ chars)
Map each to expected HTTP status per spec. Use test IDs TC-FR01-023 through TC-FR01-032.
```

**Prompt 4 (Schema & State):**
```
Generate test cases for:
(a) Schema validation: empty body, extra fields
(b) Account state: new account vs duplicate email (noting the spec bug)
(c) Security: plaintext password leak, mass registration, SQL injection in all fields
Use test IDs TC-FR01-033 through TC-FR01-040.
Expected outcomes per spec §1.1 and security best practices.
```
