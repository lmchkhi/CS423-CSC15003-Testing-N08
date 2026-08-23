# AI Audit Report (AI-02)

## Thông tin sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW06                    |
| **Ngày làm bài:**       | 18/08/2026 - 23/08/2026 |
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

| Field             | Content                        |
| ----------------- | ------------------------------ |
| **Tool**          | GPT-5.6 Sol                    |
| **Timestamp**     | 20/08/2026 18:46:34            |
| **Artifact type** | Bộ kiểm thử API Login cho HW06 |

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

**`INCOMPLETE`**

### (4) Reasoning

- AI tự thêm các extension-candidate test case trong khi không có yêu cầu về vấn đề đó.
- AI tự thêm section `AI audit` thay vì chỉ tạo test case theo format được giao.
- Nhiều testcase ép chính xác status 400 hoặc yêu cầu field error, trong khi đặc tả không định nghĩa error contract.
- TC-003 và TC-004 tự giả định email được chuyển chữ thường hoặc trim khoảng trắng.

### (5) Student Fix

- Bỏ các test case extension-candidate không cần thiết, chỉ giữ 37 AI-generated test case theo yêu cầu.
- Bỏ section `AI audit` trong các test case, chỉ giữ các phần theo format được giao.
- Nới các negative oracle thành nhóm HTTP 4xx và xác nhận response không chứa token hoặc user.
- Bỏ các yêu cầu về field error không có trong đặc tả.
- Chi tiết hơn có thể xem trong main report.

## Entry #3

### (1) Prompt + Tool

| Field             | Content                       |
| ----------------- | ----------------------------- |
| **Tool**          | GPT-5.6 Sol                   |
| **Timestamp**     | 22/08/2026 20:30:16           |
| **Artifact type** | Bộ kiểm thử API Cart cho HW06 |

**Full prompt:**

```
Dùng skill [api-testing](skills/api-testing/) để thực hiện test cho api sau: POST /api/cart.
MSSV: 23127062.
```

### (2) AI Output

'''
Mình sẽ dùng skill `api-testing` theo đúng yêu cầu, trước hết đọc toàn bộ hướng dẫn của skill rồi kiểm tra cấu trúc dự án và API `POST /api/cart`. Sau đó mình sẽ chạy test, lưu bằng chứng/kết quả theo quy trình của skill, với MSSV `23127062`.

Skill đã xác định pipeline đầy đủ: tối thiểu 35 test case, coverage matrix, Postman/Newman, bằng chứng thực thi thật, báo cáo lỗi và đối chiếu GitHub Issue. Mình đang dựng oracle trực tiếp từ đặc tả/requirements; không dùng implementation làm chuẩn kỳ vọng.

Oracle chính đã rõ: `POST /api/cart` bắt buộc JWT; body gồm `id`, `name`, `price`, `quantity`; số lượng phải là số nguyên dương; và thêm lại cùng sản phẩm phải tăng `quantity` thay vì tạo dòng mới. Một số status/error schema không được tài liệu chốt, nên các case đó sẽ được đánh dấu `INCOMPLETE` trong agent audit thay vì biến giả định thành yêu cầu.

Để lấy screenshot bằng chứng Newman từ terminal thật theo skill, mình sẽ dùng thêm skill `computer-use`; việc này chỉ phục vụ thao tác/capture UI, không thay đổi phạm vi test.

Bộ test đã materialize và vượt validator: 42/42 case là `ai-generated`, đủ cả bốn coverage families; 42 file Markdown riêng cùng manifest, test data và Postman collection đã được tạo. Bước tiếp theo là chạy trên một backend mới khởi động để trạng thái giỏ in-memory xác định được, rồi triage từng failure thay vì coi mọi assertion fail là bug.

Lần chạy đầu đã hoàn tất và giữ đủ HTML/JSON/CLI: 42 iterations, 47 requests, 217 assertions; mọi main/workflow request đều có `X-Student-Id: 23127062`. Kết quả ban đầu có 56 assertion failures. Triage sơ bộ cho thấy ba nhóm cần tái hiện tối thiểu: không merge sản phẩm trùng, không validate `quantity`/cart-item schema, và chấp nhận sai `Content-Type`; các case thiếu `id/name` sẽ chưa tự động ghi bug nếu oracle còn mơ hồ.

Ba lỗi đã được tái hiện độc lập 2/2 lần với request tối thiểu và raw evidence đã redacted: sản phẩm trùng tạo hai dòng, `quantity=0` vẫn được lưu, và `text/plain` trả 200 rồi chèn `null` vào giỏ. Mình đang hoàn tất kiểm tra duplicate GitHub trước khi quyết định tạo hay liên kết issue.

Skill `computer-use` xác nhận macOS Terminal bị chặn bởi policy. Theo đúng fallback trong `api-testing`, mình sẽ dùng VS Code integrated terminal, maximize panel và giữ font/zoom hiện tại để chạy lại Newman và chụp evidence thật.

Duplicate check xác nhận lỗi merge sản phẩm đã có issue #151 nên sẽ chỉ liên kết, không tạo trùng. Hai lỗi API còn lại (`quantity=0` và `Content-Type` sai) chưa có issue tương ứng trong cả open/closed search. Screenshot terminal thật đã được lưu cho header, duplicate, quantity validation, Content-Type và Newman summary; không dùng ảnh dựng hoặc mở lại log.

GitHub triage đã hoàn tất: lỗi duplicate liên kết issue hiện có #151; hai lỗi mới đã được tạo và xác minh đúng labels tại #285 (quantity validation) và #286 (Content-Type). Mình đang đồng bộ issue IDs vào từng testcase/manifest, sinh test-run summary tiếng Việt và chạy validation/redaction lần cuối.

Pipeline thực thi đã hoàn tất. Runtime environment chứa JWT đã được xóa khỏi `/tmp` (không thể khôi phục, chỉ là file tạm), backend test đã dừng, và scan artifacts cho 0 JWT/password match. Mình đang chạy kiểm tra bàn giao cuối: validator, counts, Markdown links/artifact layout, `git diff --check` và trạng thái working tree.

Đã hoàn tất kiểm thử `POST /api/cart` với MSSV `23127062`.

Kết quả final run:

- 42 AI-generated test cases, 0 student-authored.
- 13 Passed, 29 Failed, 0 Blocked.
- 47/47 request xác nhận `X-Student-Id: 23127062`.
- 10 testcase phát hiện 3 SUT defects; 19 failure còn lại được phân loại specification gap/`INCOMPLETE`.
- Không còn JWT/password trong artifacts.

Ba lỗi xác nhận:

- Sản phẩm trùng không cộng quantity — duplicate [issue #151](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/151).
- API chấp nhận quantity không hợp lệ — tạo [issue #285](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/285).
- API chấp nhận non-JSON Content-Type và lưu `null` — tạo [issue #286](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/286).

Artifacts chính:

- [Test-run summary](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/test-runs/cart-20260822T204500+0700.md)
- [Suite manifest](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/cart/suite.manifest.json)
- [Coverage matrix](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/cart/coverage-matrix.md)
- [Postman collection](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/cart/cart.postman_collection.json)
- [Newman HTML report](/Users/lvkhang/Documents/uni/software-testing/HW06/test-reports/newman/cart-20260822T204500+0700/newman-report.html)
- [Main report đã cập nhật](/Users/lvkhang/Documents/uni/software-testing/HW06/reports/main-report.md)
- [BUG-CART-001](/Users/lvkhang/Documents/uni/software-testing/HW06/bugs/cart/BUG-CART-001.md), [BUG-CART-002](/Users/lvkhang/Documents/uni/software-testing/HW06/bugs/cart/BUG-CART-002.md), [BUG-CART-003](/Users/lvkhang/Documents/uni/software-testing/HW06/bugs/cart/BUG-CART-003.md)

![Newman Cart evidence](/Users/lvkhang/Documents/uni/software-testing/HW06/test-reports/evidence/cart/content-type-confusion/evidence.png)

Phần sinh viên còn cần tự làm: review 42 testcase đang `PENDING`, viết ít nhất 5 extension cases, sơ đồ generator tự vẽ, AI Audit Report, CI/CD sample runs, commit và push artifacts. Hai issue mới dùng đường dẫn ảnh trên branch dự kiến nên ảnh sẽ hiển thị sau khi commit/push.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI tự chấm các test case VALID/INVALID trong phần Audit - Human review.
- TC-CART-001 kiểm độ dài toàn bộ giỏ hàng, nên dễ bị ảnh hưởng bởi dữ liệu tồn tại từ iteration trước.
- TC-CART-002 phụ thuộc vị trí phần tử trong mảng và chỉ thêm lại payload giống hệt nhau.
- TC-CART-008 chỉ kiểm response thành công, chưa chứng minh các field như user_id hoặc role không thể đổi chủ sở hữu giỏ hàng.

### (5) Student Fix

- Xoá bỏ phần tự chấm của AI và thắt chặt lại agent skill.
- TC-CART-001 được đổi sang kiểm item của admin không xuất hiện trong cart của user, thay vì so sánh tổng độ dài.
- TC-CART-002 kiểm item theo product ID và quantity, không còn phụ thuộc vị trí trong mảng.
- TC-CART-008 được bổ sung workflow đọc cart bằng cả hai token để kiểm tra quyền sở hữu.
- Chi tiết hơn có thể xem trong main report.

## Entry #4

### (1) Prompt + Tool

| Field             | Content                                    |
| ----------------- | ------------------------------------------ |
| **Tool**          | GPT-5.6 Sol                                |
| **Timestamp**     | 23/08/2026 14:42:16                        |
| **Artifact type** | Bộ kiểm thử API cập nhật sản phẩm cho HW06 |

**Full prompt:**

```
Sử dụng skill [api-testing](skills/api-testing/) để thực hiện test cho api sau: PUT /api/products/:id.
MSSV: 23127062.
```

### (2) AI Output

'''
Mình sẽ dùng skill `api-testing` theo đúng yêu cầu, trước hết đọc toàn bộ hướng dẫn của skill rồi xác định cấu trúc dự án và tiêu chí kiểm thử cho `PUT /api/products/:id`.

Skill này yêu cầu pipeline đầy đủ: thiết kế tối thiểu 35 test case, tạo Postman/Newman artifacts, chạy thật, phân loại lỗi, lưu evidence/report và tạo GitHub Issue cho lỗi SUT đã xác nhận (nếu không trùng). Mình đang dựng oracle trực tiếp từ specification/requirements; phần `Human review` sẽ giữ `PENDING` vì bạn chưa cung cấp quyết định review.

Oracle đã xác định: endpoint tồn tại và thuộc Product CRUD; theo FR-12/FR-15, mọi `PUT /api/products/:id` phải có JWT admin, kiểm tra `name` bắt buộc ≤255 ký tự, `price > 0`, `category_id` tồn tại, và chỉ thay đổi đúng sản phẩm mục tiêu. Đặc tả chưa chốt response schema/status thành công, nên các case phụ thuộc điểm này sẽ được gắn `agentAudit: INCOMPLETE` thay vì tự suy diễn từ code backend.

Bộ suite đã có 46 case (35 domain, 9 security, 5 schema, 5 state-transition), vượt ngưỡng tối thiểu và validate sạch. Backend vừa được khởi động bằng lệnh chuẩn của repository; bước kế tiếp là lấy token runtime (không ghi token vào artifacts) và chạy Newman để thu kết quả thật.

Newman đã chạy đủ 46 iterations/57 requests và chứng minh `X-Student-Id: 23127062` trên toàn bộ request chính/workflow. Kết quả sơ bộ: 106 assertion failures, tập trung thành các nhóm có khả năng là lỗi SUT: thiếu access control admin, không validate ID/tồn tại resource, không validate body theo FR-15, và error handling không an toàn cho media type/body sai. Mình đang tái hiện từng root cause bằng request đại diện và request tối giản trước khi lập bug.

Các root cause đại diện đã tái hiện 2/2 lần với request tối giản: user/không token vẫn cập nhật thành công; ID `999999` vẫn báo “Product updated”; `price: 0` vẫn được lưu; `text/plain` gây HTTP 500 HTML kèm stack trace; JSON primitive trả HTTP 400 nhưng cũng lộ HTML stack trace. Token đã được redacted khỏi Newman JSON/HTML trước khi lưu. Mình đang đối chiếu issue mở và đóng để tránh tạo trùng.

Để đáp ứng yêu cầu evidence của `api-testing`, mình sẽ dùng thêm skill `computer-use` chỉ cho thao tác UI chụp màn hình terminal thật (không dựng lại log). Nếu không thể đưa đúng command/output Newman và header vào cùng khung hình, báo cáo sẽ ghi screenshot `PENDING` và giữ raw evidence thay vì tạo ảnh giả.

Duplicate check hoàn tất: lỗi access control đã có issue #234 nên mình chỉ liên kết, không tạo trùng. Bốn lỗi còn lại không có issue cùng endpoint/symptom; theo phạm vi pipeline mà bạn đã yêu cầu, mình sẽ tạo bốn GitHub Issues với labels hiện có và sau đó cập nhật lại testcase/report bằng số issue xác minh.

Pipeline đã hoàn tất phần external write: tạo mới #287–#290 và liên kết lỗi access control vào issue đã có #234. Manifest/testcase đã được cập nhật `11 Passed / 35 Failed`, toàn bộ 46 `humanReview` vẫn `PENDING`; backend local cũng đã được dừng sau khi thu evidence. Mình đang chạy vòng kiểm tra cuối về links, JSON, secrets và ảnh evidence.

Đã hoàn tất kiểm thử `PUT /api/products/:id` với MSSV `23127062`.

Kết quả:

- 46 AI-generated test cases
- 11 Passed / 35 Failed / 0 Blocked
- 57 HTTP requests, 294 assertions, 106 failed assertions
- `X-Student-Id: 23127062`: 46/46 request chính và 11/11 workflow requests
- 5 root causes xác nhận
- Suite validation thành công
- 46/46 `humanReview` vẫn `PENDING`

Artifacts chính:

- [Test-run summary](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/test-runs/product-update-20260823T145100+0700.md)
- [Suite manifest](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/product-update/suite.manifest.json)
- [Postman collection](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/product-update/product-update.postman_collection.json)
- [Coverage matrix](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/api/product-update/coverage-matrix.md)
- [46 testcase Markdown](/Users/lvkhang/Documents/uni/software-testing/HW06/tests/test-cases/product-update)
- [Newman HTML report](/Users/lvkhang/Documents/uni/software-testing/HW06/test-reports/newman/product-update-20260823T145100+0700/newman-report.html)
- [Terminal evidence](/Users/lvkhang/Documents/uni/software-testing/HW06/test-reports/evidence/product-update)
- [Bug reports](/Users/lvkhang/Documents/uni/software-testing/HW06/bugs/product-update)

GitHub Issues:

- Access control: trùng [#234](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/234)
- ID không tồn tại vẫn báo thành công: [#290](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/290)
- Không validate input FR-15: [#289](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/289)
- `text/plain` gây HTTP 500 và lộ stack trace: [#288](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/288)
- JSON primitive trả HTML stack trace: [#287](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/287)

Phần sinh viên còn cần thực hiện: human review, ít nhất 5 extension cases tự viết, sơ đồ generator tự vẽ, AI Audit Report, CI/CD sample runs và commit/push artifacts. Hiện artifacts chưa được commit/push nên ảnh evidence dùng branch URL trong issues chỉ hiển thị sau khi được đẩy lên GitHub.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- Một số workflow gọi PUT /api/products/:id nhưng thiếu admin JWT, nên không đáp ứng precondition của FR-12.
- TC-002–004 ép chính xác một status code, trong khi đặc tả chỉ yêu cầu từ chối bằng 401 hoặc 403.
- TC-042 tự suy diễn response thành công phải chứa field message.

### (5) Student Fix

- Thêm Authorization: Bearer {{adminToken}} cho toàn bộ workflow PUT.
- Mở rộng oracle của TC-002–004 để chấp nhận cả 401/403.
- Thay oracle message của TC-042 bằng GET để xác nhận description và imageUrl thực sự được lưu.
- Chi tiết hơn có thể xem trong main report.
