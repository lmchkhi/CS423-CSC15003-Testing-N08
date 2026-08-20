#!/usr/bin/env bash
set -euo pipefail
newman run api/collections/eshop-hw06.postman_collection.json \
  -e api/environments/local.postman_environment.json \
  --folder "FR-14 Category CRUD" \
  -d api/data/fr14-post-categories.csv \
  -r cli,htmlextra \
  --reporter-htmlextra-export api/newman/fr14-category-report.html \
  --reporter-htmlextra-title "FR-14 Category CRUD Test Report" \
  --reporter-htmlextra-logs
