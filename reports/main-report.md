# HW06 – Báo cáo Kiểm thử API

**Sinh viên:** Hà Bảo Ngọc — **23127300**, nhóm N08  
**Môn học:** CS423 / CSC15003 – Kiểm thử Phần mềm  
**Ngày nộp:** 2026-08-20  
**Nhánh:** `HW06/23127300`  
**Repo:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08

---

## 1. Tổng quan

Báo cáo ghi lại pipeline kiểm thử API cho ba API của hệ thống EShop:

| Pool | FR | Endpoint | Lý do chọn |
|------|----|----------|------------|
| A | FR-01 | `POST /api/register` | Tham số phong phú (name/email/password); oracle rõ ràng; surface bảo mật (SQL, plaintext password) |
| B | FR-08 | `POST /api/checkout` | Giao dịch yêu cầu auth; mô hình trạng thái FR-10; IDOR qua `/api/orders/:id` |
| C | FR-14 | `GET/POST/PUT/DELETE /api/categories` | CRUD lifecycle; broken access control; missing-resource contract |

**Kết quả tổng hợp:**

| API | Cases thiết kế (AI+SV) | Newman assertions | Pass | Fail | Bugs |
|-----|---------------|---------------|------|------|------|
| FR-01 Register | 46 (40+6) | 45 | 45 | 0 | 3 |
| FR-08 Checkout | 40 (35+5) | 76 | 76 | 0 | 3 |
| FR-14 Category | 47 (40+7) | 112 | 112 | 0 | 4 |
| **TOTAL** | **133** | **233** | **233** | **0** | **10** |

> Suite chạy **xanh**: assertion của case known-bug kiểm hành vi quan sát được của SUT
> (gắn nhãn `[BUG-*]`); 10 lệch chuẩn được đếm ở cột Bugs và mô tả expected-vs-actual bên dưới.

---

## 2. Anti-cheat — Header `X-Student-Id`

Mọi request trong collection đều mang header `X-Student-Id: 23127300` thông qua pre-request script ở cấp collection:

```javascript
// Collection-level pre-request script
pm.request.headers.upsert({ key: 'X-Student-Id', value: '23127300' });
console.log('[HW06] X-Student-Id =', '23127300', '→', pm.request.url.toString());
```

Bằng chứng: file `reports/hw06-auth-bootstrap-evidence.log` ghi lại console output của Newman khi chạy folder `FR-08 State & Security`, xác nhận dòng `[HW06] X-Student-Id = 23127300` xuất hiện trong **mọi** request tại `localhost:3000` (11/11 assertion pass). Chạy lại bất kỳ folder nào cũng in dòng này vì script nằm ở cấp collection.

---

## 3. Pipeline từng API

### 3.1 FR-01 `POST /api/register`

#### Bước 1: AI-generate (step-by-step)

Sử dụng 4 prompt riêng biệt (xem `reports/prompt-log.md`):
1. Phân vùng tham số `name` → 8 cases (TC-FR01-001–008)
2. Phân vùng tham số `email` → 14 cases (TC-FR01-009–022)
3. Phân vùng tham số `password` → 10 cases (TC-FR01-023–032)
4. Schema + bảo mật + trạng thái → 8 cases (TC-FR01-033–040)

Tổng: **40 cases** (`test-cases/FR-01-register/ai-generated.md`)

#### Bước 2: Audit

Kết quả audit (`test-cases/FR-01-register/audit.md`):
- **VALID:** 27 cases — oracle đúng per spec và SUT behaviour
- **INVALID:** 9 cases — AI assume validation mà SUT không có (duplicate email → 409, weak password → 400); corrected to `knownBug: true`
- **INCOMPLETE:** 4 cases — thiếu assertion schema hoặc precondition

Lỗi điển hình của AI: giả sử SUT có UNIQUE constraint trên email (không có), giả sử password complexity validation (không có).

#### Bước 3: Extend — 5 cases sinh viên

File: `test-cases/FR-01-register/extended.md`

| ID | Mô tả | Lý do AI bỏ qua |
|----|-------|----------------|
| TC-FR01-EXT-001 | Duplicate email accepted → 200 (bug) | AI assume UNIQUE constraint |
| TC-FR01-EXT-002 | Empty body `{}` → inserts NULL row (200) | AI assume required-field check |
| TC-FR01-EXT-003 | Plaintext password lộ qua `/api/login` response | AI không follow auth chain |
| TC-FR01-EXT-004 | Weak password `123` accepted → 200 (bug) | AI assume complexity validation |
| TC-FR01-EXT-005 | Whitespace-only email accepted → 200 (bug) | AI assume format validation |

#### Bước 4–6: Thực thi Newman

Data file: `api/data/register-cases.json` (42 rows)  
Newman command: `bash api/scripts/run-fr01.sh`  
Report: `api/newman/fr01-register-report.html`

**Kết quả:** FR-01 Register — 45 assertions, 45 pass, 0 fail (data-driven, `register-cases.json`). 3 bug được ghi ở §2.4.

#### Bước 7: Bug reports

| Bug ID | Mô tả | Severity |
|--------|-------|----------|
| BUG-FR01-001 | Duplicate email accepted (no uniqueness constraint) | High |
| BUG-FR01-002 | No input validation (empty/weak inputs accepted) | High |
| BUG-FR01-003 | Plaintext password disclosed by `/api/login` + `/api/users/me` | Critical |

Issues: #252, #253, #254 trên GitHub.

---

### 3.2 FR-08 `POST /api/checkout`

#### Bước 1: AI-generate

Sử dụng prompt phân vùng `total_amount` (8 cases), `shipping_address` (5 cases), auth partition (3 cases), state-machine FR-10 (10 cases), IDOR (2 cases), schema (3 cases) → **35+ cases** (`test-cases/FR-08-checkout/ai-generated.md`).

#### Bước 2: Audit

- **INVALID:** AI assume `total_amount ≤ 0` bị reject (thực tế SUT chấp nhận); AI assume `GET /api/orders/:id` yêu cầu auth (thực tế không có); AI bỏ qua `canceled→delivered` illegal transition.

#### Bước 3: Extend — 5 cases sinh viên

| ID | Mô tả | Lý do AI bỏ qua |
|----|-------|----------------|
| TC-FR08-EXT-001 | IDOR: GET /api/orders/:id không cần token → 200 (bug) | AI assume auth required |
| TC-FR08-EXT-002 | Negative total_amount accepted → 200 (bug) | AI assume validation |
| TC-FR08-EXT-003 | canceled→delivered illegal transition accepted → 200 (bug) | AI không model terminal states |
| TC-FR08-EXT-004 | Checkout với empty body → 500 (unexpected error) | AI không test edge body |
| TC-FR08-EXT-005 | String total_amount "abc" → coerced to 0 or 500 | AI không test type coercion |

#### Bước 4–6: Thực thi Newman

Data file: `api/data/checkout-cases.json` (15 rows) + non-data-driven state machine requests  
Newman command: `bash api/scripts/run-fr08.sh`  
Report: `api/newman/fr08-checkout-report.html` (3.1 MB)

**Kết quả:** FR-08 — folder Checkout (data-driven) 65 assertions + folder State & Security 11 assertions = **76 pass, 0 fail**. Case known-bug (total_amount không validate, IDOR, canceled→delivered) assert hành vi quan sát, gắn nhãn `[BUG-*]`.

#### Bước 7: Bug reports

| Bug ID | Mô tả | Severity |
|--------|-------|----------|
| BUG-FR08-001 | IDOR: GET /api/orders/:id không yêu cầu auth | Critical |
| BUG-FR08-002 | Không validate total_amount (negative accepted) | Critical |
| BUG-FR08-003 | Illegal state transition canceled→delivered accepted | Critical |

Issues: #255, #256, #257 trên GitHub.

---

### 3.3 FR-14 `GET/POST/PUT/DELETE /api/categories`

#### Bước 1: AI-generate

Phân vùng `name` (10 cases), access control (3 cases), lifecycle CRUD (5 cases), missing-resource contract (4 cases), schema (4 cases), security (4 cases) → **≥35 cases** (`test-cases/FR-14-category/ai-generated.md`).

#### Bước 2: Audit

- **INVALID:** AI assume admin-role middleware (thực tế `authenticateToken` chỉ check token, không check role); AI assume PUT/DELETE non-existent id → 404 (SUT trả 200).

#### Bước 3: Extend — 5 cases sinh viên

| ID | Mô tả | Lý do AI bỏ qua |
|----|-------|----------------|
| TC-FR14-EXT-001 | Non-admin user creates category → 200 (role escalation bug) | AI assume RBAC |
| TC-FR14-EXT-002 | Non-admin user deletes category → 200 (role escalation bug) | AI assume RBAC |
| TC-FR14-EXT-003 | PUT /api/categories/999999 → 200 (not 404) | AI assume affectedRows check |
| TC-FR14-EXT-004 | DELETE /api/categories/999999 → 200 (not 404) | AI assume affectedRows check |
| TC-FR14-EXT-005 | Duplicate category name accepted → 200 (not 409) | AI assume UNIQUE constraint |

#### Bước 4–6: Thực thi Newman

Data file: `api/data/fr14-post-categories.csv` (17 rows)  
Newman command: `bash api/scripts/run-fr14.sh`  
Report: `api/newman/fr14-category-report.html` (56 KB)

**Kết quả:** FR-14 — folder Category CRUD (data-driven) 95 assertions + folder Lifecycle & Access 17 assertions = **112 pass, 0 fail**. Broken access control, missing-resource 404, trùng tên, tên rỗng đều assert observed + gắn nhãn `[BUG-*]`.

#### Bước 7: Bug reports

| Bug ID | Mô tả | Severity |
|--------|-------|----------|
| BUG-FR14-001 | Broken access control: non-admin CRUD categories | Critical |
| BUG-FR14-002 | PUT/DELETE non-existent ID returns 200 (not 404) | Medium |
| BUG-FR14-003 | Duplicate category names accepted (no uniqueness) | Low |
| BUG-FR14-004 | Empty/whitespace category name accepted | Medium |

---

## 4. Tính năng Postman sử dụng

| Tính năng | Mô tả sử dụng |
|-----------|--------------|
| Collection & Folders | 1 collection, 4 folders (Auth Bootstrap, FR-01, FR-08, FR-14) |
| Environment | `local.postman_environment.json`: `baseUrl`, `studentId`, `userToken`, `adminToken`, `lastOrderId`, `lastCategoryId` |
| Collection-level pre-request script | Upsert `X-Student-Id: 23127300` vào mọi request (anti-cheat §11) |
| Folder-level pre-request script | Build dynamic request body từ iteration data |
| Test scripts (`pm.test`) | Assert status code, schema, known-bug pattern |
| Dynamic variables | `{{$timestamp}}`, `{{$guid}}` để generate unique emails |
| Data-driven Collection Runner | `-d register-cases.json`, `-d checkout-cases.json`, `-d fr14-post-categories.csv` |
| Newman CLI | `newman run ... -r cli,htmlextra` headless execution |
| `newman-reporter-htmlextra` | HTML report với request/response logs, failure highlights |
| Chained requests | Auth Bootstrap → capture token → downstream folders |
| Environment variable setters | `pm.environment.set('userToken', ...)` để pass state giữa requests |
| Monitors (documented) | Schedule: run full suite daily at 00:00 UTC; URL: `localhost` (no cloud) |
| Mock server (documented) | `GET /api/products` → mock `[{id:1,name:"Phone",price:500000}]`; dùng để test offline |

---

## 5. Mapping phạm vi kiểm thử

| FR | Spec section | Endpoints | Covered by |
|----|-------------|-----------|-----------|
| FR-01 | §1.1 User Registration | `POST /api/register` | Task 3, collection folder "FR-01 Register" |
| FR-08 | §4.1 Checkout | `POST /api/checkout` | Task 4, collection folder "FR-08 Checkout" |
| FR-10 | §4.3 Order Status | `PUT /api/admin/orders/:id/status` | Task 4 (state machine cases) |
| FR-14 | §6 Category Management | `GET/POST/PUT/DELETE /api/categories` | Task 5, collection folder "FR-14 Category" |

---

## 6. Artifacts

| Artifact | Đường dẫn |
|----------|-----------|
| Postman collection | `api/collections/eshop-hw06.postman_collection.json` |
| Environment | `api/environments/local.postman_environment.json` |
| Data files | `api/data/register-cases.json`, `checkout-cases.json`, `fr14-post-categories.csv` |
| Newman HTML reports | `api/newman/fr01-register-report.html`, `fr08-checkout-report.html`, `fr14-category-report.html` |
| Test cases (MD) | `test-cases/FR-{01,08,14}-*/ai-generated.md`, `audit.md`, `extended.md` |
| Test summary | `reports/test-summary.xlsx` (133 cases thiết kế, 233 assertions, 10 bugs) |
| Bug reports | `bug-reports/BUG-FR{01,08,14}-*.md` |
| CI/CD | `.github/workflows/hw06-newman.yml`, `reports/ci-cd-report.md` |
| Agent Skill | `.claude/skills/api-test-generator/SKILL.md` |
| Design diagram | `diagrams/test-generator.png` (self-drawn), `.mmd`, `.py` |
