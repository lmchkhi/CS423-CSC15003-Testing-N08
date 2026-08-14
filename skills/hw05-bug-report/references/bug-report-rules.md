# Bug Report Rules

## Severity / Priority

- `Critical / P0`: crash, mất dữ liệu, bypass bảo mật, không thể tiếp tục bài test.
- `Critical / P1`: lỗi nghiêm trọng ở workflow chính nhưng có workaround.
- `Major / P1`: checkout/cart/login/search fail ổn định hoặc sai đặc tả quan trọng.
- `Major / P2`: performance issue rõ, p95/error rate vượt ngưỡng với evidence.
- `Minor / P3`: lỗi wording/UI/evidence phụ không chặn workflow chính.

## Module gợi ý cho HW05

- `Auth`: login, lockout, token.
- `Catalog`: categories, product search, product detail.
- `Cart`: add/get/update cart.
- `Checkout`: order creation.
- `Performance`: latency, throughput, timeout, crash under load.
- `Test Data`: chỉ dùng nếu lỗi liên quan seed/setup; thường không tạo bug SUT.

## Không tạo bug report khi

- Request bị sandbox Codex chặn với `Operation not permitted`.
- Backend chưa chạy hoặc sai port.
- CSV dùng account trùng làm giỏ hàng tranh chấp.
- Account bị khóa vì test gửi sai password.
- JMeter plan sai header/token/payload.

Với các trường hợp này, ghi vào evidence notes hoặc AI audit thay vì bug report.
