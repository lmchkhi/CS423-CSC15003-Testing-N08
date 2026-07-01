# Review test case - FR-26: Giỏ hàng trên Mobile

## 1. Phạm vi review

| Hạng mục | File / Thư mục |
|---|---|
| Requirement chính | `requirements/system-requirements.md`, FR-26, FR-07 và FR-06 cho lower boundary của số lượng |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md`, chỉ dùng để kiểm tra tính nhất quán kỹ thuật, không đưa chi tiết kỹ thuật triển khai hoặc công cụ kiểm thử vào artifact |
| BVA analysis | `analysis/FR-26-mobile-cart/bva-analysis.md` |
| BVA test cases | `tests/test-cases/FR-26-mobile-cart/bva/TC-FR26-BVA-001.md` đến `TC-FR26-BVA-005.md` |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Technique | Đúng Boundary Value Analysis (BVA) |
| Quyết định áp dụng BVA | Áp dụng cho lower boundary của `cartLineQuantity` và empty/non-empty boundary của `cartItemCount` |
| Boundary được cover | `cartLineQuantity`: OFF⁻ = 0, ON = 1, OFF⁺ = 2; `cartItemCount`: ON = 0, OFF⁺ = 1 |
| Boundary không tạo test | `cartItemCount = -1` vì không thể tạo qua black-box |
| Upper boundary | Không tạo vì chưa được đặc tả |
| Ngôn ngữ | Tiếng Việt có dấu chuẩn |
| Test data cụ thể | Đạt |
| Expected Result quan sát được | Đạt |
| Status ban đầu | `Not Run / None` |
| API spec chỉ dùng để đối chiếu | Đạt |
| Kết luận | Sẵn sàng execution, với giả định lower boundary đã được ghi rõ |

## 3. Findings cần sửa

| Finding ID | Mức độ | File | Mô tả vấn đề | Ảnh hưởng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|---|
| REV-FR26-BVA-001 | Major | `analysis/FR-26-mobile-cart/bva-analysis.md` | Cần đổi test data sản phẩm cũ sang sản phẩm yêu cầu trong prompt hiện tại. | Dữ liệu test không khớp yêu cầu người dùng và dễ giống artifact nhánh khác. | Thay bằng `iPhone 15 Pro Max` giá `30000000` và cập nhật thành tiền tương ứng. | Đã xử lý |
| REV-FR26-BVA-002 | Major | `analysis/FR-26-mobile-cart/bva-analysis.md` | Có thể bổ sung boundary meaningful cho `cartItemCount` vì requirement có trạng thái giỏ trống và giỏ có sản phẩm. | Thiếu cơ hội cover BVA không trùng hoàn toàn với FR-07. | Thêm `cartItemCount = 0` và `cartItemCount = 1`; không tạo `-1` vì không executable qua black-box. | Đã xử lý |
| REV-FR26-BVA-003 | Major | `tests/test-cases/FR-26-mobile-cart/bva/TC-FR26-BVA-002.md` | OFF⁻ = 0 của quantity liên quan đến hành vi xóa sản phẩm, nhưng FR-26 không đặc tả chính xác bấm - tại số lượng 1 phải giữ nguyên hay mở dialog. | Expected Result có thể vượt quá requirement nếu ép một hành vi cụ thể. | Viết Expected Result theo ràng buộc quan sát được: không hiển thị dòng số lượng 0; nếu xóa thì phải có dialog xác nhận trước. | Đã xử lý |
| REV-FR26-BVA-004 | Minor | Tất cả test case BVA | Cần bảo đảm không gán Passed/Failed khi chưa execution. | Sai trạng thái test trước khi chạy. | Đặt `Status / Related bugs` là `Not Run / None`. | Đã xử lý |

Không còn finding mở cần sửa trước execution.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR26-BVA-001 | FR-26, FR-07, FR-06 | COND-FR26-BVA-001 | BV-CARTQTY-001 / ON = 1 | Hợp lệ | Cover số lượng hợp lệ tại lower boundary. |
| TC-FR26-BVA-002 | FR-26, FR-07, FR-06 | COND-FR26-BVA-002 | BV-CARTQTY-002 / OFF⁻ = 0 | Hợp lệ | Cover giá trị dưới lower boundary, không ép hành vi xóa cụ thể ngoài yêu cầu dialog. |
| TC-FR26-BVA-003 | FR-26, FR-07, FR-06 | COND-FR26-BVA-003 | BV-CARTQTY-003 / OFF⁺ = 2 | Hợp lệ | Cover giá trị ngay trên lower boundary. |
| TC-FR26-BVA-004 | FR-26, FR-07 | COND-FR26-BVA-004 | BV-CARTCOUNT-001 / ON = 0 | Hợp lệ | Cover empty boundary của collection giỏ hàng. |
| TC-FR26-BVA-005 | FR-26, FR-07 | COND-FR26-BVA-005 | BV-CARTCOUNT-002 / OFF⁺ = 1 | Hợp lệ | Cover trạng thái ngay trên empty boundary. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Lower boundary quantity ON = 1 | TC-FR26-BVA-001 | Đạt | Test dữ liệu cụ thể, expected quan sát được. |
| Lower boundary quantity OFF⁻ = 0 | TC-FR26-BVA-002 | Đạt | Invalid case isolate quanh thao tác giảm từ 1. |
| Lower boundary quantity OFF⁺ = 2 | TC-FR26-BVA-003 | Đạt | Valid case isolate quanh thao tác tăng từ 1. |
| Empty collection ON = 0 | TC-FR26-BVA-004 | Đạt | Bổ sung mới, không copy FR-07. |
| Empty collection OFF⁺ = 1 | TC-FR26-BVA-005 | Đạt | Bổ sung mới, không copy FR-07. |
| `cartItemCount = -1` | Không tạo | Hợp lệ | Không thể tạo qua black-box. |
| Upper boundary số lượng/số dòng | Không tạo | Hợp lệ | Chưa được đặc tả. |
| Duplicate với Domain Testing | Có overlap có chủ đích | Chấp nhận | BVA tập trung boundary point; Domain Testing tập trung miền hành vi/UI. |

## 6. Kết luận readiness

Sẵn sàng execution.

Bộ BVA hiện có 5 test case. Ngoài lower boundary số lượng 0/1/2, đã bổ sung boundary empty/non-empty của số dòng sản phẩm trong giỏ. Các boundary chưa có requirement như max quantity, tồn kho, hoặc số dòng giỏ hàng tối đa không bị tạo test case gượng ép.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Lower boundary `cartLineQuantity = 1` áp dụng cho dòng sản phẩm đang tồn tại trong giỏ hàng trên Mobile.
- Chưa được đặc tả: Hành vi chính xác khi bấm nút - tại số lượng 1.
- Chưa được đặc tả: Số lượng tối đa cho một dòng sản phẩm trong giỏ hàng.
- Chưa được đặc tả: Giới hạn tồn kho hoặc số dòng sản phẩm tối đa trong giỏ hàng.
