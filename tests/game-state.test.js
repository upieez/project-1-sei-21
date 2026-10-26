const test = require("node:test");
const assert = require("node:assert/strict");
const { DONUTS, RULES, GameState } = require("../game-state.js");

function playing(random = () => 0) {
    const state = new GameState(random);
    state.start();
    return state;
}

function sequence(...values) {
    return () => {
        assert.ok(values.length, "Unexpected random draw");
        return values.shift();
    };
}

test("menu and empty-queue actions do not change score or time", () => {
    const state = new GameState();
    assert.equal(state.addDonut("plain"), false);
    assert.equal(state.generateOrder(), null);
    assert.equal(state.submitOrder(), null);
    state.tick();
    state.start();
    assert.equal(state.submitOrder(), null);
    assert.equal(state.points, 0);
    assert.equal(state.remainingSeconds, 45);
});

test("box caps at six and removing a donut preserves the remaining sequence", () => {
    const state = playing();
    assert.equal(state.addDonut("missing"), false);
    DONUTS.slice(0, 6).forEach(donut => assert.equal(state.addDonut(donut.id), true));
    assert.equal(state.addDonut("pear"), false);
    assert.equal(state.removeDonut(1), true);
    assert.deepEqual(state.selectedDonuts, DONUTS.slice(0, 6).filter((_, index) => index !== 1).map(donut => donut.id));
    assert.equal(state.addDonut("pear"), true);
    assert.equal(state.addDonut("missing"), false);
    for (const index of [-1, 6, 1.5, NaN]) assert.equal(state.removeDonut(index), false);
});

test("orders range from one to six donuts and queue caps at five", () => {
    const minimum = playing(() => 0);
    assert.deepEqual(minimum.generateOrder().donuts, ["plain"]);
    const maximum = playing(() => 0.999999);
    assert.deepEqual(maximum.generateOrder().donuts, Array(6).fill("pear"));
    for (let index = 0; index < 4; index++) maximum.generateOrder();
    assert.equal(maximum.orders.length, RULES.queueCapacity);
    assert.equal(maximum.generateOrder(), null);
    assert.equal(new Set(maximum.orders.map(order => order.id)).size, 5);
});

test("every palette donut can appear in an order, including pink cherry", () => {
    DONUTS.forEach((donut, index) => {
        const state = playing(sequence(0, (index + 0.5) / DONUTS.length));
        assert.deepEqual(state.generateOrder().donuts, [donut.id]);
    });
});

test("correct submission rewards each position, clears box and advances oldest order", () => {
    const state = playing(sequence(0.4, 0, 0.1, 0.2, 0, 0));
    const first = state.generateOrder();
    const second = state.generateOrder();
    first.donuts.forEach(id => state.addDonut(id));
    const result = state.submitOrder();
    assert.equal(result.order, first);
    assert.equal(result.correctAmount, true);
    assert.equal(state.points, 300);
    assert.equal(state.remainingSeconds, 48);
    assert.deepEqual(state.orders, [second]);
    assert.deepEqual(state.selectedDonuts, []);
});

test("equal-size mixed matches award and penalize positions independently", () => {
    const state = playing(sequence(0.4, 0, 0.1, 0.2));
    state.generateOrder();
    ["plain", "pear", "apple"].forEach(id => state.addDonut(id));
    assert.equal(state.submitOrder().correctAmount, true);
    assert.equal(state.points, 125);
    assert.equal(state.remainingSeconds, 47);
    assert.equal(state.orders.length, 0);
});

test("right donuts in reversed order are mismatches and still consume the order", () => {
    const state = playing(sequence(0.2, 0, 0.1));
    const order = state.generateOrder();
    [...order.donuts].reverse().forEach(id => state.addDonut(id));
    state.submitOrder();
    assert.equal(state.points, -150);
    assert.equal(state.remainingSeconds, 45);
    assert.equal(state.orders.length, 0);
});

test("wrong quantity clears selection, keeps order and applies both penalties", () => {
    const state = playing();
    const order = state.generateOrder();
    state.addDonut("plain");
    state.addDonut("plain");
    assert.equal(state.submitOrder().correctAmount, false);
    assert.equal(state.points, -100);
    assert.equal(state.remainingSeconds, 40);
    assert.deepEqual(state.selectedDonuts, []);
    assert.equal(state.orders[0], order);
    state.addDonut("plain");
    state.submitOrder();
    assert.equal(state.points, 0);
    assert.equal(state.orders.length, 0);
});

test("penalty that passes zero ends immediately and prevents further gameplay", () => {
    const state = playing();
    state.generateOrder();
    for (let index = 0; index < 42; index++) state.tick();
    state.submitOrder();
    assert.equal(state.status, "over");
    assert.equal(state.remainingSeconds, 0);
    assert.equal(state.points, -100);
    assert.equal(state.addDonut("plain"), false);
    assert.equal(state.removeDonut(0), false);
    assert.equal(state.generateOrder(), null);
    assert.equal(state.submitOrder(), null);
    state.tick();
    assert.equal(state.remainingSeconds, 0);
});

test("normal countdown ends at zero and start resets the entire round", () => {
    const state = playing();
    state.generateOrder();
    state.addDonut("plain");
    state.submitOrder();
    state.generateOrder();
    state.addDonut("pear");
    for (let index = 0; index < 46; index++) state.tick();
    assert.equal(state.status, "over");
    state.start();
    assert.equal(state.status, "playing");
    assert.equal(state.points, 0);
    assert.equal(state.remainingSeconds, 45);
    assert.deepEqual(state.orders, []);
    assert.deepEqual(state.selectedDonuts, []);
    assert.equal(state.generateOrder().id, 1);
});
