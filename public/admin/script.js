async function onStart() {
    
}

function logout() {
    localStorage.clear();
    window.location = "/login";
}

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
    console.log(data)
    
    if (data.message == true) {
        if (data.user.clinetApri == "admin") {
            var loginContainer = document.querySelector('.login-container'); // Get the login-container element
            loginContainer.style.display = 'none'; // Set the display property to "none" to hide the login-container

            var loginContainer = document.querySelector('.adminHomeContent'); 
            loginContainer.style.display = 'block'; 

            document.getElementById("name").innerHTML= data.user.fname;
        } else {
            alert("You do not have permission to view this page");
            window.location = "/home"
        }
    } else if (data.message == false) {
        document.getElementById("loginSatus").innerHTML= "Incorrect Username or Password"
    } else if (data.message == "medium") {

    }
}

function back() {
    //Home Page - View
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'block'; 

    //Login Page - Remove
    var loginContainer = document.querySelector('.login-container'); 
    loginContainer.style.display = 'none'; 
    //Add Users - Remove
    var loginContainer = document.querySelector('#addUser'); 
    loginContainer.style.display = 'none'; 
    //View User - Remove
    var loginContainer = document.querySelector('#viewUser'); 
    loginContainer.style.display = 'none'; 
    //DOM - Remove
    var loginContainer = document.querySelector('#DOM'); 
    loginContainer.style.display = 'none'; 
    //editCodes - Remove 
    var loginContainer = document.querySelector('#editCodes'); 
    loginContainer.style.display = 'none'; 
    //news - Remove
    var loginContainer = document.querySelector('#news'); 
    loginContainer.style.display = 'none';
    //New Update - Remove
    var loginContainer = document.querySelector('#newUpdate'); 
    loginContainer.style.display = 'none'; 
    //edit update - remove
    var loginContainer = document.querySelector('#editUpdate'); 
    loginContainer.style.display = 'none'; 
    //edit upfate - remove 
    var loginContainer = document.querySelector('#edditUp'); 
    loginContainer.style.display = 'none'; 
    //music - remove 
    var loginContainer = document.querySelector('#music'); 
    loginContainer.style.display = 'none'; 
}