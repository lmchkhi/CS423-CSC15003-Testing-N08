# AI Gap Analysis — FR-05 Search

## Phạm vi và nguồn bằng chứng

- Requirement công khai: `src/eshop-sut/README.md`, mục FR-05.
- HW02: `tests/test-cases/FR-05-search/domain-testing/`, 12 case canonical.
- Fixture/spec: `data/fr05-search.json`, `tests/fr05-search.spec.ts`.
- Consolidated report: `reports/fr05-search/playwright-report/index.html`.
- Runtime evidence: `test-results/fr05-phase-d/`.
- Ranh giới: kiểm thử hộp đen; không đọc source implementation, middleware hoặc database schema.

## Kết quả đo được

| Chỉ số | Giá trị thật |
| --- | ---: |
| Designed cases | 12 |
| Automated cases | 12 |
| Case–project executions | 36 |
| Passed | 12 |
| Failed | 24 |
| Skipped | 0 |
| Browser projects | 3 |
| SUT defect root causes | 6 |

Mỗi project Chromium, Firefox và Edge có cùng kết quả `4P/8F/0S`. Pass: DT-001/002/005/008. Fail: DT-003/004/006/007/009/010/011/012.

## Failure classification và root-cause grouping

| Root cause | TC-ID | Phân loại | Bug report |
| --- | --- | --- | --- |
| Không render empty state khi kết quả bằng 0 | DT-003, DT-004 | SUT defect | `BUG-FR05-001` |
| Keyword không được xử lý như dữ liệu trơ; lộ DB error/mở rộng kết quả | DT-006, DT-007 | SUT defect | `BUG-FR05-002` |
| Ảnh sản phẩm có alt rỗng | DT-009 | SUT defect | `BUG-FR05-003` |
| Giá dùng `VND` thay vì `₫` | DT-009, DT-012 | SUT defect | `BUG-FR05-004` |
| Không có loading indicator khi request pending | DT-010 | SUT defect | `BUG-FR05-005` |
| Trang chủ có hai `h1` | DT-011 | SUT defect | `BUG-FR05-006` |

DT-009 xuất hiện trong hai bug report vì cùng test bắt được hai root cause độc lập. Không nhân đôi số test case hoặc số failure instance.

## Sai lệch HW02/manual và automation defect

- Manual run lịch sử ghi 7 bug ID theo từng case/biểu hiện. Phase E chuẩn hóa thành 6 root causes: gộp manual BUG-001/002 thành missing empty state; gộp manual BUG-003/004 thành unsafe keyword handling; bổ sung root cause alt rỗng mà manual note chưa tách riêng.
- Automation defect DT-001 từng bắt exact HTTP 200 và làm Firefox fail khi nhận 304 dù UI đúng. Đã sửa network về diagnostic/cache role, giữ UI oracle; consolidated rerun pass DT-001 trên cả ba projects.
- Firefox sandbox từng tạo 12 environment failures trước test body. Đã cài lại browser, xác minh debug log và chạy ngoài sandbox; consolidated report hiện không còn environment failure.
- DT-010 synchronization/evidence và screenshot attachment từng provisional. Fix 2 đã hoàn tất route-before-navigation, pending gate, release `finally`, response wait và attachment path; failure hiện tại chỉ còn missing loading UI.
- Suite/report từng còn nhãn `Phase C`; đã đổi sang tên feature trung lập và tái tạo report bằng full matrix thật.

## Coverage gap

| Hạng mục | Trạng thái | Khoảng trống / giới hạn |
| --- | --- | --- |
| 12 HW02 cases | Đủ 12/12 | Không có case chưa tự động hóa hoặc skipped |
| Duplicate handling | 0 duplicate | Không có case cần gộp khỏi suite |
| UI oracle | Đủ cho 12/12 | Không có case API-only |
| Assertion groups | Đạt trên 3 nhóm | Visual evidence là attachment, không phải visual regression snapshot |
| Cross-browser | Đủ Chromium/Firefox/Edge | Firefox cần runner ngoài Windows sandbox hiện tại hoặc preflight để tránh environment failure giả |
| Report metadata | Đã mở kiểm chứng | Không có gap trong artifact FR-05 hiện hành |
| SUT build identity | Không xác định | UI/API công khai không cung cấp build/commit; không dùng workspace HEAD để suy đoán build đang chạy |
| Security root cause nội bộ | Không kiểm tra source | Bug report chỉ kết luận observable unsafe keyword handling; đội SUT cần phân tích implementation để xác nhận cơ chế sửa |
| Toàn bài 3 feature / 9 runs | Đạt theo artifact hiện có | FR-05 + FR-08 + FR-12 tạo 9 lượt feature–browser |

## Hành động đề xuất

1. Ưu tiên xử lý `BUG-FR05-002` vì có HTTP 500/raw database error và SQL-like payload làm thay đổi kết quả.
2. Sửa các root cause UI còn lại rồi rerun đúng 12 case trên ba projects; không đổi expected để làm xanh.
3. Giữ Firefox preflight hoặc chạy matrix trên runner không bị sandbox chặn tab subprocess.
4. Chỉ tạo GitHub Issues sau khi người dùng quyết định; sáu report hiện chỉ là đề xuất local.
5. Sinh viên tự hoàn thành video demo và AI Critique cá nhân.

## Checkpoint E

- Trạng thái: `Đã duyệt — FR-05 hoàn tất A→E`.
- Điểm chưa chắc chắn: build/commit SUT đang chạy không quan sát được qua bề mặt công khai; chi tiết implementation của security root cause chưa được đọc theo ranh giới hộp đen.
- Chưa tạo GitHub Issue và chưa tạo commit.
- Bằng chứng duyệt: prompt `approved`, timestamp `2026-08-08T23:30:56.7980421+07:00`.
