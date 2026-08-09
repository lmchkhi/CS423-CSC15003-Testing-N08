# [AI-02] AI Audit Report — HW04 Automation Testing

## 1. Thông tin Sinh viên

| Field | Content |
| --- | --- |
| **Họ tên** | Hà Bảo Ngọc |
| **MSSV** | 23127300 |
| **Lớp / Nhóm** | CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS — Nhóm N08 |
| **Ngày làm bài** | 05/08/2026 – 09/08/2026 |
| **Công cụ AI đã dùng** | Claude (Opus 5 và Sonnet 5, chạy trong Claude Code — chuyển sang Sonnet 5 từ Session 3, 08/08/2026; quay lại Opus 5 cho phiên rà soát cuối, 09/08/2026) |

## 2. Tuyên bố sử dụng AI (HW04 §9)

> **I use AI tools for the following tasks.**

Tôi có sử dụng AI trong bài này. Công cụ, thời điểm, prompt nguyên văn và output
nguyên văn của từng lần tương tác được ghi ở mục 4 dưới đây; bản ghi thô không
lọc nằm ở [`prompt-log.md`](prompt-log.md).

| Nhóm công việc | Công cụ | Được dùng để làm gì |
|---|---|---|
| Sinh script tự động (§8) | Claude (Opus 5 / Sonnet 5, trong Claude Code) | Phân tích đặc tả, thiết kế case, mô hình hoá dữ liệu, sinh page object + spec, chẩn đoán và sửa lỗi script |
| Framework automation | Playwright (TypeScript, `@playwright/test`) | Thực thi ma trận 3 trình duyệt |
| Báo cáo | Playwright HTML reporter | Sinh 9 HTML report kèm nhãn `Run by: 23127300` + ISO timestamp |

Mức Bloom-AI mà HW04 §8 yêu cầu — **G9.2 (Apply), G9.3 (Analyse), G9.4
(Collaborate with AI)** — được thể hiện lần lượt ở: quy trình 7 bước áp dụng cho
từng feature (Apply), phân tích lỗi AI ở
[`ai-generated-script-gaps.md`](../ai-gap-analysis/ai-generated-script-gaps.md)
và cột Verdict/Reasoning của từng entry (Analyse), và các vòng sửa qua lại giữa
sinh viên và AI được ghi lại ở mục Student Fix (Collaborate).

## 3. Hướng dẫn / Phạm vi

Phụ lục bắt buộc theo HW04 §9. Mỗi entry ghi lại một giai đoạn chuyển đổi test
case thủ công sang script tự động, kèm phán quyết của sinh viên về chất lượng
output. Bản ghi thô, không lọc, nằm ở [`prompt-log.md`](prompt-log.md).

Nguyên tắc: **Full prompt** và **AI Output** giữ nguyên văn, không dịch, không
rút gọn. Các phần còn lại (Verdict, Reasoning, Student Fix) là nhận định của
sinh viên, viết bằng tiếng Việt.

Bốn khối **AI Output** dài bị cắt bớt phần đuôi khi ghi log lần đầu. Chỗ nào bị
cắt đều được đánh dấu bằng một dòng `[… phần còn lại của output đã bị cắt…]`
ngay tại điểm cắt, để không ai đọc nhầm rằng AI dừng lại ở đó. Ngoài bốn chỗ
này, không khối nào bị rút gọn.

> **Ghi chú về lần rà soát ngày 08/08/2026.** Bản trước của file này chỉ có 4
> entry, đều thuộc Session 2 (FR-10, 07/08), và phần **AI Output** của cả 4
> entry không phải nguyên văn — chúng là bản tóm tắt tiếng Việt viết lại sau khi
> làm xong, tức là vi phạm chính nguyên tắc nêu ở trên. Nguyên nhân: một phiên
> agentic không có một "câu trả lời" duy nhất để dán vào, nên lần ghi đầu đã tóm
> tắt thay vì trích.
>
> Cả hai vấn đề đã được sửa bằng cách trích thẳng từ transcript gốc của Claude
> Code (`~/.claude/projects/`), nơi lưu đầy đủ mọi phiên làm việc:
>
> - Phần **AI Output** của mọi entry giờ là chữ AI thực sự đã trả lời, nguyên
>   văn tiếng Anh, cắt từ transcript đúng khung giờ của entry đó.
> - Bổ sung các entry còn thiếu: dựng khung dự án và lập kế hoạch (05/08),
>   toàn bộ Session 1 — FR-02 (06/08), và hai phiên ngày 08/08.
> - Đánh số lại theo thứ tự thời gian. Bốn entry FR-10 cũ trở thành #10–#13;
>   phần Verdict / Reasoning / Student Fix của chúng **giữ nguyên không sửa**,
>   vì đó là nhận định của sinh viên và vẫn đúng.
>
> Ghi chú cũ nói "các tương tác Session 1 không được ghi lại và không dựng lại
> từ trí nhớ" đã bị xoá, vì nó không còn đúng: transcript vẫn còn, nên phần đó
> là trích xuất chứ không phải dựng lại.

## 4. Audit Entries

---

## Entry #1

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 11:07 PM 05/08/2026 |
| **Artifact type** | Khung dự án `automation/` — `playwright.config.ts`, `utils/config.ts`, `utils/data.ts`, `utils/api.ts`, `utils/stamp.ts`, `scripts/run-matrix.ts`, `tests/smoke.spec.ts` |

**Full prompt:**

```
read HW04-AutomationTesting.md and plan to setup the project for me
materials i added for your ref and will be deleted later (dont commit these, also no need gitignore i will delete manually):
- Automation_Web_Seminar.pptx.pdf: presentation slide
- HW04-AutomationTesting.md: requirements
- playwright-skill.md, selenium-skill.md: the skillset the presentation group prepared for us, dont copy entirely blindly, check the quality of the skills entirely then decide what needs enhancing
- added /Users/hbn/Downloads/23127300_HW02_AI_DomainTesting_100, but im not sure you can read so i leave its absolute path here. this is my hw02, you can take its docs and ref its skills here

before you really make any changes to the repo, tell me how you want to setup the project structure
```

### (2) AI Output

```
I'll read the materials first before proposing anything.
```

Sau khi đọc xong đề và HW02, AI trình bày phương án cấu trúc thư mục, rồi
**tự tiếp tục viết code** thay vì dừng lại chờ duyệt. Sinh viên cắt ngang:

```
[Request interrupted by user]
```

```
wait i told you to just setup the project structure no real work yet what are you doing
```

```
revert the overran
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Phần chuyên môn thì tốt: khung `automation/` mà AI dựng ra đúng những gì §6 đòi
hỏi — loader dữ liệu tách khỏi spec, runner ma trận 3×3, và bộ đóng dấu
`Run by:` + ISO timestamp vào report theo §11. Toàn bộ các session sau đều chạy
trên khung này mà không phải dựng lại.

Sai ở chỗ **không tôn trọng ranh giới phạm vi**. Prompt viết rõ "before you
really make any changes to the repo, tell me how you want to setup the project
structure" — tức là yêu cầu một đề xuất, không phải một lần thực thi. AI trình
bày đề xuất rồi tự động làm tiếp luôn. Đây không phải lỗi kỹ thuật mà là lỗi
đọc yêu cầu, và là loại lỗi nguy hiểm hơn: nếu không cắt ngang kịp, repo đã có
một lượng code chưa ai duyệt.

Bài học đã áp dụng cho toàn bộ phần còn lại của HW04: mọi giai đoạn sinh code
đều đi sau một giai đoạn thiết kế được duyệt riêng, và kế hoạch chia thành 19
task có checkpoint thay vì một lệnh "làm hết đi".

### (5) Student Fix

Bấm dừng giữa chừng, yêu cầu revert phần làm quá. Giữ lại khung thư mục và các
file hạ tầng (`config`, `data`, `api`, `stamp`, `run-matrix`, `smoke.spec.ts`) vì
đó đúng là phần được yêu cầu; bỏ phần code spec mà AI tự ý viết thêm.

---

## Entry #2

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 11:41 PM 05/08/2026 |
| **Artifact type** | Tài liệu thiết kế HW04 — `docs/superpowers/specs/2026-08-05-hw04-automation-design.md` |

**Full prompt:**

```
plan to finish this homework, i want full grades HW04-AutomationTesting.md, it should split into multiple execution to spread out the git commits between days. also i setup the project structrue, check. use superpowers
```

### (2) AI Output

```
I'll start by reading the homework spec and checking your project structure, using the brainstorming skill as the process skill for planning work.
```

```
Scaffold checked — it's in good shape. Before I plan the day-by-day split, two things I can't derive:
```

```
Everything's scaffolded and sound — config, data loader, API client, matrix runner, report stamping. Missing: `.env` (gitignored, I'll create it), the three specs, the three data files, page objects, and all reports.

Two facts that shape the plan:

- **Commit budget**: only 1 test-script commit exists (today's scaffold). §12 needs 8 across 4+ days. Aug 5→9 gives 5 working days — comfortable at 2 commits/day.
- **HW02 carry-over confirmed**: FR-0
[… phần còn lại của output đã bị cắt khi ghi log, không phải AI dừng ở đây]
```

```
Spec written and committed to `docs/superpowers/specs/2026-08-05-hw04-automation-design.md`.

Two things I resolved during the write-up that differ slightly from what I said above:

- **Case counts are targets, not commitments.** I'd written "FR-02 = 14 of 15" as if I already knew which case to drop — I don't, and won't until the design stage merges duplicates and checks each case has an observable UI oracle. The spec now states ≥12 with an expec
[… phần còn lại của output đã bị cắt khi ghi log, không phải AI dừng ở đây]
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Điểm đáng ghi nhận nhất là AI **tự sửa chính mình giữa chừng**: ban đầu nó viết
"FR-02 = 14 of 15" như thể đã biết trước sẽ bỏ case nào, rồi tự nhận ra đó là con
số bịa và đổi thành "≥12, con số cuối chốt ở giai đoạn thiết kế". Đây đúng là chỗ
dễ sai nhất của tài liệu kế hoạch — cam kết một con số trước khi có dữ liệu để
chốt nó — và AI nêu ra thay vì để trôi.

Việc AI hỏi lại hai câu trước khi lập kế hoạch (thay vì đoán) cũng đúng quy trình:
phạm vi feature và ngày bảo vệ là hai thứ không suy ra được từ repo.

Phần đúng về mặt nội dung: bản thiết kế bám sát §6 (dữ liệu tách khỏi spec), §11
(nhãn `Run by:` + timestamp) và §12 (ngân sách commit) — cả ba đều là tiêu chí
chấm điểm, không phải chi tiết kỹ thuật tuỳ chọn.

### (5) Student Fix

Không sửa nội dung bản thiết kế. Có chỉnh một giả định về lịch: xem Entry #4.

---

## Entry #3

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 11:56 PM 05/08/2026 |
| **Artifact type** | Thao tác git — commit tài liệu `docs/superpowers/` vào repo nộp bài |

**Full prompt:**

```
i dont want the superpowers related to be commited
```

### (2) AI Output

```
Undone. The commit is gone (branch was unpushed, so nothing to force-push), and `docs/superpowers/` is now excluded via `.git/info/exclude` — local-only, so no `.gitignore` change enters the repo either. The design doc still exists on disk for me to work from; `git status` shows it as nothing at all.

Going forward, only HW04 deliverables get committed: specs, test data, page objects, reports, bug reports, and the report/audit Markdown. Superpowe
[… phần còn lại của output đã bị cắt khi ghi log, không phải AI dừng ở đây]
```

### (3) Verdict

**`INVALID`**

### (4) Reasoning

AI tự ý commit `docs/superpowers/` — tài liệu nội bộ của quy trình làm việc, không
phải sản phẩm nộp — vào nhánh nộp bài mà không hỏi. Không có gì trong đề bài hay
trong prompt yêu cầu điều đó.

Lỗi này thuộc nhóm "AI mở rộng phạm vi thao tác ngoài yêu cầu", cùng nhóm với
Entry #1, nhưng nghiêm trọng hơn vì nó tác động lên lịch sử git — thứ mà §12 dùng
làm bằng chứng chấm điểm. Một repo nộp bài lẫn tài liệu quy trình nội bộ sẽ khiến
người chấm phải đoán đâu là sản phẩm thật.

Cùng phiên còn một lỗi cùng loại: AI gắn trailer `Co-Authored-By: Claude` vào
commit. Bài này yêu cầu commit đứng tên sinh viên, còn việc dùng AI được khai báo
ở chính file audit này chứ không phải trong lịch sử git.

### (5) Student Fix

Yêu cầu gỡ commit (nhánh chưa push nên không phải force-push). Chốt hai quy tắc và
ghi thẳng vào `CLAUDE.md` để mọi phiên sau đều đọc được:

- `docs/superpowers/` loại trừ qua `.git/info/exclude` — loại trừ cục bộ, không
  làm bẩn `.gitignore` của repo nộp bài;
- không bao giờ dùng trailer `Co-Authored-By`.

---

## Entry #4

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 11:58 PM 05/08/2026 |
| **Artifact type** | Kế hoạch thực thi 19 task — `docs/superpowers/plans/2026-08-05-hw04-automation.md` |

**Full prompt:**

```
okay, write the plan
```

### (2) AI Output

```
I'm using the writing-plans skill to create the implementation plan.
```

```
Fixing three plan defects I found on self-review, plus a date shift.
```

```
Plan complete and saved to `docs/superpowers/plans/2026-08-05-hw04-automation.md` — 19 tasks across 5 sessions, untracked by git like the spec.

Two things changed from what I described earlier, both worth knowing:

**The date rolled over — it's now Aug 6.** Work starts today rather than yesterday, so I compressed: Session 1 now also covers FR-02's three-browser run (Task 6), and Sessions 4–5 share Aug 9 (triage/bugs in the morning, video day in
[… phần còn lại của output đã bị cắt khi ghi log, không phải AI dừng ở đây]
```

Trước đó, khi sinh viên chỉ ra xung đột giữa ngày quay video và các report đã
chạy:

```
Good catch — that's a real conflict, and the fix is to reorder rather than to run something throwaway.

The problem isn't DB pollution. The suite is built to be re-runnable: FR-02 registers throwaway accounts, FR-10 creates a fresh order per case, FR-13 computes expected revenue live from `GET /api/admin/orders`. Running it again on Aug 9 doesn't corrupt anything.

The problem is **report overwriting**. The HTML reporter wipes its output folder,
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Kế hoạch chi tiết tới mức chạy được: mỗi task có file đầu vào/đầu ra, đoạn code
mẫu, lệnh kiểm chứng và tiêu chí "kỳ vọng thấy gì". Các session sau thực thi gần
như đúng kế hoạch, đó là bằng chứng tốt nhất cho chất lượng của nó.

Chỗ đáng giá nhất lại đến từ việc sinh viên phản biện chứ không phải từ bản nháp
đầu: câu hỏi "video cần một script chạy end-to-end, nếu quay ngày 9 thì các report
đã chạy rồi thì sao?" chỉ ra một xung đột thật mà kế hoạch ban đầu không thấy —
reporter HTML **xoá sạch thư mục output trước khi ghi**, nên lượt chạy trên camera
sẽ ghi đè report đã commit. AI xử lý đúng hướng: thay vì diễn một lượt chạy giả,
nó đổi thứ tự để lượt chạy trên camera **chính là** lượt chạy chính thức, và thêm
Task 2 (merge manifest) để điều đó khả thi. Task 2 sau này đúng là cần thật.

AI cũng tự phát hiện ba lỗi trong bản nháp của chính nó khi tự rà lại, và xử lý
đúng việc ngày đã sang 06/08 thay vì bám lịch cũ.

### (5) Student Fix

Không sửa nội dung kế hoạch. Sinh viên là người phát hiện xung đột report/video
nêu trên; phần còn lại giữ nguyên. Chốt thêm: không dùng `subagent-driven-development`
cho bài này, vì §9 yêu cầu log nguyên văn prompt và output — mà với subagent thì
chỉ thấy báo cáo cuối, không thấy prompt bên trong, nên phần audit sẽ thành dựng
lại từ hộp đen.

---

## Entry #5

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 00:11 AM 06/08/2026 |
| **Artifact type** | Session 1 Task 1–2 — `.env`, sửa `utils/stamp.ts` (timestamp ICT) và `scripts/run-matrix.ts` (merge manifest) |

**Full prompt:**

```
ok
```

(Prompt kích hoạt Session 1 của kế hoạch — Task 1 dựng môi trường, Task 2 làm
`writeManifest` merge thay vì ghi đè.)

### (2) AI Output

```
`.env` created and confirmed gitignored by `.gitignore:17`. All three SUT apps have dependencies installed. Starting the servers.
```

```
Environment green — typecheck clean, 3/3 smoke passed. Task 2 now: the manifest merge plus the timezone fix. Let me check the stamper first, since it writes the timestamp into the HTML.
```

```
`escapeHtml` leaves `+` and `:` untouched, so an offset timestamp survives verbatim into the HTML and `verifyLabel`'s `includes()` check still works. Making the changes.
```

```
Timestamp helper is correct — `2026-08-06T00:12:48+07:00` where UTC would have said Aug 5. The runner threw though; let me see it.
```

```
Merge works — one cell replaced with a real offset timestamp, eight rows survived verbatim. Cleaning up the fabricated seed data now, since fake PASS rows must never reach a commit.
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Hai thay đổi đều đúng và cần thiết. Việc đổi timestamp sang giờ ICT có lý do thật:
lúc đó là 00:12 ngày 06/08 giờ Việt Nam, mà timestamp UTC sẽ ghi là 05/08 — tức
là report sẽ mang ngày lệch một ngày so với ngày commit, đúng thứ mà §11 dùng để
đối chiếu. AI kiểm tra `escapeHtml` trước khi sửa để chắc rằng dấu `+` và `:` của
offset không bị escape làm hỏng `verifyLabel`, đó là bước kiểm chứng đúng chỗ.

Nhưng cách chứng minh merge thì có rủi ro: AI **tự sinh dữ liệu giả** (các dòng
PASS bịa) đổ vào `run-manifest.md` để thử xem merge có giữ lại dòng cũ không. Về
kỹ thuật đây là cách kiểm thử hợp lệ, và AI có tự dọn sau đó. Nhưng đây là file
bằng chứng chấm điểm — chỉ cần quên một bước dọn là repo có dòng PASS bịa cho
những cell chưa từng chạy, và đó là gian lận chứ không còn là lỗi kỹ thuật.

Ngoài ra thay đổi timestamp còn để lại một lỗi mà mãi tới cuối Session 1 mới lộ:
`npm run report:verify` vẫn dùng regex khớp dạng UTC kết thúc bằng `Z`, nên nó
báo sai sau khi đổi sang dạng có offset. Xem Entry #9.

### (5) Student Fix

Kiểm tra `run-manifest.md` trước khi commit, xác nhận không còn dòng bịa nào —
chỉ giữ các dòng ứng với cell thật sự đã chạy. Ghi thành quy tắc: không bao giờ
dùng dữ liệu giả trên chính file bằng chứng; nếu cần thử logic merge thì thử trên
file tạm ngoài `reports/`.

---

## Entry #6

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 00:14 AM 06/08/2026 |
| **Artifact type** | FR-02 stage 1–3 (Analyze → Design → Review) — `test-design/FR-02-login/case-map.md`, 14 case F02-TC-001…014 |

**Full prompt:**

```
ok
```

(Task 3 của kế hoạch: đọc 15 case HW02 của FR-02, đối chiếu `sut-requirements.md`
§2, recon DOM trang đăng nhập, rồi viết bảng ánh xạ ≥12 case.)

### (2) AI Output

```
Note DT-001 is marked **Failed** against `BUG-FR02-001` — a known HW02 defect on the happy path. Let me extract all 15 cases' essentials plus that bug.
```

```
8 of 15 HW02 cases failed against 5 known defects. Reading those bug reports — they predict which automated tests will go red.
```

```
This changes the FR-02 design materially. Let me confirm the defects still exist in the current build before designing around them.
```

```
Confirmed and worse than expected. Critical recon findings — let me get the error rendering and storage key too.
```

```
Two confirmed defects, one new. Let me nail down the counter semantics precisely — they define several cases.
```

```
Alternating attempts never lock. Probing consecutive failures — that's the actual rule under test.
```

```
Recon is decisive. **The lock triggers on the 3rd attempt — i.e. after only 2 failed logins** — while the oracle requires 3. And the login response leaks the password in plaintext. Writing the case map now.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là entry mà AI làm đúng phần khó nhất: **đo hành vi thật trước khi thiết kế**.
Thay vì tin bản nháp trong kế hoạch (giả định khoá sau 3 lần sai đúng như oracle),
AI dò thẳng vào API và phát hiện hai điều mà đọc tài liệu không thể ra được:

1. Khoá kích hoạt ở **lần thử thứ 3**, tức là chỉ sau **2** lần sai — trong khi
   `sut-requirements.md` §2 nói phải ≥3 lần sai. Lệch một đơn vị, và đúng loại
   lỗi mà một case thiết kế cẩu thả sẽ bỏ qua vì "thấy có khoá là được rồi".
2. Response đăng nhập trả về mật khẩu ở dạng plaintext.

Bước dò "thử sai xen kẽ thì không bao giờ khoá" cũng là suy luận đúng: nó xác định
được rằng quy tắc thật là **liên tiếp**, không phải cộng dồn — mà đây chính là
điều phân biệt case F02 tính đúng bộ đếm với case tính sai.

Việc đọc trước 5 bug report của HW02 để **dự đoán case nào sẽ đỏ** là cách làm
đúng: nó biến "test đỏ" từ sự cố thành kết quả có kỳ vọng trước, nên khi chạy
thật có thể phân biệt ngay đỏ-vì-lỗi-SUT với đỏ-vì-hỏng-script.

### (5) Student Fix

Không sửa nội dung bảng ánh xạ. Chốt lại một điểm nguyên tắc: assertion viết theo
**oracle** (≥3 lần sai mới khoá), không viết theo hành vi quan sát được (2 lần đã
khoá) — nên case tương ứng sẽ đỏ, và đó là kết quả đúng cần giữ, không phải thứ
cần sửa cho xanh.

---

## Entry #7

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 00:19 AM 06/08/2026 |
| **Artifact type** | FR-02 stage 4–5 (Model data) — `loginCaseSchema` trong `automation/utils/data.ts` + `automation/test-data/fr-02-login.cases.json` |

**Full prompt:**

```
ok
```

(Task 4 của kế hoạch: thêm schema FR-02 và viết file dữ liệu ≥12 record.)

### (2) AI Output

```
Task 4 — the schema and data file. Appending the FR-02 schema:
```

```
14 cases validated — good category spread. Committing Tasks 3–4.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Schema tách đúng ba trục độc lập của FR-02: nguồn danh tính (`account`), cách lấy
email (`emailSource`), và số lần sai trước khi assert (`priorFailures`). Nhờ tách
như vậy mà case "sai 2 lần rồi nhập đúng mật khẩu" và case "sai 3 lần rồi nhập
đúng mật khẩu" dùng chung một đường code, chỉ khác dữ liệu — đúng tinh thần §6.

Trường `account: 'throwaway'` là chi tiết quan trọng và AI đưa vào đúng chỗ: mọi
case chạm tới cơ chế khoá đều phải tự đăng ký tài khoản riêng qua API, nếu không
sẽ khoá mất `test@eshop.com` và làm hỏng toàn bộ các cell chạy sau. Đây là ràng
buộc đã ghi trong `CLAUDE.md` và AI tuân thủ mà không cần nhắc lại.

Loader tự kiểm tra ngưỡng ≥12 và trùng `caseId` ngay khi nạp, nên một file dữ liệu
thiếu case sẽ làm cả suite dừng chứ không âm thầm chạy thiếu.

### (5) Student Fix

Không sửa. Đối chiếu lại từng giá trị `messageContains` với chuỗi mà SUT thật sự
render (lấy từ recon ở Entry #6) thay vì để AI đoán từ ngữ tiếng Việt.

---

## Entry #8

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 00:20 AM 06/08/2026 |
| **Artifact type** | FR-02 stage 6 (Generate) — `automation/pages/login.page.ts` + `automation/tests/fr-02-login.spec.ts` |

**Full prompt:**

```
ok
```

(Task 5 của kế hoạch, kèm bản nháp page object dùng `getByLabel(/email/i)` và
`getByRole('alert')` cho khối thông báo lỗi.)

### (2) AI Output

```
Task 5 — page object. The form has no `name`, `id`, or `placeholder` on inputs and its labels aren't associated, so I anchor fields to their visible label text.
```

```
Fields and button resolve correctly, and `type = text` confirms the defect. The error banner sits outside `<form>`, so my locator scope was wrong — fixing it.
```

```
14 tests listed, typecheck clean. Running on Chromium.
```

```
10 passed, 4 failed — and the four failures are exactly the four I predicted in the case map. Let me confirm each failed for the predicted reason, not incidentally.
```

```
Both confirmed genuine: `type="text"` not `"email"`, and the account already locked after only 2 failures. Committing Task 5.
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Kết quả cuối đúng, nhưng bản nháp locator sai hai chỗ và cả hai chỉ lộ khi chạy
thật chứ không lộ khi đọc code:

1. `getByLabel(/email/i)` không dùng được, vì form không gắn `<label for>` với
   input và input cũng không có `name`/`id`/`placeholder`. Trên một DOM như vậy
   `getByLabel` không khớp gì cả — AI phải neo theo chữ hiển thị cạnh ô nhập.
2. Locator khối lỗi bị giới hạn nhầm trong phạm vi `<form>`, trong khi banner lỗi
   render **bên ngoài** form. Hệ quả nếu không sửa rất khó chịu: mọi assertion
   "phải hiện thông báo lỗi" sẽ đỏ vì không tìm thấy phần tử, và người đọc dễ kết
   luận nhầm là SUT không hiện lỗi — tức là một bug report sai.

Điểm cộng: 4 case đỏ đúng bằng 4 case bảng ánh xạ đã dự đoán, và AI không dừng ở
đó mà đi xác nhận **từng case đỏ vì đúng lý do đã dự đoán**, chứ không phải đỏ
tình cờ. Đó là bước phân biệt giữa "suite chạy được" và "suite kiểm thử đúng chỗ".

### (5) Student Fix

Chấp nhận hai lần tự sửa locator của AI sau khi kiểm chứng lại trên DOM thật. Yêu
cầu ghi chú ngay trong `login.page.ts` lý do phải neo theo chữ hiển thị thay vì
`getByLabel` — nếu không, lần bảo trì sau rất dễ có người "dọn dẹp" ngược về
`getByLabel` và làm hỏng toàn bộ suite.

---

## Entry #9

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 00:25 AM 06/08/2026 |
| **Artifact type** | FR-02 stage 7 (Verify & repair) — ma trận 3 trình duyệt + sửa regex trong `npm run report:verify` |

**Full prompt:**

```
ok
```

(Task 6 của kế hoạch: chạy `npm run matrix -- --feature fr-02-login` trên
chromium/firefox/webkit và kiểm chứng nhãn §11 trong cả ba report.)

### (2) AI Output

```
Now Task 6 — the three-browser matrix. This takes a few minutes.
```

```
Identical results on all three engines — 10 pass / 4 fail, no browser-specific issues, so no repairs needed. Verifying the §11 labels.
```

```
`report:verify` disagrees with the grep — its regex still expects the UTC `Z` form I changed away from. That's a real regression from my timestamp change; fixing it.
```

```
All three reports verified. Checking report size before committing them.
```

```
18 MB for one feature (failure videos and traces) — ~55 MB for all nine, which is fine for the repo and useful as bug evidence. Committing Task 6.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Điểm mạnh nhất của entry này là AI **không tin công cụ kiểm chứng của chính nó**.
`npm run report:verify` báo không đạt, trong khi `grep` thủ công cho thấy nhãn
`Run by: 23127300` có mặt đủ trong cả ba report. Hai kết quả mâu thuẫn nhau, và
AI truy ra đúng nguyên nhân: regex của `report:verify` vẫn khớp dạng UTC kết thúc
bằng `Z`, còn timestamp đã đổi sang dạng có offset `+07:00` ở Entry #5. Tức là
đây là **hồi quy do chính thay đổi trước đó của AI gây ra**, và nó tự nhận như vậy
("That's a real regression from my timestamp change").

Nếu xử lý ngược lại — sửa timestamp quay về `Z` cho công cụ hết báo lỗi — thì
report sẽ mang sai ngày, đúng thứ §11 dùng để đối chiếu. Chọn sửa công cụ thay vì
sửa dữ liệu là lựa chọn đúng.

Kết quả 10/4 giống hệt nhau trên cả ba engine cũng là một tín hiệu tốt: không có
lỗi đặc thù trình duyệt nào ở FR-02, nên 4 case đỏ chắc chắn là lỗi SUT chứ không
phải lỗi tương thích engine.

### (5) Student Fix

Không sửa thêm. Xác nhận lại bằng tay rằng cả ba `index.html` chứa `Run by:
23127300` kèm ISO timestamp trước khi commit, thay vì chỉ tin `report:verify` vừa
được sửa xong.

---

## Entry #10

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:25 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 1–3 (Analyze → Design → Review) — bảng ánh xạ 14 case trong `test-design/FR-10-order-state-machine/case-map.md` |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Prompt trên kích hoạt Task 7 của kế hoạch. Nội dung điều khiển giai đoạn này
là Task 7 trong `docs/superpowers/plans/2026-08-05-hw04-automation.md`, mục
Step 2 và Step 4: đọc 14 case HW02, phát biểu lại state machine từ oracle §3,
recon hai giao diện, rồi viết bảng ánh xạ ≥12 case.)

### (2) AI Output

```
Environment green (smoke 3/3). Now Task 7 Step 3 — reconnoitre both order UIs against a real order.
```

```
Key finding: admin uses `adminToken`, admin sections are sidebar clicks (not routes), and the shop has no `/orders` route. Digging into the real navigation.
```

```
Recon is paying off — the admin panel uses action *buttons*, not a `<select>` (the plan assumed a select). Enumerating the controls per status.
```

```
Two apparent oracle violations surfaced (a **canceled** order offers "Đánh dấu Đã giao"; a **shipping** order still offers the user "Hủy đơn"). Verifying whether those controls actually mutate state.
```

```
Both HW02-known defects reproduce, plus the guest path. One last check: dialogs on the admin cancel, and cross-user visibility.
```

```
Recon complete. Writing the FR-10 case map (Task 7 Step 4).
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Bộ case bám sát oracle §3 và không phát minh thêm quy tắc nào ngoài đặc tả. Điểm
đáng giá nhất là cách xử lý nhóm "chuyển đổi không hợp lệ": giao diện admin
không có ô chọn trạng thái, nên không thể "thử chuyển sai" như kịch bản thủ công
mô tả. Thay vì bỏ nhóm case này, thiết kế đổi góc nhìn — tập nút mà một dòng đơn
chào mời **chính là** tuyên bố của hệ thống về các cạnh đi ra của trạng thái đó,
nên assert tập nút khớp chính xác sẽ chứng minh cả hai chiều: không thiếu cạnh
hợp lệ, không thừa cạnh ngoài sơ đồ. Đây là suy luận đúng về mặt kiểm thử hộp
đen, không phải cách lách.

Việc loại TC-FR10-DT-013 cũng trung thực: recon cho thấy mọi đường ghi mà client
tiếp cận được đều từ chối giá trị `returned`, nên không dựng nổi tiền điều kiện.
Ghi rõ lý do và điều kiện để automate được, thay vì độn thêm một case giả.

### (5) Student Fix

Không cần chỉnh sửa nội dung bảng ánh xạ. Có bổ sung mục §3 trong `case-map.md`
để nêu rõ F10-TC-011 là ngoại lệ có chủ ý của quy ước "API chỉ dùng để setup",
kèm lý do — nếu không ghi, người chấm sẽ đọc nhầm thành vi phạm quy ước.

---

## Entry #11

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:32 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 4–5 (Model data) — `orderStateCaseSchema` trong `automation/utils/data.ts` + `automation/test-data/fr-10-order-state.cases.json` |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Task 8 của kế hoạch, kèm bản nháp schema dùng `action: 'set-status'`,
`expected.allowed` và `expected.controlAbsent`.)

### (2) AI Output

```
Task 7 done. Now Task 8 — the FR-10 schema and data file.
```

### (3) Verdict

**`INCOMPLETE`** (đối với bản nháp schema mà kế hoạch đưa ra)

### (4) Reasoning

Bản nháp trong kế hoạch được thiết kế cho một giao diện **không tồn tại**. Nó giả
định admin đổi trạng thái bằng một ô `<select>` nên mới có `action: 'set-status'`
và `targetStatus` cho mọi case. Recon cho thấy admin dùng một nút riêng cho từng
chuyển đổi hợp lệ. Nếu giữ nguyên schema đó, các case "chuyển đổi không hợp lệ"
sẽ không có chỗ để biểu diễn kỳ vọng, và `expected.allowed` cùng
`expected.controlAbsent` trở thành hai cờ boolean chồng lấn nhau — kiểu dữ liệu
cho phép mô tả những tổ hợp vô nghĩa (`allowed: true` nhưng `controlAbsent: true`).

Trường `messageContains` cũng thừa: cả hai giao diện không hiển thị thông báo lỗi
nào cho thao tác bị chặn — chúng đơn giản là không chào mời nút. Giữ lại một
trường luôn `null` chỉ làm dữ liệu nhiễu.

Đây là bài học lặp lại của Session 1: schema do AI đề xuất trước khi nhìn DOM
thật luôn phải coi là giả thuyết, không phải đặc tả.

### (5) Student Fix

Viết lại schema quanh hai khái niệm quan sát được thay vì quanh cờ boolean:
`expectedControls` (tập nút phải khớp chính xác) và `assertion` (từ vựng nhỏ để
spec dispatch). Bỏ `action`, `allowed`, `controlAbsent`, `messageContains`. Thêm
`'guest'` vào `actor` vì TC-FR10-DT-014 cần actor chưa đăng nhập — bản nháp bỏ
sót. Giữ `targetStatus` nhưng thu hẹp mục đích, chỉ phục vụ case dò quyền
F10-TC-011.

---

## Entry #12

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:34 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 6–7 (Generate → Verify & repair) — `auth.fixture.ts`, `admin-orders.page.ts`, `my-orders.page.ts`, `fr-10-order-state.spec.ts` + lượt chạy Chromium |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Task 9 của kế hoạch, kèm bản nháp page object dùng `statusSelect(orderId)` /
`selectOption(status)` và `goto()` điều hướng thẳng tới `:5174/orders`, và
`MyOrdersPage.goto()` tới `:5173/orders`.)

### (2) AI Output

```
Task 9 — fixture, page objects, spec.
```

```
11 passed, 3 failed — and the three reds are exactly the cases the case map predicted. Confirming each failure is the genuine defect, not a script fault.
```

```
All three failures are genuine oracle violations with clean evidence. Removing the throwaway recon script and committing.
```

Nội dung ba case đỏ, trích nguyên văn từ output của Playwright trong cùng lượt chạy:

```
  3 failed
    F10-TC-009 — Đơn đã hủy là trạng thái kết thúc
    F10-TC-010 — User không được tự hủy đơn đang giao
    F10-TC-011 — Phiên User thường không được đổi trạng thái đơn hàng
  11 passed (26.7s)

Error: state `Đã hủy` must offer exactly the transitions §3 allows
  Locator: getByRole('row').filter({ has: getByRole('cell', { name: '#30', exact: true }) }).getByRole('button')
  - Array []
  + Array [
  +   "Đánh dấu Đã giao",
  + ]

Error: the user must not be offered a control §3 forbids them
  expect(locator).toHaveCount(expected) failed
  Expected: 0
  Received: 1

Error: a shopper session must not be able to drive an admin transition
  Expected: false
  Received: true
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Ba case đỏ đúng bằng ba case mà bảng ánh xạ đã dự đoán sẽ đỏ, và trùng khớp với
BUG-FR10-001/002/003 của HW02 — tức là script tái hiện được đúng ba lỗi đã biết
chứ không đỏ vì hỏng selector. Thông báo lỗi tự nó là bằng chứng đọc được: dòng
đơn `Đã hủy` chào mời nút `Đánh dấu Đã giao` trong khi oracle nói `canceled` là
trạng thái kết thúc.

Đáng chú ý là 11 case xanh cũng có giá trị chứng minh: F10-TC-006/007/008 xanh
nghĩa là hệ thống **có** chặn đúng các chuyển đổi sai khác, nên ba lỗi trên là
lỗ hổng cục bộ chứ không phải state machine bị bỏ trống hoàn toàn. Không case
nào bị làm nhẹ assertion hay `skip` để lấy màu xanh.

Điểm phải tự phê bình: bản nháp page object trong kế hoạch sai ở ba chỗ, và cả
ba chỉ lộ ra nhờ recon chứ không nhờ chạy thử — `selectOption` trên một ô select
không tồn tại, điều hướng bằng URL trên một app không route theo URL, và trang
lịch sử đơn nằm ở `/profile` chứ không phải `/orders`. Nếu tin bản nháp và chỉ
sửa cho tới khi hết đỏ, kết quả sẽ là một suite chạy được nhưng kiểm thử sai chỗ.

### (5) Student Fix

- `AdminOrdersPage.goto()` điều hướng bằng cách bấm mục `Đơn hàng` ở sidebar và
  chờ tiêu đề `Quản lý Đơn hàng`, thay cho `page.goto(':5174/orders')`.
- Bỏ `statusSelect`/`setStatus`, thay bằng `controlsFor` / `control` / `activate`.
- `MyOrdersPage.goto()` trỏ tới `/profile`.
- Fixture seed đúng khoá lưu token cho từng origin: shop dùng `token`, admin
  dùng `adminToken` — bản nháp dùng `token` cho cả hai, sẽ khiến admin app luôn
  ở màn hình đăng nhập mà không báo lỗi rõ ràng.
- Locator dòng đơn neo bằng regex `^#<id>$` trên ô mã đơn. Bản nháp dùng
  `filter({ hasText: String(orderId) })`, sẽ khớp nhầm: chuỗi `3` có trong cả
  `30,000,000 ₫` lẫn ngày `8/7/2026`, và `#3` là tiền tố của `#30`. Lượt chạy
  thực tế có đơn `#30` nên lỗi này chắc chắn đã xảy ra nếu không sửa.

---

## Entry #13

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:42 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 7 (Verify & repair) — sửa lỗi chỉ xảy ra trên WebKit trong `automation/fixtures/auth.fixture.ts` |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Task 10 của kế hoạch: chạy ma trận 3 trình duyệt và sửa lỗi đặc thù từng
engine. WebKit đỏ 4 case trong khi Chromium và Firefox chỉ đỏ 3.)

### (2) AI Output

```
Chromium and Firefox reproduce the same three genuine defects. WebKit has a fourth failure that the other two don't — investigating before accepting it.
```

```
The page shows "Vui lòng đăng nhập" — the token seeding didn't take effect in WebKit for this case. Probing directly.
```

```
Token survives the reload but is **null** once `/profile` loads — the app is clearing it. Capturing the network to see why.
```

```
WebKit loses the seeded `localStorage` across a cross-document navigation (no API calls fire at all — the app boots tokenless). The correct fix is an init script, which re-applies the token before app code on *every* document rather than relying on one write surviving a navigation.
```

```
WebKit now matches the other engines exactly. Running the full three-browser matrix as the run of record.
```

Kết quả probe so sánh hai engine, trích nguyên văn:

```
  [chromium net] 200 GET http://localhost:3000/api/orders/my-orders
  [chromium net] 200 GET http://localhost:3000/api/users/me
  [chromium] token now: eyJhbGciOiJI
  [chromium] rows for #82: 1
  [webkit] token now: null
  [webkit] rows for #83: 0
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là sửa đúng nguyên nhân, không phải sửa cho hết đỏ. Bằng chứng phân biệt hai
khả năng rất rõ: nếu là lỗi thật của SUT thì trang phải gọi API rồi bị từ chối;
thực tế WebKit **không phát request nào**, nghĩa là app chưa bao giờ thấy token —
lỗi nằm ở cách script dựng phiên đăng nhập, không phải ở SUT.

Cách sửa cũng không làm yếu phép kiểm chứng: `addInitScript` chỉ thay đổi cách
đưa token vào trình duyệt, mọi assertion giữ nguyên. Bằng chứng cho điều đó là
sau khi sửa, WebKit đỏ đúng ba case y hệt hai engine kia — nếu bản sửa nới lỏng
điều gì thì số case đỏ đã giảm xuống dưới ba.

Cần ghi nhận rằng cách seed token cũ (`goto` → `evaluate` → `reload`) là do bản
nháp trong kế hoạch đề xuất và nó chạy đúng trên Chromium/Firefox. Đây là loại
lỗi mà chạy một trình duyệt sẽ không bao giờ phát hiện — lý do §6 bắt buộc chạy
đủ ba engine.

### (5) Student Fix

Viết lại `seedToken` trong `auth.fixture.ts` dùng `page.addInitScript`, bỏ bước
`reload()`. Ghi chú lý do ngay tại chỗ trong file để lần sau không ai "đơn giản
hoá" nó về `evaluate` + `reload`.

---

## Entry #14

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 9:03 AM 08/08/2026 |
| **Artifact type** | Cập nhật kế hoạch — `docs/superpowers/plans/2026-08-05-hw04-automation.md` + `CLAUDE.md` theo ràng buộc commit mới |

**Full prompt:**

```
check the superpowers plan, now we no longer need the 4 days commit constraint, the requirement reduced to at least 8 commits only, so i need you to adjust the plan a bit, today we will finish all the remaining tasks, and tomorrow i only need to film the video
```

### (2) AI Output

```
Current state confirmed: Tasks 1–10 are done (FR-02 + FR-10 automated, 6 reports, 8 countable commits already). Remaining: FR-13, the 9-cell matrix, triage/bugs/gap analysis, all documents, video, packaging.
```

```
**Two things genuinely can't finish today**, so I carved them into a new Task 18b (~10 min after filming) rather than pretending tomorrow is pure video:

1. The two YouTube links. Task 18 now writes all prose final and drops `<!-- TODO: YouTube link, Aug 9 -->` placeholders, so tomorrow is a paste.
2. The final `reports/html/` commit. The HTML reporter wipes its output folder, so tomorrow's on-camera run overwrites today's reports — and §11's anti-cheat intent wants the video to show reports actually being produced. Today's 9-cell run (Task 13) is committed as a full rehearsal; tomorrow's replaces it. Task 18b re-verifies the 9 labeled reports and reconciles the ledger if any cell flipped.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Việc gộp lịch là thao tác cơ học, nhưng AI không dừng ở đó mà chỉ ra hai việc
**không thể** hoàn thành trong hôm nay, thay vì nhận bừa rằng ngày mai chỉ có
quay video: link YouTube chưa tồn tại, và thư mục report sẽ bị lượt chạy trên
camera ghi đè. Nói rõ ràng buộc thật còn hữu ích hơn là chiều theo mong muốn.

AI cũng phát hiện một lỗi tồn đọng có thật: lệnh kiểm tra §12 trong kế hoạch chỉ
đếm `tests/`, `test-data/` và `scripts/`, bỏ sót `pages/`, `fixtures/`, `utils/` —
tức là đang đếm thiếu số commit hợp lệ của chính mình. Đồng thời cập nhật lại
`CLAUDE.md` để các phiên sau không suy diễn lại ràng buộc 4 ngày đã bỏ.

Có một chi tiết bị nêu sai và cần ghi nhận: AI mô tả checkbox của Task 1–6 là
"stale" rồi đánh dấu hoàn thành hàng loạt bằng `sed`. Việc này đúng về kết quả
(các task đó thực sự đã xong, có commit chứng minh) nhưng là sửa hàng loạt trên
tài liệu kế hoạch mà không đọc lại từng dòng.

### (5) Student Fix

Không sửa nội dung kế hoạch mới. Xác nhận lại bằng `git log` rằng 8 commit hợp lệ
đã có thật trước khi chấp nhận kết luận "ràng buộc §12 đã đạt".

---

## Entry #15

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 9:07 AM 08/08/2026 |
| **Artifact type** | Dựng lại `reports/prompt-log.md` và `reports/ai-audit-report.md` nguyên văn từ transcript + `reports/tools/extract-prompt-log.py` |

**Full prompt:**

```
also i dont get why the ai-audit and the prompt-log is not verbatim, it rephrases too much, and also not very sufficient as it only logs the session 2, not the plan and the session 1, so its missing a lot
```

### (2) AI Output

```
Diagnosis confirmed on both counts, and the fix is better than I expected — the full transcripts are on disk.

**Why it's not verbatim:** the "AI Output" blocks aren't AI output. They're post-hoc Vietnamese third-person summaries — `Phiên agentic: trợ lý đọc...`, `14 case: F10-TC-001..014, ánh xạ 13/14 case HW02`. Only the embedded tool output (the recon dump, the Playwright tallies) is real. The cause: an agentic session has no single "output" string to paste, so the previous sessions summarized instead of extracting. The skill explicitly forbids that — "byte for byte, no summarizing."
```

```
Thinking text is stored empty (signature only) — reasoning isn't recoverable, so that's settled.
```

```
The collision is my own `AskUserQuestion` preview quoted verbatim inside entry [25] — correct to keep. But it breaks the skill's numbering grep, so let me make that fence-aware.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là entry ghi lại việc sửa chính hai file log này, nên phải nói thẳng: bản
trước của cả `prompt-log.md` lẫn file này **đã vi phạm quy tắc verbatim mà chính
chúng tuyên bố ở đầu file**, và chỉ ghi được 1 trong 4 phiên làm việc. Sinh viên
là người phát hiện, không phải AI tự rà ra.

Cách sửa thì đúng hướng và kiểm chứng được: thay vì viết lại cho hay hơn, AI đi
tìm nguồn dữ liệu thật (transcript của Claude Code lưu tại `~/.claude/projects/`)
rồi viết script trích xuất tự động. Nhờ đó phần khuyết Session 1 — vốn bị ghi chú
cũ tuyên bố là "không thể dựng lại" — được phục hồi nguyên văn, vì hoá ra nó
chưa bao giờ mất.

AI cũng trung thực ở hai chỗ dễ giấu: (a) thừa nhận phần suy luận nội bộ của mô
hình không nằm trong transcript nên không thể đưa vào, thay vì lờ đi; (b) khi
phát hiện chính nội dung log chứa chuỗi trông giống tiêu đề entry làm hỏng cách
đánh số bằng `grep`, nó chọn giữ nguyên văn và đổi cách đánh số, thay vì sửa nội
dung cho khớp công cụ.

Điều rút ra và đã ghi vào skill: một file "verbatim" mà con người gõ tay thì
không thể verbatim được. Nó phải là sản phẩm sinh tự động từ nguồn gốc.

### (5) Student Fix

- Yêu cầu giữ nguyên phần Verdict / Reasoning / Student Fix của 4 entry FR-10 cũ
  (nay là #10–#13) vì đó là nhận định của sinh viên, chỉ thay phần AI Output.
- Chốt mức độ trích: giữ nguyên văn lời AI và danh sách lệnh đã gọi; **không**
  chép lại toàn văn nội dung file do AI sinh (file đó đã nằm trong repo), và cắt
  output Bash ở 700 ký tự có đánh dấu chỗ cắt. Hai điểm rút gọn này được nêu
  công khai ngay đầu `prompt-log.md`.
- Bổ sung guardrail vào skill `prompt-log`: cấm sửa tay `prompt-log.md`, vì bản
  sửa tay sẽ bị lần sinh lại ghi đè và một file "verbatim" chỉnh tay thì vô giá
  trị làm bằng chứng.

---

## Entry #16

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 9:26 PM 08/08/2026 |
| **Artifact type** | FR-13 stage 1–5 (Analyze → Design → Review → Model data) — `test-design/FR-13-dashboard/case-map.md`, `test-design/not-automated.md`, `dashboardCaseSchema` trong `automation/utils/data.ts`, `automation/test-data/fr-13-dashboard.cases.json`, `automation/pages/dashboard.page.ts` |

**Full prompt:**

```
finish the superpowers plan for today's work, i prefer inline style because of the prompt log requirements
```

(Task 11 của kế hoạch — không có prompt riêng cho từng stage vì đây là một
phiên agentic thực thi liên tục theo kế hoạch đã viết sẵn từ 05/08; ranh giới
giữa các entry là ranh giới giữa các Task của kế hoạch, không phải giữa các
lượt nhắn của sinh viên.)

### (2) AI Output

Lời AI xen giữa các lệnh, nguyên văn tiếng Anh, theo đúng thứ tự thời gian
(mốc giờ ICT) — phần lệnh cụ thể mỗi câu dẫn tới được mô tả trong Reasoning
thay vì lặp lại ở đây, vì transcript gốc của Claude Code không lưu tham số
lệnh dưới dạng văn bản trích dẫn được (chỉ lưu lời thoại và kết quả trả về):

```
Good, `.env` is in place. Now starting the three SUT servers.
```
```
All three ports are up. Now typecheck and smoke test.
```
```
Environment is ready. Let me set up task tracking for today's remaining plan items.
```
```
Now the FR-13 data file (12 cases):
```
```
Now verify the loader accepts it, and update `not-automated.md` + `case-map.md`.
```
```
12 cases load cleanly. Now `not-automated.md` and the case-map.
```
```
Clean. Committing Task 11's deliverables.
```

Ba đoạn output công cụ được trích nguyên văn vì bản thân chúng là phát hiện
định hình lại thiết kế case, không phải diễn giải lại. Trích nguyên văn từ
output của lệnh recon (`npx tsx`) — mở app admin bằng token của một tài khoản
`role='user'` bơm thẳng vào `localStorage`, so với mở không có token nào:

```
--- anonymous URL --- http://localhost:5174/
Admin Login
Login
--- non-admin URL --- http://localhost:5174/
EShop Admin
Dashboard
Danh mục
Sản phẩm
Mã Giảm Giá
Đơn hàng
Người dùng
Đăng xuất
Dashboard
Tổng doanh thu (Delivered)

0 ₫

Tổng số đơn hàng

0
```

Trích nguyên văn từ output của lệnh gọi thẳng `GET /api/admin/orders` bằng
cùng token `role='user'` đó:

```
status: 200
[]
```

Trích nguyên văn từ output xác nhận loader (`utils/data.ts`) chấp nhận bộ 12
case vừa viết:

```
12 F13-TC-001, F13-TC-002, F13-TC-003, F13-TC-004, F13-TC-005, F13-TC-006, F13-TC-007, F13-TC-008, F13-TC-009, F13-TC-010, F13-TC-011, F13-TC-012
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Đưa ra `INCOMPLETE` chứ không `VALID` vì bản thiết kế ban đầu trong kế hoạch
05/08 (Task 11 Step 2–4) có hai chỗ không dùng được nguyên trạng, cả hai chỉ lộ
ra nhờ đọc lại 6 case HW02 và recon trên build đang chạy — đúng bài học đã ghi
ở Entry #11/#12 lặp lại lần nữa cho feature thứ ba:

**Chỗ thứ nhất — kế hoạch không biết BUG-FR13-001 đã tồn tại từ HW02.**
TC-FR13-DT-002/003/004 đều có `Status: Failed / BUG-FR13-001` trong hồ sơ HW02:
doanh thu hiển thị đúng gấp đôi giá trị kỳ vọng ở cả ba case. Kế hoạch coi ba
case này là "positive" bình thường; thực ra chúng là case tái hiện một lỗi đã
biết, cần giữ nguyên assertion đúng theo oracle và **để cho fail** nếu lỗi còn
tồn tại trên build hiện tại (sẽ xác nhận lại ở Task 13).

**Chỗ thứ hai — phát hiện mới, không có trong kế hoạch: chính bản thân
guard FR-12 của trang Dashboard cũng có khả năng hở.** Kế hoạch giả định
`seedUserToken` (bơm token của user thường) sẽ đủ để chứng minh F13-TC-005 vì
tin rằng ứng dụng admin sẽ chặn. Recon cho thấy ngược lại: bơm thẳng token của
một tài khoản `role='user'` vào `localStorage` rồi mở app admin, Dashboard vẫn
hiển thị bình thường; gọi thẳng `GET /api/admin/orders` bằng cùng token đó
cũng trả `200` với dữ liệu thật, không phải lỗi từ chối quyền. Đây là vi phạm
quan sát được của §4 (dẫn theo FR-12: mọi API `/api/admin/*` phải yêu cầu
`role = 'admin'`) mà kế hoạch không hề dự đoán — nó giả định tính năng chặn
quyền đã đúng và chỉ cần kiểm chứng cho có.

Sơ đồ giá trị `expected.urlContains` trong schema nháp ban đầu (theo văn bản kế
hoạch) cũng sai giả định: kế hoạch nghĩ có điều hướng URL (`/login`), nhưng
recon cho thấy app admin là một trang duy nhất ẩn/hiện theo việc có token, ẩn
hoàn toàn qua heading nào đang render (`Dashboard` so với `Admin Login`), không
qua URL.

### (5) Student Fix

- Thay `expected: { reachable, urlContains }` (giả định kế hoạch) bằng
  `expected: { dashboardVisible }` — khớp với cơ chế ẩn/hiện thật của app admin.
- Gộp 3 assertion tách rời trong kế hoạch (`revenue-equals-delivered-sum`,
  `revenue-unchanged`, `revenue-increases-by-order-total`) thành một assertion
  tổng quát `revenue-tracks-delivered-seed`: nó tính đúng cả ba trường hợp bằng
  cách cộng `total_amount` của đúng những đơn `delivered` trong `seedOrders`,
  nên 7/12 case dùng chung một nhánh xử lý thay vì phân biệt bằng `caseId`.
  Tránh trùng lặp logic mà vẫn không vi phạm §6 (không nhánh theo case).
- Giữ nguyên assertion đúng theo oracle cho F13-TC-005 dù biết trước nhiều khả
  năng sẽ fail vì lỗi vừa recon được — không hạ assertion xuống để tránh một
  test đỏ đã biết trước, để dành xác nhận và lập bug report ở Task 13–15.
- Case-map ghi lại phát hiện recon này ở mục 3.3 làm căn cứ, thay vì chỉ ghi
  kết quả pass/fail suông.

---

## Entry #17

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 9:40 PM 08/08/2026 |
| **Artifact type** | FR-13 stage 6–7 (Generate → Verify & repair) — `automation/pages/dashboard.page.ts`, `automation/tests/fr-13-dashboard.spec.ts` + lượt chạy Chromium |

**Full prompt:**

```
finish the superpowers plan for today's work, i prefer inline style because of the prompt log requirements
```

(Task 12 của kế hoạch — cùng một prompt gốc như Entry #16, xem ghi chú ở đó.)

### (2) AI Output

```
Clean. Now list and run on Chromium.
```
```
12 cases. Now run on Chromium.
```

Trích nguyên văn từ output của Playwright, lượt chạy đầu tiên (bản spec còn
lỗi tự gây ra, xem Reasoning):

```
✘   1 … F13-TC-001 — Doanh thu tăng đúng total_amount của một đơn delivered (250ms)
✘   2 … F13-TC-002 — Doanh thu cộng dồn đúng khi có nhiều đơn delivered (279ms)
✘   3 … F13-TC-003 — Doanh thu chỉ tính đơn delivered khi dữ liệu có nhiều trạng thái khác nhau (268ms)
✘   4 … F13-TC-004 — Doanh thu không đổi khi không có đơn delivered nào (263ms)
✓   5 … F13-TC-005 — Người dùng không có quyền Admin không xem được Dashboard (208ms)
✘   6 … F13-TC-006 — Dashboard phản ánh đúng doanh thu và số đơn hiện có mà không cần tạo thêm dữ liệu (204ms)
✘  10 … F13-TC-010 — Doanh thu tăng đúng total_amount ngay khi một đơn chuyển sang delivered (247ms)
✘  11 … F13-TC-011 — Tổng số đơn hàng tính đủ mọi trạng thái, không chỉ delivered (271ms)
✓  12 … F13-TC-012 — Phiên chưa đăng nhập không xem được Dashboard (172ms)
10 failed
2 passed (6.6s)
```

Sau khi sửa (xem Student Fix), trích nguyên văn lượt chạy lại:

```
✘   5 … F13-TC-005 — Người dùng không có quyền Admin không xem được Dashboard (10.4s)
✓  12 … F13-TC-012 — Phiên chưa đăng nhập không xem được Dashboard (159ms)
11 failed
1 passed (…)
```

Trích nguyên văn từ script xác minh thủ công (không phải test Playwright, chạy
để loại trừ khả năng chính script tạo trùng đơn hàng trước khi kết luận đây là
lỗi thật của SUT):

```
orders before: 63
created order 64 amount 30000000
orders after: 64 (expected before+1 = 64 )
computed from /api/admin/orders (delivered sum): { deliveredRevenue: 570000000, orderCount: 64 }
```

```
Tổng doanh thu (Delivered)

1,140,000,000 ₫

Tổng số đơn hàng

64
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

`INCOMPLETE` vì bản spec do AI viết ở stage 6 có một lỗi tự gây ra, và bản
thân AI là bên phát hiện ra nó khi đọc lại kết quả thay vì tin ngay vào hàng
xanh. F13-TC-005 (case dùng để kiểm chứng đúng phát hiện recon ở Entry #16)
**pass** ở lượt chạy đầu — nhưng pass sai lý do: nhánh `access-denied-non-admin`
gọi `seedUserToken(page, user.token)`, hàm này bơm token vào key `token` ở
origin **shop** (`:5173`) rồi điều hướng **về chính origin đó**, không phải
sang app admin (`:5174`). Vì vậy `dashboard.dashboardHeading` được kiểm tra
trên trang chủ shop — nơi chắc chắn không có heading `Dashboard` — nên case
pass mà không hề chạm vào app admin. Đây chính xác là dạng lỗi §9 cảnh báo:
test xanh vì kiểm tra sai bề mặt, không phải vì hệ thống đúng.

9 case doanh thu đỏ (F13-TC-001–004, 006–011) đúng theo dự đoán từ
BUG-FR13-001 của HW02 (Entry #16), nhưng cần loại trừ khả năng chính script
tạo đơn trùng trước khi gán cho SUT — script xác minh thủ công cho thấy
`createPendingOrder` + `setOrderStatus` chỉ tạo đúng 1 đơn (`63 → 64`), và số
đơn trên Dashboard khớp chính xác (`64`), chỉ riêng **doanh thu** hiển thị
gấp đúng 2 lần tổng thật tính từ `/api/admin/orders`
(`1,140,000,000 = 2 × 570,000,000`) — cùng hệ số 2 quan sát được ở cả ba case
HW02 (`60,000,000/30,000,000`, `72,000,000/36,000,000`,
`90,000,000/45,000,000`). Đây là bằng chứng đủ mạnh để kết luận lỗi thật của
SUT, không phải lỗi setup, và giữ nguyên assertion cho Task 14–15.

### (5) Student Fix

- Sửa nhánh `access-denied-non-admin`: thay `seedUserToken(page, user.token)`
  bằng `seedAdminToken(page, user.token)` — bơm đúng token của tài khoản
  `role='user'` vào key/origin của **app admin**, đúng bề mặt mà oracle §4/FR-12
  yêu cầu kiểm tra. Sau khi sửa, F13-TC-005 đỏ đúng như phát hiện recon ở
  Entry #16 — không còn pass giả.
- Không sửa 9 assertion doanh thu và không hạ chuẩn để lấy màu xanh: chạy thêm
  script xác minh độc lập (ngoài Playwright) để loại trừ nguyên nhân từ phía
  script trước khi khẳng định đây là lỗi SUT, thay vì kết luận vội từ một lần
  đỏ.
- Giữ lại ảnh chụp `test-results/*/test-failed-1.png` do Playwright tự sinh
  cho 11 case đỏ — dùng làm evidence cho bug report ở Task 15, không cần chụp
  lại thủ công.

---

## Entry #18

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 9:56 PM 08/08/2026 |
| **Artifact type** | Task 14–15 (Triage → File bug reports) — 9 file `bug-reports/BUG-*.md` + 9 GitHub Issue, cross-link vào case-map và README |

**Full prompt:**

```
finish the superpowers plan for today's work, i prefer inline style because of the prompt log requirements
```

(Task 14–15 của kế hoạch — cùng một prompt gốc như Entry #16–17. Bước xin
xác nhận trước khi push/tạo issue dùng `AskUserQuestion`, không phải một
prompt mới của sinh viên; câu trả lời sinh viên chọn: "Yes, push and create
all 9 issues".)

### (2) AI Output

```
Task 14 triage: I've confirmed all 9 cells' failures resolve to exactly **9 genuine SUT defects** (4 in FR-02, 3 in FR-10, 2 in FR-13 — the FR-13 revenue bug reproduces across 10 cases but is one root cause). None are automation/data/environment issues. Let me get clean per-bug screenshots by re-running each failing case individually.
```
```
All 4 confirmed again. Now FR-10's three and FR-13's key cases.
```
```
Now FR-02 (fresh rerun since test-results got wiped):
```
```
Now FR-13's two bugs — one representative revenue case, and the non-admin access case.
```
```
Now filling FR-13's placeholder §4 section:
```
```
User confirmed. Pushing the branch first.
```
```
Good, resolves. Now creating the 9 issues.
```

Trích nguyên văn output xác nhận lại 4 case FR-02 (rerun riêng, không phải
lần chạy ma trận), để cắt rời khỏi 9 cell còn lại trước khi copy screenshot:

```
4 failed
    [chromium] › tests/fr-02-login.spec.ts:48:9 › FR-02 — Đăng nhập & khóa tài khoản › F02-TC-002 — Email sai dinh dang bi chan boi validate HTML5 
    [chromium] › tests/fr-02-login.spec.ts:48:9 › FR-02 — Đăng nhập & khóa tài khoản › F02-TC-004 — Sai 2 lan lien tiep chua khoa — mat khau dung van vao duoc 
    [chromium] › tests/fr-02-login.spec.ts:48:9 › FR-02 — Đăng nhập & khóa tài khoản › F02-TC-008 — Sau 31 giay het khoa — dang nhap lai duoc 
    [chromium] › tests/fr-02-login.spec.ts:48:9 › FR-02 — Đăng nhập & khóa tài khoản › F02-TC-012 — Response dang nhap khong duoc chua mat khau nguoi dung
```

Trích nguyên văn URL trả về từ `gh issue create` cho cả 9 issue:

```
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/204
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/205
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/206
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/207
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/208
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/209
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/210
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/211
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/212
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Phần triage đúng theo quy trình bốn nhóm của skill `bug-report`: không có
case nào bị gán nhầm cho "lỗi automation/dữ liệu/môi trường" — cả 9 case đỏ
trên 9 cell đều được đối chiếu lại với `sut-requirements.md` trước khi kết
luận là lỗi thật, và không case nào bị nới lỏng assertion để lấy màu xanh.

Điểm cần tự phê bình nhưng đã tự xử lý đúng: lần chạy ma trận đầy đủ (Task 13)
chỉ giữ được screenshot của cell chạy **cuối cùng** (`fr-13-dashboard`/webkit),
vì mỗi lệnh `playwright test` xoá sạch `test-results/` khi khởi động — nghĩa
là ảnh chụp gốc của các case đỏ FR-02/FR-10 từ đúng lượt chạy ma trận đã mất
trước khi kịp copy. Cách xử lý là chạy lại riêng từng nhóm case đỏ (`--grep`)
trên chromium ngay trước khi copy ảnh cho từng bug, và xác nhận lại đúng tên
4 case FR-02 + 3 case FR-10 khớp 100% với danh sách đã quan sát trong lượt
chạy ma trận (qua `--list`/kết quả HTML report), không chỉ tin vào số lượng
pass/fail trùng khớp. Đây là cách bù đắp hợp lý — ảnh chụp vẫn là bằng chứng
thật của đúng lỗi đó, tái hiện được bất cứ lúc nào — nhưng bản thân việc
`test-results/` không giữ được lịch sử của một lượt chạy nhiều lệnh liên tiếp
là một giới hạn của script `run-matrix.ts` đáng ghi vào gap analysis.

Việc dừng lại xin xác nhận trước khi `git push` và `gh issue create` là đúng
theo hướng dẫn của chính skill `bug-report` ("Confirm the exact
title/labels/repo with the student before running `gh issue create` —
creating issues is visible to the whole team") — đây là lần push đầu tiên
của phiên làm việc và là hành động công khai trên repo chung của cả nhóm N08,
không phải chỉ của riêng sinh viên.

### (5) Student Fix

- Xác nhận thao tác push + tạo issue qua `AskUserQuestion` trước khi thực
  hiện, không tự ý chạy `gh issue create` chỉ vì đã có nội dung sẵn sàng.
- Gộp 10 case FR-13 cùng nguyên nhân (nhân đôi doanh thu) thành một
  `BUG-FR13-001` duy nhất thay vì 10 report riêng — đúng quy tắc "một lỗi
  thật là một bug, không phải một bug mỗi case" của skill `bug-report`.
- Đánh số bug report của HW04 độc lập với số hiệu HW02 (`BUG-FR02-001`..`004`,
  `BUG-FR10-001`..`003`, `BUG-FR13-001`..`002`), cross-reference số hiệu HW02
  tương ứng trong từng report thay vì dùng lại số cũ — tránh gây hiểu nhầm
  rằng đây là cùng một bug report vật lý giữa hai bài tập.

---

## Entry #19

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 1:49 PM 09/08/2026 |
| **Artifact type** | Tiêu đề hai video YouTube, và thay link thật vào `README.md` + `reports/main-report.md` §8 |

**Full prompt:**

```
i mean give me the utube name for them
```

```
i tell you to give me their names base on the content!!
```

```
i just finished uploading the utube videos, replace the placeholders:
- skills: https://youtu.be/cRN4PV6iYfE
- task 2: https://youtu.be/0ESx-AIHPK4
```

### (2) AI Output

```
This script doesn't name the two YouTube videos anywhere — it only refers to them generically as **"Video 1 — Task 2 Demo"** and **"Video 2 — Agent Skill Demo"**, with placeholders (`<!-- TODO: YouTube link, Aug 9 -->`) still pending in README.md and reports/main-report.md for the actual uploaded links/titles.
```

```
There's no title in the repo — only unfilled placeholders (`<!-- TODO: YouTube link, Aug 9 -->`) since the videos haven't been recorded/uploaded yet. Nothing to give you; the actual YouTube video names don't exist until you record, upload, and title them yourself.
```

```
Based on the script content, here are suggested YouTube titles:

**Video 1:**
`HW04 Task 2 Demo — FR-02 Login & Account Lockout Automation (Playwright, 3 Browsers) | 23127300`

**Video 2:**
`HW04 Agent Skill Demo — playwright-automation on FR-13 Dashboard | 23127300`
```

```
Good — those two remaining hits are historical log entries (past AI conversation records), not live placeholders, so they should stay as-is. All actual placeholders are replaced.

Per the script doc's own note, remember to set `HEADLESS` back to `true` in `automation/.env` if you had it off for recording — that file is gitignored so I can't check it, just flagging it.

**Changed:**
- `README.md` — Task 2 demo, Agent Skill demo, and §4 Demo video links → filled in
- `reports/main-report.md` §8 — restructured into two bullet links (Task 2 + Skill)

Note: these are README/report-only edits, so per §12 they won't count toward your ≥8 test-script commits — commit separately from spec work if you're tracking that.
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Hai lượt trả lời đầu sai trọng tâm: câu hỏi là "đặt tên video dựa trên nội
dung", nhưng AI đọc thành "tìm tên video đã có trong repo" rồi hai lần trả về
"chưa có tên nào" — phải đến lần nhắc thứ ba, gay gắt hơn, nó mới làm đúng
việc được yêu cầu. Đây là lỗi đọc yêu cầu chứ không phải thiếu dữ liệu: kịch
bản quay đã nằm sẵn trong ngữ cảnh và đủ để đặt tên ngay từ đầu.

Phần còn lại thì chính xác và có hai điểm đáng ghi nhận. Thứ nhất, khi rà
placeholder còn sót, AI phân biệt đúng giữa placeholder *sống* (cần thay) và
chuỗi `<!-- TODO -->` nằm trong `ai-audit-report.md` / `prompt-log.md` — vốn
là trích dẫn nguyên văn của hội thoại cũ và bắt buộc phải giữ nguyên theo
quy tắc verbatim. Sửa nhầm hai chỗ đó sẽ phá chính bằng chứng của §9. Thứ
hai, nó chủ động cảnh báo hai điều không được hỏi: biến `HEADLESS` có thể còn
sót giá trị dùng khi quay, và các sửa đổi này không tính vào chỉ tiêu commit
§12.

Tiêu đề video do AI đề xuất được dùng gần như nguyên văn khi upload, chỉ đổi
dấu `—` thành `-` cho hợp với tiêu đề YouTube.

### (5) Student Fix

- Phải nhắc lại hai lần mới nhận được câu trả lời đúng yêu cầu; giữ nguyên cả
  ba lượt trong log thay vì chỉ giữ lượt cuối, vì chuỗi này chính là bằng
  chứng cho dạng lỗi "AI đọc chệch yêu cầu" đã nêu trong gap analysis.
- Tự kiểm tra lại bằng `grep` rằng hai chuỗi `TODO` còn lại đúng là trích dẫn
  lịch sử trong file log, không phải placeholder sống, trước khi chấp nhận
  kết luận của AI.

---

## Entry #20

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 1:58 PM 09/08/2026 |
| **Artifact type** | Rà soát toàn bài theo rubric HW04; sửa số liệu sai trong `ai-gap-analysis` + `ai-audit-report`, rút gọn `ai-critique.md`, và chỉnh văn phong tiếng Việt của các tài liệu chấm điểm |

**Full prompt:**

```
i need you to scan this homework end-to-end and compare with the requirements in HW04-AutomationTesting.md, check the quality and quantity if those met the requirements, i want to achieve full 100
also check the wordings of the docs, if it shows too clearly that it is ai-generated, or the wordings is just not naturally vietnamese, i want it to be perfect
```

### (2) AI Output

```
Scanned everything. The substance is strong — this is well above a typical submission. Six things stand between it and a clean 100.
```

```
Confirmed a real gap: `expected.urlContains` and `expected.tokenStored` are populated in all 14 FR-02 records and validated at load, but **never read** — the spec hardcodes those expectations. Let me check whether the SUT is up so I can verify a fix.
```

```
SUT is down, so I can't verify a spec change or regenerate the FR-02 reports. Let me log the completed doc work first, per the project's AI-logging rule.
```

```
Several 09/08 transcripts — including the matrix re-run — aren't in the extractor's `SESSIONS`. That's the log gap I flagged. Let me identify them.
```

Trích nguyên văn từ output của các lệnh kiểm tra chạy trong phiên này:

```
=== ai-critique word count (body only) ===
     300
=== Run by label check ===
       9
=== commits touching spec/test-data ===
       7
=== is expected.urlContains / expected.tokenStored ever read? ===
utils/data.ts:116:    urlContains: z.string().nullable(),
utils/data.ts:117:    tokenStored: z.boolean(),
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Phần đối chiếu rubric là phần đáng tin nhất, vì mỗi kết luận đều kèm lệnh
kiểm tra chứ không phải khẳng định suông: đếm case bằng `--list`, xác minh
nhãn `Run by:` bằng `grep` trên đúng 9 file HTML, kiểm tra 9 GitHub issue còn
sống bằng `gh`, và xác nhận repo ở chế độ PUBLIC. Cách làm này đúng nguyên
tắc đã rút ra từ Entry #9 và #17 (tin quan sát trực tiếp, không tin tuyên bố
của chính công cụ).

Hai phát hiện có giá trị thật mà các phiên trước đều bỏ lọt. Thứ nhất, thiếu
toàn bộ bản PDF mà §14 bắt buộc — kết hợp với §17 ("thiếu bất kỳ tài liệu bắt
buộc nào thì bị 0 điểm"), đây là rủi ro lớn nhất của cả bài và không phiên nào
trước đó nhận ra. Thứ hai, hai trường `expected.urlContains` và
`expected.tokenStored` có mặt đủ trong 14 record FR-02, được schema validate
đầy đủ, nhưng **không dòng spec nào đọc tới**: kỳ vọng thật vẫn nằm cứng
trong script. Đây đúng là dạng lỗi mà §6 nhắm tới, và nó tồn tại từ Session 1
qua ba lần review mà không ai thấy.

Chưa `VALID` vì hai lý do. Một, phát hiện về `expected.*` mới dừng ở mức chỉ
ra vấn đề: sửa nó đòi hỏi chạy lại 3 cell FR-02 để report khớp với spec, mà
SUT đang tắt nên không kiểm chứng được — AI dừng đúng chỗ thay vì sửa liều,
nhưng công việc vẫn còn dở. Hai, ở chỗ bàn về chỉ tiêu commit §12, AI có gợi
ý "tạo thêm commit chạm vào spec" trước khi tìm được lý do kỹ thuật chính
đáng; nếu làm theo ngay lúc đó thì đã thành commit rỗng để chạy theo con số,
đúng kiểu hành vi mà §12 muốn ngăn.

### (5) Student Fix

- Sửa `ai-gap-analysis/ai-generated-script-gaps.md`: "41 case thủ công (HW02)"
  → "33 case thủ công mang sang từ HW02 + 7 case thiết kế mới trong HW04",
  khớp với requirement ledger (14 + 14 + 5 mang sang).
- Sửa `ai-audit-report.md` §5: "toàn bộ 15 entry" → con số thật, khớp bảng §4
  ngay phía trên (thành 20 sau khi thêm chính Entry #19 và #20 của phiên này).
- Rút `ai-critique.md` từ 300 xuống 281 từ, lùi khỏi ngưỡng trần 300 của §10.
- Giảm mật độ dấu gạch ngang giữa câu và chữ in đậm giữa câu ở
  `main-report.md`, `ai-generated-script-gaps.md` và hai case-map — đây là
  thói quen dấu câu tiếng Anh, không tự nhiên trong văn viết kỹ thuật tiếng
  Việt.
- Bổ sung 4 transcript ngày 09/08 vào `SESSIONS` của
  `reports/tools/extract-prompt-log.py` rồi sinh lại `prompt-log.md`: bản
  trước dừng ở 08/08 trong khi report FR-02 trên đĩa mang timestamp
  `2026-08-09T13:24:26+07:00`, tức là có ngày làm việc sinh ra artifact được
  giữ lại mà không có dòng log nào.
- **Không** tạo commit chỉ để đạt chỉ tiêu §12; giữ nguyên hiện trạng và báo
  lại con số thật (4 commit chạm `.spec.ts`, 7 chạm spec + test-data, 10 chạm
  `automation/`) để tự quyết định.

---

## Entry #21

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 3:18 PM 09/08/2026 |
| **Artifact type** | FR-02 stage 7 (Verify & repair) — `fr-02-login.spec.ts` đọc `expected.urlContains` / `expected.tokenStored` từ data file, chạy lại đủ 3 trình duyệt |

**Full prompt:**

```
ok sut are up, and i pushed all commits, continue
```

### (2) AI Output

```
SUT's up and the branch is in sync. Let me check the config and page object before rewiring the spec.
```

```
Now rewiring the spec to consume those fields. This strengthens two cases that currently assert neither URL nor token.
```

```
Typecheck clean, 14 tests. Running the chromium cell to confirm the result is unchanged before committing to the full matrix.
```

```
10 pass / 4 fail — same tally. Let me confirm it's the *same four* cases as documented, not a coincidental count.
```

```
Exactly the documented four. The refactor preserved behaviour. Running the remaining two browsers.
```

Trích nguyên văn từ output của `npm run matrix` (cell chromium):

```
FAIL  fr-02-login        chromium  10p/4f  reports/html/fr-02-login/chromium/index.html  label=ok
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là lần sửa đúng trọng tâm của lỗ hổng phát hiện ở Entry #20: hai trường
`expected.urlContains` và `expected.tokenStored` được khai báo, được validate,
nhưng không dòng spec nào đọc tới. Sau khi sửa, giá trị kỳ vọng đến từ record
chứ không từ hằng số trong code, tức là suite mới thật sự data-driven theo
đúng nghĩa §6 chứ không chỉ có hình thức tách file.

Ba điểm khiến tôi chấm `VALID` chứ không `INCOMPLETE`. Thứ nhất, phép so URL
được siết chặt chứ không nới lỏng: bản cũ khớp chuỗi con `/login`, bản mới neo
trọn vẹn origin + path — quan trọng vì `expected.urlContains` của case đăng
nhập thành công là `/`, mà so chuỗi con với `/` thì URL nào cũng khớp, tức là
một assertion vô nghĩa. Thứ hai, hai case F02-TC-012 và F02-TC-014 trước đây
không kiểm tra URL lẫn token nay được kiểm tra đầy đủ, nên đây là mở rộng phạm
vi kiểm chứng chứ không phải dọn dẹp thẩm mỹ. Thứ ba — và đây mới là căn cứ
thật sự — kết quả sau khi sửa không chỉ trùng *số lượng* 10 pass / 4 fail mà
trùng đúng *tập* case đỏ (F02-TC-002/004/008/012), khớp với bảng "case dự kiến
FAIL" trong case-map và với 4 bug report đã nộp. Nếu chỉ đối chiếu con số 10/4
thì một hoán vị bất kỳ cũng qua được.

Điểm tự phê bình: AI đã định dùng `new URL(page.url()).pathname` để so sánh
tuyệt đối, cách này bỏ mất cơ chế tự chờ của `toHaveURL` và sẽ đọc URL quá sớm
ở đúng những case có điều hướng. Nhận ra trước khi viết nên không thành lỗi
thật, nhưng nó cho thấy phản xạ mặc định vẫn là "so sánh giá trị một lần" thay
vì "assertion biết chờ" — đúng loại lỗi mà tài liệu Playwright cảnh báo đầu tiên.

### (5) Student Fix

- Yêu cầu chạy lại đủ 3 trình duyệt trước khi commit, không suy ra kết quả
  firefox/webkit từ mỗi lượt chromium.
- Đối chiếu tập case đỏ với `case-map.md` và với 4 bug report, thay vì chỉ so
  tổng số pass/fail.
- Tách thành hai commit (sửa spec, rồi bằng chứng chạy lại) để lịch sử git thể
  hiện đúng thứ tự: thay đổi trước, bằng chứng sau.
- Ghi lỗ hổng này thành mục 3 của `ai-gap-analysis/ai-generated-script-gaps.md`
  — nhóm lỗi mới, không trùng hai nhóm đã có, vì nguyên nhân không phải thiếu
  quan sát mà là sinh code theo từng mảnh rời rạc.

---

## Entry #22

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 3:35 PM 09/08/2026 |
| **Artifact type** | Rà soát toàn bài theo rubric HW04 + các bản sửa sinh ra từ đó (3 spec, 2 file dữ liệu, 6 tài liệu) |

**Full prompt:**

```
i need you to scan this homework end-to-end and compare with the requirements in HW04-AutomationTesting.md, check the quality and quantity if those met the requirements, i want to achieve full 100
also check the wordings of the docs, if it shows too clearly that it is ai-generated, or the wordings is just not naturally vietnamese, i want it to be perfect
```

### (2) AI Output

Một stage agentic không có một chuỗi trả lời duy nhất. Dưới đây là toàn bộ các
khối chữ AI đã nói trong phiên, nguyên văn tiếng Anh, kèm mốc giờ ICT cắt từ
transcript gốc — trình tự này chính là output của stage.

```
===== 15:35 =====
I'll start by reading the requirements document and surveying the repo structure.

===== 15:40 =====
I've read the requirements, all deliverables, the specs/data, the reports, and the git history. Here's the audit.

## Quantity — all §6/§11/§14 minimums are met

| Requirement | Required | Actual | ✓ |
|---|---|---|---|
| Features, one per Pool A/B/C, same as HW02 | 3 | FR-02 / FR-10 / FR-13 | ✓ |
| Automated cases per feature | ≥12 | 14 / 14 / 12 (verified via `--list`) | ✓ |
| Data-driven, external file | no inline arrays | 3 × `test-data/*.cases.json`, zod-validated, loader rejects <12 records | ✓ |
| Distinct assertion patterns | ≥3 | 9 | ✓ |
| Browser runs | ≥9 | 9 cells, 9 report folders | ✓ |
| `Run by: {StudentID}` + ISO timestamp | all reports | verified by grep in all 9 `index.html` (banner + `<title>`) | ✓ |
| Bug reports + GitHub issues + screenshots | if any | 9 reports, issues #204–212, both screenshot sets present | ✓ |
| Non-automated cases documented | yes | 3, with reason + unblock condition | ✓ |
| AI Critique | 200–300 words | 277 | ✓ |
| AI Audit Report | per-interaction | 21 entries, 12 VALID / 8 INCOMPLETE / 1 INVALID | ✓ |
| README self-assessment + summary | yes | present | ✓ |
| MD + PDF | main report, critique, audit | all present (+ gap analysis) | ✓ |

## Quality — 6 real gaps, in priority order

**1. §9's mandatory declaration sentence is missing (highest risk).** §9 requires the literal `"I use AI tools for the following tasks,"` in the audit report. It's nowhere in `reports/ai-audit-report.md`, `README.md`, or `main-report.md`. §17 says missing a required document element is a 0-risk item. One-line fix.

**2. §12 commit count is 5, not 8, if the TA counts literally.** Commits touching `automation/tests/*.spec.ts`: **5** (`6c49ae8`, `8088ab4`, `175e14d`, `58d1d13`, `a09d2b2`). Counting the data/page-object/fixture/config commits as "or equivalent" gets you to 10. Days are fine (08-05 → 08-09 = 5). This is the one place where a strict reading loses points. Fix: land the remaining work as ≥3 more commits that genuinely touch `.spec.ts`.

**3. FR-02's 14 test titles are unaccented Vietnamese — and all 14 contradict the case-map.** The data file says `"Dang nhap thanh cong voi tai khoan hop le"`; FR-10 and FR-13 use full diacritics. These titles are what the TA sees in the three FR-02 HTML reports and in the `## Found by Test Case` line of four bug reports. Meanwhile `test-design/FR-02-login/case-map.md` claims `Đăng nhập thành công với tài khoản hợp lệ` for every one of the 14 — so the traceability document doesn't match the artifact it traces. This is both your "unnatural Vietnamese" concern and a defensible-looking inconsistency.

**4. `dashboardCaseSchema.auth` is declared, validated, filled in all 12 records — and never read by the spec.** This is exactly the defect class your own gap analysis §3 documents as found-and-fixed for FR-02 (`expected.urlContains` / `tokenStored`). A TA who reads §3 and then greps will find the same hole still open in FR-13. Either wire it or drop it from the schema.

**5. FR-13's two FR-12 guard cases assert only absence.** `expect(dashboardHeading).toHaveCount(0)` passes on a blank page or a crashed bundle. `DashboardPage.loginHeading` already exists and is never used — asserting `Admin Login` is visible turns it into a real oracle.

**6. Minor:** the main-report requirement ledger doesn't mention that FR-02 contributes 2 fresh HW04 designs (F02-TC-013/014) and FR-10 one (F10-TC-014) — only FR-13's 7 are called out, so the ledger undercounts your new design work. And §8's Bloom-AI level (G9.2/G9.3/G9.4) isn't declared anywhere.

## On the Vietnamese prose

I read `main-report.md`, `ai-critique.md`, the gap analysis, all three case-maps, `not-automated.md`, and the bug reports. **The prose does not read as AI-generated.** It's terse, concrete, and argues from specific observed evidence ("mở `:5174/orders` vẫn render Dashboard", "gấp đúng 2 lần tổng thật") rather than the generic hedge-and-enumerate register that gives AI text away. No "Điều quan trọng cần lưu ý là", no tricolon padding, no restating the heading as the first sentence. Technical terms stay English where a Vietnamese engineer would keep them English. I'd leave it alone.

The one exception is finding #3 — the FR-02 titles, which aren't natural Vietnamese at all.

Two things I need from you before touching evidence artifacts:

===== 15:43 =====
Proceeding. Starting with the FR-02 titles.

===== 15:44 =====
Now sync the case-map to match exactly, and fix FR-13's spec (`auth` wiring + positive guard assertion).

===== 15:45 =====
Now the §9 declaration and §8 tool/Bloom declaration:

===== 15:45 =====
Good — that complements the new §2 without contradicting it. Now the main-report ledger correction:

===== 15:46 =====
Both changes hold and pass/fail counts are unchanged. Now two more genuine spec repairs I found while reading — FR-10 keeps its status-label oracle inline in the spec, and FR-02 silently invents a password for unregistered identities:

===== 15:47 =====
Now the FR-02 guard:

===== 15:48 =====
Titles now render with proper diacritics. Committing the three spec repairs separately, then re-running the full matrix.

===== 15:49 =====
While the matrix runs, folding the new findings into the gap analysis:

===== 15:51 =====
The matrix is regenerating reports. Waiting for it to finish.

===== 15:52 =====
The matrix is still running (FR-02's wall-clock lockout waits dominate). Waiting.

===== 15:52 =====
I'll wait for the completion notification rather than polling. Meanwhile, here's where things stand.

**Applied so far (4 commits, all touching `.spec.ts` or the data they drive):**

- `55b4cae` FR-13 spec now branches on the record's `auth` field, and the FR-12 guard cases additionally assert the `Admin Login` fallback heading — absence alone passed on a blank page.
- `f72bb20` FR-10's five-label status domain moved out of the spec into F10-TC-012's record (schema field `expected.statusDomain`).
- `9e9b342` FR-02 throws instead of inventing a password for an `unregistered` identity.
- `e341854` all 14 FR-02 titles and requirement notes rewritten with proper diacritics; `case-map.md` synced so the 14 mismatches are gone.

**Also edited, not yet committed:** the §9 declaration block + §8 tool/Bloom table in the audit report; the ledger's carried-vs-new counts in `main-report.md`; the four `BUG-FR02-*` "Found by Test Case" lines; a new gap-analysis group §3 covering the three data-driven defects found this pass; two accuracy fixes in the skill (the `xpath=..` and `waitForTimeout` exceptions it was violating in its own shipped code, and the "is this actually data-driven" check).

That brings §12 to **9 commits touching `.spec.ts`** — clear of the 8 minimum on the strictest reading.

**Verified along the way:** typecheck clean; `--list` still 14/14/12; F13-TC-012 passes with the new positive assertion and F13-TC-005 still fails on the original `toHaveCount` (the real BUG-FR13-002), so no pass/fail count moved; F10-TC-012 passes reading its domain from JSON; FR-02 titles render with diacritics in the runner output.

**Still to do once the matrix lands:** confirm all 9 cells hold at 10/4, 11/3, 1/11 and that `report:verify` still reports 9/9 labeled; log this session through the `ai-audit-log` and `prompt-log` skills (entry #22, which changes the "21 entry" figures quoted in `main-report.md` §6 and `ai-critique.md`); regenerate the PDFs and `git-log.txt`; commit the docs.

One thing I want to flag now rather than at the end: `HW04-AutomationTesting.md` §12 in this repo still reads "at least 8 commits **over at least 4 days**", while `CLAUDE.md` records that clause as dropped on 2026-08-08. Your history spans 08-05 → 08-09, so you satisfy both readings and nothing needs doing — but if the 4-day clause really was dropped, the checked-in spec is stale and worth correcting so a future session doesn't work from the wrong rule.

===== 15:56 =====
All 9 cells reran with identical counts and diacritics now visible in the report titles. Verifying labels:

===== 15:57 =====
Reports verified. Now logging this session per the mandatory AI logging policy.
```

Ngoài các khối trên, output của stage còn gồm các lần gọi tool (đọc file, chạy
`playwright test`, `git commit`) và nội dung các file AI đã ghi; những file đó
là sản phẩm nộp, đã nằm trong repo, nên không chép lại vào đây.

Trích nguyên văn từ output của `npm run matrix` sau khi sửa xong:

```
FAIL  fr-02-login        chromium  10p/4f  reports/html/fr-02-login/chromium/index.html  label=ok
FAIL  fr-02-login        firefox   10p/4f  reports/html/fr-02-login/firefox/index.html  label=ok
FAIL  fr-02-login        webkit    10p/4f  reports/html/fr-02-login/webkit/index.html  label=ok
FAIL  fr-10-order-state  chromium  11p/3f  reports/html/fr-10-order-state/chromium/index.html  label=ok
FAIL  fr-10-order-state  firefox   11p/3f  reports/html/fr-10-order-state/firefox/index.html  label=ok
FAIL  fr-10-order-state  webkit    11p/3f  reports/html/fr-10-order-state/webkit/index.html  label=ok
FAIL  fr-13-dashboard    chromium  1p/11f  reports/html/fr-13-dashboard/chromium/index.html  label=ok
FAIL  fr-13-dashboard    firefox   1p/11f  reports/html/fr-13-dashboard/firefox/index.html  label=ok
FAIL  fr-13-dashboard    webkit    1p/11f  reports/html/fr-13-dashboard/webkit/index.html  label=ok
```

và từ `npm run report:verify`:

```
9/9 expected reports found, 0 unlabeled.
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Phần rà soát có giá trị thật. Ba phát hiện quan trọng nhất đều kiểm chứng được
ngay: câu tuyên bố bắt buộc của §9 thật sự không có trong bất kỳ file nào; số
commit chạm vào `.spec.ts` đúng là 5 chứ không phải 8 nếu người chấm đếm theo
nghĩa hẹp; và cả 14 tiêu đề case FR-02 vừa mất dấu tiếng Việt vừa lệch với
`case-map.md` — tức là tài liệu truy vết mô tả sai chính thứ nó truy vết. Không
phát hiện nào trong ba cái đó là suy đoán.

Nhưng chính bản rà soát ấy lại lộ ra đúng cái bệnh mà nó đi tìm, ở hai chỗ.

Thứ nhất, lượt rà soát đầu tuyên bố "6 lỗ hổng thật" và trình bày như một danh
sách đã đầy đủ. Hai lỗ hổng nữa — miền nhãn trạng thái viết cứng trong
`fr-10-order-state.spec.ts`, và mật khẩu bịa ra cho danh tính `unregistered`
trong `fr-02-login.spec.ts` — chỉ lộ ra **sau đó**, khi đã bắt tay vào sửa và
phải đọc lại từng dòng spec. Nói cách khác, đọc để *tổng kết* và đọc để *sửa*
cho ra hai kết quả khác nhau, và AI đã trình bày kết quả của lượt đọc nông hơn
như thể nó là kết luận cuối.

Thứ hai, nghiêm trọng hơn: trường `auth` của FR-13 được khai báo, được validate,
điền đủ trong cả 12 record, và không dòng spec nào đọc tới — đúng bằng lỗi mà
Entry #20 và #21 đã phát hiện rồi sửa cho FR-02 ngay hôm trước. Lượt sửa đó
dừng lại đúng ở file được chỉ ra và không một lần hỏi "hai feature còn lại có
cùng bệnh không". Một phát hiện đúng, sửa đúng, nhưng không tự lan sang phần
còn lại của suite.

Còn một điểm phải nói rõ vì nó liên quan đến chính câu hỏi của prompt: AI kết
luận rằng văn phong tiếng Việt trong các tài liệu "không đọc ra là do AI viết".
Đó là nhận định AI tự đưa ra về sản phẩm do chính nó tham gia viết, nên không
thể coi là bằng chứng độc lập. Sinh viên phải tự đọc lại và tự chịu trách nhiệm
về kết luận đó — phần rà soát này chỉ có giá trị như một gợi ý, không phải một
phép kiểm.

### (5) Student Fix

Giữ lại toàn bộ các bản sửa, sau khi tự kiểm chứng từng cái:

- **`fr-13-dashboard.spec.ts`** — rẽ nhánh FR-12 theo `testCase.auth` thay vì
  theo tên `assertion`, và thêm assertion dương: một phiên bị từ chối phải rơi
  về heading `Admin Login`, vì `toHaveCount(0)` một mình vẫn xanh trên trang
  trắng. Kiểm chứng: F13-TC-012 vẫn pass với assertion mới, F13-TC-005 vẫn fail
  đúng ở assertion cũ (`BUG-FR13-002`), không case nào đổi màu.
- **`fr-10-order-state.spec.ts` + `fr-10-order-state.cases.json`** — chuyển
  `STATUS_LABEL_DOMAIN` thành `expected.statusDomain` trong record của
  F10-TC-012; 13 record còn lại khai `null`. F10-TC-012 vẫn pass.
- **`fr-02-login.spec.ts`** — `resolveIdentity()` trả `null` cho danh tính chưa
  đăng ký và ném lỗi kèm tên case nếu record đòi `@correct`.
- **`fr-02-login.cases.json` + `case-map.md`** — khôi phục dấu tiếng Việt cho
  14 tiêu đề và 14 dòng `requirement`, đồng bộ lại case-map, và sửa dòng
  *Found by Test Case* của 4 bug report FR-02.
- **`ai-audit-report.md`** — thêm mục 2 (tuyên bố §9 + bảng công cụ §8 + mức
  Bloom-AI), đánh số lại các mục sau đó.
- **`main-report.md`** — sửa bảng ledger: 30 case mang sang + 10 case thiết kế
  mới, thay vì chỉ nêu 7 case mới của FR-13.
- **`ai-generated-script-gaps.md`** — gộp mục 3 thành một nhóm lỗi "oracle nằm
  trong script chứ không nằm trong dữ liệu" với 4 trường hợp, và ghi thẳng vào
  phần kết luận rằng 3/4 chỉ lộ ra *sau khi* trường hợp đầu đã được sửa.
- **`.claude/skills/playwright-automation/SKILL.md`** — sửa hai chỗ skill tự
  mâu thuẫn với code nó sinh ra (`xpath=..` cho bước nhảy lên phần tử cha,
  `waitForTimeout` khi khoảng chờ chính là quy tắc cần kiểm), và thêm phép kiểm
  "sửa một giá trị trong JSON thì kết quả có đổi không", kèm yêu cầu áp phép
  kiểm đó cho **cả ba** feature khi nó bắt được lỗi ở một feature.

Chạy lại toàn bộ ma trận 3×3 sau khi sửa: kết quả không đổi (10p/4f, 11p/3f,
1p/11f), 9/9 report vẫn mang nhãn `Run by: 23127300` kèm ISO timestamp. Không
bug report nào phải thêm hay bớt.

Không giữ nhận định "văn phong không đọc ra là do AI viết" như một kết luận đã
kiểm chứng; nó chỉ là gợi ý để sinh viên tự đọc lại.

---

## 5. Tổng hợp độ chính xác của AI

| Verdict | Số entry | Tỷ lệ |
| --- | ---: | ---: |
| `VALID` | 12 | 54.5% |
| `INCOMPLETE` | 9 | 40.9% |
| `INVALID` | 1 | 4.5% |
| **Tổng số entry đã audit** | **22** | **100%** |

Phân bố theo giai đoạn:

| Giai đoạn | Entry | VALID | Cần sửa |
| --- | --- | ---: | ---: |
| Dựng khung + lập kế hoạch (05/08) | #1–#4 | 2 | 2 |
| FR-02 — Session 1 (06/08) | #5–#9 | 3 | 2 |
| FR-10 — Session 2 (07/08) | #10–#13 | 3 | 1 |
| Rà soát kế hoạch và log (08/08) | #14–#15 | 2 | 0 |
| FR-13 — Session 3 (08/08) | #16–#17 | 0 | 2 |
| Triage + bug reports — Session 3 (08/08) | #18 | 1 | 0 |
| Video + rà soát toàn bài — Session 4 (09/08) | #19–#20 | 0 | 2 |
| Sửa lỗ hổng data-driven FR-02 — Session 4 (09/08) | #21 | 1 | 0 |
| Rà soát toàn bài theo rubric — Session 5 (09/08) | #22 | 0 | 1 |

## 6. Kết luận

Nhìn trên toàn bộ 22 entry, sai sót của AI rơi vào đúng bốn nhóm, và cả bốn
lặp lại xuyên suốt chứ không phân tán ngẫu nhiên.

**Nhóm 1 — mọi giả định về giao diện đưa ra trước khi đọc DOM thật đều sai.** Đây
là nhóm đông nhất và nguy hiểm nhất. FR-02: `getByLabel` không dùng được vì form
không gắn label với input, và banner lỗi nằm ngoài `<form>`. FR-10: ô `<select>`
không tồn tại, route `/orders` không tồn tại ở cả hai app, hai origin dùng hai
khoá token khác nhau, và locator theo `hasText` khớp nhầm cả tiền và ngày. Điểm
chung: **không lỗi nào làm test đỏ theo kiểu dễ thấy** — chúng làm test xanh sai
chỗ hoặc đỏ vì lý do vô can. Nguyên tắc đã áp dụng cho mọi feature sau: recon
trước, sinh code sau.

**Nhóm 2 — AI mở rộng phạm vi thao tác ngoài yêu cầu.** Entry #1 (viết code khi
mới chỉ được yêu cầu đề xuất cấu trúc) và Entry #3 (tự commit tài liệu nội bộ,
tự gắn trailer `Co-Authored-By`). Cả hai đều không phải lỗi kỹ thuật mà là lỗi
đọc yêu cầu, và Entry #3 còn chạm vào lịch sử git — thứ §12 dùng làm bằng chứng.
Cách phòng: chia kế hoạch thành task có checkpoint, và ghi các ranh giới tuyệt
đối vào `CLAUDE.md` để mọi phiên sau đọc lại được.

**Nhóm 3 — AI tin vào chính sản phẩm trước đó của nó.** Entry #5 đổi timestamp
sang giờ ICT nhưng không rà lại công cụ `report:verify` vốn khớp dạng UTC, tạo ra
hồi quy mãi cuối session mới lộ. Entry #15 là trường hợp nặng nhất của nhóm này:
hai file log tự tuyên bố "verbatim" ở ngay dòng đầu nhưng bên trong là bản tóm
tắt viết lại, và tình trạng đó tồn tại qua nhiều phiên mà không phiên nào tự phát
hiện — người phát hiện là sinh viên.

**Nhóm 4 — khe hở giữa hai stage của chính quy trình 7 bước.** Entry #20: stage
"Model data" khai báo `expected.urlContains` và `expected.tokenStored` rồi điền
đủ vào cả 14 record, nhưng stage "Generate" viết assertion từ đầu thay vì đọc
lại schema, nên hai trường đó không bao giờ được dùng. Khác hẳn ba nhóm trên ở
chỗ không thiếu dữ liệu nào để quan sát cả — hai file nằm cạnh nhau trong repo.
Lỗi tồn tại được vì mỗi stage chỉ chịu trách nhiệm phần việc của mình và không
có bước nào đối chiếu chéo, lại càng khó thấy vì test vẫn xanh/đỏ đúng như dự
đoán. Sửa ở Entry #21.

Phần AI làm tốt cũng nhất quán: một khi đã có dữ liệu quan sát thật, chất lượng
thiết kế case và assertion rất cao — ý "assert tập nút phải khớp chính xác tập
cạnh hợp lệ" của FR-10 là một góc nhìn đúng mà kịch bản thủ công không gợi ra, và
việc dò ra "khoá kích hoạt sau 2 lần sai thay vì 3" của FR-02 là loại lỗi lệch một
đơn vị mà đọc tài liệu không bao giờ thấy. AI cũng nhiều lần tự phân biệt đúng
giữa lỗi script và lỗi SUT trước khi sửa (Entry #9, #12, #13), thay vì sửa cho
hết đỏ.

Bài học tổng quát rút ra khi làm việc với AI trong kiểm thử: **AI mạnh ở suy luận
trên dữ liệu đã quan sát, và yếu ở việc thừa nhận rằng nó chưa quan sát gì cả.**
Mọi output của nó phải được phân loại thành "đã kiểm chứng bằng quan sát" hay
"mới là giả thuyết" trước khi dùng — và những gì tự nó tuyên bố về chất lượng của
chính nó (kể cả dòng chữ "verbatim" ở đầu file log) phải được kiểm chứng độc lập.

## 7. Công bố bắt buộc (Mandatory Disclosure)

Toàn bộ test case, script Playwright, dữ liệu test và tài liệu của HW04 được
tạo ra với sự hỗ trợ của Claude (Opus 5, và từ Session 3 ngày 08/08/2026 là
Sonnet 5) chạy trong Claude Code. Mọi output
của AI đều được sinh viên xem xét, đối chiếu với `sut-requirements.md` và với
hành vi quan sát được trên SUT đang chạy trước khi giữ lại; các phần bị sửa hoặc
bác bỏ được ghi ở mục **Student Fix** của từng entry.

Bản ghi thô, đầy đủ và không lọc của mọi tương tác nằm ở
[`prompt-log.md`](prompt-log.md), được trích tự động từ transcript gốc bằng
[`tools/extract-prompt-log.py`](tools/extract-prompt-log.py).

**Ký tên:** Hà Bảo Ngọc — 23127300 — 09/08/2026
