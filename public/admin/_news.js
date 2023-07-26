async function news() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#news'); 
    loginContainer.style.display = 'block';
    var loginContainer = document.querySelector('#DOM'); 
    loginContainer.style.display = 'none';

    const responce = await fetch ("/pages/getNews");
    const data = await responce.json();
    console.log(data)
    if (data.message == true) {
        var toDiplay2 = ""
        for (i in data.content) {
            const r = data.content[i]
            toDiplay2 += `<tr>
            <td>${r.title}</td>
            <td>${r.img}</td>
            <td>${r.id}</td>
            <td><button onclick="delNews('${r.id}')">Delete</button>
            <button onclick="setDisplayDomTwo('${r.info}')">Info</button></td>
          </tr>`
        }
        document.getElementById("tableDataNews").innerHTML= toDiplay2;
    } else {
        alert("Error")
    }
}

function setDisplayDomTwo(td) {
    back()
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#DOM'); 
    loginContainer.style.display = 'block';
    const tdd = `<br>
    <button onclick="news()">Back</button> <br>
    ${td}`
    document.getElementById("DOM").innerHTML= tdd;
}

function addNewNews() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#newNews'); 
    loginContainer.style.display = 'block';
    var loginContainer = document.querySelector('#news'); 
    loginContainer.style.display = 'none';
}

async function submitNewNews() {
    const title = document.getElementById("title").value;
    const img = document.getElementById("img").value;
    const info = document.getElementById("info").value;
    const author = document.getElementById("author").value;
    const currentTimestamp = Date.now();
    const responce = await fetch("/pages/newNews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          title,
          img,
          info,
          author,
          currentTimestamp
        }),
      });
      const data = await responce.json(); 
      console.log(data)
      if (data.message == true) {
        alert("Created story")
      } else {
        alert(error)
      }
      var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 
    var loginContainer = document.querySelector('#newNews'); 
    loginContainer.style.display = 'none';
    var loginContainer = document.querySelector('#news'); 
    loginContainer.style.display = 'block';
    news()
}

async function delNews(id) {
    console.log(id)
    const responce = await fetch("/pages/delNews", {
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
    news()
}