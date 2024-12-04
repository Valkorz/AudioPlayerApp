document.addEventListener('DOMContentLoaded', function () {
    const ctgBox = document.getElementById('categories');
    const searchBtn = document.getElementById('search');
    const cover = document.getElementById('cover');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    console.log(`got ctg: ${ctgBox}`);

    const audioPlayer = document.getElementById('audioPlayer');
    const playbackMenu = document.getElementById('playbackMenu');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const skipBtn = document.getElementById('skipBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');

    const songSrc = localStorage.getItem('currentSong');
    const songTimestamp = localStorage.getItem('songStamp');
    const songCover = localStorage.getItem('songCover');

    // fetch('content/config/styles.json')
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data[0].name);
    // })

    if(songSrc){
        audioPlayer.src = songSrc;
        if(songTimestamp) audioPlayer.currentTime = songTimestamp;
        if(songCover) cover.src = songCover;
        audioPlayer.play();
        playbackMenu.style.display = 'flex';
        playbackMenu.style.justifyContent = 'center';
        playbackMenu.style.alignItems = 'center';
        duration.textContent = localStorage.getItem('songDuration');

        title.textContent = `${localStorage.getItem('songTitle')} - ${localStorage.getItem('songAuthor')}`;
        description.textContent = localStorage.getItem('songDescription');
    }

    fetch('content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
            const categories = []
            data.map((entry) => {
                if (!categories.includes(entry.category)) {
                    categories.push(entry.category);
                }
            })

            categories.forEach(category => {
                const ctg = document.createElement('li');
                ctg.innerHTML = `<a class="dropdown-item" href="/search.html?query=${category.toLowerCase()}"><h5>${category.toLowerCase()}</h5></a>`;
                ctg.style.width = '50%';
                ctgBox.appendChild(ctg);
            });

        })
        .catch(error => console.log(error))

    searchBtn.addEventListener('click', function(){
        searchBtn.href = `/search.html?query=${document.getElementById('queryInput').value}`;
    });

    searchBtn.addEventListener('click', function(){
        searchBtn.href = `/search.html?query=${document.getElementById('queryInput').value}`;
    });

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    skipBtn.addEventListener('click', () => {
        audioPlayer.currentTime += 10; // Skip 10 seconds
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const current = audioPlayer.currentTime;
        const total = audioPlayer.duration;
        progressBar.value = (current / total) * 100;
        currentTime.textContent = formatTime(current);
        localStorage.setItem('songStamp', audioPlayer.currentTime);
    });

    progressBar.addEventListener('input', () => {
        const total = audioPlayer.duration;
        audioPlayer.currentTime = (progressBar.value / 100) * total;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

});