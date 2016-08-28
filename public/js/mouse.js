class MouseState {
  constructor(game) {
    this.game = game;

    this.x = null;
    this.y = null;
    this.attractionCounter = 0;

    window.addEventListener('mousemove', e => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.attractionCounter = 0;
    });
  }
}
