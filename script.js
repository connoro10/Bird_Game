// JavaScript File
/*global World*/
/*global Image*/
/*global playAgain*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//Booleans that detect whether a key is being pressed
var rightPressed = false;
var leftPressed = false;
var jump = 0;
var music = new Audio("Sounds/music.wav");
//The world that will be manipulated and drawn
var world;
//Removes the splashscreen and begins the game
/*global $*/
$(document).ready(function() {
    $("#score").hide();
    $("#myCanvas").hide();
    $("#playAgain").hide();
});
$("#start").click(function() {
    music.loop = true;
    music.play();
    world = new World();
    $("#splashscreen").hide();
    $("#start").hide();
    $("#myCanvas").show();
    $("#score").show();
    //work out some kinks...
    world.moveRight();
    //Frame timer which continually refreshes the game
    setInterval(draw, 30);
});
$("#playAgain").click(function() {
    world.reset();
    music.play();
});

//Clears the canvas and draws the world
function draw() {
    if (rightPressed) {
        world.moveRight();
    }
    if (leftPressed) {
        world.moveLeft();
    }
    world.draw();
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;

    }
    if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 32) {
        if (world.gameOver) {
            jumped = false;
        }
        else {
            world.jump();
        }
    }
}


function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    if (e.keyCode == 37) {
        leftPressed = false;
    }
}
