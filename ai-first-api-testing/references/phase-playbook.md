# Playbook công việc HW06

Các phase dưới đây là cách tổ chức artifact, không phải yêu cầu phải dừng cứng sau từng phase. Thực hiện đúng phạm vi người dùng giao và luôn để human review các output AI.

## A — Chọn phạm vi

- Đọc đề bài, SUT README, API specification và code liên quan.
- Chọn một feature/API scope từ mỗi Pool A/B/C; map mọi endpoint thuộc workflow.
- Ghi auth/role, inputs, preconditions, state/data dependency và khoảng trống spec.
- Human xác nhận lựa chọn và tình trạng không trùng trong nhóm.

## B — AI generation

- Lưu chuỗi prompt và output đầy đủ trong AI Audit.
- Sinh mục tiêu `>= 35` cases/API; không padding bằng các case trùng ý nghĩa.
- Lập traceability tới parameter partitions, FR, SEC và schema rule có nguồn.
- Đánh dấu giả định hoặc expected result chưa có căn cứ.

## C — Human audit và extension

- Human review từng case bằng đúng ba nhãn `VALID/INVALID/INCOMPLETE`.
- Ghi lý do, correction và final expected result; giữ dấu vết output AI ban đầu.
- Human thêm `>= 5` case/API, gắn origin `HUMAN-ADDED`, và giải thích nguyên nhân AI bỏ sót.
- Chỉ case đã duyệt mới được chuyển sang executable tests.

## D — Thực thi

- Tạo/cập nhật collection, environment/data file và assertions từ cases đã duyệt.
- Đặt `X-Student-Id` ở collection-level pre-request script hoặc cơ chế tương đương; lưu screenshot console do human chụp.
- Chạy từng API hoặc toàn suite theo phạm vi được yêu cầu; không cần chờ giữa D1/D2/D3 nếu người dùng đã yêu cầu chạy tất cả.
- Lưu command, versions, timestamp, hostname, console log, HTML report và exit code.
- Phân loại failures trước khi gọi là SUT bug.

## E — Tổng hợp

- Với bug đã xác thực, tạo Markdown report; publish GitHub Issue và đính screenshot khi người dùng yêu cầu.
- Cấu hình CI/CD và ghi nhận hai run/commit thật: all-passing và one-failing.
- Viết main report, README summary, AI Audit, AI Critique 200–300 words và commit log.
- Hỗ trợ pseudocode; để sinh viên tự thiết kế/tự vẽ diagram AI test-generator.

## Git và review

Đề yêu cầu commit mới cho mỗi bước procedure. Không gom nhắc commit chỉ theo phase tổng quát: tối thiểu phải truy vết generation, audit, extension và execution cho từng API, cùng các bước chung như CI/CD/report khi có. Agent chỉ commit hoặc publish khi người dùng yêu cầu; tuyệt đối không bịa hash, run link hay quyết định human review.
