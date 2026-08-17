# BÁO CÁO TỔNG HỢP KIỂM THỬ PHẦN MỀM
## Test Summary Report — Toàn bộ bài tập HW02 đến HW05

---

## 1. Thông tin chung

| Mục                      | Giá trị                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| Họ tên sinh viên         | Ngô Hồng Thanh                                                         |
| MSSV                     | 23127475                                                               |
| Nhóm                     | N08                                                                    |
| Môn học                  | CS423 / CSC15003 — Kiểm thử Phần mềm                                  |
| Hệ thống được kiểm thử   | EShop — Ứng dụng thương mại điện tử demo (Web, Mobile, Backend API)    |
| Phạm vi báo cáo          | HW02, HW03, HW04, HW05                                                 |
| Ngày lập báo cáo         | 2026-08-17                                                             |
| Repository               | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08                 |

---

## 2. Tóm tắt hệ thống được kiểm thử (SUT)

**EShop** là nền tảng thương mại điện tử gồm 4 thành phần:

| Thành phần   | Công nghệ                    | URL mặc định           |
| ------------ | ---------------------------- | ---------------------- |
| Backend API  | Node.js + Express + SQLite   | `http://localhost:3000` |
| Frontend Web | React + Vite + Tailwind CSS  | `http://localhost:5173` |
| Web Admin    | React + Vite + Tailwind CSS  | `http://localhost:5174` |
| Mobile App   | React Native + Expo          | IP LAN của máy chủ     |

Tài liệu đặc tả yêu cầu (SRS) được dùng làm oracle chính thức cho mọi bài tập. Mọi test case, checklist và assertion đều được thiết kế dựa trên SRS, không phụ thuộc vào mã nguồn triển khai.

---

## 3. Phạm vi và mục tiêu kiểm thử theo từng bài

| Bài  | Loại kiểm thử                             | Kỹ thuật chính                                 | Features được kiểm thử                                          |
| ---- | ----------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| HW02 | Kiểm thử chức năng (Functional Testing)   | Domain Testing + Boundary Value Analysis (BVA) | FR-03, FR-11, FR-14, FR-23 (Web + Mobile)                       |
| HW03 | Kiểm thử GUI, Usability & Cross-Platform  | GUI Checklist, Usability (SUS), Cross-Browser  | Admin: Login, Dashboard, Category, Product, User                |
| HW04 | Kiểm thử tự động hóa (Automation Testing) | Playwright (TypeScript), Data-driven, AI-Codex | FR-03, FR-11, FR-14 (Chromium, Firefox, WebKit)                 |
| HW05 | Kiểm thử hiệu năng (Performance Testing)  | Load, Stress, Spike, Endurance (JMeter)        | Workflow 1: Login → Categories → Search → Cart → Checkout       |

---

## 4. Kết quả kiểm thử theo từng bài

### 4.1 HW02 — Domain Testing & Boundary Value Analysis

**Mục tiêu:** Áp dụng Domain Testing và BVA để kiểm thử 4 tính năng trên nền Web và Mobile.

**Môi trường:** Chrome local (Web), thiết bị thực (Mobile).

#### Bảng tóm tắt test case

| Feature  | Tên tính năng                              | Kỹ thuật       | Thiết kế | Thực thi | Pass | Fail | Không chạy | Blocked |
| -------- | ------------------------------------------ | -------------- | -------: | -------: | ---: | ---: | ---------: | ------: |
| FR-03    | Quên mật khẩu & Đặt lại mật khẩu (Web)    | Domain Testing | 12       | 12       | 6    | 6    | 0          | 0       |
| FR-03    | Quên mật khẩu & Đặt lại mật khẩu (Web)    | BVA            | 6        | 6        | 1    | 5    | 0          | 0       |
| FR-11    | Xem lịch sử đơn hàng (Web)                 | Domain Testing | 12       | 12       | 10   | 2    | 0          | 0       |
| FR-11    | Xem lịch sử đơn hàng (Web)                 | BVA            | 3        | 3        | 3    | 0    | 0          | 0       |
| FR-14    | Quản lý danh mục CRUD (Web Admin)          | Domain Testing | 16       | 16       | 8    | 8    | 0          | 0       |
| FR-14    | Quản lý danh mục CRUD (Web Admin)          | BVA            | 6        | 6        | 5    | 1    | 0          | 0       |
| FR-23    | Quên mật khẩu & Đặt lại mật khẩu (Mobile) | Domain Testing | 12       | 12       | 5    | 5    | 0          | 2       |
| FR-23    | Quên mật khẩu & Đặt lại mật khẩu (Mobile) | BVA            | 6        | 6        | 3    | 3    | 0          | 0       |
| **Tổng** |                                            |                | **73**   | **73**   | **41** | **30** | **0** | **2** |

**Tỉ lệ:** Pass 56,2% — Fail 41,1% — Blocked 2,7%

#### Bảng bug HW02

| Bug ID       | Feature | Mức độ       | Trạng thái | GitHub Issue |
| ------------ | ------- | ------------ | ---------- | ------------ |
| BUG-FR03-001 | FR-03   | Major        | Open       | [#52](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/52) |
| BUG-FR03-002 | FR-03   | Major        | Open       | [#53](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/53) |
| BUG-FR03-003 | FR-03   | Major        | Open       | [#54](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/54) |
| BUG-FR03-004 | FR-03   | Major        | Open       | [#55](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/55) |
| BUG-FR03-005 | FR-03   | **Critical** | Open       | [#56](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/56) |
| BUG-FR11-007 | FR-11   | **Critical** | Open       | [#59](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/59) |
| BUG-FR11-012 | FR-11   | Minor        | Open       | [#60](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/60) |
| BUG-FR14-001 | FR-14   | **Critical** | Open       | [#62](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/62) |
| BUG-FR14-002 | FR-14   | Major        | Open       | [#63](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/63) |
| BUG-FR14-003 | FR-14   | Major        | Open       | [#64](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/64) |
| BUG-FR23-001 | FR-23   | **Critical** | Open       | [#80](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/80) |
| BUG-FR23-002 | FR-23   | Major        | Open       | [#81](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/81) |
| BUG-FR23-003 | FR-23   | Major        | Open       | [#82](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/82) |
| BUG-FR23-004 | FR-23   | Major        | Open       | [#83](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/83) |

**Tổng số bug HW02:** 14 (Critical: 4 — Major: 9 — Minor: 1)

---

### 4.2 HW03 — GUI Testing, Usability Evaluation & Cross-Platform Testing

**Mục tiêu:** Kiểm thử toàn diện giao diện Admin theo 3 phần: GUI Checklist (Task 1), Usability (Task 2), Cross-Browser/Platform (Task 3).

---

#### 4.2.1 Task 1 — GUI Checklist

**Phạm vi:** Admin Login, Admin Dashboard, Category Management, Product Management (bao gồm CSV Import), User Management.

**Phương pháp:** Black-box GUI checklist theo SRS, chạy trên Chrome local.

| Màn hình            | Số item |
| ------------------- | ------: |
| Admin Login         | 13      |
| Admin Dashboard     | 10      |
| Category Management | 9       |
| Product Management  | 22      |
| User Management     | 10      |
| Toàn bộ Admin       | 1       |
| **Tổng**            | **65**  |

| Kết quả  | Số lượng |
| -------- | -------: |
| Pass     | 28       |
| **Fail** | **37**   |
| Blocked  | 0        |
| Not Run  | 0        |

**Tỉ lệ pass:** 43,1% — **Tỉ lệ fail:** 56,9%

Các bug GUI: 35 bug `BUG-GUI-*` + 3 bug `BUG-HR-GUI-*`, tổng **38 bug** — GitHub Issues [#152](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/152) đến [#188](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/188).

Các lỗi rủi ro cao nhất:
- **Critical:** `BUG-GUI-056` — UI không ngăn admin tự xóa tài khoản đang đăng nhập.
- **Major:** `BUG-GUI-003`, `BUG-HR-GUI-001` — Thiếu `type="email"` và không hiển thị trạng thái khóa tài khoản sau 3 lần sai.
- **Major:** `BUG-GUI-025`, `BUG-GUI-028`, `BUG-GUI-036`, `BUG-GUI-037`, `BUG-GUI-041` — Validation sai và xóa không có confirmation dialog.

---

#### 4.2.2 Task 2 — Usability Evaluation (SUS)

**Phương pháp:** Moderated usability evaluation với 7 participant thật. Sử dụng SUS (System Usability Scale) 10 câu + Probe questions.

**Flow kiểm tra:** Admin Login → Dashboard → Create Category → Create/Edit/Delete Product → Import CSV → Inspect/Delete User.

| Participant | Thiết bị/Trình duyệt      | Hoàn thành task | Thời gian      | SUS Score |
| ----------- | ------------------------- | --------------- | -------------- | --------: |
| P01         | MacBook - Chrome          | Partial         | 2 phút 59 giây | 65,0      |
| P02         | Windows - Chrome          | Partial         | 1 phút 57 giây | 65,0      |
| P03         | Windows - Chrome          | Partial         | 1 phút 38 giây | 52,5      |
| P04         | MacBook - Chrome          | Partial         | 4 phút 33 giây | 55,0      |
| P05         | Laptop - Chrome           | Partial         | 9 phút 40 giây | 72,5      |
| P06         | Desktop Windows 10 Chrome | Partial         | 4 phút 05 giây | 70,0      |
| P07         | MacBook - Chrome          | Partial         | 3 phút 48 giây | 42,5      |

- **SUS trung bình:** 60,4 (mức Marginal — chưa đạt acceptable ổn định)
- **Thời gian trung bình:** ~4 phút 6 giây
- **Tất cả session đạt Partial** do bug product update làm gián đoạn flow

Findings nổi bật:

| Finding ID | Chủ đề                                                   | Loại       | Mức độ   | Participants |
| ---------- | --------------------------------------------------------- | ---------- | -------- | ------------ |
| USAB-F-001 | Product update không đáng tin, làm sai product list       | Bug        | Critical | P01–P07      |
| USAB-F-002 | Thao tác xóa thiếu confirmation dialog                    | Bug/Risk   | Major    | P01–P07      |
| USAB-F-003 | Validation & error recovery yếu                           | Bug        | Major    | P01–P06      |
| USAB-F-004 | Feedback sau create/update/delete không nhất quán         | Design/Bug | Major    | P01–P07      |
| USAB-F-005 | Edit mode trong Product Management khó nhận biết          | Design     | Major    | P01–P07      |
| USAB-F-006 | Product form thiếu hướng dẫn về required fields           | Design     | Minor    | P02–P07      |

Bug genuine phát sinh từ Usability:

| Bug ID       | Module              | Mức độ       | GitHub Issue |
| ------------ | ------------------- | ------------ | ------------ |
| BUG-USAB-001 | Product Management  | Critical / P0 | [#198](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/198) |
| BUG-USAB-002 | Category Management | Major / P1   | [#199](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/199) |
| BUG-USAB-003 | All Admin Screens   | Major / P1   | [#200](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/200) |
| BUG-USAB-004 | Product Management  | Major / P1   | [#201](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/201) |
| BUG-USAB-005 | Product Management  | Major / P1   | [#202](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/202) |

---

#### 4.2.3 Task 3 — Cross-Browser / Cross-Platform Testing

**Phạm vi:** 15 item được chọn lọc từ 65 item Task 1. Chạy trên Chrome (baseline), Firefox 153 và Safari 27 qua BrowserStack.

| Nền tảng                       | Tổng item | Pass | Fail | Khác so với Chrome |
| ------------------------------ | --------: | ---: | ---: | -----------------: |
| Chrome local (baseline)        | 15        | 8    | 7    | —                  |
| Firefox 153 (BrowserStack Mac) | 15        | 7    | 8    | 1                  |
| Safari 27 (BrowserStack Mac)   | 15        | 7    | 8    | 1                  |

**Finding cross-platform duy nhất:** `CP-012` — Bảng User Management ở viewport hẹp trên Firefox/Safari không cuộn ngang được, bị mất/cắt chữ (pass trên Chrome local).

| Bug ID      | Module          | Mức độ     | GitHub Issue |
| ----------- | --------------- | ---------- | ------------ |
| BUG-CP-012  | User Management | Major / P2 | [#203](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/203) |

---

### 4.3 HW04 — AI Automation Testing (Playwright)

**Mục tiêu:** Tự động hóa 3 feature đã chọn từ HW02 bằng Playwright với AI-Codex, chạy trên 3 browser.

**Framework:** Playwright Test (TypeScript) | **AI tool:** Codex | **Browser:** Chromium, Firefox, WebKit

#### Bảng tóm tắt tự động hóa

| Feature  | Tên tính năng                     | Test cases | Browser | Thực thi | Pass | Fail | Bug reports |
| -------- | --------------------------------- | ---------: | ------: | -------: | ---: | ---: | ----------: |
| FR-03    | Quên mật khẩu & Đặt lại mật khẩu | 18         | 3       | 54       | 21   | 33   | 6           |
| FR-11    | Xem lịch sử đơn hàng              | 15         | 3       | 45       | 39   | 6    | 2           |
| FR-14    | Quản lý danh mục CRUD             | 22         | 3       | 66       | 39   | 27   | 3           |
| **Tổng** |                                   | **55**     | **9**   | **165**  | **99** | **66** | **11** |

- **Tỉ lệ pass tổng thể:** 60,0% (99/165 lượt thực thi)
- **Tỉ lệ fail:** 40,0% (66/165 lượt thực thi)

#### Bug từ automation HW04

| Bug ID                     | Feature | GitHub Issues                                  |
| -------------------------- | ------- | ---------------------------------------------- |
| BUG-FR03-AUTO-001 đến 006  | FR-03   | [#214](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/214) — [#219](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/219) |
| BUG-FR11-AUTO-001, 002     | FR-11   | [#239](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/239), [#240](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/240) |
| BUG-FR14-AUTO-001, 002, 003 | FR-14  | [#241](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/241) — [#243](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/243) |

**Tổng bug HW04:** 11 automation bug report (FR-03: 6, FR-11: 2, FR-14: 3)

---

### 4.4 HW05 — Performance Testing (JMeter)

**Mục tiêu:** Kiểm thử hiệu năng SUT (EShop Backend API) theo Workflow 1 với các kịch bản Load, Stress, Spike và Endurance.

**Tool:** Apache JMeter 5.6.3 CLI | **Resource monitor:** htop / Activity Monitor | **AI tool:** Codex

**Workflow được đo:**
```
POST /api/login
  -> GET /api/categories
  -> GET /api/products?search={keyword}
  -> GET /api/products/{productId}
  -> POST /api/cart
  -> POST /api/checkout
```

**Môi trường phần cứng:** macOS, Apple M3 Pro 11 cores, RAM 36 GB, Java 25.0.4 LTS.

#### Bảng kết quả hiệu năng

| Kịch bản  | VUs | Ramp-up | Thời lượng | Samples   | Error rate | Avg (ms) | p95 (ms) | p99 (ms) | Throughput (RPS) |
| --------- | --: | ------- | ---------- | --------: | ---------: | -------: | -------: | -------: | ---------------: |
| Load      | 50  | 60s     | 300s       | 1.176     | **0,00%**  | 2,91     | 5        | 6        | 4,0384           |
| Stress    | 150 | 120s    | 420s       | 8.930     | **0,00%**  | 1,89     | 4        | 5        | 21,6052          |
| Spike     | 200 | 30s     | 120s       | 1.225.240 | **0,00%**  | 17,14    | 37       | 55       | 10.212,2907      |
| Endurance | 50  | 60s     | 900s       | 3.837     | **0,00%**  | 2,42     | 4        | 5        | 4,3127           |

**Kết quả nổi bật:**
- Tất cả 4 kịch bản chính thức đạt **error rate = 0,00%** — không có HTTP 5xx, timeout, token lỗi hay account lockout.
- Ngưỡng ổn định đã kiểm chứng: **50 VUs, 15 phút**, p95 = 4 ms, throughput = 4,3127 RPS.
- Ở mức Stress 150 VUs, throughput tăng 5,4x so với Load nhưng latency không tăng đáng kể.
- Spike 200 VUs trong 30s ramp: p95 = 37 ms, p99 = 55 ms — vẫn trong ngưỡng chấp nhận được cho REST API.
- **Không tìm thấy điểm gãy (breaking point)** của SUT trong giới hạn phần cứng local.
- **Bug hiệu năng:** Không ghi nhận bug SUT hay performance issue nào được xác nhận.

---

## 5. Tổng hợp số liệu toàn bộ 4 bài

### 5.1 Tổng số test case theo bài

| Bài  | Loại kiểm thử             | Test cases / Items | Pass   | Fail | Khác      |
| ---- | ------------------------- | -----------------: | -----: | ---: | --------- |
| HW02 | Functional (Domain + BVA) | 73                 | 41     | 30   | 2 Blocked |
| HW03 | GUI Checklist             | 65                 | 28     | 37   | —         |
| HW04 | Automation (Playwright)   | 165 lượt           | 99     | 66   | —         |
| HW05 | Performance (JMeter)      | 15.180 samples     | 15.180 | 0    | —         |

> **Lưu ý:** Số liệu HW05 tính trên tổng số sample JMeter (không phải test case truyền thống).

### 5.2 Tổng số bug theo bài và mức độ

| Bài                          | Critical | Major | Minor | Tổng   |
| ---------------------------- | -------: | ----: | ----: | -----: |
| HW02                         | 4        | 9     | 1     | **14** |
| HW03 Task 1 (GUI)            | 1        | 30    | 7     | **38** |
| HW03 Task 2 (Usability)      | 1        | 4     | 0     | **5**  |
| HW03 Task 3 (Cross-Platform) | 0        | 1     | 0     | **1**  |
| HW04                         | —        | —     | —     | **11** |
| HW05                         | 0        | 0     | 0     | **0**  |
| **Tổng**                     | **6**    | **44** | **8** | **69** |

> Lưu ý: Bug HW02 và HW04 có sự trùng lặp feature (FR-03, FR-11, FR-14) vì HW04 automation phát hiện thêm bug mới cho cùng feature đó. Tổng 69 bug không trùng nhau.

### 5.3 Phân bố bug theo feature/module

| Feature / Module         | HW02 | HW03 | HW04 | HW05 | Tổng |
| ------------------------ | ---: | ---: | ---: | ---: | ---: |
| FR-03 (Forgot Password)  | 5    | —    | 6    | —    | 11   |
| FR-11 (Order History)    | 2    | —    | 2    | —    | 4    |
| FR-14 (Category CRUD)    | 3    | 9    | 3    | —    | 15   |
| FR-23 (Mobile)           | 4    | —    | —    | —    | 4    |
| Admin Login              | —    | 5    | —    | —    | 5    |
| Admin Dashboard          | —    | 4    | —    | —    | 4    |
| Product Management       | —    | 10   | —    | —    | 10   |
| User Management          | —    | 5    | —    | —    | 5    |
| Usability/Cross-Platform | —    | 6    | —    | —    | 6    |
| Performance              | —    | —    | —    | 0    | 0    |
| **Tổng**                 | **14** | **39** | **11** | **0** | **64** |

---

## 6. Phân tích phát hiện quan trọng & rủi ro

### 6.1 Các vấn đề nghiêm trọng nhất (Critical)

| STT | Bug ID / Finding | Module              | Mô tả                                                         | Bài  |
| --- | ---------------- | ------------------- | ------------------------------------------------------------- | ---- |
| 1   | BUG-FR03-005     | FR-03 (Forgot PW)   | Lỗi bảo mật nghiêm trọng trong luồng đặt lại mật khẩu        | HW02 |
| 2   | BUG-FR11-007     | FR-11 (Orders)      | Lỗi nghiêm trọng trong xem lịch sử đơn hàng                  | HW02 |
| 3   | BUG-FR14-001     | FR-14 (Category)    | Lỗi nghiêm trọng trong quản lý danh mục CRUD                 | HW02 |
| 4   | BUG-FR23-001     | FR-23 (Mobile)      | Lỗi nghiêm trọng trong luồng Mobile Forgot Password          | HW02 |
| 5   | BUG-GUI-056      | User Management     | UI không ngăn admin tự xóa tài khoản đang đăng nhập          | HW03 |
| 6   | BUG-USAB-001     | Product Management  | Product update không đáng tin, làm sai product list           | HW03 |

### 6.2 Các nhóm vấn đề lặp lại xuyên suốt nhiều bài

1. **Thiếu validation đầu vào:** Xuất hiện ở HW02 (FR-03, FR-14), HW03 (GUI-025, GUI-036, GUI-037) và HW04 (FR-03-AUTO, FR-14-AUTO). Hệ thống không kiểm tra hoặc báo lỗi đúng cách khi người dùng nhập dữ liệu không hợp lệ.

2. **Thiếu confirmation dialog cho thao tác nguy hiểm (xóa):** Phát hiện độc lập ở HW03 Task 1 (GUI-028, GUI-041, GUI-055) và xác nhận lại ở HW03 Task 2 (USAB-F-002). Đây là vấn đề lặp lại ở nhiều màn hình Admin.

3. **Thiếu loading/empty/error state:** Phát hiện ở HW03 (GUI-018, GUI-019, GUI-027, GUI-053, GUI-054). Người dùng không có phản hồi trực quan khi dữ liệu đang tải hoặc khi không có dữ liệu.

4. **Thiếu feedback sau thao tác:** Phát hiện ở HW03 (GUI-026, GUI-039, GUI-040) và xác nhận lại qua usability sessions (USAB-F-004). Người dùng không biết thao tác có thành công hay không.

5. **Không nhất quán ngôn ngữ giao diện:** Phát hiện ở HW03 (GUI-001, GUI-049) — giao diện Admin dùng lẫn tiếng Anh/tiếng Việt không theo quy tắc.

6. **Thiếu semantic HTML (h1):** Xuất hiện ở nhiều màn hình Admin (GUI-002, GUI-012, GUI-022, GUI-031, GUI-050).

### 6.3 Điểm sáng — Hệ thống hoạt động tốt

- **Hiệu năng xuất sắc:** HW05 cho thấy EShop backend API có hiệu năng rất tốt — 0% error rate qua Load, Stress, Spike và Endurance với tải lên đến 200 VUs đồng thời, p95 dưới 40 ms.
- **FR-11 (Xem lịch sử đơn hàng) ổn định:** Pass 10/12 test Domain Testing ở HW02 và chỉ 2/45 lượt automation fail ở HW04.
- **CSV Import feedback:** Mặc dù có bug validation, phần CSV import được participant đánh giá là điểm có feedback tốt nhất trong usability sessions (USAB-F-008).

---

## 7. Ma trận bao phủ features

| Feature ID   | Mô tả                             | HW02 | HW03 | HW04 | HW05 |
| ------------ | --------------------------------- | :--: | :--: | :--: | :--: |
| FR-03        | Quên/Đặt lại mật khẩu (Web)      | ✅   | ⬜   | ✅   | ⬜   |
| FR-11        | Xem lịch sử đơn hàng             | ✅   | ⬜   | ✅   | ⬜   |
| FR-14        | Quản lý danh mục CRUD            | ✅   | ✅   | ✅   | ⬜   |
| FR-23        | Forgot Password (Mobile)         | ✅   | ⬜   | ⬜   | ⬜   |
| Admin Login  | Đăng nhập Admin                  | ⬜   | ✅   | ⬜   | ⬜   |
| Dashboard    | Trang tổng quan Admin            | ⬜   | ✅   | ⬜   | ⬜   |
| Product Mgmt | Quản lý sản phẩm                 | ⬜   | ✅   | ⬜   | ⬜   |
| User Mgmt    | Quản lý người dùng              | ⬜   | ✅   | ⬜   | ⬜   |
| Workflow 1   | Login→Cart→Checkout (Perf)       | ⬜   | ⬜   | ⬜   | ✅   |
| GUI chung    | Toàn bộ Admin GUI                | ⬜   | ✅   | ⬜   | ⬜   |

**Ký hiệu:** ✅ Được kiểm thử | ⬜ Chưa kiểm thử trong bài này

---

## 8. Môi trường và công cụ kiểm thử

| Bài  | Công cụ / Framework          | Trình duyệt / Platform                   | AI hỗ trợ |
| ---- | ---------------------------- | ---------------------------------------- | --------- |
| HW02 | Thủ công (Manual)            | Chrome local, Thiết bị Mobile thực      | Codex     |
| HW03 | Thủ công + BrowserStack      | Chrome local, Firefox 153, Safari 27    | Codex     |
| HW04 | Playwright Test (TypeScript) | Chromium, Firefox, WebKit (3 browser)   | Codex     |
| HW05 | Apache JMeter 5.6.3 CLI      | N/A (API performance test)              | Codex     |

---

## 9. Khuyến nghị và ưu tiên sửa chữa

### 9.1 Ưu tiên P0 — Cần sửa ngay

| Vấn đề                                                          | Liên quan đến      |
| --------------------------------------------------------------- | ------------------ |
| Bug Product Update làm sai product list (USAB-001)              | Product Management |
| UI không ngăn admin tự xóa tài khoản đang đăng nhập (GUI-056)  | User Management    |
| Lỗi nghiêm trọng trong luồng Forgot Password (FR-03, FR-23)    | FR-03, FR-23       |
| Lỗi nghiêm trọng trong Category CRUD (FR-14)                   | FR-14              |

### 9.2 Ưu tiên P1 — Cần sửa sớm

| Vấn đề                                                         | Liên quan đến      |
| -------------------------------------------------------------- | ------------------ |
| Thiếu confirmation dialog cho xóa Category, Product, User     | Admin Screens      |
| Validation đầu vào yếu (tên sản phẩm, giá, danh mục)          | Product Management |
| Thiếu hiển thị trạng thái khóa tài khoản sau 3 lần sai        | Admin Login        |
| Thiếu email validation (`type="email"`)                        | Admin Login, FR-03 |
| Các bug usability: error recovery, feedback không nhất quán    | All Admin Screens  |

### 9.3 Ưu tiên P2 — Cải thiện trong sprint tiếp theo

| Vấn đề                                            | Liên quan đến       |
| ------------------------------------------------- | ------------------- |
| Thiếu loading/empty/error state                   | Dashboard, User Mgmt |
| Responsive layout Admin ở viewport hẹp            | User Management     |
| User Management responsive trên Firefox/Safari    | Cross-Platform      |
| Không nhất quán ngôn ngữ tiếng Việt/Anh          | All Admin Screens   |
| Thiếu semantic HTML `<h1>`                        | Multiple screens    |

---

## 10. Kết luận tổng thể

Sau 4 bài tập kiểm thử bao gồm **Domain Testing, GUI Testing, Usability Evaluation, Cross-Platform Testing, Automation Testing và Performance Testing**, một số kết luận quan trọng được rút ra:

1. **Phần Backend API có hiệu năng tốt:** HW05 chứng minh EShop backend xử lý được tải lớn (đến 200 VUs, 10.000+ RPS trong Spike) với error rate = 0%. Đây là điểm mạnh đáng kể của SUT.

2. **Frontend Web Admin có nhiều vấn đề chất lượng:** HW03 phát hiện 65 checklist item với 37/65 fail (56,9%), và usability đạt SUS trung bình 60,4 — mức Marginal. Phần lớn vấn đề tập trung ở validation, feedback, và destructive action handling.

3. **Các tính năng FR-03 và FR-14 có nhiều lỗi nhất:** Xuyên suốt HW02 và HW04, FR-03 (Forgot Password) và FR-14 (Category CRUD) là hai feature có tỉ lệ fail cao và nhiều bug nhất — cần ưu tiên sửa.

4. **Automation testing giúp phát hiện thêm bug mới:** HW04 phát hiện thêm 11 bug automation cho các feature đã test ở HW02, chứng tỏ automation ở quy mô cross-browser giúp bộc lộ những lỗi không phát hiện được khi test thủ công một browser.

5. **Vấn đề lặp lại cho thấy nợ kỹ thuật hệ thống:** Các vấn đề như thiếu validation, thiếu confirmation dialog, thiếu loading/feedback state xuất hiện đồng đều trên nhiều màn hình — cho thấy đây là vấn đề thiết kế và coding standard cần được giải quyết ở cấp độ hệ thống, không phải fix từng trường hợp riêng lẻ.

---

## 11. Tài liệu liên quan

| Bài  | Tài liệu                       | Đường dẫn                                            |
| ---- | ------------------------------ | ---------------------------------------------------- |
| HW02 | README tổng hợp                | `full_hw/hw02/README.md`                             |
| HW02 | Main report                    | `full_hw/hw02/reports/main-report.md`                |
| HW02 | Bug reports                    | `full_hw/hw02/bug-reports/`                          |
| HW03 | Main report (Task 1, 2, 3)     | `full_hw/hw03/reports/main-report.md`                |
| HW03 | GUI Checklist                  | `full_hw/hw03/reports/gui-checklist.md`              |
| HW03 | Task 1 Test Summary            | `full_hw/hw03/reports/task1-test-summary.md`         |
| HW03 | Usability Report               | `full_hw/hw03/reports/usability/usability-report.md` |
| HW03 | Bug reports                    | `full_hw/hw03/bug-reports/`                          |
| HW04 | README tổng hợp                | `full_hw/hw04/reports/README.md`                     |
| HW04 | Main report                    | `full_hw/hw04/reports/main-report.md`                |
| HW04 | Bug reports automation         | `full_hw/hw04/bug-reports/automation/`               |
| HW05 | README tổng hợp                | `full_hw/hw05/reports/README.md`                     |
| HW05 | Main report                    | `full_hw/hw05/reports/main-report.md`                |
| HW05 | JMeter HTML dashboards         | `full_hw/hw05/testing-artifacts/hw05/html/`          |

---

*Báo cáo này được lập theo hướng dẫn chuẩn Test Summary Report tại [SoftwareTestingHelp](https://www.softwaretestinghelp.com/test-summary-report-template-download-sample/).*

*Phiên bản: 1.0 — Ngày lập: 2026-08-17 — Sinh viên: Ngô Hồng Thanh (23127475) — Nhóm N08*
