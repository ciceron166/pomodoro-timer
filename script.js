const startPauseBtn = document.querySelector(".startPauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const clock = document.querySelector(".clock");
// clock.innerHTML = "25:00";

/*
let timer = () => {
  if (normal > 0) {
    normal--;
  }
  console.log(normal);
};

let intervalTimerSet = setInterval(timer, 30 * 1000);
intervalTimerSet();
clearInterval(intervalTimerSet);
*/
// 1. DEFINISANJE STANJA
// Počinjemo sa npr. 10 sekundi radi testiranja (kasnije stavi 1500 za 25 min)
let remainingTime = 25 * 60;
let shortBreak = 5;
let longBreak = 10;
let timerInterval = null; // Ovde ćemo čuvati ID intervala da bismo mogli da ga stopiramo
let timerStatus = false;

// Source - https://stackoverflow.com/a
// Posted by Uri, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-09, License - CC BY-SA 4.0

function play() {
  var audio = new Audio("sounds/Tink.mp3");
  audio.play();
}

// 2. FUNKCIJA KOJA SE POKREĆE SVAKE SEKUNDE
function tick() {
  // KORAK A: Smanji remainingTime za 1
  // (Tvoj kod ovde: kako smanjiti promenljivu za 1?)
  let minutes = 0;
  let seconds = 0;
  remainingTime--;
  minutes = Math.floor(remainingTime / 60);
  seconds = remainingTime - minutes * 60;
  // seconds = Math.floor(remainingTime) % 60;
  // KORAK B: Proveri u konzoli da li radi
  // console.log(remainingTime);
  // console.log(minutes);
  // console.log(seconds);
  clock.innerHTML = minutes + ":" + seconds;
  console.log(Math.round(minutes) + ":" + seconds);

  // KORAK C: Provera kraja
  if (remainingTime <= 0) {
    // Tajmer je gotov!
    // 1. Moramo da zaustavimo interval (koristi clearInterval i prosledi mu tajmerInterval)
    // 2. Ispiši "Kraj!"
    clearInterval(timerInterval);
    timerStatus = false;
    console.log("Finished pomodoro session!");
    play();
  }
}

// 3. POKRETANJE (ovo bi kasnije išlo na klik dugmeta)
function startTimer() {
  // Provera da ne pokrenemo dva tajmera istovremeno
  if (timerInterval === null) {
    timerInterval = setInterval(tick, 1000);
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
