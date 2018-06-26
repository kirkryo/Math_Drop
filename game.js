var mode = '';
	var difficulty = '';
	var score = 0;
	var operations = Array();
	var solved = Array();

	window.onload=function() {
		c = document.getElementById('gc');
		c.width = 700;
		c.height = 550;
		cc = c.getContext('2d');
	}

	function submit() {
		input = document.getElementById('input');
		//score = 0;
		//operations = Array();
		//solved = Array();
		mode = document.getElementById('mode').value;
		difficulty = document.getElementById('difficulty').value;
		game();
		input.focus();
		//document.getElementById('solved').innerHTML = '';
		//document.getElementById('score').innerHTML = score;
		//clearInterval(spawn);
		//clearInterval(update);
	}

	function game() {
		spawn = setInterval(spawnRandomOp, getSpawnRate(score));
		update = setInterval(updateCanvas, 1);
		document.getElementById('input').onkeypress = function(e){
		    if (!e) e = window.event;
		    if (e.keyCode == '13'){
		    	//alert(this.value);
		    	var result = this.value;
		    	var obj = operations.find(o => o.result == result);
		        var index = operations.indexOf(obj);
		        if (index > -1) {
				    operations.splice(index, 1);
				    score++;
				    //document.getElementById('score').innerHTML = score;
				}
				e.currentTarget.value = '';
				var solved_string = '<br>' + obj.operation + ' = ' + obj.result;
		        solved.push(solved_string);
		        var display = '';
		        for(i = solved.length-1; i >= 0; i--){
				    display+=solved[i];
				}
		       	document.getElementById('solved').innerHTML = display;
		       	document.getElementById('score').innerHTML = score;
		    }
		}
	}

	function endGame() {
		clearInterval(spawn);
		clearInterval(update);
		string = "Game over!";
		string2 = "You scored: " + score;
		operations = [];
		solved = [];

		cc.clearRect(0, 0, 1000, 550);
		cc.font = "30px Comic Sans MS";
		cc.fillStyle = "red";
		cc.textAlign = "center";
		cc.fillText(string, c.width/2, c.height/2.25);
		cc.fillText(string2, c.width/2, c.height/1.75); 
		document.getElementById("Submit").disabled = false;
       	//document.location.reload();
	}

	function updateCanvas() {
		cc.clearRect(0, 0, 1000, 550);
		operations.forEach( function (opObj){
			cc.font = "30px Arial";
			cc.textAlign = "left";
			cc.fillStyle = "black";
			cc.fillText(opObj.operation,opObj.x,opObj.y);
		})
		vy = getSpeed(score);
		operations.forEach( function (opObj){
			opObj.y = opObj.y + vy;
			if (opObj.y >= 550) {
				endGame();
				//die();
			}
		})
	}

	function spawnRandomOp() {
		if (mode == 'Addition') {
			var possible_op = '+';
		} else if (mode == 'Subtraction') {
			var possible_op = '-';
		} else if (mode == 'Multiplication') {
			var possible_op = '*';
		} else if (mode == 'Division') {
			var possible_op = '/';
		} else {
			var possible_op = "+-*/";
		}
		
		for (var i = 0; i < 1; i++) {
			op = possible_op.charAt(Math.floor(Math.random() * possible_op.length));
		}
		var num1 = Math.floor((Math.random() * 9)+1);
		var num2 = Math.floor((Math.random() * 9)+1);

		if (op == '/') {
			while (checkDiv(num1, num2) == false) {
				var num1 = Math.floor((Math.random() * 9)+1);
				var num2 = Math.floor((Math.random() * 9)+1);
			}
			if (checkDiv(num1, num2) == 'flip') {
				var temp = num1;
				num1 = num2;
				num2 = temp;
			}
		}

		if (op == "-") {
			while (checkSub(num1, num2) == false) {
				var num1 = Math.floor((Math.random() * 9)+1);
				var num2 = Math.floor((Math.random() * 9)+1);
			}
		}

		var operation = num1 + op + num2;
		var result = eval(operation);
		var x = Math.floor(Math.random() * 650);
		var object = {operation: operation, result: result, x: x, y: 0};
		operations.push(object);
	}	

	function getSpeed(score) {
		if (difficulty == 'Easy') {
			n = 0;
		} else if (difficulty == 'Medium') {
			n = 0.25;
		} else if (difficulty == 'Hard') {
			n = 0.5;
		}

		if (score < 5) {
			return n+0.1;
		} else if (score < 10) {
			return n+0.2;
		} else if (score < 15) {
			return n+0.3;
		} else if (score < 20) {
			return n+0.4;
		} else if (score < 25) { 
			return n+0.5;
		} else if (score < 30) {
			return n+0.6;
		} else if (score < 35) {
			return n+0.7;
		} else if (score < 40) {
			return n+0.8;
		} else if (score < 45) {
			return n+0.9;
		} else if (score < 50) {
			return n+1;
		} else if (score < 55) {
			return n+1.1;
		} else if (score < 60) {
			return n+1.2;
		} else if (score < 65) {
			return n+1.3;
		} else if (score < 70) {
			return n+1.4;
		} else if (score < 75) {
			return n+1.5;
		} else if (score < 80) {
			return n+1.6;
		} else if (score < 85) {
			return n+1.7;
		} else if (score < 90) {
			return n+1.8;
		} else if (score < 95) {
			return n+1.9;
		} else if (score < 100) {
			return n+2;
		} else if (score = 100) {
			endGame();
			die();
		}
 	}

	function getSpawnRate(score) {
		if (score < 5) {
			return 2000;
		} else if (score < 10) {
			return 1800;
		} else if (score < 15) {
			return 1600;
		} else if (score < 20) {
			return 1400;
		} else if (score < 25) { 
			return 1200;
		} else if (score < 100) {
			return 1000;
		}
	}

	function checkSub(n1, n2) {
		if (n1 < n2) {
			return false;
		} else {
			return true;
		}
	}
 
	function checkDiv(n1, n2) {
		if (n1 % n2 != 0) {
			if (n2 % n1 != 0) {
				return false;
			} else {
				return 'flip';	
			}
		} else {
			return true;
		}
	}
