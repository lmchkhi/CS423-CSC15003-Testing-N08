# AI Gap Analysis — GUI Checklist (HW03 Task 1)

For every checklist item added by a human (not the AI's first pass), one
entry below explaining *why* the AI missed it. Tie each reason to the actual
prompt sent — see `.claude/skills/gui-checklist/SKILL.md` Phase C.

## Item GUI-042: Độ tương phản ở dark mode trên Product Detail

- **AI prompt that should have surfaced this**: prompt IA01 (`reports/ai-audit-report.md`
  Entry #1) — prompt liệt kê "color contrast (WCAG AA)" và "responsive
  layout" nhưng không nhắc riêng dark mode.
- **Why the AI missed it**: Lỗi phạm vi prompt (prompt scope) — tôi liệt kê
  các sub-topic IA01 cụ thể trong prompt (visual consistency, alignment,
  color contrast, responsive, truncation, currency formatting, loading
  performance) nhưng quên đưa "dark mode" vào danh sách, nên AI chỉ bám theo
  đúng những gì được liệt kê chứ không tự bổ sung thêm khía cạnh ngoài
  prompt. Đây đúng là ví dụ "AI thường bỏ sót dark mode" mà
  `ia-seed-categories.md` đã cảnh báo trước.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-043: Thao tác ô Số lượng + nút Thêm vào giỏ hàng bằng bàn phím

- **AI prompt that should have surfaced this**: prompt IA03 (Entry #3) có yêu
  cầu keyboard navigation nhưng chỉ áp dụng cho "link điều hướng trên trang
  (breadcrumb, sản phẩm liên quan)" — không bao gồm ô nhập Số lượng hay nút
  Thêm vào giỏ hàng, vì đó là phạm vi của prompt IA02, và prompt IA02 lại
  không yêu cầu kiểm tra keyboard.
- **Why the AI missed it**: Lỗi phạm vi prompt — đây là hệ quả của việc chia
  nhỏ prompt theo từng IA riêng biệt (đúng theo kỹ thuật Phase B của skill):
  keyboard-only navigation cho các control dạng form (input, button) rơi vào
  khoảng trống giữa prompt IA02 (chỉ hỏi về validation/labeling) và prompt
  IA03 (chỉ hỏi về link điều hướng). Không AI batch nào bao trùm toàn bộ
  "mọi phần tử tương tác trên trang" theo đúng nghĩa keyboard-only navigation
  chuẩn ISTQB/WCAG.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-044: Hết phiên đăng nhập khi bấm Thêm vào giỏ hàng

- **AI prompt that should have surfaced this**: prompt IA04 (Entry #4) chỉ
  hỏi về phản hồi trực quan khi thêm vào giỏ thành công/thất bại (lỗi mạng,
  lỗi server) — không đề cập tới trường hợp lỗi cụ thể là hết phiên đăng
  nhập (401/expired token).
- **Why the AI missed it**: Giới hạn mô hình (model limitation) kết hợp với
  phạm vi prompt hẹp — sut-requirements.md không có FR nào mô tả rõ hành vi
  UI khi token hết hạn giữa chừng (chỉ có FR-02 nói về JWT token nói chung),
  nên AI không có ground truth cụ thể để bám vào và không tự suy luận ra
  trường hợp này dù đây là sub-topic chuẩn được liệt kê trong
  `ia-seed-categories.md` ("Session/auth expiry is communicated, not a
  silent redirect").
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-045: Hiển thị đúng dấu tiếng Việt trong tên/mô tả/danh mục sản phẩm

- **AI prompt that should have surfaced this**: không prompt nào trong 4
  prompt đã gửi (Entry #1–#4) yêu cầu kiểm tra riêng vấn đề hiển thị dấu
  tiếng Việt (diacritics rendering).
- **Why the AI missed it**: Đặc thù giao diện EShop (interface-specific
  trait) — đây là SUT tiếng Việt nên rủi ro vỡ dấu/mất dấu là rủi ro thực tế
  (font không hỗ trợ đủ bộ Unicode tiếng Việt, encoding sai khi hiển thị dữ
  liệu từ CSDL), nhưng vì đây không phải vấn đề phổ biến với các SUT tiếng
  Anh mà AI thường được huấn luyện để kiểm thử, nên AI không tự nghĩ ra dù
  đã được nhắc trong `ia-seed-categories.md` mục "Vietnamese-specific:
  diacritics rendering in inputs/fonts". Tôi phải tự bổ sung dựa trên đặc thù
  ngôn ngữ của SUT.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-046: Phản hồi khi mạng chậm lúc bấm Thêm vào giỏ hàng

- **AI prompt that should have surfaced this**: prompt IA04 (Entry #4) có
  item "nếu thêm vào giỏ hàng thất bại (lỗi mạng, lỗi server), hiển thị
  thông báo lỗi cụ thể" — nhưng item đó chỉ nói tới trường hợp request đã
  *thất bại hẳn*, không nói tới trường hợp mạng chậm khiến request treo lâu
  mà chưa thất bại/thành công (infinite-spinner scenario).
- **Why the AI missed it**: Lỗi phạm vi prompt — "lỗi mạng" trong output AI
  ngầm hiểu là network error (request fail hẳn, có response lỗi), không bao
  quát trường hợp slow-network (request vẫn đang chạy nhưng rất chậm, chưa
  có response). Đây là 2 kịch bản khác nhau về mặt kiểm thử: một cái test
  UI khi có lỗi, một cái test UI khi *chưa* có lỗi nhưng thời gian chờ vượt
  ngưỡng chấp nhận được — sub-topic "network-offline/slow-network feedback,
  no infinite spinners" được liệt kê riêng trong `ia-seed-categories.md`
  mục IA04 mà AI không tự tách ra khỏi item lỗi mạng chung.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-084: Độ tương phản ở dark mode trên lưới sản phẩm trang chủ

- **AI prompt that should have surfaced this**: prompt IA01 cho Home Page yêu
  cầu "color contrast (WCAG AA)" và "responsive layout" nhưng không nhắc
  riêng dark mode — cùng dạng lỗi đã xảy ra ở GUI-042 (Product Detail).
- **Why the AI missed it**: Lỗi phạm vi prompt (prompt scope) — tôi lại quên
  đưa "dark mode" vào danh sách sub-topic IA01 khi soạn prompt cho Home Page,
  dù đã biết đây là gap ở Product Detail. AI chỉ bám đúng các khía cạnh được
  liệt kê trong prompt, không tự bổ sung thêm.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-085: Tìm kiếm với từ khóa có dấu tiếng Việt

- **AI prompt that should have surfaced this**: prompt IA02 cho Home Page có
  yêu cầu kiểm tra ký tự đặc biệt/an toàn hiển thị từ khóa (XSS) nhưng không
  yêu cầu kiểm tra riêng từ khóa có dấu tiếng Việt (diacritics) — cùng loại
  gap đã xảy ra ở GUI-045 (Product Detail, tên/mô tả sản phẩm có dấu).
- **Why the AI missed it**: Đặc thù giao diện EShop (interface-specific
  trait) — SUT tiếng Việt nên tìm kiếm bằng từ khóa có dấu là thao tác người
  dùng thật sự sẽ làm, nhưng AI được huấn luyện chủ yếu trên SUT tiếng Anh
  nên không tự nghĩ ra rủi ro encoding riêng cho input tiếng Việt trong ô tìm
  kiếm (khác với hiển thị tĩnh đã có ở GUI-045) dù `ia-seed-categories.md` đã
  liệt kê "Vietnamese-specific: diacritics rendering in inputs/fonts".
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-086: Không có cách chọn/xác nhận số lượng khi thêm từ trang chủ

- **AI prompt that should have surfaced this**: không prompt nào trong 4
  prompt IA01-IA04 cho Home Page yêu cầu kiểm tra việc trang chủ hoàn toàn
  thiếu ô chọn số lượng trên thẻ sản phẩm (khác với Product Detail có ô Số
  lượng theo FR-06) — prompt IA02 chỉ hỏi về ô tìm kiếm, không hỏi về hành vi
  ẩn của nút "Thêm vào giỏ" trên từng thẻ.
- **Why the AI missed it**: Giới hạn mô hình (model limitation) — AI chỉ trả
  lời đúng phạm vi được hỏi (ô tìm kiếm) chứ không tự đặt câu hỏi ngược "nút
  Thêm vào giỏ ở đây thiếu gì so với màn Product Detail". Đây là một khoảng
  trống thiết kế implicit (default quantity = 1, không hiển thị/không cho
  sửa) mà chỉ người kiểm thử tự đối chiếu hai màn hình với nhau mới nhận ra,
  không phải thứ AI tự suy luận ra từ một prompt riêng lẻ về từng màn.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-098: Tìm kiếm với khoảng trắng thừa ở đầu/cuối từ khóa (Search Results)

- **AI prompt that should have surfaced this**: prompt IA02 cho Search
  Results (`reports/ai-audit-report.md` Entry #14) chỉ hỏi về đường dẫn xóa
  bộ lọc và URL phản ánh từ khóa — không yêu cầu kiểm tra việc chuẩn hóa input
  (input normalization) như khoảng trắng thừa.
- **Why the AI missed it**: Lỗi phạm vi prompt (prompt scope) — tôi cố tình
  tách phạm vi IA02 của Search Results ra khỏi các item validate/an toàn ô
  tìm kiếm đã có sẵn ở Home Page (GUI-059–066) để tránh trùng lặp, nhưng khi
  làm vậy lại bỏ sót luôn một edge case chưa từng được kiểm tra ở batch nào
  trước đó: khoảng trắng thừa có bị BE/FE coi là một chuỗi tìm kiếm khác đi
  hay không. Đây là gap thật do ranh giới giữa 2 batch (Home Page vs Search
  Results) bị vẽ hơi hẹp, không phải AI tự bỏ qua trong phạm vi được hỏi.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-099: Độ tương phản dark mode ở dòng thông báo kết quả tìm kiếm

- **AI prompt that should have surfaced this**: prompt IA01 cho Search
  Results (Entry #13) yêu cầu kiểm tra style dòng thông báo kết quả và bố
  cục lưới, nhưng không nhắc riêng dark mode — cùng dạng lỗi đã lặp lại 2 lần
  trước đó (GUI-042 ở Product Detail, GUI-084 ở Home Page).
- **Why the AI missed it**: Lỗi phạm vi prompt (prompt scope), lặp lại có hệ
  thống — tôi tiếp tục quên đưa "dark mode" vào danh sách sub-topic IA01 dù
  đã biết đây là gap ở cả 2 màn trước. Việc gap này lặp lại lần thứ 3 tự nó
  là một quan sát: AI không "nhớ" các gap đã phát hiện ở batch trước để tự bù
  đắp cho batch sau — mỗi prompt IA01 mới đều cần liệt kê tường minh dark mode
  nếu muốn AI cover, không thể trông chờ AI tự suy luận ra từ ngữ cảnh những
  lần trước.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-109: Từ khóa có dấu tiếng Việt không khớp sản phẩm nào (Empty Search State)

- **AI prompt that should have surfaced this**: không prompt nào trong 4
  prompt IA01-IA04 cho Empty Search State (Entry #18–#21) yêu cầu kiểm tra
  riêng từ khóa có dấu tiếng Việt trong ngữ cảnh 0 kết quả — cùng loại gap đã
  xảy ra ở GUI-045 (Product Detail) và GUI-085 (Home Page, khi CÓ kết quả).
- **Why the AI missed it**: Đặc thù giao diện EShop (interface-specific
  trait), lặp lại lần thứ 3 — SUT tiếng Việt nên rủi ro vỡ dấu/encoding khi xử
  lý input tiếng Việt là rủi ro thực tế ở bất kỳ ngữ cảnh nào (hiển thị tĩnh,
  tìm kiếm có kết quả, và cả tìm kiếm 0 kết quả), nhưng AI được huấn luyện chủ
  yếu trên SUT tiếng Anh nên không tự khái quát hóa gap này sang một trạng
  thái màn hình mới (empty state) dù đã từng được nhắc ở 2 batch trước —
  `ia-seed-categories.md` liệt kê "Vietnamese-specific: diacritics rendering
  in inputs/fonts" như một mục chung, không tách riêng theo từng trạng thái
  màn hình, nên tôi phải tự bổ sung cho từng ngữ cảnh cụ thể.
- **Added by**: Hà Bảo Ngọc (23127300)

---

## Item GUI-110: Độ tương phản dark mode ở trạng thái Empty Search State

- **AI prompt that should have surfaced this**: prompt IA01 cho Empty Search
  State (Entry #18) yêu cầu kiểm tra icon/minh họa và responsive nhưng không
  nhắc riêng dark mode — lần lặp lại thứ 4 của cùng loại gap (GUI-042,
  GUI-084, GUI-099).
- **Why the AI missed it**: Lỗi phạm vi prompt (prompt scope), lặp lại có hệ
  thống — xác nhận rõ ràng hơn nhận xét đã ghi ở GUI-099: đây không còn là
  một lần sơ suất ngẫu nhiên mà là một pattern thật trong cách tôi soạn prompt
  IA01 cho mọi màn hình mới. Bài học rút ra (ghi lại để áp dụng cho các màn
  hình tiếp theo ngoài phạm vi HW03 này): nên đưa "dark mode contrast" vào
  một checklist-of-checklists cố định để tự kiểm tra prompt IA01 trước khi
  gửi, thay vì dựa vào trí nhớ.
- **Added by**: Hà Bảo Ngọc (23127300)

---
