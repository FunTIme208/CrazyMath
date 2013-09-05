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
        soundManager.play("Button");
    });
})