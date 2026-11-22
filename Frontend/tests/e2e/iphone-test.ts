import { chromium, devices } from "playwright";

(async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext({
        ...devices["iPhone 15"]
    });

    const page = await context.newPage();

    await page.goto("http://localhost:30000");
})();