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

## [6] Claude (Sonnet 5, Claude Code + Claude for Chrome) — 6:10 PM 26/07/2026

**Prompt:**
```
SUT chạy tại http://localhost:5173/, commit 85af3ba (repo eshop-sut). Claude
for Chrome đã kết nối — tự mở Product Detail, thực thi toàn bộ item trong
checklist/gui-checklist.md cho màn này, đánh dấu Passed/Failed dựa trên những
gì bạn thấy thật trên trang, screenshot các item Failed, và file bug qua
skill bug-report nếu có.
Ghi "Build/commit tested" và "URL" thật (không phải placeholder) vào phần
scope của README.md nếu còn trống. Log lại vào prompt-log và ai-audit-log.
```

**Output:**
```
Thực thi trực tiếp cả 46 item của checklist/gui-checklist.md trên SUT thật
(http://localhost:5173/, eshop-sut @ 85af3ba) qua Claude for Chrome: click,
gõ, resize viewport, đăng nhập test@eshop.com, kiểm tra tab Network/Console,
đọc DOM/computed style, lặp lại thao tác nhiều lần để xác nhận tính nhất
quán của hành vi thay vì chỉ suy đoán từ một lần quan sát.

Kết quả: 19 Passed, 24 Failed, 3 N/A (GUI-019/030/036 — tính năng +/-, sản
phẩm liên quan, hết hàng không tồn tại trong SUT).

Phát hiện quan trọng nhất: nút "Thêm vào giỏ hàng" cần bấm đúng 2 lần mới có
tác dụng — lần bấm đầu tiên luôn bị bỏ qua im lặng, có quy luật rõ ràng
(không phải ngẫu nhiên); giỏ hàng không được lưu bền vững ở bất kỳ đâu
(kiểm tra Local Storage: rỗng), không gọi API nào (tab Network: 0 request),
nên mất trắng khi tải lại trang; không có toast/badge số lượng nào tồn tại;
thêm cùng sản phẩm nhiều lần tạo dòng mới thay vì cộng dồn số lượng. Ngoài
ra: thiếu hoàn toàn breadcrumb (vi phạm FR-23 bắt buộc), thiếu trường Danh
mục (vi phạm FR-06), nút sai màu (xanh lá thay vì xanh dương theo FR-21), ô
Số lượng không có validation nào (chấp nhận số lượng 0 vào thẳng giỏ hàng).

Đã file 7 bug report + ảnh chụp màn hình cho các item Failed vào
bug-reports/BUG-IA01-PRODUCTDETAIL-001..003, BUG-IA02-PRODUCTDETAIL-001,
BUG-IA03-PRODUCTDETAIL-001..002, BUG-IA04-PRODUCTDETAIL-001 (chưa tạo GitHub
Issue — cần xác nhận từ sinh viên trước khi push/tạo issue theo đúng quy
trình của skill bug-report). Cập nhật README.md §2.1 (commit `85af3ba`, URL
`http://localhost:5173/`) và bảng tổng hợp §2.2. Cập nhật đầy đủ bảng kết quả
và Summary trong checklist/gui-checklist.md.
```

---

## [7] Claude (Sonnet 5, Claude Code) — 7:31 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Home Page (trang chủ) của hệ thống EShop.

Ground truth — trích từ sut-requirements.md:
- FR-05 (Xem danh sách & Tìm kiếm sản phẩm): "Trang chủ hiển thị danh sách
  tất cả sản phẩm dạng lưới (grid). Mỗi sản phẩm hiển thị: Ảnh (tỷ lệ chuẩn,
  có alt text mô tả), Tên sản phẩm, Giá (đơn vị: ₫, định dạng phân cách hàng
  nghìn)... Khi đang tải dữ liệu phải hiển thị trạng thái loading... Trang
  chủ chỉ có đúng một thẻ <h1>."
- FR-21 (Tiêu chuẩn Giao diện Chung): "Nhất quán ngôn ngữ: toàn bộ giao diện
  dùng tiếng Việt. Nhất quán màu sắc: nút hành động tích cực dùng màu xanh
  dương. Nhất quán đơn vị tiền: luôn dùng ký hiệu ₫ với định dạng phân cách
  hàng nghìn. Tiêu đề trang: mỗi trang có đúng 1 thẻ <h1>. Tab Order: thứ tự
  focus theo Tab phải đi từ trên xuống dưới, trái sang phải."

Chỉ tập trung vào IA01 — General UI standards (KHÔNG phải form, navigation,
hay feedback/state, những phần đó sẽ có prompt riêng). Liệt kê 10-12 checklist
item kiểm tra tiêu chuẩn giao diện chung cho riêng màn Home Page, bám sát
FR-05 và FR-21 ở trên, và cân nhắc thêm các khía cạnh IA01 chuẩn (visual
consistency, alignment/grid, color contrast, responsive layout, truncation
cho tên sản phẩm dài, currency/number formatting, loading performance) áp
dụng cho lưới sản phẩm ở trang chủ.

Trả về dạng bảng Markdown với các cột: Item (mô tả kiểm tra), Lý do liên kết
tới FR nào (nếu có). Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam
thực sự sẽ viết, không phải câu dịch máy từ tiếng Anh.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Trang chủ có đúng 1 thẻ `<h1>` duy nhất mô tả nội dung trang, không có thẻ `<h1>` nào khác xuất hiện thêm ở bất kỳ đâu trên trang | FR-21, FR-05 |
| Toàn bộ nhãn, placeholder, nút bấm trên trang chủ đều dùng tiếng Việt, không sót chuỗi tiếng Anh chưa dịch | FR-21 |
| Giá mỗi sản phẩm trong lưới hiển thị đúng ký hiệu ₫ và có dấu phân cách hàng nghìn (vd "30.000.000 ₫", không phải "30000000" hay đơn vị khác) | FR-05, FR-21 |
| Nút "Thêm vào giỏ" trên từng thẻ sản phẩm dùng màu xanh dương (màu hành động tích cực), không trùng màu với nút nguy hiểm/hủy | FR-21 |
| Mỗi thẻ sản phẩm trong lưới hiển thị đủ Ảnh, Tên, Giá — không thiếu trường nào so với yêu cầu | FR-05 |
| Ảnh sản phẩm trong lưới giữ đúng tỷ lệ khung hình chuẩn, không bị méo hoặc kéo giãn khi hiển thị | FR-05 |
| Tên sản phẩm dài (>60 ký tự) không làm vỡ layout thẻ sản phẩm — có truncate hoặc wrap hợp lý, không tràn ra ngoài khung hoặc đè lên thẻ bên cạnh | IA01 chuẩn |
| Bố cục lưới sản phẩm (grid) canh đều, khoảng cách giữa các thẻ sản phẩm nhất quán, không lệch hàng/cột | IA01 chuẩn |
| Font chữ, cỡ chữ, màu chữ trên trang chủ nhất quán với các màn hình khác (product detail), không lệch style | FR-21 |
| Độ tương phản giữa chữ (tên, giá sản phẩm) và nền đạt chuẩn WCAG AA (tối thiểu 4.5:1 với chữ thường) | IA01 chuẩn |
| Layout responsive hợp lý ở cả desktop, tablet và mobile — số cột của lưới sản phẩm tự điều chỉnh, không đè/tràn nội dung | IA01 chuẩn |
| Khi danh sách sản phẩm đang tải từ server, có trạng thái loading rõ ràng (skeleton/spinner) thay vì khoảng trắng rồi giật hiện nội dung | FR-05 |
```

---

## [8] Claude (Sonnet 5, Claude Code) — 7:32 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Home Page của hệ thống EShop, tập trung riêng vào IA02 —
Forms. Lưu ý: khác với Product Detail (có ô Số lượng theo FR-06), Home Page
KHÔNG có form chọn số lượng — form duy nhất ở đây là ô tìm kiếm sản phẩm.

Ground truth — trích từ sut-requirements.md:
- FR-05: "Thanh tìm kiếm tìm theo tên sản phẩm. Từ khóa tìm kiếm phải được
  hiển thị an toàn (không render HTML). Khi đang tải dữ liệu phải hiển thị
  trạng thái loading. Khi không có kết quả tìm kiếm phải hiển thị thông báo
  empty state phù hợp."
- FR-22 (Form Requirements): "Tất cả trường bắt buộc phải có ký hiệu * bên
  cạnh nhãn. Thông báo lỗi phải xuất hiện TRÊN nút submit, không phải bên
  dưới."
- FR-21: "Tab Order: thứ tự focus theo Tab phải đi từ trên xuống dưới, trái
  sang phải."

Chỉ tập trung vào IA02 — Forms cho riêng ô tìm kiếm ở Home Page (KHÔNG phải
general UI, navigation, hay feedback/state). Liệt kê 8-10 checklist item bám
sát FR-05 và FR-22, và cân nhắc thêm các khía cạnh IA02 chuẩn liên quan
(placeholder không thay thế nhãn, an toàn hiển thị input — liên hệ XSS, submit
qua Enter, double-submit, tab order). Không đưa item về validation bắt buộc/*
vì ô tìm kiếm không phải trường bắt buộc.

Trả về dạng bảng Markdown với 2 cột: Item, Lý do liên kết tới FR nào (nếu
có). Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Ô tìm kiếm có placeholder rõ ràng ("Tìm kiếm...") nhưng không dùng placeholder thay thế hoàn toàn cho nhãn — vẫn cần có cách xác định mục đích ô nhập cho screen reader | FR-22, IA02 chuẩn |
| Từ khóa tìm kiếm người dùng nhập vào được hiển thị lại an toàn ở dòng "Kết quả tìm kiếm cho: ...", không bị render thành HTML/thực thi script | FR-05 |
| Nút "Tìm" submit đúng form tìm kiếm khi bấm, và ô tìm kiếm cũng submit được khi nhấn phím Enter | IA02 chuẩn |
| Khi bấm "Tìm" với ô tìm kiếm để trống, hệ thống xử lý hợp lý (hiển thị lại toàn bộ sản phẩm), không báo lỗi hoặc trả về màn trắng | IA02 chuẩn |
| Trong lúc chờ kết quả tìm kiếm trả về, nút "Tìm" hoặc form có trạng thái loading/disable tạm thời, tránh double-submit khi người dùng bấm liên tục | FR-05, IA02 chuẩn |
| Từ khóa tìm kiếm chứa ký tự đặc biệt (`<`, `>`, `"`, thẻ `<script>`) không làm vỡ layout hoặc thực thi được mã lệnh trên trang | FR-05 |
| Thứ tự Tab khi thao tác trên trang chủ đi từ ô tìm kiếm → nút Tìm → các thẻ sản phẩm theo đúng thứ tự trên xuống dưới, trái sang phải | FR-21 |
| Ô tìm kiếm giữ lại đúng từ khóa đã nhập sau khi có kết quả trả về, không tự động bị xóa trắng | IA02 chuẩn |
```

---

## [9] Claude (Sonnet 5, Claude Code) — 7:33 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Home Page của hệ thống EShop, tập trung riêng vào IA03 —
Navigation. Lưu ý: khác với Product Detail, Home Page là trang gốc (root)
nên KHÔNG cần breadcrumb (FR-23 chỉ bắt buộc breadcrumb ở "trang con") và
KHÔNG có phần "sản phẩm liên quan" — hãy tập trung vào các khía cạnh
navigation thực sự áp dụng cho trang chủ: navbar active-state, link từ thẻ
sản phẩm sang trang chi tiết, khả năng phát hiện ô tìm kiếm, hành vi back/
forward, deep link, keyboard nav và tap target trên lưới sản phẩm.

Ground truth — trích từ sut-requirements.md:
- FR-23 (Navigation Requirements): "Thanh điều hướng (Navbar) phải highlight
  trang đang được chọn. Link 'Giỏ hàng' phải hiển thị badge số lượng sản phẩm
  trong giỏ. Breadcrumb bắt buộc có ở các trang con (Giỏ hàng, Thanh toán,
  Chi tiết sản phẩm)." — ngụ ý Home Page (không phải trang con) không bắt
  buộc breadcrumb.

Liệt kê 8-10 checklist item cho riêng màn Home Page, bám sát FR-23, và cân
nhắc thêm các khía cạnh IA03 chuẩn (search discoverable, browser back giữ
trạng thái, deep link, keyboard-only navigation, tap target mobile).

Trả về dạng bảng Markdown với 2 cột: Item, Lý do liên kết tới FR nào (nếu có).
Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Thanh điều hướng (Navbar) highlight đúng mục "Trang chủ" khi người dùng đang ở trang chủ | FR-23 |
| Link "Giỏ hàng" trên navbar hiển thị đúng badge số lượng sản phẩm hiện có trong giỏ ngay từ trang chủ, không cần vào trang khác mới thấy | FR-23 |
| Nút/link "Xem chi tiết" trên mỗi thẻ sản phẩm điều hướng đúng sang trang chi tiết của chính sản phẩm đó, không nhầm lẫn sang sản phẩm khác | IA03 chuẩn |
| Ô tìm kiếm được đặt ở vị trí dễ thấy, nhất quán (đầu trang), người dùng nhận ra ngay chức năng tìm kiếm mà không cần hướng dẫn thêm | IA03 chuẩn |
| Sau khi vào trang chi tiết sản phẩm rồi bấm Back trình duyệt, quay lại đúng trang chủ, giữ nguyên từ khóa tìm kiếm và vị trí cuộn trước đó, không mất trạng thái | IA03 chuẩn |
| Truy cập trực tiếp URL trang chủ (gõ tay hoặc F5 reload) hiển thị đúng danh sách sản phẩm, không lỗi hoặc màn trắng | IA03 chuẩn |
| Toàn bộ thẻ sản phẩm và link "Xem chi tiết" truy cập được bằng bàn phím (Tab + Enter), có focus ring hiển thị rõ ràng | IA03 chuẩn |
| Trên mobile, vùng bấm của nút "Xem chi tiết" và nút "Thêm vào giỏ" trên mỗi thẻ sản phẩm đủ lớn (~44×44px), không chồng lấn nhau khó bấm trúng | IA03 chuẩn |
| Trang chủ không hiển thị breadcrumb thừa dạng "Trang chủ > Trang chủ" — đúng vì đây là trang gốc, không phải trang con nên breadcrumb theo FR-23 không bắt buộc ở đây | FR-23 |
```

---

## [10] Claude (Sonnet 5, Claude Code) — 7:34 PM 26/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Home Page của hệ thống EShop, tập trung riêng vào IA04 —
Feedback / State.

Ground truth — trích từ sut-requirements.md:
- FR-05: "Khi đang tải dữ liệu phải hiển thị trạng thái loading."
- FR-24 (Feedback & State Requirements): "Sau khi bấm 'Thêm vào giỏ', phải có
  phản hồi trực quan (toast/badge). Tất cả ảnh sản phẩm phải có thuộc tính
  alt mô tả nội dung ảnh (không để rỗng)."

Chỉ tập trung vào IA04 — Feedback/State cho riêng màn Home Page. Liệt kê 8-10
checklist item về: phản hồi trực quan sau khi bấm "Thêm vào giỏ" trực tiếp từ
thẻ sản phẩm trong lưới (không qua trang chi tiết), thuộc tính alt của ảnh
sản phẩm, trạng thái loading khi tải danh sách, lỗi khi tải/thêm giỏ thất
bại, và độ tin cậy của nút thêm giỏ (không yêu cầu bấm nhiều lần).

Trả về dạng bảng Markdown với 2 cột: Item, Lý do liên kết tới FR nào (nếu có).
Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Sau khi bấm "Thêm vào giỏ" trên một thẻ sản phẩm ở trang chủ, có phản hồi trực quan ngay lập tức (toast/badge cập nhật số lượng), không cần tải lại trang | FR-24 |
| Toast/thông báo "Đã thêm vào giỏ hàng" (nếu có) hiển thị đủ lâu để đọc được và có thể đóng sớm nếu người dùng muốn | IA04 chuẩn |
| Mỗi ảnh sản phẩm trong lưới có thuộc tính `alt` mô tả đúng tên sản phẩm, không để trống hoặc alt chung chung như "image" | FR-24 |
| Khi API tải danh sách sản phẩm gặp lỗi (mất kết nối, lỗi server), trang hiển thị thông báo lỗi cụ thể, không phải màn trắng hoặc treo im lặng | IA04 chuẩn |
| Trong lúc chờ danh sách sản phẩm tải về, có trạng thái loading rõ ràng (spinner/skeleton) thay vì nội dung xuất hiện đột ngột gây giật hình | FR-05 |
| Nếu bấm "Thêm vào giỏ" nhiều lần liên tiếp cho cùng 1 sản phẩm từ trang chủ, số lượng badge/toast phản ánh đúng tổng đã cộng dồn, không tạo dòng riêng biệt sai lệch | IA04 chuẩn |
| Khi mạng chậm lúc bấm "Thêm vào giỏ" từ trang chủ, không bị treo vô thời hạn — có timeout hoặc thông báo rõ ràng nếu request quá lâu | IA04 chuẩn |
| Nút "Thêm vào giỏ" trên từng thẻ sản phẩm hoạt động ngay từ lần bấm đầu tiên, không yêu cầu bấm 2 lần mới có tác dụng | IA04 chuẩn |
```

---

## [11] Claude (Sonnet 5, Claude Code) — 7:36 PM 26/07/2026

**Prompt:**
```
Review các item AI vừa tạo cho Home Page (IA01-IA04), tìm gap AI bỏ sót
(accessibility, dark mode, định dạng ₫/VN, offline/slow-network, so sánh
với Product Detail xem thiếu gì...), ghi lý do vào ai-gap-analysis, log vào
prompt-log và ai-audit-log.
```

**Output:**
```
Rà soát 37 item AI-generated (GUI-047–083, batch Entry #7-#10) đối chiếu với
ia-seed-categories.md và so sánh chéo với batch Product Detail đã làm trước
đó (GUI-001-046) để tìm gap tái diễn hoặc gap riêng của Home Page:

- dark mode: KHÔNG có item nào cho Home Page dù đây là gap đã biết ở Product
  Detail (GUI-042) — lặp lại đúng lỗi phạm vi prompt cũ. Thêm GUI-084.
- Vietnamese-specific (dấu tiếng Việt): batch IA02 có kiểm tra XSS/ký tự đặc
  biệt trong ô tìm kiếm nhưng không kiểm tra riêng từ khóa có dấu tiếng Việt
  (khác GUI-045 vốn chỉ nói về hiển thị tĩnh, ở đây là input động qua search).
  Thêm GUI-085.
- So sánh với Product Detail: Product Detail có ô Số lượng (FR-06) nhưng
  Home Page thêm giỏ thẳng từ thẻ sản phẩm mà không có bất kỳ cách nào để
  chọn/xác nhận số lượng trước — đây là một khoảng trống thiết kế mà không
  prompt IA02/IA04 nào của Home Page tự hỏi ra, chỉ lộ ra khi đối chiếu 2 màn
  hình với nhau. Thêm GUI-086.
- accessibility (keyboard, alt, contrast), offline/slow-network: đã có đủ
  trong batch AI (GUI-056 contrast, GUI-073 keyboard, GUI-078 alt, GUI-082
  slow-network) — không cần thêm trùng lặp.

Đã ghi lý do 3 gap (GUI-084, GUI-085, GUI-086) vào
ai-gap-analysis/gui-checklist-gaps.md, thêm 3 dòng tương ứng (Source=Human)
vào checklist/gui-checklist.md, và cập nhật bảng Summary (Designed) trong
cùng file để phản ánh tổng 86 item thiết kế trên 2 màn (Product Detail +
Home Page); cột Executed/Passed/Failed giữ nguyên vì Home Page chưa thực thi.
```

---

## [12] Claude (Sonnet 5, Claude Code + Claude for Chrome) — 8:16 PM 26/07/2026

**Prompt:**
```
SUT chạy tại http://localhost:5173/, commit 85af3ba (repo eshop-sut). Claude
for Chrome đã kết nối — tự mở Home Page, thực thi toàn bộ 40 item
(GUI-047–086) trong checklist/gui-checklist.md cho màn này, đánh dấu
Passed/Failed dựa trên những gì bạn thấy thật trên trang, screenshot các item
Failed, và file bug qua skill bug-report nếu có.
Log lại vào prompt-log và ai-audit-log.
```

**Output:**
```
Thực thi 40/40 item của Home Page bằng thao tác thật trên trình duyệt: click,
gõ giá trị (bao gồm payload XSS/SQLi vào ô tìm kiếm), resize viewport
(1568px và ~625px mobile), điều hướng SPA (click "Giỏ hàng"/"Xem chi tiết")
và hard navigation (F5/URL), Back trình duyệt, patch tạm thời
`XMLHttpRequest` qua console để mô phỏng lỗi mạng thật, đo contrast bằng công
thức WCAG luminance, và đối chiếu qua Network tab/DevTools để xác nhận
nguyên nhân gốc thay vì chỉ suy đoán từ một lần quan sát.

Kết quả: 20 Passed / 20 Failed / 0 N/A.

Phát hiện quan trọng nhất — vượt ngoài phạm vi các item đã thiết kế: trong
lúc kiểm thử GUI-060/064 (an toàn hiển thị từ khóa tìm kiếm), payload
`<img src=x onerror="...">` làm vỡ cú pháp truy vấn ở backend, lộ ra
`Database Error: SQLITE_ERROR` thô (xác nhận qua tab Network: HTTP 500).
Xác nhận khai thác thật bằng payload boolean-based `zzz' OR '1'='1' -- ` —
trả về toàn bộ 5 sản phẩm dù từ khóa không khớp gì; thêm một biến thể không
cân bằng dấu nháy trả về 0 sản phẩm với HTTP 200 (không lỗi cú pháp) đúng
như dự đoán cho cách ghép chuỗi này — hai phép thử độc lập cùng chỉ ra chuỗi
tìm kiếm được nối trực tiếp vào câu SQL phía server, không qua tham số hóa,
vi phạm SEC-05. Đây là phát hiện nghiêm trọng nhất trong toàn bộ đợt kiểm
thử GUI checklist.

Các phát hiện khác: 2 thẻ `<h1>` trên trang chủ (GUI-047); giá hiển thị "VND"
thay vì ₫/đ, không nhất quán với Product Detail/Giỏ hàng (GUI-049); giá
sản phẩm không đạt contrast AA — 3.76:1 (GUI-056); không có bất kỳ trạng
thái loading nào (GUI-058/063/080/082); ô tìm kiếm thiếu label thực sự
(GUI-059); reflected XSS qua `dangerouslySetInnerHTML` (GUI-060/064); không
có active-state trên Navbar (GUI-067); Back làm mất từ khóa tìm kiếm đã lọc
(GUI-071); tap target mobile chỉ 36px (GUI-074); ảnh có `alt=""` rỗng
(GUI-078); lỗi mạng thật bị nuốt âm thầm, giao diện hiện dữ liệu cũ như
thành công (GUI-079) — mô phỏng bằng cách patch XMLHttpRequest để buộc
request thất bại rồi quan sát UI không hề báo lỗi. Cùng root cause với
BUG-IA04-PRODUCTDETAIL-001 (không badge/toast, không cộng dồn số lượng) tái
hiện qua GUI-068/076/077/081 — tham chiếu lại bug cũ thay vì file trùng.

Đã file 12 bug report mới (BUG-IA01-HOMEPAGE-001..003, BUG-IA02-HOMEPAGE-
001..003, BUG-IA03-HOMEPAGE-001..003, BUG-IA04-HOMEPAGE-001..003) + cross-
link BUG-IA04-PRODUCTDETAIL-001 với phát hiện trên Home Page — chưa tạo
GitHub Issue (cần xác nhận từ sinh viên trước). Cập nhật đầy đủ bảng kết quả
và Summary trong checklist/gui-checklist.md và §2.2 README.md.
```

---

## [13] Claude (Sonnet 5, Claude Code) — 4:10 PM 30/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Search Results — trạng thái lưới sản phẩm trên trang chủ khi
tìm kiếm trả về ÍT NHẤT 1 sản phẩm khớp (khác với trạng thái không có kết
quả, sẽ có prompt riêng) của hệ thống EShop.

Ground truth — trích từ sut-requirements.md:
- FR-05 (Xem danh sách & Tìm kiếm sản phẩm): "Trang chủ hiển thị danh sách
  tất cả sản phẩm dạng lưới (grid)... Thanh tìm kiếm tìm theo tên sản phẩm."
- FR-21: "Tiêu đề trang: mỗi trang có đúng 1 thẻ <h1>."

Lưu ý: cơ chế gõ/nhập vào ô tìm kiếm, an toàn hiển thị từ khóa (XSS/SQLi), và
việc ô tìm kiếm giữ lại giá trị đã gõ đã được kiểm thử riêng ở batch Home
Page (GUI-059 đến GUI-066, GUI-085) — KHÔNG lặp lại các item đó. Chỉ tập
trung vào cách TRÌNH BÀY của trạng thái kết quả tìm kiếm khi đã có khớp —
những gì khác biệt so với lưới sản phẩm mặc định lúc chưa tìm kiếm.

Chỉ tập trung vào IA01 — General UI standards. Liệt kê 3 checklist item cho
trạng thái này, cân nhắc: định dạng/vị trí dòng thông báo "Kết quả tìm kiếm
cho: ...", độ chính xác của số lượng hiển thị so với số thẻ thực render, và
tính nhất quán bố cục lưới so với lưới mặc định khi số kết quả ít hơn 5.

Trả về dạng bảng Markdown với các cột: Item, Lý do liên kết tới FR nào (nếu
có). Viết bằng tiếng Việt tự nhiên, như một tester Việt Nam thực sự sẽ viết.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Dòng "Kết quả tìm kiếm cho: <từ khóa>" hiển thị ngay phía trên lưới sản phẩm, dùng cùng kiểu chữ/cỡ chữ với tiêu đề "Danh sách sản phẩm" mặc định, không lệch style | FR-21 |
| Số lượng sản phẩm nêu trong thông báo kết quả (vd "Hiển thị 3 sản phẩm") khớp chính xác với số thẻ sản phẩm thực sự render trong lưới ngay bên dưới, không lệch số | FR-05 |
| Bố cục lưới kết quả tìm kiếm (khoảng cách giữa các thẻ, số cột theo từng breakpoint) giữ nguyên đúng như lưới mặc định của trang chủ, không bị thu hẹp/co cụm lại khi số kết quả ít hơn 5 | FR-05 |
```

---

## [14] Claude (Sonnet 5, Claude Code) — 4:14 PM 30/07/2026

**Prompt:**
```
Tiếp tục màn Search Results, tập trung riêng vào IA02 — Forms.

Ground truth: FR-05 (tìm kiếm theo tên sản phẩm, trang chủ hiển thị lưới).

Cùng lưu ý như prompt IA01 trước: KHÔNG lặp lại cơ chế gõ/validate/giữ giá
trị ô tìm kiếm đã kiểm thử ở Home Page (GUI-059–066, GUI-085). Batch này chỉ
nói về những tương tác CHỈ tồn tại ở trạng thái đang xem kết quả (không tồn
tại ở trạng thái mặc định): cách thoát khỏi bộ lọc kết quả để quay về xem
toàn bộ, và việc URL có phản ánh đúng trạng thái tìm kiếm hay không (để có
thể chia sẻ/bookmark/reload).

Liệt kê 2 checklist item. Trả về bảng Markdown: Item, FR liên quan. Tiếng
Việt tự nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Có đường dẫn/nút rõ ràng để xóa bộ lọc tìm kiếm và quay về xem toàn bộ danh sách sản phẩm, không chỉ dựa vào việc người dùng tự xóa tay nội dung ô tìm kiếm rồi bấm "Tìm" lại | FR-05 |
| URL của trang phản ánh đúng từ khóa đang tìm kiếm (vd dạng query string), để có thể copy/chia sẻ hoặc bookmark đúng trạng thái kết quả đang xem, và F5 reload tại URL đó vẫn ra đúng kết quả đã lọc | FR-05 |
```

---

## [15] Claude (Sonnet 5, Claude Code) — 4:18 PM 30/07/2026

**Prompt:**
```
Tiếp tục màn Search Results, tập trung riêng vào IA03 — Navigation.

Liệt kê 3 checklist item về: nơi focus/screen reader chuyển tới sau khi có
kết quả tìm kiếm mới, hành vi điều hướng khi kết quả có phân trang (nếu có),
và việc deep-link/reload URL mang query tìm kiếm ra đúng trạng thái đã lọc.

Trả về bảng Markdown: Item, FR liên quan (hoặc "IA03 chuẩn" nếu không map
trực tiếp vào FR nào). Tiếng Việt tự nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Sau khi tìm kiếm ra kết quả, focus hoặc thứ tự đọc của screen reader chuyển tới vùng thông báo kết quả mới, không giữ nguyên ở ô tìm kiếm khiến người dùng không biết nội dung trang đã thay đổi | IA03 chuẩn |
| Nếu kết quả tìm kiếm có phân trang hoặc infinite scroll, việc chuyển trang kết quả vẫn giữ nguyên từ khóa đang tìm kiếm, không bị mất/reset về danh sách đầy đủ | FR-05 |
| Truy cập trực tiếp hoặc F5 reload tại URL đang mang query tìm kiếm hiển thị đúng ngay kết quả đã lọc đó, không tự động trả về toàn bộ danh sách sản phẩm | FR-05 |
```

Được sửa lại ở `reports/ai-audit-report.md` Entry #15 (item phân trang cần
điều kiện hóa theo quy ước N/A của GUI-019/030) trước khi đưa vào
`checklist/gui-checklist.md` thành GUI-093.

---

## [16] Claude (Sonnet 5, Claude Code) — 4:22 PM 30/07/2026

**Prompt:**
```
Tiếp tục màn Search Results, tập trung riêng vào IA04 — Feedback/State.

Ground truth liên quan: BUG-IA04-HOMEPAGE-003 đã ghi nhận trước đó (lỗi mạng
thật bị nuốt âm thầm ở Home Page, giao diện hiện dữ liệu cũ như thành công).

Liệt kê 3 checklist item: công bố số lượng kết quả cho screen reader
(aria-live), không có khung hình lẫn lộn giữa kết quả cũ/mới khi tìm kiếm lại
trong lúc đang xem trang kết quả, và việc lỗi server thật xảy ra trong lúc
đang xem trang kết quả (không phải lúc tải lần đầu) phải hiển thị lỗi rõ ràng
thay vì lặp lại kiểu lỗi đã có ở BUG-IA04-HOMEPAGE-003.

Trả về bảng Markdown: Item, FR liên quan. Tiếng Việt tự nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Thông báo số lượng kết quả tìm kiếm được công bố cho screen reader ngay khi cập nhật (vùng có `aria-live` hoặc tương đương), không chỉ thay đổi im lặng trên DOM | IA04 chuẩn |
| Khi kết quả tìm kiếm mới thay thế kết quả cũ đang hiển thị, không có khung thời gian nào hiển thị lẫn lộn giữa 2 bộ kết quả (không nhấp nháy, không chồng dữ liệu cũ/mới) | IA04 chuẩn |
| Nếu server trả lỗi thật trong lúc đang xem trang kết quả tìm kiếm (không phải lỗi lúc tải trang lần đầu), trang hiển thị thông báo lỗi rõ ràng thay vì âm thầm giữ nguyên kết quả cũ như đã xảy ra ở BUG-IA04-HOMEPAGE-003 | FR-05 |
```

---

## [17] Claude (Sonnet 5, Claude Code) — 4:27 PM 30/07/2026

**Prompt:**
```
Review 11 item AI vừa tạo cho Search Results (GUI-087–097, Entry #13–#16),
đối chiếu ia-seed-categories.md (đặc biệt mục "Commonly AI-missed": dark
mode, Vietnamese-specific) tìm gap AI bỏ sót. Ghi lý do vào ai-gap-analysis,
log vào prompt-log và ai-audit-log.
```

**Output:**
```
Rà soát 11 item AI-generated (GUI-087–097) đối chiếu ia-seed-categories.md:

- dark mode: KHÔNG có item nào cho Search Results, dù đây là gap đã xảy ra 2
  lần trước (GUI-042 Product Detail, GUI-084 Home Page) — gap thật, lặp lại
  có hệ thống vì tôi tiếp tục quên đưa dark mode vào prompt IA01. Thêm
  GUI-099: "Ở chế độ dark mode (nếu trình duyệt/hệ điều hành bật), dòng 'Kết
  quả tìm kiếm cho' và số lượng kết quả vẫn giữ độ tương phản đọc được, không
  bị chữ tối trên nền tối."
- Vietnamese-specific (dấu tiếng Việt): đã có GUI-085 (Home Page, tìm kiếm có
  dấu ra đúng kết quả) — không cần lặp lại y hệt cho Search Results vì cùng
  cơ chế tìm kiếm, cùng input. Đủ.
- input normalization (khoảng trắng thừa): KHÔNG có item nào ở bất kỳ batch
  nào (Home Page hay Search Results) kiểm tra input có khoảng trắng thừa ở
  đầu/cuối — gap thật, edge case input chưa từng được hỏi. Thêm GUI-098: "Tìm
  kiếm với khoảng trắng thừa ở đầu/cuối từ khóa (vd ' iphone ') vẫn trả về
  đúng kết quả như khi gõ 'iphone' không có khoảng trắng thừa, không bị hệ
  thống coi là một từ khóa khác rồi trả về sai/rỗng."
- accessibility khác (contrast, alt, keyboard): đã có GUI-092 (focus
  screen reader), không cần thêm.

Đã ghi lý do gap GUI-098, GUI-099 vào
ai-gap-analysis/gui-checklist-gaps.md, thêm 2 dòng (Source=Human) vào
checklist/gui-checklist.md.
```

---

## [18] Claude (Sonnet 5, Claude Code) — 4:33 PM 30/07/2026

**Prompt:**
```
Bạn là một tester đang thiết kế GUI checklist theo kỹ thuật checklist-based
testing cho màn Empty Search State — trạng thái lưới sản phẩm khi tìm kiếm
KHÔNG khớp sản phẩm nào (0 kết quả) của hệ thống EShop.

Ground truth — trích từ sut-requirements.md:
- FR-05: "Khi không có kết quả tìm kiếm phải hiển thị thông báo empty state
  phù hợp."
- FR-24 (Feedback & State Requirements): "Trang trống (Empty State) phải có
  icon/hình minh họa và message thân thiện."

Chỉ tập trung vào IA01 — General UI standards. Liệt kê 2 checklist item về
sự hiện diện của icon/hình minh họa + thông điệp thân thiện, và về khả năng
responsive của trạng thái trống trên mobile.

Trả về bảng Markdown: Item, FR liên quan. Tiếng Việt tự nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Trạng thái không tìm thấy sản phẩm nào hiển thị icon/hình minh họa kèm thông điệp thân thiện (vd "Không tìm thấy sản phẩm phù hợp"), không chỉ là một lưới trống trơn im lặng | FR-05, FR-24 |
| Trạng thái trống responsive tốt trên mobile — icon/hình minh họa và thông điệp không bị tràn, vỡ layout, hoặc bị cắt ở màn hình hẹp | IA01 chuẩn |
```

---

## [19] Claude (Sonnet 5, Claude Code) — 4:37 PM 30/07/2026

**Prompt:**
```
Tiếp tục màn Empty Search State, tập trung riêng vào IA02 — Forms.

Liệt kê 2 checklist item: ô tìm kiếm có giữ lại từ khóa vừa gõ khi kết quả
trống hay không, và thông điệp trạng thái trống có hướng dẫn hành động tiếp
theo hay chỉ nói "không có sản phẩm" chung chung.

Trả về bảng Markdown: Item, FR liên quan (hoặc "IA02 chuẩn"). Tiếng Việt tự
nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Ô tìm kiếm vẫn hiển thị đúng từ khóa vừa gõ khi kết quả trống, để người dùng biết chính xác họ đã tìm gì và có thể sửa lại ngay mà không cần gõ lại từ đầu | IA02 chuẩn |
| Thông điệp trạng thái trống có hướng dẫn người dùng nên làm gì tiếp theo, không chỉ nói chung chung rằng không có sản phẩm nào | IA02 chuẩn |
```

Được sửa lại ở `reports/ai-audit-report.md` Entry #19 (item 2 quá mơ hồ để
kiểm thử được, cần cụ thể hóa tiêu chí) trước khi đưa vào
`checklist/gui-checklist.md` thành GUI-103.

---

## [20] Claude (Sonnet 5, Claude Code) — 4:41 PM 30/07/2026

**Prompt:**
```
Tiếp tục màn Empty Search State, tập trung riêng vào IA03 — Navigation.

Liệt kê 2 checklist item: có đường quay lại xem toàn bộ sản phẩm rõ ràng
(không phải dead-end chỉ thoát được bằng nút Back trình duyệt), và
nút/link đó tiếp cận được bằng bàn phím.

Trả về bảng Markdown: Item, FR liên quan (hoặc "IA03 chuẩn"). Tiếng Việt tự
nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Trạng thái trống có nút/link rõ ràng để quay về xem toàn bộ danh sách sản phẩm, không phải là điểm chết (dead-end) chỉ có thể thoát bằng nút Back của trình duyệt | IA03 chuẩn |
| Nút/link "xem tất cả sản phẩm" ở trạng thái trống tiếp cận được bằng bàn phím (Tab + Enter), có focus ring hiển thị rõ | IA03 chuẩn |
```

---

## [21] Claude (Sonnet 5, Claude Code) — 4:45 PM 30/07/2026

**Prompt:**
```
Tiếp tục màn Empty Search State, tập trung riêng vào IA04 — Feedback/State.

Ground truth liên quan: BUG-IA04-HOMEPAGE-003 (lỗi mạng thật bị nuốt âm
thầm, giao diện hiện dữ liệu cũ như thành công) và BUG-IA02-HOMEPAGE-003
(SQL Injection trong API tìm kiếm, một payload gây lỗi cú pháp thật ở
backend).

Liệt kê 3 checklist item: hệ thống có thực sự hiển thị trạng thái trống khi 0
kết quả (không lặp lại kiểu lỗi ở BUG-IA04-HOMEPAGE-003), trạng thái trống
được công bố cho screen reader, và ranh giới giữa "0 kết quả hợp lệ thật" với
"lỗi backend thật" (liên hệ BUG-IA02-HOMEPAGE-003) có bị giao diện gộp lẫn
thành cùng một thông điệp thân thiện hay không.

Trả về bảng Markdown: Item, FR liên quan. Tiếng Việt tự nhiên.
```

**Output:**
```
| Item | FR liên quan |
|---|---|
| Khi tìm kiếm với từ khóa không khớp sản phẩm nào, hệ thống thực sự hiển thị trạng thái "không tìm thấy" — không lặng lẽ hiển thị lại toàn bộ danh sách sản phẩm cũ như thể tìm kiếm thành công, cùng loại lỗi với BUG-IA04-HOMEPAGE-003 đã ghi nhận | FR-05 |
| Vùng thông báo "không tìm thấy sản phẩm nào" được công bố cho screen reader ngay khi xuất hiện (`aria-live` hoặc tương đương), không chỉ là text tĩnh không được công bố | IA04 chuẩn |
| Trạng thái trống phải phân biệt được với trạng thái lỗi mạng/lỗi server thật, không dùng chung một thông điệp hoặc màu sắc cảnh báo đỏ cho cả 2 trường hợp khác nhau | IA04 chuẩn |
```

Được sửa lại ở `reports/ai-audit-report.md` Entry #21 (item 3 viết lại tập
trung vào failure mode "lỗi backend thật bị hiển thị lẫn thành empty state
thân thiện", liên hệ trực tiếp BUG-IA02-HOMEPAGE-003) trước khi đưa vào
`checklist/gui-checklist.md` thành GUI-107.

---

## [22] Claude (Sonnet 5, Claude Code) — 4:50 PM 30/07/2026

**Prompt:**
```
Review 9 item AI vừa tạo cho Empty Search State (GUI-100–108, Entry
#18–#21), đối chiếu ia-seed-categories.md tìm gap AI bỏ sót, đặc biệt so với
2 pattern đã lặp lại nhiều lần ở các màn trước (dark mode, dấu tiếng Việt).
Ghi lý do vào ai-gap-analysis, log vào prompt-log và ai-audit-log.
```

**Output:**
```
Rà soát 9 item AI-generated (GUI-100–108) đối chiếu ia-seed-categories.md và
2 pattern gap đã lặp lại ở các màn trước:

- dark mode: KHÔNG có item nào cho Empty Search State — lần lặp lại thứ 4
  của cùng gap (GUI-042, GUI-084, GUI-099). Thêm GUI-110: "Ở chế độ dark mode
  (nếu trình duyệt/hệ điều hành bật), icon minh họa và thông điệp của trạng
  thái trống vẫn giữ độ tương phản đọc được, không bị chữ/icon tối trên nền
  tối."
- dấu tiếng Việt: KHÔNG có item nào kiểm tra từ khóa có dấu tiếng Việt trong
  ngữ cảnh RIÊNG của 0 kết quả (GUI-085 chỉ test trường hợp CÓ kết quả) — gap
  thật, lần lặp lại thứ 3 (GUI-045, GUI-085). Thêm GUI-109: "Từ khóa có dấu
  tiếng Việt nhưng thực sự không khớp sản phẩm nào (vd 'khôngtồntại') vẫn
  hiển thị đúng trạng thái trống, không vỡ do lỗi encoding hoặc bị hiểu nhầm
  thành tìm kiếm thành công."
- accessibility khác (keyboard, contrast chữ thường): đã có GUI-105
  (keyboard) — đủ, không cần thêm.
- offline/slow-network: đã có GUI-097 ở batch Search Results (lỗi server
  thật trong lúc xem kết quả) — cùng root cause áp dụng cho Empty State
  không cần lặp lại một item gần như giống hệt.

Đã ghi lý do gap GUI-109, GUI-110 vào ai-gap-analysis/gui-checklist-gaps.md,
thêm 2 dòng (Source=Human) vào checklist/gui-checklist.md.
```

---

## [23] Claude (Sonnet 5, Claude Code + Claude for Chrome) — 12:20 AM 31/07/2026

**Prompt:**
```
ok now execute the new entries in the gui checklist
```
(tiếp theo, sau khi xác nhận SUT đã chạy ở localhost:5173)
```
ok just ran the web on 5173, now you can execute the tests via claude for
chrome, ensure the screenshot quality
```

**Output:**
```
Thực thi toàn bộ 24 item còn lại (GUI-087–110, màn Search Results và Empty
Search State) bằng thao tác thật trên trình duyệt qua Claude for Chrome:
gõ từ khóa, submit tìm kiếm (click "Tìm"/Enter), deep-link trực tiếp bằng
URL query, patch tạm thời XMLHttpRequest qua console để mô phỏng lỗi mạng
thật, gọi trực tiếp API `/api/products` để đối chiếu ground truth độc lập
với UI, đo `document.activeElement`/`[aria-live]`/`document.styleSheets` cho
các item accessibility/dark-mode, và chụp ảnh evidence bằng `zoom` (lossless
PNG, không dùng `screenshot` JPEG) cho mọi item Failed.

Kết quả: 8 Passed / 15 Failed / 1 N/A (GUI-093 — không có tính năng phân
trang trong SUT chỉ 5 sản phẩm).

Phát hiện quan trọng nhất — vượt ngoài phạm vi các item đã thiết kế: khi gõ
từ khóa vào ô tìm kiếm mà KHÔNG bấm "Tìm", dòng "Kết quả tìm kiếm cho" cập
nhật ngay theo từng ký tự, nhưng lưới sản phẩm bên dưới cập nhật KHÔNG nhất
quán giữa các lần thao tác giống hệt nhau — đôi khi tự cập nhật live theo ký
tự gõ, đôi khi chỉ cập nhật khi submit — khiến dòng chú thích và lưới sản
phẩm hiển thị lẫn lộn dữ liệu cũ/mới không giới hạn thời gian (GUI-096). Xác
nhận qua nhiều lần lặp lại độc lập (từ khóa "pro", "macbook", "zzz",
"macbookpro") và đối chiếu trực tiếp với API để phân biệt rạch ròi với phát
hiện riêng biệt: Empty Search State (khi search thực sự được submit và ra 0
kết quả hợp lệ) lại hiển thị ĐÚNG — hoàn toàn trống trơn, không icon/message
nào (GUI-100), vi phạm trực tiếp FR-05/FR-24, nhưng không fallback sai về
danh sách cũ (GUI-106 Passed, khác với lo ngại ban đầu). Test thêm với
payload gây lỗi backend thật (`test'quote`, xác nhận HTTP 500 SQLITE_ERROR
qua fetch trực tiếp) cho thấy lỗi thật KHÔNG bị hiển thị lẫn thành trạng thái
trống — trang lộ nguyên văn khối lỗi kỹ thuật, khác hẳn khoảng trắng của
trạng thái trống thật (GUI-107 Passed với caveat, liên hệ BUG-IA02-HOMEPAGE-002/003
đã ghi nhận).

Các phát hiện khác: không có nút xóa bộ lọc tìm kiếm (GUI-090); URL không
bao giờ phản ánh từ khóa tìm kiếm dù outbound hay inbound, cùng root cause
với BUG-IA03-HOMEPAGE-002 đã có (GUI-091, 094); không có aria-live/focus
management cho nội dung động ở cả 2 màn (GUI-092, 095, 108); lỗi mạng thật
khi đang xem kết quả bị nuốt âm thầm, cùng root cause BUG-IA04-HOMEPAGE-003
(GUI-097); khoảng trắng thừa ở đầu/cuối từ khóa không được trim ở backend,
xác nhận qua gọi API trực tiếp (GUI-098).

Đã file 4 bug report mới (BUG-IA02-SEARCHRESULTS-001..002,
BUG-IA04-SEARCHRESULTS-001..002, BUG-IA04-EMPTYSEARCH-001) + cross-link
BUG-IA03-HOMEPAGE-002 và BUG-IA04-HOMEPAGE-003 với phát hiện tương tự trên
Search Results — chưa tạo GitHub Issue (cần xác nhận từ sinh viên trước).
Cập nhật đầy đủ bảng kết quả và Summary trong checklist/gui-checklist.md và
§2.2 README.md — toàn bộ 110/110 item đã thiết kế đều đã thực thi.
```

---
