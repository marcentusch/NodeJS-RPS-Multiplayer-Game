// This should only run at the start of page load. Never again
$("#rock").addClass("disableChoices");
$("#paper").addClass("disableChoices");
$("#scissor").addClass("disableChoices");

var socket = io.connect("http://localhost:8080");

var sNickname;

// Button for submitting a player
$("#createPlayer").click(function(){
	sNickname = $("#nickname").val();
	if(sNickname == ""){
		alert("Please enter a valid nickname");
	} else {

		socket.emit("I want to create a new player", 
			{
				"nickname": sNickname
			});

		$("#rock").removeClass("disableChoices");
		$("#paper").removeClass("disableChoices");
		$("#scissor").removeClass("disableChoices");
		$("#statusHeading").text("Make your choice...");
	}
});


// Buttons for submitting a player choice
$("#rock").click(function(){
	socket.emit("Hi server, I am clicking the ROCK button!", 
		{
			"nickname": sNickname,
			"choice": "rock"
		}
	);
	$(this).addClass( "chosenIcon" );
	$(".option:not(#rock)").removeClass( "chosenIcon" );
	$("#statusHeading").text("Waiting for opponent ...");
});

$("#paper").click(function(){
	socket.emit("Hi server, I am clicking the PAPER button!", 
		{
			"nickname": sNickname,
			"choice": "paper"
		}
	);
	$(this).addClass( "chosenIcon" );
	$(".option:not(#paper)").removeClass( "chosenIcon" );
	$("#statusHeading").text("Waiting for opponent ...");
});

$("#scissor").click(function(){
	socket.emit("Hi server, I am clicking the SCISSOR button!", 
		{
			"nickname": sNickname,
			"choice": "scissor"
		}
	);
	$(this).addClass( "chosenIcon" );
	$(".option:not(#scissor)").removeClass( "chosenIcon" );
	$("#statusHeading").text("Waiting for opponent ...");
});

socket.on("did i win", function(jData){
	var sNickname = $("#nickname").val();

	// Checks the result and shows it in the top header
	if(jData.jPlayerOne.nickname == sNickname){
			onResult(jData.jPlayerOne.result);
			getOpponentResult(jData.jPlayerTwo.choice);
	} else {
			onResult(jData.jPlayerTwo.result);
			getOpponentResult(jData.jPlayerOne.choice);
		}

	// When round has finished, reset background color and heading
	setTimeout(function(){
		setTimeout(function(){
			$("#statusHeading").text("3...");
			setTimeout(function(){
				$("#statusHeading").text("2...");
				setTimeout(function(){
					$("#statusHeading").text("1...");
					setTimeout(function(){
						resetScreen();
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1500);
});


function onResult( result ){
		console.log(result);

	if(result == "won"){
			$("#statusHeading").text("You won!");
			$("#win-icon").removeClass("hide");
			var audio = new Audio('/win_applause.wav');
			audio.play();
	} else if(result == "lost"){
			$("#statusHeading").text("You lost!");
			$("#lose-icon").removeClass("hide");
			var audio = new Audio('/loser_boo.wav');
			audio.play();
	} else {
			$("#statusHeading").text("Game was tied!");
			$("#tie-icon").removeClass("hide");
			var audio = new Audio('/even_tryagain.wav');
			audio.play();
	}
}

function getOpponentResult(choice){
	if(choice == "scissor"){
		$("#scissor").addClass("opponentChoiceHighlight");
		console.log("oppnent chose scissor");
	}
	if(choice == "rock"){
		$("#rock").addClass("opponentChoiceHighlight");
		console.log("oppnent chose rock");
	}
	if(choice == "paper"){
		$("#paper").addClass("opponentChoiceHighlight");
		console.log("oppnent chose paper");
	}
}

function resetScreen(){
	$("body").css("background-color", "#f7fff7");
	$("#statusHeading").text("New round started!");
	$(".option").removeClass("chosenIcon");
	$(".resultIconsDiv").addClass("hide");
	$("#scissor").removeClass("opponentChoiceHighlight");
	$("#rock").removeClass("opponentChoiceHighlight");
	$("#paper").removeClass("opponentChoiceHighlight");
}