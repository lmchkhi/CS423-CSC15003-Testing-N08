# HW06 – Báo cáo CI/CD Pipeline

**Sinh viên:** Hà Bảo Ngọc — 23127300, nhóm N08
**Nhánh:** `HW06/23127300`
**Repo:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08
**Ngày:** 2026-08-21

---

## 1. Mô tả Pipeline

File cấu hình: `.github/workflows/hw06-newman.yml`

Job `api-tests` (runner `ubuntu-latest`), trigger: `push` lên `HW06/23127300` và `workflow_dispatch`.

| Bước | Mô tả |
|------|-------|
| `actions/checkout@v4` | Checkout nhánh `HW06/23127300` |
| `actions/setup-node@v4` (Node 20) | Cài Node.js |
| Clone & start SUT | `git clone https://github.com/ttbhanh/eshop-sut.git`, `npm install`, `node server.js &`, chờ `localhost:3000` sẵn sàng (≤30s) |
| Install Newman | `npm install -g newman newman-reporter-htmlextra` |
| Run API suite (per folder) | Chạy lần lượt 5 folder; folder data-driven kèm `-d`, folder state/lifecycle chạy một lần. `set -e` ⇒ bất kỳ folder nào fail sẽ fail cả job |
| Upload artifacts | Upload thư mục `newman-reports/` (5 file htmlextra) — `if: always()` |

Các lệnh Newman trong bước chạy suite:

```bash
run "FR-01 Register"            fr01-register     api/data/register-cases.json
run "FR-08 Checkout"            fr08-checkout     api/data/checkout-cases.json
run "FR-08 State & Security"    fr08-state
run "FR-14 Category CRUD"       fr14-category     api/data/fr14-post-categories.csv
run "FR-14 Lifecycle & Access"  fr14-lifecycle
```

> **Vì sao tách folder:** một folder chạy với `-d` sẽ lặp **toàn bộ** request trong folder theo từng dòng dữ liệu. Đặt request lifecycle/state chung folder data-driven khiến chúng chạy lặp và đè state → suite đỏ giả. Tách data-driven (chạy với `-d`) khỏi state/lifecycle (chạy một lần, tự đăng ký user riêng) làm suite xanh ổn định: **213 request / 233 assertion / 0 fail**.

---

## 2. Lần chạy PASS (Passing Run)

**Commit SHA:** `f51ffff`
**Commit message:** `fix(hw06): green Newman suite, CI per-folder, FR-14 issues, corrected counts`
**Run:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32495791347
**Kết luận:** ✅ **success** — cả 5 folder qua, 233/233 assertion pass. Assertion known-bug kiểm hành vi quan sát (gắn nhãn `[BUG-*]`) nên đều pass; lỗi được ghi riêng ở bug reports + GitHub Issues.

---

## 3. Lần chạy FAIL (Failing Run)

**Commit SHA:** `e647064`
**Commit message:** `ci(hw06): demo failing assertion to show pipeline catches failures`
**Run:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32495915226
**Kết luận:** ❌ **failure** (có chủ đích).

**Thay đổi:** thêm folder `DEMO Failing (intentional)` gồm một request `GET /api/products` với assertion sai cố ý:

```javascript
pm.test('DEMO-FAIL: /api/products returns 500',
  () => pm.expect(pm.response.code).to.eql(500));
```

`GET /api/products` trả `200 OK` ⇒ assertion sai ⇒ Newman exit code ≠ 0 ⇒ `set -e` dừng job ⇒ GitHub Actions đánh dấu job **Failed**. Chứng minh pipeline thực sự bắt được lỗi.

---

## 4. Khôi phục PASS

**Commit SHA:** `48f25bd`
**Commit message:** `Revert "ci(hw06): demo failing assertion to show pipeline catches failures"`
**Run:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32495999390
**Kết luận:** ✅ **success** — gỡ folder demo ⇒ pipeline xanh trở lại.

---

## 5. Tóm tắt 3 lần chạy

| Run | Commit | Kết quả | Run ID |
|-----|--------|---------|--------|
| 1 | `f51ffff` | ✅ Pass | [32495791347](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32495791347) |
| 2 | `e647064` | ❌ Fail (chủ đích) | [32495915226](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32495915226) |
| 3 | `48f25bd` | ✅ Pass | [32495999390](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32495999390) |

Ảnh chụp: `reports/ci-run-pass.png`, `reports/ci-run-fail.png`.

---

## 6. Artifacts

- Thư mục `newman-reports/` (5 file htmlextra) upload tự động mỗi lần chạy — tab **Artifacts** trong Actions run.
- File workflow: `.github/workflows/hw06-newman.yml`.
