# Phase C — Fix 2 loading synchronization và UI evidence

Thời điểm hoàn tất: `2026-08-08T22:26:06.4029890+07:00`.

## Phạm vi giữ nguyên

- Đủ 12 TC-ID và expected Phase B; không nới assertion theo actual SUT.
- DT-002 dùng `Iphone`; DT-011 = h1; DT-012 = format giá.
- UI là oracle chính cho cả 12 case; network chỉ hỗ trợ DT-001, DT-004, DT-006, DT-007, DT-009 và DT-010; không có API-only.
- Chỉ chạy Chromium baseline, 1 worker; không chạy Firefox/Edge và không kết luận Phase D.

## DT-010 synchronization đã hoàn thiện

1. Đăng ký `page.route` trước `page.goto`.
2. Route handler tăng intercept count, ghi URL request và giữ `route.continue()` sau release gate.
3. Test đợi promise intercepted rồi xác nhận count > 0 và URL khớp request sản phẩm.
4. Khởi tạo `page.waitForResponse` trước khi release.
5. Trong pending: attach screenshot full-page trước assertion, assert product heading count = 0 và loading indicator visible qua role/text/CSS DOM fallback.
6. Release gate idempotent được gọi trong `finally`; một `finally` ngoài cũng release và `unroute`, nên assertion/screenshot lỗi không làm treo test.
7. Sau response: kiểm tra product list xuất hiện, attach screenshot, kiểm tra status và loading indicator hidden.
8. `synchronizationStatus` đã đổi từ provisional thành `complete-phase-c`; `fix2Backlog` đã bị xóa khỏi fixture.

Quan sát thật: screenshot pending có 0 product card và không có loading indicator. Sau release, screenshot có 5 product card. DT-010 vẫn failed đúng expected vì assertion loading visible không đạt; flow vẫn tiếp tục đến evidence sau response và không treo.

## UI evidence inventory

Helper dùng `page.screenshot({ fullPage: true, path })` và `testInfo.attach`. Tên attachment chứa TC-ID và trạng thái, đường dẫn nằm trong output riêng của từng test nên không ghi đè giữa các case.

| TC-ID | Attachment state |
| --- | --- |
| DT-001 | `results-after-empty-search` |
| DT-002 | `results-after-valid-search` |
| DT-003 | `no-results-state` |
| DT-004 | `special-characters-result` |
| DT-005 | `whitespace-result` |
| DT-006 | `after-xss-payload` |
| DT-007 | `after-sql-injection-payload` |
| DT-008 | `grid-desktop`, `grid-narrow` |
| DT-009 | `product-cards` |
| DT-010 | `loading-pending`, `products-after-response` |
| DT-011 | `h1-headings` |
| DT-012 | `product-card-prices` |

Có 14 attachment logic phủ 12/12 TC-ID. Playwright giữ cả file screenshot nguồn và bản copy attachment, tạo 28 custom PNG vật lý. Cộng thêm 8 screenshot failure mặc định: tổng 36 PNG, 8 video và 8 `error-context.md` trong `test-results/fr05-phase-c-fix2/`.

## XSS và SQL injection

- DT-006 đăng ký `dialog` và `pageerror` listener trước navigation/submit. DOM `script` được duyệt qua CSS locator và so sánh outerHTML/text với payload; code không evaluate/execute payload. Screenshot được attach trước status/raw-error assertions. Response body chỉ được đọc để ghi diagnostic boolean/length, không thay UI/DOM oracle và không ghi raw body vào report.
- DT-007 dùng baseline product names/count và result product names/count trên UI, cùng empty-state locator, làm oracle. Response status/body count chỉ là bằng chứng network bổ trợ. Screenshot được attach trước các assertion có thể fail.

## Lệnh và kết quả thật

### Lượt phát hiện lỗi lưu attachment

| Command | Exit code | Kết quả | Thời lượng runner |
| --- | ---: | --- | ---: |
| `npm run lint` | 0 | Không lỗi | — |
| `npm run typecheck` | 0 | Không lỗi | — |
| `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c-fix2 --workers=1` | 1 | 4 passed, 8 failed, 0 skipped | 43.4 giây |

Attachment body xuất hiện trong `testInfo` nhưng reporter list không giữ custom PNG trên đĩa. Helper được sửa để screenshot vào `testInfo.outputPath` rồi attach chính file đó; không đổi expected/assertion nghiệp vụ.

### Baseline cuối sau sửa artifact

| Command | Exit code | Kết quả | Thời lượng runner |
| --- | ---: | --- | ---: |
| `npm run lint` | 0 | Không lỗi | — |
| `npm run typecheck` | 0 | Không lỗi | — |
| `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c-fix2 --workers=1` | 1 | 4 passed, 8 failed, 0 skipped | 40.4 giây |

Passed: DT-001, DT-002, DT-005, DT-008. Failed: DT-003, DT-004, DT-006, DT-007, DT-009, DT-010, DT-011, DT-012.

So với Fix 1: kết quả giữ nguyên **4 passed, 8 failed, 0 skipped**. Không có thay đổi nghiệp vụ cần phân tích; Fix 2 chỉ sửa synchronization/evidence. DT-007 có thêm assertion UI product names và vẫn failed vì names sau payload đúng bằng toàn bộ baseline.

## Quét an toàn artifact

- Quét 9 file text (`.md/.txt/.json/.log`) trong output theo các pattern password, authorization, bearer, API key, secret, access/refresh token, session và cookie: 0 match.
- Quét tên file theo cùng nhóm pattern: 0 match.
- Cặp ảnh DT-010 pending/sau response đã được mở kiểm tra trực quan; chỉ chứa UI công khai của SUT. Các evidence khác chỉ thao tác UI công khai và payload kiểm thử đã duyệt; không dùng credential.
- `waitForTimeout`: 0 match trong spec. `provisional`: 0 match trong fixture/spec.

Checkpoint C đang chờ người dùng review. Chưa chuyển Phase D.
