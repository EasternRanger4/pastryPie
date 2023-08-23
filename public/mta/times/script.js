let stations = [];
let data;

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');

async function onStart() {
    const responce = await fetch("/mta/stopPoint");
    data = await responce.json();
    console.log(data);

    for (i in data.result) {
        const r = data.result[i]
        const ts = `${r.stop_name} [${r.stop_id}]`
        stations.push(ts) 
    }
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStations = stations.filter(station => station.toLowerCase().includes(searchTerm));

    displayResults(filteredStations);
});

function displayResults(results) {
    resultsList.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        const noResultsItem = document.createElement('li');
        noResultsItem.textContent = 'No matching stations found.';
        resultsList.appendChild(noResultsItem);
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('li');
            resultItem.textContent = result;
            resultItem.onclick = function() {
                setStation(result);
            };
            resultsList.appendChild(resultItem);
        });
    }
}

onStart()