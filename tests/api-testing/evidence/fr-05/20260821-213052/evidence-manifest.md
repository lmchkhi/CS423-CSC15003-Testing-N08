# FR-05 — Evidence Manifest

## Nhận diện lần chạy

- Phạm vi: Pool A, FR-05, `GET /api/products` với query tùy chọn `search`.
- Student ID: `23127464`.
- Run ID: `20260821-213052`.
- Thời gian: `2026-08-21T14:30:52.498Z` đến `2026-08-21T14:30:58.092Z`.
- Host: `http://127.0.0.1:3000`.
- Công cụ: Node.js `v22.18.0`, Newman `6.2.2`, `newman-reporter-htmlextra` `1.23.1`.
- Đây là lần chạy canonical. Lần `20260821-213008` được giữ riêng vì query string bị mất khi sinh collection và được phân loại `LOI_CA_KIEM_THU`.

## Kết quả tổng hợp

- Test case: 20; đạt 16; không đạt 4.
- HTTP request: 28, gồm subject request và request kiểm tra hậu điều kiện qua `pm.sendRequest`.
- Assertion: 55; đạt 50; không đạt 5.
- Newman exit code: main `1`, empty-baseline `0`, tổng thể `1`.
- Database đã khôi phục: `true`.
- Ảnh Postman chứng minh header: `PROVIDED`.

## Artifact và SHA-256

| Artifact | SHA-256 |
|---|---|
| `tests/api-testing/collections/23127464_FR05_Product_Search.postman_collection.json` | `BE7F0E44492DC8CD035A7E5CA87454434C4ED0A3820659DCEC8318BFB6E5CABE` |
| `tests/api-testing/environments/fr-05-local.postman_environment.json` | `74773792CCD98D4D941436437064EF5F564DB76F90D5477A7D6D5153233165B9` |
| `tests/api-testing/data/fr-05-run-data.json` | `1CF2CA75A0B38F5A2F12F0D8E5E2495F547A6FF6E58E47D92232C428C222723D` |
| `newman-main-console.txt` | `875B95365141A41281F60AF6F38D140F31BA4516C9F853699BACD70973B6F6E1` |
| `newman-empty-console.txt` | `8220D3D66F04ABE49FC7964BE5FEF93278CB32467309F5F138B232162B0D7B8C` |
| `newman-main-report.json` | `CE87E88DF5C25719711E88B3216A085ABD72D4E80A2E0D176A826503A7EEA792` |
| `newman-empty-report.json` | `71B864532F9597DEE820D617BE53095876A959F9E69091115ABAA5AC389D365A` |
| `newman-main-report.html` | `9E82B1294AC21B8C64D1021F2AB2FCA5D44F031B12481AF890FCEE0ACFAC7014` |
| `newman-empty-report.html` | `F7DCAE902C43469C060AF23BEE025D17C52E1DFFBABC098874C4BC2E4CA14B4A` |
| `empty-fixture-output.txt` | `F677ABCF95F207581709F5E0D9671A1E5CADE643C06F6188416BBCB195FEC940` |
| `newman-command.txt` | `4820FEC45C9AE67E684C8725537775535E311956847D0EB7808608C3602D3E27` |
| `sut-process.log` | `5388630F431FABBEC89A6E519EDBCE8BEC5C3AF203BF5FC28FAEBCD3418C18AC` |
| `tests/api-testing/evidence/fr-05/postman-header-screenshot.png` | `DB60F5ABD2D6F43233CCE15FC6686CC032E2903548EADCCD8219E4831ADA6AB0` |

`execution-metadata.json` là nguồn metadata máy đọc được cho lần chạy này. Hash database trước chạy và sau khôi phục cùng là `38D16AAF04AA81839CC746D4C713171ED87570CB6772875E35C5F60EBBF37CA9`.
