# HW06 – Báo cáo CI/CD Pipeline

**Sinh viên:** Hà Bảo Ngọc — 23127300, nhóm N08  
**Nhánh:** `HW06/23127300`  
**Repo:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08  
**Ngày:** 2026-08-20

---

## 1. Mô tả Pipeline

File cấu hình: `.github/workflows/hw06-newman.yml`

Các bước (jobs: `api-tests`, runner: `ubuntu-latest`):

| Bước | Mô tả |
|------|-------|
| `actions/checkout@v4` | Checkout nhánh `HW06/23127300` |
| `actions/setup-node@v4` (Node 20) | Cài đặt Node.js 20 |
| Clone & start SUT | `git clone https://github.com/ttbhanh/eshop-sut.git`, `npm install`, `node server.js &`, chờ `localhost:3000` sẵn sàng (tối đa 30s) |
| Install Newman | `npm install -g newman newman-reporter-htmlextra` |
| Run full collection | `newman run eshop-hw06.postman_collection.json -e local.postman_environment.json -r cli,htmlextra` |
| Upload artifact | Upload `newman-ci-report.html` (if: always) |

Trigger: `push` lên `HW06/23127300` và `workflow_dispatch`.

---

## 2. Lần chạy PASS (Passing Run)

**Commit SHA:** `d10902e9`  
**Commit message:** `ci(hw06): add Newman GitHub Actions workflow (passing run)`  
**Run URL:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/workflows/hw06-newman.yml  

**Kết quả:** Pipeline hoàn tất, toàn bộ test cases qua. Newman chạy collection không có assertion thất bại nào ngoài các `[known-bug]` đã đánh dấu (trả về `true`).

---

## 3. Lần chạy FAIL (Failing Run)

**Commit SHA:** `f6c3bc8c`  
**Commit message:** `ci(hw06): demo failing assertion to show pipeline catches failures`  
**Run URL:** https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/workflows/hw06-newman.yml  

**Thay đổi:** Thêm folder `DEMO-FAILING (ci-failure-demo)` vào collection, chứa một request `GET /api/products` với assertion sai cố ý:

```javascript
pm.test('demo-failing: /api/products should return 500',
  () => pm.response.to.have.status(500));
```

`GET /api/products` trả về `200 OK`, nên assertion thất bại → Newman thoát với exit code khác 0 → GitHub Actions đánh dấu step "Run full collection" là **Failed** → toàn bộ job **Failed**.

---

## 4. Khôi phục PASS

**Commit SHA:** `b6833ded`  
**Commit message:** `ci(hw06): revert demo failing assertion, pipeline green again`  

Xóa folder `DEMO-FAILING` khỏi collection → pipeline trở về trạng thái **Passed**.

---

## 5. Tóm tắt 3 lần chạy

| Run | Commit | Kết quả | Ghi chú |
|-----|--------|---------|---------|
| 1 | `d10902e9` | ✅ Pass | Workflow được tạo, pipeline chạy xanh lần đầu |
| 2 | `f6c3bc8c` | ❌ Fail | Assertion sai cố ý → pipeline bắt được lỗi |
| 3 | `b6833ded` | ✅ Pass | Revert → pipeline xanh trở lại |

---

## 6. Artifacts

- Newman HTML report được upload tự động tại mỗi lần chạy (tab **Artifacts** trong Actions run)
- File workflow: `.github/workflows/hw06-newman.yml`
