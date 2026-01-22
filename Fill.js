const {chromium} = require('playwright');

(async () => {

    console.log('กำลังเปิด Browser');
    const browser = await chromium.launch({headless : false});
    const page = await browser.newPage();

    console.log('ไปยังหน้า Login EIS');
    await page.goto('https://eis4ce.cpall.co.th/bench');

    await page.fill('input[name = "Username"]','arthithem');
    await page.fill('input[name = "Password"]','11111111');
    await page.click('button[type=submit]');

    console.log('รอระบบ Login');
    await page.waitForLoadState('networkidle');

    console.log('Login เรียบร้อย ');

    await browser.close();
})();