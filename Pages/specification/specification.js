$(document).ready(function () {
    soundManager.setup({
        url: 'swf/',
        flashVersion: 9,
		preferFlash:false,
        onready: function () {
            var s=soundManager.createSound({
                id: 'Sspro',
                url: '../../sounds/sspro.wav',
                volumen: 80,
            });
            loopSound(s);
        }
    });
    $("#MulTable").hide();
    $("#AddTable").hide();
    $(".IButton").click(function () {
        $("#fontT").hide();
        if ($(this).attr("id") == "AddT") { $("#AddTable").show(1000); }
        else { $("#MulTable").show(1000); }
    });
    $(".iContainer").click(function () {
        $(this).hide();
        $("#fontT").show("blind",1000);
    });
    $("#toGame").click(function () {
        location.href = "../LevelIndex/LevelIndex.html";
    });
});