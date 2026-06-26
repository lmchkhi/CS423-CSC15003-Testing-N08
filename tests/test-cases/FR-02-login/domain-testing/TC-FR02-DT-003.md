# TC-FR02-DT-003: Chặn email sai định dạng HTML5

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh trường Email áp dụng validate HTML5 format khi người dùng nhập giá trị không phải email.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `not-an-email` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Nhập `not-an-email` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Bấm nút đăng nhập.

## Expected result
Trình duyệt hoặc hệ thống chặn submit vì Email không đúng format HTML5. Không gửi login request thành công, không trả JWT Token, không tạo phiên đăng nhập mới.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-003
- Equivalence class: EC-EMAIL-I02, EC-TOKEN-I01
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
