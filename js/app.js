// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    // function not needed right now
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed - 33.13;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 12.625;
    }
    if (keyPress == 'right') {
        player.x += player.speed - 33.13;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 12.625;
    }
    console.log('keyPress is: ' + keyPress);
};

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.x <= anEnemy.x + 50.5
        && player.y <= anEnemy.y + 88.375
        && player.x + 50.5 >= anEnemy.x
        && player.y + 12.625 >= anEnemy.y) {
        console.log('collided');
        player.x = 202;
        player.y = 404;
    }

    // check for player reaching top of canvas and winning the game
    if (player.y + 25.25 <= 0) {
        player.x = 202;
        player.y = 404;
        console.log('you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 404) {
        player.y = 404;
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

var player = new Player(202, 404, 50.5);

for(var i = 0; i < 2; i++) {
  var enemy = new Enemy(0, 67.5, Math.random() * 201 + 25);
  //Push any bug created into an array
  allEnemies.push(enemy);
};
for(var i = 0; i < 3; i++) {
  var enemy = new Enemy(0, 145, Math.random() * 201 + 25);
  //Push any bug created into an array
  allEnemies.push(enemy);
};
for(var i = 0; i < 2; i++) {
  var enemy = new Enemy(0, 232, Math.random() * 201 + 25);
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
