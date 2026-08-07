# FR-12 Access Control — AI Gap Analysis

## Kết quả đã bao phủ

- 40/40 case HW02 đã tự động hóa; 0 skipped, 0 case trùng được gộp.
- 120 lượt case–project đã chạy tuần tự trên Chromium, Firefox và Microsoft Edge.
- Ba partition chính được phủ trên các endpoint đã duyệt: không token, token role `user`, token role `admin`; invalid token được phủ tại DT-002.
- 17 failed case được nhóm thành bốn SUT root cause với bằng chứng lặp lại 3/3 project.
- Runtime resource và cleanup giảm tác động lên seed; DT-011/012/013 reset/tạo lại order ID 1 cho từng case.

## Khoảng trống còn lại

| Gap | Bằng chứng hiện tại | Tác động | Đề xuất |
| --- | --- | --- | --- |
| Chỉ có một invalid-token case trên `/api/admin/users` | Rà 40 HW02 xác nhận chỉ DT-002 dùng invalid token | Chưa chứng minh consistency của malformed/expired/tampered token trên endpoint khác | Bổ sung ở vòng thiết kế tiếp theo nếu requirement yêu cầu; không tự thêm vào HW02 đã duyệt |
| Không có partition token hết hạn, token sai chữ ký hoặc token thiếu claim role | Fixture chỉ có `invalid_token_xyz123` | Một số nhánh authentication/claim validation chưa được đo | Tạo case riêng khi có cách sinh token test hợp lệ và expected được duyệt |
| Phạm vi automation là API-only | Spec dùng `APIRequestContext`, không tạo page | Không xác minh route guard/navigation/visible access-denied của frontend-admin | Tạo feature UI access-control riêng nếu FR-12 yêu cầu cả UI enforcement |
| Database/order ID 1 dùng chung | DT-011/012/013 gọi reset toàn cục | Không thể chạy ba project song song an toàn | Giữ `workers: 1` hoặc cấp backend/database riêng cho từng project |
| Trace bị tắt để bảo vệ credential/token | Scan lần chạy đầu phát hiện auth data trong API trace | Điều tra failure không có timeline trace | Dùng HTML report + error context; chỉ bật trace khi có cơ chế redaction/credential test cô lập an toàn |
| Root-cause wording dựa trên quan sát hộp đen | Không đọc source triển khai SUT | Không thể khẳng định tên middleware/hàm nội bộ gây lỗi | Giữ mô tả “enforcement quan sát được”; đội phát triển xác định code root cause |
| Bug report legacy ngoài output automation chứa credential plaintext | `bug-reports/FR-12/BUG-FR12-002.md` và `003.md` có login body | Rủi ro lộ credential nếu publish repository | Redact credential trong artifact legacy hoặc thay bằng bản public-safe tại `reports/fr12-access/bugs/`; không tự xóa lịch sử |

## Phân loại failure cuối

| Nhóm | TC-ID | Kết luận | Lý do |
| --- | --- | --- | --- |
| Product mutation không enforce auth | `DT-023/024/026/027/029/030` | SUT defect | Expected đúng fixture; control/admin pass; actual 200 lặp lại 3/3 project |
| Admin API không enforce admin role | `DT-003/006/009/012/015/018/021` | SUT defect | User token hợp lệ nhưng phải bị 403; no-token/admin controls pass |
| Category mutation không enforce admin role | `DT-033/036/039` | SUT defect | No-token trả đúng 401 nhưng user-token trả 200 trên ba project |
| Invalid token trả sai status | `DT-002` | SUT defect | Expected 401 đã duyệt; actual 403 lặp lại 3/3 project |

Không có failure cuối được phân loại là test defect hoặc environment issue. Các test-harness defect phát hiện trong Phase C/D đã được sửa và rerun trước khi dùng artifact cuối.

## Hạn chế của AI và bài học human review

- AI ban đầu gộp 17 failure vào hai tag quá rộng; human review tách thành bốn root causes 6/7/3/1 phù hợp hành vi và bug reports.
- Browser harness giả ban đầu áp assertion DOM cho feature pure API; human review yêu cầu chuyển sang `APIRequestContext` và response assertions trực tiếp.
- `fullyParallel: false` không đủ bảo vệ database dùng chung giữa project; human review yêu cầu `workers: 1` để cô lập reset order ID 1.
- Chính sách trace UI-style ban đầu lưu auth data trong API trace; scan artifact và rerun `trace: off` là bắt buộc trước khi công bố report.
- Black-box automation xác nhận enforcement quan sát được nhưng không thể kết luận chính xác middleware/hàm nội bộ; đội phát triển phải xác định code root cause.
