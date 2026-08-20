# Coverage and oracle checklist

## Domain partitions

Inventory every path, query, header, and body parameter. Cover applicable classes: representative valid value; omitted; null; empty; whitespace; wrong primitive/container type; minimum/below minimum; maximum/above maximum; format; Unicode; duplicate; unknown field; order-dependent interaction; and pairwise combinations. Avoid many cosmetic variations of the same partition.

## State transitions

Model states, allowed transitions, forbidden transitions, repeated/idempotent operations, ownership, terminal states, timeout/expiry, and concurrent or stale-state behavior. For a nominally stateless read endpoint, test observable resource lifecycle/authorization state and document why other transitions are not applicable.

## Security

Map relevant cases to the repository requirements:

- `SEC-01`: passwords are not stored or returned as plaintext.
- `SEC-02`: protected APIs require a valid JWT.
- `SEC-03`: admin APIs enforce the admin role, not token presence alone.
- `SEC-04`: user-controlled display data is escaped at the UI boundary when applicable.
- `SEC-05`: database queries resist SQL injection through parameterization.
- `SEC-06`: profile updates cannot change `role` from the client.
- `SEC-07`: reset OTP has at least six digits, expiry, sufficient entropy, and single use.

Also consider IDOR/BOLA, horizontal and vertical privilege escalation, mass assignment, information leakage, malformed JWTs, replay, brute force/rate limiting, content-type confusion, oversized input, injection, and unsafe errors. Run only non-destructive payloads against the assigned SUT.

## Schema validation

Assert the exact documented status, `application/json` where applicable, top-level type, required fields, forbidden sensitive fields, primitive types, nullable behavior, formats, array item schema, and stable invariants. Treat an undocumented field as a finding only when it creates a security or contract violation; otherwise record a specification gap.

## Defect oracle

A failed assertion is not automatically a product bug. Require all of: documented oracle, satisfied preconditions, correct test script, reproducibility, minimal request, actual contradiction, and retained raw evidence.
