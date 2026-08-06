<!-- ai-gap-analysis/FR-08-api-only-multibrowser-gap.md -->

# AI Gap Analysis — FR-08 API-only và giới hạn multi-browser

## Thông tin ghi nhận

| Mục | Nội dung |
| --- | --- |
| Feature | FR-08 — Checkout |
| Run by | 23127464 |
| Thời điểm ghi nhận | 06/08/2026 11:28 |
| Giai đoạn phát hiện | Human review sau khi hoàn tất Phase E |
| Phân loại | Test-design/coverage gap và AI review/reporting miss |
| Không phải | SUT defect hoặc lý do hạ expected để làm test pass |

## Gap được phát hiện

FR-08 hiện được tự động hóa chủ yếu ở lớp checkout API bằng Playwright `request` context. Mặc dù cùng 15 điểm kiểm tra độc lập được chạy trên ba project `chromium`, `firefox` và `msedge`, test không dùng `page`, locator hay assertion trên DOM/rendering của web frontend.

Vì vậy, kết quả `15 case × 3 project = 45 lượt` chứng minh:

- Playwright runner cấu hình và thực thi được ba project;
- kết quả API được lặp và tổng hợp đúng theo từng project;
- HTML report hiển thị project coverage, người chạy và runtime.

Kết quả đó **không chứng minh**:

- checkout UI render giống hoặc khác nhau giữa Chromium, Firefox và Edge;
- hành vi nhập liệu, điều hướng, thông báo hay trạng thái hiển thị trên DOM;
- khả năng chống XSS khi dữ liệu `shipping_address` được render trên UI;
- lỗi tương thích trình duyệt, layout hoặc tương tác frontend.

Nói cách khác, đây là **multi-project API execution**, không phải **cross-browser UI coverage**.

## Chuỗi nguyên nhân

Gap không chỉ xuất phát từ một phía mà hình thành qua hai lớp:

### 1. Giới hạn của test design đầu vào

Các kịch bản FR-08 được chuyển sang automation tập trung vào request/response API nhưng chưa mô tả rõ:

- thao tác cụ thể của người dùng trên checkout UI;
- phần tử UI cần tương tác và điểm quan sát kết quả;
- expected về DOM, thông báo, điều hướng hoặc rendering theo browser;
- nơi nhập hoặc hiển thị `shipping_address` trên frontend.

Qua human review, Checkout UI thực tế không có trường nhập địa chỉ; phần shipping address đã được chốt API-only cho DT-012. Do đó, automation bám sát kịch bản đã duyệt sẽ nghiêng về API và không tự có đủ cơ sở để tạo assertion UI hợp lệ.

### 2. Điểm AI đã bỏ sót

AI đã cấu hình và báo cáo ba browser project nhưng chưa làm nổi bật đủ sớm rằng request-context test không đi qua browser DOM. AI đáng lẽ phải:

- phân biệt ngay từ Phase A/B giữa API coverage và UI/browser coverage;
- cảnh báo rằng nhân cùng API test qua ba project không kiểm chứng rendering engine;
- tránh dùng cách trình bày có thể khiến người đọc hiểu “multi-browser” là đã kiểm thử checkout UI trên ba browser;
- yêu cầu human review bổ sung thao tác và expected UI trước khi đề xuất một suite UI riêng, thay vì tự suy diễn hành vi chưa có trong test case.

Đây là hạn chế trong khả năng suy luận phạm vi coverage từ test design chưa mô tả UI đầy đủ, đồng thời là thiếu sót trong critical review/reporting của AI.

## Bằng chứng trong artifact

| Bằng chứng | Quan sát |
| --- | --- |
| [`tests/FR-08-checkout.spec.ts`](../tests/FR-08-checkout.spec.ts) | Dùng `APIRequestContext` và fixture `request`; không có `page`, locator hoặc DOM assertion. |
| [`playwright.config.ts`](../playwright.config.ts) | Có ba project `chromium`, `firefox`, `msedge`; cấu hình project không tự biến API test thành UI test. |
| [`phase-d-run.md`](../reports/FR-08-checkout/evidence/phase-d-run.md) | Ghi nhận 45 lượt, mỗi project 4 passed/11 failed/0 skipped và xác nhận spec API-only, không tạo `page`. |
| [`REVIEW_NOTES.md`](../reports/FR-08-checkout/REVIEW_NOTES.md) | DT-012 được giới hạn ở checkout API-only; không kết luận Pass về chống XSS UI. |
| [`README_SUMMARY.md`](../reports/FR-08-checkout/README_SUMMARY.md) | Phần render UI của DT-012 được ghi ngoài phạm vi FR-08 đã duyệt. |

## Ảnh hưởng đến kết luận FR-08

- Quy trình automation Phase A→E của FR-08 vẫn hoàn tất trong phạm vi API-only đã duyệt.
- Các assertion API và kết quả thật `12 passed / 33 failed / 0 skipped` trên 45 lượt không bị thay đổi bởi gap này.
- Không được dùng report hiện tại để tuyên bố checkout UI đã được kiểm thử cross-browser.
- DT-012 chỉ xác minh API lưu/trả payload XSS như một string trong phạm vi checkout API; không kết luận UI an toàn hay không an toàn khi render payload.

## Cách trình bày đúng trong báo cáo

Nên ghi:

> FR-08 được chạy bằng Playwright request context trên ba project Chromium, Firefox và Microsoft Edge. Kết quả chứng minh runner, project và HTML-report coverage cho suite API; do test không tương tác DOM, kết quả không đại diện cho cross-browser rendering coverage của Checkout UI.

Không nên ghi:

> Checkout UI đã được kiểm thử đầy đủ trên Chromium, Firefox và Edge.

## Hướng khắc phục

Nếu cần chứng minh UI multi-browser thật, trước tiên người thiết kế test phải bổ sung và duyệt riêng:

1. luồng thao tác UI cụ thể và precondition;
2. điểm nhập/hiển thị dữ liệu có tồn tại trên frontend;
3. expected quan sát được trên DOM cho từng case;
4. tiêu chí về điều hướng, thông báo, trạng thái giỏ hàng và rendering;
5. phạm vi DT-012 ở UI, nếu muốn kiểm tra XSS khi render.

Sau đó mới tạo suite UI dùng `page`, locator ổn định và assertion DOM, rồi chạy suite đó trên ba browser project. Suite UI mới phải được tách rõ khỏi suite API-only hiện tại để report không nhập nhằng hai loại coverage.

## Trách nhiệm human review

Human reviewer chịu trách nhiệm xác nhận rằng script cuối cùng phản ánh đúng mục tiêu test. Với FR-08, reviewer đã phát hiện và sửa cách diễn giải coverage sau Phase E: giữ nguyên automation API đã duyệt, nhưng công khai giới hạn và không mở rộng kết luận sang UI khi chưa có test design cùng bằng chứng DOM tương ứng.
