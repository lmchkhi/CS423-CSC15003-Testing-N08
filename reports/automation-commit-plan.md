# Kế hoạch commit automation cho FR-11 và FR-14

## 1. Mục tiêu

Hiện tại đã có 2 commit được tính cho HW04. Cần thêm 6 commit có thay đổi thực sự vào test script hoặc các file liên quan trực tiếp đến automation. Giảng viên đã bỏ yêu cầu trải qua 4 ngày, nên kế hoạch tập trung vào lịch sử commit có ý nghĩa kỹ thuật và có thể giải trình khi vấn đáp.

Hai feature còn lại:

- FR-11: Order history view (user)
- FR-14: Category management (CRUD)

Nguyên tắc chia commit:

- Mỗi commit phải có thay đổi vào test script, ưu tiên `.spec.ts`, để sát yêu cầu đề.
- Data-driven test data đặt ở file `.json` riêng trong `tests/automation/data`.
- Mỗi đợt có thể sinh report nhỏ hoặc report đầy đủ tùy mức hoàn thiện.
- Bug report và GitHub Issue chỉ tạo khi lỗi đã reproduce ổn định, tránh tạo issue quá sớm.
- Main report cập nhật dần sau mỗi đợt để ghi lại review, test coverage, lỗi thật và giới hạn còn lại.

## 2. Cấu trúc artifact dự kiến

Test script:

- `tests/automation/specs/fr11-order-history.spec.ts`
- `tests/automation/specs/fr14-category-management.spec.ts`

Test data:

- `tests/automation/data/fr11-order-history.json`
- `tests/automation/data/fr14-category-management.json`

Reports:

- `reports/html/fr11-order-history/{chromium,firefox,webkit}/hw04-report.html`
- `reports/html/fr14-category-management/{chromium,firefox,webkit}/hw04-report.html`
- `reports/results/fr11-order-history/{chromium,firefox,webkit}/results.json`
- `reports/results/fr14-category-management/{chromium,firefox,webkit}/results.json`

Bug reports:

- `bug-reports/automation/BUG-FR11-AUTO-*.md`
- `bug-reports/automation/BUG-FR14-AUTO-*.md`

Main report:

- `reports/main-report.md`

## 3. Commit plan tổng quan

| Commit | Feature | Đợt | Mục tiêu chính | Test script bắt buộc thay đổi |
| --- | --- | --- | --- | --- |
| Commit 3 | FR-11 | Đợt 1 | Baseline + smoke + access control | `fr11-order-history.spec.ts` |
| Commit 4 | FR-11 | Đợt 2 | Mở rộng ownership, detail, display fields | `fr11-order-history.spec.ts` |
| Commit 5 | FR-11 | Đợt 3 | Full suite + 3 browser + bug report + main report | `fr11-order-history.spec.ts` |
| Commit 6 | FR-14 | Đợt 1 | Baseline admin/guest/user access + list | `fr14-category-management.spec.ts` |
| Commit 7 | FR-14 | Đợt 2 | Create/update validation + BVA name length | `fr14-category-management.spec.ts` |
| Commit 8 | FR-14 | Đợt 3 | Delete/API authorization + full 3 browser + bug report + main report | `fr14-category-management.spec.ts` |

## 4. FR-11 - Order History

### Commit 3 - FR-11 đợt 1: baseline, smoke, access control

Mục tiêu:

- Tạo file data và spec đầu tiên cho FR-11.
- Chạy một subset nhỏ để kiểm tra locator, login flow, API setup và report Playwright.
- Chứng minh test script bắt đầu từ các luồng quan trọng nhất.

Test case chọn:

| Test case | Lý do chọn |
| --- | --- |
| TC-FR11-DT-001 | Positive smoke: user đăng nhập và có đơn hàng xem được lịch sử |
| TC-FR11-DT-002 | Access control: guest bị chặn khỏi lịch sử đơn hàng |
| TC-FR11-DT-003 | Empty state: user chưa có đơn hàng |
| TC-FR11-BVA-001 | Boundary min count: 0 đơn hàng |
| TC-FR11-BVA-002 | Boundary min + 1: đúng 1 đơn hàng |

Việc cần làm:

- Tạo `tests/automation/data/fr11-order-history.json`.
- Tạo `tests/automation/specs/fr11-order-history.spec.ts`.
- Viết helper black-box cho login/user setup/order setup nếu API cho phép.
- Chạy smoke trên Chromium trước.
- Sinh report: `reports/html/fr11-order-history/chromium/hw04-report.html`.
- Cập nhật `reports/main-report.md` phần FR-11 initial coverage.

Commit message gợi ý:

```text
test(fr11): add order history baseline automation cases
```

### Commit 4 - FR-11 đợt 2: ownership, detail, display fields

Mục tiêu:

- Mở rộng suite để kiểm tra quyền sở hữu đơn hàng và thông tin hiển thị.
- Bổ sung assertion patterns: URL/navigation, text/content, API status/body, list count.

Test case chọn:

| Test case | Lý do chọn |
| --- | --- |
| TC-FR11-DT-004 | User có nhiều đơn hàng |
| TC-FR11-DT-005 | Không hiển thị đơn hàng của user khác |
| TC-FR11-DT-006 | Xem chi tiết đơn hàng của chính user |
| TC-FR11-DT-007 | Từ chối truy cập chi tiết đơn hàng của user khác |
| TC-FR11-DT-008 | Hiển thị mã đơn hàng |
| TC-FR11-DT-009 | Hiển thị ngày đặt |
| TC-FR11-DT-010 | Hiển thị tổng tiền |

Việc cần làm:

- Bổ sung test data cho user A/user B và nhiều đơn hàng.
- Mở rộng `fr11-order-history.spec.ts` bằng các nhóm test ownership/detail/display.
- Chạy lại trên Chromium.
- Nếu lỗi ổn định, tạo bug report tạm cho FR-11 trong `bug-reports/automation`.
- Cập nhật `reports/main-report.md` phần AI review/fixes cho FR-11.

Commit message gợi ý:

```text
test(fr11): expand order ownership and display assertions
```

### Commit 5 - FR-11 đợt 3: full suite, 3 browser, bug reports

Mục tiêu:

- Hoàn thiện FR-11 đạt tối thiểu 12 test case.
- Chạy đủ Chromium, Firefox, WebKit.
- Chốt bug reports/GitHub issues cho lỗi thật.

Test case chọn thêm:

| Test case | Lý do chọn |
| --- | --- |
| TC-FR11-DT-011 | Dịch trạng thái đơn hàng sang tiếng Việt rõ ràng |
| TC-FR11-DT-012 | Phân biệt trạng thái đơn hàng bằng màu sắc |
| TC-FR11-BVA-003 | Boundary representative: nhiều đơn hàng |

Tổng coverage FR-11 sau đợt 3:

- Domain testing: TC-FR11-DT-001 đến TC-FR11-DT-012
- Boundary value analysis: TC-FR11-BVA-001 đến TC-FR11-BVA-003
- Tổng: 15 test case

Việc cần làm:

- Hoàn thiện data-driven dispatch trong `fr11-order-history.spec.ts`.
- Chạy full suite trên 3 browser.
- Tạo wrapper report có `Run by: 23127475` cho từng browser.
- Chạy script verify report labels.
- Tạo/cập nhật `BUG-FR11-AUTO-*.md`.
- Tạo GitHub Issues cho bug đã có evidence screenshot.
- Điền link issue và summary vào `reports/main-report.md`.
- Ghi AI audit entry cho toàn bộ FR-11.

Commit message gợi ý:

```text
test(fr11): complete cross-browser order history suite
```

## 5. FR-14 - Category Management

### Commit 6 - FR-14 đợt 1: baseline admin access và authorization

Mục tiêu:

- Tạo skeleton FR-14 và kiểm tra các luồng quyền truy cập cốt lõi.
- Vì FR-14 thuộc admin web, cần phân biệt admin/guest/user thường.

Test case chọn:

| Test case | Lý do chọn |
| --- | --- |
| TC-FR14-DT-001 | Admin xem danh sách danh mục |
| TC-FR14-DT-002 | Guest bị chặn khỏi màn hình quản lý danh mục |
| TC-FR14-DT-003 | User thường bị chặn khỏi màn hình quản lý danh mục |
| TC-FR14-DT-004 | Guest không được thêm danh mục qua API |
| TC-FR14-DT-005 | User thường không được thêm danh mục qua API |
| TC-FR14-BVA-006 | Danh sách có nhiều danh mục |

Việc cần làm:

- Tạo `tests/automation/data/fr14-category-management.json`.
- Tạo `tests/automation/specs/fr14-category-management.spec.ts`.
- Viết helper admin login và API request black-box theo `api_specification.md`.
- Chạy Chromium subset.
- Sinh report Chromium.
- Cập nhật `reports/main-report.md` phần FR-14 initial coverage.

Commit message gợi ý:

```text
test(fr14): add category management access baseline
```

### Commit 7 - FR-14 đợt 2: create/update validation và BVA tên danh mục

Mục tiêu:

- Mở rộng CRUD phần create/update.
- Bổ sung BVA cho độ dài tên danh mục.
- Tăng số lượng test lên vượt mốc 12 hoặc gần đủ 12 trước full run.

Test case chọn:

| Test case | Lý do chọn |
| --- | --- |
| TC-FR14-DT-006 | Admin thêm danh mục với tên hợp lệ |
| TC-FR14-DT-007 | Admin thêm danh mục với tên rỗng |
| TC-FR14-DT-008 | Admin thêm danh mục với tên chỉ gồm khoảng trắng |
| TC-FR14-DT-009 | Admin thêm danh mục với tên Unicode tiếng Việt |
| TC-FR14-DT-010 | Admin cập nhật tên danh mục tồn tại |
| TC-FR14-DT-011 | Admin cập nhật danh mục với tên rỗng |
| TC-FR14-DT-012 | Admin cập nhật danh mục không tồn tại |
| TC-FR14-BVA-001 | Tên danh mục dài 0 ký tự |
| TC-FR14-BVA-002 | Tên danh mục dài 1 ký tự |
| TC-FR14-BVA-003 | Tên danh mục dài 2 ký tự |

Việc cần làm:

- Bổ sung data create/update/BVA vào JSON.
- Mở rộng spec bằng helper tạo category có tên unique theo run id.
- Chạy lại Chromium.
- Nếu lỗi validation ổn định, tạo bug report automation cho FR-14.
- Cập nhật main report với phần AI review: selector, data cleanup, API/UI boundary.

Commit message gợi ý:

```text
test(fr14): cover category create update validation
```

### Commit 8 - FR-14 đợt 3: delete, list boundaries, full cross-browser

Mục tiêu:

- Hoàn thiện full FR-14 với delete, authorization còn lại và list boundary.
- Chạy đủ 3 browser.
- Chốt bug reports/GitHub issues.

Test case chọn thêm:

| Test case | Lý do chọn |
| --- | --- |
| TC-FR14-DT-013 | User thường không được cập nhật danh mục qua API |
| TC-FR14-DT-014 | Admin xóa danh mục tồn tại |
| TC-FR14-DT-015 | Admin xóa danh mục không tồn tại hoặc đã bị xóa |
| TC-FR14-DT-016 | User thường không được xóa danh mục qua API |
| TC-FR14-BVA-004 | Danh sách có 0 danh mục |
| TC-FR14-BVA-005 | Danh sách có đúng 1 danh mục |

Tổng coverage FR-14 sau đợt 3:

- Domain testing: TC-FR14-DT-001 đến TC-FR14-DT-016
- Boundary value analysis: TC-FR14-BVA-001 đến TC-FR14-BVA-006
- Tổng: 22 test case

Việc cần làm:

- Hoàn thiện data-driven dispatch trong `fr14-category-management.spec.ts`.
- Chạy full suite trên Chromium, Firefox, WebKit.
- Tạo wrapper report có `Run by: 23127475` cho từng browser.
- Chạy script verify report labels.
- Tạo/cập nhật `BUG-FR14-AUTO-*.md`.
- Tạo GitHub Issues cho bug thật có evidence screenshot.
- Điền link issue và tổng kết vào `reports/main-report.md`.
- Ghi AI audit entry cho toàn bộ FR-14.

Commit message gợi ý:

```text
test(fr14): complete category CRUD cross-browser suite
```

## 6. Quy tắc tạo bug report và GitHub Issue

Không tạo bug report chỉ vì test fail do script chưa ổn định. Chỉ tạo bug report khi thỏa cả 4 điều kiện:

1. Test case map được về requirement hoặc manual test case rõ ràng.
2. Fail reproduce được ít nhất trên Chromium; nếu có thể thì xác nhận thêm Firefox/WebKit.
3. Có evidence: HTML report, screenshot hoặc `error-context.md`.
4. Actual result khác expected result từ SRS/manual test, không phải lỗi setup dữ liệu.

Thời điểm tạo GitHub Issue:

- FR-11: ưu tiên sau Commit 4 hoặc Commit 5.
- FR-14: ưu tiên sau Commit 7 hoặc Commit 8.
- Nếu lỗi nghiêm trọng xuất hiện sớm, có thể tạo issue ngay trong đợt đó nhưng cần update issue sau full cross-browser.

## 7. Checklist cho từng đợt commit

Trước mỗi commit:

- Có thay đổi vào `.spec.ts` hoặc file test script tương đương.
- Có data mới hoặc data được cập nhật trong `.json` nếu thêm case.
- Đã chạy subset/full suite tương ứng.
- Report HTML đã được sinh và có wrapper `Run by: 23127475`.
- Nếu có bug thật, đã tạo/cập nhật bug report Markdown.
- `reports/main-report.md` đã cập nhật phần coverage/result/review.
- `reports/ai-audit-report.md` đã ghi interaction nếu dùng AI trong đợt đó.

Sau mỗi commit:

- Ghi lại hash commit vào file git log hoặc main report.
- Kiểm tra commit không chỉ thay README/PDF.
- Nếu commit tạo issue GitHub, ghi lại issue link vào bug report và main report.

## 8. Câu chuyện giải trình khi vấn đáp

Có thể giải thích ngắn gọn như sau:

```text
Em chia mỗi feature thành 3 vòng vì automation được phát triển tăng dần: vòng đầu dựng baseline và smoke để kiểm tra flow chính; vòng hai mở rộng negative/BVA và sửa các điểm AI sinh chưa ổn; vòng ba chạy full suite trên 3 browser, chốt report và bug evidence. Mỗi commit đều có thay đổi vào test script hoặc data/report liên quan trực tiếp đến automation, nên lịch sử commit phản ánh quá trình review và hoàn thiện test chứ không phải chia nhỏ hình thức.
```
