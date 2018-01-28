
// array of questions

	var questions = [
		{"artist": "Katsushika Hokusai", "question": "Which Japanese artist created The Great Wave off Kanagawa wood-block print?", "image": "assets/images/hokusai.jpg", "artistImage": "assets/images/hokusai2.png", "answers": 
			[{"letter": "A", "artistName": "Utagawa Hiroshige"}, {"letter": "B", "artistName": "Zenko Suzuki"}, {"letter": "C", "artistName": "Katsushika Hokusai"}, {"letter": "D", "artistName": "Haruki Murakami"}] 
		},
		{"artist": "Pablo Picasso", "question": "Which Spanish master painted the proto-cubist Les Demoiselles d’Avignon?", "image": "assets/images/picasso.jpg", "artistImage": "assets/images/picasso2.jpg", 
			"answers": 
			[{"letter": "A", "artistName": "Sergio Ramos"}, {"letter": "B", "artistName": "Pablo Picasso"}, {"letter": "C", "artistName": "Frida Kahlo"}, {"letter": "D", "artistName": "Salvador Dali"}] 
		},
		{"artist": "Claude Monet", "question": "Famous for his calm French countryside scenes, which impressionist does The Japanese Footbridge belong to?", "image": "assets/images/monet.jpg", "artistImage": "assets/images/monet2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Claude Monet"}, {"letter": "B", "artistName": "Claude Debussy"}, {"letter": "C", "artistName": "Gérard Depardieu"}, {"letter": "D", "artistName": "Edouard Manet"}] 
		},
		{"artist": "Leonardo Da Vinci", "question": "Probably the most famous painting in the world. But which Renaissance master do we have to thank for The Mona Lisa?", "image": "assets/images/daVinci.jpg", "artistImage": "assets/images/daVinci2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Leonardo Di Caprio"}, {"letter": "B", "artistName": "Sandro Botticelli"}, {"letter": "C", "artistName": "Michelangelo"}, {"letter": "D", "artistName": "Leonardo Da Vinci"}] 
		},
		{"artist": "Jackson Pollock", "question": "Autumn Ryhthm (Number 30) was painted by one of most celebrated artists in American history. But which one?", "image": "assets/images/pollock.jpg", "artistImage": "assets/images/pollock2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Mark Rothko"}, {"letter": "B", "artistName": "Michael Jackson"}, {"letter": "C", "artistName": "Jackson Pollock"}, {"letter": "D", "artistName": "John Steinbeck"}] 
		},
		{"artist": "Edvard Munch", "question": "Is it someone screaming or someone hearing a scream? And which Norwegian painted it?", "image": "assets/images/munch.jpg", "artistImage": "assets/images/munch2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Jo Nesbo"}, {"letter": "B", "artistName": "Matt Groening"}, {"letter": "C", "artistName": "Roald Dahl"}, {"letter": "D", "artistName": "Edvard Munch"}] 
		},
		{"artist": "Keith Harring", "question": "It doesn't have a title but it does have an artist. Who created this funky piece of neo-expressionism?", "image": "assets/images/haring.jpg", "artistImage": "assets/images/harring2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Keith Harring"}, {"letter": "B", "artistName": "Keith Richards"}, {"letter": "C", "artistName": "Adam Sandler"}, {"letter": "D", "artistName": "Roy Lichtenstein"}] 
		},
		{"artist": "Johannes Vermeer", "question": "The Girl with a Pearl Earring, represented by Scarlett Johannson in 2003, muse to Colin Firth's character, the artist of this celebrated painting. Which is who?", "image": "assets/images/vermeer.jpg", "artistImage": "assets/images/vermeer2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Rembrandt Harmenszoon van Rijn"}, {"letter": "B", "artistName": "Johannes Vermeer"}, {"letter": "C", "artistName": "Colin Seconth"}, {"letter": "D", "artistName": "Tijs Michiel Verwest"}] 
		},
		{"artist": "Andy Warhol", "question": "Which artist, famous for his embrace of popular culture and commerial processes, is repsonsible for this depiction of actress Marilyn Monroe?", "image": "assets/images/warhol.jpg", "artistImage": "assets/images/warhol2.jpg",
			"answers": 
			[{"letter": "A", "artistName": "Marilyn Monroe (self-portrait)"}, {"letter": "B", "artistName": "Andy Roddick"}, {"letter": "C", "artistName": "Andy Warhol"}, {"letter": "D", "artistName": "Arthur Miller"}] 
		}
	];

	var usedQuestions = [];

	var questionCount = 0;

	var correctAnswers = 0, incorrectAnswers = 0, unanswered = 0;

	var time = 30;

	var intervalID;

	var questionTimeout;

	var scoreScreenTimeout;

	var questionChosen = false;

	var gameComplete = false;

	var gameInProgress = false;

	var randomNumber;

	var correctArtist;

	var guess;

function initializeGame() {
	$(".art").replaceWith("<img src='assets/images/colorSquare.jpg' alt='art'>")
	$("img").addClass("art");
	$("img").addClass("firstImage");
	gameComplete = false;
	questionChosen = false;
	questionCount = 0;
	correctAnswers = 0;
	incorrectAnswers = 0;
	unanswered = 0;
	time = 30;
	$(".resetButton").remove();
};

function startQCountdown() {
	questionTimeout = setTimeout(checkIfCorrect, 30 * 1000);
};

function stopQCountdown() {
	clearTimeout(questionTimeout);
};

function startSSTimeout() {
	scoreScreenTimeout = setTimeout(function() {
		checkIfFinished();
		chooseQuestion();
	}, 5 * 1000);
};

function decrement() {
	time--;
	$("#timer").text("00:" + time);
	if (time < 10) {
		$("#timer").text("00:0" + time);
		if (time < 6) {
			$("#timer").attr("style", "color:#ff3845");
		}
		else if (time <= 0) {
			stopTimeDisplay();
		}
	}
};

function startTimeDisplay() {
	$("#timer").attr("style", "color:#757575");
	time = 30;
	clearInterval(intervalID);
	intervalID = setInterval(decrement, 1000);
};

function stopTimeDisplay() {
	clearInterval(intervalID);
	time = 30;
	$("#timer").text("");
};

function stopSSTimeout() {
	clearTimeout(scoreScreenTimeout);
};

function chooseQuestion() {

	if (gameComplete !== true) {
	
	randomNumber = Math.floor(Math.random() * questions.length);
	correctArtist = questions[randomNumber].artist
	questionCount++;
	$("#question").empty();
	$("#question").text(questions[randomNumber].question);
	$("#question").removeClass("initialText");
	$("#answerList").empty();
	for (var i = 0; i < 4; i++) {
		var button = $("<button>");
		button.addClass("answerButton");
		button.attr("data-name", questions[randomNumber].answers[i].artistName);
		$(button).text(questions[randomNumber].answers[i].letter)
		var answerText = $("<span>");
		answerText.addClass("answerChoice");
		answerText.text(questions[randomNumber].answers[i].artistName);
		var newDiv = $("<div>");
		newDiv.addClass("answer");
		newDiv.append(button, answerText);
		$("#answerList").append(newDiv);
		$(".art").replaceWith("<img src='" + questions[randomNumber].image + "' alt='art'>")
		$("img").addClass("art");
	}
	$("#questionCount").text(questionCount + "/9");
	$("#timer").text("00:" + time);
	usedQuestions.push(questions[randomNumber]);
	questionChosen = true;
	startQCountdown();
	startTimeDisplay();
	}
};

function checkIfCorrect() {

	stopTimeDisplay();

	$(".art").replaceWith("<img src='" + questions[randomNumber].artistImage + "' alt='" + questions[randomNumber].artist + "'>")
		$("img").addClass("art");

	if (guess === correctArtist) {
		correctAnswers++;
		questions.splice(randomNumber, 1);
		$("#answerList").empty();
		$("#question").html("<p class='question'>" + correctArtist + " is indeed the correct answer<br><br><br><br>Current scores:<br><br>" + correctAnswers + " correct<br><br>" + incorrectAnswers + " incorrect<br><br>" + unanswered + " unanswered");
	}
	else if (guess === undefined || guess === "not answered") {
		unanswered++;
		questions.splice(randomNumber, 1);
		$("#answerList").empty();
		$("#question").html("<p class='question'>You didn't answer!<br><br>For reference, " + correctArtist + " is the correct answer<br><br><br><br>Current scores:<br><br>" + correctAnswers + " correct<br><br>" + incorrectAnswers + " incorrect<br><br>" + unanswered + " unanswered");
	}
	else if (guess !== correctAnswers) {
		incorrectAnswers++;
		questions.splice(randomNumber, 1);
		$("#answerList").empty();
		$("#question").html("<p class='question'>Incorrect, unfortunately<br><br>" + correctArtist + " is the correct answer<br><br><br><br>Current scores:<br><br>" + correctAnswers + " correct<br><br>" + incorrectAnswers + " incorrect<br><br>" + unanswered + " unanswered");
	}
	startSSTimeout();
	guess = "not answered"
};

function checkIfFinished() {
	if (questionCount < 9) {
		return
	}
	else {
		$("#question").html("<p class='question'>Final scores<br><br><br><br>" + correctAnswers + " correct<br><br>" + incorrectAnswers + " incorrect<br><br>" + unanswered + " unanswered");
		$("#answerList").empty();
		gameInProgress = false;
		gameComplete = true;
		stopSSTimeout();
		var resetButton = $("<button>");
		resetButton.text("TRY AGAIN");
		resetButton.addClass("resetButton");
		$(".question").append("<br><br><br>");
		$(".question").append(resetButton);
		for (var i = 0; i < usedQuestions.length; i++) {
			questions.push(usedQuestions[i]);
			usedQuestions.splice(i, 1);
		};
	}
};

$(document).ready(function() {

	$(document).on("click", function() {
		if (gameInProgress !== true && gameComplete !== true) {
			chooseQuestion();
			gameInProgress = true;
		};
	});

	$("#answerList").on("click", ".answerButton", function() {
		stopQCountdown();
		guess = $(this).attr("data-name")
		checkIfCorrect();
		checkIfFinished();
	});

	$("#questionDiv").on("click", ".resetButton", function() {
		initializeGame();	
	});

});














