# Kịch bản Video Demo — HW06 API Testing (§7)

> **Sinh viên:** Hà Bảo Ngọc – 23127300 · Nhóm N08
> **Mục tiêu video:** Demo Agent Skill `api-test-generator` sinh test case tự động cho
> một API của SUT (chọn **FR-14 categories CRUD** làm ví dụ end-to-end), rồi chạy suite
> bằng Newman để chứng minh case là thật và chạy được.
> **Thời lượng mục tiêu:** 5–7 phút · **Ngôn ngữ:** Tiếng Việt · **Độ phân giải:** ≥1080p, có thu tiếng.

## Chuẩn bị trước khi quay (không nằm trong video)

1. Boot SUT sạch: `bash api/scripts/boot-sut.sh` — chờ dòng `SUT ready`.
2. Mở sẵn 3 cửa sổ: (a) editor tại thư mục repo, (b) terminal, (c) trình duyệt tab GitHub Issues + Actions.
3. Kiểm tra `newman --version` chạy được.
4. Xoá màn hình terminal, phóng to cỡ chữ ≥16pt cho dễ đọc.
5. Chuẩn bị lời mở đầu: đọc tên, MSSV, nhóm, 3 API được phân công.

---

## Phân cảnh

| # | Thời gian | Màn hình | Lời thoại (thu tiếng) |
|---|---|---|---|
| 1 | 0:00–0:30 | Mặt sinh viên hoặc slide tên | "Chào thầy/cô, em là Hà Bảo Ngọc, MSSV 23127300, nhóm N08. Đây là demo HW06 — kiểm thử API cho EShop. Ba API em phụ trách: FR-01 đăng ký, FR-08 checkout, và FR-14 quản lý danh mục. Video này tập trung demo Agent Skill tự sinh test case, lấy FR-14 làm ví dụ." |
| 2 | 0:30–1:10 | Mở `HW06-API-Testing.md` §7 rồi `.claude/skills/api-test-generator/SKILL.md` | "Yêu cầu §7 là ở mức Bloom G9.5 — Create: thiết kế một bộ sinh test API. Em đóng gói nó thành Agent Skill `api-test-generator`. Skill nhận đầu vào là đặc tả API và một endpoint, rồi chạy quy trình từng bước — không phải một prompt chung chung." |
| 3 | 1:10–2:00 | Mở `diagrams/test-generator.png` (bản tự vẽ) + `diagrams/test-generator.py` | "Đây là sơ đồ thiết kế em **tự vẽ** theo §11: parse spec → phân vùng từng tham số → bộ luật security SEC-01 đến 07 → trích schema oracle → mô hình chuyển trạng thái → bộ phát sinh case → ghi data file. File `test-generator.py` là pseudocode phản ánh đúng sơ đồ này." |
| 4 | 2:00–3:20 | Terminal: gọi skill sinh case cho `POST /api/categories` (hoặc chạy `test-generator.py`) | "Bây giờ em cho skill sinh test cho endpoint tạo danh mục. Nó đi lần lượt: phân vùng trường `name` — hợp lệ, rỗng, thiếu, rất dài, unicode, trùng, SQL-meta, XSS; rồi access-control — admin, user thường, không token; rồi lifecycle CRUD; rồi contract khi id không tồn tại. Kết quả là bảng `TC-FR14-*` và file `category-cases.json`." |
| 5 | 3:20–4:00 | Mở `test-cases/FR-14-category/ai-generated.md` cuộn qua bảng 40 case, rồi `audit.md` | "40 case sinh tự động. Nhưng quan trọng là bước audit — em không tin AI mù quáng. Ví dụ AI giả định thao tác danh mục cần quyền admin và PUT id không tồn tại trả 404. Đối chiếu SUT thật thì cả hai đều sai — đó là chỗ em đánh INVALID và biến thành bug." |
| 6 | 4:00–4:40 | Mở `test-cases/FR-14-category/extended.md` | "Đây là các case em tự bổ sung mà AI bỏ sót — user thường tạo/xóa danh mục được (leo thang quyền), PUT/DELETE id không tồn tại trả 200, tên trùng được nhận. Mỗi case có ghi chú 'vì sao AI bỏ sót'." |
| 7 | 4:40–5:40 | Terminal: `bash api/scripts/boot-sut.sh && bash api/scripts/run-api.sh "FR-14 Category" api/data/category-cases.json api/newman/fr14-demo` — để log chạy | "Chạy suite thật bằng Newman trên localhost:3000. Chú ý log in ra dòng `[HW06] X-Student-Id = 23127300` cho **mọi** request — đây là header chống gian lận §11, gắn tự động qua pre-request script cấp collection. Các assertion đỏ chính là các bug: user thường vẫn tạo được danh mục." |
| 8 | 5:40–6:20 | Mở report HTML htmlextra vừa sinh, rồi tab GitHub Issues (#241–#243) | "Report htmlextra tổng hợp pass/fail. Mỗi lỗi quan sát được em mở một GitHub Issue black-box — chỉ mô tả hành vi quan sát, curl tái hiện, kỳ vọng vs thực tế; không tham chiếu mã nguồn SUT." |
| 9 | 6:20–7:00 | Tab GitHub Actions (run pass + run fail) | "Cuối cùng, pipeline GitHub Actions tự boot SUT và chạy Newman mỗi lần push. Em có hai run mẫu — một xanh, một đỏ có assertion cố tình sai — chứng minh pipeline bắt được lỗi. Cảm ơn thầy/cô đã xem." |

---

## Ghi chú kỹ thuật khi quay

- **Bắt buộc cho §11:** phải quay rõ dòng console `[HW06] X-Student-Id = 23127300` ít nhất một lần (phân cảnh 7). Đây là bằng chứng anti-cheat.
- **Newman hostname** phải là `localhost` / `127.0.0.1` trên màn hình (§11).
- Nếu skill demo (phân cảnh 4) chạy quá lâu, có thể dựng nhanh (jump-cut) nhưng phải giữ đủ đầu–cuối để thấy input → output thật.
- Sau khi quay: upload YouTube (unlisted), dán link vào `README.md` §2.7 và `reports/test-generator-design.md` §5.

## Checklist sau khi quay

- [ ] Link YouTube đã dán vào `README.md` §2.7
- [ ] Link YouTube đã dán vào `reports/test-generator-design.md` §5
- [ ] Video ≥1080p, có tiếng, đọc rõ MSSV ở đầu
- [ ] Có cảnh quay dòng `X-Student-Id = 23127300` (§11)
