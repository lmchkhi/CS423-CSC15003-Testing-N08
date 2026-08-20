---
name: ai-first-api-testing
description: Thiết kế, audit, triển khai và phân tích API tests cho bài HW06 EShop bằng Postman/Newman hoặc công cụ tương đương. Dùng khi chọn ba API thuộc Pool A/B/C, tạo và human-review test cases, thu thập evidence thật, báo lỗi, tích hợp CI/CD, hoặc hoàn thiện AI audit, critique và báo cáo nộp bài; không dùng cho performance testing hay kiểm thử GUI thuần túy.
---

# AI-first API testing cho HW06

Hoàn thành đúng phần việc người dùng yêu cầu và để lại artifact có thể truy vết. Có thể xử lý một bước hoặc nhiều bước trong cùng lượt; không tự mở rộng sang phase khác, chạy hệ thống, commit hay xuất bản GitHub Issue nếu người dùng chưa yêu cầu hoặc chưa cấp quyền cần thiết.

## Nguồn chuẩn và cách xử lý mâu thuẫn

Đọc các nguồn liên quan theo thứ tự sau:

1. `2026.HW06.API_Testing_En.md`: yêu cầu chấm điểm và deliverables.
2. `src/eshop-sut/README.md`: hành vi nghiệp vụ mong đợi, gồm FR-01–FR-24 và SEC-01–SEC-07.
3. `src/eshop-sut/api_specification.md`: method, path, header và payload được công bố.
4. Code SUT: hành vi triển khai thực tế và các chi tiết tài liệu còn thiếu.

Không coi hành vi code hiện tại là kết quả mong đợi nếu trái với README. Ghi rõ mọi mâu thuẫn hoặc khoảng trống tài liệu; không tự bịa status code, response schema, validation rule hay endpoint. Nếu chưa đủ căn cứ để tạo assertion chính xác, đánh dấu test là `INCOMPLETE` và nêu thông tin cần human quyết định.

Lấy Student ID từ yêu cầu hoặc repository; repository này hiện dùng `23127464`. Mọi request thực thi phải mang `X-Student-Id: <StudentID>`. Không dùng một ID hard-code khi áp dụng skill cho repository khác.

## Quy tắc bắt buộc

- Tách rõ **quan sát** (request, response, log, report) khỏi **suy luận** (nguyên nhân hoặc tác động có thể có).
- Không bịa pass/fail, số lượng test, coverage, thời gian, screenshot, video, URL, issue, pipeline run hay commit.
- AI output phải được human audit. Nhãn bắt buộc cho từng test do AI sinh là `VALID`, `INVALID` hoặc `INCOMPLETE`, kèm lý do và chỉnh sửa đối với trường hợp cần sửa.
- Chỉ báo bug khi expected result có nguồn và actual result có evidence tái hiện. Giữ failed run thay vì ghi đè.
- Sơ đồ AI test-generator nộp bài phải do sinh viên tự thiết kế và tự vẽ. Chỉ hỗ trợ pseudocode, câu hỏi thiết kế hoặc review sơ đồ mà sinh viên đã tạo; không tạo diagram/Mermaid hoàn chỉnh để nộp thay.
- Ghi AI Audit với tên công cụ, ngày giờ, prompt nguyên văn và output AI. Không thay output thật bằng bản tóm tắt nếu bài nộp cần nội dung đầy đủ.
- Nhắc human review tại điểm bàn giao, nhưng không tuyên bố human đã duyệt nếu chưa có xác nhận.

## Định tuyến tài liệu

Chỉ đọc tài liệu cần cho tác vụ hiện tại:

- Kiểm tra phạm vi và deliverables: [assignment-requirements.md](references/assignment-requirements.md).
- Chọn API/feature scope và map endpoint: [api-selection-contract.md](references/api-selection-contract.md).
- Điều phối các phần generate, audit, extend, execute và report: [phase-playbook.md](references/phase-playbook.md).
- Thiết kế/audit test cases và Postman assertions: [api-testing-runbook.md](references/api-testing-runbook.md).
- Chuẩn bị hoặc chạy Newman: [newman-execution.md](references/newman-execution.md).
- Đọc report, phân loại failure và xác nhận bug: [evidence-analysis.md](references/evidence-analysis.md).

## Workflow theo yêu cầu HW06

1. Chọn đúng ba feature/API scopes: một từ Pool A, một từ Pool B và một từ Pool C; kiểm tra không trùng bộ ba với thành viên nhóm.
2. Với **mỗi** API, dùng chuỗi prompt có chủ đích để sinh mục tiêu ít nhất 35 test cases. Bao phủ domain partition cho mọi input và, khi áp dụng, state transition, security SEC-01–SEC-07 và response schema.
3. Human audit từng test AI sinh; sửa case invalid/incomplete. Sau audit, human bổ sung ít nhất 5 case mà AI bỏ sót cho mỗi API và giải thích nguyên nhân bỏ sót.
4. Chuyển các case đã duyệt thành collection và assertions. Chạy Postman + Newman (hoặc Karate/RestAssured nếu người dùng chọn), lưu collection, input data, console log và HTML report. Kiểm tra hostname evidence khớp deployment; `localhost` hoặc `127.0.0.1` được chấp nhận.
5. Với bug thật, tạo Markdown report và chuẩn bị GitHub Issue có screenshot. Chỉ xuất bản issue khi người dùng yêu cầu; ghi URL thật sau khi xuất bản.
6. Tích hợp CI/CD và tài liệu hóa hai run có thật: một all-passing và một có một test failing, kèm commit, screenshot và link.
7. Hoàn thiện report, README summary, AI Audit, AI Critique 200–300 words, Git commit log, pseudocode và sơ đồ tự vẽ.

Nếu người dùng yêu cầu toàn bộ workflow, có thể tiếp tục qua các bước trong phạm vi đó nhưng vẫn ghi rõ artifact nào đang `PENDING HUMAN REVIEW` và không tự điền quyết định review.

## Vị trí artifact

Trước khi ghi file, khám phá cấu trúc repository bằng `rg --files` và ưu tiên convention đang có. Không tạo cây thư mục song song chỉ vì ví dụ trong skill. Với repository chưa có convention, dùng:

```text
tests/api-testing/{collections,environments,data,test-cases,reports,evidence}/
reports/api-testing/
bug-report/api-testing/
```

Dùng template hiện có trong `assets/templates/` khi phù hợp; thay toàn bộ placeholder bằng dữ liệu thật hoặc để rõ `TBD/PENDING`, không bịa giá trị. Các template là điểm khởi đầu, không phải danh sách deliverable đầy đủ.

## Điều kiện bàn giao

- Mỗi con số và verdict trỏ tới evidence hoặc được ghi `PENDING/NOT EXECUTED`.
- Mỗi API có chuỗi artifact generate → audit/correction → human-added cases → executable tests → execution evidence → bug report nếu có.
- README có đúng các tổng số mà đề yêu cầu; report liệt kê chỉ những Postman features thực sự đã dùng.
- CI/CD, GitHub Issue, screenshot, diagram tự vẽ và commit log không được tuyên bố hoàn tất nếu chưa tồn tại.
- Kết thúc bằng trạng thái ngắn: phần đã làm, phần cần human review, và phần còn thiếu.
