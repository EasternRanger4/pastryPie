async function onStart() {
    document.getElementById("toSet").innerHTML= "";
    const responce = await fetch ("/pages/getNews");
    const data = await responce.json();
    console.log(data)
    setContent(data)
}

function setContent(data) {
    var toSet = "";
    window.data = data
    for (let i in data.content) {
      const r = data.content[i];
      const formattedDate = formatTimestamp(r.currentTimestamp);
      toSet += `<div class="image-container" onclick="displayProduct(${i})">
          <div class="image-overlay">
            <div class="image-title">${r.title}</div>
            <div class="image-content">${r.author}</div>
          </div>
          <img src="${r.img}" alt="Your Image" class="image">
        </div>`;
    }
    document.getElementById("grid").innerHTML = toSet;
}
  
function displayProduct(index) {
    const r = data.content[index]; // Assuming 'data' is a global variable containing your data.
    document.getElementById("grid").innerHTML = "";
    const formattedDate = formatTimestamp(r.currentTimestamp);
    const toSet = `
      <br>
      <button onclick="onStart()">Back</button>
      <h1>${r.title}</h1>
      <h8>${formattedDate}</h8> <br>
      By ${r.author}
      <p>${r.info}</p>
    `;
    document.getElementById("toSet").innerHTML = toSet;
}
  
function formatTimestamp(timestamp) {
    const dateObj = new Date(timestamp);
  
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  
    // Format: YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

onStart()