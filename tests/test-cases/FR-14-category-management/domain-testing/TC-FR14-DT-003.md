# TC-FR14-DT-003: User thường bị chặn khỏi màn hình quản lý danh mục (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | User thường có JWT hợp lệ nhưng `role != 'admin'` |
| Admin route | Route state | Phân hệ Admin chỉ dành cho tài khoản admin |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` / `Test1234!` tồn tại.

## Test data

| Field | Value |
| --- | --- |
| User account | `test@eshop.com` |
| Admin URL | `http://localhost:5174` |

## Test steps
1. Đăng nhập bằng tài khoản user thường nếu Web Admin cho nhập credential.
2. Hoặc gắn token user thường rồi truy cập trực tiếp màn hình quản lý danh mục.
3. Quan sát quyền truy cập và các thao tác quản trị.

## Expected result
User thường bị từ chối truy cập phân hệ quản lý danh mục; hệ thống không cho xem màn hình admin hoặc không cho thao tác thêm/sửa/xóa.

## Status / Related bugs
Passed / None
