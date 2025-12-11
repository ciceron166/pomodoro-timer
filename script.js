const startPauseBtn = document.querySelector(".startPauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const clock = document.querySelector(".clock");

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
function switchMode() {
  if (pomodoro === true) {
    ++rounds;
    pomodoro = false;
    console.log("Finished pomodoro session!");

    if (rounds % 4 == 0) {
      longBreak = true;
      shortBreak = false;
      remainingTime = 10 * 60;
      console.log("Starting long break, take a rest ;)");
    } else {
      shortBreak = true;
      longBreak = false;
      remainingTime = 5 * 60;
      console.log("Take a little rest");
    }
    startTimer();
  } else {
    pomodoro = true;
    shortBreak = false;
    longBreak = false;
    remainingTime = 25 * 60;
    console.log("Starting new pomodoro session");
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
  // Provera da ne pokrenemo dva tajmera istovremeno
  if (timerInterval === null) {
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
