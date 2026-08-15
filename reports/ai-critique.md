# AI Critique — HW05 Performance Testing

## Sinh viên: 23127464

Trong suốt quá trình A-E, AI đã mắc nhiều sai lầm và hạn chế. Trong giai đoạn thiết kế (Giai đoạn C), công cụ tạo tệp cấu hình kiểm tra của AI gặp lỗi kỹ thuật, và tệp được tạo thiếu một thành phần bắt buộc. Sau đó, lần chạy tải đầu tiên (D1 Load) gần như trống rỗng, và không thu được dữ liệu hữu ích nào. Lỗi này chỉ được nhận ra khi người dùng tự chạy và thấy kết quả trống (AI không kiểm tra tệp đầu ra trước khi giao). Nguyên nhân chính là nội dung tệp do AI tạo ra không phù hợp với công cụ kiểm tra được sử dụng, và AI đã không kiểm tra chất lượng tệp đầu ra trước khi gửi cho người dùng.

Trong Giai đoạn D2 Stress, việc giám sát tài nguyên hệ thống (CPU/RAM) dừng quá sớm - ngay trước khi bài kiểm tra tải thực sự bắt đầu (khoảng 35 giây). Kết quả là tất cả dữ liệu giám sát tài nguyên chỉ ghi lại vài dòng ở trạng thái nhàn rỗi, không phản ánh gì khi hệ thống đang chịu tải. Điều này là do các hướng dẫn được sắp xếp kém bởi AI: bước dừng giám sát được đặt trước bước chạy kiểm tra tải trong hướng dẫn, vì vậy người đọc có thể dễ dàng làm theo thứ tự đó và do đó dừng sớm. AI không phát hiện ra vấn đề này vì nó không so sánh khung thời gian dữ liệu giám sát tài nguyên với thời gian kiểm tra tải thực tế khi phân tích kết quả; nó chỉ được phát hiện khi ai đó so sánh thủ công các dấu thời gian.

Nguyên tắc: AI nên luôn truy vết từng con số về bằng chứng gốc cụ thể (tệp nào, ở đâu, ghi lại gì), kiểm tra xem tất cả dữ liệu hỗ trợ có thực sự bao phủ giai đoạn phân tích cần thiết hay không, và không bao giờ coi một lần chạy ngắn ở mức tải cao nhất là bằng chứng của sự ổn định lâu dài. Khi con người xem xét, cần chú ý đặc biệt đến những hạn chế mà AI không chủ động báo cáo.
