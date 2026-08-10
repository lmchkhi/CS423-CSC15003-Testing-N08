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

const productsData = fs.readFileSync("data/fr09/products.json", 'utf-8');
const testProducts: Array<ProductData> = JSON.parse(productsData);

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
        await this.page.goto("http://localhost:5173", { waitUntil: 'networkidle' });
        let productsLocator = this.page.locator('div', {hasText: " VND"});
 
        let products = await productsLocator.all();
        
        for (let product of products) {
            
            let name = await product.locator('h2').first().textContent();
            let priceText = await product.locator('p').first().textContent();
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

    async addItem(productIndex: number | string = 0) {
        await this.page.goto(`${this.baseURL}`);
        if (this.products.length === 0) {
            throw new Error("No products initialized.");
        }
        let product = typeof productIndex === 'number' ? this.products[productIndex] : this.products.find(p => p.name === productIndex);
        if (!product) {
            throw new Error(`Product not found: ${productIndex}`);
        }
        await product.locator.getByText("Thêm vào giỏ").first().click();
    }

    async checkout() {
        // await this.page.goto(`${this.baseURL}`);
        await this.page.getByRole('link', { name: 'Giỏ hàng' }).click();
        await this.page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
    }

    async applyDiscountCode(code: string) {
        await this.discountCodeInput.fill(code);
        await this.applyDiscountButton.click();
    }

    async placeOrder() {
        await this.page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
        await this.page.goto(this.baseURL); // Navigate back to the base URL after placing the order
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
        await this.page.waitForTimeout(100);
    }
    async addDiscountCode(discountCode: DiscountCode) {
        await this.page.goto(`${this.baseURL}`);
        await this.page.getByText('Mã Giảm Giá', {exact:true}).click();
        await this.page.getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' }).fill(discountCode.code);
        await this.page.getByRole('combobox').selectOption(discountCode.type);
        if (discountCode.type === 'fixed') {
            await this.page.getByRole('spinbutton', { name: 'Số tiền (VD: 50000)' }).fill(discountCode.value.toString());
        } else {
            await this.page.getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' }).fill(discountCode.value.toString());
        }
        await this.page.getByRole('spinbutton', { name: 'Đơn tối thiểu (₫)' }).fill(discountCode.min_order_amount.toString());
        await this.page.getByPlaceholder('Ngày hết hạn').fill(discountCode.expired_at);
        await this.page.getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' }).fill(discountCode.max_uses_per_user.toString());
        await this.page.getByRole('button', { name: 'Tạo mã' }).click();
        await this.page.waitForTimeout(100); // Wait to ensure the discount code is added
    }
    async removeDiscountCode(code: string) {
        await this.page.getByText('Mã Giảm Giá', {exact:true}).click();
        const codeRow = this.page.locator('tr').filter({ hasText: code });
        await codeRow.getByRole('button', { name: 'Xóa' }).click();
        await this.page.waitForTimeout(100); // Wait for delete
        // await this.page.getByRole('button', { name: 'Xác nhận' }).click();
    }

    async addProduct(ProductData: ProductData) {
        await this.page.getByText('Sản phẩm', {exact: true}).click();
        await this.page.getByRole('textbox', { name: 'Tên sản phẩm' }).fill(ProductData.name);
        await this.page.getByRole('spinbutton', { name: 'Giá tiền' }).fill(ProductData.price.toString());
        await this.page.getByRole('textbox', { name: 'URL Ảnh' }).fill(ProductData.picture || '');
        await this.page.getByRole('textbox', { name: 'Mô tả' }).fill(ProductData.description || '');
        await this.page.getByRole('combobox').selectOption(ProductData.category);
        await this.page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
        await this.page.waitForTimeout(100); // Wait to ensure the product is added
    }

    async removeProduct(productName: string) {
        await this.page.goto(`${this.baseURL}`);
        await this.page.reload(); // Ensure the page is fully loaded and up-to-date
        await this.page.getByText('Sản phẩm', {exact: true}).click();
        const productRow = await this.page.getByRole('row').filter({hasText: productName}).all();
        //console.log(`Attempting to remove product: ${productName}. Found ${productRow.length} matching rows.`);
        await productRow[0].scrollIntoViewIfNeeded();
        await productRow[0].getByRole('button', { name: 'Xóa' }).click();
        await this.page.waitForTimeout(200); // Wait for delete
        // await this.page.getByRole('button', { name: 'Xác nhận' }).click();
    }
    async editProduct(productName: string, save: boolean, updatedData: Partial<ProductData>) {
        await this.page.getByText('Sản phẩm', {exact: true}).click();
        const productRow = this.page.getByRole('row', { name: productName }).first();
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
        await this.page.waitForTimeout(100); // Wait to ensure the product is updated or edit is canceled
    }
}

type Fixtures = {
    orderFixture: OrderFixture;
    storeProductsFixture: StoreProductsFixture;
    adminFixture: AdminFixture;
}
let test = base.extend<Fixtures>({
    orderFixture: async ({ page, storeProductsFixture, adminFixture}, use) => {
        const orderFixture = new OrderFixture("http://localhost:5173", page);
        orderFixture.products = storeProductsFixture.products;
        //console.log("Initialized orderFixture with products:", orderFixture.products.map(p => p.name));
        await use(orderFixture);
    },

    storeProductsFixture: [async ({ page, adminFixture}, use) => {
        await page.goto("http://localhost:5173");
        const storeProductsFixture = new StoreProductsFixture(page);
        await storeProductsFixture.initProducts();
        await use(storeProductsFixture);
    }, { auto: true }],

    adminFixture: async ({ page }, use, testInfo) => {
        const adminFixture = new AdminFixture("http://localhost:5174", page);
        await adminFixture.loginAsAdmin('admin@eshop.com', 'Admin123!');
        for (let product of testProducts) {
            let tmp_product = structuredClone(product);
            tmp_product.name = `${testInfo.testId}_${product.name}`;
            
            await adminFixture.addProduct(tmp_product);
        }
        await use(adminFixture);
        for (let product of testProducts) {
            let tmp_product = structuredClone(product);
            tmp_product.name = `${testInfo.testId}_${product.name}`;
            await adminFixture.removeProduct(tmp_product.name);
        }
    }
})

function doubleToCurrencyString(value: number): string {
    // Convert number to comma-separated string 
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/\./g, ',');
}

test.describe('Checkout Discount Code Validation', () => {
    test.beforeEach(async ({page, storeProductsFixture, orderFixture }) => {
        //test.setTimeout(90000);
        await storeProductsFixture.initProducts();
        await page.goto("http://localhost:5173/login");
        let inputs = await page.getByRole("textbox").all()
        let username = inputs[0], password = inputs[1];
        await username.fill('test@eshop.com');
        await password.fill('Test1234!');
        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test(`Correctly apply discount code: ${testDiscountConfigs[0].code}`, async ({ page, orderFixture }, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'SAVE10');
        if (!config) return; // Skip if data is missing

        let testProduct = testProducts.find(p => p.name === `Điện thoại BVA 500000`);
        if (!testProduct) {
            throw new Error("Test product not found");
        }
        await orderFixture.addItem(`${testInfo.testId}_${testProduct.name}`); // Add first product to cart
        await orderFixture.checkout();

        await orderFixture.applyDiscountCode(config.code);
        let successMessage = page.getByText(`✅ Áp dụng thành công! Giảm ${config.type === 'fixed' ? `${doubleToCurrencyString(config.value).replace(/,/g, '.')}` : `${config.value}%` }`).first();
        await expect(successMessage).toBeVisible();
        let saveAmount = page.getByText(`Tiết kiệm: ${doubleToCurrencyString(config.type === 'fixed' ? config.value : config.value * testProduct.price)}`).first();
        await expect(saveAmount).toBeVisible();
        let totalAmount = page.getByText(`Tổng cộng: ${doubleToCurrencyString(config.type === 'fixed' ? testProduct.price - config.value : testProduct.price * (1 - config.value / 100))}`).first();
        await expect(totalAmount).toBeVisible();
    });

    test(`Correctly apply discount code: ${testDiscountConfigs[1].code}`, async ({ page, orderFixture }, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'BIGBUY');

        if (!config) return; // Skip if data is missing
        
        let product_to_add = testProducts.find(p => p.name === `iPhone 15 Pro Max`);
        
        if (!product_to_add) {
            throw new Error("Test product not found");
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`); // Add first product to cart
        await orderFixture.checkout();

        await orderFixture.applyDiscountCode(config.code);

        let successMessage = page.getByText(`✅ Áp dụng thành công! Giảm ${config.type === 'fixed' ? `${doubleToCurrencyString(config.value).replace(/,/g, '.')}` : `${config.value}%` }`).first();
        await expect(successMessage).toBeVisible();
        let saveAmount = page.getByText(`Tiết kiệm: ${doubleToCurrencyString(config.type === 'fixed' ? config.value : config.value * product_to_add.price)}`).first();
        await expect(saveAmount).toBeVisible();
        let totalAmount = page.getByText(`Thành tiền: ${doubleToCurrencyString(config.type === 'fixed' ?product_to_add.price - config.value : product_to_add.price * (1 - config.value / 100))}`).first();
        await expect(totalAmount).toBeVisible();
    });


    test(`Reject expired code: ${testDiscountConfigs[3].code}`, async ({page, orderFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'EXPIRED');
        if (!config) return;
        // Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa
        let product_to_add = testProducts[0];
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`); // Add first product to cart
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let errorMessage = await page.getByText(`Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa`).first();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveAttribute('class', /text-red-600/);
    });


    test(`Reject code with insufficient order amount: ${testDiscountConfigs[1].code}`, async ({page, orderFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'BIGBUY');
        if (!config) return;

        let product_to_add = testProducts.find(c => c.price < config.min_order_amount);
        if (!product_to_add) {
            console.warn(`No product found with price less than ${config.min_order_amount}. Skipping test.`);
            return; // Skip if no suitable product found
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`); // Add first product to cart
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let errorMessage = page.getByText(`Đơn hàng chưa đủ giá trị tối thiểu ${doubleToCurrencyString(config.min_order_amount).replace(/,/g, '.')} đ để áp dụng mã này`).first();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveAttribute('class', /text-red-600/);
    });


    test(`Reject code with exceeded usage limit: ${testDiscountConfigs[0].code}`, async ({page, orderFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'SAVE10');
        if (!config) return;

        let product_to_add = testProducts.find(c => c.price > config.min_order_amount);
        if (!product_to_add) {
            console.warn(`No product found with price greater than or equal to ${config.min_order_amount}. Skipping test.`);
            return; // Skip if no suitable product found
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        await orderFixture.placeOrder(); // Place the order to simulate usage

        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let errorMessage = page.getByText(`Bạn đã sử dụng mã này ${config.max_uses_per_user} lần (đã đạt giới hạn)`).first();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveAttribute('class', /text-red-600/);
    });

    test(`Reject non-existent code`, async ({page, orderFixture}, testInfo) => {
        let product_to_add = testProducts[0];
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode("NONEXISTENTCODE");

        let errorMessage = page.getByText(`Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa`).first();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveAttribute('class', /text-red-600/);
    });
    test(`Empty code`, async ({page, orderFixture}, testInfo) => {
        let product_to_add = testProducts[0];
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        
        expect(orderFixture.applyDiscountButton).toBeDisabled();
        try{
            await orderFixture.applyDiscountButton.click({timeout: 3000});
            test.fail(true, "Expected button click to fail due to disabled state, but it succeeded.");
        } catch (err) {
            console.log("Caught expected error when clicking disabled button:", err);
            // Expecting an error because the button is disabled
            expect(err.name).toContain('TimeoutError');
        }
    });

    test("Reject code with expired date is today", async ({page, orderFixture, adminFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'EXPIRED_TODAY');
        if (!config) return;    
        config.expired_at = new Date().toISOString().split('T')[0]; // Set expired_at to today
        await adminFixture.addDiscountCode(config);
        // Mã giảm giá đã hết hạn
        let product_to_add = testProducts.find(c => c.price >= config.min_order_amount);
        if (!product_to_add) {
            console.warn(`No product found with price greater than or equal to ${config.min_order_amount}. Skipping test.`);
            return;
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let errorMessage = page.getByText(`Mã giảm giá đã hết hạn`).first();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveAttribute('class', /text-red-600/);
    });

    test("Apply code with expired date is tomorrow", async ({page, orderFixture, adminFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'EXPIRED_TOMORROW');
        if (!config) return;    
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        config.expired_at = tomorrow.toISOString().split('T')[0];
        adminFixture.addDiscountCode(config);
        // Mã giảm giá chưa hết hạn
        let product_to_add = testProducts.find(c => c.price >= config.min_order_amount);
        if (!product_to_add) {
            console.warn(`No product found with price greater than or equal to ${config.min_order_amount}. Skipping test.`);
            return;
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code); 

        let successMessage = page.getByText(`✅ Áp dụng thành công! Giảm ${config.type === 'fixed' ? `${doubleToCurrencyString(config.value).replace(/,/g, '.')}` : `${config.value}%` }`).first();
        await expect(successMessage).toBeVisible();
        let saveAmount = page.getByText(`Tiết kiệm: ${doubleToCurrencyString(config.type === 'fixed' ? config.value : config.value * product_to_add.price)}`).first();
        await expect(saveAmount).toBeVisible();
        let totalAmount = page.getByText(`Thành tiền: ${doubleToCurrencyString(config.type === 'fixed' ?product_to_add.price - config.value : product_to_add.price * (1 - config.value / 100))}`).first();
        await expect(totalAmount).toBeVisible();
    });

    test("Apply code with total order 1 more than min order amount", async ({page, orderFixture, adminFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'BIGBUY');
        if (!config) return;    
        let product_to_add = testProducts.find(c => c.price === config.min_order_amount + 1);
        if (!product_to_add) {
            console.warn(`No product found with price equal to ${config.min_order_amount + 1}. Skipping test.`);
            return; // Skip if no suitable product found
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let successMessage = page.getByText(`✅ Áp dụng thành công! Giảm ${config.type === 'fixed' ? `${doubleToCurrencyString(config.value).replace(/,/g, '.')}` : `${config.value}%` }`).first();
        await expect(successMessage).toBeVisible();
        let saveAmount = page.getByText(`Tiết kiệm: ${doubleToCurrencyString(config.type === 'fixed' ? config.value : config.value * product_to_add.price)}`).first();
        await expect(saveAmount).toBeVisible();
        let totalAmount = page.getByText(`Thành tiền: ${doubleToCurrencyString(config.type === 'fixed' ?product_to_add.price - config.value : product_to_add.price * (1 - config.value / 100))}`).first();
        await expect(totalAmount).toBeVisible();
    });

    test("Apply code that allow 2 usages per user, and use it twice", async ({page, orderFixture, adminFixture}, testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'VIP100');
        if (!config) return;
        let product_to_add = testProducts.find(c => c.price > config.min_order_amount);
        if (!product_to_add) {
            console.warn(`No product found with price greater than or equal to ${config.min_order_amount}. Skipping test.`);
            return;
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        await orderFixture.placeOrder(); // Place the order to simulate usage

        await orderFixture.addItem(`${testInfo.testId}_${product_to_add.name}`);
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let successMessage = page.getByText(`✅ Áp dụng thành công! Giảm ${config.type === 'fixed' ? `${doubleToCurrencyString(config.value).replace(/,/g, '.')}` : `${config.value}%` }`).first();
        await expect(successMessage).toBeVisible();
        let saveAmount = page.getByText(`Tiết kiệm: ${doubleToCurrencyString(config.type === 'fixed' ? config.value : config.value * product_to_add.price)}`).first();
        await expect(saveAmount).toBeVisible();
        let totalAmount = page.getByText(`Thành tiền: ${doubleToCurrencyString(config.type === 'fixed' ?product_to_add.price - config.value : product_to_add.price * (1 - config.value / 100))}`).first();
        await expect(totalAmount).toBeVisible();
    });

    test("Apply code with cart item of 2 products", async ({page, orderFixture, adminFixture},testInfo) => {
        const config = testDiscountConfigs.find(c => c.code === 'BIGBUY');
        if (!config) return;
        let product_to_add1 = testProducts.find(c => c.price >= config.min_order_amount);
        let product_to_add2 = testProducts.find(c => c.price >= config.min_order_amount);
        if (!product_to_add1 || !product_to_add2) {
            console.warn("Not enough products found with the required price. Skipping test.");
            return;
        }
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add1.name}`);
        await orderFixture.addItem(`${testInfo.testId}_${product_to_add2.name}`);
        let totalPrice = product_to_add1.price + product_to_add2.price;
        await orderFixture.checkout();
        await orderFixture.applyDiscountCode(config.code);

        let successMessage = page.getByText(`✅ Áp dụng thành công! Giảm ${config.type === 'fixed' ? `${doubleToCurrencyString(config.value).replace(/,/g, '.')}` : `${config.value}%` }`).first();
        await expect(successMessage).toBeVisible();
        let saveAmount = page.getByText(`Tiết kiệm: ${doubleToCurrencyString(config.type === 'fixed' ? config.value : config.value * totalPrice)}`).first();
        await expect(saveAmount).toBeVisible();
        let totalAmount = page.getByText(`Thành tiền: ${doubleToCurrencyString(config.type === 'fixed' ?totalPrice - config.value : totalPrice * (1 - config.value / 100))}`).first();
        await expect(totalAmount).toBeVisible();
    });
});