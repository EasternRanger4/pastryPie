function orderSessions() {
    const code = prompt("Code");
    if (code == "001") {
        window.location = "../client/tailorCocktails";
    } else if (code == "002") {
        window.location = "../client/nicholas"
    } else if (code == "003") {
        window.location = "../client/coffee"
    }else if (code == "004") {
        window.location = "../temp/usa"
    } else if (code == "005") {
        window.location = "../client/wouldRather"
    }else {
        alert("Invaled Session Code")
    }
}