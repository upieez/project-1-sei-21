console.log("Donut game project!")

//----Global Variable----
var count = 0;


//----Add Donut Function ----
var addDonut = function () {
    if (count < 6){
        count++;
        var donutBox = document.querySelector(".donut-box");
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