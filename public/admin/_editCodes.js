async function editVaribals() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#editCodes'); 
    loginContainer.style.display = 'block';
    var loginContainer = document.querySelector('#DOM'); 
    loginContainer.style.display = 'none';
    const type = "";
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
    document.getElementById("tableDataCodes").innerHTML = tableData;
}


async function editCode(array) {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#editCodes'); 
    loginContainer.style.display = 'none';
    var loginContainer = document.querySelector('#DOM'); 
    loginContainer.style.display = 'block';
    const responce = await fetch("/pinCodes/getCodes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({
      }),
    });
    const data = await responce.json();
    const txt6 = `<br> <button onclick="back()">Back</button>
    <h1>${data.content[array].client_name} - ${data.content[array].clinet_codename} </h1>
    <label for="pin">${data.content[array].type} - Pin: </label>
    <input name="pin" id="pin" value="${data.content[array].pin}">
    <button onclick="sumbmitPin('${array}')">Sumbit</button>`
    document.getElementById("DOM").innerHTML= txt6;
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
      var loginContainer = document.querySelector('.adminHomeContent'); 
      loginContainer.style.display = 'none'; 
      var loginContainer = document.querySelector('#editCodes'); 
      loginContainer.style.display = 'block';
      var loginContainer = document.querySelector('#DOM'); 
      loginContainer.style.display = 'none';
      editVaribals()
    } else {
      alert("Error")
    }
  }