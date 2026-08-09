# Evidence — FR-08 Checkout UI refinement

## Thông tin lần chạy hiện hành

| Mục | Giá trị |
| --- | --- |
| Run by | `23127464` |
| Thời điểm report | `09/08/2026 19:23` |
| ISO runtime | `2026-08-09T12:23:00.611Z` |
| Phạm vi | 15 case HW02 API + 6 case UI data-driven |
| Project | Chromium, Firefox, Microsoft Edge |
| HTML report | `playwrite-test/FR-08-checkout/playwright-report/index.html` |

## Nội dung UI được bổ sung

Ba case UI cũ kiểm tra route authentication, product/total summary và hậu điều kiện backend cart. Human review bổ sung ba case độc lập:

1. `FR08-UI-README-004`: giỏ trống không được cung cấp checkout action, không gửi request và không tạo order;
2. `FR08-UI-README-005`: checkout từ UI phải lưu địa chỉ giao hàng mặc định của profile;
3. `FR08-UI-README-006`: sau checkout thành công, CartContext/DOM phải hiển thị giỏ rỗng.

Ba case mới ánh xạ lần lượt `BUG-FR08-005`, `BUG-FR08-004` và `BUG-FR08-002`; không tạo root cause hoặc bug report trùng.

## Lệnh và kết quả thật

| Lệnh | Exit code | Kết quả |
| --- | ---: | --- |
| `npm run lint` | `0` | Pass |
| `npm run typecheck` | `0` | Pass |
| `npx playwright test tests/FR-08-checkout-ui.spec.ts --list --reporter=list` | `0` | Collect đúng 18 lượt: 6 UI case × 3 project |
| UI smoke Chromium trước harness refinement | `1` | Phát hiện reload làm mất CartContext và user ID có thể kế thừa cart RAM cũ |
| UI smoke Chromium sau refinement | `1` | 0 passed, 6 SUT failures; cả sáu case đi tới oracle nghiệp vụ |
| Full run đầu trước API isolation refinement | `1` | 6 passed/57 failed; không dùng làm report cuối vì API case dừng ở stale-cart precondition |
| API smoke Chromium sau isolation refinement | `1` | 4 passed/11 SUT failures; khớp taxonomy lịch sử |
| `npm run test:fr08 -- --workers=1` — lần cuối | `1` | 63 executed; 12 passed, 51 failed, 0 skipped; report duration 160.7 giây |
| `scripts/redact-fr08-traces.ps1` | `0` | Quét 54 ZIP, chỉnh 9 ZIP và thay 30 giá trị nhạy cảm trước khi lưu artifact |

## Harness refinement

- SUT giữ cart trong process memory nhưng database có thể reset và tái sử dụng user ID. Cả hai spec nay chỉ nhận runtime user sau khi `GET /api/cart` xác nhận cart rỗng; expected nghiệp vụ không đổi.
- Case client-cart dùng navigation SPA từ Product Detail → Cart → Checkout. Không dùng `page.goto('/checkout')` sau khi thêm sản phẩm vì reload sẽ remount `CartProvider` và tạo pass giả.
- Product Detail hiện bỏ qua click Add to Cart đầu tiên. Helper setup chỉ click lần hai khi chưa thấy trạng thái `Đã thêm`, để defect ngoài FR-08 không chặn precondition.
- Sáu case UI bật manual trace và `video: retain-on-failure`; trace được dừng/đính kèm trong `finally` để failure vẫn giữ đầy đủ bằng chứng.
- Sau full run, `scripts/redact-fr08-traces.ps1` che JWT, email và password runtime trong cả runtime artifact lẫn bản ZIP đính kèm của HTML report. Scan hậu xử lý xác nhận mọi ZIP vẫn hợp lệ và không còn giá trị nhạy cảm.

## Kết quả theo project

| Project | API | UI | Tổng |
| --- | --- | --- | --- |
| Chromium | `4P/11F/0S` | `0P/6F/0S` | `4P/17F/0S` |
| Firefox | `4P/11F/0S` | `0P/6F/0S` | `4P/17F/0S` |
| Microsoft Edge | `4P/11F/0S` | `0P/6F/0S` | `4P/17F/0S` |
| **Tổng** | **12P/33F/0S** | **0P/18F/0S** | **12P/51F/0S** |

## Quan sát sáu UI case

| Case | Actual trên 3/3 project | Phân loại |
| --- | --- | --- |
| `FR08-UI-README-001` | Anonymous vẫn ở `/checkout`, không redirect `/login` | SUT defect — `BUG-FR08-006` |
| `FR08-UI-README-002` | Product backend không render; tổng hiện `0` và editable | SUT defects — `BUG-FR08-007/008` |
| `FR08-UI-README-003` | Checkout `200` và hiện thành công nhưng backend cart còn item | SUT defect — `BUG-FR08-002` |
| `FR08-UI-README-004` | Checkout action vẫn khả dụng; gửi 1 request và tạo thêm 1 order khi cart rỗng | SUT defect — `BUG-FR08-005` |
| `FR08-UI-README-005` | Profile setup thành công nhưng order từ UI lưu `shipping_address=null` | SUT defect — `BUG-FR08-004` |
| `FR08-UI-README-006` | Sau checkout, điều hướng SPA về Cart vẫn thấy sản phẩm; không có empty state | SUT defect — `BUG-FR08-002` |

Expected không bị hạ theo actual và không có environment failure trong run cuối.

## Kiểm chứng report và an toàn artifact

- Embedded `report.json`: total `63`, expected/passed `12`, unexpected/failed `51`, flaky `0`, skipped `0`.
- Metadata: `Run by: 23127464`, thời gian `09/08/2026 19:23`, ISO `2026-08-09T12:23:00.611Z`, `actualWorkers: 1`.
- Runtime artifact: 51 `error-context.md`, 18 screenshot, 18 video và 36 ZIP trace (18 file nguồn + 18 bản attachment).
- HTML report chứa 17 Markdown, 12 PNG, 18 WebM và 18 ZIP trace trong thư mục `data/`.
- Quét report: 0 runtime email, 0 runtime password, 0 JWT, 0 `Admin123!`, 0 `Test1234!`.
- Kiểm tra 18 ZIP trace trong report: 0 ZIP lỗi hoặc thiếu `trace.trace`.
- Firefox chạy đủ 21 case và tái hiện cùng `4P/17F/0S`; sandbox workaround không tạo environment failure.
