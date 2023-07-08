const loginStatus = localStorage.getItem('login');

if (loginStatus !== 'true') {
  // Redirect the user to the homepage
  window.location.href = '/locked';
}

async function dataCheck() {
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
  if (data.message == true) {
    console.log("PERM")
  } else {
    window.location = "/locked";
  }
}

dataCheck()