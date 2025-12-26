const startPauseBtn = document.querySelector(".startPauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const defaultBtn = document.querySelector(".defaultBtn");
const shortBreakBtn = document.querySelector(".shortBreakBtn");
const longBreakBtn = document.querySelector(".longBreakBtn");
const clock = document.querySelector(".clock");
const background = document.querySelector("section");
const statusText = document.querySelector(".status");
let remainingTime = 25 * 60;
let pomodoro = true;
let shortBreak = false;
let longBreak = false;
let rounds = 0;
let timerInterval = null;
let timerStatus = false;
let sessionHistory = [];

let backgroundPomodoro = "#1c1c1e";
let backgroundRest = "#708573";

function saveSession(sessionType) {
  let storedData = localStorage.getItem("pomodoroHistory");
  let sessionHistory = storedData ? JSON.parse(storedData) : [];
  const newSession = { date: getDateTime(), type: sessionType };
  sessionHistory.push(newSession);
  localStorage.setItem("pomodoroHistory", JSON.stringify(sessionHistory));
  console.log("saved:" + newSession);
}
function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  return dateTime;
}

shortBreakBtn.addEventListener("click", () => {
  pauseTimer();
  remainingTime = 5 * 60;
  clock.innerHTML = "05:00";
  startPauseBtn.innerHTML = "Start";
});

longBreakBtn.addEventListener("click", () => {
  pauseTimer();
  remainingTime = 10 * 60;
  clock.innerHTML = "10:00";
  startPauseBtn.innerHTML = "Start";
});

defaultBtn.addEventListener("click", () => {
  pauseTimer();
  remainingTime = 25 * 60;
  clock.innerHTML = "25:00";
  startPauseBtn.innerHTML = "Start";
});

function play() {
  var audio = new Audio("sounds/Tink.mp3");
  audio.play();
}
function sendNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("Pomodoro Timer", {
      body: message,
      icon: "./icons/iconfinder_Light_3069194.ico?",
    });
  }
}

function switchMode() {
  if (pomodoro === true) {
    ++rounds;
    pomodoro = false;
    statusText.textContent = "Finished pomodoro session!";
    sendNotification("Finished pomodoro session!");
    console.log("Finished pomodoro session!");
    saveSession("pomodoro");

    if (rounds % 4 == 0) {
      longBreak = true;
      shortBreak = false;
      remainingTime = 10 * 60;
      background.style.backgroundColor = backgroundRest;
      statusText.textContent = "Starting long break, take a rest ;)";
      console.log("Starting long break, take a rest ;)");
      sendNotification("Starting long break, take a rest ;");
    } else {
      shortBreak = true;
      longBreak = false;
      remainingTime = 5 * 60;
      background.style.backgroundColor = backgroundRest;
      statusText.textContent = "Take a little rest!";
      console.log("Take a little rest");
      sendNotification("Take a little rest");
    }
    startTimer();
  } else {
    pomodoro = true;
    shortBreak = false;
    longBreak = false;
    remainingTime = 25 * 60;
    background.style.backgroundColor = backgroundPomodoro;
    console.log("Starting new pomodoro session");
    sendNotification("Starting new pomodoro session");
    statusText.textContent = "";
    startTimer();
  }
}
// 2. FUNKCIJA KOJA SE POKREĆE SVAKE SEKUNDE
function tick() {
  let minutes = 0;
  let seconds = 0;
  remainingTime = Math.ceil((endTime - Date.now()) / 1000);
  minutes = Math.floor(remainingTime / 60);
  seconds = remainingTime - minutes * 60;
  clock.innerHTML =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerStatus = false;
    play();
    switchMode();
  }
}

function startTimer() {
  if (Notification.requestPermission !== "granted") {
    Notification.requestPermission();
  }
  if (timerInterval === null) {
    // Provera da ne pokrenemo dva tajmera istovremeno
    endTime = Date.now() + remainingTime * 1000;
    timerInterval = setInterval(tick, 100);
    tick();
    timerStatus = true;
    startPauseBtn.innerHTML = "Pause";
  }
}

function clearTimer() {
  clearInterval(timerInterval);
  clock.innerHTML = "25:00";
  startPauseBtn.innerHTML = "Start";
  timerInterval = null;
  remainingTime = 25 * 60;
  background.style.backgroundColor = backgroundPomodoro;
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startPauseBtn.innerHTML = "Resume";
}

startPauseBtn.addEventListener("click", () => {
  if (timerInterval !== null) pauseTimer();
  else {
    startTimer();
  }
});

resetBtn.addEventListener("click", () => {
  clearTimer();
});
