(function() {
  var game = window.g = new Game();

  var login = $('#login');

  var form = $('form', login);

  var name = $('#name', form);

  var alien = $('#alien', form);

  var dino = $('#dino', form);

  var fight = $('#fight', form);

  var race = 'alien';

  function tryLogin(race) {
    var url = form.attr('action');

    $.ajax({
      method: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        name: name.val(),
        race: race
      })
    }).done(loginSucceeded).fail(loginFailed);
  }

  alien.click(() => {
    race = 'alien';

    alien.addClass('selected');
    dino.removeClass('selected');

    return false;
  });

  dino.click(() => {
    race = 'dino';

    dino.addClass('selected');
    alien.removeClass('selected');

    return false;
  });

  fight.click(() => {
    tryLogin(race);

    return false;
  });

  function loginSucceeded(response) {
    game.player = JSON.parse(response);

    login.fadeOut(function() {
      game.run();
    });
  }

  function loginFailed() {
    // TODO: show to player
    console.log('LOGIN FAILED!!! :(');
  }


  function toggleFullScreen() {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      var canvasElement = document.getElementsByTagName('canvas')[0];
      if (canvasElement.mozRequestFullScreen) {
        canvasElement.mozRequestFullScreen();
      } else {
        canvasElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }

  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      toggleFullScreen();
    }
  }, false);
})();
