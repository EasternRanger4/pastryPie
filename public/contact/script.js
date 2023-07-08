async function sendEmail() {
    const subject = document.getElementById("subject").value;
    const text = document.getElementById("text").value;
    const email = document.getElementById("email").value;
    const responce = await fetch("/external/notifyAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json ",
        },
        body: JSON.stringify({
            subject,
            text,
            email
        }),
    });
    const data = await responce.json();
    if (data.message == true) {
        alert("Sent your message we will be in contact with you")
        window.location= "/home"
    } else {
        alert("error sending message")
    }
}