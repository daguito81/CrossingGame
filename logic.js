console.log("Sanity Check");
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const screenWidth = 800;
const screenHeight = 500;
canvas.width = screenWidth;
canvas.height = screenHeight;

let testArea = document.getElementById('testing')

class GameCharacter {
    constructor(x, y, width, height, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.maxSpeed = 4;

    }
    moveH(){
        this.x += this.speed;
    }
    moveV(){
        this.y += this.speed;
    }
}
let player = new GameCharacter(10, 225, 50, 50, "rgb(125, 125, 125)", 0)
let enemies = [
    new GameCharacter(
        150, 250, 50, 50, "rgb(0, 0, 255)", 3
    ),
    new GameCharacter(
        400, 400, 50, 50, "rgb(0, 255, 0)", 6
    ),
    new GameCharacter(
        650, 50, 50, 50, "rgb(0, 0, 0)", 9
    )
]

function clearScreen() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
}

function drawEntity(element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
}

// Player Movement
document.onkeydown = function(event){
    if (event.code === "ArrowRight"){
        player.speed = player.maxSpeed;
    } else if (event.code === "ArrowLeft") {
        player.speed = -player.maxSpeed;
    } else {
        player.speed = 0;
    }
    testArea.innerHTML = event.code;
}

document.onkeyup = function(event){
    player.speed = 0;
}

function draw() {
    clearScreen()
    enemies.forEach(drawEntity)
    drawEntity(player)
}

function update() {
    enemies.forEach(function(element){
        if (element.y <= 10 || element.y >= screenHeight - element.height - 10){
            element.speed = -element.speed
        }
        element.moveV();
    })
    player.moveH();
    
}


// Main game loop
function step() {
    update();
    draw();


    // Do everything before window.requestAnimationFrame
    window.requestAnimationFrame(step);
}

console.log("Game Loop starts")
step();

