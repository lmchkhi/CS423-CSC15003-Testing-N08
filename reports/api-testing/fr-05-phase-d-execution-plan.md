# FR-05 — Kế hoạch thực thi Phase D

## Gate đầu vào

- Phase C được con người phê duyệt bằng chỉ dẫn `approve, continue`.
- Phạm vi chính: Pool A, FR-05, `GET /api/products` với query tùy chọn `search`.
- Student ID: `23127464`; collection-level pre-request script upsert `X-Student-Id` cho mọi subject request và mọi `pm.sendRequest` tự khai báo cùng header.
- Không chạy ca AI `INVALID` hoặc `INCOMPLETE`.
- Không thực hiện bug reporting, CI/CD hoặc Phase E trong lượt này.

## Lựa chọn tự động hóa

| Nguồn | Được duyệt | Tự động hóa | Loại khỏi Phase D API-only |
|---|---:|---:|---:|
| AI `VALID` | 16 | 15 | 1 |
| `CON-NGUOI-BO-SUNG` | 5 | 5 | 0 |
| **Tổng** | **21** | **20** | **1** |

- `FR05-SEC-005` chưa tự động hóa: chỉnh sửa cuối cùng đã duyệt yêu cầu quan sát sink hiển thị UI; Postman API-only không đủ bằng chứng để kết luận render/execute HTML.
- `FR05-LST-002` chạy ở folder riêng sau khi fixture xóa toàn bộ product để tạo baseline rỗng.
- `FR05-H01` được đặt cuối folder baseline chính; database được backup trước run và khôi phục sau khi dừng SUT.

## Artifact thực thi

- Collection: `tests/api-testing/collections/23127464_FR05_Product_Search.postman_collection.json`
- Environment: `tests/api-testing/environments/fr-05-local.postman_environment.json`
- Data: `tests/api-testing/data/fr-05-run-data.json`
- Generator: `tests/api-testing/scripts/generate-fr05-postman.js`
- Empty fixture: `tests/api-testing/scripts/prepare-fr05-empty-fixture.js`
- Runner: `tests/api-testing/scripts/run-fr05-newman.js`

Kiểm tra tĩnh trước run: 20 items, 20 ID duy nhất, không thiếu/thừa ID so với selection, collection pre-request script tồn tại, base URL là `http://127.0.0.1:3000`, scripts qua `node --check`.

## Chiến lược run và dữ liệu

1. Từ chối chạy nếu cổng 3000 đã được process khác phục vụ.
2. Backup `src/eshop-sut/backend/database.sqlite` vào `tests/api-testing/backups/`.
3. Spawn SUT cục bộ và chờ baseline đúng năm sản phẩm seed.
4. Chạy folder `Main controlled baseline` bằng Newman, giữ JSON/HTML/console nguyên trạng kể cả khi có failure.
5. Xóa product bằng fixture cô lập, rồi chạy folder `Empty controlled baseline` để kiểm tra `FR05-LST-002`.
6. Dừng SUT và khôi phục database từ backup.
7. Lưu metadata, exact command, tool versions, host, exit code, artifact hashes và trạng thái screenshot.

## Bằng chứng dự kiến

Mỗi run tạo thư mục mới dưới `tests/api-testing/evidence/fr-05/<timestamp>/`, gồm:

- `newman-main-console.txt`, `newman-empty-console.txt`;
- `newman-main-report.json`, `newman-empty-report.json`;
- `newman-main-report.html`, `newman-empty-report.html`;
- `empty-fixture-output.txt`, `sut-process.log`;
- `newman-command.txt`, `execution-metadata.json`.

Ảnh Postman chứng minh header do con người chụp vẫn là `PENDING HUMAN CAPTURE`; không được suy ra từ collection.

## Kết quả thực thi

- Lần canonical: `tests/api-testing/evidence/fr-05/20260821-213052/`.
- 20 test case: 16 đạt, 4 không đạt; 50/55 assertion đạt.
- Lần `20260821-213008` được giữ riêng và phân loại `LOI_CA_KIEM_THU` do query string bị mất khi sinh collection.
- Phân tích đầy đủ: `reports/api-testing/fr-05-phase-d-execution-analysis.md`.

PHASE D: COMPLETE  
AUTOMATED CASES: 20  
EXECUTION: EXECUTED — FAILED
