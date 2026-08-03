# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW04                    |
| **Ngày làm bài:**       | 03/08/2026 - ../08/2026 |
| **Công cụ AI đã dùng:** | Claude; Codex           |

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
