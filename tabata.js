const WORK_DURATION = 20;
const BREAK_DURATION = 10;

document.addEventListener("DOMContentLoaded", () => {
    const timerMoniter = document.getElementById("timerMoniter");
    let time, startTime = 0;
    let timer = null;
    const timerButton = document.getElementById("timerButton");
    timerButton.addEventListener("click", (e) => {
        timerButton.disabled = true;
        stopButton.disabled = false;
        startTime = new Date();
        timer = setInterval(() => { time = (new Date() - startTime)/1000; timerMoniter.innerHTML = time.toFixed(2) }, 10);
    });
    const stopButton = document.getElementById("stopButton");
    stopButton.addEventListener("click", (e) => {
        timerButton.disabled = false;
        stopButton.disabled = true;
        clearInterval(timer);
    });


    
});
