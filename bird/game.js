var width = 640, height = 480;
var pjs = new PointJS('2D', width, height);

var vk_inited = false;
VK.init(function() {
	vk_inited = true; 
}, function() {
}, '5.60');

var log = pjs.system.log;
var game = pjs.game;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;
var p = pjs.vector.point;
var s = pjs.vector.size;
var mouse = pjs.mouseControl;
mouse.initMouseControl();
// var key = pjs.keyControl;
//key.initKeyControl();
var score = 0;
var bank = 0;
var bg = [], oldB;

var aFire = pjs.wAudio.newAudio('wing.wav');
var aDie = pjs.wAudio.newAudio('die.wav');
var aPoint = pjs.wAudio.newAudio('point.wav');
var name = 'Name';
var urlPhoto = 'foto';

var coin = game.newImageObject({
file: 'coin.png',
x: 80, y: 30,
scale: 0.7,
});

var avatar = game.newImageObject({
file: 'ava.png',
x: 5, y: 5,
});

OOP.forInt(3, function (i) {
	oldB = game.newImageObject({
		file : 'bg1.png',
		h : height,
		onload : function () {
			this.x = i * this.w;
		}
	});
	bg.push(oldB);
});

var drawBG = function () {
	OOP.forArr(bg, function (el) {
		el.draw();
		el.move(p(-1, 0));
		if (el.x + el.w < 0) {
			el.x = oldB.x + oldB.w - 3;
			oldB = el;
		}
	});
};

var gr = [], oldG;
OOP.forInt(25, function (i) {
	oldG = game.newImageObject({
		file : 'gr1.png',
		w : width / 6,
		onload : function () {
			this.x = i * this.w;
			this.y = -this.h + height;
		}
	});
	gr.push(oldG);
});

var drawGR = function () {
	OOP.forArr(gr, function (el) {
		el.draw();
		el.move(p(-1.5, 0));
		if (el.x + el.w < 0) {
			el.x = oldG.x + oldG.w - 3;
			oldG = el;
		}
	});
};

var bird = game.newAnimationObject({
	w : 80, h : 73,
	positionC : p(width / 2, height / 2),
	scale : 0.8,
	animation : pjs.tiles.newAnimation('73_80_4.png', 80, 73, 4),
	delay : 2.5,
	userData : {
		dy : 0
	}
});

bird.setBox({
	offset : p(10, 5),
	size : s(-20, -10)
});

// get VK API	
var getUserName = function() {
VK.api('users.get',{'fields': 'photo_50'},function(data){
	name = data.response[0].first_name;
	urlPhoto = data.response[0].photo_50;
	
});
};

var getAva = function(ss) {
	var Avatar = game.newImageObject({
             file: ss,
             x:16 , y:16
             });
	Avatar.draw();
	brush.drawText({
			x : 80,
			y : 10,
			text : name,
			size : 20,
			color : 'white',
			font : 'myFont',
		});
};
var goPlay = game.newImageObject({
      file : 'play.png',
      x: 349, y: 363,
      //scale : 0.4
    });

var mainMenu = game.newImageObject({
      file : 'mainmenu.png',
      x: 163, y: 363,
      //scale : 0.4
    });
var vk = game.newImageObject({
      file : 'vk.png',
      x: 440, y: 363,
      //scale : 0.4
    });
var tops = game.newImageObject({
      file : 'top.png',
      x: 255, y: 363,
      //scale : 0.4
    });
var com = game.newImageObject({
      file : 'coment.png',
      x: 420, y: 345,
      //scale : 0.4
    });
var proba = game.newImageObject({
      file : 'proba.png',
      x: 0, y: 0,
      scale : 1
    });

var Menu = function () {
	getUserName();
	this.update = function () {
		drawBG();
		bird.draw();
		//bird.drawStaticBox();
		drawGR();
		brush.drawText({
			x : width / 2,
			y : height / 4,
			text : 'FlappyDevil ',
			size : 50,
			color : 'white',
			font : 'myFont',
			align : 'center'
		});
		if (mouse.isPress('LEFT')) {
			aFire.play();
			return game.setLoop('game');
		}
	};
};



var Game = function () {
	var blocks = [], oldBlock = false;
	var space = 80;
    
    var moneta = [], oldMoneta = false;
    var space = 100;
    
//moneta
    var addMoneta = function (y) {
		var dX = oldMoneta ? oldMoneta.mon.x + pjs.math.random(200, 900) : width-50;
		
		var m = game.newImageObject({
			file : 'moneta.png',
			x : dX, y : 240,
			 w : width / 20,
		});
		var objM = {
			'mon' : m,
		}
		oldMoneta = objM;
		moneta.push(objM);
	};
	//moneta

	var addBlock = function (y) {
		var dX = oldBlock ? oldBlock.top.x + pjs.math.random(200, 900) : width;
		var o = game.newImageObject({
			file : 'block1.png',
			x : dX, y : 0,
			w : width / 10,
			angle : 180,
			onload : function () {
				this.y = -this.h + y - space;
			}
		});
		var o2 = game.newImageObject({
			file : 'block1.png',
			x : dX, y : 0,
			w : width / 10,
			onload : function () {
				this.y = y + space;
			}
		});
	

		var obj = {
			'top' : o,
			'bottom' : o2
			
		}
		oldBlock = obj;
		blocks.push(obj);
	};

	var drawBlocks = function () {
		OOP.forArr(blocks, function (el) {
			el.top.draw();
			el.bottom.draw();
			
			el.top.move(p(-1.5, 0));
			el.bottom.move(p(-1.5, 0));
			el.top.setBox({
			offset : p(30, 5),
			size : s(-50, -10)
			});
			el.bottom.setBox({
			offset : p(30, 5),
			size : s(-50, -10)
			});
			
			if (el.top.x + el.top.w < 0) {
				el.top.x = el.bottom.x = oldBlock.top.x + oldBlock.top.w + pjs.math.random(200, 900);
				oldBlock = el;
				//score += 1;
			}
			
       
		    if (el.top.x < width/2 && el.top.x > width/2 - 2 ) { score +=1;}

			if (el.top.isInCamera()) {
				if (el.top.isIntersect(bird)) {
					aDie.play();
					gameOver();
				}
			}
			if (el.bottom.isInCamera()) {
				if (el.bottom.isIntersect(bird)) {
					aDie.play();
					gameOver();
				}
			}
			if (bird.y < 0) {
				aDie.play();
				gameOver();
			}
			if (bird.y + bird.h > height) {
				aDie.play();
				gameOver();
			}
             
             

		});
	};



var drawMoneta = function () {
		OOP.forArr(moneta, function (el) {
			el.mon.draw();
			el.mon.move(p(-1.5, 0));
		
			
			if (el.mon.x + el.mon.w < 0) {
				el.mon.x = oldMoneta.mon.x + oldMoneta.mon.w + pjs.math.random(200, 900);
				oldMoneta = el;
			}
			
			if (el.mon.isInCamera()) {
				if (el.mon.isIntersect(bird) ) {
					aPoint.play();
					el.mon.x = -300;					
					bank+=1;
				}
			}
		});
	};





	var gameOver = function () {
		game.setLoop('GameOver');
	};



	this.update = function () {
		drawBG();
		bird.draw();
		bird.dy += 0.5;
		bird.y += bird.dy;
		bird.angle = bird.dy;
		if (mouse.isPress('LEFT')) {
			aFire.play();
			bird.dy = -8;
		}
		
		drawMoneta();
		drawBlocks();
		drawGR();
		coin.draw();
		getAva(urlPhoto);
		avatar.draw();
		brush.drawText({
			x : 130,
			y : 38,
			text : bank,
			size : 16,
			color : 'white',
			font : 'myFont',
			align : 'center'
		});

		brush.drawText({
			x : width / 2,
			y : height / 10,
			text : score,
			size : 50,
			color : 'white',
			font : 'myFont',
			align : 'center'
		});
	};

	this.entry = function () {
		bird.dy = 0;
		blocks = [], oldBlock = false;
		moneta = [], oldMoneta = false;
		OOP.forInt(5, function () {
			addBlock(pjs.math.random(space*2, height-space*2));
		});
		OOP.forInt(5, function () {
			addMoneta(pjs.math.random(space*2, height-space*2));
		});
		bird.setPositionC(p(width / 2, height / 2));
		score = 0;
	};
};
game.newLoopFromClassObject('menu', new Menu());
game.newLoopFromClassObject('game', new Game());


var pushVK = game.newTextObject({
	text : 'На стену',
	positionC : p(width/2, height/2),
	font : 'myFont',
	size : 30,
	color : '#254364'
});

game.newLoop('GameOver', function () {
	game.clear();
	drawBG();
	drawGR();
    
    proba.draw();
    goPlay.draw();
    mainMenu.draw();
    vk.draw();
    tops.draw();

	brush.drawText({
		x : 330,
		y : 80,
		text : '',
		size : 30,
		color : 'white',
		font : 'myFont',
		align : 'center',
		

	});

	brush.drawText({
		x : 320,
		y : 210,
		text : 'Ваш счет: ' + score,
		size : 30,
		color : 'white',
		font : 'myFont',
		align : 'center',
		

	});
		brush.drawText({
		x : 310,
		y : 250,
		text : 'Баланс: ' + bank,
		size : 20,
		color : 'white',
		font : 'myFont',
		align : 'center',
		

	});
    
    if (mouse.isInObject(vk))
    {
      com.draw();
    }
    
	if (mouse.isPeekObject('LEFT', goPlay)) {
		game.setLoop('game');
	}

	if (mouse.isPeekObject('LEFT', vk)) {
		VK.api('wall.post', {
			'message' : 'В приложении FlappyDevil я набрал очков: ' + score + '\n Попробуй и ты: https://vk.com/app5760810',
			'attachments' : 'photo-134923772_456239017'
		}, function (data) {
			log('Success');
		});
	}

	if (mouse.isPeekObject('LEFT', mainMenu)) {
		bird.setPositionC(p(width / 2, height / 2));
		bird.dy = 0;
		game.setLoop('menu');
	}
});
game.startLoop('menu');
