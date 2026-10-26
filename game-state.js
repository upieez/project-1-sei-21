(function (root) {
    "use strict";

    const DONUTS = Object.freeze([
        { id: "plain", image: "plain/plain_donut.png" },
        { id: "chocolate", image: "brown/brown_donut_9.png" },
        { id: "strawberry", image: "red/red_donut_4.png" },
        { id: "apple", image: "green/green_donut_2.png" },
        { id: "grape", image: "purple/purple_donut_7.png" },
        { id: "blueberry", image: "blue/blue_donut_6.png" },
        { id: "lemon", image: "yellow/yellow_donut_11.png" },
        { id: "pink-cherry", image: "pink/pink_donut_3.png" },
        { id: "chocolate-sprinkles", image: "brown/brown_donut_2.png" },
        { id: "cherry", image: "red/red_donut_8.png" },
        { id: "passion-fruit", image: "purple/purple_donut_12.png" },
        { id: "banana", image: "yellow/yellow_donut_8.png" },
        { id: "dragon-fruit", image: "pink/pink_donut_2.png" },
        { id: "elderberry", image: "blue/blue_donut_1.png" },
        { id: "pear", image: "green/green_donut_3.png" }
    ].map(Object.freeze));

    const RULES = Object.freeze({
        startingSeconds: 45,
        boxCapacity: 6,
        queueCapacity: 5,
        orderIntervalMs: 2000,
        correctPoints: 100,
        correctSeconds: 1,
        wrongTypePoints: 75,
        wrongAmountPoints: 100,
        wrongAmountSeconds: 5
    });

    // The model knows the game rules, but has no dependency on the DOM or timers.
    class GameState {
        constructor(random = Math.random) {
            this.random = random;
            this.reset();
        }

        reset() {
            this.status = "menu";
            this.points = 0;
            this.remainingSeconds = RULES.startingSeconds;
            this.selectedDonuts = [];
            this.orders = [];
            this.nextOrderId = 1;
        }

        start() {
            this.reset();
            this.status = "playing";
        }

        addDonut(id) {
            if (this.status !== "playing" || this.selectedDonuts.length >= RULES.boxCapacity ||
                !DONUTS.some(donut => donut.id === id)) {
                return false;
            }
            this.selectedDonuts.push(id);
            return true;
        }

        removeDonut(index) {
            if (this.status !== "playing" || !Number.isInteger(index) ||
                index < 0 || index >= this.selectedDonuts.length) {
                return false;
            }
            this.selectedDonuts.splice(index, 1);
            return true;
        }

        generateOrder() {
            if (this.status !== "playing" || this.orders.length >= RULES.queueCapacity) {
                return null;
            }
            const length = 1 + Math.floor(this.random() * RULES.boxCapacity);
            const order = Object.freeze({
                id: this.nextOrderId++,
                donuts: Object.freeze(Array.from({ length }, () =>
                    DONUTS[Math.floor(this.random() * DONUTS.length)].id))
            });
            this.orders.push(order);
            return order;
        }

        submitOrder() {
            if (this.status !== "playing" || this.orders.length === 0) {
                return null;
            }
            const order = this.orders[0];
            const correctAmount = order.donuts.length === this.selectedDonuts.length;
            if (correctAmount) {
                order.donuts.forEach((id, index) => {
                    if (id === this.selectedDonuts[index]) {
                        this.points += RULES.correctPoints;
                        this.remainingSeconds += RULES.correctSeconds;
                    } else {
                        this.points -= RULES.wrongTypePoints;
                    }
                });
                this.orders.shift();
            } else {
                this.points -= RULES.wrongAmountPoints;
                this.remainingSeconds -= RULES.wrongAmountSeconds;
            }
            this.selectedDonuts = [];
            this.checkTime();
            return { order, correctAmount };
        }

        tick() {
            if (this.status === "playing") {
                this.remainingSeconds--;
                this.checkTime();
            }
        }

        checkTime() {
            if (this.remainingSeconds <= 0) {
                this.remainingSeconds = 0;
                this.status = "over";
            }
        }
    }

    // Classic scripts retain support for opening index.html without a build step.
    const api = Object.freeze({ DONUTS, RULES, GameState });
    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    } else {
        root.MatchDonuts = api;
    }
})(typeof globalThis !== "undefined" ? globalThis : this);
