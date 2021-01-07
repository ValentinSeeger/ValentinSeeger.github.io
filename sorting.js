
let speed = 10;
let delay = 0;
let sorted = false;
function genArray(arraySize){
    delay = 0;
    sorted = false;
    myArray = new Array;
    for(let i = 0; i < arraySize; i++){
        myArray.push(Math.floor((Math.random()*90)+10));
    }
    createbars(myArray);
}


function createbars(Array){
    removeObj();
    for(let i = 0; i < Array.length; i++){
        let bar = document.createElement("div");
        bar.setAttribute("class", "bar");
        if(Array.length < 50){
            bar.innerHTML = Array[i];
        }
        bar.style.width = (80/Array.length)+"%"
        bar.style.height = (Array[i]*2)+"px";
        if(sorted && Array[i] === myArray[i]){
        bar.style.backgroundColor = "greenyellow";
        }
        document.getElementById("wrapper").appendChild(bar);
    }
    
    
}

function removeObj(){
    let myObj = document.getElementsByClassName("bar");
    while(myObj.length !== 0){
        for (const iterator of myObj) {
        iterator.remove();
    }
    }
    
}
function changeSpeed(HTMLSpeed){
    speed = Number(HTMLSpeed);
}

//Sorts
{
function bubbleSort(){
    if(sorted === true){
        genArray(document.getElementById("slider").value);
    }
    document.getElementById("slider").disabled = true;
    document.getElementById("speed").disabled = true;
    sorted = true; 
    let counter = 1;
    let n = myArray.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (myArray[j] > myArray[j + 1]) {
 
            let temp = myArray[j];
            myArray[j] = myArray[j + 1];
            myArray[j + 1] = temp;
            counter++;
            swap(myArray);
                    
            }
        } 
    }
    setTimeout(function(){document.getElementById("slider").disabled = false;}, delay+speed);
    setTimeout(function(){document.getElementById("speed").disabled = false;}, delay+speed);
}

function insertionSort() {
    if(sorted === true){
        genArray(document.getElementById("slider").value);
    }
    document.getElementById("slider").disabled = true;
    document.getElementById("speed").disabled = true;
    sorted = true;
    let n = myArray.length;
        for (let i = 1; i < n; i++) {  
            let current = myArray[i];
            let j = i-1; 
            while ((j > -1) && (current < myArray[j])) {
                myArray[j+1] = myArray[j];
                j--;
                swap(myArray);
            }
            myArray[j+1] = current;
            swap(myArray);
        }
        setTimeout(function(){document.getElementById("slider").disabled = false;}, delay+speed);
        setTimeout(function(){document.getElementById("speed").disabled = false;}, delay+speed);
}

function selectionSort() { 
    if(sorted === true){
        genArray(document.getElementById("slider").value);
    }
    document.getElementById("slider").disabled = true;
    document.getElementById("speed").disabled = true;
    sorted = true;
    let n = myArray.length;   
    for(let i = 0; i < n; i++) {
        let min = i;
        for(let j = i+1; j < n; j++){
            if(myArray[j] < myArray[min]) {
                min=j; 
                swap(myArray); 
            }
         }
         if (min != i) {
             let tmp = myArray[i]; 
             myArray[i] = myArray[min];
             myArray[min] = tmp;    
             swap(myArray);  
        }
    }
    setTimeout(function(){document.getElementById("slider").disabled = false;}, delay+speed);
    setTimeout(function(){document.getElementById("speed").disabled = false;}, delay+speed);
}
}

function swap(toSortArray){
    let kekWArray = new Array;
    toSortArray.forEach(element => {
       kekWArray.push(element); 
    });
    
    setTimeout(function(){createbars(kekWArray)}, delay);
    delay = delay + speed;
}
