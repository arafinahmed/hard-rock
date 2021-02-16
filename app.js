const searchBtn = document.getElementById('search-button');
const searchField = document.getElementById('search-field');

searchField.addEventListener("keypress", function(event){
    if(event.key=="Enter"){
        event.preventDefault();
        searchBtn.click();
    }
})
const lyricsDiv = document.getElementById('songs-lyrics');

const searchSong = async () => {
    const searchText = document.getElementById('search-field').value;
    toggle(true);
    try {
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        const res = await fetch(url)
        const data = await res.json();
        displaySongs(data.data);
    }
    catch (e) {
        displayError("This is an error");
    }
}
// const searchSong = () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     console.log(url);
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displaySongs(data.data))
//     .catch(error => displayError("Something went wrong, please try"))

// }

const displaySongs = (songs) => {
    lyricsDiv.innerHTML = "";
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
        toggle(false);

    });
}
//
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch{
        displayError("Sorry");
    }
}

const displayLyrics = (lyrics) => {
    lyricsDiv.innerHTML = "";
    lyricsDiv.innerText = lyrics;

}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggle = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');

}