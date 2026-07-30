# BUG-IA04-EMPTYSEARCH-001: Tìm kiếm không có kết quả hiển thị hoàn toàn trống — không icon, không message, không lối thoát

## Found by Test Case
GUI-100, GUI-101, GUI-103, GUI-104, GUI-105, GUI-110

## Requirement liên quan
FR-05 ("Khi không có kết quả tìm kiếm phải hiển thị thông báo empty state phù hợp"), FR-24 ("Trang trống (Empty State) phải có icon/hình minh họa và message thân thiện")

## Severity / Priority
Major / P1

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Tại trang chủ, gõ một từ khóa chắc chắn không khớp sản phẩm nào (vd "zzznotfound") vào ô tìm kiếm, bấm nút "Tìm".
2. Quan sát: dòng "Kết quả tìm kiếm cho: zzznotfound" hiển thị đúng, nhưng toàn bộ phần bên dưới là **khoảng trắng hoàn toàn** — không có sản phẩm nào (đúng), nhưng cũng không có bất kỳ icon, hình minh họa, message nào (vd "Không tìm thấy sản phẩm phù hợp"), không có dòng "Hiển thị 0 sản phẩm", không có gợi ý hành động tiếp theo, và không có nút/link nào để quay về xem toàn bộ sản phẩm.
3. Xác nhận qua DOM: `document.querySelectorAll('img').length === 0`, `document.querySelectorAll('svg').length === 0`, nội dung trang sau dòng "Kết quả tìm kiếm cho" chỉ còn dòng chân trang bản quyền — không có phần tử nào khác được render cho trạng thái này.
4. Vì hoàn toàn không có nội dung nào được render, các khía cạnh phụ thuộc (responsive trên mobile, tương phản dark mode, nút quay lại có thể bấm bằng bàn phím) đều không thể đạt được — không phải vì chúng làm sai, mà vì không có gì để làm đúng.

## Expected result
Theo đúng FR-05/FR-24: khi tìm kiếm không có kết quả, phải hiển thị một trạng thái "trống" (empty state) có chủ đích — gồm icon/hình minh họa, message thân thiện giải thích rõ không tìm thấy sản phẩm khớp, và một cách rõ ràng (nút/link) để quay về xem toàn bộ danh sách sản phẩm hoặc thử tìm kiếm lại.

## Actual result
Trạng thái 0 kết quả chỉ là một khoảng trắng im lặng — không có bất kỳ phần tử UI nào được thiết kế riêng cho trường hợp này, vi phạm trực tiếp cả FR-05 và FR-24. Đây cũng là màn hình thuộc luồng usability chính (Task 2: Browse → search → ...), nên trải nghiệm "tìm không ra, không biết vì sao, không biết làm gì tiếp" ảnh hưởng trực tiếp tới luồng người dùng thật.

## Evidence
![BUG-IA04-EMPTYSEARCH-001](screenshots/BUG-IA04-EMPTYSEARCH-001.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/194
