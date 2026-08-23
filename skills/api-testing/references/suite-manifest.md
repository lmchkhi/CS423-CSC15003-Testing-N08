# Suite manifest contract

Create UTF-8 JSON with this shape. The scripts reject missing coverage, counts, IDs, review metadata, or expected results.

```json
{
  "suite": {
    "name": "Login API - HW06",
    "module": "LOGIN",
    "endpoint": "POST /api/login",
    "method": "POST",
    "path": "/api/login",
    "baseUrl": "http://localhost:3000",
    "studentId": "<student-id>",
    "stateTransitionApplicable": true
  },
  "cases": [
    {
      "id": "TC-LOGIN-001",
      "title": "Đăng nhập với thông tin hợp lệ",
      "requirementIds": ["FR-02"],
      "testType": "Functional",
      "technique": "Equivalence Partitioning",
      "coverage": ["domain-partition", "schema-validation"],
      "source": "ai-generated",
      "agentAudit": {"status": "VALID", "reason": "Bao phủ valid partition."},
      "humanReview": {"status": "PENDING", "reason": ""},
      "preconditions": ["Tài khoản test hợp lệ tồn tại."],
      "testData": {"email": "{{validUserEmail}}", "password": "{{validUserPassword}}"},
      "steps": ["Gửi request bằng dữ liệu đã nêu."],
      "request": {
        "path": "/api/login",
        "query": {},
        "headers": {"Content-Type": "application/json"},
        "body": {"email": "{{validUserEmail}}", "password": "{{validUserPassword}}"},
        "auth": "none"
      },
      "expected": {
        "status": [200],
        "contentType": "application/json",
        "schema": {"type": "object", "required": ["token", "user"]},
        "bodyAssertions": [{"path": "token", "operator": "exists"}],
        "maxResponseTimeMs": 2000
      },
      "status": "Not Run",
      "relatedBugs": []
    }
  ]
}
```

Allowed `coverage`: `domain-partition`, `state-transition`, `security`, `schema-validation`.

Allowed `source`: `ai-generated`, `student-authored`. The skill generates only `ai-generated` cases. Use `student-authored` only for cases explicitly supplied by the student; never generate or infer those cases for them.

By default, every case must keep `humanReview.status` as `PENDING` and `humanReview.reason` as an empty string. The validator rejects other human-review values unless invoked with `--allow-human-review`. Use that flag only when the student explicitly supplied concrete review decisions for the named cases in the current request. Never copy or transform `agentAudit` into `humanReview`.

Allowed `request.auth`: `none`, `missing`, `user`, `admin`, `invalid`, `custom`. For `custom`, set `request.token` to a variable reference, never a live token in committed files.

Supported body assertion operators: `equals`, `notEquals`, `exists`, `absent`, `type`, `matches`, `includes`, `gt`, `gte`, `lt`, `lte`, and `arrayLength`.
