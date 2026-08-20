#!/usr/bin/env bash
set -euo pipefail
FOLDER="$1"; DATA="${2:-}"; OUT="${3:-api/newman/run}"
ARGS=(run api/collections/eshop-hw06.postman_collection.json
  -e api/environments/local.postman_environment.json
  --folder "$FOLDER"
  -r cli,htmlextra --reporter-htmlextra-export "${OUT}.html")
[ -n "$DATA" ] && ARGS+=(-d "$DATA")
newman "${ARGS[@]}"
