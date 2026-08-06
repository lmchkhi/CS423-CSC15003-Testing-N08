# Pattern Playwright cho EShop HW04

## Cấu trúc khuyến nghị

```text
tests/automation/
  data/
    fr03-forgot-password.json
    fr11-order-history.json
    fr14-category-management.json
  fixtures/
    auth.ts
    api.ts
    report-metadata.ts
    data-loader.ts
  specs/
    fr03-forgot-password.spec.ts
    fr11-order-history.spec.ts
    fr14-category-management.spec.ts
  reports/
    matrix-manifest.json
```

## Config tối thiểu

- Định nghĩa `projects` cho `chromium`, `firefox`, `webkit`.
- Bật HTML reporter theo hướng dẫn trong `playwright-reporting.md`.
- Đưa `Run by: ${process.env.STUDENT_ID}` và ISO timestamp vào report title/metadata bằng biến môi trường.
- Dùng `WEB_BASE_URL=http://localhost:5173`, `ADMIN_BASE_URL=http://localhost:5174`, `API_BASE_URL=http://localhost:3000`.
- Bật artifact phục vụ bug evidence: screenshot khi fail, trace khi retry hoặc khi fail, video khi dung lượng cho phép.

## Data-driven

- Đọc data từ JSON/CSV ở đầu spec hoặc fixture.
- Mỗi record nên có: `id`, `title`, `type`, `data`, `expected`, `assertions`, `source`.
- `source` phải trỏ tới manual test case ID, ví dụ `TC-FR14-DT-007`.
- Không để danh sách case dạng array/object inline trong `.spec.ts`.
- Validate dữ liệu lúc load: file tồn tại, JSON/CSV hợp lệ, không trùng `id`, có đủ ít nhất 12 record cho feature.
- Không rẽ nhánh bằng `if (case.id === ...)` cho từng test; dùng nhóm journey rõ ràng hoặc action/expectation vocabulary nhỏ.

## Assertion patterns

Dùng tối thiểu ba pattern, chọn theo case:

- UI visible/text: `expect(locator).toBeVisible()`, `toContainText()`, `toHaveText()`.
- Navigation/state: `expect(page).toHaveURL()`, step indicator, redirect/login guard.
- API response: `expect(response.status()).toBe(...)`, kiểm body JSON.
- Data consistency: so sánh số dòng UI với API, tổng tiền format, order ownership.
- Form validation: required field, invalid format, disabled/blocked submit.
- Style/accessibility-visible distinction: class/color/status badge khi FR yêu cầu phân biệt màu.

## Locator và wait

- Ưu tiên `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`.
- Dùng `data-testid` chỉ khi ứng dụng đã có sẵn qua black-box DOM; không yêu cầu sửa frontend để thêm.
- Tránh `waitForTimeout`; dùng wait theo network response, URL, locator state, hoặc assertion auto-wait.
- Khi UI thiếu hook ổn định, dùng locator gần nghĩa nghiệp vụ nhất và ghi vào review là một rủi ro selector.
- Không bỏ qua assertion khi locator không tìm thấy. Nếu UI thiếu thành phần bắt buộc theo SRS, để test fail và ghi defect nếu xác nhận đúng.

## API hỗ trợ black-box

- Dùng API để setup/verify khi UI không cung cấp luồng cần thiết hoặc manual case đã ghi "API verification".
- Không dùng API để bỏ qua mục tiêu UI chính nếu case yêu cầu kiểm UI.
- Với case authorization/security, API assertion thường là oracle chính.
