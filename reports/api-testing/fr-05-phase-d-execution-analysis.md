# FR-05 — Phân tích thực thi Phase D

> Đây là phân tích lịch sử của Phase D. Raw evidence hiện hành là schema rerun `tests/api-testing/evidence/fr-05/20260822-230735/`: 45 ca, 35 đạt, 10 không đạt, 120 assertions (109 đạt, 11 không đạt).

## Phạm vi và gate

- Pool A, FR-05: `GET /api/products`, query tùy chọn `search`.
- Student ID: `23127464`.
- Phase C đã được phê duyệt bằng chỉ dẫn `approve, continue`.
- Chỉ các ca được con người kết luận `VALID` hoặc `CON-NGUOI-BO-SUNG` mới được xét tự động hóa.
- `FR05-SEC-005` không được tự động hóa vì oracle cuối yêu cầu quan sát sink UI; chạy API-only không đủ bằng chứng để kết luận HTML có được render/execute hay không.

## Lần chạy canonical

- Run ID: `20260821-213052`.
- Host: `http://127.0.0.1:3000`.
- Node.js: `v22.18.0`; Newman: `6.2.2`; htmlextra: `1.23.1`.
- Folder baseline chính: 19 test case, 27 HTTP request, 53 assertion, 5 assertion không đạt.
- Folder baseline rỗng: 1 test case, 1 HTTP request, 2 assertion, không có assertion không đạt.
- Tổng: 20 test case; 16 đạt, 4 không đạt; 28 HTTP request; 50/55 assertion đạt.
- Newman exit code: main `1`, empty-baseline `0`, tổng thể `1`.

Số HTTP request lớn hơn số test case vì một số ca dùng `pm.sendRequest` để kiểm tra baseline hoặc hậu điều kiện. Thống kê case dựa trên `run.stats.items` và ID case duy nhất, không đếm các request phụ thành test case.

## Phân tích failure

| Mã | Quan sát có bằng chứng | Assertion không đạt | Phân loại Phase D |
|---|---|---:|---|
| `FR05-SEC-001` | Payload tautology trả toàn bộ 5 sản phẩm baseline. | 1 | `LOI_BAO_MAT_SUT` — kết quả bị mở rộng trái oracle SEC-05. |
| `FR05-SEC-002` | Payload UNION làm response xuất hiện hàng chèn `FR05-UNION-MARKER` với `id: 9999`. | 1 | `LOI_BAO_MAT_SUT` — dữ liệu do UNION được đưa vào kết quả. |
| `FR05-SEC-004` | Dấu nháy đơn nhận HTTP 500 và response lộ `SQLITE_ERROR: unrecognized token`. | 1 | `LOI_BAO_MAT_SUT` — lộ chi tiết database trái oracle bảo mật. |
| `FR05-H05` | Null byte nhận HTTP 500, lộ chi tiết lỗi database; request kiểm tra sau đó xác nhận server vẫn hoạt động. | 2 | `LOI_BAO_MAT_SUT` — xử lý input và information exposure không đạt oracle SEC-05. |

Không tạo bug report trong Phase D. Các phân loại trên là kết quả phân tích bằng chứng thực thi, chưa chuyển sang workflow báo lỗi.

## Header và tính toàn vẹn dữ liệu

- Tất cả assertion kiểm tra `X-Student-Id: 23127464` trên subject request đều đạt.
- Collection-level pre-request script upsert header cho các subject request; request phụ khai báo cùng header.
- Ảnh Postman trực quan chứng minh header đã được cung cấp tại `tests/api-testing/evidence/fr-05/postman-header-screenshot.png`.
- Database được backup trước khi chạy và khôi phục sau khi SUT dừng. SHA-256 trước chạy và sau khôi phục cùng là `38D16AAF04AA81839CC746D4C713171ED87570CB6772875E35C5F60EBBF37CA9`.
- Sau run không còn process của runner lắng nghe cổng 3000.

## Lần chạy không canonical

Run `20260821-213008` từng được giữ làm dấu vết trong Phase D. Generator ban đầu tạo URL object với danh sách query rỗng nên query string không được gửi; 7 assertion thất bại do cấu hình collection. Lần này được phân loại `LOI_CA_KIEM_THU`, không dùng để kết luận hành vi SUT và đã được xóa sau final rerun.

## Artifact

- Kế hoạch: `reports/api-testing/fr-05-phase-d-execution-plan.md`
- Collection: `tests/api-testing/collections/23127464_FR05_Product_Search.postman_collection.json`
- Environment: `tests/api-testing/environments/fr-05-local.postman_environment.json`
- Data: `tests/api-testing/data/fr-05-run-data.json`
- Final evidence hiện hành: `tests/api-testing/evidence/fr-05/20260822-230735/`
- Execution metadata: `tests/api-testing/evidence/fr-05/20260822-230735/execution-metadata.json`
- Evidence lỗi ca kiểm thử cũ `20260821-213008` đã được final rerun thay thế và dọn khỏi repository.

## Trạng thái

PHASE D: COMPLETE  
EXECUTION: EXECUTED — FAILED  
AUTOMATED CASES: 20  
PASSED CASES: 16  
FAILED CASES: 4  
HUMAN ASSESSMENT: XÁC NHẬN — 4 LOI_BAO_MAT_SUT  
HEADER SCREENSHOT: PROVIDED  
BUG REPORTING: COMPLETE — LOCAL REPORT
PHASE E: COMPLETE
