# Test Cases — `<FEATURE-ID>: <Tên tính năng>`

## Thông tin nguồn

| Mục | Giá trị |
| --- | --- |
| Đường dẫn HW02 | `<đường dẫn do người dùng cung cấp>` |
| Trạng thái nguồn | `<Có HW02 / Không có HW02 — nhánh ngoại lệ đã duyệt>` |
| Lý do ngoại lệ | `<N/A hoặc nguyên văn lý do do người dùng khai báo>` |
| URL SUT | `<URL>` |
| Ngày đối chiếu | `<timestamp ISO 8601 thật>` |
| Checkpoint A | `<Chưa duyệt / Đã duyệt + bằng chứng xác nhận>` |

## Bảng đối chiếu ban đầu

| ID HW02 | Mô tả gốc | Quan sát thực tế | Trạng thái | Bằng chứng | Đề xuất xử lý |
| --- | --- | --- | --- | --- | --- |
| `<TC-ID>` | `<mô tả nguyên bản>` | `<hành vi quan sát qua bề mặt hộp đen>` | `<Khớp / Lệch / Không xác định>` | `<URL/trace/screenshot/network log thật>` | `<Giữ nguyên / điều chỉnh cần duyệt>` |

## Bộ test case cuối

| ID | Tiêu đề | Loại | Tiền điều kiện | Input / fixture key | Bước chính | Expected | Nguồn | Ghi chú thay đổi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<TC-ID>` | `<tiêu đề>` | `<positive / negative / edge>` | `<tiền điều kiện>` | `<fixture key>` | `<các bước hộp đen>` | `<expected đã duyệt>` | `<HW02 / Bổ sung (lý do: ...)>` | `<Không đổi hoặc mô tả thay đổi>` |

## Kiểm tra số lượng và nguồn

| Chỉ số | Giá trị |
| --- | ---: |
| Tổng case HW02 | `<n>` |
| Tổng case bổ sung | `<n>` |
| Tổng cuối | `<n; tối thiểu 12>` |
| Case lệch đã được duyệt điều chỉnh | `<n>` |

## Điểm chưa rõ

| STT | Giả định / điểm chưa rõ | Case ảnh hưởng | Câu hỏi cần xác nhận | Quyết định người duyệt |
| ---: | --- | --- | --- | --- |
| 1 | `<không tự suy đoán>` | `<TC-ID>` | `<câu hỏi cụ thể>` | `<Chờ duyệt>` |

## Checkpoint B

- Trạng thái: `<Chờ duyệt / Đã duyệt>`
- Người duyệt: `<người dùng>`
- Bằng chứng xác nhận: `<prompt/timestamp>`
- Chỉ bắt đầu viết code sau khi trạng thái là `Đã duyệt`.
