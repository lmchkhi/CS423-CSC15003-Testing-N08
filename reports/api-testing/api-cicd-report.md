# Báo cáo CI/CD — Pool A, B và C

## 1. Phạm vi

- Workflow: `.github/workflows/api-test-pools-a-b-c.yml`.
- Pool A: FR-05 — `GET /api/products`.
- Pool B: FR-11 — `GET /api/orders/my-orders` và `GET /api/orders/:id`.
- Pool C: FR-16 — `POST /api/admin/import-products`.
- Student header: `X-Student-Id: 23127464`.
- Nền tảng CI: GitHub Actions trên `ubuntu-latest`, Node.js 22, Newman 6.2.2 và `newman-reporter-htmlextra` 1.23.1.

Workflow cũ `.github/workflows/fr-11-api-test.yml` đã được thay thế vì chỉ bao phủ Pool B. Các liên kết và ảnh chụp của những lần chạy cũ vẫn được giữ trong `reports/api-testing/fr-11-cicd-report.md` làm lịch sử.

## 2. Thiết kế pipeline

Workflow tạo ba job ma trận độc lập với `fail-fast: false`. Vì vậy, mỗi Pool vẫn tạo evidence ngay cả khi Pool khác không đạt:

| Job | Collection | Cách chuẩn bị fixture |
|---|---|---|
| Pool A / FR-05 | `ci-fr05.postman_collection.json` | Chạy với 5 sản phẩm có sẵn, sau đó chạy riêng với danh sách sản phẩm rỗng |
| Pool B / FR-11 | `ci-fr11.postman_collection.json` | Tạo người dùng, đơn hàng và JWT xác định bằng `prepare-fr11-fixture.js` |
| Pool C / FR-16 | `ci-fr16.postman_collection.json` | Tạo admin, user, category và product marker xác định bằng `prepare-fr16-fixture.js` |

Mỗi job thực hiện:

1. Lấy đúng commit cần kiểm thử.
2. Cài thư viện backend bằng `npm ci`.
3. Cài đúng phiên bản Newman và trình tạo báo cáo HTML.
4. Tạo lại ba collection gốc và áp dụng các hiệu chỉnh đã được con người duyệt.
5. Tạo collection CI theo chế độ được chọn và kiểm tra số lượng test case duy nhất.
6. Đọc cấu trúc JSON để kiểm tra việc gắn `X-Student-Id`, assertion trên mọi request và giá trị `studentId` trong environment.
7. Khởi động SUT độc lập và chờ dữ liệu nền 5 sản phẩm sẵn sàng.
8. Chuẩn bị fixture xác định tương ứng với FR.
9. Chạy Newman và giữ nguyên mã thoát thực tế.
10. Luôn tải lên báo cáo HTML, JSON, console, fixture, log SUT, metadata và mã thoát bằng `if: always()`.
11. Dừng đúng tiến trình SUT và trả trạng thái job theo kết quả Newman.

## 3. Các chế độ chạy

| Chế độ | FR-05 | FR-11 | FR-16 | Kết quả pipeline dự kiến | Mục đích |
|---|---:|---:|---:|---|---|
| `all-pass` | 5 | 5 | 5 | Thành công | Commit minh họa có toàn bộ ca CI được chọn ở cả ba Pool đều đạt |
| `controlled-failure` | 5 | 5 | 6 | Chỉ FR-16 không đạt | Commit minh họa có đúng một ca lỗi thực tế là `FR16-AUTH-002` |
| `full` | 45 | 80 | 45 | Không đạt khi các lỗi đã biết còn tồn tại | Chạy hồi quy toàn bộ 170 ca đã hiệu chỉnh |

Lỗi có kiểm soát không phải lỗi giả lập. `FR16-AUTH-002` gửi JWT hợp lệ của người dùng không phải admin tới endpoint import dành cho admin. Ca này không đạt vì sản phẩm vẫn được lưu, qua đó chứng minh lỗi thiếu kiểm tra quyền đã được xác nhận.

## 4. Cơ chế hai commit dùng làm evidence

Khi chạy bằng `push` hoặc `pull_request`, workflow đọc `tests/api-testing/ci-mode.json`. Nhờ đó, hai kết quả minh họa bắt buộc có thể truy vết tới hai commit SHA khác nhau.

### Commit 1 — toàn bộ ca CI được chọn đều đạt

Giữ nguyên:

```json
{ "mode": "all-pass" }
```

Commit và push pipeline. Kết quả mong đợi: cả ba job ma trận đều thành công và tạo ba artifact.

Commit message đề xuất:

```text
ci(api): chạy bộ kiểm thử đạt cho cả ba pool
```

### Commit 2 — có đúng một lỗi thực tế được kiểm soát

Chỉ đổi giá trị `mode` thành:

```json
{ "mode": "controlled-failure" }
```

Commit và push. Kết quả mong đợi: FR-05 và FR-11 thành công; FR-16 không đạt chỉ tại `FR16-AUTH-002`.

Commit message đề xuất:

```text
ci(api): minh họa lỗi import của người dùng không phải admin
```

Sau khi thu thập đủ liên kết và ảnh chụp, nên tạo một commit đưa chế độ mặc định về `all-pass`. Có thể chạy toàn bộ 170 ca thủ công tại **Actions → Kiểm thử API - Pool A B C → Run workflow → full**.

## 5. Hướng dẫn tạo evidence trên GitHub

### 5.1. Chuẩn bị

1. Đảm bảo repository đã được đẩy lên GitHub và GitHub Actions được bật.
2. Kiểm tra file `tests/api-testing/ci-mode.json` đang có `"mode": "all-pass"`.
3. Kiểm tra nhánh hiện tại và remote bằng:

```powershell
git branch --show-current
git remote -v
git status --short
```

4. Stage đúng các file CI/CD và tài liệu liên quan:

```powershell
git add -A -- .github/workflows
git add README.md reports/api-testing/api-cicd-report.md reports/api-testing/fr-11-cicd-report.md
git add tests/api-testing/ci-mode.json tests/api-testing/scripts/build-ci-collection.js tests/api-testing/scripts/verify-ci-collection.js
git add tests/api-testing/test-cases/fr-05-phase-c-human-review-workbook.md
git add tests/api-testing/test-cases/fr-11-phase-c-human-review-workbook.md
git add tests/api-testing/test-cases/fr-16-phase-c-human-review-workbook.md
```

Trước khi commit, dùng `git diff --cached --stat` và `git diff --cached` để chắc chắn không đưa nhầm file ngoài phạm vi vào commit.

### 5.2. Evidence lần chạy 1 — `all-pass`

1. Tạo commit thứ nhất:

```powershell
git commit -m "ci(api): chạy bộ kiểm thử đạt cho cả ba pool"
git push origin test/23127464-API-Testing
```

2. Mở tab **Actions**, chọn workflow **Kiểm thử API - Pool A B C**, rồi mở lần chạy ứng với commit vừa push.
3. Chờ cả ba job hoàn tất. Kết quả đúng phải là:
   - Pool A / FR-05: xanh.
   - Pool B / FR-11: xanh.
   - Pool C / FR-16: xanh.
4. Chụp màn hình trang tổng quan sao cho thấy tên workflow, commit, trạng thái và cả ba job.
5. Ở phần **Artifacts**, tải xuống cả ba artifact `fr05-...`, `fr11-...`, `fr16-...`.
6. Mở từng artifact và xác nhận có báo cáo Newman HTML, JSON, console, `ci-metadata.txt`, `exit-codes.txt` và `sut.log`.

### 5.3. Evidence lần chạy 2 — `controlled-failure`

1. Sửa duy nhất giá trị trong `tests/api-testing/ci-mode.json` thành `"controlled-failure"`.
2. Tạo commit thứ hai:

```powershell
git add tests/api-testing/ci-mode.json
git commit -m "ci(api): minh họa lỗi import của người dùng không phải admin"
git push origin test/23127464-API-Testing
```

3. Mở lần chạy mới trong **Actions**. Kết quả đúng phải là:
   - Pool A / FR-05: xanh.
   - Pool B / FR-11: xanh.
   - Pool C / FR-16: đỏ.
4. Mở job FR-16, mở bước **Chạy collection FR-11 hoặc FR-16** và chụp phần log thể hiện `FR16-AUTH-002` không đạt.
5. Chụp thêm trang tổng quan có commit SHA và trạng thái ba job.
6. Tải xuống đủ ba artifact. Artifact vẫn được tạo cho job đỏ vì bước upload dùng `if: always()`.

### 5.4. Khôi phục chế độ mặc định

Sau khi có đủ evidence, đổi `mode` về `all-pass`, commit và push để nhánh không cố ý để pipeline ở trạng thái lỗi:

```powershell
git add tests/api-testing/ci-mode.json
git commit -m "ci(api): khôi phục chế độ mặc định all-pass"
git push origin test/23127464-API-Testing
```

### 5.5. Evidence cần lưu cho mỗi lần chạy

Không dùng ảnh do AI tạo. Evidence phải được chụp hoặc tải trực tiếp từ GitHub Actions thực tế:

- URL của lần chạy GitHub Actions.
- Commit SHA và commit message.
- Tên nhánh, thời gian chạy và trạng thái chung.
- Ảnh tổng quan ba job Pool A, B, C.
- Với lần chạy 2: ảnh log assertion thất bại của `FR16-AUTH-002`.
- Tên và liên kết của ba artifact.
- Ba artifact đã tải xuống, bên trong có Newman HTML/JSON và metadata.
- `ci-metadata.txt` thể hiện đúng `student_id=23127464`, `mode`, `commit_sha` và `run_id`.

Có thể lưu bằng cấu trúc sau mà không sửa báo cáo AI Audit:

```text
tests/api-testing/evidence/ci-cd/
├── all-pass/
│   ├── github-actions-overview.png
│   ├── run-link.txt
│   └── artifacts/...
└── controlled-failure/
    ├── github-actions-overview.png
    ├── fr16-auth-002-failure.png
    ├── run-link.txt
    └── artifacts/...
```

### 5.6. Evidence thực tế đã thu thập cho toàn bộ ba Pool

Hai ảnh dưới đây là ảnh tổng quan của pipeline chung, bao phủ đồng thời Pool A, B và C; chúng không thuộc riêng FR nào:

| Chế độ | Run và commit | Kết quả xác nhận | Ảnh tổng quan |
|---|---|---|---|
| `all-pass` | [Run 32502275099](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502275099) — `34455d7f486aa550f6896edae60615d23395fb65` | Pool A, B và C đều `SUCCESS`; có 3 artifact | `tests/api-testing/evidence/ci-cd/all-pass/github-actions-overview.png` |
| `controlled-failure` | [Run 32502722228](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502722228) — `c2610bb52a99a8d22f8c6a2e3f24e2bc80e12f12` | Pool A/B `SUCCESS`, Pool C `FAILURE`; có 3 artifact | `tests/api-testing/evidence/ci-cd/controlled-failure/github-actions-overview.png` |

Mã SHA-256 của ảnh:

- `all-pass`: `179B1714996440473BF524F72B89D5084F0D43B2E747C4274EC794B03397F868`.
- `controlled-failure`: `A6A12EF11A6FD8D7C176CAEAF7766FCCBE7B8D6C1432D4AA875F5FBD23E3DE03`.

Ảnh tổng quan failure, URL run và commit SHA là evidence bắt buộc cho lần chạy minh họa: chúng chứng minh Pool A/B đạt và Pool C không đạt. Chi tiết `FR16-AUTH-002` có trong log của job FR-16 và Newman artifact của run; không tạo thêm ảnh mô phỏng hoặc ảnh do AI sinh.

## 6. Chạy thủ công

`workflow_dispatch` cho phép chọn một trong ba chế độ và ghi đè giá trị trong `ci-mode.json`:

- `all-pass`
- `controlled-failure`
- `full`

Chạy thủ công phù hợp để kiểm tra hồi quy. Tuy nhiên, hai lần chạy minh họa của bài nên dùng file cấu hình được version control để mỗi kết quả gắn với một commit riêng.

## 7. Cấu trúc artifact

Mỗi job tải lên một artifact có tên:

```text
<fr>-<run_id>-<run_attempt>
```

Evidence trong artifact gồm:

- Báo cáo Newman HTML.
- Báo cáo Newman JSON.
- Output console của Newman.
- Output fixture nếu FR cần fixture.
- Log SUT và bản ghi PID.
- Metadata gồm FR, mode, commit SHA, run ID và phiên bản công cụ.
- Mã thoát chính xác của lần chạy.

Riêng artifact FR-05 có báo cáo tách biệt cho dữ liệu nền chính và dữ liệu rỗng.

## 8. Kiểm tra đã thực hiện cục bộ

- `build-ci-collection.js` đã vượt qua kiểm tra cú pháp.
- Cả 9 tổ hợp FR/chế độ tạo đúng số ca duy nhất:
  - `all-pass`: 5/5/5.
  - `controlled-failure`: 5/5/6.
  - `full`: 45/80/45.
- Các ca được chọn cho `all-pass` đã đạt trong evidence Newman cục bộ cuối cùng.
- `FR16-AUTH-002` là một ca lỗi đã được xác nhận trong evidence cục bộ cuối cùng.
- Các thay đổi workflow vượt qua `git diff --check`.

## 9. Trạng thái xuất bản

CẤU HÌNH PIPELINE: HOÀN TẤT

PHẠM VI POOL: HOÀN TẤT — A, B, C

LẦN CHẠY GITHUB `all-pass`: HOÀN TẤT — RUN 32502275099

LẦN CHẠY GITHUB `controlled-failure`: HOÀN TẤT — RUN 32502722228

ẢNH TỔNG QUAN VÀ URL HAI LẦN CHẠY: HOÀN TẤT

CHI TIẾT ASSERTION `FR16-AUTH-002`: CÓ TRONG JOB LOG VÀ NEWMAN ARTIFACT CỦA RUN 32502722228

Báo cáo này không tạo giả lần chạy GitHub, URL, commit SHA hoặc ảnh chụp màn hình.
