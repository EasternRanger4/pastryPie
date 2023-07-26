async function news(){
    
}

async function updates() {
    const txt8 = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>

    <label for="date">Date:</label>
    <input type="date" id="date" name="date" required><br>

    <label for="github_status">GitHub Status:</label>
    <input type="text" id="github_status" name="github_status" required><br>

    <label for="status">Status:</label>
    <input type="text" id="status" name="status" required><br>

    <label for="error_status">Error Status:</label>
    <input type="text" id="error_status" name="error_status" required><br>

    <label for="info">Info:</label>
    <input type="text" id="info" name="info" required><br>

    <button type="submit" onclick="updates2()">Submit</button>`
    document.getElementById("content").innerHTML= txt8;
}

async function updates2() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const github_status = document.getElementById("github_status").value;
    const status = document.getElementById("status").value;
    const error_status = document.getElementById("error_status").value;
    const info = document.getElementById("info").value;
    const response = await fetch('/pages/newUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, date, github_status, status, error_status, info})
    });
    const data = await response.json()
    console.log(data)
}

function logout() {
    localStorage.clear();
    window.location = "/login";
}