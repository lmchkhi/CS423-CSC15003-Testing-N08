# HW05 — Báo cáo Performance Testing trên EShop

> **Sinh viên:** Hà Bảo Ngọc — 23127300 · **Nhóm:** N08
> **Workflow:** #5 — *Khôi phục tài khoản rồi mua hàng* (`workflows.md`)
> **Công cụ:** Apache JMeter 5.6.3 (chính) · k6 v2.2.0 (bonus §8)
> **SUT:** EShop backend API — `http://localhost:3000`

*(Khung báo cáo. Mỗi mục được điền trong giai đoạn tương ứng và commit riêng
theo §12.)*

---

## 1. Phạm vi và ánh xạ nhóm endpoint (§5)

Một hành trình end-to-end duy nhất, chạy giống hệt nhau ở cả ba kịch bản:

```
POST /api/forgot-password  →  ${resetToken}
POST /api/reset-password
POST /api/login            →  ${token}
GET  /api/products
GET  /api/products/${productId}
POST /api/cart
POST /api/checkout
```

| Nhóm endpoint | Endpoint | Vì sao thuộc nhóm này |
|---|---|---|
| Auth-heavy | `POST /api/forgot-password`, `POST /api/reset-password`, `POST /api/login` | *(điền)* |
| Read-heavy | `GET /api/products`, `GET /api/products/${productId}` | *(điền)* |
| Transactional | `POST /api/cart`, `POST /api/checkout` | *(điền)* |

Không trùng workflow với thành viên nào khác trong N08 — bảng phân công ở
`workflows.md`.

## 2. Task 1 — Thiết kế và sinh test plan bằng AI (§6)

### 2.1. Quy trình dẫn dắt AI theo từng bước

*(§6 cấm dùng một prompt tổng quát. Liệt kê từng stage, prompt tương ứng và số
entry trong `ai-audit-report.md`.)*

| Stage | Nội dung | Entry |
|---|---|---|
| 1 | Ánh xạ workflow → sampler | |
| 2 | Chọn workload model (think-time / ramp-up / thread count) | |
| 3 | Mô hình hoá dữ liệu CSV | |
| 4 | Extractor + assertion | |
| 5 | Sinh `.jmx` / script k6 | |
| 6 | Rà soát và sửa (human review) | |

### 2.2. Ba workload model

| Kịch bản | Tên file | Threads / VU | Ramp-up | Duration | Think-time | Lý do chọn |
|---|---|---:|---|---|---|---|
| Load | `23127300_Load_<YYYYMMDD>.jmx` | | | | | |
| Stress | `23127300_Stress_<YYYYMMDD>.jmx` | | | | | |
| Spike | `23127300_Spike_<YYYYMMDD>.jmx` | | | | | |

### 2.3. Dữ liệu CSV (§6 — data-driven)

| File | Cột | Số dòng | Dùng ở sampler |
|---|---|---:|---|

### 2.4. Ba report view khác nhau (§6)

Ba loại listener / report khác nhau, không lặp lại.

| Kịch bản | Report view | Bằng chứng |
|---|---|---|
| Load | | |
| Stress | | |
| Spike | | |

### 2.5. Human review — AI sai gì và vì sao

*(§6: nêu cụ thể chỗ AI làm sai hoặc bỏ sót — ramp-up/think-time phi thực tế,
sai thread count, assertion yếu, không xử lý khoá tài khoản — và giải thích
nguyên nhân: chất lượng prompt, giới hạn của model, hay đặc thù endpoint.)*

### 2.6. Thực thi và bằng chứng

| Kịch bản | Thời điểm chạy | `.jtl` | HTML report | Ảnh tool + resource monitor |
|---|---|---|---|---|

#### Cấu hình phần cứng

| Hạng mục | Giá trị |
|---|---|
| Hostname | *(phải khớp với các bài trước — §11)* |
| Chip / CPU | |
| RAM | |
| OS | |
| Java | |

#### Xử lý khoá tài khoản giữa các lần chạy (§6)

*(Ghi lại các bước reset, kèm script ở `perf/scripts/`.)*

### 2.7. Ngưỡng chịu tải của máy (endurance / soak)

*(Chạy 10–15 phút ở mức tải ổn định. Báo cáo bằng số: RPS ổn định tối đa, trần
bộ nhớ, thời điểm p95 bắt đầu trượt.)*

### 2.8. Video demo

| Nội dung | Link |
|---|---|

### 2.9. Bug / performance issue đã ghi nhận

| ID | Loại | Severity / Priority | Báo cáo | GitHub Issue |
|---|---|---|---|---|

## 3. Task 2 — Phân tích của AI và cuộc săn lỗi diễn giải

Xem [`ai-analysis-review.md`](ai-analysis-review.md).

## 4. Task 3 — Đề xuất Continuous Performance Testing (G9.6)

Xem [`continuous-perf-proposal.md`](continuous-perf-proposal.md).

## 5. Agent Skill (§7)

*(Skill áp dụng lại quy trình performance testing + phân tích log cho endpoint
khác, kèm video demo.)*

## 6. Phụ lục AI

- [`ai-audit-report.md`](ai-audit-report.md) — phụ lục §9
- [`prompt-log.md`](prompt-log.md) — bản ghi thô, không lọc
- [`ai-critique.md`](ai-critique.md) — bài phê bình 200–300 từ (§10)
