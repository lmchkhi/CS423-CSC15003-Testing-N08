#!/usr/bin/env bash
# Sample the SUT's and JMeter's CPU/RSS once a second during a run.
#
# Screenshots satisfy the letter of HW05 §6; this CSV is what makes
# "memory ceiling: N MB" and "max stable RPS" concrete numbers.
set -euo pipefail

LABEL="${1:?usage: monitor.sh <label> <outdir>}"
OUTDIR="${2:?usage: monitor.sh <label> <outdir>}"
mkdir -p "$OUTDIR"
OUT="$OUTDIR/$LABEL.csv"

echo "ts,iso,sut_cpu,sut_rss_mb,jmeter_cpu,jmeter_rss_mb" >"$OUT"

sample() { # sample <pattern> -> "<cpu> <rss_mb>"
  local pid cpu rss
  pid=$(pgrep -f "$1" | head -1 || true)
  if [[ -z "$pid" ]]; then echo "0 0"; return; fi
  read -r cpu rss < <(ps -o %cpu=,rss= -p "$pid" 2>/dev/null || echo "0 0")
  echo "${cpu:-0} $(( ${rss:-0} / 1024 ))"
}

trap 'echo "monitor stopped, $(( $(wc -l <"$OUT") - 1 )) samples -> $OUT"; exit 0' TERM INT

while true; do
  read -r sc sr < <(sample "node server.js")
  read -r jc jr < <(sample "ApacheJMeter.jar")
  printf '%s,%s,%s,%s,%s,%s\n' "$(date +%s)" "$(date -Iseconds)" "$sc" "$sr" "$jc" "$jr" >>"$OUT"
  sleep 1
done
