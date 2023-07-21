async function setItems() {
    window.upadte = "V0.09"
    if (localStorage.getItem("login")) {
        window.page = '<a href="/loginHome">My Profile</a>';

    } else {
        window.page = '<a href="/login">Login</a>';
    }  

    const toSet1 = `<a href="/about">About</a><a href="/contact">Contact</a><a href="/news">News</a>${window.page}`;
    const toSet2 = `<p>&copy; 2023 Kamran Tailor. All rights reserved. <br> Pastry Pie V0.09 <br> <a href="/legal">legal</a> <a href="/sitemap">Sitemap</a>
    <a href="https://github.com/EasternRanger4/pastryPie">Git Hub</a> <a href="/updates">Updates</a></p></footer> `
    document.getElementById("linksLL").innerHTML= toSet1;
    document.getElementById("footer").innerHTML= toSet2;

        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;
    
        const userAgent = navigator.userAgent;
        const reesponse = await fetch('/pageView', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ipAddress: ipAddress, userAgent: userAgent })
        });
        const dataa = await reesponse.json();
    
        // Use the information as needed
    
};

function home() {
    window.location = "/home"
}


setItems()