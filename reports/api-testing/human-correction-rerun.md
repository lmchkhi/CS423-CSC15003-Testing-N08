# Chỉnh sửa thủ công và chạy lại toàn bộ — Pool A, B, C

## Phạm vi và quy tắc đánh giá

- Các nhãn gốc của Giai đoạn C được giữ lại làm lịch sử rà soát.
- Mọi trường hợp trước đó có trạng thái `INVALID`, `INCOMPLETE`, hoặc chưa được tự động hóa đều đã được chỉnh sửa thành trường hợp kiểm thử cuối cùng có thể thực thi được.
- Các oracle có nguồn gốc được ưu tiên. Việc xác thực sản phẩm FR-16 kế thừa các ràng buộc FR-15 cho cùng một thực thể sản phẩm: tên là bắt buộc và tối đa 255 ký tự, giá là bắt buộc và phải lớn hơn không, danh mục là bắt buộc và phải tồn tại.
- Trong trường hợp các yêu cầu được cung cấp không đề cập, oracle được xác định rõ ràng là hợp đồng kiểm thử do con người phê duyệt, không phải văn bản từ đặc tả gốc.
- Báo cáo Đánh giá AI không bị chỉnh sửa.

## Tóm tắt chỉnh sửa

| Pool | FR | Đã thiết kế | Trường hợp cuối cùng có thể thực thi đã chỉnh sửa | Loại trừ sau chỉnh sửa |
|---|---|---:|---:|---:|
| A | FR-05 | 45 | 45 | 0 |
| B | FR-11 | 80 | 80 | 0 |
| C | FR-16 | 45 | 45 | 0 |
| **Tổng** | — | **170** | **170** | **0** |

### Các chỉnh sửa FR-05

- Lược đồ phản hồi: `FR05-LST-003` kiểm tra `id`, `name`, `price`, `description`, `imageUrl`, và `category_id`.
- Ngữ nghĩa tìm kiếm: `FR05-EXI-003`–`005`, `FR05-ONE-001`, và `FR05-NUM-001` sử dụng các oracle được phê duyệt cho tiền tố, chuỗi con, không phân biệt hoa thường ASCII, một ký tự, và phân vùng số.
- Đầu vào rỗng/trùng lặp/khoảng trắng: `FR05-EMP-001`–`004` và `FR05-WS-001`–`003` có các oracle xử lý an toàn hoặc chuẩn hóa xác định.
- Độ dài và mã hóa: `FR05-LEN-001`–`002`, `FR05-ENC-001`–`003`, và `FR05-SPC-004` kiểm tra xử lý có giới hạn, giải mã đơn, và tương đương truyền tải.
- Ký tự đặc biệt SQL/bảo mật: `FR05-SPC-001`–`003` yêu cầu các ký tự meta phải giữ nguyên là dữ liệu và không mở rộng kết quả.
- Unicode: `FR05-UNI-002`–`003` sử dụng các oracle khả dụng NFC/NFD và không phân biệt dấu đã được phê duyệt.
- `FR05-SEC-005` được chỉnh sửa thành khẳng định ở ranh giới API. Nó không tuyên bố thay thế kiểm thử sink trên trình duyệt.

### Các chỉnh sửa FR-11

- Phản hồi danh sách và ánh xạ trường: `FR11-MYO-001`–`003`, `009`–`013`, và `035` sử dụng dữ liệu cố định có kiểm soát và các trường được hỗ trợ bởi triển khai.
- Các trường hợp định danh: `FR11-MYO-029`, `031`–`033` sử dụng dữ liệu cố định cho thiếu định danh, quản trị viên, mồ côi, và Authorization trùng lặp.
- `FR11-MYO-034` được giữ lại như kiểm tra header gán bắt buộc.
- `FR11-MYO-H03` được thiết kế lại từ việc tiêm lỗi DB không an toàn thành trường hợp nhất quán đọc lặp lại.
- Chi tiết và quyền sở hữu: `FR11-DET-001`–`007`, `009`–`010`, `013`–`015`, `034`–`035` có các oracle cho trường có kiểm soát, quyền sở hữu, từ chối, và lược đồ.
- Phân vùng ID: `FR11-DET-016`–`024` yêu cầu các ID không chuẩn phải bị từ chối thay vì bị ép kiểu sang các bản ghi hiện có.

### Các chỉnh sửa FR-16

- `FR16-VLD-004` kiểm tra tính trung thực toàn bộ trường và không còn bị trùng lặp.
- `FR16-NAME-003`–`005` bao phủ tên null, chỉ có khoảng trắng, và vượt quá 255 ký tự.
- `FR16-PRICE-004`–`005` bao phủ giá không phải số và giá bị thiếu.
- `FR16-CAT-002`–`004` bao phủ danh mục không tồn tại, bị thiếu, và sai kiểu dữ liệu.
- `FR16-SEC-002` kiểm tra nội dung script như dữ liệu trơ ở ranh giới API/dữ liệu; việc thoát ký tự trên trình duyệt vẫn là mối quan tâm riêng của UI.
- `FR16-SEC-003` kiểm thử một JWT vai trò quản trị viên đã ký mà không có claim định danh.
- `FR16-H02` cho phép nhập hoàn chỉnh 501 dòng hoặc từ chối nguyên tử `413`; commit một phần bị cấm.
- `FR16-H03` sử dụng chính sách đã được phê duyệt rằng các dòng trùng lặp được xử lý độc lập vì không có quy tắc tính duy nhất nào được cung cấp.

## Kết quả chạy lại cuối cùng

| FR | Trường hợp đã thực thi | Trường hợp đạt | Trường hợp thất bại | Khẳng định đạt | Khẳng định thất bại |
|---|---:|---:|---:|---:|---:|
| FR-05 | 45 | 35 | 10 | 108 | 11 |
| FR-11 | 80 | 60 | 20 | 167 | 22 |
| FR-16 | 45 | 29 | 16 | 89 | 16 |
| **Tổng** | **170** | **124** | **46** | **364** | **49** |

FR-05 có 119 khẳng định trong các lần chạy chính và baseline rỗng.

### Danh sách ID trường hợp thất bại

- FR-05: `FR05-H05`, `FR05-SEC-001`, `FR05-SEC-002`, `FR05-SEC-004`, `FR05-SPC-002`, `FR05-SPC-003`, `FR05-UNI-002`, `FR05-UNI-003`, `FR05-WS-002`, `FR05-WS-003`.
- FR-11: `FR11-MYO-029`, `FR11-MYO-033`, `FR11-DET-009`, `010`, `011`, `013`, `014`, `020`, `021`, `022`, `024`, `026`–`034`.
- FR-16: `FR16-AUTH-002`, `FR16-H05`, `FR16-SEC-003`, `FR16-PRICE-002`–`005`, `FR16-ATOM-001`–`004`, `FR16-CAT-002`–`004`, `FR16-NAME-004`–`005`.

## Bằng chứng cuối cùng

- FR-05: `tests/api-testing/evidence/fr-05/20260821-223004/`
- FR-11: `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/`
- FR-16: `tests/api-testing/evidence/fr-16/20260821-223035/`

Mã thoát khác không của Newman là bằng chứng dự kiến cho các lỗi khẳng định của SUT. Tất cả các lần chạy cuối cùng đều hoàn thành với không lỗi truyền tải và không lỗi runtime của test-script.

## Tái tạo

```powershell
node tests/api-testing/scripts/generate-fr05-postman.js
node tests/api-testing/scripts/generate-fr11-postman.js
node tests/api-testing/scripts/generate-fr16-postman.js
node tests/api-testing/scripts/upgrade-corrected-suites.js
node tests/api-testing/scripts/run-fr05-newman.js
```

Đối với FR-11, tạo một thư mục evidence rỗng và truyền vào `run-fr11-newman.js`. Chạy FR-16 với `node tests/api-testing/scripts/run-fr16-newman.js`. Chạy cả ba runner tuần tự vì mỗi runner sử dụng cổng cục bộ 3000.
