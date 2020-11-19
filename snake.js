
let size = 17;
let delay;
let counter = 1;
let snake;
let maxSize;
let direction = "left"
let score = 1;
let apple;
let length = 0;
let prevDir = "right";
let temp = [];
let opDirection = "right";
let intva;

function validGrid(){
    size = Number(document.getElementById("gridSize").value);
    if(size < 9 || size > 29){
        document.getElementById("gridSize").value = "Out of range";
        setTimeout(function(){document.getElementById("gridSize").value = 17},1000)
        size = 17;
    }
    else{
        maxSize = size * size;
        snake = [Math.round((size * size) / 2)];
    } 
    
    start();
}

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
        if (i === 0 && color != "white") {
            document.getElementById("td" + snake[i]).style.backgroundColor = "blue";
        }
        else {
            document.getElementById("td" + snake[i]).style.backgroundColor = color;
        }
    }
}

function start() {
    reset();
    document.getElementById("solidWalls").disabled = true;
    document.getElementById("gridSize").disabled = true;
    document.getElementById("start").style.display = "none";
    
    drawSnake("black");
    countdown();
    DrawApple();
}
function countdown() {
    setTimeout(function () { document.getElementById("gameState").innerHTML = "3" }, 1000)
    setTimeout(function () { document.getElementById("gameState").innerHTML = "2" }, 2000)
    setTimeout(function () { document.getElementById("gameState").innerHTML = "1" }, 3000)
    setTimeout(function () { document.getElementById("gameState").innerHTML = "GO" }, 4000)
    setTimeout(function () { document.getElementById("gameState").innerHTML = "" }, 5000)
    setTimeout(function () { document.addEventListener("keydown", keyDownEvent) }, 4000);
    setTimeout(function () { intva = setInterval(reposition, 100) }, 4000);
}

function reposition() {
    drawSnake("white");
    let temp = [];

    switch (direction) {

        case "up":
            opDirection = "down";
            for (let j = 0; j < length; j++) { temp.push(snake[j]) }
            snake[0] = snake[0] - size;
            if (snake[0] <= 0) {
                snake[0] = maxSize + snake[0];
                if(solidWalls.checked == true){
                    gameOver();
                }
            }
            for (let i = 1; i <= length; i++) {
                snake[i] = temp[i - 1];
            }

            break;

        case "right":
            opDirection = "left";
            for (let j = 0; j < length; j++) { temp.push(snake[j]) }

            snake[0] = snake[0] + 1;
            if (snake[0] % size === 1) {
                snake[0] = snake[0] - size;
                if(solidWalls.checked == true){
                    gameOver();
                }
            }
            if (length != 0) {
                for (let i = 1; i <= length; i++) {
                    snake[i] = temp[i - 1]
                }

            }
            break;

        case "down":
            opDirection = "up";
            for (let j = 0; j < length; j++) { temp.push(snake[j]) }
            snake[0] = snake[0] + size;
            if (snake[0] > maxSize) {
                snake[0] = snake[0] - maxSize;
                if(solidWalls.checked == true){
                    gameOver();
                }
            }
            for (let i = 1; i <= length; i++) {
                snake[i] = temp[i - 1]
            }

            break;

        case "left":
            opDirection = "right";
            for (let j = 0; j < length; j++) { temp.push(snake[j]) }
            snake[0] = snake[0] - 1;
            if (snake[0] % size === 0) {
                snake[0] = snake[0] + size;
                if(solidWalls.checked == true){
                    gameOver();
                }
            }
            if (length != 0) {
                for (let i = 1; i <= length; i++) {
                    snake[i] = temp[i - 1]
                }
            }

            break;
    }

    prevDir = direction;

    collision();
    drawSnake("black");
    if (snake[0] === apple) {
        document.getElementById("score").innerHTML = "Score: " + (score++);
        addSnake();
    }

}

function keyDownEvent(e) {

    switch (e.keyCode) {
        case 87:
            if (prevDir != "down") {
                direction = "up"
            }
            break;
        case 65:
            if (prevDir != "right") {
                direction = "left"
            }
            break;
        case 83:
            if (prevDir != "up") {
                direction = "down"
            }
            break;
        case 68:
            if (prevDir != "left") {
                direction = "right"
            }
            break;
    }
}
function DrawApple() {
    apple = Math.floor((Math.random() * maxSize) + 1);
    for (let i = 0; i <= length; i++) {
        if (apple != snake[i]) {
            document.getElementById("td" + apple).style.backgroundColor = "red"
        }
        else {
            DrawApple()
        }
    }
}

function addSnake() {
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


function collision() {
    for (let o = 4; o <= length; o++) {
        if (snake[0] === snake[o]) {
           gameOver(); 
        }
    }
}
function gameOver(){
        document.getElementById("gameState").innerHTML = "GAME OVER"
        document.removeEventListener("keydown", keyDownEvent);
        document.getElementById("solidWalls").disabled = false;
        document.getElementById("gridSize").disabled = false;
        clearInterval(intva);
        setTimeout(function () { document.getElementById("gameState").innerHTML = "", 3000 });
        setTimeout(function () { document.getElementById("start").style.display = "block", 3000 });

}
function reset() {

    counter = 1;
    direction = "left"
    prevDir = "right";
    opDirection = "right";
    length = 0;
    score = 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    apple = 0;
    for (let i = 1; i < snake.length; i++) {
        snake.pop();
        snake[0] = Math.round((size * size) / 2);
    }
    drawGrid();

}