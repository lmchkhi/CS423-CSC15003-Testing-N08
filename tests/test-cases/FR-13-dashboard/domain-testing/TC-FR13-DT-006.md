# TC-FR13-DT-006: Từ chối hiển thị Dashboard cho người dùng không có quyền Admin

## Requirement ID
FR-13

## Module / Test type / Technique
Web Admin Dashboard / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `admin_session` | Trạng thái hệ thống | Dashboard thuộc phân hệ Web Admin; quyền truy cập phụ thuộc FR-12. |
| `order_dataset` | Tập dữ liệu | Dữ liệu đơn hàng hợp lệ danh nghĩa được chuẩn bị sẵn để tránh trộn lỗi dữ liệu với lỗi phân quyền. |

### Domain Matrix

| TC | `admin_session` | `order_dataset` | Expected |
|---|---|---|---|
| COND-FR13-DT-006 | EC-ROLE-I01 | EC-DATASET-V02 danh nghĩa | Người dùng không có quyền Admin không xem được Dashboard; dữ liệu dashboard không được hiển thị. |

## Preconditions
- Có tài khoản người dùng thường không có `role = 'admin'`.
- Môi trường test có một đơn hàng hợp lệ danh nghĩa để chứng minh dữ liệu không được hiển thị cho user không có quyền.

## Test data

| Field | Value |
|---|---|
| Tài khoản đăng nhập | User thường có `role = 'user'` |
| Đơn hàng 1 - status | `delivered` |
| Đơn hàng 1 - total_amount | `120000` |
| Tổng doanh thu nếu là Admin | `120000` |
| Tổng số đơn hàng nếu là Admin | `1` |

## Test steps
1. Đăng nhập bằng tài khoản người dùng thường không có quyền Admin.
2. Thử mở màn hình Dashboard của phân hệ Web Admin.
3. Quan sát kết quả truy cập và các chỉ số Dashboard.

## Expected result
Hệ thống từ chối truy cập Dashboard cho người dùng không có quyền Admin. Các chỉ số tổng doanh thu và tổng số đơn hàng không được hiển thị cho người dùng này. Cách hiển thị lỗi hoặc redirect cụ thể chưa được đặc tả.

## Status / Related bugs
Not Run / None
