var socket = io.connect("http://localhost:8080");

$("#rock").click(function(){
	var sNickname = $("#nickname").val();
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
	var sNickname = $("#nickname").val();
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
	var sNickname = $("#nickname").val();
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
	} else {
			onResult(jData.jPlayerTwo.result);
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

function resetScreen(){
	$("body").css("background-color", "#f7fff7");
	$("#statusHeading").text("New round started!");
	$(".option").removeClass("chosenIcon");
	$(".resultIconsDiv").addClass("hide")
}