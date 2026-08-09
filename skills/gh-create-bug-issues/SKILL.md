---
name: gh-create-bug-issues
description: Tạo GitHub Issues từ Markdown bug reports bằng GitHub CLI (`gh`), quản lý label bắt buộc, suy luận Module/Priority/Severity từ bug report, tạo label còn thiếu, tạo issue bằng `gh issue create`, và cập nhật ngược bug report/main report bằng issue URL. Dùng khi người dùng muốn biến file bug report Markdown thành GitHub issue, đồng bộ issue link vào báo cáo, hoặc chuẩn hóa label issue cho bài testing/HW automation.
---

# GH Create Bug Issues

## Mục tiêu

Tạo GitHub issue từ một hoặc nhiều bug report Markdown một cách nhất quán, có kiểm tra repo/auth, đủ 5 label bắt buộc, không tạo label trùng, và cập nhật lại file liên quan sau khi issue được tạo thành công.

## Workflow bắt buộc

1. Kiểm tra GitHub CLI:
   - Chạy `gh auth status`.
   - Chạy `gh repo view --json nameWithOwner,url`.
   - Nếu thất bại do network/auth/repo context, dừng lại và báo rõ người dùng cần xử lý gì. Không đoán repo target.

2. Lấy label hiện có:
   - Chạy `gh label list --limit 100`.
   - Không dùng output mặc định vì có thể chỉ hiện khoảng 30 label.
   - Build danh sách label theo tên chính xác. Khi cần match label, ưu tiên exact match.

3. Đọc bug report Markdown:
   - Lấy title từ frontmatter `title:`. Nếu thiếu, lấy heading H1 đầu tiên.
   - Lấy body từ chính file bug report. Giữ nguyên nội dung, không xoá Evidence.
   - Lấy `Severity / Priority` từ section tương ứng, ví dụ `Major / P1`.
   - Nếu section thiếu, chọn severity/priority hợp lý từ impact quan sát được và thêm note ngắn vào body issue hoặc bug report.

4. Xác định 5 label bắt buộc:
   - `Type: Bug`
   - `Status: New`
   - `Module: <module>`
   - `Priority: <priority>`
   - `Severity: <severity>`

5. Tạo label còn thiếu:
   - Nếu label cần dùng không tồn tại trong `gh label list --limit 100`, tạo bằng `gh label create`.
   - Không đổi màu, description, hoặc tên label đã tồn tại.
   - Sau khi tạo label mới, thêm label đó vào danh sách local để tránh tạo lại.

6. Tạo issue:
   - Dùng `gh issue create --title <title> --body-file <bug-report-file> --label <label> ...`.
   - Truyền đủ 5 label. Có thể dùng nhiều flag `--label`.
   - Capture URL issue từ output.
   - Nếu `gh issue create` thất bại, không cập nhật file report bằng link giả.

7. Cập nhật file liên quan:
   - Cập nhật bug report Markdown để thêm issue link, ưu tiên section `GitHub Issue` nếu có, nếu không thì thêm dòng trong phần Evidence hoặc cuối file.
   - Cập nhật `reports/main-report.md` nếu file có bảng bug report chứa dòng tương ứng.
   - Nếu có file khác liên quan do user chỉ định, cập nhật cùng issue URL.

8. Ghi chú screenshot:
   - Với screenshot trong issue body, giữ link dạng repo path hoặc GitHub blob URL tới hình ảnh đã được push.
   - Nếu cần ảnh inline trong GitHub issue, thêm note: `Nếu cần ảnh inline trong GitHub issue, upload thủ công screenshot qua GitHub UI sau khi issue được tạo.`

## Suy luận Module

Suy luận module từ title bug report, requirement, hoặc đường dẫn file. Nếu repo đã có label module gần tương đương, dùng đúng tên label repo đang có.

Ví dụ module thường dùng:

| Dấu hiệu trong bug report | Label module đề xuất |
| --- | --- |
| admin login, access control admin login | `Module: Admin Login` |
| dashboard | `Module: Dashboard` |
| category, danh mục | `Module: Category` |
| product, sản phẩm | `Module: Product` |
| csv, import csv | `Module: CSV Import` |
| user management, quản lý user | `Module: User Management` |
| forgot password, quên mật khẩu, reset password | `Module: Forgot Password` |
| order history, lịch sử đơn hàng | `Module: Order History` |

Nếu repo đã có label như `Module: Category Management` thay vì `Module: Category`, dùng exact label đã có trong repo. Nếu không có label tương đương, tạo label mới theo tên nhất quán.

## Suy luận Priority và Severity

Đọc section `Severity / Priority` trong bug report. Chuẩn hóa dạng:

- `Critical / P1` -> `Severity: Critical`, `Priority: P1`
- `Major / P2` -> `Severity: Major`, `Priority: P2`
- `Minor / P3` -> `Severity: Minor`, `Priority: P3`

Nếu thiếu section:

- Chọn `Severity: Critical` khi lỗi làm sai dữ liệu, bypass bảo mật/quyền, hoặc API chấp nhận dữ liệu nguy hiểm.
- Chọn `Severity: Major` khi user flow chính fail hoặc validation quan trọng thiếu.
- Chọn `Severity: Minor` khi lỗi UI/wording/indicator không chặn flow chính.
- Chọn priority theo mức cần sửa: `P0` khẩn cấp, `P1` cao, `P2` trung bình, `P3` thấp.
- Ghi lý do ngắn trong issue body.

## Quy ước tạo label mới

Màu gợi ý:

| Loại label | Màu | Description gợi ý |
| --- | --- | --- |
| `Module: <module>` | `0e8a16` | `Area: <module>` |
| `Priority: P0` | `b60205` | `Urgent priority` |
| `Priority: P1` | `d93f0b` | `High priority` |
| `Priority: P2` | `fbca04` | `Medium priority` |
| `Priority: P3` | `c5def5` | `Low priority` |
| `Severity: Critical` | `b60205` | `Critical impact` |
| `Severity: Major` | `d93f0b` | `Major impact` |
| `Severity: Minor` | `fbca04` | `Minor impact` |
| `Severity: Trivial` | `c2e0c6` | `Trivial impact` |
| `Severity: Block` | `5319e7` | `Blocks testing or release` |

Ví dụ:

```bash
gh label create "Module: Category" --color "0e8a16" --description "Area: Category"
gh label create "Priority: P1" --color "d93f0b" --description "High priority"
gh label create "Severity: Major" --color "d93f0b" --description "Major impact"
```

## Lệnh tạo issue mẫu

```bash
gh issue create \
  --title "[BUG][FR-14] Admin thêm danh mục với tên rỗng vẫn thành công" \
  --body-file bug-reports/automation/BUG-FR14-AUTO-001.md \
  --label "Type: Bug" \
  --label "Status: New" \
  --label "Module: Category" \
  --label "Priority: P1" \
  --label "Severity: Major"
```

Sau khi lệnh trả URL, cập nhật file liên quan bằng URL thật.

## Cập nhật link vào file

Ưu tiên cập nhật theo thứ tự:

1. Trong bug report:
   - Nếu có section hoặc field `GitHub Issue`, thay `TODO` bằng URL.
   - Nếu không có, thêm cuối file:

```markdown
## GitHub Issue
<issue-url>
```

2. Trong `reports/main-report.md`:
   - Nếu bảng bug report có cột `GitHub Issue`, thay `TODO` ở đúng dòng bug report bằng link Markdown `[ #<number> ](<url>)` hoặc URL đầy đủ.
   - Không cập nhật nhầm dòng bug report khác.

3. Trong các file khác:
   - Chỉ cập nhật khi user yêu cầu hoặc file có reference rõ ràng tới bug report đó.

## Quy tắc an toàn

- Không tạo issue nếu chưa xác định được repo target bằng `gh repo view`.
- Không tạo label mới trước khi đã chạy `gh label list --limit 100`.
- Không dùng label thiếu một trong 5 loại bắt buộc.
- Không sửa label đã tồn tại.
- Không tạo GitHub issue trùng nếu bug report đã có issue link; hỏi user hoặc xác nhận trước khi tạo lại.
- Không bịa URL issue. Chỉ cập nhật link sau khi `gh issue create` thành công.
- Nếu cần push screenshot để GitHub issue hiển thị ảnh, báo user rằng ảnh phải được push lên repo hoặc upload thủ công qua GitHub UI.
