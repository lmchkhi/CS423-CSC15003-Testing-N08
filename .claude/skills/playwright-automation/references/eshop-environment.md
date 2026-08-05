# EShop environment reference (HW04 automation)

Operational notes for running the SUT and pointing the suite at it. The
*behavioural* oracle is `sut-requirements.md` at the repo root — this file is
only about wiring.

## Local checkout

The SUT is cloned outside this repo at `~/Documents/eshop-sut` (upstream:
`github.com/ttbhanh/eshop-sut`). It is not vendored into the HW04 branch.

## Starting the three processes

Each needs its own terminal; the first run needs `npm install` in each folder.

```bash
# 1. Backend API — http://localhost:3000
cd ~/Documents/eshop-sut/backend
node database.js      # first run only, or to reset+reseed the DB
node server.js

# 2. Shop frontend — http://localhost:5173
cd ~/Documents/eshop-sut/frontend-web && npm run dev

# 3. Admin frontend — http://localhost:5174 (strictPort)
cd ~/Documents/eshop-sut/frontend-admin && npm run dev
```

`run_servers.sh` in the SUT repo hardcodes the original author's paths — do not
run it as-is.

## URLs and accounts

| What | Value |
| --- | --- |
| API | `http://localhost:3000` (`API_URL`) |
| Shop | `http://localhost:5173` (`WEB_URL`) |
| Admin | `http://localhost:5174` (`ADMIN_URL`) |
| Admin account | `admin@eshop.com` / `Admin123!` |
| User account | `test@eshop.com` / `Test1234!` |

All of these come from `automation/.env`; never hardcode them in a spec.

## Resetting state

Everything lives in one SQLite file written by the backend. To get a clean
baseline: **stop `server.js`**, run `node database.js`, restart `server.js`.
Doing it while the server is running is unreliable — do not script it into a
test hook.

Because a reset is manual, prefer designing tests that do not need one:
register a throwaway user per test, create a fresh order per transition case,
and derive expected aggregates from the API at assertion time.

## Concurrency

Single SQLite file → `workers: 1` and `fullyParallel: false` in
`playwright.config.ts`. Do not raise this to speed up the matrix.

## Known trap

The seeded build contains deliberate defects (that is the point of the SUT).
Two that affect this scope directly: FR-02's failed-attempt counter/lockout
behaviour, and FR-13's revenue aggregation. Assert what
`sut-requirements.md` specifies and let the failure stand — it is evidence,
not a bug in the test.

## Browsers

Playwright's own Chromium / Firefox / WebKit builds (`npx playwright install`)
satisfy §6's "Chromium / Firefox / WebKit" option, and WebKit works natively on
macOS. No branded Chrome/Edge install is needed.
