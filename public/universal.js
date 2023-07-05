async function setItems() {
    if (localStorage.getItem("login")) {
        window.page = '<a href="/loginHome">My Profile</a>';
    } else {
        window.page = '<a href="/login">Login</a>';
    }  

    const toSet1 = `<a href="/about">About</a><a href="/contact">Contact</a><a href="/news">News</a>${window.page}`;
    const toSet2 = `<p>&copy; 2023 Kamran Tailor. All rights reserved. Pastry Pie V0.01 <br> <a href="/legal">legal</a> <a href="/sitemap">Sitemap</a>
    <a href="https://github.com/EasternRanger4/pastryPie">Git Hub</a><a href="/updates">Updates</a></p></footer> `
    document.getElementById("linksLL").innerHTML= toSet1;
    document.getElementById("footer").innerHTML= toSet2;
};

function home() {
    window.location = "/home"
}
setItems()