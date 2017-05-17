var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var server     = require("http").Server(app);
var io         = require("socket.io")(server);

app.use(express.static(__dirname + "/lib"));

// Hardcore players
jPlayerOne = {"nickname":"a", "choice":"", "waiting":"true"}
jPlayerTwo = {"nickname":"b", "choice":"", "waiting":"true"}

app.get("/", function(req, res){
	res.sendFile(__dirname + "/game.html");
});

io.on( "connection" , function( oSocket ){
	
	// THE SERVER RETRIVES SOMETHING FROM THE CLIENT
	oSocket.on( "Hi server, I am clicking the ROCK button!" , function( jData ){
		if(jData.nickname == "a") {
			jPlayerOne.choice  = "rock";
			jPlayerOne.waiting = false;
		} else {
			jPlayerTwo.choice  = "rock";
			jPlayerTwo.waiting = false;
		}
		var finalResult = compare(jPlayerOne.choice, jPlayerTwo.choice);
		if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
			io.emit("did i win", {
				answer: finalResult,
				playerOneAnswer: jPlayerOne.choice,
				playerTwoAnswer: jPlayerTwo.choice
			});
			// Sets both players to wait, because new round has started
			reset();
		}
	});

	// THE SERVER RETRIVES SOMETHING FROM THE CLIENT
	oSocket.on( "Hi server, I am clicking the PAPER button!" , function( jData ){
		if(jData.nickname == "a") {
			jPlayerOne.choice = "paper";
			jPlayerOne.waiting = false;
		} else {
			jPlayerTwo.choice = "paper";
			jPlayerTwo.waiting = false;
		}
		var finalResult = compare(jPlayerOne.choice, jPlayerTwo.choice);
		if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
			io.emit("did i win", {
				answer: finalResult,
				playerOneAnswer: jPlayerOne.choice,
				playerTwoAnswer: jPlayerTwo.choice
			});
			// Sets both players to wait, because new round has started
			reset();
		}
	});

	// THE SERVER RETRIVES SOMETHING FROM THE CLIENT
	oSocket.on( "Hi server, I am clicking the SCISSOR button!" , function( jData ){
		if(jData.nickname == "a") {
			jPlayerOne.choice = "scissor";
			jPlayerOne.waiting = false;
		} else {
			jPlayerTwo.choice = "scissor";
			jPlayerTwo.waiting = false;
		}
		var finalResult = compare(jPlayerOne.choice, jPlayerTwo.choice);
		if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
			io.emit("did i win", {
				answer: finalResult,
				playerOneAnswer: jPlayerOne.choice,
				playerTwoAnswer: jPlayerTwo.choice
			});
			// Sets both players to wait, because new round has started
			reset();
		}
	});
});


function compare(choice1, choice2){
  if(choice1 === choice2){
      return "The result is a tie!";       
  }
  else if(choice1 === "rock"){
    if(choice2 === "scissor"){
      return "rock wins";
    }
    else{
      return "paper wins";   
    }
  }
  else if(choice1 === "paper"){
    if(choice2 === "rock"){
      return "paper wins";
    }
    else{
        return "scissor wins";    
    }
  }
  else if(choice1 === "scissor"){
    if(choice2 === "rock"){
      return "rock wins";
    }
    else{
      return "scissor wins";    
    }
  }
}

function reset(){
	jPlayerOne.waiting = true;
	jPlayerTwo.waiting = true;
}

function sendResults(){
	var finalResult = compare(jPlayerOne.choice, jPlayerTwo.choice);

	if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
		io.emit("did i win", {
			answer: finalResult
		});
	}
}

server.listen(8080, function(){
	console.log("Server listening...")
});