class Game {
  constructor() {
    this.isRunning = false;

    this.player = null;

    this.entities = {};

    const engine = this.engine = Matter.Engine.create();

    const world = this.world = engine.world;

    const render = this.render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: {
        // background: '/images/BackgroundMoodConcept1.png',
        showAngleIndicator: false,
        wireframes: false
      }
    });

    Matter.Events.on(render, 'afterRender', this.afterRender.bind(this));

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

  afterRender(e) {
    if (this.playAlienHitImpactAt) {
      alienHitImpactSprite.x = this.playAlienHitImpactAt.x;
      alienHitImpactSprite.y = this.playAlienHitImpactAt.y;

      alienHitImpactSprite.update();
      alienHitImpactSprite.render(this.render.context);

      if (alienHitImpactSprite.isDone()) {
        alienHitImpactSprite.frameIndex = 0;
        this.playAlienHitImpactAt = null;
      }
    }
  }
}
