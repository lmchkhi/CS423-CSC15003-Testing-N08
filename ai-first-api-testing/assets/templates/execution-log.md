### Nhật ký thực thi Newman (Execution Log)

- **Thời gian (Date/Time):** `{date_time}`
- **API:** `{1/2/3}`
- **Pool:** `{A/B/C}`
- **Endpoint:** `{endpoint}`
- **Base URL / Hostname observed:** `{base_url}` / `{hostname}`
- **Node / Newman / Reporter versions:** `{versions}`

#### Tệp cấu hình (Configuration Files)
- **Postman Collection Path:** `{collection_path}`
- **Environment Path:** `{environment_path}`
- **Data File Path:** `{data_file_path}`

- **Lệnh Newman (Newman Command Used):** `{newman_command}`
- **Exit code:** `{exit_code}`
- **Header xác nhận (X-Student-Id header confirmed):** `{true/false}`
- **Header screenshot path:** `{screenshot_path_or_PENDING}`
- **Người chạy (Run by):** `{Agent/Human}`

#### Danh sách kiểm tra trước khi chạy (Pre-run checklist)
- [ ] SUT running
- [ ] Data seeded
- [ ] {other_checklist_items}

#### Tóm tắt kết quả (Result Summary)
| Iterations | Requests | Assertions | Passed Assertions | Failed Assertions | Skipped | Duration |
|------------|----------|------------|-------------------|-------------------|---------|----------|
| {iterations} | {requests} | {assertions} | {pass} | {fail} | {skip} | {time} |

#### Chi tiết theo Request (Per-request breakdown)
| Request | Passed | Failed | Skipped | Duration |
|---------|--------|--------|---------|----------|
| {name}  | {pass} | {fail} | {skip}  | {time}   |

- **Đường dẫn báo cáo HTML Newman (Newman HTML Report Path):** `{html_report_path}`

#### Quan sát (Observations)
{observations}

#### Suy luận/Giả thuyết (Inferences/Hypotheses)
{inferences_or_none}

#### Phán quyết (Verdict)
- **Verdict:** `{PASS / FAIL / INCONCLUSIVE}`
