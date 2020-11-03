
let size = 17;
let delay;
let counter = 1;
let snake = [Math.round((size * size) / 2)];
let maxSize = size * size;
let direction = "left"
let score = 0;
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
    drawSnake("black");
    document.addEventListener("keydown", keyDownEvent);
    DrawApple();
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
        document.getElementById("score").value = score;
        addSnake();
    }

}

function keyDownEvent(e) {
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
            snake.push(snake[length - 1] + size);
            if (snake[0] <= 0) {
                snake.push(snake[length - 1] - maxSize);
            }
            break;

        case "down":
            snake.push(snake[length - 1] - size);
            if (snake <= 0) {
                snake.push(maxSize + snake[length - 1]);
            }
            break;

        case "left":
            snake.push(snake[length - 1] + 1);
            if (snake[length] % size === 1) {
                snake.push(snake[length] - size);
            }
            break;

        case "right":
            snake.push(snake[length - 1] - 1);
            if (snake[length] % size === 0) {
                snake.push(snake[length] + size);
            }
            break;
    }
    DrawApple();
}

function collision(){
    for(let o = 4; o <= length; o++){
        if(snake[0] === snake[o]){
            document.getElementById("gameState").value="game over";
        }
    }
}