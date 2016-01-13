
var canvas, context, height, width, frame = 0, maxJumpQntd = 3, estadoAtual, obsJumped = 0;

var states = {
		jogar   : 0,
		jogando : 1,
		perdeu  : 2
	},

	floor = {
		y          : 550,
		height     : 50,
		background : '#ffdf70',
		draw       : function() {
			context.fillStyle = this.background;
			context.fillRect (0, this.y, width, this.height);
		}
	},
	block = {
		x          : 50,
		y          : 0,
		height     : 50,
		width      : 50,
		background : '#fff',
		gravity    : 1.5,
		speed      : 0,
		jumpPower  : 20,
		jumpQntd   : 3,

		update : function(){
			this.speed += this.gravity;
			this.y     += this.speed;

			// Parar a queda do bloco ao tocar o chao
			if (this.y > floor.y - this.height) {
				this.y = floor.y - this.height;

				this.speed = 0;
				
				// Zera o numero de pulos quando o bloco encosta no chao
				this.jumpQntd = 0;
			};
		},

		jump : function(){

			if (this.jumpQntd < maxJumpQntd) {
				this.speed = - this.jumpPower;
				this.jumpQntd ++;
			};			
		},

		draw : function() {
			context.fillStyle = this.background;
			context.fillRect (this.x, this.y, this.width, this.height);
		}
	},

	obstaculos = {
		_obs   : [],
		colors : ["#ffbc1c","#ff1c1c","#ff8564","#ffbc9d","#ffbc7a"],
		speed  : 5,
		insertTime: 0,

		insert : function(){
			this._obs.push({
				x      : width,
				width  : 30 + Math.floor(20 * Math.random()),
				height : 30 + Math.floor(60 * Math.random()),
				color  : this.colors[Math.floor( 5 * Math.random() )]
			})

			console.log(this.speed);

			this.insertTime = 50 + Math.floor((50 - (1.1 * this.speed)) * Math.random());

			 console.log(this.insertTime);
			
		},

		update : function() {

			//console.log("inset time: " + this.insertTime);

			if (this.insertTime == 0) {
				this.insert();
			} else{
				this.insertTime--;
			};

			for (i = 0, len = this._obs.length; i < len; i++) { 
			    var obs = this._obs[i];
			    obs.x -= this.speed; 
			    
			    if(block.x < obs.x + obs.width && block.x + block.width >= obs.x && block.y + block.height >= floor.y - obs.height ){
			    	
			    	estadoAtual = states.perdeu;
			    	this.speed  = 5;
			    
			    } else if(obs.x <= -obs.width) {

			    	obsJumped++;

			    	console.log("pulamos: " + obsJumped);

			    	this._obs.splice(i,1);	
			    	len--;
			    	i--;
			    	this.speed += 0.2;
			    };
			}
		},

		draw : function() {
			for (i = 0, len = this._obs.length; i < len; i++) { 
			    var obs = this._obs[i];
			    context.fillStyle = obs.color;
				context.fillRect (obs.x, floor.y - obs.height, obs.width, obs.height);
			}
		},

		clearObs: function(){
			this._obs = [];

		}

	}


function action(event){

	if (estadoAtual == states.jogando) {
		block.jump();

	} else if(estadoAtual == states.jogar){
		estadoAtual = states.jogando;
	
	} else if(estadoAtual == states.perdeu){
		estadoAtual = states.jogar;
		obstaculos.clearObs();
		block.y = 0;

	}

}

function draw(){
	context.fillStyle = "#50beff";
	context.fillRect(0,0, width, height);

	if(estadoAtual == states.jogar) {
		context.fillStyle = "green";
		context.fillRect(width/2 - 50, height/2 - 50, 100, 100);
	
	} else if(estadoAtual == states.perdeu) {
		context.fillStyle = "red";
		context.fillRect(width/2 - 50, height/2 - 50, 100, 100);
	
	} else if(estadoAtual == states.jogando) {
		//Desenha obstaculos
		obstaculos.draw();
	} 

	//Desenha chão
	floor.draw();

	//Desenha bloco
	block.draw();
}

// Atualiza frame
function update(){
	frames++;

	// Atualiza gravidade do bloco
	block.update();

	if(estadoAtual == states.jogando) {
		// Atualiza obstaculos
		obstaculos.update();
	} 

	// else if(estadoAtual == states.perdeu){
		
	// }
}

// Roda jogo
function run(){
	update();
	draw();

	window.requestAnimationFrame(run);
}

function main(){

	height = window.innerHeight;
	width  = window.innerWidth;

	if (width > 600) {
		height = 600;
		width  = 600;
	};

	console.log('altura' + height);

	canvas = document.getElementById("canvas_game");
	canvas.width  = width;
	canvas.height = height;
	canvas.style.border = "1px solid #000";

	context = canvas.getContext("2d");
	document.body.appendChild(canvas);

	document.addEventListener("mousedown", action);

	estadoAtual = states.jogar

	run();
}



//inicializa game
window.onload = function() {
  main();
};