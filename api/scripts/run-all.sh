#!/usr/bin/env bash
# Boot a clean SUT and run every folder green: data-driven folders with their
# data file, state/lifecycle folders once. Any folder failure fails the script.
set -euo pipefail
cd "$(dirname "$0")/../.."
bash api/scripts/boot-sut.sh
C=api/collections/eshop-hw06.postman_collection.json
E=api/environments/local.postman_environment.json
mkdir -p api/newman
run() { # $1 folder  $2 out-name  $3 optional data file
  newman run "$C" -e "$E" --folder "$1" ${3:+-d "$3"} \
    -r cli,htmlextra,json \
    --reporter-htmlextra-export "api/newman/$2.html" \
    --reporter-json-export "api/newman/$2.json" \
    --reporter-htmlextra-title "HW06 $1 – 23127300"
}
run "FR-01 Register"            fr01-register-report   api/data/register-cases.json
run "FR-08 Checkout"            fr08-checkout-report   api/data/checkout-cases.json
run "FR-08 State & Security"    fr08-state-report
run "FR-14 Category CRUD"       fr14-category-report   api/data/fr14-post-categories.csv
run "FR-14 Lifecycle & Access"  fr14-lifecycle-report
echo "All folders passed."
