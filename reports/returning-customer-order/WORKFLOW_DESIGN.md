# Thiết kế workflow — Returning Customer Search and Order

## Thông tin checkpoint

| Hạng mục | Giá trị |
| --- | --- |
| Sinh viên | 23127464 — Trần Minh Quang |
| Bài tập | HW05-AI — Performance Testing |
| SUT | EShop REST backend tại `src/eshop-sut` |
| Workflow | Returning Customer Search and Order |
| Checkpoint | Phase A — Verify and reconcile |
| Trạng thái | **PENDING HUMAN REVIEW** |
| Phạm vi tài liệu | Chỉ A1–A9; chưa thiết kế workload, chưa tạo JMX, chưa chạy performance test |

## Nguồn đã kiểm tra

- Assignment hiện hành: `2026.HW05.Performance_Testing_En_2.md`.
- README cấp repository: `README.md` (hiện vẫn là nội dung HW03, không phải bằng chứng runtime HW05).
- SUT: `src/eshop-sut/README.md`, `src/eshop-sut/api_specification.md`, `src/eshop-sut/setup_guide.md`.
- Implementation: `src/eshop-sut/backend/server.js`, `database.js`, `package.json`.
- JMeter cài tại `D:\apache-jmeter-5.6.3\bin`; `user.properties` không có property đang bật, `system.properties` có `sun.net.http.allowRestrictedHeaders=true`.
- Artifact workflow cũ: hai file CSV tồn tại nhưng đều 0 byte; chưa có JMX, JTL, HTML report hoặc báo cáo riêng của workflow. Thư mục `jmeter/` trong repository rỗng.

## Hợp đồng workflow dự kiến

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> GET /api/cart
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/my-orders
```

Base URL theo API spec và source: `http://localhost:3000`. Probe dùng địa chỉ tương đương `http://127.0.0.1:3000`.

## Kỳ vọng theo assignment/API specification

| Bước | Method và path | Query/body | Auth | Status/response dự kiến | Dynamic value |
| --- | --- | --- | --- | --- | --- |
| Login | `POST /api/login` | JSON `email`, `password` | Không | `200`; object có `token` và `user` | `token` |
| Search | `GET /api/products` | Query `search=${keyword}` | Không | `200`; JSON array sản phẩm | `productId`, `productName` |
| Detail | `GET /api/products/:id` | Path param `productId` | Không | `200`; object sản phẩm có `price` | `detailPrice` |
| Get cart | `GET /api/cart` | Không | Bearer token | `200`; dữ liệu giỏ hàng | Cart state |
| Add cart | `POST /api/cart` | JSON `id`, `name`, `price`, `quantity` | Bearer token | `200`; thông báo thêm thành công | Kết quả add |
| Checkout | `POST /api/checkout` | JSON `total_amount`, `shipping_address` | Bearer token | `200`; object có `orderId` | `orderId` |
| My orders | `GET /api/orders/my-orders` | Không | Bearer token | `200`; lịch sử đơn của user | Đối chiếu `orderId` |

## Quan sát từ source code

| Bước | Path/port thật | Implementation và response shape | Correlation |
| --- | --- | --- | --- |
| Login | Port hằng số `3000`; `POST /api/login` | So khớp email/password trong SQLite; thành công trả `{message, token, user}`; JWT chứa `id`, `role`, không đặt expiry. | Lấy được `token` cho header `Authorization: Bearer <token>`. |
| Search | `GET /api/products?search=...` | Trả array record `{id,name,price,description,imageUrl,category_id}`. Query được nối chuỗi trực tiếp vào SQL `LIKE`; lỗi DB trả HTML 500. | Lấy được `id` và `name` của phần tử tìm thấy. |
| Detail | `GET /api/products/:id` | Tìm bằng parameterized query; không tìm thấy vẫn trả `200 {}`. ID chẵn đổi `price` thành string, ID lẻ giữ numeric. | Có thể lấy `price`, nhưng correlation phải chấp nhận numeric hoặc numeric string và reject object rỗng. |
| Get cart | `GET /api/cart` | Bearer bắt buộc; trả array từ `userCarts[userId]`. | Cart state gắn với `userId` trong token. |
| Add cart | `POST /api/cart` | Bearer bắt buộc; push nguyên body vào array và trả `{message:"Added to cart"}`. Không validate và không merge item trùng. | Không trả cart ID; bước sau không cần ID cart. |
| Checkout | `POST /api/checkout` | Bearer bắt buộc; tin cậy `total_amount` từ client, insert order `pending`, trả `{message, orderId}`. Không đọc hoặc xóa cart. | Lấy được `orderId`. `totalAmount` có thể tính ở client từ `detailPrice * quantity`. |
| My orders | `GET /api/orders/my-orders` | Bearer bắt buộc; trả array order của `req.user.id`, sort ID giảm dần. | Có thể tìm order vừa tạo theo `id == orderId`. |

Nguồn source chính: `src/eshop-sut/backend/server.js`. Source quan sát được không được coi là bằng chứng runtime.

## Quan sát runtime — minimal functional probe

Probe duy nhất chạy từ `2026-08-13T21:44:42.416+07:00` đến `2026-08-13T21:44:43.024+07:00`, dùng một account mặc định, một sản phẩm, quantity `1` và một checkout. Đây không phải performance test.

| Bước | Runtime observation | Dynamic result |
| --- | --- | --- |
| Login | `200`; object có `message`, token không rỗng và `user` | Token dùng thành công cho các endpoint protected; token không được lưu vào artifact. |
| Search | `200`; array có 1 kết quả cho keyword `iPhone` | `productId=1`, `productName=iPhone 15 Pro Max`. |
| Detail | `200`; object có `id,name,price,description,imageUrl,category_id` | `detailPrice=30000000`, runtime type `Int32`. |
| Get cart | `200`; JSON array | Accessible bằng Bearer token. Không sử dụng phép đếm ban đầu do wrapper PowerShell ban đầu có ambiguity với array rỗng. |
| Add cart | `200`; object có `message` | Item được giữ trong cart của user. |
| Checkout | `200`; object có `message,orderId` | `totalAmount=30000000`; `orderId=1`. |
| My orders | `200`; JSON array | Tìm thấy order ID `1`; correlation checkout → history thành công. |

Kiểm tra state sau checkout lúc `2026-08-13 21:58:32 +07:00` xác nhận cart vẫn có 1 item và lịch sử có 1 order pending. Probe đã làm thay đổi state thật: thêm một cart item và một order.

## Khả thi của correlation

| Chuỗi correlation | Kết luận Phase A | Điều kiện cần giữ cho Phase B |
| --- | --- | --- |
| Login → token | Khả thi từ source và runtime | Không log token/secret; assert token không rỗng. |
| Search → productId/productName | Khả thi từ source và runtime | Assert array không rỗng trước khi lấy phần tử. |
| Detail → detailPrice | Khả thi; human review chấp nhận rủi ro kiểu dữ liệu không đồng nhất | Phase B đặc tả quy tắc normalize number/numeric string; Phase C hiện thực và kiểm chứng trong JMX; reject thiếu price hoặc giá không hợp lệ. |
| detailPrice × quantity → totalAmount | Khả thi; probe cho `30000000 × 1 = 30000000` | Dùng phép tính decimal chính xác và quantity dương. |
| Checkout → orderId | Khả thi từ source và runtime | Assert `orderId` không rỗng. |
| My-orders → verify orderId | Khả thi từ source và runtime | Tìm đúng `id`, không chỉ dựa vào phần tử đầu tiên. |

## Test-data và state risks

| Hạng mục | Expected/documented behavior | Observed implementation/runtime behavior | Performance-test impact | Required mitigation/reset strategy |
| --- | --- | --- | --- | --- |
| Account sharing | Assignment yêu cầu tính đến lockout; contract khuyến nghị account isolation khi state model cần. | Cart được key theo user ID; order cũng gắn user ID. Nhiều VU dùng chung account sẽ chia sẻ cart và order history. | Cross-thread state contamination; response my-orders tăng; khó quy lỗi/correlation. | Human review định hướng **1 account/VU** và **account mới cho mỗi scenario**. Phase B phải cụ thể hóa provisioning/mapping; CSV hiện rỗng và sẽ được thiết kế ở phase sau. |
| Cart ownership | Chỉ user đã auth truy cập cart của mình. | Source dùng `req.user.id`; runtime auth/cart reachable. | Ownership đúng theo token, nhưng cùng account đồng nghĩa cùng cart. | Áp dụng 1 account/VU theo human review; không hard-code token. |
| Cart persist qua iteration | Tài liệu không nói rõ qua iteration; checkout phải clear cart. | Cart nằm trong object in-memory, tồn tại qua request/iteration khi backend chưa restart. Runtime sau checkout vẫn còn 1 item. | Payload/cart state tăng dần khi reuse account; iteration sau không bắt đầu sạch. | Cần reset/restart hoặc cơ chế cleanup được review; không có delete-cart API. |
| Checkout clear cart | README FR-08: phải xóa cart sau checkout. | Source không clear cart; runtime xác nhận cart còn 1 item. | **Lệch quan trọng**, làm sai validity của test lặp. | Human review chấp nhận đây là defect; không sửa SUT. Dùng account mới theo scenario và restart/reset SUT giữa scenario theo reset strategy được thiết kế ở Phase B. |
| Order accumulation | Không có yêu cầu tự xóa history. | Mỗi checkout insert SQLite; my-orders trả toàn bộ order theo ID giảm dần. Runtime có order `1`. | Response size và DB state tăng theo số iteration, tạo state drift. | Dùng account mới theo scenario và restart SUT giữa scenario; ghi reset/provision result và số order trước/sau. |
| Login sai nhiều lần | README FR-02: tăng đúng 1; khóa sau 3 lần; 30 giây. | Source tăng `+2` mỗi lần sai; từ lần sai thứ hai đã khóa; khóa 180 giây. Email không tồn tại trả 401 nhưng không tăng counter. | **Lệch quan trọng**; credential lỗi có thể làm run sau bị lock và tạo false performance failures. | Human review đã xác nhận hiểu hành vi. Phase B phải validate credential ngoài measured interval, dùng 1 account/VU và đưa restart/reset giữa scenario vào reset strategy. Không probe runtime bằng login sai ở Phase A. |
| Login lockout runtime | Khóa theo mô tả ở trên. | Chưa xác minh runtime bằng chuỗi login sai; chỉ source inspection. | Chưa thể xem source là runtime proof. | Đánh dấu không xác định cho runtime; xác minh an toàn trước measured phase nếu được review. |
| Reset account | Assignment yêu cầu reset lockout giữa run. | Không có endpoint/script reset riêng. `node database.js` drop/recreate/seed toàn DB. | Reset riêng một account không sẵn có. | Phase B phải chốt thao tác reset có kiểm soát và backup nếu cần. |
| Reset/restart SUT | Setup guide nói `node database.js` khi muốn reset, rồi `node server.js`. | `server.js` import `database.js`, mà module này luôn gọi `initDatabase()` và drop/recreate/seed; do đó mỗi lần start backend cũng reset toàn DB. Restart cũng xóa cart in-memory. | Startup có tác dụng destructive đối với state SUT; không thể coi restart là thao tác vô hại. | Human review định hướng restart SUT giữa scenario. Phase B phải ghi PID/start time/reset result và provision lại account pool sau mỗi restart vì restart xóa account đã tạo trước đó. |
| Deterministic starting state | Assignment yêu cầu reproducibility/evidence. | Có thể đạt bằng startup/reset seed, nhưng thao tác xóa toàn bộ order/user/product thay đổi state chung. Hiện state đã drift bởi probe. | Scenario không độc lập nếu không reset. | Phase B cụ thể hóa chuỗi `restart/reset → health check → provision account mới → validate → bắt đầu measured interval`, theo chính sách 1 account/VU. |

## Hardware and Environment Baseline

| Item | Observed Value | Evidence |
| --- | --- | --- |
| Hostname | `TMQ` | `tests/returning-customer-order/evidence/hardware/hardware-system-info.png` |
| Operating System | Microsoft Windows 11 Pro 64-bit, build `26200` (`10.0.26200`) | `hardware-system-info.png`, `hardware-cpu-memory.png` |
| CPU | 12th Gen Intel(R) Core(TM) i7-12700H; 14 cores hiển thị trong Task Manager | `hardware-system-info.png`, `hardware-cpu-memory.png` |
| Logical Processors | `20` | `hardware-system-info.png`, `hardware-cpu-memory.png` |
| Total RAM | `32768 MB` theo dxdiag; `31.7 GiB` usable theo Task Manager (`34029162496` bytes từ CIM) | `hardware-system-info.png`, `hardware-cpu-memory.png` |
| Java Version | OpenJDK `17.0.16` LTS, Microsoft build `17.0.16+8-LTS`, 64-bit | `tests/returning-customer-order/evidence/hardware/java-version.png` |
| JMeter Version | Apache JMeter `5.6.3` | `tests/returning-customer-order/evidence/hardware/jmeter-version.png` |
| Backend Process | `node.exe`; executable `C:\Program Files\nodejs\node.exe`; command `server.js` | `tests/returning-customer-order/evidence/baseline/backend-idle-resource.png`, `environment-baseline.png` |
| Backend PID | `25832` | `backend-idle-resource.png`, `environment-baseline.png` |
| Backend Idle CPU | `0.00%` trung bình của 5 mẫu 1 giây; Task Manager hiển thị `00` | `backend-idle-resource.png`, `environment-baseline.png` |
| Backend Idle Memory | Working set trung bình `46.16 MiB`; private memory trung bình `55.69 MiB` trong 5 mẫu | `tests/returning-customer-order/evidence/baseline/baseline-measurement.txt`; screenshot Task Manager chỉ xác nhận process/PID, không hiện working set tuyệt đối |
| System Idle CPU | Trung bình `22.40%` của 5 mẫu 1 giây lúc `22:03:16 +07:00`; ảnh Task Manager do user cung cấp hiển thị tức thời `14%` lúc khoảng `21:52` | `baseline-measurement.txt`, `environment-baseline.png`, `hardware-cpu-memory.png` |
| System Idle Memory | Trung bình `45.56%` dùng trong 5 mẫu; Task Manager hiển thị `14.3/31.7 GB (45%)` | `baseline-measurement.txt`, `environment-baseline.png`, `hardware-cpu-memory.png` |
| Observation Time | Hardware ảnh user: `2026-08-13 14:52:18` theo dxdiag; baseline ảnh khoảng `21:52 +07:00`; baseline command 5 mẫu kết thúc `22:03:16 +07:00`; cùng ngày/máy `TMQ` | Tất cả evidence nêu trên |

Lưu ý: “idle” ở đây nghĩa là backend không nhận performance workload; CPU toàn hệ thống vẫn dao động do IDE, tác vụ hệ điều hành và thao tác chụp evidence. Baseline chỉ dùng để mô tả môi trường, không phải ngưỡng performance.

## Quyết định bị hoãn sang Phase B

- Thiết kế chi tiết account pool/CSV theo quyết định 1 account/VU và account mới cho mỗi scenario; hai CSV hiện vẫn rỗng.
- Reset/provisioning có kiểm soát giữa scenario: restart SUT trước, sau đó provision lại account pool vì restart reseed toàn DB.
- Đặc tả normalization price ở Phase B và hiện thực/kiểm chứng trong JMX ở Phase C.
- Mọi tham số Load/Stress/Spike/Endurance, think time hoặc performance threshold.

Không có quyết định Phase B nào được tự phê duyệt trong tài liệu này.

## Phản hồi human review đã ghi nhận

Thời điểm ghi nhận: `13/08/2026 22:17 — Asia/Ho_Chi_Minh`.

- Chấp nhận rủi ro `price` là number hoặc numeric string; xử lý bằng normalization ở Phase B/C.
- Ghi nhận add-cart không merge item trùng và checkout không clear cart là defect; không sửa SUT.
- Dùng 1 account/VU, account mới cho mỗi scenario và restart SUT giữa các scenario.
- Thiết kế CSV ở phase sau.
- Khi thiết kế reset strategy phải tính đến login failed-attempt tăng `+2` và lockout 180 giây trong implementation.
- Giữ root README ở trạng thái HW03 và cập nhật cuối cùng cho HW05.
- Xác nhận JMeter tại `D:\apache-jmeter-5.6.3\bin`.

Phản hồi trên là correction/direction cho Phase A. Chưa có câu phê duyệt Phase A hoặc authorization bắt đầu Phase B, nên checkpoint vẫn là **PENDING HUMAN REVIEW**.
