const txt0 = `
<div class="login-container">
            <h2>Login to continue</h2>
                <div class="group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter your username">
                </div>
                <div class="group">
                    <label for="password">Password:</label>
                    <input type="password" id="password"  placeholder="Enter your password">
                </div>
                <div class="group">
                    <div id="loginSatus"></div>
                    <button onclick="loginUser()">Login</button>
                </div>
        </div> `
document.getElementById("content").innerHTML = txt0;

async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const responce = await fetch("/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
    const data = await responce.json();
    const userData = data.user;
    if (data.message == false) {
      document.getElementById("loginSatus").innerHTML= "Incroect Username or Password";
    } else if (data.message == true) {
        console.log(true)
        if (data.user.clinetApri == "admin") {
            console.log(true)
            adminHomepage(data.user.clinetApri);
        } else {
            alert("You do not have admin permissions")
            window.location = "/home"
        }
    }
  }

function adminHomepage(clinetApri) {
    if (clinetApri == "admin") {
        const txt1 = ` <br>
        <button onclick="setDisplay('addUser')">Add User</button>
        <button onclick="setDisplay('viewUser')">View Users</button>
        <button onclick="setDisplay('editCodes')">Edit Codes</button>
        <button onclick="setDisplay('viewDatabases')">View Databases</button>
        <button onclick="setDisplay('logout')">Logout</button>`
        document.getElementById("content").innerHTML = '';
        document.getElementById("button").innerHTML= txt1;
    } else {
        alert("You do not have admin permissions")
        window.location = "/home"
    }
}

async function setDisplay(display) {
    console.log(display)
    if (display == "addUser") {
        txt2 = `<br>
        <label for="fname">Name</label>
        <input id="fname" type="text"> <br>
        <label for="mname">Middle Name</label>
        <input id="mname"type="text"> <br>
        <label for="lname">Second Name</label>
        <input id="lname" type="text"> <br>
        <br>
        <label for="passwordd">Passowrd</label>
        <input id="passwordd" type="text"> <br>
        <label for="dob">Date of Birth</label>
        <input id="dob" type="date"> <br>
        <button onclick="addUser()">Submit</button>`
        document.getElementById("content").innerHTML = txt2;
    } else if (display == "viewUser") {
        const type = "viewUser"
        const responce = await fetch("/admin/seeUser", {
            method: "POST",
            headers: {
            "Content-Type": "application/json ",
            },
            body: JSON.stringify({
            type
            }),
        });
        const data = await responce.json();
        console.log(data);
        displayData(data)
    } else if  (display == "editCodes"){
      const type = ""
      const responce = await fetch("/pinCodes/getCodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
        type
        }),
      });
      const data = await responce.json();
      const tableDefault = `
      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Codename</th>
            <th>Type</th>
            <th>Pin</th>
            <th>Actions</th>              
          </tr>
        </thead>
        <tbody id="tableData"></tbody>
      </table>`;
  
    document.getElementById("content").innerHTML = tableDefault;
  
    var tableData = "";
    for (user in data.content) {
      tableData += `<tr>
        <td>${data.content[user].client_name}</td>
        <td>${data.content[user].clinet_codename}</td>
        <td>${data.content[user].type}</td>
        <td>${data.content[user].pin}</td>
        <td><button onclick="editCode('${data.content[user].array}')">Edit</button></td>
      </tr>`;
    }
    document.getElementById("tableData").innerHTML = tableData;
    }
  }

function displayData(data) {
    const tableDefault = `
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Username</th>        
            <th>Date of Birth</th>        
            <th>Password</th>        
            <th>Actions</th>        
          </tr>
        </thead>
        <tbody id="tableData"></tbody>
      </table>`;
  
    document.getElementById("content").innerHTML = tableDefault;
  
    var tableData = "";
    for (user in data.content) {
      tableData += `<tr>
        <td>${data.content[user].userid}</td>
        <td>${data.content[user].fname}</td>
        <td>${data.content[user].mname}</td>
        <td>${data.content[user].lname}</td>
        <td>${data.content[user].username}</td>
        <td>${data.content[user].dob}</td>
        <td>${data.content[user].password}</td>
        <td><button onclick="delUser('${data.content[user].userid}')">Delete</button><button onclick="editUser('${user}')">Edit</button></td>
      </tr>`;
    }
    window.uData = data;
    document.getElementById("tableData").innerHTML = tableData;
}

async function delUser(userid) {
    const type = "delUser"
    const responce = await fetch("/admin/delUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          type,
          userid
        }),
      });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
        alert("Deleted User");
        setDisplay("viewUser")
    } else {
        alert("Error")
    }
}

function editUser(user) {
    console.log(window.uData.content[user])
    txt5 = `<br>
        <label for="userid">User ID</label>
        <input id="userid" type="number" value="${window.uData.content[user].userid}"> <br>
        <label for="fname">Name</label>
        <input id="fname" type="text" value="${window.uData.content[user].fname}"> <br>
        <label for="mname">Middle Name</label>
        <input id="mname"type="text" value="${window.uData.content[user].mname}"> <br>
        <label for="lname">Second Name</label>
        <input id="lname" type="text" value="${window.uData.content[user].lname}"> <br>
        <label for="passwordd">Passowrd</label>
        <input id="passwordd" type="text" value="${window.uData.content[user].password}"> <br>
        <label for="usernamee">Username</label>
        <input id="usernamee" type="text" value="${window.uData.content[user].username}"> <br>
        <label for="dob">Date of Birth</label>
        <input id="dob" type="date" value="${window.uData.content[user].dob}"> <br>
        <label for="clinetApri">Apri</label>
        <input id="clinetApri" type="text" value="${window.uData.content[user].clientApri}"> <br><br>
        <button onclick="editUserTwo()">Submit</button>`
        document.getElementById("content").innerHTML = txt5;
}

async function editUserTwo() {
    const userid = document.getElementById("userid").value;
    const fname = document.getElementById("fname").value;
    const mname = document.getElementById("mname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("passwordd").value;
    const username = document.getElementById("usernamee").value;
    const clinetApri = document.getElementById("clinetApri").value;
    const dob = document.getElementById("dob").value;
    const admin = true;
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
            password,
            username, 
            dob,
            admin,
            clinetApri
        }),
      });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
      alert("Updated User")
      setDisplay('viewUser')
    } else {
      alert("Unable to update user")
    }
}
async function addUser() {
    const fname = document.getElementById("fname").value;
    const mname = document.getElementById("mname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("passwordd").value;
    const dob = document.getElementById("dob").value;
    const type = "addUser"
    const responce = await fetch("/admin/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          fname,
          mname,
          lname,
          password,
          dob,
          type
        }),
      });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
        const txt3 = `<br>
        First Name: ${data.content.fname} <br>
        Middle Name: ${data.content.mname} <br>
        Last Name: ${data.content.lname} <br>
        Username: ${data.content.username} <br>
        Password: ${data.content.password} <br>
        Date of Birth: ${data.content.dob} <br>
        `
        document.getElementById("content").innerHTML = txt3;
    } else {
        alert(data)
    }
}

async function editCode(array) {
  const type = ""
  const responce = await fetch("/pinCodes/getCodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json ",
    },
    body: JSON.stringify({
    type
    }),
  });
  const data = await responce.json();
  const txt6 = `
  <h1>${data.content[array].client_name} - ${data.content[array].clinet_codename} </h1>
  <label for="pin">${data.content[array].type} - Pin: </label>
  <input name="pin" type="number" id="pin" value="${data.content[array].pin}">
  <button onclick="sumbmitPin('${array}')">Sumbit</button>`
  document.getElementById("content").innerHTML= txt6;
}

async function sumbmitPin(array) {
  const pin = document.getElementById("pin").value;
  const responce = await fetch("/pinCodes/updatePin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json ",
    },
    body: JSON.stringify({
      array, 
      pin
    }),
  });
  const data = await responce.json(); 
  if (data.message == true) {
    alert("Updated Code")
    setDisplay('editCodes')
  } else {
    alert("Error")
  }
}
