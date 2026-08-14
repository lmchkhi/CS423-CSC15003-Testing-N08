#!/usr/bin/env bash
# Window layout and screenshot capture for HW05 run evidence.
#
# HW05 §6/§11 require the tool and the resource monitor in the SAME frame, and
# §11 treats fabricated evidence as the failure mode this homework exists to
# prevent -- so captures happen DURING the run, never afterwards.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SHOTS="$REPO/perf/evidence/resource-monitor"
mkdir -p "$SHOTS"

layout() {
  osascript <<'APPLESCRIPT'
tell application "Activity Monitor" to activate
delay 1
tell application "Finder" to set screenBounds to bounds of window of desktop
set screenW to item 3 of screenBounds
set screenH to item 4 of screenBounds
set halfW to screenW / 2
tell application "System Events"
  tell process "Activity Monitor"
    set position of front window to {halfW, 0}
    set size of front window to {halfW, screenH - 60}
  end tell
end tell
tell application "Terminal" to activate
delay 1
tell application "System Events"
  tell process "Terminal"
    set position of front window to {0, 0}
    set size of front window to {halfW, screenH - 60}
  end tell
end tell
APPLESCRIPT
  echo "Layout set. In Activity Monitor: View > All Processes, search 'node', and keep the CPU tab visible."
}

shot() {
  local label="${1:?usage: record-mode.sh shot <label>}"
  local out="$SHOTS/${label}-$(date +%Y%m%d-%H%M%S).png"
  screencapture -x "$out" 2>/dev/null || {
    echo "screencapture failed — grant Screen Recording permission to your terminal in" >&2
    echo "System Settings > Privacy & Security > Screen Recording, then rerun." >&2
    return 1
  }
  echo "$out"
}

case "${1:-}" in
  layout) layout ;;
  shot) shift; shot "$@" ;;
  *) echo "usage: $0 {layout|shot <label>}" >&2; exit 2 ;;
esac
