
var combos = [];

$(document).ready(function() {
	$("#submit").click(function() {
		combos.push(new Combo($("#question").val(),$("#answer").val()));	
	});
});

function Combo(q,a) {
	this.question = q;
	this.answer = a;
}
