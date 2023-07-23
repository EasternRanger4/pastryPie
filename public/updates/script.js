async function onStart() {
    const responce = await fetch("/pages/getUpdates");
    const data = await responce.json();
    console.log(data);
    if (data.message == false ) {
        alert("Error Getting Data"); 
    } else if (data.message == true) {
        setData(data);
    }
}

function setData(data) {
    var toSet = "";
    for (i in data.content) {
        const r = data.content[i]
        toSet += `<tr onclick="allert('${r.info}')">
        <td>${r.name}</td>
        <td>${r.date}</td>
        <td>${r.git_hub_status}</td>
        <td>${r.status}</td>
        <td>${r.error_status}</td>
        </tr>`
    }
    document.getElementById("tableData").innerHTML= toSet;
}

function allert(toDiplay) {
    if (toDiplay == "-") {
        alert("No Update Info")
    } else {
        alert(toDiplay)
    }
}

onStart();