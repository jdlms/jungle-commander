//game item declarations
let player = [];

let playerShells = [];
let enemies = [];
let enemyShells = [];
let TankX;
let TankY;
let SPACE_BAR = 32;
let imgExplosion;
let imgPlayer;
let enemyImages;
let enemyImg;
let count = 0;
let toggle = 0;
let startingText = "splat the fruit!";
let startingTextY = 400;
let BlackOpsOneFont;
let explosions = [];

//clock declarations
const clock = new Clock();
let minDec = document.getElementById("minDec");
let minUni = document.getElementById("minUni");
let secDec = document.getElementById("secDec");
let secUni = document.getElementById("secUni");

//sound declarations
let soundtrack;
let splatSound;
let gameEndSound;

//p5 preload\\
function preload() {
  BlackOpsOneFont = loadFont("font/BlackOpsOne.ttf");
  soundFormats("mp3");
  soundtrack = createAudio("sounds/background_music.mp3");
  splatSound = createAudio("sounds/splat.mp3");
  gameEndSound = createAudio("sounds//game-end.mp3");
  imgExplosion = loadImage("images/explosion.png");
  imgPlayer = loadImage("images/player-tank.png");
  enemyImages = [
    "images/mango.png",
    "images/pineapple.png",
    "images/watermelon.png",
  ].map((source) => loadImage(source));
}

//p5 setup\\
function setup() {
  const canvas = createCanvas(400, 600);
  canvas.parent("game-screen");
  frameRate(30);
  speed = 2.5;
  noLoop();
}

function scrollingText() {
  textSize(40);
  textFont(BlackOpsOneFont);
  textAlign(CENTER, CENTER);
  fill("rgb(255,288,196)");
  text(startingText, 200, startingTextY);
  startingTextY = startingTextY - 8;
}

function playerTank() {
  player.push({
    x: 180,
    y: 500,
    w: 65,
    h: 65,
  });
}

function drawPlayer(player) {
  image(imgPlayer, player.x, player.y, player.w, player.h);
}

//PLAYER\\
function movement(player) {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += speed;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    playerShells.push({
      x: 50 / 2 + player[0].x,
      y: 50 / 2 + player[0].y,
      w: 7,
      h: 12,
    });
  }
}

function drawPlayerShell(shell) {
  noStroke();
  fill("rgb(255, 51,51)");
  rect(shell.x, shell.y, shell.w, shell.h);
  shell.y -= 3 * speed;
}
