# AI Critique

Về bề ngoài kết quả đạt được của AI ở các lần sử dụng nhìn khá tốt. Nhưng về chi tiết thì kết quả tạo ra cần phải kiểm tra lại gần như tất cả để chắc được kết quả thu được là hợp lệ. Một số vấn đề có thể kể đến như:

- Sử dụng sai đường dẫn khi tạo ra các bug report, dẫn đến việc không thể hiện được các ảnh cần thiết / sử dụng sai sản phẩm.

- Một số test case tạo ra còn thiếu sót khá nhiều về mặt hình thức như là không có môi trường kiểm thử, dữ liệu kiểm thử, điều kiện tiên quyết. Tuy nhiên đây có thể lúc là do người viết yêu cầu chưa tốt, chưa nêu rõ các yêu cầu về mặt hình thức.

- Đôi khi AI không thể thống nhất được một cấu trúc chung khi tạo bug report, dẫn đến các bug ban đầu có cấu trúc tốt nhưng khi đến nửa còn lại thì cấu trúc lại bị thay đổi.

Về mặt sử dụng AI để tạo ra SKILL.md thì AI làm phần lớn tốt công việc đó nhưng lại mắc vấn đề ở chỗ là tạo file mẫu không giống như đã yêu cầu. AI có thêm một số tính năng không thật sự cần thiết vào skill và ghi khá gắt gao (tuy không phải là điều xấu nhưng có thể khi sử dụng đánh dấu gắt các lỗi thật sự không quan trọng / không cần thiết phải sửa - tốn tài nguyên token).

Nói chung, AI cần phải được hướng dẫn rất kỹ lưỡng mới tạo ra được kết quả tốt. Nếu không thì kết quả thường sẽ không được như mong đợi và cần chỉnh sửa rất nhiều.
