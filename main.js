
let size = 17;
let delay;
let counter = 1;
let snake = [Math.round((size * size) / 2)];
let maxSize = size * size;
let direction = "left"
let score = 1;
let apple;
let length = 0;
let prevDir = "right";
let temp = [];
let opDirection = "right";

function drawGrid() {
    document.getElementById("grid").innerHTML = "";

    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        row.setAttribute("id", "tr" + i)
        for (var x = 0; x < size; x++) {

            var cell = document.createElement("td");
            cell.setAttribute("id", "td" + counter);
            row.appendChild(cell);
            counter++;
        }

        document.getElementById("grid").appendChild(row);
    }

}

function drawSnake(color) {
    for (let i = 0; i <= length; i++) {
        if(i === 0 && color != "white"){
        document.getElementById("td" + snake[i]).style.backgroundColor = "blue";
        }
        else{
        document.getElementById("td" + snake[i]).style.backgroundColor = color;
        }
    }
}

function start() {
    reset();  
    document.getElementById("start").style.display="none"
    drawSnake("black");
    countdown();
    DrawApple();
}
function countdown(){
    setTimeout(function(){document.getElementById("gameState").innerHTML="3"} , 1000)
    setTimeout(function(){document.getElementById("gameState").innerHTML="2"} , 2000)
    setTimeout(function(){document.getElementById("gameState").innerHTML="1"} , 3000)
    setTimeout(function(){document.getElementById("gameState").innerHTML="GO"} , 4000)
    setTimeout(function(){document.getElementById("gameState").innerHTML="" }, 5000)
    setTimeout(function(){document.addEventListener("keydown", keyDownEvent)}, 4000);
}

function reposition() {
    drawSnake("white");
    let temp = [];
    switch (direction) {

        case "up":
            opDirection="down";
            if (length === 0 || prevDir != "down") {
                for (let j = 0; j < length; j++) { temp.push(snake[j]) }
                snake[0] = snake[0] - size;
                if (snake[0] <= 0) {
                    snake[0] = maxSize + snake[0];
                }
                for (let i = 1; i <= length; i++) {
                    snake[i] = temp[i - 1];
                }
            }
            break;

        case "right":
            opDirection="left";
            if (length === 0 || prevDir != "left") {
                for (let j = 0; j < length; j++) { temp.push(snake[j]) }

                snake[0] = snake[0] + 1;
                if (snake[0] % size === 1) {
                    snake[0] = snake[0] - size;
                }
                if (length != 0) {
                    for (let i = 1; i <= length; i++) {
                        snake[i] = temp[i - 1]
                    }
                }
            }
            break;

        case "down":
            opDirection="up";
            if (length === 0 || prevDir != "up") {
                for (let j = 0; j < length; j++) { temp.push(snake[j]) }
                snake[0] = snake[0] + size;
                if (snake[0] > maxSize) {
                    snake[0] = snake[0] - maxSize;
                }
                for (let i = 1; i <= length; i++) {
                    snake[i] = temp[i - 1]
                }
            }
            break;

        case "left":
            opDirection="right";
            if (length === 0 || prevDir != "right") {
                for (let j = 0; j < length; j++) { temp.push(snake[j]) }
                snake[0] = snake[0] - 1;
                if (snake[0] % size === 0) {
                    snake[0] = snake[0] + size;
                }
                if (length != 0) {
                    for (let i = 1; i <= length; i++) {
                        snake[i] = temp[i - 1]
                    }
                }
            }
            break;

    }
    if(prevDir != opDirection){
    prevDir = direction;
    }
    collision();
    drawSnake("black");
    if (snake[0] === apple) {
        document.getElementById("score").innerHTML ="Score: "+score;
        addSnake();
    }

}

function keyDownEvent(e) {
    e=e
    switch (e.keyCode) {
        case 87:
            direction = "up"
            break;
        case 65:
            direction = "left"
            break;
        case 83:
            direction = "down"
            break;
        case 68:
            direction = "right"
            break;
    }
    setTimeout(reposition(), 500);
}
function DrawApple() {
    apple = Math.floor((Math.random() * maxSize) + 1);
    if (apple != snake[0]) {
        document.getElementById("td" + apple).style.backgroundColor = "red"
    }
    else {
        DrawApple()
    }
}

function addSnake() {
    score++;
    length++;
    switch (direction) {

        case "up":
            snake.push(snake[0]);
            break;

        case "down":
            snake.push(snake[0]);
            break;

        case "left":
            snake.push(snake[0] + 1);
            break;

        case "right":
            snake.push(snake[0] - 1);
            break;
        }
    DrawApple();
}


function collision(){
    for(let o = 4; o <= length; o++){
        if(snake[0] === snake[o]){
            document.getElementById("gameState").innerHTML="GAME OVER"
            document.removeEventListener("keydown" , keyDownEvent);
            setTimeout(function(){ document.getElementById("gameState").innerHTML="", 3000}); 
            setTimeout(function(){ document.getElementById("start").style.display="block", 3000});
        }
    }
}
function reset(){
    counter=1;
    direction = "left"
    prevDir = "right";
    opDirection = "right";
    length = 0;
    score = 1;
    document.getElementById("score").innerHTML="Score: "+score;
    apple = 0;
    for(let i = 1; i < snake.length; i++){
    snake.pop();
    snake[0] = Math.round((size * size) / 2); 
    }
    drawGrid();

}