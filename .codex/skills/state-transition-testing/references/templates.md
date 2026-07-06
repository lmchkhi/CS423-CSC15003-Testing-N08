# State Transition Testing Templates

## Test Design Analysis

```md
# Phân tích thiết kế test case <Requirement ID>: <Tên chức năng>

## Requirement ID
<FR-ID>

## Module / Test type / Technique
<Module> / Functional / State Transition Testing

## Mục tiêu kiểm thử
<Mô tả mục tiêu kiểm thử bằng ngôn ngữ tự nhiên.>

## Mô hình trạng thái
| Trạng thái | Ý nghĩa | Loại trạng thái |
| --- | --- | --- |
| `<state>` | <meaning> | Khởi đầu / Trung gian / Kết thúc |

## Bảng chuyển trạng thái
| Trạng thái hiện tại | Sự kiện / tác nhân | Trạng thái tiếp theo | Hợp lệ? | Ghi chú |
| --- | --- | --- | --- | --- |
| `<from>` | <event/actor> | `<to>` | Có/Không | <note> |

## Phạm vi và giả định kiểm thử
- <Assumption 1>
- <Assumption 2>

## Chiến lược bao phủ
| Nhóm bao phủ | Test case |
| --- | --- |
| Trạng thái khởi đầu | TC-<MODULE>-STT-001 |
| Các chuyển đổi hợp lệ | TC-<MODULE>-STT-002... |
| Các chuyển đổi không hợp lệ | TC-<MODULE>-STT-... |
| Trạng thái kết thúc | TC-<MODULE>-STT-... |

## Danh sách test case
| Test Case ID | Tên test case | Mục tiêu |
| --- | --- | --- |
| TC-<MODULE>-STT-001 | <Tên test case> | <Mục tiêu> |

## Tiêu chí pass/fail chung
- Pass khi trạng thái sau thao tác đúng với state machine, response rõ ràng và dữ liệu lưu trong hệ thống khớp expected result.
- Fail khi hệ thống cho phép chuyển đổi không hợp lệ, từ chối chuyển đổi hợp lệ, hoặc thay đổi trạng thái sau thao tác bị từ chối.
```

## Test Case

```md
# TC-<MODULE>-STT-001: <Tên test case>

## Requirement ID
<FR-ID>

## Module / Test type / Technique
<Module> / Functional / State Transition Testing

## Preconditions
- <Điều kiện trước khi chạy test>

## Test data
| Trường | Giá trị |
| --- | --- |
| <field> | `<value>` |

## Test steps
1. <Step 1>
2. <Step 2>
3. <Step 3>

## Expected result
- <Expected 1>
- <Expected 2>

## Status / Related bugs
Not Run / None
```

## Browser Console Script Pattern

Use this shape when the user wants quick executable checks in the browser console:

```js
(async () => {
  const BASE = "http://localhost:3000";

  const api = async (method, path, body, token) => {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    let data = null;
    try { data = await res.json(); } catch {}
    return { ok: res.ok, status: res.status, data };
  };

  const result = (id, name, pass, actual, expected) => ({
    id,
    name,
    result: pass ? "PASS" : "FAIL",
    actual,
    expected,
  });

  const tests = [];
  // Create independent entities, drive transitions, then push result(...)
  console.table(tests);
})();
```

## Test Run

```md
# Test Run: <Tên đợt chạy>

| Test Case ID | Module | Tester | Result | Related Bug | Note |
| --- | --- | --- | --- | --- | --- |
| TC-<MODULE>-STT-001 | <Module> | <Tester> | Pass/Fail/Blocked/Not Run | None / BUG-... | <Note> |
```

## Traceability Matrix Row

```md
| <Requirement ID> | TC-<MODULE>-STT-001 | State Transition Testing | Not Run/Pass/Fail/Blocked | None / BUG-... | Designed/Open/Done/Ready for Retest |
```

## Bug Report

Follow the GitHub test case management template exactly. Do not add extra sections unless the user asks.

```md
# [BUG][<Module>] <Mô tả ngắn gọn lỗi>

## Found by Test Case
TC-<MODULE>-STT-001

## Requirement liên quan
<FR-ID>

## Severity / Priority
Major / P1

## Environment
- Browser: <Browser>
- OS: <OS>
- URL: `<URL>`
- API: `<endpoint nếu có>`
- Build/commit: <build hoặc commit>

## Steps to reproduce
1. <Step 1>
2. <Step 2>
3. <Step 3>

## Expected result
<Kết quả mong đợi.>

## Actual result
<Kết quả thực tế.>

## Evidence
<Screenshot / video / console log / bảng kết quả test.>

## Labels
- `type: bug`
- `module: <module>`
- `technique: state-transition`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
```

