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
