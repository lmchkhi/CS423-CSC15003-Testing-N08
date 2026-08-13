#!/usr/bin/env bash
# Black-box behavioural oracle for the EShop API.
#
# Verifies the SUT behaviours the HW05 workload design depends on, and the
# defect candidates that become bug reports. Every claim here is made from
# HTTP status codes and response bodies only -- no SUT source is consulted.
set -uo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT="$REPO/perf/evidence/smoke-oracle-$(date +%Y%m%d-%H%M%S).txt"
mkdir -p "$(dirname "$OUT")"
exec > >(tee "$OUT") 2>&1

echo "EShop black-box oracle — $(date -Iseconds)"
echo "Base URL: $BASE_URL"
echo

post() { curl -s -w '\n%{http_code}' -X POST "$BASE_URL$1" -H 'Content-Type: application/json' -d "$2"; }
get()  { curl -s -w '\n%{http_code}' "$BASE_URL$1"; }
body() { sed '$d' <<<"$1"; }
code() { tail -1 <<<"$1"; }

check() { # check <name> <condition-result> <detail>
  if [[ "$2" == "0" ]]; then echo "PASS  $1"; else echo "FAIL  $1"; fi
  [[ -n "${3:-}" ]] && echo "      $3"
}

# ---------------------------------------------------------------- OR-1
echo "== OR-1: password-reset journey is replayable with a constant newPassword"
EMAIL="oracle-$(date +%s)@test.local"
PW="Oracle123!"
post /api/register "{\"name\":\"Oracle\",\"email\":\"$EMAIL\",\"password\":\"$PW\"}" >/dev/null
for round in 1 2; do
  R=$(post /api/forgot-password "{\"email\":\"$EMAIL\"}")
  TOKEN=$(body "$R" | sed -n 's/.*"resetToken":"\([0-9]*\)".*/\1/p')
  R=$(post /api/reset-password "{\"email\":\"$EMAIL\",\"resetToken\":\"$TOKEN\",\"newPassword\":\"$PW\"}")
  RC=$(code "$R")
  R=$(post /api/login "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}")
  LC=$(code "$R")
  [[ "$RC" == "200" && "$LC" == "200" ]] && S=0 || S=1
  check "round $round: reset=$RC login=$LC" "$S" "token=$TOKEN"
done
echo "  -> a constant newPassword makes the journey idempotent across reruns"
echo

# ---------------------------------------------------------------- OR-2
echo "== OR-2: how many consecutive failed logins lock an account, and for how long"
EMAIL="lock-$(date +%s)@test.local"
post /api/register "{\"name\":\"Lock\",\"email\":\"$EMAIL\",\"password\":\"$PW\"}" >/dev/null
for attempt in 1 2 3 4; do
  R=$(post /api/login "{\"email\":\"$EMAIL\",\"password\":\"WrongPassword!\"}")
  echo "  failed attempt $attempt -> HTTP $(code "$R") $(body "$R")"
done
R=$(post /api/login "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}")
echo "  correct password now -> HTTP $(code "$R") $(body "$R")"
echo "  (403 here means the account is locked despite correct credentials)"
LOCK_START=$(date +%s)
echo "  polling every 15s until the correct password is accepted again..."
while true; do
  sleep 15
  R=$(post /api/login "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}")
  ELAPSED=$(( $(date +%s) - LOCK_START ))
  echo "    t+${ELAPSED}s -> HTTP $(code "$R")"
  [[ "$(code "$R")" == "200" ]] && { echo "  -> lock cleared after ~${ELAPSED}s"; break; }
  [[ $ELAPSED -gt 300 ]] && { echo "  -> still locked after 300s, giving up"; break; }
done
echo

# ---------------------------------------------------------------- OR-3
echo "== OR-3: GET /api/products/:id price type (spec says price is a number)"
for id in 1 2 3 4 5; do
  R=$(get "/api/products/$id")
  echo "  id=$id -> $(body "$R" | sed 's/\(.\{110\}\).*/\1.../')"
done
echo "  -> compare the JSON type of \"price\" across odd and even ids"
echo

# ---------------------------------------------------------------- OR-4
echo "== OR-4: GET /api/products/:id for a nonexistent id (spec implies 404)"
R=$(get "/api/products/999999")
echo "  HTTP $(code "$R") body=$(body "$R")"
[[ "$(code "$R")" == "404" ]] && S=0 || S=1
check "nonexistent product returns 404" "$S" "got HTTP $(code "$R")"
echo

echo "Transcript written to $OUT"
