window.currentPage = 0; // Track the current page
const itemsPerPage = 50;
document.getElementById("bac").innerHTML= "";


async function getAll() {
  document.getElementById("viewAll").innerHTML= ""
  const txt1 = `<button onclick="bac()">Back</button>`
  const txt2 = `<button onclick="fow()">Next</button>`
  if (currentPage >= 25) {
    document.getElementById("bac").innerHTML= txt1;
    document.getElementById("fow").innerHTML= "";
  } else if (currentPage <= 0 ) {
    document.getElementById("fow").innerHTML= txt2;
    document.getElementById("bac").innerHTML= "";
  } else {
    document.getElementById("bac").innerHTML= txt1;
    document.getElementById("fow").innerHTML= txt2;
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage) * itemsPerPage}&limit=${itemsPerPage}`);
  const data = await response.json();
  const pokemon = data.results;

  const contentElement = document.getElementById("content");

  var txt0 = `Page ${currentPage} of 25 <br>`
  for (i in pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon[i].name}`);
    const pokemonData = await response.json();

    const url = pokemonData.sprites.front_default
    //const url = pokemonData.sprites.other.offical_artwork.front_default
    const pokemonCodeName = pokemon[i].name;
    const formattedName = formatName(pokemonData.name);

    const hello = "hello";
    const goodbye = "goodbye"
    const details = {hello, goodbye}
    const detailsString = JSON.stringify(pokemonData);
    txt0 += `<div id="pokemon" onclick="extraPokemonDetails('${pokemonData.name}')"> 
    <img src="${url}" alt="${pokemon[i].name}"> <br>
    <center> ${formattedName} </center></div>`
  };
  document.getElementById("content").innerHTML= txt0;
  if (currentPage == 25) {
    document.getElementById("fow").innerHTML= "";
  }
}

function fow() {
  const txt1 = `<button onclick="bac()">Back</button>`
  document.getElementById("bac").innerHTML= txt1;
  currentPage ++;
  const txt3 = `Page ${currentPage} of 25 <br> <div class="loader"></div>`
  document.getElementById("content").innerHTML= txt3;
  getAll()
}

function bac() {
  document.getElementById("content").innerHTML= '<div class="loader"></div> ';
  if (currentPage > 0) {
    document.getElementById("bac").innerHTML= "";
  } else {
    const txt2 = `<button onclick="fow()">Next</button>`
    document.getElementById("fow").innerHTML= txt2;
  }
  currentPage = currentPage - 1 ; 
  const txt3 = `Page ${currentPage} of 25 <div class="loader"></div>`
  document.getElementById("content").innerHTML= txt3;
  getAll()
}

async function search() {
  document.getElementById("fow").innerHTML = "";
  document.getElementById("bac").innerHTML = "";

  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Clear previous search results
  const searchResultsElement = document.getElementById("content");
  searchResultsElement.innerHTML = "";

  // Make API request to retrieve Pokémon data
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
  if (response.ok) {
    const pokemonData = await response.json();

    // Format Pokémon name
    const formattedName = formatName(pokemonData.name);

    const hello = "hello";
    const goodbye = "goodbye"
    const details = {hello, goodbye}
    const detailsString = JSON.stringify(pokemonData);
    // Construct HTML content
    const htmlContent = `<div id="pokemon" onclick="extraPokemonDetails('${pokemonData.name}')"> 
    <img src="${url}" alt="${pokemon[i].name}"> <br>
    <center> ${formattedName} </center></div>`

    // Set HTML content in the searchResultsElement
    searchResultsElement.innerHTML = htmlContent;
  } else {
    // Display error message if Pokémon not found
    const errorMessage = "Pokémon not found";
    const errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = errorMessage;
    searchResultsElement.appendChild(errorMessageElement);
  }

  // Clear search input
  searchInput.value = "";
  document.getElementById("viewAll").innerHTML = "<button onclick='getAll()'>View All</button> <br>";
}


function formatName(name) {
  if (!name) {
    return "";
  }
  return name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function extraPokemonDetails(details) {
  document.getElementById("content").innerHTML= '<div class="loader"></div> ';
  const url = `https://pokeapi.co/api/v2/pokemon/${details}`
  const response = await fetch(url)
  const data = await response.json()
  document.getElementById("fow").innerHTML = "";
  document.getElementById("bac").innerHTML = "";
  document.getElementById("viewAll").innerHTML = "<button onclick='getAll()'>View All</button> <br>";
  
  const formattedName = formatName(data.name);
  var toSet = `<h1>${formattedName}</h1>`;
  //Stats
  toSet += `<h3>Stats</h3>`
  toSet += `Height ${data.height} <br>`
  toSet += `Weight ${data.weight} <br> <br>`
  
  for (i in data.stats) {
    const formattedNameStat = formatName(data.stats[i].stat.name);
    toSet += `${formattedNameStat}: ${data.stats[i].base_stat} <br>`
  }
  
  //Abilatys 
  toSet += `<br> <h3>Abilities</h3>`
  for (i in data.abilities) {
    const formattedNameAbil = formatName(data.abilities[i].ability.name);
    const abilityResponce = await fetch(data.abilities[i].ability.url)
    const abilityData = await abilityResponce.json();
    
    //Effect Changes 
    for (a in abilityData.effect_entries) {
      if (abilityData.effect_entries[a].language.name == "en") {
        toSet += `${formattedNameAbil} <br>`
        toSet += `Effect: ${abilityData.effect_entries[a].effect} <br> Short Effect: ${abilityData.effect_entries[a].short_effect} <br> <br>`
      } 
    }
  }

  //Spriets 
  toSet += `<br> <h3>Sprites</h3>`

  //Versions 
  for (i in data.sprites.versions) {
    const gen = data.sprites.versions[i]
    for (a in gen) {
      //console.log(gen[a])
      for (b in gen[a]) {
        if (gen[a][b] == "" || undefined) {
          toSet += `<img width="70" height="70" src="${gen[a][b]}"></img>`;
        }
      }
    }
  }

  for (i in data.sprites.versions) {
    const gen = data.sprites.versions[i]
    for (a in gen) {
      toSet += `<img width="70" height="70" src="${gen[a].front_default}"></img>`
    }
  }

  //Normal
  var newsprites = Object.assign({}, data.sprites);
  delete newsprites.other;
  delete newsprites.versions;

  for (i in newsprites) { if (newsprites[i] == null) {} else { toSet += `<img width="70" height="70" src="${newsprites[i]}"></img>`} };
  
  document.getElementById("content").innerHTML = toSet;
}
getAll();
