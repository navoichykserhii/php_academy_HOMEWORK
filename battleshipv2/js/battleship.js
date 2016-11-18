var field = document.getElementById('battleship_field'),
    attempts = document.getElementById('attempts'),
    win = document.getElementById("you_win"),
    battleTime = document.getElementById("battle_time"),
    percentHits = document.getElementById('percents_hits'),
    attentionMsg = document.getElementById('alert'),
    madeShots = new Array(),
    out = false,
    isSunk = false,
    startStopwatchOnce = false,
    soundEffects = false,
    btnSoundEffectsPress = false,
    countAttempt = 0,
    countHits = 0,
    shipPosition = new Array(7),
    audio = new Audio();

/* Время боя, секундомер */
var timeStr = document.getElementById("timer").innerHTML,
    arrTime = timeStr.split(":"),
    h = arrTime[0],
    m = arrTime[1],
    s = arrTime[2];
function stopwatch() {
     if(!isSunk){
        if (s < 59) {
            ++s;
            if (s < 10) {
                s = "0" + s;
            }
        }
        else if (m < 59) {
            ++m;
            if (m < 10) {
                m = "0" + m;
            }
            s = "0" + 0;
        }
        else {
            ++h;
            if (h < 10) {
                h = "0" + h;
            }
            m = "0" + 0;
            s = "0" + 0;
        }
        document.getElementById("timer").innerHTML = h + ":" + m + ":" + s;
    }
    setTimeout(stopwatch, 1000);
}

/* Задаем позиции кораблей */
function setPosition(){
    var position =  Math.floor(Math.random()*7);
    shipPosition[position] = 1;
    if(position > 4){
        shipPosition[position - 1] = 1;
        shipPosition[position - 2] = 1;
    }
    else{
        shipPosition[position + 1] = 1;
        shipPosition[position + 2] = 1;
    }
}
/* Начать заново игру */
function restart(){
    isSunk = false;
    madeShots = new Array();
    shipPosition = new Array(7);
    countHits = 0;
    countAttempt = 0;
    attempts.innerHTML = '';
    percentHits.innerHTML = '';
    battleTime.innerHTML = '';
    attentionMsg.innerHTML = '';
    var newField;
    newField = field.getElementsByTagName("TD");
    for (var i = 0; i < newField.length; i++) {
        newField[i].style.backgroundImage = "url(images/sea.jpg)";
    }
    h = '0' + 0;
    m = '0' + 0;
    s = '0' + 0;
    setPosition();
}
/* close popup window */
function close_win() {
    win.style.display = "none";
    audio.pause();
}

function  playSound(url) {
    if(soundEffects) {
        audio.src = url;
        audio.autoplay = true;
    }
}
/* Включить выкл. звуковые эффекты */
function switchOnSound() {
    if(!btnSoundEffectsPress) {
        soundEffects = true;
        document.getElementById("switch_on_sound").innerHTML = "Выключить звуковые эффекты";
        btnSoundEffectsPress = true;
    }
    else {
        soundEffects = false;
        document.getElementById("switch_on_sound").innerHTML = "Включить звуковые эффекты";
        btnSoundEffectsPress = false;
    }
}
/* Начать игру */
function start() {
    if(!startStopwatchOnce) {
        restart();
        stopwatch();
        startStopwatchOnce = true;
    }
    else{
        restart();
    }
}
/*------------------------------------------------*/

field.onclick = function(event) {
    if (!startStopwatchOnce) {
        attentionMsg.innerHTML = "Для старта нажмите начать игру";
        playSound('audio/attention.wav');
    }
    else {
        attentionMsg.innerHTML = '';
        if (!isSunk) {
            for (var i = 0; i < madeShots.length; i++) {
                if (madeShots[i] == +event.target.id) {
                    attentionMsg.innerHTML = "Вы уже стреляли по этой позиции!";
                    playSound('audio/attention.wav');
                    out = true;
                }
            }
            if (!out) {
                playSound('audio/shot.mp3');
                if (shipPosition[+event.target.id] == 1) {
                    event.target.style.backgroundImage = "url(images/ship_hit.jpg)";
                    event.target.style.backgroundSize = "100% 100%";
                    madeShots[countAttempt] = +event.target.id;
                    ++countHits;
                    ++countAttempt;
                    if (countHits == 3) {
                        attempts.innerHTML = countAttempt;
                        percentHits.innerHTML = (Math.round((countHits / countAttempt) * 100) + "%");
                        battleTime.innerHTML = h + ":" + m + ":" + s;
                        setTimeout('win.style.display = "block"', 1500);
                        setTimeout("playSound('audio/win.mp3')", 1500);
                        isSunk = true;
                    }
                }
                else if (event.target.id != "battleship_field") {
                    event.target.style.backgroundImage = "url(images/miss.jpg)";
                    event.target.style.backgroundSize = "100% 100%";
                    madeShots[countAttempt] = +event.target.id;
                    ++countAttempt;
                }
            }
            out = false;
            console.log(madeShots);
        }
        else {
            attentionMsg.innerHTML = "Игра окончена! Нажмите начать игру, что бы повторить";
            playSound('audio/attention.wav');
        }
    }
}
