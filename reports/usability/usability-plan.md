# Task 2 - Usability Evaluation Plan

## Flow

Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User.

## Objectives

1. Đánh giá liệu người dùng có hiểu được luồng quản trị chính từ đăng nhập đến các màn hình Dashboard, Category, Product, CSV Import và User Management mà không cần hướng dẫn từng bước hay không.
2. Xác định các điểm gây chậm, nhầm lẫn hoặc cần trợ giúp trong những thao tác admin quan trọng: tạo danh mục, tạo/sửa/xóa sản phẩm, import CSV và kiểm tra/xóa người dùng.
3. Đo mức độ tự tin và cảm nhận kiểm soát của người dùng khi thực hiện các thao tác có rủi ro cao như xóa sản phẩm/người dùng hoặc import dữ liệu hàng loạt.
4. Thu thập phản hồi về clarity, error recovery, speed và trust để phân biệt genuine bugs với vấn đề thiết kế/usability mang tính hệ thống.

## Target User Profile

Người tham gia nên đại diện cho người dùng có thể vận hành trang quản trị EShop ở mức cơ bản: biết sử dụng website, form, bảng dữ liệu và upload file, nhưng không nhất thiết là developer hoặc tester. Participant phải là người thật, không phải sinh viên đang làm HW03 trong lớp, và có contact verifiable được mask middle four digits trong bảng participant.

## Test Environment

- Web Admin URL: `http://localhost:5174/`
- Backend URL: `http://localhost:3000`
- Browser/device: ghi lại theo từng session.
- Test admin account: `admin@eshop.com` / `Admin123!`
- Evidence: screen recording hoặc screenshot/session notes, lưu path vào từng session.

## Task Scenario For Participants

```text
Bạn đang đóng vai nhân viên quản trị của một cửa hàng EShop. Cửa hàng vừa có một nhóm sản phẩm mới cần được chuẩn bị trước khi mở bán. Hãy đăng nhập vào trang quản trị, kiểm tra nhanh thông tin tổng quan trên Dashboard, tạo một danh mục phù hợp cho nhóm sản phẩm mới, thêm một sản phẩm vào danh mục vừa tạo, chỉnh sửa lại thông tin sản phẩm đó, xóa sản phẩm thử nghiệm sau khi kiểm tra, import thêm danh sách sản phẩm từ file CSV được cung cấp, sau đó kiểm tra danh sách người dùng và xóa một tài khoản thử nghiệm nếu bạn cho rằng tài khoản đó không còn cần thiết.
Trong khi thực hiện, hãy nói to suy nghĩ của bạn: điều gì dễ hiểu, điều gì làm bạn phân vân, chỗ nào bạn không chắc thao tác đã thành công hay chưa. Đây là buổi đánh giá sản phẩm, không phải đánh giá năng lực của bạn.
```

## Moderator Setup Notes

- Chuẩn bị dữ liệu test trước session: ít nhất một user test có thể xóa an toàn, một danh mục/sản phẩm thử nghiệm nếu cần cleanup, và file CSV `reports/usability/admin-import-products-task.csv`.
- Trước mỗi session, xác nhận `category_id` trong CSV mẫu đang trỏ tới một danh mục test hợp lệ để participant không bị chặn bởi lỗi dữ liệu setup.
- Không hướng dẫn participant bấm nút nào trước. Chỉ nhắc lại goal nếu participant quên nhiệm vụ.
- Chỉ can thiệp nếu participant bị kẹt hoàn toàn hoặc thao tác có thể phá dữ liệu không thể khôi phục.
- Ghi rõ mọi hint/assist vào session notes.
- Sau task, yêu cầu participant điền SUS rồi hỏi probe questions.

## Success Criteria

- Participant đăng nhập được bằng tài khoản admin.
- Participant tìm được Dashboard và hiểu ít nhất các chỉ số tổng quan chính.
- Participant tạo được category mới hoặc hiểu rõ lý do không tạo được.
- Participant tạo, chỉnh sửa và xóa được một product thử nghiệm hoặc nhận ra lỗi cản trở thao tác.
- Participant import được CSV hoặc hiểu rõ lỗi/feedback từ UI khi import.
- Participant inspect được user list và xử lý thao tác xóa user test một cách có kiểm soát.

## SUS Instrument

Scale dùng trong study: SUS, gồm 10 câu, trả lời sau mỗi session bằng thang 1-5.

- 1 = Strongly disagree
- 2 = Disagree
- 3 = Neutral
- 4 = Agree
- 5 = Strongly agree

Chi tiết form nằm ở `reports/usability/sus-questionnaire.md`. Raw responses nhập vào `reports/usability/sus-responses.csv`.

## Open-Ended Probe Questions

1. Clarity: Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất?
2. Error recovery: Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không?
3. Speed: Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất?
4. Trust: Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng?
5. Navigation: Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không?
6. Risk perception: Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không?

## Pilot Plan

- Chạy 1 pilot session với một người không nằm trong 7 participant chính nếu có thể.
- Mục tiêu pilot: kiểm tra scenario có quá dài/khó hiểu không, file CSV có dùng được không, dữ liệu test có đủ an toàn không, và form SUS/session notes có dễ ghi nhận không.
- Sau pilot, ghi lại refinement trong `reports/usability/session-notes.md` hoặc cập nhật lại plan này.
