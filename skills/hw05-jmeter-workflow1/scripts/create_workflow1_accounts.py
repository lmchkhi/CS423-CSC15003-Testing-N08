#!/usr/bin/env python3
"""Create EShop users through /api/register and write Workflow 1 CSV data."""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path
from urllib import error, request


PRODUCTS = [
    ("phone", 1, "iPhone 15 Pro Max", 30000000, 1),
    ("samsung", 2, "Samsung Galaxy S24 Ultra", 28000000, 1),
    ("laptop", 3, "MacBook Pro M3", 45000000, 1),
    ("airpods", 4, "Tai nghe AirPods Pro 2", 6000000, 2),
    ("keychron", 5, "Bàn phím cơ Keychron Q1", 4000000, 2),
]


def post_json(url: str, payload: dict[str, str]) -> tuple[int, str]:
    data = json.dumps(payload).encode("utf-8")
    req = request.Request(
        url,
        data=data,
        method="POST",
        headers={"Content-Type": "application/json"},
    )
    try:
        with request.urlopen(req, timeout=10) as response:
            return response.status, response.read().decode("utf-8")
    except error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://localhost:3000")
    parser.add_argument("--count", type=int, default=50)
    parser.add_argument("--prefix", required=True, help="Email prefix, e.g. hw05-perf-20260815")
    parser.add_argument("--domain", default="example.com")
    parser.add_argument("--password", default="Test1234!")
    parser.add_argument("--out", default="testing-artifacts/hw05/data/workflow1_users.csv")
    args = parser.parse_args()

    rows = []
    register_url = f"{args.base_url.rstrip('/')}/api/register"
    for index in range(1, args.count + 1):
        email = f"{args.prefix}-{index:03d}@{args.domain}"
        payload = {
            "name": f"HW05 Perf User {index:03d}",
            "email": email,
            "password": args.password,
        }
        status, body = post_json(register_url, payload)
        if status not in {200, 201, 409, 400}:
            print(f"Unexpected register status for {email}: {status} {body}", file=sys.stderr)
        product = PRODUCTS[(index - 1) % len(PRODUCTS)]
        keyword, product_id, product_name, product_price, quantity = product
        rows.append(
            {
                "email": email,
                "password": args.password,
                "keyword": keyword,
                "productId": product_id,
                "productName": product_name,
                "productPrice": product_price,
                "quantity": quantity,
                "totalAmount": product_price * quantity,
                "shippingAddress": f"{index} Nguyen Hue, Q1, TP.HCM",
                "registerStatus": status,
            }
        )
        print(f"{email}: HTTP {status}")

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "email",
        "password",
        "keyword",
        "productId",
        "productName",
        "productPrice",
        "quantity",
        "totalAmount",
        "shippingAddress",
    ]
    with out.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row[key] for key in fieldnames})

    print(f"Wrote {len(rows)} CSV rows to {out}")


if __name__ == "__main__":
    main()
