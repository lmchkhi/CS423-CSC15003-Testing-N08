# Bảng Câu Hỏi SUS

## Hướng Dẫn

Sau khi hoàn thành kịch bản nhiệm vụ, người tham gia trả lời 10 câu dưới đây theo thang 1-5:

- 1 = Hoàn toàn không đồng ý
- 2 = Không đồng ý
- 3 = Trung lập
- 4 = Đồng ý
- 5 = Hoàn toàn đồng ý

## Câu Hỏi

| ID | Phát biểu | Điểm 1-5 |
| --- | --- | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. |  |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. |  |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. |  |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. |  |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. |  |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. |  |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. |  |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. |  |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. |  |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. |  |

## Cách Tính Điểm

- Các câu lẻ Q1, Q3, Q5, Q7, Q9: điểm đóng góp = điểm trả lời - 1.
- Các câu chẵn Q2, Q4, Q6, Q8, Q10: điểm đóng góp = 5 - điểm trả lời.
- Điểm SUS = tổng điểm đóng góp * 2.5.

Dùng lệnh:

```bash
python3 skills/run-usability-evaluation-eshop/scripts/score_usability.py sus reports/usability/sus-responses.csv
```
