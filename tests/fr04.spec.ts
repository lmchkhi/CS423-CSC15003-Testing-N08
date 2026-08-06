import { test, expect } from '@playwright/test';

test.describe("FR-04 testing", ()=>{
    let email = "test@eshop.com", password_str = "Test1234!", username = "Test User";

    test.beforeEach(async ({page})=>{
        await page.goto(
            "http://localhost:5173/login"
        );
        let inputs = await page.getByRole("textbox").all()
        let username = inputs[0], password = inputs[1];
        await username.fill(email);
        await password.fill(password_str);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.goto("http://localhost:5173/profile");
    })

    test('Field display properly exist', async ({page}) => {

        let email_inputs = page.locator('div').filter({ hasText: /^Email \(Không đổi\)$/ })
        await expect(email_inputs).toBeVisible();
        expect(await email_inputs.getByRole('textbox').first().inputValue()).toStrictEqual(email);

        let username_inputs = page.locator('div').filter({ hasText: /^Họ Tên$/ });
        await expect(username_inputs).toBeVisible();
        expect(await username_inputs.getByRole('textbox').first().inputValue()).toStrictEqual(username);

        let phone_number = page.locator('div').filter({ hasText: /^Số điện thoại$/ });
        await expect(phone_number).toBeVisible();
        // No phone number check as it is empty by default

        let address_inputs = page.locator('div').filter({ hasText: /^Địa chỉ giao hàng$/ });
        await expect(address_inputs).toBeVisible();
        // No address input check as it is empty by default

        let 
    })
})