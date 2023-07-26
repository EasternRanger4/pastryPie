async function onStart() {
    var content = document.querySelector('#content'); 
    content.style.display = 'block'; 

    var content = document.querySelector('#button'); 
    content.style.display = 'block'; 

    var login = document.querySelector('.login-container'); 
    login.style.display = 'none'; 

    var login = document.querySelector('#myAccount'); 
    login.style.display = 'none'; 
    var login = document.querySelector('#afterContent'); 
    login.style.display = 'none'; 

    const userID = localStorage.getItem("userID")
    const userSSC = localStorage.getItem("userSSC")
    const responce = await fetch("/login/intDataCheck", {
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
    console.log(data)

    if (data.message == true) {
        //Login if authorsed
        const txt0 = `Hello! ${data.content.fname}`
        document.getElementById("welcome").innerHTML= txt0;
        window.userData = data.content;

        if (data.content.clinetApri == false) {
            console.log("apri false");
        } else {
            apriTrue(data.content.clinetApri)
        }

    } else {
        window.location = "/locked";
    }
}


onStart()