const button = ``;
const lines = ["bakerloo", "central", "circle", "district", "hammersmith-city", "jubilee", 
    "metropolitan", "northern", "piccadilly", "victoria", "waterloo-city", "dlr", "waterloo-city", "tram", "elizabeth"];

function randomLine() {
    const randomIndex = Math.floor(Math.random() * lines.length);
    return lines[randomIndex];
}

async function getLine(line) {
    const response = await fetch("/tfl/stopPoints", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ line }),
    });
    return await response.json();
}

function pageOne() {
    const line = randomLine();
    getLine(line)
        .then(data => { console.log(data); pageTwo(data)})
        .catch(error => { console.error(error);});
}

function pageTwo(data) {
    const rStation = Math.floor(Math.random() * data.data.length);
    console.log(data.data[rStation])
    document.getElementById("conetnt").innerHTML = data.data[rStation].commonName
}

pageOne();
