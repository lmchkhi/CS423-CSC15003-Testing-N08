#!/usr/bin/env bash
# EShop SUT lifecycle for HW05 performance runs.
#
# The backend re-seeds its database on EVERY start: server.js loads a module
# that drops and recreates all tables. So "reset to a clean baseline" is just
# "restart", and test accounts must be created through the API afterwards.
set -euo pipefail

SUT_DIR="${SUT_DIR:-$HOME/Documents/eshop-sut/backend}"
BASE_URL="${BASE_URL:-http://localhost:3000}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PID_FILE="$REPO/perf/results/.sut.pid"
LOG_FILE="$REPO/perf/results/.sut.log"

api_up() { curl -fsS -m 2 -o /dev/null "$BASE_URL/api/products" 2>/dev/null; }

wait_for_api() {
  for _ in $(seq 1 40); do
    if api_up; then return 0; fi
    sleep 0.25
  done
  echo "SUT did not answer on $BASE_URL within 10s" >&2
  return 1
}

start() {
  if api_up; then echo "SUT already up on $BASE_URL"; return 0; fi
  mkdir -p "$(dirname "$PID_FILE")"
  (cd "$SUT_DIR" && nohup node server.js >"$LOG_FILE" 2>&1 & echo $! >"$PID_FILE")
  wait_for_api
  echo "SUT started, pid $(cat "$PID_FILE"), db re-seeded"
}

stop() {
  if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    kill "$(cat "$PID_FILE")"; sleep 0.5
    kill -9 "$(cat "$PID_FILE")" 2>/dev/null || true
    rm -f "$PID_FILE"; echo "SUT stopped"
  else
    pkill -f "node server.js" 2>/dev/null && echo "SUT stopped (by name)" || echo "SUT was not running"
  fi
}

status() {
  if api_up; then
    echo "up pid=$(pgrep -f 'node server.js' | head -1)"
  else
    echo "down"; return 1
  fi
}

pid() { pgrep -f "node server.js" | head -1; }

case "${1:-status}" in
  start) start ;;
  stop) stop ;;
  reset) stop; start ;;
  status) status ;;
  pid) pid ;;
  *) echo "usage: $0 {start|stop|reset|status|pid}" >&2; exit 2 ;;
esac
