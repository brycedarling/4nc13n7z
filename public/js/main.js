var game = new Game();

(function() {
  var login = $('#login');

  var form = $('form', login);

  var name = $('#name', form);

  var alien = $('#alien', form);

  var dino = $('#dino', form);

  function tryLogin(race) {
    var url = form.attr('action');

    $.post(url, {
      name: name.val(),
      race: race
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

  function loginSucceeded() {
    console.log("LOAD GAME!!!!");

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
