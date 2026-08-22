# Sơ đồ AI-driven API Test Generator

File này là bản Mermaid Markdown của sơ đồ thiết kế AI test-generator. Bản PNG dùng để nộp nằm ở `diagrams/test-generator.png`; file nguồn chỉnh sửa Draw.io nằm ở `diagrams/test-generator.drawio`.

```mermaid
flowchart TD
    A["API spec Markdown"] --> B["Stage 1: parse_spec<br/>Trích xuất endpoint contract<br/>params / auth / schemas"]

    B --> C{"Lặp qua từng parameter"}
    C --> D["Stage 2: partition_param<br/>Phân vùng miền theo kiểu<br/>email / password / number / string"]
    D --> C

    C -- "Đã xử lý tất cả parameter" --> E["Stage 3: security_cases<br/>SEC-01 SQL injection<br/>SEC-02 XSS payload<br/>SEC-03 Thiếu token<br/>SEC-04 Token sai<br/>SEC-05 Leo thang quyền<br/>SEC-06 IDOR<br/>SEC-07 Mass assignment"]

    E --> F["Stage 4: schema_cases<br/>Oracle cho success schema<br/>Oracle cho error schema"]
    F --> G["Stage 5: state_cases<br/>Transition hợp lệ<br/>Transition bất hợp lệ<br/>Vi phạm terminal state"]

    G --> H{"Xuất artifact"}
    H --> I["Stage 6: emit_markdown<br/>Bảng TC-*<br/>ID / Category / Input<br/>Precondition / Expected / Oracle"]
    H --> J["Stage 7: emit_data_json<br/>Dòng dữ liệu *-cases.json<br/>_desc / inputs / expectStatus<br/>expectSchema / knownBug"]

    I --> K["test-cases/FR-XX/ai-generated.md"]
    J --> L["api/data/*-cases.json"]

    style A fill:#4A90D9,color:#fff
    style E fill:#E74C3C,color:#fff
    style K fill:#27AE60,color:#fff
    style L fill:#27AE60,color:#fff
```

## Ghi chú

- `parse_spec` đọc đặc tả API và tạo contract cho endpoint.
- `partition_param` sinh các lớp tương đương và giá trị biên cho từng tham số.
- `security_cases`, `schema_cases`, và `state_cases` thêm oracle về bảo mật, schema response, và state machine.
- `emit_markdown` và `emit_data_json` tạo artifact để review và chạy Newman data-driven.
