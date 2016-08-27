class Connection {
  constructor() {
    socket.on('player move', data => {
      // TODO: find player by id, then move it
      console.log('player move', data)

      var impulseX = data.x || 0;
      var impulseY = data.y || 0;

      var walkForceMagnitude = 10;

      if (isMovingLeft) {
        impulseX -= walkForceMagnitude;
      }

      if (isMovingRight) {
        impulseX += walkForceMagnitude;
      }

      var jumpForceMagnitude = 10;

      if (isJumping) {
        impulseY -= jumpForceMagnitude;
      }

      playerLegs.positionImpulse.x = impulseX;
      playerLegs.positionImpulse.y = impulseY;
    });
  }

  emit(...args) {
    this.socket.emit(...args);
  }
}
