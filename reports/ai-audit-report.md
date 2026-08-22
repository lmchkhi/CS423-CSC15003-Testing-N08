# [AI-02] AI Audit Report — HW06 API Testing

## 1. Thông tin Sinh viên

| Field | Content |
| --- | --- |
| **Họ tên** | Hà Bảo Ngọc |
| **MSSV** | 23127300 |
| **Lớp / Nhóm** | CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS — Nhóm N08 |
| **Ngày làm bài** | 20/08/2026 – 21/08/2026 |
| **API được phân công** | FR-01 `POST /api/register` · FR-08 `POST /api/checkout` · FR-14 categories CRUD (`GET/POST/PUT/DELETE /api/categories`) |
| **Công cụ AI đã dùng** | Claude (Opus 4.8, Sonnet 5, Sonnet 4.6, Haiku 4.5 — chạy trong Claude Code); Claude (Sonnet 4.6 Thinking — chạy trong Antigravity IDE) |

## 2. Tuyên bố sử dụng AI (HW06 §9)

> **I use AI tools for the following tasks.**

Tôi có sử dụng AI trong bài này. Công cụ, thời điểm, prompt nguyên văn và output
nguyên văn của từng lần tương tác được ghi ở bản ghi thô, không lọc, tại
[`prompt-log.md`](prompt-log.md) (27 phiên, trích tự động từ transcript gốc của
Claude Code). Báo cáo này là **tập con đã được sinh viên rà soát**, gộp 27 phiên
thành các entry theo giai đoạn quy trình, mỗi entry kèm phán quyết
VALID / INVALID / INCOMPLETE.

| Nhóm công việc | Công cụ | Được dùng để làm gì |
|---|---|---|
| Lập kế hoạch (plan + spec) | Claude (Opus 4.8, Claude Code) | Sinh plan/spec HW06 từ đề bài, tham chiếu cấu trúc HW05 |
| Sinh test case từng bước (§6.1) | Claude (Haiku 4.5 / Opus 4.8, Claude Code) — các subagent implementer | Phân vùng domain, security SEC-01–07, schema oracle, state-machine cho 3 API |
| Rà soát (§6.2) | Claude (Opus 4.8 / Sonnet 4.6, Claude Code) — các subagent reviewer | Đối chiếu VALID/INVALID/INCOMPLETE, phát hiện gap trước khi commit |
| Thực thi | Newman + newman-reporter-htmlextra | Chạy Postman collection headless trên SUT localhost:3000 |
| CI/CD + Agent Skill (§7) | Claude (Sonnet 4.6 Thinking, Antigravity IDE) | GitHub Actions workflow, skill `api-test-generator`, pseudocode |
| Toàn vẹn prompt-log (§9) | Claude (Sonnet 5, Claude Code) | Phát hiện log bịa/không verbatim, dựng lại từ transcript gốc |

Mức Bloom-AI mà HW06 §8 yêu cầu — **G9.2 (Apply), G9.3 (Analyse), G9.4
(Collaborate), G9.5 (Create)** — thể hiện lần lượt ở: quy trình từng bước áp dụng
cho ba API (Apply, Entry #4–#8), audit đối chiếu output AI với hành vi thật của
SUT (Analyse, Entry #6–#8), các vòng review/re-review qua lại giữa subagent và
sinh viên (Collaborate, Entry #4–#8, #11), và thiết kế Agent Skill `api-test-generator`
sinh test case tự động (Create, Entry #10).

## 3. Hướng dẫn / Phạm vi

Phụ lục bắt buộc theo HW06 §9. **Prompt** giữ nguyên văn (prompt người ngắn được
chép đủ; prompt dispatch subagent dài được tóm tắt và trỏ tới tiểu-phiên tương ứng
trong `prompt-log.md`, đúng quy ước rút gọn đã nêu ở đầu file đó). **AI Output**
tóm tắt kèm trỏ artifact thật trong repo. **Verdict / Reasoning / Student Fix** là
nhận định của sinh viên.

---

## Entry #1 — Lập kế hoạch + đính chính phạm vi API

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Claude (Opus 4.8, Claude Code) |
| **Timestamp** | 5:30–5:47 PM 20/08/2026 (phiên [1]–[5]) |
| **Artifact** | `docs/superpowers/plans/2026-08-20-hw06-api-testing.md`, `docs/superpowers/specs/2026-08-20-hw06-api-testing-design.md` |

**Full prompt (phiên [1], [2]):**

```text
setup the plan to finish all the requirements in @HW06-API-Testing.md, i need to
receive full grades. the plan must cover all the tasks, starting from setup the
folders till the end. the reference for the folder structure is
/Users/hbn/Documents/23127300_HW05_AI_Performance_100

wait i forgot. my split on this hw is fr-01 regis, fr-08 checkout, fr-14 category mgmt
```

### (2) AI Output

Plan 10-task + spec design doc, ánh xạ từng mục HW06 §5–§15 sang task. Ban đầu AI
chọn API mẫu chung; sau khi sinh viên cung cấp phân công thật (FR-01/08/14), plan
được cập nhật đúng ba pool A/B/C.

**Verdict:** INCOMPLETE → VALID.
**Reasoning:** Bản plan đầu tốt về cấu trúc nhưng chưa biết phân công cụ thể của
nhóm → chọn nhầm API. AI không thể tự suy ra điều này.
**Student Fix:** Cung cấp phân công FR-01/FR-08/FR-14 (phiên [2]); yêu cầu AI dùng
đúng quy trình superpowers thay vì tự do (phiên [3]).

---

## Entry #2 — Xác nhận không có spec rời như HW05

| Field | Content |
| --- | --- |
| **Tool** | Claude (Opus 4.8, Claude Code) |
| **Timestamp** | 5:47 PM 20/08/2026 (phiên [5]) |

**Full prompt:** `we dont have the spec like hw05 does?`

**AI Output:** Xác nhận đề HW06 tự chứa spec API (mục FR-01/08/14 trong
`HW06-API-Testing.md` + `api-specification.md` copy từ SUT) làm oracle; không cần
tài liệu spec rời.

**Verdict:** VALID. **Reasoning:** Đúng — oracle là `api-specification.md`.
**Student Fix:** Không cần.

---

## Entry #3 — Dispatch thực thi bằng subagent-driven-development

| Field | Content |
| --- | --- |
| **Tool** | Claude (Opus 4.8, Claude Code — phiên điều phối) |
| **Timestamp** | 6:11 PM 20/08/2026 (phiên [7]) |

**Full prompt:** `execute the plan in docs/superpowers/, use subagent-driven in superpowers`

**AI Output:** Phiên điều phối tách plan thành các task-brief (`.superpowers/sdd/...`)
và dispatch subagent implementer/reviewer nền cho từng task. Toàn bộ transcript của
mỗi subagent nằm ở tiểu-phiên tương ứng trong `prompt-log.md`.

**Verdict:** VALID. **Reasoning:** Quy trình subagent-driven cho mỗi task một vòng
impl → review → (re-review nếu cần) → commit, đúng kỷ luật §12 (commit-per-step).
**Student Fix:** Không cần ở bước dispatch; các fix nằm ở từng entry dưới.

---

## Entry #4 — Task 1–2: scaffold repo + Postman harness

| Field | Content |
| --- | --- |
| **Tool** | Claude (Haiku 4.5 implement / Opus 4.8 + Sonnet 4.6 review, Claude Code) |
| **Timestamp** | 6:13–6:24 PM 20/08/2026 (phiên [8]–[12]) |
| **Artifact** | `api/collections/eshop-hw06.postman_collection.json`, `api/environments/local.postman_environment.json`, `api/scripts/*`, `boot-sut.sh` |

**Prompt:** dispatch brief Task 1 và Task 2 (nguyên văn ở tiểu-phiên `prompt-log.md`
phiên [8], [11]) — dựng cây thư mục, collection, pre-request script gắn header
`X-Student-Id: 23127300` cho mọi request. Sau vòng tái cấu trúc suite,
auth/state setup được đặt trực tiếp trong các folder state/lifecycle hiện hành.

**AI Output:** Collection + env + script bootstrap chạy được; pre-request script
upsert header anti-cheat §11.

**Verdict:** INCOMPLETE (vòng 1) → VALID (sau re-review).
**Reasoning:** Review đầu (phiên [9]) phát hiện Task 1 thiếu một số thư mục
(`test-cases/*`, `reports/pdf`, `bug-reports/github-issues`). Re-review (phiên [10])
xác nhận đã bổ sung.
**Student Fix:** Vòng review-nền bắt lỗi và yêu cầu implementer sửa trước khi commit.

---

## Entry #5 — Task 3: FR-01 `POST /api/register` pipeline

| Field | Content |
| --- | --- |
| **Tool** | Claude (Haiku 4.5 implement / Opus 4.8 review, Claude Code) |
| **Timestamp** | 6:25–7:02 PM 20/08/2026 (phiên [13]–[15]) |
| **Artifact** | `test-cases/FR-01-register/{ai-generated,audit,extended}.md` (40 AI + 6 sinh viên), `api/data/register-cases.json`, `bug-reports/BUG-FR01-00{1,2,3}.md` |

**Prompt:** brief Task 3 — sinh ≥35 case theo thứ tự phân vùng name/email/password →
schema → SEC → account-state; audit; mở rộng ≥5; encode data file; chạy Newman; bug report.

**AI Output:** 40 case AI-generated; audit gán VALID/INVALID/INCOMPLETE; 6 case sinh
viên (duplicate-email, empty-body, plaintext-password leak, weak-password, whitespace-email).

**Verdict:** INCOMPLETE (vòng 1) → VALID (sau re-review phiên [15]).
**Reasoning:** Review đầu phát hiện **Step 7 thiếu hoàn toàn** — chưa có bug report,
chưa mở GitHub Issue. Đây đúng loại lỗi "AI báo done khi chưa done".
**Student Fix:** Re-review chặn, yêu cầu bổ sung 3 bug report + 3 issue
(#252 duplicate-email, #253 no-validation, #254 password-disclosure) trước khi qua Task 4.

---

## Entry #6 — Task 4: FR-08 `POST /api/checkout` pipeline

| Field | Content |
| --- | --- |
| **Tool** | Claude (Opus 4.8 implement + review, Claude Code) |
| **Timestamp** | 7:02–7:25 PM 20/08/2026 (phiên [16]–[18]) |
| **Artifact** | `test-cases/FR-08-checkout/*` (35 AI + 5 sinh viên), `api/data/checkout-cases.json`, `bug-reports/BUG-FR08-00{1,2,3}.md` |

**Prompt:** brief Task 4 — phân vùng total_amount/shipping_address, auth (none/user/invalid),
state-machine FR-10, IDOR trên `GET /orders/:id`, business-logic total.

**AI Output:** 35 case; audit; 5 case sinh viên (IDOR, negative total, `canceled→delivered`,
empty-cart order, string total). Bug report FR08-001 IDOR, FR08-002 total không validate,
FR08-003 transition sai.

**Verdict:** INCOMPLETE (vòng 1) → VALID (sau re-review phiên [18]).
**Reasoning:** Review đầu phát hiện **Step 6 chưa chạy Newman** — chỉ có collection,
chưa có report thật. Bằng chứng thực thi là bắt buộc.
**Student Fix:** Re-review yêu cầu chạy `run-fr08.sh`, sinh `fr08-checkout-report.html/json`,
rồi mới commit. Issue #255–#257.

---

## Entry #7 — Task 5: FR-14 categories CRUD pipeline

| Field | Content |
| --- | --- |
| **Tool** | Claude (Opus 4.8 implement + review, Claude Code) |
| **Timestamp** | 7:27–7:38 PM 20/08/2026 (phiên [19]–[20]) |
| **Artifact** | `test-cases/FR-14-category/*` (40 AI + 7 case sinh viên), `api/data/fr14-post-categories.csv`, `bug-reports/BUG-FR14-00{1..4}.md` |

**Prompt:** brief Task 5 — phân vùng name, access-control (admin/user/none), lifecycle
CRUD, missing-resource contract, schema; flagship bug: broken access control (user token
CRUD được).

**AI Output:** 40 case; audit bắt các giả định sai của AI (admin-role được enforce —
thực tế không; PUT/DELETE id không tồn tại trả 404 — thực tế trả 200); case mở rộng về
role-escalation + lifecycle. Bug report FR14-001 broken access control, FR14-002 missing
id trả 200, FR14-003/004 no-uniqueness + empty-name.

**Verdict:** VALID.
**Reasoning:** Vòng review pipeline đạt sau khi tách rõ evidence của sinh viên khỏi
issue của thành viên khác trong repo nhóm.
**Student Fix:** Sinh viên tự mở 4 GitHub Issue riêng cho FR-14 (black-box, chỉ hành vi quan
sát): #261 broken access control, #258 PUT/DELETE id không tồn tại trả 200, #259 trùng tên,
#260 tên rỗng/khoảng-trắng.

---

## Entry #8 — Task 6: chạy gộp + test-summary + Postman feature list

| Field | Content |
| --- | --- |
| **Tool** | Claude (Opus 4.8 implement + review, Claude Code) |
| **Timestamp** | 7:38–7:44 PM 20/08/2026 (phiên [21]–[22]) |
| **Artifact** | 5 Newman report theo folder (`fr01-register`, `fr08-checkout`, `fr08-state`, `fr14-category`, `fr14-lifecycle`), `test-cases/test-summary.xlsx`, mục Postman-features trong `reports/main-report.md` |

**Prompt:** brief Task 6 — chạy full-suite, dựng spreadsheet tổng hợp, liệt kê tính năng
Postman đã dùng.

**AI Output:** Ban đầu chạy full-collection không data file → 25 request / 28 assertion /
9 fail (do row data-driven assert vào `undefined` + lifecycle bị nhân theo iteration).

**Verdict:** INCOMPLETE → VALID (sau khi tái cấu trúc).
**Reasoning:** Cấu trúc collection ban đầu đặt request lifecycle/state chung folder
data-driven → chạy lặp mỗi iteration, đè state; nhiều assertion assert-spec fail; và
`test-summary.xlsx` ghi sai MSSV và số liệu ở bản nháp đầu.
**Student Fix:** Tách mỗi API thành folder data-driven (chạy với `-d`) + folder
state/lifecycle (chạy một lần, tự đăng ký user riêng để không phụ thuộc thứ tự); sửa
lỗi biến `{{token}}` bị env rỗng đè; đánh dấu các row known-bug còn thiếu. Kết quả:
**213 request / 233 assertion / 0 fail** — suite xanh, assertion known-bug kiểm hành vi
quan sát và gắn nhãn `[BUG-*]`. Sửa MSSV + số liệu `test-summary.xlsx`.

---

## Entry #9 — CI/CD + Agent Skill (Antigravity IDE)

| Field | Content |
| --- | --- |
| **Tool** | Claude (Sonnet 4.6 Thinking, Antigravity IDE) |
| **Timestamp** | 8:21–8:28 PM 20/08/2026 (phiên [23]–[25]) |
| **Artifact** | `.github/workflows/hw06-newman.yml`, `.claude/skills/api-test-generator/`, `diagrams/test-generator.drawio`, `diagrams/test-generator.png`, `reports/ci-cd-report.md`, `reports/test-generator-design.md` |

**Full prompt (phiên [23]–[25]):** `continue the plan in docs/superpowers and .superpowers/sdd` → `retry` → `retry`

**AI Output:** Workflow GitHub Actions boot SUT + chạy Newman; Agent Skill
`api-test-generator` (SKILL.md + pseudocode trong báo cáo thiết kế + sơ đồ draw.io); ci-cd-report. Phiên bị ngắt/nghẽn
vài lần (do đó có `retry`).

**Verdict:** INCOMPLETE → VALID (workflow sửa sau).
**Reasoning:** Sản phẩm cốt lõi (skill, pseudocode) đạt, **nhưng** workflow CI ban đầu chạy
cả collection không kèm data file → **đỏ ở mọi run** kể cả commit phục hồi pass của bản đầu: row
data-driven assert vào `undefined`, và request lifecycle bị nhân theo iteration.
**Student Fix:** Sửa workflow chạy từng folder (data-driven kèm `-d`, state/lifecycle chạy
một lần) đồng bộ với collection đã tái cấu trúc (xem Entry #8) → pipeline xanh. Diagram
`test-generator.png` đã được sinh viên tự vẽ bằng draw.io và export từ `diagrams/test-generator.drawio`.

---

## Entry #10 — Toàn vẹn prompt-log: phát hiện log bịa, dựng lại verbatim

| Field | Content |
| --- | --- |
| **Tool** | Claude (Sonnet 5, Claude Code) |
| **Timestamp** | 9:03–10:54 PM 20/08/2026 (phiên [26]–[27]) |
| **Artifact** | `reports/prompt-log.md` (dựng lại), `reports/tools/extract-prompt-log.py` |

**Full prompt (phiên [26]):**

```text
check the progress of docs/superpowers and also check why the prompt log is missing a
lot of prompts and all of the file are made up prompts not verbatim
```
(phiên [27]) `ok execute the fixes`

**AI Output:** Xác nhận bản prompt-log cũ **do AI viết lại từ trí nhớ, không verbatim** —
vi phạm yêu cầu §9. Viết `extract-prompt-log.py` trích tự động từ JSONL transcript gốc
(`~/.claude/projects/`), gồm cả transcript của các subagent nền; dựng lại 27 phiên
nguyên văn, đánh dấu rõ hai chỗ rút gọn (nội dung file `Write(...)` và dòng dispatch
`→ Agent:`).

**Verdict:** VALID — và là entry Collaborate (G9.4) quan trọng nhất.
**Reasoning:** Đây là lần AI tự bịa bằng chứng quy trình; chỉ phát hiện được nhờ sinh viên
đối chiếu log với ký ức thực tế. Bản dựng lại có thể kiểm chứng ngược từ transcript gốc.
**Student Fix:** Ra lệnh vứt bản bịa, dựng lại bằng script trích tự động; giữ script trong
repo để tái lập.

---

## 4. Việc còn lại / defect đã ghi nhận (minh bạch)

Các mục dưới đây được ghi thẳng thay vì giấu, đúng tinh thần audit:

| # | Mục | Trạng thái |
|---|---|---|
| 1 | `diagrams/test-generator.png` — **sinh viên tự vẽ** (§11, cấm AI sinh) | ✅ Đã có; nguồn `diagrams/test-generator.drawio` |
| 2 | Pipeline CI xanh thật | ✅ Đã sửa — tách folder data-driven / state, suite 233 assertion / 0 fail |
| 3 | `test-summary.xlsx` — MSSV + số liệu | ✅ Đã sửa (23127300, 233 assertion, 10 bug) |
| 4 | GitHub Issue FR-14 do sinh viên mở | ✅ Đã mở #258–#261 |
| 5 | Ảnh chụp GitHub Issue + 2 run CI (§14) | ✅ Đã bổ sung trong `bug-reports/github-issues/`, `reports/ci-run-pass.png`, `reports/ci-run-fail.png` |
| 6 | Video demo (Task 8) | ✅ Đã quay và gắn link trong README + design report |
| 7 | PDF các báo cáo (§14) | ✅ Đã sinh trong `reports/pdf/` |
| 8 | `git-log.txt` (§12) | ✅ Đã sinh lại cho nhánh HW06 |
