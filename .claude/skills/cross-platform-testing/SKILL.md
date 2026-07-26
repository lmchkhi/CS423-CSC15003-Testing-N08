---
name: cross-platform-testing
description: Run HW03 Task 3 end to end — plan and record a >=3-platform cross-browser/cross-platform pass over the EShop web frontend (Chrome/Firefox/Safari or Android Chrome, optionally Expo Go for mobile), stamp every screenshot with the required StudentID@hcmus.edu.vn watermark, and produce the results table. Use when the student is starting or continuing cross-platform testing for HW03.
---

# Cross-Browser / Cross-Platform (HW03 Task 3)

Output lives in `cross-platform/report.md` (results table) and
`cross-platform/screenshots/` (stamped evidence). Needs at least 3 platforms;
BrowserStack/LambdaTest strongly preferred over local browsers because they
let the screenshot clearly show the OS/device alongside the SUT.

## Phase A — Choose the platform matrix

1. Cover **Chrome, Firefox, and Safari** (or **Android Chrome**) at minimum —
   3 platforms. Expo Go on a real phone may substitute for one of the three
   (e.g. in place of Safari); it is not bonus-only.
2. Decide which flow(s)/screens to exercise on each platform — reuse the
   scenario from `usability-evaluation` or a subset of the screens from
   `gui-checklist` so the same functional coverage gets cross-platform
   verification, rather than testing something new from scratch.
3. Record the chosen matrix at the top of `cross-platform/report.md`.
4. Commit:
   ```bash
   git add cross-platform/report.md
   git commit -m "docs(xplat): select platform matrix"
   ```

## Phase B — Get access

- Preferred: a BrowserStack or LambdaTest trial (student's own account —
  they're responsible for obtaining it). If the trial is expired, fall back
  to Sauce Labs / CrossBrowserTesting, or real physical devices — but then
  the screenshot **must** clearly show the browser/OS/device name next to the
  SUT's localhost URL (e.g. don't crop out the browser chrome / window
  title).
- For Expo Go: run the EShop mobile app via Expo Go on a real phone, per the
  `eshop-sut` mobile app's setup instructions.

## Phase C — Execute and capture

For each platform:
1. Run the chosen flow, note pass/fail per step and anything that renders
   differently (layout breaks, missing font, unsupported CSS feature,
   touch-target issues, etc.).
   - **Chrome/local platforms with the Claude for Chrome extension
     connected**: drive the flow yourself through the extension (navigate,
     click, resize the viewport) rather than asking the student to narrate
     each step, and read pass/fail off the actual rendered page. Narrate
     briefly as you go so the student can catch a wrong call live.
   - **BrowserStack/LambdaTest/Sauce Labs sessions, Safari, and Expo
     Go on a physical phone**: these run outside what the extension can
     reach, so the student drives the session directly and describes/shares
     what renders; do not claim to have observed a platform the extension
     cannot actually control.
2. Screenshot the key state(s) — at minimum, one screenshot showing the
   browser/OS/device chrome is visible.
3. **Stamp the username overlay** — mandatory for every screenshot, §6:
   ```bash
   python3 .claude/skills/cross-platform-testing/scripts/stamp_screenshot.py \
     <raw-screenshot.png> \
     cross-platform/screenshots/<platform>-<flow-step>.png \
     "<StudentID>@hcmus.edu.vn" \
     --label "<Browser/OS or Device name>"
   ```
   Ask the student for their real StudentID if not already known — never
   guess or leave a placeholder ID in a submitted screenshot.
4. If a real bug/rendering defect is found, file it with `bug-report`
   (area tag `XPLAT-<platform>`).
5. Add a row to `cross-platform/report.md`:

   | Platform | Browser/OS/Device | Flow tested | Result | Notes | Screenshot | Bug ID |
   |---|---|---|---|---|---|---|
   | BrowserStack | Safari 17 / macOS Sonoma | Sign-up → Checkout | Pass | | `screenshots/safari-checkout.png` | |

6. Commit after each platform (keep it granular per §12, don't batch all
   three into one commit):
   ```bash
   git add cross-platform/report.md cross-platform/screenshots/
   git commit -m "test(xplat): run <flow> on <platform>"
   ```

## Phase D — Roll up

Update `reports/main-report.md`'s Task 3 section with the matrix covered,
pass/fail summary, and any bugs found, linking back to
`cross-platform/report.md` for the full table. Then:
```bash
git log --pretty=format:'%h %ad %s' --date=short > git-log.txt
git add git-log.txt reports/main-report.md
git commit -m "docs: roll up cross-platform results into main report"
```

## Guardrails

- Never fabricate or reuse the same screenshot across platforms — the
  anti-cheat constraints (§11) apply to the spirit of Task 3 too, even though
  it's only explicitly named for participants: screenshots are graded
  evidence.
- Never claim a platform was tested via Claude for Chrome when it wasn't
  reachable that way (BrowserStack/LambdaTest live sessions, Safari, Expo Go)
  — say explicitly who/what drove each platform in `cross-platform/report.md`
  if it varies across rows.
- Don't stamp over content needed to judge the bug (e.g. an error message) —
  use `--corner` to place the watermark in an empty area of the screenshot.
- If Pillow/Python isn't available in the environment, the watermark can be
  added via the BrowserStack/LambdaTest live-session on-screen annotation
  tools instead, or any screenshot markup tool — the requirement is the
  overlay appearing in the final image, not this specific script.
