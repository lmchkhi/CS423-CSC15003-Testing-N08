# Phân tích khoảng trống của AI (GUI Checklist, HW03 Task 1)

12 item dưới đây là do tôi tự thêm sau khi đọc lại kết quả AI sinh ra, không
nằm trong bất kỳ batch nào của AI. Với mỗi item, tôi đối chiếu ngược lại prompt
đã gửi để xác định vì sao AI không đưa ra item đó, và quy về 3 nhóm nguyên
nhân: phạm vi prompt do tôi viết thiếu, đặc thù của một giao diện tiếng Việt,
và giới hạn của chính mô hình.

Tất cả 12 item đều do Hà Bảo Ngọc (23127300) bổ sung.

---

## Nhóm 1: phạm vi prompt tôi viết thiếu (7 item)

### GUI-042, và sau đó lặp lại ở GUI-084, GUI-099, GUI-110: độ tương phản ở dark mode

Đây là gap tôi lặp lại 4 lần, ở cả 4 màn hình, nên tôi gộp chung để nói cho
hết một lần.

Trong prompt IA01 cho màn Product Detail (`reports/ai-audit-report.md` Entry
#1), tôi liệt kê rất cụ thể các khía cạnh muốn AI bao phủ: visual consistency,
alignment, color contrast theo WCAG AA, responsive layout, truncation cho tên
sản phẩm dài, định dạng tiền tệ, loading performance. Tôi không liệt kê dark
mode. AI bám đúng danh sách đó và không thêm gì ngoài danh sách.

Điều đáng nói là tôi lặp lại đúng sai lầm này ở prompt IA01 của Home Page
(GUI-084), rồi Search Results (Entry #13, GUI-099), rồi Empty Search State
(Entry #18, GUI-110). Đến lần thứ tư thì đây không còn là sơ suất ngẫu nhiên
mà là một pattern thật trong cách tôi soạn prompt: mỗi màn hình mới tôi lại
viết prompt IA01 từ đầu, và mỗi lần lại quên đúng một mục.

Điểm quan trọng rút ra không phải là AI kém. AI biết dark mode là gì. Vấn đề
là AI không tự nhớ gap đã phát hiện ở batch trước để bù cho batch sau, nên mỗi
prompt IA01 mới đều phải liệt kê tường minh nếu muốn được bao phủ. Cách khắc
phục cho các màn hình sau là giữ một danh sách kiểm tra cố định cho chính
prompt, thay vì dựa vào trí nhớ.

`references/ia-seed-categories.md` có cảnh báo trước rằng AI hay bỏ sót dark
mode, và tôi vẫn bỏ sót đúng chỗ đã được cảnh báo.

### GUI-043: thao tác ô Số lượng và nút Thêm vào giỏ hàng bằng bàn phím

Prompt IA03 (Entry #3) có yêu cầu kiểm tra keyboard navigation, nhưng tôi giới
hạn phạm vi vào "link điều hướng trên trang (breadcrumb, sản phẩm liên quan)".
Ô nhập Số lượng và nút Thêm vào giỏ hàng thuộc phạm vi IA02, mà prompt IA02
lại chỉ hỏi về validation và labeling, không hỏi gì về bàn phím.

Đây là tác dụng phụ của chính kỹ thuật chia nhỏ prompt theo từng IA mà skill
yêu cầu ở Phase B. Keyboard-only navigation cho các control dạng form rơi vào
đúng khoảng trống giữa hai prompt, và không batch nào của AI bao trùm được
"mọi phần tử tương tác trên trang" theo nghĩa WCAG.

### GUI-046: phản hồi khi mạng chậm lúc bấm Thêm vào giỏ hàng

Prompt IA04 (Entry #4) có item về trường hợp thêm vào giỏ hàng thất bại vì lỗi
mạng hoặc lỗi server. Nhưng "lỗi mạng" ở đây được hiểu là request đã fail hẳn
và có response lỗi. Trường hợp mạng chậm, request vẫn đang chạy và chưa có
response nào, là một kịch bản kiểm thử khác: một cái test giao diện khi đã có
lỗi, một cái test giao diện khi chưa có lỗi nhưng thời gian chờ đã vượt ngưỡng
chấp nhận được. AI không tự tách hai kịch bản này ra khỏi nhau.

### GUI-098: khoảng trắng thừa ở đầu và cuối từ khóa tìm kiếm

Prompt IA02 cho Search Results (Entry #14) chỉ hỏi về đường dẫn xóa bộ lọc và
việc URL có phản ánh từ khóa hay không.

Gap này có nguyên nhân hơi khác các gap trên. Tôi cố tình thu hẹp phạm vi IA02
của Search Results để tránh trùng với các item validate ô tìm kiếm đã có ở Home
Page (GUI-059 đến GUI-066). Nhưng khi vẽ ranh giới giữa hai batch, tôi vẽ hơi
hẹp và để lọt một edge case chưa từng được kiểm tra ở batch nào: liệu khoảng
trắng thừa có bị coi là một chuỗi tìm kiếm khác hay không. Hóa ra là có, và
đây là một bug thật (`BUG-IA02-SEARCHRESULTS-002`).

---

## Nhóm 2: đặc thù của một giao diện tiếng Việt (3 item)

### GUI-045: hiển thị dấu tiếng Việt trong tên, mô tả, danh mục sản phẩm

Không prompt nào trong 4 prompt đầu (Entry #1 đến #4) yêu cầu kiểm tra riêng
việc hiển thị dấu tiếng Việt.

EShop là SUT tiếng Việt nên rủi ro vỡ dấu hoặc mất dấu là rủi ro thật: font
không đủ bộ Unicode tiếng Việt, hoặc sai encoding khi đọc dữ liệu từ CSDL. Đây
không phải vấn đề phổ biến với các SUT tiếng Anh mà AI thường gặp trong dữ liệu
huấn luyện, nên AI không tự nghĩ tới, kể cả khi
`references/ia-seed-categories.md` có liệt kê mục này.

### GUI-085 và GUI-109: từ khóa tìm kiếm có dấu tiếng Việt

Cùng gốc với GUI-045 nhưng ở ngữ cảnh input thay vì hiển thị tĩnh. Prompt IA02
cho Home Page có hỏi về ký tự đặc biệt và an toàn hiển thị từ khóa, tức là góc
độ bảo mật (XSS), nhưng không hỏi về từ khóa có dấu, tức là góc độ encoding.

GUI-109 là lần thứ ba của cùng loại gap này, lần này ở trạng thái 0 kết quả.
`ia-seed-categories.md` liệt kê rủi ro diacritics như một mục chung, không tách
theo từng trạng thái màn hình, nên tôi phải tự bổ sung cho từng ngữ cảnh: hiển
thị tĩnh, tìm kiếm có kết quả, và tìm kiếm không có kết quả.

---

## Nhóm 3: giới hạn của mô hình (2 item)

### GUI-086: trang chủ không cho biết sẽ thêm bao nhiêu đơn vị vào giỏ

Không prompt nào trong 4 prompt IA01 đến IA04 cho Home Page hỏi về chuyện này.
Prompt IA02 chỉ hỏi về ô tìm kiếm, không hỏi về hành vi ngầm của nút "Thêm vào
giỏ" trên từng thẻ sản phẩm.

Nhưng ngay cả khi prompt rộng hơn, tôi cho rằng AI vẫn khó bắt được item này.
Nó chỉ lộ ra khi đặt hai màn hình cạnh nhau và hỏi ngược: nút "Thêm vào giỏ" ở
trang chủ thiếu gì so với trang chi tiết, vốn có hẳn ô Số lượng theo FR-06? AI
trả lời đúng phạm vi từng màn hình được hỏi, không tự bắc cầu so sánh giữa hai
màn hình để phát hiện một khoảng trống thiết kế ngầm. Item này về sau thành
`BUG-IA02-HOMEPAGE-004`.

### GUI-044: hết phiên đăng nhập ngay lúc bấm Thêm vào giỏ hàng

Prompt IA04 (Entry #4) hỏi về phản hồi khi thêm vào giỏ thành công hoặc thất
bại vì lỗi mạng, lỗi server, nhưng không nêu trường hợp cụ thể là token hết
hạn.

Ở đây có cả yếu tố phạm vi prompt lẫn giới hạn mô hình. `sut-requirements.md`
không có FR nào mô tả giao diện phải làm gì khi phiên hết hạn giữa chừng, chỉ
có FR-02 nói chung về JWT. Không có ground truth để bám, AI không tự suy ra
kịch bản này, dù đây là một sub-topic chuẩn trong `ia-seed-categories.md`.
