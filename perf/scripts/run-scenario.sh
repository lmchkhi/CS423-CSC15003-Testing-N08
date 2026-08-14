#!/usr/bin/env bash
# Run one graded HW05 scenario end to end.
#
#   perf/scripts/run-scenario.sh Load            # reset lockout, run, collect
#   perf/scripts/run-scenario.sh Stress --fresh  # full SUT restart + reseed first
#
# Everything a run produces lands under perf/results/ with the same stem, so a
# scenario's plan, log, dashboard, resource trace and screenshot all line up.
set -euo pipefail

SCENARIO="${1:?usage: run-scenario.sh <Load|Stress|Spike|Endurance> [--fresh]}"
FRESH="${2:-}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO"

# Overridable: the four .jmx plans bake their authoring date into their
# filenames, so a run that straddles midnight must still be able to name the
# plan it was authored against. Default is unchanged (today's date).
RUNDATE="${RUNDATE:-$(date +%Y%m%d)}"
STEM="23127300_${SCENARIO}_${RUNDATE}"
PLAN="perf/plans/jmeter/${STEM}.jmx"
JTL="perf/results/jtl/${STEM}.jtl"
HTML="perf/results/html/${STEM}"
RESOURCE="perf/results/resource"
LOG="perf/results/jtl/${STEM}.log"

[[ -f "$PLAN" ]] || { echo "no plan at $PLAN" >&2; exit 1; }
mkdir -p perf/results/jtl perf/results/html "$RESOURCE"

if [[ "$FRESH" == "--fresh" ]]; then
  echo "== full reset: restart SUT (re-seeds db) and re-register accounts"
  perf/scripts/sut.sh reset
  perf/scripts/seed-accounts.sh
else
  perf/scripts/sut.sh status >/dev/null || { echo "SUT is down — start it first" >&2; exit 1; }
fi

echo "== clearing lockout state before the run"
LOCK_BEFORE=$(perf/scripts/reset-lockout.sh)
echo "   $LOCK_BEFORE"

# -e -o refuses to write into a non-empty directory; keep the path stable.
rm -rf "$HTML" "$JTL"

echo "== starting resource monitor"
perf/scripts/monitor.sh "$STEM" "$RESOURCE" &
MON_PID=$!
trap 'kill "$MON_PID" 2>/dev/null || true' EXIT

START_ISO="$(date -Iseconds)"
START_S=$(date +%s)
echo "== running $SCENARIO at $START_ISO"

HEAP="${HEAP:--Xms1g -Xmx4g}" \
jmeter -n \
  -q perf/config/jmeter-run.properties \
  -t "$PLAN" \
  -l "$JTL" \
  -e -o "$HTML" \
  -j "$LOG"

DURATION=$(( $(date +%s) - START_S ))
kill "$MON_PID" 2>/dev/null || true
trap - EXIT
sleep 1

# From here on JMeter has already exited and the run's evidence — .jtl, log,
# resource CSV — is on disk. Nothing below may abort the script before it has
# printed a summary of that evidence: a degraded step prints a visible
# WARNING and sets DEGRADED so the script's own exit status still surfaces
# it, but it must never take the rest of the summary down with it.
DEGRADED=0

echo "== lockout state after the run"
LOCK_AFTER_RC=0
LOCK_AFTER=$(perf/scripts/reset-lockout.sh) || LOCK_AFTER_RC=$?
echo "   $LOCK_AFTER"
if [[ "$LOCK_AFTER_RC" -ne 0 ]]; then
  echo "   WARNING: post-run lockout reset did not fully clear (exit $LOCK_AFTER_RC) — accounts may still be locked/pending for the next run" >&2
  DEGRADED=1
fi

echo
python3 perf/scripts/analyze_jtl.py "$JTL"

echo
echo "== peak resource usage"
RESOURCE_CSV="$RESOURCE/$STEM.csv"
if [[ -f "$RESOURCE_CSV" ]] && [[ "$(wc -l < "$RESOURCE_CSV")" -gt 1 ]]; then
  awk -F, 'NR>1 {if ($4>mr) mr=$4; if ($3>mc) mc=$3; if ($6>jr) jr=$6}
           END {printf "   SUT peak: %.1f%% CPU, %d MB RSS | JMeter peak RSS: %d MB\n", mc, mr, jr}' \
    "$RESOURCE_CSV" \
    || { echo "   WARNING: could not read resource trace $RESOURCE_CSV — peak CPU/RSS not available" >&2; DEGRADED=1; }
else
  echo "   WARNING: resource trace $RESOURCE_CSV is missing or has no samples — monitor.sh may not have started in time; peak CPU/RSS not available for this run" >&2
  DEGRADED=1
fi

echo
echo "== manifest row (paste into reports/run-manifest.md)"
# set +e around just this call: `if ! CMD; then` would discard CMD's real
# exit code (collapsed to 0/1 by the negation), and exit 3 vs any other
# nonzero code needs to stay distinguishable below.
set +e
python3 - "$JTL" "$SCENARIO" "$STEM" "$START_ISO" "$DURATION" <<'PY'
import sys, pathlib
sys.path.insert(0, "perf/scripts")
import analyze_jtl
jtl, scenario, stem, start, duration = sys.argv[1:6]
result = analyze_jtl.summarize(analyze_jtl.load_samples(jtl))
s = result["overall"]
if s is None:
    # Zero-sample .jtl is a real outcome here (unreachable SUT, wrong loop
    # count) — say so explicitly rather than crashing on s['count'] or
    # printing a plausible-looking row built from missing numbers. There is
    # no legitimate way for a graded scenario to produce zero samples, so
    # this is a failed run, signalled via exit 3 (distinct from the plain
    # "something in this step broke" exit 1 below) and picked up by the
    # shell side as a DEGRADED condition.
    print(f"| {scenario} | `{stem}.jmx` | JMeter | {start} | {duration}s | "
          f"| 0 | NO SAMPLES | NO SAMPLES | NO SAMPLES | "
          f"`perf/results/jtl/{stem}.jtl` | `perf/results/html/{stem}/` | |")
    sys.exit(3)
else:
    print(f"| {scenario} | `{stem}.jmx` | JMeter | {start} | {duration}s | "
          f"| {s['count']} | {s['error_pct']} | {s['p95']} | {s['throughput']} | "
          f"`perf/results/jtl/{stem}.jtl` | `perf/results/html/{stem}/` | |")
PY
MANIFEST_RC=$?
set -e
if [[ "$MANIFEST_RC" -eq 3 ]]; then
  echo "   WARNING: zero samples in $JTL — no legitimate graded run produces this; treat as a failed run and redo it" >&2
  DEGRADED=1
elif [[ "$MANIFEST_RC" -ne 0 ]]; then
  echo "   WARNING: manifest row generation failed unexpectedly — inspect $JTL by hand" >&2
  DEGRADED=1
fi

echo
echo "Done. Raw log: $JTL"
echo "      Dashboard: $HTML/index.html"
echo "      Resource trace: $RESOURCE/$STEM.csv"

if [[ "$DEGRADED" -ne 0 ]]; then
  echo
  echo "WARNING: one or more post-run summary steps were degraded — see WARNING lines above; treat this run's evidence as incomplete." >&2
  exit 1
fi
