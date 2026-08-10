# HW04 – Automation Testing on EShop

> **Sinh viên:** Trần Minh Quang — `23127464`
>
> **Nhóm:** N08
>
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm

Repository này chứa bài HW04 Automation Testing cho ba tính năng web đã chọn từ Pool A, B và C. Bộ kiểm thử sử dụng Playwright, dữ liệu JSON tách khỏi test script, chạy trên Chromium, Firefox và Microsoft Edge, đồng thời lưu HTML report có `Run by: 23127464` và ISO timestamp.

## 1. Self-Assessment Table

| No. | Criteria                                             |   Grade | Self-Assessed Grade hiện tại |
| --: | ---------------------------------------------------- | ------: | ---------------------------: |
|   1 | Task 1 — Feature A: FR-05 Product Listing and Search |      25 |                           25 |
|   2 | Task 1 — Feature B: FR-08 Checkout                   |      25 |                           25 |
|   3 | Task 1 — Feature C: FR-12 Access Control             |      25 |                           25 |
|   4 | Task 2 — Demo video                                  |      15 |                           15 |
|   5 | Agent Skill                                          |      10 |                           10 |
|     | **Total hiện tại**                                   | **100** |                      **100** |

## 2. Automation Test Summary

### 2.1. Feature selection

| Pool | Feature                              | Phạm vi automation                                                            | Playwright implementation                                         |
| ---- | ------------------------------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| A    | `FR-05` — Product Listing and Search | UI-first: search, result state, product card, loading, semantics và format    | `tests/fr05-search.spec.ts`                                       |
| B    | `FR-08` — Checkout                   | 15 API cases và 6 UI cases cho route, summary, checkout và cart postcondition | `tests/FR-08-checkout.spec.ts`, `tests/FR-08-checkout-ui.spec.ts` |
| C    | `FR-12` — Access Control             | Hybrid Web Admin UI + API enforcement cho các trạng thái token/role           | `tests/fr12-access.spec.ts`                                       |

### 2.2. Kết quả chạy thật

| Feature  | Designed | Automated | Executed | Passed |  Failed | Skipped | Browser runs | SUT defect root causes |
| -------- | -------: | --------: | -------: | -----: | ------: | ------: | -----------: | ---------------------: |
| `FR-05`  |       12 |        12 |       36 |     12 |      24 |       0 |            3 |                      6 |
| `FR-08`  |       24 |        21 |       63 |     12 |      51 |       0 |            3 |                      8 |
| `FR-12`  |       40 |        40 |      120 |     69 |      51 |       0 |            3 |                      4 |
| **Tổng** |   **76** |    **73** |  **219** | **93** | **126** |   **0** |        **9** |                 **18** |

`Executed`, `Passed`, `Failed` và `Skipped` là số lượt case–project trong ba Playwright HTML report. Các failure cuối đã được rà soát và phân loại là lỗi SUT; chúng không được làm xanh bằng cách hạ expected. FR-08 có ba case HW02 trùng được gộp vào case đại diện, vì vậy 24 case designed tương ứng 21 điểm automation độc lập.

### 2.3. Kết quả theo trình duyệt

| Feature | Chromium     | Firefox      | Microsoft Edge | HTML report                                                             |
| ------- | ------------ | ------------ | -------------- | ----------------------------------------------------------------------- |
| `FR-05` | `4P/8F/0S`   | `4P/8F/0S`   | `4P/8F/0S`     | [Mở report](playwrite-test/fr05-search/playwright-report/index.html)    |
| `FR-08` | `4P/17F/0S`  | `4P/17F/0S`  | `4P/17F/0S`    | [Mở report](playwrite-test/FR-08-checkout/playwright-report/index.html) |
| `FR-12` | `23P/17F/0S` | `23P/17F/0S` | `23P/17F/0S`   | [Mở report](playwrite-test/fr12-access/playwright-report/index.html)    |

Chú thích: `P = passed`, `F = failed`, `S = skipped`.

### 2.4. Data-driven và assertion coverage

| Feature | Fixture ngoài spec                                                                 | Nhóm assertion chính                                                                                           |
| ------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `FR-05` | `data/fr05-search.json` — 12 records                                               | DOM/visible text, state/attribute, count/aggregate, network synchronization, layout/computed DOM               |
| `FR-08` | `data/FR-08-checkout.json` — 15 records; `data/FR-08-checkout-ui.json` — 6 records | API response, order/cart count, URL/DOM/attribute, UI-triggered network response, backend/client postcondition |
| `FR-12` | `data/fr12-access.json` — 40 records                                               | UI access/visibility, direct response/body, count/aggregate, object property                                   |

### 2.5. Bug summary

| Feature  | Root causes | GitHub Issues                                                                                                                                                                                                               | Screenshot Issue                        |
| -------- | ----------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `FR-05`  |           6 | [#220](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/220)–[#225](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/225)                                                                           | `bug-reports/screenshots_issues/FR-05/` |
| `FR-08`  |           8 | [#226](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/226)–[#233](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/233)                                                                           | `bug-reports/screenshots_issues/FR-08/` |
| `FR-12`  |           4 | [#234](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/234)–[#236](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/236), [#238](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/238) | `bug-reports/screenshots_issues/FR-12/` |
| **Tổng** |      **18** | **18 Issues**                                                                                                                                                                                                               | **18 screenshots**                      |

## 3. Chạy automation

### 3.1. Chuẩn bị

- Node.js và dependencies đã được cài bằng `npm install`.
- Backend chạy tại `http://localhost:3000`.
- Frontend Web chạy tại `http://localhost:5173`.
- Frontend Admin chạy tại `http://localhost:5174`.
- Microsoft Edge phải có trên máy để dùng Playwright channel `msedge`.

### 3.2. Lệnh chạy

```powershell
npm run lint
npm run typecheck
npm run test:fr05:phase-d
npm run test:fr08
npm run redact:fr08:traces
npm run test:fr12:phase-d
```

FR-08 cần chạy bước redaction sau mỗi rerun vì trace UI có thể giữ JWT hoặc credential runtime. Exit code của suite có thể là `1` khi assertion phát hiện đúng lỗi SUT; phải đọc thống kê và failure classification thay vì coi mọi exit code khác `0` là lỗi harness.

## 4. Human Review và AI Refinement

Các test script được AI hỗ trợ sinh theo từng checkpoint và được human review trước khi dùng làm kết quả cuối. Những refinement chính gồm:

- bỏ serial fail-fast để mọi case đều được thực thi;
- tách dữ liệu/expected sang JSON và thêm runtime fixture validation;
- sửa locator, timeout và synchronization để tránh flaky test;
- dùng UI làm oracle chính khi HTTP cache có thể trả `304`;
- bổ sung UI browser-page coverage cho FR-08 thay vì gọi API lặp lại trên ba project;
- cô lập runtime user/cart và giữ SPA state để tránh pass giả;
- bổ sung Web Admin page gate cho toàn bộ FR-12, giữ API assertion để kiểm tra enforcement sâu;
- xử lý Firefox sandbox theo từng config sau probe tối thiểu;
- kiểm tra trực tiếp HTML report để xác nhận Student ID, timestamp và attachment;
- redaction trace FR-08 trước khi public artifact.

Chi tiết nằm trong:

- [FR-05 Review Notes](playwrite-test/fr05-search/REVIEW_NOTES.md)
- [FR-08 Review Notes](playwrite-test/FR-08-checkout/REVIEW_NOTES.md)
- [FR-12 Review Notes](playwrite-test/fr12-access/REVIEW_NOTES.md)
- [Main Report](reports/main-report.md)

## 5. Agent Skill và Demo

Agent Skill tái sử dụng workflow automation nằm tại [ai-first-playwright-testing/SKILL.md](ai-first-playwright-testing/SKILL.md).

- Agent Skill demo: [YouTube](https://youtu.be/qVDBxyQzNwg)

## 6. Project Structure

```text
CS423-CSC15003-Testing-N08/
├── README.md
├── package.json
├── playwright.config.ts
├── playwright.fr05.config.ts
├── playwright.fr12.config.ts
├── data/
│   ├── fr05-search.json
│   ├── FR-08-checkout.json
│   ├── FR-08-checkout-ui.json
│   └── fr12-access.json
├── tests/
│   ├── fr05-search.spec.ts
│   ├── FR-08-checkout.spec.ts
│   ├── FR-08-checkout-ui.spec.ts
│   └── fr12-access.spec.ts
├── playwrite-test/
│   ├── fr05-search/
│   ├── FR-08-checkout/
│   └── fr12-access/
├── bug-reports/
│   ├── FR-05/
│   ├── FR-08/
│   ├── FR-12/
│   └── screenshots_issues/
├── ai-gap-analysis/
├── ai-first-playwright-testing/
├── reports/
└── git-log.txt
```

## 7. Submission Documents

- [Main report](reports/main-report.md)
- [Automation summary](reports/test-summary.md)
- [AI Critique](reports/ai-critique.md)
- [AI Audit Report](reports/ai-audit-report.md)
- [Git commit log](git-log.txt)
- Public repository: [lmchkhi/CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-Automation-Testing)
