#!/usr/bin/env bash
set -euo pipefail
bash api/scripts/boot-sut.sh
newman run api/collections/eshop-hw06.postman_collection.json \
  -e api/environments/local.postman_environment.json \
  -r cli,htmlextra,json \
  --reporter-htmlextra-export api/newman/full-run-report.html \
  --reporter-json-export api/newman/full-run-report.json
