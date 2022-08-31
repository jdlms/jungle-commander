function draw() {
  let darkGreen = color("rgb(17, 40, 21)");
  background(darkGreen);

  if (toggle == 1) {
    scrollingText();
  }

  explosions = explosions.filter((explosion) => {
    drawExplosion(explosion);
    return explosion.ttl > 0;
  });

  player = player.filter((player) => {
    drawPlayer(player);
    movement(player);
    return true;
  });

  playerShells = playerShells.filter((shell) => {
    drawPlayerShell(shell);
    for (let enemy of enemies) {
      const collision = collisionBetweenTwoRectangles(enemy, shell);

      if (collision) {
        newExplosion(enemy.x, enemy.y, 65, 65);
        splatSound.play();
        splatSound.volume(0.3);
        let hitEnemy = enemies.indexOf(enemy);
        enemies.splice(hitEnemy, 1);
        count++;
        return false;
      }
    }

    if (shell.y <= -1) {
      return false;
    }
    return true;
  });

  enemies = enemies.filter((enemy) => {
    drawEnemyTank(enemy);
    const collision = collisionBetweenTwoRectangles(enemy, player[0]);

    enemy.shells.forEach((shell) => {
      const collision = collisionBetweenTwoRectangles(shell, player[0]);

      if (collision) {
        image(imgExplosion, player[0].x, player[0].y, 80, 80);
        gameOver();
        gameEndSound.play();
        gameEndSound.volume(0.2);
      }
      drawShell(shell);
    });

    if (collision) {
      newExplosion(enemy.x, enemy.y, 80, 80);
      splatSound.play();
      splatSound.volume(0.3);
      return false;
    }
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
