# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW03                    |
| **Ngày làm bài:**       | 24-07-2026 - ../07/2026 |
| **Công cụ AI đã dùng:** | Claude                  |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                                             |
| ----------------- | --------------------------------------------------- |
| **Tool**          | Codex (GPT-5.6 Sol Medium)                          |
| **Timestamp**     | 24/07/2026 13:49:32                                 |
| **Artifact type** | Tạo agent skill sinh checklist GUI cho yêu cầu HW03 |

**Full prompt:**

```
Dựa vào yêu cầu cho HW3, giúp tôi tạo một agent skills cho việc tạo một gui checklist khi người dùng input một list các screens trong app (một trong số đó có thể là primary screen và còn lại sẽ là supporting screens).
Gui checklist đó cần có hơn 40 items và phủ toàn bộ 4 interface aspects của app: IA-01 đến IA-04.
Bỏ nó vào folder skills trong project.
Tạo skills bằng tiếng anh nhưng output của agent khi tạo gui checklist là tiếng việt.
```

### (2) AI Output

'''
Mình sẽ dùng skill `skill-creator` để tạo đúng cấu trúc agent skill, đồng thời đọc yêu cầu HW3 trong project để checklist bám sát IA-01 đến IA-04. Phần hướng dẫn skill sẽ viết bằng tiếng Anh, còn đầu ra checklist được quy định bằng tiếng Việt.

Tài liệu yêu cầu chính là PDF, nên mình sẽ áp dụng thêm skill `pdf` để trích xuất và kiểm tra chính xác định nghĩa IA-01…IA-04 trước khi viết rubric cho checklist. Việc này quyết định trực tiếp số lượng và cách phân bổ các mục kiểm tra.

Mình đã xác nhận yêu cầu cốt lõi: checklist phải có trên 40 mục, bao phủ đủ 4 IA, sau đó mới được thực thi Passed/Failed; ảnh chỉ bắt buộc cho mục Failed. Skill sẽ tạo baseline có thể kiểm thử, phân bổ sâu hơn cho primary screen, không tự bịa kết quả thực thi hay coi các mục AI tạo là “mục sinh viên tự bổ sung”.

Skill đã được tạo với target mặc định 48 mục (12 mục mỗi IA), hard minimum vẫn đảm bảo tổng >40, và có quality gate để tránh checklist lặp hoặc mơ hồ. Theo quy trình `skill-creator`, mình sẽ validate cấu trúc rồi forward-test bằng một yêu cầu mẫu để kiểm tra skill có thật sự tạo đầu ra tiếng Việt, đúng phân vai primary/supporting và đủ coverage hay không.

Validator chính thức đang thiếu dependency `PyYAML` trong cả Python hệ thống lẫn runtime đi kèm. Mình sẽ cài dependency này vào thư mục tạm (không sửa môi trường project) để chạy đúng validator của `skill-creator`, rồi tiếp tục forward-test.

Validation chính thức đã pass (`Skill is valid!`). Forward-test đang tạo đủ checklist mẫu nên mất thêm một chút thời gian; mình đang kiểm tra đặc biệt các lỗi dễ gặp: đếm sai 48 dòng, IA-02 bị ép vào màn hình không có form, và trạng thái bị gán Passed/Failed khi chưa chạy SUT.

Bản thử đang mất thời gian chủ yếu vì agent kiểm tra cả requirements lẫn source UI trước khi sinh 48 dòng, đúng với thiết kế của skill. Mình đã yêu cầu nó chốt ngắn gọn ngoài bảng và báo rõ số dòng theo từng IA/màn hình để có thể đối chiếu tự động bằng mắt.

Forward-test đã đạt các tiêu chí chính: 48 mục, 12 mục/IA, Checkout sâu hơn từng supporting screen, toàn bộ output tiếng Việt và không bịa Passed/Failed. Nó cũng lộ ra một điểm cần siết: có thể suy diễn hành vi chuẩn hóa coupon (`save10` → `SAVE10`) dù SRS không quy định. Mình sẽ bổ sung guardrail để các hành vi chưa được đặc tả chỉ được ghi như heuristic có nêu giả định, không biến thành yêu cầu giả.

Đã tạo agent skill tại:

- [SKILL.md](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/generate-gui-checklist/SKILL.md)
- [IA coverage guide](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/generate-gui-checklist/references/ia-coverage-guide.md)
- [Agent metadata](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/generate-gui-checklist/agents/openai.yaml)

Skill `$generate-gui-checklist`:

- Nhận danh sách primary/supporting screens.
- Tạo mặc định 48 mục, bao phủ IA-01 đến IA-04.
- Ưu tiên coverage sâu hơn cho primary screen.
- Viết hướng dẫn bằng tiếng Anh nhưng checklist đầu ra bằng tiếng Việt.
- Không tự gán Passed/Failed khi chưa thực thi.
- Phân biệt yêu cầu SRS và GUI heuristic chưa được đặc tả.
- Có phần gợi ý để sinh viên tự phản biện và bổ sung các mục AI bỏ sót.
- Đã qua validator chính thức và forward-test thành công với Checkout, Cart, Product Detail và Login.
  '''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- Yêu cầu đề bài định nghĩa IA-01 đến IA-04 một cách độc lập, nhưng skill lại liên kết chúng với các requirements FR-21, FR-22, FR-23, FR-24. Điều này có thể dẫn đến việc bỏ sót các hành vi cần kiểm tra nếu chúng không được nêu trong các yêu cầu đó.
- Đề yêu cầu gui checklist định dạng Excel nhưng skill chưa chỉ nói chung là CSV hoặc XLSX.

### (5) Student Fix

- Bỏ việc liên kết IA-01 đến IA-04 với các yêu cầu FR-21, FR-22, FR-23, FR-24.
- Nói rõ định dạng đầu ra là Excel (XLSX) thay vì CSV.

## Entry #2

### (1) Prompt + Tool

| Field             | Content                                                        |
| ----------------- | -------------------------------------------------------------- |
| **Tool**          | Codex (GPT-5.6 Sol Medium)                                     |
| **Timestamp**     | 24/07/2026 17:10:13                                            |
| **Artifact type** | Tạo workbook checklist kiểm thử GUI cho bốn màn hình của EShop |

**Full prompt:**

```
Sử dụng skill generate-gui-checklist để tạo một gui checklist cho các screens sau:
- Profile page
- Update profile form
- Order history screen
- Admin order management
```

### (2) AI Output

'''
Mình sẽ kiểm tra skill `generate-gui-checklist` trong workspace trước. Nếu skill không có trong danh sách đã nạp nhưng tồn tại cục bộ trong dự án, mình sẽ đọc đúng hướng dẫn của nó rồi tạo checklist cho 4 màn hình.

Đã tìm thấy skill cục bộ tại `skills/generate-gui-checklist/SKILL.md`. Mình sẽ dùng skill này; bước tiếp theo là đọc toàn bộ quy trình và các mẫu đầu ra mà skill yêu cầu.

Skill yêu cầu tạo và kiểm định workbook XLSX bằng skill Spreadsheets. Mình sẽ dùng thêm skill đó, đồng thời đọc mô hình bao phủ IA bắt buộc và rà soát các tài liệu/mã nguồn sẵn có để checklist bám sát ứng dụng thay vì chỉ dùng heuristic chung. Vì bạn chưa chỉ định màn hình chính, mình tạm coi `Profile page` là màn hình chính theo quy tắc của skill.

Mình đã đối chiếu SRS (`FR-04`, `FR-10`, `FR-11`, `FR-18`, `FR-21`–`FR-24`), API và mã nguồn thực tế. Checklist sẽ là bản thiết kế, nên toàn bộ trạng thái giữ `Chưa thực hiện`; các kỳ vọng bắt buộc sẽ dẫn FR/SEC, còn hành vi hợp lý nhưng chưa được đặc tả sẽ ghi rõ `Heuristic:`. Mình đang phân bổ 52 mục, đủ cả bốn IA và giữ `Profile page` có độ bao phủ sâu nhất.

Workbook đã được tạo: 52 mục, mỗi IA có 13 mục; phân bổ theo màn hình là 16/14/9/9 và 4 mục liên màn hình. Các công thức tóm tắt đều tính đúng, 8 cổng chất lượng đều `Đạt`, và chưa phát hiện lỗi công thức. Mình đang xem trực quan cả 4 worksheet để sửa mọi lỗi cắt chữ hoặc bố cục trước khi bàn giao.

Kiểm tra gói XLSX cho thấy bộ lọc, dropdown trạng thái, conditional formatting và wrap text đều đã được ghi đúng. Riêng thao tác freeze pane của thư viện tạo workbook không được xuất ra OOXML dù API đã được gọi đúng; mình đang áp dụng một sửa chữa định dạng nhỏ ở lớp XLSX để bảo đảm header thực sự được cố định theo yêu cầu của skill, rồi sẽ kiểm tra lại cấu trúc file.

Đã tạo [GUI checklist XLSX](/Users/lvkhang/Documents/uni/software-testing/HW3/submissions/gui-checklist-profile-page.xlsx) :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW3/submissions/gui-checklist-profile-page.xlsx" purpose="output"}

- 52 mục kiểm tra, mỗi IA có 13 mục.
- 4 worksheet đúng cấu trúc yêu cầu.
- Tạm chọn `Profile page` làm màn hình chính.
- Toàn bộ trạng thái là `Chưa thực hiện`.
- Đã kiểm tra công thức, bộ lọc, dropdown, freeze header và bố cục trực quan.
  '''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI tạo GUI checklist chia theo IA thay vì screen.

### (5) Student Fix

- Sửa lại checklist chia theo screen và cập nhật lại skill generate-gui-checklist để tạo checklist theo screen thay vì IA.

## Entry #3

### (1) Prompt + Tool

| Field             | Content                                                         |
| ----------------- | --------------------------------------------------------------- |
| **Tool**          | Codex (GPT-5.6 Sol Medium)                                      |
| **Timestamp**     | 25/07/2026 17:18:57                                             |
| **Artifact type** | Tạo agent skill thiết kế đánh giá usability cho end-to-end flow |

**Full prompt:**

```
Dựa vào yêu cầu cho HW03, giúp tôi tạo một agent skills cho việc tạo các phân tích về usability khi người dùng input vào một flow end to end.
Agent sẽ:
- Đưa ra mục tiêu test cụ thể cho flow đó
- Viết task scenario cụ thể và thực tế để test flow (không ghi cụ thể từng bước chi tiết)
- Chọn hình thức đánh giá thích hợp (SUS hoặc UEQ-S) cho flow test đó và một list các câu hỏi mở khác cover được ít nhất 4 tiêu chí được yêu cầu trong specs
Tạo skills bằng tiếng anh nhưng output của agent là tiếng việt.
```

### (2) AI Output

'''
Mình sẽ dùng skill `skill-creator` để đóng gói đúng chuẩn Codex, đồng thời đọc yêu cầu HW03 trong workspace để các mục tiêu, scenario và bộ câu hỏi bám sát rubric/spec. Skill sẽ được viết bằng tiếng Anh nhưng quy định rõ mọi đầu ra phân tích phải bằng tiếng Việt.

Tài liệu yêu cầu là PDF, nên mình cũng dùng skill `pdf` để trích xuất và kiểm tra đúng phần usability study/rubric thay vì suy đoán từ tên bài. Sau đó mình sẽ tạo skill ngay trong thư mục `skills/` của HW3 và chạy bộ kiểm tra cấu trúc chuẩn.

Skill đã được khởi tạo với workflow riêng cho HW03: chuẩn hóa flow, tạo mục tiêu có bằng chứng quan sát, viết scenario không “chỉ đường”, chọn đúng một trong SUS/UEQ-S, và kiểm tra đủ bốn tiêu chí `clarity / error recovery / speed / trust`. Mình đang chạy validation và rà lại các ràng buộc chống bịa dữ liệu participant/kết quả.

Bộ validator chuẩn đang thiếu dependency `PyYAML` trong runtime, không phải lỗi của skill. Mình sẽ cài dependency này vào thư mục tạm (không thay đổi môi trường dự án) để chạy đúng validator thay vì bỏ qua bước kiểm tra.

Đã tạo và validate thành công skill `design-usability-flow-evaluation`.

Các tệp chính:

- [SKILL.md](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/design-usability-flow-evaluation/SKILL.md)
- [HW03 usability design guide](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/design-usability-flow-evaluation/references/hw03-usability-design-guide.md)
- [Agent metadata](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/design-usability-flow-evaluation/agents/openai.yaml)

Skill được viết bằng tiếng Anh nhưng bắt buộc đầu ra bằng tiếng Việt. Khi nhận một end-to-end flow, agent sẽ:

- Tạo 3–5 mục tiêu kiểm thử cụ thể kèm bằng chứng/chỉ số quan sát.
- Viết task scenario thực tế, hướng đến mục tiêu và không tiết lộ từng bước thao tác.
- Chọn đúng một thang đo SUS hoặc UEQ-S, giải thích theo đặc điểm flow và hướng dẫn cách chấm.
- Tạo 6–8 câu hỏi mở, bao phủ rõ ràng bốn tiêu chí: tính rõ ràng, khôi phục lỗi, tốc độ và độ tin cậy.
- Kiểm tra coverage và ngăn việc bịa participant, kết quả, thời gian hoặc quan sát.

Ví dụ sử dụng:

```text
Use $design-usability-flow-evaluation for the flow:
Đăng ký tài khoản → tìm sản phẩm → thêm vào giỏ hàng →
áp dụng mã giảm giá → hoàn tất checkout.
```

Bộ `quick_validate.py` chính thức đã xác nhận: `Skill is valid!`
'''

### (3) Verdict

**`COMPLETE`**

### (4) Reasoning

- AI tạo ra skills hoàn chỉnh.

### (5) Student Fix

- Không cần fix.

## Entry #4

### (1) Prompt + Tool

| Field             | Content                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| **Tool**          | Claude Opus 4.6 (Thinking)                                                      |
| **Timestamp**     | 25/07/2026 17:38:01                                                              |
| **Artifact type** | Thiết kế đánh giá khả dụng (usability evaluation design) cho một luồng end-to-end |

**Full prompt:**

```
Sử dụng skill design-usability-flow-evaluation cho flow sau: 
Log in → update profile information → view order history → cancel eligible order
```

### (2) AI Output

'''
Let me first find and read the skill file to understand the instructions.

Found it! Let me read the skill file.

Now let me read the required reference file:

Now let me also check the workspace for any existing project context (product under test):

Now I have all the context I need. The flow is: **Log in → update profile information → view order history → cancel eligible order** on the **EShop** e-commerce platform (frontend-web). Let me produce the evaluation design artifact.

Đã tạo xong thiết kế đánh giá khả dụng tại [usability_flow_evaluation.md](file:///Users/lvkhang/.gemini/antigravity-ide/brain/755e3b21-a4e9-4d31-8dfc-5d86bef4adbd/usability_flow_evaluation.md).

### Tóm tắt nội dung:

| Phần | Nội dung chính |
|---|---|
| **Phạm vi** | Luồng trên EShop Frontend Web: Đăng nhập → Cập nhật hồ sơ → Xem lịch sử đơn → Hủy đơn đủ điều kiện. Dựa trên đặc tả FR-02, FR-04, FR-10, FR-11. |
| **5 mục tiêu** | Hoàn thành không hỗ trợ, điểm nghẽn điều hướng, nhận biết đơn đủ điều kiện hủy & khôi phục lỗi, tốc độ/nỗ lực, tin tưởng phản hồi hệ thống. |
| **Kịch bản** | Người tham gia đóng vai khách hàng chuyển nhà, cần cập nhật thông tin + hủy đơn đặt nhầm. Không chỉ dẫn bước cụ thể. |
| **Thang đo** | **SUS** — phù hợp luồng giao dịch hướng hoàn thành nhiệm vụ; hướng dẫn chấm điểm đầy đủ. |
| **8 câu hỏi mở** | Bao phủ 4 tiêu chí bắt buộc: Rõ ràng (2), Khôi phục lỗi (2), Tốc độ (1), Tin cậy (2), + 1 câu quan sát bổ sung. |
| **Checklist** | Đạt tất cả 4 điểm kiểm tra chất lượng. |

**Nội dung artifact đã tạo (`usability_flow_evaluation.md`):**

# Thiết kế Đánh giá Khả dụng — Luồng Quản lý Tài khoản & Đơn hàng

## 1. Phạm vi và giả định

- **Sản phẩm:** Hệ thống EShop — phân hệ Frontend Web (React + Vite, `http://localhost:5173`).
- **Luồng đánh giá:** Đăng nhập → Cập nhật hồ sơ cá nhân → Xem lịch sử đơn hàng → Hủy đơn hàng đủ điều kiện.
- **Trạng thái bắt đầu:** Người dùng chưa đăng nhập, đang ở trang chủ EShop. Tài khoản `test@eshop.com` / `Test1234!` đã có sẵn trong hệ thống, đã có ít nhất một đơn hàng ở trạng thái `pending` hoặc `confirmed` (đủ điều kiện hủy theo FR-10).
- **Trạng thái kết thúc:** Đơn hàng đủ điều kiện chuyển sang trạng thái `canceled` và người dùng thấy trạng thái cập nhật trên màn hình lịch sử đơn hàng.
- **Đối tượng người dùng mục tiêu:** Người mua hàng trực tuyến phổ thông, có kinh nghiệm cơ bản với các sàn thương mại điện tử (Shopee, Lazada…), sử dụng trình duyệt trên máy tính.
- **Bằng chứng tham khảo:** Đặc tả yêu cầu hệ thống EShop (README.md) — các yêu cầu FR-02 (Đăng nhập), FR-04 (Quản lý hồ sơ), FR-10 (Trạng thái đơn hàng & State Machine), FR-11 (Xem lịch sử đơn hàng), FR-21–FR-24 (Yêu cầu giao diện).

**Giả định ảnh hưởng thiết kế:**

- Hệ thống có dữ liệu đơn hàng sẵn với ít nhất một đơn ở trạng thái `pending` hoặc `confirmed` để người tham gia có thể thực hiện hành động hủy.
- Tài khoản test không bị khóa (chưa đăng nhập sai quá 3 lần liên tiếp).
- Luồng được đánh giá trên trình duyệt máy tính (Chrome/Firefox), không bao gồm phân hệ Mobile.

---

## 2. Mục tiêu kiểm thử khả dụng

| ID | Mục tiêu cần tìm hiểu | Bằng chứng/chỉ số quan sát |
| --- | --- | --- |
| OBJ-01 | Xác định liệu người dùng mục tiêu có thể hoàn thành toàn bộ luồng (đăng nhập → cập nhật hồ sơ → xem đơn hàng → hủy đơn) mà không cần sự can thiệp của người điều hành. | Tỷ lệ hoàn thành không cần hỗ trợ; số lần và thời điểm người điều hành phải can thiệp. |
| OBJ-02 | Nhận diện các điểm nghẽn điều hướng khi chuyển giữa bốn bước trong luồng (đăng nhập → hồ sơ → lịch sử đơn → hủy đơn). | Số lần rẽ sai, quay lại, do dự trước khi tìm đúng chức năng tiếp theo; nhận xét think-aloud về điều hướng. |
| OBJ-03 | Tìm hiểu liệu người dùng có nhận biết được đơn hàng nào đủ điều kiện hủy và phản ứng ra sao khi gặp lỗi hoặc ràng buộc trạng thái (ví dụ: đơn `shipping` không thể hủy). | Hành vi nhận diện trạng thái đơn hàng; phản ứng khi nút hủy không khả dụng hoặc hệ thống từ chối; nỗ lực khắc phục và kết quả. |
| OBJ-04 | Đánh giá nhận thức của người dùng về tốc độ và nỗ lực khi thực hiện luồng, đặc biệt ở các bước cập nhật hồ sơ và hủy đơn hàng. | Thời gian hoàn thành mỗi phân đoạn (mang tính mô tả); nhận xét think-aloud về bước nào nhanh hay chậm hơn kỳ vọng. |
| OBJ-05 | Tìm hiểu mức độ tin tưởng của người dùng vào thông tin phản hồi của hệ thống ở các thời điểm then chốt: xác nhận cập nhật hồ sơ, hiển thị trạng thái đơn hàng, và xác nhận hủy đơn. | Nhận xét think-aloud về sự rõ ràng của thông báo hệ thống; hành vi kiểm tra lại (reload, quay lại danh sách) sau khi thực hiện thao tác; mức độ do dự trước khi xác nhận hủy. |

---

## 3. Kịch bản nhiệm vụ

### Bối cảnh

Người tham gia đóng vai một khách hàng thường xuyên mua sắm trực tuyến. Họ đã tạo tài khoản trên EShop trước đây và đã đặt một số đơn hàng. Hôm nay họ cần đăng nhập vào hệ thống để xử lý một vài việc cá nhân liên quan đến tài khoản và đơn hàng.

### Nhiệm vụ giao cho người tham gia

> Bạn là khách hàng đã có tài khoản trên EShop với email `test@eshop.com` và mật khẩu `Test1234!`. Gần đây bạn chuyển nhà nên cần cập nhật thông tin giao hàng của mình. Số điện thoại mới của bạn là `0912345678` và địa chỉ mới là `123 Nguyễn Huệ, Quận 1, TP.HCM`. Sau khi cập nhật xong, bạn nhớ ra rằng mình đã đặt nhầm một đơn hàng và muốn hủy nó trước khi cửa hàng kịp giao. Hãy tìm cách xử lý tất cả các việc này trên hệ thống.

### Điều kiện hoàn thành *(chỉ dành cho người nghiên cứu)*

- Người tham gia đã đăng nhập thành công vào hệ thống.
- Hồ sơ cá nhân đã được cập nhật với số điện thoại `0912345678` và địa chỉ `123 Nguyễn Huệ, Quận 1, TP.HCM`, hệ thống hiển thị phản hồi xác nhận cập nhật.
- Người tham gia đã truy cập được trang lịch sử đơn hàng và quan sát danh sách đơn.
- Người tham gia đã hủy thành công một đơn hàng đang ở trạng thái `pending` hoặc `confirmed`, trạng thái đơn chuyển sang `canceled` trên giao diện.

### Điều kiện dừng/can thiệp *(chỉ dành cho người điều hành)*

- Người tham gia thể hiện sự bối rối rõ ràng hoặc không có tiến triển trong **3 phút liên tục** ở bất kỳ bước nào.
- Người tham gia cố gắng hủy đơn hàng ở trạng thái `shipping` hoặc `delivered` (không đủ điều kiện) và không tự nhận ra → người điều hành ghi nhận hành vi, sau đó gợi ý nhẹ nhàng: *"Bạn có nhận thấy gì khác biệt giữa các đơn hàng không?"*
- Người tham gia muốn dừng hoặc thể hiện sự khó chịu kéo dài.
- Tài khoản bị khóa do nhập sai mật khẩu → người điều hành hỗ trợ kỹ thuật (đợi 30 giây hoặc reset) và ghi nhận sự cố.

---

## 4. Thang đo sau nhiệm vụ

### Lựa chọn: `SUS` (System Usability Scale)

### Lý do phù hợp với flow

Luồng đánh giá là một chuỗi giao dịch cụ thể (đăng nhập → cập nhật hồ sơ → xem đơn hàng → hủy đơn) với mục tiêu hoàn thành nhiệm vụ rõ ràng, không yêu cầu đánh giá trải nghiệm cảm xúc hay tính sáng tạo của giao diện. Câu hỏi chính của nghiên cứu là liệu hệ thống có **dễ sử dụng, nhất quán, và dễ học** cho người dùng phổ thông hay không — đây chính là các khía cạnh mà SUS đo lường hiệu quả nhất. Ngoài ra, SUS cung cấp một điểm số tổng hợp duy nhất dễ so sánh với benchmark chuẩn, phù hợp cho việc đánh giá nhanh sau một phiên kiểm thử có phạm vi giới hạn.

### Cách thực hiện

- **Thời điểm:** Ngay sau khi người tham gia hoàn thành (hoặc dừng) nhiệm vụ, trước khi bắt đầu phỏng vấn mở.
- **Định dạng:** Bảng in giấy hoặc biểu mẫu điện tử gồm 10 phát biểu, mỗi phát biểu đánh giá trên thang Likert 5 điểm (1 = Hoàn toàn không đồng ý → 5 = Hoàn toàn đồng ý).
- **Hướng dẫn:** Yêu cầu người tham gia trả lời dựa trên trải nghiệm vừa thực hiện, chọn phương án phù hợp nhất, không suy nghĩ quá lâu ở mỗi câu.

### Cách chấm/diễn giải

- Với các phát biểu lẻ (1, 3, 5, 7, 9): lấy điểm người dùng chọn trừ 1.
- Với các phát biểu chẵn (2, 4, 6, 8, 10): lấy 5 trừ điểm người dùng chọn.
- Tổng điểm đóng góp của 10 câu, nhân với 2.5 → điểm SUS (phạm vi 0–100).
- Điểm SUS **không phải phần trăm**. Diễn giải bằng cách đối chiếu với bảng benchmark SUS (ví dụ: trên 68 được coi là trên trung bình, trên 80.3 thuộc nhóm A — tốt).
- Khi mẫu nhỏ (7 người), báo cáo điểm trung vị và phạm vi (range) thay vì chỉ dùng trung bình cộng.

---

## 5. Câu hỏi mở sau nhiệm vụ

| ID | Tiêu chí | Câu hỏi |
| --- | --- | --- |
| PROBE-01 | Rõ ràng | Trong suốt quá trình thực hiện — từ đăng nhập, cập nhật hồ sơ, đến hủy đơn hàng — ở thời điểm nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Và có lúc nào bạn cảm thấy không chắc chắn không? Vì sao? |
| PROBE-02 | Rõ ràng | Khi nhìn vào danh sách đơn hàng, bạn có dễ dàng phân biệt được trạng thái của các đơn (ví dụ: đang chờ, đã xác nhận, đang giao…) không? Điều gì giúp bạn hoặc khiến bạn khó phân biệt? |
| PROBE-03 | Khôi phục lỗi | Nếu có lúc nào thao tác của bạn không cho kết quả mong đợi — ví dụ: cập nhật hồ sơ không thành công hoặc hệ thống từ chối hủy đơn — bạn đã nhận ra vấn đề và cố xử lý như thế nào? |
| PROBE-04 | Khôi phục lỗi | Khi bạn cố hủy đơn hàng, hệ thống có giúp bạn hiểu tại sao một đơn có thể hủy được và đơn khác thì không? Thông tin hiển thị lúc đó có đủ rõ ràng không? |
| PROBE-05 | Tốc độ | Phần nào trong toàn bộ nhiệm vụ khiến bạn cảm thấy nhanh chóng hoặc suôn sẻ? Có bước nào bạn cảm thấy chậm hơn hoặc tốn công sức hơn mong đợi không? |
| PROBE-06 | Tin cậy | Sau khi cập nhật hồ sơ cá nhân, bạn có tin rằng thông tin đã được lưu đúng không? Điều gì khiến bạn tin tưởng hoặc vẫn còn nghi ngờ? |
| PROBE-07 | Tin cậy | Khi xác nhận hủy đơn hàng, bạn cảm thấy thế nào trước khi nhấn nút? Thông tin hoặc phản hồi nào của hệ thống giúp bạn yên tâm hoặc khiến bạn do dự? |
| PROBE-08 | Quan sát bổ sung | *(Câu hỏi theo dõi khi quan sát hành vi cụ thể)* Tôi nhận thấy bạn đã [điểm do dự đã quan sát] — bạn có thể chia sẻ lúc đó bạn đang suy nghĩ gì không? |

---

## 6. Kiểm tra độ bao phủ

- [x] **Kịch bản hướng mục tiêu:** Kịch bản mô tả tình huống và mục tiêu, không liệt kê các bước điều hướng cụ thể; người tham gia tự chọn cách thực hiện.
- [x] **Đúng một thang đo:** Chỉ chọn SUS, có lý do gắn với đặc điểm giao dịch của luồng (không phải lợi ích chung chung).
- [x] **Bốn tiêu chí bắt buộc đều có câu hỏi mở:**
  - Rõ ràng: PROBE-01, PROBE-02
  - Khôi phục lỗi: PROBE-03, PROBE-04
  - Tốc độ: PROBE-05
  - Tin cậy: PROBE-06, PROBE-07
- [x] **Không bịa đặt dữ liệu:** Thiết kế không tuyên bố đã chạy phiên thử, không có thông tin người tham gia, điểm số, trích dẫn, hay kết quả phân tích hư cấu.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- Chỉ có 1 câu hỏi về yếu tố tốc độ trong khi các yếu tố còn lại có 2 câu hỏi. Và câu hỏi đó hỏi về 2 hướng ngược nhau (nhanh chóng vs chậm, tốn công).

### (5) Student Fix

- Tách ra làm 2 câu hỏi cụ thể hơn về tốc độ cho từng hướng.
