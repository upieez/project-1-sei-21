const assert = require("node:assert/strict");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        await page.route("https://fonts.googleapis.com/**", route => route.abort());
        await page.addInitScript(() => {
            // Every order is [plain, chocolate]. Keep all randomness reproducible.
            const values = [0.2, 0, 0.1];
            let index = 0;
            Math.random = () => values[index++ % values.length];
        });
        await page.clock.install({ time: new Date("2026-10-26T12:00:00Z") });
        await page.clock.pauseAt(new Date("2026-10-26T12:00:01Z"));
        await page.goto(pathToFileURL(path.join(__dirname, "../index.html")).href);
        const click = selector => page.locator(selector).dispatchEvent("click");
        const count = selector => page.locator(selector).count();
        const points = async () => Number(await page.locator("#player-points").textContent());
        const seconds = async () => parseInt(await page.locator("#countdown").textContent(), 10);
        const select = async (...ids) => {
            for (const id of ids) await click(`.donut-clicker [data-donut-id="${id}"] img`);
        };
        const send = () => click(".donut-container button");
        const start = () => click(".start-donut");

        await click(".readme-donut");
        assert.equal(await page.locator("h1").textContent(), "Instructions");
        await click(".gameOver");
        await start();
        assert.equal(await seconds(), 45);
        assert.equal(await page.locator(".donut-container button").isDisabled(), true);
        await send(); // Synthetic event also exercises the empty-queue model guard.
        assert.equal(await points(), 0);
        assert.equal(await count(".donut-clicker > .donut"), 15);

        await select("plain", "chocolate", "apple", "pear", "lemon", "cherry", "banana");
        assert.equal(await count(".donut-takeaway > .donut"), 6);
        await click('.donut-takeaway [data-index="1"] img');
        assert.equal(await count(".donut-takeaway > .donut"), 5);
        assert.equal(await page.locator('.donut-takeaway [data-index="1"]').getAttribute("data-donut-id"), "apple");
        for (let index = 0; index < 5; index++) await click('.donut-takeaway [data-index="0"]');

        await page.clock.runFor(10000);
        assert.equal(await count(".donut-array"), 5);
        assert.equal(await seconds(), 35);
        await page.clock.runFor(1900);
        await select("plain", "chocolate");
        await send();
        assert.equal(await points(), 200);
        assert.equal(await seconds(), 36);
        await send();
        assert.equal(await points(), 200); // No duplicate scoring while row departs.
        await page.clock.runFor(100);
        assert.equal(await count(".donut-array"), 5); // No sixth row at generation boundary.
        await page.clock.runFor(400);
        assert.equal(await count(".donut-array"), 4);
        assert.equal(await page.locator(".donut-array").first().getAttribute("data-order-id"), "2");

        await select("plain", "pear");
        await send();
        assert.equal(await points(), 225);
        assert.equal(await seconds(), 36);
        await page.clock.runFor(500);
        await select("chocolate", "plain");
        await send();
        assert.equal(await points(), 75);
        await page.clock.runFor(500);

        const firstId = await page.locator(".donut-array").first().getAttribute("data-order-id");
        const beforePenalty = await seconds();
        await select("plain");
        await send();
        assert.equal(await points(), -25);
        assert.equal(await seconds(), beforePenalty - 5);
        assert.equal(await count(".donut-takeaway > .donut"), 0);
        assert.equal(await page.locator(".donut-array").first().getAttribute("data-order-id"), firstId);

        // Exhaust time during the shake animation, then restart without a reload.
        while (await count(".gameEnd") === 0) await send();
        assert.equal(await seconds(), 0);
        assert.equal(await count(".gameEnd"), 1);
        const finalPoints = await points();
        assert.ok((await page.locator(".gameEnd").textContent()).includes(String(finalPoints)));
        await click(".gameOver");
        await page.clock.runFor(5000);
        assert.equal(await count(".game-start"), 1);
        assert.equal(await points(), 0);
        assert.equal(await seconds(), 45);
        assert.equal(await count(".donut-array"), 0);
        assert.equal(await count("#countdown"), 1);
        await start();
        await page.clock.runFor(2000);
        assert.equal(await seconds(), 43);
        assert.equal(await count(".donut-array"), 1); // Only one generator survived restart.

        // Reach one second remaining and send a completely wrong, equal-size order.
        // That consumes an order without gaining time, so expiry interrupts removal.
        await page.clock.runFor(42750);
        await select("pear", "pear");
        await send();
        await page.clock.runFor(1000);
        assert.equal(await count(".gameEnd"), 1);
        await page.clock.runFor(5000);
        assert.deepEqual(errors, []);
        assert.equal(await page.locator("img").evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
        console.log("Browser smoke passed: navigation, assets, box, queue, scoring, penalties, rapid submit, expiry, restart and timer cleanup.");
    } finally {
        await browser.close();
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
