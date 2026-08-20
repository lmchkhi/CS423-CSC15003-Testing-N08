# Giao thức thực thi Newman

Chỉ chạy khi người dùng yêu cầu execution hoặc việc chạy nằm rõ trong phạm vi giao. Không sửa SUT chỉ để làm test pass.

## Trước khi chạy

- Ghi versions của Node, Newman và reporter.
- Xác minh SUT đang chạy và base URL trỏ đúng deployment.
- Xác minh collection/environment/data file đúng API và không chứa secret cần che.
- Xác minh collection-level pre-request script đặt `X-Student-Id` từ biến đã biết.
- Xác minh test data/state và cleanup/reseed strategy.
- Tạo đường dẫn output mới; không ghi đè failed evidence.

## Lệnh mẫu

Chọn reporter thực sự đã cài. Ví dụ với `newman-reporter-htmlextra`:

```powershell
newman run <collection.json> -e <environment.json> -d <data.json> `
  --reporters cli,htmlextra `
  --reporter-htmlextra-export <report.html>
```

Nếu dùng reporter `html`, kiểm tra package và dùng option đúng của reporter đó. Không tuyên bố HTML report đã tạo chỉ dựa trên command dự kiến.

## Evidence cần giữ

- Command nguyên văn, timestamp, working directory và exit code.
- Collection/environment/data đã dùng.
- Console output nguyên vẹn và HTML report.
- Base URL/hostname quan sát được trong request output.
- Tổng iterations, requests, test scripts/assertions, passed/failed/skipped và duration lấy từ report.
- Screenshot console cho thấy `X-Student-Id`; screenshot này phải là evidence thật do human capture.

Hostname phải khớp deployment đã khai báo; `localhost` và `127.0.0.1` được đề chấp nhận. Nếu report không cho kiểm tra hostname hoặc header, kết quả evidence là `INCONCLUSIVE`, không tự coi là hợp lệ.

## Sau khi chạy

Giữ failure nguyên trạng, phân tích theo `evidence-analysis.md`, rồi bàn giao `PENDING HUMAN REVIEW`. Có thể tiếp tục API kế tiếp nếu nó nằm trong phạm vi người dùng đã yêu cầu.
