# AI Audit

## Prompt 1

### Timestamp

01/08/2026 T7 12:03 PM

### Tool used

ChatGPT

### Given prompt

Given the following description of a register function for a ecommers site, give me 10 (or more) GUI test case base on general, forms, navigation and feedback standards of a GUI tester/design enginer/design researcher. Testcase should be based on interface alone and not concrete code or html code in debug menu/anywhere. It should provide answers to most common question in GUI testing (such as does this page meet specification, does this have working links/navigation, does this have logo on top left side, is this page too dark/have confusing coloring for user, does it provide enough info when an error occur in forms, ...), and uncommon question (such as does this page have proper ui block rounding consitently, does links are actually big enough to pressed properly, does this page have proper loading state, ...). It should also rely on requirement and should not deviate to other unrelated items/features if not needed.

The GUI test cases should be in one markdown table and does not need test step. The table format should be ID, Name, Screen, Category, Expected result, Actual result, Status. For Name it should be describing what the test is and it expected outcome, not in question form - like "Testing does forms have email input" and not in form "Test ...". For category you should put is this test a visual/responsive/compability /accessbility/... test (a word to describe what the general thing is the test doing), and have a separate section (a separate markdown table) to explain what each of the category is (a description of what the category is). For Actual result and Status it should be empty (not a word in that cell).

The register requirements:

- Người dùng phải cung cấp: **Họ Tên**, **Email**, **Mật khẩu**.
- Email phải có định dạng hợp lệ (`user@domain.com`) và là duy nhất trong hệ thống.
- **Yêu cầu mật khẩu mạnh**: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`).
- Phải có trường **Xác nhận mật khẩu** — hệ thống từ chối nếu hai trường không khớp.
- Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

### AI response

```markdown
Below are GUI-focused test cases derived from the registration requirements and common GUI design/testing standards. They intentionally focus on what is visible and interactable from the user interface, without relying on HTML, source code, browser developer tools, or implementation details.

### GUI Test Cases

| ID          | Name                                                                                             | Screen   | Category      | Expected Result                                                                                         | Actual Result | Status |
| ----------- | ------------------------------------------------------------------------------------------------ | -------- | ------------- | ------------------------------------------------------------------------------------------------------- | ------------- | ------ |
| GUI-REG-001 | Registration page displays a clear page title identifying the Register screen                    | Register | Visual        | The page clearly indicates that the user is on the registration page through a visible heading/title.   |               |        |
| GUI-REG-002 | Company logo is displayed consistently at the top of the registration page                       | Register | Branding      | The company logo is visible, properly aligned, and rendered without distortion.                         |               |        |
| GUI-REG-003 | Registration form displays Full Name, Email, Password, Confirm Password, and Register button     | Register | Functional UI | All required input fields and the primary registration button are visible before interaction.           |               |        |
| GUI-REG-004 | Required input fields are visually distinguishable from optional fields                          | Register | Visual        | Required fields are clearly indicated using labels, symbols, or helper text.                            |               |        |
| GUI-REG-005 | Input field labels are positioned consistently and are easy to understand                        | Register | Usability     | Labels are readable, consistently aligned, and accurately describe each field.                          |               |        |
| GUI-REG-006 | Password field visually masks entered characters                                                 | Register | Functional UI | Password characters are hidden while typing to protect user privacy.                                    |               |        |
| GUI-REG-007 | Confirm Password field visually masks entered characters                                         | Register | Functional UI | Confirm Password characters are hidden while typing.                                                    |               |        |
| GUI-REG-008 | Password requirement guidance is visible before submission                                       | Register | Feedback      | Password complexity requirements are displayed or easily accessible without requiring an error first.   |               |        |
| GUI-REG-009 | Form layout remains visually balanced with consistent spacing and alignment                      | Register | Visual        | Input fields, labels, and buttons are evenly spaced and aligned consistently.                           |               |        |
| GUI-REG-010 | Input fields use consistent size, border style, and corner radius                                | Register | Visual        | Form controls follow a consistent design style throughout the page.                                     |               |        |
| GUI-REG-011 | Color contrast allows text and controls to remain easily readable                                | Register | Accessibility | Text, placeholders, buttons, and messages are readable with sufficient contrast against the background. |               |        |
| GUI-REG-012 | Register button is visually identifiable as the primary action                                   | Register | Visual        | The Register button stands out from secondary actions through styling and placement.                    |               |        |
| GUI-REG-013 | Register button remains disabled or provides immediate validation when required fields are empty | Register | Functional UI | The interface prevents incomplete submission through appropriate visual behavior.                       |               |        |
| GUI-REG-014 | Invalid email entry displays a clear validation message near the Email field                     | Register | Feedback      | An understandable error message explains that the email format is invalid.                              |               |        |
| GUI-REG-015 | Password failing complexity requirements displays a descriptive validation message               | Register | Feedback      | The user receives a clear explanation of which password requirements are not satisfied.                 |               |        |
| GUI-REG-016 | Password mismatch displays a validation message near the Confirm Password field                  | Register | Feedback      | A clear message indicates that the passwords do not match.                                              |               |        |
| GUI-REG-017 | Email already existing in the system displays a clear duplication message                        | Register | Feedback      | The interface informs the user that the email has already been registered.                              |               |        |
| GUI-REG-018 | Validation messages are visually distinguishable without obscuring the form                      | Register | Visual        | Error messages are readable, consistently styled, and do not overlap other controls.                    |               |        |
| GUI-REG-019 | Successful registration displays appropriate success feedback before navigation                  | Register | Feedback      | The user receives clear confirmation that registration succeeded.                                       |               |        |
| GUI-REG-020 | Successful registration redirects the user to the Login page                                     | Register | Navigation    | After successful registration, the Login page is displayed automatically.                               |               |        |
| GUI-REG-021 | Login page heading is visible immediately after successful redirection                           | Login    | Navigation    | The destination page clearly indicates that it is the Login page.                                       |               |        |
| GUI-REG-022 | Registration form remains fully usable on common desktop screen resolutions                      | Register | Responsive    | No clipping, overlapping, or hidden controls occur on standard desktop resolutions.                     |               |        |
| GUI-REG-023 | Registration form remains usable on tablet-sized screens                                         | Register | Responsive    | Controls resize appropriately while maintaining readability and usability.                              |               |        |
| GUI-REG-024 | Registration form remains usable on mobile-sized screens                                         | Register | Responsive    | Users can complete registration without horizontal scrolling or overlapping elements.                   |               |        |
| GUI-REG-025 | Interactive controls provide visible hover and keyboard focus indicators                         | Register | Accessibility | Buttons and input fields visibly indicate focus and hover states.                                       |               |        |
| GUI-REG-026 | Interactive controls provide sufficiently large clickable areas                                  | Register | Usability     | Buttons, links, and input fields are large enough to interact with comfortably.                         |               |        |
| GUI-REG-027 | Keyboard navigation follows a logical tab order across the form                                  | Register | Accessibility | Focus moves sequentially through Full Name, Email, Password, Confirm Password, and Register button.     |               |        |
| GUI-REG-028 | Loading indicator appears while registration request is being processed                          | Register | Feedback      | A loading indicator or progress state informs the user that the request is processing.                  |               |        |
| GUI-REG-029 | Multiple registration submissions are visually prevented during processing                       | Register | Functional UI | The Register button is temporarily disabled or indicates processing to prevent repeated submissions.    |               |        |
| GUI-REG-030 | Interface remains visually consistent after validation errors occur                              | Register | Visual        | Error messages do not shift layout excessively or create inconsistent spacing.                          |               |        |
| GUI-REG-031 | Form remains readable when browser zoom is increased to common accessibility levels              | Register | Accessibility | Content remains usable without overlapping or hidden elements at higher zoom levels.                    |               |        |
| GUI-REG-032 | Registration page does not contain distracting colors or excessive visual clutter                | Register | Visual        | The interface uses consistent colors, typography, and visual hierarchy that support readability.        |               |        |

---

## Test Category Definitions

| Category      | Description                                                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual        | Verifies the appearance, consistency, layout, spacing, typography, colors, icons, borders, corner radius, and overall visual design of the interface.                                                |
| Branding      | Verifies that branding elements such as company logo and identity are displayed consistently and correctly.                                                                                          |
| Functional UI | Verifies visible UI behavior and interaction from the user's perspective, such as field availability, button behavior, password masking, and submission controls, without inspecting implementation. |
| Feedback      | Verifies that the interface provides appropriate visual responses, including validation messages, success notifications, loading indicators, and processing states.                                  |
| Navigation    | Verifies that users are directed to the correct screen or destination after completing an action and that navigation behaves according to the requirements.                                          |
| Responsive    | Verifies that the interface adapts correctly to different screen sizes and resolutions while maintaining usability and readability.                                                                  |
| Accessibility | Verifies that users with different abilities can effectively use the interface, including keyboard navigation, focus indicators, readable contrast, zoom support, and accessible interaction.        |
| Usability     | Verifies that the interface is intuitive and comfortable to use, including understandable labels, adequate touch/click target sizes, and logical interaction flow.                                   |
```

### Verdict

INCOMPLETE

### Reasoning

GUI-REG-021 is a checking for login page and does not relate to register function
GUI-REG-024 and GUI-REG-023 is test for mobile ui and does not require for tasks

### Student fix

Remove GUI-REG-021, GUI-REG-023, GUI-REG-024
Adding a test for website title to have function name. Test name: Title of the register page corresponding to actual page function name


## Prompt 2

### Given prompt

Given the following description of a login function for a ecommers site, give me 10 GUI test case base on general, forms, navigation and feedback standards of a GUI tester/design enginer/design researcher. Testcase should be based on interface alone and not concrete code or html code in debug menu/anywhere. It should provide answers to most common question in GUI testing (such as does this page meet specification, does this have working links/navigation, does this have logo on top left side, is this page too dark/have confusing coloring for user, does it provide enough info when an error occur in forms, ...), and uncommon question (such as does this page have proper ui block rounding consitently, does links are actually big enough to pressed properly, does this page have proper loading state, ...). It should also rely on requirement and should not deviate to other unrelated items/features if not needed. 

The GUI test cases should be in one markdown table and does not need test step. The table format should be ID, Name, Screen, Category, Expected result, Actual result, Status. For Name it should be describing what the test is and it expected outcome, not in question form - like "Testing does forms have email input" and not in form "Test ...". For category you should put is this test a visual/responsive/compability /accessbility/... test (a word to describe what the general thing is the test doing), and have a separate section (a separate markdown table) to explain what each of the category is (a description of what the category is). For Actual result and Status it should be empty (not a word in that cell).

The register requirements:

- Người dùng nhập Email và Mật khẩu.
- Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên **đúng 1 đơn vị**.
- Nếu đăng nhập sai từ **3 lần trở lên** liên tiếp, tài khoản bị tạm khóa **30 giây** (môi trường demo). Hệ thống trả về thông báo lỗi phù hợp; không để lộ chi tiết nguyên nhân.
- Đăng nhập thành công trả về JWT Token. Token được lưu phía client và gửi kèm tất cả các yêu cầu có xác thực qua header `Authorization: Bearer <token>`.
- Trường email phải dùng `type="email"` (có validate HTML5 format).

### Tool used

ChatGPT

### Timestamp

02/08/2026 9:46 AM

### AI response

Below are **10 GUI-focused test cases** based only on the **Login screen interface** and the provided requirements. These test cases intentionally avoid implementation details (backend logic, HTML inspection, developer tools, network requests, JWT storage verification, etc.) and instead evaluate what a **GUI tester, UX designer, or design reviewer** can observe from the interface.

### GUI Test Cases

| ID          | Name                                                                                 | Screen | Category      | Expected result                                                                                                                                                                                                                                                                                                                | Actual result | Status |
| ----------- | ------------------------------------------------------------------------------------ | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------ |
| GUI-LGN-001 | Testing login page displays required branding and consistent layout                  | Login  | Visual        | Login page displays the application logo in the expected position (commonly top-left or centered according to specification), page title, Email field, Password field, Login button, and overall spacing, alignment, typography, colors, and rounded corners are visually consistent with the application's design guidelines. |               |        |
| GUI-LGN-002 | Testing Email input field presents appropriate input control and validation guidance | Login  | Form          | Email field is clearly labeled, visually distinguishable from the password field, indicates it accepts an email address, supports HTML5 email input behavior from the user's perspective, and provides helpful validation feedback when an invalid email format is entered.                                                    |               |        |
| GUI-LGN-003 | Testing Password input field provides secure and usable input experience             | Login  | Form          | Password field is clearly labeled, masks entered characters, has consistent styling with the Email field, maintains sufficient input size for comfortable typing, and clearly indicates focus when selected.                                                                                                                   |               |        |
| GUI-LGN-004 | Testing login form visual hierarchy and control consistency                          | Login  | Visual        | Labels, input fields, buttons, spacing, margins, border radius, fonts, colors, and component sizing follow a consistent visual style without overlapping, misalignment, or inconsistent UI elements.                                                                                                                           |               |        |
| GUI-LGN-005 | Testing Login button provides clear interactive and loading feedback                 | Login  | Feedback      | Login button appears visually clickable, changes appropriately on hover/focus/pressed state where applicable, prevents repeated submissions during processing by showing an appropriate loading indicator or temporary disabled state, and returns to its normal state after completion.                                       |               |        |
| GUI-LGN-006 | Testing unsuccessful login displays generic and understandable error message         | Login  | Feedback      | After an unsuccessful login attempt, the interface displays a clear but generic error message that informs the user authentication failed without revealing whether the email or password is incorrect or whether the account exists, consistent with the requirement not to expose detailed failure reasons.                  |               |        |
| GUI-LGN-007 | Testing temporary account lock message after multiple failed logins                  | Login  | Feedback      | After three or more consecutive failed login attempts, the interface clearly informs the user that the account is temporarily locked for approximately 30 seconds, communicates the temporary nature of the lock, avoids exposing internal security details, and prevents confusing or contradictory messages.                 |               |        |
| GUI-LGN-008 | Testing keyboard navigation and focus visibility across login form                   | Login  | Accessibility | Users can navigate through Email field, Password field, Login button, and other interactive elements using only the keyboard in a logical order, with clearly visible focus indicators and controls large enough to be easily selected.                                                                                        |               |        |
| GUI-LGN-009 | Testing login page remains usable across common viewport sizes                       | Login  | Responsive    | Login form remains fully visible, readable, and usable on desktop, tablet, and mobile screen sizes without clipped controls, overlapping elements, excessive scrolling, or excessively small touch targets.                                                                                                                    |               |        |
| GUI-LGN-010 | Testing login page maintains readable color contrast and visual clarity              | Login  | Accessibility | Text, icons, error messages, placeholders, buttons, and backgrounds provide sufficient visual contrast, color usage is not confusing or overly dark, important information is distinguishable without relying solely on color, and the interface remains easy to read under normal viewing conditions.                         |               |        |

---

## Category Definitions

| Category      | Description                                                                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual        | Verifies the appearance, layout consistency, typography, spacing, colors, alignment, iconography, border radius, branding, and overall visual quality of the interface.                                                     |
| Form          | Verifies the usability and presentation of form controls, including labels, input fields, placeholders, validation messages, field consistency, and input behavior visible to users.                                        |
| Feedback      | Verifies how the interface communicates system status, including loading indicators, success and error messages, disabled states, temporary lock notifications, and other user feedback.                                    |
| Accessibility | Verifies that the interface can be comfortably used by a wide range of users through keyboard navigation, visible focus indicators, sufficient color contrast, readable text, and appropriately sized interactive elements. |
| Responsive    | Verifies that the interface adapts correctly to different screen sizes and resolutions while maintaining readability, usability, and layout consistency.                                                                    |

### Verdict

INCOMPLETE

### Reasoning

GUI-LGN-009 use task 3 requirements
Missing testcase that check if the page can properly show that the user is logging in
It also added "Test..." while being told explicitly that do not add "Test" at the start

### Student fix

Change GUI-LGN-009 to be about different zoom level
Add a testcase checking for page showing info that the user is logging in.
