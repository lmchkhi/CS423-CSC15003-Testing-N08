# Report Structure Reference

## Cấu trúc báo cáo đề xuất

1. Thông tin chung: StudentID, tool, SUT, workflow 1, base URL, ngày chạy.
2. Hardware: CPU, RAM, OS, môi trường local, resource monitor dùng.
3. Test design: workflow endpoint, mapping auth/read/transactional, CSV data, lý do dùng `/api/register` làm setup account nhưng không đưa vào measured workflow.
4. Workload model: Load, Stress, Spike, Endurance.
5. JMeter implementation: token extractor, headers, assertions, timers, listeners.
6. Execution evidence: link/path JMX, CSV, JTL, HTML, screenshot, video.
7. Bug reports: liệt kê file trong `reports/bug-reports/` và GitHub Issue link nếu đã tạo.
8. Results: bảng metric từng scenario.
9. Endurance threshold: ngưỡng ổn định empirically measured.
10. AI analysis: prompt, output tóm tắt, nhận xét.
11. Misinterpretation hunt: lỗi AI và số đúng từ raw JTL.
12. Optimization judgement: feasible/needs evidence/hallucinated.
13. Continuous performance testing proposal: flow chart, p95 regression, trade-off.
14. AI Audit Appendix.
15. AI Critique 200-300 từ.

## Bảng metric mẫu

| Scenario | VUs | Ramp-up | Duration | Samples | Error rate | Avg ms | p50 | p90 | p95 | p99 | RPS | CPU/RAM note |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Load | | | | | | | | | | | |
| Stress | | | | | | | | | | | |
| Spike | | | | | | | | | | | |
| Endurance | | | | | | | | | | | |

## Nội dung human review bắt buộc

Ghi rõ AI đã sai/thiếu gì khi thiết kế test:

- Ramp-up hoặc VU không phù hợp máy local.
- Think time quá thấp/cao làm workflow phi thực tế.
- Thiếu token extraction hoặc Authorization.
- Assertion yếu, chỉ kiểm HTTP 200 mà không kiểm token/response.
- Không xử lý account lockout.
- Không dùng CSV hoặc dùng cùng account cho mọi VU.

Với mỗi lỗi, viết: "AI sai/thiếu", "vì sao", "tôi đã sửa thế nào".
