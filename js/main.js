let video = $("#myvideo");
let nav = $('#nav');
let playVideo = $("#play");
let timerVideo = $("#timerInput");
let screenVideo = $("#screen");
let soundVideo = $("#soundInput");
let miniVideo = $("#miniScreen");
let autoPlayVideo = $("#autoPlay");
let timerCurrent;
let timerScreen;
let timerMove;

let player = [
    { "play": false },
    { "screen": false },
    { "miniScreen": false },
    { "autoPlay": false }
]

function play() {
    if (player[0].play == false) {
        video[0].play();
        player[0].play = true;
        playVideo.css({
            "background": "url(../icon/pause-solid.svg)"
        })
        timerCurrent = setInterval(() => {
            timer2();
        }, 1000);
        timerMove = setInterval(() => {
            nav.css({
                "display": "none"
            })
        }, 5000);
        video.on("mousemove", function () {
            nav.css({
                "display": "inline-block"
            })
            clearTimeout(timerMove);
            timerMove = setInterval(() => {
                nav.css({
                    "display": "none"
                })
            }, 5000);
        })
        nav.on("mousemove", function () {
            nav.css({
                "display": "inline-block"
            })
            clearTimeout(timerMove);
            timerMove = setInterval(() => {
                nav.css({
                    "display": "none"
                })
            }, 5000);
        })

    } else {
        video[0].pause();
        player[0].play = false;
        playVideo.css({
            "background": "url(../icon/play-solid.svg)"
        })
        clearTimeout(timerCurrent);
        clearTimeout(timerMove);
        nav.off('mousemove');
        nav.unbind('mousemove');
        video.off('mousemove');
        video.unbind('mousemove');
    }
}
function sound(value) {
    video.prop('muted', false)
    let volume = video.prop("volume");

    if (value == "mouse") {
        if ($("#soundInput[type=range]").val() == 10) {
            video.prop("volume", 1);
            localStorage.setItem('sound', 1);
        } else {
            video.prop("volume", "0." + $("#soundInput[type=range]").val());
            localStorage.setItem('sound', "0." + $("#soundInput[type=range]").val());
        }
    } else if (value == "down") {
        soundValue = String(volume).substring(2, 3) - 1;
        if (volume == 1) {
            video.prop("volume", "0.9");
            $("#soundInput[type=range]").val(9);
        } else if (volume == 0) {

        } else {
            video.prop("volume", "0." + soundValue);
            $("#soundInput[type=range]").val(soundValue);
        }
        if ($("#soundInput[type=range]").val() == 10) {
            localStorage.setItem('sound', 1);
        } else {
            localStorage.setItem('sound', "0." + $("#soundInput[type=range]").val());
        }
    } else if (value == "up") {
        if (volume == 1) {
        } else {
            soundValue = parseInt(String(volume).substring(2, 3)) + 1;
        }
        if (soundValue == 1) {
        } else if (volume == 0) {
            video.prop("volume", "0.1");
            $("#soundInput[type=range]").val(1);
        } else if (soundValue == 10) {
            video.prop("volume", 1.0);
            $("#soundInput[type=range]").val(10);
        } else {
            video.prop("volume", "0." + soundValue);
            $("#soundInput[type=range]").val(soundValue);
        }
        if ($("#soundInput[type=range]").val() == 10) {
            localStorage.setItem('sound', 1);
        } else {
            localStorage.setItem('sound', "0." + $("#soundInput[type=range]").val());
        }
    }
}
function timer() {
    let timer = video[0].duration / 1000;
    video[0].currentTime = $("#timerInput[type=range]").val() * timer;
}
function timer2() {
    let timer = video[0].duration / 1000;
    let tempo2 = video[0].currentTime / timer;
    $("#timerInput[type=range]").val(tempo2);
    if (video[0].currentTime.toFixed(0) >= 60) {
        timerSegundos = parseInt(video[0].currentTime / 60) * 60;
        timerTotalSegundos = parseInt(video[0].currentTime - timerSegundos);
        if (String(timerTotalSegundos).length == 1) {
            $("#timerLive").html(parseInt(video[0].currentTime / 60) + ":0" + timerTotalSegundos);
        } else {
            $("#timerLive").html(parseInt(video[0].currentTime / 60) + ":" + timerTotalSegundos);
        }
    } else {
        console.log(parseInt(video[0].currentTime) / 60);
        if (video[0].currentTime.toFixed(0).length == 1) {
            $("#timerLive").html("0:0" + video[0].currentTime.toFixed(0));
        } else {
            $("#timerLive").html("0:" + video[0].currentTime.toFixed(0));
        }
    }
}

function screen() {
    if (player[1].screen == false) {
        nav.css({
            "width": "100%"
        })
        $("#main").css({
            "width": "100%"
        })
        video.css({
            "width": "99%"
        })
        $('body').css({
            "overflow": "hidden"
        })
        miniVideo.css({
            "display": "none"
        })
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        player[1].screen = true;
        timerScreen = setInterval(() => {
            if (document.fullscreenElement == null) {
                screen();
            }
        }, 100);
    } else {
        miniVideo.css({
            "display": "inline-block"
        })
        if (player[2].miniScreen == true) {
            nav.css({
                "width": "100%"
            })
            $("#main").css({
                "width": "100%"
            })
            video.css({
                "width": "87%"
            })
        } else {
            nav.css({
                "width": "750px"
            })
            video.css({
                "width": "750px"
            })
            $('body').css({
                "overflow": "auto"
            })
        }
        if (document.fullscreenElement == null) {
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        player[1].screen = false;
        clearTimeout(timerScreen);
    }
}

function miniScreen() {
    if (player[2].miniScreen == false) {
        nav.css({
            "width": "100%"
        })
        $("#main").css({
            "width": "100%"
        })
        video.css({
            "width": "87%"
        })
        player[2].miniScreen = true;
    } else {
        nav.css({
            "width": "750px"
        })
        video.css({
            "width": "750px"
        })
        $('body').css({
            "overflow": "auto"
        })
        player[2].miniScreen = false;
    }
}

buttonPlayer();
function buttonPlayer() {
    video.on('mouseup', function () {
        play();
    });
    playVideo.on('mouseup', function () {
        play();
    });
    soundVideo.on('mouseup', function () {
        sound('mouse');
    });
    timerVideo.on('mouseup', function () {
        timer();
        timer2();
    });
    screenVideo.on('mouseup', function () {
        screen();
    });
    miniVideo.on('mouseup', function () {
        if (player[1].screen == false) {
            miniScreen();
        }
    });
    autoPlayVideo.on('mouseup', function () {
        if (player[3].autoPlay == false) {
            $("#autoPlay i").css({
                "left": "50%"
            })
            $("#autoPlay span").css({
                "background": "rgba(1, 204, 255, 0.5)"
            })
            player[3].autoPlay = true;
            localStorage.setItem("autoPlay", true);
        } else {
            $("#autoPlay i").css({
                "left": "30%",
            })
            $("#autoPlay span").css({
                "background": "rgba(50, 48, 59,1)"
            })
            player[3].autoPlay = false;
            localStorage.setItem("autoPlay", false);
        }
    });
    if (localStorage.getItem("autoPlay") == "true") {
        $("#autoPlay i").css({
            "left": "50%"
        })
        $("#autoPlay span").css({
            "background": "rgba(1, 204, 255, 0.5)"
        })
        player[3].autoPlay = true;
        play();
        setTimeout(() => {
            if (video[0].currentTime == 0) {
                play();
            }
        }, 3000);
    }
    if (localStorage.getItem('sound') == 1) {
        $("#soundInput[type=range]").val(10);
    } else {
        $("#soundInput[type=range]").val(localStorage.getItem('sound').replace('0.', ''));
        video.prop("volume", localStorage.getItem('sound'));
    }
    setTimeout(() => {
        $("body").on("keyup", function (e) {
            if (e.keyCode == 70) {
                screen();
            };
            if (e.keyCode == 32) {
                play();
            };
            if (e.keyCode == 38) {
                sound('up');
            };
            if (e.keyCode == 40) {
                sound('down');
            };
            if (e.keyCode == 37) {
                video[0].currentTime = video[0].currentTime - 10;
                timer2();
            }
            if (e.keyCode == 39) {
                video[0].currentTime = video[0].currentTime + 10;
                timer2();
            }
        });
    }, 500);
}