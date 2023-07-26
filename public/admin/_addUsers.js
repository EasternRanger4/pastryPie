function addUser() {
    var loginContainer = document.querySelector('.adminHomeContent'); 
    loginContainer.style.display = 'none'; 

    var loginContainer = document.querySelector('#addUser'); 
    loginContainer.style.display = 'block'; 
}

async function addUser2() {
    document.getElementById("ldrAddUser").innerHTML= '<div class="small-loader"></div>'
    const fname = document.getElementById("fname").value;
    const mname = document.getElementById("mname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("passwordd").value;
    const dob = document.getElementById("dob").value;
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
          dob
        }),
      });
    const data = await responce.json();
    console.log(data);
    if (data.message == true) {
        const res = `Successfully created user!
        First Name: ${data.content.fname}
        Middle Name: ${data.content.mname} 
        Last Name: ${data.content.lname} 
        Username: ${data.content.username} 
        Date of Birth: ${data.content.dob} `
        alert(res)
        document.getElementById("ldrAddUser").innerHTML= ''
        var loginContainer = document.querySelector('.adminHomeContent'); 
        loginContainer.style.display = 'block'; 

        var loginContainer = document.querySelector('#addUser'); 
        loginContainer.style.display = 'none'; 
    } else {
        alert(data)
    }
}