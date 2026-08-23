## Found by Test Case
TC-PRODUCT-UPDATE-025

## Also detected by
TC-PRODUCT-UPDATE-015–021, TC-PRODUCT-UPDATE-023–036, TC-PRODUCT-UPDATE-043, TC-PRODUCT-UPDATE-045

## Requirement liên quan
FR-15

## Severity / Priority
Major / P1

## Environment
- Base URL: `http://localhost:3000`
- Commit/build: `192090fbdf78207f3873cfd5008d655cb16e4dff`
- Executed at: `2026-08-23T14:51:00+07:00`
- X-Student-Id: `23127062`

## Steps to reproduce
1. Gửi `PUT /api/products/1` bằng JWT admin với `price: 0` và các trường còn lại hợp lệ.
2. Lặp lại bằng body tối giản `{"name":"A","price":0,"category_id":1}`.

## Expected result
API trả controlled `400/422` và không cập nhật vì FR-15 yêu cầu `price > 0`.

## Actual result
Cả hai request trả HTTP `200` với `{"message":"Product updated"}`. Endpoint cũng chấp nhận các partition invalid của `name`, `price`, `category_id` và top-level body array.

## Evidence
![TC-PRODUCT-UPDATE-025 price zero](https://raw.githubusercontent.com/lmchkhi/CS423-CSC15003-Testing-N08/HW06/23127062/test-reports/evidence/product-update/input-validation.png)

[Raw reproduction evidence](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/evidence/product-update/reproduction-20260823T144713+0700.txt)

## Reproducibility
2/2 với `price: 0`; 23 invalid body partitions cùng root cause thất bại trong Newman.
