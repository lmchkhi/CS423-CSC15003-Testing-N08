# Kịch bản 2 video demo Agent Skills — HW03 (§7)

**Sinh viên:** Hà Bảo Ngọc — 23127300 — nhóm N08
**Mục đích:** §7 yêu cầu nộp skill kèm video demo cho thấy **end-to-end** cách
dùng skill trên một màn hình / một luồng hoàn chỉnh.
**Định dạng:** 2 video, mỗi video 6–8 phút, quay màn hình + thuyết minh.
**Cách dùng file này:** phần *[Thao tác]* là việc cần làm trên màn hình, phần
**"..."** là lời nói. Không cần đọc y nguyên từng chữ — đọc thoải mái, tự
nhiên, miễn giữ đúng ý và đúng thứ tự.

---

## Phần mở đầu chung (dùng cho cả 2 video, ~60 giây)

> "Chào thầy cô và các bạn. Em là Hà Bảo Ngọc, MSSV 23127300, nhóm N08.
> Trong video này em sẽ demo bộ Agent Skills mà em đã xây dựng cho bài HW03 —
> GUI và Usability Testing: trên hệ thống EShop."

*[Thao tác: mở terminal, gõ `ls .claude/skills/` để hiện ra 6 thư mục skill]*

> "Em không viết một prompt chung chung kiểu 'hãy tạo giúp tôi một GUI
> checklist'. Thay vào đó em đóng gói **toàn bộ quy trình kiểm thử như đã học
> trên lớp** thành 6 skill, mỗi skill là một file `SKILL.md` chứa các bước
> tuần tự mà AI bắt buộc phải đi theo. Nhờ vậy AI đóng vai một trợ lý có kỷ
> luật, chứ không phải một hộp đen: đúng tinh thần 'AI-First' ở §2 của đề bài."

*[Thao tác: chỉ lần lượt vào từng thư mục khi đọc tên]*

> "Sáu skill chia thành hai nhóm.
>
> **Nhóm làm bài**, ba skill ứng với ba task:
> `gui-checklist` cho Task 1, `usability-evaluation` cho Task 2, và
> `cross-platform-testing` cho Task 3.
>
> **Nhóm hạ tầng dùng chung**, ba skill được ba skill trên gọi lại:
> `bug-report` để ghi nhận lỗi, `prompt-log` để lưu log thô mọi lần tương tác
> với AI, và `ai-audit-log` để sinh phụ lục AI Audit Report bắt buộc theo §9.
>
> Điểm em tâm đắc nhất là ba skill hạ tầng này: mỗi lần một checklist item
> Fail, `bug-report` tự động vừa tạo file Markdown trong `bug-reports/`, vừa
> tạo GitHub Issue đúng template của môn, vừa đính screenshot, không bao giờ
> quên một trong ba, vì §6 bắt buộc đủ cả ba. Và mỗi lần AI sinh ra bất kỳ
> sản phẩm nào, `prompt-log` với `ai-audit-log` cùng chạy để hai file log
> không bao giờ bị bỏ sót: đây chính là thứ mà đề bài nói 'thiếu là 0 điểm'."

> "Bây giờ em đi vào demo cụ thể."

---

# VIDEO 1 — Skill `gui-checklist` (Task 1)

**Thời lượng mục tiêu:** 7 phút
**Màn hình demo:** Search Results (trang kết quả tìm kiếm của EShop)
**Lý do chọn màn này:** đủ nhỏ để chạy trọn vẹn trong một video, nhưng vẫn
chạm đủ cả 4 khía cạnh IA01–IA04.

### 1. Giới thiệu skill (~45 giây)

*[Thao tác: mở `.claude/skills/gui-checklist/SKILL.md`, cuộn chậm từ trên
xuống để thấy các heading Phase A → Phase E]*

> "Skill `gui-checklist` chia Task 1 thành năm phase, đúng theo trình tự của
> kỹ thuật checklist-based testing:
>
> Phase A: chốt phạm vi màn hình.
> Phase B: cho AI sinh checklist, **mỗi IA một prompt riêng**.
> Phase C: em phản biện kết quả AI và bổ sung item AI bỏ sót.
> Phase D: thực thi checklist trên SUT thật.
> Phase E: file bug cho các item Fail.
>
> Điều quan trọng nhất nằm ở Phase B: skill bắt buộc AI phải đọc file
> `sut-requirements.md`: bản trích yêu cầu FR thật của EShop, **trước khi**
> sinh item. Nếu không có ràng buộc này, AI sẽ chỉ nhìn giao diện đang render
> rồi tự bịa ra tiêu chuẩn của riêng nó."

### 2. Phase A — chốt phạm vi (~30 giây)

*[Thao tác: gõ trong Claude Code]*

```
/gui-checklist Mình làm tiếp màn Search Results
```

> "Em gọi skill và nói rõ màn hình cần làm. Skill hỏi lại build/commit và URL
> của SUT, rồi ghi phạm vi vào README: vì §5 cấm hai thành viên trong nhóm
> trùng màn hình chính, nên phạm vi phải được ghi lại rõ ràng ở một chỗ."

### 3. Phase B — sinh checklist theo từng IA (~2 phút)

*[Thao tác: để skill chạy prompt IA01, đợi ra kết quả, cuộn cho thấy các item]*

> "Đây là điểm khác biệt lớn nhất so với cách dùng AI thông thường. Skill
> **không** gửi một prompt kiểu 'sinh giúp tôi 40 item'. Nó gửi bốn prompt
> tách biệt: một cho IA01 giao diện chung, một cho IA02 form, một cho IA03
> điều hướng, một cho IA04 phản hồi và trạng thái. Mỗi prompt đều kèm nguyên
> văn đoạn FR liên quan làm ground truth."

*[Thao tác: mở `reports/prompt-log.md`, cuộn tới entry vừa sinh]*

> "Và ngay khi prompt chạy xong, skill tự gọi `prompt-log` ghi lại nguyên văn
> prompt và output. Em không phải nhớ để ghi tay, đây là lý do file log của
> em có đủ 29 entry mà không bỏ sót lần nào."

*[Thao tác: chạy nhanh 3 prompt IA02/IA03/IA04, tua nhanh phần chờ]*

### 4. Phase C — phản biện AI và bổ sung gap (~1,5 phút)

*[Thao tác: mở `ai-gap-analysis/gui-checklist-gaps.md`]*

> "Phase C là phần §6 bắt buộc: phải chỉ ra AI **bỏ sót gì** và giải thích
> **tại sao** nó bỏ sót. Skill yêu cầu mỗi item em tự thêm phải kèm một lý do
> cụ thể, không được ghi chung chung.
>
> Trên cả bốn màn hình, em tự thêm 12 item, và khi tổng hợp lại thì chúng quy
> về đúng ba nhóm nguyên nhân.
>
> Thứ nhất, **lỗi phạm vi prompt**: bảy trên mười hai item. Rõ nhất là
> 'dark mode contrast': em quên liệt kê nó trong prompt IA01, và quên ở **cả
> bốn màn hình**. AI biết dark mode là gì, nhưng nó không tự nhớ lại cái gap
> em đã phát hiện ở batch trước để bù cho batch sau, đây là lỗi của em, không
> phải của AI.
>
> Thứ hai, **đặc thù giao diện tiếng Việt**: ba item. AI được huấn luyện chủ
> yếu trên các hệ thống tiếng Anh nên không tự nghĩ tới rủi ro vỡ dấu hoặc lỗi
> encoding khi tìm kiếm bằng tiếng Việt có dấu.
>
> Thứ ba, **giới hạn của mô hình**: hai item. AI không tự đối chiếu ngược
> giữa hai màn hình để phát hiện thiếu sót ngầm, và không tự suy ra kịch bản
> hết phiên đăng nhập khi FR không mô tả rõ."

### 5. Phase D — thực thi trên SUT thật (~2 phút)

*[Thao tác: mở SUT tại `localhost:5173`, để Claude for Chrome thao tác thật:
gõ từ khóa, bấm Tìm, mở DevTools kiểm tra DOM]*

> "Phase D là thực thi thật, không suy đoán. Skill điều khiển trình duyệt qua
> Claude for Chrome: click thật, gõ thật, resize thật, đọc DOM và tab Network
> thật. Mỗi item được đánh Passed, Failed hoặc N/A, và cột Notes ghi rõ lý do
> Fail."

*[Thao tác: dừng lại ở item GUI-098: tìm kiếm có khoảng trắng thừa]*

> "Ví dụ item này: em gọi thẳng API để cô lập khỏi giao diện —
> `search=iphone` trả về một kết quả, còn `search=%20iphone%20` trả về không
> kết quả nào. Backend không trim khoảng trắng. Đây là bằng chứng quan sát
> được, không phải phỏng đoán."

*[Thao tác: mở `checklist/gui-checklist.md`, cuộn tới bảng Summary]*

> "Kết quả cuối cùng trên cả bốn màn hình: **110 item**, phủ đủ IA01 đến IA04,
> thực thi 110 trên 110: 47 Passed, 59 Failed, 4 N/A. Vượt xa mức tối thiểu
> 40 item của đề bài."

### 6. Phase E — file bug tự động (~1 phút)

*[Thao tác: để skill gọi `bug-report`, xem nó tạo file .md rồi tạo GitHub Issue]*

> "Với mỗi item Fail là một defect thật, skill gọi sang `bug-report`. Skill
> này làm đúng ba việc trong một lượt: tạo file Markdown trong `bug-reports/`,
> tạo GitHub Issue theo đúng template `.github/ISSUE_TEMPLATE` của môn, và
> đính screenshot vào issue."

*[Thao tác: mở GitHub Issues, lọc ra các issue của mình, mở một issue có ảnh]*

> "Đây là 24 issue em đã tạo cho Task 1: cùng một cấu trúc, cùng bộ label
> Severity, Priority, Status, Module, và issue nào cũng có ảnh chứng minh."

### 7. Kết video 1 (~30 giây)

*[Thao tác: mở `reports/ai-audit-report.md`, cuộn qua vài entry]*

> "Và sau mỗi sản phẩm được giữ lại, `ai-audit-log` tự thêm một entry vào AI
> Audit Report với đủ Verdict, Reasoning và Student Fix, phụ lục bắt buộc
> theo §9. Toàn bộ 27 entry trong file này được sinh ra dọc đường như vậy,
> không phải viết lại từ trí nhớ vào phút chót.
>
> Đó là toàn bộ vòng đời Task 1 với skill `gui-checklist`. Em cảm ơn thầy cô
> đã xem."

---

# VIDEO 2 — Skill `usability-evaluation` (Task 2)

**Thời lượng mục tiêu:** 7 phút
**Luồng demo:** Duyệt sản phẩm → tìm theo từ khóa → mở trang chi tiết → chọn
số lượng → thêm vào giỏ hàng.

### 1. Giới thiệu skill và ràng buộc cứng (~1 phút)

*[Thao tác: mở `.claude/skills/usability-evaluation/SKILL.md`, dừng lại ở
mục "Hard constraint — read first"]*

> "Skill `usability-evaluation` chia Task 2 thành đúng ba phase như đề bài:
> lập kế hoạch, chạy phiên test, và phân tích.
>
> Nhưng thứ em muốn nói đầu tiên lại là phần này, **ràng buộc cứng** nằm
> ngay đầu file. Skill được viết để **tuyệt đối không bao giờ** tự sinh ra tên
> người tham gia, số điện thoại, câu trích dẫn hay điểm SUS. §11 nói rõ:
> TA có thể gọi ngẫu nhiên hai người tham gia để xác minh, và giả mạo là 0
> điểm cho cả Task 2: tức 40 trên 100 điểm.
>
> Nếu em bảo AI 'điền giúp tôi danh sách bảy người', skill sẽ dừng lại và hỏi
> xin dữ liệu thật, chứ không sinh ra dữ liệu trông-như-thật. Đây là một
> quyết định thiết kế có chủ đích: skill này được viết để **từ chối** giúp em
> gian lận."

### 2. Phase 1 — lập kế hoạch và chuẩn bị công cụ đo (~1,5 phút)

*[Thao tác: mở `usability/plan.md`]*

> "Phase 1, skill hỏi em ba thứ: mục tiêu nghiên cứu, kịch bản nhiệm vụ, và
> chọn thang đo.
>
> Mục tiêu của em: kiểm chứng bằng người dùng thật xem lỗi 'thiếu phản hồi
> khi thêm vào giỏ hàng': đã phát hiện ở Task 1, có thật sự gây bối rối ở
> quy mô rộng hơn hay không."

*[Thao tác: mở `usability/task-scenarios.md`]*

> "Về kịch bản, skill nhấn mạnh một nguyên tắc: **cho người tham gia một mục
> tiêu, không phải các bước bấm**. Một kịch bản mà chỉ ra bấm nút nào thì phá
> hỏng toàn bộ ý nghĩa của buổi test. Em viết bảy biến thể, khác từ khóa,
> khác số lượng, cùng cấu trúc: để bảy người không copy đường đi của nhau."

*[Thao tác: mở `.claude/skills/usability-evaluation/references/sus-scale.md`]*

> "Skill có sẵn ba file tham chiếu: bộ 10 câu SUS chuẩn kèm công thức tính,
> bộ UEQ-S, và bộ câu probe bắt buộc phủ bốn khía cạnh mà §6 yêu cầu, clarity,
> error recovery, speed và trust. Em chọn SUS, và dựng thành Google Form để
> người tham gia điền ngay sau buổi test."

*[Thao tác: mở `usability/plan.md` mục Pilot session]*

> "Trước bảy buổi chính thức em có chạy một buổi pilot thật với người ngoài
> danh sách. Pilot phát hiện đúng vấn đề 'nút thêm vào giỏ hàng thiếu phản
> hồi': sau này lặp lại ở 5 trên 7 buổi chính thức."

### 3. Phase 2 — chạy phiên test (~1,5 phút)

*[Thao tác: mở `usability/session-script.md`]*

> "Phase 2, skill sinh sẵn kịch bản lời thoại tiếng Việt cho người điều phối:
> câu mở đầu nói rõ 'em đang test sản phẩm, không test anh/chị', lời nhắc
> think-aloud, và nguyên tắc quan sát trung lập, không gợi ý, chỉ can thiệp
> khi người tham gia bế tắc hoàn toàn."

*[Thao tác: mở `usability/transcript/participant_3.tsv` rồi mở
`usability/sessions/session-03.md` cạnh nhau]*

> "Mỗi buổi cho ra hai thứ: một transcript ghi âm thật, và một file session
> tổng hợp gồm quan sát theo mốc thời gian, điểm SUS từng câu, và câu trả lời
> probe. Skill chỉ **cấu trúc** dữ liệu này lại, mọi nội dung đều do em nhập
> từ buổi test thật."

*[Thao tác: mở `usability/participants.md`]*

> "Đây là bảng bảy người tham gia: người thật, đều ngoài lớp học phần này,
> số liên hệ đã mask bốn số giữa đúng theo §6, và có ghi nhận consent."

### 4. Phase 3 — phân tích và xếp severity (~2 phút)

*[Thao tác: mở `usability/analysis.md` ở bảng điểm]*

> "Phase 3, skill áp công thức SUS chuẩn cho từng người, rồi tổng hợp.
>
> SUS trung bình: **53,2 trên 100**: dưới mốc tham chiếu 68. Nhưng điều đáng
> nói không nằm ở con số trung bình."

*[Thao tác: highlight dòng participant #7]*

> "Đây là phát hiện quan trọng nhất của Task 2. Participant số 7 có điểm SUS
> **82,5**: cao thứ nhì trong bảy người. Nhưng đây lại chính là buổi **thất
> bại hoàn toàn**: bạn ấy thử đủ ba lần, và đến lần kiểm tra cuối giỏ hàng
> vẫn trống.
>
> Nói cách khác, **SUS không tương quan với việc task có thành công hay
> không**. SUS đo *cảm nhận*, không đo *kết quả*. Nếu em chỉ báo cáo con số
> 53,2, người đọc sẽ đánh giá thấp hẳn mức nghiêm trọng của lỗi 'thêm vào giỏ
> hàng'. Đây là thứ chỉ lộ ra khi ngồi xem người thật dùng, không một
> checklist nào ở Task 1 bắt được nó."

*[Thao tác: cuộn xuống bảng severity-ranked findings]*

> "Skill yêu cầu tách **lỗi đơn lẻ** ra khỏi **vấn đề thiết kế hệ thống**, rồi
> xếp theo severity: một Blocker, một Major, hai Minor.
>
> Blocker là buổi thất bại hoàn toàn của participant 7. Major là việc không có
> phản hồi trực quan sau khi bấm thêm vào giỏ, 5 trên 7 người gặp phải."

*[Thao tác: mở `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`, cuộn tới phần
cross-link Task 2]*

> "Và đây là chỗ skill làm một việc em thấy rất đúng: bảy buổi test **không
> sinh ra bug mới nào**. Toàn bộ friction đều quy về hai bug đã file ở Task 1.
> Nên thay vì tạo bug trùng cho đẹp số lượng, skill cross-link dữ liệu người
> dùng thật vào bug cũ làm bằng chứng bổ sung. Bug 'thêm vào giỏ hàng' giờ có
> hai nguồn bằng chứng độc lập: kiểm thử kỹ thuật ở Task 1, và 5 trên 7 người
> dùng thật ở Task 2."

### 5. Kết video 2 (~45 giây)

*[Thao tác: mở lại `ls .claude/skills/`]*

> "Tóm lại, giá trị của bộ skill này không phải là 'AI làm bài hộ em'. Giá trị
> nằm ở chỗ nó ép quy trình kiểm thử phải đi đúng thứ tự đã học: đọc yêu cầu
> trước khi sinh checklist, phản biện AI trước khi chấp nhận kết quả, thực thi
> thật trước khi kết luận Pass hay Fail, và log lại mọi lần tương tác với AI
> ngay lúc nó xảy ra.
>
> Và với Task 2, skill còn có một vai trò nữa: giữ cho phần dữ liệu người thật
> luôn là dữ liệu người thật.
>
> Cả sáu skill đều tái sử dụng được cho các màn hình và luồng khác trong những
> bài sau. Em cảm ơn thầy cô đã theo dõi."

---

## Ghi chú khi quay

- Nhớ để **email `23127300@hcmus.edu.vn` hiện trên màn hình** ở đầu mỗi video
  (mở sẵn một tab hoặc để trên taskbar) cho khớp với watermark trên screenshot.
- Đoạn AI chạy lâu thì **tua nhanh 4×** và giữ lời thuyết minh chạy đè lên —
  đừng để khoảng lặng chờ.
- Sau khi upload, dán link YouTube vào `README.md` mục **2.6 Demo Videos**
  (hiện đang là TODO) rồi commit — §7 và §14 đều yêu cầu link này.
- Để chế độ **Unlisted** nếu không muốn công khai; §7 chỉ yêu cầu link xem được.
