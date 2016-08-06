
/////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	
	$("#add").click(function() {
		if ($("#question").val() != "" && $("#answer").val() != "") {
			combos.push(new Combo($("#question").val(),$("#answer").val()));	
			$("#question").val('');
			$("#answer").val('');
		}
	});
	$("#print").click(function() {
		printCombos();
	});
	$('body').on('click', '.delete' ,function(){
		combos.splice($(this).attr('id'),1);
		printCombos();
	});
	$('body').on('click', '.edit' ,function(){
		clearEdit();
		currentEdit = $(this).attr('id');
		$("#display-"+currentEdit).html(
			'<input id="new-question" placeholder="new question" type="text"/>'+
			'<input id="new-answer" placeholder="new answer" type="text"/>'+
			'<button id="ok">Ok</button>'+'<button id="cancel">Cancel</button>'
			);
	});
	$('body').on('click', '#ok' ,function(){
		if ($("#new-question").val() != "") {
			combos[currentEdit].question = $("#new-question").val();
		}
		if ($("#new-answer").val() != "") {
			combos[currentEdit].answer = $("#new-answer").val();
		}
		printCombos();
	});
	$('body').on('click', '#cancel', function(){
		clearEdit();
	});
	///////////////////////////////////////////////
	$("#start").click(function() {
		score = new Score();
		isStudying = true;
		indexCount = 0;
		$("#score").html(score.totalScore + " / " + score.maxScore);
		$("#time").html(timer.seconds);
		askQuestion();
	});
	$("#submit-answer").click(function() {
		checkAnswer($("#your-answer").val());
		$("#your-answer").val('');
		timer.reset();
		if (indexCount < combos.length) {
			askQuestion();
		}
		else {
			isStudying = false;
			$("#score").html("score");
			$("#time").html("timer");
			$("#asked-question").html("see question here...");
			alert("Game Over!");
		}
	});
	//////////////////////////////////////////////
});

/////////////////////////////////////////////////////////////////////

var combos = [];
var index;
var indexCount;
var currentEdit;
var timer = new Timer();
var isStudying = false;
var score = new Score();

// setInterval(function printTime() {
// 	if (isStudying) {
// 		timer.update();
// 		$("#time").html(timer.seconds);
// 		if (timer.seconds <= 0) {
// 			askQuestion();
// 		}
// 	}
// },1000);

/////////////////////////////////////////////////////////////////////

function printCombos() {
	$("#list").html('');
	for (var i = 0; i < combos.length; i++) {
		$("#list").html($("#list").html() + 
			(combos[i].question + " : " + combos[i].answer) +
			'<button id="' + i + '" class="edit">Edit</button>' +
			'<button id="' + i + '" class="delete">Delete</button>' +
			'<div class="edit-display" id="display-' + i + '"></div>' );
	}
}

function askQuestion() {
	index = randomBetween(0,combos.length);
	while (combos[index].done) {
		index = randomBetween(0,combos.length);
	}
	$("#asked-question").html(combos[index].question);
	combos[index].done = true;
	indexCount++;
}

function checkAnswer(ans) {
	if (combos[index].answer == ans) {
		$("#check").html("Correct!");
		score.addScore();
	}
	else {
		$("#check").html("Wrong!");
	}
	$("#score").html(score.totalScore + " / " + score.maxScore);
}

function clearEdit() {
	$(".edit-display").html('');
}

/////////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/////////////////////////////////////////////////////////////////////

function Combo(q,a) {
	this.question = q;
	this.answer = a;
	this.done = false;
}

function Timer() {
	this.defaultSeconds = 10;
	this.seconds = this.defaultSeconds;
	this.minSeconds = 0;
	this.reset = function() {
		this.seconds = this.defaultSeconds;
	}
	this.update = function() {
		if (this.seconds > this.minSeconds) {
			this.seconds--;
		}
	}
}

function Score() {
	this.totalScore = 0;
	this.maxScore = combos.length;
	this.addScore = function() {
		this.totalScore++;
	}
}