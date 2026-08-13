# Measured Evidence Analysis

## Artifact received

- Executor:
- Scenario/JMX/CSV/base URL:
- Exact run folder:
- Start/end time:
- Exit code:
- Raw JTL:
- JMeter log:
- HTML report:
- Backend PID evidence:
- Resource CSV/log:
- Visual evidence:
- User notes:

## Run validity

- Decision: `VALID | VALID WITH LIMITATION | INVALID`
- Reviewed plan matched:
- Fresh output folder:
- Expected labels/correlation/assertions:
- Same-run coherence:
- Setup/HTML excluded from measured interval:
- Invalidating defects or bounded limitations:

## Raw JTL summary

- Header/schema and sample-variable check:
- Expected sampler labels:
- Assertion/business failures:
- Measured start/end/duration:
- Percentile method:

## HTML/statistics consistency

- JTL vs HTML sample/error consistency:
- Differences and explanation:

## Resource evidence

- PID match:
- Sampling interval/time window:
- Max/typical CPU:
- Max/typical working set/private memory:
- Missing samples or monitor failure:

## Visual evidence

- JMeter/terminal and resource UI in same frame:
- Correct `node.exe`/PID/CPU/Memory visible:
- Scenario stages covered:
- Timestamp/run attribution:
- Secrets absent:

## Metrics

| Metric | Overall | Endpoint/stage detail | Evidence/method |
| --- | ---: | --- | --- |
| Samples | | | |
| Failed | | | |
| Error % | | | |
| Avg ms | | | |
| Median ms | | | |
| p90 ms | | | |
| p95 ms | | | |
| p99 ms | | | |
| Throughput req/s | | | |
| Max CPU % | | | |
| Max RAM MB | | | |

Every number must identify its source as raw JTL, resource CSV, HTML cross-check, console observation, visual evidence or user note. Console `Avg` must never be reported as p95.

## Scenario-specific breakdown

Complete only the applicable table and remove unused tables from the filled artifact.

### D1 Load — per-sampler and steady-load observation

| Sampler/workflow | Samples | Failed | Error % | Avg | Median | p90 | p95 | p99 | Throughput |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| | | | | | | | | | |

- Ramp-up evidence:
- Target 20 VU evidence:
- Steady-state evidence:
- Completion/backend state:

### D2 Stress — stage analysis

| Stage/time window | VU | Samples | Failed | Error % | Throughput | p95 | p99 | CPU avg/max | RAM avg/max |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| | | | | | | | | | |

- Throughput plateau/degradation region:
- First material latency/error change:
- Scheduler cutoff/account/state effects:

### D3 Spike — baseline/spike/recovery

| Region/time window | VU | Samples | Error % | Throughput | p95 | p99 | CPU avg/max | RAM avg/max |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| Baseline | | | | | | | | |
| Spike | | | | | | | | |
| Recovery | | | | | | | | |

- Spike p95/error/throughput change:
- Reviewed recovery definition:
- Observed recovery time:

### D4 Endurance — time buckets

| Minute/time bucket | Samples | RPS | Error % | p95 | CPU avg/max | RAM avg/max |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| | | | | | | |

- Start-to-end p95/error change:
- RAM start/end/delta/slope:
- Stability observation:
- State/payload/JVM/load-generator alternative explanations:

## Interpretation limitations

- Missing evidence:
- Unsupported conclusions intentionally withheld:
- Console/visual observations not usable as raw metrics:

## Human Review recommendation

- Recommended decision: `Approved | Approved with corrections | Rejected`
- Corrections/rerun requirements:
- Next phase remains blocked until explicit approval: `Yes`

## Current status

`<SCENARIO> RESULT PENDING HUMAN REVIEW`
