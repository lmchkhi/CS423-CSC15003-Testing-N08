# Pseudocode: AI-Driven API Test Generator

## Algorithm Overview

**Mô tả:** Thuật toán sinh test case tự động cho API dựa trên specification, business requirements và security requirements. Quy trình gồm phân tích contract, sinh test theo nhiều kỹ thuật (domain partition, state transition, security, schema validation), loại bỏ trùng lặp, đánh giá coverage và bổ sung test cho vùng thiếu.

### Input / Output

```
INPUT:
    apiSpecification
    businessRequirements
    securityRequirements
    targetCasesPerAPI = 35

OUTPUT:
    generatedTestSuites
    coverageReports
    traceabilityMatrix
    specificationGaps
```

---

## 1. Hàm chính: `GenerateAllTests`

Hàm điều phối toàn bộ quá trình sinh test. Parse specification, lặp qua từng API scope, thu thập kết quả.

```
FUNCTION GenerateAllTests(
    apiSpecification,
    businessRequirements,
    securityRequirements,
    targetCasesPerAPI
):

    normalizedContract =
        ParseAndNormalizeSpecification(
            apiSpecification,
            businessRequirements,
            securityRequirements
        )

    generatedTestSuites = []
    coverageReports = []
    traceabilityMatrix = []
    specificationGaps = []

    FOR EACH apiScope IN normalizedContract.selectedAPIs:

        apiResult =
            GenerateTestsForAPI(
                apiScope,
                normalizedContract,
                targetCasesPerAPI
            )

        generatedTestSuites.ADD(apiResult.testCases)
        coverageReports.ADD(apiResult.coverageReport)
        traceabilityMatrix.ADD(apiResult.traceability)
        specificationGaps.ADD_ALL(apiResult.specificationGaps)

    RETURN {
        generatedTestSuites,
        coverageReports,
        traceabilityMatrix,
        specificationGaps
    }
```

---

## 2. Parse & Normalize Specification: `ParseAndNormalizeSpecification`

Trích xuất và chuẩn hóa thông tin từ API specification, ánh xạ business rules và security rules vào từng endpoint, đồng thời phát hiện specification gaps.

```
FUNCTION ParseAndNormalizeSpecification(
    apiSpecification,
    businessRequirements,
    securityRequirements
):

    contract = NEW NormalizedContract

    endpoints =
        ExtractEndpoints(apiSpecification)

    FOR EACH endpoint IN endpoints:

        normalizedEndpoint = NEW EndpointModel

        normalizedEndpoint.method =
            ExtractHTTPMethod(endpoint)

        normalizedEndpoint.path =
            ExtractPath(endpoint)

        normalizedEndpoint.authRequirements =
            ExtractAuthenticationRequirements(endpoint)

        normalizedEndpoint.parameters =
            ExtractParameters(endpoint)

        normalizedEndpoint.requestBody =
            ExtractRequestBody(endpoint)

        normalizedEndpoint.responseDefinitions =
            ExtractResponseDefinitions(endpoint)

        normalizedEndpoint.responseSchema =
            ExtractResponseSchema(endpoint)

        normalizedEndpoint.businessRules =
            MapBusinessRules(
                endpoint,
                businessRequirements
            )

        normalizedEndpoint.securityRules =
            MapApplicableSecurityRules(
                endpoint,
                securityRequirements
            )

        normalizedEndpoint.stateModel =
            ExtractStateModelIfApplicable(
                endpoint,
                businessRequirements
            )

        gaps =
            DetectSpecificationGaps(
                normalizedEndpoint
            )

        normalizedEndpoint.specificationGaps =
            gaps

        contract.endpoints.ADD(
            normalizedEndpoint
        )

    RETURN contract
```

---

## 3. Sinh test cho từng API: `GenerateTestsForAPI`

Hàm core sinh test case cho một API scope. Gồm 12 bước tuần tự từ domain partition đến final output.

```
FUNCTION GenerateTestsForAPI(
    apiScope,
    normalizedContract,
    targetCasesPerAPI
):

    candidateCases = []
    specificationGaps = []

    endpoints =
        ResolveEndpointsForAPIScope(
            apiScope,
            normalizedContract
        )

    FOR EACH endpoint IN endpoints:

        specificationGaps.ADD_ALL(
            endpoint.specificationGaps
        )
```

### Step 1: Domain Partition Test Generation

Phân vùng miền giá trị cho từng input parameter, sinh test case cho mỗi phân vùng (valid, invalid, boundary).

```
        allInputs =
            CollectAllInputs(endpoint)

        FOR EACH input IN allInputs:

            partitions =
                AnalyzeDomainPartitions(input)

            FOR EACH partition IN partitions:

                testCase =
                    BuildDomainTestCase(
                        endpoint,
                        input,
                        partition
                    )

                candidateCases.ADD(testCase)
```

### Step 2: State Transition Test Generation

Sinh test cho các chuyển đổi trạng thái hợp lệ và không hợp lệ (ví dụ: order status transitions).

```
        IF endpoint.stateModel EXISTS:

            validTransitions =
                GetValidTransitions(
                    endpoint.stateModel
                )

            invalidTransitions =
                DeriveInvalidTransitions(
                    endpoint.stateModel
                )

            FOR EACH transition IN validTransitions:

                testCase =
                    BuildStateTransitionTest(
                        endpoint,
                        transition,
                        expectedValidity = VALID
                    )

                candidateCases.ADD(testCase)

            FOR EACH transition IN invalidTransitions:

                testCase =
                    BuildStateTransitionTest(
                        endpoint,
                        transition,
                        expectedValidity = INVALID
                    )

                candidateCases.ADD(testCase)

            finalStates =
                GetFinalStates(
                    endpoint.stateModel
                )

            FOR EACH state IN finalStates:

                finalStateCases =
                    GenerateFinalStateTests(
                        endpoint,
                        state
                    )

                candidateCases.ADD_ALL(
                    finalStateCases
                )
```

### Step 3: Security Test Generation

Sinh test case bảo mật dựa trên security requirements áp dụng cho endpoint (authentication, authorization, injection, IDOR...).

```
        applicableSecurityRules =
            DetermineApplicableSecurityRules(
                endpoint
            )

        FOR EACH securityRule
            IN applicableSecurityRules:

            securityScenarios =
                GenerateSecurityScenarios(
                    endpoint,
                    securityRule
                )

            FOR EACH scenario
                IN securityScenarios:

                testCase =
                    BuildSecurityTestCase(
                        endpoint,
                        securityRule,
                        scenario
                    )

                candidateCases.ADD(testCase)
```

### Step 4: Response Schema Test Generation

Sinh test kiểm tra response schema (HTTP status, required fields, data types). Ghi nhận specification gap nếu schema thiếu.

```
        IF endpoint.responseSchema IS COMPLETE:

            schemaCases =
                GenerateSchemaValidationTests(
                    endpoint,
                    endpoint.responseSchema
                )

            candidateCases.ADD_ALL(
                schemaCases
            )

        ELSE IF endpoint.responseSchema IS PARTIAL
             OR endpoint.responseSchema IS MISSING:

            gap =
                CreateSpecificationGap(
                    endpoint,
                    "Response schema is incomplete or missing"
                )

            specificationGaps.ADD(gap)

            incompleteCase =
                CreateIncompleteSchemaTest(
                    endpoint,
                    gap
                )

            candidateCases.ADD(
                incompleteCase
            )
```

### Step 5: Authentication & Authorization Tests

Sinh test kiểm tra yêu cầu xác thực và phân quyền (missing token, invalid token, wrong role...).

```
        IF endpoint.authRequirements EXISTS:

            authCases =
                GenerateAuthenticationTests(
                    endpoint
                )

            candidateCases.ADD_ALL(
                authCases
            )

            roleCases =
                GenerateAuthorizationTestsIfApplicable(
                    endpoint
                )

            candidateCases.ADD_ALL(
                roleCases
            )
```

### Step 6: Negative & Robustness Tests

Sinh test case negative chung (malformed request, unexpected content-type, extra fields...).

```
        negativeCases =
            GenerateGeneralNegativeCases(
                endpoint
            )

        candidateCases.ADD_ALL(
            negativeCases
        )
```

### Step 7: Remove Duplicate Tests

Loại bỏ các test case trùng lặp về ngữ nghĩa.

```
    candidateCases =
        RemoveSemanticDuplicates(
            candidateCases
        )
```

### Step 8: Add Traceability

Liên kết mỗi test case với requirement source tương ứng.

```
    FOR EACH testCase IN candidateCases:

        testCase.requirementSources =
            ResolveRequirementSources(
                testCase,
                normalizedContract
            )

        testCase.traceability =
            BuildTraceabilityLinks(
                testCase
            )
```

### Step 9: Validate Test Oracles

Kiểm tra mỗi test case có expected result đáng tin cậy hay không. Đánh dấu `READY_FOR_HUMAN_REVIEW` hoặc `INCOMPLETE`.

```
    FOR EACH testCase IN candidateCases:

        IF ExpectedResultHasReliableSource(
            testCase
        ):

            testCase.generationStatus =
                "READY_FOR_HUMAN_REVIEW"

        ELSE:

            testCase.generationStatus =
                "INCOMPLETE"

            testCase.missingInformation =
                IdentifyMissingOracle(
                    testCase
                )
```

### Step 10: Coverage Analysis

Đánh giá mức độ coverage hiện tại trên nhiều chiều (domain, state, security, schema, requirement traceability).

```
    coverageReport =
        EvaluateCoverage(
            endpoints,
            candidateCases
        )
```

### Step 11: Coverage Gap Loop

Vòng lặp bổ sung test case cho các vùng coverage còn thiếu. Tối đa 5 lần lặp.

```
    iteration = 0
    MAX_GAP_ITERATIONS = 5

    WHILE (
        HasImportantCoverageGaps(
            coverageReport
        )
        OR Count(candidateCases)
           < targetCasesPerAPI
    )
    AND iteration < MAX_GAP_ITERATIONS:

        missingAreas =
            IdentifyCoverageGaps(
                endpoints,
                candidateCases,
                coverageReport
            )

        IF missingAreas IS EMPTY:
            BREAK

        additionalCases =
            GenerateTestsForCoverageGaps(
                endpoints,
                missingAreas
            )

        candidateCases.ADD_ALL(
            additionalCases
        )

        candidateCases =
            RemoveSemanticDuplicates(
                candidateCases
            )

        FOR EACH newCase
            IN additionalCases:

            newCase.requirementSources =
                ResolveRequirementSources(
                    newCase,
                    normalizedContract
                )

        coverageReport =
            EvaluateCoverage(
                endpoints,
                candidateCases
            )

        iteration =
            iteration + 1
```

### Step 12: Final Generator Output

Gán ID duy nhất, sắp xếp theo category, xây dựng traceability matrix, trả kết quả.

```
    AssignUniqueTestCaseIDs(
        candidateCases,
        apiScope
    )

    SortTestsByCategory(
        candidateCases
    )

    traceability =
        BuildAPITraceabilityMatrix(
            apiScope,
            candidateCases
        )

    RETURN {
        testCases:
            candidateCases,

        coverageReport:
            coverageReport,

        traceability:
            traceability,

        specificationGaps:
            specificationGaps
    }
```

---

## 4. Hàm phụ trợ

### 4.1. `AnalyzeDomainPartitions`

Phân tích miền giá trị của một input parameter, trả về danh sách các phân vùng cần test.

```
FUNCTION AnalyzeDomainPartitions(input):

    partitions = []

    IF input.required:
        partitions.ADD("missing")
        partitions.ADD("null")
        partitions.ADD("empty")

    partitions.ADD("valid representative value")
    partitions.ADD("wrong data type")

    IF input.hasFormatConstraint:
        partitions.ADD("valid format")
        partitions.ADD("invalid format")

    IF input.hasNumericRange:
        partitions.ADD("minimum boundary")
        partitions.ADD("just below minimum")
        partitions.ADD("normal valid value")
        partitions.ADD("maximum boundary")
        partitions.ADD("just above maximum")

    IF input.hasLengthConstraint:
        partitions.ADD("minimum length")
        partitions.ADD("below minimum length")
        partitions.ADD("maximum length")
        partitions.ADD("above maximum length")

    RETURN partitions
```

### 4.2. `GenerateSecurityScenarios`

Sinh các kịch bản test bảo mật dựa trên loại security rule.

```
FUNCTION GenerateSecurityScenarios(
    endpoint,
    securityRule
):

    scenarios = []

    SWITCH securityRule.type:

        CASE "AUTHENTICATION":
            scenarios.ADD("missing token")
            scenarios.ADD("invalid token")
            scenarios.ADD("expired token")

        CASE "AUTHORIZATION":
            scenarios.ADD("normal user accesses admin endpoint")
            scenarios.ADD("wrong role")
            scenarios.ADD("privilege escalation")

        CASE "IDOR":
            scenarios.ADD("access another user's resource")
            scenarios.ADD("modify another user's resource")

        CASE "INJECTION":
            scenarios.ADD("SQL-like payload")
            scenarios.ADD("special-character payload")

        CASE "MASS_ASSIGNMENT":
            scenarios.ADD("attempt to modify protected role field")

        DEFAULT:
            scenarios.ADD(
                "security scenario derived from requirement"
            )

    RETURN scenarios
```

### 4.3. `GenerateSchemaValidationTests`

Sinh test kiểm tra response schema: HTTP status, required fields, data types, nested structure, nullable fields.

```
FUNCTION GenerateSchemaValidationTests(
    endpoint,
    responseSchema
):

    tests = []

    tests.ADD(
        TestExpectedHTTPStatus(endpoint)
    )

    tests.ADD(
        TestRequiredFieldsExist(
            responseSchema
        )
    )

    tests.ADD(
        TestFieldDataTypes(
            responseSchema
        )
    )

    tests.ADD(
        TestNestedStructure(
            responseSchema
        )
    )

    tests.ADD(
        TestNullableFields(
            responseSchema
        )
    )

    RETURN tests
```

### 4.4. `EvaluateCoverage`

Đánh giá coverage trên nhiều chiều: domain, state, security, schema và requirement traceability.

```
FUNCTION EvaluateCoverage(
    endpoints,
    testCases
):

    report = NEW CoverageReport

    report.domainCoverage =
        EvaluateDomainCoverage(
            endpoints,
            testCases
        )

    report.stateCoverage =
        EvaluateStateCoverage(
            endpoints,
            testCases
        )

    report.securityCoverage =
        EvaluateSecurityCoverage(
            endpoints,
            testCases
        )

    report.schemaCoverage =
        EvaluateSchemaCoverage(
            endpoints,
            testCases
        )

    report.requirementTraceability =
        EvaluateRequirementTraceability(
            testCases
        )

    report.totalTestCases =
        Count(testCases)

    RETURN report
```