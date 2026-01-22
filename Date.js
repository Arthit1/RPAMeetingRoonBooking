const {chromium} = require('playwright');
//เลือกไอคอนวันที่
// =====================
// CONFIG วันที่ที่ต้องการ
// =====================
const TARGET_YEAR  = 2026;
const TARGET_MONTH = 1;   // 1 = January, 12 = December
const TARGET_DAY   = 10;

// =====================
// FUNCTION เลือกวันที่
// =====================
async function pickAntdDate(page, inputSelector) {

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // เปิด popup calendar
  await page.locator(inputSelector).click();
  const popup = page.locator('.ant-calendar-picker-container');
  await popup.waitFor({ state: 'visible' });

  // อ่านเดือน/ปีที่แสดงอยู่
  async function getShownMonthYear() {
    const mText = await popup.locator('.ant-calendar-month-select').innerText(); // Dec
    const yText = await popup.locator('.ant-calendar-year-select').innerText();  // 2025

    const shortMap = {
      Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
      Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
    };

    return {
      monthIndex: shortMap[mText.trim()],
      year: Number(yText.trim())
    };
  }

  // ขยับเดือน/ปีจนตรงกับ target
  while (true) {
    const { monthIndex, year } = await getShownMonthYear();
    const shown  = year * 12 + monthIndex;
    const target = TARGET_YEAR * 12 + (TARGET_MONTH - 1);

    if (shown === target) break;

    if (shown < target) {
      await popup.locator('.ant-calendar-next-month-btn').click();
    } else {
      await popup.locator('.ant-calendar-prev-month-btn').click();
    }
  }

  // คลิกวันที่
  const title = `${monthNames[TARGET_MONTH - 1]} ${TARGET_DAY}, ${TARGET_YEAR}`;
  await popup
    .locator(`.ant-calendar-cell[title="${title}"] .ant-calendar-date`)
    .click();
}

// =====================
// USAGE
// =====================
await pickAntdDate(page, 'input[name="startDate"]');