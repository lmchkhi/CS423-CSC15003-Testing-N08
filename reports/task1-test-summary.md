# Task 1 Test Summary - GUI Checklist

## Scope

Task 1 kiểm thử GUI cho các màn hình Admin của EShop:

- Admin Login
- Admin Dashboard
- Category Management
- Product Management, bao gồm CSV import
- User Management
- Một nhóm kiểm tra chung cho toàn bộ Admin screens

## Test Environment

| Thành phần | Giá trị |
| --- | --- |
| Application | EShop Web Admin |
| Frontend URL | `http://localhost:5174/` |
| Backend URL | `http://localhost:3000` |
| Primary browser | Chrome local |
| Additional browser note | Một số item compatibility trong Task 1 có ghi nhận Chrome và Edge |
| Mobile status | Chưa test trực tiếp trên mobile; responsive được kiểm tra bằng narrow viewport |

## Method

Checklist được thiết kế theo hướng black-box dựa trên SRS, API specification, GUI expectations và hành vi UI quan sát được. Khi thực thi, kết quả được ghi bằng `Pass`, `Fail`, `Blocked` hoặc `Not Run`; các item fail có note, screenshot evidence và bug report tương ứng. Sau khi review, người học bổ sung thêm các item Human Review để ghi nhận những điểm AI bỏ sót.

## Execution Summary

| Metric | Value |
| --- | ---: |
| Screens / flows tested | 6 |
| Checklist items designed | 65 |
| Checklist items executed | 65 |
| Passed | 28 |
| Failed | 37 |
| Blocked | 0 |
| Not Run | 0 |
| Bug reports created | 37 |
| GitHub issues created | 37 |

## Distribution By IA

| IA | Items |
| --- | ---: |
| IA-01 | 23 |
| IA-02 | 15 |
| IA-03 | 7 |
| IA-04 | 20 |

## Distribution By Category

| Category | Items |
| --- | ---: |
| Visual | 14 |
| Functional | 11 |
| Validation | 14 |
| Usability | 1 |
| Responsive | 2 |
| Compatibility | 2 |
| Accessibility | 6 |
| Feedback | 15 |

## Distribution By Screen

| Screen | Items |
| --- | ---: |
| Admin Login | 13 |
| Admin Dashboard | 10 |
| Category Management | 9 |
| Product Management | 22 |
| User Management | 10 |
| All Admin Screens | 1 |

## Main Findings

Product Management là khu vực có nhiều failed item nhất, đặc biệt ở validation, destructive action confirmation, CSV import và feedback state. User Management có lỗi rủi ro cao nhất là UI không ngăn hoặc cảnh báo khi admin tự xóa tài khoản đang đăng nhập. Một nhóm lỗi lặp lại trên nhiều màn hình là thiếu heading `<h1>` đúng ngữ nghĩa, thiếu loading/empty/error state và thiếu confirmation dialog cho thao tác xóa.

## Evidence And Artifacts

| Artifact | Path |
| --- | --- |
| Markdown checklist | `reports/gui-checklist.md` |
| Excel checklist | `reports/gui-checklist-task1.xlsx` |
| Bug reports | `bug-reports/BUG-GUI-*.md`, `bug-reports/BUG-HR-GUI-*.md` |
| GUI screenshots | `reports/screenshots/gui-checklist/` |
| Main report | `reports/main-report.md` |
| GitHub issues | `https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/152` to `#188` |

## Conclusion

Task 1 đã hoàn tất phần checklist design, execution, bug report và GitHub issue publishing. Checklist có 65 item, vượt yêu cầu hơn 40 item trong Submission Regulations. Tất cả item đã được thực thi và các fail item đều có bug report kèm evidence.
