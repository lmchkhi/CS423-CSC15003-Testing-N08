# Runbook thiết kế và audit API tests

## Tạo test cases

Mỗi case nên có: ID, origin (`AI-GENERATED`/`HUMAN-ADDED`), feature/endpoint, objective, category, preconditions/state, request data, steps, expected status/body/headers/schema, requirement source và automation status.

Điều khiển AI theo các lượt có mục tiêu, ví dụ:

1. Trích xuất contract và liệt kê spec gaps.
2. Partition từng path/query/header/body parameter, gồm missing/null/type/boundary/format.
3. Lập state-transition matrix nếu feature có trạng thái.
4. Map SEC-01–SEC-07 và threat cases áp dụng được.
5. Tạo schema assertions chỉ từ schema/field có nguồn.
6. Deduplicate và lập traceability; bổ sung khoảng trống tới `>= 35` case/API.

Không ép mọi SEC hoặc state-transition category vào endpoint không liên quan. Không dùng số lượng để che lấp case trùng hoặc expected result vô căn cứ.

## Audit

- `VALID`: input, precondition, action và expected result đều có căn cứ và thực thi được.
- `INVALID`: case mâu thuẫn với contract/business rule hoặc kiểm thử sai scope; ghi correction hoặc lý do loại.
- `INCOMPLETE`: thiếu dữ liệu, oracle, schema, precondition hoặc cleanup; ghi chính xác phần cần bổ sung.

Human verdict phải độc lập với AI verdict. Sau correction, giữ cả bản gốc và final version để chứng minh audit.

## Các điểm EShop dễ sai

- FR-02: lockout sau từ 3 lần sai liên tiếp, 30 giây; không lộ chi tiết nguyên nhân.
- FR-08: backend tự tính total từ cart và xóa cart sau checkout.
- FR-09: đủ C1–C5, boundary `total == min_order_amount`, usage per user và công thức percent/fixed.
- FR-10: chỉ transition hợp lệ; `delivered`/`canceled` là final; user không cancel `shipping`; ownership/role checks.
- FR-15: name required/max 255, price `> 0`, category tồn tại; update không làm đổi product khác.
- FR-16: tài liệu mâu thuẫn CSV upload với JSON array; không tự chọn contract.
- FR-19: không lộ password và admin không tự xóa chính mình.
- SEC: invalid/missing/expired token, user gọi admin API, IDOR, mass assignment `role`, injection và output escaping khi có UI sink.

## Chuyển sang Postman/Newman

- Mỗi assertion phải trace về test case đã duyệt.
- Dùng variables, environments, data-driven runs, mock server hoặc monitor chỉ khi chúng tạo giá trị thật; report chỉ liệt kê feature đã thực sự dùng.
- Phân biệt assertion failure với request/network/setup failure.
- Không khẳng định “exact schema” nếu source chỉ có response example một phần.
