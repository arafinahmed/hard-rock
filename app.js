const searchSong = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
}

const displaySongs = (songs) => {
    const songConatainer = document.getElementById('song-container');
    songConatainer.innerHTML = "";
    songs.forEach(song => {
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}');"  class="btn btn-success">Get Lyrics</button>
        </div>`;
        songConatainer.appendChild(div);
        console.log(song);
        
    });
}
//
const getLyric = (artist, title) => {
    console.log(artist, title);
}