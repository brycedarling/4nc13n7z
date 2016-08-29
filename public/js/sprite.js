function Sprite(options) {
  this.isLoaded = false;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = null; // options.width;
  this.height = null; // options.height;
  this.image = new Image();
  this.image.src = options.image;
  this.image.addEventListener('load', e => {
    this.isLoaded = true;
    this.width = this.image.width;
    this.height = this.image.height;
  });
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = options.ticksPerFrame || 0;
  this.numberOfFrames = options.numberOfFrames || 1;
  this.loop = options.loop != 'undefined' ? options.loop : true;
}

Sprite.prototype.update = function() {
  if (!this.isLoaded) return;

  this.tickCount += 1;

  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;

    // If the current frame index is in range
    if (this.frameIndex < this.numberOfFrames - 1) {
      // Go to the next frame
      this.frameIndex += 1;
    } else if (this.loop) {
      this.frameIndex = 0;
    }
  }
};

Sprite.prototype.render = function(ctx) {
  if (!this.isLoaded) return;

  ctx.drawImage(
    this.image,
    this.frameIndex * this.width / this.numberOfFrames,
    0,
    this.width / this.numberOfFrames,
    this.height,
    this.x,
    this.y,
    this.width / this.numberOfFrames,
    this.height);
};

Sprite.prototype.isDone = function() {
  return this.frameIndex == this.numberOfFrames - 1;
};

// Alien Sprites

var alienWalkSprite = new Sprite({
  image: '/images/Sprite_AlienWalkClean1.png',
  numberOfFrames: 8,
  ticksPerFrame: 4,
  loop: true
});

var alienHitImpactSprite = new Sprite({
  image: '/images/AlienHitImpact_sheet1.png',
  numberOfFrames: 8,
  ticksPerFrame: 3,
  loop: false
});

var alienKillImpactSprite = new Sprite({
  image: '/images/AlienHitImpactKill_sheet1.png',
  numberOfFrames: 8,
  ticksPerFrame: 3,
  loop: false
});

// Dino Sprites

var dinoWalkSprite = new Sprite({
  image: '/images/Sprite_DinoWalkClean1.png',
  numberOfFrames: 8,
  ticksPerFrame: 4,
  loop: true
});

var dinoHitImpactSprite = new Sprite({
  image: '/images/HitImpact_sheet1.png',
  numberOfFrames: 6,
  ticksPerFrame: 3,
  loop: false
});

var dinoKillImpactSprite = new Sprite({
  image: '/images/HitImpactKill_sheet1.png',
  numberOfFrames: 6,
  ticksPerFrame: 3,
  loop: false
});

var DINO_COLOR = '#b7f082';
var DINO_ARM_COLOR = '#98e95c';

var ALIEN_COLOR = '#c1a3ff';
var ALIEN_ARM_COLOR = '#9785db';
