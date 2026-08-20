### Phân tích kết quả thực thi Newman (Newman Evidence Analysis)

#### Bằng chứng đã nhận (Evidence Received)
| Loại (Type) | Đường dẫn/Chi tiết (Path/Details) |
|-------------|-----------------------------------|
| Newman Report | `{newman_report_path}` |
| Console Output | `{console_output_path}` |
| Screenshots | `{screenshots_path}` |
| Collection / Environment / Data | `{input_paths}` |

- **Run timestamp:** `{timestamp}`
- **Command / Exit code:** `{command}` / `{exit_code}`
- **Observed hostname:** `{hostname}`
- **Declared deployment:** `{deployment}`
- **Hostname match:** `{YES / NO / INCONCLUSIVE}`
- **X-Student-Id screenshot verified:** `{YES / NO}`

#### Tóm tắt kết quả kiểm thử (Test Results Summary)
- Iterations: `{iterations}`, Requests: `{requests}`, Assertions: `{assertions}`, Passed assertions: `{passed}`, Failed assertions: `{failed}`, Skipped: `{skipped}`.

#### Phân tích độ bao phủ (Coverage Analysis)
- **Domain Partitions:** `{coverage_details}`
- **State Transitions:** `{coverage_details}`
- **Security:** `{coverage_details}`
- **Schema:** `{coverage_details}`

#### Phân tích lỗi (Failed Tests Analysis)
| Failure | Classification | Observation | Requirement source | Evidence | Next check |
|---|---|---|---|---|---|
| `{failure}` | `{TEST_DEFECT/.../UNKNOWN}` | `{observation}` | `{source}` | `{path}` | `{next_check}` |

#### Lỗi đã phát hiện (Bugs Found)
- Xem chi tiết tại (See details at): `{bug_report_path}`

#### So sánh Test (AI-generated vs Human-added test comparison)
{comparison_details}

#### Trạng thái (Checkpoint)
- **Execution evidence verdict:** `{PASS / FAIL / INCONCLUSIVE}`
- **Human review:** `PENDING HUMAN REVIEW`
