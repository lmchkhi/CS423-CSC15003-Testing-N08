# 🏷️ Cấu hình GitHub Labels — Dự án EShop

> Tài liệu này liệt kê toàn bộ label được khuyến nghị sử dụng trên GitHub Issues
> để phân loại, theo dõi và báo cáo hoạt động kiểm thử.

---

## 1. Nhóm `type:` — Phân loại Issue

| Label               | Color     | Mô tả                                              |
| -------------------- | --------- | --------------------------------------------------- |
| `type: bug`          | `#d73a4a` | Báo cáo lỗi phát hiện từ kiểm thử                  |
| `type: test-run`     | `#0075ca` | Báo cáo đợt chạy kiểm thử (Test Run Report)        |
| `type: task`         | `#6f42c1` | Công việc cần thực hiện (viết TC, chuẩn bị data...) |
| `type: enhancement`  | `#a2eeef` | Đề xuất cải tiến quy trình hoặc công cụ kiểm thử   |

---

## 2. Nhóm `module:` — Phân loại theo Module chức năng

| Label               | Color     | Mô tả                                    |
| -------------------- | --------- | ----------------------------------------- |
| `module: home`       | `#c5def5` | Trang chủ và hiển thị sản phẩm nổi bật   |
| `module: auth`       | `#c5def5` | Đăng ký, đăng nhập, quên mật khẩu        |
| `module: cart`       | `#c5def5` | Giỏ hàng — thêm, xoá, cập nhật số lượng |
| `module: checkout`   | `#c5def5` | Thanh toán, nhập địa chỉ, xác nhận đơn   |
| `module: profile`    | `#c5def5` | Hồ sơ người dùng, lịch sử đơn hàng       |
| `module: admin`      | `#c5def5` | Quản trị: sản phẩm, đơn hàng, người dùng |

---

## 3. Nhóm `technique:` — Kỹ thuật kiểm thử áp dụng

| Label                   | Color     | Mô tả                                              |
| ------------------------ | --------- | --------------------------------------------------- |
| `technique: functional`  | `#bfd4f2` | Kiểm thử chức năng (happy path, negative)           |
| `technique: security`    | `#bfd4f2` | Kiểm thử bảo mật (XSS, SQL Injection, CSRF...)     |
| `technique: ui`          | `#bfd4f2` | Kiểm thử giao diện, responsive, UX                 |
| `technique: boundary`    | `#bfd4f2` | Kiểm thử giá trị biên và phân vùng tương đương     |

---

## 4. Nhóm `result:` — Kết quả thực thi Test Case

| Label              | Color     | Mô tả                                              |
| ------------------- | --------- | --------------------------------------------------- |
| `result: passed`    | `#0e8a16` | Test case thực thi thành công — kết quả đúng mong đợi |
| `result: failed`    | `#d93f0b` | Test case thất bại — phát hiện lỗi                  |
| `result: blocked`   | `#ffc107` | Test case không thể thực thi do phụ thuộc bị chặn   |

---

## 5. Nhóm `severity:` — Mức độ nghiêm trọng của Bug

| Label                | Color     | Mô tả                                                    |
| --------------------- | --------- | --------------------------------------------------------- |
| `severity: critical`  | `#b60205` | Hệ thống sập, mất dữ liệu, chức năng chính không hoạt động |
| `severity: major`     | `#d93f0b` | Chức năng chính hoạt động sai, không có workaround        |
| `severity: minor`     | `#fbca04` | Chức năng phụ bị lỗi hoặc có workaround khả dụng         |
| `severity: trivial`   | `#e4e669` | Lỗi thẩm mỹ, chính tả, không ảnh hưởng chức năng        |

---

## 6. Nhóm `priority:` — Độ ưu tiên xử lý

| Label              | Color     | Mô tả                                          |
| ------------------- | --------- | ----------------------------------------------- |
| `priority: high`    | `#b60205` | Cần sửa ngay trong sprint hiện tại              |
| `priority: medium`  | `#fbca04` | Cần sửa trước khi release                       |
| `priority: low`     | `#0e8a16` | Có thể hoãn lại, xử lý khi có thời gian        |

---

## 7. Nhóm `status:` — Trạng thái xử lý

| Label              | Color     | Mô tả                                                  |
| ------------------- | --------- | ------------------------------------------------------- |
| `status: not-run`   | `#cfd3d7` | Test case chưa được thực thi                            |
| `status: running`   | `#0075ca` | Đang trong quá trình thực thi kiểm thử                 |
| `status: retest`    | `#d876e3` | Bug đã được sửa, cần kiểm thử lại để xác nhận          |
| `status: closed`    | `#333333` | Issue đã hoàn tất, bug đã verify hoặc TC đã pass        |

---

## Hướng dẫn sử dụng

> [!TIP]
> Mỗi Issue nên được gán **ít nhất 3 label**: `type`, `module`, và `severity`/`priority` (nếu là bug)
> hoặc `type` + `module` + `status` (nếu là test run).

### Ví dụ gán label cho Bug Issue

```
type: bug, module: cart, severity: major, priority: high, technique: functional
```

### Ví dụ gán label cho Test Run Issue

```
type: test-run, module: auth, status: running
```
