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

const btn1 = document.getElementById("btn1");
btn1.addEventListener("click",
    function () {
        // let n = Math.floor(Math.random() * 3);

        // switch(n){
        //     case 0:
        //     btn1.textContent = "Win!!";
        //     btn1.style.color = "#ff6f57";
        //     btn1.style.fontSize = "40px";
        //     break;
        //     case 1:
        //     btn1.textContent = "lucky!";
        //     btn1.style.color = "#bb8d5f";
        //     btn1.style.fontSize = "30px";
        //     break;
        //     case 2:
        //     btn1.textContent = "Lost...";
        //     btn1.style.color = "#261e1c";
        //     btn1.style.fontSize = "20px";
        //     break;
        //     }

        let resultText = ["Brazil", "France", "Japan", "Korea", "Germany", "Argentina", "England"];
        let resultColor = ["#ff0000", "#ff4000", "#ffff00", "#00ffff", "#00bfff", "#8000ff", "#bfff00"];
        let resultFontSize = ["60px", "55px", "50px", "50px", "40px", "35px", "30px"];

        while (n === nBefore) {
            n = Math.floor(Math.random() * resultText.length);
        }
        nBefore = n;
        btn1.textContent = resultText[n];
        btn1.style.color = resultColor[n];
        btn1.style.fontSize = resultFontSize[n];


        // snowfall stop
        $(document).snowfall("clear");
        // jQueryのsnowfall
        $(document).ready(function () {
            $(document).snowfall({
                maxSpeed: 7, // 最大速度
                minSpeed: 2, // 最小速度
                maxSize: 25, // 最大サイズ
                minSize: 3, // 最小サイズ
                image: 'img/succerball.png'
            });
        });
    }, false
);
