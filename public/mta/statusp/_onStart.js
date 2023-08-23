let data;

var loader = document.querySelector('#loader'); 
var content = document.querySelector('#content'); 
var popup = document.querySelector('#popup'); 


popup.style.display = 'none';
content.style.display = 'none'; 
loader.style.display = 'block';


async function onStart() {
    const responce = await fetch("/mta/status");
    data = await responce.json();
    console.log(data);
    content.style.display = 'block'; 
    loader.style.display = 'none'; 
}

function setData(ts) {
    document.getElementById("ts").innerHTML= ts;
}

function getClass(s) {
    if (s == "GOOD SERVICE") {
        return "green";
    } else if (s == "PLANNED WORK") {
        return "orange";
    } else {
        return "red";
    }
}

function closePop() {
    popup.style.display = "none"
}

function myFunc(a, i) {
    const toSet = data.result[a][i].text
    if (toSet == "") {
        console.log("Skip")
    } else {
        document.getElementById("popupContent").innerHTML = toSet;
        popup.style.display = 'block';
    }
}

onStart()