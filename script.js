console.log("Donut game project!")

//----Image Sources in a variable----
var plainDonut = "<img src='images/donuts/plain/plain_donut.png'>"

//----Global Variable----
var count = 0;


//----Input Donut Function to Donut Box ----
var addDonut = function() {
//If statement to only add donuts if it's less than 6
    if (count < 6){
        count++;
        var donutBox = document.querySelector(".donut-takeaway");
        var div = document.createElement("div");
        div.classList.add("donut");
        div.innerHTML = plainDonut;
        donutBox.appendChild(div);
    }
}

var addDonutToContainer = function(){
var clicker = document.querySelector(".donut-clicker > .donut")
clicker.addEventListener("click", addDonut);
};

addDonutToContainer();

//----Check for correct amount of donut in donut box from donut array----

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

//----