//game item declarations
let playerShells = [];
let enemies = [];
let enemyShells = [];
let TankX = 180;
let TankY = 500;
let SPACE_BAR = 32;

// let shellX = 50 / 2 + TankX;
// let shellY = 50 / 2 + TankY;

//clock declarations
const clock = new Clock();
let minDec = document.getElementById("minDec");
let minUni = document.getElementById("minUni");
let secDec = document.getElementById("secDec");
let secUni = document.getElementById("secUni");

//sound declarations
let soundtrack;

function preload() {
  soundFormats("mp3");
  soundtrack = loadSound("background_music.mp3");
}

//p5 setup
function setup() {
  const canvas = createCanvas(400, 600);
  // canvas.mousePressed(canvasPressed);
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

function drawPlayerExplosion() {}

//enemies
function drawEnemyTank(enemy) {
  fill("black");
  noStroke();
  square(enemy.x, enemy.y, 45);

  enemy.y += speed;
}

function spawnEnemies(number) {
  enemies.push({
    x: random(0, 350),
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

  playerShells = playerShells.filter((shell) => {
    drawPlayerShell(shell);
    console.log(shell);
    if (shell.y <= -1) {
      return false;
    }
    return true;
  });

  enemies = enemies.filter((enemy) => {
    drawEnemyTank(enemy);
    const collision = collisionBetweenTwoRectangles(enemy, {
      x: TankX,
      y: TankY,
      w: 50,
      h: 50,
    });

    if (collision) {
      gameOver();
    }
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
    soundtrack.loop();
  };
};

function startGame() {
  document.getElementById("game-begin").classList.add("hidden");
  document.getElementById("game-screen").classList.toggle("hidden");

  //start clock
  clock.start(printClock);

  setInterval(() => {
    spawnEnemies(6);
  }, 3000);
  setInterval(() => {
    enemyFire(4);
  }, 1500);
  loop();
}

function printClock() {
  printMinutes();
  printSeconds();
}

function printMinutes() {
  minUni.innerHTML = clock.computeTwoDigitNumber(clock.getMinutes())[1];
  minDec.innerHTML = clock.computeTwoDigitNumber(clock.getMinutes())[0];
}

function printSeconds() {
  secUni.innerHTML = clock.computeTwoDigitNumber(clock.getSeconds())[1];
  secDec.innerHTML = clock.computeTwoDigitNumber(clock.getSeconds())[0];
}

function gameOver() {
  background("red");
  //why is this not turning all blocks red, just the first one?
  noLoop();
  clock.stop();
  setTimeout(() => {
    soundtrack.stop();
    document.getElementById("game-screen").classList.toggle("hidden");
    document.getElementById("gameover").classList.toggle("hidden");
    let displayClock = document.getElementById("gameover");
    displayClock.innerHTML = clock.split();
  }, 1000);
}
// https://github.com/processing/p5.js/wiki/Positioning-your-canvas
