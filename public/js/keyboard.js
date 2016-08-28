class Keyboard {
  constructor(game) {
    this.game = game;

    this.keys = {
      'left': 37,
      'right': 39,
      'a': 65,
      'd': 68,
      'space': 32
    };

    this.keysPressed = {};

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  isKeyPressed(key) {
    return this.keysPressed[key];
  }

  onKeyDown(e) {
    this.keysPressed[e.keyCode];

    const game = this.game;

    const player = game.player;

    const key = e.keyCode;

    if (key == this.keys.left || key == this.keys.a) {
      player.isMovingLeft = true;
    }

    if (key == this.keys.right || key == this.keys.d) {
      player.isMovingRight = true;
    }

    if (key == this.keys.space) {
      player.isJumping = true;
    }

    var impulseX = 0;
    var impulseY = 0;

    var walkForceMagnitude = 15; // TODO: come from player

    if (player.isMovingLeft) {
      impulseX -= walkForceMagnitude;
    }

    if (player.isMovingRight) {
      impulseX += walkForceMagnitude;
    }

    var jumpForceMagnitude = 10; // TODO: come from player

    if (player.isJumping) {
      impulseY -= jumpForceMagnitude;
    }

    if (game.net.socket.connected && (impulseX != 0 || impulseY != 0)) {
      game.net.socket.emit('move entity', {
        id: player.id,
        x: impulseX,
        y: impulseY
      });
    }
  }

  onKeyUp(e) {
    delete this.keysPressed[e.keyCode];

    const player = this.game.player;

    const key = e.keyCode;

    if (key == this.keys.left || key == this.keys.a) {
      player.isMovingLeft = false;
    }

    if (key == this.keys.right || key == this.keys.d) {
      player.isMovingRight = false;
    }

    if (key == this.keys.space) {
      player.isJumping = false;
    }
  }
}
