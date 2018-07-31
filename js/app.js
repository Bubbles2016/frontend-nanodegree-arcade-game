//'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed, name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //this.width = 99;
    //this.height = 77;
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
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
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    //this.width = 70;
    //this.height = 94;
    this.health = 100;
    this.damaged = false;
};

Player.prototype.update = function(dt) {
    if (pause) {
        this.isTakingDamage = false;
        return
    }

    /*for(let i = 0; i < allEnemies.length; i += 1) {
        this.handleCollision(allEnemies[i]);
        if (this.damaged) {
            return;
        }
    } */   
};

/*Player.prototype.handleCollision = function(enemy) {
    function pointInRect(point, rect){
        var x = point.x;
        var y = point.y;
        var x1 = rect.x;
        var y1 = rect.y;
        var x2 = rect.x + rect.width;
        var y2 = rect.y + rect.height;
        
        return x1 <= x && x <= x2 && y1 <= y && y <= y2 ;
      
      }
    
      function rectOverlap(rect1,rect2){

        var c1 = {"x": rect1.x,               "y": rect1.y};      // top left
        var c2 = {"x": rect1.x + rect1.width, "y": rect1.y};      // top right
        var c3 = {"x": rect1.x ,              "y": rect1.y + rect1.height}; // bottom left
        var c4 = {"x": rect1.x + rect1.width, "y": rect1.y + rect1.height}; // bottom right
      
        return (pointInRect(c1, rect2) ||
        pointInRect(c2, rect2) ||
        pointInRect(c3, rect2) ||
        pointInRect(c4, rect2));
      }
      //if there is an overlap of player and enemy the player takes damage
      let isTakingDamage = rectOverlap(player, enemy) || rectOverlap(enemy, player); 
      if (isTakingDamage){
        //   console.log(enemy.name);
          this.sprite = 'images/char-cat-girl-damage.png';
          this.damaged = true;
          this.health -= 1;
        //   console.log(player.health);
          if (this.health < 0) {
            //   console.log("game over");
              reset();
          }
          
      } else {
          this.sprite = 'images/char-cat-girl.png';
          this.damaged = false;
      }
      
}*/

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput method recieves the event (e) detected by listener
Player.prototype.handleInput = function(e){
 if (pause) {
    switch(e){
        case "pause":
        pause = !pause;  //toggles between pause and resume
        console.log( (pause ? "pause" : "resume") );               
        break;
    default:
        return; // do nothing 
    }
 } else {
    switch(e) {
        case "up":
            this.y -= 50;
            break;
        case "down":
             this.y += 50;
            break;
        case "left":
            this.x -= 50;
            break;  
        case "right":
            this.x += 50;
            break;
        case "pause":
            pause = !pause;  //toggles between pause and resume
            console.log( (pause ? "pause" : "resume") );               
            break;
        default:
            return; // do nothing
    }
 }
    //prevents character from moving outside of gameboard
    if (this.x > 500 || this.x < 0) {
        this.x = 200;
    }

    if (this.y > 500 || this.y < 0) {
        this.y = 400;
    }

    //detects victory condition
    if (this.y === 50) {
        console.log("you reached the water");
    }
     
};

// Now instantiate your objects.
var enemyBug1 = new Enemy(0, 100, 100, "E1"); 
var enemyBug2 = new Enemy(0, 150, 150, "E2");
var enemyBug3 = new Enemy(0, 200, 75, "E3");

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyBug1, enemyBug2, enemyBug3];

// Place the player object in a variable called player
var player = new Player(100, 320); // global var
let pause;


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
