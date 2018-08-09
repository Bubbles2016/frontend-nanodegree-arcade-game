'use strict';

// Enemies our player must avoid
var Enemy = function(x, y, speed, name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 99;
    this.height = 77;
    this.speed = speed;
    this.name = name;
    return this
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (pause) {
        return
    }
    //TODO: multiply the speed by dt
    this.x = this.x + this.speed * dt;
    if(this.x > 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 70;
    this.height = 94;
    this.health = 100;
    this.damaged = false;
}

Player.prototype.update = function(dt) {
    if (pause) {
        this.isTakingDamage = false;
        return
    }
    //You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    for(let i = 0; i < allEnemies.length; i++) {
        this.handleCollision(allEnemies[i]);
        if (this.damaged) {
            return;
        }
    }
};

Player.prototype.handleCollision = function(enemy) {
    
    // This function detects if any of the player coordinates falls within the enemy's occupied space (sprite)
    function partialCollision(point, rect){
        var coordx = point.x;
        var coordy = point.y;
        var coordx1 = rect.x;
        var coordy1 = rect.y;
        var coordx2 = rect.x + rect.width;
        var coordy2 = rect.y + rect.height;
        
        return coordx1 <= coordx && coordx <= coordx2 && coordy1 <= coordy && coordy <= coordy2;
      
    }

    //This function detects if the player and the enemy collide.
    function totalCollision(rect1,rect2){
        // top left point
        var pointc1 = {'x': rect1.x, 'y': rect1.y};
        
        // top right point
        var pointc2 = {'x': rect1.x + rect1.width, 'y': rect1.y};
        
        // bottom left point
        var pointc3 = {'x': rect1.x , 'y': rect1.y + rect1.height};

        // bottom right point
        var pointc4 = {'x': rect1.x + rect1.width, 'y': rect1.y + rect1.height};
      
        return (partialCollision(pointc1, rect2) ||
        partialCollision(pointc2, rect2) ||
        partialCollision(pointc3, rect2) ||
        partialCollision(pointc4, rect2));
    }
    
    // if player and enemy collide, the player get damaged.
    let isGettingDamage = totalCollision(player, enemy) || totalCollision(enemy, player);
    if (isGettingDamage){
          this.sprite = 'images/char-cat-girl.png';
          this.damaged = true;
          this.health = -1;
          if (this.health < 0) {
              reset();
          }
          
    } else {
          this.sprite = 'images/char-cat-girl.png';
          this.damaged = false;
    }
      
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '30px monospace';
    ctx.fontStyle = 'rgb(24, 24, 104)';
    ctx.linewidth = 2;
    ctx.fillStyle = 'rgb(0, 0 ,0)';
    
    //when the player wins the game
    if (this.y === 50) {
        ctx.font = '50px monospace';
        ctx.fontStyle = 'rgb(24, 24, 104)';
        ctx.fillStyle = 'rgb(0, 0 ,0)';
        ctx.fillText('You won', 150, 250); // text written to screen. fillText function takes a string and x and y arguments
        pause = true;
        setTimeout( function(){
            pause = true;
            reset();}, 500);
    }

};

//This function will handle the player's keyboard input. The player will use the arrow keys along with the spacebar to play the game.
Player.prototype.handleInput = function(evt){
 if (pause) {
    switch(evt){
        case 'pause':
        pause = !pause;  //toggles between pause and resume
        break;
    default:
        return;
    }
 } else {
    switch(evt) {
        case 'up':
            this.y -= 50;
            break;
        case 'down':
             this.y += 50;
            break;
        case 'left':
            this.x -= 50;
            break;
        case 'right':
            this.x += 50;
            break;
        case 'pause':
            pause = !pause;  
            break;
        default:
            return;
    }
 }
    //The player is not allowed to move outside the canvas
    if (this.x > 480 || this.x < 0) {
        this.x = 200;
    }

    if (this.y > 500 || this.y < 0) {
        this.y = 400;
    }
};

// Now instantiate your objects. 
var enemyBug1 = new Enemy(0, 150, 100, 'Enemy1');
var enemyBug2 = new Enemy(0, 250, 150, 'Enemy2');
var enemyBug3 = new Enemy(0, 305, 75, 'Enemy3');

 
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyBug1, enemyBug2, enemyBug3];
var player = new Player();
let pause; 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        32: 'pause', //spacebar
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});