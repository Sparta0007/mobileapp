"use strict";


const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const body = document.querySelector("body");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
let soundEndFlag = "0";

// ボタンを"初期"状態とする
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
  function () {
    //sound control
    if (soundEndFlag === "1") {
      soundControl("end", "");
    }

    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();

    //背景サウンド
    w_sound = "sound/start.mp3";
    soundControl("start", w_sound);
    soundEndFlag = "1";
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
  function () {
    if (soundEndFlag === "1") {
      soundControl("end", "");
    }

    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;

    if (parseInt(stopTime) >= 10000 && parseInt(stopTime) < 11000) {
      body.style.background = "url(img/ronaldo.gif)";
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
    }

    //背景サウンド
    w_sound = "sound/stop1.mp3";
    soundControl("start", w_sound);
    soundEndFlag = "1";
  }, false
);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click", 
  function () {
    if (soundEndFlag === "1") {
      soundControl("end", "");
    }

    // ボタンを"初期"状態とする
    setButtonStateInitial()
    timer.textContent = "00:00.000";
    stopTime = 0;

    //背景"初期"状態とする
    body.style.background = "";
    body.style.backgroundSize = "";

    //背景サウンド
    w_sound = "sound/reset.mp3";
    soundControl("start", w_sound);
    soundEndFlag = "1";
  }, false
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}

//背景サウンド
let w_sound;
let music;
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