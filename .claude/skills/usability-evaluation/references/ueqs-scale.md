# UEQ-S (Short User Experience Questionnaire)

8-item bipolar semantic-differential scale (Schrepp, Hinderks & Thomaschewski,
2017), each rated -3 to +3 (e.g. a 7-point scale between the two adjectives).
Randomize which pole appears on the left/right per item when presenting to
participants if your tooling supports it (the official instrument does this
to reduce response bias); if administering on paper/plain text, keep it
simple and consistent instead.

Verify exact wording against the official PDF
(`ueq-online.org/Material/UEQS_Items.pdf`) if you can reach it — reproduced
here from the published paper for offline use:

## Pragmatic Quality items (1–4)
1. obstructive — supportive
2. complicated — easy
3. inefficient — efficient
4. confusing — clear

## Hedonic Quality items (5–8)
5. boring — exciting
6. not interesting — interesting
7. conventional — inventive
8. usual — leading edge

## Scoring

Map each response to −3..+3 (the negative pole listed first above = −3, the
positive pole = +3).

- **Pragmatic Quality (PQ)** = mean of items 1–4
- **Hedonic Quality (HQ)** = mean of items 5–8
- **Overall** = mean of all 8 items

Report per-participant subscale scores in their session file, and the mean
PQ/HQ/Overall across all 7 in `usability/analysis.md`. Interpret directionally
(PQ low + HQ okay ⇒ usability problem more than an appeal problem, and vice
versa) rather than against an external benchmark table, unless you've pulled
the official UEQ-S benchmark dataset to compare against.
