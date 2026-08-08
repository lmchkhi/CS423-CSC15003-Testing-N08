import { expect } from '@playwright/test';

export class ProductCsvImportPage {
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('input[type="file"]');
    this.importButton = page.getByRole('button', { name: /^Import \d+ sản phẩm$/ });
    this.previewLabel = page.getByText(/^Xem trước \(\d+ dòng\):$/);
    this.result = page.locator('.bg-red-100, .bg-green-100').filter({ hasText: /Import|❌|✅/ });
  }

  async gotoWithAdminToken(token) {
    await this.page.addInitScript((adminToken) => {
      localStorage.setItem('adminToken', adminToken);
    }, token);
    await this.page.goto('/');
    await expect(this.page.getByText('EShop Admin')).toBeVisible();
    await this.page.getByText('Sản phẩm', { exact: true }).click();
    await expect(this.page.getByText('Import sản phẩm từ CSV', { exact: false })).toBeVisible();
  }

  async upload(testCase) {
    await this.fileInput.setInputFiles({
      name: testCase.fileName,
      mimeType: testCase.fileName.endsWith('.csv') ? 'text/csv' : 'text/plain',
      buffer: Buffer.from(testCase.csv, 'utf8'),
    });
  }

  productName(name) {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.page
      .getByRole('row')
      .filter({ has: this.page.getByRole('button', { name: 'Sửa', exact: true }) })
      .locator('td')
      .filter({ hasText: new RegExp(`^${escapedName}$`) });
  }
}
