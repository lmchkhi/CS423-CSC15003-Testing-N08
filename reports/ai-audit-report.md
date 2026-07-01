# Báo cáo AI Audit - HW02 Domain Testing

> **Sinh viên:** Hà Bảo Ngọc - 23127300  
> **Nhóm:** N08  
> **Môn:** CS423 / CSC15003 - Kiểm thử Phần mềm  
> **Bài tập:** HW02 - Domain Testing on EShop  
> **Công cụ AI đã dùng:** Codex, AI assistant dạng ChatGPT  
> **Nguồn prompt log:** `prompt_log.md`

---

## 1. Thông tin sinh viên

| Mục | Giá trị |
|---|---|
| Họ tên sinh viên | Hà Bảo Ngọc |
| MSSV | 23127300 |
| Lớp / Nhóm | CS423 / CSC15003 - N08 |
| Mã bài tập | HW02-AI |
| Ngày làm bài | 01/07/2026 |
| Feature đã chọn | FR-02, FR-10, FR-13, FR-26 |

## 2. Cách audit

Báo cáo này audit các artifact có AI hỗ trợ trong HW02. Lịch sử prompt chi tiết được lưu ở `prompt_log.md`; file này tóm tắt các tương tác AI chính, artifact sinh ra, kết quả review, lý do đánh giá và phần sinh viên đã sửa.

Ý nghĩa verdict:

- **VALID**: Kết quả được chấp nhận sau review, không cần sửa nội dung chính.
- **INCOMPLETE**: Bản nháp hữu ích nhưng cần sinh viên sửa hoặc bổ sung.
- **INVALID**: Bị loại vì mâu thuẫn với requirement hoặc kỹ thuật kiểm thử.

## 3. Bảng audit

| Artifact | Prompt + Công cụ | Output của AI | Verdict | Lý do đánh giá | Sinh viên đã sửa |
|---|---|---|---|---|---|
| Phân tích Domain Testing và test case FR-10 | Công cụ: Codex. Prompt: tạo artifact Domain Testing cho FR-10 Order State Machine, giữ hướng black-box và không đưa chi tiết API vào test case. | Tạo `analysis/FR-10-order-state-machine/domain-testing-analysis.md`, 14 test case và file review. | **INCOMPLETE** | Độ bao phủ state machine hữu ích, nhưng FR-10 không đặc tả trực tiếp mọi điều kiện actor/xác thực. Một số case cần ghi là giả định thay vì rule chắc chắn. | Giữ 14 case đại diện, đánh dấu Guest/chưa đăng nhập là `Giả định cần xác nhận`, và không khẳng định Admin được hủy đơn `shipping` nếu requirement chưa nêu. |
| Phân tích Boundary Value Analysis cho FR-10 | Công cụ: Codex. Prompt: chỉ áp dụng BVA cho FR-10 nếu có boundary thật. | Tạo BVA analysis và review kết luận không áp dụng BVA; không sinh test case BVA. | **VALID** | Input chính của FR-10 là trạng thái và actor/action dạng phân loại. Nếu xem thứ tự trạng thái là boundary số học thì sẽ bịa constraint. | Chấp nhận. Artifact BVA giải thích rõ vì sao không tạo test case BVA. |
| Execution và bug report FR-10 | Công cụ: Codex. Prompt: ghi nhận kết quả execution người dùng cung cấp và tạo bug report cho các test case Fail của FR-10. | Tạo `tests/test-runs/FR-10-order-state-machine-run.md` và `BUG-FR10-001` đến `BUG-FR10-003`. | **VALID** | Bug report dựa trên test case Fail, Actual Result và screenshot evidence. Ba defect được tách theo root cause: chuyển từ final state, User hủy đơn shipping, và lỗi phân quyền API Admin. | Chấp nhận sau khi map từng test case Fail với một bug report và liên kết screenshot evidence. |
| Cập nhật main report và README sau khi merge FR-10 | Công cụ: Codex. Prompt: đọc material mới, cập nhật `reports/main-report.md`, `README.md` và file liên quan; thêm link video demo. | Cập nhật tổng số test case, section FR-10, bug summary và link demo. | **INCOMPLETE** | Phần FR-10 đã được nối đúng, nhưng review sau đó phát hiện còn thiếu PDF export, link GitHub Issue đang `TBD`, và dòng đề bài còn ghi filename. | Sửa trong lượt tài liệu này; link GitHub Issue được để sang phase tạo issue. |
| Audit toàn repo theo đề HW02 | Công cụ: Codex. Prompt: scan repo theo đề HW02 - Domain Testing on EShop và liệt kê tài liệu thiếu/sai, khác format, alignment bug report và nguy cơ hallucination. | Tạo báo cáo readiness, chỉ ra thiếu AI Critique, sai AI Audit Report, gap analysis rỗng, git log placeholder, thiếu PDF, hallucination `FR-22`, và thiếu link GitHub Issue. | **VALID** | Audit phát hiện các lỗi ở mức bài nộp mà main report không tự thể hiện. | Dùng làm cơ sở cho kế hoạch sửa tài liệu hiện tại. |
| Review reference FR-02 | Công cụ: Codex. Prompt: kiểm tra analysis có đúng và không hallucination không. | Phát hiện các tham chiếu `FR-22` trong Domain Testing analysis/review của FR-02. | **INCOMPLETE** | Finding đúng: artifact gốc tham chiếu requirement không tồn tại. Nguồn đúng là GUI requirement `GUI-02`. | Thay `FR-22` bằng `GUI-02` và chỉnh lại wording tiếng Việt trong FR-02. |
| Review evidence bug FR-26 | Công cụ: Codex + giải thích của sinh viên. Prompt: kiểm tra bug report có khớp screenshot/test case không. | Ban đầu đánh dấu `BUG-FR26-003` là evidence yếu hơn vì không có screenshot dialog. | **INCOMPLETE** | Sinh viên xác nhận defect là dialog không xuất hiện và item bị xóa ngay, nên không thể có screenshot của dialog. Screenshot dùng chung + Actual Result trong test run là evidence hợp lý. | Giữ screenshot mobile cart dùng chung và bổ sung ghi chú evidence giải thích vì sao việc không xuất hiện dialog được chứng minh bằng quan sát execution. |
| Tái sử dụng script export PDF | Công cụ: Codex. Prompt: dùng lại `export_pdf.py` từ homework trước và sửa nhẹ cho repo hiện tại. | Cập nhật danh sách file export và đường dẫn output cho HW02. | **VALID** | Việc tái sử dụng script phù hợp vì đề yêu cầu bản Markdown và PDF. Script cũ chỉ cần đổi path và danh sách file. | Export hiện gồm README, main report, AI Critique, AI Audit Report, prompt log và git log. |

## 4. Tóm tắt độ chính xác của AI

| Metric | Số lượng | Tỷ lệ |
|---|---:|---:|
| Nhóm artifact có AI hỗ trợ được audit | 8 | 100% |
| VALID | 4 | 50% |
| INCOMPLETE | 4 | 50% |
| INVALID | 0 | 0% |

## 5. Rủi ro AI đã phát hiện

| Rủi ro | Ví dụ | Cách xử lý |
|---|---|---|
| Bịa requirement reference | FR-02 analysis từng tham chiếu `FR-22`, trong khi requirement này không tồn tại. | Thay bằng `GUI-02` và kiểm lại traceability. |
| Ép dùng BVA quá mức | FR-10 có thể bị hiểu nhầm là có thứ tự trạng thái dạng số học. | Ghi BVA không áp dụng vì state là categorical. |
| Quá tự tin ở boundary mơ hồ | Hành vi đúng tại mốc 30.000 giây của FR-02 và thao tác giảm số lượng về 0 của FR-26 chưa được đặc tả đầy đủ. | Ghi giả định và giữ Expected Result theo hành vi quan sát được từ requirement. |
| Lệch appendix submission | File AI Audit Report ban đầu thuộc task khác/không khớp HW02. | Viết lại audit report riêng cho HW02 từ artifact hiện tại và prompt log. |
| Diễn giải evidence chưa đủ tinh tế | Không thể chụp dialog xóa FR-26 vì defect là dialog không xuất hiện. | Ghi rõ evidence gồm screenshot trạng thái trước thao tác và Actual Result item bị xóa ngay. |

## 6. Khai báo sử dụng AI

Tôi có sử dụng AI để hỗ trợ phân tích requirement, tạo Domain Testing, tạo Boundary Value Analysis, draft test case, review artifact, ghi nhận execution, draft bug report, draft main report, audit repository và sửa script export PDF. Tôi đã review và chỉnh sửa output của AI dựa trên `requirements/system-requirements.md`, `requirements/api-specification.md`, đề HW02 - Domain Testing on EShop và checklist review của project. Tôi không chấp nhận trực tiếp output AI khi output đó bịa constraint, tham chiếu requirement không tồn tại hoặc cố áp dụng BVA khi không có boundary thật.

## 7. Chữ ký

| Mục | Giá trị |
|---|---|
| Họ tên sinh viên | Hà Bảo Ngọc |
| MSSV | 23127300 |
| Ngày | 01/07/2026 |
| Chữ ký | Hà Bảo Ngọc |
