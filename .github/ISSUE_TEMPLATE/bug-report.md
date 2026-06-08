---
name: 🐞 Bug Report
about: Báo cáo lỗi phát hiện từ kiểm thử
title: '[BUG][Module] Mô tả ngắn'
labels: 'type: bug'
assignees: ''
---

## Môi trường kiểm thử

| Thông tin       | Chi tiết             |
| --------------- | -------------------- |
| **OS**          | Windows 11 / macOS / Ubuntu |
| **Browser**     | Chrome / Firefox / Edge / Safari — phiên bản |
| **Backend URL** | `http://localhost:xxxx` |
| **Frontend URL**| `http://localhost:xxxx` |

---

## Found by Test Case

> **TC-ID:** `TC-XXX-000`

---

## Mức độ nghiêm trọng (Severity)

<!-- Chọn một trong các mức sau, xoá các dòng không phù hợp -->

- [ ] 🔴 **Critical** — Hệ thống sập, mất dữ liệu, không thể sử dụng chức năng chính
- [ ] 🟠 **Major** — Chức năng chính hoạt động sai, không có cách xử lý thay thế
- [ ] 🟡 **Minor** — Chức năng phụ bị lỗi hoặc có cách xử lý thay thế
- [ ] ⚪ **Trivial** — Lỗi giao diện nhỏ, chính tả, không ảnh hưởng chức năng

## Độ ưu tiên (Priority)

<!-- Chọn một trong các mức sau, xoá các dòng không phù hợp -->

- [ ] 🔺 **High** — Cần sửa ngay trong sprint hiện tại
- [ ] 🔸 **Medium** — Cần sửa trước khi release
- [ ] 🔻 **Low** — Có thể hoãn sang sprint sau

---

## Các bước tái hiện (Steps to Reproduce)

1. Truy cập trang `...`
2. Đăng nhập với tài khoản `...`
3. Nhấn vào nút `...`
4. Quan sát kết quả

---

## Kết quả mong đợi (Expected Result)

<!-- Mô tả rõ ràng hành vi đúng mà hệ thống cần thực hiện -->

> ...

---

## Kết quả thực tế (Actual Result)

<!-- Mô tả rõ ràng hành vi sai mà bạn quan sát được -->

> ...

---

## Bằng chứng (Evidence)

<!-- Đính kèm ảnh chụp màn hình, video quay lại, hoặc log lỗi -->

<details>
<summary>📸 Screenshots / 🎥 Video</summary>

<!-- Kéo thả ảnh/video vào đây -->

</details>

<details>
<summary>📋 Console / Network Logs</summary>

```
Dán log lỗi tại đây
```

</details>

---

## Ghi chú thêm

<!-- Thêm bất kỳ thông tin bổ sung nào giúp developer hiểu và tái hiện lỗi -->

> ...

---

## Checklist đóng bug

> ⚠️ **Bug chỉ được đóng khi tất cả các điều kiện sau được đáp ứng:**

- [ ] PR chứa code sửa lỗi đã Merge
- [ ] Kết quả Retest: **Pass**
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (Regression)
