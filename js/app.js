// Enemies our player must avoid
var Enemy = function(x, y, speed, w, h) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //starting x position of the enemy-bug
    this.x = x;

    //starting y position of the enemy-bug
    this.y = y;

    //speed of the enemy-bug
    this.speed = speed;

    //width and height
    this.w = w;
    this.h = h;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // If enemy goes across screen replace that bug in array with a new one of random speed.
    if (this.x >= 505) {
      var i = allEnemies.indexOf(this);
      var enemy = new Enemy(0, this.y, Math.random() * 201 + 25);
      //Push any bug created into an array
      allEnemies[i] = enemy;
    }

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctxs.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, speed, w, h) {
    //starting x position of the player
    this.x = x;

    //starting y position of the player
    this.y = y;

    //starting speed of the player
    this.speed = speed;

    //image of the player
    this.sprite = 'images/char-boy.png';

    //width and height of the player
    this.w = w;
    this.h = h;

    //starting score of the player
    this.score = 0;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctxs.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left') {
        player.x -= player.speed - 50.5;
    }
    if (keyCode == 'up') {
        player.y -= player.speed - 18;
    }
    if (keyCode == 'right') {
        player.x += player.speed - 50.5;
    }
    if (keyCode == 'down') {
        player.y += player.speed - 18;
    }
};

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
  if (player.x - 31 < anEnemy.x + 50.5 && player.x + 31 > anEnemy.x + 50.5 &&
		  player.y + 50 > anEnemy.y + 40 && player.y - 33 < anEnemy.y + 40) {
      // Return to start.
      player.x = 202;
      player.y = 407;
  } else if (player.x - 31 < anEnemy.x - 50.5 && player.x + 31 > anEnemy.x - 50.5 &&
		  player.y + 50 > anEnemy.y + 40 && player.y - 33 < anEnemy.y + 40) {
      // Return to start.
      player.x = 202;
      player.y = 407;
  } else if (player.x == anEnemy.x &&	player.y + 50 > anEnemy.y + 40 && player.y - 33 < anEnemy.y + 40) {
      // Return to start.
      player.x = 202;
      player.y = 407;
  }


    // check for player reaching top of canvas and winning the game
    if (player.y + 25.25 <= 0) {
        player.x = 202;
        player.y = 407;
        //reset score counter after 1000 i dont think anyone will play that long.
        if (player.score > 1000) {
            player.score = 0;
        }
        player.score++;
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
        ctx.fillText('Score:',0,50);
        ctx.fillText(player.score,95,50);
        ctxs.fillStyle = 'white';
        ctxs.fillRect(0, 0, 505, 171);
    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 407) {
        player.y = 407;
    }
    if (player.x > 404) {
        player.x = 404;
    }
    if (player.x < 0) {
        player.x = 0;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player(202, 407, 101, 62, 83);

for(var i = 0; i < 2; i++) {
  var enemy = new Enemy(202, 67.5, Math.random() * 201 + 25, 101, 80);
  //Push any bug created into an array
  allEnemies.push(enemy);
};
for(var i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
  var enemy = new Enemy(0, 145, Math.random() * 201 + 25, 101, 80);
  //Push any bug created into an array
  allEnemies.push(enemy);
};
for(var i = 0; i < 2; i++) {
  var enemy = new Enemy(0, 232, Math.random() * 201 + 25, 101, 80);
  //Push any bug created into an array
  allEnemies.push(enemy);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
