class Game {
  constructor() {
    this.isRunning = false;

    this.player = null;

    this.entities = {};

    const engine = this.engine = Matter.Engine.create();

    const world = this.world = engine.world;

    this.render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: {
        // background: '/images/BackgroundMoodConcept1.png',
        showAngleIndicator: false,
        wireframes: false
      }
    });

    this.keyboard = new Keyboard(this);

    this.mouse = new MouseState(this);

    this.physics = new Physics(this);

    this.level = new Level(this);

    this.net = new Net(this);
  }

  run() {
    this.isRunning = true;

    this.net.connect();

    Matter.Engine.run(this.engine);

    Matter.Render.run(this.render);
  }
}
