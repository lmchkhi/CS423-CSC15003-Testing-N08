# FR-11 — Phase D Execution Plan

## Approval and scope lock

- Phase C final approval: `approved, continue` on 2026-08-21.
- Subject endpoints: `GET /api/orders/my-orders` and `GET /api/orders/:id` only.
- Student ID: `23127464`.
- Collection-level pre-request script upserts `X-Student-Id: 23127464` for every subject request.

## Automated selection

| Origin | Eligible | Automated | Excluded |
|---|---:|---:|---:|
| AI-generated cases labelled `VALID` | 33 | 33 | 0 |
| Human-origin cases | 10 | 9 | 1 |
| Total | 43 | 42 | 1 |

The 2 AI cases labelled `INVALID` and 35 AI cases labelled `INCOMPLETE` are not converted into executable tests.

`FR11-MYO-H03` is not automated. It requires a controlled database-failure injection, while the approved material does not define a safe fixture mechanism or an exact error oracle. Converting it without those inputs would invent both execution behavior and evidence.

## Dependency setup

- `FR11-MYO-H02` may call the checkout endpoint only to create the required new-order precondition; assertions remain on `GET /api/orders/my-orders`.
- `FR11-DET-H03` may call the cancellation endpoint only to create the required canceled-order precondition; assertions remain on `GET /api/orders/:id`.
- Other orders/users are deterministic local fixtures created before Newman runs.

Implementation field names used by the executable adapter are only for locating fixture records in the observed SUT response. They do not upgrade missing API-spec schema details into a documented contract.

## Evidence policy

- Preserve the raw Newman console output and machine-readable report, including failures.
- Record command, working directory, timestamps, host, tool versions and exit code.
- Back up `database.sqlite` before starting the SUT because its startup resets the local database.
- The required Postman header screenshot remains a human-capture item; no synthetic screenshot will be created.
