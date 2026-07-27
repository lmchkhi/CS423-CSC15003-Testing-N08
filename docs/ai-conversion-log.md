# AI conversion log — FR-05

| Stage | Prompt / input | Outcome | Affected files |
| --- | --- | --- | --- |
| Analyze | Read `HW04_Automation_Testing.md`, `playwright-skill.md`, and FR-05 in `src/eshop-sut/README.md`. | Identified listing, search, safe rendering, loading, empty-state, heading, image-alt, and price-format requirements. | This log |
| Design | Expand the FR-05 suite with positive, negative, security, state, layout, accessibility, and formatting checks. | 14 distinct cases `FR05-DD-001` to `FR05-DD-014`. | `test-data/fr05-search.json` |
| Review | Use user-facing placeholder, role, and heading locators; avoid sleeps and internal selectors. | Four meaningful checks: URL, input value, matching-heading count, visibility. | `tests/automation/fr05-search.spec.js` |
| Model data | Keep case ID, category, input, and primitive expected values outside the test. | JSON schema validated at test-load time for emptiness, duplicate IDs, and missing fields. | `test-data/fr05-search.json` |
| Map automation | Configure Chromium, Firefox, and WebKit with separate labeled HTML outputs. | One run per browser under `reports/html/fr05-search/<browser>/`. | `playwright.config.js`, `scripts/run-fr05-matrix.mjs` |
| Generate | Implement the test, config, and runner. | Implemented. | Files above |
| Verify and repair | Run `npx playwright test --list`, then `npm run test:fr05:matrix`. | Discovery: 14 cases in each of 3 projects (42 executions). A Chromium smoke run identified a missing response wait after submit; the automation was repaired without changing any oracle. Final matrix: 7 pass / 7 fail on Chromium, Firefox, and WebKit. The seven failures were preserved as SUT evidence. All three report files have the visible student label and ISO timestamp. | `reports/html/fr05-search/`, `reports/fr05-run-manifest.json` |
