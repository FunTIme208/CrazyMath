$(document).ready(function () {
    soundManager.setup({
        url: 'swf/',
        flashVersion: 9,
		preferFlash:false,
        onready: function () {
            var s = soundManager.createSound({
                id: 'HomeMenu',
                url: '../../sounds/homemenu.wav',
                volumen: 50,
            });
            loopSound(s);
        }
    });
    $("#Sakurua").hide().show("drop", 1000);

    $("#Easy").delay(1000).animate({top:"15px"},500).effect("bounce");
    $("#Normal").delay(2000).animate({top:"260px"},500).effect("bounce");
    $("#Difficult").delay(3000).animate({ top: "510px" }, 500).effect("bounce");

    $("input").hover(function () {
        $(this).animate({ width: "103%", height: "103%" }, 300);
    }, function () {
        $(this).animate({ width: "100%", height: "100%" }, 300);
    }).mousedown(function () {
        $(this).animate({ width: "97%", height: "97%" }, 300);
        soundManager.play("LevelButton");
    }).click(function () {
        var username=$(this).attr("name")
        var url = "../GamePage/GamePage.html?" + escape(username);
        location.href = url;
    });
});
