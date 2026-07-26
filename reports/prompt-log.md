# Prompt Log

*Complete, unfiltered record of every AI interaction during HW03. See
`reports/ai-audit-report.md` for the reviewed subset with verdicts.*

## [1] Claude (Sonnet 5, Claude Code) — 5:14 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Product Detail (trang chi tiết sản phẩm) của hệ thống EShop.

Ground truth — trích từ sut-requirements.md:
- FR-06 (Xem chi tiết sản phẩm): "Hiển thị đầy đủ: Ảnh lớn, Tên, Giá, Mô tả,
  Danh mục. Có ô nhập Số lượng (chỉ nhận số nguyên dương, tối thiểu là 1).
  Nút Thêm vào giỏ hàng — sau khi bấm hiển thị phản hồi trực quan (toast
  notification hoặc badge cập nhật)."
- FR-21 (Tiêu chuẩn Giao diện Chung): "Nhất quán ngôn ngữ: toàn bộ giao diện
  dùng tiếng Việt. Nhất quán màu sắc: nút hành động tích cực dùng màu xanh
  dương, nút nguy hiểm/hủy bỏ dùng màu đỏ. Nhất quán đơn vị tiền: luôn dùng
  ký hiệu ₫ với định dạng phân cách hàng nghìn. Tiêu đề trang: mỗi trang có
  đúng 1 thẻ <h1>. Tab Order: thứ tự focus theo Tab phải đi từ trên xuống
  dưới, trái sang phải."

Chỉ tập trung vào IA01 — General UI standards (KHÔNG phải form, navigation,
hay feedback/state, những phần đó sẽ có prompt riêng). Liệt kê 10-12 checklist
item kiểm tra tiêu chuẩn giao diện chung cho riêng màn Product Detail, bám sát
FR-06 và FR-21 ở trên, và cân nhắc thêm các khía cạnh IA01 chuẩn (visual
consistency, alignment, color contrast, responsive layout, truncation cho tên
sản phẩm dài, currency/number formatting, loading performance) áp dụng cho
màn hình chi tiết sản phẩm.

Trả về dạng bảng Markdown với các cột: Item (mô tả kiểm tra), Lý do liên kết
tới FR nào (nếu có). Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam
thực sự sẽ viết, không phải câu dịch máy từ tiếng Anh.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Trang Product Detail có đúng 1 thẻ `<h1>` chứa tên sản phẩm, không có `<h1>` trùng lặp nào khác trên trang | FR-21 |
| Toàn bộ nhãn, label, nút bấm trên trang đều dùng tiếng Việt, không sót chuỗi tiếng Anh (vd "Add to cart" chưa dịch) | FR-21 |
| Giá sản phẩm hiển thị đúng ký hiệu ₫ và có dấu phân cách hàng nghìn (vd "1.250.000 ₫", không phải "1250000") | FR-21, FR-06 |
| Nút "Thêm vào giỏ hàng" dùng màu xanh dương (màu hành động tích cực), không trùng màu với nút nguy hiểm/hủy | FR-21 |
| Ảnh lớn sản phẩm, Tên, Giá, Mô tả, Danh mục đều hiển thị đầy đủ trên trang, không thiếu trường nào | FR-06 |
| Ảnh sản phẩm giữ đúng tỷ lệ khung hình (aspect ratio), không bị méo/kéo giãn khi hiển thị ở kích thước lớn | FR-06 |
| Tên sản phẩm dài (>60 ký tự) không làm vỡ layout — có xử lý truncate hoặc wrap hợp lý, không tràn ra ngoài khung | IA01 chuẩn |
| Mô tả sản phẩm dài hiển thị đầy đủ, có cuộn (scroll) hoặc "Xem thêm" thay vì bị cắt cụt không rõ ràng | IA01 chuẩn |
| Font chữ, cỡ chữ, màu chữ nhất quán với các màn hình khác (Home, product grid) — không lệch style | FR-21 |
| Độ tương phản giữa chữ và nền đạt chuẩn WCAG AA (tối thiểu 4.5:1 với chữ thường) để đọc rõ tên/giá/mô tả | IA01 chuẩn |
| Layout responsive hợp lý ở cả desktop và mobile — ảnh, thông tin, nút bấm không đè lên nhau khi thu nhỏ màn hình | IA01 chuẩn |
| Khi ảnh sản phẩm đang tải, có trạng thái loading (skeleton hoặc placeholder) thay vì khoảng trắng/giật hình | IA01 chuẩn |
```

---

## [2] Claude (Sonnet 5, Claude Code) — 5:16 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Product Detail của hệ thống EShop, tập trung riêng vào IA02 —
Forms, cụ thể là form/ô nhập Số lượng sản phẩm trước khi thêm vào giỏ hàng.

Ground truth — trích từ sut-requirements.md:
- FR-06: "Có ô nhập Số lượng (chỉ nhận số nguyên dương, tối thiểu là 1). Nút
  Thêm vào giỏ hàng — sau khi bấm hiển thị phản hồi trực quan (toast
  notification hoặc badge cập nhật)."
- FR-22 (Form Requirements): "Tất cả trường bắt buộc phải có ký hiệu * bên
  cạnh nhãn. Thông báo lỗi phải xuất hiện TRÊN nút submit, không phải bên
  dưới. Các form có từ 2 bước trở lên phải có Step Indicator rõ ràng."

Chỉ tập trung vào IA02 — Forms (KHÔNG phải general UI, navigation, hay
feedback/state). Liệt kê 8-10 checklist item kiểm tra riêng ô nhập Số lượng
và hành vi submit của nó, bám sát FR-06 và FR-22, và cân nhắc thêm các khía
cạnh IA02 chuẩn liên quan (validation timing, error message vị trí, input
type phù hợp dữ liệu số, ngăn double-submit, trạng thái nút disable) áp dụng
cho ô Số lượng này — lưu ý form này chỉ có 1 trường, không có nhiều bước nên
Step Indicator không áp dụng.

Trả về dạng bảng Markdown với 2 cột: Item, Lý do liên kết tới FR nào (nếu
có). Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Ô nhập Số lượng chỉ chấp nhận số nguyên dương, không cho nhập số 0, số âm hoặc số thập phân | FR-06 |
| Giá trị mặc định của ô Số lượng khi vào trang là 1, không để trống hoặc bằng 0 | FR-06 |
| Ô nhập Số lượng có nhãn rõ ràng ("Số lượng") kèm ký hiệu `*` vì đây là trường bắt buộc | FR-22 |
| Khi nhập ký tự chữ hoặc ký tự đặc biệt vào ô Số lượng, hệ thống từ chối hoặc hiển thị lỗi, không cho submit | FR-06 |
| Khi nhập số lượng không hợp lệ (0, âm, để trống) rồi bấm "Thêm vào giỏ hàng", thông báo lỗi hiển thị ngay phía trên nút submit, không phải bên dưới | FR-22 |
| Ô nhập Số lượng dùng `type="number"` hoặc bàn phím số trên thiết bị di động để nhập liệu thuận tiện hơn | IA02 chuẩn |
| Có nút tăng/giảm (+/-) đi kèm ô nhập số lượng, bấm "-" khi số lượng đang là 1 thì không giảm xuống 0 hoặc số âm | FR-06 |
| Sau khi bấm "Thêm vào giỏ hàng", nút tạm thời bị disable hoặc có cơ chế chống bấm nhiều lần liên tiếp (double-submit) | IA02 chuẩn |
| Validation của ô Số lượng chạy ngay khi rời khỏi ô (on blur) hoặc khi gõ, không đợi đến lúc bấm submit mới báo lỗi | IA02 chuẩn |
| Không thể dán (paste) giá trị không hợp lệ (chữ, ký tự đặc biệt) vào ô Số lượng để bypass validation | IA02 chuẩn |
```

---

## [3] Claude (Sonnet 5, Claude Code) — 5:18 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Product Detail của hệ thống EShop, tập trung riêng vào IA03 —
Navigation.

Ground truth — trích từ sut-requirements.md:
- FR-23 (Navigation Requirements): "Thanh điều hướng (Navbar) phải highlight
  trang đang được chọn. Link 'Giỏ hàng' phải hiển thị badge số lượng sản phẩm
  trong giỏ. Nút Đăng xuất phải nhãn là 'Đăng xuất' (không phải 'Thoát').
  Breadcrumb bắt buộc có ở các trang con (Giỏ hàng, Thanh toán, Chi tiết sản
  phẩm)."

Chỉ tập trung vào IA03 — Navigation cho riêng màn Product Detail (KHÔNG phải
general UI, form, hay feedback/state). Liệt kê 8-10 checklist item về:
breadcrumb trên trang chi tiết sản phẩm (bắt buộc theo FR-23), đường quay lại
danh sách sản phẩm, phần sản phẩm liên quan (related products) nếu có, hành vi
nút back/forward của trình duyệt, và các khía cạnh IA03 chuẩn khác (deep link
trực tiếp vào URL sản phẩm, giữ đúng trạng thái nav khi vào thẳng trang chi
tiết, keyboard navigation, tap target trên mobile) áp dụng cho màn hình này.

Trả về dạng bảng Markdown với 2 cột: Item, Lý do liên kết tới FR nào (nếu có).
Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Trang Product Detail hiển thị breadcrumb (vd: Trang chủ > Danh mục > Tên sản phẩm) ngay phía trên nội dung chính | FR-23 |
| Từng mắt breadcrumb (trừ mắt cuối) là link bấm được, dẫn đúng về trang tương ứng (Trang chủ, Danh mục) | FR-23 |
| Mắt breadcrumb cuối cùng (tên sản phẩm hiện tại) không phải là link, chỉ hiển thị dạng text vì đang ở trang đó | IA03 chuẩn |
| Có đường quay lại danh sách sản phẩm rõ ràng (nút "Quay lại" hoặc qua breadcrumb), không bắt người dùng chỉ dựa vào nút back trình duyệt | IA03 chuẩn |
| Bấm nút Back của trình duyệt từ trang chi tiết quay đúng về trang danh sách/kết quả tìm kiếm trước đó, không mất trạng thái (vị trí cuộn, bộ lọc đã chọn) | IA03 chuẩn |
| Truy cập trực tiếp bằng URL sản phẩm (deep link) hiển thị đúng trang chi tiết sản phẩm đó, không lỗi hoặc văng về trang chủ | IA03 chuẩn |
| Thanh điều hướng chính (Navbar) không highlight sai mục khi đang ở trang chi tiết sản phẩm (không phải trang danh mục nên không nên bị active nhầm) | FR-23 |
| Nếu có phần "Sản phẩm liên quan" ở cuối trang, bấm vào một sản phẩm liên quan điều hướng đúng sang trang chi tiết của sản phẩm đó | IA03 chuẩn |
| Toàn bộ link điều hướng trên trang (breadcrumb, sản phẩm liên quan) truy cập được bằng bàn phím (Tab + Enter), có focus ring hiển thị rõ | IA03 chuẩn |
| Trên mobile, các vùng bấm của breadcrumb và link sản phẩm liên quan đủ lớn (~44×44px), không bị chồng lấn khó bấm trúng | IA03 chuẩn |
```

---

## [4] Claude (Sonnet 5, Claude Code) — 5:19 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Product Detail của hệ thống EShop, tập trung riêng vào IA04 —
Feedback / State.

Ground truth — trích từ sut-requirements.md:
- FR-06: "Nút Thêm vào giỏ hàng — sau khi bấm hiển thị phản hồi trực quan
  (toast notification hoặc badge cập nhật)."
- FR-24 (Feedback & State Requirements): "Sau khi bấm 'Thêm vào giỏ', phải có
  phản hồi trực quan (toast/badge). Khi xóa item khỏi giỏ phải có dialog xác
  nhận. Trang trống (Empty State) phải có icon/hình minh họa và message thân
  thiện. Tất cả ảnh sản phẩm phải có thuộc tính alt mô tả nội dung ảnh (không
  để rỗng)."

Lưu ý: tôi đã có sẵn 1 item ở batch IA01 khác về "trạng thái loading khi ảnh
đang tải" — ĐỪNG lặp lại item đó, hãy tập trung vào phản hồi SAU HÀNH ĐỘNG của
người dùng (thêm vào giỏ, chọn số lượng, trạng thái hết hàng), không phải
loading ảnh ban đầu.

Chỉ tập trung vào IA04 — Feedback/State cho riêng màn Product Detail. Liệt kê
8-10 checklist item về: phản hồi trực quan sau khi bấm "Thêm vào giỏ hàng"
(toast/badge theo FR-06 và FR-24), thuộc tính alt của ảnh sản phẩm (FR-24),
trạng thái hết hàng/ngừng kinh doanh của sản phẩm (nếu có), và các khía cạnh
IA04 chuẩn khác (disabled state rõ ràng, lỗi khi thêm vào giỏ thất bại, toast
đủ thời gian đọc và có thể đóng được).

Trả về dạng bảng Markdown với 2 cột: Item, Lý do liên kết tới FR nào (nếu có).
Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Sau khi bấm "Thêm vào giỏ hàng" thành công, có toast notification hoặc badge số lượng giỏ hàng cập nhật ngay lập tức, không cần load lại trang | FR-06, FR-24 |
| Toast/thông báo "Đã thêm vào giỏ hàng" hiển thị đủ lâu để đọc được (không dưới ~2-3 giây) và có thể đóng sớm nếu người dùng muốn | IA04 chuẩn |
| Ảnh sản phẩm trên trang chi tiết có thuộc tính `alt` mô tả đúng nội dung (tên sản phẩm), không để trống hoặc alt chung chung như "image" | FR-24 |
| Nếu sản phẩm hết hàng, trang hiển thị rõ trạng thái "Hết hàng" và nút "Thêm vào giỏ hàng" bị disable, không cho bấm | IA04 chuẩn |
| Nút "Thêm vào giỏ hàng" ở trạng thái disable có style phân biệt rõ với trạng thái enable (màu nhạt hơn, con trỏ not-allowed), không chỉ mờ nhẹ khó nhận ra | IA04 chuẩn |
| Nếu thêm vào giỏ hàng thất bại (lỗi mạng, lỗi server), hiển thị thông báo lỗi cụ thể, không phải màn trắng hoặc treo im lặng | IA04 chuẩn |
| Trong lúc chờ phản hồi từ server sau khi bấm "Thêm vào giỏ hàng", nút hiển thị trạng thái loading (spinner) để người dùng biết hệ thống đang xử lý | IA04 chuẩn |
| Badge số lượng trên icon giỏ hàng ở navbar cập nhật đồng bộ ngay sau khi thêm sản phẩm từ trang chi tiết, không lệch số | FR-06, FR-24 |
| Nếu người dùng đổi số lượng rồi bấm thêm vào giỏ nhiều lần liên tiếp cho cùng sản phẩm, badge/toast phản ánh đúng tổng số lượng đã cộng dồn, không hiển thị sai | IA04 chuẩn |
```

---

## [5] Claude (Sonnet 5, Claude Code) — 5:25 PM 26/07/2026

**Prompt:**
```
Review các item AI vừa tạo cho Product Detail, tìm gap AI bỏ sót
(accessibility, dark mode, định dạng ₫/VN, offline/slow-network...), ghi lý
do vào ai-gap-analysis, log vào prompt-log và ai-audit-log.
```

**Output:**
```
Rà soát 41 item AI-generated (GUI-001–041, batch Entry #1-#4) đối chiếu với
ia-seed-categories.md mục "Commonly AI-missed" và các sub-topic IA01-IA04
chuẩn. Kết quả: 3 gap đã được thêm ở lượt review trước (GUI-042 dark mode,
GUI-043 keyboard-only cho ô Số lượng/nút submit, GUI-045 dấu tiếng Việt) cộng
GUI-044 (session/auth expiry). Rà lại theo đúng 4 khía cạnh user yêu cầu lần
này (accessibility, dark mode, định dạng ₫/VN, offline/slow-network):

- accessibility (alt text, keyboard, contrast): đã có GUI-010 (contrast, AI),
  GUI-031 (keyboard cho link, AI), GUI-035 (alt text, AI), GUI-043 (keyboard
  cho form control, Human) — đủ, không cần thêm.
- dark mode: đã có GUI-042 (Human) từ lượt trước — đủ.
- định dạng ₫/VN: đã có GUI-003 (₫ formatting, AI), GUI-045 (dấu tiếng Việt,
  Human) — đủ.
- offline/slow-network: GUI-038 (AI) chỉ nói "lỗi mạng, lỗi server" tức
  network error đã xảy ra hẳn — CHƯA có item cho kịch bản mạng CHẬM (request
  treo lâu, chưa fail hẳn, nguy cơ infinite spinner). Đây là gap thật, thêm
  GUI-046: "Khi mạng chậm (throttle 3G) lúc bấm Thêm vào giỏ hàng, không bị
  treo spinner vô thời hạn — có timeout và thông báo lỗi rõ ràng nếu request
  quá lâu."

Đã ghi lý do gap GUI-046 vào ai-gap-analysis/gui-checklist-gaps.md, thêm dòng
GUI-046 (Source=Human) vào checklist/gui-checklist.md.
```

---
