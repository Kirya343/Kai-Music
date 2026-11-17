import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = JSON.parse(
    fs.readFileSync(
        path.resolve(__dirname, "../../../tests/users.json"),
        "utf-8"
    )
);

test.describe.configure({ mode: "parallel" });
test.setTimeout(1_800_000);

const log = (index: number, message: string) => {
    console.log(
        `[${new Date().toLocaleTimeString()}] [User ${index + 1}] ${message}`
    );
};

for (const [index, user] of users.slice(0, 50).entries()) {
    test(`User ${index + 1} enters Kirya's room`, async ({ browser }, testInfo) => {
        log(index, `START | Worker: ${testInfo.workerIndex}`);

        const context = await browser.newContext();
        const page = await context.newPage();

        page.on("response", async response => {
            if (response.status() >= 400) {
                console.log(
                    `[User ${index + 1}] HTTP ERROR`,
                    response.status(),
                    response.request().method(),
                    response.url()
                );

                console.log(
                    "Body:",
                    (await response.text()).slice(0, 500)
                );
            }
        });

        page.on("console", message => {
            console.log(`[Browser ${index + 1}] ${message.text()}`);
        });

        page.on("pageerror", error => {
            log(index, `PAGE ERROR: ${error.message}`);
        });

        page.on("requestfailed", request => {
            log(index, `REQUEST FAILED: ${request.url()}`);
        });

        try {
            log(index, "Opening login page");

            await page.goto("http://localhost:30000/login");

            log(index, `Entering credentials ${user.email}: ${user.password}`);

            await page.getByTestId("email").fill(user.email);
            await page.getByTestId("password").fill(user.password);
            await page.getByTestId("login-button").click();

            log(index, "Waiting for authentication");

            await page.waitForURL("**/login/success**");
            await page.waitForURL("**/");

            log(index, "Authenticated");

            await page.goto("http://localhost:30000/app");

            await page.reload();

            await page.waitForURL("**/app");

            log(index, "Waiting for room");

            const room = page.getByTestId("Kirya-room");

            await room.waitFor({ state: "visible" });
            await room.click();

            log(index, "ENTERED ROOM");

            await page.waitForTimeout(600_000);

            log(index, "Finished waiting");
        } catch (error) {
            log(index, `FAILED: ${error}`);
            throw error;
        } finally {
            log(index, "Closing browser context");
            await context.close();
        }
    });
}