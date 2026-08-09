# FR-07 Shopping Cart — Automation Review

## Scope and coverage

- Requirement: FR-07 Shopping Cart.
- Automated: 14/14 test cases; no unautomated cases.
- Techniques: equivalence partitioning, state transition, decision table, and UI checklist.
- External data: `tests/data/shopping-cart.json`.
- Projects: Chromium, Firefox, WebKit.
- Assertion patterns used include `toBeVisible`, `toHaveURL`, `toHaveCount`, `toContainText`, `toHaveText`, and scalar `toBe` checks.

## Official execution

| Browser | Timestamp (UTC) | Passed | Failed | HTML report |
|---|---|---:|---:|---|
| Chromium | 2026-08-09T05:55:09.293Z | 5 | 9 | `reports/shopping-cart/chromium/index.html` |
| Firefox | 2026-08-09T05:56:02.820Z | 5 | 9 | `reports/shopping-cart/firefox/index.html` |
| WebKit | 2026-08-09T05:57:03.022Z | 5 | 9 | `reports/shopping-cart/webkit/index.html` |

All three browsers reproduced the same nine failing cases. Failure triage confirmed seven independent product defects; TC-CART-010/011 share the missing quantity-controls defect, and TC-CART-012/013 share the missing confirmation-dialog defect.

## Human review corrections

The first Chromium draft run exposed three test-design defects that were corrected before official evidence runs:

1. TC-CART-004 originally omitted its product setup, so it reached the empty state instead of the cart table. The external dataset now adds product 7001 for this case.
2. Currency oracles originally assumed Vietnamese dot separators. Browser `toLocaleString()` used comma separators, while FR-07 only requires a thousands separator. Assertions now extract the numeric value and separately check that formatted row text contains a separator.
3. TC-CART-011 originally depended on the product correctly merging duplicate additions. Because that behavior is itself under test and defective, the minus-control check was made independent using a single product row.

Selectors were kept role-, heading-, and text-based in a page object. No arbitrary sleeps are used. Product responses are deterministically fulfilled from the external JSON dataset so the suite tests cart behavior without depending on mutable backend catalog data.

## Quality checks and assumptions

- Student ID `23127062` was obtained from the existing coursework report in this repository; it is supplied through environment variables and is not hard-coded in test source.
- Each test starts in a new Playwright page/context, which provides an empty in-memory cart and repeatable setup.
- The Frontend Web lint command currently reports 23 pre-existing errors and one warning across SUT files. The automation changes did not modify those SUT files.
- Confirmed local bug reports: `BUG-CART-001` through `BUG-CART-007`.
- GitHub duplicate checks reused issues #18, #19, #20, #21, #22, and #23; only issue #213 was newly created.
