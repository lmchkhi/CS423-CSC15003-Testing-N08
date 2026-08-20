# Checklist yêu cầu HW06

Đối chiếu checklist này với `2026.HW06.API_Testing_En.md`; file đề bài luôn thắng nếu có thay đổi.

## Ba quy trình API

- [ ] Chọn 3 phạm vi tính năng/API: đúng 1 từ Nhóm A, 1 từ Nhóm B, 1 từ Nhóm C.
- [ ] Bộ ba không trùng với thành viên khác trong nhóm.
- [ ] Mỗi API có mục tiêu `>= 35` ca kiểm thử do AI tạo qua nhiều câu lệnh có chủ đích.
- [ ] Mọi parameter có domain partitions; state/security/schema được bao phủ khi áp dụng.
- [ ] Mỗi ca kiểm thử AI sinh được con người gắn `VALID/INVALID/INCOMPLETE`, có lý do và nội dung chỉnh sửa.
- [ ] Con người thêm `>= 5` ca kiểm thử/API mà AI bỏ sót và giải thích vì sao.
- [ ] Các ca đã duyệt được thực thi bằng Postman + Newman hoặc Karate/RestAssured.
- [ ] Mọi yêu cầu HTTP có `X-Student-Id: <StudentID>` và có ảnh chụp bảng điều khiển xác thực header.
- [ ] Có bộ sưu tập, dữ liệu/môi trường nếu dùng, kết quả bảng điều khiển và báo cáo Newman HTML.
- [ ] Tên máy chủ trong kết quả khớp môi trường triển khai thật (`localhost`/`127.0.0.1` được chấp nhận).
- [ ] Lỗi thật được ghi cả trong Markdown và GitHub Issues, mỗi vấn đề có ảnh chụp màn hình.

## Yêu cầu toàn suite

- [ ] Báo cáo liệt kê các tính năng Postman **thực sự** đã dùng; không cần tuyên bố dùng mọi tính năng ví dụ trong đề.
- [ ] CI/CD chạy API tests.
- [ ] Có hai commit/lần chạy mẫu có thật: một đạt toàn bộ, một có một ca kiểm thử thất bại; kèm ảnh chụp màn hình và liên kết.
- [ ] Bộ sinh ca kiểm thử bằng AI có mã giả và sơ đồ do sinh viên tự thiết kế/tự vẽ.
- [ ] Báo cáo kiểm toán AI mở đầu bằng tuyên bố bắt buộc và ghi công cụ, ngày giờ, câu lệnh nguyên văn, kết quả AI cho từng tương tác.
- [ ] Bài phê bình AI là một đoạn 200–300 từ, trả lời đủ ba câu hỏi trong đề.
- [ ] Có Git commit riêng cho từng bước của procedure và log dạng text.

## Gói nộp

- [ ] Tên ZIP: `<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip`, grade gồm 3 chữ số `000`–`100`.
- [ ] Báo cáo chính dạng Markdown + PDF, gồm báo cáo kiểm thử API và kiểm toán AI.
- [ ] Liên kết kho mã nguồn GitHub công khai.
- [ ] Bộ sưu tập Postman JSON + báo cáo Newman HTML + danh sách tính năng Postman.
- [ ] Báo cáo CI/CD có cấu hình, hai lần chạy, ảnh chụp màn hình và liên kết.
- [ ] Ca kiểm thử Excel + bản tóm tắt kiểm thử.
- [ ] Sơ đồ + mã giả (`PNG/Mermaid` và `.md/.py` theo mục nội dung ZIP), nhưng sơ đồ không do AI tạo.
- [ ] Báo cáo lỗi + ảnh chụp GitHub Issues.
- [ ] Bài phê bình AI và Báo cáo kiểm toán AI ở dạng Markdown + PDF.
- [ ] Nhật ký commit Git dạng văn bản.
- [ ] README có phần tự đánh giá và số API; số ca được sinh, bổ sung, thực thi, đạt, không đạt; số lỗi.
- [ ] Chuyển đổi OpenAPI chỉ là tùy chọn; nếu dùng AI tạo thì cũng phải kiểm toán.
- [ ] Video minh họa Agent Skill là tùy chọn.

Thiếu bất kỳ tài liệu bắt buộc nào có thể dẫn đến 0 điểm theo đề. Không đánh dấu hạng mục hoàn tất nếu sản phẩm hoặc bằng chứng chưa tồn tại.

## Thang điểm

| Tiêu chí | Điểm tối đa |
|---|---:|
| API 1 — quy trình đầy đủ | 30 |
| API 2 — quy trình đầy đủ | 30 |
| API 3 — quy trình đầy đủ | 30 |
| Agent Skill | 10 |
| **Tổng** | **100** |
