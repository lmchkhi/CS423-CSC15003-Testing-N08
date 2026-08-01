# Main Report

## Mục lục

- [Thông tin sinh viên](#thông-tin-sinh-viên)
- [Tổng quan](#tổng-quan)
- [Task 1 — GUI Checklist](#task-1--gui-checklist)
- [Task 2 — Usability Evaluation](#task-2--usability-evaluation)
- [Task 3 — Cross-Browser/Cross-Platform](#task-3--cross-browsercross-platform)

## Thông tin sinh viên

| Mục                     | Giá trị                                                                                                                          |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Họ tên sinh viên:**   | Trần Minh Quang                                                                                                                  |
| **MSSV:**               | 23127464                                                                                                                         |
| **Lớp / Khoá:**         | CS423 / CSC13003                                                                                                                 |
| **Mã bài tập :**        | HW03                                                                                                                             |
| **Ngày làm bài:**       | 28-07-2026                                                                                                                       |
| **Công cụ AI đã dùng:** | ChatGPT, Claude , Antigravity                                                                                                    |
| **Repository:**         | [CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08) - Branch: 23127464-GUI-and-Usability-Testing |

---

## Tổng quan

- **SUT:** EShop.
- **Phạm vi được giao:** Cart, Checkout, Coupon, Checkout Success và Admin Coupon Management.
- **Usability flow:** Participant chọn sản phẩm, chuẩn bị và điều chỉnh giỏ hàng, tiếp tục checkout, thử một ưu đãi được kỳ vọng chấp nhận và một ưu đãi được kỳ vọng không chấp nhận, sau đó hoàn tất thanh toán và nhận biết trạng thái xác nhận.
- **Cross-platform:** Chrome/Windows, Firefox/Windows và Safari/macOS, được kiểm thử bằng BrowserStack.

---

## Task 1 — GUI Checklist

### Quy trình thiết kế checklist

AI được sử dụng để sinh 46 item ban đầu, bao phủ bốn nhóm IA-01 đến IA-04. Sau đó, checklist được human review và bổ sung 4 item GUI-047 đến GUI-50.

### Các item Human-added

| ID      | Why AI may have missed it                                                |
| ------- | ------------------------------------------------------------------------ |
| GUI-047 | Hành vi phụ thuộc trạng thái lỗi hiếm gặp với các dòng sản phẩm trùng.   |
| GUI-48 | Sắc thái accessibility của nhiều vùng tương tác gộp trong một màn hình.  |
| GUI-49 | Kỳ vọng ngữ nghĩa giữa nhãn hiển thị và kết quả tính toán có thể mơ hồ.  |
| GUI-50 | Hành vi lưu trạng thái chỉ xuất hiện qua chuyển tiếp refresh giữa chừng. |

### Tóm tắt kết quả thực thi

| Tổng số item | PASSED | FAILED | BLOCKED |
| -----------: | -----: | -----: | ------: |
|           51 |     32 |     16 |       3 |

### 16 item FAILED tại baseline Chrome/Windows

- **GUI-07:** Coupon SAVE10 tăng giá thay vì giảm, sai logic áp dụng, không phải lỗi định dạng. Evidence: [GUI_07_49.png](../evidence/hw03/Chrome/GUI_07_49.png)
- **GUI-15:** Không có dấu `*` hoặc dấu hiệu nào cho trường bắt buộc. Evidence: [GUI_15_16.png](../evidence/hw03/Chrome/GUI_15_16.png)
- **GUI-17:** Ô Tổng tiền thanh toán là input có thể chỉnh sửa trực tiếp bằng bàn phím, không phải trường chỉ đọc như kỳ vọng. Evidence: [GUI_17.png](../evidence/hw03/Chrome/GUI_17.png)
- **GUI-23:** Form tạo coupon không hiển thị ký hiệu `*` cho các trường bắt buộc; các ô nhập chủ yếu chỉ dùng placeholder, không có nhãn văn bản riêng hiển thị cạnh từng control. Evidence: [GUI_23_33_34.png](../evidence/hw03/Chrome/GUI_23_33_34.png)
- **GUI-26:** Không có breadcrumb/navbar/step indicator nào thể hiện Cart là bước hiện tại trước khi chuyển sang Checkout. Evidence: [GUI_26_27_36.png](../evidence/hw03/Chrome/GUI_26_27_36.png)
- **GUI-27:** Luồng Cart → Checkout không có breadcrumb/step indicator nào thể hiện bước hiện tại. Evidence: [GUI_26_27_36.png](../evidence/hw03/Chrome/GUI_26_27_36.png)
- **GUI-33:** Mục “Mã Giảm Giá” được highlight màu xanh và mở đúng màn hình “Quản lý Mã Giảm Giá”; Khi ấn backward thì lại ra trang chủ trình duyệt thay vì tab trước đó. Evidence: [GUI_23_33_34.png](../evidence/hw03/Chrome/GUI_23_33_34.png)
- **GUI-34:** Không có luồng tách biệt xem/tạo/sửa/xóa; toàn bộ gộp trên một màn hình. Evidence: [GUI_23_33_34.png](../evidence/hw03/Chrome/GUI_23_33_34.png)
- **GUI-36:** Xóa sản phẩm không có hộp thoại xác nhận; sản phẩm bị xóa ngay khi bấm. Evidence: [GUI_26_27_36.png](../evidence/hw03/Chrome/GUI_26_27_36.png)
- **GUI-38:** Khi mất kết nối mạng lúc submit, hệ thống hiển thị alert lỗi chung "Lỗi khi thanh toán: Network Error", nút Xác nhận thanh toán bị kẹt ở trạng thái "Đang xử lý..." không rõ có cho phép thử lại hay không. Evidence: [GUI_38_43.png](../evidence/hw03/Chrome/GUI_38_43.png)
- **GUI-43:** Ảnh ghi nhận tại Checkout khi mất mạng: alert “Lỗi khi thanh toán: Network Error”, request checkout ở trạng thái pending và nút hiển thị “Đang xử lý...”; ảnh không hiển thị màn hình Checkout Success hoặc trạng thái tải lại chi tiết xác nhận. Evidence: [GUI_38_43.png](../evidence/hw03/Chrome/GUI_38_43.png)
- **GUI-44:** Khi mạng chậm (Slow 4G), bảng danh sách coupon hiển thị trống hoàn toàn, không có loading indicator nào trong lúc chờ dữ liệu. Evidence: [GUI_44.png](../evidence/hw03/Chrome/GUI_44.png)
- **GUI-46:** Xóa coupon SAVE10 không xuất hiện hộp thoại xác nhận nào; danh sách cập nhật ngay từ 4 xuống 3 dòng. Evidence: [GUI_46.png](../evidence/hw03/Chrome/GUI_46.png)
- **GUI-49:** Nhãn hiển thị “Giảm 10%” đúng, nhưng tổng tiền tăng từ 103.000.000 ₫ lên 1.030.000.000 ₫ nên kết quả cuối cùng không phù hợp. Evidence: [GUI_07_49.png](../evidence/hw03/Chrome/GUI_07_49.png)
- **GUI-50:** Nếu đang trong quá trình nhập mà refresh, UI hiển thị **404: NOT_FOUND**. Evidence: [GUI_50.png](../evidence/hw03/Chrome/GUI_50.png)
- **GUI-51:** Thêm lại sản phẩm tạo dòng trùng thay vì cộng dồn số lượng. Evidence: [GUI_13_14.png](../evidence/hw03/Chrome/GUI_13_14.png)

### 4 bug bổ sung ngoài nhóm FAILED baseline

Bốn bug dưới đây có GitHub Issue và evidence riêng nhưng không làm thay đổi tổng trạng thái checklist `32 PASSED / 16 FAILED / 3 BLOCKED`:

- **GUI-13 — BLOCKED:** Cart không có control tăng/giảm số lượng, nên không thể thực thi kiểm tra giới hạn số lượng. Evidence: [GUI_13_14.png](../evidence/hw03/Chrome/GUI_13_14.png)
- **GUI-14 — BLOCKED:** Không tồn tại control số lượng để kiểm tra focus và thứ tự bàn phím. Evidence: [GUI_13_14.png](../evidence/hw03/Chrome/GUI_13_14.png)
- **GUI-16 — BLOCKED:** Checkout không có trường bắt buộc để thực thi kịch bản submit khi bỏ trống. Evidence: [GUI_15_16.png](../evidence/hw03/Chrome/GUI_15_16.png)
- **GUI-48 — PASSED trong checklist:** Human review ghi nhận item đã thực thi; bug report riêng phản ánh vấn đề thứ tự Tab giữa form và danh sách coupon. Evidence: [GUI_48.png](../evidence/hw03/Chrome/GUI_48.png)

Như vậy, tổng số bug riêng biệt đã báo cáo trên GitHub Issues là **20**: 16 bug thuộc nhóm `FAILED` baseline và 4 bug bổ sung nêu trên.

### Bug đã báo cáo lên GitHub Issues

| ID      | Bug                                                                    | Issue                                                                     |
| ------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| GUI-07  | [BUG][Coupon] SAVE10 làm tăng tổng tiền thay vì giảm                   | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/132) |
| GUI-13  | [BUG][Cart] Không có điều khiển tăng giảm số lượng                     | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/133) |
| GUI-14  | [BUG][Cart] Không thể kiểm tra focus của điều khiển số lượng           | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/134) |
| GUI-15  | [BUG][Checkout] Thiếu dấu hiệu nhận biết trường bắt buộc               | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/135) |
| GUI-16  | [BUG][Checkout] Thiếu trường bắt buộc để kiểm tra submit rỗng          | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/136) |
| GUI-17  | [BUG][Checkout] Tổng tiền thanh toán có thể chỉnh sửa trực tiếp        | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/137) |
| GUI-23  | [BUG][Admin Coupon] Form tạo coupon thiếu nhãn và dấu bắt buộc         | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/138) |
| GUI-26  | [BUG][Cart] Thiếu chỉ báo vị trí hiện tại trước Checkout               | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/139) |
| GUI-27  | [BUG][Checkout] Luồng Cart sang Checkout thiếu step indicator          | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/140) |
| GUI-33  | [BUG][Admin Navigation] Back rời Admin thay vì về tab trước            | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/141) |
| GUI-34  | [BUG][Admin Coupon] Các luồng quản lý coupon bị gộp trên một màn hình  | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/142) |
| GUI-36  | [BUG][Cart] Xóa sản phẩm ngay không có xác nhận                        | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/143) |
| GUI-38  | [BUG][Checkout] Lỗi mạng khiến submit kẹt ở trạng thái xử lý           | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/144) |
| GUI-43  | [BUG][Checkout Success] Không có trạng thái khôi phục rõ khi mất mạng  | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/145) |
| GUI-44  | [BUG][Admin Coupon] Danh sách trống khi tải chậm không có loading      | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/146) |
| GUI-46  | [BUG][Admin Coupon] Xóa coupon không có xác nhận                       | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/147) |
| GUI-48 | [BUG][Admin Coupon] Thứ tự Tab giữa form và danh sách không hợp lý     | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/148) |
| GUI-49 | [BUG][Coupon] Nhãn giảm 10% không khớp tổng tiền cuối                  | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/149) |
| GUI-50 | [BUG][Checkout] Refresh khi đang nhập hiển thị 404 NOT_FOUND           | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/150) |
| GUI-51 | [BUG][Cart] Thêm lại sản phẩm tạo dòng trùng thay vì cộng dồn số lượng | [Issue](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/151) |

---

## Task 2 — Usability Evaluation

### Mục tiêu đánh giá và task scenario

**Objective:** Đánh giá khả năng người dùng quản lý giỏ hàng và hoàn tất mua hàng, đồng thời hiểu tổng tiền, phản hồi coupon và trạng thái xác nhận thanh toán.

#### Mục tiêu đánh giá cụ thể

1. Xác định participant có thể tự thêm sản phẩm, xem lại giỏ, xóa hoặc cập nhật sản phẩm hay không; đồng thời có hiểu đúng số lượng, giá, khoản giảm và tổng tiền cuối cùng hay không.
2. Xác định participant có hiểu phản hồi khi coupon được chấp nhận và bị từ chối, có nhận ra tổng tiền phải trả thay đổi đúng như họ mong đợi hay không, và họ xử lý thế nào khi coupon không hoạt động như kỳ vọng.
3. Xác định participant có thể tự tìm mã coupon hoặc một nguồn mã đáng tin cậy mà không được cung cấp mã trước hay không; ghi nhận việc participant có yêu cầu facilitator cung cấp mã hay không.
4. Xác định participant có thể hoàn tất checkout và thanh toán một cách tự tin, nhận biết giao dịch đã được xác nhận và giải thích được điều họ mong đợi sẽ xảy ra tiếp theo hay không.

**Goal-oriented scenario:**

> Bạn muốn mua một số sản phẩm phù hợp trên EShop. Hãy chọn sản phẩm, chuẩn bị giỏ hàng theo đúng nhu cầu của bạn và điều chỉnh giỏ nếu cần. Sau đó, hãy hoàn tất việc mua hàng. Trong quá trình đó, hãy thử một ưu đãi mà bạn cho rằng có thể được chấp nhận và một ưu đãi mà bạn cho rằng sẽ không được chấp nhận. Hãy nói thành tiếng điều bạn đang tìm kiếm, điều bạn mong đợi và mức độ chắc chắn của bạn khi thực hiện.

Facilitator phải đọc nguyên văn kịch bản. Kịch bản chỉ nêu kết quả cần đạt, không chỉ ra nút, menu, trường nhập, đường điều hướng hay bất kỳ mã coupon nào.

### Participants

**Đường dẫn thực hiện:**[Usability Test](https://testing-23127464.vercel.app/)

| ID  | Participant | Email                       | Thiết bị/browser             | Ngày                  | Completion              |
| --- | ----------- | --------------------------- | ---------------------------- | --------------------- | ----------------------- |
| P01 | Khoa        | vankhoa0506@gmail.com       | Máy tính, Windows 10, Chrome | 23h46 ngày 24/07/2026 | Hoàn thành có can thiệp |
| P02 | Huy         | Vumanhhuy111975@gmail.com   | Laptop, Windows 11, Edge     | 22h23 ngày 25/07/2026 | Hoàn thành có can thiệp |
| P03 | Phong       | ltphong23@clc.fitus.edu.vn  | Laptop, Linux, Firefox       | 22h45 ngày 25/07/2026 | Hoàn thành có can thiệp |
| P04 | Minh        | pvminh23@clc.fitus.edu.vn   | Laptop, Windows 10, Chrome   | 10h01 ngày 26/07/2026 | Hoàn thành có can thiệp |
| P05 | Duyên       | mtkduyen23@clc.fitus.edu.vn | Laptop, Linux, Chrome        | 22h20 ngày 26/07/2026 | Hoàn thành có can thiệp |
| P06 | Nhật        | lnnhat23@clc.fitus.edu.vn   | Laptop, Windows, Edge        | 22h56 ngày 26/07/2026 | Hoàn thành có can thiệp |
| P07 | Owen        | ntowen23@clc.fitus.edu.vn   | Laptop, Windows, Chrome      | 00h14 ngày 27/07/2026 | Hoàn thành có can thiệp |

### Kết quả SUS

| Participant | SUS raw score |
| ----------- | ------------: |
| P01         |            95 |
| P02         |            90 |
| P03         |          67.5 |
| P04         |          92.5 |
| P05         |            75 |
| P06         |          92.5 |
| P07         |            45 |

|   n |  Mean | Median | Range              |
| --: | ----: | -----: | ------------------ |
|   7 | 79.64 |     90 | 45–95 (độ rộng 50) |

### Severity-ranked findings

#### (a) Bug kỹ thuật trùng khớp Task 1

| Rank | Finding                                                               | Evidence                                                                                                  | Impact                                                                                                              | Frequency                                            | Persistence                                         | Severity | Recommendation                                                                 |
| ---: | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
|    1 | **GUI-07/GUI-49:** SAVE10 tính sai, làm tổng tiền tăng thay vì giảm. | P02, P05 và P07 tự phát hiện; P06 nhận thấy điểm kỳ lạ nhưng không nêu đủ cụ thể để xác nhận cùng vấn đề. | Sai giá trị thanh toán và làm giảm niềm tin vào coupon/tổng tiền.                                                   | 3/7 xác nhận; 1/7 nghi ngờ nhưng chưa đủ bằng chứng. | Tái diễn ở nhiều phiên khi dùng SAVE10.             | Critical | Sửa công thức SAVE10 và kiểm thử lại tổng tiền trước/sau áp mã.                |
|    2 | **GUI-17:** tổng tiền tại checkout có thể chỉnh sửa trực tiếp.        | P02, P06 và P07 tự phát hiện ngẫu nhiên trong lúc thao tác.                                               | Người dùng có thể thay đổi giá trị đơn hàng; ảnh hưởng nghiêm trọng đến tính toàn vẹn và độ tin cậy của thanh toán. | 3/7.                                                 | Xuất hiện tại checkout trong cả ba phiên phát hiện. | Critical | Chuyển tổng tiền thành giá trị chỉ đọc và tính lại phía hệ thống khi xác nhận. |
|    6 | **GUI-13/GUI-14:** Cart thiếu control tăng/giảm số lượng.             | P07 không thể tăng số lượng trong Cart và cần facilitator chỉ sang trang chi tiết.                        | Cản trở điều chỉnh giỏ tại đúng ngữ cảnh, buộc người dùng rời Cart.                                                 | 1/7.                                                 | Tồn tại trong luồng Cart của phiên P07.             | Medium   | Bổ sung control số lượng tại Cart với phản hồi cập nhật tổng tiền.             |
|    7 | **GUI-36:** xóa sản phẩm không có bước xác nhận.                      | P04 quan sát sản phẩm bị xóa ngay lập tức khi bấm.                                                        | Tăng nguy cơ xóa nhầm và mất công khôi phục lựa chọn.                                                               | 1/7.                                                 | Quan sát tại thao tác xóa trong Cart.               | Medium   | Thêm xác nhận hoặc cơ chế Undo sau khi xóa.                                    |

#### (b) Bug mới chỉ phát hiện qua usability

| Rank | Finding                                                     | Evidence                                                                                                                          | Impact                                                                             | Frequency | Persistence                                        | Severity | Recommendation                                                                                       |
| ---: | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------- | -------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
|    4 | **Thiếu phản hồi thêm giỏ hàng/phải ấn 2 lần.**             | P03 gặp ở trang chi tiết và trang chủ; P05 phải bấm lần hai; P06 phải hỏi và được gợi ý kiểm tra; P07 được hướng dẫn bấm hai lần. | Gây không chắc chắn, thao tác lặp, tự kiểm tra giỏ và tăng nhu cầu hỗ trợ.         | 4/7.      | Lặp lại ở nhiều điểm thêm sản phẩm và nhiều phiên. | High     | Cung cấp phản hồi xác nhận ngay sau một lần thêm và bảo đảm một thao tác được ghi nhận đúng một lần. |
|    5 | **Số lượng âm được chấp nhận tại trang chi tiết sản phẩm.** | P05 nhập số lượng âm; hệ thống vẫn nhận và thêm vào giỏ.                                                                          | Cho phép trạng thái đơn hàng không hợp lệ, có thể ảnh hưởng số lượng và tính tiền. | 1/7.      | Quan sát được tại product detail trong phiên P05.  | High     | Chặn số lượng nhỏ hơn 1 và hiển thị validation rõ ràng trước khi thêm giỏ.                           |

#### (c) Finding discoverability coupon

| Rank | Finding                                                                                                    | Evidence                                                                                                                                   | Impact                                                                             | Frequency | Persistence                                        | Severity | Recommendation                                                                                    |
| ---: | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | --------- | -------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
|    3 | **Coupon discoverability:** người dùng không tìm được mã hợp lệ trên UI và phải đoán hoặc hỏi facilitator. | P01 đoán rồi hỏi; P02 đoán rồi hỏi; P03 đoán rồi hỏi; P04 đoán rồi hỏi; P05 hỏi từ trước khi thao tác; P06 đoán rồi hỏi; P07 hỏi nguồn mã. | Chặn việc hoàn thành bước coupon độc lập, gây do dự và buộc facilitator can thiệp. | **7/7.**  | Xuất hiện ở mọi phiên và xuyên suốt bước checkout. | High     | Hiển thị nơi tìm coupon/danh sách mã còn hiệu lực và điều kiện áp dụng ngay trong luồng checkout. |

---

## Task 3 — Cross-Browser/Cross-Platform

### Các platform đã kiểm thử

| Platform   | Trình duyệt / hệ điều hành | Công cụ      |
| ---------- | -------------------------- | ------------ |
| Platform 1 | Chrome / Windows           | BrowserStack |
| Platform 2 | Firefox / Windows          | BrowserStack |
| Platform 3 | Safari / macOS             | BrowserStack |

Platform 1 là bản chạy gốc từ Task 1, được copy lại theo đúng hướng dẫn của giảng viên.

### Tóm tắt so sánh chéo

Chỉ các dòng có khác biệt trạng thái thực tế trong bảng so sánh được liệt kê dưới đây:

| ID     | Platform 1 (Chrome) | Platform 2 (Firefox) | Platform 3 (Safari) | Nhận xét khác biệt                                                                                      |
| ------ | ------------------- | -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------- |
| GUI-38 | FAILED              | FAILED               | BLOCKED             | Blocked trên Safari do giới hạn công cụ chỉnh sửa băng thông mạng, không phải do khác biệt hành vi SUT. |
| GUI-43 | FAILED              | FAILED               | BLOCKED             | Blocked trên Safari do giới hạn công cụ chỉnh sửa băng thông mạng, không phải do khác biệt hành vi SUT. |
| GUI-44 | FAILED              | FAILED               | BLOCKED             | Blocked trên Safari do giới hạn công cụ chỉnh sửa băng thông mạng, không phải do khác biệt hành vi SUT. |

Ba trạng thái BLOCKED trên Safari xuất phát từ giới hạn công cụ DevTools khi chỉnh sửa băng thông mạng, không phải khác biệt hành vi của SUT.
