# Checklist Mini Exercise - API Testing

> Điền trước khi bắt đầu: **MSSV:** `23127062` - **API đã chọn:** `PUT /api/products/:id` - **Tên ngắn API:** `update-product`

## 1. Chuẩn bị

- [x] Chọn đúng **1 API** trong danh sách của đề và không trùng API với bạn cùng nhóm.
- [ ] Dùng repository nhóm đã fork từ `eshop-sut` của giảng viên.
- [ ] Bật GitHub Actions trong tab **Actions** của repository.
- [x] Clone repository và tạo nhánh riêng, ví dụ `feature/<MSSV>`.
- [ ] Kiểm tra Node.js 18/20 LTS, npm, Git, Postman Desktop và Newman.
- [ ] Nếu cần, vào `backend`, chạy `npm install` và cài Newman.
- [ ] Chuẩn bị công cụ AI có thể lưu lại prompt và output.

## 2. Generate with AI - tối thiểu 12 test case

- [x] Mô tả rõ API đã chọn: method, endpoint, request mẫu, response mẫu và các status code.
- [x] Viết prompt chi tiết, không chỉ yêu cầu chung chung như "generate all tests".
- [x] Yêu cầu AI sinh **ít nhất 12 test case**.
- [x] Yêu cầu kết quả có đủ cột: `tc_id`, `input`, `expected status`, `expected fields`, `rationale`.
- [x] Bao phủ domain partition: hợp lệ, không hợp lệ và boundary của từng input.
- [x] Bao phủ state transition nếu API liên quan trạng thái đơn hàng.
- [x] Bao phủ security phù hợp: thiếu/hết hạn/sai token, SQL injection, IDOR, role escalation.
- [x] Bao phủ schema validation cho response body.
- [x] Lưu prompt và bản AI output rút gọn vào `test-design.md`.

## 3. Audit - human review

- [x] Audit **toàn bộ** test case do AI đề xuất trong `test-design.md`.
- [x] Gắn một nhãn cho từng case: `VALID`, `INVALID` hoặc `INCOMPLETE`.
- [x] Viết nhận xét hoặc cách chỉnh sửa cho từng case.
- [x] Giải thích lý do cho **mỗi nhãn**, tối thiểu 1 câu.
- [x] Sửa ít nhất 1 case `INVALID` hoặc `INCOMPLETE`.
- [ ] Nếu mọi case đều hợp lệ, chỉ ra ít nhất 1 giả định AI chưa nêu và bổ sung giả định đó.

## 4. Extend - tự viết thêm test case

- [x] Tự bổ sung **ít nhất 2 test case** AI đã bỏ sót.
- [x] Với mỗi case, giải thích vì sao AI có thể bỏ sót: prompt, giới hạn model hoặc đặc điểm API.
- [x] Cân nhắc Content-Type, response time, chuỗi rỗng, số âm/rất lớn, ký tự đặc biệt hoặc status code không chuẩn REST.
- [x] Ghi các test case bổ sung vào `test-design.md`.

## 5. Execute bằng Postman và Newman

### 5.1. Khởi động provider

- [x] Chạy backend bằng `cd backend` rồi `npm run dev`.
- [x] Kiểm tra `http://localhost:3000/api/products/1` trả status `200` và sản phẩm iPhone 15 Pro Max.

### 5.2. Tạo data-driven tests

- [x] Chọn đúng **5 test case** từ các case đã audit và tự bổ sung.
- [x] Tạo `mini-<api-name>.data.json` với đúng 5 bộ dữ liệu.
- [x] Đảm bảo tên biến trong data file khớp với biến dùng trong Postman Collection.
- [x] Có cả positive case và negative case nếu API cho phép.

### 5.3. Cấu hình Postman

- [x] Tạo Collection cho API đã chọn.
- [x] Tạo Environment có `baseUrl = http://localhost:3000`.
- [x] Thêm environment variable `studentId = <MSSV>`.
- [x] Pre-request script thêm header `X-Student-Id` lấy từ `studentId`.
- [x] Test script kiểm tra status dựa trên data variable, ví dụ `expected_status`.
- [x] Tự viết thêm assertion kiểm tra **Content-Type** hoặc **response time**.
- [x] Chạy Collection Runner với data file và xác nhận đủ 5 iterations.

### 5.4. Chạy Newman

- [x] Export Collection thành `mini-<api-name>.postman_collection.json`.
- [x] Export Environment thành `mini-local.postman_environment.json`.
- [ ] Chạy lệnh:

```bash
newman run mini-<api-name>.postman_collection.json \
  --environment mini-local.postman_environment.json \
  --iteration-data mini-<api-name>.data.json \
  --reporters cli,json \
  --reporter-json-export mini-newman-report.json
```

- [x] Newman chạy đúng 5 iterations.
- [x] Không có assertion nào fail.
- [x] File `mini-newman-report.json` đã được tạo.
- [x] Console cho thấy request gửi `X-Student-Id` đúng MSSV.

## 6. CI/CD bằng GitHub Actions

- [x] Tạo `.github/workflows/newman-api-test.yml`.
- [x] Workflow tự khởi động backend/provider.
- [x] Workflow cài Newman, chạy Collection với data file và upload report.
- [ ] Commit và push phiên bản đúng; chờ workflow pass.
- [ ] Chụp màn hình pipeline pass và lưu `ci-pass.png`.
- [ ] Cố ý đổi một expected value, ví dụ `expected_status: 999`.
- [ ] Commit, push và chờ workflow fail với ít nhất 1 test đỏ.
- [ ] Chụp màn hình pipeline fail và lưu `ci-fail.png`.
- [ ] Khôi phục expected value đúng, commit và push lần cuối.
- [ ] Xác nhận **commit cuối cùng có pipeline pass**.

## 7. Postman features

- [x] Trong `test-design.md`, tạo bảng gồm: Feature, Đã dùng?, Ghi chú.
- [x] Liệt kê đủ: Collections, Environment variables, Collection variables, Pre-request scripts, Test scripts, Data-driven runs, Newman CLI, Monitors, Mock servers, Workspaces.
- [x] Đánh dấu `Có`/`Không` cho từng feature và ghi chú ngắn 1 câu cho feature đã dùng.
- [x] Đảm bảo đã dùng **ít nhất 6 features**.

## 8. Kiểm tra và đóng gói bài nộp

- [x] `test-design.md` có prompt, AI output rút gọn, bảng audit, phần extend và bảng Postman features.
- [x] Có `mini-<api-name>.data.json`.
- [x] Có `mini-<api-name>.postman_collection.json`.
- [x] Có `mini-local.postman_environment.json`.
- [x] Có `mini-newman-report.json`.
- [x] Có `newman-api-test.yml`.
- [ ] Có `ci-pass.png` và `ci-fail.png`.
- [x] Mở lại các JSON/YAML để kiểm tra đúng cú pháp và không chứa secret/token thật.
- [x] Chạy Newman lần cuối và xác nhận toàn bộ assertion pass.
- [ ] Xác nhận GitHub Actions của commit cuối cùng pass.
- [ ] Nén đúng tên `<MSSV>_Mini_API_Testing.zip`.
- [ ] Mở file ZIP và kiểm tra đủ toàn bộ thành phần trước khi nộp.
