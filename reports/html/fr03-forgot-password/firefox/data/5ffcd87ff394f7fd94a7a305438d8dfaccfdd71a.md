# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr03-forgot-password.spec.ts >> Run by: 23127475 | FR-03 - Quên mật khẩu >> TC-FR03-BVA-001 - OTP đúng 6 chữ số (ON - độ dài OTP)
- Location: tests/automation/specs/fr03-forgot-password.spec.ts:119:9

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /^\d{6}$/i
Received string:  "9420"
```

# Test source

```ts
  122 |       if (testCase.kind === 'uiForgotValidEmail') {
  123 |         await page.goto('/forgot-password');
  124 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedStepPattern));
  125 | 
  126 |         const input = emailInput(page);
  127 |         await expect(input).toBeVisible();
  128 |         await input.fill(testCase.email!);
  129 |         await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
  130 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedOtpPattern));
  131 | 
  132 |         const apiOtp = await requestOtpByApi(request, testCase.email!);
  133 |         expect.soft(apiOtp).toMatch(textPattern(testCase.expectedOtpPattern));
  134 |         return;
  135 |       }
  136 | 
  137 |       if (testCase.kind === 'uiBackToLoginAtStepOne') {
  138 |         await page.goto('/forgot-password');
  139 |         const backButton = page.getByRole('button', { name: /quay lại.*đăng nhập|back.*login/i }).first();
  140 |         await expect(backButton).toBeVisible();
  141 |         await backButton.click();
  142 |         await expect(page).toHaveURL(textPattern(testCase.expectedUrlPattern));
  143 |         return;
  144 |       }
  145 | 
  146 |       if (testCase.kind === 'uiForgotRejected') {
  147 |         await page.goto('/forgot-password');
  148 |         const input = emailInput(page);
  149 |         await expect(input).toBeVisible();
  150 |         if (testCase.email) {
  151 |           await input.fill(testCase.email);
  152 |         }
  153 |         await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
  154 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedErrorPattern));
  155 |         await expect.soft(page.locator('body')).not.toContainText(textPattern(testCase.mustNotContainPattern));
  156 |         return;
  157 |       }
  158 | 
  159 |       if (testCase.kind === 'uiResetSuccess') {
  160 |         const email = uniqueEmail(testCase.id);
  161 |         await registerUser(request, email);
  162 |         const uiOtp = await requestOtpByUi(page, email);
  163 |         expect.soft(uiOtp).toMatch(textPattern(testCase.expectedOtpPattern));
  164 |         await fillResetForm(page, uiOtp, testCase.newPassword!);
  165 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedSuccessPattern));
  166 |         return;
  167 |       }
  168 | 
  169 |       if (testCase.kind === 'uiConfirmPasswordRequired') {
  170 |         const email = uniqueEmail(testCase.id);
  171 |         await registerUser(request, email);
  172 |         await requestOtpByUi(page, email);
  173 |         await expect.soft(page.getByRole('textbox')).toHaveCount(3);
  174 |         await fillResetForm(page, '123456', testCase.newPassword!, testCase.confirmPassword);
  175 |         await expect.soft(page.locator('body')).toContainText(/không khớp|mismatch|confirm|xác nhận/i);
  176 |         return;
  177 |       }
  178 | 
  179 |       if (testCase.kind === 'apiResetRejected') {
  180 |         const response = await resetPasswordByApi(
  181 |           request,
  182 |           testCase.email!,
  183 |           testCase.resetToken!,
  184 |           testCase.newPassword!,
  185 |         );
  186 |         expect.soft(response.status()).toBe(testCase.expectedStatus);
  187 |         expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
  188 |         return;
  189 |       }
  190 | 
  191 |       if (testCase.kind === 'apiResetRejectedAfterOtp' || testCase.kind === 'apiResetAcceptedAfterOtp') {
  192 |         const email = uniqueEmail(testCase.id);
  193 |         await registerUser(request, email);
  194 |         const otp = await requestOtpByApi(request, email);
  195 |         const response = await resetPasswordByApi(
  196 |           request,
  197 |           email,
  198 |           testCase.overrideResetToken ?? otp,
  199 |           testCase.newPassword ?? '',
  200 |         );
  201 |         expect.soft(response.status()).toBe(testCase.expectedStatus);
  202 |         expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
  203 |         return;
  204 |       }
  205 | 
  206 |       if (testCase.kind === 'apiOtherEmailOtpRejected') {
  207 |         const emailA = uniqueEmail(`${testCase.id}a`);
  208 |         const emailB = uniqueEmail(`${testCase.id}b`);
  209 |         await registerUser(request, emailA);
  210 |         await registerUser(request, emailB);
  211 |         const otpOfA = await requestOtpByApi(request, emailA);
  212 |         const response = await resetPasswordByApi(request, emailB, otpOfA, testCase.newPassword!);
  213 |         expect.soft(response.status()).toBe(testCase.expectedStatus);
  214 |         expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
  215 |         return;
  216 |       }
  217 | 
  218 |       if (testCase.kind === 'apiGeneratedOtpLength') {
  219 |         const email = uniqueEmail(testCase.id);
  220 |         await registerUser(request, email);
  221 |         const otp = await requestOtpByApi(request, email);
> 222 |         expect.soft(otp).toMatch(textPattern(testCase.expectedOtpPattern));
      |                          ^ Error: expect(received).toMatch(expected)
  223 |         return;
  224 |       }
  225 | 
  226 |       throw new Error(`Unsupported FR-03 test kind: ${testCase.kind}`);
  227 |     });
  228 |   }
  229 | });
  230 | 
```