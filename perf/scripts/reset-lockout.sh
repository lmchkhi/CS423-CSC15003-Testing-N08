#!/usr/bin/env bash
# Clear account-lockout state between scenarios (HW05 §6 requires the reset
# steps to be documented, not improvised).
#
# Reports how many accounts were locked BEFORE clearing. That number is data:
# a nonzero count after a run means the run tripped the lockout, which changes
# how its error rate should be read.
set -euo pipefail

SUT_DIR="${SUT_DIR:-$HOME/Documents/eshop-sut/backend}"
DB="$SUT_DIR/database.sqlite"
[[ -f "$DB" ]] || { echo "database not found at $DB" >&2; exit 1; }

locked=$(sqlite3 "$DB" \
  "SELECT COUNT(*) FROM users WHERE locked_until IS NOT NULL OR login_attempts > 0;")
sqlite3 "$DB" "UPDATE users SET login_attempts = 0, locked_until = NULL;"
after=$(sqlite3 "$DB" \
  "SELECT COUNT(*) FROM users WHERE locked_until IS NOT NULL OR login_attempts > 0;")

echo "locked_before=$locked cleared=$((locked - after)) remaining=$after"
[[ "$after" == "0" ]] || { echo "lockout state not fully cleared" >&2; exit 1; }
