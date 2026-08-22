#!/usr/bin/env bash
set -uo pipefail

collection=""
data=""
environment=""
report_dir=""
no_cli_failures="false"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --collection) collection="$2"; shift 2 ;;
    --data) data="$2"; shift 2 ;;
    --environment) environment="$2"; shift 2 ;;
    --report-dir) report_dir="$2"; shift 2 ;;
    --no-cli-failures) no_cli_failures="true"; shift ;;
    *) echo "Unknown argument: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$collection" || -z "$data" || -z "$report_dir" ]]; then
  echo "Usage: run_newman.sh --collection <file> --data <file> [--environment <file>] --report-dir <dir>" >&2
  exit 2
fi
if [[ ! -f "$collection" || ! -f "$data" ]]; then
  echo "Collection or data file does not exist." >&2
  exit 2
fi

if [[ -x ./node_modules/.bin/newman ]]; then
  newman_bin=./node_modules/.bin/newman
elif command -v newman >/dev/null 2>&1; then
  newman_bin="$(command -v newman)"
else
  echo "Newman is unavailable. Install newman and newman-reporter-htmlextra locally in the repository." >&2
  exit 127
fi

mkdir -p "$report_dir"
args=(run "$collection" -d "$data" -r cli,json,htmlextra --reporter-json-export "$report_dir/newman-report.json" --reporter-htmlextra-export "$report_dir/newman-report.html")
if [[ "$no_cli_failures" == "true" ]]; then args+=(--reporter-cli-no-failures); fi
if [[ -n "$environment" ]]; then
  if [[ ! -f "$environment" ]]; then echo "Environment file does not exist: $environment" >&2; exit 2; fi
  args+=(-e "$environment")
fi

set +e
"$newman_bin" "${args[@]}" 2>&1 | tee "$report_dir/cli.log"
status=${PIPESTATUS[0]}
set -e
if [[ ! -s "$report_dir/newman-report.json" || ! -s "$report_dir/newman-report.html" ]]; then
  echo "Newman did not produce both JSON and HTML reports. Verify newman-reporter-htmlextra is installed." >&2
  exit 3
fi
exit "$status"
