// Guess Game Javascript File
$(document).ready(function() {
   	
	guesses_remaining = 5;
	$("h2").text(guesses_remaining + " Guesses Remaining");
	num_to_guess = Math.floor((Math.random() * 100) + 1);
	guesses_made = [];


    $("#guess_b").on('click', function() {
    	
    	var value = $("input").val();
    	if ( !isValid(value) ) return;

    	if (value == num_to_guess) { 
    		$("h1").text("You Won!!");
    		$("#guess_b").hide();
    		$(".jumbotron").css('background-color', 'yellow');
    		$("h2").text("");
    		$("h4").text("");
    		return; }


    	guesses_made.push(value);
    	
    	guesses_remaining += -1;
    	if (guesses_remaining == 0) {
    		$("#guess_b").hide();
    		$("h2").text("No more guesses left for you. Press \"Play Again.\"");
    		$("h4").text("");
    	}
    	else { 
    		$("h2").text(guesses_remaining + " Guesses Remaining"); 
    		$("h4").text( value + ": " + hotness(num_to_guess, value) + "\n You should point " + up_or_down(num_to_guess, value) );
    		var st = generateString(num_to_guess, guesses_made);
    		$(".history").remove();
    		$("#right").append(st);
    	}
    	
	});

	$("#play_b").on('click', function() {
    	guesses_remaining = 5;
    	guesses_made = [];
    	num_to_guess = Math.floor((Math.random() * 100) + 1);
    	$("h1").text("Guess the Number");
    	$(".jumbotron").css('background-color', '#eee');
    	$("#guess_b").show();
    	$("h2").text(guesses_remaining + " Guesses Remaining");
    	$("h4").text("");
    	$(".history").remove();
	});

	$("#hint_b").on('click', function() {
		$(this).text(num_to_guess);
    	setTimeout(fade_out, 400);
	});
});

var generateString = function generateString(goal, array) {
  var output = "<p class=\"history\">";
  for (var i = 0; i < array.length; i++) {
  	var diff = Math.abs(goal - array[i]);
  	if (diff<6 ) { output += "<span class=\"hot3\">"+array[i]+"</span> "; continue; }
  	if (diff<14) { output += "<span class=\"hot2\">"+array[i]+"</span> "; continue; }
  	if (diff<25) { output += "<span class=\"hot1\">"+array[i]+"</span> "; continue; }
  	if (diff<40) { output += "<span class=\"cold1\">"+array[i]+"</span> "; continue; }
  	if (diff<65) { output += "<span class=\"cold2\">"+array[i]+"</span> "; continue; }
  	else output += "<span class=\"cold3\">"+array[i]+"</span> ";
  }
  return output+"</p>";
}

var hotness = function hotness(goal, guess) {
  var diff = Math.abs(goal - guess);
  if (diff<6 ) return "YOUR MUM's OVEN HOT!!!";
  if (diff<14) return "DEATH VALLEY's HOT!!";
  if (diff<25) return "FLORIDA HOT.";
  if (diff<40) return "BOSTON COLD.";
  if (diff<65) return "BUFFALO COLD!!";
  else return "YOUR EX's HEART COLD!!!";
}

var up_or_down = function up_or_down(goal, guess) {
  var diff = goal - guess;
  if (diff>0) return "UP";
  else return "DOWN";
}

var fade_out = function fade_out() {
  $("#hint_b").text("Give me a Hint");
}

var isValid = function(input) {

	if ( input ===  "") {
		alert("Is empty. Please insert a number.");
		return false;
	}
	if ( !/^\+?[0-9\b]+$/.test( input ) ) {
		alert("This is not an integer!\nPlease, press only NUMBER KEYS");
		return false;
	}
	if ((input<=0) || (input>100)) {
		alert("This is not between 0 and 100!");
		return false;
	}
	if (guesses_made.indexOf(input)>-1) {
		alert("You already picked that number!");
		return false;
	}

	return true;
}
