//const { userSSC, userID, firstName, middleName, lastName, dob } = request.body;

async function sendDet() {
    const firstName = document.getElementById('fname').value;
    const middleName = document.getElementById('mname').value;
    const lastName = document.getElementById('lname').value;
    const dob = document.getElementById('dob').value;

    const responce = await fetch("/changePass/editUserInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            userID, 
            userSSC,
            firstName,
            middleName,
            lastName,
            dob
        }),
    });

    const data = await responce.json();
    console.log(data);

    if (data.content == true) {
        alert('Updated info')
    } else {
        alert(data.message)
    }
} 