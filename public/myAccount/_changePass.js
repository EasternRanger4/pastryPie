function changePass() {
    const toSet = `
    <br>
    <label for="oldPassword">Old Password</label>
    <input id="oldPassword" type="password"> <br>

    <label for="newPassword">New Password</label>
    <input id="newPassword" type="password"> <br>

    <label for="newPasswordTwo">Confirm Password</label>
    <input id="newPasswordTwo" type="password"> <br>

    <div id='errorPass'> </div>
    <button onclick="subPass()">Change Password</button>`;

    document.getElementById("det").innerHTML= toSet; 
}

function subPass() {
    //const { userSSC, userID, oldPassword, newPassword } = request.body;
    oldPassword = document.getElementById('oldPassword').value;
    newPassword = document.getElementById('newPassword').value;
    newPasswordTwo = document.getElementById('newPasswordTwo').value;

    if (newPassword == newPasswordTwo) {
        sendPass(oldPassword, newPassword)
    } else {
        document.getElementById('errorPass').innerHTML= 'Passwords do not match';
    }
}

async function sendPass(oldPassword, newPassword) {
    const responce = await fetch("/changePass/editPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            userID, 
            userSSC,
            oldPassword,
            newPassword
        }),
    });
    const data = await responce.json();
    
    if (data.content == true) {
        alert("Updated Password")
        location.reload()
    } else {
        document.getElementById('errorPass').innerHTML= data.content;
    }
}