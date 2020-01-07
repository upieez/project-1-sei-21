console.log("Donut game project!")

//----Image Sources in a variable----
var plainDonut = "<img src='images/donuts/plain/plain_donut.png'>"
var chocDonut = "<img src='images/donuts/brown/brown_donut_9.png'>"
var chocDonut2 = "<img src='images/donuts/brown/brown_donut_2.png'>"
var strawDonut = "<img src='images/donuts/red/red_donut_4.png'>"
var blueberryDonut = "<img src='images/donuts/blue/blue_donut_6.png'>"
var appleDonut = "<img src='images/donuts/green/green_donut_2.png'>"
var cherryDonut = "<img src='images/donuts/pink/pink_donut_3.png'>"
var lemonDonut = "<img src='images/donuts/yellow/yellow_donut_11.png'>"
var grapeDonut = "<img src='images/donuts/purple/purple_donut_7.png'>"
var cherryDonut = "<img src='images/donuts/red/red_donut_8.png'>"
var passionDonut = "<img src='images/donuts/purple/purple_donut_12.png'>"
var bananaDonut = "<img src='images/donuts/yellow/yellow_donut_8.png'>"
var dragonDonut = "<img src='images/donuts/pink/pink_donut_2.png'>"
var elderDonut = "<img src='images/donuts/blue/blue_donut_1.png'>"
var pearDonut = "<img src='images/donuts/green/green_donut_3.png'>"
var randomDonut = []


//----Global Variable----
var count = 0;
var points = 0;
var timer = 45;
var intervalClockObject;
var intervalDonutObject;

//----Main menu screen----

var selectScreen = function(){
    //donut header text
    var createDiv = document.createElement("div");
    createDiv.classList.add("game-start");
    createDiv.innerHTML = "<h1>Match The Donuts!</h1>";
    document.body.prepend(createDiv);
    var mainMenu = document.createElement("div");
    mainMenu.classList.add("main-menu")
    createDiv.appendChild(mainMenu);

    //start donut DOM
    var container = document.createElement("div");
    var startDonut = document.createElement("div");
    startDonut.classList.add("start-donut");
    startDonut.innerHTML = "<img src='images/donuts/pink/pink_donut_7.png'>";
    var startDonutText = document.createElement("div");
    startDonutText.innerHTML = "Start Game!"
    container.appendChild(startDonut);
    container.appendChild(startDonutText);
    mainMenu.appendChild(container);

    //instruction donut DOM
    var container1 = document.createElement("div");
    var instructionDonut = document.createElement("div");
    instructionDonut.classList.add("readme-donut");
    instructionDonut.innerHTML = "<img src='images/donuts/blue/blue_donut_5.png'>";
    var instructionDonutText = document.createElement("div");
    instructionDonutText.innerHTML = "Instructions!"
    container1.appendChild(instructionDonut);
    container1.appendChild(instructionDonutText);
    mainMenu.appendChild(container1);
}

// ----Starting the game with the overlay----

var gameStart = function(){
    selectScreen();

    var containerDiv = document.querySelector(".game-start");
    var container = document.querySelector(".container");
    var startDonut = document.querySelector(".start-donut");
    var readMeDonut = document.querySelector(".readme-donut");
    var createDiv = document.createElement("div");

    // event listener for mouseover to add animation
    startDonut.addEventListener("mouseover",function(){
        startDonut.classList.add("jello");
        startDonut.classList.add("animated");
        });
    readMeDonut.addEventListener("mouseover",function(){
        readMeDonut.classList.add("jello");
        readMeDonut.classList.add("animated");
        });
    startDonut.addEventListener("mouseout", function(){
        startDonut.classList.remove("jello");
        startDonut.classList.remove("animated");
        });
    readMeDonut.addEventListener("mouseout",function(){
        readMeDonut.classList.remove("jello");
        readMeDonut.classList.remove("animated");
        });

    // event listener for when click starts game or go to instruction page
    startDonut.addEventListener("click", function(){
        containerDiv.style.display = "none";
        container.style.removeProperty("display");
        document.querySelector(".donut-box").classList.add("bounceInLeft");
        document.querySelector(".donut-box").classList.add("animated");
        setTimeout(function(){
        document.querySelector(".donut-box").classList.remove("bounceInLeft");
        document.querySelector(".donut-box").classList.remove("animated");
        }, 3000)
        startTimer(); // start the array timer
        gameOverTimer(); // game end timer countdown
    });
    readMeDonut.addEventListener("click", function(){
        document.body.removeChild(containerDiv);
        createDiv.classList.add("game-start");
        createDiv.innerHTML = "<h1>Instructions</h1> Match the correct type and amount of donuts and get the highest score! </br></br> Each correct type of donuts earns you 100 points and adds a second to the timer </br></br> Each wrong type of donuts reduces your score by 75 </br></br> Wrong amount of donuts will make you lose 100 points and you have to redo again! </br></br> <div class='gameOver'>Back</div>";
        document.body.prepend(createDiv);
        document.querySelector(".gameOver").addEventListener("click",function(){
            document.body.removeChild(document.querySelector(".game-start"));
            gameStart();
        })
    });
}

gameStart()

//----Input Donut Function to Donut Box ----

var addDonut = function(){
//If statement to only add donuts if it's less than 6
    if (count < 6){
        count++;
        var donutBox = document.querySelector(".donut-takeaway");
        var div = document.createElement("div");
        div.classList.add("donut");
        div.classList.add("bounceInRight");
        div.classList.add("animated");
        div.innerHTML = ((this.innerHTML).trim());
        donutBox.appendChild(div);
        div.addEventListener("click",function(){
            donutBox.removeChild(this);
            count--;
        })
    }
}

//addDonut function runs when click on donut image
var addDonutToContainer = function(){
var clicker = document.querySelectorAll(".donut-clicker > .donut")
for (var i = 0; i < clicker.length; i++){
    clicker[i].addEventListener("click", addDonut);
    }
};

addDonutToContainer();

//----Generate Random Types of Donut in Objective----

var randomDonuts = function(){
    var donutOptions = [plainDonut, chocDonut, chocDonut2, strawDonut, blueberryDonut, appleDonut, cherryDonut, lemonDonut, grapeDonut, cherryDonut, passionDonut, bananaDonut, dragonDonut, elderDonut, pearDonut]
    while (randomDonut.length < 6){
        var randomNumber = Math.round(Math.random()* 14);
        randomDonut.push(donutOptions[randomNumber])
    }
}

//----Check for Correct Amount Function----

var checkForCorrectAmt = function(){
var firstArray = document.querySelectorAll(".donut-objective > .donut-array")[0];
var donutArray = firstArray.querySelectorAll(".donut-array > .donut");
var donutBox = document.querySelectorAll(".donut-takeaway > .donut");

//correctDonuts will check if the individual donuts inside are the same type
var checkForCorrectDonuts = function(){
    for (var i = 0; i < donutArray.length; i++){
        if(donutArray[i].innerHTML === donutBox[i].innerHTML){
            console.log("correct type of donut!");
            points += 100;
            timer += 1;
            document.querySelector("#player-points").textContent = points
        } else {
            console.log("wrong type of donut!")
            document.querySelector(".donut-takeaway").innerHTML="";
            count = 0;
            points -= 75;
            document.querySelector("#player-points").textContent = points
        }
    }
    clearDonut();
}

//If statement to check the correct amount in box
 if (donutArray.length === donutBox.length){
    checkForCorrectDonuts();
    console.log("correct amount!");
    } else {
        console.log("wrong amount!");
        document.querySelector(".donut-takeaway").innerHTML="";
        document.querySelector(".donut-box").classList.add("shake");
        document.querySelector(".donut-box").classList.add("animated");
        setTimeout(function(){
        document.querySelector(".donut-box").classList.remove("shake");
        document.querySelector(".donut-box").classList.remove("animated");
        }, 2000)
        points -= 100;
        document.querySelector("#player-points").textContent = points
        count = 0;
    }
};

//checkForCorrectAmt Function runs when button is clicked
var buttonChecker = function(){
var selectButton = document.querySelector("button");
selectButton.addEventListener("click", checkForCorrectAmt);
};

buttonChecker();

//----Generate Random Donut Amount Function----

var generateRandomDonutArray = function(){
    var counter = document.querySelector(".donut-objective").childElementCount
    if (counter < 5){
    var randomNumber = Math.round(1 + Math.random() * 5)
    var donutObjective = document.querySelector(".donut-objective");
    var donutArray = document.createElement("div");
    donutArray.classList.add("donut-array");
    donutArray.classList.add("bounceInRight");
    donutArray.classList.add("animated");
    randomDonuts(); // call my random donuts function
        // for loop to print out random amount of donut into the donut array
        for (var i = 0; i < randomNumber; i++){
            var donut = document.querySelector(".donut-array");
            var donutDiv = document.createElement("div");
            donutDiv.classList.add("donut");
            donutDiv.innerHTML = randomDonut[i];
            donutArray.appendChild(donutDiv);
            }
            donutObjective.appendChild(donutArray);
    }
    randomDonut = []; //reverting back to an empty array
}

//timer function to be called when game starts
var startTimer = function(){
    intervalDonutObject = setInterval(generateRandomDonutArray, 2000); //setInterval to keep adding more objective to the game
}

//----Clear the donut objective when correct----

var clearDonut = function(){
    var clear = document.querySelector(".donut-objective")
    document.querySelector(".donut-array").classList.add("slideOutUp");
    setTimeout(function(){
        clear.removeChild(document.querySelector(".donut-array"));
    }, 500)
    document.querySelector(".donut-takeaway").innerHTML="";
    count = 0;
}

//----Gameover function for when the game ends----

var gameOver = function(){
    clearInterval(intervalClockObject);
    clearInterval(intervalDonutObject);
    var mainBody = document.querySelector("body")
    mainBody.innerHTML="";
    var gameEnd = document.createElement("div");
    gameEnd.classList.add("gameEnd");
    mainBody.appendChild(gameEnd);
    document.querySelector(".gameEnd").innerHTML = "<h1>GAME OVER</h1> </br> WOULD YOU LIKE TO START AGAIN?" + " </br>" + "<div class='gameOver'>Restart</div>" + "</br>" + "YOUR POINTS IS: " + points;
    document.querySelector(".gameOver").addEventListener("click", function(){
        window.location.reload(true);
    })
}

// gamer over timer to start when user clicks on begin game
var gameOverTimer = function(){

    //creates the clock timer at the bottom of the sidebar
    var clockSideBar = document.querySelector(".donut-sidebar");
    var createClockTimerDiv = document.createElement("div");
    createClockTimerDiv.classList.add("timer");
    clockSideBar.appendChild(createClockTimerDiv);
    var createClockTimer = document.querySelector(".timer");
    var createClockTimerDivDiv = document.createElement("div");
    createClockTimerDivDiv.setAttribute("id","countdown");
    createClockTimer.appendChild(createClockTimerDivDiv);
    intervalClockObject = setInterval(clock,1000);
}

// ---- Countdown timer ----

var clock = function(){
    var time = document.querySelector("#countdown");
    timer--;
    time.textContent = timer + " secs";

    if (timer === 0){
        gameOver();// runs the game over screen when timer reaches specified timing
    }
}


//----Generating Random Color Donuts----
// //for future use
// var randomColors = function(){
//     var randomColorDonuts = ["brown","blue","red","yellow","green","purple","pink"];
//     var i = Math.round(Math.random()*7);
//     return "<img src='images/donuts/"+randomColorDonuts[i]+"/"+randomColorDonuts[i]+"_donut_"+Math.round(1+Math.random()*9)+".png'>"
// };