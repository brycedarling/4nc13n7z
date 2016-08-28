var game = new Game();

(function() {
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
    var playerId = JSON.parse(response).id;

    game.playerId = playerId;

    login.fadeOut(function() {
      game.run();
    });
  }

  function loginFailed() {
    console.log('LOGIN FAILED!!!');
  }

  // TODO: remove
  name.val('foo');
  tryLogin('alien');
})();
