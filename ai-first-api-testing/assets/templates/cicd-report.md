### CI/CD Report

- **Workflow file:** `{workflow_path}`
- **Trigger(s):** `{triggers}`
- **Collection/environment/data:** `{paths}`
- **Newman command and reporter:** `{command}`
- **Artifact retention:** `{report_artifact_details}`
- **Student ID injection (non-secret):** `{mechanism}`
- **Secret handling:** `{mechanism_or_N/A}`

| Required run | Commit SHA | Run URL | Observed result | Screenshot | Evidence notes |
|---|---|---|---|---|---|
| All-passing | `{real_sha}` | `{real_url}` | `{counts_and_status}` | `{path}` | `{notes}` |
| One test failing | `{real_sha}` | `{real_url}` | `{counts_and_status}` | `{path}` | `{intentional_failure_and_restoration_notes}` |

Do not fill commit SHAs, URLs, results or screenshots until they exist. Explain how the intentionally failing sample was isolated and how the normal test was restored afterward.
