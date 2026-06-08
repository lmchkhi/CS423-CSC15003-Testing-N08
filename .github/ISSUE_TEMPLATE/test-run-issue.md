---
name: 🏃 Test Run Report
about: Báo cáo đợt chạy kiểm thử
title: '[TEST RUN] Sprint X - Module Y'
labels: 'type: test-run'
assignees: ''
---

## Thông tin đợt kiểm thử

| Thông tin              | Chi tiết              |
| ---------------------- | --------------------- |
| **Sprint / Đợt**      | Sprint X              |
| **Ngày thực hiện**     | YYYY-MM-DD            |
| **Tester**             | @username             |
| **Môi trường**         | Staging / Production  |
| **Build / Version**    | v0.0.0 / commit hash  |

---

## Bảng kết quả kiểm thử

| TC ID        | Module     | Result                          | Related Bug | Note |
| ------------ | ---------- | ------------------------------- | ----------- | ---- |
| `TC-XXX-001` | Module A   | ✅ Passed / ❌ Failed / ⛔ Blocked | #issue-id   |      |
| `TC-XXX-002` | Module A   | ✅ Passed / ❌ Failed / ⛔ Blocked | #issue-id   |      |
| `TC-XXX-003` | Module B   | ✅ Passed / ❌ Failed / ⛔ Blocked | #issue-id   |      |
| `TC-XXX-004` | Module B   | ✅ Passed / ❌ Failed / ⛔ Blocked | #issue-id   |      |
| `TC-XXX-005` | Module C   | ✅ Passed / ❌ Failed / ⛔ Blocked | #issue-id   |      |

---

## Tóm tắt kết quả

| Chỉ số          | Số lượng | Tỷ lệ  |
| ---------------- | -------- | ------- |
| **Total**        | 0        | 100%    |
| ✅ **Passed**    | 0        | 0%      |
| ❌ **Failed**    | 0        | 0%      |
| ⛔ **Blocked**   | 0        | 0%      |

---

## Danh sách Bug phát sinh

<!-- Liệt kê các bug mới được tìm thấy trong đợt chạy này -->

| # | Bug Issue  | Severity | Module   | Mô tả ngắn       |
| - | ---------- | -------- | -------- | ----------------- |
| 1 | #issue-id  | Critical | Module A | Mô tả lỗi...     |
| 2 | #issue-id  | Major    | Module B | Mô tả lỗi...     |

---

## Nhận xét & Đề xuất

<!-- Tester ghi nhận xét tổng quan về chất lượng module và đề xuất hành động tiếp theo -->

> ...

---

## Checklist hoàn thành đợt kiểm thử

- [ ] Tất cả test case đã được thực thi
- [ ] Các bug đã được tạo Issue riêng với label phù hợp
- [ ] Kết quả đã được cập nhật lên Test Management
- [ ] Báo cáo đã được review bởi QA Lead
