let userID;
let userSSC;

async function loginUser() {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
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
    const data = await responce.json();

    if (data.message == true) {
        login.style.display = 'none'; 
        det.style.display = 'block'; 
        console.log(data)
        userID = data.user.userid;
        userSSC = data.user.userSSC;
        console.log(userID,userSSC )
        const responce = await fetch("/admin/seeUserU", {
            method: "POST",
            headers: {
                "Content-Type": "application/json ",
            },
            body: JSON.stringify({
                userID, 
                userSSC
            }),
        });
        const userData = await responce.json()
        console.log(userData.content)
        console.log(userData)

        const toSet = `<br> <label for="fname">Name</label>
        <input id="fname" value="${userData.content.fname}" type="text"> <br>
        <label for="mname">Middle Name</label>
        <input id="mname" value="${userData.content.mname}" type="text"> <br>
        <label for="lname">Second Name</label>
        <input id="lname" value="${userData.content.lname}" type="text"> <br>
        <label for="dob">Date of Birth</label>
        <input id="dob" value="${userData.content.dob}" type="date"> <br>
        <button onclick="sendDet()">Submit</button>
        <button onclick="changePass()">Change Password</button>
        <button onclick="onStart()">Back</button>`

        document.getElementById("det").innerHTML= toSet;
    } else {
        alert('Incorrect Password')
    }
}