# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW04                    |
| **Ngày làm bài:**       | 03/08/2026 - 09/08/2026 |
| **Công cụ AI đã dùng:** | Codex                   |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                                                     |
| ----------------- | ----------------------------------------------------------- |
| **Tool**          | GPT-5.6 Sol                                                 |
| **Timestamp**     | 03/08/2026 12:56:16                                         |
| **Artifact type** | Tạo agent skill hỗ trợ kiểm thử tự động Playwright cho HW04 |

**Full prompt:**

```
Dựa vào specs pdf của HW04, giúp tôi tạo một agent skill giúp với automation testing.
Cụ thể, khi user input một feature hệ thống thì agent sẽ phân tích rồi tạo ra:
- Ít nhất 12 test case (mỗi test case trình bày bằng 1 file markdown theo format trong [03 - github_testcase_management.pptx](.lvkhang/03 - github_testcase_management.pptx))
- Chuyển các test case vừa tạo thành automation scripts (sử dụng Playwright, cho 3 nền tảng Chromium/Firefox/WebKit, phải đạt ít nhất 3 assertion patterns khác nhau, không sử dụng các giá trị hard-coded)
- Các test data được lưu riêng trong các file .csv hoặc .json
- Multi-browser HTML report của feature đó, có chứa "Run by: {StudentID}" (StudentID sẽ được user cung cấp) sau khi run automation script
- Nếu có bug xảy ra, tạo 1 file bug report markdown theo format trong [03 - github_testcase_management.pptx](.lvkhang/03 - github_testcase_management.pptx)
```

### (2) AI Output

'''
Mình sẽ dùng `skill-creator` để đóng gói workflow thành một agent skill tái sử dụng, đồng thời dùng kỹ năng PDF và Presentations để đọc đúng rubric HW04 cùng format test case/bug report từ slide. Trước tiên mình sẽ kiểm tra các tài liệu và cấu trúc repo, sau đó tạo skill và chạy kiểm tra hợp lệ.

Mình đã tìm thấy đúng hai nguồn: PDF đặc tả HW04 và deck hướng dẫn quản lý test case. Skill sẽ được đặt trong repo tại `skills/` để có thể version-control cùng bài tập; mình đang trích xuất cả nội dung lẫn cấu trúc biểu mẫu trước khi viết workflow.

Các ràng buộc quan trọng đã được xác nhận trực tiếp từ tài liệu: tối thiểu 12 case/feature, data ngoài script, ít nhất 3 kiểu assertion, chạy riêng Chromium/Firefox/WebKit, report thật có StudentID và ISO timestamp, đồng thời chỉ lập bug report khi failure đã được phân loại là lỗi sản phẩm thực sự. Mình sẽ đưa các “quality gate” này vào một validator đi kèm skill để tránh chỉ dựa vào checklist thủ công.

Skill đã có workflow, hai template Markdown, tài liệu triển khai Playwright và một validator kiểm tra cấu trúc/traceability/report. Giờ mình đang chạy hai lớp kiểm tra: validator chính thức của hệ thống skill và một fixture mẫu “đạt chuẩn” để chắc rằng quality gate không chỉ chạy được mà còn nhận đúng một feature hợp lệ.

Một điểm triển khai cần xác minh theo phiên bản Playwright hiện hành là cách gắn chuỗi nhận diện vào HTML report. Mình đang đối chiếu tài liệu chính thức để bảo đảm skill dùng tùy chọn reporter được hỗ trợ, rồi sẽ chốt lần kiểm tra cuối.

Đã tạo agent skill tại [hw04-playwright-automation/SKILL.md](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/SKILL.md).

Skill bao gồm:

- Workflow phân tích feature và tạo tối thiểu 12 test case.
- Template [test case](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/assets/test-case-template.md) theo slide 7. :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW04/.lvkhang/03 - github_testcase_management.pptx" purpose="source" artifact_kind="presentation" slide_number="7"}
- Template [bug report](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/assets/bug-report-template.md) theo slide 12. :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW04/.lvkhang/03 - github_testcase_management.pptx" purpose="source" artifact_kind="presentation" slide_number="12"}
- Hướng dẫn Playwright data-driven, Chromium/Firefox/WebKit, tối thiểu ba assertion patterns.
- Report riêng cho từng browser, chứa `Run by: <StudentID>` và ISO timestamp bằng Playwright metadata chính thức.
- Quy trình phân loại test defect, infrastructure failure và product bug.
- [Validator tự động](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/scripts/validate_feature.py) kiểm tra test case, dữ liệu, traceability, assertions, browsers, reports và bug report.

Các yêu cầu được tổng hợp từ HW04 specification. :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW04/.lvkhang/2026.HW04.Automation Testing_En.pdf" purpose="source"}

Skill đã vượt qua structural validation và một fixture thử nghiệm gồm 12 test case cùng ba browser report. Phần cấu hình dựa trên tài liệu chính thức về [Playwright metadata](https://playwright.dev/docs/api/class-testconfig), [HTML reporter](https://playwright.dev/docs/test-reporters) và [multi-browser projects](https://playwright.dev/docs/test-projects).

Chưa tạo report giả ở bước này; report chỉ được sinh khi skill thực sự chạy một feature với StudentID được cung cấp.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI tạo skills theo yêu cầu để thực hiện web automation testing, nhưng đặt tên bị mặc định là HW04.

### (5) Student Fix

- Chỉnh sửa lại skills bỏ các mặc định về HW04 để skills reusable hơn.

## Entry #2

### (1) Prompt + Tool

| Field             | Content                                                     |
| ----------------- | ----------------------------------------------------------- |
| **Tool**          | GPT-5.6 Sol                                                 |
| **Timestamp**     | 05/08/2026 10:35:55                                         |
| **Artifact type** | Kiểm thử Playwright FR-01 và liên kết bug với GitHub Issues |

**Full prompt:**

```
Sử dụng skill [playwright-automation](skills/playwright-automation/) để thực hiện test cho FR-01 được đặc tả trong file readme ở root

Token không hợp lệ có thể vì sandbox, gh auth status trong terminal vẫn trả về token còn hợp lệ
```

### (2) AI Output

'''
Mình sẽ dùng skill `playwright-automation` theo yêu cầu, trước hết đọc đầy đủ hướng dẫn của skill và đặc tả FR-01 trong README, rồi chạy/hoàn thiện bài test và kiểm chứng kết quả.

Skill yêu cầu bộ bằng chứng đầy đủ: tối thiểu 12 test case Markdown, dữ liệu ngoài, Playwright chạy riêng Chromium/Firefox/WebKit, report có StudentID và timestamp thật, rồi phân loại lỗi. Mình đang dò cấu trúc dự án, cách khởi động và StudentID có sẵn trong workspace để không tự bịa dữ liệu.

Mình đã xác nhận StudentID `23127062` từ báo cáo học phần trong workspace và thấy SUT cố ý có các điểm lệch FR-01 ở form/API. Bộ test sẽ kiểm tra độc lập validation email, tính duy nhất, các lớp mật khẩu, xác nhận mật khẩu và điều hướng thành công; dữ liệu test được tách JSON và email được làm duy nhất theo lần chạy.

Bộ suite đã qua kiểm tra cấu trúc: 15 test case, 15 dòng dữ liệu, 45 phép chạy (15 × 3 browser), đủ nhiều mẫu assertion. SUT đã sẵn sàng; mình sẽ chạy từng browser riêng với StudentID `23127062` và timestamp ISO thật để tạo ba HTML report độc lập.

Chromium lần đầu: 11 pass, 4 fail. Khi review failure, mình phát hiện TC-REG-006/007 đang bị lỗi regex mật khẩu chặn trước nên chưa thật sự kiểm tra được email/uniqueness—đây là lỗi thiết kế test, không phải pass đáng tin. Theo skill, mình sẽ giữ report ban đầu, sửa dữ liệu hai case để đi xuyên qua regex hiện tại và chạy lại, nhờ đó cô lập đúng hai quy tắc email.

Kết quả chính thức nhất quán trên cả 3 engine: mỗi browser 9 pass, 6 fail. Sáu failure quy về 4 lỗi sản phẩm có thể tái hiện và có bằng chứng thật: regex mật khẩu sai, không validation định dạng email, email không unique, và thiếu xác nhận mật khẩu. Mình đang ghi bug report, cập nhật traceability trong test case, rồi sẽ đối chiếu nhãn hiện có của GitHub trước khi tạo issue.

GitHub publication is blocked at the credential gate: `gh auth status` reports the active token for `lvkhang16` is invalid. Theo skill, mình không được claim đã tạo issue hoặc chọn/đặt nhãn khi chưa đọc được remote; mình sẽ giữ đủ 4 bug report cục bộ, ghi rõ blocker, rồi chạy validator cuối cho toàn bộ artifacts/report.

Đã hoàn tất kiểm thử FR-01 bằng skill `playwright-automation`.

Kết quả:

- 15 test case được tự động hóa, không có case bỏ sót.
- Chạy thật trên Chromium, Firefox và WebKit.
- Mỗi browser: 9 pass, 6 fail.
- Xác nhận 4 lỗi sản phẩm:
  - Regex từ chối mật khẩu hợp lệ.
  - Chấp nhận email sai định dạng.
  - Cho phép đăng ký trùng email.
  - Thiếu trường Xác nhận mật khẩu.
- Validator: `PASSED: 15 test cases`.
- Report có StudentID `23127062` và timestamp ISO thật.
- Các server tạm đã được dừng.

Tài liệu chính:

- [Tổng hợp kết quả](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/README.md)
- [Playwright suite](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/e2e/account-registration.spec.mjs)
- [Test data](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/data/account-registration.json)
- [Chromium report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/chromium/index.html)
- [Firefox report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/firefox/index.html)
- [WebKit report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/webkit/index.html)
- [BUG-REG-001](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-001.md)
- [BUG-REG-002](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-002.md)
- [BUG-REG-003](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-003.md)
- [BUG-REG-004](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-004.md)

Chưa thể tạo GitHub Issues vì `gh auth status` báo token của `lvkhang16` không hợp lệ. Các bug report đã ghi rõ blocker; sau khi chạy `gh auth login -h github.com`, có thể tiếp tục đối chiếu label và xuất bản Issues.

Đúng, khả năng cao sandbox không truy cập được credential helper/keychain dù terminal thường vẫn dùng được. Mình sẽ tiếp tục theo `playwright-automation`, kiểm tra lại `gh` ngoài sandbox; nếu xác thực thành công, mình sẽ đọc convention label/issue hiện có rồi publish và verify từng bug.

Xác nhận của bạn đúng: ngoài sandbox, `gh` đăng nhập thành công bằng keyring và có quyền `repo`. Remote đã có đúng module label `Module: Register` cùng các label `Type: Bug`, `Severity: Major`, `Priority: P1`, `Status: New`, `found-by: test-case`; mình đang tìm duplicate theo module, tiêu đề và nội dung trước khi tạo issue.

Không cần tạo issue mới: remote đã có 4 issue trùng đúng theo từng lỗi của FR-01 (#2, #3, #7, #8). Theo skill mình sẽ tái sử dụng thay vì tạo duplicate, verify URL/title/labels của từng issue rồi cập nhật các bug report và test case cục bộ.

Đúng, nguyên nhân là sandbox không truy cập được keyring. Chạy ngoài sandbox, `gh` xác thực thành công.

Bốn lỗi đều đã có issue tương ứng nên mình tái sử dụng, tránh tạo duplicate:

- [BUG-REG-001 → Issue #2](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/2)
- [BUG-REG-002 → Issue #3](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3)
- [BUG-REG-003 → Issue #7](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7)
- [BUG-REG-004 → Issue #8](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8)

Các bug report, test case và [báo cáo tổng hợp](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/README.md) đã được cập nhật URL cùng labels thực tế. Validator cuối vẫn đạt: `PASSED: 15 test cases`.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI tự động thêm phần `Suggested labels` và `Verified remote labels` vào bug report thay vì đi theo format có sẵn.
- Các phần hình ảnh trong evidence chỉ để path thay vì cho preview.
- Student ID chưa được hiển thị khi mở html report.
- TC-REG-006 và TC-REG-007 dùng dữ liệu mật khẩu sai đặc tả. Cụ thể: "Valid1 a".
- Cơ chế chờ response sẽ bị treo khi validation phía client hoạt động đúng. Khi type="email" được sửa đúng, TC-REG-006 sẽ bị HTML5 validation chặn trước request.

### (5) Student Fix

- Bỏ 2 phần đó và cập nhật lại agent skill.
- Chuyển các ảnh ở phần evidence sang dạng preview để dễ đọc hơn.
- Sửa lại để Student ID được hiển thị trong phần title khi mở report.
- Sửa lại dữ liệu mật khẩu trong TC-REG-006 và TC-REG-007 để tuân thủ đúng đặc tả.
- Sửa flaky wait: Không tạo chung waitForResponse cho cả malformed email và duplicate email.

## Entry #3

### (1) Prompt + Tool

| Field             | Content                                                     |
| ----------------- | ----------------------------------------------------------- |
| **Tool**          | GPT-5.6 Sol                                                 |
| **Timestamp**     | 08/08/2026 11:30:25                                         |
| **Artifact type** | Kiểm thử Playwright FR-16 và liên kết bug với GitHub Issues |

**Full prompt:**

```
Sử dụng skill [playwright-automation](skills/playwright-automation/) để thực hiện test cho FR-16 được đặc tả trong file readme ở root

gh cli có thể bị chặn bởi sandbox
```

### (2) AI Output

'''
Mình sẽ dùng skill `playwright-automation` theo đúng yêu cầu, đọc đầy đủ hướng dẫn của skill và đặc tả FR-16 trong README trước khi chạy test.

Mình đã xác định FR-16 là chức năng import sản phẩm CSV của Admin. Tiếp theo mình sẽ nạp hai tài liệu bắt buộc của skill, rồi kiểm tra cấu trúc dự án, cấu hình Playwright, mã nguồn import và StudentID có sẵn trong workspace.

Mình đã xác nhận StudentID `23127062` từ hồ sơ bài nộp. Mã hiện tại cho thấy các rủi ro chính cần kiểm chứng thực tế: parser dùng `split(",")` nên có thể sai RFC 4180, backend không validate giá dương, và import không bọc transaction nên có nguy cơ không rollback. Mình sẽ thiết kế tối thiểu 12 case một-một với dữ liệu ngoài, đồng thời dùng dữ liệu tên duy nhất và dọn dẹp qua API/DB an toàn để các lần chạy độc lập.

Bộ kiểm thử đã được dựng với 15 test case độc lập, dữ liệu JSON ngoài script, Page Object và các oracle kiểm tra cả UI lẫn trạng thái backend. Mình đang chạy kiểm tra tĩnh trước; sau đó sẽ khởi động SUT và chạy thử Chromium để hiệu chỉnh selector/đồng bộ trước khi tạo ba report chính thức.

Lần chạy thử đầu tiên bị chặn bởi sandbox macOS (`MachPortRendezvous ... Permission denied` và `connect EPERM`), nên đây là lỗi hạ tầng chứ chưa phải kết quả FR-16. Theo hướng dẫn skill, mình sẽ chạy lại Playwright ngoài sandbox để trình duyệt và localhost hoạt động đúng; report thử vừa rồi không được dùng làm bằng chứng chính thức.

Chromium đã khởi chạy được ngoài sandbox và đang thực thi các case thật. Thời gian kéo dài hơn dự kiến vì một số assertion âm chờ timeout để xác nhận hành vi sai; mình đang chờ kết quả đầy đủ rồi sẽ rút gọn các oracle nếu có chỗ gây chậm không cần thiết.

Mình đã phân loại lần chạy thứ hai vẫn là lỗi môi trường: browser chạy được nhưng backend được khởi động trong namespace sandbox nên tiến trình Playwright ngoài sandbox nhận `ECONNREFUSED`. Mình sẽ sửa cấu hình để Playwright tự quản lý cả backend và Web Admin trong cùng lần chạy; cách này cũng làm quy trình tái lập gọn và tránh phụ thuộc server chạy tay.

Sau review, mình đã sửa hai lỗi trong test chứ không quy thành lỗi sản phẩm: selector tên sản phẩm trước đó vô tình tính cả `alt` của ảnh, và case file không có dòng nên kiểm tra nút ở trạng thái disabled thay vì đòi nút biến mất. Nhóm kiểm tra đại diện hiện pass đúng ở các luồng hợp lệ. Mình bắt đầu ba lần chạy chính thức, mỗi browser một report riêng với StudentID và timestamp thật.

Hai browser đầu cho kết quả nhất quán: 6 pass, 9 fail; các failure tái hiện đúng cùng nhóm hành vi ở Chromium và Firefox, không phải khác biệt trình duyệt. Mình đang chạy WebKit để hoàn tất ma trận, sau đó sẽ lập bug report theo nguyên nhân gốc (không tạo một bug trùng lặp cho từng test case).

Bốn lỗi sản phẩm đã được xác nhận và lập báo cáo cục bộ với screenshot/trace thật: parser RFC 4180, kiểm tra đuôi file, validation + atomic rollback, và validation header. Theo skill, mình tiếp tục đối chiếu convention label/issue của remote GitHub, kiểm tra trùng lặp rồi mới tạo issue tương ứng.

Validator đã đạt: 15 test case, dữ liệu ngoài, đủ assertion, ba report có metadata hợp lệ. Bước cuối của skill là mở report thật để kiểm tra trực quan dòng `Run by: 23127062` xuất hiện ngay ở tiêu đề và timestamp chỉ nằm trong Metadata; mình đang chụp chính trang report để xác nhận, không chỉnh sửa HTML.

Đã hoàn tất kiểm thử tự động FR-16 bằng skill `playwright-automation`.

Kết quả:

- 15/15 test case đã tự động hóa.
- Mỗi browser: 6 pass, 9 fail.
- Tổng: 45 lượt thực thi, 18 pass, 27 fail.
- Chromium, Firefox và WebKit cho kết quả nhất quán.
- Không có test case chưa tự động hóa.
- Validator của skill đã đạt.

Bốn lỗi sản phẩm được xác nhận:

- `BUG-CSV-001`: Parser không hỗ trợ trường có dấu phẩy theo RFC 4180.
- `BUG-CSV-002`: Chấp nhận file không có đuôi `.csv`.
- `BUG-CSV-003`: Không validate price và không rollback toàn bộ import.
- `BUG-CSV-004`: Không phát hiện đúng header sai.

Các tệp chính:

- [Tóm tắt kết quả](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/product-csv-import/README.md)
- [Playwright suite](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/e2e/product-csv-import.spec.mjs)
- [Dữ liệu kiểm thử](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/data/product-csv-import.json)
- [Chromium report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/product-csv-import/chromium/index.html)
- [Firefox report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/product-csv-import/firefox/index.html)
- [WebKit report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/product-csv-import/webkit/index.html)
- [Bug reports](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/product-csv-import/BUG-CSV-001.md)

Cả ba report đã được mở và xác nhận hiển thị `Run by: 23127062`; timestamp ISO nằm trong Metadata.

Chưa thể đăng bug lên GitHub vì `gh auth status` báo token của tài khoản `lvkhang16` không hợp lệ. Không có issue URL nào được khai báo giả. Sau khi chạy `gh auth login -h github.com`, có thể tiếp tục bước xuất bản bốn issue.

Đúng, có khả năng sandbox làm `gh` không đọc được credential/keychain. Mình sẽ kiểm tra lại ngoài sandbox trước khi kết luận token hỏng; nếu xác thực thành công, mình sẽ tiếp tục đối chiếu label và xuất bản bốn issue FR-16 theo quy trình đã chuẩn bị. Mình dùng skill GitHub để kiểm tra remote và trạng thái xác thực đúng convention.

Bạn đoán đúng: ngoài sandbox, `gh` đăng nhập thành công bằng keyring và resolve được repository `lmchkhi/CS423-CSC15003-Testing-N08`. Mình tiếp tục đọc label và issue hiện có để tránh tạo label sai convention hoặc issue trùng.

Remote đã có issue trùng cho cả bốn nguyên nhân gốc, nên mình sẽ không tạo issue mới:

- RFC 4180 → #31
- Đuôi file `.csv` → #24
- Validation + rollback nhiều dòng lỗi → #32
- Header sai → #25

Mình đang xác minh lại URL/title/labels của bốn issue này rồi sẽ liên kết chúng vào bug report và test case cục bộ.

Lệnh xác minh GitHub đang phản hồi chậm nhưng vẫn chạy; mình chưa ghi URL vào artifact cho đến khi `gh issue view` trả về đủ bốn kết quả đã xác nhận.

Đúng, `gh` đã bị sandbox chặn truy cập macOS keyring.

Chạy ngoài sandbox xác nhận:

- Đăng nhập thành công với tài khoản `lvkhang16`.
- Repository: `lmchkhi/CS423-CSC15003-Testing-N08`.
- Cả bốn lỗi đã có issue tương ứng nên không tạo trùng:
  - RFC 4180: [#31](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/31)
  - File không có đuôi `.csv`: [#24](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/24)
  - Validation và rollback: [#32](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32)
  - Header sai: [#25](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/25)

Các URL đã được cập nhật vào bug report, test case liên quan và [báo cáo tổng hợp](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/product-csv-import/README.md). Validator vẫn đạt với 15 test case và đủ ba report browser.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- baseURL trong playwright.config.mjs vẫn set là port 5173 trong khi FR-16 yêu cầu port 5174.
- TC-CSV-004 và TC-CSV-012 ép implementation cụ thể, không chỉ kiểm tra requirement: Kiểm tra preview và button phải không tồn tại khi upload file .txt. Một implementation hợp lệ vẫn có thể giữ tên file trong input, hiển thị thông báo “chỉ chấp nhận .csv” và disable nút Import. Test hiện tại sẽ đánh fail implementation đó dù requirement đã được đáp ứng.

### (5) Student Fix

- Sửa lại dùng port 5174 cho FR-16 về CSV import vì đây là feature bên admin.
- Sửa lại TC-CSV-004 và TC-CSV-012 để test chấp nhận hai cách từ chối hợp lệ:
  - Hệ thống xóa file khỏi input.
  - Hệ thống hiển thị lỗi định dạng CSV.

## Entry #4

### (1) Prompt + Tool

| Field             | Content                                              |
| ----------------- | ---------------------------------------------------- |
| **Tool**          | GPT-5.6 Sol                                          |
| **Timestamp**     | 09/08/2026 12:47:08                                  |
| **Artifact type** | Kiểm thử Playwright FR-07 và quản lý bug trên GitHub |

**Full prompt:**

```
Sử dụng skill [playwright-automation](skills/playwright-automation/) để thực hiện quy trình web automation testing cho FR-07 được đặc tả trong file README ở root
```

### (2) AI Output

'''
Mình sẽ dùng skill `playwright-automation` theo đúng yêu cầu, đọc toàn bộ hướng dẫn của skill và đặc tả FR-07 trong README trước khi chạy quy trình kiểm thử. Sau đó mình sẽ thực thi, lưu bằng chứng và đối chiếu kết quả với tiêu chí của FR-07.

Skill yêu cầu tối thiểu 12 test case riêng biệt, dữ liệu ngoài, chạy thật trên Chromium/Firefox/WebKit, báo cáo HTML có MSSV và timestamp, rồi phân loại mọi lỗi trước khi lập bug. Mình đang kiểm tra cấu trúc dự án, quy trình khởi động và xem MSSV có thể được suy ra an toàn từ các artifact hiện có hay không.

Mình đã xác nhận MSSV `23127062` từ báo cáo học phần hiện có. Phân tích mã cho thấy FR-07 có nhiều rủi ro độc lập (gộp sản phẩm trùng, nút +/−, xác nhận xóa, nhãn tổng tiền, empty state), nên mình sẽ dùng 14 case có ý nghĩa thay vì tách biến thể hình thức; mỗi case vẫn ánh xạ một-một với dữ liệu JSON và script.

Kiểm tra cấu trúc đã nhận đủ 14 case. Lint của frontend hiện thất bại bởi 23 lỗi có sẵn trong SUT (không phải code test), nên mình giữ nguyên sản phẩm và ghi nhận đây là quality-check nền. Giờ mình chạy Chromium thử để bắt lỗi selector/đồng bộ trước; các failure do test sẽ được sửa trước khi tạo ba report chính thức.

Lần chạy thử đã giúp tách được lỗi test khỏi lỗi sản phẩm. Cụ thể: một case thiếu dữ liệu thêm sản phẩm, và ba assertion tiền tệ đã giả định dấu chấm trong khi browser dùng dấu phẩy—đây là lỗi oracle, không phải defect FR-07. Mình đang sửa các điểm này, đồng thời làm case nút `-` độc lập với lỗi “không gộp sản phẩm trùng” để tránh failure dây chuyền.

Sau review, bộ test ổn định ở mức 5 pass và 9 fail trên Chromium; các failure còn lại đều khớp hành vi quan sát được và mã nguồn, không còn failure dây chuyền do oracle. Mình bắt đầu ba lần chạy chính thức riêng biệt với MSSV `23127062`; mỗi browser sẽ có HTML report thật, screenshot và trace riêng.

Ba browser cho kết quả nhất quán: mỗi browser 5 pass, 9 fail (42 lượt chạy: 15 pass, 27 fail). Mình đã xác nhận 7 defect sản phẩm độc lập; hai cặp case cùng chỉ ra một nguyên nhân chung (thiếu cả cụm +/−, và xóa không có dialog), nên sẽ lập 7 bug report thay vì tạo issue trùng lặp.

Theo skill, mỗi bug đã xác nhận phải được đối chiếu với issue/label hiện có trước khi publish. Mình đã tạo 7 bug report cục bộ kèm screenshot và trace thật; tiếp theo sẽ kiểm tra xác thực repository, quy ước label và chống trùng lặp rồi mới tạo GitHub Issues.

GitHub đã có 6 issue trùng khớp chính xác (#18–#23), nên skill yêu cầu tái sử dụng thay vì tạo bản sao. Chỉ bug nhãn “Mua tiếp” trên Web chưa có issue (issue tương tự hiện có chỉ dành cho Mobile); mình sẽ tạo duy nhất issue này với các label đã được xác minh: type, module, severity, priority, status và found-by.

GitHub mapping đã hoàn tất: 6 bug report tái sử dụng issue hiện có và bug thứ 7 được tạo, xác minh tại issue #213. Bước cuối của skill là validate artifact và mở report thật để kiểm tra trực quan MSSV ở tiêu đề cùng timestamp trong Metadata; mình đang thực hiện đúng trên file report đã sinh, không chỉnh sửa HTML.

Đã hoàn tất quy trình automation testing FR-07 bằng skill `playwright-automation`.

- 14/14 test case được tự động hóa, không có case bỏ sót.
- Chạy thật trên Chromium, Firefox và WebKit.
- Kết quả mỗi browser: **5 pass, 9 fail**.
- Tổng cộng: **42 lượt kiểm thử — 15 pass, 27 fail**.
- Validator đạt yêu cầu: `VALIDATED ARTIFACT STRUCTURE`.
- Tiêu đề ba report đã được kiểm tra hiển thị `Run by: 23127062`; timestamp ISO được lưu trong metadata.

Artifact chính:

- [Test cases](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/test-cases/shopping-cart)
- [Playwright suite](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/e2e/shopping-cart.spec.mjs)
- [External test data](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/data/shopping-cart.json)
- [Automation review](/Users/lvkhang/Documents/uni/software-testing/HW04/submission/reports/fr07-automation-review.md)
- [Chromium report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/shopping-cart/chromium/index.html)
- [Firefox report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/shopping-cart/firefox/index.html)
- [WebKit report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/shopping-cart/webkit/index.html)
- [Bug reports và evidence](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/shopping-cart)

Đã xác nhận 7 defect độc lập. Sáu defect tái sử dụng GitHub Issues hiện có: [#18](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/18), [#19](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/19), [#20](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/20), [#21](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/21), [#22](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/22), [#23](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/23). Bug mới về nhãn “Mua tiếp” được tạo tại [#213](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/213).

Lint frontend vẫn có 23 lỗi và 1 cảnh báo tồn tại sẵn trong SUT; không phát sinh từ suite FR-07. HTML evidence và video demo cuối cùng vẫn cần được sinh/trình bày từ lần thực thi thật có thể quy trách nhiệm.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- TC-CART-011 chưa kiểm thử hành vi giảm số lượng, chỉ kiểm tra có tồn tại nút `-`.
- TC-CART-005: Assertion quantity trong rowDetails có thể false-positive.
- TC-CART-012/013: Test dialog chấp nhận mọi loại JavaScript dialog, không chỉ alert confirm xóa sản phẩm.

### (5) Student Fix

- TC-CART-011 giờ bấm + để tăng số lượng lên 2, sau đó bấm - và kiểm tra quantity, thành tiền dòng và tổng cộng trở về giá trị ban đầu.
- TC-CART-005 giờ kiểm tra riêng từng cell gồm tên, đơn giá, số lượng, thành tiền và nút Xóa; tránh quantity "1" bị khớp nhầm từ giá 123,456.
- TC-CART-012/013 giờ chờ đúng dialog loại confirm, kiểm tra nội dung liên quan đến “xóa”, rồi xác nhận sản phẩm còn lại khi Cancel hoặc biến mất khi Confirm.
