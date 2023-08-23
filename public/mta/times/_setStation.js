function setStation(a) {
    let station;
    console.log(a)

    var id = a.match(/\[(.*?)\]/)[1];
    var name = a.replace(/\s*\[[^\]]*\]\s*/, '');

    for (i in data.result) {
        const r = data.result[i];
        if (r.stop_name == name) {
            if (r.stop_id == id) {
                station = r;
            }
        }
    }

   console.log(station)
   getStationData(station)
}

async function getStationData(station) {
    const id = station.stop_id;
    const responce = await fetch("/mta/times", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            id
        }),
    });
    const data = await responce.json();
    console.log(data)
}
