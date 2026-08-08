# Phase C Run Evidence — FR-05 Search

## Phạm vi

- Feature: `FR-05 — Xem danh sách & Tìm kiếm sản phẩm`.
- Spec: `tests/fr05-search.spec.ts`.
- Browser baseline: Chromium project, 1 worker.
- Frontend: `http://localhost:5173`.
- API hỗ trợ: `http://localhost:3000`.
- Môi trường đã được người dùng xác nhận là test cô lập, không phải production.
- Dữ liệu case được khai báo inline trong spec theo ngoại lệ người dùng duyệt cho phiên bản khởi tạo; chưa tạo fixture ngoài.
- Không đọc source triển khai SUT; UI là oracle chính cho nội dung, state, layout và DOM.

## Lệnh và exit code thật

| Lượt | Command | Exit code | Kết quả thật |
| --- | --- | ---: | --- |
| Static check ban đầu | `npm run lint` | 0 | ESLint hoàn tất, không báo lỗi |
| Static check ban đầu | `npm run typecheck` | 0 | `tsc --noEmit` hoàn tất, không báo lỗi |
| Chromium baseline đầu | `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c --workers=1` | 1 | 4 passed, 8 failed, 0 skipped; 2.0 phút. DT-009 chạm timeout test 30 giây do nhiều soft assertion thiếu UI chạy tuần tự |
| Static check sau sửa harness | `npm run lint` | 0 | ESLint hoàn tất, không báo lỗi |
| Static check sau sửa harness | `npm run typecheck` | 0 | `tsc --noEmit` hoàn tất, không báo lỗi |
| Chromium baseline cuối | `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c --workers=1` | 1 | **4 passed, 8 failed, 0 skipped**; runner 39.2 giây, command wall time 42.2 giây; không còn test timeout |

## Kết quả cuối theo TC-ID

| TC-ID | Kết quả | Thời gian runner | Điểm quan sát chính |
| --- | --- | ---: | --- |
| DT-001 | passed | 1.2s | UI count khớp 5 sản phẩm từ baseline công khai; không raw system error |
| DT-002 | passed | 1.1s | `Iphone` hiển thị đúng card `iPhone 15 Pro Max`; UI names khớp keyword |
| DT-003 | failed | 2.0s | UI không có product card nhưng thiếu empty-state text đã duyệt |
| DT-004 | failed | 2.2s | Input hiển thị an toàn và response không 500, nhưng UI thiếu empty state; request URL chỉ được ghi diagnostic |
| DT-005 | passed | 1.1s | Whitespace gửi thành query rỗng; UI hiển thị toàn bộ baseline |
| DT-006 | failed | 2.0s | Response HTTP 500; UI hiển thị `Database Error` và `SQLITE_ERROR`; không chấp nhận dù payload không bật dialog |
| DT-007 | failed | 3.2s | API và UI đều trả/hiển thị cả 5 sản phẩm baseline thay vì empty state |
| DT-008 | passed | 1.1s | Grid desktop nhiều cột và giảm cột ở viewport hẹp |
| DT-009 | failed | 7.5s | `src` ảnh sản phẩm tồn tại và layout có kích thước; failure do alt rỗng và giá dùng `VND` thay vì `₫`, không do network ảnh |
| DT-010 | failed | 1.7s | Khi request pending không có role/text/spinner/skeleton/loading indicator |
| DT-011 | failed | 2.2s | UI/accessibility có 2 heading level 1 thay vì 1 |
| DT-012 | failed | 4.3s | Ba card được kiểm tra không có giá khớp format `... ₫`; UI dùng `VND` |

## Test-harness defect đã sửa trong Phase C

- Lượt đầu DT-009 phát hiện đúng alt/currency lệch nhưng tổng các soft assertion timeout mặc định làm case chạm timeout 30 giây.
- Sửa bằng `settledUiAssertionTimeoutMs = 1_000` cho các assertion thiếu state sau khi request/UI đã đồng bộ; không thay expected, locator nghiệp vụ hay giá trị assertion.
- Lượt cuối vẫn cho cùng 4 passed/8 failed nhưng hoàn tất 39.2 giây và không còn timeout, nên kết quả cuối không lẫn test-harness timeout.

## Assertion và locator thực sự được chạy

| Nhóm | Ví dụ trong spec | Case tiêu biểu |
| --- | --- | --- |
| DOM / visible text | `toBeVisible`, `not.toContainText`, empty-state text | DT-002/003/004/006/010 |
| State / attribute | `toHaveValue`, `toHaveAttribute('src'/'alt')` | DT-004/005/006/009 |
| Network / response | status, response array, query parameter, request URL diagnostic | DT-001–007 |
| Count / aggregate | product heading count, h1 count, baseline count | DT-001/003/007/011 |
| Layout / computed DOM | computed display/flex-wrap, distinct x-columns, image rect/object-fit | DT-008/009 |

- Locator ưu tiên role: main, textbox, button, heading.
- Fallback `heading.locator('..')` dùng vì card không có role `article`/`listitem` hoặc test id công khai.
- Fallback CSS `img` cần thiết để quan sát thẻ ảnh có `alt=""`, vốn không xuất hiện với role img trong accessibility tree.
- Fallback CSS loading class/`aria-busy` chỉ dùng vì manual case cho phép spinner/skeleton không có accessible role.
- Không dùng CSS/XPath để thay thế oracle UI bằng implementation selector.
- `waitForTimeout` count: 0.

## Artifact cuối

- Output root: `test-results/fr05-phase-c/`.
- 8 failure directories tương ứng 8 TC-ID failed.
- 8 screenshots failure, 8 videos failure, 8 `error-context.md`.
- Không tạo screenshot attachment cho case pass theo yêu cầu.
- Reporter: list; chưa tạo/kiểm tra HTML report metadata trong Phase C.

## Điểm chưa rõ / giới hạn

1. Inline case data là ngoại lệ Phase C được người dùng duyệt; chưa đạt quy ước fixture JSON/CSV ngoài spec của workflow và cần quyết định trước khi coi fixture hoàn chỉnh.
2. Chỉ chạy Chromium baseline; Firefox/Edge thuộc Phase D và chưa chạy.
3. Tám failure cuối khớp sai lệch Phase A, nhưng phân loại chính thức `test defect / environment issue / SUT defect` và bug report thuộc Phase E.
4. Không tạo bug report, không sửa SUT và không hạ expected để làm test pass.

## Checkpoint C

- Trạng thái: **Chờ duyệt**.
- Kết quả cuối: **4 passed, 8 failed, 0 skipped; exit 1**.
- Lint cuối: exit 0.
- Typecheck cuối: exit 0.
- Chưa chuyển Phase D.

