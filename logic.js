// Set up
// Get elements from Site
let canvas = document.getElementById("myCanvas");
let testArea = document.getElementById('testing')
let gameOutput = document.getElementById('output')
let resetButton = document.getElementById('resetButton')

// Create context for drawing (This creates the canvas
let ctx = canvas.getContext("2d");
const screenWidth = 800;
const screenHeight = 500;
canvas.width = screenWidth;
canvas.height = screenHeight;

// Game state
let Game = {
    on: true,
    win: false,
}

// Class to create a Game Character
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

    moveH() {
        this.x += this.speed;
    }

    moveV() {
        this.y += this.speed;
    }
}

// Creates instances for the player and several enemies
let player = new GameCharacter(10, 225, 50, 50, "rgb(125, 125, 125)", 0)
let goal = new GameCharacter(screenWidth - 50, 225, 50, 50, "rgb(255, 255, 255)", 0)
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
// Sprites
let sprites = {};

function loadSprites() {
    sprites.player = new Image();
    sprites.player.src = "images/hero.png";

    sprites.enemy = new Image();
    sprites.enemy.src = "images/enemy.png";

    sprites.goal = new Image();
    sprites.goal.src = "images/chest.png";

    sprites.background = new Image();
    sprites.background.src = "images/floor.png"
}

// This creates the player movement logic
// Right Arrow to go right, and left arrow to go left
document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowRight") {
        player.speed = player.maxSpeed;
    } else if (event.code === "ArrowLeft") {
        player.speed = -player.maxSpeed;
    } else {
        player.speed = 0;
    }
    testArea.innerHTML = event.code;
})

// This stops the player from moving when key is let go
document.onkeyup = function () {
    player.speed = 0;
}

// Collision detection function
function checkCollisions(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

// Canvas Drawing functions
function clearScreen() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
}

function drawEntity(element) {
    ctx.drawImage(element, element.x, element.y);
}

// This draws everything in the game canvas
function draw() {
    clearScreen()
    ctx.drawImage(sprites.background, 0, 0);
    ctx.drawImage(sprites.player, player.x, player.y);
    ctx.drawImage(sprites.goal, goal.x, goal.y)

    enemies.forEach(function(element){
        ctx.drawImage(sprites.enemy, element.x, element.y);
    })
}


// Checks if the game is ongoing and finished and whether you won or lost
function checkGameState() {
    let collision = checkCollisions(enemies[0], player) || checkCollisions(enemies[1], player) || checkCollisions(enemies[2], player)
    if (collision) {
        Game.win = false;
        Game.on = false;
        gameOutput.innerHTML = "Collision";
    }
    if (checkCollisions(player, goal)) {
        Game.on = false;
        Game.win = true;
    }
}

// Update function to change the state of the enemies and player
function update() {
    enemies.forEach(function (element) {
        if (element.y <= 10 || element.y >= screenHeight - element.height - 10) {
            element.speed = -element.speed
        }
        element.moveV();
    })
    player.moveH();
}

// Main game loop
function step() {
    checkGameState();
    update();
    draw();

    // Check game logic to proceed
    if (Game.on === true) {
        window.requestAnimationFrame(step);
    } else {
        if (Game.win === true) {
            gameOutput.innerHTML = "YOU WIN!"
        } else {
            gameOutput.innerHTML = "Game Over, You Lose!"
        }
    }

}

// This runs the game the first time
loadSprites();
step();

// This function is to reset the game state to the beginning
function resetGame() {
    if (Game.on !== true) {
        Game.on = true;
        Game.win = false;
        gameOutput.innerHTML = "New Game";
        player.x = 10
        player.y = 225
        step()
    }
}

// Reset Game when button is pressed
resetButton.addEventListener("click", resetGame)