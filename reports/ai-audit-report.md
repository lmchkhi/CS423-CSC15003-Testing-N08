# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                            | Giá trị                                                 |
| :----------------------------- | :------------------------------------------------------ |
| **Họ tên sinh viên:**          | Lâm Vĩ Khang                                            |
| **MSSV:**                      | 23127062                                                |
| **Lớp / Khoá:**                | CS423 / CSC13003                                        |
| **Mã bài tập :**               | HW02                                                    |
| **Ngày làm bài:**              | 23-06-2026                                              |
| **Công cụ AI đã dùng:**        | Claude                                                  |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| **Tool**          | Claude                                                                           |
| **Timestamp**     | 08:17 PM 23/06/2026                                                              |
| **Artifact type** | Agent skill 'analyze-and-generate-testcases' và testcases từ skill đó cho feature FR-01 |

**Full prompt:**

````
Từ nội dung sau giúp tôi tạo Skill cho agent phân tích và tạo test case

Tôi sẽ đưa 1 yêu cầu như: 

FR-01: Đăng ký tài khoản

    Người dùng phải cung cấp: Họ Tên, Email, Mật khẩu.
    Email phải có định dạng hợp lệ (user@domain.com) và là duy nhất trong hệ thống.
    Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
    Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp.
    Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

Tôi muốn bạn phân tích chúng bằng kỹ thuật Domain Testing và Boundary Value Analysis. Các phần phân tích theo 2 kỹ thuật đó sẽ được để vào reports/main-report.md, còn các test case cụ thể sau khi được phân tích sẽ được để trong tests/test-cases/, ví dụ tests/test-cases/FR-01-register/TC-FR-01-001.md tương ứng với các giá trị đã được phân tích. Một file md test case sẽ được viết theo format sau: 

'''
# TC-FR-01-001: Đăng ký thành công với dữ liệu hợp lệ

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Equivalence Partitioning

## Preconditions
- User chưa có tài khoản trong hệ thống
- User đang ở trang Đăng ký

## Test data
| Field | Value |
|---|---|
| Họ Tên | Nguyễn Văn A |
| Email | user01@gmail.com |
| Mật khẩu | Abcd@1234 |
| Xác nhận mật khẩu | Abcd@1234 |

## Test steps
1. Mở trang Đăng ký
2. Nhập Họ Tên hợp lệ
3. Nhập Email hợp lệ
4. Nhập Mật khẩu hợp lệ
5. Nhập Xác nhận mật khẩu khớp với Mật khẩu
6. Bấm Đăng ký

## Expected result
Đăng ký thành công và chuyển tới trang Đăng nhập.

## Status / Related bugs
Not Run / None
'''

Với domain testing:
1. Liệt kê input, output 
2. Xác định các phân vùng tương đương (EP) cho các giá trị Valid và Invalid 
3. Tìm các giá trị đại diện cho từng phân vùng

Với BVA: 
1. Tìm các giá trị biên
2. Tìm ra các giá trị xung quanh biên theo quy tắc 3 point boundary 

Đồng thời thêm một file test run tương ứng vào tests/test-runs/FR-01-register-run.md để tôi điền vào các kết quả thực thi, bug liên quan và note, cũng ghi để tổng hợp các kết quả ấy theo trạng thái như Passed / Failed / Blocked / Not run, có thể tham khảo format sau: 

'''
# Test Run: FR-01 — Đăng ký tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-01: Đăng ký tài khoản |
| **Ngày thực thi** | DD/MM/YYYY |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 |
| **Build / Commit** | `commit_hash` |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-01-001 | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-002 | Domain Testing | Đăng ký với Họ Tên rỗng | Nguyễn Văn A | ❌ Failed | [#12](https://github.com/user/repo/issues/12) | Không báo lỗi khi để trống Họ Tên |
| TC-FR-01-003 | Domain Testing | Đăng ký với Email rỗng | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-004 | Domain Testing | Đăng ký với Email sai định dạng | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-005 | Domain Testing | Đăng ký với Email đã tồn tại | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-006 | Domain Testing | Đăng ký với Mật khẩu rỗng | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-007 | Domain Testing | Đăng ký với Mật khẩu < 8 ký tự | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-008 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa | Nguyễn Văn A | 🚫 Blocked | — | Nút đăng ký bị vô hiệu hóa hoàn toàn, không thể submit |
| TC-FR-01-009 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường | Nguyễn Văn A | ⬜ Not Run | — | — |
| TC-FR-01-010 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số | Nguyễn Văn A | ⬜ Not Run | — | — |
| TC-FR-01-011 | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-012 | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-013 | BVA | Mật khẩu đúng 8 ký tự (ON — min) | Nguyễn Văn A | ✅ Passed | — | — |
| TC-FR-01-014 | BVA | Mật khẩu 7 ký tự (OFF⁻ — min-1) | Nguyễn Văn A | ❌ Failed | [#13](https://github.com/user/repo/issues/13) | Mật khẩu 7 ký tự vẫn đăng ký thành công |
| TC-FR-01-015 | BVA | Mật khẩu 9 ký tự (OFF⁺ — min+1) | Nguyễn Văn A | ✅ Passed | — | — |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 10 |
| ❌ Failed | 2 |
| 🚫 Blocked | 1 |
| ⬜ Not Run | 2 |
| **Tổng** | **15** |
'''

Note: 
- Hãy tổ chức skill thành thư mục trong skills/
- Viết skill bằng tiếng anh
- Output nên theo format đã đưa ra và các nội dung được viết bằng tiếng Việt
- Sau mỗi phân tích của mỗi feature trong main-report.md thì cho thêm một section "AI gap analysis" bỏ trống để tôi điền vào sau
````

### (2) AI Output

```
Let me first explore the existing project structure and any relevant past work before creating the skill.

Listed directory CS423-CSC15003-Testing-N08-report
Listed directory knowledge
Listed directory skills
Listed directory tests
Listed directory reports
Listed directory requirements
Listed directory test-cases
Listed directory test-runs
Viewed main-report.md
Viewed README.md:1-62
Listed directory FR-01-register
Viewed ai-audit-report.md:1-107

Now I have a clear picture of the project structure. Let me create the skill. This is a substantial task that warrants a well-organized skill directory. Let me build it now.

Created README.md
Created skill.md
Created main-report-section.md
Created test-case.md
Created test-run.md

The skill templates are created. Now let me **execute** the skill on the FR-01 requirement the user provided. I'll perform the full analysis and generate all outputs.

Let me start by analyzing the requirement and creating all the files:

Edited main-report.md

Now let me create all 16 test case files. I'll create them in parallel batches:

Created TC-FR-01-001.md
Created TC-FR-01-002.md
Created TC-FR-01-003.md
Created TC-FR-01-004.md
Created TC-FR-01-005.md
Created TC-FR-01-006.md
Created TC-FR-01-007.md
Created TC-FR-01-008.md
Created TC-FR-01-009.md
Created TC-FR-01-010.md
Created TC-FR-01-011.md
Created TC-FR-01-012.md
Created TC-FR-01-013.md
Created TC-FR-01-014.md
Created TC-FR-01-015.md
Created TC-FR-01-016.md

Now let me create the test run file:

Created FR-01-register-run.md

Let me verify the complete file structure:

Ran command: `find /home/lvkhang/Documents/school/software-testing/CS423-CSC15003-Testing-N08-report/skills /home/lvkhang/Documents/school/software-testing/CS423-CSC15003-Testing-N08-report/tests /home/lvkhang/Documents/school/software-testing/CS423-CSC15003-Testing-N08-report/reports/main-report.md -type f | sort`

All files are created. Let me create a walkthrough artifact summarizing everything:

Created walkthrough.md

Đã hoàn tất! Đây là tóm tắt những gì đã tạo:

## Skill (`skills/analyze-and-generate-testcases/`)

| File | Mô tả |
|---|---|
| `README.md` | Hướng dẫn sử dụng skill |
| `skill.md` | Instructions chính cho agent (tiếng Anh) — quy trình Domain Testing + BVA |
| `templates/` | 3 templates: main-report section, test case, test run |

## Output cho FR-01 Đăng ký tài khoản

- **`reports/main-report.md`** — Phân tích đầy đủ: 4 inputs, 15 phân vùng EP, bảng 3-Point Boundary + section "AI Gap Analysis" để trống
- **`tests/test-cases/FR-01-register/`** — **16 test cases** (TC-FR-01-001 → 016):
  - 13 Domain Testing (1 happy path + 12 invalid partitions)
  - 3 BVA (ON=8, OFF⁻=7, OFF⁺=9 ký tự)
- **`tests/test-runs/FR-01-register-run.md`** — Bảng theo dõi 16 test cases, tất cả ⬜ Not Run, sẵn sàng để bạn điền kết quả

Mỗi test case chỉ thay đổi **một trường** so với happy path, đúng nguyên tắc "vary one at a time" của Domain Testing. Bạn có thể mở `walkthrough.md` để xem chi tiết hoặc bắt đầu chạy test ngay.
```

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI hoàn thành đúng yêu cầu, tạo ra skill để phân tích. Tuy yêu cầu ban đầu chỉ kêu tạo skill và chỉ lấy FR-01 làm ví dụ nhưng AI tạo luôn test case và test run cho FR-01.
- Phân tích BVA bị dư biên, đề không có giới hạn max độ dài cho password.

### (5) Student Fix

- Kiểm tra skill đã tạo ra đúng chưa.
- Giữ lại test case cho FR-01 để chạy.
- Bỏ biên max độ dài password ra.

## Entry #2

...