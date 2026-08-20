"""
test-generator.py — Pseudocode reference implementation for the AI-driven API Test Generator Skill.

Pipeline stages (mirrors diagrams/test-generator.png):
  1. parse_spec         — Extract endpoint contract from the API spec
  2. partition_param    — Domain-partition every request parameter
  3. security_cases     — Apply SEC-01 → SEC-07 security rule set
  4. schema_cases       — Extract success/error schema oracles
  5. state_cases        — Model state transitions (if applicable)
  6. emit_markdown      — Output TC-* table in Markdown
  7. emit_data_json     — Output *-cases.json (data-driven rows)

Usage (conceptual — run inside the api-test-generator Skill):
  spec = parse_spec("api-specification.md", endpoint="POST /api/register")
  rows = []
  for param in spec.params:
      rows += partition_param(param)
  rows += security_cases(spec)
  rows += schema_cases(spec)
  rows += state_cases(spec)
  emit_markdown(rows, out="test-cases/FR-01-register/ai-generated.md")
  emit_data_json(rows, out="api/data/register-cases.json")
"""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any


# ── Data structures ────────────────────────────────────────────────────────────

@dataclass
class ParamSpec:
    name: str
    type: str           # string | number | boolean | object
    required: bool
    constraints: list[str] = field(default_factory=list)  # e.g. ["email", "min:8"]


@dataclass
class EndpointSpec:
    method: str
    path: str
    auth: str           # none | bearer-user | bearer-admin
    params: list[ParamSpec]
    success_status: int
    success_schema: dict[str, Any]
    error_status: int


@dataclass
class TestCase:
    id: str             # e.g. "TC-FR01-001"
    category: str       # domain | security | schema | state
    desc: str
    inputs: dict[str, Any]
    precondition: str
    expected_status: int
    expected_schema: bool
    known_bug: bool = False


# ── Stage 1: Parse spec ────────────────────────────────────────────────────────

def parse_spec(spec_file: str, endpoint: str) -> EndpointSpec:
    """
    Read the Markdown API spec and extract the contract for the given endpoint.
    Returns an EndpointSpec with all parameters, auth requirement, and schemas.
    """
    # Implementation: grep spec_file for the endpoint section, parse parameter
    # tables, success/error response blocks.
    raise NotImplementedError("Implemented by the Skill's AI driver step-by-step")


# ── Stage 2: Domain partition each parameter ───────────────────────────────────

PARTITION_RULES = {
    "email":    ["valid", "empty", "missing", "no-@", "no-domain", "no-TLD",
                 "leading-space", "duplicate", "sql-meta", "xss", "very-long-320"],
    "password": ["valid", "empty", "missing", "too-short-<8", "no-uppercase",
                 "no-digit", "no-special", "only-spaces", "very-long-500"],
    "name":     ["valid", "empty", "missing", "very-long-300", "unicode",
                 "whitespace-only", "numeric-only", "special-chars"],
    "number":   ["positive", "zero", "negative", "missing", "non-numeric-string",
                 "float", "huge", "boundary-1"],
    "string":   ["valid", "empty", "missing", "very-long", "unicode",
                 "whitespace-only", "sql-meta"],
}

def partition_param(param: ParamSpec) -> list[TestCase]:
    """
    For each partition class applicable to param.type / param.constraints,
    produce one TestCase with the appropriate input value and expected status.
    """
    cases = []
    partitions = PARTITION_RULES.get(
        next((c for c in param.constraints if c in PARTITION_RULES), param.type), []
    )
    for partition in partitions:
        tc = TestCase(
            id=f"TC-{param.name.upper()}-{partition}",
            category="domain",
            desc=f"{param.name} — {partition}",
            inputs={param.name: _value_for(partition)},
            precondition="clean SUT state",
            expected_status=200 if partition == "valid" else 400,
            expected_schema=partition == "valid",
        )
        cases.append(tc)
    return cases


def _value_for(partition: str) -> Any:
    """Map a partition label to a representative concrete value."""
    MAP = {
        "valid": "example@test.com",
        "empty": "",
        "missing": None,
        "no-@": "bademail.com",
        "no-domain": "user@",
        "no-TLD": "user@domain",
        "leading-space": " user@test.com",
        "duplicate": "existing@test.com",
        "sql-meta": "a' OR '1'='1",
        "xss": "<script>alert(1)</script>",
        "very-long-320": "a" * 320 + "@test.com",
        "too-short-<8": "Aa1!",
        "no-uppercase": "password1!",
        "no-digit": "Password!",
        "no-special": "Password1",
        "only-spaces": "        ",
        "very-long-500": "A" * 500,
        "positive": 200000,
        "zero": 0,
        "negative": -5000,
        "non-numeric-string": "abc",
        "float": 99.99,
        "huge": 10**12,
        "boundary-1": 1,
        "very-long": "x" * 300,
        "unicode": "Đồng hồ thông minh",
        "whitespace-only": "   ",
        "numeric-only": "12345",
        "special-chars": "!@#$%^&*()",
        "very-long-300": "a" * 300,
        "very-long-320": "a" * 320,
    }
    return MAP.get(partition, f"[{partition}]")


# ── Stage 3: Security rule set SEC-01 → SEC-07 ────────────────────────────────

SECURITY_RULES = [
    ("SEC-01", "SQL injection in each string parameter",
     lambda spec: [{"param": p.name, "value": "'; DROP TABLE users; --"}
                   for p in spec.params if p.type == "string"]),
    ("SEC-02", "XSS payload in each string parameter",
     lambda spec: [{"param": p.name, "value": "<img src=x onerror=alert(1)>"}
                   for p in spec.params if p.type == "string"]),
    ("SEC-03", "Missing authentication token → 401",
     lambda spec: [{"auth": None}] if spec.auth != "none" else []),
    ("SEC-04", "Malformed/invalid authentication token → 401/403",
     lambda spec: [{"auth": "Bearer not.a.real.token"}] if spec.auth != "none" else []),
    ("SEC-05", "Privilege escalation — non-admin user on admin-only endpoint",
     lambda spec: [{"auth": "Bearer {{userToken}}"}] if spec.auth == "bearer-admin" else []),
    ("SEC-06", "IDOR — access another user's resource without authorization",
     lambda spec: [{"note": "replace :id with another user's resource id, no auth"}]),
    ("SEC-07", "Mass assignment / extra fields in body",
     lambda spec: [{"role": "admin", "isAdmin": True}]),
]

def security_cases(spec: EndpointSpec) -> list[TestCase]:
    """Apply every relevant security rule to the endpoint."""
    cases = []
    for rule_id, rule_desc, gen_inputs in SECURITY_RULES:
        for inp in gen_inputs(spec):
            cases.append(TestCase(
                id=f"TC-SEC-{rule_id}",
                category="security",
                desc=f"{rule_desc}",
                inputs=inp,
                precondition="clean SUT state",
                expected_status=400,
                expected_schema=False,
            ))
    return cases


# ── Stage 4: Schema oracle ─────────────────────────────────────────────────────

def schema_cases(spec: EndpointSpec) -> list[TestCase]:
    """
    Generate test cases that validate the exact success/error response schema.
    - Happy path → assert each key in spec.success_schema
    - Error paths → assert error body has 'message' key
    """
    cases = [
        TestCase(
            id="TC-SCHEMA-success",
            category="schema",
            desc=f"Success body matches {spec.success_schema}",
            inputs={p.name: _value_for("valid") for p in spec.params},
            precondition="clean SUT state",
            expected_status=spec.success_status,
            expected_schema=True,
        ),
        TestCase(
            id="TC-SCHEMA-missing-required",
            category="schema",
            desc="Empty body → error body has 'message' field",
            inputs={},
            precondition="clean SUT state",
            expected_status=spec.error_status,
            expected_schema=False,
        ),
    ]
    return cases


# ── Stage 5: State transitions ─────────────────────────────────────────────────

def state_cases(spec: EndpointSpec) -> list[TestCase]:
    """
    If the endpoint is transactional (creates/modifies resource state),
    model the reachable transitions and generate one case per legal + illegal edge.

    Example for Order (FR-10):
      pending → confirmed → shipping → delivered  (legal)
      canceled → delivered                         (illegal — bug in SUT)
      pending → delivered                          (illegal skip)
    """
    # For non-stateful endpoints return empty list.
    # Concrete state machines are defined per-endpoint in the Skill invocation.
    return []


# ── Stage 6: Emit Markdown table ──────────────────────────────────────────────

def emit_markdown(cases: list[TestCase], out: str) -> None:
    """
    Write a numbered TC-* table to *out* in the project format:
    | ID | Category | Input | Precondition | Expected (per spec) | Oracle |
    """
    header = "| ID | Category | Description | Input | Precondition | Expected Status | Schema? |\n"
    sep    = "|----|---------|----|------|-------------|-----------------|--------|\n"
    rows   = []
    for i, tc in enumerate(cases, 1):
        row = (f"| {tc.id or f'TC-{i:03d}'} | {tc.category} | {tc.desc} "
               f"| {tc.inputs} | {tc.precondition} | {tc.expected_status} "
               f"| {'✅' if tc.expected_schema else '❌'} |")
        rows.append(row)
    content = f"# AI-Generated Test Cases\n\n{header}{sep}" + "\n".join(rows) + "\n"
    with open(out, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Wrote {len(cases)} cases → {out}")


# ── Stage 7: Emit data JSON ────────────────────────────────────────────────────

def emit_data_json(cases: list[TestCase], out: str) -> None:
    """
    Write a *-cases.json (Postman Collection Runner / Newman -d format):
    [{ "_desc", inputs..., "expectStatus", "expectSchema", "knownBug" }, ...]
    """
    import json
    rows = []
    for tc in cases:
        row = {"_desc": tc.desc, **tc.inputs,
               "expectStatus": tc.expected_status,
               "expectSchema": tc.expected_schema,
               "knownBug": tc.known_bug}
        rows.append(row)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"✅ Wrote {len(rows)} rows → {out}")
