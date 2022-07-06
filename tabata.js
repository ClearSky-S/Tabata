const WORK_DURATION = 20;
const BREAK_DURATION = 10;
const TOTAL_CYCLE = 8;
const musicList = [
    "Back in Black",
    "BlindingLights",
    "DanceMonkey",
    "HigherLove",
    "Levitating",
    "Poker Face",
    "Rockabye",
    "Shape of You",
    "Survivor",
    "Toxic",
    "Viva La Vida",
];
const sink ={
    "Back in Black":9700,
    "BlindingLights":9700,
    "DanceMonkey":9700,
    "HigherLove":9700,
    "Levitating":9700,
    "Poker Face":9700,
    "Rockabye":9700,
    "Shape of You":9700,
    "Survivor":9700,
    "Toxic":9700,
    "Viva La Vida":9700,
};


let cycle = 1;
let startTime = 0;
let isWorking = true;
let timer = null;
let timerButton = null;
let cycleMonitor = null;
let workVideo, breakVideo;
let music;
let musicForm;
let startSound;

document.addEventListener("DOMContentLoaded", () => {

    workBar = document.getElementsByClassName("progress-bar")[0];
    breakBar = document.getElementsByClassName("progress-bar")[1];
    cycleMonitor = document.getElementById("cycleMoniter");
    timerButton = document.getElementById("timerButton");
    breakVideo = document.querySelectorAll("video")[0];
    workVideo = document.querySelectorAll("video")[1];
    musicForm = document.getElementById("musicForm");
    music = new Audio("audio/"+"Back in Black"+".m4a");
    startSound = new Audio("wav/start.wav");

    musicList.forEach(element => {
        const newOption = document.createElement("option");
        newOption.value = element;
        newOption.text = element;
        musicForm.appendChild(newOption);
    });

    timerButton.addEventListener("click", (e) => {
        timerButton.disabled = true;
        cycle=1;
        isWorking = true;
        cycleMonitor.innerHTML = cycle + "/" + TOTAL_CYCLE;
        workBar.style.width = "0%";
        breakBar.style.width = "0%";
        breakVideo.classList.remove("d-none");
        workVideo.classList.add("d-none"); 
        music.setAttribute('src',"audio/"+musicForm.value+".m4a");
        music.load();
        music.play();
        startSound.play();
        
        timer = setTimeout(startTimer, sink[musicForm.value]);
    });

});

function startTimer(){
    startTime = new Date();
    startSound.play();
    workVideo.classList.remove("d-none");
    breakVideo.classList.add("d-none"); 
    setTimeout(countTime, 0);
}
function countTime() {

    const time = (new Date() - startTime) / 1000;
    if (isWorking) {
        workBar.style.width = (time / (isWorking ? WORK_DURATION : BREAK_DURATION)) * 100 + "%";
    } else {
        breakBar.style.width = (time / (isWorking ? WORK_DURATION : BREAK_DURATION)) * 100 + "%";

    }
    if (cycle == TOTAL_CYCLE && isWorking == true && (time >= WORK_DURATION)) {
        // music.pause();
        timerButton.disabled = false;
        workVideo.classList.remove("d-none");
        breakVideo.classList.add("d-none"); 
        return;
    }
    if (isWorking && time >= WORK_DURATION) {
        startSound.play();
        isWorking = !isWorking;
        startTime = new Date();
        breakVideo.classList.remove("d-none");
        workVideo.classList.add("d-none");
    } else if (!isWorking && time >= BREAK_DURATION) {
        startSound.play();
        isWorking = !isWorking;
        startTime = new Date();
        cycle++;
        cycleMonitor.innerHTML = cycle + "/" + TOTAL_CYCLE;
        workBar.style.width = "0%";
        breakBar.style.width = "0%";
        workVideo.classList.remove("d-none");
        breakVideo.classList.add("d-none");

    }


    setTimeout(countTime, 30);
}
