import { Page, expect } from '@playwright/test';
import { SortingDirections } from '../constants';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList = '.inventory_list';
  readonly pageHeader = '.title';
  readonly sortDropdownTestId = 'product-sort-container';
  readonly productItems = '.inventory_item';
  readonly productPrice = '.inventory_item_price';

  constructor(page: Page) {
    this.page = page;
  }

  async assertIsOpen() {
    await expect(this.page).toHaveURL(/inventory.html$/);
    await expect(this.page.locator(this.inventoryList)).toBeVisible();
  }

  async sortby(sortOption: SortingDirections) {
    await this.page
      .getByTestId(this.sortDropdownTestId)
      .selectOption(sortOption);
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page
      .locator(this.productPrice)
      .allTextContents();
    return priceElements.map(price => parseFloat(price.replace('$', '')));
  }
}
