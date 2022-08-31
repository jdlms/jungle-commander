function newExplosion(x, y, w, h) {
  explosions.push({
    x,
    y,
    w,
    h,
    ttl: 10,
  });
}

function drawExplosion(explosion) {
  image(imgExplosion, explosion.x, explosion.y, explosion.w, explosion.h);
  explosion.ttl--;
}
