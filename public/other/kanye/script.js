async function getResponce() {
    document.getElementById("content").innerHTML= '<div class="loader"></div> ';
    const responce = await fetch("https://api.kanye.rest/");
    const data = await responce.json();
    document.getElementById("content").innerHTML= data.quote;
}

getResponce()