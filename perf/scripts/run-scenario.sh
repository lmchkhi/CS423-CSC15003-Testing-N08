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

echo "== lockout state after the run"
LOCK_AFTER=$(perf/scripts/reset-lockout.sh)
echo "   $LOCK_AFTER"

echo
python3 perf/scripts/analyze_jtl.py "$JTL"
echo
echo "== peak resource usage"
awk -F, 'NR>1 {if ($4>mr) mr=$4; if ($3>mc) mc=$3; if ($6>jr) jr=$6}
         END {printf "   SUT peak: %.1f%% CPU, %d MB RSS | JMeter peak RSS: %d MB\n", mc, mr, jr}' \
  "$RESOURCE/$STEM.csv"

echo
echo "== manifest row (paste into reports/run-manifest.md)"
python3 - "$JTL" "$SCENARIO" "$STEM" "$START_ISO" "$DURATION" <<'PY'
import sys, pathlib
sys.path.insert(0, "perf/scripts")
import analyze_jtl
jtl, scenario, stem, start, duration = sys.argv[1:6]
s = analyze_jtl.summarize(analyze_jtl.load_samples(jtl))["overall"]
print(f"| {scenario} | `{stem}.jmx` | JMeter | {start} | {duration}s | "
      f"| {s['count']} | {s['error_pct']} | {s['p95']} | {s['throughput']} | "
      f"`perf/results/jtl/{stem}.jtl` | `perf/results/html/{stem}/` | |")
PY

echo
echo "Done. Raw log: $JTL"
echo "      Dashboard: $HTML/index.html"
echo "      Resource trace: $RESOURCE/$STEM.csv"
