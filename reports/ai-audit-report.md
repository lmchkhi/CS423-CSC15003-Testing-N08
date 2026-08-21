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

## Entry #2

### (1) Prompt + Tool

| Field             | Content                         |
| ----------------- | ------------------------------- |
| **Tool**          | GPT-5.6 Sol                     |
| **Timestamp**     | 20/08/2026 18:46:34             |
| **Artifact type** | Bộ kiểm thử API Login cho HW06  |

**Full prompt:**

```
Dùng skill [api-testing](skills/api-testing/) để thực hiện test cho api sau: POST /api/login. 
MSSV: 23127062.
```

### (2) AI Output

'''
Mình sẽ dùng skill `api-testing` theo đúng yêu cầu, trước hết đọc toàn bộ hướng dẫn của skill rồi kiểm tra cấu trúc bài tập và đặc tả endpoint `POST /api/login` trước khi chạy test.

Skill yêu cầu pipeline đầy đủ cho đúng một endpoint: lập mô hình coverage, tạo tối thiểu 40 test case, sinh Postman/Newman artifacts, chạy thật, lưu báo cáo/evidence và chỉ lập bug khi lỗi được tái hiện. Mình đang đọc oracle, quy ước artifact và đặc tả repo; chưa dùng implementation làm oracle.

Endpoint hiện chưa chạy ở `localhost:3000`, còn Newman và HTML reporter đã có sẵn trong repo. Lệnh khởi động backend do repo cung cấp là an toàn cho phạm vi bài; mình sẽ dùng dữ liệu mặc định qua API và sắp thứ tự state-transition để tránh các ca khóa tài khoản làm nhiễu những ca còn lại. Đồng thời mình kiểm tra GitHub để đối chiếu label và tránh tạo issue trùng, đúng quy trình của skill.

Đặc tả cho thấy oracle chính là `FR-02`, `SEC-01`, `SEC-05` và schema thành công của API. GitHub đã có các issue trùng chính xác cho lỗi khóa sớm/thời gian khóa và lộ plaintext password (#246/#69), nên nếu tái hiện mình sẽ liên kết issue hiện có, không tạo issue mới. Mình đang materialize 46 ca (37 AI-generated + 9 extension candidates), trong đó các status code âm chưa được đặc tả sẽ được đánh dấu `INCOMPLETE` thay vì tự nhận là product bug.

Backend chưa có dependencies (`express` không tồn tại), nên chưa thể chạy SUT. Repo có `backend/package-lock.json`; mình sẽ cài đúng phiên bản khóa bằng `npm ci` trong `backend`, không cài global.

Suite đã validate thành công: 46 ca, đủ bốn coverage families và giữ `Human review: PENDING`. Tiếp theo mình chạy Newman thật với environment tạm (permissions 0600); các credentials/token chỉ tồn tại lúc chạy và sẽ được redaction khỏi JSON/HTML/CLI artifacts ngay sau đó.

Lần chạy đầu không chạm được SUT vì sandbox chặn kết nối loopback (`connect EPERM 127.0.0.1:3000`), nên đây là environment failure, không phải kết quả test. Artifacts lần này vẫn được giữ và redaction; mình sẽ chạy lại Newman ngoài sandbox để kết nối đúng backend local.

Chạy thật đã xác nhận hai vấn đề rõ ràng, nhưng cũng lộ ra một lỗi thiết kế suite: nhiều ca input validation dùng email thật đã cộng dồn state và khóa tài khoản trước nhóm state-transition, làm nhiễu các ca sau. Mình đang sửa test data để mọi partition âm không liên quan state dùng email không tồn tại, rồi reset database bằng cách khởi động lại SUT và rerun. Kết quả nhiễu này sẽ không được dùng để kết luận defect.

Rerun sạch state đã cho kết quả có thể triage: header `X-Student-Id: 23127062` được chứng minh ở cả 46 request. Hai defect theo oracle rõ ràng đã tái hiện nhiều lần: response thành công trả `user.password` plaintext (SEC-01), và tài khoản bị khóa sau 2 lần sai (FR-02). Các mismatch 400/401 và email trim/case được giữ là specification gap; ca JSON `null` có lỗi generator nên mình sẽ sửa và rerun ca đó trước khi tổng hợp.

Final run đã hoàn tất: 46/46 request thực thi, 12 testcase pass hoàn toàn và 34 testcase có ít nhất một assertion fail; trong 34 ca fail, 9 ca liên quan hai defect xác nhận, phần còn lại là specification gaps về validation/status/schema lỗi. Mình đang cập nhật từng testcase với actual result, tạo hai bug report local liên kết issue trùng (#69 và #246), đồng thời chuẩn bị ảnh console thật bắt buộc của Newman. Vì bước này cần thao tác Terminal UI trên macOS, mình dùng skill `computer-use` để chụp evidence thật, không dựng lại từ log.

Hai bug report local và evidence đã được tạo; duplicate check không phát sinh GitHub write mới. Mình bổ sung một probe 31 giây cho ranh giới hết khóa của FR-02: tạo state bằng đúng hai lần sai, chờ vượt 30 giây rồi thử credentials đúng. Probe đọc account mặc định từ README và chỉ ghi response đã redaction.

Probe ranh giới đã xác nhận thêm cùng root cause #246: sau 31 giây vẫn HTTP 403. Mình đã redaction toàn bộ retained artifacts (scan: 0 credential hits, 0 JWT hits) và chuyển ảnh console sang PNG thật. Bây giờ mình dọn hai file environment/data tạm chứa runtime values và dừng backend test.

Đã hoàn tất kiểm thử `POST /api/login` với MSSV `23127062`.

Kết quả final run:

- 46 test cases: 37 AI-generated + 9 extension candidates.
- 12 Passed, 34 Failed, 0 Blocked.
- Trong 34 ca Failed: 9 ca phát hiện 2 SUT defects; 25 ca được phân loại specification gap/`INCOMPLETE`.
- Cả 46 request đều xác nhận header `X-Student-Id: 23127062`.
- Không phát hiện credentials/JWT còn sót trong artifacts.

Hai defects xác nhận:

- Response login trả plaintext `user.password`, trùng [issue #69](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/69).
- Tài khoản khóa sau 2 lần sai và vẫn khóa sau 31 giây, trùng [issue #246](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/246).

Artifacts chính:

- [Test-run summary](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/test-runs/login-20260820T191531+0700.md)
- [Suite manifest](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/login/suite.manifest.json)
- [Coverage matrix](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/login/coverage-matrix.md)
- [Postman collection](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/login/login.postman_collection.json)
- [Newman HTML report](/Users/lvkhang/Documents/uni/software-testing/HW06/reports/newman/login-20260820T191531+0700/newman-report.html)
- [Bug report SEC-01](/Users/lvkhang/Documents/uni/software-testing/HW06/bugs/login/BUG-LOGIN-001.md)
- [Bug report FR-02](/Users/lvkhang/Documents/uni/software-testing/HW06/bugs/login/BUG-LOGIN-002.md)

![Newman console evidence](/Users/lvkhang/Documents/uni/software-testing/HW06/reports/evidence/login/x-student-id-console/evidence.png)

46 test cases vẫn để `Human review: PENDING`. Các phần sinh viên còn cần tự hoàn thiện gồm human review, sơ đồ generator tự vẽ, AI Audit Report, CI/CD sample runs và commit bài. Hai runtime files chứa credentials đã được xóa và backend test đã dừng. Thay đổi có sẵn trong `skills/api-testing/SKILL.md` được giữ nguyên.
'''

### (3) Verdict

**`[NGƯỜI DÙNG TỰ ĐIỀN]`**

### (4) Reasoning

- _[Người dùng tự điền]_

### (5) Student Fix

- _[Người dùng tự điền]_
