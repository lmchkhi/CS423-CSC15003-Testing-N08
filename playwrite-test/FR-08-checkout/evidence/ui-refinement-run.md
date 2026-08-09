# Evidence — FR-08 Checkout UI refinement

## Thông tin lần chạy

| Mục | Giá trị |
| --- | --- |
| Run by | `23127464` |
| Thời điểm chạy report cuối | `09/08/2026 15:32`; ISO runtime được giữ trong HTML report |
| Phạm vi | 15 case HW02 API đã duyệt + 3 case UI bổ sung từ README FR-08 |
| Trình duyệt/project | Chromium, Firefox, Microsoft Edge |
| HTML report | `playwrite-test/FR-08-checkout/playwright-report/index.html` |

## Căn cứ bổ sung UI automation

README của SUT mô tả bốn hành vi quan sát được tại FR-08: chỉ user đã đăng nhập được checkout; UI hiển thị đủ sản phẩm; tổng được tính từ giỏ và không chỉnh trực tiếp; checkout thành công phải xóa giỏ. Ba case bổ sung dùng `page`, DOM/URL/network assertion để kiểm tra các hành vi này. API chỉ được dùng để tạo user tạm, seed/đọc giỏ và kiểm tra hậu điều kiện; API setup không được tính là UI coverage.

`DT-012` vẫn thuộc bộ HW02 API-only: suite chỉ xác minh checkout API lưu/trả payload XSS như string và không kết luận về chống XSS khi render UI.

## Lệnh và kết quả thật

| Lệnh | Exit code | Kết quả |
| --- | ---: | --- |
| `npm run lint` | `0` | Pass |
| `npm run typecheck` | `0` | Pass |
| `npm run test:fr08:ui -- --list` | `0` | Collect đúng 9 lượt: 3 UI case × 3 project |
| `npm run test:fr08:ui -- --project=firefox --workers=1 --reporter=list` | `1` | 0 passed, 3 failed, 0 skipped; Firefox đã đi tới assertion SUT thật |
| `npm run test:fr08 -- --workers=1` | `1` | 12 passed, 42 failed, 0 skipped trên 54 lượt |

## Kết quả theo project

| Project | API | UI | Tổng | Exit code của full run |
| --- | --- | --- | --- | ---: |
| Chromium | `4P/11F/0S` | `0P/3F/0S` | `4P/14F/0S` | `1` |
| Firefox | `4P/11F/0S` | `0P/3F/0S` | `4P/14F/0S` | `1` |
| Microsoft Edge | `4P/11F/0S` | `0P/3F/0S` | `4P/14F/0S` | `1` |

## Quan sát UI hộp đen

| Case bổ sung | Kết quả thật trên 3/3 project | Phân loại |
| --- | --- | --- |
| `FR08-UI-README-001` | Truy cập `/checkout` khi chưa đăng nhập vẫn ở trang checkout, không chuyển `/login` | SUT deviation |
| `FR08-UI-README-002` | Heading có hiển thị; sản phẩm trong backend cart không xuất hiện; input tổng có giá trị `0` và chỉnh được thay vì `12000000` chỉ đọc | SUT deviation |
| `FR08-UI-README-003` | Click UI thật gửi `POST /api/checkout` và nhận `200`, thông báo thành công hiển thị; backend cart vẫn còn 1 item | SUT deviation, cùng root cause xóa giỏ của `DT-001/DT-015` |

Expected của bộ HW02 và ba requirement README không bị hạ theo hành vi SUT. Không sửa assertion để làm test pass.

## Firefox và an toàn artifact

Firefox bundled có thể launch nhưng `browserContext.newPage()` lỗi với sandbox mặc định trên máy test Windows này. Probe tối thiểu xác nhận việc tắt content/GPU/media sandbox trong riêng project Firefox giúp tạo page và điều hướng được; sau cấu hình, cả ba case Firefox đều chạy đến assertion nghiệp vụ thật. Đây là test-environment fix, không phải sửa expected.

SUT render cả hai input login dưới dạng `type="text"`. UI spec đổi riêng kiểu hiển thị hai input thành `password` trước khi fill để video không hiện runtime identity/credential; dữ liệu submit không đổi. Video dùng `retain-on-failure`. Trace thủ công bắt đầu sau authentication, được đính kèm vào HTML report, rồi các giá trị runtime còn xuất hiện trong ZIP được thay bằng placeholder trước khi public.

Report hiện hành có 9 screenshot lỗi, 14 error-context Markdown duy nhất, 9 video WEBM và 9 trace ZIP. Quét lại nội dung toàn bộ trace sau redaction cho kết quả 0 runtime email, 0 runtime password và 0 JWT match. Trace/video không bị loại khỏi report.

## Kiểm chứng HTML report thật

Report được phục vụ bằng `npx playwright show-report` và mở bằng Chromium. Nội dung nhìn thấy trực tiếp:

- `All 54`, `Passed 12`, `Failed 42`, `Flaky 0`, `Skipped 0`;
- `Run by: 23127464`;
- runtime `09/08/2026 15:32`, kèm ISO runtime trong HTML report;
- case `FR08-UI-README-001` và đủ project `chromium`, `firefox`, `msedge`.
- trang chi tiết case UI hiển thị cả attachment `Trace` và `Video`.
