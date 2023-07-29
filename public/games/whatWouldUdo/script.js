let _p1;
let _p2;
let data;

let playerOnePoints;
let playerTwoPoints;

let r;
let f;

let ans1;
let ans2;

var setupContainer = document.querySelector('#center-container'); 
var game = document.querySelector('#game'); 

async function setup() {
    _p1 = document.getElementById("personOneName").value;
    _p2 = document.getElementById("personTwoName").value;

    console.log(_p1, _p2)
    setupContainer.style.display = 'none'; 
    game.style.display = 'flex'; 

    document.getElementById("p1Nmae").innerHTML = _p1;
    document.getElementById("p2Nmae").innerHTML = _p2;
    startCountdown(30, "countdownOne", 0);
    startCountdown(30, "countdownTwo", 1);

    const responce = await fetch("./data.json");
    data = await responce.json()
    console.log(data)
    setQuestion()
}


function setQuestion() {
    const playerOne = generateRandomNumber();
    r = data[playerOne]
    console.log(playerOne, r)

    const playerTwo = generateRandomNumber();
    f = data[playerTwo]
    console.log(playerTwo, f)
}

function markQuestion() {

}


function startCountdown(duration, displayElement, player) {
    let timer = duration;
    const countdownElement = document.getElementById(displayElement);

    // Update the countdown element every second
    const intervalId = setInterval(function () {
        countdownElement.textContent = timer;
        timer--;

        // When the timer reaches 0, stop the countdown and do something (e.g., display a message)
        if (timer < 0) {
            clearInterval(intervalId);
            countdownElement.textContent = "Time's up!";
            markQuestion(player)
        }
    }, 1000);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 20);
  }