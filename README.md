# HW06 – API Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc – 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 – Kiểm thử Phần mềm
> **Phạm vi:** 3 API được phân công — FR-01 `POST /api/register`, FR-08 `POST /api/checkout`, FR-14 categories CRUD (`GET/POST/PUT/DELETE /api/categories`).
> **Công cụ:** Postman (collection v2.1) · Newman + newman-reporter-htmlextra · GitHub Actions

---

## 1. Bảng tự đánh giá

| No. | Tiêu chí | Điểm tối đa | Tự đánh giá |
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
| FR-01 Register | 40 | 5 | 45 | `test-cases/FR-01-register/` |
| FR-08 Checkout | 35 | 5 | 40 | `test-cases/FR-08-checkout/` |
| FR-14 Category | 40 | 7 | 47 | `test-cases/FR-14-category/` |
| **Tổng** | **115** | **17** | **132** | `test-cases/test-summary.xlsx` |

Đều vượt sàn §6.1 (≥35 AI-generated / API) và §6.3 (≥5 sinh viên bổ sung / API).

### 2.3. Thực thi (Newman)

Chạy headless bằng Newman trên SUT `http://localhost:3000` (mọi request gắn
`X-Student-Id: 23127300` qua pre-request script cấp collection — §11). Mỗi API tách
thành folder data-driven (chạy với data file) và folder state/lifecycle (chạy một lần):

| Folder | Requests | Assertions | Failed | Report |
|---|---:|---:|---:|---|
| FR-01 Register | 45 | 45 | 0 | `api/newman/fr01-register-report.html` |
| FR-08 Checkout | 60 | 65 | 0 | `api/newman/fr08-checkout-report.html` |
| FR-08 State & Security | 11 | 11 | 0 | `api/newman/fr08-state-report.html` |
| FR-14 Category CRUD | 85 | 95 | 0 | `api/newman/fr14-category-report.html` |
| FR-14 Lifecycle & Access | 12 | 17 | 0 | `api/newman/fr14-lifecycle-report.html` |
| **Tổng** | **213** | **233** | **0** | — |

Suite chạy **xanh hoàn toàn**: assertion của case known-bug được viết để kiểm **hành
vi quan sát được** của SUT (ví dụ `[BUG-FR14-001] user thường tạo danh mục → 200`) và
được gắn nhãn `[BUG-*]`; các lệch chuẩn được đếm riêng ở bảng bug (§2.4) và mô tả
expected-vs-actual trong `reports/main-report.md`. Row known-bug trong data file đánh
dấu `knownBug`.

### 2.4. Bug (black-box oracle)

| ID | Mô tả | Severity | Báo cáo | GitHub Issue |
|---|---|---|---|---|
| BUG-FR01-001 | Email trùng được chấp nhận (không có ràng buộc duy nhất) | Major | `bug-reports/BUG-FR01-001.md` | [#252](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/252) |
| BUG-FR01-002 | Không kiểm tra dữ liệu đầu vào (mật khẩu rỗng/yếu vẫn được nhận) | Major | `bug-reports/BUG-FR01-002.md` | [#253](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/253) |
| BUG-FR01-003 | `/api/login` và `/api/users/me` trả về trường `password` plaintext | Critical | `bug-reports/BUG-FR01-003.md` | [#254](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/254) |
| BUG-FR08-001 | IDOR trên `GET /api/orders/:id` (không token vẫn đọc được) | Critical | `bug-reports/BUG-FR08-001.md` | [#255](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/255) |
| BUG-FR08-002 | `total_amount` không được kiểm tra (âm/chuỗi vẫn được nhận) | High | `bug-reports/BUG-FR08-002.md` | [#256](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/256) |
| BUG-FR08-003 | Chuyển trạng thái đơn sai luật `canceled→delivered` được chấp nhận | High | `bug-reports/BUG-FR08-003.md` | [#257](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/257) |
| BUG-FR14-001 | Lỗi phân quyền — user thường CRUD được danh mục | Critical | `bug-reports/BUG-FR14-001.md` | [#261](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/261) |
| BUG-FR14-002 | PUT/DELETE `id` không tồn tại vẫn trả 200 (không 404) | Medium | `bug-reports/BUG-FR14-002.md` | [#258](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/258) |
| BUG-FR14-003 | Tên danh mục trùng được chấp nhận (không có ràng buộc duy nhất) | Low | `bug-reports/BUG-FR14-003.md` | [#259](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/259) |
| BUG-FR14-004 | Tên danh mục rỗng/chỉ có khoảng trắng được chấp nhận | Medium | `bug-reports/BUG-FR14-004.md` | [#260](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/260) |

**Tổng số:** 10 bug (black-box, chỉ dùng bằng chứng hành vi quan sát — không tham chiếu mã nguồn SUT).

### 2.5. Postman features đã dùng

Workspace · collection · 5 folders thực thi (`FR-01 Register`, `FR-08 Checkout`,
`FR-08 State & Security`, `FR-14 Category CRUD`, `FR-14 Lifecycle & Access`) ·
collection + environment variables · environment · pre-request scripts (header anti-cheat + auth-mode selector) ·
test scripts · data-driven Collection Runner (`-d` data files) · Newman CLI + htmlextra
reporter · dynamic variables `{{$guid}}` / `{{$timestamp}}`. Chi tiết: `reports/main-report.md`.

### 2.6. CI/CD

GitHub Actions (`.github/workflows/hw06-newman.yml`) boot SUT + chạy Newman headless trên
mỗi push. Hai run mẫu (pass / fail) và cấu hình: `reports/ci-cd-report.md`.

### 2.7. Video demo

| Nội dung | Link |
|---|---|
| Agent Skill demo (§7) | https://youtu.be/-0KjJiBCIiI |

---

## 3. Cấu trúc repo

| Đường dẫn | Nội dung |
|---|---|
| `api/collections/` | Postman collection `.json` (5 folder thực thi theo API/state) |
| `api/environments/` | Environment local (`baseUrl`, `studentId`, tokens, ids) |
| `api/data/` | Data file data-driven cho từng API (`*-cases.json`, `.csv`) |
| `api/newman/` | Newman HTML/JSON report — theo từng folder thực thi |
| `api/scripts/` | `boot-sut.sh`, `run-api.sh`, `run-all.sh` |
| `test-cases/FR-{01,08,14}-*/` | `ai-generated.md`, `audit.md`, `extended.md` |
| `tests/test-cases/FR-{01,08,14}-*/` | File Markdown riêng cho từng test case (`TC-*.md`) |
| `test-cases/test-summary.xlsx` | Bảng tổng hợp case + summary |
| `reports/main-report.md` | Báo cáo chính (pipeline từng API) |
| `reports/ci-cd-report.md` | Cấu hình pipeline + 2 run mẫu |
| `reports/ai-audit-report.md`, `prompt-log.md`, `ai-critique.md` | Phụ lục AI bắt buộc (§9, §10) |
| `reports/test-generator-design.md` | Thiết kế Agent Skill sinh test (§7) |
| `reports/pdf/` | Bản PDF (sinh bằng `python3 reports/tools/build-pdfs.py`) |
| `bug-reports/` | Bug report black-box + ảnh GitHub Issue |
| `diagrams/` | `test-generator.png`, `test-generator.drawio`, `test-generator.md`, `test-generator.py` (§11) |
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
