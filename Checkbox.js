const {chromium} = require('playwright');
// ติ๊ก checkbox ตามข้อความใน label
await page.locator('.ui.checkbox label', {
    hasText: '.B1-01'
  }).click();
// คลิกไอคอน
await page.locator('input[name="startDate"]').click();


