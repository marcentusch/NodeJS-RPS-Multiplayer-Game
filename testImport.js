var ironicStrings = ["1", "2", "3"];


var testObject = {
	testFunction: function(){
		for (var i = 0; i < ironicStrings.length; i++) {
			console.log(ironicStrings[i]);
		}
	}
}

module.exports = testObject;

// or

// module.exports.testFunction = function(){
// 	console.log("Hey i am also imported!");
// }




