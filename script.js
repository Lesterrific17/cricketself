
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
	$("#submit-answer").click(function() {
		nextQuestion();
	});
	///////////////////////////////////////////////
	$('body').on('click', '.box', function() {
		if (value1 == null) {
			value1 = $(this).html();
			v1 = $(this).attr('id');
		}
		else if (value1 != null && value2 == null) {
			value2 = $(this).html();
			v2 = $(this).attr('id');
			if(compare()){
				$('#' + v2 + ', #' + v1).attr('class', 'box-clicked');
				score.addScore();
				$("#score").html(score.totalScore);
			};
			value1 = value2 = null;
		}
		if (clickCount == comboCount) {
			alert("Game Over!");
			mode = 0;
			$("#container").html('');
			$("#score").html("score");
		}
	});
	///////////////////////////////////////////////
	$("#startmode1").click(function() {
		if (combos.length != 0 && mode != 1) {
			score = new Score();
			mode = 1;
			indexCount = 0;
			$("#score").html(score.totalScore + " / " + score.maxScore + " : " +
				indexCount + " / " + score.maxScore);
			$("#time").html(timer.seconds);
			initCombo();
			askQuestion();
		}
		else {
			alert("ERRoR!");
		}
	});
	$("#startmode2").click(function() {
		if (combos.length != 0 && mode != 2) {
			score = new Score();
			mode = 2;
			indexCount = 0;
			$("#score").html(score.totalScore + " / " + score.maxScore + " : " +
				indexCount + " / " + score.maxScore);
			initCombo();
			askQuestion();
		}
		else {
			alert("ERRoR!");
		}
	});
	$("#startmode3").click(function() {
		if (combos.length >= comboCount && mode != 3) {
			indexArr = [];
			stringArr = [];
			value1 = null;
			value2 = null;
			clickCount = 0;
			score = new Score();
			mode = 3;
			$("#score").html(score.totalScore);
			initCombo();
			initStrings();
			initBoxes();
		}
		else {
			alert("ERRoR!");
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
var score = new Score();
var mode = 0;

var comboCount = 10;
var indexArr = [];
var stringArr = [];
var value1 = null; var value2 = null;
var v1,v2;
var clickCount = 0;

setInterval(function printTime() {
	if (mode == 1) {
		timer.minus();
		$("#time").html(timer.seconds);
		if (timer.seconds == 0) {
			nextQuestion();
		}
	}
},1000);

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
function nextQuestion() {
	indexCount++;
	timer.reset();
	checkAnswer($("#your-answer").val());
	$("#your-answer").val('');
	if (indexCount < combos.length) {
		askQuestion();
	}
	else {
		alert("Game Over!");
		mode = 0;
		$("#score").html("score");
		$("#time").html("timer");
		$("#asked-question").html("question");
		$("#check").html('');
	}
}
function askQuestion() {
	index = randomBetween(0,combos.length);
	while (combos[index].done) {
		index = randomBetween(0,combos.length);
	}
	$("#asked-question").html(combos[index].question);
	combos[index].done = true;
}
function checkAnswer(ans) {
	if (combos[index].answer == ans) {
		$("#check").html("Correct!");
		score.addScore();
	}
	else {
		$("#check").html("Wrong!");
	}
	$("#score").html(score.totalScore + " / " + score.maxScore + " : " +
			indexCount + " / " + score.maxScore);
}
function clearEdit() {
	$(".edit-display").html('');
}
function initStrings() {
	var rand
	for (var i = 0; i < comboCount; i++) {
		rand = randomBetween(0,combos.length);
		while (combos[rand].done) rand = randomBetween(0,combos.length);
		combos[rand].done = true;
		indexArr.push(rand);
	}
	var q_arr = []; var a_arr = [];
	initCombo();
	for (var i = 0; i < indexArr.length; i++) {
		rand = randomBetween(0,indexArr.length);
		while (combos[rand].done) rand = randomBetween(0,indexArr.length);
		q_arr.push(indexArr[rand]);
		combos[rand].done = true;
	}
	initCombo();
	for (var i = 0; i < indexArr.length; i++) {
		rand = randomBetween(0,indexArr.length);
		while (combos[rand].done) rand = randomBetween(0,indexArr.length);
		a_arr.push(indexArr[rand]);
		combos[rand].done = true;
	}
	indexArr = [];
	for (var i = 0; i < q_arr.length; i++) {
		indexArr.push(q_arr[i])
	}
	for (var i = 0; i < a_arr.length; i++) {
		indexArr.push(a_arr[i])
	}
	for (var i = 0; i < indexArr.length; i++) {
		if (i < indexArr.length/2) stringArr.push(combos[indexArr[i]].question);
		if (i >= indexArr.length/2) stringArr.push(combos[indexArr[i]].answer);
	}
}
function initBoxes() {
	for (var i = 0; i < stringArr.length; i++) {
		createBox(stringArr[i], i);
	}
}
function createBox(string, i) {
	$("#container").html($("#container").html()+'<div id="box-' + i + '" class="box">'+string+'</div>');
}
function compare() {
	for (var i = 0; i < indexArr.length/2; i++) {
		if ((combos[indexArr[i]].question == value1 &&
			combos[indexArr[i]].answer == value2) ||
			(combos[indexArr[i]].answer == value1 &&
			combos[indexArr[i]].question == value2)) {
			clickCount++;
			return true;
		}
	}
	return false;
}
function initCombo() {
	for (var i = 0; i < combos.length; i++) {
		combos[i].done = false;
	}
}

/////////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/////////////////////////////////////////////////////////////////////

function Combo(q,a) {
	this.question = q;
	this.answer = a;
	this.done;
}
function Timer() {
	this.defaultSeconds = 5;
	this.seconds = this.defaultSeconds;
	this.minSeconds = 0;
	this.reset = function() {
		this.seconds = this.defaultSeconds+1;
	}
	this.minus = function() {
		this.seconds--;
	}
}
function Score() {
	this.totalScore = 0;
	this.maxScore = combos.length;
	this.addScore = function() {
		this.totalScore++;
	}
}