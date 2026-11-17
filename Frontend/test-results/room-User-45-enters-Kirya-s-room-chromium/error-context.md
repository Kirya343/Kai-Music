# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 45 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
```

# Test source

```ts
  1   | import { test } from "@playwright/test";
  2   | import fs from "node:fs";
  3   | import path from "node:path";
  4   | import { fileURLToPath } from "node:url";
  5   | 
  6   | const __filename = fileURLToPath(import.meta.url);
  7   | const __dirname = path.dirname(__filename);
  8   | 
  9   | const users = JSON.parse(
  10  |     fs.readFileSync(
  11  |         path.resolve(__dirname, "../../../tests/users.json"),
  12  |         "utf-8"
  13  |     )
  14  | );
  15  | 
  16  | test.describe.configure({ mode: "parallel" });
  17  | test.setTimeout(1_800_000);
  18  | 
  19  | const log = (index: number, message: string) => {
  20  |     console.log(
  21  |         `[${new Date().toLocaleTimeString()}] [User ${index + 1}] ${message}`
  22  |     );
  23  | };
  24  | 
  25  | for (const [index, user] of users.slice(0, 50).entries()) {
  26  |     test(`User ${index + 1} enters Kirya's room`, async ({ browser }, testInfo) => {
  27  |         log(index, `START | Worker: ${testInfo.workerIndex}`);
  28  | 
  29  |         const context = await browser.newContext();
  30  |         const page = await context.newPage();
  31  | 
  32  |         page.on("response", async response => {
  33  |             if (response.status() >= 400) {
  34  |                 console.log(
  35  |                     `[User ${index + 1}] HTTP ERROR`,
  36  |                     response.status(),
  37  |                     response.request().method(),
  38  |                     response.url()
  39  |                 );
  40  | 
  41  |                 console.log(
  42  |                     "Body:",
  43  |                     (await response.text()).slice(0, 500)
  44  |                 );
  45  |             }
  46  |         });
  47  | 
  48  |         page.on("console", message => {
  49  |             console.log(`[Browser ${index + 1}] ${message.text()}`);
  50  |         });
  51  | 
  52  |         page.on("pageerror", error => {
  53  |             log(index, `PAGE ERROR: ${error.message}`);
  54  |         });
  55  | 
  56  |         page.on("requestfailed", request => {
  57  |             log(index, `REQUEST FAILED: ${request.url()}`);
  58  |         });
  59  | 
  60  |         try {
  61  |             log(index, "Opening login page");
  62  | 
  63  |             await page.goto("http://localhost:30000/login");
  64  | 
  65  |             log(index, `Entering credentials ${user.email}: ${user.password}`);
  66  | 
  67  |             await page.getByTestId("email").fill(user.email);
  68  |             await page.getByTestId("password").fill(user.password);
  69  |             await page.getByTestId("login-button").click();
  70  | 
  71  |             log(index, "Waiting for authentication");
  72  | 
  73  |             await page.waitForURL("**/login/success**");
  74  |             await page.waitForURL("**/");
  75  | 
  76  |             log(index, "Authenticated");
  77  | 
  78  |             await page.goto("http://localhost:30000/app");
  79  | 
  80  |             await page.reload();
  81  | 
  82  |             await page.waitForURL("**/app");
  83  | 
  84  |             log(index, "Waiting for room");
  85  | 
  86  |             const room = page.getByTestId("Kirya-room");
  87  | 
  88  |             await room.waitFor({ state: "visible" });
  89  |             await room.click();
  90  | 
  91  |             log(index, "ENTERED ROOM");
  92  | 
  93  |             await page.waitForTimeout(600_000);
  94  | 
  95  |             log(index, "Finished waiting");
  96  |         } catch (error) {
  97  |             log(index, `FAILED: ${error}`);
  98  |             throw error;
  99  |         } finally {
  100 |             log(index, "Closing browser context");
> 101 |             await context.close();
      |             ^ Error: browserContext.close: Target page, context or browser has been closed
  102 |         }
  103 |     });
  104 | }
```