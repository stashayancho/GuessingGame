function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}


Game.prototype.playersGuessSubmission = function(n) {
    if (n < 1 || n > 100 || isNaN(n)) {
      throw 'That is an invalid guess.'
    }

    this.playersGuess = n;

    return this.checkGuess();
}


Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
      $( '#title' ).text('You Win!');
      $( '#subtitle' ).text('Reset to play again');
      disable();
      return 'You Win!';

    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';

    } else {
      this.pastGuesses.push(this.playersGuess);
      console.log(this.pastGuesses.length);
      $( "ul li" ).eq(this.pastGuesses.length-1).text(this.playersGuess);
    };


    if (this.pastGuesses.length === 5) {
      $( '#title' ).text('You Lose.');
      $( '#subtitle' ).text('Reset to play again');
      disable();
      return 'You Lose.'
    };

    if (this.difference() < 10) {
        $( '#title' ).text('You\'re burning up!');
        //return 'You\'re burning up!';
    } else if (this.difference() < 25) {
        $( '#title' ).text("You\'re lukewarm.");
        //return "You\'re lukewarm.";
    } else if (this.difference() < 50) {
        $( '#title' ).text("You\'re a bit chilly.");
        //return "You\'re a bit chilly.";
    } else if (this.difference() < 100) {
        $( '#title' ).text("You\'re ice cold!");
        //return "You\'re ice cold!";
    };

    if (this.isLower()) {
      $( '#subtitle').text('Guess higher!');
    } else {
      $( '#subtitle' ).text('Guess lower');
    };
    return $( '#title' ).text();
}


Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}


Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}


Game.prototype.provideHint = function() {
  var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  return shuffle(hintArray);
}


function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}


function newGame() {
  return new Game;
}


function shuffle(arr) {
  var n = arr.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = arr[n]; //the back of the arr
    arr[n] = arr[i];
    arr[i] = t;
  }
  return arr;
}


function makeAGuess(game) {
  var guess = $( "#player-input" ).val();
  $( "#player-input" ).val("");
  var output = game.playersGuessSubmission(parseInt(guess,10));
  console.log(output);
}

function disable() {
  $( '#submit' ).prop("disabled", "disabled");
  $( '#hint' ).prop("disabled", "disabled");
}


$( document ).ready(function() {

  var game = new Game();

  $( "#submit" ).on("click", function(e) {
    makeAGuess(game);
  });

  $( "#player-input" ).keypress(function(event) {
      if ( event.which == 13 ) {
        makeAGuess(game);
      }
  });

  $( "#reset" ).click(function() {
    game = new Game();
    $( "#title" ).text('Guessing Game');
    $( "#subtitle" ).text('Guess a number between 1-100!');
    $( '#submit' ).removeAttr("disabled");
    $( '#hint' ).removeAttr("disabled");
    $( '#player-input' ).text('');
    $( '.guess' ).text('-')
  });

  $( "#hint" ).click(function() {
    var hints = game.provideHint();
    $( "#title" ).text('The winning number is ' +hints[0]+ ', ' +hints[1]+ ', or ' +hints[2]);
    $( '#hint' ).prop('disabled', 'disabled');
  });
});
