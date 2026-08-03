# Quy ước triển khai

## Fixture

Mỗi record phải có tối thiểu `id`, `title`, `type`, `preconditions`, `input` và `expected`. Có thể thêm `tags`, `skipReason`, `expectedResponse` hoặc `evidence` khi tính năng cần. Đặt mọi giá trị tác động đến hành vi kiểm thử trong fixture; chỉ giữ hằng số kỹ thuật như timeout hoặc đường dẫn file trong config/helper.

Không lưu mật khẩu thật trong repository. Đọc bí mật từ biến môi trường và chỉ để tên biến trong tài liệu.

## Locator và đồng bộ

Ưu tiên locator ổn định theo accessibility role, test id và label. Chỉ dùng text khi nội dung là một phần của hợp đồng UI. Nếu buộc dùng CSS, chọn thuộc tính ổn định và ghi lý do; tránh XPath và chuỗi phụ thuộc cấu trúc DOM.

Đồng bộ bằng `expect(locator)`, `waitForResponse`, `waitForURL` hoặc trạng thái tải cụ thể. Đăng ký `waitForResponse` trước hành động kích hoạt request để tránh race condition.

## Assertion coverage

Duy trì bảng ánh xạ test ID → nhóm assertion. Tối thiểu ba nhóm khác nhau phải thật sự chạy trong suite:

- DOM/visible text: nội dung hoặc trạng thái hiển thị cho người dùng.
- State/attribute: URL, value, checked, disabled hoặc thuộc tính quan sát được.
- Network/response: status hoặc payload công khai quan sát từ browser.
- Count/aggregate: số phần tử hoặc tổng hiển thị.
- Visual/snapshot: chỉ dùng khi baseline đã được duyệt và ổn định giữa môi trường.

## Bằng chứng và phân loại thất bại

Lưu command, exit code, report, trace và ảnh tự sinh từ lần chạy. Với mỗi failure, thử tái hiện độc lập và phân loại:

1. Test defect: locator, dữ liệu, đồng bộ hoặc expected sai.
2. Environment issue: SUT không chạy, browser/dependency thiếu, network hoặc seed hỏng.
3. SUT defect: hành vi quan sát được trái yêu cầu/contract và tái hiện được sau khi loại trừ hai nhóm trên.

## Báo cáo

Tạo timestamp tại runtime theo ISO 8601 có offset. Sau khi chạy, mở report và xác nhận `Run by` cùng timestamp xuất hiện; cấu hình metadata chưa được kiểm chứng không đủ để tuyên bố đạt yêu cầu.

Tóm tắt theo tính năng và browser với số automated, executed, passed, failed, skipped và blocked. Không dùng số dự kiến trong cột kết quả thực tế.

Giữ `REVIEW_NOTES.md` làm nhật ký chi tiết theo tính năng. Đồng thời tổng hợp các phát hiện Human Review đã có bằng chứng vào `ai-gap-analysis/ai-gap-analysis.md`. Mỗi mục tổng hợp phải truy ngược được về test ID, file thay đổi hoặc artifact kiểm chứng; không đánh dấu đã xử lý chỉ dựa trên mô tả dự kiến.
