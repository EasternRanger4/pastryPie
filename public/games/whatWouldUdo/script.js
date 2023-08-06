let _p1;
let _p2;
let data;

let playerOnePoints = 0;
let playerTwoPoints = 0;

let r;
let f;

let turn = "playerOne";
let ans1;
let ans2;

var setupContainer = document.querySelector('#center-container'); 
var game = document.querySelector('#game'); 

let currentInterval;

async function setup() {
    _p1 = document.getElementById("personOneName").value;
    _p2 = document.getElementById("personTwoName").value;

    console.log(_p1, _p2)
    setupContainer.style.display = 'none'; 
    game.style.display = 'flex'; 

    document.getElementById("p1Name").textContent = _p1;
    document.getElementById("p2Name").textContent = _p2;

    document.getElementById("pointsOne").textContent = playerOnePoints;
    document.getElementById("pointsTwo").textContent = playerTwoPoints;

    const response = await fetch("./data2.json");
    data = await response.json();
    console.log(data);
    playerOneQuestion();
}

function playerOneQuestion() {
    startCountdown(10, "time", 0);
    const question = generateRandomNumber();
    r = data[question];
    delete data[question];
    const txt0 = `Team ${_p1} turn!`;
    console.log(question)
    console.log(r)
    const txt1 = `
        <button onclick="asignAnswerP1('${r.optionOne.points}', '_p1')">${r.optionOne.option}</button>
        <button onclick="asignAnswerP1('${r.optionTwo.points}', '_p1')">${r.optionTwo.option}</button>
        <button onclick="asignAnswerP1('${r.optionThree.points}', '_p1')">${r.optionThree.option}</button>
    `;
    document.getElementById("player").textContent = txt0;
    document.getElementById("question").textContent = r.question;
    document.getElementById("answers").innerHTML = txt1;
}

function asignAnswerP1(points, player) {
    console.log(points);
    console.log(player);
    const pointsInt = parseInt(points, 10);
    let playerOnePointsInt = parseInt(playerOnePoints, 10);
    playerOnePointsInt += pointsInt;
    playerOnePoints = playerOnePointsInt;
    updatePoints();

    // Stop the countdown timer for playerOne
    clearInterval(currentInterval);

    turn = "playerTwo";
    next();
}

function playerTwoQuestion() {
    startCountdown(10, "time", 1);
    const question = generateRandomNumber();
    r = data[question];
    delete data[question];
    const txt0 = `Team ${_p2} turn!`;
    const txt1 = `
        <button onclick="asignAnswerP2('${r.optionOne.points}', '_p2')">${r.optionOne.option}</button>
        <button onclick="asignAnswerP2('${r.optionTwo.points}', '_p2')">${r.optionTwo.option}</button>
        <button onclick="asignAnswerP2('${r.optionThree.points}', '_p2')">${r.optionThree.option}</button>
    `;
    document.getElementById("player").textContent = txt0;
    document.getElementById("question").textContent = r.question;
    document.getElementById("answers").innerHTML = txt1;
}

function asignAnswerP2(points, player) {
    console.log(points);
    console.log(player);
    const pointsInt = parseInt(points, 10);
    let playerTwoPointsInt = parseInt(playerTwoPoints, 10);
    playerTwoPointsInt += pointsInt;
    playerTwoPoints = playerTwoPointsInt;
    updatePoints();

    // Stop the countdown timer for playerTwo
    clearInterval(currentInterval);

    turn = "playerOne";
    next();
}

function next() {
    if (turn === "playerTwo") {
        playerTwoQuestion();
    } else if (turn === "playerOne") {
        playerOneQuestion();
    }
}

function updatePoints() {
    document.getElementById("pointsOne").textContent = playerOnePoints;
    document.getElementById("pointsTwo").textContent = playerTwoPoints;
    if (playerOnePoints > 100) {
        const txt4 = `${_p1} Winns`
        alert(txt4)
        location.reload();
    } else if (playerTwoPoints > 100) {
        const txt4 = `${_p1} Winns`
        alert(txt4)
        location.reload();
    }
}

function startCountdown(duration, displayElement, player) {
    let timer = duration;
    const countdownElement = document.getElementById(displayElement);

    // If there's an active timer, clear it before starting a new one
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    // Update the countdown element every second
    currentInterval = setInterval(function () {
        countdownElement.textContent = timer;
        timer--;

        // When the timer reaches 0, stop the countdown and do something (e.g., display a message)
        if (timer < 0) {
            clearInterval(currentInterval);
            countdownElement.textContent = "Time's up!";
            next();
        }
    }, 1000);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 9);
}
