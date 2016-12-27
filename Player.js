// JavaScript File
/*global $*/
var canvas = document.getElementById("myCanvas");
//Height to which the player can jump
var jumpHeight = 240;
var birdFrame = 0;
var foo = 0;
var rising = false;
var falling = false;
var bar = 1;

function Player() {
    this.height = 130;
    this.width = 100;
    this.x = 50;
    this.y = 440;
    //Image used to draw the player
    this.Image = new Image();
    this.Image.src = 'Images/bird.png';
    //Variables used by world to draw the correct animated image;
    this.sourceX;
    this.sourceY = 2;
    this.sourceWidth = 176;
    this.sourceHeight = 175;
}

Player.prototype.moveLeft = function() {
    if (this.x > 0) {
        this.x -= 17;
        this.Image.src = 'Images/birdleft.png';
    }
}

Player.prototype.moveRight = function() {
    if (this.x < canvas.width - this.width) {
        this.x += 17;
        this.Image.src = 'Images/bird.png';
    }
}
Player.prototype.jump = function() {
    rising = true;
}

//Helper function updates the players image to be used by the world class to draw the player
Player.prototype.update = function() {
    this.sourceX = (birdFrame * 180) + 12;
    foo++;
    //Every other frame the bird flaps his wings a bit
    if (foo % 2 == 0) {
        birdFrame += bar;
        if (birdFrame == 4) {
            bar = -1;
        }
        else if (birdFrame == 0) {
            bar = 1;
        }
    }
    //Handles the bird if he is jumping 
    if (rising) {
        this.y -= 20;
    }
    if (rising && this.y == jumpHeight) {
        rising = false;
        falling = true;
    }
    if (falling) {
        this.y += 20;
    }
    if (falling && this.y == 440) {
        falling = false;
    }
}
