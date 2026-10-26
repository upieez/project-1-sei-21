# PROJECT-1-SEI-21 DOCUMENTATION

![https://media.giphy.com/media/l4FGHzb9sBnQmYjyU/giphy.gif](https://media.giphy.com/media/l4FGHzb9sBnQmYjyU/giphy.gif)

## What this project does

**Match The Donuts** is a browser game built with vanilla JavaScript, HTML and CSS.
Fill the box to match the oldest order, then click **SEND ORDER!** Donuts must
match in both type and position. Click a donut in the box to remove it.

- Rounds begin with 45 seconds. Orders arrive every 2 seconds, with up to 5 queued.
- Orders and the player's box hold up to 6 donuts.
- With the correct quantity, each matching position earns 100 points and 1 second;
  each mismatch loses 75 points. The order is then sent, even with mismatches.
- With the wrong quantity, lose 100 points and 5 seconds, empty the box and retry
  the same order. Scores can be negative.
- When time runs out, the game displays the final score. Restart returns to the menu.

## Run locally

Open `index.html` in a modern browser. There is no build step or runtime dependency.
The original artwork, layout and CSS animations are retained.

## OOP structure

The game uses composition across three classes:

| Class | File | Responsibility |
| --- | --- | --- |
| `GameState` | `game-state.js` | Donut selection, order queue, scoring and remaining time. No DOM or timer dependencies. |
| `GameView` | `script.js` | Screens, donut rendering, score display and animation cleanup. |
| `DonutGame` | `script.js` | Input events, round lifecycle, interval ownership and coordination between state and view. |

`DONUTS` is the single catalog for both the palette and generated orders. Matching
uses donut IDs rather than image markup. `RULES` contains the game constants.
The scripts use a scoped namespace and classic script loading so local files and
static hosting work without a module server. The model also exports CommonJS for tests.

The refactor fixes empty-queue submission crashes, penalties skipping past zero,
duplicate submission during order removal, stale animation callbacks and timer
cleanup on restart. All 15 selectable donuts now appear in generated orders;
types and quantities are sampled uniformly instead of the original biased rounding
and duplicated cherry entry. The initial 45-second countdown is displayed immediately.

## Validation

Run the model regression tests using Node.js 18 or newer:

```sh
node --test tests/game-state.test.js
```

With Playwright and its Chromium browser installed, run the browser smoke test:

```sh
node tests/browser-smoke.cjs
```

If Playwright is installed outside this project, set `PLAYWRIGHT_MODULE` to its
absolute module path. The browser test opens the local HTML file, uses deterministic
orders and a controlled clock, and checks navigation, image loading, selection,
queue limits, scoring, penalties, rapid submission, expiry and restart cleanup.

The original project notes and development history follow.

## Motivation

1. This game will help me understand CSS better and improve on it
2. This game will also help me to review my javascript basics and logic

### Resources

- Good free game art I took is from [OpenGameArt](https://opengameart.org/) & [freepik](https://www.freepik.com/)
 	- Credit to [William](https://opengameart.org/content/donut-pack) for the donut icons
 	- Credit to [upkylak](https://www.freepik.com/free-vector/white-blank-cardboard-box-with-flip-top-realistic_6387612.htm) for the box
- Websites I used for syntax references are:
 	- [w3schools](https://www.w3schools.com/)
 	- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- Fonts Family I took is from [Google Fonts](https://fonts.google.com/?query=candy&selection.family=Emilys+Candy)
- Animation css I took is from [Daniel Eden](https://daneden.github.io/animate.css/)

### Creating a wireframe 

> The wireframes are the floor plan for your website, creating a vessel for which design and content can flow into.

1. First step is to draw up a rough sketch of how my final design will look like. This will help me to break down step by step on how the logic of my game will be. 

2. Second step is to identify where I need to place my divs in my HTML and also consider whether or not I should use bootstrap(?) (i.e having my donut box as a background image so that I can place my selected donuts on top of the box)

3. Third step is to identify what javascript syntax I would need to use (i.e storing my donuts in an array as a string)

4. Fourth step is to do the logic aspect of the game.

### MVP

- Be able to click on the donut and have it to populate the box
-	Be able to display donut images on the side bar, donut box and the objective
- Show the user that the donut matches

### Gameplay

Match the donut into the donut box from the objective and send out the order. Match the correct amount to gain points to and get the highest score!

- - - -

#### Stage 1

- Creating my HTML and implementing the divs inside of it as per my rough sketch
- Create the styling to have a basic visual implantation of how my design of the game should be like
- Create basic javascript function to have the base game running (i.e adding the donut to the donut box, checking the donut box has the same amount of donut in the objective)

#### Stage 2

- Reformat javascript codes to be able to implement donut visuals into the game.
- Randomize the donut array to display different amount of it every time it refreshes.
- Clear the donut array whenever it is correct
- Format the style to make it look slightly more visually appealing

#### Stage 3

- Able to select different types of donut
- Able to generate different types of donut in the objective
- Able to check and submit that the types of donut and number is correct

#### Stage 4
- Create a gameover with a restart button screen
- Create a startgame screen with instructions
- Animate the game

#### Further ideas (in progress)
- Have a function to drag it instead of clicking
- Create a difficulty page
- Each difficulty will have different amount of donut selection
 	- Easy will have 6 donuts to choose from and you only need to fill max of three donuts
 	- Medium will have 9 and fill up max 6 donuts
 	- Hard will have 12 donuts and fill up max 9 donuts
- Store highscore points
- Play music in the game
- Instead of creating a point system, change it to gain money instead and instead of having difficulty, you can progress the game by buying more donuts to add to your collection. Each donut you unlock can be sold to earn more money! The objective is to see if you can unlock all the donut by the end of the game and to get as much money as possible!
