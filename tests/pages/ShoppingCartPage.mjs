import { expect } from '@playwright/test';

export class ShoppingCartPage {
  constructor(page, products) {
    this.page = page;
    this.products = products;
    this.cartLink = page.getByRole('link', { name: 'Giỏ hàng', exact: true });
    this.emptyMessage = page.getByText('Giỏ hàng của bạn đang trống', { exact: true });
    this.table = page.getByRole('table');
  }

  async openHome() {
    await this.page.route('http://localhost:3000/api/products**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(this.products) });
    });
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Danh sách sản phẩm', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Thêm vào giỏ' })).toHaveCount(this.products.length);
  }

  productCard(product) {
    return this.page.locator('main div.border').filter({
      has: this.page.getByRole('heading', { name: product.name, exact: true }),
    });
  }

  async addProduct(productId) {
    const product = this.products.find((item) => item.id === productId);
    if (!product) throw new Error(`Unknown product fixture: ${productId}`);
    await this.productCard(product).getByRole('button', { name: 'Thêm vào giỏ' }).click();
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/cart$/);
  }

  rowFor(productName) {
    return this.page.getByRole('row').filter({ hasText: productName });
  }

  totalBlock() {
    return this.page.locator('main .text-xl.font-bold');
  }
}
