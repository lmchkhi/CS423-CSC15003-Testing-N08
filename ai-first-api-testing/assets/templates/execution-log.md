### Nhật ký thực thi Newman (Execution Log)

- **Thời gian (Date/Time):** `{date_time}`
- **API:** `{1/2/3}`
- **Pool:** `{A/B/C}`
- **Endpoint:** `{endpoint}`

#### Tệp cấu hình (Configuration Files)
- **Postman Collection Path:** `{collection_path}`
- **Environment Path:** `{environment_path}`
- **Data File Path:** `{data_file_path}`

- **Lệnh Newman (Newman Command Used):** `{newman_command}`
- **Header xác nhận (X-Student-Id header confirmed):** `{true/false}`
- **Người chạy (Run by):** `{Agent/Human}`

#### Danh sách kiểm tra trước khi chạy (Pre-run checklist)
- [ ] SUT running
- [ ] Data seeded
- [ ] {other_checklist_items}

#### Tóm tắt kết quả (Result Summary)
| Total Tests | Passed | Failed | Skipped | Duration |
|-------------|--------|--------|---------|----------|
| {total}     | {pass} | {fail} | {skip}  | {time}   |

#### Chi tiết theo Request (Per-request breakdown)
| Request | Passed | Failed | Skipped | Duration |
|---------|--------|--------|---------|----------|
| {name}  | {pass} | {fail} | {skip}  | {time}   |

- **Đường dẫn báo cáo HTML Newman (Newman HTML Report Path):** `{html_report_path}`

#### Quan sát (Observations)
{observations}

#### Phán quyết (Verdict)
- **Verdict:** `{PASS / FAIL / INCONCLUSIVE}`
