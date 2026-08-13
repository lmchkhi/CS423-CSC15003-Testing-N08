# HW05 Assignment Requirements

## Scope

- SUT: EShop REST backend.
- Owner: student `23127464` — Quang.
- Assigned workflow: `Returning Customer Search and Order`.
- Exercise three endpoint groups in one end-to-end workflow: auth-heavy, read-heavy and transactional.
- Design Load, Stress and Spike plans with AI, then review and correct them as the human owner.
- Parameterize credentials, search/order inputs and other suitable data with CSV.
- Use JMeter by default; k6 is bonus only.

## Required test artifacts

- Name plans `23127464_Load_<YYYYMMDD>.jmx`, `23127464_Stress_<YYYYMMDD>.jmx`, and `23127464_Spike_<YYYYMMDD>.jmx`.
- Keep the same business workflow in all three plans; vary only the workload model.
- Use three distinct JMeter listener/report types across the graded plans; do not repeat a type.
- Produce all three raw JTL logs in full and all three HTML report folders.
- Require the student to execute every measured Load, Stress, Spike and Endurance run; the agent only prepares commands and analyses user-provided evidence.
- Capture, per run, JMeter and the backend resource monitor in the same frame.
- Show the correct backend process/PID, CPU and memory while the measured command is running; provide Vietnamese narration for the demo.
- Keep reset/seed/provisioning and HTML generation outside the measured interval when possible.
- Capture real hardware evidence whose hostname is attributable to the student's environment.
- Reset and document login lockout state between runs when three failed logins trigger lockout.
- Run an approximately 10–15 minute endurance test and report an empirical threshold with concrete VU/RPS, p95, error rate, CPU and RAM observations.
- Record an unlisted YouTube demo of at least six minutes with the student's own Vietnamese narration; AI cannot fabricate or substitute this evidence.
- Report genuine functional/performance issues with screenshots when evidence justifies them.

## Analysis and review

- Analyse real raw JTL data with AI and propose performance thresholds.
- Perform a human misinterpretation hunt: cite the correct raw value for every corrected AI claim and explain the likely cause.
- Classify proposed optimizations with evidence; source inspection may establish feasibility but cannot replace runtime proof.
- Propose a continuous performance-testing pipeline that watches commits, conditionally runs tests and flags p95 regression. Include a flowchart plus cost and false-alarm trade-offs.
- Write an AI Critique of 200–300 words based only on mistakes or limitations that actually occurred.

## Mandatory reporting

- Maintain a complete AI Audit: tool, actual date/time, exact user prompt and AI output/action.
- Document the complete process in Markdown.
- Produce main report Markdown and PDF, test summary, AI Audit Markdown and PDF, AI Critique, repository link, evidence links, demo link, issue evidence if any, and `git-log.txt`.
- Make incremental commits for reviewed steps when the user requests commits. Never invent hashes or claim commits exist before creating them.
- Package submission as `23127464_HW05_AI_Performance_<000-100>.zip` only when explicitly requested and all required artifacts exist.

## Completion checklist

### Phase A

- [ ] Requirement, repo, SUT and API contract inspected.
- [ ] Endpoint/payload/auth/correlation and state risks verified or explicitly unresolved.
- [ ] Runtime baseline and hardware/environment evidence collected, or a real blocker recorded.
- [ ] Human approval recorded.

### Phase B

- [ ] CSV schema, account isolation, correlation and derived totals reviewed.
- [ ] Load/Stress/Spike initial profiles, think time and assertions reviewed.
- [ ] Human approval recorded.

### Phase C

- [ ] Smoke JMX and real smoke result exist, or a real blocker is documented.
- [ ] Dynamic variables and business assertions are verified.
- [ ] Three correctly named graded JMX plans use the same flow and distinct listeners.
- [ ] Human approval recorded.

### Phase D

- [ ] Each D1-D4 preparation used a new empty timestamped run folder and ended `PENDING USER EXECUTION`.
- [ ] The user, not the agent, executed every measured workload.
- [ ] Valid Load, Stress and Spike results exist with raw JTL, HTML and resource evidence.
- [ ] JTL/log/HTML/resource/visual evidence for each result belongs to the same run.
- [ ] Each execution log records `Executor: User`, start/end, exit code, backend PID, reset/provision result and visual-evidence path.
- [ ] Visual evidence shows JMeter/terminal and the correct backend PID/CPU/memory in the same frame during the required workload stages.
- [ ] Endurance ran for 10–15 minutes with time-based evidence.
- [ ] Hardware evidence exists.
- [ ] Human reviewed D1, D2, D3 and D4 separately.

### Phase E

- [ ] Result analysis and raw-value misinterpretation hunt exist.
- [ ] Optimization feasibility and endurance threshold are evidence-backed.
- [ ] Continuous-performance proposal includes p95 regression handling.
- [ ] Issues, audit, critique, main report, summary, README and git log are complete as applicable.
- [ ] Final human approval is recorded.

Never count a checkbox as complete without its corresponding artifact.
