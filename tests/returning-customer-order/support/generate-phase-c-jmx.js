const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflowCsv = 'tests/returning-customer-order/data/returning-customer-order.csv';
const jv = (name) => '${' + name + '}';

const xmlEscape = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&apos;');

function property(name, value) {
  return `          <elementProp name="${name}" elementType="Argument">
            <stringProp name="Argument.name">${name}</stringProp>
            <stringProp name="Argument.value">${xmlEscape(value)}</stringProp>
            <stringProp name="Argument.metadata">=</stringProp>
          </elementProp>`;
}

function timer() {
  return `          <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think time ngẫu nhiên 1-3 giây" enabled="true">
            <stringProp name="ConstantTimer.delay">1000</stringProp>
            <stringProp name="RandomTimer.range">2000</stringProp>
          </UniformRandomTimer>
          <hashTree/>`;
}

function statusAssertion() {
  return `          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="HTTP 200" enabled="true">
            <collectionProp name="Asserion.test_strings"><stringProp name="200">200</stringProp></collectionProp>
            <stringProp name="Assertion.custom_message">Expected HTTP 200</stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">8</intProp>
          </ResponseAssertion>
          <hashTree/>`;
}

function jsrAssertion(name, script) {
  return `          <JSR223Assertion guiclass="TestBeanGUI" testclass="JSR223Assertion" testname="${name}" enabled="true">
            <stringProp name="cacheKey">true</stringProp>
            <stringProp name="filename"></stringProp>
            <stringProp name="parameters"></stringProp>
            <stringProp name="script"><![CDATA[${script}]]></stringProp>
            <stringProp name="scriptLanguage">groovy</stringProp>
          </JSR223Assertion>
          <hashTree/>`;
}

function jsrPreProcessor(name, script) {
  return `          <JSR223PreProcessor guiclass="TestBeanGUI" testclass="JSR223PreProcessor" testname="${name}" enabled="true">
            <stringProp name="cacheKey">true</stringProp>
            <stringProp name="filename"></stringProp>
            <stringProp name="parameters"></stringProp>
            <stringProp name="script"><![CDATA[${script}]]></stringProp>
            <stringProp name="scriptLanguage">groovy</stringProp>
          </JSR223PreProcessor>
          <hashTree/>`;
}

function headers(auth, json) {
  const rows = [];
  if (json) rows.push(['Content-Type', 'application/json']);
  if (auth) rows.push(['Authorization', `Bearer ${jv('token')}`]);
  if (!rows.length) return '';
  const items = rows.map(([name, value]) => `              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">${name}</stringProp>
                <stringProp name="Header.value">${value}</stringProp>
              </elementProp>`).join('\n');
  return `          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP headers" enabled="true">
            <collectionProp name="HeaderManager.headers">${items}</collectionProp>
          </HeaderManager>
          <hashTree/>`;
}

function httpSampler({name, method, pathName, body, query, auth = false, json = false, pre = '', assertion, addTimer = true}) {
  const args = body !== undefined
    ? `              <boolProp name="HTTPArgument.always_encode">false</boolProp>
              <stringProp name="Argument.value">${body}</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>`
    : query
      ? `              <boolProp name="HTTPArgument.always_encode">true</boolProp>
              <stringProp name="Argument.name">${query.name}</stringProp>
              <stringProp name="Argument.value">${query.value}</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>
              <boolProp name="HTTPArgument.use_equals">true</boolProp>`
      : '';
  return `        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="${name}" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments">${args ? `<elementProp name="${query ? query.name : ''}" elementType="HTTPArgument">\n${args}\n            </elementProp>` : ''}</collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain"></stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol"></stringProp>
          <stringProp name="HTTPSampler.contentEncoding">UTF-8</stringProp>
          <stringProp name="HTTPSampler.path">${pathName}</stringProp>
          <stringProp name="HTTPSampler.method">${method}</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
          <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
        </HTTPSamplerProxy>
        <hashTree>
${addTimer ? timer() : ''}${pre}${headers(auth, json)}${statusAssertion()}${jsrAssertion(`${name} - assertion nghiệp vụ`, assertion)}        </hashTree>`;
}

const fixturePreProcessor = `import groovy.json.JsonOutput
import java.nio.charset.StandardCharsets

if (vars.get('fixtureLoaded') != 'true') {
    def csv = new File(vars.get('workflowCsv'))
    if (!csv.isAbsolute()) csv = new File(System.getProperty('user.dir'), vars.get('workflowCsv'))
    if (!csv.isFile()) throw new IllegalStateException('Không tìm thấy workflow CSV: ' + csv.canonicalPath)
    def lines = csv.readLines(StandardCharsets.UTF_8.name())
    if (lines.size() < 2) throw new IllegalStateException('Workflow CSV không có data row')
    def header = lines[0].split(',', -1) as List
    def expectedHeader = ['email','password','keyword','quantity','shippingAddress']
    if (header != expectedHeader) throw new IllegalStateException('Sai CSV header: ' + header)
    int offset = vars.get('scenarioOffset') as int
    int poolSize = vars.get('scenarioPoolSize') as int
    int threadIndex = ctx.getThreadNum()
    if (threadIndex < 0 || threadIndex >= poolSize) {
        ctx.getEngine().stopTest()
        throw new IllegalStateException('Hết row CSV: threadIndex=' + threadIndex + ', poolSize=' + poolSize)
    }
    int rowIndex = 1 + offset + threadIndex
    if (rowIndex >= lines.size()) {
        ctx.getEngine().stopTest()
        throw new IllegalStateException('Thiếu row CSV tại index=' + rowIndex)
    }
    def values = lines[rowIndex].split(',', -1) as List
    if (values.size() != expectedHeader.size() || values.any { it.trim().isEmpty() }) {
        ctx.getEngine().stopTest()
        throw new IllegalStateException('Row CSV rỗng/sai cột tại index=' + rowIndex)
    }
    expectedHeader.eachWithIndex { key, i -> vars.put(key, values[i].trim()) }
    if (!(vars.get('quantity') ==~ /[1-9]\\d*/)) throw new IllegalStateException('quantity phải là integer dương')
    if (!vars.get('email').toLowerCase().startsWith(vars.get('expectedEmailPrefix').toLowerCase())) {
        throw new IllegalStateException('Email không thuộc pool ' + vars.get('scenarioName'))
    }
    vars.put('fixtureLoaded', 'true')
}
vars.put('loginBody', JsonOutput.toJson([email: vars.get('email'), password: vars.get('password')]))`;

const loginAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof Map)) throw new IllegalStateException('Login body không phải JSON object')
    def token = json.token?.toString()?.trim()
    if (!token) throw new IllegalStateException('token rỗng')
    if (json.user?.email?.toString() != vars.get('email')) throw new IllegalStateException('user.email không khớp CSV')
    vars.put('token', token)
    log.info('RCO_VERIFY login tokenNonEmpty=true email=' + vars.get('email'))
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;

const searchAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof List) || json.isEmpty()) throw new IllegalStateException('Search phải trả JSON array không rỗng')
    def keyword = vars.get('keyword')?.toLowerCase()
    def product = json.find { it.name?.toString()?.toLowerCase()?.contains(keyword) }
    if (product == null) throw new IllegalStateException('Không có product match keyword CSV: ' + vars.get('keyword'))
    def id = product.id?.toString()?.trim(); def name = product.name?.toString()?.trim()
    if (!id || !name) throw new IllegalStateException('Product id/name rỗng')
    vars.put('productId', id); vars.put('productName', name)
    log.info('RCO_VERIFY search productId=' + id + ' productName=' + name)
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;

const detailAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof Map) || json.isEmpty()) throw new IllegalStateException('Detail phải là JSON object không rỗng')
    if (json.id?.toString() != vars.get('productId')) throw new IllegalStateException('Detail id không khớp productId')
    if (json.name?.toString() != vars.get('productName')) throw new IllegalStateException('Detail name không khớp productName')
    if (json.price == null) throw new IllegalStateException('Detail thiếu price')
    def raw = json.price.toString().trim(); if (!raw) throw new IllegalStateException('price rỗng')
    BigDecimal price = new BigDecimal(raw); if (price.signum() <= 0) throw new IllegalStateException('price không dương')
    int quantity = Integer.parseInt(vars.get('quantity')); if (quantity <= 0) throw new IllegalStateException('quantity không dương')
    def normalized = price.stripTrailingZeros().toPlainString()
    def total = price.multiply(new BigDecimal(quantity)).stripTrailingZeros().toPlainString()
    vars.put('detailPrice', raw); vars.put('normalizedPrice', normalized); vars.put('totalAmount', total)
    log.info('RCO_VERIFY detail productId=' + vars.get('productId') + ' productName=' + vars.get('productName') + ' priceRaw=' + raw + ' priceRuntimeType=' + json.price.getClass().simpleName + ' normalizedPrice=' + normalized + ' quantity=' + quantity + ' totalAmount=' + total)
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;

const cartAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof List)) throw new IllegalStateException('Cart phải là JSON array')
    log.info('RCO_VERIFY cart shape=array itemCount=' + json.size())
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;

const addCartPre = `import groovy.json.JsonOutput
vars.put('cartBody', JsonOutput.toJson([id: new BigInteger(vars.get('productId')), name: vars.get('productName'), price: new BigDecimal(vars.get('normalizedPrice')), quantity: Integer.parseInt(vars.get('quantity'))]))`;
const addCartAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof Map) || json.message?.toString() != 'Added to cart') throw new IllegalStateException('Add-cart response sai shape/message')
    log.info('RCO_VERIFY addCart message=Added to cart')
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;
const checkoutPre = `import groovy.json.JsonOutput
vars.put('checkoutBody', JsonOutput.toJson([total_amount: new BigDecimal(vars.get('totalAmount')), shipping_address: vars.get('shippingAddress')]))`;
const checkoutAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof Map) || json.message?.toString() != 'Checkout successful') throw new IllegalStateException('Checkout response sai shape/message')
    def id = json.orderId?.toString()?.trim(); if (!id || !(id ==~ /[1-9]\\d*/)) throw new IllegalStateException('orderId phải là ID dương')
    vars.put('orderId', id)
    log.info('RCO_VERIFY checkout orderId=' + id + ' totalAmount=' + vars.get('totalAmount'))
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;
const ordersAssertion = `import groovy.json.JsonSlurper
try {
    def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
    if (!(json instanceof List)) throw new IllegalStateException('My-orders phải là JSON array')
    if (!json.any { it.id?.toString() == vars.get('orderId') }) throw new IllegalStateException('Không tìm thấy exact orderId vừa checkout')
    log.info('RCO_VERIFY myOrders exactOrderIdFound=' + vars.get('orderId') + ' orderCount=' + json.size())
} catch (Throwable e) {
    AssertionResult.setFailure(true); AssertionResult.setFailureMessage(e.message)
}`;

function workflowTree() {
  return [
    httpSampler({name:'RCO-01-Login', method:'POST', pathName:`${jv('baseUrl')}/api/login`, body:jv('loginBody'), json:true, addTimer:false, pre:jsrPreProcessor('Nạp đúng một row CSV cho VU', fixturePreProcessor), assertion:loginAssertion}),
    httpSampler({name:'RCO-02-Search', method:'GET', pathName:`${jv('baseUrl')}/api/products`, query:{name:'search',value:jv('keyword')}, assertion:searchAssertion}),
    httpSampler({name:'RCO-03-ProductDetail', method:'GET', pathName:`${jv('baseUrl')}/api/products/${jv('productId')}`, assertion:detailAssertion}),
    httpSampler({name:'RCO-04-GetCart', method:'GET', pathName:`${jv('baseUrl')}/api/cart`, auth:true, assertion:cartAssertion}),
    httpSampler({name:'RCO-05-AddCart', method:'POST', pathName:`${jv('baseUrl')}/api/cart`, body:jv('cartBody'), auth:true, json:true, pre:jsrPreProcessor('Tạo JSON add-cart an toàn', addCartPre), assertion:addCartAssertion}),
    httpSampler({name:'RCO-06-Checkout', method:'POST', pathName:`${jv('baseUrl')}/api/checkout`, body:jv('checkoutBody'), auth:true, json:true, pre:jsrPreProcessor('Tạo JSON checkout an toàn', checkoutPre), assertion:checkoutAssertion}),
    httpSampler({name:'RCO-07-MyOrders', method:'GET', pathName:`${jv('baseUrl')}/api/orders/my-orders`, auth:true, assertion:ordersAssertion}),
  ].join('\n');
}

function standardSmokeThreadGroup() {
  return `      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Smoke 1 thread × 1 iteration" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp><stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">1</stringProp><stringProp name="ThreadGroup.ramp_time">1</stringProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp><stringProp name="ThreadGroup.duration"></stringProp><stringProp name="ThreadGroup.delay"></stringProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
      </ThreadGroup>`;
}

function ultimateThreadGroup(name, rows) {
  const schedule = rows.map((r, i) => `          <collectionProp name="schedule_${i}">${r.map((v, j) => `<stringProp name="c${i}_${j}">${v}</stringProp>`).join('')}</collectionProp>`).join('\n');
  return `      <kg.apc.jmeter.threads.UltimateThreadGroup guiclass="kg.apc.jmeter.threads.UltimateThreadGroupGui" testclass="kg.apc.jmeter.threads.UltimateThreadGroup" testname="${name}" enabled="true">
        <collectionProp name="ultimatethreadgroupdata">${schedule}</collectionProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <intProp name="LoopController.loops">-1</intProp>
        </elementProp>
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
      </kg.apc.jmeter.threads.UltimateThreadGroup>`;
}

function listener(type) {
  const config = {
    summary: ['Summary Report', 'SummaryReport'],
    aggregate: ['Aggregate Report', 'StatVisualizer'],
    tree: ['View Results Tree', 'ViewResultsFullVisualizer'],
  }[type];
  return `        <ResultCollector guiclass="${config[1]}" testclass="ResultCollector" testname="${config[0]}" enabled="true">
          <boolProp name="ResultCollector.error_logging">false</boolProp><objProp><name>saveConfig</name><value class="SampleSaveConfiguration"/></objProp><stringProp name="filename"></stringProp>
        </ResultCollector>
        <hashTree/>`;
}

function plan(config) {
  const props = [
    ['baseUrl', '${__P(baseUrl,http://127.0.0.1:3000)}'],
    ['workflowCsv', workflowCsv],
    ['scenarioName', config.scenario],
    ['scenarioOffset', config.offset],
    ['scenarioPoolSize', config.pool],
    ['expectedEmailPrefix', config.prefix],
  ].map(([k,v]) => property(k,v)).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Returning Customer Search and Order — ${config.scenario}" enabled="true">
      <stringProp name="TestPlan.comments">7-step RCO workflow; CSV data-driven; BigDecimal price normalization; generated in approved Phase C. Do not treat graded plans as executed.</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp><boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp><boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true"><collectionProp name="Arguments.arguments">
${props}
        </collectionProp></elementProp><stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
${config.threadGroup}
      <hashTree>
        <TransactionController guiclass="TransactionControllerGui" testclass="TransactionController" testname="RCO-E2E-ReturningCustomerOrder" enabled="true"><boolProp name="TransactionController.includeTimers">true</boolProp><boolProp name="TransactionController.parent">true</boolProp></TransactionController>
        <hashTree>
${workflowTree()}
        </hashTree>
${config.listener ? listener(config.listener) : ''}
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
`;
}

const plans = [
  {file:'test-cases/smoke/returning-customer-order-smoke.jmx', scenario:'Smoke', offset:'${__P(csvRowOffset,0)}', pool:'20', prefix:'rco.load.', threadGroup:standardSmokeThreadGroup(), listener:null},
  {file:'test-cases/load/23127464_Load_20260813.jmx', scenario:'Load', offset:'0', pool:'20', prefix:'rco.load.', threadGroup:ultimateThreadGroup('Load — 20 VU, ramp-up 60s, hold 360s', [[20,0,60,360,0]]), listener:'summary'},
  {file:'test-cases/stress/23127464_Stress_20260813.jmx', scenario:'Stress', offset:'20', pool:'80', prefix:'rco.stress.', threadGroup:ultimateThreadGroup('Stress — 10→20→40→60→80 VU, 60s/bậc', [[10,0,1,299,0],[10,60,1,239,0],[20,120,1,179,0],[20,180,1,119,0],[20,240,1,59,0]]), listener:'aggregate'},
  {file:'test-cases/spike/23127464_Spike_20260813.jmx', scenario:'Spike', offset:'100', pool:'50', prefix:'rco.spike.', threadGroup:ultimateThreadGroup('Spike — baseline 5, spike 50, recovery 5 VU', [[5,0,5,180,5],[45,60,5,60,5]]), listener:'tree'},
];

const mode = process.argv[2] || '--smoke';
if (!['--smoke', '--graded', '--all'].includes(mode)) {
  throw new Error('Usage: node generate-phase-c-jmx.js [--smoke|--graded|--all]');
}
const selectedPlans = mode === '--smoke' ? plans.slice(0, 1) : mode === '--graded' ? plans.slice(1) : plans;

for (const config of selectedPlans) {
  const destination = path.join(root, 'tests', 'returning-customer-order', config.file);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, plan(config), 'utf8');
  process.stdout.write(path.relative(root, destination) + '\n');
}
