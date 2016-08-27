var mouseX = null;
var mouseY = null;

window.addEventListener('mousemove', function(e) {
  if (!game.isRunning) return;

  mouseX = e.clientX;
  mouseY = e.clientY;

  mouseAttractionCounter = 0;
});
