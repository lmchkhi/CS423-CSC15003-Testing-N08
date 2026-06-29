# Title of the test case
<!---

Title should give an idea for any reader - even non-experts but knoleagable person - to read and understand

It should also be in format action + function / module + condition (if any)

--->

## ID

<!--

ID should be in format TC-FRxx-<Functionality>-xxx

eg:
    TC-FR27-Checkout-001
-->

## Mo ta

<!--

This should describe in (some what) detail the objective, data, and the expected result of the test case.

-->

## Moi truong kiem thu
<!--

This describe the testsing environment, including OS, browser (if applicable), and version of the browser (if applicable), version of the runtime program (if applicable), and any other relevant information.

Eg:
    Windows 10, Google Chrome Version 149.0.7827.103

If for mobile, it should include the OS version and the app version.
Eg:
    Android 16
    Expo Go Client version 54.0.8

-->
## Precodition

<!--

This should describe the application setup / data setup / any other setup that is required before the test case can be executed.

-->

## Test data
<!--

This should describe the test data that is used in the test case. It may also include the data that is affect by the test case. It can also include the data that is created by the test case.

It specify what are valid and invalid data. And should be in a table format with 2 columns: Name and Value.
Eg:

Valid data:

|Name|Value|
|----|-----|
|Email|...|
|Password|...|
|Phone Number|...|
|...|...|
...

-->

## Cac buoc thuc hien

<!--

This should describe in detail the step required to execute the test case. Such as where to click, where to navigate, what to input, what to select, etc.

It should be in a numbered list format.

It should not be dependent on the user interface too much and should not be too specific that any change in the user interface will break the test case.

All test data should be used in the steps. And use the correct data from the test data section.

There should not be any step that contain data that is not in the test data section.

-->

## Ket qua mong doi

<!--

This should describe the expected result of the test case.

It should be in detail and should include what is expected to be seen on the user interface, what is expected to be in the database, what is expected to be in the logs, etc.

It should be specify what to expect at what step of the test case.

It should be quantifiable and measurable. It should not be too subjective.

-->

## Trang thai cua testcase

<!-- Test status-->
