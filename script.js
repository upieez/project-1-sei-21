console.log("Donut game project!")

//----Image Sources in a variable----
var plainDonut = "<img src='images/donuts/plain/plain_donut.png'>"
var chocDonut = "<img src='images/donuts/brown/brown_donut_8.png'>"
var randomDonut = [plainDonut, chocDonut] //grabbing random donuts probably can store it in an object?


//----Global Variable----
var count = 0;


//----Input Donut Function to Donut Box ----

var addDonut = function(){
//If statement to only add donuts if it's less than 6
    if (count < 6){
        count++;
        var donutBox = document.querySelector(".donut-takeaway");
        var div = document.createElement("div");
        div.classList.add("donut");
        div.innerHTML = this.innerHTML;
        donutBox.appendChild(div);
    }
}

//addDonut function runs when click on donut image
var addDonutToContainer = function(){
var clicker = document.querySelectorAll(".donut-clicker > .donut")
for (var i = 0; i < 2; i++){
    clicker[i].addEventListener("click", addDonut);
    }
};

addDonutToContainer();

//----Check for Correct Amount Function----

var checkForCorrectAmt = function(){

var firstArray = document.querySelectorAll(".donut-objective > .donut-array")[0];
var donutArray = firstArray.querySelectorAll(".donut-array > .donut");
var donutBox = document.querySelectorAll(".donut-takeaway > .donut");

//If statement to check the correct amount in box
 if (donutArray.length === donutBox.length){
    alert("correct!"); // I can create a function here to check if the donuts inside are all the same in the array
    clearDonut();
    } else {
        alert("wrong!");
        document.querySelector(".donut-takeaway").innerHTML="";
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
    var randomNumber = Math.round(Math.random() * 6)
    var donutObjective = document.querySelector(".donut-objective");
    var donutArray = document.createElement("div");
    donutArray.classList.add("donut-array");
        // for loop to print out random amount of donut into the donut array
        for (var i = 0; i < randomNumber; i++){
            var donut = document.querySelector(".donut-array");
            var donutDiv = document.createElement("div");
            donutDiv.classList.add("donut");
            donutDiv.innerHTML = plainDonut;
            donutArray.appendChild(donutDiv);
            }
            donutObjective.appendChild(donutArray);
    }
}

setInterval(generateRandomDonutArray, 5000); //setInterval to keep adding more objective to the game

//----Clear the donut objective when correct----

var clearDonut = function(){
    var clear = document.querySelector(".donut-objective")
    clear.removeChild(document.querySelector(".donut-array"));
    document.querySelector(".donut-takeaway").innerHTML="";
    count = 0;
}