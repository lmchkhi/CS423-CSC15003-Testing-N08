# TC-FR14-DT-001: Admin xem danh sách danh mục (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin có JWT hợp lệ và `role = 'admin'` |
| Category list | Data state | Danh sách có thể rỗng hoặc có nhiều danh mục |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` / `Admin123!` đăng nhập thành công trên Web Admin.

## Test data

| Field | Value |
| --- | --- |
| Admin account | `admin@eshop.com` |
| Admin URL | `http://localhost:5174` |
| API check | `GET /api/categories` |

## Test steps
1. Đăng nhập Web Admin bằng `admin@eshop.com`.
2. Mở màn hình quản lý danh mục.
3. Quan sát danh sách danh mục đang hiển thị.
4. Gọi `GET /api/categories` để đối chiếu dữ liệu nếu cần.

## Expected result
Admin xem được màn hình quản lý danh mục; danh sách trên Web Admin hiển thị đúng dữ liệu danh mục hiện có và không báo lỗi quyền truy cập.

## Status / Related bugs
Passed / None
