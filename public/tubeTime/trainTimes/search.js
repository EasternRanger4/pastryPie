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

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable2");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    
    while (switching) {
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        // Parse the time values as numbers for comparison
        var xValue = parseFloat(x.innerHTML);
        var yValue = parseFloat(y.innerHTML);
        
        if (dir === "asc") {
          if (xValue > yValue) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (xValue < yValue) {
            shouldSwitch = true;
            break;
          }
        }
      }
      
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }