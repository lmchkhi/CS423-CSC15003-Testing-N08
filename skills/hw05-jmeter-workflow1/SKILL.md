---
name: hw05-jmeter-workflow1
description: Thiết kế và sinh bộ test plan JMeter cho HW05 Performance Testing của EShop với workflow 1 "người dùng có sẵn mua hàng lần đầu". Dùng khi cần tạo hoặc rà soát Load, Stress, Spike, Endurance JMX/CSV cho backend API blackbox, mapping auth-heavy/read-heavy/transactional, đặt tên theo StudentID_ScenarioType_YYYYMMDD, cấu hình token correlation, assertion, timer, listener và human review theo đề HW05.
---

# HW05 JMeter Workflow 1

## Mục tiêu

Tạo test plan JMeter nhất quán cho HW05 bằng workflow 1:

```text
POST /api/login
-> GET /api/categories
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
```

Luôn giữ blackbox testing: chỉ đọc tài liệu như `HW05-PerformanceTesting.md`, `workflows.md`, `api_specification.md`, `README.md`; không sửa `backend`, `frontend-web`, `frontend-admin`, `frontend-mobile`.

## Tài liệu cần đọc

Đọc các file repo này trước khi sửa/generate artifact:

- `HW05-PerformanceTesting.md`: yêu cầu nộp, evidence, AI audit, AI critique.
- `workflows.md`: chỉ dùng Workflow 1 của Thanh và phần gợi ý slide.
- `api_specification.md`: payload, header, endpoint.
- `README.md`: port mặc định và account seed.

Khi cần chi tiết đã cô đọng, đọc `references/workflow1-design.md`.

## Workflow thực hiện

1. Xác nhận biến đầu vào: `StudentID`, ngày chạy `YYYYMMDD`, base URL mặc định `http://localhost:3000`, tool `JMeter`, workflow `1`.
2. Chuẩn bị dữ liệu CSV có header:

```csv
email,password,keyword,productId,productName,productPrice,quantity,totalAmount,shippingAddress
```

3. Ưu tiên nhiều account riêng cho chạy chính thức. Dùng `POST /api/register` để tạo account setup trước khi đo; không đưa register vào luồng đo chính của Workflow 1. Chỉ dùng `test@eshop.com / Test1234!` cho smoke hoặc tải thấp vì dùng chung account dễ gây tranh chấp giỏ hàng/đơn hàng và account lockout.
4. Sinh bốn plan theo cùng workflow: `Load`, `Stress`, `Spike`, `Endurance`. Ba plan đầu là bắt buộc của Task 1; Endurance phục vụ ngưỡng 10-15 phút.
5. Đặt tên plan đúng mẫu `{StudentID}_{ScenarioType}_{YYYYMMDD}.jmx`, ví dụ `23127475_Load_20260815.jmx`.
6. Giữ nguyên endpoint và thứ tự request giữa mọi scenario; chỉ thay workload model, timer và listener/report.
7. Cấu hình correlation:

- Login dùng JSON Extractor để lấy `token`.
- Các request `POST /api/cart` và `POST /api/checkout` phải gửi `Authorization: Bearer ${token}`.
- Nếu checkout response trả `orderId` thì có thể extract để debug, nhưng workflow 1 không bắt buộc dùng lại `orderId`.

8. Cấu hình assertion tối thiểu:

- `POST /api/login`: HTTP 200 và response có `token`.
- `GET /api/categories`: HTTP 200.
- `GET /api/products?search=${keyword}`: HTTP 200.
- `GET /api/products/${productId}`: HTTP 200.
- `POST /api/cart`: HTTP 200 hoặc 201 tùy SUT thực tế; nếu khác, kiểm tra bằng smoke trước rồi ghi rõ human review.
- `POST /api/checkout`: HTTP 200 hoặc 201 tùy SUT thực tế; nếu khác, kiểm tra bằng smoke trước rồi ghi rõ human review.

9. Cấu hình think time:

- Load/Stress: thêm timer ngẫu nhiên giữa các bước đọc/mua hàng theo gợi ý slide.
- Spike: giảm timer về 0 hoặc rất thấp để tạo tải đột ngột rõ ràng.

10. Rà soát human review trước khi chạy chính thức:

- Không đưa `/api/register` vào measured workflow vì Workflow 1 là "người dùng có sẵn mua hàng lần đầu"; dùng register như bước chuẩn bị CSV/account. Ghi rõ API register đã smoke test thành công nếu cần phản biện lỗi FE.
- Không dùng một account cho nhiều VU khi chạy chính thức.
- Không để totalAmount trong CSV thành nguồn tin duy nhất; ghi rằng backend phải tự tính lại tổng theo đặc tả dù API hiện có `total_amount`.
- Không để VU/ramp-up quá cao nếu máy local không chịu nổi; giảm và ghi lý do.

## Report views bắt buộc

Đề yêu cầu ba test plan Load, Stress, Spike dùng ba listener/report view khác nhau. Cấu hình nhất quán như sau:

| Scenario | Listener/report view trong JMeter | Ghi chú |
| --- | --- | --- |
| Load | `Summary Report` | Nhẹ, phù hợp baseline. |
| Stress | `Aggregate Report` | Có percentile/aggregate để tìm điểm gãy. |
| Spike | `View Results Tree` | Chỉ dùng khi spike tải thấp/debug vì listener này tốn tài nguyên; vẫn phải lưu raw `.jtl`. |

Ngoài ba listener trên, luôn xuất HTML Dashboard bằng CLI `-e -o` cho từng scenario từ raw `.jtl`; HTML Dashboard không thay thế yêu cầu "ba report views khác nhau".

## Workload gợi ý

Dùng làm điểm khởi đầu, sau smoke test thì điều chỉnh theo máy thật:

| Scenario | Threads/VUs | Ramp-up | Duration | Timer |
| --- | ---: | ---: | ---: | --- |
| Load | 50 | 60s | 300s | 1000-3000ms |
| Stress | 50-200 theo bậc hoặc 150 cố định nếu dùng plan đơn | 120s | 300-600s | 500-2000ms |
| Spike | 500 nếu máy chịu được, nếu không giảm còn 100-200 | 30s | 120s | 0-250ms |
| Endurance | gần ngưỡng ổn định sau Stress | 60s | 600-900s | 1000-3000ms |

## Sinh artifact nhanh

Dùng script này để tạo CSV mẫu và JMX skeleton:

```bash
python3 skills/hw05-jmeter-workflow1/scripts/generate_workflow1_jmx.py \
  --student-id 23127475 \
  --date 20260815 \
  --out-dir testing-artifacts/hw05 \
  --base-url http://localhost:3000
```

Sau khi sinh, phải mở/rà soát bằng JMeter GUI hoặc đọc XML để chỉnh workload theo máy thật. Script tạo baseline tốt, không thay thế human review.

Tạo account thật và CSV dùng cho JMeter:

```bash
python3 skills/hw05-jmeter-workflow1/scripts/create_workflow1_accounts.py \
  --count 50 \
  --prefix hw05-perf-20260815 \
  --out testing-artifacts/hw05/data/workflow1_users.csv
```

Tăng `--count` lên ít nhất bằng số VU tối đa của lần chạy chính thức nếu muốn tránh mọi VU dùng chung account.

## Tích hợp với skill khác

- Dùng `$hw05-jmeter-cli-runner` để chạy non-GUI, xuất `.jtl`, HTML dashboard và quản lý evidence.
- Dùng `$hw05-performance-report` sau khi có `.jtl` để summarize, phát hiện AI misinterpretation và viết report.
- Dùng `$hw05-ai-audit-log` trước final để append entry cho lượt hiện tại vào `reports/ai-audit-report.md`.
