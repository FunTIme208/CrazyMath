$(document).ready(function () {
    soundManager.setup({
        url: 'swf/',
        flashVersion: 9,
		preferFlash:false,
        onready: function () {
            var s=soundManager.createSound({
                id: 'HomeMenu',
                url: 'sounds/homemenu.wav',
                volumen: 80,
                autoPlay: true
            });
            soundManager.createSound({
                id: 'HomeButton',
                url: 'sounds/button.wav',
                volumen: 60,
                autoPlay: false
            });
     loopSound(s);
		},
		ontimeout:function(){
			alert("SoundManager timeout!");
		}
    });
    $("img").hover(function () {
        var Imgstr = "images/button/" + $(this).attr("id") + "over.png";
        document.getElementById($(this).attr("id")).src = Imgstr;
    },
    function () {
        var Imgstr = "images/button/" + $(this).attr("id") + ".png";
        document.getElementById($(this).attr("id")).src = Imgstr;
    }).mousedown(function () {
        var Imgstr = "images/button/" + $(this).attr("id") + "on.png";
        document.getElementById($(this).attr("id")).src = Imgstr;
        soundManager.play("HomeButton");

    });
    $(".HButtons").click(function() {
        if ($(this).attr("id") == "button0") {
            location.href = "Pages/LevelIndex/LevelIndex.html";
        }else if ($(this).attr("id") == "button1") {
            location.href = "Pages/specification/specification.html";
        }else if ($(this).attr("id") == "button2") {
            location.href = "Pages/producer/producer.html";
        };
    });
})