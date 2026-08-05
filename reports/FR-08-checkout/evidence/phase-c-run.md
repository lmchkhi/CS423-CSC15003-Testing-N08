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
- Baseline từng tạo `test-results/.last-run.json` và 11 file `error-context.md`; thư mục runner cục bộ có thể bị lần chạy sau ghi đè.
- `test-results/` được thêm vào `.gitignore`; tóm tắt bền vững nằm trong file này.
- Không sửa assertion để làm SUT pass; 11 failure được giữ nguyên.

## Side effect và điều kiện trước Giai đoạn D

- Lần chạy tạo 13 user runtime role `user` và 13 order test; API công khai không có cleanup phù hợp.
- `DT-013` chứa SQL payload. Trước khi chạy lặp lại hoặc chạy đa trình duyệt ở Giai đoạn D, cần người dùng xác nhận rõ SUT localhost là môi trường test cô lập, không phải production.

## Rerun sau review Phase C — `05/08/2026 21:09`

### Refinement đã áp dụng

- Spec tính `expectedCartTotal` từ `fixture.product.price * fixture.product.quantity`; không còn hardcode `12_000_000` trong spec.
- Tách `CartItemDto` khỏi `ProductFixture` cho response `/api/cart`.
- Case reject vẫn giữ `responseOk: false`; dùng soft assertions để ghi đồng thời response không bị reject và order bị tạo, không suy đoán status `400`.
- Root-cause review được đưa vào annotation data-driven: `client-total-trusted`, `cart-not-cleared`, `empty-cart-checkout-accepted`, `default-address-not-used`.
- `DT-012` vẫn API-only trong FR-08.

### Lệnh và kết quả rerun

| Lệnh | Exit code | Kết quả thật |
| --- | ---: | --- |
| `npm run lint` | `0` | Pass |
| `npm run typecheck` | `0` | Pass |
| `npm run test:fr08 -- --workers=1 --reporter=list` | `1` | 15 failed do `ECONNREFUSED ::1:3000`; không case nào tới assertion nghiệp vụ |

Probe sau run:

- `GET http://localhost:3000/api/products` → `NO_RESPONSE`.
- `GET http://127.0.0.1:3000/api/products` → `NO_RESPONSE`.
- Phân loại: `environment issue` — backend không chạy; không phải test defect IPv6/baseURL.
- Kết quả baseline `4 passed / 11 failed` phía trên vẫn là kết quả nghiệp vụ gần nhất và không bị thay thế bởi rerun môi trường này.
- `test-results/` hiện phản ánh lần rerun gần nhất với 15 error context kết nối, không còn là artifact baseline 11 failure nghiệp vụ.
- Rerun không tạo user hoặc order vì mọi kết nối đều bị từ chối trước request đầu tiên.

## Rerun sau khi khởi động lại SUT — `05/08/2026 21:14`

### Kiểm tra môi trường

- `GET http://localhost:3000/api/products` → `200` JSON.
- `GET http://localhost:5173` → `200` HTML.
- `GET http://localhost:5174` → `200` HTML.

### Lệnh và kết quả thật

| Lệnh | Exit code | Kết quả |
| --- | ---: | --- |
| `npm run lint` | `0` | Pass |
| `npm run typecheck` | `0` | Pass |
| `npm run test:fr08 -- --workers=1 --reporter=list` | `1` | 15 test: 4 passed, 11 failed, 0 skipped |

- Pass: `DT-002`, `DT-003`, `DT-012` API-only, `DT-013`.
- Fail: `BVA-001`, `DT-001`, `DT-004`–`DT-011`, `DT-014`.
- `DT-010` ghi nhận đồng thời response thực tế `200` thay vì bị reject và order count tăng `1`.
- `DT-014` ghi nhận đồng thời response thực tế `200` thay vì bị reject và order count tăng `1`.
- Kết quả khớp baseline nghiệp vụ trước refinement; không phát hiện test defect mới và không cần sửa thêm fixture/spec.
- Lần chạy tạo thêm 13 user runtime role `user` và 13 order test; không có API cleanup phù hợp.
- `test-results/` hiện phản ánh 11 failure nghiệp vụ của lần chạy gần nhất.
- Expected đã duyệt được giữ nguyên; không hạ assertion để làm SUT pass.
