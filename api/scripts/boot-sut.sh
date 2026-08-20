#!/usr/bin/env bash
# Restart the EShop backend on a freshly seeded DB. Run before each full Newman suite.
set -euo pipefail
SUT_DIR="${SUT_DIR:-/Users/hbn/Documents/eshop-sut/backend}"
pkill -f "node server.js" 2>/dev/null || true
sleep 1
( cd "$SUT_DIR" && node server.js >/tmp/eshop-sut.log 2>&1 & )
# wait for readiness
for i in $(seq 1 20); do
  if curl -sf http://localhost:3000/api/products >/dev/null; then echo "SUT ready"; exit 0; fi
  sleep 0.5
done
echo "SUT failed to boot"; cat /tmp/eshop-sut.log; exit 1
