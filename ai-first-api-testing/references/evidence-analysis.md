# Phân tích bằng chứng

## Kiểm tra tính toàn vẹn

- Đối chiếu bộ sưu tập, môi trường/dữ liệu, nhật ký bảng điều khiển và báo cáo HTML có cùng lần chạy.
- Ghi tên máy chủ, dấu thời gian, lệnh, mã thoát và phiên bản công cụ.
- Không chỉnh báo cáo gốc; tạo tệp phân tích riêng.
- Không suy ra header chỉ từ bộ sưu tập: bằng chứng chống gian lận cần ảnh chụp bảng điều khiển thực tế.

## Tóm tắt kết quả

Chép số liệu đúng cấp từ báo cáo (vòng lặp, yêu cầu, câu lệnh kiểm tra/ca kiểm thử). Nêu mẫu số rõ để tránh cộng lẫn yêu cầu và câu lệnh kiểm tra. Mọi số phải trỏ đến báo cáo/nhật ký; nếu chưa chạy, dùng `NOT EXECUTED`.

## Phân loại thất bại

- `LOI_CA_KIEM_THU`: câu lệnh kiểm tra/mã lệnh sai.
- `LOI_MOI_TRUONG`: SUT không sẵn sàng hoặc sai DNS/cổng/phụ thuộc/cấu hình.
- `LOI_DU_LIEU_HOAC_TRANG_THAI`: dữ liệu khởi tạo, quyền sở hữu, token hoặc điều kiện trạng thái sai.
- `LOI_CHUC_NANG_SUT`: kết quả thực tế trái FR/hợp đồng có nguồn.
- `LOI_BAO_MAT_SUT`: kết quả thực tế trái SEC hoặc quy tắc kiểm soát truy cập có nguồn.
- `KHOANG_TRONG_HOAC_MAU_THUAN_DAC_TA`: không có cơ sở xác định kết quả duy nhất.
- `CHUA_XAC_DINH`: chưa đủ bằng chứng.

Một câu lệnh kiểm tra thất bại không tự động là lỗi SUT. Muốn xác nhận lỗi phải có nguồn yêu cầu, yêu cầu tái hiện, kết quả mong đợi/thực tế, đường dẫn bằng chứng và kết quả chạy lại phù hợp. Nguyên nhân gốc chỉ là giả thuyết trừ khi mã nguồn/nhật ký chứng minh.

## Độ bao phủ

Đánh giá khả năng truy vết, không chỉ đếm ca:

- phân vùng miền cho mọi dữ liệu đầu vào;
- chuyển đổi trạng thái hợp lệ/không hợp lệ và trạng thái kết thúc khi áp dụng;
- SEC-01–SEC-07 áp dụng được, xác thực/vai trò/quyền sở hữu/tấn công chèn mã;
- trường/kiểu/tính bắt buộc của lược đồ có nguồn;
- so sánh ca do AI sinh với ca do con người bổ sung.

## Bằng chứng CI/CD và lỗi

- CI/CD cần quy trình/cấu hình, mã SHA commit thật, URL lần chạy thật, ảnh chụp màn hình và kết quả cho cả lần đạt toàn bộ lẫn lần có một ca thất bại.
- Lỗi cần báo cáo Markdown cục bộ, URL GitHub Issue và ảnh chụp gắn với vấn đề. Không coi bản nháp cục bộ là vấn đề đã xuất bản.

Kết luận bằng `ĐẠT`, `KHÔNG ĐẠT` hoặc `CHƯA ĐỦ CĂN CỨ` cho bằng chứng thực thi, đồng thời ghi riêng quyết định đánh giá của con người (`ĐANG CHỜ` cho đến khi con người xác nhận).
