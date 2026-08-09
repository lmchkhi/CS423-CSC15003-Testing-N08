# Test Cases — `FR-08: Thanh toán (Checkout)`

## Thông tin nguồn

| Mục | Giá trị |
| --- | --- |
| Đường dẫn HW02 | `tests/test-cases/FR-08-checkout/bva/TC-FR08-BVA-001.md` đến `003.md`; `tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-001.md` đến `015.md` |
| Trạng thái nguồn | Có HW02 — 18 file vật lý, 15 điểm kiểm tra độc lập sau gộp trùng |
| Lý do ngoại lệ | N/A |
| URL SUT | Backend `http://localhost:3000`; Frontend Web `http://localhost:5173`; Frontend Admin `http://localhost:5174` |
| Ngày đối chiếu | `05/08/2026 12:14` |
| Checkpoint A | Đã duyệt — prompt `approved, continue phase B` |

## Bảng đối chiếu ban đầu

| ID HW02 | Mô tả gốc | Quan sát thực tế | Trạng thái | Bằng chứng | Đề xuất xử lý |
| --- | --- | --- | --- | --- | --- |
| `TC-FR08-BVA-001` | Tổng client `-1` phải bị bỏ qua | Order `27` lưu `-1` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; tự động hóa riêng |
| `TC-FR08-BVA-002` | Tổng client `0` phải bị bỏ qua | Trùng input/outcome với `DT-005` | Trùng lặp | `evidence/phase-a-api-results.md` | Gộp vào `DT-005` |
| `TC-FR08-BVA-003` | Tổng client `1` phải bị bỏ qua | Trùng input/outcome với `DT-004` | Trùng lặp | `evidence/phase-a-api-results.md` | Gộp vào `DT-004` |
| `TC-FR08-DT-001` | Checkout hợp lệ và xóa giỏ | Tạo order đúng tổng, nhưng giỏ không được xóa | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; đại diện `DT-015` |
| `TC-FR08-DT-002` | Thiếu token bị từ chối | HTTP `401` | Khớp | `evidence/phase-a-api-results.md` | Giữ nguyên |
| `TC-FR08-DT-003` | Invalid token bị từ chối | HTTP `403` | Khớp | `evidence/phase-a-api-results.md` | Chốt expected `403` |
| `TC-FR08-DT-004` | Tổng client `1` phải bị bỏ qua | Order `28` lưu `1` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; đại diện `BVA-003` |
| `TC-FR08-DT-005` | Tổng client `0` phải bị bỏ qua | Order `29` lưu `0` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected; đại diện `BVA-002` |
| `TC-FR08-DT-006` | Tổng client `-50000` phải bị bỏ qua | Order `30` lưu `-50000` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected |
| `TC-FR08-DT-007` | Tổng client quá cao phải bị bỏ qua | Order `31` lưu `99999999` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected |
| `TC-FR08-DT-008` | Thiếu tổng; backend tự tính | Order `32` lưu `null` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected |
| `TC-FR08-DT-009` | Tổng sai kiểu | Order `33` lưu string `NaN` | Lệch | `evidence/phase-a-api-results.md` | Dùng input `NaN`; backend phải bỏ qua và tự tính |
| `TC-FR08-DT-010` | Địa chỉ rỗng | Order `34` lưu chuỗi rỗng | Lệch | `evidence/phase-a-api-results.md` | Đã duyệt: reject nếu không có địa chỉ mặc định |
| `TC-FR08-DT-011` | Thiếu địa chỉ | Order `35` lưu `null` dù hồ sơ có mặc định | Lệch | `evidence/phase-a-api-results.md` | Đã duyệt: dùng địa chỉ mặc định nếu có |
| `TC-FR08-DT-012` | XSS trong địa chỉ phải hiển thị an toàn | API lưu/trả payload như string; FR-08 không kiểm chứng render UI | Khớp (API-only) | `evidence/phase-a-api-results.md`, `evidence/phase-c-run.md`, `evidence/phase-d-run.md` | Chỉ tự động hóa API trong FR-08; không kết luận Pass về chống XSS UI |
| `TC-FR08-DT-013` | SQL payload phải là plain text | Payload lưu nguyên dạng; API orders vẫn hoạt động | Khớp | `evidence/phase-a-api-results.md` | Chốt expected plain text, không thực thi |
| `TC-FR08-DT-014` | Giỏ trống phải bị từ chối | HTTP `200`, tạo order `25` | Lệch | `evidence/phase-a-api-results.md` | Giữ expected |
| `TC-FR08-DT-015` | Xóa giỏ sau checkout | Assertion đã nằm trong `DT-001`; giỏ vẫn còn 1 dòng | Trùng lặp | `evidence/phase-a-api-results.md` | Gộp vào `DT-001` |

## Quy ước dữ liệu chung

- Sản phẩm thật: AirPods Pro 2, `productId=4`, `unitPrice=6,000,000`, `quantity=2`, tổng giỏ kỳ vọng `12,000,000`.
- Case stateful dùng user role `user` sinh tại runtime và xác minh giỏ rỗng trước setup để tránh phụ thuộc dữ liệu giữa các case; credential runtime không lưu trong fixture/report.
- Địa chỉ hợp lệ: fixture key `addresses.valid`; địa chỉ mặc định: `addresses.default`.
- Mỗi expected bên dưới là một kết quả duy nhất. Hành vi SUT đã quan sát không được dùng để hạ assertion chỉ nhằm làm test pass.

## Bộ test case cuối

| ID | Tiêu đề | Loại | Tiền điều kiện | Input / fixture key | Bước chính | Expected | Nguồn | Ghi chú thay đổi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TC-FR08-BVA-001` | Bỏ qua tổng client `-1` | edge | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.bvaNegativeOne` | Login; thêm giỏ; POST checkout với `-1`; đọc order | HTTP `200`; order `pending`; `total_amount=12000000`; không lưu `-1` | HW02 | Thay sản phẩm giả bằng dữ liệu thật |
| `TC-FR08-DT-001` | Checkout hợp lệ và xóa giỏ | positive | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.validCheckout` | Login; checkout; đọc order và giỏ | HTTP `200`; order `pending`, tổng `12000000`; giỏ rỗng sau checkout | HW02 | Đại diện `DT-015`; dùng dữ liệu thật |
| `TC-FR08-DT-002` | Checkout thiếu token | negative | Không đăng nhập | `cases.missingToken` | POST checkout không có Authorization | HTTP `401`; không tạo order | HW02 | Không đổi expected |
| `TC-FR08-DT-003` | Checkout với invalid token | negative | Token cố ý không hợp lệ | `cases.invalidToken` | POST checkout với `Bearer invalid-token` | HTTP `403`; không tạo order | HW02 | Chốt một nhánh duy nhất theo duyệt/quan sát |
| `TC-FR08-DT-004` | Bỏ qua tổng client thấp hơn thực tế (`1`) | edge | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.clientTotalOne` | Checkout với tổng `1`; đọc order | HTTP `200`; order tổng `12000000`, không phải `1` | HW02 | Đại diện `BVA-003`; dùng dữ liệu thật |
| `TC-FR08-DT-005` | Bỏ qua tổng client bằng `0` | edge | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.clientTotalZero` | Checkout với tổng `0`; đọc order | HTTP `200`; order tổng `12000000`, không phải `0` | HW02 | Đại diện `BVA-002`; dùng dữ liệu thật |
| `TC-FR08-DT-006` | Bỏ qua tổng client âm `-50000` | negative | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.clientTotalNegative` | Checkout với tổng âm; đọc order | HTTP `200`; order tổng `12000000`, không phải `-50000` | HW02 | Dùng dữ liệu thật |
| `TC-FR08-DT-007` | Bỏ qua tổng client quá cao | negative | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.clientTotalTooHigh` | Checkout với `99999999`; đọc order | HTTP `200`; order tổng `12000000`, không phải `99999999` | HW02 | Dùng dữ liệu thật |
| `TC-FR08-DT-008` | Backend tự tính khi thiếu `total_amount` | edge | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.missingTotal` | Checkout không gửi trường tổng; đọc order | HTTP `200`; order tổng `12000000`, không phải `null` | HW02 | Chốt expected duy nhất |
| `TC-FR08-DT-009` | Backend bỏ qua string `NaN` | negative | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.nanTotal` | Checkout với `total_amount="NaN"`; đọc order | HTTP `200`; order tổng `12000000`; không lưu string `NaN` | HW02 | Input đổi từ `abc` sang `NaN` theo duyệt; chốt expected duy nhất |
| `TC-FR08-DT-010` | Reject địa chỉ rỗng khi không có mặc định | negative | User hợp lệ cô lập; hồ sơ không có địa chỉ mặc định; giỏ có AirPods ×2 | `cases.emptyAddressNoDefault` | Checkout với `shipping_address=""`; kiểm tra order list | Checkout bị từ chối; không tạo order | HW02 | Nhánh expected đã được người dùng chốt |
| `TC-FR08-DT-011` | Dùng địa chỉ mặc định khi thiếu trường địa chỉ | edge | User hợp lệ cô lập; hồ sơ có `addresses.default`; giỏ có AirPods ×2 | `cases.missingAddressWithDefault` | Cập nhật hồ sơ; checkout không gửi địa chỉ; đọc order | HTTP `200`; order lưu đúng `addresses.default` | HW02 | Nhánh expected đã được người dùng chốt |
| `TC-FR08-DT-012` | Lưu payload XSS như dữ liệu tại checkout API | negative | User hợp lệ cô lập; giỏ có AirPods ×2 | `cases.xssAddress` | Checkout qua API với payload; đọc order detail | HTTP `200`; payload được trả/lưu như string dữ liệu; API không lỗi | HW02 | FR-08 chỉ tự động hóa API; không tuyên bố đã kiểm tra hoặc Pass chống XSS UI |
| `TC-FR08-DT-013` | SQL payload được lưu plain text | negative | User hợp lệ cô lập; giỏ có AirPods ×2; môi trường test cục bộ đã được xác nhận | `cases.sqlAddress` | Checkout với SQL payload; đọc order và gọi lại orders API | HTTP `200`; lưu đúng chuỗi plain text; orders API tiếp tục `200` | HW02 | Expected duy nhất đã được người dùng chốt |
| `TC-FR08-DT-014` | Reject checkout khi giỏ trống | negative | User hợp lệ cô lập; giỏ xác nhận rỗng | `cases.emptyCart` | POST checkout; so sánh order list trước/sau | Checkout bị từ chối; không tạo order | HW02 | Không đổi expected |

## Kiểm tra số lượng và nguồn

| Chỉ số | Giá trị |
| --- | ---: |
| Tổng file/case HW02 | 18 |
| Case trùng gộp, không tự động hóa riêng | 3 |
| Tổng điểm kiểm tra HW02 độc lập cuối | 15 |
| Tổng case bổ sung từ README FR-08 | 6 |
| Tổng cuối | 21 |
| Case có input/expected/precondition được chuẩn hóa | 21 |

## Bộ test UI bổ sung sau README review

Các case này bổ sung coverage UI hộp đen sau Phase E; không thay thế, đổi expected hay gắn lại ID của 15 case HW02 đã duyệt. API chỉ setup user/cart và kiểm tra hậu điều kiện, còn hành động/oracle chính dùng browser page thật.

| ID | Requirement README | Bước UI chính | Expected quan sát được | Artifact |
| --- | --- | --- | --- | --- |
| `FR08-UI-README-001` | Chỉ user đã đăng nhập mới checkout | Mở trực tiếp `/checkout` ở context chưa đăng nhập | Điều hướng tới `/login` | `data/FR-08-checkout-ui.json`, `tests/FR-08-checkout-ui.spec.ts` |
| `FR08-UI-README-002` | UI hiện đủ sản phẩm; tổng tự tính và không chỉnh trực tiếp | Login qua form, mở `/checkout`, đọc DOM/thuộc tính input | Thấy AirPods Pro 2; tổng `12000000`; total không editable | `data/FR-08-checkout-ui.json`, `tests/FR-08-checkout-ui.spec.ts` |
| `FR08-UI-README-003` | Checkout thành công xóa giỏ | Click `Xác Nhận Thanh Toán`, quan sát response/thông báo và đọc lại cart | HTTP `200`; thấy thông báo thành công; cart count `0` | `data/FR-08-checkout-ui.json`, `tests/FR-08-checkout-ui.spec.ts` |
| `FR08-UI-README-004` | Không tạo order khi giỏ trống | Login với backend cart đã xác minh rỗng; mở checkout; thử thao tác nếu nút khả dụng; theo dõi request/order | Checkout action không khả dụng; 0 request; order count không tăng | `data/FR-08-checkout-ui.json`, `tests/FR-08-checkout-ui.spec.ts` |
| `FR08-UI-README-005` | Dùng địa chỉ giao hàng mặc định | Setup địa chỉ profile; login; click checkout; đọc order vừa tạo | HTTP `200`; order lưu đúng địa chỉ mặc định | `data/FR-08-checkout-ui.json`, `tests/FR-08-checkout-ui.spec.ts` |
| `FR08-UI-README-006` | Xóa trạng thái giỏ trên giao diện sau checkout | Thêm sản phẩm vào CartContext qua UI; điều hướng SPA tới checkout; thanh toán; quay lại giỏ | Hiện empty state; sản phẩm đã mua không còn trong DOM | `data/FR-08-checkout-ui.json`, `tests/FR-08-checkout-ui.spec.ts` |

## Case không tự động hóa riêng — gộp vào case đại diện

| ID | Case đại diện | Lý do | Tác động coverage |
| --- | --- | --- | --- |
| `TC-FR08-BVA-002` | `TC-FR08-DT-005` | Cùng `total_amount=0`, precondition và expected | Không mất điểm kiểm tra độc lập |
| `TC-FR08-BVA-003` | `TC-FR08-DT-004` | Cùng `total_amount=1`, precondition và expected | Không mất điểm kiểm tra độc lập |
| `TC-FR08-DT-015` | `TC-FR08-DT-001` | Assertion xóa giỏ đã nằm trong checkout hợp lệ | Không mất assertion; kiểm tra trong case đại diện |

## Điểm chưa rõ

| STT | Giả định / điểm chưa rõ | Case ảnh hưởng | Câu hỏi cần xác nhận | Quyết định người duyệt |
| ---: | --- | --- | --- | --- |
| 1 | FR-08 chỉ kiểm tra checkout API; API persistence không chứng minh an toàn khi render UI | `DT-012` | Có duyệt tự động hóa API-only trong FR-08 và không kết luận Pass về chống XSS UI không? | Đã duyệt — `05/08/2026 12:25`; wording thống nhất lại sau Phase D |
| 2 | API công khai không có thao tác dọn giỏ; stateful case cần user cô lập sinh runtime | Tất cả case có giỏ | Có duyệt precondition user tạm role `user` thay vì dùng chung `test@eshop.com` không? | Đã duyệt — `05/08/2026 12:25` |

## Checkpoint B

- Trạng thái: `Đã duyệt`.
- Người duyệt: người dùng.
- Bằng chứng xác nhận: prompt `05/08/2026 12:25` duyệt user tạm role `user` và DT-012 API-only; prompt `approve, continue phase C` lúc `05/08/2026 12:27` duyệt bảng test cuối.
- Chỉ bắt đầu viết code sau khi trạng thái là `Đã duyệt`.
