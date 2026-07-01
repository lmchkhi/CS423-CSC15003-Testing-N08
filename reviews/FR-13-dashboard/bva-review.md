# Review test case - FR-13: Dashboard

## 1. Phạm vi review

| Hạng mục | File |
|---|---|
| Requirement chính | `requirements/system-requirements.md` - FR-13 |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md` |
| BVA assessment | `analysis/FR-13-dashboard/bva-analysis.md` |
| Test cases BVA | Không có test case BVA được tạo |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Có boundary min/max/range/length/date/quantity limit được đặc tả | Không |
| Có áp dụng BVA | Không áp dụng |
| Có tạo test case BVA | Không |
| Có tạo test case gượng ép | Không |
| Có đưa chi tiết kỹ thuật API không cần thiết vào artifact | Không |
| Có ghi rõ requirement gap | Có |

## 3. Findings cần sửa

Không có finding Critical/Major/Minor cần sửa.

| Finding ID | Mức độ | File / dòng | Mô tả | Ảnh hưởng | Trạng thái |
|---|---|---|---|---|---|
| Không có | - | - | BVA assessment kết luận không áp dụng BVA cho FR-13 vì thiếu boundary được đặc tả; quyết định này phù hợp với requirement và skill. | - | Đã review |

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| Không áp dụng | FR-13 | BVA applicability assessment | Không có boundary hợp lệ | Hợp lệ | Không tạo test case vì không có boundary để trace. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| `order.status = 'delivered'` | Không áp dụng BVA | Hợp lệ | Đây là categorical condition, phù hợp Domain Testing hơn BVA. |
| `order.total_amount` | Không áp dụng BVA | Bị chặn do thiếu requirement | Không có min/max/range/ngưỡng số tiền trong FR-13. |
| Tổng số đơn hàng | Không áp dụng BVA | Bị chặn do thiếu requirement | Không có collection size limit, upper bound hoặc threshold hành vi. |
| Quyền Admin | Không áp dụng BVA | Hợp lệ | Đây là access-control state, không phải boundary. |
| Duplicate với Domain Testing | Không tạo test case BVA | Đạt | Tránh lặp lại các case dữ liệu rỗng hoặc delivered/non-delivered dưới nhãn BVA. |

## 6. Kết luận readiness

Bị chặn do thiếu requirement.

FR-13 không có boundary phù hợp để execution bằng Boundary Value Analysis. Không cần sửa artifact và không nên tạo test case BVA cho FR-13 nếu requirement không bổ sung min/max, range, quantity limit, date/time range hoặc threshold rõ ràng.

## 7. Giả định và thông tin cần xác nhận

- Nếu giảng viên hoặc product owner yêu cầu BVA cho FR-13, cần bổ sung boundary cụ thể, ví dụ giới hạn số đơn hiển thị, khoảng thời gian thống kê, giới hạn giá trị tiền, quy tắc làm tròn hoặc phân trang.
- Với requirement hiện tại, Domain Testing là kỹ thuật phù hợp hơn để kiểm tra rule tính tổng doanh thu và tổng số đơn hàng.
