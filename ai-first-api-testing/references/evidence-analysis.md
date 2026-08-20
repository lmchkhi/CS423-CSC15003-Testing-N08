# Phân tích evidence

## Kiểm tra tính toàn vẹn

- Đối chiếu collection, environment/data, console log và HTML report có cùng run.
- Ghi hostname, timestamp, command, exit code và tool versions.
- Không chỉnh report gốc; tạo analysis file riêng.
- Không suy ra header chỉ từ collection: evidence chống gian lận cần console screenshot thực tế.

## Tóm tắt kết quả

Chép metric đúng cấp từ report (iterations, requests, assertions/tests). Nêu denominator rõ để tránh cộng lẫn requests và assertions. Mọi số phải trỏ đến report/log; nếu chưa chạy, dùng `NOT EXECUTED`.

## Phân loại failure

- `TEST_DEFECT`: assertion/script sai.
- `ENVIRONMENT`: SUT unavailable, DNS/port/dependency/configuration.
- `TEST_DATA_OR_STATE`: seed, ownership, token hoặc state precondition sai.
- `SUT_FUNCTIONAL_DEFECT`: actual trái FR/contract có nguồn.
- `SUT_SECURITY_DEFECT`: actual trái SEC hoặc access-control rule có nguồn.
- `SPEC_GAP_OR_CONFLICT`: không có oracle duy nhất.
- `UNKNOWN`: chưa đủ evidence.

Một assertion fail không tự động là bug. Muốn xác nhận bug phải có requirement source, request tái hiện, expected/actual, evidence path và kết quả rerun phù hợp. Root-cause chỉ là hypothesis trừ khi code/log chứng minh.

## Coverage

Đánh giá traceability, không chỉ đếm case:

- domain partitions cho mọi input;
- state transition hợp lệ/không hợp lệ và final states khi áp dụng;
- SEC-01–SEC-07 áp dụng được, auth/role/ownership/injection;
- schema fields/types/requiredness có nguồn;
- so sánh AI-generated với human-added cases.

## CI/CD và bug evidence

- CI/CD cần workflow/config, commit SHA thật, run URL thật, screenshot và result cho cả all-passing lẫn one-failing run.
- Bug cần local Markdown report, GitHub Issue URL và screenshot gắn với issue. Không coi draft local là issue đã publish.

Kết luận bằng `PASS`, `FAIL` hoặc `INCONCLUSIVE` cho execution evidence, đồng thời ghi riêng quyết định human review (`PENDING` cho đến khi human xác nhận).
