var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var server     = require("http").Server(app);
var io         = require("socket.io")(server);


app.use(express.static(__dirname + "/lib"));


// // Example of importing in Node
// var importedStuff  = require("./testImport.js");
// importedStuff.testFunction();


// Hardcoded players
jPlayerOne = {"nickname":"", "choice":"", "waiting":"true", "result": ""};
jPlayerTwo = {"nickname":"", "choice":"", "waiting":"true", "result": ""};

app.get("/", function(req, res){
	res.sendFile(__dirname + "/game.html");
});

io.on( "connection" , function( oSocket ){
	
	oSocket.on("I want to create a new player", function(jData){
		if(jPlayerOne.nickname == "" || jPlayerOne.nickname != jData.nickname){
			jPlayerOne.nickname = jData.nickname;
		} else if(jPlayerTwo.nickname == "" || jPlayerTwo.nickname != jData.nickname) {
			jPlayerTwo.nickname = jData.nickname;
		}
		
	});

	// THE SERVER RETRIVES SOMETHING FROM THE CLIENT
	oSocket.on( "Hi server, I am clicking the ROCK button!" , function( jData ){
		if(jData.nickname == jPlayerOne.nickname) {
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
		if(jData.nickname == jPlayerOne.nickname) {
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
		if(jData.nickname == jPlayerOne.nickname) {
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

server.listen(8080, function(){
	console.log("Server listening on port 8080...")
});