# Review Notes — `<FEATURE-ID>: <Tên tính năng>`

## Thông tin lần review

| Mục | Giá trị |
| --- | --- |
| Feature | `<FEATURE-ID>` |
| Spec | `tests/<feature>.spec.ts` |
| Fixture | `data/<feature>.json` |
| Người review | `<người dùng>` |
| Thời điểm | `<timestamp ISO 8601 thật>` |
| Lệnh đã chạy | `<lệnh thật hoặc Chưa chạy>` |
| Exit code | `<số thật hoặc N/A>` |

## 1. Đối chiếu HW02 vs thực tế

| ID HW02 | Mô tả gốc | Điểm lệch quan sát được | Trạng thái | Điều chỉnh đã duyệt | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `<TC-ID>` | `<mô tả>` | `<không lệch hoặc mô tả lệch>` | `<Khớp / Lệch / Không xác định>` | `<Giữ nguyên / nội dung điều chỉnh>` | `<artifact thật>` |

## 2. Lỗi trong code automation AI sinh

| ID / vị trí | Vấn đề | Vì sao AI có thể bỏ sót | Cách sửa | Kết quả chạy lại | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `<TC-ID hoặc file:dòng>` | `<locator/fixture/assertion/race/...>` | `<nguyên nhân cụ thể>` | `<thay đổi đã review>` | `<Pass / Fail / Chưa chạy>` | `<log/trace/report thật>` |

## 3. Phân loại thất bại

| ID | Kết quả | Phân loại | Căn cứ | Hành động tiếp theo | Bug report |
| --- | --- | --- | --- | --- | --- |
| `<TC-ID>` | `<failed/skipped>` | `<test defect / environment issue / SUT defect / Không xác định>` | `<bằng chứng>` | `<sửa và chạy lại / xử lý môi trường / lập bug>` | `<đường dẫn hoặc N/A>` |

## 4. Ca chưa tự động hóa

| ID | Lý do | Đã thử | Tác động coverage | Hướng xử lý / điều kiện để chạy |
| --- | --- | --- | --- | --- |
| `<TC-ID>` | `<lý do cụ thể>` | `<bằng chứng nỗ lực>` | `<mức ảnh hưởng>` | `<đề xuất>` |

## 5. Coverage assertion và trình duyệt

| Hạng mục | Kết quả thật | Bằng chứng |
| --- | --- | --- |
| Nhóm assertion đã chạy | `<liệt kê ít nhất 3 nếu đạt>` | `<test/report>` |
| Chromium | `<pass/fail/skip/not run>` | `<artifact>` |
| Firefox | `<pass/fail/skip/not run>` | `<artifact>` |
| Edge | `<pass/fail/skip/not run>` | `<artifact>` |
| Metadata report | `<Đã/Chưa thấy Run by và timestamp>` | `<artifact đã mở>` |

## 6. Gap analysis

| Yêu cầu | Kết quả kiểm chứng | Khoảng trống | Mức ảnh hưởng | Hành động đề xuất |
| --- | --- | --- | --- | --- |
| `<yêu cầu HW04>` | `<số liệu/hành vi thật>` | `<gap hoặc Không>` | `<High/Medium/Low>` | `<hành động>` |

## Checkpoint E

- Điểm chưa chắc chắn: `<liệt kê hoặc Không>`
- Trạng thái gap analysis: `<Chờ duyệt / Đã duyệt>`
- Bằng chứng duyệt: `<prompt/timestamp>`
