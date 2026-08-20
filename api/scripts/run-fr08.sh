#!/usr/bin/env bash
set -euo pipefail

newman run api/collections/eshop-hw06.postman_collection.json \
  -e api/environments/local.postman_environment.json \
  --folder "FR-08 Checkout" \
  -d api/data/checkout-cases.json \
  -r cli,htmlextra,json \
  --reporter-htmlextra-export api/newman/fr08-checkout-report.html \
  --reporter-json-export api/newman/fr08-checkout-report.json
