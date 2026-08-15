---
title: "[BUG][Products] SQL Injection trong search endpoint"
labels: '["Type: Bug", "Status: New", "Security"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

PERF-RCO-02-Search (Phase A source code review)

## Requirement liên quan

FR-05 — Product listing and search

## Severity / Priority

Critical / P0

## Environment

- Backend: Node.js + Express + SQLite, `localhost:3000`
- OS: Windows 11 Pro, Intel i7-12700H, 32 GB RAM
- Commit: `fd030c68`

## Steps to reproduce

1. Gửi request `GET /api/products?search=iPhone`  → hoạt động bình thường
2. Gửi request `GET /api/products?search=' OR 1=1 --` → trả về toàn bộ products
3. Gửi request `GET /api/products?search=' UNION SELECT sql,2,3,4,5,6 FROM sqlite_master --` → trả về schema database

## Expected result

Search query được sanitize hoặc parameterize. Input chứa ký tự đặc biệt SQL không ảnh hưởng đến truy vấn.

## Actual result

Input được nối trực tiếp vào SQL query bằng string interpolation, cho phép SQL injection.

## Evidence

- **Error response cũng lộ thông tin:** Khi SQL syntax error, backend trả HTML chứa `err.message` — lộ cấu trúc database.
- **Không ảnh hưởng performance test:** Workflow RCO dùng keyword hợp lệ (`iPhone`, `Samsung`, v.v.) nên không trigger injection trong measured run. Đây là security defect, không phải performance issue.
