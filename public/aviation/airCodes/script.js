let data;

async function onStart() {
    console.log("ello")
    const responce = await fetch ("/airData/codes");
    data = await responce.json();
    console.log(data)
}

function search() {
    let done = false;
    const value = document.getElementById("value").value.toUpperCase();
    console.log(value)
    if (icaoRadio.checked) {
        for (i in data.result) {
            const r = data.result[i]
            if (r.icao_code == value) {
                console.log(r)
                displayCon(i)
                done = true;
            }
        }
    } else if (iataRadio.checked) {
        for (i in data.result) {
            const r = data.result[i]
            if (r.iata_code == value) {
                console.log(r)
                displayCon(i)
                done = true;
            }
        }
    }

    if (done == false) {
        document.getElementById("results").innerHTML= "Not Found";
    }
    
}

function displayCon(i) {
    const r = data.result[i]
    const txt = `Name: ${r.name} <br> ICAO: ${r.icao_code} <br> IATA: ${r.iata_code}`
    document.getElementById("results").innerHTML= txt;
}
onStart()