# FR-12: Kiểm soát truy cập (Access Control) — Black-Box Test Design (Steps 1–3)

## 1. Phân tích Yêu cầu (Requirement Analysis)

### Nguồn đặc tả

| Nguồn | Nội dung liên quan |
|---|---|
| [description_project.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/description_project.md#L174-L179) | FR-12 định nghĩa |
| [api_specification.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/api_specification.md#L171-L214) | API Admin endpoints |
| [description_project.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/description_project.md#L274-L285) | SEC-02, SEC-03 (bảo mật) |

### Tóm tắt yêu cầu FR-12

> **FR-12:** Phân hệ Admin chỉ dành cho tài khoản có `role = 'admin'`.
> **Tất cả** các API Admin (`/api/admin/*`) và các API có tính ảnh hưởng dữ liệu (`POST/PUT/DELETE /api/products`, `/api/categories`, `/api/coupons`) đều phải yêu cầu:
> 1. Token JWT hợp lệ.
> 2. `role = 'admin'` trong Token.

Bổ trợ:
- **SEC-02:** Các API có tính bảo mật phải yêu cầu JWT Token hợp lệ.
- **SEC-03:** API Admin phải kiểm tra `role = 'admin'` trong Token, không chỉ kiểm tra sự tồn tại của Token.

---

## 2. Xác định Biến đầu vào (Step 1)

FR-12 có **2 biến đầu vào** chính:

| # | Variable | Type | Mô tả |
|---|----------|------|--------|
| V1 | **Token (JWT)** | Categorical / State | Trạng thái của JWT Token gửi kèm trong header `Authorization: Bearer <token>` |
| V2 | **Role (trong Token)** | Categorical | Giá trị `role` được encode trong JWT payload |

**Biến phụ (ngữ cảnh):**

| # | Variable | Type | Mô tả |
|---|----------|------|--------|
| V3 | **API Endpoint** | Categorical | Endpoint đang được gọi — chia thành 2 nhóm: (a) Admin-only `/api/admin/*`, (b) Data-mutation `/api/products`, `/api/categories`, `/api/coupons` với method POST/PUT/DELETE |

### Áp dụng STRICT BVA RULE

> [!IMPORTANT]
> **Kết luận: BVA KHÔNG áp dụng.**
> Cả 2 biến đầu vào chính (Token, Role) đều là **categorical / state-based**, KHÔNG phải numerical.
> *"No numerical variables found. BVA is skipped."*

---

## 3. Equivalence Partitioning (Step 2 & 3)

### 3.1. Variable V1: Token (JWT)

| Partition ID | Partition | Giá trị đại diện | Valid / Invalid |
|---|---|---|---|
| V1-EP1 | Không có Token | Header `Authorization` trống hoặc không gửi | ❌ Invalid |
| V1-EP2 | Token sai định dạng / hết hạn / bị giả mạo | `"Bearer invalid_token_xyz"` | ❌ Invalid |
| V1-EP3 | Token JWT hợp lệ (của user thường, role = 'user') | Token từ login `test@eshop.com` | ✅ Valid (nhưng role sai → truy cập bị từ chối) |
| V1-EP4 | Token JWT hợp lệ (của admin, role = 'admin') | Token từ login `admin@eshop.com` | ✅ Valid |

### 3.2. Variable V2: Role (trong Token)

| Partition ID | Partition | Giá trị đại diện | Valid / Invalid |
|---|---|---|---|
| V2-EP1 | Không có role (Token missing hoặc invalid) | N/A — phụ thuộc V1-EP1, V1-EP2 | ❌ Invalid |
| V2-EP2 | `role = 'user'` (user thường) | Token của `test@eshop.com` | ❌ Invalid (cho API Admin) |
| V2-EP3 | `role = 'admin'` | Token của `admin@eshop.com` | ✅ Valid |

### 3.3. Variable V3: API Endpoint (Target Groups)

Dựa trên đặc tả, các API cần bảo vệ chia 2 nhóm:

**Nhóm A — Admin-only APIs (`/api/admin/*`):**

| API | Method | Mô tả |
|-----|--------|--------|
| `/api/admin/users` | GET | Lấy danh sách người dùng |
| `/api/admin/users/:id` | DELETE | Xóa người dùng |
| `/api/admin/orders` | GET | Lấy danh sách đơn hàng |
| `/api/admin/orders/:id/status` | PUT | Cập nhật trạng thái đơn hàng |
| `/api/admin/import-products` | POST | Import sản phẩm từ CSV |
| `/api/admin/coupons` | POST | Thêm mã giảm giá |
| `/api/admin/coupons/:id` | DELETE | Xóa mã giảm giá |

**Nhóm B — Data-mutation APIs (Non-admin path, nhưng yêu cầu admin):**

| API | Method | Mô tả |
|-----|--------|--------|
| `/api/products` | POST | Thêm sản phẩm |
| `/api/products/:id` | PUT | Sửa sản phẩm |
| `/api/products/:id` | DELETE | Xóa sản phẩm |
| `/api/categories` | POST | Thêm danh mục |
| `/api/categories/:id` | PUT | Sửa danh mục |
| `/api/categories/:id` | DELETE | Xóa danh mục |

---

## 4. Domain Matrix — Test Case Combinations

### Logic tổ hợp Token × Role × API Group

| TC | Token (V1) | Role (V2) | API Group (V3) | Expected Result |
|---|---|---|---|---|
| DT-001 | ❌ Không có Token | N/A | Nhóm A (Admin API) | ❌ Bị từ chối (401 Unauthorized) |
| DT-002 | ❌ Không có Token | N/A | Nhóm B (Data-mutation API) | ❌ Bị từ chối (401 Unauthorized) |
| DT-003 | ❌ Token sai / hết hạn | N/A | Nhóm A (Admin API) | ❌ Bị từ chối (401 Unauthorized) |
| DT-004 | ❌ Token sai / hết hạn | N/A | Nhóm B (Data-mutation API) | ❌ Bị từ chối (401 Unauthorized) |
| DT-005 | ✅ Token hợp lệ | `role = 'user'` | Nhóm A (Admin API) | ❌ Bị từ chối (403 Forbidden) |
| DT-006 | ✅ Token hợp lệ | `role = 'user'` | Nhóm B (Data-mutation API) | ❌ Bị từ chối (403 Forbidden) |
| DT-007 | ✅ Token hợp lệ | `role = 'admin'` | Nhóm A (Admin API) | ✅ Truy cập thành công (200 OK) |
| DT-008 | ✅ Token hợp lệ | `role = 'admin'` | Nhóm B (Data-mutation API) | ✅ Truy cập thành công (200 OK) |

### Mở rộng thành Test Cases cụ thể theo từng Endpoint

> [!NOTE]
> Để đảm bảo coverage cho tất cả endpoint trong cả 2 nhóm, mỗi endpoint sẽ được kiểm tra với **3 kịch bản cốt lõi**:
> 1. Không có Token → 401
> 2. Token hợp lệ nhưng role = 'user' → 403
> 3. Token hợp lệ + role = 'admin' → 200 OK
>
> Kịch bản "Token sai/hết hạn" (DT-003/004) sẽ được test đại diện trên 1–2 endpoint vì hành vi là đồng nhất.

#### Danh sách Test Cases dự kiến

| TC ID | Endpoint | Method | Token | Role | Expected |
|---|---|---|---|---|---|
| **DT-001** | `/api/admin/users` | GET | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-002** | `/api/admin/users` | GET | ❌ Token sai | N/A | 401 Unauthorized |
| **DT-003** | `/api/admin/users` | GET | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-004** | `/api/admin/users` | GET | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-005** | `/api/admin/users/:id` | DELETE | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-006** | `/api/admin/users/:id` | DELETE | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-007** | `/api/admin/users/:id` | DELETE | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-008** | `/api/admin/orders` | GET | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-009** | `/api/admin/orders` | GET | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-010** | `/api/admin/orders` | GET | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-011** | `/api/admin/orders/:id/status` | PUT | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-012** | `/api/admin/orders/:id/status` | PUT | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-013** | `/api/admin/orders/:id/status` | PUT | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-014** | `/api/admin/import-products` | POST | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-015** | `/api/admin/import-products` | POST | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-016** | `/api/admin/import-products` | POST | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-017** | `/api/admin/coupons` | POST | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-018** | `/api/admin/coupons` | POST | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-019** | `/api/admin/coupons` | POST | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-020** | `/api/admin/coupons/:id` | DELETE | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-021** | `/api/admin/coupons/:id` | DELETE | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-022** | `/api/admin/coupons/:id` | DELETE | ✅ Hợp lệ | `admin` | 200 OK |
| **DT-023** | `/api/products` | POST | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-024** | `/api/products` | POST | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-025** | `/api/products` | POST | ✅ Hợp lệ | `admin` | 200 OK (tạo SP) |
| **DT-026** | `/api/products/:id` | PUT | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-027** | `/api/products/:id` | PUT | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-028** | `/api/products/:id` | PUT | ✅ Hợp lệ | `admin` | 200 OK (sửa SP) |
| **DT-029** | `/api/products/:id` | DELETE | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-030** | `/api/products/:id` | DELETE | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-031** | `/api/products/:id` | DELETE | ✅ Hợp lệ | `admin` | 200 OK (xóa SP) |
| **DT-032** | `/api/categories` | POST | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-033** | `/api/categories` | POST | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-034** | `/api/categories` | POST | ✅ Hợp lệ | `admin` | 200 OK (tạo DM) |
| **DT-035** | `/api/categories/:id` | PUT | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-036** | `/api/categories/:id` | PUT | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-037** | `/api/categories/:id` | PUT | ✅ Hợp lệ | `admin` | 200 OK (sửa DM) |
| **DT-038** | `/api/categories/:id` | DELETE | ❌ Không gửi | N/A | 401 Unauthorized |
| **DT-039** | `/api/categories/:id` | DELETE | ✅ Hợp lệ | `user` | 403 Forbidden |
| **DT-040** | `/api/categories/:id` | DELETE | ✅ Hợp lệ | `admin` | 200 OK (xóa DM) |

---

## 5. Tổng kết

| Hạng mục | Kết quả |
|---|---|
| **Biến đầu vào** | 2 biến chính (Token, Role) + 1 biến ngữ cảnh (API Endpoint) |
| **Kiểu biến** | Tất cả đều **Categorical** (không phải numerical) |
| **BVA** | ❌ **Bỏ qua** — Theo STRICT BVA RULE: *"No numerical variables found. BVA is skipped."* |
| **Kỹ thuật áp dụng** | Equivalence Partitioning (EP) only |
| **Tổng Test Cases (Domain Testing)** | **40 test cases** (DT-001 → DT-040) |
| **Coverage** | 13 endpoint × 3 kịch bản (No Token / User Token / Admin Token) + 1 kịch bản Token sai bổ sung |

> [!IMPORTANT]
> **Câu hỏi xác nhận:** Các bảng logic phân tích ở trên có chính xác không? Tôi nên tiến hành sinh các file Markdown Test Case riêng lẻ không?
