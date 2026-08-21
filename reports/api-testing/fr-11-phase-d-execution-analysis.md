# FR-11 — Phase D Execution Analysis

> Đây là phân tích lịch sử của Phase D. Raw evidence hiện hành là final rerun `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/`; run `20260821-001900` đã được thay thế và dọn khỏi bộ evidence cuối.

## Evidence integrity

- Canonical run: `tests/api-testing/evidence/fr-11/20260821-001900/`.
- Time: 2026-08-21 00:16:05–00:16:23 (Asia/Ho_Chi_Minh).
- Host: `http://127.0.0.1:3000` (`baseUrl` resolves to `http://localhost:3000`).
- Working directory: `E:\Testing\CS423-CSC15003-Testing-N08`.
- Node: `v22.18.0`; Newman: `6.2.2`; htmlextra reporter: `1.23.1`.
- Fixture exit code: `0`; Newman exit code: `1`.
- Raw console, JSON and HTML all belong to the same canonical run and were not edited after generation.
- Collection-level header trace appears 42 times, once for every subject request; all 42 `X-Student-Id` assertions passed.
- Required real Postman header screenshot: `PROVIDED`.

SHA-256:

| Artifact | SHA-256 |
|---|---|
| `newman-console.txt` | `836798F0D297AD3FAD868B048F3313DB9EB284DB2AE7681AE69DA8DC0E987D83` |
| `newman-report.json` | `8EFCA878111365725669FB45251EBE9A0747B7317BF6863BA44C1AEC61896926` |
| `newman-report.html` | `B88D4528DDC6B74EBBB4C80D9AF34BAE15EF8BA76A3C9629E6AF73FD1EDFB8E0` |
| `execution-metadata.json` | `E4C13155AE8A6D526F16FE81F30F7B46B5108C1B8AB9FC6EAC5257D9C67CB620` |
| `fixture-output.txt` | `2C1C8BE9FA4C3CB909C61D62390A63E19C04E8F5337997841DF525F687464ECA` |
| `newman-command.txt` | `2B2EF148D192DE0B55F896A6DF55418CABB8DF563317FB20A70760D6D1C5E139` |
| `sut-in-process.log` | `F4C1FC74B5919A2E26C10A25A8C4B5C11B031272C368993E1F24C39D565BEA25` |
| `postman-header-screenshot.png` | `7A46A3426405AB63B882752AE37FF0EFC95B0F0CB76445C008CEE38ACBBA6E65` |
| Collection | `4CB469EC593E706618A8D9D9AA3AAF714EB84E9153B939A0DD3F09D5BE0C824A` |
| Environment | `42DC6A4E8BEEDE49038587088743E15EDC08BCB259969B5FD3DA136CA52842DA` |

## Exact result summary

| Metric | Executed | Failed | Passed |
|---|---:|---:|---:|
| Iterations | 1 | 0 | 1 |
| HTTP requests, including setup and secondary checks | 53 | 0 transport failures | 53 |
| FR-11 executable case scripts | 42 | 9 cases with failed assertions | 33 |
| Test scripts | 42 | 0 script-runtime failures | 42 |
| Pre-request scripts | 44 | 0 | 44 |
| Assertions | 101 | 9 | 92 |

The request count is not the case count. Some cases issue a dependency/setup request or a second comparison request.

## Failure classification

All nine failed assertions are classified `LOI_BAO_MAT_SUT`. The fixture completed successfully, the intended owned/foreign records were observable, the assertions avoid inventing an exact rejection status/body, and the actual response disclosed a uniquely marked protected order. This contradicts the sourced SEC-02/authentication and FR-11 ownership rules.

HUMAN ASSESSMENT: XÁC NHẬN — 9 failure phân loại `LOI_BAO_MAT_SUT`.

| Case | Actual evidence | Classification |
|---|---|---|
| `FR11-DET-011` | User B token received User A order marker `FR11-A1-OWNED` | `LOI_BAO_MAT_SUT` — ownership/IDOR |
| `FR11-DET-026` | No `Authorization` header; owned order data returned | `LOI_BAO_MAT_SUT` — missing authentication enforcement |
| `FR11-DET-027` | No `Authorization` header; foreign order data returned | `LOI_BAO_MAT_SUT` — authentication and object disclosure |
| `FR11-DET-028` | Empty `Authorization`; owned order data returned | `LOI_BAO_MAT_SUT` — invalid authentication accepted for disclosure |
| `FR11-DET-029` | Bare `Bearer`; owned order data returned | `LOI_BAO_MAT_SUT` — invalid authentication accepted for disclosure |
| `FR11-DET-030` | Random token; owned order data returned | `LOI_BAO_MAT_SUT` — invalid authentication accepted for disclosure |
| `FR11-DET-031` | Tampered identity token; foreign order data returned | `LOI_BAO_MAT_SUT` — invalid authentication and object disclosure |
| `FR11-DET-032` | Expired JWT; owned order data returned | `LOI_BAO_MAT_SUT` — expired authentication accepted for disclosure |
| `FR11-DET-033` | Basic authentication scheme; owned order data returned | `LOI_BAO_MAT_SUT` — unsupported authentication accepted for disclosure |

The source observation that the detail route lacks authentication/ownership middleware supports a root-cause hypothesis, but this report treats the runtime disclosure—not the source observation—as the defect evidence.

## Coverage boundary

- Automated: 33/33 AI cases labelled `VALID` and 9/10 human-origin cases.
- `FR11-MYO-H03`: `INCOMPLETE / NOT AUTOMATED`, because controlled database fault injection and a precise error oracle remain unspecified.
- Excluded: all 2 AI `INVALID` and 35 AI `INCOMPLETE` cases.

## Evidence addendum

- Path: `tests/api-testing/evidence/fr-11/postman-header-screenshot.png`
- Capture time: 2026-08-21 00:41 (Asia/Ho_Chi_Minh)
- SHA-256: `7A46A3426405AB63B882752AE37FF0EFC95B0F0CB76445C008CEE38ACBBA6E65`

## Conclusion

EXECUTION EVIDENCE: KHÔNG ĐẠT

HUMAN ASSESSMENT: XÁC NHẬN — LOI_BAO_MAT_SUT

HEADER SCREENSHOT: PROVIDED

PHASE D: COMPLETE
