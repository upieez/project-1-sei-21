# PROJECT-1-SEI-21 DOCUMENTATION

![https://media.giphy.com/media/l4FGHzb9sBnQmYjyU/giphy.gif](https://media.giphy.com/media/l4FGHzb9sBnQmYjyU/giphy.gif)

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

Match the donut into the donut box from the objective and send out the order. Match the correct amount to gain more money to buy more donuts and build your donut empire (further)

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
- Create a startgame screen

#### Further ideas (in progress)
- Have a function to drag it instead of clicking
- Animation(?)
- Do a timer function for the game
- Create a main menu page
- Create a difficulty page
- Store highscore points