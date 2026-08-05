# FR-08 Phase C — Automation run evidence

- Thời điểm hiển thị: `05/08/2026 12:37`
- SUT API: `http://localhost:3000`
- Runner: Playwright Test `1.62.1`, API request fixture, `1` worker
- Không browser nào được khởi chạy ở Giai đoạn C.
- Credential và JWT runtime không được ghi vào fixture, log tóm tắt hoặc report này.

## Lệnh và exit code

| Lệnh | Exit code | Kết quả |
| --- | ---: | --- |
| `npm install --offline --ignore-scripts` | `1` | `ENOTCACHED`; cache thiếu metadata dependency |
| `npm install --ignore-scripts` | `0` | Cài 120 package; audit 121 package; 0 vulnerability |
| `npm run lint` | `0` | ESLint không báo lỗi |
| `npm run typecheck` | `0` | TypeScript `--noEmit` không báo lỗi |
| `npm run test:fr08 -- --workers=1 --reporter=list` | `1` | 15 test: 4 passed, 11 failed, 0 skipped |
| `npm run lint` (sau chỉnh harness) | `0` | Không báo lỗi |
| `npm run typecheck` (sau chỉnh harness) | `0` | Không báo lỗi |

## Kết quả theo case

| ID | Kết quả runner | Assertion chính / actual |
| --- | --- | --- |
| `TC-FR08-BVA-001` | failed | Expected tổng `12000000`; nhận `-1` |
| `TC-FR08-DT-001` | failed | Expected giỏ sau checkout `0`; nhận `1` |
| `TC-FR08-DT-002` | passed | Thiếu token trả `401` |
| `TC-FR08-DT-003` | passed | Invalid token trả `403` |
| `TC-FR08-DT-004` | failed | Expected tổng `12000000`; nhận `1` |
| `TC-FR08-DT-005` | failed | Expected tổng `12000000`; nhận `0` |
| `TC-FR08-DT-006` | failed | Expected tổng `12000000`; nhận `-50000` |
| `TC-FR08-DT-007` | failed | Expected tổng `12000000`; nhận `99999999` |
| `TC-FR08-DT-008` | failed | Expected tổng `12000000`; nhận `null` |
| `TC-FR08-DT-009` | failed | Expected tổng `12000000`; nhận string `NaN` |
| `TC-FR08-DT-010` | failed | Expected checkout bị reject; response `ok=true` |
| `TC-FR08-DT-011` | failed | Expected địa chỉ mặc định; nhận `null` |
| `TC-FR08-DT-012` | passed | API lưu/trả payload XSS như string theo phạm vi API-only đã duyệt |
| `TC-FR08-DT-013` | passed | SQL payload lưu plain text; orders API tiếp tục `200` |
| `TC-FR08-DT-014` | failed | Expected checkout bị reject; response `ok=true` |

## Nhóm assertion đã thực thi

| Nhóm | Ví dụ đã chạy |
| --- | --- |
| Network / response | Status register/login/cart/checkout/order/orders API |
| Count / aggregate | Số item giỏ, tổng giỏ `12000000`, số order trước/sau |
| State / attribute | `order.status`, `total_amount`, `shipping_address` |

## Test harness và artifact

- Fixture runtime validation xác nhận đúng 15 ID độc lập, duy nhất, nguồn `HW02`.
- Cấu hình serial fail-fast được loại trước lần chạy thật để lỗi đầu không làm skip case sau.
- Runner artifact cục bộ: `test-results/.last-run.json` và 11 file `error-context.md` tương ứng 11 failure.
- `test-results/` được thêm vào `.gitignore`; tóm tắt bền vững nằm trong file này.
- Không sửa assertion để làm SUT pass; 11 failure được giữ nguyên.

## Side effect và điều kiện trước Giai đoạn D

- Lần chạy tạo 13 user runtime role `user` và 13 order test; API công khai không có cleanup phù hợp.
- `DT-013` chứa SQL payload. Trước khi chạy lặp lại hoặc chạy đa trình duyệt ở Giai đoạn D, cần người dùng xác nhận rõ SUT localhost là môi trường test cô lập, không phải production.
