#!/usr/bin/env python3
"""Generate the CSV inputs for the HW05 Workflow 5 test plans.

Two files, both load-bearing (HW05 §6 requires the workflow to be data-driven):

  accounts.csv  email,newPassword,shippingAddress
  products.csv  productId,productName,unitPrice,quantity

Peak concurrency across all four scenarios is 320 (Spike: 20 baseline VU plus
a 300 VU burst; Stress tops out at 300). 600 account rows is roughly twice the
peak, so threads in flight at the same moment cannot land on the same account,
with headroom if calibration raises the thread counts.

Every account's newPassword is also the password it is registered with, which
makes the forgot -> reset -> login journey replay identically on every run.
"""
import argparse
import csv
import pathlib

REPO = pathlib.Path(__file__).resolve().parents[2]
DATA = REPO / "perf" / "data"

DISTRICTS = [
    "Quan 1", "Quan 3", "Quan 5", "Quan 7", "Quan 10",
    "Quan Binh Thanh", "Quan Phu Nhuan", "Quan Go Vap", "TP Thu Duc", "Quan Tan Binh",
]

# The seeded catalogue: ids 1-5, prices in VND.
PRODUCTS = [
    (1, "iPhone 15 Pro Max", 30000000, 1),
    (2, "Samsung Galaxy S24 Ultra", 28000000, 1),
    (3, "MacBook Pro M3", 45000000, 1),
    (4, "Tai nghe AirPods Pro 2", 6000000, 2),
    (5, "Ban phim co Keychron Q1", 4000000, 2),
]


def gen_accounts(count):
    rows = []
    for i in range(1, count + 1):
        rows.append({
            "email": f"perf{i:04d}@hw05.local",
            "newPassword": f"Perf{i:04d}!",
            "shippingAddress": f"{i} Duong So {i % 50 + 1}, {DISTRICTS[i % len(DISTRICTS)]}, TP.HCM",
        })
    return rows


def write_csv(path, fieldnames, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
    return len(rows)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", type=int, default=600)
    args = ap.parse_args()

    n = write_csv(DATA / "accounts.csv",
                  ["email", "newPassword", "shippingAddress"],
                  gen_accounts(args.accounts))
    print(f"accounts.csv: {n} rows")

    n = write_csv(DATA / "products.csv",
                  ["productId", "productName", "unitPrice", "quantity"],
                  [dict(zip(["productId", "productName", "unitPrice", "quantity"], p))
                   for p in PRODUCTS])
    print(f"products.csv: {n} rows")


if __name__ == "__main__":
    main()
