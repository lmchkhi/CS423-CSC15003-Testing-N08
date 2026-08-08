#!/usr/bin/env python3
"""Resolve exact Codex audit metadata from one matching rollout JSONL."""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--thread-id", required=True)
    parser.add_argument(
        "--codex-root",
        type=Path,
        default=Path.home() / ".codex",
        help="Codex data root containing sessions/ (default: ~/.codex)",
    )
    return parser.parse_args()


def model_display_name(model_id: str) -> str:
    parts = model_id.split("-")
    if len(parts) >= 2 and parts[0].lower() == "gpt":
        family = f"GPT-{parts[1]}"
        suffix = " ".join(part.capitalize() for part in parts[2:])
        return f"{family} {suffix}".strip()
    return model_id


def parse_iso(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def main() -> int:
    args = parse_args()
    sessions_dir = args.codex_root.expanduser().resolve() / "sessions"
    matches = sorted(sessions_dir.rglob(f"*{args.thread_id}.jsonl"))
    if len(matches) != 1:
        raise SystemExit(
            f"Expected exactly one rollout for {args.thread_id}; found {len(matches)}"
        )

    contexts: list[dict[str, str]] = []
    with matches[0].open(encoding="utf-8") as handle:
        for line in handle:
            try:
                item = json.loads(line)
            except json.JSONDecodeError:
                continue
            if item.get("type") != "turn_context":
                continue
            payload = item.get("payload") or {}
            contexts.append(
                {
                    "turn_id": str(payload.get("turn_id") or ""),
                    "started_at": str(item.get("timestamp") or ""),
                    "model_id": str(payload.get("model") or ""),
                    "timezone": str(payload.get("timezone") or ""),
                }
            )

    if not contexts:
        raise SystemExit(f"No turn_context records found in {matches[0]}")

    first = contexts[0]
    model_ids = list(dict.fromkeys(c["model_id"] for c in contexts if c["model_id"]))
    timezone = next((c["timezone"] for c in contexts if c["timezone"]), "")
    local_timestamp = ""
    if first["started_at"] and timezone:
        try:
            local_timestamp = (
                parse_iso(first["started_at"])
                .astimezone(ZoneInfo(timezone))
                .strftime("%d/%m/%Y %H:%M:%S")
            )
        except (ValueError, ZoneInfoNotFoundError):
            local_timestamp = ""

    result = {
        "thread_id": args.thread_id,
        "session_file": str(matches[0]),
        "chat_started_at": first["started_at"],
        "timezone": timezone,
        "local_chat_start": local_timestamp,
        "model_ids": model_ids,
        "model_display_name": "; ".join(model_display_name(item) for item in model_ids),
        "turns": [
            {
                **context,
                "model_display_name": model_display_name(context["model_id"]),
            }
            for context in contexts
        ],
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
