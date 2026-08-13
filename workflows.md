# HW05 - Five End-to-End Performance Testing Workflows

Base URL: `http://localhost:3000`

Mỗi workflow dưới đây bao phủ đủ ba nhóm endpoint theo yêu cầu của HW05:

- **Auth-heavy:** xác thực người dùng và các thao tác liên quan đến tài khoản.
- **Read-heavy:** đọc, tìm kiếm và xem thông tin sản phẩm hoặc danh mục.
- **Transactional:** giỏ hàng, coupon, checkout và quản lý đơn hàng.

Ba test plan **Load**, **Stress** và **Spike** của một sinh viên phải chạy cùng một workflow. Các test plan chỉ thay đổi workload model như số virtual users, ramp-up, thời lượng và cách tăng tải.

## Workflow 1 - Người dùng mới mua hàng lần đầu - Thanh

### Luồng endpoint

```text
POST /api/register
-> POST /api/login
-> GET /api/categories
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
```

### Phân nhóm

| Nhóm          | Endpoint                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/register`, `POST /api/login`                                                        |
| Read-heavy    | `GET /api/categories`, `GET /api/products?search=${keyword}`, `GET /api/products/${productId}` |
| Transactional | `POST /api/cart`, `POST /api/checkout`                                                         |

### Dữ liệu CSV đề xuất

```csv
name,email,password,keyword,productId,quantity,totalAmount,shippingAddress
```

Mỗi virtual user cần một email riêng để tránh lỗi trùng tài khoản khi đăng ký.

## Workflow 2 - Khách hàng quay lại tìm kiếm và đặt hàng - Quang

### Luồng endpoint

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> GET /api/cart
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/my-orders
```

### Phân nhóm

| Nhóm          | Endpoint                                                                             |
| ------------- | ------------------------------------------------------------------------------------ |
| Auth-heavy    | `POST /api/login`                                                                    |
| Read-heavy    | `GET /api/products?search=${keyword}`, `GET /api/products/${productId}`              |
| Transactional | `GET /api/cart`, `POST /api/cart`, `POST /api/checkout`, `GET /api/orders/my-orders` |

### Dữ liệu CSV đề xuất

```csv
email,password,keyword,productId,quantity,totalAmount,shippingAddress
```

Đây là workflow cơ bản và dễ triển khai nhất bằng JMeter hoặc k6.

## Workflow 3 - Mua hàng sử dụng coupon - Khang

### Luồng endpoint

```text
POST /api/login
-> GET /api/products
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/apply-coupon
-> POST /api/checkout
-> POST /api/coupon-usage
```

### Phân nhóm

| Nhóm          | Endpoint                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------ |
| Auth-heavy    | `POST /api/login`                                                                          |
| Read-heavy    | `GET /api/products`, `GET /api/products/${productId}`                                      |
| Transactional | `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout`, `POST /api/coupon-usage` |

### Dữ liệu CSV đề xuất

```csv
email,password,productId,quantity,couponCode,totalAmount,shippingAddress
```

Coupon có giới hạn sử dụng theo người dùng. Cần chuẩn bị đủ tài khoản hoặc reset dữ liệu giữa các lần chạy.

## Workflow 4 - Đặt hàng rồi hủy đơn - Khải

### Luồng endpoint

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/${orderId}
-> PUT /api/orders/${orderId}/cancel
-> GET /api/orders/my-orders
```

### Phân nhóm

| Nhóm          | Endpoint                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/login`                                                                                                                      |
| Read-heavy    | `GET /api/products?search=${keyword}`, `GET /api/products/${productId}`                                                                |
| Transactional | `POST /api/cart`, `POST /api/checkout`, `GET /api/orders/${orderId}`, `PUT /api/orders/${orderId}/cancel`, `GET /api/orders/my-orders` |

### Dữ liệu CSV đề xuất

```csv
email,password,keyword,productId,quantity,totalAmount,shippingAddress
```

Test plan phải trích `token` từ response đăng nhập và `orderId` từ response checkout. Giá trị `${orderId}` được dùng cho request xem và hủy đơn hàng.

## Workflow 5 - Khôi phục tài khoản rồi mua hàng - Ngọc

### Luồng endpoint

```text
POST /api/forgot-password
-> Extract ${resetToken}
-> POST /api/reset-password
-> POST /api/login
-> GET /api/products
-> GET /api/products/${productId}
-> POST /api/cart
-> POST /api/checkout
```

### Phân nhóm

| Nhóm          | Endpoint                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/forgot-password`, `POST /api/reset-password`, `POST /api/login` |
| Read-heavy    | `GET /api/products`, `GET /api/products/${productId}`                      |
| Transactional | `POST /api/cart`, `POST /api/checkout`                                     |

### Dữ liệu CSV đề xuất

```csv
email,newPassword,productId,quantity,totalAmount,shippingAddress
```

Workflow này thay đổi mật khẩu thật. Mỗi virtual user cần tài khoản riêng và không nên chạy đồng thời nhiều thread trên cùng một tài khoản.

## Phân công workflow đề xuất

| Thành viên | Workflow                                         |
| ---------- | ------------------------------------------------ |
| 1          | Người dùng mới mua hàng lần đầu - Minh           |
| 2          | Khách hàng quay lại tìm kiếm và đặt hàng - Quang |
| 3          | Mua hàng sử dụng coupon - Khang                  |
| 4          | Đặt hàng rồi hủy đơn - Khải                      |
| 5          | Khôi phục tài khoản rồi mua hàng - Ngọc          |

## Lưu ý khi xây dựng test plan

- Trích JWT `token` từ response của `POST /api/login`.
- Gửi `Authorization: Bearer ${token}` cho các endpoint yêu cầu xác thực.
- Không dùng chung một tài khoản cho nhiều virtual user nếu workflow thay đổi trạng thái tài khoản hoặc đơn hàng.
- Chuẩn bị dữ liệu CSV đủ lớn để tránh các virtual user tranh chấp cùng sản phẩm, coupon hoặc tài khoản.
- Giữ nguyên thứ tự endpoint của workflow trong cả Load, Stress và Spike test.
- Chỉ thay đổi workload model giữa ba scenario, không thay đổi hành trình nghiệp vụ.
