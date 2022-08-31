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

