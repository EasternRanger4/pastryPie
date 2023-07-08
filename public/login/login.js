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
  console.log(data);
  const userData = data.user;
  if (data.message == false) {
    document.getElementById("loginSatus").innerHTML= "Incroect Username or Password";
  } else if (data.message == true) {
    localStorage.setItem("login", true);
    localStorage.setItem("userID", userData.userid);
    localStorage.setItem("userSSC", userData.userSSC);
    window.location = "/loginHome"
  }
}