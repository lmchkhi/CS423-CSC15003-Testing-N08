# Use Case Testing Templates

## Test Design Analysis

```md
# Phân tích thiết kế test case <Requirement ID>: <Tên chức năng>

## Requirement ID
<FR-ID>

## Module / Test type / Technique
<Module> / Functional / Use Case Testing

## Mục tiêu kiểm thử
<Mục tiêu kiểm thử viết bằng tiếng Việt tự nhiên.>

## Phạm vi yêu cầu
- <Gạch đầu dòng các ý chính của requirement.>

## Use case chính

| Mục | Nội dung |
| --- | --- |
| Tên use case | <Tên use case> |
| Actor chính | <Actor> |
| Actor phụ | <Hệ thống/API/CSDL/dịch vụ liên quan> |
| Trigger | <Sự kiện bắt đầu use case> |
| Tiền điều kiện | <Điều kiện trước khi chạy> |
| Hậu điều kiện thành công | <Trạng thái sau khi thành công> |
| Hậu điều kiện thất bại | <Trạng thái khi thất bại> |

## Luồng thành công cơ bản
1. <Bước 1>
2. <Bước 2>

## Luồng thay thế và ngoại lệ

| Mã luồng | Tình huống | Kết quả mong đợi |
| --- | --- | --- |
| A1 | <Tình huống> | <Kết quả> |

## Điều kiện kiểm thử được suy ra

| Condition ID | Điều kiện cần kiểm thử | Test case |
| --- | --- | --- |
| C1 | <Điều kiện> | TC-<MODULE>-UCT-001 |

## Test data dùng chung

| Dữ liệu | Giá trị |
| --- | --- |
| <Tên dữ liệu> | <Giá trị> |

## Traceability

| Requirement | Test case | Mục tiêu kiểm thử | Trạng thái thiết kế |
| --- | --- | --- | --- |
| <FR-ID> | TC-<MODULE>-UCT-001 | <Mục tiêu> | Ready |

## Ghi chú thiết kế
<Ghi chú về phạm vi, giả định, hoặc cách execute.>
```

## Test Case

```md
# TC-<MODULE>-UCT-001: <Tên test case>

## Requirement ID
<FR-ID>

## Module / Test type / Technique
<Module> / Functional / Use Case Testing

## Preconditions
- <Điều kiện trước khi chạy test>

## Test data

| Dữ liệu | Giá trị |
| --- | --- |
| <Tên dữ liệu> | <Giá trị> |

## Test steps
1. <Bước 1>
2. <Bước 2>

## Expected result
- <Kết quả mong đợi có thể quan sát được>

## Status / Related bugs
Not Run / None
```

## Bug Report

~~~md
# [BUG][<Module>] <Tên bug>

## Found by Test Case
TC-<MODULE>-UCT-001

## Requirement liên quan
<FR-ID>

## Severity / Priority
<Critical|Major|Minor|Trivial|Block> / <P0|P1|P2|P3>

## Environment
- Frontend: `<URL nếu có>`
- Backend: `<URL nếu có>`
- Browser/OS: `<Thông tin môi trường>`
- Build/commit: `<Commit hoặc local workspace>`

## Steps to reproduce
1. <Bước 1>
2. <Bước 2>

## Expected result
<Kết quả đúng theo requirement.>

## Actual result
<Kết quả thực tế.>

## Evidence
```text
<Console output, HTTP response, screenshot note, hoặc log>
```

## Labels đề xuất
`Type: Bug`, `Status: New`, `module: <module>`, `severity: <severity>`, `priority: <priority>`, `found-by: test-case`
~~~
