//game item declarations
let playerShells = [];
let enemies = [];
let enemyShells = [];
let TankX = 180;
let TankY = 500;
let SPACE_BAR = 32;
let imgExplosion;
let imgPlayer;
let enemyImages;
let enemyImg;

//clock declarations
const clock = new Clock();
let minDec = document.getElementById("minDec");
let minUni = document.getElementById("minUni");
let secDec = document.getElementById("secDec");
let secUni = document.getElementById("secUni");

//sound declarations
let soundtrack;
let splatSound;

function preload() {
  soundFormats("mp3");
  soundtrack = loadSound("sounds/background_music.mp3");
  splatSound = loadSound("sounds/splat.mp3");
  imgExplosion = loadImage("images/explosion.png");
  imgPlayer = loadImage("images/player-tank.png");
  enemyImages = ["images/mango.png", "images/pineapple.png"];
  let pos = floor(random(enemyImages.length));
  enemyImg = loadImage(enemyImages[pos]);
}

//p5 setup\\
function setup() {
  const canvas = createCanvas(400, 600);
  canvas.parent("game-screen");
  frameRate(30);
  speed = 2.5;
}

//PLAYER
function playerTank() {
  image(imgPlayer, TankX, TankY, 80, 80);

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
      w: 7,
      h: 12,
    });
  }
}

function drawPlayerShell(shell) {
  fill("red");
  rect(shell.x, shell.y, shell.w, shell.h);
  shell.y -= 3 * speed;
}

//ENEMIES
function drawEnemyTank(enemy) {
  // fill("black");
  // noStroke();
  // square(enemy.x, enemy.y, 45);
  // let randomEnemyImg = enemyImgArray[random(0, 2)];

  // enemyImages = ["images/mango.png", "images/pineapple.png"];
  // let pos = floor(random(enemyImages.length));
  // enemyImg = loadImage(enemyImages[pos]);

  image(enemyImg, enemy.x, enemy.y, 80, 80);

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
      w: 7,
      h: 12,
    });
  });
}

function drawShell(shell) {
  fill("red");
  rect(shell.x, shell.y, 7, 12);
  shell.y += 3 * speed;
}

//**p5 Draw function**\\
//                     \\
function draw() {
  let darkGreen = color("rgb(17, 40, 21)");
  background(darkGreen);
  playerTank();

  playerShells = playerShells.filter((shell) => {
    drawPlayerShell(shell);
    enemies.filter((enemy) => {
      const collision = collisionBetweenTwoRectangles(enemy, shell);

      if (collision) {
        image(imgExplosion, shell.x, shell.y, 80, 80);
        splatSound.play();
        // enemies.slice(hitEnemy);
        // console.log(enemies.findIndex());
        console.log(enemy);
        console.log(enemies);
      }
    });

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
      image(imgExplosion, TankX, TankY, 80, 80);
      setTimeout(() => {
        gameOver();
      }, 300);
    }
    enemy.shells.forEach((shell) => {
      const collision = collisionBetweenTwoRectangles(shell, {
        x: TankX,
        y: TankY,
        w: 50,
        h: 50,
      });

      if (collision) {
        image(imgExplosion, TankX, TankY, 80, 80);
        setTimeout(() => {
          gameOver();
        }, 300);
      }
      drawShell(shell);
    });
    if (enemy.y > height) {
      return false;
    }
    return true;
  });
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
  }, 2400);
  setInterval(() => {
    enemyFire(4);
  }, 1500);
  loop();
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

function collisionBetweenTwoRectangles(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  );
}
