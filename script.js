let normal = 25;
let shortBreak = 5;
let longBreak = 10;
const startStopBtn = document.querySelector(".startStopBtn");
startStopBtn.addEventListener("click", () => {
  console.log("clicked");
});
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
let remainingTime = 10;
let timerInterval = null; // Ovde ćemo čuvati ID intervala da bismo mogli da ga stopiramo

// 2. FUNKCIJA KOJA SE POKREĆE SVAKE SEKUNDE
function otkucaj() {
  // KORAK A: Smanji remainingTime za 1
  // (Tvoj kod ovde: kako smanjiti promenljivu za 1?)

  remainingTime--;
  // KORAK B: Proveri u konzoli da li radi
  console.log(remainingTime);

  // KORAK C: Provera kraja
  if (remainingTime <= 0) {
    // Tajmer je gotov!
    // 1. Moramo da zaustavimo interval (koristi clearInterval i prosledi mu tajmerInterval)
    // 2. Ispiši "Kraj!"
    clearInterval(timerInterval);
    console.log("Finished pomodoro session!");
  }
}

// 3. POKRETANJE (ovo bi kasnije išlo na klik dugmeta)
function startTimer() {
  // Provera da ne pokrenemo dva tajmera istovremeno
  if (timerInterval === null) {
    timerInterval = setInterval(otkucaj, 1000);
  }
}
startTimer();
