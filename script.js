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
var randomDonut = []



//----Global Variable----
var count = 0;
var points = 0;
var startGame = false;

// ----Starting the game with the overlay----

var gameStart = function(){
    var containerDiv = document.querySelector(".game-start");
    var container = document.querySelector(".container");
    document.querySelector(".start-donut").addEventListener("mouseover",function(){
    document.querySelector(".start-donut").classList.add("jello");
    document.querySelector(".start-donut").classList.add("animated");
    setTimeout(function(){
    document.querySelector(".start-donut").classList.remove("jello");
    document.querySelector(".start-donut").classList.remove("animated");
    }, 2000)
    })
    document.querySelector(".start-donut").addEventListener("click", function(){
        containerDiv.style.display = "none";
        container.style.removeProperty("display");
        startGame = true;
        startTimer(); // start the array timer
    })
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
        div.innerHTML = ((this.innerHTML).trim());
        donutBox.appendChild(div);
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
    var donutOptions = [plainDonut, chocDonut, chocDonut2, strawDonut, blueberryDonut, appleDonut, cherryDonut, lemonDonut, grapeDonut]
    while (randomDonut.length < 6){
        var randomNumber = Math.round(Math.random()* 8);
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
    donutArray.classList.add("slideInRight");
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

var startTimer = function(){
    setInterval(generateRandomDonutArray, 2000); //setInterval to keep adding more objective to the game
}

//----Clear the donut objective when correct----

var clearDonut = function(){
    var clear = document.querySelector(".donut-objective")
    clear.removeChild(document.querySelector(".donut-array"));
    document.querySelector(".donut-takeaway").innerHTML="";
    count = 0;
}

//----Gameover function for when the game ends----

var gameOver = function(){
    var mainBody = document.querySelector("body")
    mainBody.innerHTML="";
    var gameEnd = document.createElement("div");
    gameEnd.classList.add("gameEnd");
    mainBody.appendChild(gameEnd)
    document.querySelector(".gameEnd").innerHTML = "<h1>GAME OVER</h1> </br> WOULD YOU LIKE TO START AGAIN?" + " </br><div class='gameOver'>Restart</div>" + "</br>" + "YOUR POINTS IS: " + points;
}

setTimeout(gameOver,155000)


//----Generating Random Color Donuts----
// //for future use
// var randomColors = function(){
//     var randomColorDonuts = ["brown","blue","red","yellow","green","purple","pink"];
//     var i = Math.round(Math.random()*7);
//     return "<img src='images/donuts/"+randomColorDonuts[i]+"/"+randomColorDonuts[i]+"_donut_"+Math.round(1+Math.random()*9)+".png'>"
// };