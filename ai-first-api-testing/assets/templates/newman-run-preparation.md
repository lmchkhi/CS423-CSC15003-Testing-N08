### Chuẩn bị chạy Newman (Newman Run Preparation)

- **API Details:** Endpoint `{endpoint}`, Method `{method}`, Pool `{pool}`
- **Base URL / expected hostname:** `{base_url}` / `{hostname}`

#### Danh sách kiểm tra điều kiện tiên quyết (Pre-conditions checklist)
- [ ] SUT running
- [ ] Collection reviewed
- [ ] Environment set
- [ ] X-Student-Id configured
- [ ] Student ID value verified
- [ ] Test data/state prepared
- [ ] Newman and HTML reporter versions recorded
- [ ] New output paths selected (do not overwrite old evidence)

#### Lệnh thực thi Newman (Newman command to run)
`{newman_command}`

- **Thời gian dự kiến (Expected duration):** `{duration}`

#### Các bước sau khi chạy (Post-run steps)
- [ ] Verify report
- [ ] Preserve console output and exit code
- [ ] Capture real console screenshot showing X-Student-Id
- [ ] Verify observed hostname matches deployment

#### Trạng thái (Checkpoint)
- **Checkpoint:** `{PENDING USER EXECUTION / PENDING NEWMAN RUN}`
