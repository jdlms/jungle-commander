window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    soundtrack.loop();
    soundtrack.volume(0.1);
  };
};

function startGame() {
  document.getElementById("game-begin").classList.add("hidden");
  document.getElementById("game-screen").classList.toggle("hidden");

  toggle = 1;

  //start clock
  clock.start(printClock);

  setInterval(() => {
    spawnEnemies(9);
  }, 2000);
  setInterval(() => {
    enemyFire(4);
  }, 2100);
  loop();
}
