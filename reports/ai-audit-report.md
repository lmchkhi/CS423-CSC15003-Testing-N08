# AI Audit Report (AI-02)

## Thông tin sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW06                    |
| **Ngày làm bài:**       | 18/08/2026 - ../08/2026 |
| **Công cụ AI đã dùng:** | Codex                   |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                           |
| ----------------- | --------------------------------- |
| **Tool**          | GPT-5.6 Sol                       |
| **Timestamp**     | 20/08/2026 13:54:49               |
| **Artifact type** | Agent Skill kiểm thử API cho HW06 |

**Full prompt:**

```
Dựa vào spec của HW06, giúp tôi tạo một agent skill để thực hiện api testing.

Khi người dùng input vào một api endpoint và student id, agent sẽ:
- Lấy spec của endpoint trong [api_specification.md](api_specification.md)
- Tạo ra >= 35 test case cho endpoint (mỗi test case là 1 markdown theo format trong [03 - github_testcase_management.pptx](req/03 - github_testcase_management.pptx)) đó, bao phủ:
  - domain partitions
  - state transitions
  - security
  - schema validation
- Tạo các test script để test bằng newman (theo hướng data-driven)
- Thực thi và sử dụng đúng header. Đồng thời tạo ra new man/html report
- Nếu có bug trong quá trình, tạo 1 bug report markdown tương ứng với 1 bug theo format trong [03 - github_testcase_management.pptx](req/03 - github_testcase_management.pptx), phần evidence là screenshot của response từ api hay phần log lỗi.
- Kiểm tra xem github issues có bug đó chưa, chưa thì thêm vào với các tag theo convention hiện có.

Skill tạo bằng tiếng anh nhưng output là tiếng việt, có thể giữ các technical terms bằng tiếng anh cho rõ nghĩa. Skill đặt trong skills/ trong repo
```

### (2) AI Output

'''
Mình sẽ dùng skill `skill-creator` để dựng skill đúng cấu trúc Codex, đồng thời dùng skill `Presentations` để đọc chính xác format test case/bug report trong file PPTX. Sau đó mình sẽ đối chiếu `api_specification.md`, convention GitHub hiện có và tạo skill tiếng Anh trong `skills/`, với output runtime bằng tiếng Việt.

Yêu cầu đã đủ rõ nên mình không cần hỏi thêm. Mình đang trích cấu trúc testcase/bug report từ slide, đồng thời kiểm tra cách repo đang đặt label, issue template và header API để skill có thể vận hành đúng convention thay vì hard-code phỏng đoán.

Mình thấy repo còn có bản đề bài chính thức `req/2026.HW06.API Testing_En.pdf`, nên mình sẽ dùng thêm skill `pdf` để kiểm tra các ràng buộc HW06 (cấu trúc thư mục, header, report, GitHub Issues). Việc này giúp skill bám cả đề bài lẫn API spec, không chỉ bám mô tả ngắn trong prompt.

Format trong slide đã được xác định: mỗi testcase là một file Markdown có Requirement ID, Module/Test type/Technique, Preconditions, Test data, Test steps, Expected result, Status/Related bugs; bug report phải có Found by Test Case, requirement, severity/priority, environment, reproduce steps, expected/actual và evidence. Mình sẽ dùng thêm skill `github` ở chế độ read-only để lấy đúng label/issue convention hiện tại trước khi mã hóa quy trình tạo issue vào skill.

GitHub CLI trong máy hiện không truy cập được API do token đăng nhập đã hết hạn, nhưng convention cục bộ đã đủ rõ từ issue template: title `[BUG][<Module>] ...`, labels mặc định `Type: Bug` và `Status: New`, cùng nhóm Module/Severity/Priority. Trong skill mình sẽ buộc agent kiểm tra live labels/issues trước khi tạo; nếu GitHub chưa xác thực thì dừng phần publish và vẫn lưu bug report/evidence cục bộ, tuyệt đối không giả vờ đã tạo issue.

Mình sẽ đóng gói skill theo pipeline có checkpoint rõ ràng: sinh tối thiểu 35 AI cases, tạo thêm tối thiểu 5 extension candidates (tổng thường ≥40), giữ trạng thái human review minh bạch, biên dịch data file thành Postman collection, chạy Newman với `X-Student-Id`, thu evidence thật, rồi mới deduplicate/publish bug. Skill sẽ không tự nhận phần “human review” đã hoàn tất và không tạo evidence giả—đây là hai ràng buộc quan trọng của đề HW06.

Bộ khung skill đã hoàn tất và qua kiểm tra cú pháp. Mình đang chạy forward check ở mức script với một manifest giả lập 40 cases để bắt lỗi thực tế trong validator, Markdown renderer và Postman collection builder; mình cũng đang siết phần variable resolution/redaction để không vô tình ghi credential vào testcase.

Kiểm tra thực tế đã bắt được và sửa một lỗi URL builder (`//api/...` do Postman tái dựng URL từ host/path). Validator hiện chấp nhận đúng 40-case fixture (35 generated + 5 extension), renderer sinh đủ 40 file Markdown và collection có cả `X-Student-Id` lẫn logic `Authorization`. Runner cũng fail rõ ràng khi thiếu `newman-reporter-htmlextra`, thay vì báo cáo HTML giả.

Đã tạo agent skill tại [skills/hw06-api-testing/SKILL.md](/Users/lvkhang/Documents/uni/software-testing/HW06/skills/hw06-api-testing/SKILL.md).

Skill hỗ trợ:

- Sinh tối thiểu 35 AI-generated test cases và 5 extension candidates.
- Bao phủ domain partitions, state transitions, security và schema validation.
- Mỗi testcase là một Markdown đúng cấu trúc trong PPTX.
- Sinh Postman collection và test data theo data-driven approach.
- Tự động thêm `X-Student-Id` và xử lý `Authorization: Bearer`.
- Chạy Newman, xuất CLI/JSON/HTML report.
- Triage failure, lưu evidence thật và sinh một Markdown cho mỗi bug.
- Kiểm tra duplicate GitHub Issues và sử dụng label convention hiện có.
- Giữ output tiếng Việt, technical terms bằng tiếng Anh.
- Không giả mạo human review, screenshot hay execution evidence.

Các script chính:

- [validate_suite.mjs](/Users/lvkhang/Documents/uni/software-testing/HW06/skills/hw06-api-testing/scripts/validate_suite.mjs)
- [render_testcases.mjs](/Users/lvkhang/Documents/uni/software-testing/HW06/skills/hw06-api-testing/scripts/render_testcases.mjs)
- [build_postman_collection.mjs](/Users/lvkhang/Documents/uni/software-testing/HW06/skills/hw06-api-testing/scripts/build_postman_collection.mjs)
- [run_newman.sh](/Users/lvkhang/Documents/uni/software-testing/HW06/skills/hw06-api-testing/scripts/run_newman.sh)

Đã kiểm tra:

- Official skill validator: `Skill is valid!`
- Fixture 40 cases: hợp lệ.
- Sinh thành công 40 Markdown testcases.
- Sinh thành công Postman collection và data file.
- Xác nhận logic header, schema assertion và URL.
- Newman runner phát hiện đúng khi thiếu `newman-reporter-htmlextra`.

Ví dụ sử dụng:

```text
Use $hw06-api-testing to test POST /api/login with student ID 22123456.
```

GitHub CLI hiện có token hết hạn, nên khi thực thi phần tạo issue cần đăng nhập GitHub lại. Skill sẽ không tuyên bố đã tạo issue nếu authentication thất bại.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- Testcase markdown không hiển thị đầy đủ Expected Result, dù Newman vẫn chạy các assertion đó.

### (5) Student Fix

- Render đủ các loại bodyAssertions vào phần Expected result.
