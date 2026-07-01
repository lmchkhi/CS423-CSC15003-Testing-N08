# Review test case - FR-10: Trạng thái Đơn hàng

## 1. Phạm vi review

| Hạng mục | File / Thư mục |
|---|---|
| Requirement nguồn | `requirements/system-requirements.md` - FR-10 |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md` - chỉ dùng để kiểm tra tính nhất quán kỹ thuật |
| Analysis | `analysis/FR-10-order-state-machine/bva-analysis.md` |
| Test cases | Không tạo test case BVA vì FR-10 không có boundary phù hợp |
| Technique | Boundary Value Analysis (BVA) |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả | Ghi chú |
|---|---|---|
| Requirement reference | Đạt | Analysis truy vết về FR-10. |
| Technique | Đạt | Analysis đánh giá tính phù hợp của Boundary Value Analysis. |
| Có biến có biên hợp lệ | Không | FR-10 chỉ có trạng thái và actor dạng categorical. |
| Không áp dụng BVA máy móc | Đạt | Không tạo ON/OFF giả cho enum trạng thái. |
| Không bịa constraint | Đạt | Không suy diễn trạng thái thành số thứ tự hoặc range. |
| Không tạo test case gượng ép | Đạt | Không tạo thư mục/file test case BVA. |
| Không đưa chi tiết API vào artifact | Đạt | Không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis. |
| Missing requirement | Đạt | Đã ghi rõ FR-10 không đặc tả min/max/range/length/date/time/quantity threshold. |

## 3. Findings cần sửa

| Finding ID | Mức độ | File / dòng | Mô tả vấn đề | Ảnh hưởng | Trạng thái xử lý |
|---|---|---|---|---|---|
| REV-FR10-BVA-001 | Minor | `analysis/FR-10-order-state-machine/bva-analysis.md` | FR-10 có cụm “5 trạng thái”, có thể bị hiểu nhầm là collection-size boundary. | Nếu dùng “4, 5, 6 trạng thái” sẽ tạo test case không thuộc requirement vì số trạng thái không phải input thao tác. | Đã xử lý bằng cách ghi rõ “5 trạng thái” là số phần tử của mô hình, không phải input range. |
| REV-FR10-BVA-002 | Minor | `analysis/FR-10-order-state-machine/bva-analysis.md` | State machine có thứ tự luồng nghiệp vụ nhưng không có thứ tự số học. | Nếu gán `pending = 1`, `confirmed = 2`, ... sẽ bịa mapping và tạo ON/OFF sai. | Đã xử lý bằng cách ghi rõ không suy diễn trạng thái thành số thứ tự. |

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| Không tạo | FR-10 | Đánh giá không áp dụng BVA | Không có boundary hợp lệ | Hợp lệ | Quyết định không tạo test case có truy vết về FR-10 và nguyên tắc không áp dụng BVA cho categorical data. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| `current_status` | Không tạo | Chủ động loại trừ | Enum categorical, không có min/max. |
| `actor` | Không tạo | Chủ động loại trừ | Role categorical, không có boundary point. |
| `action_or_target_status` | Không tạo | Chủ động loại trừ | Cần kiểm thử bằng state transition/Domain Testing, không phải BVA. |
| Số lượng 5 trạng thái | Không tạo | Chủ động loại trừ | Không phải input range hoặc collection-size limit có thể thao tác. |
| Duplicate test case | Không có | Đạt | Không tạo test case nên không có duplicate. |

## 6. Kết luận readiness

Bị chặn do thiếu requirement có boundary phù hợp cho BVA.

Artifact analysis đã sẵn sàng để nộp như bằng chứng đánh giá kỹ thuật: FR-10 không phù hợp BVA và không nên tạo test case BVA. Không có test case BVA để execution.

## 7. Giả định và thông tin cần xác nhận

- Chưa được đặc tả bất kỳ min, max, length, range, date/time, số lần thử, quantity limit hoặc threshold nào trong FR-10.
- Chưa được đặc tả trạng thái có mã số thứ tự mang ý nghĩa nghiệp vụ.
- Nếu giảng viên yêu cầu kiểm thử FR-10, kỹ thuật phù hợp hơn là Domain Testing hoặc state transition testing; phần Domain Testing đã tồn tại trong artifact riêng.
