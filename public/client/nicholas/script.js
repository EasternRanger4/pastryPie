const names = ["p_BEN.png","p_ESER.jpg","P_KYAN.jpg","p_NATHEN.jpg","p_SHASH.jpg", "p_TAMER.jpg", "p_THEO.jpg", "p_TYLER.jpg", "p_YAMI.jpg","p_YASIN.jpg"]
const people = ["Ben", "Eser", "Kyan", "Nathaniel", "Shash", "Tamer", "Theo", "Tyler", "Yami","Yasin"]

async function redTrust(n) {
    if (n == "a") {
        const userAdminPin = prompt("Admin Pin")
        const type = "displayCard"
        const responce = await fetch("/pinCodes/NT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json ",
            },
            body: JSON.stringify({
              type,
              userAdminPin
            }),
          });
        const data = await responce.json();
        console.log(data)
        if (data.message == true) {
            alowAdmin()
        } else {
            alert("Incorect Pin")
            document.getElementById("content").innerHTML= "";
        }
    } else if (n == "fc") {
        const pin = prompt("View Codes")
        const responce = await fetch("/pinCodes/NTa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json ",
            },
            body: JSON.stringify({
              pin
            }),
          });
        const data = await responce.json();
        console.log(data)
        if (data.message == true) {
            displayCrads()
        } else {
            alert("Incorect Pin")
        }
    }
}

function alowAdmin() {
  var txt0 = `<table> 
      <tr> 
        <td>Array One</td> 
        <td>Array Two</td>
      </tr>
      <tr id="tableData"></tr>
    </table>`;
    document.getElementById("content").innerHTML = txt0;

    var txt1 = "";
    for (var i = 0; i < names.length; i++) {
      txt1 += `<tr>
        <td>${people[i]}</td>
        <td>${names[i]}</td>
      </tr>`;
    }
    document.getElementById("tableData").innerHTML = txt1;

}

function displayCrads() {
    txt1 = "";
    for (p in names) {
        console.log(names[p])
        txt1 += `<hr class="thicker-line"> <h1>${people[p]}!</h1><img src="f_cards/${names[p]}" width="200" length="400"><br>`
    }
    document.getElementById("content").innerHTML= txt1;
}