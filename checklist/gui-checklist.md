# GUI Checklist — HW03 Task 1

## Checklist

Populate with `.claude/skills/gui-checklist/SKILL.md`. Target: **> 40 items**,
covering all of IA01–IA04. `Source` = `AI` or `Human`. Screenshots only for
`Failed` rows.

| ID | IA | Screen | Item | Source | Result | Notes | Screenshot | Bug ID |
|---|---|---|---|---|---|---|---|---|
| GUI-001 | IA01 | Product Detail | Trang có đúng 1 thẻ `<h1>` chứa tên sản phẩm, không có `<h1>` trùng lặp nào khác trên trang | AI | Not Run | | | |
| GUI-002 | IA01 | Product Detail | Toàn bộ nhãn, label, nút bấm trên trang đều dùng tiếng Việt, không sót chuỗi tiếng Anh (vd "Add to cart" chưa dịch) | AI | Not Run | | | |
| GUI-003 | IA01 | Product Detail | Giá sản phẩm hiển thị đúng ký hiệu ₫ và có dấu phân cách hàng nghìn (vd "1.250.000 ₫", không phải "1250000") | AI | Not Run | | | |
| GUI-004 | IA01 | Product Detail | Nút "Thêm vào giỏ hàng" dùng màu xanh dương (màu hành động tích cực), không trùng màu với nút nguy hiểm/hủy | AI | Not Run | | | |
| GUI-005 | IA01 | Product Detail | Ảnh lớn sản phẩm, Tên, Giá, Mô tả, Danh mục đều hiển thị đầy đủ trên trang, không thiếu trường nào | AI | Not Run | | | |
| GUI-006 | IA01 | Product Detail | Ảnh sản phẩm giữ đúng tỷ lệ khung hình, không bị méo/kéo giãn khi hiển thị ở kích thước lớn | AI | Not Run | | | |
| GUI-007 | IA01 | Product Detail | Tên sản phẩm dài (>60 ký tự) không làm vỡ layout — có xử lý truncate hoặc wrap hợp lý, không tràn ra ngoài khung | AI | Not Run | | | |
| GUI-008 | IA01 | Product Detail | Mô tả sản phẩm dài hiển thị đầy đủ, có cuộn hoặc "Xem thêm" thay vì bị cắt cụt không rõ ràng | AI | Not Run | | | |
| GUI-009 | IA01 | Product Detail | Font chữ, cỡ chữ, màu chữ nhất quán với các màn hình khác (Home, product grid) — không lệch style | AI | Not Run | | | |
| GUI-010 | IA01 | Product Detail | Độ tương phản giữa chữ và nền đạt chuẩn WCAG AA (tối thiểu 4.5:1 với chữ thường) để đọc rõ tên/giá/mô tả | AI | Not Run | | | |
| GUI-011 | IA01 | Product Detail | Layout responsive hợp lý ở cả desktop và mobile — ảnh, thông tin, nút bấm không đè lên nhau khi thu nhỏ màn hình | AI | Not Run | | | |
| GUI-012 | IA01 | Product Detail | Khi ảnh sản phẩm đang tải, có trạng thái loading (skeleton hoặc placeholder) thay vì khoảng trắng/giật hình | AI | Not Run | | | |
| GUI-013 | IA02 | Product Detail | Ô nhập Số lượng chỉ chấp nhận số nguyên dương, không cho nhập số 0, số âm hoặc số thập phân | AI | Not Run | | | |
| GUI-014 | IA02 | Product Detail | Giá trị mặc định của ô Số lượng khi vào trang là 1, không để trống hoặc bằng 0 | AI | Not Run | | | |
| GUI-015 | IA02 | Product Detail | Ô nhập Số lượng có nhãn rõ ràng ("Số lượng") kèm ký hiệu `*` vì đây là trường bắt buộc | AI | Not Run | | | |
| GUI-016 | IA02 | Product Detail | Khi nhập ký tự chữ hoặc ký tự đặc biệt vào ô Số lượng, hệ thống từ chối hoặc hiển thị lỗi, không cho submit | AI | Not Run | | | |
| GUI-017 | IA02 | Product Detail | Khi nhập số lượng không hợp lệ (0, âm, để trống) rồi bấm "Thêm vào giỏ hàng", thông báo lỗi hiển thị ngay phía trên nút submit, không phải bên dưới | AI | Not Run | | | |
| GUI-018 | IA02 | Product Detail | Ô nhập Số lượng dùng `type="number"` hoặc bàn phím số trên thiết bị di động để nhập liệu thuận tiện hơn | AI | Not Run | | | |
| GUI-019 | IA02 | Product Detail | Nếu có nút tăng/giảm (+/-) đi kèm ô Số lượng, bấm "-" khi số lượng đang là 1 thì không cho giảm xuống 0 hoặc số âm | AI (sửa bởi Human — xem Entry #2 ai-audit-report.md) | Not Run | | | |
| GUI-020 | IA02 | Product Detail | Sau khi bấm "Thêm vào giỏ hàng", nút tạm thời bị disable hoặc có cơ chế chống bấm nhiều lần liên tiếp (double-submit) | AI | Not Run | | | |
| GUI-021 | IA02 | Product Detail | Validation của ô Số lượng chạy ngay khi rời khỏi ô (on blur) hoặc khi gõ, không đợi đến lúc bấm submit mới báo lỗi | AI | Not Run | | | |
| GUI-022 | IA02 | Product Detail | Không thể dán (paste) giá trị không hợp lệ (chữ, ký tự đặc biệt) vào ô Số lượng để bypass validation | AI | Not Run | | | |
| GUI-023 | IA03 | Product Detail | Trang hiển thị breadcrumb (vd: Trang chủ > Danh mục > Tên sản phẩm) ngay phía trên nội dung chính | AI | Not Run | | | |
| GUI-024 | IA03 | Product Detail | Từng mắt breadcrumb (trừ mắt cuối) là link bấm được, dẫn đúng về trang tương ứng (Trang chủ, Danh mục) | AI | Not Run | | | |
| GUI-025 | IA03 | Product Detail | Mắt breadcrumb cuối cùng (tên sản phẩm hiện tại) không phải là link, chỉ hiển thị dạng text vì đang ở trang đó | AI | Not Run | | | |
| GUI-026 | IA03 | Product Detail | Có đường quay lại danh sách sản phẩm rõ ràng (nút "Quay lại" hoặc qua breadcrumb), không chỉ dựa vào nút back trình duyệt | AI | Not Run | | | |
| GUI-027 | IA03 | Product Detail | Bấm nút Back của trình duyệt từ trang chi tiết quay đúng về trang danh sách/kết quả tìm kiếm trước đó, không mất trạng thái (vị trí cuộn, bộ lọc đã chọn) | AI | Not Run | | | |
| GUI-028 | IA03 | Product Detail | Truy cập trực tiếp bằng URL sản phẩm (deep link) hiển thị đúng trang chi tiết sản phẩm đó, không lỗi hoặc văng về trang chủ | AI | Not Run | | | |
| GUI-029 | IA03 | Product Detail | Thanh điều hướng chính (Navbar) không highlight sai mục khi đang ở trang chi tiết sản phẩm | AI | Not Run | | | |
| GUI-030 | IA03 | Product Detail | Nếu có phần "Sản phẩm liên quan" ở cuối trang, bấm vào một sản phẩm liên quan điều hướng đúng sang trang chi tiết của sản phẩm đó (xác nhận tính năng tồn tại trước khi Pass/Fail — xem Entry #3) | AI | Not Run | | | |
| GUI-031 | IA03 | Product Detail | Toàn bộ link điều hướng trên trang (breadcrumb, sản phẩm liên quan) truy cập được bằng bàn phím (Tab + Enter), có focus ring hiển thị rõ | AI | Not Run | | | |
| GUI-032 | IA03 | Product Detail | Trên mobile, các vùng bấm của breadcrumb và link sản phẩm liên quan đủ lớn (~44×44px), không bị chồng lấn khó bấm trúng | AI | Not Run | | | |
| GUI-033 | IA04 | Product Detail | Sau khi bấm "Thêm vào giỏ hàng" thành công, có toast notification hoặc badge số lượng giỏ hàng cập nhật ngay lập tức, không cần load lại trang | AI | Not Run | | | |
| GUI-034 | IA04 | Product Detail | Toast "Đã thêm vào giỏ hàng" hiển thị đủ lâu để đọc được (không dưới ~2-3 giây) và có thể đóng sớm nếu người dùng muốn | AI | Not Run | | | |
| GUI-035 | IA04 | Product Detail | Ảnh sản phẩm trên trang chi tiết có thuộc tính `alt` mô tả đúng nội dung (tên sản phẩm), không để trống hoặc alt chung chung như "image" | AI | Not Run | | | |
| GUI-036 | IA04 | Product Detail | Nếu sản phẩm hết hàng, trang hiển thị rõ trạng thái "Hết hàng" và nút "Thêm vào giỏ hàng" bị disable, không cho bấm (xác nhận SUT có cơ chế tồn kho trước khi Pass/Fail — xem Entry #4) | AI | Not Run | | | |
| GUI-037 | IA04 | Product Detail | Nút "Thêm vào giỏ hàng" ở trạng thái disable có style phân biệt rõ với trạng thái enable (màu nhạt hơn, con trỏ not-allowed) | AI | Not Run | | | |
| GUI-038 | IA04 | Product Detail | Nếu thêm vào giỏ hàng thất bại (lỗi mạng, lỗi server), hiển thị thông báo lỗi cụ thể, không phải màn trắng hoặc treo im lặng | AI | Not Run | | | |
| GUI-039 | IA04 | Product Detail | Trong lúc chờ phản hồi từ server sau khi bấm "Thêm vào giỏ hàng", nút hiển thị trạng thái loading (spinner) để người dùng biết hệ thống đang xử lý | AI | Not Run | | | |
| GUI-040 | IA04 | Product Detail | Badge số lượng trên icon giỏ hàng ở navbar cập nhật đồng bộ ngay sau khi thêm sản phẩm từ trang chi tiết, không lệch số | AI | Not Run | | | |
| GUI-041 | IA04 | Product Detail | Nếu người dùng đổi số lượng rồi bấm thêm vào giỏ nhiều lần liên tiếp cho cùng sản phẩm, badge/toast phản ánh đúng tổng số lượng đã cộng dồn, không hiển thị sai | AI | Not Run | | | |
| GUI-042 | IA01 | Product Detail | Ở chế độ dark mode (nếu trình duyệt/hệ điều hành bật), chữ và nền trên trang chi tiết vẫn giữ độ tương phản đọc được, không bị chữ tối trên nền tối hoặc ảnh có viền trắng chói | Human | Not Run | | | |
| GUI-043 | IA02 | Product Detail | Ô nhập Số lượng và nút "Thêm vào giỏ hàng" tiếp cận được và thao tác được hoàn toàn bằng bàn phím (Tab tới ô, gõ số, Tab tới nút, Enter/Space để submit), có focus ring rõ ràng ở cả hai | Human | Not Run | | | |
| GUI-044 | IA04 | Product Detail | Nếu phiên đăng nhập hết hạn ngay khi người dùng bấm "Thêm vào giỏ hàng", hệ thống hiển thị thông báo yêu cầu đăng nhập lại rõ ràng, không âm thầm redirect về trang đăng nhập không giải thích | Human | Not Run | | | |
| GUI-045 | IA01 | Product Detail | Tên sản phẩm, mô tả và tên danh mục có dấu tiếng Việt (ví dụ: "Bàn phím cơ", "Tai nghe không dây") hiển thị đúng font, không bị vỡ dấu, mất dấu, hoặc hiển thị ô vuông thay ký tự | Human | Not Run | | | |

## Summary

| IA aspect | Designed | Executed | Passed | Failed |
|---|---|---|---|---|
| IA01 — General UI | | | | |
| IA02 — Forms | | | | |
| IA03 — Navigation | | | | |
| IA04 — Feedback/state | | | | |
| **Total** | | | | |

> Export this table to `.xlsx` before submission (§14 requires the Excel
> checklist as a separate file).
