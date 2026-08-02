# BUG-IA03-PRODUCTDETAIL-002: [ĐÃ RÚT LẠI] Bấm Back từ trang chi tiết làm mất vị trí cuộn của trang danh sách khi danh sách sản phẩm tải chậm

> **Trạng thái: RÚT LẠI (Withdrawn / Not reproducible) — 02/08/2026.**
> Bug này do chính tôi rút lại sau khi tự đo lại, không phải do người khác báo
> sai. GitHub issue #99 đã đóng kèm lý do. Item checklist tương ứng (GUI-027)
> đã chuyển từ Failed sang Passed. Nội dung gốc được giữ nguyên bên dưới để
> đối chiếu, không xóa.

## Lý do rút lại

Khi quay lại chụp ảnh bằng chứng cho GUI-027 (item Failed duy nhất còn thiếu
screenshot), tôi đo lại bằng bộ lấy mẫu `scrollY` + số thẻ sản phẩm mỗi 200ms,
qua **2 lượt chạy độc lập** với **2 mức trễ mạng** đặt trên `/api/products`
(2500ms và 6000ms), trên cùng build `85af3ba`:

```
scrollY trước khi rời trang = 1359

  4915ms   cards=0   scrollY=523     <- trình duyệt kẹp cuộn khi trang còn rỗng
 10514ms   cards=0   scrollY=523        (đúng như quan sát ban đầu)
 11314ms   cards=5   scrollY=1339    <- lưới render xong, Chrome KHÔI PHỤC LẠI
 26515ms   cards=5   scrollY=1339    <- giữ nguyên tới hết 26 giây theo dõi
```

Tập giá trị `scrollY` đo được sau khi lưới render đủ 5 sản phẩm chỉ có **duy
nhất một phần tử: 1339** (so với 1359 trước khi rời trang). Không lần nào bằng
0. Kết luận "mất vị trí cuộn" do đó không tái hiện được.

Điều tôi quan sát sai ban đầu: Chrome **có** kẹp vị trí cuộn về mức tối đa của
trang rỗng trong lúc chờ dữ liệu (nửa đầu của mô tả gốc là đúng), nhưng sau đó
nó chạy thêm một lượt khôi phục nữa khi chiều cao trang ổn định. Phép đo gốc
dừng ở mốc 3500ms nên không bắt được lượt khôi phục thứ hai này.

**Một khác biệt cần ghi nhận trung thực**: lượt đo gốc chạy trên cửa sổ chỉ có
**53px** khoảng cuộn, lượt đo lại có **1359px**. Tôi không loại trừ khả năng
hành vi khác đi ở khoảng cuộn rất nhỏ. Nhưng ngay cả khi đúng như vậy thì mức
ảnh hưởng tới người dùng là 53px, không tương ứng với mô tả "quay lại đầu trang
thay vì hàng sản phẩm thứ 2" trong Expected/Actual gốc. Phát hiện này ở mức tốt
nhất cũng không đủ vững để giữ lại, nên tôi rút thay vì hạ severity.

Quá trình đo lại ghi đầy đủ ở Entry #28 của `reports/ai-audit-report.md`.

---

# Nội dung gốc (giữ nguyên để đối chiếu)

## Found by Test Case
GUI-027

## Requirement liên quan
IA03 chuẩn (giữ trạng thái điều hướng khi quay lại)

## Severity / Priority
Minor / P3

## Environment
**Browser/Device**: Chrome (desktop)
**OS**: macOS
**URL**: http://localhost:5173/ → /product/5 → Back
**Build/commit**: eshop-sut @ 85af3ba

**Điều kiện tái hiện**: lỗi chỉ xuất hiện khi lệnh gọi lấy danh sách sản phẩm
trả về chậm hơn thời điểm trình duyệt khôi phục vị trí cuộn. Trên localhost
tải nhanh, vị trí cuộn được khôi phục đúng và lỗi **không** tái hiện. Đo bằng
cách làm chậm phản hồi của `/api/products` khoảng 1,5 giây, tương đương điều
kiện mạng chậm của người dùng thật (cùng kỹ thuật mô phỏng mạng đã dùng ở
GUI-079).

## Steps to reproduce
1. Mở DevTools, tab Network, đặt throttling ở mức "Slow 3G".
2. Thu nhỏ cửa sổ trình duyệt để trang chủ có thể cuộn được một đoạn đáng kể.
3. Vào trang chủ, cuộn xuống tới hàng sản phẩm thứ 2 (AirPods Pro 2, Keychron Q1).
4. Bấm "Xem chi tiết" của một sản phẩm bất kỳ ở hàng dưới.
5. Bấm nút Back của trình duyệt và chờ cho tới khi đủ 5 sản phẩm hiện lại.

## Expected result
Sau khi danh sách sản phẩm render xong, trang quay lại đúng vị trí cuộn trước
khi rời đi (hàng sản phẩm thứ 2).

## Actual result
Trang quay lại đúng nội dung nhưng nằm ở đầu trang. Trình duyệt cố khôi phục
vị trí cuộn lúc trang còn rỗng, chiều cao trang lúc đó bằng 0 nên vị trí bị
kẹp về 0; khi dữ liệu về và trang cao trở lại thì vị trí cuộn không được khôi
phục lần nữa.

Đo cụ thể: cuộn tới `scrollY = 53` trước khi rời trang, sau khi Back thì
`scrollY = 0` ở mọi mốc đo (200ms, 800ms, 1700ms, 2600ms, 3500ms), kể cả sau
khi lưới đã render đủ 5 sản phẩm ở mốc 1700ms. Khi không làm chậm mạng, cùng
thao tác cho `scrollY = 53` (khôi phục đúng), xác nhận đây là lỗi phụ thuộc
thời điểm chứ không phải lỗi xảy ra mọi lúc.

## Evidence
Không có ảnh bằng chứng: lượt đo lại cho thấy vị trí cuộn được khôi phục đúng,
nên không có trạng thái lỗi nào để chụp.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/99 (đã đóng, kèm lý do rút lại)
