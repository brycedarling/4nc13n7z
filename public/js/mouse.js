class MouseState {
  constructor(game) {
    this.game = game;

    this.x = null;
    this.y = null;
    this.isPressed = false;

    window.addEventListener('mousedown', e => {
      this.isPressed = true;
    });

    window.addEventListener('mouseup', e => {
      this.isPressed = false;
    });

    window.addEventListener('mousemove', e => {
      this.x = e.clientX;
      this.y = e.clientY;
    });
  }
}
