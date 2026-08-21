# Artifact layout

Use `<module>` as lowercase kebab-case and `<run-id>` as an ISO-like timestamp safe for filenames.

```text
tests/
├── test-cases/<module>/TC-<MODULE>-<NNN>.md
├── api/<module>/
│   ├── suite.manifest.json
│   ├── <module>.postman_collection.json
│   ├── <module>.test-data.json
│   └── <module>.postman_environment.example.json
└── test-runs/<module>-<run-id>.md
test-reports/
├── newman/<module>-<run-id>/
│   ├── cli.log
│   ├── newman-report.json
│   └── newman-report.html
└── evidence/<module>/<bug-slug>/
    ├── response-or-log.txt
    └── evidence.png
bugs/<module>/BUG-<MODULE>-<NNN>.md
```

Do not overwrite a prior run. Do not commit a Postman environment containing live tokens or passwords. Provide an example environment containing placeholders only.
