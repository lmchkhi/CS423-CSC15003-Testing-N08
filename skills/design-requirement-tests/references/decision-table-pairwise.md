# Decision Table và Pairwise: tiêu chuẩn thiết kế

## 1. Ký hiệu Decision Table

| Ký hiệu | Ý nghĩa |
|---|---|
| `T` / `F` | Điều kiện Boolean đúng / sai |
| Giá trị hoặc lớp giá trị | Điều kiện nhiều mức, ví dụ `0`, `1–2`, `>=3` |
| `—` | Don't care: giá trị không ảnh hưởng hành động của rule đó |
| `X` | Hành động xảy ra |
| Trống | Hành động không xảy ra |
| `N/A` | Tổ hợp không khả thi; phải kèm lý do |

Mỗi cột rule phải biểu diễn một tổ hợp điều kiện khả thi và một vector hành động xác định. Nếu cùng một tổ hợp dẫn đến nhiều kết quả mâu thuẫn, requirement đang mơ hồ hoặc thiếu điều kiện.

## 2. Quy trình lập bảng

1. Tách requirement thành atomic rules.
2. Liệt kê điều kiện và các lớp tương đương có ý nghĩa nghiệp vụ.
3. Liệt kê hành động quan sát được và side effect cần kiểm chứng.
4. Ghi constraint giữa các điều kiện.
5. Sinh các tổ hợp khả thi; không đếm tổ hợp bất khả thi vào độ bao phủ.
6. Gán ID ổn định cho rule.
7. Lập ma trận truy vết `Atomic rule → Decision rule → Test case`.

Với ngưỡng, thêm các điểm `n-1`, `n`, `n+1` khi chúng có hành vi khác nhau. Với bộ đếm hoặc khóa tạm thời, cần xét lịch sử sự kiện, thời điểm ngay trước/đúng/ngay sau mốc và hành vi reset nếu requirement có nêu.

## 3. Rút gọn Decision Table

Chỉ gộp hai rule khi:

- vector hành động giống nhau hoàn toàn;
- chúng chỉ khác ở một điều kiện;
- điều kiện khác biệt không ảnh hưởng bất kỳ expected result hoặc side effect nào;
- việc thay điều kiện đó bằng `—` không bao phủ nhầm một tổ hợp có hành vi khác.

Ghi rõ `R1 + R2 → R1'` và lý do. Không gộp chỉ vì thông báo lỗi nhìn giống nhau nếu counter, trạng thái, timer, token, log, quyền truy cập hoặc dữ liệu lưu trữ khác nhau.

## 4. Ranh giới áp dụng Pairwise

Pairwise bảo đảm mỗi cặp mức của hai factor xuất hiện ít nhất một lần trong tập test, sau khi xét constraint. Pairwise không tự bảo đảm:

- mọi business rule;
- tương tác ba chiều trở lên;
- các ngưỡng và giá trị sát biên;
- thứ tự sự kiện, số lần lặp, reset hoặc timeout;
- state transition;
- invariant bảo mật và phân quyền;
- side effect nội bộ cần quan sát riêng.

Do đó, dùng mô hình lai:

```text
Final suite = Mandatory decision/boundary/state/security tests
            ∪ Pairwise tests cho factor space độc lập còn lại
            − Exact duplicates
```

Pairwise phù hợp nhất với các biến thể tương đối độc lập như browser, role hợp lệ, loại thiết bị, locale, phương thức nhập hoặc cấu hình hiển thị. Nó thường không phù hợp để thay thế bảng quyết định của một chuỗi khóa tài khoản, state machine hoặc ma trận authorization.

## 5. Bằng chứng Pairwise tối thiểu

Khi áp dụng Pairwise, tài liệu phân tích phải có:

1. Bảng factor và level.
2. Constraint và tổ hợp không hợp lệ.
3. Danh sách test bắt buộc bị loại khỏi phạm vi Pairwise.
4. Tập tổ hợp Pairwise cuối cùng.
5. Ma trận hoặc danh sách xác nhận mọi cặp hợp lệ đã được cover.
6. Công thức số lượng:

```text
Exhaustive feasible combinations = E
Mandatory tests = M
Pairwise-generated tests = P
Exact overlap/deduplicated tests = D
Final unique tests = M + P - D
Reduction = (E - Final) / E × 100%   # chỉ khi cùng một phạm vi so sánh
```

Không tính reduction percentage nếu `E` và `Final` không cùng phạm vi hoặc nếu exhaustive baseline không xác định đáng tin cậy.

## 6. Tiêu chí hoàn tất

- Coverage của requirement đạt 100% theo ma trận truy vết, hoặc gap được ghi rõ.
- Coverage của retained decision rules đạt 100%.
- Coverage của mọi cặp hợp lệ đạt 100% nếu tuyên bố đã dùng Pairwise.
- Không xóa test bắt buộc chỉ để làm số lượng đẹp hơn.

## 7. Ranh giới black-box

- Chỉ suy ra điều kiện, hành động và expected result từ requirement do người dùng cung cấp.
- Chỉ kiểm tra đầu vào và đầu ra quan sát được qua UI hoặc public interface.
- Có thể dùng Browser Developer Tools để quan sát DOM, request/response, header và client storage; không dùng source code làm oracle.
- Không yêu cầu đọc database, server log, biến nội bộ hoặc test hook.
- Với counter hoặc state nội bộ, kiểm tra gián tiếp qua ngưỡng và chuỗi hành vi rồi ghi rõ giới hạn quan sát.
- Không đưa endpoint, status code, storage key hay cấu trúc response vào test nếu requirement không quy định.
