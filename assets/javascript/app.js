
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

// variables

	// used questions array

	// time

	var questionCount = 0;

	var correctAnswers = 0, incorrectAnswers = 0, unanswered = 0;

	var time = 30;

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
	questionChosen = false;
	gameComplete = false;
	questionCount = 0;
	correctAnswers = 0;
	incorrectAnswers = 0;
	unanswered = 0;
};

function startQCountdown() {
	questionTimeout = setTimeout(checkIfCorrect, 5 * 1000);
};

function stopQCountdown() {
	clearTimeout(questionTimeout);
}

function startSSTimeout() {
	scoreScreenTimeout = setTimeout(chooseQuestion, 5 * 1000);
}

function stopSSTimeout() {
	clearTimeout(scoreScreenTimeout, 5 * 1000);
}

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
	}
};

function checkIfCorrect() {

	$(".art").replaceWith("<img src='" + questions[randomNumber].artistImage + "' alt='" + questions[randomNumber].artist + "'>")
		$("img").addClass("art");

	if (guess === correctArtist) {
		correctAnswers++;
		questions.splice(randomNumber, 1);
		$("#answerList").empty();
		$("#question").html("<p>Nice work<br><br>You're currently on <br>" + correctAnswers + " correct<br>" + incorrectAnswers + " incorrect<br>and " + unanswered + " unanswered");
	}
	else if (guess === undefined) {
		unanswered++;
		questions.splice(randomNumber, 1);
		$("#answerList").empty();
		$("#question").html("<p>You didn't answer!<br><br>You're currently on <br>" + correctAnswers + " correct<br>" + incorrectAnswers + " incorrect<br>and " + unanswered + " unanswered");
	}
	else if (guess !== correctAnswers) {
		incorrectAnswers++;
		questions.splice(randomNumber, 1);
		$("#answerList").empty();
		$("#question").html("<p>Not right, unfortunately<br><br>You're currently on <br>" + correctAnswers + " correct<br>" + incorrectAnswers + " incorrect<br>and " + unanswered + " unanswered");
	}
};

function checkIfFinished() {
	if (questionCount < 9) {
		return
	}
	else {
		$("#questionDiv").html("<p class=>Final scores<br><br>" + correctAnswers + " correct<br>" + incorrectAnswers + " incorrect<br>and " + unanswered + " unanswered");
		gameInProgress = false;
		gameComplete = true;
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
		startSSTimeout();
	});

});

	// set timer to 30 seconds

		// change timer variable

		// update DOM

	// start timer ()

	// if no click before time ends

		// display time's up on DOM

		// unanswered ++

	// choose question from array

		// update DOM with object data

	// push object to used questions array

// function game complete ()

	// game complete = true

	// display final scores

	// display reset button

		// if clicked

			// initialise game ()

// function initialise game ()

	// push ( / combine ) used questions array to ( / with ) main questions array

	// game complete = false

	// return variables to 0

// listen to click

	// display relevant picture

	// if correct

		// display "your're correct"

		// correct answers  ++

	// if not correct

		// display "not correct"

		// incorrect answers ++

	// check if quesiton count

		// if question count = questionsArray.length

		// game complete ()

	// choose question

initializeGame();














