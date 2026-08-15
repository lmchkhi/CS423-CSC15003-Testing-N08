# Test Summary — HW05 Performance Testing

## Sinh viên: 23127464
## Workflow: Returning Customer Search and Order

---

### Scenarios thực hiện

| # | Scenario | JMX File | VU | Duration | Listener |
| --- | --- | --- | ---: | --- | --- |
| D1 | Load | 23127464_Load_20260813.jmx | 20 | Ramp 60s + Hold 360s | Summary Report |
| D2 | Stress (rerun) | 23127464_Stress_20260813.jmx | 10→80 | Staircase 5 bậc × 60s | Aggregate Report |
| D3 | Spike | 23127464_Spike_20260813.jmx | 5→50→5 | Baseline/spike/recovery ~190s | View Results Tree |
| D4 | Endurance | 23127464_Endurance_20260814.jmx | 20 | 30 phút | Response Time Graph |

### Endpoint groups covered

| Nhóm | Endpoints | Vai trò trong workflow |
| --- | --- | --- |
| Auth-heavy | POST /api/login | Bước 1: đăng nhập, lấy JWT token |
| Read-heavy | GET /api/products?search=, GET /api/products/:id, GET /api/orders/my-orders | Bước 2, 3, 7: tìm kiếm, xem chi tiết, lịch sử đơn hàng |
| Transactional | GET /api/cart, POST /api/cart, POST /api/checkout | Bước 4, 5, 6: giỏ hàng và thanh toán |

### Endurance threshold

> **20 VU / 11,5 req/s** sustained 30 phút, p95 = 40 ms, error = 0,00%, CPU max = 0,452%, RAM max = 61,61 MiB.

### Issues / Performance findings

| # | Loại | Mô tả | Evidence |
| --- | --- | --- | --- |
| 1 | Performance finding | Checkout latency tăng từ 7,9 ms → 36,3 ms sau 30 phút do order/cart accumulation | D1 vs D4 JTL |
| 2 | Functional defect | Checkout không clear cart | Source code `server.js:297-308` + runtime probe Phase A |
| 3 | Security defect | SQL injection trong search endpoint (`LIKE '%${searchQuery}%'`) | Source code `server.js:144` |
| 4 | Design inconsistency | Login failed +2 attempts thay vì +1; lockout 180s thay vì 30s | Source code `server.js:54-57` vs assignment spec |

### 2.5. Demo video

| Phase | Timestamp | Link |
| --- | --- | --- |
| D1 Load | 22:41 - 1:25:20 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=1361) |
| D2 Stress | 1:26:00 - 1:48:36 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=5160) |
| D3 Spike | 1:48:42 - 2:09:20 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=6522) |
| D4 Endurance | 2:09:30 - 3:03:17 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=7770) |
| Full video | 0:00 - 3:03:17 | [https://youtu.be/slTA5ErFCQ4](https://youtu.be/slTA5ErFCQ4) |

### Repository

- GitHub: (cần user cung cấp link public)

### Deliverables checklist

| # | Artifact | Trạng thái |
| --- | --- | --- |
| 1 | Main report (MD + PDF) | ✅ MD có / ⚠️ PDF chưa export |
| 2 | 3 graded JMX | ✅ Load, Stress, Spike |
| 3 | 3 raw JTL logs | ✅ |
| 4 | 3 HTML report folders | ✅ |
| 5 | Resource monitor evidence | ✅ Load, Stress (rerun), Spike, Endurance — tất cả RESOURCE_COVERAGE_OK |
| 6 | Hardware spec screenshots | ✅ |
| 7 | AI Audit Report (MD + PDF) | ✅ MD / ⚠️ PDF chưa export |
| 8 | AI Critique | ✅ (274 từ) |
| 9 | Demo video (YouTube) | ✅ [https://youtu.be/slTA5ErFCQ4](https://youtu.be/slTA5ErFCQ4) (~3h03m) |
| 10 | Git commit log | ✅ (cần generate) |
| 11 | Test summary | ✅ |
| 12 | README.md self-assessment | ✅ |
| 13 | Endurance JMX + JTL + HTML | ✅ |
| 14 | Bug/issue reports | ⚠️ Ghi nhận trong reports, chưa tạo GitHub Issues |
