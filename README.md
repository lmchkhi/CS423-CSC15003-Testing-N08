# HW06 – API Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc – 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 – Kiểm thử Phần mềm
> **Phạm vi:** 3 API được phân công — FR-01 `POST /api/register`, FR-08 `POST /api/checkout`, FR-14 categories CRUD (`GET/POST/PUT/DELETE /api/categories`).
> **Công cụ:** Postman (collection v2.1) · Newman + newman-reporter-htmlextra · GitHub Actions

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---:|
| 1 | API 1 — FR-01 Register — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 2 | API 2 — FR-08 Checkout — full pipeline (same criteria) | 30 | 30 |
| 3 | API 3 — FR-14 Category CRUD — full pipeline (same criteria) | 30 | 30 |
| 4 | Agent Skill — AI-driven API test generator (G9.5) | 10 | 10 |
| | **Tổng** | **100** | **100** |

---

## 2. Test Summary Report

### 2.1. API và pipeline

| API | Endpoint | Auth | Pipeline |
|---|---|---|---|
| FR-01 Register | `POST /api/register` | none | generate → audit → extend → Newman → bug |
| FR-08 Checkout | `POST /api/checkout` (+ `GET /api/orders/:id`, `PUT /api/admin/orders/:id/status`) | Bearer (user/admin) | generate → audit → extend → Newman → bug |
| FR-14 Category | `GET/POST/PUT/DELETE /api/categories` | Bearer (CUD) | generate → audit → extend → Newman → bug |

### 2.2. Số lượng test case

| API | AI-generated | Sinh viên bổ sung | Tổng thiết kế | File |
|---|---:|---:|---:|---|
| FR-01 Register | 40 | 6 | 46 | `test-cases/FR-01-register/` |
| FR-08 Checkout | 35 | 5 | 40 | `test-cases/FR-08-checkout/` |
| FR-14 Category | 40 | 7 | 47 | `test-cases/FR-14-category/` |
| **Tổng** | **115** | **18** | **133** | `test-cases/test-summary.xlsx` |

Đều vượt sàn §6.1 (≥35 AI-generated / API) và §6.3 (≥5 sinh viên bổ sung / API).

### 2.3. Thực thi (Newman)

Chạy gộp headless bằng Newman trên SUT `http://localhost:3000` (mọi request gắn
`X-Student-Id: 23127300` qua pre-request script cấp collection — §11):

| Chỉ số | Giá trị |
|---|---:|
| Requests | 25 |
| Assertions | 28 |
| Assertion fail | 9 — **phản ánh bug thật của SUT** (validation/auth/state thiếu), không phải nhiễu |
| Report | `api/newman/full-run-report.html` · `full-run-report.json` |
| Report theo API | `api/newman/fr01-register-report.html` · `fr08-checkout-report.html` · `fr14-category-report.html` |

Các assertion "fail" là tín hiệu: chúng mã hoá kỳ vọng đúng-đặc-tả, còn SUT triển
khai sai — đó chính là các bug bên dưới. Row known-bug trong data file được đánh dấu
`knownBug` và đối chiếu hành vi quan sát.

### 2.4. Bug (black-box oracle)

| ID | Mô tả | Severity | Báo cáo | GitHub Issue |
|---|---|---|---|---|
| BUG-FR01-001 | Email trùng được chấp nhận (không có ràng buộc unique) | Major | `bug-reports/BUG-FR01-001.md` | [#252](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/252) |
| BUG-FR01-002 | Không validate input (empty/weak password được nhận) | Major | `bug-reports/BUG-FR01-002.md` | [#253](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/253) |
| BUG-FR01-003 | Lộ mật khẩu plaintext qua login/users | Critical | `bug-reports/BUG-FR01-003.md` | [#254](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/254) |
| BUG-FR08-001 | IDOR trên `GET /api/orders/:id` (không token vẫn đọc được) | Critical | `bug-reports/BUG-FR08-001.md` | [#255](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/255) |
| BUG-FR08-002 | `total_amount` không validate (âm/chuỗi được nhận) | Critical | `bug-reports/BUG-FR08-002.md` | [#256](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/256) |
| BUG-FR08-003 | Chuyển trạng thái đơn sai luật `canceled→delivered` được chấp nhận | Critical | `bug-reports/BUG-FR08-003.md` | [#257](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/257) |
| BUG-FR14-001 | Broken access control — user thường CRUD được danh mục | Critical | `bug-reports/BUG-FR14-001.md` | *(cần tự mở issue)* |
| BUG-FR14-002 | PUT/DELETE `id` không tồn tại vẫn trả 200 (không 404) | Major | `bug-reports/BUG-FR14-002.md` | *(cần tự mở issue)* |
| BUG-FR14-003 | Tên danh mục trùng được chấp nhận (không unique) | Minor | `bug-reports/BUG-FR14-003.md` | *(cần tự mở issue)* |
| BUG-FR14-004 | Tên danh mục rỗng/khoảng-trắng được chấp nhận | Medium | `bug-reports/BUG-FR14-004.md` | *(cần tự mở issue)* |

**Tổng số:** 10 bug (black-box, chỉ dùng bằng chứng hành vi quan sát — không tham chiếu mã nguồn SUT).

### 2.5. Postman features đã dùng

Workspace · collection · folders (per-API + `0 - Auth Bootstrap`) · collection + environment
variables · environment · pre-request scripts (header anti-cheat + auth-mode selector) ·
test scripts · data-driven Collection Runner (`-d` data files) · Newman CLI + htmlextra
reporter · dynamic variables `{{$guid}}` / `{{$timestamp}}`. Chi tiết: `reports/main-report.md`.

### 2.6. CI/CD

GitHub Actions (`.github/workflows/hw06-newman.yml`) boot SUT + chạy Newman headless trên
mỗi push. Hai run mẫu (pass / fail) và cấu hình: `reports/ci-cd-report.md`.

### 2.7. Video demo

| Nội dung | Link |
|---|---|
| Agent Skill demo (§7) — kịch bản tại `reports/demo-video-script.md` | *(cập nhật link YouTube sau khi quay)* |

---

## 3. Cấu trúc repo

| Đường dẫn | Nội dung |
|---|---|
| `api/collections/` | Postman collection `.json` (3 folder API + auth bootstrap) |
| `api/environments/` | Environment local (`baseUrl`, `studentId`, tokens, ids) |
| `api/data/` | Data file data-driven cho từng API (`*-cases.json`, `.csv`) |
| `api/newman/` | Newman HTML/JSON report — theo API và full-run |
| `api/scripts/` | `boot-sut.sh`, `run-api.sh`, `run-all.sh` |
| `test-cases/FR-{01,08,14}-*/` | `ai-generated.md`, `audit.md`, `extended.md` |
| `test-cases/test-summary.xlsx` | Bảng tổng hợp case + summary |
| `reports/main-report.md` | Báo cáo chính (pipeline từng API) |
| `reports/ci-cd-report.md` | Cấu hình pipeline + 2 run mẫu |
| `reports/ai-audit-report.md`, `prompt-log.md`, `ai-critique.md` | Phụ lục AI bắt buộc (§9, §10) |
| `reports/test-generator-design.md` | Thiết kế Agent Skill sinh test (§7) |
| `reports/demo-video-script.md` | Kịch bản video demo |
| `reports/pdf/` | Bản PDF (sinh bằng `python3 reports/tools/build-pdfs.py`) |
| `bug-reports/` | Bug report black-box + ảnh GitHub Issue |
| `diagrams/` | `test-generator.mmd` / `.py` / `.md` (+ `.png` self-drawn — §11) |
| `.claude/skills/api-test-generator/` | Agent Skill (§7) |
| `.github/workflows/hw06-newman.yml` | CI Newman |
| `api-specification.md` | Đặc tả API EShop — oracle cho assertion |
| `system-requirements.md` | Đặc tả yêu cầu hệ thống (bản đầy đủ) |
| `git-log.txt` | Git commit log (§12) |

---

## 4. Liên kết

| Mục | Link |
|---|---|
| GitHub repository | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08 (branch `HW06/23127300`) |
| SUT | https://github.com/ttbhanh/eshop-sut |
| GitHub Issues | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues (nhãn `Module: Register / Checkout / Category CRUD`) |
| GitHub Actions | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions |
