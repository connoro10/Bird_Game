// JavaScript File
/*global Player*/
/*global Image*/
/*global $*/
/*global jumpSound*/
/*global music*/
//The canvas upon which the game will be drawn
var canvas = document.getElementById("myCanvas");
//The context for this drawing canvas
var ctx = canvas.getContext("2d", {
  antialias: true
});
ctx.imageSmoothingEnabled = true;
//Contains all the asteroids within the game world
var asteroids = [];
//Contains all the eggs within the game world
var eggs = [];
var spawn;
//Keep track of player score
var score = 0;
var dinoFrame = 0;
var dinoMoving = false;
//The image used for the player
var playerImage = new Image();
playerImage.src = 'Images/tanner.png';
//Image used for tannerdactyl eggs
var eggImage = new Image();
eggImage.src = 'Images/egg.png';
var brokenEgg = new Image();
brokenEgg.src = 'Images/brokenegg.png';
var pointImage = new Image();
pointImage.src = 'Images/plus10.png';
var screech = new Audio("Sounds/screech.wav");
var success = new Audio("Sounds/success.wav");
var dinoSound = new Audio("Sounds/dino.wav");
dinoSound.volume = .5;
var asteroidSound = new Audio("Sounds/asteroid.wav");
var eggBreak = new Audio("Sounds/eggbreak.wav");
var dino;
//Represents the game world that holds all the different elements of the game.
//Eggs, asteroids, raptors, and the player.
function World() {
  this.player = new Player();
  this.gameOver = false;
  //Starts the timer to begin spawning eggs
  setTimeout(this.spawnEggs, 2000);
  //Starts timer to spawn a dino
  setTimeout(this.spawnDino, 10000);
  //Starts timer to begin spawning asteroids
  setTimeout(this.spawnAsteroid, 2500);
}
//Moves the player left
World.prototype.moveLeft = function() {
    if (!this.gameOver) {
      this.player.moveLeft();
    }
  }
  //Moves the player right
World.prototype.moveRight = function() {
  if (!this.gameOver) {
    this.player.moveRight();
  }
}
World.prototype.jump = function() {
  if (!this.gameOver && falling == false && rising == false) {
    this.player.jump();
  }
}
World.prototype.spawnEggs = function() {
  //Adds an egg at a random x location on the screen
  eggs.push(new Egg(Math.floor(Math.random() * (canvas.width - 50))));
  //Spawns a new egg in between .5 and 3 seconds
  setTimeout(World.prototype.spawnEggs, Math.floor((Math.random() * 3000) + 700));
}
World.prototype.spawnDino = function() {
  dinoSound.play();
  var randomDino = Math.floor(Math.random() * 10);
  dinoMoving = true;
  dino = new Dino(randomDino % 2);
}

World.prototype.spawnAsteroid = function() {
  //Adds a new asteroid to the world
  asteroids.push(new Egg(Math.floor(Math.random() * (canvas.width - 50))));
  //Begins to spawn more asteroids
  setTimeout(World.prototype.spawnAsteroid, Math.floor((Math.random() * 2000) + 500));

}
var everyOther = 0;
//Draws all objects in the world
World.prototype.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.player.update();
    //Draws the players death by shooting him into the abyss
    if (this.gameOver) {
      ctx.drawImage(this.player.Image, this.player.sourceX, this.player.sourceY, this.player.sourceWidth, this.player.sourceHeight, this.player.x, this.player.y -= 50, this.player.width, this.player.height);
      if (this.player.y < -150) {
        music.pause();
        $("#playAgain").show();
      }
    }
    //Draws the player
    else {
      ctx.drawImage(this.player.Image, this.player.sourceX, this.player.sourceY, this.player.sourceWidth, this.player.sourceHeight, this.player.x, this.player.y, this.player.width, this.player.height);
    }
    //Draws the dinosaur if there is one active
    if (dinoMoving) {
      this.drawDino();
    }
    //Draw all eggs
    this.drawEggs();
    //Draw all asteroids
    this.drawAsteroids();

    //Sets the score board
    $("#score").text("Score: " + score);
  }
  //Animate a dinosaur moving across the screen
World.prototype.dinoAnimation = function(frame) {
  ctx.drawImage(dino.dinoImage, frame * dino.imageWidth, dino.imageY, dino.imageWidth, dino.imageHeight, dino.x += dino.moveSpeed, dino.y, dino.width, dino.height);
}
World.prototype.detectCollision = function(thing) {
  //Check x coords
  if (thing.x + thing.width > this.player.x && thing.x < this.player.x + this.player.width) {
    //Check y coords
    if (!thing.caught && thing.y + thing.height > this.player.y && thing.y < this.player.y + this.player.height) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
World.prototype.detectDinoCollision = function(direction) {
    //Dino is coming from the right
    if (direction == 1) {
      //Check x coords
      if (this.player.x + this.player.width - 20 > dino.x && this.player.x + this.player.width < dino.x + dino.width -20) {
        if (this.player.y + this.player.height > dino.y + 20) {
          return true;
        }
        return false;
      }
      return false;
    }
    //Dino comes from the left
    else if (direction == 0) {
      if (this.player.x < dino.x + dino.width -20 && this.player.x > dino.x +20) {
        if (this.player.y + this.player.height > dino.y + 20) {
          return true;
        }
        return false;
      }
      return false;
    }
  }
  //Resets the world for a new game
World.prototype.reset = function() {
  this.player = new Player();
  this.gameOver = false;
  rising = false;
  falling = false;
  score = 0;
  $("#playAgain").hide();
}
World.prototype.drawDino = function() {
  this.dinoAnimation(dinoFrame % 3);
  if (everyOther % 2 == 0) {
    dinoFrame++;
  }
  everyOther++;
  if (this.detectDinoCollision(dino.direction)) {
    dinoSound.pause();
    success.pause();
    eggBreak.pause();
    screech.play();
    this.gameOver = true;

  }
  //Dino has completed his journey across the screen
  if (dino.x < -200 || dino.x > canvas.width + 200) {
    dinoMoving = false;
    dino = null;
    setTimeout(this.spawnDino, Math.floor(Math.random() * 10000) + 5000);
  }

}

//Draws all of the eggs and moves them downward
World.prototype.drawEggs = function() {
    for (var i = eggs.length - 1; i >= 0; i--) {
      var eggo = eggs[i];
      if (eggo.y > 525 || eggo.caught) {
        //A caught or broken eggs animation will be displayed for 20 frames
        if (eggo.flameFrame == 20) {
          eggs.splice(i, 1);
        }
        //Egg has hit the ground
        else if (!eggo.caught) {
          if (eggo.flameFrame == 0) {
            eggBreak.play();
          }
          ctx.drawImage(brokenEgg, eggo.x, eggo.y, eggo.height, eggo.width);
          eggo.flameFrame++;
        }
        //Egg was caught
        else {
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 4;
          ctx.strokeText("+ 10", eggo.x, eggo.y);
          ctx.font = "38px Impact";
          ctx.fillStyle = 'red';
          ctx.fillText("+ 10", eggo.x, eggo.y);

          eggo.flameFrame++;
        }
      }
      else {
        ctx.drawImage(eggImage, eggo.x, eggo.y, eggo.width, eggo.height);
        eggo.y += 12;
        //An egg has collided with tannerdactyl, points are added and egg is removed from world
        if (this.detectCollision(eggo)) {
          success.play();
          eggo.caught = true;
          score += 10;
        }
      }

    }
  }
  //Draws all of the asteroids and moves them downward
World.prototype.drawAsteroids = function() {
  for (var i = asteroids.length - 1; i >= 0; i--) {
    var ass = asteroids[i];
    var flame = new Image();
    flame.src = 'Images/flame' + (ass.flameFrame % 6) + '.png';
    ass.width = 75;
    ass.height = 75;
    //Asteroid is traveling down screen
    if (!ass.caught) {
      ctx.drawImage(flame, ass.x - 75, ass.y - 115, 225, 175);
      ctx.drawImage(ass.asteroidImage, ass.x, ass.y, ass.width, ass.height);
      ass.flameFrame++;
      ass.y += 12;
    }
    //Asteroid has reached the ground and will sit there for 20 frames
    else {
      ctx.drawImage(ass.asteroidImage, ass.x, ass.y, ass.width, ass.height);
      ass.flameFrame++;
    }
    //Asteroid has collided with tannerdactyl resulting in his death
    if (this.detectCollision(ass)) {
      asteroids.splice(i, 1);
      this.gameOver = true;
      screech.play();
    }
    //Asteroid has reached the ground and will soon disappear
    if (ass.y > 525 && !ass.caught) {
      ass.flameFrame = 0;
      ass.caught = true;
    }
    //Asteroid disappears
    if (ass.y > 525 && ass.flameFrame == 20) {
      asteroids.splice(i, 1);
    }
  }
}

//Helper class contains an egg
function Egg(location) {
  //Used to animate flame trail behind asteroids
  this.flameFrame = 0;
  //generates a random asteroid image used for an asteroid;
  this.asteroidImage = new Image();
  var num = Math.floor((Math.random() * 4) + 1);
  this.caught = false;
  this.asteroidImage.src = 'Images/asteroid' + num + '.png';
  this.x = location;
  this.y = 0;
  this.height = 50;
  this.width = 50;
}
//Helper class contains dinosaur information, will be either 1 or 0 depending on if this dino
//will start from the left or right hand side of the screen
function Dino(direction) {
  this.direction = direction;
  this.dinoImage = new Image();
  this.y = 485;
  this.imageY = 137;
  this.imageWidth = 267;
  this.imageHeight = 131;
  this.height = 100;
  this.width = 130;
  //Coming from the right
  if (direction == 1) {
    this.dinoImage.src = 'Images/Dinosaur_Trex.png';
    this.x = canvas.width;
    //Its x coordinate will add this every frame it is drawn
    this.moveSpeed = -12;
  }
  if (direction == 0) {
    this.imageY = 0;
    this.dinoImage.src = 'Images/Trex_left.png';
    this.x = -150;
    //Its x coordinate will add this every frame it is drawn
    this.moveSpeed = 12;
  }
}
