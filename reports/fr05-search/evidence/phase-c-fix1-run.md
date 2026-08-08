# Phase C — Fix 1 Chromium baseline

Thời điểm ghi nhận: `2026-08-08T22:07:59+07:00`.

## Phạm vi

- Fixture data-driven: `data/fr05-search.json`, đủ 12 TC-ID và expected đã duyệt tại Phase B.
- Spec: `tests/fr05-search.spec.ts`, đọc fixture, khai báo TypeScript interface và validation runtime trước khi đăng ký test.
- UI tại `http://localhost:5173` là oracle chính cho cả 12 case.
- Network chỉ hỗ trợ DT-001, DT-004, DT-006, DT-007, DT-009 và DT-010; không có case API-only.
- DT-002 dùng `Iphone`; DT-011 là h1; DT-012 là format giá theo artifact Phase B.

## Mapping bề mặt

| TC-ID | Bề mặt | Vai trò network |
| --- | --- | --- |
| DT-001 | UI+network | Đồng bộ và đối chiếu aggregate công khai; UI quyết định pass/fail |
| DT-002 | UI | Không dùng |
| DT-003 | UI | Không dùng |
| DT-004 | UI+network | Chẩn đoán request/encoding và status; UI safe display/empty state quyết định pass/fail |
| DT-005 | UI | Không dùng |
| DT-006 | UI+network | Chẩn đoán status 500; UI/DOM safe rendering là oracle chính |
| DT-007 | UI+network | Đối chiếu baseline/count để chẩn đoán; UI result/empty state là oracle chính |
| DT-008 | UI | Không dùng |
| DT-009 | UI+network | Request ảnh chỉ diagnostic; ảnh/card/alt/tên/giá kiểm tra qua UI/DOM |
| DT-010 | UI+network | Tạo pending state và đồng bộ; loading indicator kiểm tra qua UI |
| DT-011 | UI | Không dùng |
| DT-012 | UI | Không dùng |

## Lệnh và kết quả thật

| Command | Exit code | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: | ---: |
| `npm run lint` | 0 | — | — | — |
| `npm run typecheck` | 0 | — | — | — |
| `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c-fix1 --workers=1` | 1 | 4 | 8 | 0 |

Chromium runner hoàn thành trong 42.7 giây. Passed: DT-001, DT-002, DT-005, DT-008. Failed: DT-003, DT-004, DT-006, DT-007, DT-009, DT-010, DT-011, DT-012.

## Quan sát failure

| TC-ID | Quan sát thật |
| --- | --- |
| DT-003 | Danh sách có 0 heading sản phẩm nhưng không có empty-state message đã duyệt. |
| DT-004 | Không crash/redirect và không có raw system error, nhưng UI kết quả rỗng không có empty-state message. |
| DT-006 | Request trả HTTP 500; UI hiển thị `Database Error` và `SQLITE_ERROR`. Không có dialog/script injection, nhưng vẫn vi phạm expected xử lý an toàn. |
| DT-007 | Response và UI đều cho thấy đủ 5 sản phẩm baseline; UI không có empty state. |
| DT-009 | Card có ảnh sản phẩm chủ đích nhưng `alt=""`; giá hiển thị `VND` thay vì `₫`. Không kết luận fail từ việc host ảnh ngoài bị chặn. |
| DT-010 | Khi request đang pending, không tìm thấy role status/loading text/`aria-busy`/spinner/skeleton; 0 product heading. |
| DT-011 | DOM có 2 thẻ `h1`, expected là đúng 1. |
| DT-012 | Giá không khớp pattern có ký hiệu `₫`; UI đang dùng `VND`. |

## Locator và nhóm assertion

- Ưu tiên `getByRole` và `getByText` cho textbox, button, main, heading, kết quả, empty/loading state và giá.
- CSS chỉ dùng khi semantics không đủ: `locator('h1')` để đếm đúng cấu trúc thẻ; `img` để kiểm tra ảnh có alt rỗng vốn biến mất khỏi accessibility tree; `script` để phát hiện payload được inject; ancestor card và spinner/skeleton fallback vì SUT không công khai role/test id tương ứng. Lý do được ghi cạnh locator trong spec.
- Có đủ nhóm assertion DOM/visible text, state/attribute và count/aggregate; ngoài ra có layout/computed DOM và network diagnostic.
- Không có `waitForTimeout`; không dùng API response thay UI assertion.

## Artifact và Fix 2 backlog

- Runtime artifact: `test-results/fr05-phase-c-fix1/` gồm 8 failure screenshot, 8 video và 8 `error-context.md`.
- Chưa hoàn thiện screenshot attachment cho case pass; xử lý ở Fix 2.
- DT-010 vẫn dùng pending-request synchronization tối thiểu để quan sát UI, nhưng chưa hoàn thiện loading synchronization; xử lý ở Fix 2.

Checkpoint C đang chờ review; chưa chuyển Phase D.
