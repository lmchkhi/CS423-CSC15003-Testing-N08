# AI conversion log — FR-05

| Stage | Prompt / input | Outcome | Affected files |
| --- | --- | --- | --- |
| Analyze | Read `HW04_Automation_Testing.md`, `playwright-skill.md`, and FR-05 in `src/eshop-sut/README.md`. | Selected one positive product-search case using the seeded `iPhone 15 Pro Max` product. | This log |
| Design | Create one data-driven case that proves a query returns the expected product. | Case `FR05-DD-001`: search `iPhone`; expect one matching `h2` heading. | `test-data/fr05-search.json` |
| Review | Use user-facing placeholder, role, and heading locators; avoid sleeps and internal selectors. | Four meaningful checks: URL, input value, matching-heading count, visibility. | `tests/automation/fr05-search.spec.js` |
| Model data | Keep case ID, category, input, and primitive expected values outside the test. | JSON schema validated at test-load time for emptiness, duplicate IDs, and missing fields. | `test-data/fr05-search.json` |
| Map automation | Configure Chromium, Firefox, and WebKit with separate labeled HTML outputs. | One run per browser under `reports/html/fr05-search/<browser>/`. | `playwright.config.js`, `scripts/run-fr05-matrix.mjs` |
| Generate | Implement the test, config, and runner. | Implemented. | Files above |
| Verify and repair | Run `npx playwright test --list`, then `npm run test:fr05:matrix`. | Discovery: 1 case in each of 3 projects. The first Firefox headless run could not launch because of a graphics compositor error. A headed Firefox launch succeeded, so the Firefox project was changed to headed mode. The final matrix was run with GUI permission: Chromium, Firefox, and WebKit all passed. All three report files were checked for the visible student label and ISO timestamp. | `reports/html/fr05-search/`, `reports/fr05-run-manifest.json` |
