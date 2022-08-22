let playerShells = [];
let enemies = [];
let enemyShells = [];
let TankX = 180;
let TankY = 500;
let SPACE_BAR = 32;

let shellX = 50 / 2 + TankX;
let shellY = 50 / 2 + TankY;

function setup() {
  const canvas = createCanvas(400, 600);
  canvas.parent("game-screen");
  frameRate(30);
  speed = 2.5;
  translatedX = 100;
}

function playerTank() {
  fill("rgb(135, 62, 35)");
  noStroke();
  square(TankX, TankY, 50);
  square(TankX, TankY, 50);

  if (TankX > 420) {
    TankX = -50;
  }
  if (TankX < -50) {
    TankX = 400;
  }
  if (TankY >= 554) {
    TankY = 554;
  }
  if (keyIsDown(LEFT_ARROW)) {
    TankX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    TankX += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    TankY -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    TankY += speed;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    playerShells.push({
      x: 50 / 2 + TankX,
      y: 50 / 2 + TankY,
      w: 10,
      h: 20,
    });
  }
}

function drawPlayerShell(shell) {
  fill("red");
  rect(shell.x, shell.y, shell.w, shell.h);
  shell.y -= 3 * speed;
}

//enemies
function drawEnemyTank(enemy) {
  fill("black");
  noStroke();
  square(enemy.x, enemy.y, 45);

  enemy.y += speed;
}

function spawnEnemies(number) {
  enemies.push({
    x: random(0, width),
    y: 0,
    w: 45,
    h: 45,
    shells: [],
  });
}

function enemyFire(number) {
  enemies.forEach((enemy) => {
    enemy.shells.push({
      x: 45 / 2 + enemy.x,
      y: 45 / 2 + enemy.y,
      w: 10,
      h: 20,
    });
  });
}

function drawShell(shell) {
  fill("red");
  rect(shell.x, shell.y, 10, 20);
  shell.y += 3 * speed;
}

//p5 Draw function
function draw() {
  background("green");
  playerTank();

  //I have collision between enemy shell and player, now I need it between player shell and enemy

  playerShells.forEach((shell) => {
    drawPlayerShell(shell);
  });

  enemies = enemies.filter((enemy) => {
    drawEnemyTank(enemy);
    enemy.shells.forEach((shell) => {
      const collision = collisionBetweenTwoRectangles(shell, {
        x: TankX,
        y: TankY,
        w: 50,
        h: 50,
      });

      if (collision) {
        gameOver();
      }
      drawShell(shell);
      //how to filter out the enemy shells in this function?
    });
    if (enemy.y > height) {
      return false;
    }
    return true;
  });
}

function collisionBetweenTwoRectangles(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  );
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

function startGame() {
  document.getElementById("game-begin").classList.add("hidden");
  document.getElementById("game-screen").classList.toggle("hidden");
  setInterval(() => {
    spawnEnemies(6);
  }, 3000);
  setInterval(() => {
    enemyFire(4);
  }, 1500);
  loop();
}

// if (keyIsDown(27)) {
//   console.log("hi there");
//   document.getElementById("game-begin").classList.remove("hidden");
//   document.getElementById("game-screen").classList.toggle("hidden");
// }

function gameOver() {
  noLoop();
  console.log("hello");
}
// https://github.com/processing/p5.js/wiki/Positioning-your-canvas
