const content = `<div id="welcome"></div>
Click on a service below to get started! <br>
<br>
<div id="tubeTime" class="service" onclick="tubeTime()"> 
    <div class="serviceHead" id="ttHead" >Tube Time</div>
    <div class="serviceContent" id="ttcont"> Get the latest information from Transport For London. </div>
</div>
<div id="orderSessions" class="service" onclick="orderSessions()"> 
    <div class="serviceHead" id="osHead" >Menu Sessions</div>
    <div class="serviceContent" id="osConnt"> If you have a virtual session code for a menu you can access it here. </div>
</div>`;
const button = `<br> <button onclick="logout()">Logout</button>
<span id="myAccount"></span>
<button onclick="myAccount()">My Account</button>
<span id="apri"></span>`;

function logout() {
    localStorage.clear();
    window.location = "/login";
}

function tubeTime() {
    window.location = "/tubeTime";
}

function orderSessions() {
    const code = prompt("Code");
    if (code == "001") {
        window.location = "../client/tailorCocktails";
    } else if (code == "002") {
        window.location = "../client/nicholas"
    }else {
        alert("Invaled Session Code")
    }
}

async function dataCheck() {
    document.getElementById("content").innerHTML= content;
    const userID = localStorage.getItem("userID")
    const userSSC = localStorage.getItem("userSSC")
    const responce = await fetch("/login/intDataCheck", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            userID, 
            userSSC
        }),
    });
    const data = await responce.json();
    if (data.message == true) {
        const txt0 = `Hello! ${data.content.fname}`
        document.getElementById("welcome").innerHTML= txt0;
        window.userData = data.content;
        if (data.content.clinetApri == false) {
            console.log("apri false");
        } else {
            apriTrue(data.content.clinetApri)
        }
    } else {
        window.location = "/locked";
    }
}

function myAccount() {
    document.getElementById("button").innerHTML= ""
    document.getElementById("afterContent").innerHTML= ""
    document.getElementById("afterContent").innerHTML= ""
    const txt1 = `
    <div class="login-container">
    <h2>Hello ${userData.fname}</h2>
        <div class="group">
            <label for="password">Enter your password to continue:</label>
            <input type="password" id="password"  placeholder="Enter your password">
        </div>
        <div class="group">
            <div id="loginSatus"></div>
            <button onclick="myAccountOne()">Login</button>
        </div>
    </div>  `
    document.getElementById("content").innerHTML= txt1
}

function myAccountOne() {
    const pass = document.getElementById("password").value;
    if (pass == userData.password) {
        document.getElementById("button").innerHTML= button;
        document.getElementById("content").innerHTML= "";
        document.getElementById("myAccount").innerHTML= '<button onclick="back()">Back</button';
        document.getElementById("afterContent").innerHTML= "";
        const txt2 = `<br>
        <label for="fname">Name</label>
        <input id="fname" value="${userData.fname}" type="text"> <br>
        <label for="mname">Middle Name</label>
        <input id="mname" value="${userData.mname}" type="text"> <br>
        <label for="lname">Second Name</label>
        <input id="lname" value="${userData.lname}" type="text"> <br>
        <br>
        <label for="passwordd">Passowrd</label>
        <input id="passwordd" value="${userData.password}" type="password"> <br>
        <label for="dob">Date of Birth</label>
        <input id="dob" value="${userData.dob}" type="date"> <br>
        <button onclick="myAccountTwo()">Submit</button>`
        document.getElementById("afterContent").innerHTML= txt2;
    } else {
        alert("Incorect Password")
    }
}

async function myAccountTwo() {
    const fname = document.getElementById("fname").value;
    const mname = document.getElementById("mname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("passwordd").value;
    const dob = document.getElementById("dob").value;
    const clinetApri = userData.clinetApri;
    const userSSC = userData.userSSC;
    const userid = userData.userid;
    const username = userData.username;
    const responce = await fetch("/updateUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            userid,
            userSSC,
            username,
            password,
            clinetApri,
            dob,
            lname,
            mname,
            fname
        }),
    });
    const data = await responce.json();
    console.log(data)
    if (data.message == true) {
        alert("Updated Your Data")
        document.getElementById("afterContent").innerHTML= "";
        dataCheck()
    } else (
        alert(data.error)
    )
}

function back() {
    document.getElementById("afterContent").innerHTML= "";
    dataCheck()
}
function apriTrue(apri) {
    if (apri == "admin") {
        window.apri = apri
        document.getElementById("apri").innerHTML= '<button onclick="apriClick()">Admin</button>';
    }
}

function apriClick() {
    window.location = "/admin"
}
dataCheck()