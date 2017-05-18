var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var server     = require("http").Server(app);
var io         = require("socket.io")(server);

app.use(express.static(__dirname + "/lib"));

// Hardcore players
jPlayerOne = {"nickname":"a", "choice":"", "waiting":"true", "result": ""};
jPlayerTwo = {"nickname":"b", "choice":"", "waiting":"true", "result": ""};

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
		if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
			compare();
			io.emit("did i win", {
				jPlayerOne,
				jPlayerTwo
				// playerOneAnswer: jPlayerOne.choice,
				// playerTwoAnswer: jPlayerTwo.choice
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
		if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
			compare();
			io.emit("did i win", {
				jPlayerOne,
				jPlayerTwo
				// playerOneAnswer: jPlayerOne.choice,
				// playerTwoAnswer: jPlayerTwo.choice
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
		if(jPlayerOne.waiting == false && jPlayerTwo.waiting == false){
			compare();
			io.emit("did i win", {
				jPlayerOne,
				jPlayerTwo

			});
			// Sets both players to wait, because new round has started
			reset();
		}
	});
});


function compare(){
  if(jPlayerOne.choice === jPlayerTwo.choice){
      jPlayerOne.result = "tie";
      jPlayerTwo.result = "tie";       
  }
  else if(jPlayerOne.choice === "rock"){
    if(jPlayerTwo.choice === "scissor"){
      jPlayerOne.result = "won";
      jPlayerTwo.result = "lost";
    }
    else{
      jPlayerOne.result = "lost";
      jPlayerTwo.result = "won";   
    }
  }
  else if(jPlayerOne.choice === "paper"){
    if(jPlayerTwo.choice === "rock"){
      jPlayerOne.result = "won";
      jPlayerTwo.result = "lost";
    }
    else{
        jPlayerOne.result = "lost";
      	jPlayerTwo.result = "won";    
    }
  }
  else if(jPlayerOne.choice === "scissor"){
    if(jPlayerTwo.choice === "rock"){
     	jPlayerOne.result = "lost";
      	jPlayerTwo.result = "won";
    } else{
      jPlayerOne.result = "won";
      jPlayerTwo.result = "lost";    
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