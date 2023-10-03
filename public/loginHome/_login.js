function myAccoucnt() {
    var content = document.querySelector('#content'); 
    content.style.display = 'none'; 

    var content = document.querySelector('#button'); 
    content.style.display = 'none'; 
    
    var login = document.querySelector('.login-container'); 
    login.style.display = 'block'; 

    document.getElementById("l_name").innerHTML= userData.fname;

    window.location = "/myAccount";
}

async function myAccountOne() {
    const password = document.getElementById("password").value;
    const username = userData.username;
    const responce = await fetch("/login/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            password, 
            username
        }),
    });
    const data = await responce.json()
    console.log(data)
    if (data.message == true) {
        var login = document.querySelector('#afterContent'); 
        login.style.display = 'block';
        var login = document.querySelector('.login-container'); 
        login.style.display = 'none'; 
        const txt2 = `<br>
        <label for="fname">Name</label>
        <input id="fname" value="${userData.fname}" type="text"> <br>
        <label for="mname">Middle Name</label>
        <input id="mname" value="${userData.mname}" type="text"> <br>
        <label for="lname">Second Name</label>
        <input id="lname" value="${userData.lname}" type="text"> <br>
        <br>
        <label for="dob">Date of Birth</label>
        <input id="dob" value="${userData.dob}" type="date"> <br>
        <button onclick="myAccountTwo()">Submit</button> <button onclick="onStart()">Back</button>`
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
        onStart()
    } else (
        alert(data.error)
    )
}