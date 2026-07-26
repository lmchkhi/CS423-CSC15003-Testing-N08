# System Usability Scale (SUS)

Standard 10-item instrument (Brooke, 1986). 5-point Likert scale per item,
"Strongly disagree" (1) to "Strongly agree" (5). Give participants the full
list; don't paraphrase items — SUS is only comparable across studies if the
wording is unchanged.

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to
   use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very
   quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this
    system.

Vietnamese participants: either administer in English if they're comfortable,
or use a faithful Vietnamese translation — keep the odd/even
positive/negative polarity intact if you translate, since the scoring depends
on it.

## Scoring (per participant)

For each item, convert the raw 1–5 response to a 0–4 "score contribution":
- **Odd items (1, 3, 5, 7, 9)** — positively worded: `contribution = response − 1`
- **Even items (2, 4, 6, 8, 10)** — negatively worded: `contribution = 5 − response`

Sum all 10 contributions (range 0–40), then multiply by 2.5 to get a 0–100
score:

```
SUS = 2.5 × [ (r1−1) + (r3−1) + (r5−1) + (r7−1) + (r9−1)
            + (5−r2) + (5−r4) + (5−r6) + (5−r8) + (5−r10) ]
```

Equivalently: `SUS = 2.5 × (20 + sum(odd) − sum(even))`.

## Reporting

- Report each participant's individual score in their session file.
- Report the mean (and ideally the spread — min/max or stdev) across all 7 in
  `usability/analysis.md`.
- SUS is a single composite score, not a diagnostic tool by itself — pair it
  with the qualitative synthesis (friction points, probe answers) to explain
  *why* the score landed where it did. A commonly cited rough benchmark is
  that scores around 68 are "average" and higher is better, but treat that as
  a rough anchor, not a pass/fail line — the synthesis matters more than the
  number.
