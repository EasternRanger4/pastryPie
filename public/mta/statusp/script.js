function BT() {
    let set = "";
    for (i in data.result.BT) {
        const r = data.result.BT[i];
        const clas = getClass(r.status)
        set += `<div id="item" onclick="myFunc('BT','${i}')"> <span id="name">${r.name}</span> <br> <span id="status" class="${clas}">${r.status}</span></div>`;
    }
    setData(set)
}

function LIRR() {
    let set = "";
    for (i in data.result.LIRR) {
        const r = data.result.LIRR[i];
        const clas = getClass(r.status)
        set += `<div id="item" onclick="myFunc('LIRR','${i}')"> <span id="name">${r.name}</span> <br> <span id="status" class="${clas}">${r.status}</span></div>`;
    }
    setData(set)
}

function MetroNorth() {
    let set = "";
    for (i in data.result.MetroNorth) {
        const r = data.result.MetroNorth[i];
        const clas = getClass(r.status)
        set += `<div id="item" onclick="myFunc('MetroNorth','${i}')"> <span id="name">${r.name}</span> <br> <span id="status" class="${clas}">${r.status}</span></div>`;
    }
    setData(set)
}

function bus() {
    let set = "";
    for (i in data.result.bus) {
        const r = data.result.bus[i];
        const clas = getClass(r.status)
        set += `<div id="item" onclick="myFunc('bus','${i}')"> <span id="name">${r.name}</span> <br> <span id="status" class="${clas}">${r.status}</span></div>`;
    }
    setData(set)
}

function subway() {
    let set = "";
    for (i in data.result.subway) {
        const r = data.result.subway[i];
        const clas = getClass(r.status);
        set += `<div id="item" onclick="myFunc('subway','${i}')"> <span id="name">${r.name}</span> <br> <span id="status" class="${clas}">${r.status}</span></div>`;

    }
    setData(set);
    
}