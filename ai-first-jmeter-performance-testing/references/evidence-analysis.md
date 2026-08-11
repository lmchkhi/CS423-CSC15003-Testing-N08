# Evidence, Validity and Analysis Rules

## Evidence integrity

- Treat raw JTL as read-only after execution; preserve headers and never hand-edit it.
- Preserve invalid runs as refinement evidence; create a new run folder rather than silently overwrite.
- Record exact JMX, CSV, workload, time, command, exit code, base URL, environment and evidence paths.
- Use runtime evidence for performance conclusions. Source code may explain state, API contract or optimization compatibility, but cannot predict measured latency/capacity.
- Use `Không xác định` when evidence is insufficient.

## Validity decision

A run is `VALID` only when JMeter executed the intended plan, non-empty JTL contains expected labels, correlation and assertions worked, SUT and data were available, and the load generator was not clearly the first bottleneck.

Mark `INVALID` for wrong URL/password, mass lockout, empty CSV, failed extraction, malformed request, blanket 401, JMeter OOM, unavailable backend or comparable harness/environment failures. Never use an invalid run to infer SUT capacity.

## Failure classification

| Class | Typical evidence | Action |
| --- | --- | --- |
| Test defect | Bad JMX/CSV/JSONPath/assertion | Fix harness, review, rerun |
| Environment issue | SUT/JMeter/Java/monitor unavailable | Record, repair, rerun |
| Load-generator limitation | JMeter saturates before SUT | Reduce listener overhead; inspect generator |
| Data/state issue | Shared cart, stale account, lockout | Reset/isolate data; rerun |
| SUT functional defect | Incorrect response under a valid flow | Preserve evidence; issue candidate |
| SUT performance issue | Repeatable degradation under a valid workload | Preserve evidence; performance issue candidate |
| Unknown | Insufficient evidence | Do not guess |

Group multiple symptoms with one supported root cause into one issue draft. Require scenario, workload, metric, reproduction, JTL/resource evidence and impact. Never invent an issue number or URL.

## Required metric table

Report Samples, Failed, Error %, Avg, Median, p90, p95, p99, Throughput, Max CPU and Max RAM for Load, Stress, Spike and Endurance where evidence exists. For custom percentile calculation, state method/interpolation and do not silently mix it with JMeter's method.

Prefer bounded claims such as “p95 rose from X to Y while throughput plateaued at Z.” Do not state a database bottleneck without database evidence.

## Misinterpretation hunt

Challenge every initial AI claim against raw data. Explicitly test for:

1. average confused with a percentile;
2. p90 labeled as p95;
3. error percentage scale misread;
4. overall metric attributed to one endpoint, or endpoint metric to the workflow;
5. HTTP 200 counted despite assertion/business failure;
6. throughput calculated using the wrong duration;
7. spike and baseline samples mixed;
8. maximum thread count mistaken for a stable stress threshold;
9. memory growth called a leak prematurely;
10. shared accounts/cart corrupting observations;
11. listener or load-generator overhead ignored;
12. correlation failures labeled as SUT failures;
13. failed-login lockout corrupting a run.

For each finding record initial claim, raw evidence/path, verdict, correction and why AI missed it.

## Optimization review

Classify each recommendation as:

- `Feasible`
- `Plausible but unproven`
- `Not supported by evidence`
- `Hallucinated / incompatible`

Evaluate indexes, pools, WAL, caching, cleanup, payload/query optimization and rate limits against both runtime evidence and source feasibility. High p95 alone does not prove an index is feasible or useful.

## Endurance statement

Use actual values only:

```text
On this hardware, the highest empirically observed sustained workload
that remained stable for <duration> was approximately <VU/RPS>,
with p95=<value>, error rate=<value>, backend CPU=<value>, RAM=<value>.
```

## Continuous performance proposal

Include a conditional commit/PR gate, isolated SUT, deterministic data, smoke, short Load gate, JTL collection, p95/error comparison, regression flag, nightly Stress and scheduled Spike/Endurance. Discuss CI cost, runner noise, false alarms, duration, isolation, storage, baseline drift and p95 variance.

Any gate such as `error_rate > 1% OR p95 > baseline_p95 * 1.20` must be labeled a proposed CI gate unless an official SLA supplies it.
