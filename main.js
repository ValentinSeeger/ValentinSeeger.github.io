
let size = 17;
let delay;
let counter = 1;
let snake = [Math.round((size*size)/2)];
let maxSize = size*size;
let direction = "left"
let score = 0;
let apple;
let length = 0;

function drawGrid()
{
	document.getElementById("grid").innerHTML = "";

	for(var i = 0; i < size; i++)
	{
		var row = document.createElement("tr");
        row.setAttribute("id", "tr"+i)   
		for(var x = 0; x < size; x++)
		{   
            
            var cell = document.createElement("td");
            cell.setAttribute("id", "td"+counter);
            row.appendChild(cell);
            counter++;
		}

		document.getElementById("grid").appendChild(row);
    }
    
}

function drawSnake(color)
{
for(let i = 0; i <= length; i++){
    document.getElementById("td"+snake[i]).style.backgroundColor = color;
}
}

function start()
{
	drawSnake("black");
	document.addEventListener("keydown", keyDownEvent);
    DrawApple();
}

function reposition()
{
drawSnake("white");

switch(direction){

case "up":
for(let i = 0; i <= length; i++){
snake[i] = snake[i]-size;
if(snake[i] <= 0){
snake[i] = maxSize + snake[i];
}
}
break;

case "right":
for(let i = 0; i <= length; i++){
snake[i] ++;
if(snake[i]%size === 1){
   snake[i]=snake[i]-size;
}
}
break;

case "down":
for(let i = 0; i <= length; i++){
snake[i] = snake[i]+size;
if(snake[i] > maxSize){
    snake[i] = snake[i] -maxSize;
}
}
break;

case "left":
for(let i = 0; i <= length; i++){
snake[i]--;
if(snake[i]%size === 0){
    snake[i]=snake[i]+size;
 }
}
break;

}
drawSnake("black");
if(snake[0] === apple){
    score++;
    length++
    document.getElementById("score").value=score;
    DrawApple();
    addSnake();
}

}

    function keyDownEvent(e) {
        switch (e.keyCode) {
        case 87:
          direction="up"
          break;
        case 65:
          direction="left"
          break;
        case 83:
          direction="down"
          break;
        case 68:
          direction="right"
          break;
        }
    setTimeout(reposition(), 500);
    }
function DrawApple(){
    apple = Math.floor((Math.random() * maxSize) + 1);
    if(apple != snake[0]){
        document.getElementById("td"+apple).style.backgroundColor="red"
    }
    else{
        DrawApple()
    }
}

function addSnake(){
    switch(direction){

        case "up":
            snake.push(snake[length-1]+size);
            if(snake[0] <= 0){
            snake.push(snake[length-1] - maxSize);
            }
            break;
            
        case "down":
            snake.push(snake[length-1]-size);
            if(snake <= 0){
            snake.push(maxSize + snake[length-1]);
            }
            break;
        
        case "left":
            snake.push(snake++);
            if(snake[length]%size === 1){
            snake.push(snake[length]-size);
            }
            break;

        case "right":
            snake.push(snake--);
            if(snake[length]%size === 0){
                snake.push(snake[length]+size);
             }
            break;
    }   
}