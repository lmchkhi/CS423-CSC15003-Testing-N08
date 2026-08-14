# CLI Evidence Workflow

## Kiểm tra môi trường

Chạy các lệnh đọc-only trước khi chạy test:

```bash
java -version
jmeter -v
curl -s http://localhost:3000/api/products
```

Nếu backend chưa chạy, báo người dùng khởi động SUT theo repo. Không sửa code backend/frontend.

## Hardware evidence trên macOS

Gợi ý lấy thông tin text để đưa vào spec table:

```bash
system_profiler SPHardwareDataType
sysctl -n machdep.cpu.brand_string
sysctl -n hw.memsize
```

Chụp screenshot Activity Monitor hoặc `htop` trong lúc JMeter đang chạy. Đề cần tool và resource monitor trong cùng frame; ưu tiên sắp hai cửa sổ cạnh nhau.

## Lệnh JMeter non-GUI

Mẫu:

```bash
jmeter -n -t <plan.jmx> -l <result.jtl> -e -o <html-output-dir>
```

Quy tắc:

- Xóa hoặc đổi tên HTML output cũ trước khi chạy lại.
- Không ghi đè `.jtl` chính thức; thêm timestamp hoặc scenario rerun nếu phải chạy lại.
- Lưu stdout/stderr nếu có warning hoặc error.
- Sau mỗi run, kiểm tra `.jtl` có sample và HTML report sinh thành công.

## Lưu ý khi Codex smoke test API

Trong sandbox của Codex, request localhost có `Authorization: Bearer <token>` có
thể bị chặn với lỗi `Operation not permitted`. Khi đó, chạy lại bằng quyền ngoài
sandbox nếu người dùng cho phép. Không ghi nhận lỗi này là lỗi SUT; xác nhận lại
bằng cURL/JMeter thật trên máy local.

## Ghi chú evidence

Mỗi scenario nên có một file note ngắn:

```text
Scenario:
Plan:
JTL:
HTML report:
Start/end time:
Threads/ramp-up/duration:
Observed CPU/RAM:
Account lockout/reset:
Issue observed:
Decision for report:
```

## Reset lockout

Theo đặc tả FR-02, login sai 3 lần khóa 30 giây trong môi trường demo. Nếu gặp lockout:

- Dừng run nếu lỗi làm sai metric.
- Đợi ít nhất 30 giây hoặc reset dữ liệu nếu repo có script seed/reset.
- Ghi rõ thao tác trong notes và không trộn run lỗi dữ liệu vào kết quả chính thức.
