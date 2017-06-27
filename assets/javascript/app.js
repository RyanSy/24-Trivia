$(document).ready(function() {
  $("#gameContainer").hide();
  $("#start-button").click(function(){
    $("#launch").hide()
    $("#gameContainer").show();
  });
  $("button").mouseup(function(){
    $(this).blur();
  });

/* Question set */
  var questions = [{
    question: "In what year did 24 first air?",
    answers: [2000, 2001, 2002, 2003],
    correctAnswer: 2001
  }, {
    question: "What SUV did Jack drive in Season 1?",
    answers: ["GMC Yukon XL", "Ford Expedition", "Jeep Cherokee", "Hummer H1"],
    correctAnswer: "GMC Yukon XL"
  }, {
    question: "Who was Jack's partner in Season 3?",
  	answers: ["Tony Almeida", "Mike Doyle", "Chase Edmunds", "Curtis Manning"],
  	correctAnswer: "Chase Edmunds"
  }, {
    question: "Who was Special Agent in Charge of CTU New York?",
  	answers: ["Arlo Glass", "Cole Ortiz", "Dana Walsh", "Brian Hastings"],
  	correctAnswer: "Brian Hastings"
  }, {
    question: "What was Jack's pistol of choice for most of the series?",
  	answers: ["Glock 19", "Colt 1911A1", "HK USP9 Compact", "FN Five-Seven"],
  	correctAnswer: "HK USP9 Compact"
  }];

  /* Click events */
  $(document).on('click', '#start-over', function(e) {
    game.reset();
  });

  $(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
  });

  $(document).on('click', '#start-button', function(e) {
    $('#start-button').hide();
    $('#clock').html('<h2><span id="clock">11:59:30</span></h2>');
    game.loadQuestion();
  });

  /* Game logic */
  var panel = $('#quiz-area');
  var countStartNumber = 30;
  var userChoices = [];
  var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter++;
      $('#clock').html("11:59:"+game.counter);
      if (game.counter === 60){
        $('#clock').html("<h2><span id=clock>12:00:00</span></h2>");
        console.log('TIME UP');
        game.timeUp();
      }
    },
    loadQuestion: function(){
      timer = setInterval(game.countdown, 1000);
      panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
      for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        panel.append('<button id="button" class="answer-button btn-lg"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    clicked: function(e) {
      console.log(e.target.innerText);
      userChoices.push(e.target.innerText);
      console.log(userChoices);
      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },
    answeredCorrectly: function(){
      game.correct++;
      if (game.currentQuestion === questions.length - 1){
        this.results();
      } else {
        this.nextQuestion();
      }
    },
    answeredIncorrectly: function() {
      game.incorrect++;
      if (game.currentQuestion === questions.length - 1){
        this.results();
      } else {
        this.nextQuestion();
      }
    },
    nextQuestion: function(){
      game.currentQuestion++;
      panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
      for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        panel.append('<button class="answer-button btn-lg" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    timeUp: function (){
      $('#clock').hide();
      clearInterval(timer);
      panel.html('<h2>Out of Time!</h2>');
  		panel.append('<br><button id="start-over" class="btn-lg">Play Again</button>');
    },
    results: function() {
      $('#clock').hide();
      clearInterval(timer);
      $(".modal-title").html("Game complete. Here are your results: ");
      panel.html('<h2>Game complete. Here are your results: <h2>');
  		panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
  		panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
  		var yourScore = ((game.correct/questions.length)*100);
  		panel.append('<h3>Your Score: ' + yourScore + '%</h3><br>');
      for (i = 0; i < questions.length; i++) {
        panel.append('<h3>Question ' + [i+1] + ': ' + questions[i].question + '</h3>');
        if (questions[i].correctAnswer == userChoices[i]) {
          panel.append('<h3>You Answered: ' + userChoices[i] + ' - Correct!</h3');
        }
        else {
          panel.append('<h3>You Answered: ' + userChoices[i] + ' - Incorrect!</h3');
          panel.append('<h3>Correct Answer: ' + questions[i].correctAnswer + '</h3>');
        }
        panel.append('<br>');
      }
      panel.append('<br><button id="start-over" class="btn-lg">Play Again</button>');
    },
    reset: function(){
      this.currentQuestion = 0;
      $('#clock').html('11:59:30');
      $('.modal-title').html('You have until 12:00 to complete the game.');
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };
});
