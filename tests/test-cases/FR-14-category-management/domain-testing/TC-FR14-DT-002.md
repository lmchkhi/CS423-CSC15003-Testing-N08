# TC-FR14-DT-002: Guest bị chặn khỏi màn hình quản lý danh mục (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Guest không có JWT, không có `role = 'admin'` |
| Admin route | Route state | Phân hệ Admin chỉ dành cho admin theo FR-12 |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Trình duyệt không có session/token admin hợp lệ.

## Test data

| Field | Value |
| --- | --- |
| Session | Không đăng nhập |
| Admin URL | `http://localhost:5174` |

## Test steps
1. Mở Web Admin khi chưa đăng nhập.
2. Truy cập trực tiếp màn hình quản lý danh mục nếu biết URL.
3. Quan sát nội dung trang và các nút thêm/sửa/xóa danh mục.

## Expected result
Guest bị chuyển về trang đăng nhập hoặc bị hiển thị lỗi không có quyền; hệ thống không hiển thị dữ liệu quản trị và không cho thao tác thêm/sửa/xóa danh mục.

## Status / Related bugs
Passed / None
