---
name: ai-first-playwright-testing
description: Chuyển đổi bộ test case đã được thiết kế sẵn, mặc định từ HW02, thành automation Playwright TypeScript cho HW04 theo hướng kiểm thử hộp đen, data-driven và đa trình duyệt, với người dùng duyệt tại từng checkpoint. Dùng khi cần đối chiếu test case thủ công với SUT EShop, chuẩn hóa fixture, sinh và chạy Playwright trên Chromium/Firefox/Edge, kiểm chứng báo cáo, phân loại thất bại, lập bug report có bằng chứng, hoặc thực hiện review và gap analysis mà không tự ý thiết kế lại bộ test từ đầu.
---

# AI-First Playwright Testing

## 1. Mục tiêu

Chuyển chính bộ test case đã được con người thiết kế sang Playwright TypeScript. Mặc định lấy test case từ HW02; không thay thế chúng bằng một bộ test do AI tự nghĩ ra.

Áp dụng vòng lặp checkpoint-first:

1. Thực hiện đúng một giai đoạn cho một tính năng.
2. Trình bày artifact, bằng chứng, kết quả thật và điểm chưa chắc chắn.
3. Dừng và yêu cầu người dùng duyệt rõ ràng, chẳng hạn `approved, continue`.
4. Chỉ chuyển sang giai đoạn hoặc tính năng kế tiếp sau khi được duyệt.

Coi người dùng là người duyệt cuối ở mọi vòng lặp. Không gộp các checkpoint A-E thành một lượt tự động.

## 2. Bắt đầu mỗi lượt

Trước hành động nghiệp vụ khác, ghi prompt vừa nhận và hành động dự kiến vào `reports/ai-audit-report.md`:

1. Lấy thời gian hiện tại từ môi trường tại lúc ghi và hiển thị theo `dd/MM/yyyy HH:mm` trong múi giờ `Asia/Ho_Chi_Minh`. Không suy đoán thời gian; nếu cần truy vết máy đọc thì giữ giá trị ISO ở trường kỹ thuật riêng.
2. Dùng đúng khung `assets/templates/ai-audit-entry.md` với bốn trường `Tool`, `Date`, `User Prompt`, `AI Action`.
3. Khi khởi tạo audit HW04 lần đầu, thay nội dung audit cũ bằng tiêu đề báo cáo và entry đầu tiên. Sau đó nối thêm từng entry HW04 để giữ log liên tục; không xóa các entry HW04 đã ghi.
4. Ghi nguyên ý prompt, mô tả trung thực hành động đã làm hoặc sắp làm, và cập nhật bằng entry mới khi kết quả thực tế khác dự kiến.

Việc ghi audit là ngoại lệ duy nhất được thực hiện trước câu hỏi bắt buộc về test case HW02.

## 3. Thu thập đầu vào

Hỏi trước tiên: **Đường dẫn tới test case HW02 của tính năng đang xử lý là gì?** Không đọc SUT, thiết kế test hoặc viết code trước khi nhận được đường dẫn hay xác nhận rõ ràng rằng không có HW02.

Sau đó xác định và ghi nhận:

- mã và mô tả tính năng;
- URL Frontend Web, Web Admin hoặc Backend API liên quan;
- mã sinh viên; với bài này, xác nhận yêu cầu báo cáo là `23127464`;
- tài khoản test và cách nhận bí mật an toàn, không chép mật khẩu/token vào report;
- thư mục output;
- tài liệu setup/run/seed hoặc API specification được phép đọc.

Nếu người dùng xác nhận không có HW02 cho tính năng, yêu cầu họ tự khai báo lý do bằng văn bản. Chỉ sau khi ghi lý do vào audit và được duyệt mới chuyển sang nhánh ngoại lệ “tự thiết kế mới”. Không mặc định chọn nhánh này.

Dùng quy ước output mặc định:

- `data/<feature>.json` hoặc `.csv`;
- `tests/<feature>.spec.ts`;
- `reports/<feature>/REVIEW_NOTES.md`;
- `reports/<feature>/bugs/`.

## 4. Ranh giới hộp đen

Chỉ suy ra thao tác và kết quả mong đợi từ test case đã duyệt, tài liệu công khai hợp lệ và hành vi quan sát được của SUT.

Được phép:

- đọc README, hướng dẫn setup/run/seed và API specification;
- quan sát UI, accessibility tree, URL và request/response mạng;
- thao tác SUT như người dùng hoặc API client bên ngoài.

Không được phép:

- đọc source code triển khai, logic validation, middleware hoặc schema database để suy ra test;
- dùng seed/source nội bộ để khẳng định expected result ngoài nội dung tài liệu được phép;
- sửa SUT để làm test pass;
- mở rộng sang tính năng ngoài phạm vi chỉ vì phát hiện code hoặc requirement liên quan.

Nếu cần kiểm tra một file chưa rõ có hợp lệ không, dừng và xin người dùng xác nhận trước khi đọc.

## 5. Điều phối theo tính năng

Xử lý tuần tự từng tính năng. Hoàn thành A→E và nhận duyệt cuối cho tính năng hiện tại rồi mới chuyển sang tính năng kế tiếp.

Sau mỗi giai đoạn:

1. Liệt kê file đã tạo hoặc thay đổi.
2. Tóm tắt kết quả và bằng chứng.
3. Nêu riêng các điểm chưa chắc chắn hoặc giả định.
4. Ghi audit.
5. Dừng chờ duyệt rõ ràng.

Không hiểu một yêu cầu “làm toàn bộ” là quyền bỏ qua checkpoint.

## 6. Giai đoạn A — Xác minh và đối chiếu

Không thực hiện khám phá tự do khi có HW02.

1. Đọc toàn bộ test case HW02 và các file tổng hợp do người dùng chỉ định.
2. Giữ nguyên ID, mô tả, loại positive/negative/edge, precondition, input và expected ban đầu.
3. Với từng case, tương tác trực tiếp với SUT thật để xác minh luồng thao tác, locator khả dụng, precondition và dữ liệu mẫu.
4. Chỉ quan sát qua các bề mặt hộp đen đã cho phép.
5. Lập bảng đối chiếu theo `assets/templates/review-notes.md`, gồm ID HW02, mô tả gốc, quan sát thực tế, trạng thái `Khớp`/`Lệch`/`Không xác định`, bằng chứng và đề xuất xử lý.
6. Không tự sửa expected result khi chưa có bằng chứng và duyệt.
7. Đối chiếu chéo giữa các case trong cùng tính năng: nếu từ hai case trở lên có cùng bộ input/precondition và cùng kết quả thực chất (không chỉ giống ý tưởng), đánh dấu trạng thái là `Trùng lặp` thay vì `Khớp`/`Lệch`/`Không xác định`. Chọn một case làm đại diện, ghi rõ ID các case còn lại và lý do trùng vào cột đề xuất xử lý. Không tính các case trùng là điểm kiểm tra độc lập khi đếm tổng số case ở Giai đoạn B; đưa chúng vào danh sách "không tự động hóa riêng — gộp vào case đại diện" ở Giai đoạn E.

Trong nhánh ngoại lệ đã được khai báo và duyệt, khám phá như một tester thật và ghi 5-8 gạch đầu dòng về hành vi quan sát được. Đánh dấu rõ đây không phải case kế thừa HW02.

Dừng chờ duyệt bảng đối chiếu hoặc kết quả khám phá.

## 7. Giai đoạn B — Nhập liệu và bổ sung khoảng trống

Không thiết kế lại bộ test khi đã có HW02.

1. Lấy nguyên bộ HW02 làm nền và giữ ID gốc.
2. Cập nhật case `Lệch` chỉ theo quyết định đã duyệt; ghi rõ nội dung cũ, nội dung mới và lý do.
3. Chỉ bổ sung case khi tổng số dưới 12 hoặc Giai đoạn A tìm thấy khoảng trống rõ ràng.
4. Gắn `Nguồn = HW02` cho case gốc. Gắn `Nguồn = Bổ sung (lý do: ...)` cho case mới.
5. Không biến case bổ sung thành bằng chứng rằng HW02 đã bao phủ nội dung đó.
6. Nếu expected result gốc của một case ở dạng nhiều nhánh (ví dụ "✅ ... hoặc ❌ ..." tùy hành vi SUT chưa xác định lúc thiết kế), phải dựa vào quan sát thực tế đã ghi nhận ở Giai đoạn A để chốt lại còn đúng một expected result duy nhất trước khi đưa case đó vào bảng test case cuối. Ghi rõ nhánh đã chọn, căn cứ chọn và người duyệt vào "Điểm chưa rõ". Không mang nguyên trạng expected nhiều nhánh sang Giai đoạn C.
7. Tạo bảng cuối theo `assets/templates/test-cases.md` và liệt kê giả định trong “Điểm chưa rõ”.

Đảm bảo mỗi tính năng có tối thiểu 12 case trước khi đề nghị viết code. Dừng chờ người dùng duyệt bảng test case cuối cùng; không viết code Playwright trước checkpoint này.

## 8. Giai đoạn C — Tự động hóa data-driven

Sau khi Giai đoạn B được duyệt:

1. Tách toàn bộ input và expected value thay đổi theo case sang fixture JSON/CSV ngoài spec.
2. Dùng cấu trúc trong `references/conventions.md`; khai báo type/interface TypeScript để kiểm tra fixture.
3. Giữ liên kết truy vết từ ID HW02 đến tên test hoặc annotation Playwright.
4. Ưu tiên locator theo thứ tự `getByRole` → `getByTestId` → `getByLabel` → `getByText`. Chỉ dùng CSS/XPath khi không có lựa chọn bền vững và phải ghi lý do.
5. Đồng bộ bằng web-first `expect()`, `waitForResponse` hoặc `waitForURL`. Cấm `waitForTimeout`; nếu bất khả kháng, ghi lý do và rủi ro trong review notes.
6. Dùng ít nhất ba nhóm assertion thực sự được thực thi trong toàn suite, theo bảng tại `references/conventions.md`; chú thích nhóm assertion tại chỗ.
7. Không hardcode input/expected của từng case trong spec.
8. Chạy lint, type-check và test phù hợp nếu môi trường cho phép. Ghi đúng lệnh, exit code và kết quả thật; nếu không chạy được, nêu `Chưa chạy` và nguyên nhân.
9. Với case chứa payload có khả năng phá hủy dữ liệu (SQL injection, lệnh xóa/ghi đè, v.v.), trước khi đưa vào suite chạy lặp lại nhiều lần hoặc nhiều trình duyệt, xác nhận với người dùng rằng môi trường chạy là môi trường test đã cô lập, không phải production, và ghi rõ xác nhận này vào review notes.

Trình bày code, fixture, kết quả kiểm tra và điểm chưa chắc chắn. Dừng chờ duyệt.

## 9. Giai đoạn D — Đa trình duyệt và báo cáo

Sau khi Giai đoạn C được duyệt:

1. Cấu hình ba project trong `playwright.config.ts`: Chromium, Firefox và Microsoft Edge (`channel: msedge` khi dùng Edge cài trên máy).
2. Nếu trình duyệt chưa cài hoặc không khởi chạy được, phân loại là environment issue; không thay bằng kết quả giả.
3. Bảo đảm ba tính năng tạo tối thiểu chín lượt tính năng–trình duyệt.
4. Cấu hình Playwright HTML reporter hoặc Allure để artifact hiển thị `Run by: 23127464`, thời gian thân thiện `dd/MM/yyyy HH:mm` và timestamp ISO 8601 được tạo từ cùng một thời điểm runtime. ISO là trường bắt buộc theo đề; không thay ISO bằng chuỗi hiển thị.
5. Chạy suite thật và phân loại `passed`, `failed`, `skipped` theo case, project và feature.
6. Mở artifact báo cáo đã sinh, kiểm tra trực tiếp chuỗi `Run by: 23127464`, thời gian `dd/MM/yyyy HH:mm` và timestamp ISO. Không coi cấu hình là bằng chứng hiển thị thành công.
7. Giữ trace, screenshot hoặc video do lần chạy thật tạo ra theo chính sách cấu hình.
8. Ghi đường dẫn artifact, thời điểm chạy, lệnh và kết quả vào audit/review.

Dừng chờ duyệt kết quả đa trình duyệt và báo cáo.

## 10. Giai đoạn E — Review và phân tích khoảng trống

Sau khi Giai đoạn D được duyệt:

1. Điền `assets/templates/review-notes.md` bằng dữ liệu thật.
2. Ghi riêng sai lệch HW02-vs-thực tế và lỗi trong code automation AI sinh; nêu nguyên nhân AI có thể bỏ sót, cách sửa và bằng chứng.
3. Phân loại từng thất bại thành `test defect`, `environment issue` hoặc `SUT defect` theo `references/conventions.md` trước khi lập bug.
4. Trước khi lập bug report, nhóm các case bị phân loại `SUT defect` theo nguyên nhân gốc (root cause) thực sự, không theo từng TC-ID riêng lẻ. Nếu nhiều case khác nhau đều thất bại vì cùng một hành vi sai của SUT (ví dụ backend luôn tin giá trị client thay vì tự tính toán), coi đó là một root cause và chỉ lập một bug report cho root cause đó.
5. Chỉ tạo bug report bằng `assets/templates/bug-report.md` khi có bằng chứng tái hiện thật cho SUT defect. Mỗi bug report tương ứng một root cause; liệt kê đầy đủ mọi TC-ID minh chứng cho root cause đó trong mục "Found by Test Case" thay vì tách thành nhiều report. Không gộp hai root cause khác nhau vào cùng một bug report chỉ vì cùng feature.
6. Chỉ đề xuất tạo GitHub Issue. Không tuyên bố issue đã được tạo nếu chưa thực hiện hành động thật và có URL/ID xác nhận.
7. Liệt kê mọi case chưa tự động hóa cùng lý do và tác động coverage. Với case bị đánh dấu `Trùng lặp` ở Giai đoạn A, ghi rõ đây là gộp vào case đại diện, không phải case bị bỏ sót.
8. Điền `assets/templates/readme-summary.md` bằng số liệu đã đo; không suy diễn ô còn thiếu.
9. Nhắc người dùng tự làm video demo và AI Critique cá nhân. Không soạn thay nội dung cá nhân bắt buộc.
10. Đề xuất commit nhỏ, tăng dần theo artifact đã duyệt. Chỉ dẫn lại commit thật; không bịa hash, thời gian hoặc lịch sử.

Trình bày gap analysis cuối cùng và dừng chờ duyệt.

## 11. Quy tắc tính trung thực

- Không nói “đã chạy”, “đã pass” hoặc “đã kiểm chứng” khi chưa có lần chạy thật.
- Không đổi test defect hoặc environment issue thành SUT defect.
- Không chỉnh assertion chỉ để che lỗi SUT; mọi thay đổi expected phải truy vết về quyết định đã duyệt.
- Không tạo screenshot, trace, video, report, GitHub Issue, timestamp hoặc commit giả.
- Không điền số liệu ước lượng vào bảng kết quả như số liệu thật.
- Không để lộ mật khẩu, token hoặc dữ liệu nhạy cảm trong fixture, log hay artifact.
- Không tự động bỏ qua test thất bại; chỉ skip khi có lý do, người duyệt biết và `skipReason` được ghi.
- Khi bằng chứng không đủ, dùng `Không xác định` và yêu cầu quyết định thay vì đoán.

## 12. Tiêu chí hoàn tất

Chỉ đánh dấu một tính năng hoàn tất khi có đủ:

- bảng đối chiếu hoặc nhánh ngoại lệ đã được duyệt, đã đánh dấu và xử lý các case `Trùng lặp` nếu có;
- bộ test cuối tối thiểu 12 case độc lập đã duyệt, có nguồn rõ ràng, không tính case trùng lặp là điểm kiểm tra riêng;
- mọi case có expected result nhiều nhánh đã được chốt về một nhánh duy nhất kèm căn cứ và người duyệt;
- fixture ngoài spec và Playwright TypeScript đã review;
- kết quả lint/type-check/test thật hoặc trạng thái chưa chạy có lý do;
- kết quả đa trình duyệt thật;
- report chứa `Run by: 23127464`, thời gian hiển thị `dd/MM/yyyy HH:mm` và timestamp ISO runtime đã được mở kiểm chứng;
- review/gap analysis và phân loại thất bại;
- bug report gộp theo root cause, chỉ cho SUT defect có bằng chứng, mỗi report liệt kê đủ các TC-ID minh chứng;
- danh sách case chưa tự động hóa, có ghi rõ case nào là gộp trùng lặp;
- audit HW04 liên tục cho mọi lượt;
- checkpoint cuối đã được người dùng duyệt.

Không tính video demo và AI Critique cá nhân là phần agent được phép hoàn thành thay người dùng.
