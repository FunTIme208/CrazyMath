$(document).ready(function () {
    soundManager.setup({
        url: 'swf/',
        onready: function () {
            soundManager.createSound({
                id: 'LevelButton',
                url: '../../sounds/LevelButton.wav',
                volumen: 60,
                autoPlay: false
            });
            soundManager.createSound({
                id: 'Button',
                url: '../../sounds/button.wav',
                volumen: 60,
                autoPlay: false
            });
            soundManager.createSound({
                id: 'Bbover',
                url: '../../sounds/bbover.wav',
                volumen: 60,
                autoPlay: false
            });
            soundManager.createSound({
                id: 'Ding',
                url: '../../sounds/ding.wav',
                volumen: 60,
                autoPlay: false
            });
            soundManager.createSound({
                id: 'Dong',
                url: '../../sounds/dong.wav',
                volumen: 60,
                autoPlay: false
            });
            soundManager.createSound({
                id: 'Gameon',
                url: '../../sounds/gameon.wav',
                volumen: 60,
                autoPlay: false
            });
            soundManager.createSound({
                id: 'Gameover',
                url: '../../sounds/gameover.wav',
                volumen: 60,
                autoPlay: false
            });
        }
    });
    $("#back,#toGame").hover(function () {
        var Imgstr = "../../images/button/" + $(this).attr("id") + "over.png";
        document.getElementById($(this).attr("id")).src = Imgstr;
    },
    function () {
        var Imgstr = "../../images/button/" + $(this).attr("id") + ".png";
        document.getElementById($(this).attr("id")).src = Imgstr;
    }).mousedown(function () {
        var Imgstr = "../../images/button/" + $(this).attr("id") + "on.png";
        document.getElementById($(this).attr("id")).src = Imgstr;
        soundManager.play("Button");
    }).click(function () {
        location.href = "../../index.html";
    });
    $("button").click(function () {
        soundManager.play("Button");
    });
})

function loopSound(sound) {
    sound.play({
        onfinish: function () {
            loopSound(sound);
        }
    });
}