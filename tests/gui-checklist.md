# Checklist

|ID|Screen|Category|Expected result|Actual result|Status|
|--|------|--------|---------------|-------------|------|
|GUI-HOME-001|Trang chủ|Danh sách sản phẩm|Khi mở Web, Trang chủ hiển thị danh sách sản phẩm theo bố cục dạng lưới.|Trang chủ hiển thị danh sách sản phẩm theo các ô dạng lưới.|Pass|
|GUI-HOME-002|Trang chủ|Nội dung sản phẩm|Mỗi sản phẩm hiển thị ảnh, tên và giá.|Mỗi sản phẩm đều hiển thị ảnh, tên và giá.|Pass|
|GUI-HOME-003|Trang chủ|Khả năng truy cập|Trình đọc màn hình đọc được mô tả có ý nghĩa cho từng ảnh sản phẩm.|Trình đọc màn hình không đọc được nội dung mô tả của ảnh sản phẩm.|Fail|
|GUI-HOME-004|Trang chủ|Hiển thị giá|Giá dùng ký hiệu ₫ và có dấu phân cách hàng nghìn.|Giá có dấu phân cách hàng nghìn nhưng hiển thị chữ `VND` thay vì ký hiệu ₫.|Fail|
|GUI-HOME-005|Trang chủ|Tìm kiếm|Nhập tên sản phẩm và bấm Tìm sẽ hiển thị các sản phẩm phù hợp.|Nhập tên sản phẩm và bấm Tìm hiển thị danh sách sản phẩm phù hợp.|Pass|
|GUI-HOME-006|Trang chủ|Trạng thái trống|Tìm kiếm không có kết quả hiển thị hình hoặc biểu tượng kèm thông báo thân thiện.|Khu vực kết quả bị trống hoàn toàn, không có hình, biểu tượng hoặc thông báo.|Fail|
|GUI-HOME-007|Trang chủ|Phản hồi|Trong lúc tải sản phẩm, trang hiển thị trạng thái đang tải.|Không có chỉ báo hoặc thông báo đang tải trên màn hình.|Fail|
|GUI-HOME-008|Trang chủ|Bảo mật giao diện|Từ khóa chứa nội dung đánh dấu hoặc mã lệnh chỉ được hiển thị như văn bản thông thường.|Nội dung đánh dấu trong từ khóa có thể được trình duyệt hiển thị thành thành phần giao diện thay vì văn bản.|Fail|
|GUI-HOME-009|Trang chủ|Xử lý lỗi an toàn|Lỗi tìm kiếm chỉ hiển thị thông báo thân thiện và không để lộ chi tiết kỹ thuật.|Màn hình có thể hiển thị tiêu đề lỗi cơ sở dữ liệu cùng nội dung kỹ thuật chi tiết.|Fail|
|GUI-HOME-010|Trang chủ|Tiêu đề|Trình đọc màn hình chỉ nhận diện một tiêu đề chính cho Trang chủ.|Khi có sản phẩm, trình đọc màn hình nhận diện hai tiêu đề chính trên cùng một trang.|Fail|
|GUI-CART-001|Giỏ hàng|Nội dung|Bảng giỏ hàng có các cột Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác.|Cột Đơn giá hiển thị nhãn `Giá`, không đúng nội dung yêu cầu.|Fail|
|GUI-CART-002|Giỏ hàng|Điều chỉnh số lượng|Mỗi sản phẩm có nút tăng và giảm số lượng.|Màn hình chỉ hiển thị số lượng hiện tại, không có nút tăng hoặc giảm.|Fail|
|GUI-CART-003|Giỏ hàng|Trạng thái|Thêm lại cùng một sản phẩm làm tăng số lượng của dòng hiện có, không tạo dòng mới.|Thêm lại cùng một sản phẩm tạo thêm một dòng sản phẩm trùng lặp trong giỏ.|Fail|
|GUI-CART-004|Giỏ hàng|Tính toán|Thành tiền từng dòng và tổng giỏ hàng được tính từ đơn giá nhân số lượng.|Thành tiền từng dòng và tổng giỏ hàng hiển thị đúng theo giá và số lượng.|Pass|
|GUI-CART-005|Giỏ hàng|Nội dung|Tổng tiền có nhãn chính xác là “Tổng cộng”.|Màn hình hiển thị nhãn `Tổng tạm tính` thay vì `Tổng cộng`.|Fail|
|GUI-CART-006|Giỏ hàng|Xóa sản phẩm|Bấm Xóa phải hiển thị hộp thoại xác nhận trước khi loại sản phẩm.|Sản phẩm bị xóa ngay sau khi bấm Xóa, không có hộp thoại xác nhận.|Fail|
|GUI-CART-007|Giỏ hàng|Điều hướng|Người dùng có thể chọn tiếp tục mua sắm để quay về Trang chủ.|Liên kết tiếp tục mua sắm đưa người dùng trở về Trang chủ.|Pass|
|GUI-CART-008|Giỏ hàng|Trạng thái trống|Giỏ hàng trống hiển thị hình hoặc biểu tượng cùng thông báo thân thiện.|Màn hình chỉ có thông báo giỏ hàng trống và liên kết, không có hình hoặc biểu tượng.|Fail|
|GUI-CART-009|Giỏ hàng|Kiểm soát truy cập|Người dùng chưa đăng nhập khi chọn Thanh toán được chuyển tới Đăng nhập.|Màn hình hiển thị cảnh báo yêu cầu đăng nhập rồi chuyển tới trang Đăng nhập.|Pass|
|GUI-CART-010|Giỏ hàng|Tiêu đề|Trình đọc màn hình nhận diện đúng một tiêu đề chính cho màn hình Giỏ hàng.|Trình đọc màn hình không nhận diện được tiêu đề chính của màn hình Giỏ hàng.|Fail|
|GUI-LOGIN-001|Đăng nhập|Nội dung|Màn hình có nhãn Email, Mật khẩu và nút Đăng nhập bằng tiếng Việt.|Màn hình hiển thị `Username`, nút `Sign In` và tiêu đề sai là `Đăng Ký`.|Fail|
|GUI-LOGIN-002|Đăng nhập|Biểu mẫu|Các trường bắt buộc có ký hiệu * bên cạnh nhãn.|Nhãn Email và Mật khẩu không hiển thị ký hiệu *.|Fail|
|GUI-LOGIN-003|Đăng nhập|Kiểm tra Email|Email sai định dạng phải bị chặn với thông báo yêu cầu nhập đúng định dạng.|Người dùng có thể gửi giá trị không đúng định dạng Email mà không thấy cảnh báo định dạng của trình duyệt.|Fail|
|GUI-LOGIN-004|Đăng nhập|Bảo mật mật khẩu|Nội dung Mật khẩu được che trong lúc nhập.|Mật khẩu hiển thị rõ trên màn hình trong lúc nhập.|Fail|
|GUI-LOGIN-005|Đăng nhập|Kiểm tra dữ liệu|Không thể gửi biểu mẫu khi Email hoặc Mật khẩu để trống.|Trình duyệt chặn gửi biểu mẫu và yêu cầu điền trường còn trống.|Pass|
|GUI-LOGIN-006|Đăng nhập|Xử lý lỗi an toàn|Thông tin đăng nhập sai hiển thị lỗi chung, không tiết lộ trường nào sai.|Màn hình hiển thị thông báo chung `Đăng nhập thất bại. Vui lòng kiểm tra lại.`|Pass|
|GUI-LOGIN-007|Đăng nhập|Vị trí thông báo|Thông báo lỗi xuất hiện phía trên nút Đăng nhập.|Thông báo lỗi xuất hiện phía dưới nút Đăng nhập.|Fail|
|GUI-LOGIN-008|Đăng nhập|Khóa tài khoản|Tài khoản khóa 30 giây sau đúng ba lần đăng nhập sai liên tiếp.|Tài khoản có thể bị khóa ngay sau lần sai thứ hai và thời gian khóa kéo dài khoảng 180 giây.|Fail|
|GUI-LOGIN-009|Đăng nhập|Chức năng|Thông tin hợp lệ đăng nhập thành công và chuyển về Trang chủ với trạng thái đã xác thực.|Đăng nhập hợp lệ chuyển về Trang chủ và thanh điều hướng hiển thị thông tin người dùng.|Pass|
|GUI-LOGIN-010|Đăng nhập|Tiêu đề|Trình đọc màn hình nhận diện đúng một tiêu đề chính cho màn hình Đăng nhập.|Màn hình hiển thị tiêu đề `Đăng Ký` và trình đọc màn hình không nhận diện được tiêu đề chính của trang Đăng nhập.|Fail|
|GUI-REGISTER-001|Đăng ký|Nội dung|Màn hình có Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu.|Màn hình chỉ có Họ Tên, Email và Mật khẩu; thiếu trường Xác nhận mật khẩu.|Fail|
|GUI-REGISTER-002|Đăng ký|Biểu mẫu|Tất cả trường bắt buộc có ký hiệu * bên cạnh nhãn.|Không nhãn trường nào hiển thị ký hiệu *.|Fail|
|GUI-REGISTER-003|Đăng ký|Kiểm tra Email|Email sai định dạng phải bị chặn với thông báo yêu cầu nhập đúng định dạng.|Người dùng có thể gửi giá trị không đúng định dạng Email mà không thấy cảnh báo định dạng của trình duyệt.|Fail|
|GUI-REGISTER-004|Đăng ký|Bảo mật mật khẩu|Nội dung Mật khẩu được che trong lúc nhập.|Mật khẩu được che và không hiển thị rõ trên màn hình.|Pass|
|GUI-REGISTER-005|Đăng ký|Kiểm tra mật khẩu|Mật khẩu từ 8 ký tự có chữ hoa, chữ thường, chữ số và ký tự đặc biệt hợp lệ được chấp nhận.|Mật khẩu hợp lệ như `Test1234!` bị từ chối với thông báo mật khẩu quá yếu.|Fail|
|GUI-REGISTER-006|Đăng ký|Xác nhận mật khẩu|Hệ thống từ chối khi Xác nhận mật khẩu không khớp Mật khẩu.|Màn hình không có trường Xác nhận mật khẩu nên người dùng không thể thực hiện kiểm tra khớp.|Fail|
|GUI-REGISTER-007|Đăng ký|Email duy nhất|Email đã tồn tại bị từ chối bằng thông báo phù hợp và không tạo tài khoản trùng.|Đăng ký lại bằng Email đã tồn tại vẫn có thể hoàn tất mà không hiển thị lỗi trùng Email.|Fail|
|GUI-REGISTER-008|Đăng ký|Điều hướng|Sau khi đăng ký thành công, hệ thống chuyển tới màn hình Đăng nhập.|Đăng ký thành công chuyển người dùng tới màn hình Đăng nhập.|Pass|
|GUI-REGISTER-009|Đăng ký|Vị trí thông báo|Thông báo lỗi xuất hiện phía trên nút Đăng ký.|Thông báo lỗi hiển thị phía trên nút Đăng ký.|Pass|
|GUI-REGISTER-010|Đăng ký|Nhất quán giao diện|Nút Đăng ký dùng màu xanh dương dành cho hành động tích cực.|Nút Đăng ký hiển thị màu đỏ thay vì màu xanh dương.|Fail|
