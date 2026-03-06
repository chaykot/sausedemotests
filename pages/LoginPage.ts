import { Page } from '@playwright/test';
import { credentials } from '../constants';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#user-name';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly errorMessage = '//h3[@data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async login(username?: string, password?: string) {
    await this.page.fill(
      this.usernameInput,
      username ?? credentials.standard.username,
    );
    await this.page.fill(
      this.passwordInput,
      password ?? credentials.standard.password,
    );
    await this.page.click(this.loginButton);
  }

  async getError(): Promise<string> {
    const text = await this.page.locator(this.errorMessage).textContent();
    return text?.trim() ?? '';
  }
}
