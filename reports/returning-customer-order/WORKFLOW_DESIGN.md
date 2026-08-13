# Thiết kế workflow — Returning Customer Search and Order

## Thông tin checkpoint

| Hạng mục | Giá trị |
| --- | --- |
| Sinh viên | 23127464 — Trần Minh Quang |
| Bài tập | HW05-AI — Performance Testing |
| SUT | EShop REST backend tại `src/eshop-sut` |
| Workflow | Returning Customer Search and Order |
| Checkpoint | Phase B đã đóng; Phase C đã được authorize nhưng chưa bắt đầu |
| Trạng thái | **PHASE B APPROVED — PHASE C AUTHORIZED** |
| Phạm vi tài liệu | Phase B đã được human review; interaction này chỉ ghi nhận approval, chưa tạo/chạy smoke JMX, chưa tạo graded JMX và chưa chạy workload |

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

Phản hồi trên là correction/direction cho Phase A. Người dùng đã phê duyệt rõ ràng bằng câu **“Approve Phase A. Authorize Phase B.”** lúc `13/08/2026 22:24 — Asia/Ho_Chi_Minh`. Phase A đã đóng; Phase B được phép bắt đầu trong một yêu cầu thực hiện tiếp theo.

**PHASE A APPROVED — PHASE B AUTHORIZED**

## Phase B — workflow đã khóa

Tất cả Load, Stress và Spike phải giữ nguyên một transaction logic `RCO-E2E-ReturningCustomerOrder`, đúng thứ tự và tên sampler sau. Không được bỏ bước hoặc đổi thứ tự để làm số liệu đẹp hơn.

| Sampler | Endpoint | Vai trò | Correlation đầu ra |
| --- | --- | --- | --- |
| `RCO-01-Login` | `POST /api/login` | Auth-heavy | `token` |
| `RCO-02-Search` | `GET /api/products?search=${keyword}` | Read-heavy | `productId`, `productName` |
| `RCO-03-ProductDetail` | `GET /api/products/${productId}` | Read-heavy | `detailPrice`, `normalizedPrice` |
| `RCO-04-GetCart` | `GET /api/cart` | Transactional | Cart JSON hiện tại |
| `RCO-05-AddCart` | `POST /api/cart` | Transactional | Kết quả add |
| `RCO-06-Checkout` | `POST /api/checkout` | Transactional | `orderId` |
| `RCO-07-MyOrders` | `GET /api/orders/my-orders` | Transactional | Xác minh `orderId` mới |

### Chuỗi correlation và chuẩn hóa giá

```text
CSV(email,password) -> token
CSV(keyword) -> productId + productName
productId -> detailPrice -> normalizedPrice
normalizedPrice * positive integer quantity -> totalAmount
checkout -> orderId
my-orders -> exact orderId
```

- Mọi extractor phải kiểm tra giá trị khác null/rỗng trước khi gửi request phụ thuộc. Thiếu correlation làm sampler/transaction fail; không gửi tiếp bằng giá trị mặc định giả.
- `detailPrice` được chấp nhận khi JSON trả number hoặc numeric string. Phase C phải dùng `BigDecimal` hoặc tương đương: lấy giá trị thô, chuyển `toString().trim()`, reject rỗng/không phải số/không dương, rồi tạo `normalizedPrice` bằng decimal chính xác. Không dùng `double`, không làm tròn bằng magic number.
- `quantity` phải parse thành số nguyên dương. `totalAmount = normalizedPrice.multiply(new BigDecimal(quantity))`; giá trị serialize cho checkout phải không dùng scientific notation. Không hard-code `productId` hoặc `totalAmount`.

### Functional assertions bắt buộc

| Sampler | Điều kiện thành công nghiệp vụ |
| --- | --- |
| `RCO-01-Login` | HTTP 200; body JSON hợp lệ; `token` tồn tại và khác rỗng; user/email trả về khớp row CSV. |
| `RCO-02-Search` | HTTP 200; body là JSON array; có ít nhất một product; product được chọn có `id` và `name` khác rỗng. |
| `RCO-03-ProductDetail` | HTTP 200; body là object không rỗng; `id` khớp `productId`; có `price`; normalize thành `BigDecimal > 0`. |
| `RCO-04-GetCart` | HTTP 200; response authenticated và body là JSON array. Không assert cart luôn rỗng vì defect/state drift đã biết. |
| `RCO-05-AddCart` | HTTP 200; JSON hợp lệ; message đúng `Added to cart`; không có 4xx/5xx. |
| `RCO-06-Checkout` | HTTP 200; JSON hợp lệ; message đúng `Checkout successful`; `orderId` khác rỗng và là ID dương. |
| `RCO-07-MyOrders` | HTTP 200; body là JSON array; có ít nhất một order có `id` khớp chính xác `orderId` vừa correlate. |

HTTP 200 chỉ là điều kiện cần. JSON parse, correlation hoặc business assertion fail phải làm sampler và transaction cha fail để không biến response nhanh nhưng sai nghiệp vụ thành sample thành công.

## Thiết kế CSV và mapping account/VU

### Workflow CSV

File `tests/returning-customer-order/data/returning-customer-order.csv` dùng đúng header:

```csv
email,password,keyword,quantity,shippingAddress
```

File có 150 row fixture tổng hợp, chia thành ba window không giao nhau. Các account này là danh tính test tổng hợp cần được tạo và login-validate sau mỗi restart; việc có row trong CSV **không** phải bằng chứng account đã tồn tại. Password `RcoFixture!2026` chỉ là fixture local của SUT demo, không phải token, personal credential hoặc production secret. Keyword lấy từ product seed trong source; Phase C vẫn phải preflight để xác nhận mỗi keyword trả product hợp lệ trên runtime hiện tại.

| Pool | Peak VU | Window trong workflow CSV (không tính header) | Email prefix |
| --- | ---: | --- | --- |
| Load | 20 | row 1–20 | `rco.load.*@perf.test` |
| Stress | 80 | row 21–100 | `rco.stress.*@perf.test` |
| Spike | 50 | row 101–150 | `rco.spike.*@perf.test` |
| Endurance | Chưa quyết định | Chưa cấp row | Sẽ tạo pool mới sau evidence Stress/D4 và human review |

Phase C phải hiện thực lựa chọn đúng window theo scenario bằng cơ chế đọc CSV có kiểm soát; không để CSV Data Set mặc định của Stress/Spike bắt đầu từ row Load. Nếu cơ chế window khó audit, được phép tạo projection CSV riêng theo scenario từ file canonical, nhưng projection phải được tạo ngoài measured interval, có row count/checksum và không thay đổi dữ liệu.

### Provisioning CSV

File `tests/returning-customer-order/data/account-provisioning.csv` có schema:

```csv
scenario,vuIndex,name,email,password
```

CSV chứa cùng 150 danh tính: Load 20, Stress 80, Spike 50. Cặp `(scenario,vuIndex)` và `email` phải unique; mỗi scenario chỉ provision pool của chính nó. Endurance chưa có row vì peak VU chưa được quyết định. Mapping là `threadNum` 0-based -> `vuIndex = threadNum + 1`; một VU nhận đúng một account trong cả run và hai VU không được nhận cùng row.

Provisioning/validation nằm hoàn toàn ngoài measured interval. Tiêu chí bắt buộc trước khi cho phép run:

```text
Requested: N
Created: N
Create failed: 0
Unique email: N
Login with non-empty token: N
Login failed: 0
Empty cart verified: N
Empty order history verified: N
```

Với đề xuất hiện tại, `N` lần lượt là 20, 80 và 50. Không provision toàn bộ 150 account cho mỗi scenario. Nếu bất kỳ count nào lệch, không bắt đầu measured interval.

### Sharing, recycle và hành vi hết row

- Chỉ window/projection của scenario hiện tại được share ở phạm vi **All threads trong đúng Thread Group**, theo cơ chế cấp row nguyên tử một lần tại lúc thread khởi tạo.
- `recycle = false`. Không quay lại đầu file, kể cả khi thread kết thúc sớm.
- Khi hết row, chọn **stop test** (fail-fast), không chỉ stop một thread; tiếp tục với ít VU hơn sẽ làm sai workload đã review.
- Trước run phải assert `row count == peak VU`, email unique, `quantity` là integer dương, keyword/address khác rỗng và mapping đủ `threadNum 0..peakVU-1`.
- Không share alias CSV giữa các scenario chạy đồng thời. Các scenario chạy tuần tự, restart và provision lại; prefix/window ngăn tái sử dụng chéo.

## Reset, seed và account isolation

Chuỗi bắt buộc giữa hai scenario, toàn bộ nằm ngoài measured interval:

1. Ghi scenario/run ID, timestamp, PID backend cũ và xác nhận không có measured run đang hoạt động.
2. Dừng đúng process backend đã review; xác nhận PID cũ đã thoát. Không chạy `database.js` song song với backend.
3. Start lại `node server.js` theo setup đã review. Do `server.js` import `database.js`, startup sẽ drop/recreate/seed toàn SQLite và tạo lại cart in-memory; đây là reset destructive có chủ đích đối với SUT test local.
4. Ghi PID và start time mới; bắt buộc `new PID != old PID`. Nếu PID không đổi/không xác định, dừng chuẩn bị để điều tra thay vì giả định reset thành công.
5. Poll endpoint `GET /api/products?search=iPhone` đến khi nhận HTTP 200, JSON array không rỗng trong timeout được review; đồng thời kiểm tra backend log có thông báo database initialized/seeded và listening. Đây chỉ là readiness check, không phải measured sample.
6. Chọn đúng pool scenario, provision `N` account qua `/api/register`, rồi validate đủ các count nêu trên. Login đúng một lần/account với credential chính xác; không thử password đoán.
7. Xác nhận cart và order history rỗng cho từng account, lưu log provisioning/preflight, rồi mới đánh dấu thời điểm bắt đầu measured interval.

Lockout implementation quan sát từ source là tăng `+2` mỗi lần sai và khóa 180 giây khi counter đạt ít nhất 3; runtime lockout chưa được probe. Nếu vô tình có 401 do credential sai hoặc 403 lockout trong provisioning/smoke, hủy run. Cách reset xác định là restart backend, verify PID/HTTP, rồi provision lại toàn pool của scenario; không chờ 180 giây bên trong measured interval và không sửa trực tiếp SQLite. Có thể chờ hết 180 giây chỉ để chẩn đoán ngoài measured interval, không thay thế reset chuẩn.

Checkout không clear cart, add-cart không merge duplicate và orders tích lũy trong SQLite. Vì vậy state/payload của mỗi account tăng qua iteration trong cùng scenario; my-orders có thể ngày càng lớn và đây là residual risk cần theo dõi theo thời gian. Restart trước scenario kế tiếp xóa cart/order và account cũ, nên không cần cleanup bổ sung và không được sửa SUT. So sánh scenario chỉ hợp lệ khi cùng reset/provision policy; khi diễn giải latency phải tách ảnh hưởng của VU khỏi ảnh hưởng payload/order-history tăng dần.

## Thông số workload — INITIAL_PROPOSAL

Các giá trị dưới đây chỉ là thiết kế khởi điểm để human review. Chúng **không phải SLA, threshold chính thức hoặc kết quả đo**; assignment không cung cấp SLA nghiệp vụ chính thức.

| Scenario | INITIAL_PROPOSAL | Peak account cần provision | Listener/report riêng |
| --- | --- | ---: | --- |
| Load | 20 VU; ramp-up 60 giây; steady 360 giây | 20 | Summary Report |
| Stress | Bậc 10 -> 20 -> 40 -> 60 -> 80 VU; 60 giây mỗi bậc; tổng 300 giây | 80 | Aggregate Report |
| Spike | Baseline 5 VU/60 giây -> tăng lên 50 VU trong 5 giây -> giữ 50 VU/60 giây -> về 5 VU trong 5 giây -> recovery 5 VU/60 giây | 50 | View Results Tree |
| Endurance | **UNDECIDED**; chỉ derive từ evidence Stress đã được review ở D4 | Chưa xác định | Chưa xác định |

Think time chung là random 1–3 giây giữa các business step, không đặt trước Login hoặc sau My Orders. Cùng workflow, correlation, assertion, data policy và think-time distribution phải được giữ giữa ba plan. View Results Tree có overhead và chỉ là report view bắt buộc/aid; Phase C/D phải review cách bật/lưu phù hợp để không làm sai measured run, trong khi raw JTL và HTML mới là nguồn metric chính.

## Điểm cần khóa trước Phase C

- Human review số pool: Load 20, Stress 80, Spike 50 và tổng 150 fixture; Endurance chưa cấp account.
- Human review Load 20/60/360, Stress 10–20–40–60–80 × 60 giây, Spike 5/50/5 và think time 1–3 giây.
- Chọn và review implementation đọc đúng CSV window/projection, fail-fast khi thiếu row và mapping một row/VU.
- Phase C phải preflight toàn bộ keyword, thử normalization cho cả JSON number và numeric string, và smoke 1 thread × 1 iteration trước khi sinh graded plans.
- Review overhead của View Results Tree cho Spike và residual state growth do cart/order không cleanup.

## Phê duyệt Phase B

Người dùng đã phê duyệt rõ ràng bằng câu **“Approve Phase B. Authorize Phase C.”** lúc `13/08/2026 22:42 — Asia/Ho_Chi_Minh`. Phase B đã đóng và Phase C được phép bắt đầu trong một yêu cầu thực hiện tiếp theo. Interaction phê duyệt này không tạo hoặc chạy JMX.

**PHASE B APPROVED — PHASE C AUTHORIZED**
