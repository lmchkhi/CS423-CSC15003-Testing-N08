# Prompt Log — HW06 API Testing

**Student:** Hà Bảo Ngọc (23127300)  
**Course:** CS423-CSC15003 Software Testing (N08)  
**Submitted:** 2026-08-20

---

## Task 3: FR-01 Register Test Cases

### Step 1: AI-Generate Test Cases

**Prompt 1: Name Field Partitions**
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

**Prompt 2: Email Field Partitions**
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

**Prompt 3: Password Field Partitions**
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

**Prompt 4: Schema & Security**
```
Generate test cases for:
(a) Schema validation: empty body, extra fields
(b) Account state: new account vs duplicate email (noting the spec bug)
(c) Security: plaintext password leak, mass registration, SQL injection in all fields
Use test IDs TC-FR01-033 through TC-FR01-040.
Expected outcomes per spec §1.1 and security best practices.
```

**Result:** `test-cases/FR-01-register/ai-generated.md` — 40 test cases covering all domains + schema + security + state partitions.
