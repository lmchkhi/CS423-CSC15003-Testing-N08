import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.form = page.locator('form');
    this.nameInput = this.fieldByLabel('Họ Tên');
    this.emailInput = this.fieldByLabel('Email');
    this.passwordInput = this.fieldByLabel('Mật khẩu');
    this.confirmPasswordInput = this.fieldByLabel('Xác nhận mật khẩu');
    this.submitButton = page.getByRole('button', { name: 'Đăng Ký' });
    this.errorMessage = page.locator('.bg-red-100');
  }

  fieldByLabel(label) {
    return this.page
      .locator('label', { hasText: label })
      .filter({ hasText: new RegExp(`^${label}$`) })
      .locator('..')
      .locator('input');
  }

  async goto() {
    await this.page.goto('/register');
    await expect(this.submitButton).toBeVisible();
  }

  async fill({ name, email, password, confirmPassword }) {
    if (name !== undefined) await this.nameInput.fill(name);
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    if (confirmPassword !== undefined && await this.confirmPasswordInput.count()) {
      await this.confirmPasswordInput.fill(confirmPassword);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}
