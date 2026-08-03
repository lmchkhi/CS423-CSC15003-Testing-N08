---
name: ai-first-playwright-testing
description: Xây dựng và vận hành quy trình kiểm thử tự động Playwright TypeScript theo hướng AI-first, hộp đen, data-driven và đa trình duyệt, có người duyệt ở từng checkpoint. Dùng khi cần khám phá một tính năng web từ hành vi bên ngoài, thiết kế ít nhất 12 test case, tạo fixture JSON/CSV và spec Playwright, cấu hình Chromium/Firefox/WebKit cùng báo cáo HTML, phân tích khoảng trống, ghi nhận lỗi SUT, review note và nhật ký AI cho bài tập HW04 hoặc dự án tương tự.
---

# Tự động hóa kiểm thử Playwright theo hướng AI-first

## Mục tiêu

Thực hiện kiểm thử theo từng tính năng và từng giai đoạn A–E. Luôn coi người dùng là người duyệt trong vòng lặp; không sinh toàn bộ bộ kiểm thử trong một lượt và không vượt checkpoint khi chưa nhận câu xác nhận rõ ràng như “approved, continue”.

## Bắt đầu mỗi lượt

1. Ghi trực tiếp vào `src/ai-audit-report.md` ngay khi nhận prompt hoặc ngay sau hành động đầu tiên. Dùng đúng mẫu `assets/templates/ai-audit-entry.md`.
2. Chép nguyên văn prompt, lấy thời gian ISO 8601 thực tế kèm múi giờ và ghi đúng công cụ/model nếu biết. Không sửa, xóa hoặc ghi đè mục cũ.
3. Nếu prompt quá dài hoặc chứa nhiều dòng, vẫn giữ nguyên văn trong trường `User Prompt`; dùng khối thụt lề Markdown để bảo toàn nội dung.
4. Tóm tắt chính xác file, lệnh và quyết định trong `AI Action`. Nếu hành động tiếp tục sau khi đã ghi log, bổ sung một mục mới thay vì sửa sai lịch sử.

## Thu thập đầu vào

Xác định các giá trị sau từ prompt hoặc repository: mã và mô tả tính năng, URL SUT, mã sinh viên/người chạy, thông tin chạy/seed dữ liệu, tài khoản thử nghiệm và thư mục đầu ra. Chỉ hỏi phần còn thiếu khi không thể khám phá an toàn từ bên ngoài.

Mặc định dùng quy ước:

- ID file dạng chữ thường không dấu, ví dụ `FR-05` → `fr05`.
- Dữ liệu tại `data/<feature>.json` hoặc `.csv`.
- Test tại `tests/<feature>.spec.ts`.
- Ghi chú tại `reports/<feature>/REVIEW_NOTES.md` và lỗi tại `bug-reports/<feature>/bugs/` (tham khảo cấu trúc bug report tại `.github/ISSUE_TEMPLATE/bug-report-template.md`).
- Nội dung Human Review và gap analysis tổng hợp tại `ai-gap-analysis/ai-gap-analysis.md`.
- Báo cáo HTML tại thư mục riêng, không ghi đè kết quả cần lưu.

Đọc `references/conventions.md` trước khi thiết kế dữ liệu, viết code hoặc báo cáo.

## Ranh giới hộp đen

- Chỉ đọc tài liệu setup/run/seed/README và tài khoản của SUT để khởi động hệ thống.
- Không đọc source code ứng dụng, logic validation, database schema hoặc implementation để suy ra test case hay expected result.
- Khám phá bằng UI, nội dung hiển thị, accessibility tree, URL và request/response quan sát từ trình duyệt.
- Gắn nguồn quan sát cho expected result: yêu cầu công khai, UI thực tế hoặc hợp đồng API được tài liệu hóa.
- Nếu hành vi ngoài hệ thống không đủ rõ, ghi `Chưa rõ` và hỏi người dùng; không lấp khoảng trống bằng suy đoán.

## Điều phối theo tính năng

Xử lý lần lượt từng tính năng. Hoàn tất A→E cho tính năng hiện tại trước khi chuyển sang tính năng tiếp theo, trừ khi người dùng chỉ định thứ tự khác. Sau mỗi giai đoạn:

1. Trình bày artifact hoặc kết quả kiểm chứng.
2. Nêu rõ điểm chưa chắc chắn và việc chưa làm.
3. Dừng lại, yêu cầu duyệt và không chuẩn bị artifact của giai đoạn kế tiếp.

## Giai đoạn A — Khám phá

1. Kiểm tra khả năng chạy SUT chỉ từ hướng dẫn setup; nếu không có phiên bản chạy được, xin URL hoặc thông tin truy cập.
2. Tương tác như người dùng thật và quan sát luồng chính, trạng thái rỗng/lỗi/biên, URL, thông báo và network response liên quan.
3. Ghi locator ứng viên ưu tiên theo thứ tự `getByRole`, `getByTestId`, `getByLabel`, `getByText`; không chốt locator dựa trên chuỗi CSS/XPath dài.
4. Lưu bằng chứng thực tế khi phù hợp. Không tuyên bố đã chạy nếu chưa chạy.
5. Trả lại đúng 5–8 gạch đầu dòng về luồng, hành vi, selector/route và điểm mơ hồ.
6. Dừng để chờ duyệt Giai đoạn A.

## Giai đoạn B — Thiết kế test

1. Dùng mẫu `assets/templates/test-cases.md`.
2. Tạo ít nhất 12 trường hợp cho mỗi tính năng, cân bằng positive, negative và edge.
3. Ghi đủ ID, tiêu đề, loại, tiền điều kiện, bước và kết quả mong đợi.
4. Bảo đảm mỗi expected result dựa trên bằng chứng hộp đen đã quan sát hoặc tài liệu công khai; đánh dấu mọi giả định cần người dùng xác nhận.
5. Bao phủ ranh giới dữ liệu, trạng thái, quyền truy cập, lỗi mạng hoặc phục hồi khi phù hợp với tính năng.
6. Chưa viết fixture hoặc spec ở giai đoạn này. Dừng để chờ duyệt bảng test case.

## Giai đoạn C — Tự động hóa data-driven

1. Chuyển toàn bộ input, expected value và biến thể ca kiểm thử sang fixture ngoài spec. Không đặt inline array/object chứa test data trong file spec.
2. Định nghĩa type/interface TypeScript cho cấu trúc fixture và kiểm tra trường bắt buộc trước khi chạy.
3. Sinh test theo từng record, dùng ID và tiêu đề fixture trong tên test để truy vết.
4. Dùng locator có ngữ nghĩa và chờ theo điều kiện quan sát được. Cấm `waitForTimeout` trừ khi người dùng chấp thuận bằng chứng về lý do không thể đồng bộ theo sự kiện.
5. Dùng tối thiểu ba nhóm assertion trên toàn suite và chú thích nhóm assertion tại chỗ: hiển thị/DOM, trạng thái/thuộc tính, network/response, count/aggregate hoặc visual/snapshot.
6. Tách setup dùng chung và helper kỹ thuật khỏi dữ liệu nghiệp vụ. Không làm test phụ thuộc thứ tự chạy.
7. Chạy lint/type-check và test mục tiêu nếu môi trường cho phép; báo đúng kết quả thực tế.
8. Trình bày fixture, spec, assertion coverage và kết quả kiểm chứng; dừng để chờ duyệt.

## Giai đoạn D — Đa trình duyệt và báo cáo

1. Cấu hình ba project Chromium, Firefox và WebKit trong `playwright.config.ts`.
2. Cấu hình HTML reporter hoặc Allure; đưa `Run by: <StudentID>` và timestamp ISO 8601 được tạo tại thời điểm chạy vào metadata hiển thị. Kiểm tra trực tiếp artifact để xác nhận metadata thực sự nhìn thấy được với phiên bản Playwright đang dùng.
3. Không dùng timestamp giả hoặc timestamp cố định trong source. Không ghi nhận browser run chưa thực thi.
4. Thực thi spec đã được duyệt trên cả ba engine. Với ba tính năng, tổng tối thiểu là chín lượt kết hợp tính năng–trình duyệt.
5. Phân loại `passed`, `failed`, `skipped`, lỗi môi trường và test không chạy; giữ trace/screenshot/video theo cấu hình khi có.
6. Trình bày lệnh chạy, ma trận kết quả và đường dẫn report; dừng để chờ duyệt.

## Giai đoạn E — Human Review và phân tích khoảng trống

1. Ghi từng góp ý của người dùng vào `REVIEW_NOTES.md` bằng mẫu `assets/templates/review-notes.md`: lỗi gì, vì sao AI có thể bỏ sót, cách sửa và bằng chứng xác minh.
2. Tổng hợp toàn bộ nội dung Human Review vào đúng file `ai-gap-analysis/ai-gap-analysis.md`, dùng mẫu `assets/templates/ai-gap-analysis.md`. Tạo folder/file nếu chưa tồn tại; nếu đã tồn tại, giữ nội dung hợp lệ trước đó và cập nhật theo từng tính năng thay vì ghi đè toàn bộ.
3. Trong file tổng hợp, ghi rõ đầu ra ban đầu của AI, phản hồi/chỉnh sửa của con người, khoảng trống được phát hiện, nguyên nhân, thay đổi đã áp dụng, tác động đến test và bằng chứng xác minh. Phân biệt dữ kiện do người dùng cung cấp với kết luận của AI.
4. Chỉ ghi một mục Human Review là `Đã xử lý` khi thay đổi tương ứng đã được áp dụng và kiểm chứng; nếu chưa, ghi `Đang mở` cùng hành động tiếp theo.
5. Phân biệt lỗi test, lỗi môi trường và defect SUT trước khi viết bug report.
6. Chỉ tạo bug report khi có bằng chứng tái hiện lỗi SUT. Dùng `assets/templates/bug-report.md`; không tự tạo screenshot, kết quả hoặc GitHub Issue giả.
7. Liệt kê test case không tự động hóa được và lý do cụ thể trong cả ghi chú theo tính năng và bản gap analysis tổng hợp.
8. Cập nhật bảng tự đánh giá/tóm tắt bằng `assets/templates/readme-summary.md`; số liệu phải được tính từ artifact thực tế.
9. Nhắc người dùng tự thực hiện nội dung bắt buộc mang tính cá nhân như video demo và AI Critique nếu quy định học phần yêu cầu.
10. Nhắc chiến lược commit tăng dần, nhưng không bịa lịch sử hoặc backdate: mục tiêu ít nhất 8 commit chạm file test, trải trên ít nhất 4 ngày chỉ khi người dùng thật sự làm việc trong khoảng thời gian đó.
11. Trình bày gap analysis cuối cùng, dẫn đường dẫn `ai-gap-analysis/ai-gap-analysis.md` và dừng để người dùng duyệt.

## Quy tắc tính trung thực

- Chỉ báo `đã chạy`, `pass`, `fail`, `đã chụp` hoặc `đã tạo issue` khi có artifact/lệnh thực tế chứng minh.
- Không biến lỗi script thành defect SUT.
- Không đẩy code, tạo GitHub Issue hay thay đổi hệ thống bên ngoài nếu người dùng chưa yêu cầu rõ.
- Không làm hộ phần mà quy định môn học bắt buộc sinh viên tự viết; chỉ cung cấp khung hoặc phản hồi khi được phép.
- Giữ mọi đầu ra ở Markdown, TypeScript và JSON/CSV có thể version-control.

## Tiêu chí hoàn tất

Chỉ đánh dấu hoàn tất khi có đủ artifact đã được người dùng duyệt, kết quả chạy thực tế, báo cáo có metadata, Human Review/gap analysis tại `ai-gap-analysis/ai-gap-analysis.md`, danh sách ca không tự động hóa và log AI liên tục. Nếu thiếu môi trường hoặc quyền truy cập, ghi trạng thái `bị chặn` cùng bằng chứng và bước người dùng cần thực hiện.
