//ENEMIES\\
function drawEnemyTank(enemy) {
  image(enemy.img, enemy.x, enemy.y, 65, 65);
  enemy.y += speed;
}

function spawnEnemies(number) {
  enemies.push({
    x: random(0, 350),
    y: 0,
    w: 45,
    h: 50,
    shells: [],
    img: enemyImages[floor(random(enemyImages.length))],
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
