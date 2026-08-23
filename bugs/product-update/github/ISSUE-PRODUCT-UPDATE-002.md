## Found by Test Case
TC-PRODUCT-UPDATE-008

## Also detected by
TC-PRODUCT-UPDATE-006, TC-PRODUCT-UPDATE-007, TC-PRODUCT-UPDATE-009, TC-PRODUCT-UPDATE-010, TC-PRODUCT-UPDATE-011

## Requirement liên quan
FR-15; contract của resource path `PUT /api/products/:id`

## Severity / Priority
Major / P1

## Environment
- Base URL: `http://localhost:3000`
- Commit/build: `192090fbdf78207f3873cfd5008d655cb16e4dff`
- Executed at: `2026-08-23T14:51:00+07:00`
- X-Student-Id: `23127062`

## Steps to reproduce
1. Gửi `PUT /api/products/999999` bằng JWT admin và body hợp lệ.
2. Lặp lại với body tối giản `{"name":"A","price":1,"category_id":1}`.
3. Quan sát response.

## Expected result
API trả `404 Not Found`; không báo cập nhật thành công khi resource không tồn tại.

## Actual result
Cả hai lần trả HTTP `200` với `{"message":"Product updated"}`. Các ID `0`, `-1`, `1.5`, `abc` và SQLi-like cũng nhận success response.

## Evidence
![TC-PRODUCT-UPDATE-008 nonexistent ID](https://raw.githubusercontent.com/lmchkhi/CS423-CSC15003-Testing-N08/HW06/23127062/test-reports/evidence/product-update/nonexistent-id.png)

[Raw reproduction evidence](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/evidence/product-update/reproduction-20260823T144713+0700.txt)

## Reproducibility
2/2 với ID `999999`; 6/6 path partitions thất bại trong Newman.
