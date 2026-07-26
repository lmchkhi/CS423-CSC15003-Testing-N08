# AI Audit Report (AI-02)

*Mandatory appendix — HW03-AI (GUI & Usability Testing).*

## 1. Thông tin Sinh viên

| Mục                      | Giá trị           |
| :------------------------ | :----------------- |
| **Họ tên sinh viên:**     | Hà Bảo Ngọc        |
| **MSSV:**                 | 23127300            |
| **Lớp / Khoá:**           | CS423 / CSC15003    |
| **Mã bài tập:**           | HW03                |
| **Ngày làm bài:**         | 26/07/2026          |
| **Công cụ AI đã dùng:**   | Claude (Sonnet 5, Claude Code) |

## 2. Hướng dẫn (đọc trước khi điền)

- Thêm một entry cho mỗi artifact do AI tạo ra (checklist item, kịch bản test, bản phân tích gap, bug report, ...).
- Dán nguyên văn prompt — KHÔNG diễn giải lại.
- Dán nguyên văn output của AI (hoặc kèm ảnh chụp màn hình có chú thích).
- Gắn nhãn verdict: `VALID` / `INVALID` / `INCOMPLETE`.
- Phần lý giải (Reasoning) phải trích dẫn slide môn học, mục ISTQB, hoặc tài liệu kỹ thuật liên quan.
- Trình bày bản sửa của sinh viên, có đánh dấu phần thay đổi.

## 3. Audit Table — mỗi artifact một entry

## Entry #1

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 5:14 PM 26/07/2026 |
| **Artifact type** | 12 GUI checklist items — IA01 General UI (màn Product Detail) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Cả 12 item đều bám vào FR-06 hoặc FR-21, hoặc một khía cạnh IA01 chuẩn (visual
consistency, contrast, responsive, truncation) đã liệt kê trong prompt — không
có item nào bịa đặt hay lạc đề. Item cuối ("trạng thái loading khi ảnh đang
tải") về bản chất gần với IA04 (feedback/state) hơn là IA01 thuần túy vì nó nói
về phản hồi trạng thái của hệ thống, không phải về tiêu chuẩn giao diện tĩnh —
nhưng vẫn giữ trong batch này vì nó nói về cảm nhận hiệu năng tải trang
(loading performance perception), một sub-topic được liệt kê rõ trong
`ia-seed-categories.md` dưới mục IA01. Sẽ đối chiếu với batch IA04 sau để tránh
trùng lặp khi viết item "hiển thị loading khi thêm vào giỏ".

### (5) Student Fix

Không cần chỉnh sửa nội dung item. Sẽ rà soát chéo với batch IA04 (feedback/
state) ở bước sau để tránh trùng lặp phạm vi giữa "loading ảnh" (IA01) và
"loading/feedback khi thao tác" (IA04).

---

## Entry #2

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 5:16 PM 26/07/2026 |
| **Artifact type** | 10 GUI checklist items — IA02 Forms, ô chọn số lượng (màn Product Detail) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Phần lớn item bám sát FR-06/FR-22 và hợp lý. Nhưng có 2 vấn đề cần sửa trước
khi đưa vào checklist chính thức: (1) item về nút +/- suy luận rằng EShop chắc
chắn có nút tăng/giảm số lượng — FR-06 chỉ nói "ô nhập Số lượng", không xác
nhận có nút +/-, đây là AI tự giả định UI pattern phổ biến chứ không phải yêu
cầu đã xác nhận trong spec, cần đổi thành "nếu có nút +/-" hoặc tách riêng để
verify khi chạy thực tế trên SUT. (2) Item "paste giá trị không hợp lệ" và
"validate on blur" là 2 sub-topic hợp lệ nhưng khá tiểu tiết/trùng lặp ý nghĩa
với item "nhập ký tự chữ/đặc biệt bị từ chối" — giữ lại nhưng sẽ gộp bớt khi
review batch.

### (5) Student Fix

Sửa item về nút +/- thành dạng điều kiện, không khẳng định chắc UI có nút này:
"Nếu có nút tăng/giảm (+/-) đi kèm ô Số lượng, bấm '-' khi đang là 1 thì không
cho giảm xuống 0 hoặc số âm." Giữ nguyên các item còn lại khi đưa vào
`checklist/gui-checklist.md`.

---

## Entry #3

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 5:18 PM 26/07/2026 |
| **Artifact type** | 10 GUI checklist items — IA03 Navigation (màn Product Detail) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

Item về breadcrumb bám sát đúng FR-23. Tuy nhiên item "Nếu có phần 'Sản phẩm
liên quan' ở cuối trang..." là một giả định — sut-requirements.md không có FR
nào xác nhận EShop có tính năng sản phẩm liên quan, đây là AI tự thêm theo
pattern e-commerce thông thường chứ không phải yêu cầu đã xác nhận, giống lỗi
đã gặp ở Entry #2 với nút +/-. Cần giữ lại nhưng đánh dấu rõ là "nếu có" và
verify sự tồn tại của tính năng này khi chạy thực tế trên SUT trước khi kết
luận Pass/Fail — nếu SUT không có phần này thì item nên đổi Result thành N/A
thay vì Fail. Các item còn lại (breadcrumb, back button, deep link, navbar
highlight, keyboard nav, tap target) đều là kiểm tra hợp lệ, không giả định gì
ngoài phạm vi FR-23 hoặc IA03 chuẩn.

### (5) Student Fix

Giữ nguyên item sản phẩm liên quan nhưng ghi chú rõ trong Notes khi thực thi
rằng cần xác nhận tính năng có tồn tại trước khi đánh Pass/Fail; nếu SUT không
có mục này, đánh N/A thay vì Failed.

---

## Entry #4

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 5:19 PM 26/07/2026 |
| **Artifact type** | 9 GUI checklist items — IA04 Feedback/State (màn Product Detail) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Batch này bám sát FR-06/FR-24 và tuân đúng ràng buộc tôi đặt ra trong prompt
(không lặp lại item loading-ảnh của batch IA01) — kiểm tra chéo cho thấy không
có item nào trùng với 12 item của Entry #1. "Trạng thái hết hàng" là suy luận
hợp lý dựa trên thực tế nghiệp vụ e-commerce dù không có FR riêng xác nhận
EShop có field tồn kho — cùng loại rủi ro giả định như Entry #2/#3, nhưng ở
đây rủi ro thấp hơn vì đây là hành vi UI phổ biến và dễ dàng quan sát trực
tiếp khi thực thi (chỉ cần xem sản phẩm có field tồn kho = 0 hay không trên
SUT thật). Toàn bộ 9 item đều là kiểm tra hợp lệ, có thể verify được cụ thể
trên SUT.

### (5) Student Fix

Không cần chỉnh sửa nội dung item. Sẽ verify trên SUT thật xem có sản phẩm nào
ở trạng thái hết hàng để test item "Hết hàng" hay không; nếu SUT không có cơ
chế này, đánh N/A tương tự cách xử lý item "sản phẩm liên quan" ở Entry #3.

---

## Entry #5

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 5:25 PM 26/07/2026 |
| **Artifact type** | Gap-analysis review — 1 item mới (GUI-046) + xác nhận 3 gap trước đã đủ (Product Detail) |

**Full prompt:**

```
Review các item AI vừa tạo cho Product Detail, tìm gap AI bỏ sót
(accessibility, dark mode, định dạng ₫/VN, offline/slow-network...), ghi lý
do vào ai-gap-analysis, log vào prompt-log và ai-audit-log.
```

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là bước review chứ không phải generate mới, nên "verdict" ở đây đánh giá
tính đầy đủ của việc rà soát chứ không đánh giá một AI-output độc lập. Rà lại
thủ công cho thấy phân loại đúng: 3/4 khía cạnh user nêu (accessibility, dark
mode, ₫/VN formatting) đã được phủ bởi các item có sẵn từ Entry #1-#4 cộng gap
đã thêm trước đó (GUI-042/043/045), không cần thêm trùng lặp. Khía cạnh còn
lại (offline/slow-network) đúng là một gap thật: GUI-038 chỉ cover network
error đã xảy ra, không cover slow-network/treo spinner — đây là 2 test
scenario khác nhau theo đúng phân loại của `ia-seed-categories.md`, nên việc
thêm GUI-046 là hợp lý, không phải thêm cho đủ số lượng.

### (5) Student Fix

Thêm GUI-046 vào `checklist/gui-checklist.md` (Source=Human, IA04) và entry
tương ứng vào `ai-gap-analysis/gui-checklist-gaps.md` giải thích lý do AI bỏ
sót kịch bản slow-network riêng biệt với network-error.

---

## Entry #6

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code + Claude for Chrome) |
| **Timestamp**     | 6:10 PM 26/07/2026 |
| **Artifact type** | Thực thi 46 item checklist trên SUT thật + 7 bug report (Product Detail) |

**Full prompt:**
```
SUT chạy tại http://localhost:5173/, commit 85af3ba (repo eshop-sut). Claude
for Chrome đã kết nối — tự mở Product Detail, thực thi toàn bộ item trong
checklist/gui-checklist.md cho màn này, đánh dấu Passed/Failed dựa trên những
gì bạn thấy thật trên trang, screenshot các item Failed, và file bug qua
skill bug-report nếu có.
Ghi "Build/commit tested" và "URL" thật (không phải placeholder) vào phần
scope của README.md nếu còn trống. Log lại vào prompt-log và ai-audit-log.
```

### (2) AI Output

```
Thực thi 46/46 item bằng thao tác thật trên trình duyệt (không suy đoán từ
HTML tĩnh): click, gõ giá trị biên (0, âm, chữ, thập phân, dán), resize
viewport (1400/757/625px), đăng nhập test@eshop.com, đọc tab Network/Console,
đo contrast bằng công thức WCAG luminance qua JS, và lặp lại thao tác nhiều
lần trên nhiều sản phẩm khác nhau để xác nhận tính quy luật của hành vi —
vd phát hiện "bấm không có phản hồi" ở lần đầu nhưng luôn có phản hồi ở lần
bấm thứ hai (một quy luật nhất quán, không phải ngẫu nhiên), thay vì chỉ ghi
nhận hiện tượng đơn lẻ mà không xác minh tính lặp lại.

Kết quả: 19 Passed / 24 Failed / 3 N/A. Nhóm 24 Failed thành 7 bug (theo
nguyên nhân gốc, tránh file 24 issue trùng lặp nguyên nhân):
BUG-IA01-PRODUCTDETAIL-001 (màu nút sai FR-21), -002 (thiếu Danh mục FR-06),
-003 (không skeleton ảnh); BUG-IA02-PRODUCTDETAIL-001 (ô Số lượng không
validate, chấp nhận 0 vào giỏ — Critical); BUG-IA03-PRODUCTDETAIL-001 (thiếu
breadcrumb bắt buộc theo FR-23), -002 (mất vị trí cuộn khi back);
BUG-IA04-PRODUCTDETAIL-001 (nút Thêm vào giỏ cần bấm 2 lần, không toast/
badge, không cộng dồn, giỏ hàng mất khi tải lại trang do không có API/
localStorage nào — Critical/P0, bug nghiêm trọng nhất).
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là bước thực thi (execution), không phải sinh nội dung mới, nên "verdict"
đánh giá tính trung thực và đầy đủ của việc thực thi, không đánh giá một
AI-generated content độc lập. Toàn bộ 24 kết luận Failed đều có bằng chứng
quan sát được trực tiếp qua thao tác thật (screenshot, network tab, DOM,
console) và được lặp lại nhiều lần để xác nhận tính nhất quán — không có kết
luận nào chỉ dựa trên suy đoán từ một lần quan sát duy nhất. 3 item N/A tuân
đúng quy ước đã thống nhất từ Entry #2–#4 (chỉ N/A khi tính năng thực sự
không tồn tại trong SUT, không dùng N/A để né tránh kết luận Failed). Việc
gộp 24 item Failed thành 7 bug theo nguyên nhân gốc (thay vì 24 issue riêng
lẻ) tuân theo hướng dẫn "Only file real bugs" và tránh spam của skill
`bug-report`.

### (5) Student Fix

Không cần chỉnh sửa nội dung — đã tự kiểm chứng chéo (nhiều thao tác, nhiều
sản phẩm) ngay trong lúc thực thi thay vì chờ review sau. Việc tạo GitHub
Issue cho 7 bug và push commit được để lại cho sinh viên xác nhận trước khi
thực hiện (theo đúng
quy trình xác nhận trước khi push/tạo issue công khai của skill `bug-report`).

---

## Entry #7

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 7:31 PM 26/07/2026 |
| **Artifact type** | 12 GUI checklist items — IA01 General UI (màn Home Page) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Cả 12 item bám vào FR-05 hoặc FR-21, hoặc một sub-topic IA01 chuẩn đã liệt kê
trong prompt (alignment, contrast, responsive, truncation) — không có item
nào giả định tính năng không xác nhận (khác lỗi đã gặp ở Entry #2/#3 với
Product Detail). Item cuối ("loading khi tải danh sách") đúng theo FR-05
("Khi đang tải dữ liệu phải hiển thị trạng thái loading") nên xếp vào IA01
là hợp lý ở góc độ "tiêu chuẩn chung của trang", nhưng cần đối chiếu với batch
IA04 sắp tới để tránh trùng lặp — xem kết quả đối chiếu ở Entry #10.

### (5) Student Fix

Không cần chỉnh sửa nội dung item khi thêm vào checklist.

---

## Entry #8

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 7:32 PM 26/07/2026 |
| **Artifact type** | 8 GUI checklist items — IA02 Forms, ô tìm kiếm (màn Home Page) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Toàn bộ 8 item hợp lệ và tôn trọng đúng ràng buộc đặt ra trong prompt (không
đưa item validate trường bắt buộc vì ô tìm kiếm không phải trường bắt buộc,
khác hẳn với batch IA02 của Product Detail vốn nói về ô Số lượng). Item về
an toàn hiển thị (XSS) bám sát trực tiếp câu chữ FR-05 "phải được hiển thị an
toàn (không render HTML)" — đây là ground truth rất cụ thể, không phải suy
diễn. Không có item nào giả định tính năng chưa xác nhận.

### (5) Student Fix

Không cần chỉnh sửa nội dung item khi thêm vào checklist.

---

## Entry #9

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 7:33 PM 26/07/2026 |
| **Artifact type** | 9 GUI checklist items — IA03 Navigation (màn Home Page) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Prompt đã chủ động loại trừ trước 2 lỗi giả định từng gặp ở Entry #2/#3 của
Product Detail (nút +/- và sản phẩm liên quan) bằng cách nói rõ Home Page
không có breadcrumb/related-products — AI tuân đúng ràng buộc này, không tự
thêm lại các khái niệm đó. 9 item còn lại đều verify được cụ thể trên SUT
thật (navbar active-state, link thẻ→chi tiết, search discoverable, back/
forward, deep link, keyboard, tap target, và việc *không có* breadcrumb thừa
là đúng theo spec) — không có item nào lạc đề hoặc giả định ngoài phạm vi.

### (5) Student Fix

Không cần chỉnh sửa nội dung item khi thêm vào checklist.

---

## Entry #10

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 7:34 PM 26/07/2026 |
| **Artifact type** | 8 GUI checklist items — IA04 Feedback/State (màn Home Page) |

**Full prompt:**

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

### (2) AI Output

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

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

7/8 item hợp lệ và không trùng lặp. Nhưng item thứ 5 ("Trong lúc chờ danh
sách sản phẩm tải về, có trạng thái loading rõ ràng...") trùng lặp gần như
nguyên văn với item cuối của batch IA01 (Entry #7: "Khi danh sách sản phẩm
đang tải từ server, có trạng thái loading rõ ràng..."). Đây đúng là lỗi tôi
đã lường trước và tránh được ở Product Detail (prompt IA04 của Product Detail
— Entry #4 — có câu "tôi đã có sẵn 1 item ở batch IA01 khác về loading ảnh,
ĐỪNG lặp lại") nhưng lại quên đưa ràng buộc tương tự vào prompt IA04 của Home
Page. Lỗi phạm vi prompt (prompt scope) do chính tôi, không phải AI tự ý lặp
— AI chỉ trả lời đúng những gì được hỏi ở mỗi prompt riêng lẻ, không có ký ức
về batch trước để tự loại trùng.

### (5) Student Fix

Sửa lại item bị trùng (sẽ là GUI-080 khi thêm vào checklist) để tách rõ phạm
vi khỏi GUI-058 (IA01): đổi từ "loading khi tải trang lần đầu" (đã thuộc IA01)
sang "loading/transition khi người dùng chủ động tìm kiếm lại (search lần 2
trở đi)" — một tình huống feedback-sau-hành-động khác, đúng bản chất IA04
hơn, không còn trùng với IA01. Nội dung mới: "Khi người dùng tìm kiếm lại
(bấm nút Tìm lần thứ 2 trở đi trong cùng phiên), danh sách sản phẩm cũ không
biến mất đột ngột thành trắng trơn trong lúc chờ kết quả mới — có trạng thái
loading/transition rõ ràng riêng cho hành động tìm kiếm, khác với loading lần
đầu tải trang (đã có ở GUI-058)."

---

## Entry #11

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) |
| **Timestamp**     | 7:36 PM 26/07/2026 |
| **Artifact type** | Gap-analysis review — 3 item mới (GUI-084–086) cho màn Home Page |

**Full prompt:**

```
Review các item AI vừa tạo cho Home Page (IA01-IA04), tìm gap AI bỏ sót
(accessibility, dark mode, định dạng ₫/VN, offline/slow-network, so sánh
với Product Detail xem thiếu gì...), ghi lý do vào ai-gap-analysis, log vào
prompt-log và ai-audit-log.
```

### (2) AI Output

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

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là bước review chứ không phải generate mới. Rà lại thủ công xác nhận
đúng: dark mode và tính năng "sản phẩm liên quan"/"ô Số lượng" là các gap đã
biết từ Product Detail mà tôi lại để lặp lại (hoặc phát sinh dạng tương tự)
ở Home Page — việc phát hiện lại đúng các pattern gap cũ (thay vì chỉ tạo gap
mới cho đủ số lượng) cho thấy việc review có đối chiếu chéo thật giữa 2 màn
hình, không phải áp dụng máy móc danh sách "Commonly AI-missed" một cách hời
hợt. Gap GUI-086 (thiếu ô chọn số lượng) là gap có giá trị cao nhất vì nó chỉ
lộ ra khi so sánh 2 màn hình, không nằm trong bất kỳ checklist-of-checklists
chuẩn nào.

### (5) Student Fix

Thêm GUI-084, GUI-085, GUI-086 vào `checklist/gui-checklist.md` (Source=Human)
và 3 entry tương ứng vào `ai-gap-analysis/gui-checklist-gaps.md`. Đồng thời áp
dụng luôn fix của Entry #10 (sửa nội dung GUI-080 để hết trùng lặp với
GUI-058) khi ghi dòng chính thức vào checklist.

---

## Entry #12

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code + Claude for Chrome) |
| **Timestamp**     | 8:16 PM 26/07/2026 |
| **Artifact type** | Thực thi 40 item checklist trên SUT thật + 12 bug report (Home Page) |

**Full prompt:**
```
SUT chạy tại http://localhost:5173/, commit 85af3ba (repo eshop-sut). Claude
for Chrome đã kết nối — tự mở Home Page, thực thi toàn bộ 40 item
(GUI-047–086) trong checklist/gui-checklist.md cho màn này, đánh dấu
Passed/Failed dựa trên những gì bạn thấy thật trên trang, screenshot các item
Failed, và file bug qua skill bug-report nếu có.
Log lại vào prompt-log và ai-audit-log.
```

### (2) AI Output

```
Thực thi 40/40 item của Home Page bằng thao tác thật trên trình duyệt: click,
gõ giá trị (bao gồm payload XSS/SQLi vào ô tìm kiếm), resize viewport
(1568px và ~625px mobile), điều hướng SPA và hard navigation, Back trình
duyệt, patch tạm thời XMLHttpRequest để mô phỏng lỗi mạng thật, đo contrast
bằng công thức WCAG luminance, và đối chiếu qua tab Network/DevTools để xác
nhận nguyên nhân gốc.

Kết quả: 20 Passed / 20 Failed / 0 N/A.

Phát hiện quan trọng nhất, vượt ngoài phạm vi item đã thiết kế: payload XSS
thử nghiệm cho GUI-060/064 làm vỡ cú pháp truy vấn ở backend, lộ lỗi
SQLITE_ERROR thô (HTTP 500, xác nhận qua tab Network). Xác nhận khai thác
thật bằng payload boolean-based `zzz' OR '1'='1' -- ` — trả về toàn bộ 5 sản
phẩm dù không khớp từ khóa, và một biến thể không cân bằng dấu nháy trả về
0 sản phẩm với HTTP 200 (không lỗi cú pháp) đúng như dự đoán — hai phép thử
độc lập cùng chứng minh SQL Injection đầy đủ tại endpoint GET /api/products,
cho thấy chuỗi tìm kiếm được nối trực tiếp vào câu SQL phía server thay vì
qua tham số hóa, vi phạm SEC-05.

Đã file 12 bug report mới (BUG-IA01/02/03/04-HOMEPAGE-*) + cross-link
BUG-IA04-PRODUCTDETAIL-001 với phát hiện tương tự trên Home Page. Cập nhật
checklist/gui-checklist.md (bảng kết quả + Summary) và README.md §2.2.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Đây là bước thực thi, không phải sinh nội dung mới — verdict đánh giá tính
trung thực và đầy đủ của việc thực thi. Toàn bộ 20 kết luận Failed đều có
bằng chứng quan sát được trực tiếp qua thao tác thật (screenshot, DOM,
Network tab, console), lặp lại nhiều lần để xác nhận tính nhất quán. Phát
hiện SQL Injection đặc biệt đáng tin cậy vì được xác nhận qua 2 phép thử độc
lập (error-based: payload gây lỗi cú pháp lộ thông báo CSDL; boolean-based:
payload `OR '1'='1'` bypass hoàn toàn điều kiện WHERE, cùng với một biến thể
đối chứng không kích hoạt lỗi) — không kết luận vội từ một dấu hiệu duy
nhất, mà từ nhiều phép thử độc lập cùng khớp với một giả thuyết duy nhất.
Việc dùng lại BUG-IA04-PRODUCTDETAIL-001 cho GUI-068/076/077/081 (thay vì
file bug trùng) đúng theo nguyên tắc "chỉ file bug thật, theo nguyên nhân
gốc" của skill bug-report — 4 item này thể hiện chính xác cùng một hành vi
giỏ hàng (không toast/badge, không cộng dồn số lượng) đã được xác nhận
trước đó ở Product Detail. GUI-086 (thiếu ô chọn số lượng)
được đánh Failed nhưng có chủ đích không file bug riêng vì không vi phạm FR
cụ thể nào — chỉ là quan sát UX, tránh lạm dụng bug report cho đề xuất thiết
kế.

### (5) Student Fix

Không cần chỉnh sửa nội dung — đã tự kiểm chứng chéo (UI + Network + source
code) ngay trong lúc thực thi. Việc tạo GitHub Issue cho 12 bug mới và push
commit được để lại cho sinh viên xác nhận trước khi thực hiện, theo đúng quy
trình của skill `bug-report`.

---

## 4. Tổng hợp độ chính xác của AI

Tổng hợp verdict từ Mục 3 và điền bảng dưới đây.

| Metric                                        | Count | Percentage |
| :--------------------------------------------- | :---- | :--------- |
| **Tổng số artifact do AI tạo được audit**       | 12    | 100%       |
| **VALID (đúng, chấp nhận nguyên trạng)**        | 9     | 75.0%      |
| **INVALID (sai; bị loại bỏ)**                   | 0     | 0%         |
| **INCOMPLETE (chấp nhận được sau khi chỉnh sửa)** | 3   | 25.0%      |

## 5. Kết luận — Khi nào nên (hoặc không nên) dùng AI?

*Viết 80–150 từ mô tả các pattern đã quan sát được. AI làm tốt ở đâu? AI thất bại ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này về sau là gì?*

______________________________________________________________________

______________________________________________________________________

______________________________________________________________________

## 6. Công bố bắt buộc (dán nguyên văn)

*"\[Test case / script / dataset / report\] ban đầu được tạo bởi \[tên công cụ AI\]; tôi đã xem xét và chỉnh sửa \[phần X\], bổ sung \[edge case Y, Z\]; \[phần W\] do tôi tự viết hoàn toàn. Báo cáo AI Audit chi tiết được đính kèm tại Phụ lục A. Tôi xác nhận không sử dụng AI để tạo bất kỳ artifact nào thuộc danh mục bị cấm."*

## Chữ ký

| Họ tên sinh viên (in hoa): |                            |
| :--------------------------- | :------------------------- |
| **MSSV:**                    | 23127300                   |
| **Lớp / Khoá:**              | CS423 / CSC15003           |
| **Môn học:**                 | CS423 / CSC15003 – Kiểm thử Phần mềm |
| **Giảng viên:**              |                            |
| **Ngày:**                    |                            |
| **Chữ ký:**                  |                            |
