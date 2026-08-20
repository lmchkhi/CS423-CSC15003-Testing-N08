---
name: ai-first-api-testing
description: Thiết kế, kiểm toán, triển khai và phân tích ca kiểm thử API cho bài HW06 EShop bằng Postman/Newman hoặc công cụ tương đương. Dùng khi chọn ba API thuộc Nhóm A/B/C, tạo và đánh giá ca kiểm thử do AI sinh, thu thập bằng chứng thật, báo lỗi, tích hợp CI/CD hoặc hoàn thiện nhật ký AI, bài phê bình AI và báo cáo nộp bài; không dùng cho kiểm thử hiệu năng hay kiểm thử giao diện thuần túy.
---

# Kiểm thử API theo hướng ưu tiên AI cho HW06

Hoàn thành đúng phần việc người dùng yêu cầu và để lại sản phẩm có thể truy vết. Có thể xử lý một bước hoặc nhiều bước trong cùng lượt; không tự mở rộng sang giai đoạn khác, chạy hệ thống, tạo commit hay xuất bản GitHub Issue nếu người dùng chưa yêu cầu hoặc chưa cấp quyền cần thiết.

## Nguồn chuẩn và cách xử lý mâu thuẫn

Đọc các nguồn liên quan theo thứ tự sau:

1. `2026.HW06.API_Testing_En.md`: yêu cầu chấm điểm và deliverables.
2. `src/eshop-sut/README.md`: hành vi nghiệp vụ mong đợi, gồm FR-01–FR-24 và SEC-01–SEC-07.
3. `src/eshop-sut/api_specification.md`: phương thức, đường dẫn, header và dữ liệu gửi được công bố.
4. Code SUT: hành vi triển khai thực tế và các chi tiết tài liệu còn thiếu.

Không coi hành vi mã nguồn hiện tại là kết quả mong đợi nếu trái với README. Ghi rõ mọi mâu thuẫn hoặc khoảng trống tài liệu; không tự bịa mã trạng thái, lược đồ phản hồi, quy tắc xác thực hay điểm cuối. Nếu chưa đủ căn cứ để tạo câu lệnh kiểm tra chính xác, đánh dấu ca kiểm thử là `INCOMPLETE` và nêu thông tin cần con người quyết định.

Lấy mã sinh viên từ yêu cầu hoặc kho mã nguồn; kho này hiện dùng `23127464`. Mọi yêu cầu HTTP khi thực thi phải mang `X-Student-Id: <StudentID>`. Không gắn cứng một mã sinh viên khi áp dụng kỹ năng cho kho mã nguồn khác.

## Quy tắc bắt buộc

- Tách rõ **quan sát** (yêu cầu, phản hồi, nhật ký, báo cáo) khỏi **suy luận** (nguyên nhân hoặc tác động có thể có).
- Không bịa kết quả đạt/không đạt, số lượng ca kiểm thử, độ bao phủ, thời gian, ảnh chụp màn hình, video, URL, vấn đề, lần chạy quy trình hay commit.
- Kết quả AI phải được con người kiểm toán. Nhãn bắt buộc cho từng ca kiểm thử do AI sinh là `VALID`, `INVALID` hoặc `INCOMPLETE`, kèm lý do và nội dung chỉnh sửa khi cần.
- Chỉ báo lỗi khi kết quả mong đợi có nguồn và kết quả thực tế có bằng chứng tái hiện. Giữ lần chạy thất bại thay vì ghi đè.
- Sơ đồ bộ sinh ca kiểm thử bằng AI nộp bài phải do sinh viên tự thiết kế và tự vẽ. Chỉ hỗ trợ mã giả, câu hỏi thiết kế hoặc đánh giá sơ đồ mà sinh viên đã tạo; không tạo sơ đồ/Mermaid hoàn chỉnh để nộp thay.
- Ghi Báo cáo kiểm toán AI với tên công cụ, ngày giờ, câu lệnh nguyên văn và kết quả AI. Không thay kết quả thật bằng bản tóm tắt nếu bài nộp cần nội dung đầy đủ.
- Nhắc con người đánh giá tại điểm bàn giao, nhưng không tuyên bố đã được duyệt nếu chưa có xác nhận.

## Định tuyến tài liệu

Chỉ đọc tài liệu cần cho tác vụ hiện tại:

- Kiểm tra phạm vi và sản phẩm bàn giao: [assignment-requirements.md](references/assignment-requirements.md).
- Chọn phạm vi API/tính năng và ánh xạ điểm cuối: [api-selection-contract.md](references/api-selection-contract.md).
- Điều phối các phần sinh, kiểm toán, mở rộng, thực thi và báo cáo: [phase-playbook.md](references/phase-playbook.md).
- Thiết kế/kiểm toán ca kiểm thử và câu lệnh kiểm tra Postman: [api-testing-runbook.md](references/api-testing-runbook.md).
- Chuẩn bị hoặc chạy Newman: [newman-execution.md](references/newman-execution.md).
- Đọc báo cáo, phân loại thất bại và xác nhận lỗi: [evidence-analysis.md](references/evidence-analysis.md).

## Quy trình theo yêu cầu HW06

1. Chọn đúng ba phạm vi tính năng/API: một từ Nhóm A, một từ Nhóm B và một từ Nhóm C; kiểm tra không trùng bộ ba với thành viên nhóm.
2. Với **mỗi** API, dùng chuỗi câu lệnh có chủ đích để sinh mục tiêu ít nhất 35 ca kiểm thử. Bao phủ phân vùng miền cho mọi dữ liệu đầu vào và, khi áp dụng, chuyển đổi trạng thái, bảo mật SEC-01–SEC-07 và lược đồ phản hồi.
3. Con người kiểm toán từng ca kiểm thử AI sinh; sửa ca `INVALID`/`INCOMPLETE`. Sau kiểm toán, con người bổ sung ít nhất 5 ca mà AI bỏ sót cho mỗi API và giải thích nguyên nhân bỏ sót.
4. Chuyển các ca đã duyệt thành bộ sưu tập và câu lệnh kiểm tra. Chạy Postman + Newman (hoặc Karate/RestAssured nếu người dùng chọn), lưu bộ sưu tập, dữ liệu đầu vào, nhật ký bảng điều khiển và báo cáo HTML. Kiểm tra tên máy chủ trong bằng chứng khớp môi trường triển khai; `localhost` hoặc `127.0.0.1` được chấp nhận.
5. Với lỗi thật, tạo báo cáo Markdown và chuẩn bị GitHub Issue có ảnh chụp màn hình. Chỉ xuất bản vấn đề khi người dùng yêu cầu; ghi URL thật sau khi xuất bản.
6. Tích hợp CI/CD và tài liệu hóa hai lần chạy có thật: một lần đạt toàn bộ và một lần có một ca kiểm thử thất bại, kèm commit, ảnh chụp màn hình và liên kết.
7. Hoàn thiện báo cáo, tóm tắt README, Báo cáo kiểm toán AI, bài phê bình AI dài 200–300 từ, nhật ký commit Git, mã giả và sơ đồ tự vẽ.

Nếu người dùng yêu cầu toàn bộ quy trình, có thể tiếp tục qua các bước trong phạm vi đó nhưng vẫn ghi rõ sản phẩm nào đang `CHỜ CON NGƯỜI ĐÁNH GIÁ` và không tự điền quyết định đánh giá.

## Vị trí sản phẩm

Trước khi ghi tệp, khám phá cấu trúc kho mã nguồn bằng `rg --files` và ưu tiên quy ước đang có. Không tạo cây thư mục song song chỉ vì ví dụ trong kỹ năng. Với kho mã nguồn chưa có quy ước, dùng:

```text
tests/api-testing/{collections,environments,data,test-cases,reports,evidence}/
reports/api-testing/
bug-report/api-testing/
```

Dùng mẫu hiện có trong `assets/templates/` khi phù hợp; thay toàn bộ chỗ giữ chỗ bằng dữ liệu thật hoặc để rõ `TBD/PENDING`, không bịa giá trị. Các mẫu là điểm khởi đầu, không phải danh sách sản phẩm bàn giao đầy đủ.

## Điều kiện bàn giao

- Mỗi con số và kết luận trỏ tới bằng chứng hoặc được ghi `PENDING/NOT EXECUTED`.
- Mỗi API có chuỗi sản phẩm: sinh ca → kiểm toán/chỉnh sửa → ca do con người bổ sung → ca có thể thực thi → bằng chứng thực thi → báo cáo lỗi nếu có.
- README có đúng các tổng số mà đề yêu cầu; báo cáo chỉ liệt kê những tính năng Postman thực sự đã dùng.
- CI/CD, GitHub Issue, ảnh chụp màn hình, sơ đồ tự vẽ và nhật ký commit không được tuyên bố hoàn tất nếu chưa tồn tại.
- Kết thúc bằng trạng thái ngắn: phần đã làm, phần cần con người đánh giá và phần còn thiếu.
