console.log("Donut game project!")

//----Image Sources in a variable----
var plainDonut = "<img src='images/donuts/plain/plain_donut.png'>"
var chocDonut = "<img src='images/donuts/brown/brown_donut_8.png'>"
var randomDonut = [plainDonut, chocDonut, plainDonut, plainDonut, chocDonut, chocDonut] //grabbing random donuts probably can store it in an object?


//----Global Variable----
var count = 0;

//----Generating Random Color Donuts----

var randomColors = function(){
    var randomColorDonuts = ["brown","blue","red","yellow","green","purple","pink"];
    var i = Math.round(Math.random()*7);
    return "<img src='images/donuts/"+randomColorDonuts[i]+"/"+randomColorDonuts[i]+"_donut_"+Math.round(1+Math.random()*9)+".png'>"
};

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
        } else {
            console.log("wrong type of donut!")
            document.querySelector(".donut-takeaway").innerHTML="";
            count = 0;
        }
    }
    clearDonut();
}

//If statement to check the correct amount in box
 if (donutArray.length === donutBox.length){
    checkForCorrectDonuts();
    console.log("correct amount!"); // I can create a function here to check if the donuts inside are all the same in the array
    // clearDonut();
    } else {
        console.log("wrong amount!");
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
    var randomNumber = Math.round(1 + Math.random() * 5)
    var donutObjective = document.querySelector(".donut-objective");
    var donutArray = document.createElement("div");
    donutArray.classList.add("donut-array");
        // for loop to print out random amount of donut into the donut array
        for (var i = 0; i < randomNumber; i++){
            var donut = document.querySelector(".donut-array");
            var donutDiv = document.createElement("div");
            donutDiv.classList.add("donut");
            donutDiv.innerHTML = randomColors();
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