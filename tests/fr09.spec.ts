import { test as base, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import * as fs from 'node:fs';

// --- Test data Definition ---
type DiscountCode = {
    code: string,
    type: string,
    value: number,
    min_order_amount: number,
    expired_at: string,
    max_uses_per_user: number,
    description: string
}
const discountCodes = fs.readFileSync("data/fr09/coupons.json", 'utf-8');
const testDiscountConfigs: Array<DiscountCode> = JSON.parse(discountCodes);

class ProductData {
    public name: string;
    public price: number;
    public picture?: string;
    public description?: string;
    public category: string;
    constructor(name: string, price: number, category: string, picture?: string, description?: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.picture = picture;
        this.description = description;
    }
}

class Product extends ProductData {

    public readonly locator: Locator;
    constructor(name: string, price: number, locator: Locator) {
        super(name, price, "Điện thoại"); // Call the parent constructor
        this.locator = locator;
        this.category = "Điện thoại"; // Default category, can be modified later if needed
    }
}
class StoreProductsFixture {
    public page: Page
    public products: Array<Product>;
    constructor(page: Page) {
        this.page = page;
        this.products = [];
    }
    async initProducts() {
        let productsLocator = this.page.locator('div').filter({ hasText: / VND$/ });
 
        let products = await productsLocator.all();
        for (let product of products) {
            let name = await product.locator('h2').textContent();
            let priceText = await product.locator('p').textContent();
            priceText = priceText?.trim().replace(" VND", "") || "0";
            let price = parseFloat(priceText?.replace(/[^0-9.-]+/g,"") || "0");
            this.products.push(new Product(name || "", price, product));
        }
    }
}
class OrderFixture {
    public readonly baseURL: string;
    public page: Page
    public products: Array<Product>;
    public readonly discountCodeInput: Locator;
    public readonly applyDiscountButton: Locator;

    constructor(baseURL: string, page: Page) {
        this.baseURL = baseURL;
        this.page = page;
        this.products = [];
        this.discountCodeInput = this.page.getByPlaceholder('Nhập mã giảm giá...');
        this.applyDiscountButton = this.page.getByRole('button', { name: 'Áp dụng' });
    }

    async addItem(productIndex: number = 0) {
        if (this.products.length === 0) {
            throw new Error("No products initialized. Call initProducts() first.");
        }
        let product = this.products[productIndex];
        await product.locator.getByText("Thêm vào giỏ hàng").click();
    }

    async checkout() {
        await this.page.goto(`${this.baseURL}`);
        await this.page.getByRole('button', { name: 'Giỏ hàng' }).click();
        await this.page.getByRole('button', { name: 'Thanh toán' }).click();
    }

    async applyDiscountCode(code: string) {
        await this.discountCodeInput.fill(code);
        await this.applyDiscountButton.click();
    }
}
class AdminFixture {
    public readonly baseURL: string
    public page: Page
    constructor(baseURL: string, page: Page) {
        this.baseURL = baseURL;
        this.page = page;
    }
    async loginAsAdmin(email: string, password: string) {
        await this.page.goto(`${this.baseURL}/admin/login`);
        await this.page.getByPlaceholder('Email').fill(email);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
    async addDiscountCode(discountCode: DiscountCode) {
        await this.page.getByText('Mã Giảm Giá').click();
        await this.page.getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' }).fill(discountCode.code);
        await this.page.getByRole('combobox').selectOption(discountCode.type);
        await this.page.getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' }).fill(discountCode.value.toString());
        await this.page.getByRole('spinbutton', { name: 'Đơn tối thiểu (₫)' }).fill(discountCode.min_order_amount.toString());
        await this.page.getByPlaceholder('Ngày hết hạn').fill(discountCode.expired_at);
        await this.page.getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' }).fill(discountCode.max_uses_per_user.toString());
        await this.page.getByRole('button', { name: 'Tạo mã' }).click();
    }
    async removeDiscountCode(code: string) {
        await this.page.getByText('Mã Giảm Giá').click();
        const codeRow = this.page.locator('tr').filter({ hasText: code });
        await codeRow.getByRole('button', { name: 'Xóa' }).click();
        // await this.page.getByRole('button', { name: 'Xác nhận' }).click();
    }

    async addProduct(ProductData: ProductData) {
        await this.page.getByText('Sản phẩm').click();
        await this.page.getByRole('textbox', { name: 'Tên sản phẩm' }).fill(ProductData.name);
        await this.page.getByRole('spinbutton', { name: 'Giá tiền' }).fill(ProductData.price.toString());
        await this.page.getByRole('textbox', { name: 'URL Ảnh' }).fill(ProductData.picture || '');
        await this.page.getByRole('textbox', { name: 'Mô tả' }).fill(ProductData.description || '');
        await this.page.getByRole('combobox').selectOption(ProductData.category);
        await this.page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
    }

    async removeProduct(productName: string) {
        await this.page.getByText('Sản phẩm').click();
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await productRow.getByRole('button', { name: 'Xóa' }).click();
        // await this.page.getByRole('button', { name: 'Xác nhận' }).click();
    }
    async editProduct(productName: string, save: boolean, updatedData: Partial<ProductData>) {
        await this.page.getByText('Sản phẩm').click();
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await productRow.getByRole('button', { name: 'Sửa' }).click();
        if (updatedData.name) {
            await this.page.getByRole('textbox', { name: 'Tên sản phẩm' }).fill(updatedData.name);
        }
        if (updatedData.price !== undefined) {
            await this.page.getByRole('spinbutton', { name: 'Giá tiền' }).fill(updatedData.price.toString());
        }
        if (updatedData.picture) {
            await this.page.getByRole('textbox', { name: 'URL Ảnh' }).fill(updatedData.picture);
        }
        if (updatedData.description) {
            await this.page.getByRole('textbox', { name: 'Mô tả' }).fill(updatedData.description);
        }
        if (updatedData.category) {
            await this.page.getByRole('combobox').selectOption(updatedData.category);
        }
        if (save) {
            await this.page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
        }
        else{
            await this.page.getByRole('button', { name: 'Hủy sửa' }).click();
        }
    }
}

type Fixtures = {
    orderFixture: OrderFixture;
    storeProductsFixture: StoreProductsFixture;
    adminFixture: AdminFixture;
}
let test = base.extend<Fixtures>({
    orderFixture: async ({ page }, use) => {
        const orderFixture = new OrderFixture("http://localhost:5173", page);
        await use(orderFixture);
    },

    storeProductsFixture: [async ({ page }, use) => {
        await page.goto("http://localhost:5173");
        const storeProductsFixture = new StoreProductsFixture(page);
        await storeProductsFixture.initProducts();
        await use(storeProductsFixture);
    }, { auto: true }],

    adminFixture: async ({ page }, use) => {
        const adminFixture = new AdminFixture("http://localhost:5174", page);
        await adminFixture.loginAsAdmin('admin@eshop.com', 'Admin123!');
        await use(adminFixture);
    }
})

test.describe('Checkout Discount Code Validation', () => {
    test.beforeEach(async ({page, adminFixture, orderFixture }) => {
        await page.goto("http://localhost:5173/login");
        let inputs = await page.getByRole("textbox").all()
        let username = inputs[0], password = inputs[1];
        await username.fill('test@eshop.com');
        await password.fill('Test1234!');
        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test(`Correctly apply discount code: ${testDiscountConfigs[0].code}`, async ({ page, orderFixture }) => {
        const config = testDiscountConfigs.find(c => c.code === 'SAVE10');
        if (!config) return; // Skip if data is missing
        
    });


    test(`Should reject expired code: ${testDiscountConfigs[3].code}`, async ({ loggedInUser, createOrder }) => {
        const config = testDiscountConfigs.find(c => c.code === 'EXPIRED');
        if (!config) return;

        await loggedInUser({ email: 'user@test.com', password: 'password' });
        await createOrder({});
        
        // Test C2 (Expired Check)
        await loggedInUser.page.getByRole('textbox', { name: 'coupon' }).fill(config.code);
        await loggedInUser.page.click('Apply Button');

        // EXPECTATION: Should show an error message related to expiration.
        await expect(loggedInUser.page.locator('.error-message')).toBeVisible();
    });


    test(`Should reject code with insufficient order amount: ${testDiscountConfigs[1].code}`, async ({ loggedInUser, createOrder }) => {
        const config = testDiscountCodes.find(c => c.code === 'BIGBUY');
        if (!config) return;

        await loggedInUser({ email: 'user@test.com', password: 'password' });
        // Create an order that is too small, or use a specific setup to control total amount
        // await createOrder({}); // Assuming createOrder can simulate low total

        await loggedInUser.page.getByRole('textbox', { name: 'coupon' }).fill(config.code);
        await loggedInUser.page.click('Apply Button');

        // EXPECTATION: Should show an error message related to min order amount.
        await expect(loggedInUser.page.locator('.error-message')).toBeVisible();
    });


    test(`Should reject code with exceeded usage limit: ${testDiscountConfigs[0].code}`, async ({ loggedInUser, createOrder }) => {
        const config = testDiscountCodes.find(c => c.code === 'SAVE10');
        if (!config) return;

        // Simulate user having used the code before (C5 failure setup)
        // Note: In a real test, you would need a separate setup step to simulate multiple uses of the same code.
        
        await loggedInUser({ email: 'user@test.com', password: 'password' });
        await createOrder({}); 

        await loggedInUser.page.getByRole('textbox', { name: 'coupon' }).fill(config.code);
        await loggedInUser.page.click('Apply Button');

        // EXPECTATION: Should show an error message related to usage limit.
        await expect(loggedInUser.page.locator('.error-message')).toBeVisible();
    });
});
