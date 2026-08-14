# EShop performance-testing environment (HW05)

Operational notes for running the SUT and pointing the plans at it. The
*behavioural* oracle is `api_specification.md` at the repo root — this file is
only about wiring.

## Local checkout

The SUT is cloned outside this repo at `~/Documents/eshop-sut` (upstream:
`github.com/ttbhanh/eshop-sut`). It is deliberately not vendored into the HW05
branch.

## Starting the backend

HW05 drives the **API only** — the two frontends are not needed.

```bash
cd ~/Documents/eshop-sut/backend
node database.js      # first run only, or to reset + reseed the DB
node server.js        # http://localhost:3000
```

`run_servers.sh` in the SUT repo hardcodes the original author's paths — do not
run it as-is.

| What | Value |
| --- | --- |
| API base URL | `http://localhost:3000` |
| Admin account | `admin@eshop.com` / `Admin123!` |
| Seeded user account | `test@eshop.com` / `Test1234!` |

## Tooling

| Tool | Version | Installed via |
|---|---|---|
| Apache JMeter | 5.6.3 | `brew install jmeter` (`/opt/homebrew/opt/jmeter/libexec`) |
| Java | OpenJDK 21.0.10 | Homebrew |

Headless JMeter run, which is how every graded run is produced (GUI mode is for
building the plan and for the demo video only):

```bash
jmeter -n \
  -t perf/plans/jmeter/23127300_Load_YYYYMMDD.jmx \
  -l perf/results/jtl/23127300_Load_YYYYMMDD.jtl \
  -e -o perf/results/html/23127300_Load_YYYYMMDD \
  -j perf/results/jtl/23127300_Load_YYYYMMDD.log
```

`-e -o` refuses to write into a non-empty directory — delete the folder before a
rerun rather than pointing at a new suffixed one, so the report path in the
report stays stable.

## Resetting state between runs

Everything lives in one SQLite file written by the backend. For a clean
baseline: **stop `server.js`**, run `node database.js`, restart `server.js`.
Doing it while the server is running is unreliable.

Two things specifically need resetting for Workflow 5:

- **Passwords.** The workflow rotates real passwords. After a run, the accounts
  in the CSV no longer hold their original password, so a rerun against the same
  CSV logs in with stale credentials. Either re-seed, or make the CSV's
  `newPassword` the value the *next* run will log in with.
- **Login lockout.** ≥3 consecutive failed logins locks an account on a
  30-second wall-clock timer. Stress and Spike will trip it. §6 requires the
  reset steps to be documented — keep them in `perf/scripts/`, not in someone's
  head.

## Concurrency

One SQLite file means write contention on `POST /api/cart` and
`POST /api/checkout` is a genuine property of the SUT under load. Report it;
do not tune the SUT to make the numbers look better, and do not lower
concurrency to dodge it.

## Known trap

The seeded build contains deliberate defects — that is the point of the SUT.
Assert what `api_specification.md` specifies and let failures stand: they are
evidence for §6 "Report issues", not bugs in the test plan.
