var adminHome = document.querySelector('.adminHomeContent'); 
var musicPge = document.querySelector('#music'); 

function music() {
    adminHome.style.display = 'none'; 
    musicPge.style.display = 'block'; 
    displaySongs()
}

// Function to add 30 songs with points
async function addSongs() {

    const songName = document.getElementById("songName").value;
    const points = document.getElementById("songPoints").value;
    const text = document.getElementById("songTxt").value;
    const by = document.getElementById("songBy").value;

    const song = {songName, points, text, by}
    try {
        const response = await fetch('/music/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song),
        });
        const data = await response.json();
        console.log(data);
        displaySongs(); // Refresh the song list after adding songs
    } catch (error) {
        console.error(error);
    }
}

async function clearDatabase() {
    try {
      const response = await fetch('/music/clearSongs', {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        displaySongs()
      } else {
        console.error('Failed to clear the database:', response.status, response.statusText);
        alert("Error")
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }


// Function to get all songs from the server and display them in the HTML page
async function displlaySongs() {
    try {
        console.log("gg")
        const response = await fetch('/music/get');
        const data = await response.json();
        console.log(data)
        let songList = '';

        for (i in data.content) {
            const r = data.content[i]
            songList += ` <br><li id="card"
            ${r.points}: ${r.songName} - ${r.by} <br> <br>
            ${r.text}
            </li>`
        }

        document.getElementById('songList').innerHTML = songList;
    } catch (error) {
        console.error(error);
    }
}

async function displaySongs() {
    try {
        const response = await fetch('/music/get');
        const data = await response.json();

        // Sort songs based on points in descending order
        data.content.sort((a, b) => b.points - a.points);

        let songList = '';

        // Generate the song list with ranks, but limit to the top 30 songs
        const totalSongs = Math.min(data.content.length, 30);
        for (let i = 0; i < totalSongs; i++) {
            const r = data.content[i];
            const rank = i + 1; // Rank starts from 1 (highest rank)

            songList += ` <br><li id="card"> <br>
            Rank ${rank}: ${r.songName} - ${r.by} <br> <br>
            ${r.text}
            </li>`;
        }

        document.getElementById('songList').innerHTML = songList;
    } catch (error) {
        console.error(error);
    }
}