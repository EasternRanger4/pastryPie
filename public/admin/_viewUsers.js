async function viewUser() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#viewUser'); 
    loginContainer.style.display = 'block';
    document.getElementById("ldrAddUser").innerHTML= '<div class="small-loader"></div>'

    const userID = localStorage.getItem("userID")
    const userSSC = localStorage.getItem("userSSC")
    const responce = await fetch("/admin/seeUser", {
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
    console.log(data);
    if (data.message == true) {
        var tableDta0 = ""
        for (i in data.content) {
            const r = data.content[i];
            tableDta0 += `<tr onclick="moreInfoUser('${r.userid}')">
            <td>${r.userid}</td>
            <td>${r.fname}</td>
            <td>${r.mname}</td>
            <td>${r.lname}</td>
            </tr>`
        }
        document.getElementById("ldrAddUser").innerHTML= ''
        document.getElementById("tableDataViewUser").innerHTML= tableDta0;
    } else if (data.message == false) {
        alert("Error getting data")
    }
}

async function moreInfoUser(userid) {
    console.log(userid)
    const userID = localStorage.getItem("userID")
    const userSSC = localStorage.getItem("userSSC")
    const responce = await fetch("/admin/seeSpesUser", {
            method: "POST",
            headers: {
            "Content-Type": "application/json ",
            },
            body: JSON.stringify({
            userID,
            userSSC,
            userid
            }),
    });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
        var loginContainer = document.querySelector('.adminHomeContent'); 
        loginContainer.style.display = 'none'; 
        var loginContainer = document.querySelector('#viewUser'); 
        loginContainer.style.display = 'none';
        var loginContainer = document.querySelector('#DOM'); 
        loginContainer.style.display = 'block';

        const txt0 = `<br> 
        <label for="fname">Name</label>
        <input id="fname" type="text" value="${data.content.fname}"> <br>
        <label for="mname">Middle Name</label>
        <input id="mname"type="text" value="${data.content.mname}"> <br>
        <label for="lname">Second Name</label>
        <input id="lname" type="text" value="${data.content.lname}"> <br>
        <label for="usernamee">Username</label>
        <input id="usernamee" type="text" value="${data.content.username}"> <br>
        <label for="dob">Date of Birth</label>
        <input id="dob" type="date" value="${data.content.dob}"> <br>
        <label for="clinetApri">Apri</label>
        <input id="clinetApri" type="text" value="${data.content.clinetApri}"> <br><br>
        <button onclick="moreInfoUser2('${data.content.userid}')">Submit</button> <button onclick="editPassword('${data.content.userid}')">Reset Password</button>
        <button onclick="delUser('${data.content.userid}')">Delete</button><button onclick="back()">Back</button>`;
        document.getElementById("DOM").innerHTML = txt0;
    } else {
        alert("Error")
    }
}

async function moreInfoUser2(userid) {
    //Edit 
    const fname = document.getElementById("fname").value;
    const mname = document.getElementById("mname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("usernamee").value;
    const clinetApri = document.getElementById("clinetApri").value;
    const dob = document.getElementById("dob").value;

    const responce = await fetch("/admin/editUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            userid,
            fname,
            mname,
            lname,
            username, 
            dob,
            clinetApri
        }),
      });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
        alert("Updated User");
        var loginContainer = document.querySelector('.adminHomeContent'); 
        loginContainer.style.display = 'none'; 
        var loginContainer = document.querySelector('#viewUser'); 
        loginContainer.style.display = 'block';
        var loginContainer = document.querySelector('#DOM'); 
        loginContainer.style.display = 'none';
        viewUser()
    } else {
      alert("Unable to update user")
    }
}

async function editPassword(userId) {
    const responce = await fetch("/login/resetUserPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            userId
        }),
      });
    const data = await responce.json()
    console.log(data)
}

async function delUser(userid) {
    const responce = await fetch("/admin/delUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          userid
        }),
      });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
        alert("Deleted User");
        var loginContainer = document.querySelector('.adminHomeContent'); 
        loginContainer.style.display = 'none'; 
        var loginContainer = document.querySelector('#viewUser'); 
        loginContainer.style.display = 'block';
        var loginContainer = document.querySelector('#DOM'); 
        loginContainer.style.display = 'none';
        viewUser()
    } else {
        alert("Error")
    }
}