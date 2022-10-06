"use strict";

var n = 0;
var nBefore = 0;

window.addEventListener("DOMContentLoaded",
    function () {

        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
                effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
                delayScale: 1.5, // 遅延時間の指数
                delay: 50, // 文字ごとの遅延時間
                sync: false, // trueはアニメーションをすべての文字に同時に適用
                shuffle: true // trueは文字を順番にではなく、ランダムに
            }
        });
        // おみくじボタン(id="btn1") ボヤァと表示させる
        $(function () {
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

        setTimeout(
            function () {
                let popMessage = "Welcome To Gambling❕";
                window.alert(popMessage);
            },
            "5000"
        );
    }, false
);

let soundEndflag = "0";  //sound control
//おみくじの画像、おみくじのテキスト
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");

btn1.addEventListener("click",
    function () {
        // sound countrol
        if (soundEndflag === "1") {
            soundControl("end", "");
        }

        // let resultText = ["Brazil" , "Japan" , "Korea" , "Germany","Argentina","England"];
        // let resultColor = ["#ff0000" , "#ff4000" , "#ffff00" , "#00ffff" , "#00bfff" , "#8000ff"];
        // let resultFontSize = ["100px" , "80px" , "70px" , "60px" , "50px" , "40px"];    
        let resultText = ["img/Brazil.png", "img/Japan.png", "img/Korea.png", "img/Germany.png", "img/Canada.png"];
        let resultMaxSpeed = [10, 10, 8, 5, 5];
        let resultMaxSize = [30, 30, 30, 40, 30];
        let resultImage = ["img/succerball.png", "img/redLeaves5.png", "img/redLeaves9.png", "img/butterfly2.png", "img/water2.png"];
        let resultSound = ["sound/omikuji_sound1.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound4.mp3", "sound/omikuji_sound5.mp3"];

        // let n = Math.floor(Math.random() * resultText.length);
        while (n === nBefore) {
            n = Math.floor(Math.random() * resultText.length);
        }
        nBefore = n;

        //おみくじのテキスト画像対応
        omikujiTextImage.src = resultText[n];//fukada-add おみくじのテキスト画像対応
        omikujiTextImage.classList.add("omikujiPaper");
        //アニメーション終了時にclassを削除
        omikujiTextImage.addEventListener("animationend",
            function () {
                omikujiTextImage.classList.remove("omikujiPaper");
            }, false
        );

        w_sound = resultSound[n];
        soundControl("start", w_sound);
        soundEndflag = "1";


        // snowfall stop
        $(document).snowfall("clear");

        setTimeout(
            function () {
                // jQueryのsnowfall 
                $(document).ready(function () {
                    $(document).snowfall({
                        maxSpeed: resultMaxSpeed[n], // 最大速度
                        minSpeed: 1, // 最小速度
                        maxSize: resultMaxSize[n], // 最大サイズ
                        minSize: 7, // 最小サイズ
                        image: resultImage[n]
                    });
                });
            },
            "200"
        );
    }, false
);

//   sound control
let w_sound
let music
function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        music.pause();
        music.currentTime = 0;
    }
}