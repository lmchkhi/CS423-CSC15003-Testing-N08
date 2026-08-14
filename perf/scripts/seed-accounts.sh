#!/usr/bin/env bash
# Register every account in accounts.csv against the running API.
#
# The backend re-seeds its database on every start, so this must run AFTER the
# server is up and again after every restart. Each account is registered with
# its newPassword value as the initial password, which is what makes the
# forgot -> reset -> login journey replay identically on every run.
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CSV="$REPO/perf/data/accounts.csv"
CONCURRENCY="${CONCURRENCY:-16}"

[[ -f "$CSV" ]] || { echo "missing $CSV — run gen-data.py first" >&2; exit 1; }
curl -fsS -m 2 -o /dev/null "$BASE_URL/api/products" || { echo "SUT is not up" >&2; exit 1; }

register_one() {
  local email="$1" password="$2"
  curl -s -o /dev/null -X POST "$BASE_URL/api/register" \
    -H 'Content-Type: application/json' \
    -d "{\"name\":\"Perf User\",\"email\":\"$email\",\"password\":\"$password\"}"
}
export -f register_one
export BASE_URL

echo "Seeding accounts from $CSV ..."
# A connect-level failure on any one of the parallel registrations makes
# xargs exit nonzero, which (with pipefail) would abort the script here and
# skip the verification loop below — leaving no ok/total line at all. The
# login-verification loop is the real pass/fail gate per this script's
# contract, so this pipeline's own exit status is deliberately ignored.
tail -n +2 "$CSV" | cut -d, -f1,2 | tr ',' ' ' \
  | xargs -P "$CONCURRENCY" -n 2 bash -c 'register_one "$0" "$1"' || true

# Verify: every account must be able to log in with its newPassword.
echo "Verifying logins ..."
total=0; ok=0
while IFS=, read -r email password _rest; do
  total=$((total + 1))
  status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/api/login" \
    -H 'Content-Type: application/json' \
    -d "{\"email\":\"$email\",\"password\":\"$password\"}")
  [[ "$status" == "200" ]] && ok=$((ok + 1)) || echo "  login failed ($status): $email"
done < <(tail -n +2 "$CSV")

echo "Seeded and verified: $ok / $total accounts"
[[ "$ok" == "$total" ]] || { echo "seeding incomplete" >&2; exit 1; }
