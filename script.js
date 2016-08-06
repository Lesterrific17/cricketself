
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
	$("#ask").click(function() {
		askQuestion();
	});
	$("#submit-answer").click(function() {
		checkAnswer($("#your-answer").val());
		$("#your-answer").val('');
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
});

/////////////////////////////////////////////////////////////////////

var combos = [];
var index;
var currentEdit;

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
	if (!combos[index].done) {
		$("#asked-question").html(combos[index].question);
		combos[index].done = true;
	}
}

function checkAnswer(ans) {
	if (combos[index].answer == ans) {
		console.log("Correct!");
	}
	else {
		console.log("Wrong!");
	}
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