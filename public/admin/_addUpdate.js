function newUpdate() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 

    var loginContainer = document.querySelector('#newUpdate'); 
    loginContainer.style.display = 'block'; 

    var loginContainer = document.querySelector('#editUpdate'); 
    loginContainer.style.display = 'none'; 
}

async function submitUpadte() {
    const name = document.getElementById("u_name").value;
    const date = document.getElementById("u_date").value;
    const git_hub_status = document.getElementById("u_git_hub_status").value;
    const status = document.getElementById("u_status").value;
    const error_status = document.getElementById("u_error_status").value;
    const info = document.getElementById("info").value;

    const responce = await fetch("/pages/newUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            name,
            date,
            git_hub_status,
            status,
            error_status,
            info
        }),
      });
    const data = await responce.json();
    console.log(data)
    updates()
}

async function updates() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#editUpdate'); 
    loginContainer.style.display = 'block'; 
    var loginContainer = document.querySelector('#newUpdate'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#edditUp'); 
    loginContainer.style.display = 'none'; 

    const responce = await fetch ("/pages/getUpdates");
    const data = await responce.json();
    window.upDta = data;

    console.log(data)
    var toSet = "";
    for (i in data.content) {
        const r = data.content[i]
        toSet += `<tr>
        <td>${r.name}</td>
        <td>${r.date}</td>
        <td>${r.git_hub_status}</td>
        <td>${r.status}</td>
        <td>${r.error_status}</td>
        <td>
            <button onclick="editlUpdate('${i}')">Edit</button>
            <button onclick="delUpdate('${r.id}')">Delete</button>
            <button onclick="allert('${r.info}')">Info</button>
        </td>
      </tr>`
    }

    document.getElementById("tableDataUpdate").innerHTML= toSet;
}

async function delUpdate(id) {
    console.log(id)
    const responce = await fetch("/pages/delUpdate", {
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
      updates()
}

function editlUpdate(i) {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#editUpdate'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#newUpdate'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#edditUp'); 
    loginContainer.style.display = 'block'; 

    const r = window.upDta.content[i]
    console.log(r)
    const txt7 = `
    <label for="uu_update">Name:</label>
    <input type="text" id="uu_update" value="${r.name}" required>
    <br>

    <label for="uu_date">Date:</label>
    <input type="date" id="uu_date" value="${r.date}" required>
    <br>

    <label for="uu_git_hub_status">GitHub Status:</label>
    <input type="text" id="uu_git_hub_status" value="${r.git_hub_status}" required>
    <br>

    <label for="uu_status">Status:</label>
    <input type="text" id="uu_status" value="${r.status}" required>
    <br>

    <label for="uu_errorStatus">Error Status:</label>
    <input type="text" id="uu_errorStatus" value="${r.error_status}" required>
    <br>

    <label for="uu_info">Info:</label> <br>
    <textarea id="uu_info">${r.info}</textarea>
    <br>

    <button onclick="editlUpdate2('${r.id}')">Submit</button>`
    document.getElementById("upadteSet").innerHTML= txt7;
}

async function editlUpdate2(id) {
    const name = document.getElementById("uu_update").value;
    const date = document.getElementById("uu_date").value;
    const git_hub_status = document.getElementById("uu_git_hub_status").value;
    const status = document.getElementById("uu_status").value;
    const error_status = document.getElementById("uu_errorStatus").value;
    const info = document.getElementById("uu_info").value;

    const responce = await fetch("/pages/editlUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          id, 
          name,
          date,
          git_hub_status,
          status,
          error_status,
          info
        }),
      });
      const data = await responce.json(); 
      console.log(data)
      updates()
}

function allert(td) {
    alert(td);
    updates()
}