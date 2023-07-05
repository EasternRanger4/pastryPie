async function redTrust(n) {
    if (n == "a") {
        const userAdminPin = prompt("Admin Pin")
        const type = "NT"
        const responce = await fetch("/clinetPinCodes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json ",
            },
            body: JSON.stringify({
              type
            }),
          });
        const data = await responce.json();
        console.log(data)
        if (data.toSend == userAdminPin) {
            alowAdmin()
        } else {
            alert("Incorect Pin")
        }
    } else if (n == "fc") {
        const userPin = prompt("View Codes")
        if (userPin == "123") {
            displayCrads()
        } else {
            alert("Incorect Pin")
        }
    }
}

function alowAdmin() {
    txt0 = `Admin Content`;
    document.getElementById("content").innerHTML= txt0;
}

function displayCrads() {
    const names = ["p_Ben.png","p_ESER.jpg","p_KYAN.jpg","p_NATHEN.jpg","p_SHASH.jpg", "p_TAMER.jpg", "p_THEO.jpg", "p_TYLER.jpg", "p_YAMI.jpg","p_YASIN.jpg"]
    const people = ["Ben", "Eser", "Kyan", "Nathaniel", "Shash", "Tamer", "Theo", "Tyler", "Yami","Yasin"]
    txt1 = "";
    for (p in names) {
        console.log(names[p])
        txt1 += `<hr class="thicker-line"> <h1>${people[p]}!</h1><img src="f_cards/${names[p]}" width="200" length="400"><br>`
    }
    document.getElementById("content").innerHTML= txt1;
}