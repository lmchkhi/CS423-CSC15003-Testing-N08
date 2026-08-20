# HW06 API Testing Report

**Student:** 2110223  
**Course:** CS423-CSC15003-Testing-N08  
**Date:** 2026-08-20

## 1. Executive Summary

This report documents API testing for three functional requirements of the EShop system:
- FR-01 Register
- FR-08 Checkout
- FR-14 Category CRUD

Total test cases designed: 117 (42 + 35 + 40)  
Total bugs found: 10 (3 + 3 + 4)

## 2. Postman Features Used

### 2.1 Core Testing Features

**Collections & Folders**
- Organized tests into three API folders (FR-01, FR-08, FR-14)
- Each folder contains domain-specific test scenarios
- Hierarchical structure for maintainability

**Variables**
- Collection-level variables for base URL (`{{baseUrl}}`)
- Environment variables for dynamic data (tokens, IDs)
- `pm.collectionVariables.set()` and `pm.environment.set()` for state management

**Pre-request Scripts**
- User registration and login automation for obtaining tokens
- Dynamic test data generation (timestamps, unique usernames)
- Setup for stateful tests (creating categories before updates)

**Test Scripts (pm.test)**
- Status code validation (`pm.response.to.have.status(200)`)
- Response schema validation using JSON path and structure checks
- Response time assertions (`pm.expect(pm.response.responseTime).to.be.below(2000)`)
- Business logic validation (e.g., cart total calculations, token presence)
- Error message verification for negative test cases

### 2.2 Advanced Features

**Data-Driven Testing**
- CSV data files for boundary and edge cases
- Parameterized requests with `{{variable}}` syntax
- Bulk test execution with Newman CLI runner

**Chained Requests**
- Sequential API calls with dependency management
- Passing data between requests via variables
- Lifecycle testing (create → read → update → delete)

**Response Parsing**
- JSON response extraction with `pm.response.json()`
- Dynamic ID capture for subsequent requests
- Token extraction and storage for authentication

**Assertions Library**
- Chai.js assertions (`pm.expect()`)
- Response structure validation
- Array and object property checks

### 2.3 Automation & CI/CD

**Newman CLI**
- Command-line test execution
- HTML and JSON report generation
- Environment and data file injection
- Exit code handling for CI/CD pipelines

**Reporting**
- HTML reports with detailed assertions and failures
- JSON reports for programmatic analysis
- Test metrics extraction (pass/fail rates, response times)

### 2.4 Authentication Testing

**Bearer Token Management**
- Authorization header configuration
- Token expiration handling
- Role-based access control validation (user vs admin)
- Unauthorized and forbidden status testing

### 2.5 Negative Testing Support

- Invalid input validation
- Missing required fields
- SQL injection and XSS payload testing
- Non-existent resource handling (404 tests)
- Malformed request body testing

## 3. Test Coverage Summary

| API | Test Cases | Passed | Failed | Pass Rate | Bugs |
|-----|-----------|--------|--------|-----------|------|
| FR-01 Register | 42 | 38 | 4 | 90.5% | 3 |
| FR-08 Checkout | 35 | 32 | 3 | 91.4% | 3 |
| FR-14 Category | 40 | 36 | 4 | 90.0% | 4 |
| **TOTAL** | **117** | **106** | **11** | **90.6%** | **10** |

## 4. Key Findings

- Authentication mechanisms are functional but have edge case issues
- Input validation is inconsistent across APIs
- SQL injection and XSS vulnerabilities require attention
- Response schemas are mostly compliant with specifications
- Performance is acceptable (most requests under 2000ms)

## 5. Artifacts

- **Collection:** `api/collections/eshop-hw06.postman_collection.json`
- **Newman Reports:** `api/newman/*.html`, `api/newman/*.json`
- **Bug Reports:** `bug-reports/BUG-FR*.md`
- **Test Cases:** `test-cases/FR-*/ai-generated.md`
- **Test Summary:** `reports/test-summary.xlsx`
