# Giao thức thực thi Newman

Chỉ chạy khi người dùng yêu cầu thực thi hoặc việc chạy nằm rõ trong phạm vi giao. Không sửa SUT chỉ để làm ca kiểm thử đạt.

## Trước khi chạy

- Ghi phiên bản của Node, Newman và trình tạo báo cáo.
- Xác minh SUT đang chạy và URL cơ sở trỏ đúng môi trường triển khai.
- Xác minh bộ sưu tập/tệp môi trường/tệp dữ liệu đúng API và không chứa bí mật cần che.
- Xác minh mã lệnh chạy trước yêu cầu ở cấp bộ sưu tập đặt `X-Student-Id` từ biến đã biết.
- Xác minh dữ liệu/trạng thái kiểm thử và chiến lược dọn dẹp/khởi tạo lại dữ liệu.
- Tạo đường dẫn kết quả mới; không ghi đè bằng chứng thất bại.

## Lệnh mẫu

Chọn trình tạo báo cáo thực sự đã cài. Ví dụ với `newman-reporter-htmlextra`:

```powershell
newman run <collection.json> -e <environment.json> -d <data.json> `
  --reporters cli,htmlextra `
  --reporter-htmlextra-export <report.html>
```

Nếu dùng trình tạo báo cáo `html`, kiểm tra gói và dùng tùy chọn đúng của trình đó. Không tuyên bố báo cáo HTML đã tạo chỉ dựa trên lệnh dự kiến.

## Bằng chứng cần giữ

- Lệnh nguyên văn, dấu thời gian, thư mục làm việc và mã thoát.
- Bộ sưu tập/môi trường/dữ liệu đã dùng.
- Kết quả bảng điều khiển nguyên vẹn và báo cáo HTML.
- URL cơ sở/tên máy chủ quan sát được trong kết quả yêu cầu.
- Tổng số vòng lặp, yêu cầu, mã lệnh kiểm thử/câu lệnh kiểm tra, đạt/không đạt/bỏ qua và thời lượng lấy từ báo cáo.
- Ảnh chụp bảng điều khiển cho thấy `X-Student-Id`; ảnh này phải là bằng chứng thật do con người chụp.

Tên máy chủ phải khớp môi trường triển khai đã khai báo; `localhost` và `127.0.0.1` được đề chấp nhận. Nếu báo cáo không cho kiểm tra tên máy chủ hoặc header, kết luận bằng chứng là `INCONCLUSIVE`, không tự coi là hợp lệ.

## Sau khi chạy

Giữ thất bại nguyên trạng, phân tích theo `evidence-analysis.md`, rồi bàn giao với trạng thái `CHỜ CON NGƯỜI ĐÁNH GIÁ`. Có thể tiếp tục API kế tiếp nếu nó nằm trong phạm vi người dùng đã yêu cầu.
