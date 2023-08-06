async function onStart() {
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

onStart()