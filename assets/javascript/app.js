$(document).ready(function() {
	$("#submit-button").hide();

	var questions = [{
	question: "In what year did 24 first air?",
    answers: [2000, 2001, 2002, 2003],
    correctAnswer: 1
	}, {
	question: "What SUV did Jack drive in Season 1?",
	answers: ["GMC Yukon XL", "Ford Expedition", "Jeep Cherokee", "Hummer H1"],
	correctAnswer: 0
	}, {
	question: "Who was Jack's partner in Season 3?",
	answers: ["Tony Almeida", "Mike Doyle", "Chase Edmunds", "Curtis Manning"],
	correctAnswer: 2
	}, {
	question: "Who was the Special Agent in Charge of CTU New York?",
	answers: ["Arlo Glass", "Cole Ortiz", "Dana Walsh", "Brian Hastings"],
	correctAnswer: 3
	}, {
	question: "What was Jack's pistol of choice for most of the series?",
	answers: ["Glock 19", "Colt 1911A1", "HK USP9 Compact", "FN Five-Seven"],
	correctAnswer: 2
	}];

	var selections = [];
	
	$("#start-button").click(function(){
		$("h1").hide();
		$("h2").hide();
		$("#start-button").hide();
		function createQuestionElement(index) {
	    var qElement = $('<div>', {
	      id: 'question'
	    });
	    
	    var question = $('<p>').append(questions[index].question);
	    qElement.append(question);
	    
	    var radioButtons = createRadios(index);
	    qElement.append(radioButtons);
    
    	return qElement;
  	
	
	function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].answers.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  	}
  }
  	
	$("#clock").append("11:59:30");
	var count=30;
	var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
	function timer(){
			count=count+1;
			$("#clock").html("11:59:"+count);
			if (count === 60){
				clearInterval(counter);
				$("#clock").html("12:00:00")
			}
	}
	$("#submit-button").show();
  	});

});	
