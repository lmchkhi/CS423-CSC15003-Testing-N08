# HW05 — Script narration video Agent Skill `perf-test-workflow`

> **Yêu cầu §7:** demo skill áp dụng trên một nhóm endpoint **khác** Workflow
> 5. Video này dùng **Workflow 3 — Browse and Add-to-Cart** (các endpoint
> đọc catalog và tương tác giỏ hàng, không có auth phức tạp).

---

## Endpoint group demo: Workflow 3

| Sampler | Endpoint |
|---|---|
| 01 | `POST /api/login` |
| 02 | `GET /api/products` |
| 03 | `GET /api/products/:id` |
| 04 | `POST /api/cart` (thêm vào giỏ) |
| 05 | `GET /api/cart` (xem giỏ) |

Đây là workflow đọc-nhiều-ghi-ít — tiêu biểu cho loại traffic catalog browsing.
Không có forgot-password hay reset-password → CSV đơn giản hơn (chỉ cần
`email,password`).

---

## Chuẩn bị trước khi quay

- Skill nằm tại `.claude/skills/perf-test-workflow/SKILL.md` — mở file này
  trong editor hoặc chạy `cat .claude/skills/perf-test-workflow/SKILL.md`.
- Terminal sẵn sàng, SUT chạy (`bash perf/scripts/sut.sh status`).
- `CLAUDE.md` mở để thấy repo rules.

---

## Phần 0 — Giới thiệu skill (≈ 0:00–0:50)

*"Xin chào, tôi là Hà Bảo Ngọc, MSSV 23127300.*

*Trong video này tôi sẽ demo Agent Skill `perf-test-workflow` —
một skill tái sử dụng được, áp dụng vòng lặp kiểm thử hiệu năng HW05 cho
bất kỳ nhóm endpoint nào của EShop backend.*

*Skill nằm tại `.claude/skills/perf-test-workflow/SKILL.md` và đi kèm
template JMX tại `templates/journey.jmx.template`.*

*Tôi sẽ áp dụng nó cho Workflow 3: Browse and Add-to-Cart — nhóm endpoint
này chưa có test plan, chưa có calibration, và chưa có dữ liệu chạy —
đây là bằng chứng skill hoạt động trên workflow mới, không phải chỉ wrap
lại Workflow 5."*

**Hành động:**
1. `cat .claude/skills/perf-test-workflow/SKILL.md | head -20` — show frontmatter.
2. Trỏ vào `name:` và `description:` trong terminal.

---

## Phần 1 — Step 1: Map endpoints → samplers (≈ 0:50–1:40)

*"Bước đầu tiên theo skill là map endpoint sang sampler."*

**Hành động:**
1. Mở `api_specification.md` — trỏ vào §1.2 login, §3.1 products, §3.2
   product detail, §4.x cart.
2. Viết bảng sampler ra Terminal hoặc editor (live):
   ```
   01  POST /api/login          → extract token
   02  GET  /api/products        → extract productId (random từ CSV)
   03  GET  /api/products/:id    → extract price
   04  POST /api/cart            → add item
   05  GET  /api/cart            → verify item present
   ```
3. *"Skill nhắc: ordering phải theo đúng hành trình người dùng — login
   phải trước cart, product-detail phải trước add-to-cart."*

---

## Phần 2 — Step 2: Calibration probe (≈ 1:40–2:30)

*"Bước tiếp theo: calibration — không dùng số mặc định."*

**Hành động:**
1. Chạy một probe nhanh với 25 VU (có thể dùng plan Load đã có làm tham
   chiếu hoặc chạy probe JMX đơn giản):
   ```bash
   # Ví dụ demo — show lệnh, không cần đợi kết quả đầy đủ
   jmeter -n -t perf/plans/jmeter/23127300_Load_20260814.jmx \
     -Jthreads=25 -Jramp=30 -Jduration=60 \
     -l /tmp/probe-wf3.jtl -j /tmp/probe-wf3.log &
   sleep 15; kill %1
   python3 perf/scripts/analyze_jtl.py /tmp/probe-wf3.jtl
   ```
2. *"Skill nói: dừng sweep khi error rate > 0 % từ lỗi 5xx, hoặc p95
   checkout > 500 ms, hoặc CPU SUT > 90 %. Nếu không tìm được knee, ghi
   nhận đây là ceiling của harness, không phải của SUT."*
3. Trỏ vào trap list trong SKILL.md: `Connection-reuse default` —
   `httpclient.reset_state_on_thread_group_iteration=false`.

---

## Phần 3 — Step 3: CSV design (≈ 2:30–3:10)

*"Skill nhắc đặc biệt: CSV phải có ít nhất một hàng cho mỗi VU đồng thời."*

**Hành động:**
1. *"Workflow 3 không có reset-password → `accounts.csv` chỉ cần
   `email,password`, không cần `newPassword`. Một hàng = một user."*
2. ```
   python3 perf/scripts/gen-data.py --accounts 100 --products 5
   head -5 perf/data/accounts.csv
   ```
3. Trỏ vào trap `CSV cursor shared across threads`:
   *"Workflow 5 gặp trap này ở Spike — 620 luồng dùng chung con trỏ CSV,
   gây 157 lỗi HTTP 400. Workflow 3 cần tối thiểu VU_MAX hàng trong accounts.csv
   để tránh collision tương tự."*

---

## Phần 4 — Step 4: Extractor + Assertion (≈ 3:10–3:50)

*"Skill yêu cầu mọi JSONPostProcessor phải có Default Value = EXTRACTION_FAILED."*

**Hành động:**
1. Mở template:
   ```
   grep -n "EXTRACTION_FAILED\|JSONPostProcessor" \
     .claude/skills/perf-test-workflow/templates/journey.jmx.template
   ```
2. Show kết quả — `EXTRACTION_FAILED` đã có trong template.
3. *"Nếu token trả về `${token}` (literal) thay vì JWT thật, mọi
   request cart sẽ trả 401 mà không báo lỗi assertion — plan nhìn
   có vẻ chạy sạch nhưng thực ra không test được gì. Trap này đã
   xảy ra trong Workflow 5 draft đầu tiên."*

---

## Phần 5 — Steps 5–6: Generate JMX và seed (≈ 3:50–4:30)

**Hành động:**
1. Show template với markers:
   ```
   grep "{{" .claude/skills/perf-test-workflow/templates/journey.jmx.template | head -8
   ```
2. Chạy lệnh thay thế (demo — không cần chạy thật, show lệnh sed):
   ```bash
   sed -e 's/{{STUDENT_ID}}/23127300/g' \
       -e 's/{{SCENARIO}}/Load/g' \
       -e 's/{{RUNDATE}}/20260815/g' \
       -e 's/{{VU_COUNT}}/25/g' \
       -e 's/{{RAMP_SECONDS}}/30/g' \
       -e 's/{{DURATION_SECONDS}}/180/g' \
       .claude/skills/perf-test-workflow/templates/journey.jmx.template \
       > /tmp/23127300_Load_WF3_20260815.jmx
   echo "Generated: $(wc -l < /tmp/23127300_Load_WF3_20260815.jmx) lines"
   ```
3. *"Bước tiếp theo là seed accounts qua API rồi chạy headless — giống hệt
   quy trình đã làm cho Workflow 5."*
   ```
   bash perf/scripts/sut.sh status  # confirm SUT up
   bash perf/scripts/seed-accounts.sh | tail -3
   ```

---

## Phần 6 — Steps 7–9: Run, Collect, Analyse (≈ 4:30–5:30)

*"Skill bao gồm cả bước run, collect và analyse từ raw log."*

**Hành động:**
1. Show `run-scenario.sh` structure:
   ```
   cat perf/scripts/run-scenario.sh | head -30
   ```
2. *"Script bao gồm: caffeinate, reset-lockout, jmeter -n, monitor.sh, và
   ghi manifest row. Không bao giờ chạy jmeter -n trực tiếp — đây là ranh
   giới evidence-integrity theo skill."*
3. Show analyser trên một run có sẵn:
   ```
   gunzip -c perf/results/jtl/23127300_Load_20260814.jtl.gz | \
     python3 perf/scripts/analyze_jtl.py /dev/stdin
   ```
4. *"Analyser tính p50/p95/p99 và throughput từ raw `.jtl` — không đọc
   số từ đồ thị. Đây là cách skill đảm bảo mọi con số đều tái tạo được."*

---

## Phần 7 — Trap list (≈ 5:30–6:15)

*"Phần quan trọng nhất của skill là trap list — bảy cái bẫy mà HW05 đã
gặp phải."*

**Hành động:**
1. Mở SKILL.md trên editor hoặc scroll đến phần `## Trap list`:
   ```
   grep -A2 "Trap\|Symptom\|Fix" \
     .claude/skills/perf-test-workflow/SKILL.md | head -50
   ```
2. Đọc qua từng trap, đặc biệt nhấn mạnh:
   - **Silent extractor default** → `EXTRACTION_FAILED`
   - **CSV cursor collision** → Spike 157 lỗi
   - **Lockout masquerading as saturation** → reset-lockout.sh
   - **Machine sleep mid-run** → caffeinate

---

## Phần 8 — Tổng kết (≈ 6:15–6:45)

*"Skill `perf-test-workflow` bao gồm 9 bước từ map đến analyse, CSV design
rules, extractor rules, và bảy trap được rút ra từ kinh nghiệm thực tế chạy
bốn kịch bản cho Workflow 5.*

*Template `journey.jmx.template` cho phép áp dụng sang workflow mới bằng
cách thay 7 marker — không cần rebuild plan từ đầu.*

*Skill nằm tại `.claude/skills/perf-test-workflow/SKILL.md`, có YAML
frontmatter hợp lệ với `name` và `description`, và đã được xác nhận load
trong session Claude Code.*

*Cảm ơn.*"

---

## Checklist §7 trước khi export

- [ ] Demo trên endpoint group khác Workflow 5 (✓ Workflow 3 cart/browse)
- [ ] Skill file mở và frontmatter hiển thị rõ trên màn hình
- [ ] Template markers `{{...}}` show trên màn hình
- [ ] Ít nhất một trap được giải thích với ví dụ cụ thể từ Workflow 5
- [ ] Giọng sinh viên liên tục
- [ ] Tổng thời lượng ≥ 5 phút (skill video có thể ngắn hơn Task 1 video)
