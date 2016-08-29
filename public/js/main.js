(function() {
  var game = window.g = new Game();

  var login = $('#login');

  var form = $('form', login);

  var name = $('#name', form);

  var alien = $('#alien', form);

  var dino = $('#dino', form);

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
    tryLogin('alien');

    return false;
  });

  dino.click(() => {
    tryLogin('dino');

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
})();
