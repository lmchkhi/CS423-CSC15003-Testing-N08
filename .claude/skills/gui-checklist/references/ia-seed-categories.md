# IA seed categories — checklist-of-checklists

Use these to steer AI prompts toward concrete, testable items (per
sub-topic × screen) instead of a generic "find usability problems" prompt,
and to spot-check whether the AI's first pass left a sub-topic uncovered.
Standard GUI/usability heuristics (Nielsen, ISTQB GUI checklist areas) —
not specific to any one AI tool's output.

## IA01 — General UI standards
- Visual consistency: fonts, colors, spacing, icon style across screens
- Alignment & grid: elements aligned to a consistent grid, no stray offsets
- Color contrast (WCAG AA: 4.5:1 text, 3:1 large text/UI components)
- Branding consistency (logo placement, color palette, tone)
- Responsive layout at common breakpoints (mobile / tablet / desktop)
- Dark mode support and contrast in dark mode, if applicable
- Truncation/overflow handling for long product names, long Vietnamese text
- Currency and number formatting (₫, thousand separators)
- Date/time formatting consistency
- Loading performance perception (skeleton screens vs. blank flash)

## IA02 — Forms
- Every required field visibly marked; required vs. optional is unambiguous
- Inline validation timing (on blur vs. on submit) is consistent
- Error messages are specific and near the field, not just a generic banner
- Field-level constraints stated up front (password rules, max length)
- Autofill / autocomplete attributes set correctly (email, tel, etc.)
- Input types match data (numeric keypad for phone/OTP on mobile)
- Placeholder text is not used as a substitute for a real label
- Tab order follows visual/reading order
- Submit button disabled state / double-submit prevention
- Password visibility toggle, paste allowed in password fields
- Confirmation for destructive or irreversible form actions

## IA03 — Navigation
- Primary nav is reachable and consistent across all pages
- Breadcrumbs or back-navigation on deep pages (product detail, checkout steps)
- Current location indicated (active nav item, step indicator in checkout)
- Browser back/forward button behaves correctly (no lost state, no dead ends)
- 404 / not-found states link back into the app, not a dead end
- Search discoverable and consistently placed
- Deep links / direct URLs land on the right state (e.g. reload mid-checkout)
- Keyboard-only navigation reaches every interactive element in a sane order
- Focus is visible (focus ring not suppressed) on every focusable element
- Mobile: tap targets ≥ ~44×44px, no overlapping tap zones

## IA04 — Feedback / state
- Loading state shown for any action taking > ~300ms (spinner/skeleton)
- Success feedback after actions (added to cart, order placed, saved profile)
- Error feedback is specific, not a raw stack trace or generic "Error"
- Empty states (empty cart, no search results) have helpful guidance, not a blank page
- Disabled vs. enabled states are visually distinct
- Optimistic UI updates are rolled back correctly on failure (e.g. add-to-cart fails)
- Session/auth expiry is communicated, not a silent redirect to login
- Network-offline / slow-network feedback (no infinite spinners)
- Toasts/snackbars are readable long enough and dismissible
- Multi-step flows (checkout, password reset) show progress and allow going back without losing data

## Commonly AI-missed (examples from the assignment, not exhaustive)
- Accessibility: screen-reader labels (aria-label/alt text), semantic HTML, contrast
- RTL layout readiness (even if EShop is LTR-only, note whether the layout would break under RTL)
- Dark mode correctness (not just presence, but contrast/legibility within it)
- Vietnamese-specific: diacritics rendering in inputs/fonts, VN phone number and ID formats, ₫ formatting, address format (no ZIP-code assumption)
