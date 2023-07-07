async function onStart() {
    const responce = await fetch("/tfl/trainStatus");
    const data = await responce.json();
    console.log(data)
    window.dataTUBE = data.tubeDta;
    window.dataEL = data.elizabethDta
    window.dataOVR = data.overgroundDta;
    window.dataTRM = data.tramDta;
    window.dataDLR = data.dlrDta;
    const currentTime = new Date();
    const timestamp = currentTime.toLocaleString(); // Convert the date to a string in a local time format
    window.data = data

    const toSet = `Last Updated ${timestamp} <br>
    <div id="bkls" class="cop" onclick="extraInfo('bkl')"> Bakerloo: <br> ${dataTUBE[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="cnts" class="cop" onclick="extraInfo('cnt')"> Central: <br> ${dataTUBE[1]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="crls" class="cop" onclick="extraInfo('cir')"> Circle: <br> ${dataTUBE[2]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="diss" class="cop" onclick="extraInfo('dis')"> District: <br> ${dataTUBE[3]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="h_cs" class="cop" onclick="extraInfo('ham')"> Hammersmith & City: <br> ${dataTUBE[4]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="jues" class="cop" onclick="extraInfo('jul')"> Jubilee: <br> ${dataTUBE[5]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="mets" class="cop" onclick="extraInfo('met')"> Metropolitan: <br> ${dataTUBE[6]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="nors" class="cop" onclick="extraInfo('nor')"> Northern: <br> ${dataTUBE[7]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="pics" class="cop" onclick="extraInfo('pic')"> Piccadilly: <br> ${dataTUBE[8]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="vics" class="cop" onclick="extraInfo('vic')"> Victoria: <br> ${dataTUBE[9]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="w_cs" class="cop" onclick="extraInfo('wac')"> Waterloo & City: <br> ${dataTUBE[10]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="ells" class="cop" onclick="extraInfo('dataEL')"> Elizabeth Line: <br> ${dataEL[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="dlrs" class="cop" onclick="extraInfo('dlr')"> Docklands Light Railway: <br> ${dataDLR[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="lnos" class="cop" onclick="extraInfo('log')"> London Overground: <br> ${dataOVR[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="trms" class="cop" onclick="extraInfo('trm')"> Trams: <br> ${dataTRM[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="buf" class="cop" ></div><div id="buf" class="cop"></div><div id="buf" class="cop"></div><div id="buf" class="cop"></div>
    `

    document.getElementById("content").innerHTML= toSet;
}

function extraInfo(line) {
    var relitiveDta = "";
    var sig = false;
    if (line == "bkl") {
        relitiveDta = data.tubeDta[0];
    } else if (line == "cnt") {
        relitiveDta = data.tubeDta[1];
    } else if (line == "cir") {
        relitiveDta = data.tubeDta[2];
    } else if (line == "dis") {
        relitiveDta = data.tubeDta[3];
    } else if (line == "ham") {
        relitiveDta = data.tubeDta[4];
    } else if (line == "jul") {
        relitiveDta = data.tubeDta[5];
    } else if (line == "met") {
        relitiveDta = data.tubeDta[6];
    } else if (line == "nor") {
        relitiveDta = data.tubeDta[7];
    } else if (line == "pic") {
        relitiveDta = data.tubeDta[8];
    } else if (line == "vic") {
        relitiveDta = data.tubeDta[9];
    } else if (line == "wac") {
        relitiveDta = data.tubeDta[10];
    } else if (line == "dataEL") {
        relitiveDta = data.elizabethDta[0];
    } else if (line == "dlr") {
        relitiveDta = dataDLR[0];
    } else if (line == "log") {
        relitiveDta = dataOVR[0];
    } else if (line == "trm") {
        relitiveDta = dataTRM[0];
    };

    console.log(sig)
    console.log(false)
    if (relitiveDta.lineStatuses[0].reason == undefined) {
        alert(`${relitiveDta.name}: Good Service`)
    } else {
        alert(relitiveDta.lineStatuses[0].reason)
    }
}

onStart()