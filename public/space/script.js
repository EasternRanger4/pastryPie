const nasaButtons = `<button onclick="APOD()">Pic of the day</button>`

async function nasa() {
    document.getElementById("button").innerHTML= nasaButtons;
    document.getElementById("content").innerHTML= "";
}

async function APOD() {
    const response = await fetch("/space/APOD")
    const data = await response.json();
    console.log(data)
    const txt0 =  `<h1>${data.content.title} </h1> <img src="${data.content.url}"> <br> ${data.content.explanation}`
    document.getElementById("content").innerHTML= txt0;
}