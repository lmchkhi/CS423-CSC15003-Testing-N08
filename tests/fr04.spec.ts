import fs from "node:fs";
import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

class ProfileInput{
    public readonly emailField: Locator;
    public readonly usernameField: Locator;
    public readonly phoneNumberField: Locator;
    public readonly addressField: Locator;
    public readonly updateButton: Locator;
    public readonly emailInputField: Locator;
    public readonly phoneNumberInputField: Locator;
    public readonly usernameInputField: Locator;
    public readonly addressInputField: Locator;

    constructor(public readonly page: Page){
        this.emailField = page.locator('div').filter({ hasText: /^Email \(Không đổi\)$/ });
        this.emailInputField = this.emailField.getByRole('textbox').first();

        this.phoneNumberField = page.locator('div').filter({ hasText: /^Số điện thoại$/ });
        this.phoneNumberInputField = this.phoneNumberField.getByRole('textbox').first();

        this.addressField = page.locator('div').filter({ hasText: /^Địa chỉ giao hàng$/ });
        this.addressInputField = this.addressField.getByRole('textbox').first();

        this.usernameField = page.locator('div').filter({ hasText: /^Họ Tên$/ });
        this.usernameInputField = this.usernameField.getByRole('textbox').first();
        
        this.updateButton = page.getByRole('button', { name: 'Cập nhật' });
    }
}
type ProfileFiture = {
    profile: ProfileInput
};
export const test = base.extend<ProfileFiture>({
    profile: async ({page}, use)=>{
        const profile = new ProfileInput(page);
        await use(profile);
    }
})

type TestPoint = {
    testID: string,
    email: string,
    password: string,
    name:  string,
    new_name: string,
    address: string,
    valid_phone_numbers: Array<string>,
    invalid_phone_numbers: Array<string>

};
let testdata: Array<TestPoint> = [];
try {
    testdata = JSON.parse(fs.readFileSync("data/fr04.json", 'utf-8'));
}
catch (err) {
    console.log(err);
    console.log("Failed to load data file. Terminating setup and run");
}
for (const test_point of testdata)
{
    // let test_point: TestPoint = {
    //     testID : "1",
    //     email : "test@eshop.com",
    //     password : "Test1234!",
    //     name : "Test User",
    //     new_name: "New username",
    //     address: "227 Nguyễn Văn Cừ",
    //     valid_phone_numbers: ["0912345678"],
    //     invalid_phone_numbers: ["091234"]
    // }
    test.describe(`FR-04 testing ${test_point.testID}`, ()=> {
        
        test.beforeEach(async ({page})=>{
            await page.goto(
                "http://localhost:5173/login"
            );
            let inputs = await page.getByRole("textbox").all()
            let username = inputs[0], password = inputs[1];
            await username.fill(test_point.email);
            await password.fill(test_point.password);
            await page.getByRole('button', { name: 'Sign In' }).click();
            await page.waitForURL("http://localhost:5173");
            await page.goto("http://localhost:5173/profile");
        })

        test("Title is set", async ({page})=>{
            await expect(page).toHaveTitle(/Profile/);
        })

        test("Form is label properly", async ({page})=>{
            let block = page.getByText('Hồ sơ của bạnEmail (Không đổi')
            expect(block).not.toBeNull();
            await expect(block).toBeVisible();
            
            let heading = block.getByRole('heading', { name: 'Hồ sơ của bạn' });
            expect(heading).not.toBeNull();
            await expect(heading).toBeVisible();
        })
        
        test('Field display properly and filled', async ({profile}) => {

            await expect(profile.emailField).toBeVisible();
            expect(await profile.emailField.getByRole('textbox').first().inputValue()).toStrictEqual(test_point.email);

            await expect(profile.usernameField).toBeVisible();
            expect(await profile.usernameField.getByRole('textbox').first().inputValue()).toStrictEqual(test_point.name);

            await expect(profile.phoneNumberField).toBeVisible();
            // No phone number check as it is empty by default

            await expect(profile.addressField).toBeVisible();
            // No address input check as it is empty by default

            await expect(profile.updateButton).toBeVisible();

        })

        test("Update username", async ({page, profile})=>{
            
            await profile.usernameInputField.fill(test_point.new_name);
            await profile.updateButton.click();
            // Reload page to verify that the server has update
            await page.reload();
            expect(await profile.usernameInputField.inputValue()).toStrictEqual(test_point.new_name);
        })

        test("Update phone number", async ({page, profile})=>{
            for (const phone_number in test_point.valid_phone_numbers){
                await profile.phoneNumberInputField.fill(phone_number);
                await profile.updateButton.click();
                // Reload page to verify that the server has update
                await page.reload();
                expect.soft(await profile.phoneNumberInputField.inputValue()).toStrictEqual(phone_number);
            }
        })

        test("Update address", async ({page, profile})=>{
            await profile.addressInputField.fill(test_point.address);
            await profile.updateButton.click();
            // Reload page to verify that the server has update
            await page.reload();
            expect(await profile.addressInputField.inputValue()).toStrictEqual(test_point.address);
        })

        test("Email is not editable", async ({profile}) =>{
            expect(profile.emailInputField.isDisabled).toBeTruthy();
            try {
                await profile.emailInputField.fill("", {timeout: 1000});
            }
            catch (err){
                console.log("Email input field is not editable, as expected");
            }
        })

        test("Invalid phone number", async ({profile})=>{
            for (const phone_number in test_point.invalid_phone_numbers){
                await profile.phoneNumberInputField.fill(phone_number);
                await profile.updateButton.click();
                // Reload page to verify that the server has not update
                await profile.page.reload();
                expect.soft(await profile.phoneNumberInputField.inputValue()).not.toStrictEqual(phone_number);
            }
        })

        test("Invalid username", async ({profile})=>{
            await profile.usernameInputField.fill("");
            await profile.updateButton.click();
            // Reload page to verify that the server has not update
            await profile.page.reload();
            expect.soft(await profile.usernameInputField.inputValue()).not.toStrictEqual("");
        })

        test("Have navigation to home page", async ({page})=>{
            await page.getByRole('link', { name: 'Home' }).click({timeout: 1000});
            await expect(page).toHaveURL("http://localhost:5173");
        })

        test("Address input have minimum element height", async ({page, profile})=>{
            const addressInputDimention = await profile.addressInputField.boundingBox();
            if (!addressInputDimention) {
                throw new Error("Address input field is not visible");
            }
            await page.mouse.move(addressInputDimention.x + addressInputDimention.width - 15,
                             addressInputDimention.y + addressInputDimention.height - 10);
            await page.mouse.down();
            await page.mouse.move(addressInputDimention.x + addressInputDimention.width - 15,
                             addressInputDimention.y + addressInputDimention.height - 100);
            await page.mouse.up();
            const newAddressInputDimention = await profile.addressInputField.boundingBox();
            if (!newAddressInputDimention) {
                throw new Error("Address input field is not visible");
            }
            expect.soft(newAddressInputDimention.height).toBeLessThanOrEqual(addressInputDimention.height);
            expect.soft(newAddressInputDimention.height).toBeGreaterThanOrEqual(48);
        })
        
        test("Have brand logo and it is clickable", async ({page})=>{
            const brandLogo = page.getByRole('link', { name: 'EShop' });
            await expect(brandLogo).toBeVisible();
            await brandLogo.click();
            await expect(page).toHaveURL("http://localhost:5173");
        })
}) 
}
