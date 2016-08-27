var keys = {
  'left': 37,
  'right': 39,
  'a': 65,
  'd': 68,
  'space': 32
};

window.addEventListener('keydown', function(e) {
  if (!game.isRunning || !game.player) return;

  var keyCode = e.keyCode;

  if (keyCode == keys.left || keyCode == keys.a) {
    game.player.isMovingLeft = true;
  }

  if (keyCode == keys.right || keyCode == keys.d) {
    game.player.isMovingRight = true;
  }

  if (keyCode == keys.space) {
    game.player.isJumping = true;
  }

  var impulseX = 0;
  var impulseY = 0;

  var walkForceMagnitude = 10;

  if (game.player.isMovingLeft) {
    impulseX -= walkForceMagnitude;
  }

  if (game.player.isMovingRight) {
    impulseX += walkForceMagnitude;
  }

  var jumpForceMagnitude = 10;

  if (game.player.isJumping) {
    impulseY -= jumpForceMagnitude;
  }

  if (game && game.socket && (impulseX != 0 || impulseY != 0)) {
    game.socket.emit('move entity', {
      id: 1, // TODO: fix to actual player entity id
      x: impulseX,
      y: impulseY
    });
  }
});

window.addEventListener('keyup', function(e) {
  if (!game.isRunning || !game.player) return;

  var keyCode = e.keyCode;

  if (keyCode == keys.left || keyCode == keys.a) {
    game.player.isMovingLeft = false;
  }

  if (keyCode == keys.right || keyCode == keys.d) {
    game.player.isMovingRight = false;
  }

  if (keyCode == keys.space) {
    game.player.isJumping = false;
  }
});
