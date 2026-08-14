#!/usr/bin/env python3
"""Unit tests for analyze_jtl.py — run: python3 perf/scripts/test_analyze_jtl.py"""
import pathlib
import sys
import tempfile
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import analyze_jtl  # noqa: E402

HEADER = ("timeStamp,elapsed,label,responseCode,responseMessage,threadName,"
          "dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,"
          "URL,Latency,IdleTime,Connect")


def jtl(rows):
    """Write a .jtl with the given (ts, elapsed, label, code, success) rows."""
    fh = tempfile.NamedTemporaryFile("w", suffix=".jtl", delete=False)
    fh.write(HEADER + "\n")
    for ts, elapsed, label, code, success in rows:
        fh.write(f"{ts},{elapsed},{label},{code},OK,tg 1-1,text,{success},,"
                 f"100,50,1,1,http://x,{elapsed},0,1\n")
    fh.close()
    return fh.name


class TestPercentile(unittest.TestCase):
    def test_p50_of_odd_length_is_the_middle_value(self):
        self.assertEqual(analyze_jtl.percentile([10, 20, 30], 50), 20)

    def test_p95_uses_nearest_rank(self):
        # 100 values 1..100 -> the 95th percentile is the 95th value.
        self.assertEqual(analyze_jtl.percentile(list(range(1, 101)), 95), 95)

    def test_p100_is_the_maximum(self):
        self.assertEqual(analyze_jtl.percentile([5, 9, 42], 100), 42)

    def test_empty_input_returns_zero(self):
        self.assertEqual(analyze_jtl.percentile([], 95), 0)


class TestSummarize(unittest.TestCase):
    def test_counts_errors_by_success_column(self):
        path = jtl([
            (1000, 10, "login", "200", "true"),
            (1500, 20, "login", "403", "false"),
        ])
        s = analyze_jtl.summarize(analyze_jtl.load_samples(path))
        self.assertEqual(s["overall"]["count"], 2)
        self.assertEqual(s["overall"]["errors"], 1)
        self.assertEqual(s["overall"]["error_pct"], 50.0)

    def test_splits_stats_by_label(self):
        path = jtl([
            (1000, 10, "login", "200", "true"),
            (1000, 30, "checkout", "200", "true"),
            (2000, 50, "checkout", "500", "false"),
        ])
        s = analyze_jtl.summarize(analyze_jtl.load_samples(path))
        self.assertEqual(s["by_label"]["login"]["count"], 1)
        self.assertEqual(s["by_label"]["checkout"]["count"], 2)
        self.assertEqual(s["by_label"]["checkout"]["errors"], 1)

    def test_throughput_is_samples_over_wallclock_seconds(self):
        # 5 samples spanning ts 1000..5000 -> 4s window (last start - first start)
        path = jtl([(1000 + i * 1000, 10, "x", "200", "true") for i in range(5)])
        s = analyze_jtl.summarize(analyze_jtl.load_samples(path))
        self.assertAlmostEqual(s["overall"]["throughput"], 5 / 4.0, places=3)

    def test_records_response_code_breakdown(self):
        path = jtl([
            (1000, 10, "login", "200", "true"),
            (1100, 10, "login", "403", "false"),
            (1200, 10, "login", "403", "false"),
        ])
        s = analyze_jtl.summarize(analyze_jtl.load_samples(path))
        self.assertEqual(s["by_label"]["login"]["codes"]["403"], 2)


class TestSteadyState(unittest.TestCase):
    def test_drops_samples_inside_the_ramp_window(self):
        rows = [(10_000 + i * 1000, 10, "x", "200", "true") for i in range(10)]
        samples = analyze_jtl.load_samples(jtl(rows))
        kept = analyze_jtl.steady_state(samples, 3)
        self.assertEqual(len(kept), 7)
        self.assertEqual(kept[0]["ts"], 13_000)

    def test_zero_skip_keeps_everything(self):
        rows = [(10_000 + i * 1000, 10, "x", "200", "true") for i in range(4)]
        samples = analyze_jtl.load_samples(jtl(rows))
        self.assertEqual(len(analyze_jtl.steady_state(samples, 0)), 4)

    def test_skip_longer_than_the_run_keeps_nothing(self):
        rows = [(10_000 + i * 1000, 10, "x", "200", "true") for i in range(4)]
        samples = analyze_jtl.load_samples(jtl(rows))
        self.assertEqual(analyze_jtl.steady_state(samples, 600), [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
