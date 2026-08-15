# AI Critique HW05

Trong bài HW05, AI hỗ trợ em đọc đề, thiết kế JMeter plan, tạo skill/workflow, sinh script tạo account và phân tích kết quả Load, Stress, Spike, Endurance. Điểm hữu ích nhất là AI giúp chuẩn hóa quy trình: luôn dùng JMeter CLI, đặt tên artifact thống nhất, tách register khỏi measured workflow, và nhắc kiểm tra p95, p99, throughput, error rate thay vì chỉ nhìn average.

Tuy nhiên AI cũng có những điểm sai hoặc chưa đủ thận trọng. Ban đầu AI có xu hướng suy luận quá rộng từ dữ liệu local, ví dụ dễ diễn giải “Stress chưa tìm thấy điểm gãy” thành “hệ thống không có vấn đề hiệu năng”, hoặc xem throughput Spike hơn 10k RPS như bằng chứng production capacity. Đây là kết luận thiếu ngữ cảnh vì bài chạy trên máy local, dataset nhỏ, network local và SQLite/demo data. AI cũng có thể đề xuất tối ưu như caching, clustering hoặc SQLite WAL khi chưa có profiling chứng minh bottleneck thật. Nếu không review, các đề xuất đó dễ trở thành hallucinated recommendation.

Lý do AI không tự phát hiện đầy đủ là vì nó không trực tiếp hiểu trạng thái runtime, database, tài nguyên máy và giới hạn môi trường bằng con người đang quan sát. Nguyên tắc em rút ra là: dùng AI như trợ lý có kỷ luật, không dùng như nguồn kết luận cuối cùng. Mọi nhận xét phải đối chiếu với raw `.jtl`, summary CSV, HTML dashboard và screenshot resource monitor. Khi AI đưa ra kết luận, em cần hỏi lại: số liệu nào chứng minh điều này, phạm vi kết luận là gì, và có đang nhầm lỗi setup/test data thành lỗi SUT không.

