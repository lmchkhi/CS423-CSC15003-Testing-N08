# FR-08 Phase A — API observations

- Observed at: `05/08/2026 11:47`
- Backend: `http://localhost:3000`
- API source: public `src/eshop-sut/api_specification.md`
- Credentials and JWT values are intentionally omitted.

## Test data selected from `GET /api/products`

| Field | Value |
| --- | --- |
| Product ID | `4` |
| Name | `Tai nghe AirPods Pro 2` |
| Unit price | `6,000,000` |
| Quantity | `2` |
| Observed cart total | `12,000,000` |

Each stateful independent point was rerun with a newly registered role-user account so the precondition was isolated. For cases requiring a non-empty cart, `GET /api/cart` produced an observed total of `12,000,000` immediately before checkout.

## Clean-run results

| Independent point | Pre-cart | Checkout | Persisted order observation | Postcondition |
| --- | ---: | ---: | --- | --- |
| `DT-002` | N/A | `401` | No authenticated order lookup applicable | Missing token rejected |
| `DT-003` | N/A | `403` | No authenticated order lookup applicable | `Bearer invalid-token` rejected |
| `DT-014` | `0` | `200`, order `25` | `total_amount=12000000`, `pending` | Order created from an empty cart |
| `DT-001 + DT-015` | `12000000` | `200`, order `26` | `total_amount=12000000`, `pending` | Cart still contained its item |
| `BVA-001` | `12000000` | `200`, order `27` | `total_amount=-1` | Client total trusted |
| `DT-004 + BVA-003` | `12000000` | `200`, order `28` | `total_amount=1` | Client total trusted |
| `DT-005 + BVA-002` | `12000000` | `200`, order `29` | `total_amount=0` | Client total trusted |
| `DT-006` | `12000000` | `200`, order `30` | `total_amount=-50000` | Client total trusted |
| `DT-007` | `12000000` | `200`, order `31` | `total_amount=99999999` | Client total trusted |
| `DT-008` | `12000000` | `200`, order `32` | `total_amount=null` | Missing total persisted as null |
| `DT-009` | `12000000` | `200`, order `33` | `total_amount="NaN"` | String `NaN` persisted |
| `DT-010` | `12000000` | `200`, order `34` | `shipping_address=""` | Empty address accepted |
| `DT-011` | `12000000` | `200`, order `35` | `shipping_address=null` | Default profile address had been set successfully (`PUT 200`) but was not used |
| `DT-012` | `12000000` | `200`, order `36` | XSS payload persisted as the original string | Admin Orders UI could not be reached during Phase A observation |
| `DT-013` | `12000000` | `200`, order `37` | SQL payload persisted exactly as plain text; subsequent order-detail/orders calls remained `200` | No SQL command execution observed |

An additional representative rerun for `DT-001 + DT-015` produced order `38`: cart count was exactly `1` before checkout and exactly `1` after checkout.

## Test-environment side effects

- Preliminary observation created orders `1–24`; isolated verification created orders `25–38`.
- Temporary role-user accounts with IDs `3–18` were created to isolate cart state. Their generated emails/passwords are not recorded here.
- The original `test@eshop.com` cart accumulated 12 AirPods rows during preliminary observation.
- Public cleanup probes `DELETE /api/cart/4` and `DELETE /api/cart` both returned `404`; no source/database cleanup was attempted.
