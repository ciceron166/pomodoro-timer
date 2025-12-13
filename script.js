const startPauseBtn = document.querySelector(".startPauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const clock = document.querySelector(".clock");
const background = document.querySelector("section");
const statusText = document.querySelector(".status");

let remainingTime = 25 * 60;
let pomodoro = true;
let shortBreak = false;
let longBreak = false;
let rounds = 0;
let timerInterval = null; // Ovde ćemo čuvati ID intervala da bismo mogli da ga stopiramo
let timerStatus = false;

function play() {
  var audio = new Audio("sounds/Tink.mp3");
  audio.play();
}
function sendNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("Pomodoro Timer", {
      body: message,
      icon: "./icons/iconfinder_Light_3069194.ico?", // Opciona sličica
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

    if (rounds % 4 == 0) {
      longBreak = true;
      shortBreak = false;
      remainingTime = 10 * 60;
      background.style.backgroundColor = "#89B394";
      statusText.textContent = "Starting long break, take a rest ;)";
      console.log("Starting long break, take a rest ;)");
      sendNotification("Starting long break, take a rest ;");
    } else {
      shortBreak = true;
      longBreak = false;
      remainingTime = 5 * 60;
      background.style.backgroundColor = "#89B394";
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
    background.style.backgroundColor = "#1c1c1e";
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

  // KORAK C: Provera kraja
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerStatus = false;
    play();
    switchMode(); //nisam siguran dal treba ovde da bude?
  }
}

// 3. POKRETANJE (ovo bi kasnije išlo na klik dugmeta)
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
  background.style.backgroundColor = "#1c1c1e";
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
