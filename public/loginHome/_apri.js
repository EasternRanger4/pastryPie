function apriTrue(apri) {
    if (apri == "admin") {
        window.apri = apri
        document.getElementById("apri").innerHTML= `<button onclick="apriClick()">Admin</button>`;
    }
}

function apriClick() {
    window.location = "/admin"
}