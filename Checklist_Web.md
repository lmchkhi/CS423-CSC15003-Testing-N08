# Checklist

|ID|Screen|Category|Expected result|Actual result|Status|
|--|------|--------|---------------|-------------|------|
|VIS-001|Trang chủ / Danh sách sản phẩm|Visual|Màn hình hiển thị danh sách tất cả sản phẩm theo dạng lưới, các thẻ sản phẩm được căn chỉnh đều và không chồng lấn nội dung.||Not Run|
|VIS-002|Trang chủ / Danh sách sản phẩm|Visual|Mỗi sản phẩm hiển thị ảnh đúng tỷ lệ, tên sản phẩm rõ ràng và giá có ký hiệu `₫` với định dạng phân cách hàng nghìn.||Not Run|
|VIS-003|Trang chủ / Danh sách sản phẩm|Visual|Trang chủ có đúng một tiêu đề chính `<h1>` mô tả nội dung trang.||Not Run|
|FUN-001|Trang chủ / Danh sách sản phẩm|Functional|Khi người dùng mở trang chủ, hệ thống tải và hiển thị danh sách sản phẩm.||Not Run|
|FUN-002|Trang chủ / Danh sách sản phẩm|Functional|Khi người dùng nhập từ khóa tìm kiếm theo tên sản phẩm, danh sách chỉ hiển thị các sản phẩm phù hợp.||Not Run|
|FUN-003|Trang chủ / Danh sách sản phẩm|Functional|Khi người dùng chọn một sản phẩm từ danh sách, hệ thống cho phép truy cập màn hình chi tiết sản phẩm tương ứng.||Not Run|
|VAL-001|Trang chủ / Danh sách sản phẩm|Validation|Khi người dùng nhập từ khóa tìm kiếm có nội dung HTML hoặc script, từ khóa được hiển thị an toàn và không được render như mã HTML.||Not Run|
|USA-001|Trang chủ / Danh sách sản phẩm|Usability|Các thông tin quan trọng của sản phẩm gồm ảnh, tên và giá đủ dễ đọc để người dùng nhận biết sản phẩm trước khi thao tác.||Not Run|
|USA-002|Trang chủ / Danh sách sản phẩm|Usability|Toàn bộ nội dung giao diện trang chủ sử dụng tiếng Việt nhất quán, trừ các thuật ngữ kỹ thuật chuẩn nếu có.||Not Run|
|RES-001|Trang chủ / Danh sách sản phẩm|Responsive|Ở viewport desktop 1440x900, lưới sản phẩm hiển thị ổn định, không bị vỡ bố cục và không có thanh cuộn ngang.||Not Run|
|RES-002|Trang chủ / Danh sách sản phẩm|Responsive|Ở viewport tablet 768x1024, danh sách sản phẩm tự điều chỉnh số cột phù hợp và các nút thao tác vẫn nhìn thấy được.||Not Run|
|RES-003|Trang chủ / Danh sách sản phẩm|Responsive|Ở viewport mobile 390x844, sản phẩm hiển thị dễ đọc, không tràn ngang và người dùng có thể cuộn dọc bình thường.||Not Run|
|COM-001|Trang chủ / Danh sách sản phẩm|Compatibility|Trên Chrome và Edge, trang chủ hiển thị cùng nội dung sản phẩm, font chữ, bố cục và chức năng tìm kiếm hoạt động nhất quán.||Not Run|
|ACC-001|Trang chủ / Danh sách sản phẩm|Accessibility|Tất cả ảnh sản phẩm có nội dung thay thế mô tả sản phẩm và không để trống thuộc tính alt.||Not Run|
|ACC-002|Trang chủ / Danh sách sản phẩm|Accessibility|Khi điều hướng bằng phím Tab, focus đi từ trên xuống dưới, trái sang phải và có chỉ báo focus rõ ràng.||Not Run|
|FDB-001|Trang chủ / Danh sách sản phẩm|Feedback|Khi dữ liệu sản phẩm đang được tải, màn hình hiển thị trạng thái loading rõ ràng trước khi danh sách xuất hiện.||Not Run|
|FDB-002|Trang chủ / Danh sách sản phẩm|Feedback|Khi tìm kiếm không có kết quả, màn hình hiển thị empty state phù hợp với thông báo thân thiện.||Not Run|
|VIS-004|Giỏ hàng|Visual|Màn hình giỏ hàng hiển thị các cột Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác rõ ràng, dễ phân biệt.||Not Run|
|VIS-005|Giỏ hàng|Visual|Tổng tiền trong giỏ hàng hiển thị nhãn chính xác là "Tổng cộng" và dùng ký hiệu `₫` với định dạng phân cách hàng nghìn.||Not Run|
|VIS-006|Giỏ hàng|Visual|Nút hành động chính dùng màu xanh dương và nút xóa hoặc hủy dùng màu đỏ nhất quán.||Not Run|
|FUN-004|Giỏ hàng|Functional|Khi cùng một sản phẩm được thêm vào giỏ nhiều lần, giỏ hàng tăng số lượng của dòng sản phẩm đó và không tạo dòng trùng lặp.||Not Run|
|FUN-005|Giỏ hàng|Functional|Khi người dùng bấm nút tăng số lượng, số lượng sản phẩm và thành tiền của dòng đó được cập nhật đúng.||Not Run|
|FUN-006|Giỏ hàng|Functional|Khi người dùng bấm nút giảm số lượng, số lượng sản phẩm và thành tiền của dòng đó được cập nhật đúng theo giới hạn hợp lệ.||Not Run|
|FUN-007|Giỏ hàng|Functional|Khi người dùng bấm "Tiếp tục mua sắm", hệ thống điều hướng về trang chủ hoặc danh sách sản phẩm.||Not Run|
|FUN-008|Giỏ hàng|Functional|Khi người dùng xác nhận xóa một sản phẩm, chỉ sản phẩm được chọn bị xóa khỏi giỏ hàng.||Not Run|
|VAL-002|Giỏ hàng|Validation|Khi số lượng sản phẩm đang ở mức tối thiểu, người dùng không thể giảm xuống giá trị không hợp lệ như 0 hoặc số âm.||Not Run|
|VAL-003|Giỏ hàng|Validation|Khi giỏ hàng có nhiều sản phẩm, thành tiền từng dòng và tổng cộng được tính nhất quán theo đơn giá và số lượng.||Not Run|
|USA-003|Giỏ hàng|Usability|Người dùng có thể nhận biết rõ sản phẩm nào đang được chỉnh số lượng hoặc chuẩn bị xóa.||Not Run|
|USA-004|Giỏ hàng|Usability|Trước khi xóa sản phẩm, hệ thống hiển thị dialog xác nhận với nội dung dễ hiểu để tránh thao tác nhầm.||Not Run|
|RES-004|Giỏ hàng|Responsive|Ở viewport desktop 1440x900, bảng hoặc danh sách giỏ hàng hiển thị đầy đủ các thông tin chính mà không tràn ngang.||Not Run|
|RES-005|Giỏ hàng|Responsive|Ở viewport mobile 390x844, các thông tin sản phẩm, số lượng, thành tiền và thao tác vẫn đọc được và thao tác được.||Not Run|
|COM-002|Giỏ hàng|Compatibility|Trên Chrome và Edge, thao tác tăng, giảm, xóa sản phẩm và tiếp tục mua sắm hoạt động nhất quán.||Not Run|
|ACC-003|Giỏ hàng|Accessibility|Các nút tăng, giảm, xóa và tiếp tục mua sắm có thể được focus và kích hoạt bằng bàn phím.||Not Run|
|ACC-004|Giỏ hàng|Accessibility|Dialog xác nhận xóa sản phẩm nhận focus phù hợp và người dùng có thể xác nhận hoặc hủy bằng bàn phím.||Not Run|
|FDB-003|Giỏ hàng|Feedback|Khi giỏ hàng trống, màn hình hiển thị hình minh họa hoặc biểu tượng kèm thông báo rõ ràng.||Not Run|
|FDB-004|Giỏ hàng|Feedback|Sau khi xóa sản phẩm, giỏ hàng cập nhật trực quan để người dùng thấy sản phẩm đã bị xóa và tổng cộng đã thay đổi.||Not Run|
|VIS-007|Đăng nhập|Visual|Màn hình đăng nhập hiển thị các trường Email, Mật khẩu và nút đăng nhập rõ ràng, căn chỉnh nhất quán.||Not Run|
|VIS-008|Đăng nhập|Visual|Màn hình đăng nhập có đúng một tiêu đề chính `<h1>` mô tả nội dung trang.||Not Run|
|FUN-009|Đăng nhập|Functional|Khi người dùng nhập email và mật khẩu hợp lệ, hệ thống đăng nhập thành công và đưa người dùng vào trạng thái đã xác thực.||Not Run|
|FUN-010|Đăng nhập|Functional|Sau khi đăng nhập thành công, người dùng có thể truy cập các chức năng yêu cầu xác thực bằng phiên đăng nhập hiện tại.||Not Run|
|FUN-011|Đăng nhập|Functional|Khi người dùng chọn liên kết đăng ký, hệ thống điều hướng tới màn hình đăng ký.||Not Run|
|FUN-012|Đăng nhập|Functional|Khi người dùng chọn quên mật khẩu, hệ thống điều hướng tới luồng quên mật khẩu.||Not Run|
|VAL-004|Đăng nhập|Validation|Trường Email sử dụng định dạng email hợp lệ và từ chối giá trị không đúng dạng `user@domain.com`.||Not Run|
|VAL-005|Đăng nhập|Validation|Khi bỏ trống Email hoặc Mật khẩu, hệ thống hiển thị lỗi phù hợp và không đăng nhập.||Not Run|
|VAL-006|Đăng nhập|Validation|Sau 3 lần đăng nhập sai liên tiếp, tài khoản bị tạm khóa 30 giây và giao diện hiển thị thông báo lỗi phù hợp.||Not Run|
|USA-005|Đăng nhập|Usability|Thông báo đăng nhập sai không để lộ chi tiết nguyên nhân như email tồn tại hay mật khẩu sai.||Not Run|
|USA-006|Đăng nhập|Usability|Nhãn trường, nút và thông báo trên màn hình đăng nhập dùng tiếng Việt rõ ràng, dễ hiểu.||Not Run|
|RES-006|Đăng nhập|Responsive|Ở viewport mobile 390x844, form đăng nhập hiển thị vừa màn hình, không che nút submit và không tràn ngang.||Not Run|
|COM-003|Đăng nhập|Compatibility|Trên Chrome và Edge, validate email, nhập mật khẩu và submit form đăng nhập hoạt động nhất quán.||Not Run|
|ACC-005|Đăng nhập|Accessibility|Trường Email và Mật khẩu có nhãn rõ ràng để người dùng bàn phím hoặc trình đọc màn hình nhận biết được mục đích nhập liệu.||Not Run|
|ACC-006|Đăng nhập|Accessibility|Khi dùng Tab, focus đi qua Email, Mật khẩu, nút đăng nhập và các liên kết liên quan theo thứ tự hợp lý.||Not Run|
|FDB-005|Đăng nhập|Feedback|Khi đăng nhập thất bại, thông báo lỗi xuất hiện rõ ràng phía trên nút submit.||Not Run|
|FDB-006|Đăng nhập|Feedback|Khi đăng nhập đang xử lý, giao diện hiển thị trạng thái chờ hoặc vô hiệu hóa thao tác lặp để tránh gửi nhiều lần.||Not Run|
|VIS-009|Đăng ký|Visual|Màn hình đăng ký hiển thị các trường Họ Tên, Email, Mật khẩu, Xác nhận mật khẩu và nút đăng ký rõ ràng.||Not Run|
|VIS-010|Đăng ký|Visual|Các trường bắt buộc trên form đăng ký có ký hiệu `*` bên cạnh nhãn.||Not Run|
|VIS-011|Đăng ký|Visual|Màn hình đăng ký có đúng một tiêu đề chính `<h1>` mô tả nội dung trang.||Not Run|
|FUN-013|Đăng ký|Functional|Khi người dùng nhập đầy đủ họ tên, email duy nhất, mật khẩu mạnh và xác nhận mật khẩu khớp, tài khoản được tạo thành công.||Not Run|
|FUN-014|Đăng ký|Functional|Sau khi đăng ký thành công, người dùng được chuyển tới màn hình đăng nhập.||Not Run|
|FUN-015|Đăng ký|Functional|Khi người dùng chọn liên kết đăng nhập, hệ thống điều hướng về màn hình đăng nhập.||Not Run|
|VAL-007|Đăng ký|Validation|Khi bỏ trống Họ Tên, Email, Mật khẩu hoặc Xác nhận mật khẩu, hệ thống hiển thị lỗi bắt buộc và không tạo tài khoản.||Not Run|
|VAL-008|Đăng ký|Validation|Khi Email không đúng định dạng `user@domain.com`, hệ thống hiển thị lỗi định dạng email và không tạo tài khoản.||Not Run|
|VAL-009|Đăng ký|Validation|Khi Email đã tồn tại trong hệ thống, form hiển thị lỗi phù hợp và không tạo tài khoản trùng.||Not Run|
|VAL-010|Đăng ký|Validation|Khi Mật khẩu dưới 8 ký tự hoặc thiếu chữ hoa, chữ thường, chữ số hoặc ký tự đặc biệt, hệ thống hiển thị lỗi mật khẩu mạnh.||Not Run|
|VAL-011|Đăng ký|Validation|Khi Xác nhận mật khẩu không khớp với Mật khẩu, hệ thống hiển thị lỗi phù hợp và không tạo tài khoản.||Not Run|
|USA-007|Đăng ký|Usability|Thông tin lỗi trên form đăng ký đủ rõ để người dùng biết trường nào cần sửa và sửa theo quy tắc nào.||Not Run|
|USA-008|Đăng ký|Usability|Nhãn trường và nút hành động trên màn hình đăng ký dùng tiếng Việt nhất quán, không gây nhầm lẫn.||Not Run|
|RES-007|Đăng ký|Responsive|Ở viewport mobile 390x844, toàn bộ form đăng ký có thể cuộn và thao tác được, nút đăng ký không bị che khuất.||Not Run|
|COM-004|Đăng ký|Compatibility|Trên Chrome và Edge, validate trường bắt buộc, email và mật khẩu của form đăng ký hoạt động nhất quán.||Not Run|
|ACC-007|Đăng ký|Accessibility|Các trường Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu có nhãn rõ ràng và nhận focus bằng bàn phím.||Not Run|
|ACC-008|Đăng ký|Accessibility|Trường Mật khẩu và Xác nhận mật khẩu không hiển thị rõ nội dung nhập và phù hợp với kiểu nhập mật khẩu.||Not Run|
|FDB-007|Đăng ký|Feedback|Khi đăng ký thất bại, thông báo lỗi xuất hiện rõ ràng phía trên nút submit.||Not Run|
|FDB-008|Đăng ký|Feedback|Khi đăng ký thành công, hệ thống hiển thị phản hồi phù hợp hoặc điều hướng rõ ràng sang màn hình đăng nhập.||Not Run|
