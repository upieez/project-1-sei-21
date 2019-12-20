console.log("Donut game project!")

//----Global Variable----
var count = 0;


//----Input Donut Function to Donut Box ----
var addDonut = function () {
//If statement to only add donuts if it's less than 6
    if (count < 6){
        count++;
        var donutBox = document.querySelector(".donut-takeaway");
        var div = document.createElement("div");
        div.classList.add("donut");
        div.innerHTML = "DONUT PLACEMENT";
        donutBox.appendChild(div);
    }
}

var addDonutToContainer = function(){
var clicker = document.querySelector('.donut-clicker > .donut')
clicker.addEventListener("click", addDonut);
};

addDonutToContainer();

//----Check for correct amount of donut in donut box from donut array----

var checkForCorrectAmt = function(){

var donutBox = document.querySelector(".donut-takeaway").innerText;
var donutArray = document.querySelector(".donut-array").innerText;
var checkDonutArray = donutArray.split("\n");
var checkDonutBox = donutBox.split("\n");
//----If statement to check the correct amount in box----
 if (checkDonutArray.length === checkDonutBox.length){
    alert("correct!");
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