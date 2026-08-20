# HW06 API Test Case Master

File này là bảng master/index để điền dần test cases qua các phase generate, audit, extend và execute. Tất cả test cases phải dựa trên blackbox inputs: `README.md`, `api_specification.md`, observed API responses và execution evidence.

Mỗi test case chi tiết nên có một file Markdown riêng trong `test-cases/hw06-api`. File master này chỉ giữ vai trò index/summary để report dễ tổng hợp.

## 0. Folder layout và naming convention

```text
test-cases/
  hw06-api/
    TEMPLATE-HW06-API-TEST-CASE.md
    fr03-reset-password/
      TC-FR03-API-DOM-001.md
      TC-FR03-API-SEC-001.md
      TC-FR03-API-WF-001.md
      TC-FR03-API-SCH-001.md
    fr09-apply-coupon/
      TC-FR09-API-DOM-001.md
      TC-FR09-API-SEC-001.md
      TC-FR09-API-WF-001.md
      TC-FR09-API-SCH-001.md
    fr17-admin-coupons/
      TC-FR17-API-DOM-001.md
      TC-FR17-API-SEC-001.md
      TC-FR17-API-WF-001.md
      TC-FR17-API-SCH-001.md
```

Quy ước đặt tên:

| Thành phần | Ý nghĩa |
| --- | --- |
| `TC` | Test case |
| `FR03`, `FR09`, `FR17` | Requirement được phân |
| `API` | Phân biệt với test case UI/domain cũ như `TC-FR03-DT-001.md` |
| `DOM` | Domain partition |
| `SEC` | Security |
| `WF` | Workflow/state/lifecycle |
| `SCH` | Schema/contract validation |
| `001` | Số thứ tự trong nhóm |

Template chi tiết: `test-cases/hw06-api/TEMPLATE-HW06-API-TEST-CASE.md`.

## 1. API selection

| API ID | FR | Endpoint | Method | Pool | Vai trò |
| --- | --- | --- | --- | --- | --- |
| API-1 | FR-03 | `/api/reset-password` | POST | Pool A | API chính |
| API-2 | FR-09 | `/api/apply-coupon` | POST | Pool B | API chính |
| API-3 | FR-17 | `/api/admin/coupons` | POST | Pool C | API chính |

## 2. Test case master table

| API ID | TC ID | File | Source | Group | Description | Preconditions | Request/Input | Expected Status | Expected Fields/Assertions | Audit Label | Execution Result | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-1 | Chưa có | `test-cases/hw06-api/fr03-reset-password/` | AI/Human | Domain/Security/Workflow/Schema | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa audit | Chưa chạy | Chưa có |
| API-2 | Chưa có | `test-cases/hw06-api/fr09-apply-coupon/` | AI/Human | Domain/Security/Workflow/Schema | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa audit | Chưa chạy | Chưa có |
| API-3 | Chưa có | `test-cases/hw06-api/fr17-admin-coupons/` | AI/Human | Domain/Security/Workflow/Schema | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa audit | Chưa chạy | Chưa có |

## 3. Audit labels

| Label | Ý nghĩa | Khi dùng |
| --- | --- | --- |
| `VALID` | Case đúng spec và execute được | Giữ lại trong final suite |
| `INVALID` | Case trái spec, invent field, expected sai, hoặc dựa vào white-box assumption | Ghi lý do và sửa hoặc loại khỏi final suite |
| `INCOMPLETE` | Case có ý tưởng hợp lý nhưng thiếu setup/assertion/expected data | Bổ sung rồi mới đưa vào final suite |

## 4. Human extension tracking

| API ID | TC ID | Missed case | Expected result | Vì sao AI bỏ sót |
| --- | --- | --- | --- | --- |
| API-1 | Chưa có | Chưa có | Chưa có | Chưa có |
| API-2 | Chưa có | Chưa có | Chưa có | Chưa có |
| API-3 | Chưa có | Chưa có | Chưa có | Chưa có |

## 5. Execution summary

| API ID | Final cases | Executed | Passed | Failed | Bugs confirmed |
| --- | --- | --- | --- | --- | --- |
| API-1 | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| API-2 | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| API-3 | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| Total | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
