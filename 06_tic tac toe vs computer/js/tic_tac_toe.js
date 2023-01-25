"use strict";

// flagがtrueの場合はcatのターン、falseの場合はpandaのターン
let flag = true;

// ターン数カウンター
let counter = 9;

const squares = document.getElementsByClassName("square");

const squaresArray = Array.from(squares);

// squareの要素を取得
const a_1 = document.getElementById("a_1")
const a_2 = document.getElementById("a_2")
const a_3 = document.getElementById("a_3")
const b_1 = document.getElementById("b_1")
const b_2 = document.getElementById("b_2")
const b_3 = document.getElementById("b_3")
const c_1 = document.getElementById("c_1")
const c_2 = document.getElementById("c_2")
const c_3 = document.getElementById("c_3")

// Newgameボタンを取得
const newgamebtn_display = document.getElementById("newgame-btn")
const newgamebtn = document.getElementById("btn90");

const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

// メッセージ
const msgtxt1 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px"></p><p class="text">Penguins Attack! (your turn) </p>'
const msgtxt2 = '<p class="image"><img src="./img/whitebear.jpg" width="61px" height="61px"></p><p class="text">Whitebear Attack! (computer turn) </p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"><img src = "img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__bounceIn">Draw!!</p>';

//サウンド
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"]

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded", function () {
    setMessage("penguins-turn");

    // squareがクリック可能かを判断するクラスを追加
    squaresArray.forEach(function (square) {
        square.classList.add("js-clickable");
    });
}, false)

// squareをクリックしたときのイベント
squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {
        let gameOverFlag = isSelect(square);

        // GameOverではない場合、クマのターン
        if (gameOverFlag === '0') {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(function () {
                bearTurn();
            }, 1000);
        }
    });
});

// クリックしたsquareにはpenguinsかbearを表示
function isSelect(selectSquare) {
    let gameOverFlag = "0";

    if (flag === true) {

        //クリックサウンド
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); //再生

        selectSquare.classList.add("js-penguins-checked"); //squareにはpenguinsを表示
        selectSquare.classList.add("js-unclickable"); //squareをクリックできないように
        selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除

        //penguins win
        if (isWinner('penguins')) {
            setMessage('pen-win');
            gameOver('penguins');
            return gameOverFlag = "1";
        }

        setMessage('pen-turn');
        flag = false;
    } else {

        //クリックサウンド
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-whitebear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        // bear win
        if (isWinner('bear')) {
            setMessage('bear-win');
            gameOver("bear");
            return gameOverFlag = "1";
        }

        setMessage('bear-turn');
        flag = true;
    }

    counter--;

    if (counter === 0) {
        setMessage("draw")
        gameOver('draw');
        return gameOverFlag = "1";
    }

    return gameOverFlag = "0";
}

// メッセージ切り替え関数
function setMessage(id) {
    const msgtext = document.getElementById("msgtext");
    switch (id) {
        case 'pen-turn':
            msgtext.innerHTML = msgtxt1;
            break;
        case 'bear-turn':
            msgtext.innerHTML = msgtxt2;
            break;
        case 'pen-win':
            msgtext.innerHTML = msgtxt3;
            break;
        case 'bear-win':
            msgtext.innerHTML = msgtxt4;
            break;
        case 'draw':
            msgtext.innerHTML = msgtxt5;
            break;
        default:
            msgtext.innerHTML = msgtxt1;
    }
}

function JudgLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every(function (square) {
            if (symbol === 'penguins') {
                return square.classList.contains("js-penguins-checked");
            }

            if (symbol === 'bear') {
                return square.classList.contains("js-whitebear-checked");
            }
        });

        if (subResult) {
            winningLine = line;
        }

        return subResult;
    });

    return result;
}

function gameOver(status) {
    //GameOver サウンド
    let w_sound //wkサウンドの種類
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play(); //再生

    // square-boxをクリックできないようにする
    squaresBox.classList.add("js-unclickable");

    // display New Game button: displa
    newgamebtn_display.classList.remove("js-hidden");
    // winEffect
    if (status === "penguins") {
        // winner-line high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add('js-penguins_highLight');
            });
        }

        // penguins win! ==> snow color is pink
        $(document).snowfall({
            flakeColor: "rgb(255, 240, 245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    } else if (status === "bear") {
        // winner-line high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add('js-bear_highLight');
            });
        }

        // bear win! ==> snow color is blu
        $(document).snowfall({
            flakeColor: "rgb(34, 255, 0)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

// NewGameボタンをクリックしたとき、ゲームを初期化
newgamebtn.addEventListener("click", function (e) {
    flag = true;
    counter = 9;
    winningLine = null;

    // 9個のマス目のクラス名をリセット
    squaresArray.forEach(function (square) {
        square.setAttribute("class", "square js-clickable");
    })

    // メッセージのリセット
    setMessage("penguins-turn");

    // NewGameボタンを非表示にする
    newgamebtn_display.classList.add("js-hidden");

    squaresBox.classList.remove("js-unclickable");

    // snowfall stop
    $(document).snowfall("clear");
}, false)

// conputerのロジック
function bearTurn() {
    // Gameが続けるフラグ
    let gameOverFlag = "0";

    // クリック可能なマス目を抽出する
    const bearSquare = squaresArray.filter(function(square) {
        return square.classList.contains("js-clickable");
    })

    // クリックできるマス目の中から、1つをランダムに選ぶ
    let n = Math.floor(Math.random() * bearSquare.length);

    gameOverFlag = isSelect(bearSquare[n]);

    // Gameが続ける場合
    if (gameOverFlag === "0") {
        // square-boxをクリックできるようにする
        squaresBox.classList.remove("js-unclickable");
    }
}