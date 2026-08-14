# HW05 - Five End-to-End Performance Testing Workflows

Base URL: `http://localhost:3000`

Mỗi workflow dưới đây bao phủ đủ ba nhóm endpoint theo yêu cầu của HW05:

- **Auth-heavy:** xác thực người dùng và các thao tác liên quan đến tài khoản.
- **Read-heavy:** đọc, tìm kiếm và xem thông tin sản phẩm hoặc danh mục.
- **Transactional:** giỏ hàng, coupon, checkout và quản lý đơn hàng.

Ba test plan **Load**, **Stress** và **Spike** của một sinh viên phải chạy cùng một workflow. Các test plan chỉ thay đổi workload model như số virtual users, ramp-up, thời lượng và cách tăng tải.

## Workflow 1 - Người dùng có sẵn mua hàng lần đầu - Thanh

> Ghi chú cập nhật sau khi kiểm tra API trực tiếp: `POST /api/register` hoạt
> động khi gọi thẳng backend bằng cURL và có thể dùng để chuẩn bị account test.
> Nếu đăng ký không được từ frontend thì nhiều khả năng lỗi nằm ở form/frontend
> chặn trước khi gọi API hoặc xử lý request phía FE. Với HW05, workflow đo hiệu
> năng chính vẫn **không đưa register vào luồng đo** vì workflow đã chọn là
> "người dùng có sẵn mua hàng lần đầu"; register nên là bước setup dữ liệu trước
> khi chạy JMeter. Workflow vẫn bao phủ `auth-heavy` bằng `POST /api/login`.

### Luồng endpoint

```text
POST /api/login
-> GET /api/categories
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
```

### Phân nhóm

| Nhóm          | Endpoint                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/login`                                                                              |
| Read-heavy    | `GET /api/categories`, `GET /api/products?search=${keyword}`, `GET /api/products/${productId}` |
| Transactional | `POST /api/cart`, `POST /api/checkout`                                                         |

### Dữ liệu CSV đề xuất

```csv
email,password,keyword,productId,productName,productPrice,quantity,totalAmount,shippingAddress
```

Mỗi virtual user nên dùng một tài khoản có sẵn riêng để tránh tranh chấp trạng
thái giỏ hàng, đơn hàng và account lockout khi chạy Stress/Spike. Có thể dùng
tài khoản seed `test@eshop.com / Test1234!` cho chạy thử thấp tải, nhưng khi
chạy chính thức nên chuẩn bị nhiều tài khoản trong CSV bằng `POST /api/register`.
Với dữ liệu seed hiện tại, `productId=1`, `productName=iPhone 15 Pro Max`,
`productPrice=30000000` đã được smoke test thành công với cart và checkout.

## Workflow 2 - Khách hàng quay lại tìm kiếm và đặt hàng - Quang

### Luồng endpoint

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> GET /api/cart
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/my-orders
```

### Phân nhóm

| Nhóm          | Endpoint                                                                             |
| ------------- | ------------------------------------------------------------------------------------ |
| Auth-heavy    | `POST /api/login`                                                                    |
| Read-heavy    | `GET /api/products?search=${keyword}`, `GET /api/products/${productId}`              |
| Transactional | `GET /api/cart`, `POST /api/cart`, `POST /api/checkout`, `GET /api/orders/my-orders` |

### Dữ liệu CSV đề xuất

```csv
email,password,keyword,productId,quantity,totalAmount,shippingAddress
```

Đây là workflow cơ bản và dễ triển khai nhất bằng JMeter hoặc k6.

## Workflow 3 - Mua hàng sử dụng coupon - Khang

### Luồng endpoint

```text
POST /api/login
-> GET /api/products
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/apply-coupon
-> POST /api/checkout
-> POST /api/coupon-usage
```

### Phân nhóm

| Nhóm          | Endpoint                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------ |
| Auth-heavy    | `POST /api/login`                                                                          |
| Read-heavy    | `GET /api/products`, `GET /api/products/${productId}`                                      |
| Transactional | `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout`, `POST /api/coupon-usage` |

### Dữ liệu CSV đề xuất

```csv
email,password,productId,quantity,couponCode,totalAmount,shippingAddress
```

Coupon có giới hạn sử dụng theo người dùng. Cần chuẩn bị đủ tài khoản hoặc reset dữ liệu giữa các lần chạy.

## Workflow 4 - Đặt hàng rồi hủy đơn - Khải

### Luồng endpoint

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/${orderId}
-> PUT /api/orders/${orderId}/cancel
-> GET /api/orders/my-orders
```

### Phân nhóm

| Nhóm          | Endpoint                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/login`                                                                                                                      |
| Read-heavy    | `GET /api/products?search=${keyword}`, `GET /api/products/${productId}`                                                                |
| Transactional | `POST /api/cart`, `POST /api/checkout`, `GET /api/orders/${orderId}`, `PUT /api/orders/${orderId}/cancel`, `GET /api/orders/my-orders` |

### Dữ liệu CSV đề xuất

```csv
email,password,keyword,productId,quantity,totalAmount,shippingAddress
```

Test plan phải trích `token` từ response đăng nhập và `orderId` từ response checkout. Giá trị `${orderId}` được dùng cho request xem và hủy đơn hàng.

## Workflow 5 - Khôi phục tài khoản rồi mua hàng - Ngọc

### Luồng endpoint

```text
POST /api/forgot-password
-> Extract ${resetToken}
-> POST /api/reset-password
-> POST /api/login
-> GET /api/products
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
```

### Phân nhóm

| Nhóm          | Endpoint                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/forgot-password`, `POST /api/reset-password`, `POST /api/login` |
| Read-heavy    | `GET /api/products`, `GET /api/products/${productId}`                      |
| Transactional | `POST /api/cart`, `POST /api/checkout`                                     |

### Dữ liệu CSV đề xuất

```csv
email,newPassword,productId,quantity,totalAmount,shippingAddress
```

Workflow này thay đổi mật khẩu thật. Mỗi virtual user cần tài khoản riêng và không nên chạy đồng thời nhiều thread trên cùng một tài khoản.

## Phân công workflow đề xuất

| Thành viên | Workflow                                         |
| ---------- | ------------------------------------------------ |
| 1          | Người dùng có sẵn mua hàng lần đầu - Thanh        |
| 2          | Khách hàng quay lại tìm kiếm và đặt hàng - Quang |
| 3          | Mua hàng sử dụng coupon - Khang                  |
| 4          | Đặt hàng rồi hủy đơn - Khải                      |
| 5          | Khôi phục tài khoản rồi mua hàng - Ngọc          |

## Lưu ý khi xây dựng test plan

- Trích JWT `token` từ response của `POST /api/login`.
- Gửi `Authorization: Bearer ${token}` cho các endpoint yêu cầu xác thực.
- Không dùng chung một tài khoản cho nhiều virtual user nếu workflow thay đổi trạng thái tài khoản hoặc đơn hàng.
- Chuẩn bị dữ liệu CSV đủ lớn để tránh các virtual user tranh chấp cùng sản phẩm, coupon hoặc tài khoản.
- Giữ nguyên thứ tự endpoint của workflow trong cả Load, Stress và Spike test.
- Chỉ thay đổi workload model giữa ba scenario, không thay đổi hành trình nghiệp vụ.

## Gợi ý từ slide lý thuyết để triển khai HW05

### Mục tiêu từng loại test

| Scenario | Mục tiêu chính | Cách hiểu khi áp dụng vào EShop |
| -------- | -------------- | ------------------------------- |
| Load Test | Đánh giá hệ thống dưới mức tải kỳ vọng / tải bình thường. | Xác nhận workflow login → đọc sản phẩm → cart → checkout vẫn ổn định ở tải dự kiến. |
| Stress Test | Đẩy hệ thống vượt mức tải thông thường để tìm điểm gãy và khả năng phục hồi. | Tăng dần số VU đến khi latency/error rate tăng mạnh, timeout hoặc backend quá tải. |
| Spike Test | Tăng tải đột ngột trong thời gian ngắn rồi giảm nhanh. | Mô phỏng flash sale hoặc traffic tăng bất ngờ vào luồng mua hàng. |
| Endurance / Soak Test | Duy trì tải trong thời gian dài để tìm lỗi tích tụ. | Chạy 10–15 phút theo đề để tìm ngưỡng chịu tải ổn định trên máy cá nhân. |

### Metric nên thu thập và đưa vào report

| Metric | Ý nghĩa | Ghi chú khi báo cáo |
| ------ | ------- | ------------------- |
| Concurrent Users / VUs | Số người dùng ảo đang gửi request cùng lúc. | Ghi rõ số VU, ramp-up, steady-state, ramp-down cho từng scenario. |
| Response Time | Thời gian từ lúc gửi request đến khi nhận đủ response. | Báo cáo average, p50, p95, p99; không chỉ dùng average. |
| Latency | Độ trễ trước khi dữ liệu bắt đầu trả về. | Dùng để phân biệt chậm do network hay server xử lý. |
| Throughput | Năng lực xử lý thành công theo thời gian. | Có thể dùng RPS / TPS từ JMeter report. |
| Error Rate | Tỷ lệ request fail, HTTP 4xx/5xx hoặc timeout. | Nên phân loại lỗi do script/test data và lỗi thật của SUT. |
| Resource Utilization | CPU, RAM, Disk I/O, Network I/O của backend/máy chạy test. | Chụp Activity Monitor / htop cùng lúc với tool theo yêu cầu đề. |
| Percentile p50/p90/p95/p99 | Phân bố thời gian phản hồi. | p95 là ngưỡng quan trọng để phát hiện regression và viết proposal CI/CD. |

### Workload profile tham khảo

Có thể dùng các profile này làm điểm khởi đầu rồi điều chỉnh theo sức máy thật:

| Scenario | Concurrent Users | Ramp-up | Steady-state | Ramp-down | Ghi chú |
| -------- | ---------------- | ------- | ------------ | --------- | ------- |
| Load / Baseline | 50 VUs | 1 phút | 3 phút | 1 phút | Dùng để lấy baseline p50/p95/p99, throughput và error rate. |
| Stress | Bắt đầu 50 VUs, tăng dần cho đến khi lỗi rõ rệt | Tăng theo bậc | Mỗi bậc giữ 1–3 phút | 1 phút | Tìm điểm gãy: p95 tăng mạnh, error rate tăng, CPU/RAM chạm trần. |
| Spike | 50 → 500 VUs | 30 giây | 1 phút | 30 giây | Think time có thể đặt 0 giây để tạo tải đột ngột. |
| Endurance / Soak | Mức tải ổn định gần ngưỡng an toàn | 1 phút | 10–15 phút | 1 phút | Theo đề, dùng để xác định ngưỡng chịu tải trên hardware cá nhân. |

Các thông số trên là gợi ý từ slide, không phải con số bắt buộc. Nếu máy yếu
hoặc backend local không chịu nổi, giảm VU và ghi rõ lý do trong report.

### Think time tham khảo

| Transaction | Think Time |
| ----------- | ---------- |
| Browse/Search Products | 1–3 giây |
| View Product Details | 2–5 giây |
| Add to Cart | 1–2 giây |
| Checkout Flow | 2–4 giây |

Trong JMeter có thể mô phỏng bằng `Uniform Random Timer` hoặc `Gaussian Random
Timer`. Với Spike Test, có thể đặt think time bằng 0 giây để tạo đỉnh tải rõ hơn.

### Checklist JMeter cho workflow 1

- `Thread Group`: cấu hình VUs, ramp-up, loop/duration theo Load / Stress / Spike.
- `HTTP Request Defaults`: đặt `Server Name = localhost`, `Port = 3000`.
- `HTTP Header Manager`: đặt `Content-Type: application/json`; sau login thêm
`Authorization: Bearer ${token}` cho các request cần auth.
- `CSV Data Set Config`: với Workflow 1 đọc `email,password,keyword,productId,productName,productPrice,quantity,totalAmount,shippingAddress`.
- Nếu dùng CSV mở rộng cho Workflow 1, đọc thêm `productName,productPrice` để
  gửi payload `POST /api/cart` khớp sản phẩm seed thật.
- `HTTP Request`: tạo đúng thứ tự endpoint của workflow.
- `JSON Extractor`: trích `token` từ response login và `orderId` từ response checkout nếu cần dùng lại.
- `Timer`: thêm think time ngẫu nhiên cho Load/Stress; bỏ hoặc giảm mạnh trong Spike.
- `Assertion`: kiểm tra status code, response JSON có field cần thiết, và không có lỗi nghiệp vụ bất thường.
- `Listeners / Reports`: dùng đủ ba loại report khác nhau theo đề, ví dụ:
  - Load: `Summary Report`
  - Stress: `Aggregate Report`
  - Spike: `View Results Tree` khi debug tải thấp, kèm raw `.jtl`
- `HTML Dashboard`: xuất HTML report folder cho từng scenario từ raw `.jtl`.

### Kết quả smoke test API Workflow 1

Các endpoint đã được kiểm tra trực tiếp trên backend local:

| API | Kết quả |
| --- | --- |
| `POST /api/register` | `200 OK`, tạo user mới thành công |
| `POST /api/login` | `200 OK`, trả JWT `token` |
| `GET /api/categories` | `200 OK` |
| `GET /api/products?search=phone` | `200 OK`, trả `iPhone 15 Pro Max` |
| `GET /api/products/1` | `200 OK` |
| `POST /api/cart` | `200 OK` khi gửi `Authorization: Bearer <token>` |
| `GET /api/cart` | `200 OK` khi gửi `Authorization: Bearer <token>` |
| `POST /api/checkout` | `200 OK`, trả `orderId` |

Khi chạy qua sandbox của Codex, request có `Authorization` có thể bị chặn nếu
không chạy ngoài sandbox; đây là hạn chế môi trường agent, không phải lỗi SUT.

### Evidence cần chuẩn bị khi chạy

- File test plan đặt tên đúng mẫu `{StudentID}_{ScenarioType}_{YYYYMMDD}`.
- CSV data file dùng cho workflow.
- Raw `.jtl` log đầy đủ cho Load, Stress, Spike.
- HTML report folder cho Load, Stress, Spike.
- Screenshot tool JMeter/k6 cùng resource monitor trong lúc chạy.
- Hardware evidence: ảnh Activity Monitor / htop hoặc spec table, hostname khớp máy làm bài.
- Ghi chú nếu phải reset account lockout hoặc reset database giữa các lần chạy.
- Nếu phát hiện bug/performance issue thật: tạo bug report Markdown theo
  `.github/ISSUE_TEMPLATE/bug-report-template.md` trong `reports/bug-reports/`;
  sau đó có thể dùng skill `gh-create-bug-issues` để tạo GitHub Issue từ file này.
- Demo video tối thiểu 6 phút, có giọng nói tiếng Việt và thấy tool + resource monitor cùng khung hình.

### Gợi ý ngưỡng phân tích trong report

- Tập trung so sánh `p95`, `p99`, throughput và error rate giữa Load, Stress và Spike.
- Xem backend có dấu hiệu nghẽn khi CPU vượt khoảng 75–80% hoặc RAM tăng liên tục không giảm.
- Khi AI phân tích log `.jtl`, phải kiểm tra lại bằng số liệu thật từ file raw log; nếu AI đọc nhầm average thành p95 hoặc bỏ qua lỗi HTTP 4xx/5xx, ghi vào phần misinterpretation hunt.
- Với continuous performance testing proposal, có thể dùng p95 regression làm điều kiện cảnh báo: nếu p95 của workflow tăng quá ngưỡng so với baseline hoặc error rate vượt ngưỡng, pipeline báo fail/cảnh báo.
