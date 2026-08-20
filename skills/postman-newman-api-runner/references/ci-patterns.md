# GitHub Actions CI Patterns

## Minimal workflow

Đặt tại `.github/workflows/newman-api-test.yml`.

```yaml
name: Newman API tests

on:
  push:
    branches:
      - main
      - "feature/**"
  workflow_dispatch:

jobs:
  newman:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install backend dependencies
        working-directory: backend
        run: npm ci

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Start backend
        working-directory: backend
        run: |
          npm run dev &
          npx wait-on http://127.0.0.1:3000/api/products

      - name: Run Newman
        run: |
          mkdir -p reports/newman
          newman run postman/hw06-api.postman_collection.json \
            --environment postman/hw06-local.postman_environment.json \
            --iteration-data postman/data/hw06-api.data.json \
            --reporters cli,htmlextra,json \
            --reporter-htmlextra-export reports/newman/hw06-api.html \
            --reporter-json-export reports/newman/hw06-api.json

      - name: Upload Newman reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: newman-reports
          path: reports/newman/
```

Chỉnh filenames cho khớp actual collection/data files.

## Quy trình pass/fail evidence

1. Commit collection/environment/data/workflow đúng.
2. Push và lưu passing run URL cùng screenshot.
3. Tạo intentional fail bằng cách đổi một `expectedStatus` sang giá trị bất khả thi như `999`.
4. Commit và push.
5. Lưu failing run URL và screenshot.
6. Khôi phục giá trị đúng.
7. Commit và push để final branch ở trạng thái passing.

## CI report fields

| Field | Nội dung cần ghi |
| --- | --- |
| Workflow path | `.github/workflows/newman-api-test.yml` |
| Backend startup command | Thường là `cd backend && npm run dev`. |
| Newman command | Exact command và collection/data paths. |
| Pass run | Commit hash, URL, screenshot. |
| Intentional fail run | Commit hash, changed expectation, URL, screenshot. |
| Restored pass | Final commit hash và URL. |

## Ghi chú

- Nếu `npm run dev` dùng port khác, update `baseUrl` và `wait-on`.
- Nếu backend không có endpoint kiểu health ở `/api/products`, wait trên một public endpoint đã biết.
- Không fake CI evidence; TAs có thể inspect linked GitHub Actions runs.
