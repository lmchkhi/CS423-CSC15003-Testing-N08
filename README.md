# HW03 – GUI & Usability Testing on EShop

> **Sinh viên:** Trần Minh Quang - 23127464
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm

---

## 1. Self-Assessment Table

| No. | Criteria                                                              |   Grade | Self-Assessed Grade |
| --: | --------------------------------------------------------------------- | ------: | ------------------- |
|   1 | Task 1 — GUI Checklist (design + execution + bug report)              |      30 | 30                  |
|   2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) |      40 | 40                  |
|   3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms)               |      20 | 20                  |
|   4 | Agent Skills                                                          |      10 | 10                  |
|     | **Total**                                                             | **100** | 100                 |

---

## 2. Test Summary Report

### 2.1. Phạm vi kiểm thử

Đã kiểm thử 5 màn hình GUI: **Cart, Checkout, Coupon section, Checkout Success** và **Admin Coupon Management**; cùng 1 flow usability end-to-end: thêm sản phẩm vào giỏ → xem lại giỏ → xóa/cập nhật sản phẩm → checkout → áp dụng coupon hợp lệ/không hợp lệ → xác nhận thanh toán.

### 2.2. GUI checklist theo platform

| Platform                           | Thiết kế | Thực thi | Passed | Failed | Blocked |
| ---------------------------------- | -------: | -------: | -----: | -----: | ------: |
| Chrome / Windows — baseline Task 1 |       51 |       51 |     32 |     16 |       3 |
| Firefox / Windows                  |       51 |       51 |     32 |     16 |       3 |
| Safari / macOS                     |       51 |       51 |     32 |     13 |       6 |

Safari chuyển GUI-38, GUI-43 và GUI-44 từ `FAILED` sang `BLOCKED`: Safari không hỗ trợ network throttling trong công cụ đã dùng để mô phỏng lỗi mạng/chậm mạng. Đây là giới hạn môi trường kiểm thử, không phải khác biệt hành vi đã xác nhận của SUT.

### 2.3. Bug summary

Tổng cộng đã báo cáo **20 bug riêng biệt** trên GitHub Issues. Trong đó, 16 bug gắn với các item `FAILED` có evidence tại Chrome/Windows (baseline); 4 bug bổ sung là GUI-13, GUI-14, GUI-16 và GUI-48. Các bug có thể cùng screen, topic hoặc dùng chung ảnh evidence nhưng khác nội dung kiểm tra, expected/actual result hoặc phạm vi tác động nên được tính riêng. Các lần tái hiện cùng bug ở Firefox/Safari không được đếm thành bug mới.

| ID     | Severity      | Mô tả ngắn                                                                                |
| ------ | ------------- | ----------------------------------------------------------------------------------------- |
| GUI-07 | Critical / P0 | Coupon `SAVE10` làm tổng tiền tăng thay vì giảm.                                          |
| GUI-13 | Minor / P2    | Cart không có điều khiển tăng/giảm số lượng sản phẩm.                                     |
| GUI-14 | Minor / P2    | Không thể thao tác và kiểm tra focus bàn phím của điều khiển số lượng trong Cart.         |
| GUI-15 | Minor / P2    | Checkout không hiển thị dấu hiệu cho trường bắt buộc.                                     |
| GUI-16 | Minor / P2    | Checkout thiếu trường bắt buộc để kiểm tra hành vi submit khi bỏ trống.                   |
| GUI-17 | Major / P1    | Tổng tiền thanh toán là input có thể chỉnh sửa trực tiếp.                                 |
| GUI-23 | Minor / P2    | Form tạo coupon thiếu nhãn văn bản và dấu bắt buộc cho các trường.                        |
| GUI-26 | Trivial / P3  | Cart không có chỉ báo vị trí hiện tại trước khi chuyển Checkout.                          |
| GUI-27 | Trivial / P3  | Luồng Cart → Checkout thiếu breadcrumb/step indicator.                                    |
| GUI-33 | Trivial / P3  | Back ở Admin Coupon Management rời về trang chủ trình duyệt thay vì tab trước.            |
| GUI-34 | Minor / P2    | Các luồng xem/tạo/sửa/xóa coupon bị gộp trên một màn hình.                                |
| GUI-36 | Major / P1    | Xóa sản phẩm diễn ra ngay, không có xác nhận.                                             |
| GUI-38 | Major / P1    | Lỗi mạng khi submit khiến nút thanh toán kẹt ở trạng thái xử lý và không rõ cách thử lại. |
| GUI-43 | Trivial / P3  | Không có trạng thái khôi phục rõ cho lỗi tải chi tiết Checkout Success.                   |
| GUI-44 | Minor / P2    | Danh sách coupon trống khi tải chậm nhưng không có loading indicator.                     |
| GUI-46 | Major / P1    | Xóa coupon `SAVE10` không có xác nhận.                                                    |
| GUI-48 | Minor / P2    | Thứ tự Tab giữa form và danh sách coupon không hợp lý.                                    |
| GUI-49 | Critical / P0 | Nhãn “Giảm 10%” không khớp kết quả: tổng tiền tăng từ 103.000.000 ₫ lên 1.030.000.000 ₫.  |
| GUI-50 | Trivial / P3  | Refresh trong lúc nhập Checkout hiển thị `404: NOT_FOUND`.                                |
| GUI-51 | Major / P1    | Thêm lại sản phẩm tạo dòng trùng thay vì cộng dồn số lượng.                               |

Evidence và 20 bug report tương ứng nằm trong `evidence/hw03/<platform>/`, `bug-reports/hw03-gui/` và `bug-reports/screenshots_issues/`.

### 2.4. Usability evaluation — SUS

| Participant | SUS score |
| ----------- | --------: |
| P01         |        95 |
| P02         |        90 |
| P03         |      67.5 |
| P04         |      92.5 |
| P05         |        75 |
| P06         |      92.5 |
| P07         |        45 |
| **Mean**    | **79.64** |
| **Median**  |    **90** |

Mẫu có `n = 7`; cả 7 participant hoàn thành flow có can thiệp. README chỉ dùng mã ẩn danh P01–P07, không công bố thông tin liên hệ cá nhân.

### 2.5. Demo videos

| Video                 | Link                                                                     |
| --------------------- | ------------------------------------------------------------------------ |
| Agent Skill demo      | [Demo using agent in GUI Testing](https://youtu.be/20f_YV-PS4A)          |
| Usability session P01 | [Video P01](https://youtu.be/yNWfs-Z4MqY)                                 |
| Usability session P02 | [Video P02](https://youtu.be/3PnK0Gon4dE)                                 |
| Usability session P03 | [Video P03](https://youtu.be/j-RkKLtdni0)                                 |
| Usability session P04 | [Video P04](https://youtu.be/eshhExP4SNo)                                 |
| Usability session P05 | [Video P05](https://youtu.be/fWkFW9seKGc)                                 |
| Usability session P06 | [Video P06](https://youtu.be/fHVS8BKAV-I)                                 |
| Usability session P07 | [Video P07](https://youtu.be/HOA_h8H6R0I)                                 |

---

## 3. Project Structure

```text
CS423-CSC15003-Testing-N08/
├── README.md
├── git-log.txt                         # Lịch sử commit hiện có trong repository
├── reports/
│   ├── hw03-gui-checklist.md           # Checklist GUI 51 item (IA-01 → IA-04)
│   ├── cross-browser-report.md         # Kết quả Chrome, Firefox và Safari
│   ├── usability-test-plan.md          # Kịch bản, quan sát và phân tích usability
│   ├── main-report.md                  # Báo cáo HW03 chính
│   ├── test-summary.md                 # Tổng hợp checklist, bugs và SUS
│   ├── ai-audit-report.md              # AI audit report
│   └── ai-critique.md                  # AI critique
├── sessions/
│   ├── session-P01.md
│   ├── session-P02.md
│   ├── session-P03.md
│   ├── session-P04.md
│   ├── session-P05.md
│   ├── session-P06.md
│   └── session-P07.md                  # Phiên usability đã ẩn danh
├── bug-reports/
│   ├── hw03-gui/                       # Bug reports theo ID GUI-xx
│   └── screenshots_issues/             # Ảnh issue
├── evidence/
│   └── hw03/
│       ├── Chrome/                     # Evidence Chrome / Windows
│       ├── Firefox/                    # Evidence Firefox / Windows
│       └── Safari/                     # Evidence Safari / macOS
└── eshop-gui-usability-audit/
    └── references/                     # Template/hướng dẫn agent skill
```

---

## 4. Công cụ & Kỹ thuật

| Hạng mục              | Chi tiết                                                                         |
| --------------------- | -------------------------------------------------------------------------------- |
| **Kỹ thuật kiểm thử** | GUI Checklist (IA-01 → IA-04), Usability Evaluation (SUS), Cross-Browser Testing |
| **Công cụ AI**        | Claude (agent skill `eshop-gui-usability-audit`)                                 |
| **Công cụ test**      | BrowserStack (Firefox, Safari), Chrome DevTools, thao tác tay                    |
| **Môi trường**        | Backend `localhost:3000`, Web `localhost:5173`, Admin `localhost:5174`           |

---

## 5. Ghi chú

- Platform 1 (Chrome/Windows) là lần chạy gốc của Task 1 và là baseline để thống kê 16 item `FAILED` có evidence.
- Safari/macOS không hỗ trợ network throttling trong công cụ kiểm thử đã dùng; vì vậy GUI-38, GUI-43 và GUI-44 được ghi nhận `BLOCKED` thay vì suy diễn kết quả.
- Coupon `SAVE10` có lỗi tính toán đã được xác nhận bởi GUI checklist; P02, P05 và P07 tự phát hiện, còn P06 nhận thấy điểm bất thường nhưng chưa nêu đủ cụ thể để xác nhận cùng lỗi.
- Vấn đề discoverability của coupon xuất hiện ở 7/7 participant: người dùng không tìm được mã hợp lệ trên UI và phải đoán hoặc hỏi facilitator.
