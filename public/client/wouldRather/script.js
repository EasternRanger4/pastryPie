let op1;
let op2;
let op1A;
let op2A;
let number = 0; // Initialize to -1 to ensure the first random number is different
let data;

async function onStart() {
    const response = await fetch("./data.json");
    data = await response.json();
    console.log(data);
    contentSet();
}

function contentSet() {
    if (number >= 6) {
        number = 0;
    }
    console.log(number);
    document.getElementById("question").innerHTML = data[number].question;
    document.getElementById("op1").innerHTML = data[number].optionOne;
    op1 = data[number].optionOne;
    op1A = data[number].optionOneAction;
    document.getElementById("op2").innerHTML = data[number].optionTwo;
    op2 = data[number].optionTwo;
    op2A = data[number].optionTwoAction;
    number++;
}

function optionOne() {
    alert(op1A);
    contentSet();
}

function optionTwo() {
    alert(op2A);
    contentSet();
}

function random() {
    // Generate a random number between 0 and 1 (exclusive of 1)
    const randomNum = Math.random();
  
    // Scale the random number to the desired range (0 to 6)
    const number = Math.floor(randomNum * 6);
  
    return number;
}

onStart();
