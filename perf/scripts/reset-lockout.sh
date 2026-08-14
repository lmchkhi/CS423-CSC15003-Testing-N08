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

# locked_before counts only rows actually locked (locked_until set); a single
# failed login sets login_attempts > 0 without locking (lockout needs 2
# consecutive failures) and is reported separately as attempts_pending so it
# doesn't inflate the lockout-incident count in the manifest. Note: this does
# not compare locked_until against the current time, so an expired-but-
# uncleared lock still counts as locked here.
locked=$(sqlite3 "$DB" \
  "SELECT COUNT(*) FROM users WHERE locked_until IS NOT NULL;")
pending=$(sqlite3 "$DB" \
  "SELECT COUNT(*) FROM users WHERE login_attempts > 0 AND locked_until IS NULL;")
before_total=$((locked + pending))
sqlite3 "$DB" "UPDATE users SET login_attempts = 0, locked_until = NULL;"
after=$(sqlite3 "$DB" \
  "SELECT COUNT(*) FROM users WHERE locked_until IS NOT NULL OR login_attempts > 0;")

echo "locked_before=$locked cleared=$((before_total - after)) attempts_pending=$pending remaining=$after"
[[ "$after" == "0" ]] || { echo "lockout state not fully cleared" >&2; exit 1; }
