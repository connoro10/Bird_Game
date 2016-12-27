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
//All the elements that need to be loaded, will not be used by these variable names
var music = new Audio("Sounds/music.wav");
var loadBird = new Image();
loadBird.src = 'Images/bird.png';
var loadOtherBird = new Image();
loadOtherBird.src = 'Images/birdleft.png';
var loadDinoRight = new Image();
loadDinoRight.src = 'Images/Dinosaur_Trex.png';
var loadDinoLeft = new Image();
loadDinoLeft.src = 'Images/Trex_left.png';
var loadAsteroid1 = new Image();
loadAsteroid1.src = 'Images/asteroid1.png';
var loadAsteroid2 = new Image();
loadAsteroid2.src = 'Images/asteroid2.png';
var loadAsteroid3 = new Image();
loadAsteroid3.src = 'Images/asteroid3.png';
var loadAsteroid4 = new Image();
loadAsteroid4.src = 'Images/asteroid4.png';
var loadFlame0 = new Image();
loadFlame0.src = 'Images/flame0.png';
var loadFlame1 = new Image();
loadFlame1.src = 'Images/flame1.png';
var loadFlame2 = new Image();
loadFlame2.src = 'Images/flame2.png';
var loadFlame3 = new Image();
loadFlame3.src = 'Images/flame3.png';
var loadFlame4 = new Image();
loadFlame4.src = 'Images/flame4.png';
var loadFlame5 = new Image();
loadFlame5.src = 'Images/flame5.png';
//The world that will be manipulated and drawn
var world;
//Removes the splashscreen and begins the game
/*global $*/
$(document).ready(function() {
    $("#splashscreen").hide();
    $("#score").hide();
    $("#myCanvas").hide();
    $("#playAgain").hide();
});
$(window).on("load", function() {
        $("#loading").hide();
        $("#splashscreen").show();
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
