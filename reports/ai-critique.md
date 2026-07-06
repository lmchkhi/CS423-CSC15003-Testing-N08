# AI Critique

Trong quá trình làm bài, AI đã giúp em tiết kiệm khá nhiều thời gian từ việc phân tích đến thiết kế test case. Tuy nhiên, em cũng gặp không ít lần phải sửa lại kết quả của nó.

Cụ thể, khi phân tích BVA, AI hay tự thêm vào các giá trị biên mà yêu cầu không hề đề cập. Có lẽ vì nó muốn "cho chắc", nhưng điều đó lại làm biên đó bị dư thừa. Một lần khác, em nhờ nó cập nhật các test case bị ảnh hưởng bởi một bug, nhưng nó chỉ sửa những cái một số bị failed bởi bug đó thành Failed, còn các test case bị blocked bởi bug đó thì lại bị bỏ qua, dù thực ra cũng cần cập nhật. Ngoài ra, có một lần nó dùng nhầm URL của end user khi viết test cho chức năng admin, có lẽ nó không nắm được context của môi trường test.

Lý do chung theo em là AI không thực sự hiểu toàn bộ ngữ cảnh, nó chỉ xử lý đúng những gì em nói trong lời nhắc, còn những thứ ngầm hiểu thì thường bị bỏ sót.
Qua bài tập này, em học được rằng AI rất hữu ích để tăng tốc công việc, nhưng không thể giao phó hoàn toàn. Người dùng vẫn phải tự review và chịu trách nhiệm với kết quả cuối cùng, đặc biệt với những chi tiết nhỏ nhưng quan trọng.