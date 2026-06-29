# Main Report

## FR-04 Personal Profile management

### Domain testing

#### Bước 1 Xác định input/output

- Các input/output bao gồm:
|Name|Type|IO|
|----|----|--|
|Email|String|I-|
|Họ Tên|String|I|
|Số điện thoại|String/Special number|I|
|Địa chỉ giao hàng mặc định|String|I|
|Notification|String|O|

(I là input, O là output)

Email được đặt là "I-" ở cột IO vì trong đặc tả email không thể chỉnh sửa.

#### Bước 2 Xác định miền giá trị của các biến

Miền giá trị của biến Email:

**Miền hợp lệ**:
Chuỗi có dạng:

```regex
^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
```

Và không thể chỉnh sửa sau khi đã tạo tài khoản.

**Miền không hợp lệ**:

- Không phải email hợp lệ
- Rỗng

Miền giá trị của biến Họ Tên:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode .

**Miền không hợp lệ**:

- Chuỗi rỗng

Miền giá trị của biến Số điện thoại:

**Miền hợp lệ**:

- Chuỗi có độ dài từ 10 đến 11 ký tự bắt đầu bằng số 0 và chỉ chứa các ký tự số từ 0-9.
- Chuỗi rỗng

**Miền không hợp lệ**:

- Chuỗi số có độ dài nhỏ hơn 10 (khác 0) hoặc lớn hơn 11 ký tự
- Chuỗi số có ký tự không phải là số
- Chuỗi số 0

Miền giá trị của biến Địa chỉ giao hàng mặc định:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode .
- Chuỗi rỗng

**Miền không hợp lệ**:

None

Miền giá trị của biến Notification:

- Thông báo thành công
- Thông báo lỗi

#### Bước 3 Xác định giá trị đại diện cho mỗi miền

Miền giá trị của biến Email:

**Miền hợp lệ**:

`test@eshop.com`

Và không thể chỉnh sửa sau khi đã tạo tài khoản.

**Miền không hợp lệ**:

- Không phải email hợp lệ: `abc`
- Rỗng

Miền giá trị của biến Họ Tên:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode: `Test User`

**Miền không hợp lệ**:

- Chuỗi rỗng

Miền giá trị của biến Số điện thoại:

**Miền hợp lệ**:

- Chuỗi có độ dài từ 10 đến 11 ký tự bắt đầu bằng số 0 và chỉ chứa các ký tự số từ 0-9 : `0123456789`
- Chuỗi rỗng

**Miền không hợp lệ**:

- Chuỗi số có độ dài nhỏ hơn 10 (khác 0): `012345678`
- Chuỗi số lớn hơn 11 ký tự: `012345678901`
- Chuỗi số có ký tự không phải là số: `01abce`
- Chuỗi số 0: `0`

Miền giá trị của biến Địa chỉ giao hàng mặc định:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode : `277 Nguyễn Văn Cừ Quận 5 Thành Phố Hồ Chí Minh`
- Chuỗi rỗng

Miền giá trị của biến Notification:

- Thông báo thành công
- Thông báo lỗi:
  - Thông báo lỗi về số điện thoại không hợp lệ
  - Thông báo lỗi về tên không hợp lệ
  - Thông báo lỗi về email không hợp lệ
  - Thông báo về email không được chỉnh sửa.

#### Bước 4 Xác định các test case

Test case 1: Sử dụng các giá trị hợp lệ cho tất cả các biến và kiểm tra xem hệ thống có ghi nhận thông tin cá nhân hay không.

Test case 2: Sử dụng giá trị không hợp lệ (giá trị rỗng) cho biến Số điện thoại và kiểm tra xem hệ thống có từ chối cập nhật thông tin cá nhân hay không.

Test case 3: Sử dụng giá trị không hợp lệ (giá trị rỗng) cho biến Họ Tên  và kiểm tra xem hệ thống có từ chối cập nhật thông tin cá nhân hay không.

Test case 4: Thay đổi giá trị của biến Email và kiểm tra xem hệ thống có từ chối cập nhật thông tin cá nhân hay không.

Test case 5: Sử dụng giá trị không hợp lệ (giá trị số 0) cho biến Số điện thoại và kiểm tra xem hệ thống có từ chối cập nhật thông tin cá nhân hay không

### BVA testing

Không có áp dụng vì không có giá trị biến số.

## FR-09 Discount coupons

### Domain testing

#### Bước 1 Xác định input/output

- Các input/output bao gồm:
|Name|Type|IO|
|----|----|--|
|Mã giảm tồn tại|Boolean|I|
|Thời gian mua hàng|Tristate|I|
|Giá giỏ hàng so với lại mức tối thiểu|Tristate (above, below, equal)|I|
|Người dùng đã đăng nhập|Boolean|I|
|Lượt sử dụng mã giảm|Integer|I|
|Loại mã giảm|Category (percentage, fixed)|I|
|Số lượng sản phẩm trong giỏ hàng|Integer|I|
|Giá giỏ hàng cuối cùng|Float|O|
|Notification|String|O|

#### Bước 2 Xác định miền giá trị của các biến

Mã giảm tồn tại: giá trị true, false

Mã giảm chưa hết hạn: giá trị trước ngày hết hạn, giá trị sau ngày hết hạn, giá trị đúng ngày hết hạn

Giá giỏ hàng so với lại mức tối thiểu
**Miền hợp lệ**:

- Giá trị trên mức tối thiểu
- Giá trị dưới mức tối thiểu
- Giá trị bằng mức tối thiểu lớn hơn 0

**Miền không hợp lệ**:

- Giá trị âm
- Giá trị bằng 0

Người dùng đã đăng nhập: giá trị true, false

Lượt sử dụng mã giảm:

**Miền hợp lệ**:

- Giá trị bằng 0
- Giá trị lớn hơn 0

**Miền không hợp lệ**:

- Giá trị âm
- Không phải giá trị số nguyên

Loại mã giảm:

**Miền hợp lệ**:

- Giá trị là percentage
- Giá trị là fixed

**Miền không hợp lệ**:

- Giá trị khác percentage và fixed
- Không có giá trị

Số lượng sản phẩm trong giỏ hàng:

**Miền hợp lệ**:

- Giá trị lớn hơn 0

**Miền không hợp lệ**:

- Giá trị âm
- Không phải giá trị số nguyên

Giá giỏ hàng cuối cùng:

**Miền hợp lệ**:

- Số nhỏ hơn giá ban đầu (lớn hơn hoặc bằng 0)

**Miền không hợp lệ**:

- Giá trị âm
- Giá trị lớn hơn giá ban đầu

Miền giá trị cho biến Notification:

- Thông báo thành công
- Thông báo lỗi:

#### Bước 3 Xác định giá trị đại diện cho mỗi miền

Giá trị đại diện cho biến Mã giảm tồn tại:  true, false

Giá trị đại diện cho biến Mã giảm chưa hết hạn:

- Trước ngày hết hạn (+100 năm từ ngày kiểm thử)
- Sau ngày hết hạn (hết vào năm 2020)
- Đúng ngày hết hạn (ngày kiểm thử)

Giá trị đại diện cho biến Giá giỏ hàng so với lại mức tối thiểu:

**Giá trị hợp lệ**:

- Giá trị trên mức tối thiểu: 1000000 (cho mã giảm BIGBUY)
- Giá trị dưới mức tối thiểu: 100000 (cho mã giảm BIGBUY)
- Giá trị bằng mức tối thiểu: 500000 (cho mã giảm BIGBUY)

**Giá trị không hợp lệ**:

- Giá trị âm: -100000
- Giá trị bằng 0: 0

Giá trị đại diện cho biến Người dùng đã đăng nhập: true (có đăng nhập), false (chưa đăng nhập)

Giá trị dại diện cho biến Lượt sử dụng mã giảm:

**Giá trị hợp lệ**:

- Giá trị bằng 0: 0
- Giá trị lớn hơn 0: 1

**Giá trị không hợp lệ**:

- Giá trị âm: -1
- Không phải giá trị số nguyên: 1.5

Giá trị đại diện cho biến Loại mã giảm:

**Giá trị hợp lệ**:

- Giá trị là percentage: percentage
- Giá trị là fixed: fixed

**Giá trị không hợp lệ**:

- Giá trị khác percentage và fixed: other
- Không có giá trị: null

Giá trị đại diện cho biến Số lượng sản phẩm trong giỏ hàng:

**Giá trị hợp lệ**:

- Giá trị lớn hơn 0: 1

**Giá trị không hợp lệ**:

- Giá trị âm: -1

Giá trị đại diện cho biến Giá giỏ hàng cuối cùng:

**Giá trị hợp lệ**:

- Số nhỏ hơn giá ban đầu (lớn hơn hoặc bằng 0): 3600000 (từ đơn hàng 4000000)

**Giá trị không hợp lệ**:

- Giá trị âm: -100000
- Giá trị lớn hơn giá ban đầu: 5000000 (từ đơn hàng 4000000)

Giá trị đại diện cho Notification:

- Thông báo thành công: "Mã giảm giá đã được áp dụng thành công"
- Thông báo lỗi:
  - Thông báo lỗi về mã giảm giá không tồn tại
  - Thông báo lỗi về mã giảm giá đã hết hạn
  - Thông báo lỗi về mã giảm giá không đủ điều kiện áp dụng
  - Thông báo lỗi về mã giảm giá đã được sử dụng hết số lần

#### Buớc 4 Xác định các test case

Test case 1: Sử dụng các giá trị hợp lệ cho tất cả các biến và kiểm tra xem hệ thống có áp dụng mã giảm giá hay không.

Test case 2: Sử dụng giá trị không hợp lệ (giá trị dưới giá tối thiểu sản phẩm) cho biến Giá giỏ hàng và kiểm tra xem hệ thống có từ chối áp dụng mã giảm giá hay không.

Test case 3: Sử dụng giá trị hợp lệ (giá trị không) cho biến Lượt sử dụng mã giảm và kiểm tra xem hệ thống có từ chối áp dụng mã giảm giá hay không.

Test case 4: Sử dụng giá trị hợp lệ (giá trị percentage và fixed) cho biến Loại mã giảm và kiểm tra xem hệ thống có chấp nhận áp dụng mã giảm giá hay không.

Test case 5: Sử dụng giá trị không hợp lệ (giá trị không) cho biến Số lượng sản phẩm trong giỏ hàng và kiểm tra xem hệ thống có từ chối áp dụng mã giảm giá hay không.

Test case 6: Người dùng chưa đăng nhập và kiểm tra xem hệ thống có từ chối áp dụng mã giảm giá hay không.

Test case 7: Giá trị đơn hàng bằng mức tối thiểu và kiểm tra xem hệ thống có chấp nhận áp dụng mã giảm giá hay không.

Test case 8: Ngày hết hạn của mã giảm giá là ngày kiểm thử và kiểm tra xem hệ thống có từ chối áp dụng mã giảm giá hay không.

Test case 9: Ngày hết hạn của mã giảm giá là trước ngày kiểm thử và kiểm tra xem hệ thống có từ chối áp dụng mã giảm giá hay không.

### BVA testing

#### Các biến số có giá trị là số nguyên

- Lượt sử dụng mã giảm
- Số lượng sản phẩm trong giỏ hàng

#### Các test case BVA cho biến Lượt sử dụng mã giảm

Test case 1: Sử dụng giá trị bằng 0 cho biến Lượt sử dụng mã giảm và kiểm tra xem hệ thống có chấp nhận áp dụng mã giảm giá hay không

Test case 2: Sử dụng giá trị bằng 1 cho biến Lượt sử dụng mã giảm và kiểm tra xem hệ thống có chấp nhận áp dụng mã giảm giá hay không

Test case 3: Sử dụng giá trị bằng 2 cho biến Lượt sử dụng mã giảm và kiểm tra xem hệ thống cho phép áp dụng mã giảm giá 2 lần hay không

#### Các test case BVA cho biến Số lượng sản phẩm trong giỏ hàng

Test case 1: Sử dụng giá trị bằng 1 cho biến Số lượng sản phẩm trong giỏ hàng và kiểm tra xem hệ thống có chấp nhận áp dụng mã giảm giá hay không

Test case 2: Sử dụng giá trị bằng 2 cho biến Số lượng sản phẩm trong giỏ hàng và kiểm tra xem hệ thống có chấp nhận áp dụng mã giảm giá hay không

## FR-15 Product management (CRUD)

### Domain testing

#### Bước 1 Xác định input/output

Các input/output bao gồm:

|Name|Type|IO|Operation|
|----|----|--|---------|
|Tên sản phẩm|String|I|Tạo, Chỉnh sửa|
|Độ dài tên sản phẩm|Integer|I|Tạo, Chỉnh sửa|
|Mô tả sản phẩm|String|I|Tạo, Chỉnh sửa|
|Hình ảnh sản phẩm|String|I|Tạo, Chỉnh sửa|
|Giá sản phẩm|Float|I|Tạo, Chỉnh sửa|
|Danh mục sản phẩm|Category|I|Tạo, Chỉnh sửa|
|Nút xoá sản phẩm|Button|I|Xoá|

#### Bước 2 Xác định miền giá trị của các biến

Miền giá trị cho biến Tên sản phẩm:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode

**Miền không hợp lệ**:

- Chuỗi rỗng

Miền giá trị cho biến Độ dài tên sản phẩm:

**Miền hợp lệ**:

- Tất cả các giá trị nguyên dương nhỏ hơn 256

**Miền không hợp lệ**:

- Giá trị bằng 0
- Giá trị lớn hơn hoặc bằng 256

Miền giá trị cua biến Mô tả sản phẩm:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode
- Chuỗi rỗng

**Miền không hợp lệ**:

Không có

Miền giá trị cho biến Hình ảnh sản phẩm:

**Miền hợp lệ**:

- Một URL hợp lệ trỏ đến hình ảnh sản phẩm

**Miền không hợp lệ**:

- Một URL không hợp lệ
- Một URL trỏ đến hình ảnh không tồn tại
- Rỗng

Miền giá trị của biến Giá sản phẩm:

**Miền hợp lệ**:

- Giá trị lớn hơn 0

**Miền không hợp lệ**:

- Giá trị bằng 0
- Giá trị âm

Miền giá trị của biến Danh mục sản phẩm:

**Miền hợp lệ**:

- Giá trị là một danh mục sản phẩm hợp lệ có trong hệ thống

**Miền không hợp lệ**:

- Giá trị không phải là một danh mục sản phẩm hợp lệ có trong hệ thống
- Rỗng

Miền giá trị của biến Nút xoá sản phẩm: Không có miền giá trị vì đây là một nút bấm.

#### Bước 3 Xác định giá trị đại diện cho mỗi miền

Giá trị đại diện cho biến Tên sản phẩm:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode: "Chuột Apple"

**Miền không hợp lệ**:

- Chuỗi rỗng: ""

Giá trị đại điện cho biến Độ dài tên sản phẩm:

**Miền hợp lệ**:

- Tất cả các giá trị nguyên dương nhỏ hơn 256: 10

**Miền không hợp lệ**:

- Giá trị bằng 0: 0
- Giá trị lớn hơn hoặc bằng 256: 256

Giá trị đại diện cho biến Mô tả sản phẩm:

**Miền hợp lệ**:

- Tất cả tổ hợp chuỗi khác rỗng có trong bản chữ cái nhìn thấy được unicode: "Chuột Apple không dây đến từ Apple"

- Chuỗi rỗng: ""

Giá trị đại diện cho biến Hình ảnh sản phẩm:

**Miền hợp lệ**:

- Một URL hợp lệ trỏ đến hình ảnh sản phẩm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE"

**Miền không hợp lệ**:

- Một URL không hợp lệ: "htp://invalid-url"
- Một URL trỏ đến hình ảnh không tồn tại: "https://example.com/a.jpg"
- Rỗng: ""

Giá trị đại diện cho biến Giá sản phẩm:

**Miền hợp lệ**:

- Giá trị lớn hơn 0: 4000000

**Miền không hợp lệ**:

- Giá trị bằng 0: 0
- Giá trị âm: -100000

Giá trị đại diện cho biến Danh mục sản phẩm:

**Miền hợp lệ**:

- Giá trị là một danh mục sản phẩm hợp lệ có trong hệ thống: "Phụ kiện"

**Miền không hợp lệ**:

- Giá trị không phải là một danh mục sản phẩm hợp lệ có trong hệ thống: "a"
- Rỗng: ""

Giá trị đại diện cho biến Nút xoá sản phẩm: Không có giá trị đại diện vì đây là một nút bấm.

Giá trị đại diện cho biến Notification:

- Thông báo thành công: "Sản phẩm đã được thêm thành công"
- Thông báo lỗi:
  - Thông báo lỗi về tên sản phẩm không hợp lệ
  - Thông báo lỗi về độ dài tên sản phẩm không hợp lệ
  - Thông báo lỗi về hình ảnh sản phẩm không hợp lệ
  - Thông báo lỗi về giá sản phẩm không hợp lệ
  - Thông báo lỗi về danh mục sản phẩm không hợp lệ

#### Bước 4 Xác định các test case

- Test case 1: Kiểm tra xem sản phẩm đã có sẵn trong hệ thống.

- Test case 2: Sử dụng các giá trị hợp lệ cho tất cả các biến và kiểm tra xem hệ thống có tạo sản phẩm mới hay không.

- Test case 3: Sử dụng giá trị không hợp lệ (giá trị rỗng) cho biến Tên sản phẩm và kiểm tra xem hệ thống có từ chối thêm sản phẩm mới hay không.

- Test case 4: Sử dụng giá trị không hợp lệ (giá trị bằng 0) cho biến Độ dài tên sản phẩm (tên rỗng) và kiểm tra xem hệ thống có từ chối thêm sản phẩm mới hay không.

- Test case 5: Sử dụng giá trị không hợp lệ (giá trị bằng 0) cho biến Giá sản phẩm và kiểm tra xem hệ thống có từ chối thêm sản phẩm mới hay không.

- Test case 6: Sử dụng giá trị không hợp lệ (URL không hợp lệ) cho biến Hình ảnh sản phẩm và kiểm tra xem hệ thống có từ chối thêm sản phẩm mới hay không.

- Test case 7: Sử dụng giá trị không hợp lệ (giá trị không phải là danh mục sản phẩm hợp lệ) cho biến Danh mục sản phẩm và kiểm tra xem hệ thống có từ chối thêm sản phẩm mới hay không.

- Test case 8: Sử dụng giá trị không hợp lệ (giá trị rỗng) cho biến Mô tả sản phẩm và kiểm tra xem hệ thống có từ chối thêm sản phẩm mới hay không.

- Test case 9: Sử dụng giá trị hợp lệ cho tất cả các biến và kiểm tra xem hệ thống có chỉnh sửa sản phẩm hay không.

- Test case 10: Sử dụng giá trị không hợp lệ (giá trị rỗng) cho biến Tên sản phẩm và kiểm tra xem hệ thống có từ chối chỉnh sửa sản phẩm hay không.

- Test case 11: Sử dụng giá trị không hợp lệ (giá trị bằng 0) cho biến Độ dài tên sản phẩm (tên rỗng) và kiểm tra xem hệ thống có từ chối chỉnh sửa sản phẩm hay không.

- Test case 12: Sử dụng giá trị không hợp lệ (giá trị bằng 0) cho biến Giá sản phẩm và kiểm tra xem hệ thống có từ chối chỉnh sửa sản phẩm hay không.

- Test case 13: Sử dụng giá trị không hợp lệ (URL không tồn tại) cho biến Hình ảnh sản phẩm và kiểm tra xem hệ thống có từ chối chỉnh sửa sản phẩm hay không.

- Test case 14: Sử dụng giá trị không hợp lệ (giá trị không phải là danh mục sản phẩm hợp lệ) cho biến Danh mục sản phẩm và kiểm tra xem hệ thống có từ chối chỉnh sửa sản phẩm hay không.

- Test case 15: Không chỉnh sửa bất kỳ biến nào và kiểm tra xem hệ thống có từ chối chỉnh sửa sản phẩm hay không.

- 

### BVA testing

Các 