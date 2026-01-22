const { chromium } = require('playwright');

(async () => {

    console.log('กำลังเปิด Browser...');
    const browser = await chromium.launch({headless : false});

    const page = await browser.newPage();

    console.log('ไปที่หน้า Login EIS');
    await page.goto('https://eis4ce.cpall.co.th/bench');

    await page.waitForTimeout(5000);

    console.log('ปิด Browser');
    await browser.close();

}

)();