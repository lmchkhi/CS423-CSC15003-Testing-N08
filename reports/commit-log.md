# Commit Log - FR-12 Test Design

## Thay đổi

| Khu vực | File |
| --- | --- |
| Decision Table test cases | `tests/test-cases/FR-12-access-control/decision-table/TC-FR12-DT-001.md` ... `TC-FR12-DT-010.md` |
| Pairwise test cases | `tests/test-cases/FR-12-access-control/pairwise/TC-FR12-PW-001.md` ... `TC-FR12-PW-007.md` |
| Main report | `reports/main-report.md` |
| AI gap analysis | `reports/ai-gap-analysis.md` |
| Bug reports | `reports/bug-reports/BUG-FR12-001.md` ... `BUG-FR12-005.md` |

## Tóm tắt

Tạo và execute bộ test case black-box cho FR-12: Kiểm soát truy cập. Decision table cover các rule cốt lõi về Web Admin, `/api/admin/*`, API ghi dữ liệu products/categories/coupons, token JWT hợp lệ/không hợp lệ và role admin/user. Pairwise test case đã được execute để mở rộng coverage cho các tổ hợp resource-method-auth state có rủi ro. Bug report đã được tách thành từng file riêng trong `reports/bug-reports/`.
