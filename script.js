(function () {
    "use strict";

    const { DONUTS, RULES, GameState } = window.MatchDonuts;

    class GameView {
        constructor(document) {
            this.document = document;
            this.container = document.querySelector(".container");
            this.objectives = document.querySelector(".donut-objective");
            this.box = document.querySelector(".donut-box");
            this.takeaway = document.querySelector(".donut-takeaway");
            this.palette = document.querySelector(".donut-clicker");
            this.submitButton = document.querySelector(".donut-container button");
            this.points = document.querySelector("#player-points");
            this.timeouts = new Set();
            this.screen = null;

            const timer = document.createElement("div");
            timer.className = "timer";
            this.countdown = document.createElement("div");
            this.countdown.id = "countdown";
            timer.appendChild(this.countdown);
            document.querySelector(".donut-sidebar").appendChild(timer);
            this.renderPalette();
        }

        createDonut(id) {
            const donut = DONUTS.find(item => item.id === id);
            const element = this.document.createElement("div");
            element.className = "donut";
            element.dataset.donutId = id;
            const image = this.document.createElement("img");
            image.src = "images/donuts/" + donut.image;
            image.alt = donut.id.replace(/-/g, " ") + " donut";
            element.appendChild(image);
            return element;
        }

        renderPalette() {
            this.palette.replaceChildren(...DONUTS.map(donut => this.createDonut(donut.id)));
        }

        showScreen(className, markup) {
            if (this.screen) this.screen.remove();
            this.screen = this.document.createElement("div");
            this.screen.className = className;
            this.screen.innerHTML = markup;
            this.document.body.prepend(this.screen);
            this.container.style.display = "none";
            return this.screen;
        }

        showMenu(onStart, onInstructions) {
            const screen = this.showScreen("game-start", `
                <h1>Match The Donuts!</h1>
                <div class="main-menu">
                    <div><div class="start-donut"><img src="images/donuts/pink/pink_donut_7.png" alt="Start game"></div><div>Start Game!</div></div>
                    <div><div class="readme-donut"><img src="images/donuts/blue/blue_donut_5.png" alt="Instructions"></div><div>Instructions!</div></div>
                </div>`);
            const start = screen.querySelector(".start-donut");
            const instructions = screen.querySelector(".readme-donut");
            start.addEventListener("click", onStart);
            instructions.addEventListener("click", onInstructions);
            [start, instructions].forEach(element => {
                element.addEventListener("mouseover", () => element.classList.add("jello", "animated"));
                element.addEventListener("mouseout", () => element.classList.remove("jello", "animated"));
            });
        }

        showInstructions(onBack) {
            const screen = this.showScreen("game-start", `
                <h1>Instructions</h1>
                Match the type, amount and order of donuts in the first order to get the highest score!<br><br>
                Click a donut to add it to the box. Click a donut in the box to remove it.<br><br>
                Each correct donut earns you 100 points and adds a second to the timer.<br><br>
                Each wrong donut loses 75 points. Orders with the right amount are then sent.<br><br>
                A wrong amount loses 100 points and 5 seconds. Try that order again!<br><br>
                <div class="gameOver">Back</div>`);
            screen.querySelector(".gameOver").addEventListener("click", onBack);
        }

        showGame() {
            if (this.screen) this.screen.remove();
            this.screen = null;
            this.container.style.removeProperty("display");
            this.animateBox("bounceInLeft", 3000);
        }

        showGameOver(points, onRestart) {
            const screen = this.showScreen("gameEnd", `
                <h1>GAME OVER</h1><br>WOULD YOU LIKE TO START AGAIN?<br>
                <div class="gameOver">Restart</div><br>YOUR POINTS IS: ${points}`);
            screen.querySelector(".gameOver").addEventListener("click", onRestart);
        }

        renderStatus(state, submitting) {
            this.points.textContent = state.points;
            this.countdown.textContent = state.remainingSeconds + " secs";
            this.submitButton.disabled = state.status !== "playing" || state.orders.length === 0 || submitting;
        }

        renderBox(state, animateLast = false) {
            this.takeaway.replaceChildren(...state.selectedDonuts.map((id, index) => {
                const element = this.createDonut(id);
                element.dataset.index = index;
                if (animateLast && index === state.selectedDonuts.length - 1) {
                    element.classList.add("bounceInRight", "animated");
                }
                return element;
            }));
        }

        addOrder(order) {
            const row = this.document.createElement("div");
            row.className = "donut-array bounceInRight animated";
            row.dataset.orderId = order.id;
            row.append(...order.donuts.map(id => this.createDonut(id)));
            this.objectives.appendChild(row);
        }

        completeOrder(order, onComplete) {
            const row = this.objectives.querySelector(`[data-order-id="${order.id}"]`);
            row.classList.add("slideOutUp");
            this.after(500, () => {
                row.remove();
                onComplete();
            });
        }

        after(milliseconds, callback) {
            const timeout = setTimeout(() => {
                this.timeouts.delete(timeout);
                callback();
            }, milliseconds);
            this.timeouts.add(timeout);
            return timeout;
        }

        animateBox(animation, milliseconds) {
            clearTimeout(this.boxAnimation);
            this.timeouts.delete(this.boxAnimation);
            this.box.classList.remove("bounceInLeft", "shake", "animated");
            // Restart the animation even on consecutive incorrect submissions.
            void this.box.offsetWidth;
            this.box.classList.add(animation, "animated");
            this.boxAnimation = this.after(milliseconds, () => this.box.classList.remove(animation, "animated"));
        }

        clearAnimations() {
            this.timeouts.forEach(timeout => clearTimeout(timeout));
            this.timeouts.clear();
            this.box.classList.remove("bounceInLeft", "shake", "animated");
        }

        reset(state) {
            this.clearAnimations();
            this.objectives.replaceChildren();
            this.renderBox(state);
            this.renderStatus(state, false);
        }
    }

    class DonutGame {
        constructor(state, view) {
            this.state = state;
            this.view = view;
            this.submitting = false;
            this.clockInterval = null;
            this.orderInterval = null;
            this.bindEvents();
            this.showMenu();
        }

        bindEvents() {
            this.view.palette.addEventListener("click", event => {
                const donut = event.target.closest("[data-donut-id]");
                if (donut && this.state.addDonut(donut.dataset.donutId)) {
                    this.view.renderBox(this.state, true);
                }
            });
            this.view.takeaway.addEventListener("click", event => {
                const donut = event.target.closest("[data-index]");
                if (donut && this.state.removeDonut(Number(donut.dataset.index))) {
                    this.view.renderBox(this.state);
                }
            });
            this.view.submitButton.addEventListener("click", () => this.submitOrder());
        }

        showMenu() {
            this.stopTimers();
            this.submitting = false;
            this.state.reset();
            this.view.reset(this.state);
            this.view.showMenu(() => this.start(), () =>
                this.view.showInstructions(() => this.showMenu()));
        }

        start() {
            if (this.state.status === "playing") return;
            this.stopTimers();
            this.submitting = false;
            this.state.start();
            this.view.reset(this.state);
            this.view.showGame();
            this.clockInterval = setInterval(() => {
                this.state.tick();
                this.update();
            }, 1000);
            this.orderInterval = setInterval(() => {
                // A departing row still occupies a visible queue slot for 500ms.
                if (this.state.orders.length + Number(this.submitting) >= RULES.queueCapacity) return;
                const order = this.state.generateOrder();
                if (order) this.view.addOrder(order);
                this.update();
            }, RULES.orderIntervalMs);
        }

        submitOrder() {
            if (this.submitting) return;
            const result = this.state.submitOrder();
            if (!result) return;
            this.view.renderBox(this.state);
            if (result.correctAmount) {
                this.submitting = true;
                this.view.completeOrder(result.order, () => {
                    this.submitting = false;
                    this.update();
                });
            } else {
                this.view.animateBox("shake", 2000);
            }
            this.update();
        }

        update() {
            this.view.renderStatus(this.state, this.submitting);
            if (this.state.status === "over") {
                this.stopTimers();
                this.view.clearAnimations();
                this.view.showGameOver(this.state.points, () => this.showMenu());
            }
        }

        stopTimers() {
            clearInterval(this.clockInterval);
            clearInterval(this.orderInterval);
            this.clockInterval = null;
            this.orderInterval = null;
        }
    }

    new DonutGame(new GameState(), new GameView(document));
})();
