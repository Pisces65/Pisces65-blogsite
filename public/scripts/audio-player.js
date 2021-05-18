let songs = [];
let songIndex = 0;
$.getJSON('/public/data/songs.json', (songData)=>{
        songData.forEach(song => {
            songs.push(song['title'])
        });
})
.then(()=>{
    $(document).ready(function(){
        const musicContainer = document.getElementById('music-container');
        const playBtn = document.getElementById('play');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        const audio = document.getElementById('audio');
        const progress = document.getElementById('progress');
        const progressContainer = document.getElementById('progress-container');
        const title = document.getElementById('title');
        const cover = document.getElementById('cover');
        const currTime = document.querySelector('#currTime');
        const durTime = document.querySelector('#durTime');

        // Initially load song details into DOM
        loadSong(songs[songIndex]);

        // Update song details
        function loadSong(song) {
        title.innerText = song;
        audio.src = `/public/music/songs/${song}.mp3`;
        cover.src = `/public/music/images/${song}.jpg`;
        }

        // Play song
        function playSong() {
        musicContainer.classList.add('play');
        playBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#FFFFFF'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z'/></svg>";

        audio.play();
        }

        // Pause song
        function pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#FFFFFF'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z'/></svg>";

        audio.pause();
        }

        // Previous song
        function prevSong() {
        songIndex--;

        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);

        playSong();
        }

        // Next song
        function nextSong() {
        songIndex++;

        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        loadSong(songs[songIndex]);

        playSong();
        }

        // Update progress bar
        function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        }

        // Set progress bar
        function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
        }

        //get duration & currentTime for Time of song
        function DurTime (e) {
            const {duration,currentTime} = e.srcElement;
            var sec;
            var sec_d;

            // define minutes currentTime
            let min = (currentTime==null)? 0:
            Math.floor(currentTime/60);
            min = min <10 ? '0'+min:min;

            // define seconds currentTime
            function get_sec (x) {
                if(Math.floor(x) >= 60){
                    
                    for (var i = 1; i<=60; i++){
                        if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                            sec = Math.floor(x) - (60*i);
                            sec = sec <10 ? '0'+sec:sec;
                        }
                    }
                }else{
                    sec = Math.floor(x);
                    sec = sec <10 ? '0'+sec:sec;
                }
            } 

            get_sec (currentTime,sec);

            // change currentTime DOM
            currTime.innerHTML = min +':'+ sec;

            // define minutes duration
            let min_d = (isNaN(duration) === true)? '0':
                Math.floor(duration/60);
            min_d = min_d <10 ? '0'+min_d:min_d;


            function get_sec_d (x) {
                if(Math.floor(x) >= 60){
                    
                    for (var i = 1; i<=60; i++){
                        if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                            sec_d = Math.floor(x) - (60*i);
                            sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                        }
                    }
                }else{
                    sec_d = (isNaN(duration) === true)? '0':
                    Math.floor(x);
                    sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                }
            } 

            // define seconds duration
            
            get_sec_d (duration);

            // change duration DOM
            durTime.innerHTML = min_d +':'+ sec_d;
                
        };

        // Event listeners
        playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
        });

        // Change song
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);

        // Time/song update
        audio.addEventListener('timeupdate', updateProgress);

        // Click on progress bar
        progressContainer.addEventListener('click', setProgress);

        // Song ends
        audio.addEventListener('ended', nextSong);

        // Time of song
        audio.addEventListener('timeupdate',DurTime);
        })

})