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

var firstArray = document.querySelectorAll(".donut-objective > .donut-array")[0];
var donutArray = firstArray.querySelectorAll(".donut-array > .donut");
var donutBox = document.querySelectorAll(".donut-takeaway > .donut");

//----If statement to check the correct amount in box----
 if (donutArray.length === donutBox.length){
    alert("correct!"); // I can create a function here to check if the donuts inside are all the same in the array
    clearDonut();
    } else {
        alert("wrong!");
        document.querySelector(".donut-takeaway").innerHTML="";
        count = 0;
    }
};

var buttonChecker = function(){
var selectButton = document.querySelector("button");
selectButton.addEventListener("click", checkForCorrectAmt);
};

buttonChecker();

//----Generate Random Donut Amount Function----

var generateRandomDonut = function(){
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

setInterval(generateRandomDonut, 5000); //setInterval to keep adding more objective to the game

//Can set a counter to generate how many times you want. If counter goes beyond a certain number, stop generating i.e global variable

//----Clear the donut objective when correct----

var clearDonut = function(){
    var clear = document.querySelector(".donut-objective")
    clear.removeChild(document.querySelector(".donut-array"));
    document.querySelector(".donut-takeaway").innerHTML="";
    count = 0;
}