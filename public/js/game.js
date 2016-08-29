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
        background: '/images/Background_Dinomash800x600.png',
        showAngleIndicator: false,
        wireframes: false
      }
    });

    Matter.Events.on(render, 'beforeRender', this.beforeRender.bind(this));

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

  beforeRender(e) {}

  afterRender(e) {
    // for (var id in this.entities) {
    //   renderPlayerBody(this.render.context, this.entities[id]);
    // }

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

    if (this.playAlienKillImpactAt) {
      alienKillImpactSprite.x = this.playAlienKillImpactAt.x;
      alienKillImpactSprite.y = this.playAlienKillImpactAt.y;

      alienKillImpactSprite.update();
      alienKillImpactSprite.render(this.render.context);

      if (alienKillImpactSprite.isDone()) {
        alienKillImpactSprite.frameIndex = 0;
        this.playAlienKillImpactAt = null;
      }
    }

    if (this.playDinoHitImpactAt) {
      dinoHitImpactSprite.x = this.playDinoHitImpactAt.x;
      dinoHitImpactSprite.y = this.playDinoHitImpactAt.y;

      dinoHitImpactSprite.update();
      dinoHitImpactSprite.render(this.render.context);

      if (dinoHitImpactSprite.isDone()) {
        dinoHitImpactSprite.frameIndex = 0;
        this.playDinoHitImpactAt = null;
      }
    }

    if (this.playDinoKillImpactAt) {
      dinoKillImpactSprite.x = this.playDinoKillImpactAt.x;
      dinoKillImpactSprite.y = this.playDinoKillImpactAt.y;

      dinoKillImpactSprite.update();
      dinoKillImpactSprite.render(this.render.context);

      if (dinoKillImpactSprite.isDone()) {
        dinoKillImpactSprite.frameIndex = 0;
        this.playDinoKillImpactAt = null;
      }
    }
  }
}
