async function getResponse() {
    document.getElementById("content").innerHTML= '<div class="loader"></div> ';
    const response = await fetch("https://www.boredapi.com/api/activity");
    const data = await response.json();
    const txt0 = `
        <div id="item">
            Activity: ${data.activity} <br>
            Type: ${data.type} <br>
            Participants: ${data.participants} <br>
            Price: ${data.price} <br>
        </div>`;
    document.getElementById("content").innerHTML = txt0;
}

getResponse();
