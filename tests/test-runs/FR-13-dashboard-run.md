# Test Run: FR-13 — Dashboard

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-13: Dashboard |
| **Ngày thực thi** | 30/06/2026 |
| **Môi trường** | Browser: Chrome Version 149.0.7827.103 · OS: macOS Tahoe 26.5.1 · Backend: http://localhost:3000 · Frontend Admin: http://localhost:5174/ · Frontend Web: http://localhost:5173/ |
| **Build / Commit** | `0b0d2e9` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR13-DT-001 | Hiển thị Dashboard khi chưa có đơn hàng | 23127300 | Passed | None | Actual Result: giống với Expected Result. |
| TC-FR13-DT-002 | Tính doanh thu với một đơn hàng delivered | 23127300 | Failed | BUG-FR13-001 | Expected: tổng doanh thu `120000`, tổng số đơn hàng `1`. Actual Result: doanh thu hiển thị `60,000,000 đ`. Evidence: `bug-reports/screenshots/BUG-FR13-001-evidence-01-tc002-dashboard.png`, `bug-reports/screenshots/BUG-FR13-001-evidence-02-tc002-orders.png`. |
| TC-FR13-DT-003 | Cộng dồn doanh thu của nhiều đơn hàng delivered | 23127300 | Failed | BUG-FR13-001 | Expected: tổng doanh thu `200000`, tổng số đơn hàng `2`. Actual Result: doanh thu hiển thị `72,000,000 đ`. Evidence: `bug-reports/screenshots/BUG-FR13-001-evidence-03-tc003-dashboard.png`, `bug-reports/screenshots/BUG-FR13-001-evidence-04-tc003-orders.png`. |
| TC-FR13-DT-004 | Chỉ tính doanh thu của đơn delivered khi dữ liệu có nhiều trạng thái | 23127300 | Failed | BUG-FR13-001 | Expected: tổng doanh thu `120000`, tổng số đơn hàng `5`. Actual Result: doanh thu hiển thị `90,000,000 đ`. Evidence: `bug-reports/screenshots/BUG-FR13-001-evidence-05-tc004-dashboard.png`, `bug-reports/screenshots/BUG-FR13-001-evidence-06-tc004-orders.png`. |
| TC-FR13-DT-005 | Hiển thị doanh thu bằng 0 khi không có đơn delivered | 23127300 | Passed | None | Actual Result: giống với Expected Result. |
| TC-FR13-DT-006 | Từ chối hiển thị Dashboard cho người dùng không có quyền Admin | 23127300 | Passed | None | Actual Result: giống với Expected Result. |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| Không áp dụng | Không tạo test case BVA cho FR-13 |  | N/A | None | Theo `analysis/FR-13-dashboard/bva-analysis.md`, FR-13 không có boundary được đặc tả. |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---:|
| Passed | 3 |
| Failed | 3 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **6** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** → phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**. Các test case Failed đã được liên kết đến bug report `BUG-FR13-001`.
