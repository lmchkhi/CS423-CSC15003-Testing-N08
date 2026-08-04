# Quy ước Playwright cho HW04

Đọc tài liệu này khi chuẩn hóa fixture, viết Playwright TypeScript, phân loại kết quả hoặc kiểm chứng report.

## 1. Fixture data-driven

Dùng một record cho mỗi test case. Tối thiểu hỗ trợ cấu trúc sau:

```ts
type TestCaseSource = 'HW02' | 'Bổ sung';
type TestCaseType = 'positive' | 'negative' | 'edge';

interface PlaywrightCase<TInput, TExpected> {
  id: string;
  title: string;
  type: TestCaseType;
  preconditions: string[];
  input: TInput;
  expected: TExpected;
  source: TestCaseSource;
  tags?: string[];
  skipReason?: string;
  expectedResponse?: {
    status?: number;
    method?: string;
    urlPattern?: string;
    bodySubset?: Record<string, unknown>;
  };
  evidence?: string[];
}
```

Áp dụng các quy tắc:

- Giữ `id` của HW02 cho case kế thừa.
- Dùng `source: "HW02"` cho case gốc và `source: "Bổ sung"` cho case mới; ghi lý do bổ sung trong bảng test case/review notes.
- Đặt dữ liệu biến thiên ở JSON/CSV, không đặt inline trong vòng lặp test.
- Không ghi credential thật vào fixture. Nhận credential qua biến môi trường hoặc cơ chế bí mật của môi trường chạy.
- Chỉ dùng `skipReason` khi case thực sự không chạy được và luôn đưa case đó vào danh sách chưa tự động hóa/skipped.
- Kiểm tra fixture bằng type/interface và validation runtime nếu dữ liệu đến từ JSON không tin cậy.

## 2. Locator và đồng bộ

Ưu tiên locator theo thứ tự:

1. `getByRole()` với accessible name ổn định.
2. `getByTestId()` khi SUT công khai test id.
3. `getByLabel()` cho control có nhãn.
4. `getByText()` cho nội dung người dùng quan sát được.
5. CSS/XPath chỉ khi các lựa chọn trên không khả dụng; ghi lý do và rủi ro.

Đồng bộ theo trạng thái quan sát được:

- Dùng web-first assertions như `await expect(locator).toBeVisible()`.
- Dùng `page.waitForResponse()` khi expected gắn với request/response.
- Dùng `page.waitForURL()` hoặc assertion URL khi điều hướng là kết quả cần kiểm tra.
- Bắt đầu chờ response trước hành động phát request để tránh race condition.
- Không dùng `waitForTimeout()` làm cơ chế đồng bộ. Nếu bất khả kháng, ghi lý do, thời lượng và phương án loại bỏ trong review notes.

## 3. Nhóm assertion

Toàn suite phải thực sự chạy ít nhất ba nhóm khác nhau. Việc chỉ khai báo hoặc comment không được tính.

| Nhóm | Ví dụ Playwright | Bằng chứng cần lưu |
| --- | --- | --- |
| DOM / visible text | `toBeVisible()`, `toHaveText()`, `toContainText()` | Tên test và kết quả assertion |
| State / attribute | `toBeEnabled()`, `toBeChecked()`, `toHaveAttribute()`, `toHaveURL()` | Trạng thái/thuộc tính quan sát được |
| Network / response | kiểm tra status, method hoặc body từ `waitForResponse()` | URL/method/status, không lộ bí mật |
| Count / aggregate | `toHaveCount()`, tổng tiền hoặc số item quan sát qua UI/API công khai | Giá trị expected và actual |
| Visual / snapshot | `toHaveScreenshot()`, `toMatchSnapshot()` | Snapshot và diff do lần chạy thật tạo |

Chú thích nhóm assertion tại code hoặc annotation để có thể kiểm đếm. Không dùng snapshot thay cho assertion nghiệp vụ duy nhất.

## 4. Phân loại thất bại

Phân loại trước khi tạo bug report:

| Loại | Dấu hiệu | Hành động |
| --- | --- | --- |
| Test defect | Locator sai, fixture sai, race condition, assertion không đúng test case đã duyệt | Sửa test, review lại và chạy lại; không báo bug SUT |
| Environment issue | SUT không khởi động, browser/Edge chưa cài, mạng hoặc seed được duyệt không khả dụng | Ghi môi trường, lệnh và lỗi; khắc phục rồi chạy lại |
| SUT defect | Test đúng với artifact đã duyệt, môi trường hợp lệ, hành vi sai có thể tái hiện | Lưu bằng chứng thật và tạo bug report đề xuất |

Nếu chưa đủ bằng chứng, dùng trạng thái `Không xác định`; không mặc định là SUT defect.

## 5. Đa trình duyệt và báo cáo

- Cấu hình Chromium, Firefox và Microsoft Edge; với Edge dùng project có `channel: 'msedge'` khi phù hợp.
- Ghi riêng số lượt theo feature–browser. Với ba tính năng, tổng tối thiểu là chín lượt.
- Tạo timestamp bằng `new Date().toISOString()` tại runtime chạy report, không ghi sẵn timestamp trong source hoặc template.
- Hiển thị chính xác `Run by: 23127464` và timestamp ISO 8601 trên HTML report/Allure artifact.
- Sau khi chạy, mở artifact và kiểm tra trực tiếp metadata. Lưu đường dẫn artifact và bằng chứng kiểm tra.
- Chỉ báo pass/fail/skip theo kết quả runner thật; giữ exit code và command.
- Không tuyên bố đạt tiêu chí metadata nếu mới kiểm tra file config.
