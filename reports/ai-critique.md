# AI Critique (200–300 từ)

Lỗi lặp lại nhiều nhất của AI trong HW04 không nằm ở cú pháp Playwright mà ở
việc nó tin vào một giao diện *hợp lý* thay vì giao diện *thật*. Bản nháp
FR-10, viết trước khi có quyền truy cập build đang chạy, giả định admin đổi
trạng thái bằng dropdown và app điều hướng theo URL — cả hai đều sai, theo
cách nguy hiểm nhất: không crash, chỉ âm thầm thao tác nhầm màn hình
(Entry #11–12). Đây là một thiên lệch có tên gọi: AI suy luận tốt trên dữ
liệu đã quan sát nhưng không tự nhận ra khi nó chưa quan sát gì, và không tự
dừng lại để nói "tôi đang đoán".

Trường hợp nặng nhất là Entry #17: nhánh kiểm tra FR-12 của FR-13 gọi nhầm
`seedUserToken` thay vì `seedAdminToken`, khiến case pass sai lý do — không
hề chạm tới bề mặt cần kiểm tra. AI không tự bắt được lỗi này bằng cách đọc
lại code; nó chỉ lộ ra khi kết quả pass bị đối chiếu với một phát hiện recon
độc lập đã ghi trước đó. Tương tự ở Entry #15: log "verbatim" của chính AI
thực chất là tóm tắt viết lại — cả hai lần chỉ sửa được nhờ một nguồn đối
chiếu độc lập, chưa lần nào AI tự phát hiện một mình.

Nguyên tắc rút ra: đừng đánh giá output AI bằng việc nó chạy được hay không,
mà bằng việc nó *kiểm chứng chéo* được không — với DOM thật, API thật, hoặc
một quan sát độc lập đã ghi lại trước đó. 6/18 entry trong audit report dừng
ở `INCOMPLETE` thay vì `VALID` vì áp dụng nguyên tắc đó nhất quán, không
rubber-stamp chỉ vì output "chạy được".
