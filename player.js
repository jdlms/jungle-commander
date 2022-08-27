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

function movement(player) {
  if (player.x > 420) {
    player.x = -50;
  }
  if (player.x < -50) {
    player.x = 400;
  }
  if (player.y >= 554) {
    player.y = 554;
  }

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
  fill("red");
  rect(shell.x, shell.y, shell.w, shell.h);
  shell.y -= 3 * speed;
}
