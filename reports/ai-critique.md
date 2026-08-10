# AI Critique (200–300 từ)

Lỗi lặp lại nhiều nhất của AI trong HW04 không nằm ở cú pháp Playwright mà ở
việc nó tin vào một giao diện *hợp lý* thay vì giao diện *thật*. Bản nháp
FR-10, viết trước khi truy cập được build thật, giả định admin đổi trạng thái
bằng dropdown và app điều hướng theo URL. Cả hai sai theo cách nguy hiểm nhất:
không crash, chỉ âm thầm thao tác nhầm màn hình (Entry #11–12). AI suy luận
tốt trên dữ liệu đã quan sát nhưng không nhận ra khi nó chưa quan sát gì.

Nặng nhất là Entry #17: nhánh FR-12 của FR-13 gọi nhầm `seedUserToken` thay
vì `seedAdminToken`, khiến case pass sai lý do, không chạm tới bề mặt cần
kiểm. Lỗi chỉ lộ khi đối chiếu kết quả pass với một phát hiện recon độc lập,
không phải nhờ đọc lại code — giống Entry #15, nơi log "verbatim" của chính
AI hoá ra là tóm tắt viết lại.

Entry #22 bổ sung một vế: một phát hiện đúng cũng không tự lan sang phần còn
lại. Lỗi "khai báo trường dữ liệu rồi không đọc tới" đã được sửa ở FR-02
(Entry #20), nhưng trường `auth` của FR-13 mắc đúng lỗi ấy vẫn sống sót, vì
không lượt nào hỏi "hai feature còn lại có cùng bệnh không".

Nguyên tắc rút ra: đừng đánh giá output AI bằng việc nó chạy được, mà bằng
việc nó *kiểm chứng chéo* được không — với DOM thật, API thật, hoặc một quan
sát độc lập ghi trước đó — và mỗi khi bắt được một lỗi, phải hỏi lỗi ấy còn ở
đâu. 12/25 entry trong audit report dừng ở `INCOMPLETE` thay vì `VALID` chính
vì nguyên tắc đó.
