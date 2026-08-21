# FR-16 — Phase D Execution Analysis

> Đây là phân tích lịch sử của Phase D. Raw evidence hiện hành là final rerun `tests/api-testing/evidence/fr-16/20260821-223035/`; các run cũ được liệt kê bên dưới đã được thay thế và dọn khỏi bộ evidence cuối.

## Scope and selection

- Endpoint under test: `POST /api/admin/import-products` only.
- Human contract: JSON array primary; multipart/raw CSV exploratory negative.
- Automated cases: **32** = 29 human-approved AI cases + `FR16-H01`, `FR16-H04`, `FR16-H05`.
- Excluded: **13** = 9 AI `INCOMPLETE` + 2 AI `INVALID` + human-origin incomplete `FR16-H02`, `FR16-H03`.
- No excluded case was silently converted into an executable oracle.

## Preserved run history

| Run | Outcome | Classification and action |
|---|---|---|
| `20260821-024805` | Newman did not start; fixture encountered `SQLITE_ERROR: no such table: products`. | `LOI_MOI_TRUONG`: race between asynchronous SUT schema initialization and the fixture connection. Added seeded-schema readiness polling. Run cũ đã được dọn sau final rerun. |
| `20260821-024833` | 77 assertions, 9 failed. | One failure (`FR16-AUTH-003`) was `LOI_SCRIPT`: generator defaulted an omitted Authorization header to admin auth. Request construction was corrected. Run cũ đã được dọn sau final rerun. |
| `20260821-024915` | Newman completed; exit code `1`; 77 assertions, 8 failed. | Canonical run tại thời điểm Phase D; sau đó được thay thế bởi final rerun 45/45 ca. |

## Historical canonical evidence

- Run directory tại thời điểm Phase D: `20260821-024915` — đã được thay thế bởi `tests/api-testing/evidence/fr-16/20260821-223035/`.
- Host observed: `http://127.0.0.1:3000`.
- Started: `2026-08-20T19:49:15.885Z` (`2026-08-21 02:49:15` Asia/Saigon).
- Ended: `2026-08-20T19:49:25.861Z`.
- Node: `v22.18.0`.
- Newman: `6.2.2`.
- `newman-reporter-htmlextra`: `1.23.1`.
- Fixture exit code: `0`; Newman exit code: `1`.
- Database backup: `tests/api-testing/backups/database-before-fr16-phase-d-20260821-024915.sqlite`.

### Canonical totals

| Measure | Executed | Failed |
|---|---:|---:|
| Iterations | 1 | 0 |
| Selected test cases/items | 32 | 8 cases have at least one failed assertion |
| HTTP requests | 63 | 0 transport-level request failures |
| Test scripts | 32 | 0 script failures |
| Pre-request scripts | 33 | 0 script failures |
| Assertions | 77 | 8 |

Therefore, **69/77 assertions passed**, and **24/32 selected cases had no failed assertion**. The 63 HTTP requests comprise 32 subject requests plus 31 read-only verification/setup requests.

## Failure classification

| Case | Expected semantic behavior | Observed evidence | Classification |
|---|---|---|---|
| `FR16-AUTH-002` | Valid non-admin JWT must not import a product. | Marker `FR16-AUTH-002` was present in the post-request product list. | `LOI_BAO_MAT_SUT` |
| `FR16-H05` | Non-admin batch of three must not persist any marker. | Marker `FR16-H05-A` was present after the request. | `LOI_BAO_MAT_SUT` |
| `FR16-PRICE-002` | `price=0` must be rejected and not persisted. | Marker for the zero-price product was present. | `LOI_CHUC_NANG_SUT` |
| `FR16-PRICE-003` | Negative price must be rejected and not persisted. | Marker for the negative-price product was present. | `LOI_CHUC_NANG_SUT` |
| `FR16-ATOM-001` | Invalid row in the middle must roll back the whole batch. | A valid-row marker from the mixed batch was present. | `LOI_CHUC_NANG_SUT` |
| `FR16-ATOM-002` | Invalid first row must roll back the whole batch. | The `price=0` marker was present. | `LOI_CHUC_NANG_SUT` |
| `FR16-ATOM-003` | Invalid final row must roll back earlier valid rows. | An earlier valid-row marker was present. | `LOI_CHUC_NANG_SUT` |
| `FR16-ATOM-004` | Failed mixed batch must leave no marker in DB. | A mixed-batch marker was present after the request. | `LOI_CHUC_NANG_SUT` |

Canonical classification totals:

- `LOI_BAO_MAT_SUT`: **2** failures.
- `LOI_CHUC_NANG_SUT`: **6** failures.
- `LOI_MOI_TRUONG`: **0** canonical failures.
- `LOI_SCRIPT` / `LOI_CA_KIEM_THU`: **0** canonical failures.

These are evidence-based Phase D classifications, not published bug reports and not final human defect decisions.

## Passed semantic areas

- Valid single/batch imports and JSON description containing a comma.
- Admin-token success; missing, empty, malformed, expired and bad-signature authentication rejection after the script correction.
- Empty/missing product names did not persist markers.
- Positive integer and positive decimal prices imported.
- Existing category fixture was retained on the imported product.
- Empty/invalid primary request containers were rejected semantically.
- SQL-oriented name value did not execute SQL or remove the sentinel/table.
- Multipart and raw CSV exploratory requests did not import their markers. Both returned server errors, but exact rejection status/body is a documented spec gap, so these assertions passed without a bug conclusion.
- GET method mismatch was rejected and did not change product count.
- Extra field `malicious_field` was not persisted.

## Header evidence

- All **32/32** subject requests passed the collection assertion that `X-Student-Id` equals `23127464`.
- `newman-console.txt` contains `[FR16 HEADER]` log lines for the FR-16 requests and shows the accepted host.
- Human-provided screenshot evidence shows request `FR16-AUTH-003` in Postman Console with `X-Student-Id: 23127464`.

**HEADER SCREENSHOT: PROVIDED**

## Evidence integrity and hashes

| Artifact | SHA-256 |
|---|---|
| Collection | `3C7C8E45E880C2E1EAE2DD7169EAA347BEED98B991B12AB0472331ACB94004EC` |
| Environment used | `EA3275079E526C70C98BED5EC61FCA8CB29633B3E0AB012F978CEA11E92EE3D1` |
| Data file | `1CE7314D1AAA1145BDA7A89539E4FD68BBA079A3AFCF30A8635AABDB4D9A1CF4` |
| Newman console | `28CCF9F60492BF69D67E5723296DBFC542165C6E3E28C5381340F69FB915FE4D` |
| Newman JSON | `BE847F5E30C036A57870C6D62F6592C532B9883A272E585D08F5368FCFC464DA` |
| Newman HTML | `FBE345BB1BFD51F72841DFC8917A29A29A450FD5C62B12ED5D1FB896616CA4E5` |
| Command file | `090191E429D9415C894F57C07AAC9DC9F1004EE9509A175FE22E3FAB72D5B50D` |
| Fixture output | `E0564250D6085F050B702D2E70FE43CD912DBF18021319EE5E4BCB9B1BAA0E4E` |
| Header screenshot | `BB9B72072C95796A39D137C8CB87D13A79A036406439877AF0133360A0A1E34F` |

The finalized `execution-metadata.json` contains the exact command, versions, timestamps, exit code, artifact paths, hashes, canonical totals and per-failure classifications.

## Evidence addendum

- Path: `tests/api-testing/evidence/fr-16/postman-header-screenshot.png`
- Captured at: `2026-08-21 03:09 (Asia/Ho_Chi_Minh)`
- SHA-256: `BB9B72072C95796A39D137C8CB87D13A79A036406439877AF0133360A0A1E34F`
- Visual verification: Postman Console displays request `FR16-AUTH-003` and request header `X-Student-Id: 23127464`.

## Execution conclusion

Evidence conclusion: **KHÔNG ĐẠT** — the canonical execution completed but 8 sourced semantic assertions failed. No bug report was created in this phase.

PHASE D: COMPLETE  
EXECUTION: EXECUTED — FAILED  
HUMAN ASSESSMENT: XÁC NHẬN — 2 LOI_BAO_MAT_SUT + 6 LOI_CHUC_NANG_SUT  
HEADER SCREENSHOT: PROVIDED
