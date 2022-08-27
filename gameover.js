function gameOver() {
  background("red");
  image(imgExplosion, player[0].x, player[0].y, 90, 90);
  noLoop();

  clock.stop();
  setTimeout(() => {
    soundtrack.stop();
    document.getElementById("game-screen").classList.toggle("hidden");
    document.getElementById("gameover").classList.toggle("hidden");
    let displayClock = document.getElementById("gameover");
    displayClock.innerHTML = clock.split();
  }, 1000);

  setTimeout(() => {
    document.location.reload();
    toggle = 0;
  }, 5000);
}
