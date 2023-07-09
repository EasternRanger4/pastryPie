async function getMenu() {
    try {
      console.log("getting Menu");
      const txt4 = `
        <div class="container1">
          <div class="menu">
            <div>
              <h2 class="menu-group-heading"> Martinis</h2>
              <div id="Martinis" class="menu-group"></div>
            </div>
            <div>
              <h2 class="menu-group-heading">Sours</h2>
              <div id="sours" class="menu-group"></div>
            </div>
            <div>
              <h2 class="menu-group-heading">Tequila</h2>
              <div id="tequila" class="menu-group"></div>
            </div>
            <div>
              <h2 class="menu-group-heading">Champagne Cocktails</h2>
              <div id="champ" class="menu-group"></div>
            </div>
            <div>
              <h2 class="menu-group-heading">More...</h2>
              <div id="more" class="menu-group"></div>
            </div>
          </div>
        </div>`;
      document.getElementById("container1").innerHTML = txt4;
      const dataBase = "cocktailMenu";
      const authCode = "smallYellowPigsAreCute";
      const type = "seeMenu";
      const response = await fetch("/cocktails/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          dataBase,
        }),
      });
      if (!response.ok) {
        throw new Error("Error fetching menu");
      }
      const data = await response.json();
      console.log(data);
      var martinis = "";
      var tequila = "";
      var sours = "";
      var more = "";
      var champ = "";
      for (cocktail in data.content) {
        var toSet = `
          <div class="menu-item">
            <img class="menu-item-image" src="${data.content[cocktail].url}" alt="Bruschetta">
            <div class="menu-item-text">
              <h3 class="menu-item-heading">
                <span class="menu-item-name">${data.content[cocktail].name}</span>
              </h3>
              <p class="menu-item-description">
                ${data.content[cocktail].info}
              </p>
              <button id="orderBut" onclick="orderCocktail('${data.content[cocktail].name}')">Order</button>
            </div>
          </div>`;
        if (data.content[cocktail].cat == "Champagne Cocktails") {
          champ += toSet;
        } else if (data.content[cocktail].cat == "Martinis") {
          martinis += toSet;
        } else if (data.content[cocktail].cat == "Tequila") {
          tequila += toSet;
        } else if (data.content[cocktail].cat == "Sours") {
          sours += toSet;
        } else if (data.content[cocktail].cat == "More") {
          more += toSet;
        }
      }
      document.getElementById("Martinis").innerHTML = martinis;
      document.getElementById("tequila").innerHTML = tequila;
      document.getElementById("sours").innerHTML = sours;
      document.getElementById("more").innerHTML = more;
      document.getElementById("champ").innerHTML = champ;
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g., show an error message to the user
    }
  }
  

function orderCocktail(cocktail) {
    console.log(cocktail);
    const txt3 = `
    <h1 id="cocktail">${cocktail}</h1>
    <label for="name">Name: </label> 
    <input id="name"> </input> <br> <br>
    <label for="contact">Phone Number: </label>
    <input type="tel" id="contact"> </input> <br> <br>
    <label for="notes">Notes</label>
    <textarea id="notes"></textarea> <br> <br>
    <button onclick="order('${cocktail}')">Order</button>`
    document.getElementById("container1").innerHTML= txt3;
}

async  function order(cocktail) {
    const type = "addOrder";
    const name = document.getElementById("name").value
    const notes = document.getElementById("notes").value
    const contact = document.getElementById("contact").value
    console.log(type, cocktail, name, notes, contact)
    const responce = await fetch("/cocktails/addOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            cocktail,
            name,
            contact,
            notes
        }),
    });
    const data = await responce.json();
    console.log(data);
    if (data.message == true ) {
        alert("Your Cocktail is on the way!")
        getMenu()
    } else if (data.message == false ) { 
        alert("Error")
    }
}

async function admin() {
    const pin = prompt("Admin Pin") 
    const responce = await fetch("/pinCodes/TC", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            pin
        }),
    });
    const data = await responce.json();
    console.log(data)
    if (data.message == true) {
        const txt0 = `<div id="button"> <button onclick="back()">Back</button> 
        <button onclick="viewOrders()">View Orders</button>
        <button onclick="editMenu()">Edit Menu</button> 
        <button onclick="addCocktail()">Add Cocktial</button> 
        </div> <div id="content-c">Content-C</div>`
        document.getElementById("content").innerHTML= txt0;
        viewOrders()
    } else {
        alert("Inccorect Pin")
    }
}

async function viewOrders() {
    console.log("View Orders")
    const type = "seeOrders";
    const responce = await fetch("/cocktails/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type
        }),
    });
    const data = await responce.json();
    console.log(data)
    const TBLdflt = `<br>
    <table><therd><tr>
    <th>Cocktail</th>
    <th>Name</th>
    <th>Notes</th>
    <th>Contact</th>
    <th>Actions</th>
    </tr></thread><tbody id="tableData"> </tbody>
    </table>`
    document.getElementById("content-c").innerHTML= TBLdflt;
    var toSet = ""
    for (cocktail in data.content) {
        console.log(data.content[cocktail])
        toSet += `<tr>
        <td>${data.content[cocktail].cocktail}</td>
        <td>${data.content[cocktail].name}</td>
        <td>${data.content[cocktail].notes}</td>
        <td>${data.content[cocktail].contact} </td>
        <td>
            <button onclick="delOrder('${data.content[cocktail]._id}')">Made</button>
        </tr>`
    }
    document.getElementById("tableData").innerHTML= toSet;
}

async function delOrder(_id) {
    const type = "delOrder"
    const responce = await fetch("/cocktails/delOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            _id
        }),
    });
    const data = await responce.json() ;
    if (data.message == true ) {
        alert("Deleted Item")
        viewOrders()
    } else if (data.message == false ) { 
        alert("Error")
    }
    viewOrders();
}

async function editMenu() {
    const dataBase = "seeMenu";
    const authCode = "smallYellowPigsAreCute";
    const type = "seeMenu"
    const responce = await fetch("/cocktails/menu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            dataBase
        }),
    });
    const data = await responce.json();
    console.log(data);
    const TBLdflt = `<br>
    <table><therd><tr>
    <th>Cocktail</th>
    <th>Info</th>
    <th>Catagory</th>
    <th>Actions</th>
    </tr></thread><tbody id="tableData"> </tbody>
    </table>`
    document.getElementById("content-c").innerHTML= TBLdflt;
    var toSet = "";
    for (cocktial in data.content) {
        toSet += `<tr><td>${data.content[cocktial].name}</td><td>${data.content[cocktial].info}</td>
        <td>${data.content[cocktial].cat} </td>
        <td><button onclick="delMen('${data.content[cocktial]._id}')">Delete</button>
        <button onclick="editMen('${data.content[cocktial]._id}')">Edit</button></td></tr>`;
    }
    document.getElementById("tableData").innerHTML= toSet;

}

function addCocktail() {
    const txt1 = `<label for="name">Name:</label> <input id="name"> <br> <br> <label for="url">Image URL:</label> <input id="url"> <br> <br>
    <label for="dropdownMenu">Catagory:</label> <select id="dropdownMenu">
    <option value="Martinis">Martinis</option>
    <option value="Sours">Sours</option>
    <option value="Champagne Cocktails">Champagne Cocktails</option>
    <option value="Tequila">Tequila</option>
    <option value="More">More</option>
    </select>  
    <br> <br> <label for="info">Info:</label>  <textarea id="info" rows="4" cols="50"></textarea> <br> <button onclick="submitNewItem()">Add</button>`
    document.getElementById("content-c").innerHTML= txt1;
}

async function submitNewItem() {
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const cat = document.getElementById("dropdownMenu").value;
    const info = document.getElementById("info").value;
    const type = "addMenu"
    const responce = await fetch("/cocktails/addMenu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            name,
            info,
            url,
            cat
        }),
    });
    const data = await responce.json() ;
    alert("Cocktail Added")
    editMenu();
}
function back() {
    location.reload()
}

async function delMen(cocktail) {
    console.log(cocktail)
    const type = "delMenuItem"
    const _id = cocktail;
    const responce = await fetch("/cocktails/delMenu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            _id
        }),
    });
    const data = await responce.json() ;
    if (data.message == true ) {
        alert("Deleted Item")
    } else if (data.message == false ) { 
        alert("Error")
    }
    editMenu();
}

async function editMen(id) {
    const _id = id;
    const type = "getEnt"
    const responce = await fetch("/cocktails/getEnt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            _id
        }),
    });
    const data = await responce.json() ;

    const name = data.content.name
    const url = data.content.url;
    const catagory = data.content.cat
    const info = data.content.info
    const ent = `
    <label for="name">Name:</label>
    <input id="name" value="${name}"><br><br>
    <label for="url">Image URL:</label>
    <input id="url" value="${url}"><br><br>
    <label for="dropdownMenu">Category:</label>
    <select id="dropdownMenu">
      <option value="Martinis" ${catagory === "Martinis" ? "selected" : ""}>Martinis</option>
      <option value="Sours" ${catagory === "Sours" ? "selected" : ""}>Sours</option>
      <option value="Champagne Cocktails" ${catagory === "Champagne Cocktails" ? "selected" : ""}>Champagne Cocktails</option>
      <option value="Tequila" ${catagory === "Tequila" ? "selected" : ""}>Tequila</option>
      <option value="More" ${catagory === "More" ? "selected" : ""}>More</option>
    </select><br><br>
    <label for="info">Info:</label>
    <textarea id="info" rows="4" cols="50">${info}</textarea><br>
    <button onclick="updateItem('${_id}')">Update</button>`;
    document.getElementById("content-c").innerHTML= ent;
}

async function updateItem(_id) {
    const type = "updateEnt";
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const cat = document.getElementById("dropdownMenu").value;
    const info = document.getElementById("info").value;
    const responce = await fetch("/cocktails/updateEnt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            type,
            _id,
            name,
            url,
            cat,
            info
        }),
    });
    const data = await responce.json() ;
    console.log(data)
    if (data.message == true) {
        alert("Updated menu item")
        editMenu()
    } else if (data.message == false) {
        alert("Error")
        editMenu()
    }
}
getMenu()