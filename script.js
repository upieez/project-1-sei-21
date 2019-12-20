console.log("Donut game project!")

//----Image Sources in a variable----
var plainDonut = "<img src='images/donuts/plain/plain_donut.png'>"
var chocDonut = "<img src='images/donuts/brown/brown_donut_8.png'>"


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
        div.innerHTML = chocDonut;
        donutBox.appendChild(div);
    }
}

var addDonutToContainer = function(){
var clicker = document.querySelector(".donut-clicker > .donut")
clicker.addEventListener("click", addDonut);
};

addDonutToContainer();

//----Check for Correct Amount Function----

var checkForCorrectAmt = function(){

var donutArray = document.querySelectorAll(".donut-array > .donut")
var donutBox = document.querySelectorAll(".donut-takeaway > .donut")

//----If statement to check the correct amount in box----
 if (donutArray.length === donutBox.length){
    alert("correct!"); // I can create a function here to check if the donuts inside are all the same
    } else {
        alert("wrong!");
    }
};

var buttonChecker = function(){
var selectButton = document.querySelector("button");
selectButton.addEventListener("click", checkForCorrectAmt);
};

buttonChecker();

//----Generate Random Donut Amount Function----

var generateRandomArray = function(){
    var randomNumber = Math.round(2 + Math.random() * 1) // only till 3 atm
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

generateRandomArray();