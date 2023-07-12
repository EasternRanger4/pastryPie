async function aesKeys() {
    const response = await fetch("/fortnite/fortniteAES");
    const data = await response.json(); 
    console.log(data);
    var keyData = "";
    for (const item in data.data.data.dynamicKeys) {
      const toAdd = `<div class="icon"> <h3>${data.data.data.dynamicKeys[item].pakFilename}</h3> pakGuid: ${data.data.data.dynamicKeys[item].pakGuid} <br> Key: ${data.data.data.dynamicKeys[item].key} </div>`;
      keyData = keyData + toAdd;
    }
    const aesKeys = `<h2> ASE Keys </h2> 
    Bulid: ${data.data.data.build} <br>
    Main Key: ${data.data.data.mainKey} <br>
    Last Updated: ${data.data.data.updated} <br>
    <h3> Dynamic keys </h3>
    <div class="icon-container>"${keyData}</div>`
    document.getElementById("display").innerHTML= aesKeys;
};

async function banners() {
    const response = await fetch("/fortnite/fortniteBanners");
    const newdata = await response.json(); 
    console.log(newdata);
    var bannersData = "";
    for (const item in newdata.data.data) {
      const toAdd = `<div class="icon"> <h3>${newdata.data.data[item].devName}</h3><img src="${newdata.data.data[item].images.smallIcon}" alt="${newdata.data.data[item].description}"> </div>`;
      bannersData = bannersData + toAdd;
    }
    const banners = `<h2>Banners</h2> <input type="text" id="searchInput" placeholder="Search..."/>
    <button onclick="search()">Search</button> <br> <br> <div class="icon-container">${bannersData}</div>`;
    document.getElementById("display").innerHTML = banners;
};

async function cosmetics() {
    const response = await fetch("/fortnite/fortniteCosmetics");
    const newdata = await response.json(); 
    console.log(newdata);
    var bannersData = "";
    for (const item in newdata.data.data) {
      const toAdd = `<div class="icon" onclick="showDescription('${newdata.data.data[item].description}')"> <div> <h3>${newdata.data.data[item].name}</h3><img src="${newdata.data.data[item].images.smallIcon}" alt="${newdata.data.data[item].description}"> </div> </div>`;
      bannersData = bannersData + toAdd;
    }
    const banners = `<h2>Banners</h2> <input type="text" id="searchInput" placeholder="Search..."/>
    <button onclick="search2()">Search</button> <br> <br> <div class="icon-container">${bannersData}</div>`;
    document.getElementById("display").innerHTML = banners;
};
async function Ncosmetics() {
  const response = await fetch("/fortnite/NewFortniteCosmetics");
  const newdata = await response.json(); 
  console.log(newdata);
  var bannersData = "";
  for (const item in newdata.data.data) {
    const toAdd = `<div class="icon" onclick="showDescription('${newdata.data.data.items[item]}')"> <div> <h3>${newdata.data.data.items[item].name}</h3><img src="${newdata.data.data.items[item].images.icon}" alt="${newdata.data.data.items[item].description}"> </div> </div>`;
    bannersData = bannersData + toAdd;
  }
  const banners = `<h2>Banners</h2> <input type="text" id="searchInput" placeholder="Search..."/>
  <button onclick="search2()">Search</button> <br> <br> <div class="icon-container">${bannersData}</div>`;
  document.getElementById("display").innerHTML = banners;
};

async function creatorCodes() {
    alert("Not yet available")
};

async function news() {
    const response = await fetch("/fortnite/fortniteNews");
    const newdata = await response.json(); 
    console.log(newdata);
    var bannersData = "";
    for (const item in newdata.data.data.br.motds) {
      const toAdd = `<div class="icon2" > <h3>${newdata.data.data.br.motds[item].title}</h3><img src="${newdata.data.data.br.motds[item].image}" width="500px" " alt="${newdata.data.data.br.motds[item].body}" <br> <br> ${newdata.data.data.br.motds[item].body} </div>`;
      bannersData = bannersData + toAdd;
    }
    const banners = `<h2>News</h2> <div class="icon-container2">${bannersData}</div>`;
    document.getElementById("display").innerHTML = banners;
};

async function playlists() {
    const response = await fetch("/fortnite/fortnitePlaylists");
    const newdata = await response.json(); 
    console.log(newdata);
    var bannersData = "";
    for (const item in newdata.data.data) {
      const toAdd = `<div class="icon3" onclick="showDescription("${newdata.data.data[item].description}")> <h3>${newdata.data.data[item].name}</h3><img src="${newdata.data.data[item].images.missionIcon}"> </div>`;
      bannersData = bannersData + toAdd;
    }
    const banners = `<h2>News</h2> <input type="text" id="searchInput" placeholder="Search..."/>
    <button onclick="search2()">Search</button> <br> <br> <div class="icon-container3">${bannersData}</div>`;
    document.getElementById("display").innerHTML = banners;
};

async function shop() {
    const response = await fetch("/fortnite/fortniteShop");
    const newdata = await response.json(); 
    console.log(newdata);
    var daily = "";
    for (const item in newdata.data.data.daily.entries) {
      const toAdd = `<div class="icon"> <h3>${newdata.data.data.daily.entries[item].items[0].name} - ${newdata.data.data.daily.entries[item].finalPrice} </h3><img src="${newdata.data.data.daily.entries[item].items[0].images.smallIcon}"> </div>`;
      daily = daily + toAdd;
    }
    var featured = "";
    for (const item in newdata.data.data.featured.entries) {
      const toAdd = `<div class="icon"> <h3>${newdata.data.data.featured.entries[item].items[0].name} - ${newdata.data.data.featured.entries[item].finalPrice} </h3><img src="${newdata.data.data.featured.entries[item].items[0].images.smallIcon}"> </div>`;
      featured = featured + toAdd;
    }
    var Sfeatured = "";
    for (const item in newdata.data.data.specialFeatured.entries) {
      const toAdd = `<div class="icon"> <h3>${newdata.data.data.specialFeatured.entries[item].items[0].name}</h3><img src="${newdata.data.data.specialFeatured.entries[item].items[0].images.smallIcon}"> </div>`;
      Sfeatured = Sfeatured + toAdd;
    }
    const banners = `<h2>Shop</h2> 
    Please note some items might be bundles also please note only daily and featured will show 
    <div id="dailyShop"> <h3> Daily </h3> <div class="icon-container">${daily}</div></div> 
    <br> <br>
    <div> <h3> Featured </h3> <div class="icon-container">${featured}</div> </div>`;
    document.getElementById("display").innerHTML = banners;
};

  function showDescription(description) {
    alert(description);
  }
  
function search() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const icons = document.querySelectorAll("#icons");
    for (const icon of icons) {
      const devName = icon.querySelector("h3").textContent.toLowerCase();
      if (devName.includes(searchTerm)) {
        icon.style.display = "";
      } else {
        icon.style.display = "none";
      }
    }
  }

  function search2() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const icons = document.querySelectorAll("#icons");
    for (const icon of icons) {
      const name = icon.querySelector("h3").textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        icon.style.display = "";
      } else {
        icon.style.display = "none";
      }
    }
  }
  
