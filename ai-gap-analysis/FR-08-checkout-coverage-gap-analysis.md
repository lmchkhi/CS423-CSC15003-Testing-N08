<!-- ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md -->

# AI Gap Analysis — FR-08 Checkout coverage sau UI refinement

## Thông tin ghi nhận

| Mục | Nội dung |
| --- | --- |
| Feature | `FR-08 — Checkout` |
| Run by | `23127464` |
| Thời điểm cập nhật | `09/08/2026 15:20` |
| Giai đoạn phát hiện | Human review sau Phase E và sau UI refinement |
| Phân loại | Test-design/coverage gap kết hợp AI review/reporting miss |
| Không phải | Lý do hạ expected để làm test pass hoặc thay đổi SUT |

## 1. Gap lịch sử đã phát hiện

Suite FR-08 ban đầu có 15 điểm kiểm tra HW02 dùng Playwright `request` context. Việc chạy cùng suite trên `chromium`, `firefox` và `msedge` tạo `45` lượt API, nhưng không tạo browser page và không tương tác DOM.

Do đó, report ban đầu chỉ chứng minh:

- API behavior được thực thi và tổng hợp theo ba Playwright project;
- runner, project và HTML reporter hoạt động;
- metadata người chạy và runtime xuất hiện trong report.

Report đó không chứng minh checkout UI hoạt động hoặc render đúng trên ba browser. Cách gọi chung là “multi-browser testing” mà không phân biệt API/UI có thể khiến người đọc hiểu sai phạm vi coverage.

## 2. Trạng thái coverage hiện tại

Human review đã đọc lại requirement FR-08 trong README và bổ sung suite `tests/FR-08-checkout-ui.spec.ts` cùng fixture `data/FR-08-checkout-ui.json`.

| Lớp kiểm thử | Case độc lập | Project | Lượt chạy | Kết quả thật | Oracle chính |
| --- | ---: | ---: | ---: | --- | --- |
| HW02 checkout API | 15 | 3 | 45 | `12 passed / 33 failed / 0 skipped` | Response, order/cart state, aggregate |
| README Checkout UI | 3 | 3 | 9 | `0 passed / 9 failed / 0 skipped` | URL, DOM, input attribute, UI-triggered network, cart postcondition |
| **Tổng FR-08** | **18** | **3** | **54** | **12 passed / 42 failed / 0 skipped** | API + browser page thật |

Ba case UI hiện kiểm tra:

1. anonymous user phải được chuyển khỏi `/checkout` tới `/login`;
2. Checkout UI phải hiển thị sản phẩm, tổng tính từ giỏ và total không editable;
3. click Checkout thật phải nhận response thành công, hiển thị kết quả và xóa giỏ.

Vì các case này dùng `page` và chạy trên Chromium, Firefox, Edge, FR-08 hiện có cross-browser UI evidence thật trong đúng ba luồng trên. Không còn đúng khi mô tả toàn bộ FR-08 là “API-only”.

## 3. Gap còn tồn tại

### 3.1. DT-012 vẫn API-only

Checkout UI hiện không có trường nhập hoặc điểm hiển thị `shipping_address`. `DT-012` chỉ xác minh checkout API lưu/trả payload XSS như string. Kết quả này không chứng minh payload được escape an toàn khi render ở UI khác.

Kết luận hợp lệ: `DT-012 pass trong phạm vi checkout API persistence`.

Kết luận không hợp lệ: `FR-08 đã pass kiểm thử chống XSS UI`.

### 3.2. Ba case UI không đại diện cho toàn bộ Checkout UI

UI refinement bao phủ route protection, order summary/total và successful-checkout postcondition. Nó chưa tự động chứng minh:

- coupon behavior thuộc requirement khác;
- responsive/layout/accessibility ở mọi viewport;
- hiển thị shipping address hoặc stored XSS vì control tương ứng không tồn tại;
- mọi navigation/error-state của Checkout UI.

### 3.3. Locator đăng nhập còn mong manh

Login form không cung cấp label/name/id/test-id ổn định. Automation phải scope `form input`, assert đúng hai input rồi dùng vị trí `nth(0/1)`. Cách này có kiểm soát nhưng vẫn có thể vỡ nếu form đổi thứ tự.

### 3.4. Trace cần bước public-safety sau mỗi lần chạy

Trace UI có thể chứa runtime identity/token trong DOM snapshot hoặc network data. Report hiện tại đã được redaction và quét lại thành `0` runtime email/password/JWT, nhưng một lần rerun mới có thể tạo lại dữ liệu chưa redact. Đây là giới hạn vận hành artifact, không phải SUT defect.

### 3.5. Build/commit SUT chưa xác định

Artifact ghi URL và runtime nhưng không xác định build/commit của SUT. Kết quả tái hiện được trên localhost hiện tại, song provenance chưa đủ để so sánh chính xác giữa các bản build khác nhau.

## 4. UI failure đã được phân loại thành SUT defect

Các failure dưới đây không còn là “gap chưa kiểm tra”; chúng đã có assertion, tái hiện trên `3/3` browser và có screenshot/trace/video:

| Test/UI observation | Root cause | Bug report |
| --- | --- | --- |
| Anonymous vẫn thấy Checkout UI | Route `/checkout` không bảo vệ | `bug-reports/FR-08/BUG-FR08-006-checkout-route-unprotected.md` |
| Backend cart có item nhưng product list UI rỗng | Checkout summary không render sản phẩm | `bug-reports/FR-08/BUG-FR08-007-checkout-products-not-rendered.md` |
| Tổng kỳ vọng `12000000`, UI hiện `0` và editable | Total control không lấy state từ cart và cho chỉnh trực tiếp | `bug-reports/FR-08/BUG-FR08-008-checkout-total-zero-editable.md` |
| UI báo checkout thành công nhưng cart vẫn còn item | Cùng root cause cart-not-cleared đã có | `bug-reports/FR-08/BUG-FR08-002-cart-not-cleared.md` |

FR-08 hiện có 8 bug report theo root cause. Case UI cart-not-cleared được gộp vào bug hiện có để tránh đếm trùng.

## 5. Vì sao AI bỏ sót ở phiên bản đầu

### Giới hạn của test design đầu vào

Các case HW02 tập trung request/response API và không mô tả rõ thao tác, locator, DOM oracle hoặc browser-specific expectation. Shipping address cũng không có control tương ứng trên Checkout UI.

### Giới hạn trong critical review của AI

AI đã nhân suite request-context qua ba project nhưng chưa cảnh báo đủ sớm rằng cách chạy đó không đi qua rendering engine. AI cũng chưa đối chiếu requirement README để chủ động đề xuất một suite UI bổ sung tách biệt.

### Điều chỉnh sau human review

Human reviewer yêu cầu đọc lại README, bổ sung browser-page automation và trình bày tách API coverage khỏi UI coverage. Expected HW02 được giữ nguyên; UI expected lấy trực tiếp từ requirement README, không lấy actual lỗi của SUT để làm chuẩn.

## 6. Bằng chứng

| Artifact | Nội dung chứng minh |
| --- | --- |
| [`FR-08-checkout.spec.ts`](../tests/FR-08-checkout.spec.ts) | 15 case API dùng request context |
| [`FR-08-checkout-ui.spec.ts`](../tests/FR-08-checkout-ui.spec.ts) | 3 case dùng browser page, DOM/URL/network/postcondition assertion |
| [`FR-08-checkout-ui.json`](../data/FR-08-checkout-ui.json) | Requirement/expected UI data-driven |
| [`ui-refinement-run.md`](../playwrite-test/FR-08-checkout/evidence/ui-refinement-run.md) | Kết quả 54 lượt, số liệu theo project và kiểm chứng report |
| [`REVIEW_NOTES.md`](../playwrite-test/FR-08-checkout/REVIEW_NOTES.md) | Human review, test defect refinement và failure classification |
| [`HTML report`](../playwrite-test/FR-08-checkout/playwright-report/index.html) | 45 API + 9 UI executions; screenshot, trace và video UI |
| [`bug-reports/FR-08`](../bug-reports/FR-08/) | 8 bug report theo root cause, gồm ba root cause UI mới |

## 7. Cách trình bày đúng

Nên ghi:

> FR-08 gồm 15 case HW02 API và 3 case UI bổ sung từ README. Ba case UI dùng browser page thật trên Chromium, Firefox và Edge. Kết quả cuối là 54 lượt với 12 passed, 42 failed, 0 skipped. DT-012 vẫn chỉ được kết luận trong phạm vi API và không chứng minh chống XSS UI.

Không nên ghi:

> FR-08 hoàn toàn API-only.

Hoặc:

> Checkout UI đã được kiểm thử đầy đủ trên ba browser, bao gồm chống XSS khi render.

## 8. Hướng xử lý tiếp theo

- Giữ 15 case API và 3 case UI thành hai lớp coverage rõ ràng trong cùng report.
- Giữ DT-012 API-only cho tới khi có UI render/control và expected được duyệt.
- Ưu tiên locator semantic nếu SUT bổ sung label/name/test-id cho login form.
- Sau mỗi rerun có trace, thực hiện redaction và quét credential trước khi commit public.
- Ghi build/commit SUT trong lần chạy tiếp theo nếu môi trường cung cấp.
- Chỉ mở rộng thêm UI case khi có requirement và oracle quan sát được; không tự suy diễn control không tồn tại.

## 9. Trách nhiệm human review

Human reviewer chịu trách nhiệm xác nhận script cuối phản ánh đúng mục tiêu test và không diễn giải quá phạm vi evidence. Với FR-08, review đã sửa miss quan trọng của AI: tách rõ multi-project API execution khỏi cross-browser UI testing, bổ sung UI automation thật, phân loại failure thành bug, và công khai các gap vẫn còn.

