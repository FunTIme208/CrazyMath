$(document).ready(function () {
    soundManager.setup({
        url: 'swf/',
        flashVersion: 9,
		preferFlash:false,
        onready: function () {
            var s = soundManager.createSound({
                id: 'GameR',
                url: '../../sounds/gamerun.wav',
                volumen: 80,
            });
            loopSound(s);
        }
    });
    setTimeout(soundManager.play("GameR"),1000);
    var Level = 0;
	Level = getId();
    var L;
    if (Level == "easy") L = 0;
    else
        if (Level == "normal") L = 1;
        else L = 2;
    $("#Top").animate({ top: 0 }, 2000);
    $("#GameGrade").hide();
    $("#Sclock").hide().delay(2000).show("scale", 500);
    $("#help").hide().delay(2000).show("scale", 500);
    $("#start").hide();
    $("button").hover(function(){
        $(this).css("background-position","-102.5px 0px");
    },function(){
        $(this).css("background-position","0px 0px");
    }).mousedown(function(){
        $(this).css("background-position","-207.5px 0px");
        soundManager.play("Button");
    });
        $("#Yes").click(function () {
        location.href = "../specification/specification.html?"+escape(Level);
    });
    $("#No").click(function () {
        $("#help").hide();
        $("#start").show("scale", 500).click(function () {
            $(this).hide();
            Start(L);
        });
        soundManager.play("Button");
    });
});

var grade = 0;
var a;
var b;

function Start(L) {
    var n = 3;
    var clockStart = setInterval(function () {
        $("#Sclock").html(n);
        if (n == 0) {
            clearInterval(clockStart);
            $("#Sclock").hide();
            $("#GameGrade").show(10).html("<div>" + grade + "分</div>");
            soundManager.play("Ding");
            GameRun(Question(L), L);
        } else {
            soundManager.play("Dong");
        };
        --n;
    }, 1000);
}

function Question(Level) {
    TimeClock(5);
    var t;
    var wei;
    var c = new Array("+", "-", "×", "÷");
    var symbol;
    var result;
    if (Level == 0 || Level == 1) {
        if (grade < 6) {
            a = GeWei();
            b = GeWei();
        } else if (grade < 16) {
            a = LiangWei();
            b = GeWei();
        } else if (grade < 31) {
            a = GeWei();
            b = LiangWei();
        } else if (grade < 41) {
            a = GeWei();
            b = GeWei();
            if (Level == 0) {
                if (a - b < 0) {
                    t = a;
                    a = b;
                    b = t;
                }
            }
            if (Level == 1) {
                a = GeWei();
                b = GeWei();
                while (b == 0) {
                    b = GeWei();
                }
                a *= b;
            }
        } else {
            if (Level == 0) {
                a = LiangWei();
                b = GeWei();
                if (grade >= 56) {
                    symbol = c[Math.round(Math.random())];
                    if (symbol == c[0]) {
                        result = a + b;
                    } else {
                        result = a - b;
                    }
                }
            }
            if (Level == 1) {
                a = LiangWei();
                b = GeWei();
                while (b == 0) {
                    b = GeWei();
                }
                if (grade < 56) {
                    a *= b;
                } else {
                    symbol = c[Math.round(Math.random()) + 2];
                    if (symbol == c[3]) {
                        a *= b;
                        result = a / b;
                    } else {
                        result = a * b;
                    }
                }
            }
        }

        if (Level == 0) {
            if (grade < 31) {
                symbol = c[0];
                result = a + b;
            }
            else if (grade < 56) {
                symbol = c[1];
                result = a - b;
            }
        }
        if (Level == 1) {
            if (grade < 31) {
                symbol = c[2];
                result = a * b;
            }
            else if (grade < 56) {
                symbol = c[3];
                result = a / b;
            }
        }
    }

    if (Level == 2) {
        var tea;
        t = Math.round(Math.random() * 3);
        symbol = c[t];
        if (t == 0 || t == 1) {
            wei = Math.round(Math.random());
            if (wei == 0) { a = GeWei(); }
            else { a = LiangWei(); }
            wei = Math.round(Math.random());
            if (wei == 0) { b = GeWei(); }
            else { b = LiangWei(); }
            result = a + b;
            if (t == 1) {
                if (a - b < 0) {
                    tea = a;
                    a = b;
                    b = tea;
                }
                result = a - b;
            }
        }
        if (t == 2 || t == 3) {
            wei = Math.round(Math.random());
            if (wei == 0) a = GeWei();
            else a = LiangWei();
            b = GeWei();
            result = a * b;
            if (t == 3) {
                a = result;
                while (b == 0) {
                    b = GeWei();
                }
                result = a / b;
            }
        }
    }
    $("#Questions").html(a + symbol + b + "=?");
    return result;
}


function GeWei(){
    return Math.round(Math.random() * 10);
}

function LiangWei(){
    return Math.round(Math.random() * 10) * 10 + Math.round(Math.random() * 10);
}

function getId() {
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
    }
    return str;
}

function TimeClock(n) {
    var clock = document.getElementById('clock');
    var clk = clock.getContext('2d');
    var img = new Image();
    img.src = "../../images/flash/clock.png";

    clk.clearRect(84, 84, 206, 168);

    clk.save();
    img.onload = function () {
        clk.drawImage(img, 0, 12.5);

        clk.beginPath();
        clk.font = "bold 120px Arial";
        clk.textAlign = "center";
        clk.textBaseline = "middle";
        clk.fillStyle = "#000";
        clk.fillText(n, 103, 95);
        clk.closePath();

        clk.beginPath();
        clk.font = "bold 110px Arial";
        clk.textAlign = "center";
        clk.textBaseline = "middle";
        clk.fillStyle = "#DF00FF";
        clk.fillText(n, 103, 95);
        clk.closePath();
    }

    clk.restore();

    
    k = setInterval(function () {
        n--;

        clk.clearRect(84, 84, 206, 168);
        clk.save();
        clk.drawImage(img, 0, 12.5);

        clk.beginPath();
        clk.font = "bold 120px Arial";
        clk.textAlign = "center";
        clk.textBaseline = "middle";
        clk.fillStyle = "#000";
        clk.fillText(n, 103, 95);
        clk.closePath();

        clk.beginPath();
        clk.font = "bold 110px Arial";
        clk.textAlign = "center";
        clk.textBaseline = "middle";
        clk.fillStyle = "#DF00FF";
        clk.fillText(n, 103, 95);
        clk.closePath();
        clk.restore();
        if (n == 3) {
            soundManager.play("Dong");
        } else if (n == 2) {
            soundManager.play("Dong");
        } else if (n == 1) {
            soundManager.play("Dong");
        } else if (n == 0) {
            soundManager.play("Ding");
            $("#Questions").html("<div>Time Up!!<div>");
            clearInterval(k);
            GameOver();
        }


    }, 1000);

}
var BearImg = new Image();
var BeeImg = new Image();
var ctx;
var screenWidth;   
var screenHeight; 
var honeyImg = new Image();
var gameloopId;
var gameRunning = false;
var number = new Array();

function GameObject() {
    this.x = 0;    
    this.y = 0;
    this.image = null;     
}

function Bear() { };
Bear.prototype = new GameObject();
var Bear = new Bear();   

function Animal() {};
Animal.prototype = new GameObject();
Animal.prototype.angle = 0;
Animal.prototype.horizontalSpeed = 0;
Animal.prototype.verticalSpeed = 0;
var animal0 = new Animal();
var animal1 = new Animal();
var animal2 = new Animal();

var prizes = new Array();
function Prize() { };
Prize.prototype = new GameObject();
Prize.prototype.number = 0;


function GameLoop(result,L) {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    ctx.save();
    ctx.drawImage(Bear.image, Bear.x, Bear.y);
    DrawPrizes();
    ctx.restore();

    HasAnimalHitPrize(result,L);
    ctx.save()
    animal0.x += animal0.horizontalSpeed;
    animal0.y += animal0.verticalSpeed;
    animal0.angle += 2;
    ctx.translate(animal0.x + (animal0.image.width / 2), animal0.y + (animal0.image.height / 2));
    ctx.rotate(animal0.angle * Math.PI / 180);
    ctx.drawImage(animal0.image, -(animal0.image.width / 2), -(animal0.image.height / 2));
    ctx.restore();
    HasAnimalHitEdge(animal0);
    HasAnimalHitBear(animal0,L,result);

    ctx.save()
    animal1.x += animal1.horizontalSpeed;
    animal1.y += animal1.verticalSpeed;
    animal1.angle += 2;
    ctx.translate(animal1.x + (animal1.image.width / 2), animal1.y + (animal1.image.height / 2));
    ctx.rotate(animal1.angle * Math.PI / 180);
    ctx.drawImage(animal1.image, -(animal1.image.width / 2), -(animal1.image.height / 2));
    ctx.restore();
    HasAnimalHitEdge(animal1);
    HasAnimalHitBear(animal1);

    ctx.save()
    animal2.x += animal2.horizontalSpeed;
    animal2.y += animal2.verticalSpeed;
    animal2.angle += 2;
    ctx.translate(animal2.x + (animal2.image.width / 2), animal2.y + (animal2.image.height / 2));
    ctx.rotate(animal2.angle * Math.PI / 180);
    ctx.drawImage(animal2.image, -(animal2.image.width / 2), -(animal2.image.height / 2));
    ctx.restore();
    HasAnimalHitEdge(animal2);
    HasAnimalHitBear(animal2);
}

function LoadImages() {
    BearImg.src = "../../images/gamepick/Bear.png"; 
    BeeImg.src = "../../images/gamepick/Bee.png";
    honeyImg.src = "../../images/gamepick/honey.png";

    Bear.image = BearImg;
    animal0.image = BeeImg;
    animal1.image = BeeImg;
    animal2.image = BeeImg;
}

function HasAnimalHitEdge(animal) {
    if (animal.x > screenWidth - animal.image.width) {
        if (animal.horizontalSpeed > 0)
            animal.horizontalSpeed = -animal.horizontalSpeed;
    }
    if (animal.x < -10) {
        if (animal.horizontalSpeed < 0)
            animal.horizontalSpeed = -animal.horizontalSpeed;
    }
    if (animal.y > screenHeight - animal.image.height) {
        animal.verticalSpeed = -animal.verticalSpeed;
    }
    if (animal.y < 0) {
        animal.verticalSpeed = -animal.verticalSpeed;
    }
}

function AddEventHandlers() {
    $("#GameRun").mousemove(function (e) {
        Bear.x = e.pageX - (Bear.image.width / 2) - ((screen.availWidth - 1024) / 2);
        Bear.y = e.pageY - (Bear.image.height / 2) - ((screen.availHeight - 768) / 2)-168;
    });
	var CGame = document.getElementById("Game");
	CGame.addEventListener('touchmove',function(event){
		if(event.targetTouches.length==1){
			var touch = event.targetTouches[0];
            Bear.x = touch.pageX - (Bear.image.width / 2) - ((screen.availWidth - 1024) / 2);
            Bear.y = touch.pageY - (Bear.image.height / 2) - ((screen.availHeight - 768) / 2)-168;
		}
	},false);
}

function CheckIntersect(object1, object2, overlap) {
    A1 = object1.x + overlap;
    B1 = object1.x + object1.image.width - overlap;
    C1 = object1.y + overlap;
    D1 = object1.y + object1.image.height - overlap;

    A2 = object2.x + overlap;
    B2 = object2.x + object2.image.width - overlap;
    C2 = object2.y + overlap;
    D2 = object2.y + object2.image.width - overlap;

    if (A1 > A2 && A1 < B2
       || B1 > A2 && B1 < B2) {
        if (C1 > C2 && C1 < D2
       || D1 > C2 && D1 < D2) {

            return true;
        }

    }
    return false;
}

function HasAnimalHitBear(animal, L, result) {
    if (CheckIntersect(animal, Bear, 10)) {
        if (HasAnimalHitPrize(result)) {
            GameOn(L);
        } else {
            soundManager.play("Bbover");
            GameOver();
        }
    }
}

function InitPrizes(result) {
    var count = 1;
    var position = new Array();
    for (var i = 0; i < 3; i++) {
        position[i] = Math.round(2 * Math.random());
        if (i == 1) {
            while (position[1] == position[0]) { position[1] = Math.round(2 * Math.random()); }
        }
        if (i == 2) {
            while (position[2] == position[0] || position[2] == position[1]) { position[2] = Math.round(2 * Math.random()); }
        }
    }
    prize = new Prize();
    prize.image = honeyImg;
    prize.x = Math.round(241 * Math.random()) + position[0] * 341;
    prize.y = Math.round(480 * Math.random());
    prizes[0] = prize;
    prizes[0].number = result;

    var h;
    for (var n = 0; n < 2; n++) {
        prize = new Prize();
        prize.image = honeyImg;
        prize.x = Math.round(241 * Math.random()) + position[count] * 341;
        prize.y = Math.round(480 * Math.random());


        prizes[count] = prize;
        h = Math.round(Math.random());
        if (h == 0) { prizes[count].number = result + Math.round(20 * Math.random()); }
        else { prizes[count].number = result - Math.round(20 * Math.random()); }

        for (var j = 0; j < count; j++) {
            while (prizes[count].number == prizes[j].number || prizes[count].number < 0) { prizes[count].number = Math.round(50 * Math.random()); }
        }

        count++;
    }
}

function DrawPrizes() {
    for (var x = 0; x < prizes.length; x++) {
        currentPrize = prizes[x];
        if (!currentPrize.hit) {
            ctx.drawImage(currentPrize.image, prizes[x].x, prizes[x].y);
            ctx.font = "bold 50px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(prizes[x].number, prizes[x].x + 50, prizes[x].y + 63);
        }
    }
}

function HasAnimalHitPrize(result, L) {
    for (var x = 0, count = 0; x < prizes.length; x++) {
        var prize = prizes[x];
        if (!prize.hit) {
            if (CheckIntersect(prize, Bear, 10)) {
                prize.hit = true;
                if (prize.number == result) {
                    grade++;
                    GameOn(L);
                    $("#GameGrade").show(10).html("<div>" + grade + "分</div>");
                    return true;
                }
                else { GameOver(); }
            }
        }
    }
}

function GameOver() {
    gameRunning = false;
    clearInterval(gameloopId);
    clearInterval(Question);
    clearInterval(k);
    soundManager.stop("GameR");
    soundManager.play("Gameover");
    if (grade < 6) {
        $("#start").show(500).css("background-image", "url('img/gameover0.png')");
    } else if (grade < 16) {
        $("#start").show(500).css("background-image", "url('img/gameover2.png')");
    } else if (grade < 31) {
        $("#start").show(500).css("background-image", "url('img/gameover3.png')");
    } else if (grade < 41) {
        $("#start").show(500).css("background-image", "url('img/gameover4.png')");
    } else if (grade < 56) {
        $("#start").show(500).css("background-image", "url('img/gameover5.png')");
    } else {
        $("#start").show(500).css("background-image", "url('img/gameover6.png')");
    }
    $("#start").click(function () {
        location.href = "../LevelIndex/LevelIndex.html";
    });
}

function GameOn(L) {
    gameRunning = false;
    clearInterval(gameloopId);
    clearInterval(Question);
    clearInterval(k);
    soundManager.play("Gameon");
    $("#Sclock").show("scale", 500).html("");
    $("#start").show("scale", 500).css("background-image","url('img/gameon.png')");
}

//初始化   
function GameRun(result,L) {
    AddEventHandlers();
    LoadImages();

    ctx = document.getElementById("Game").getContext("2d");       
    screenWidth = parseInt($("#Game").attr("width")); 
    screenHeight = parseInt($("#Game").attr("height"));
	
    Bear.x = 210;  
    Bear.y = -150;

    animal0.x = Math.random() * 440;
    animal0.y = Math.random() * 300;
    animal1.x = Math.random() * 440;
    animal1.y = Math.random() * 300;
    animal2.x = Math.random() * 440;
    animal2.y = Math.random() * 300;
    animal0.horizontalSpeed = 2;
    animal0.verticalSpeed = -2;
    animal1.horizontalSpeed = 4;
    animal1.verticalSpeed = -4;
    animal2.horizontalSpeed = 6;
    animal2.verticalSpeed = -6;
    InitPrizes(result);
    gameloopId = setInterval(GameLoop, 10, result,L);

}