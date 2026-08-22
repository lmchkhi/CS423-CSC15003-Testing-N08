---
name: api-test-generator
description: >
  Generates a complete API test suite (TC-* Markdown table + *-cases.json data file)
  for a given endpoint using a step-by-step technique: domain partitions → security
  rules (SEC-01–07) → schema oracle → state transitions → audit → extend.
  Use this skill whenever you need to author ≥ 35 AI-generated test cases for a new
  API endpoint in the HW06 pipeline (or any black-box REST API testing task).
---

# API Test Generator — Skill Instructions

## When to Activate

Activate this skill when:
- You need to generate ≥ 35 black-box test cases for a REST API endpoint.
- You need to produce both a human-readable `ai-generated.md` table AND a
  machine-readable `*-cases.json` data file for Newman.
- You want to ensure coverage across all four HW06 dimensions: domain partitions,
  security (SEC-01–07), schema validation, and state transitions.

## Reference files

- Design diagram: `diagrams/test-generator.png` (self-drawn, see §7 / §11)
- Editable diagram source: `diagrams/test-generator.drawio`
- Pseudocode reference: `reports/test-generator-design.md`

---

## 7-Stage Pipeline (run each stage in order, one prompt at a time)

### Stage 1 — `parse_spec`: Read the endpoint contract

**Prompt pattern:**
> "Given `api-specification.md`, extract the full contract for `{METHOD} {path}`:
> list every request parameter (name, type, required, constraints), the auth
> requirement, the success response (HTTP status + body schema), and the
> documented error responses. Present as a structured table."

**Output to capture:** Parameter table + schemas → kept in context for Stage 2–5.

---

### Stage 2 — `partition_param`: Domain-partition every parameter

Apply these partitions per parameter type. Run one prompt per parameter.

**String/text parameters** (name, category name, shipping_address…):
| Partition | Representative value |
|-----------|---------------------|
| valid | `"Nguyễn Văn A"` |
| empty string | `""` |
| missing field | *(omit key from body)* |
| very long (300+ chars) | `"a" * 300` |
| unicode | `"Đồng hồ thông minh 智能手表"` |
| whitespace-only | `"   "` |
| numeric-only | `"12345"` |
| special chars | `"!@#$%^&*()"` |
| SQL meta | `"'; DROP TABLE t; --"` |
| XSS | `"<script>alert(1)</script>"` |

**Email parameters:**
| Partition | Value |
|-----------|-------|
| valid | `"user@example.com"` |
| no @ | `"userexample.com"` |
| no domain | `"user@"` |
| no TLD | `"user@domain"` |
| leading space | `" user@example.com"` |
| duplicate | same email used in prior registration |
| very long (320+) | `"a"*310 + "@test.com"` |

**Password parameters:**
| Partition | Value |
|-----------|-------|
| valid (complexity met) | `"Password123!"` |
| too short (<8) | `"Aa1!"` |
| no uppercase | `"password1!"` |
| no digit | `"Password!"` |
| no special char | `"Password1"` |
| only spaces | `"        "` |
| very long (500+) | `"A"*500` |

**Numeric parameters** (total_amount, price…):
`positive` / `zero` / `negative` / `missing` / `non-numeric string` / `float` / `huge (10^12)` / `boundary (1)`.

**Prompt pattern:**
> "For the `{param_name}` parameter of `{METHOD} {path}`, generate one test case
> per partition: {partition list}. For each, state the input value, the expected
> HTTP status per spec, and whether the SUT actually validates it (flag as
> `knownBug: true` if the SUT is known to accept invalid input). Use TC IDs
> starting at TC-{FR}-{seq:03d}."

---

### Stage 3 — `security_cases`: Apply SEC-01 → SEC-07

Run as a **single prompt** after the partition cases are done.

**Prompt pattern:**
> "Generate security test cases for `{METHOD} {path}` covering:
> SEC-01 SQL injection in each string field (assert neutralised — parameterized
>   queries; expected 200 if the field is otherwise valid, or 400 if invalid).
> SEC-02 XSS payload in each string field (assert no script execution evidence).
> SEC-03 Missing auth token → expected 401 (if endpoint requires auth).
> SEC-04 Malformed/expired token → expected 401 or 403.
> SEC-05 Non-admin user on admin-only endpoint → expected 403 (note if SUT
>   returns 200 = broken access control bug).
> SEC-06 IDOR — access another user's resource without being its owner → 403/404.
> SEC-07 Mass assignment — extra privileged fields in body (e.g. role:'admin') →
>   assert they are ignored."

---

### Stage 4 — `schema_cases`: Schema oracle validation

**Prompt pattern:**
> "Generate test cases that assert the exact response schema:
> (a) Success case: body must be exactly `{success_schema}`, no extra/missing keys.
> (b) Error case: body must have a `message` string key; assert HTTP status matches.
> (c) Content-Type: assert response header `Content-Type: application/json`."

---

### Stage 5 — `state_cases`: Model state transitions (if applicable)

Only if the endpoint creates/modifies a resource with a defined lifecycle.

**Prompt pattern:**
> "Model the state machine for `{resource}` starting from `{METHOD} {path}`.
> List every legal transition (A→B: expected 200) and every illegal transition
> (A→C: expected 400/422). Generate one test case per edge, noting which illegal
> transitions the SUT incorrectly accepts (knownBug: true)."

---

### Stage 6 — Audit: `VALID / INVALID / INCOMPLETE`

After Stage 1–5 produce the AI-generated table, you review each case:

**Prompt pattern:**
> "Review each of the {N} test cases above. For each, assign one label:
> - VALID: the expected outcome is correct per the spec and SUT behaviour.
> - INVALID: the expected outcome is wrong — provide the corrected oracle.
> - INCOMPLETE: the case is missing context or assertions — describe what's needed.
> Pay special attention to: cases that assume validation the SUT doesn't perform
> (flag as INVALID + note the bug), and security cases that assume injection
> succeeds (SUT uses parameterised queries → injection is neutralised, not
> exploited)."

Save results to `audit.md`.

---

### Stage 7 — Extend: ≥ 5 student-added cases

Add at minimum 5 cases the AI did not generate, each annotated with
"Why AI missed this:". Common gaps found in this project:

1. **Duplicate-email accepted** — AI assumes 409; SUT inserts second row and returns 200.
2. **Empty body `{}`** — AI omits this; SUT may insert NULLs.
3. **Plaintext password disclosure** — AI does not follow the chain to `/api/login` response.
4. **Non-admin role escalation** — AI assumes 403; SUT returns 200.
5. **PUT/DELETE on non-existent ID** — AI assumes 404; SUT returns 200.

---

## Output Contract

### `ai-generated.md`

```markdown
# AI-Generated Test Cases — {FR} {Endpoint}

| ID | Category | Input | Precondition | Expected (spec) | Oracle |
|----|----------|-------|-------------|----------------|--------|
| TC-FR01-001 | domain/name | valid name | clean DB | 200 {message,id} | PASS |
...
```

Minimum ≥ 35 rows; IDs sequential `TC-{FR}-{NNN}`.

### `*-cases.json`

```json
[
  {
    "_desc": "valid registration",
    "name": "Nguyen Van A",
    "email": "valid@test.com",
    "password": "Password123!",
    "expectStatus": 200,
    "expectSchema": true,
    "knownBug": false
  },
  {
    "_desc": "duplicate email — knownBug",
    "name": "Dupe",
    "email": "existing@test.com",
    "password": "Password123!",
    "expectStatus": 409,
    "expectSchema": false,
    "knownBug": true
  }
]
```

---

## Worked Example — FR-14 `POST /api/categories`

**Stage 1 output (spec parse):**
- `name`: string, required. No documented constraint.
- Auth: `authenticateToken` (any valid JWT — bug: no admin-role check).
- Success: 200 `{message: "Category created", id: <int>}`.
- Error: 400/401 with `{message: <string>}`.

**Stage 2 — name partitions (10 cases):**
valid · empty · missing · very-long(300) · unicode · whitespace-only · duplicate · SQL-meta · XSS · numeric-only.

**Stage 3 — security (7 cases):**
SEC-01 SQL in name (200, neutralised) · SEC-02 XSS in name (200, stored but not executed) · SEC-03 no token (401) · SEC-04 bad token (401) · SEC-05 user-token create (200 = BUG-FR14-001) · SEC-06 N/A (non-personal resource) · SEC-07 extra `isAdmin` field (ignored).

**Stage 4 — schema (2 cases):**
Success schema `{message,id}` · error schema `{message}`.

**Stage 5 — lifecycle (5 cases):**
create→list-contains · list-contains→rename → list-reflects → delete → list-absent.

**Stage 6 — audit highlights:**
- AI assumed SEC-05 returns 403 (INVALID → corrected to 200, knownBug: true).
- AI assumed duplicate name returns 409 (INVALID → corrected to 200, knownBug: true).

**Stage 7 — 5 student cases:**
1. Non-admin user creates category → 200 (bug).
2. Non-admin user deletes category → 200 (bug).
3. PUT non-existent id 999999 → 200 (bug, not 404).
4. DELETE non-existent id 999999 → 200 (bug, not 404).
5. Empty name accepted → 200 (bug, not 400).
