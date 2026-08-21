# Test Summary — HW06 AI-First API Testing

## Sinh viên: 23127464 — Trần Minh Quang

## SUT: EShop REST Backend (`localhost:3000`)

---

### Phạm vi kiểm thử

| Pool | FR | Endpoint | Mô tả |
|:---:|---|---|---|
| A | FR-05 | `GET /api/products` | Product Listing & Search |
| B | FR-11 | `GET /api/orders/my-orders` | Order History (danh sách) |
| B | FR-11 | `GET /api/orders/:id` | Order History (chi tiết) |
| C | FR-16 | `POST /api/admin/import-products` | Product Import (admin) |

### Tổng hợp test cases

| Pool | FR | Thiết kế | AI sinh | Người bổ sung | VALID | INVALID | INCOMPLETE | Thực thi | Đạt | Không đạt | Bugs |
|:---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A | FR-05 | 45 | 40 | 5 | 16 | 2 | 22 | 45 | 35 | 10 | 1 |
| B | FR-11 | 80 | 70 | 10 | 33 | 2 | 35 | 80 | 60 | 20 | 1 |
| C | FR-16 | 45 | 40 | 5 | 29 | 2 | 9 | 45 | 29 | 16 | 3 |
| | **Tổng** | **170** | **150** | **20** | **78** | **6** | **66** | **170** | **124** | **46** | **5** |

### Tỉ lệ

| Metric | Giá trị |
|---|---:|
| Tỉ lệ thực thi | 170 / 170 = **100%** |
| Tỉ lệ đạt | 124 / 170 = **72,9%** |
| Tỉ lệ không đạt | 46 / 170 = **27,1%** |
| Assertions đạt / không đạt | 364 / 49 |
| Bugs phát hiện | **5** (3 Critical, 1 High, 1 Medium) |

### Bugs phát hiện

| # | FR | Severity | Mô tả | GitHub Issue |
|---:|---|---|---|---|
| 1 | FR-05 | Critical / P0 | SQL injection qua `search` parameter | [#262](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/262) |
| 2 | FR-11 | Critical / P0 | IDOR + thiếu authentication trên order detail | [#263](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/263) |
| 3 | FR-16 | Critical / P0 | Thiếu kiểm tra role admin khi import | [#264](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/264) |
| 4 | FR-16 | Medium / P2 | Không validate price > 0 | [#265](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/265) |
| 5 | FR-16 | High / P1 | Không rollback batch khi có dòng invalid | [#266](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/266) |

### CI/CD

| Run | Commit | Kết quả | Link |
|---|---|---|---|
| All-pass | `34455d7` | SUCCESS | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502275099) |
| Controlled-failure | `c2610bb` | FAILURE | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502722228) |

### Video demo

| Link |
|---|
| [https://youtu.be/k49pwd-5vUs](https://youtu.be/k49pwd-5vUs) |

### Repository

- Branch: [test/23127464-API-Testing](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-API-Testing)
