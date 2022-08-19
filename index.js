let playerShells = [];
let enemies = [];
let enemyShells = [];
let TankX = 180;
let TankY = 500;
let SPACE_BAR = 32;

let shellX = 50 / 2 + TankX;
let shellY = 50 / 2 + TankY;

function setup() {
  createCanvas(400, 600);
  speed = 3;
  translatedX = 100;
  setInterval(() => {
    spawnEnemies(4);
  }, 3000);
  setInterval(() => {
    enemyFire(6);
  }, 1000);
  loop();
}

function playerTank() {
  fill("rgb(135, 62, 35)");
  noStroke();
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
  if (keyIsDown(32)) {
    playerShells.push({
      x: 50 / 2 + TankX,
      y: 50 / 2 + TankY,
      w: 10,
      h: 10,
    });
  }
}

// function playerFires() {
//   if (keyIsDown(32)) {
//     playerShells.push({
//       x: shellX,
//       y: shellY,
//       w: 10,
//       h: 20,
//     });
//   }
// }

function drawPlayerShell(shell) {
  fill("red");
  rect(shell.x, shell.y, shell.w, shell.h);
  shell.y -= speed;
}

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
    shells: [],
  });
}

function enemyFire(number) {
  enemies.forEach((enemy) => {
    enemy.shells.push({
      x: 45 / 2 + enemy.x,
      y: 45 / 2 + enemy.y,
    });
  });
}

function drawShell(shell) {
  fill("red");
  rect(shell.x, shell.y, 10, 20);
  shell.y += 2 * speed;
}

//p5 Draw function
function draw() {
  background("green");
  playerTank();

  playerShells.forEach((shell) => {
    drawPlayerShell(shell);
  });

  enemies = enemies.filter((enemy) => {
    drawEnemyTank(enemy);
    enemy.shells.forEach((shell) => {
      drawShell(shell);
      //how to filter out the enemy shells in this function?
    });
    if (enemy.y > height) {
      return false;
    }
    return true;
  });
}

// https://github.com/processing/p5.js/wiki/Positioning-your-canvas
