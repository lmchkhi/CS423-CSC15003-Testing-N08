#!/usr/bin/env python3
"""Generate HW05 Workflow 1 JMeter JMX files and a CSV data template."""

from __future__ import annotations

import argparse
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape


SCENARIOS = {
    "Load": {
        "threads": 50,
        "ramp": 60,
        "duration": 300,
        "timer_ms": 1500,
        "listener_gui": "SummaryReport",
        "listener_name": "Summary Report",
    },
    "Stress": {
        "threads": 150,
        "ramp": 120,
        "duration": 420,
        "timer_ms": 800,
        "listener_gui": "StatVisualizer",
        "listener_name": "Aggregate Report",
    },
    "Spike": {
        "threads": 200,
        "ramp": 30,
        "duration": 120,
        "timer_ms": 0,
        "listener_gui": "ViewResultsFullVisualizer",
        "listener_name": "View Results Tree",
    },
    "Endurance": {
        "threads": 50,
        "ramp": 60,
        "duration": 900,
        "timer_ms": 1500,
        "listener_gui": "SummaryReport",
        "listener_name": "Summary Report",
    },
}


CSV_CONTENT = """email,password,keyword,productId,productName,productPrice,quantity,totalAmount,shippingAddress
test@eshop.com,Test1234!,phone,1,iPhone 15 Pro Max,30000000,1,30000000,"123 Le Loi, Q1, TP.HCM"
test@eshop.com,Test1234!,laptop,3,MacBook Pro M3,45000000,1,45000000,"456 Nguyen Hue, Q1, TP.HCM"
test@eshop.com,Test1234!,airpods,4,Tai nghe AirPods Pro 2,6000000,2,12000000,"789 Cach Mang Thang Tam, Q3, TP.HCM"
"""


def prop(name: str, value: str) -> str:
    return f'<stringProp name="{name}">{escape(value)}</stringProp>'


def bool_prop(name: str, value: bool) -> str:
    return f'<boolProp name="{name}">{"true" if value else "false"}</boolProp>'


def int_prop(name: str, value: int) -> str:
    return f'<intProp name="{name}">{value}</intProp>'


def arguments(body: str | None = None) -> str:
    if body is None:
        return """
        <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
          <collectionProp name="Arguments.arguments"/>
        </elementProp>"""
    return f"""
        <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
          <collectionProp name="Arguments.arguments">
            <elementProp name="" elementType="HTTPArgument">
              {bool_prop("HTTPArgument.always_encode", False)}
              {prop("Argument.value", body)}
              {prop("Argument.metadata", "=")}
              {bool_prop("HTTPArgument.use_equals", True)}
            </elementProp>
          </collectionProp>
        </elementProp>"""


def auth_header() -> str:
    return """
        <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="Auth Header" enabled="true">
          <collectionProp name="HeaderManager.headers">
            <elementProp name="" elementType="Header">
              <stringProp name="Header.name">Authorization</stringProp>
              <stringProp name="Header.value">Bearer ${token}</stringProp>
            </elementProp>
          </collectionProp>
        </HeaderManager>
        <hashTree/>"""


def response_assertion(name: str, pattern: str) -> str:
    return f"""
        <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="{escape(name)}" enabled="true">
          <collectionProp name="Asserion.test_strings">
            <stringProp name="49586">{escape(pattern)}</stringProp>
          </collectionProp>
          <stringProp name="Assertion.custom_message"></stringProp>
          <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
          <boolProp name="Assertion.assume_success">false</boolProp>
          <intProp name="Assertion.test_type">8</intProp>
        </ResponseAssertion>
        <hashTree/>"""


def timer(ms: int) -> str:
    if ms <= 0:
        return ""
    return f"""
        <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think Time" enabled="true">
          {prop("ConstantTimer.delay", str(ms))}
          {prop("RandomTimer.range", str(ms))}
        </UniformRandomTimer>
        <hashTree/>"""


def sampler(name: str, method: str, path: str, body: str | None = None, authed: bool = False, children: str = "") -> str:
    return f"""
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="{escape(name)}" enabled="true">
          {arguments(body)}
          {prop("HTTPSampler.domain", "")}
          {prop("HTTPSampler.port", "")}
          {prop("HTTPSampler.protocol", "")}
          {prop("HTTPSampler.contentEncoding", "UTF-8")}
          {prop("HTTPSampler.path", path)}
          {prop("HTTPSampler.method", method)}
          {bool_prop("HTTPSampler.follow_redirects", True)}
          {bool_prop("HTTPSampler.auto_redirects", False)}
          {bool_prop("HTTPSampler.use_keepalive", True)}
          {bool_prop("HTTPSampler.DO_MULTIPART_POST", False)}
        </HTTPSamplerProxy>
        <hashTree>
          {auth_header() if authed else ""}
          {children}
        </hashTree>"""


def build_jmx(student_id: str, scenario: str, date: str, base_url: str, csv_path: str) -> str:
    cfg = SCENARIOS[scenario]
    parsed = urlparse(base_url)
    protocol = parsed.scheme or "http"
    host = parsed.hostname or "localhost"
    port = parsed.port or (443 if protocol == "https" else 80)
    test_name = f"{student_id}_{scenario}_{date}"

    login_body = '{\n  "email": "${email}",\n  "password": "${password}"\n}'
    cart_body = '{\n  "id": ${productId},\n  "name": "${productName}",\n  "price": ${productPrice},\n  "quantity": ${quantity}\n}'
    checkout_body = '{\n  "total_amount": ${totalAmount},\n  "shipping_address": "${shippingAddress}"\n}'

    login_children = f"""
          <JSONPostProcessor guiclass="JSONPostProcessorGui" testclass="JSONPostProcessor" testname="Extract token" enabled="true">
            {prop("JSONPostProcessor.referenceNames", "token")}
            {prop("JSONPostProcessor.jsonPathExprs", "$.token")}
            {prop("JSONPostProcessor.match_numbers", "1")}
            {prop("JSONPostProcessor.defaultValues", "TOKEN_NOT_FOUND")}
          </JSONPostProcessor>
          <hashTree/>
          {response_assertion("Login HTTP 200", "200")}"""

    samples = "\n".join(
        [
            sampler("01 Login", "POST", "/api/login", login_body, children=login_children),
            timer(cfg["timer_ms"]),
            sampler("02 Get Categories", "GET", "/api/categories", children=response_assertion("Categories HTTP 200", "200")),
            timer(cfg["timer_ms"]),
            sampler("03 Search Products", "GET", "/api/products?search=${keyword}", children=response_assertion("Search HTTP 200", "200")),
            timer(cfg["timer_ms"]),
            sampler("04 Product Detail", "GET", "/api/products/${productId}", children=response_assertion("Product Detail HTTP 200", "200")),
            timer(cfg["timer_ms"]),
            sampler("05 Add To Cart", "POST", "/api/cart", cart_body, authed=True, children=response_assertion("Cart HTTP 2xx", "20")),
            timer(cfg["timer_ms"]),
            sampler("06 Checkout", "POST", "/api/checkout", checkout_body, authed=True, children=response_assertion("Checkout HTTP 2xx", "20")),
        ]
    )

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="{test_name}" enabled="true">
      {bool_prop("TestPlan.functional_mode", False)}
      {bool_prop("TestPlan.serialize_threadgroups", False)}
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
    </TestPlan>
    <hashTree>
      <CSVDataSet guiclass="TestBeanGUI" testclass="CSVDataSet" testname="CSV Workflow Data" enabled="true">
        {prop("filename", csv_path)}
        {prop("fileEncoding", "UTF-8")}
        {prop("variableNames", "email,password,keyword,productId,productName,productPrice,quantity,totalAmount,shippingAddress")}
        {bool_prop("ignoreFirstLine", True)}
        {prop("delimiter", ",")}
        {bool_prop("quotedData", True)}
        {bool_prop("recycle", True)}
        {bool_prop("stopThread", False)}
        {prop("shareMode", "shareMode.all")}
      </CSVDataSet>
      <hashTree/>
      <ConfigTestElement guiclass="HttpDefaultsGui" testclass="ConfigTestElement" testname="HTTP Request Defaults" enabled="true">
        <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
          <collectionProp name="Arguments.arguments"/>
        </elementProp>
        {prop("HTTPSampler.domain", host)}
        {prop("HTTPSampler.port", str(port))}
        {prop("HTTPSampler.protocol", protocol)}
        {prop("HTTPSampler.contentEncoding", "UTF-8")}
      </ConfigTestElement>
      <hashTree/>
      <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="JSON Header" enabled="true">
        <collectionProp name="HeaderManager.headers">
          <elementProp name="" elementType="Header">
            {prop("Header.name", "Content-Type")}
            {prop("Header.value", "application/json")}
          </elementProp>
        </collectionProp>
      </HeaderManager>
      <hashTree/>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="{scenario} Thread Group" enabled="true">
        {prop("ThreadGroup.on_sample_error", "continue")}
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          {bool_prop("LoopController.continue_forever", True)}
          {prop("LoopController.loops", "-1")}
        </elementProp>
        {prop("ThreadGroup.num_threads", str(cfg["threads"]))}
        {prop("ThreadGroup.ramp_time", str(cfg["ramp"]))}
        {bool_prop("ThreadGroup.scheduler", True)}
        {prop("ThreadGroup.duration", str(cfg["duration"]))}
        {prop("ThreadGroup.delay", "0")}
        {bool_prop("ThreadGroup.same_user_on_next_iteration", True)}
      </ThreadGroup>
      <hashTree>
        {samples}
      </hashTree>
      <ResultCollector guiclass="{cfg["listener_gui"]}" testclass="ResultCollector" testname="{cfg["listener_name"]}" enabled="true">
        <boolProp name="ResultCollector.error_logging">false</boolProp>
        <objProp>
          <name>saveConfig</name>
          <value class="SampleSaveConfiguration">
            <time>true</time>
            <latency>true</latency>
            <timestamp>true</timestamp>
            <success>true</success>
            <label>true</label>
            <code>true</code>
            <message>true</message>
            <threadName>true</threadName>
            <dataType>true</dataType>
            <encoding>false</encoding>
            <assertions>true</assertions>
            <subresults>true</subresults>
            <responseData>false</responseData>
            <samplerData>false</samplerData>
            <xml>false</xml>
            <fieldNames>true</fieldNames>
            <responseHeaders>false</responseHeaders>
            <requestHeaders>false</requestHeaders>
            <responseDataOnError>false</responseDataOnError>
            <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
            <assertionsResultsToSave>0</assertionsResultsToSave>
            <bytes>true</bytes>
            <sentBytes>true</sentBytes>
            <url>true</url>
            <threadCounts>true</threadCounts>
            <idleTime>true</idleTime>
            <connectTime>true</connectTime>
          </value>
        </objProp>
        <stringProp name="filename"></stringProp>
      </ResultCollector>
      <hashTree/>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
"""


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--student-id", required=True)
    parser.add_argument("--date", required=True, help="YYYYMMDD")
    parser.add_argument("--out-dir", default="testing-artifacts/hw05")
    parser.add_argument("--base-url", default="http://localhost:3000")
    args = parser.parse_args()

    root = Path(args.out_dir)
    plans = root / "plans"
    data = root / "data"
    plans.mkdir(parents=True, exist_ok=True)
    data.mkdir(parents=True, exist_ok=True)

    csv_file = data / "workflow1_users.csv"
    if not csv_file.exists():
        csv_file.write_text(CSV_CONTENT, encoding="utf-8")
        print(csv_file)

    csv_ref = str(csv_file)
    for scenario in SCENARIOS:
        jmx = build_jmx(args.student_id, scenario, args.date, args.base_url, csv_ref)
        path = plans / f"{args.student_id}_{scenario}_{args.date}.jmx"
        path.write_text(jmx, encoding="utf-8")
        print(path)


if __name__ == "__main__":
    main()
