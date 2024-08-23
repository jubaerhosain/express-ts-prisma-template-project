console.log('Welcome to Spotify');
// make audio object 
let current_song_index = 0;
let audio = new Audio('audios/1.mp3');
audio.id = 0;
let play_btn = document.getElementById('play-btn');
let previous_btn = document.getElementById('previous-btn');
let next_btn = document.getElementById('next-btn');
let progress_bar = document.getElementById('progress-bar');

// add event to adio object 
audio_event();

let songs = [
    {song_name: 'Let me love..', file_path: 'audios/1.mp3', cover_path: 'images/cover1.jpg', duration: '2.02'},
    {song_name: 'Let me sdfas love..', file_path: 'audios/2.mp3', cover_path: 'images/cover2.jpg', duration: '1.20'},
    {song_name: 'Lets adfsa me love..', file_path: 'audios/3.mp3', cover_path: 'images/cover3.jpg', duration: '3.22'},
    {song_name: 'Let me lsdf sdove..', file_path: 'audios/4.mp3', cover_path: 'images/cover4.jpg', duration: '2.42'}
];


// add song to song list
function add_song() {
    let song_list = document.getElementById('song-list');
    let song_list_html =  song_list.innerHTML;
    songs.forEach((element, index) => {
        let audio_obj = new Audio(element.file_path);
        song_list_html += 
        `<div class="song-item">
            <img class="song-images" src="${element.cover_path}" alt="cover${index+1}">
            <span class="song-title">${element.song_name}</span>
            <span class="song-play">
                <span class="time-stamp">${element.duration}
                    <i class="play-buttons fas fa-play-circle"></i>
                </span>
            </span>
        </div>`;
    });
    song_list.innerHTML = song_list_html;
}

// initialize song list 
add_song();

// add addEventListener to play buttons on songlist 
let play_btns = document.getElementsByClassName('play-buttons');

// add play class to all 
// remove pause class from all(if have)
function add_play_class() {
    Array.from(play_btns).forEach((element, index) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(play_btns).forEach((element, index) => {
    element.addEventListener('click', () => {
        if(element.classList.contains('fa-play-circle')) {
            // classlist is a set, that cannot contains duplicate 
            add_play_class();

            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');

            // pause previous audio 
            audio.pause();

            // may be this obj is in mai player btn 
            // so, don't make obj again
            if(audio.id != index) {
                audio = new Audio(songs[index].file_path);
                audio.id = index;
                audio_event();
            }

            // play current audio 
            play_audio();
        }
        else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            pause_audio();
        }
    });
});


// audio.preload = 'metadata';
// console.log(audio);

// bcz audio object is updated dynamically
// so event should re-add to this obj
function audio_event() {
    progress_bar.value = 0;
    audio.addEventListener('timeupdate', () => {
        if(audio.currentTime == audio.duration) {
            progress_bar.value = 0;
            pause_audio();
        }
        else {
            let progress = (audio.currentTime/audio.duration) * 100;
            progress_bar.value = progress;
        }
    });
}

progress_bar.addEventListener('change', () => {
    audio.currentTime = (progress_bar.value*audio.duration) / 100;
    // progressbar becomes unstable for change and timeupdate same time
    let progress = (audio.currentTime/audio.duration) * 100;
    progress_bar.value = progress;
});

// add play audio 
function play_audio() {
    if(audio.paused || audio.currentTime <= 0) {
        audio.play();
        play_btn.classList.remove('fa-play-circle');
        play_btn.classList.add('fa-pause-circle');
        let song_container = document.getElementById('song-container');
        song_container.style.backgroundImage = 'url("images/background-gif2.gif")';

        add_play_class();

        // if corresponding song item is off then turn on it symbol 
        Array.from(play_btns).forEach((element, index) => {
            if(index == audio.id) {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
            }
        });
    }
}

// pause audio when needed
function pause_audio() {
    if(audio.played) {
        audio.pause();
        play_btn.classList.remove('fa-pause-circle');
        play_btn.classList.add('fa-play-circle');
        let song_container = document.getElementById('song-container');
        song_container.style.backgroundImage = 'url("images/background1.jpg")';
    }
}

function next_song() {
    if(current_song_index == songs.length-1) 
        current_song_index = 0;
    else 
        current_song_index++;

    // pause previos song 
    audio.pause();

    // may be this obj is in mai player btn 
    // so, don't make obj again
    if(audio.id != current_song_index) {
        audio = new Audio(songs[current_song_index].file_path);
        audio.id = current_song_index;
        audio_event();
    }

    // play current audio 
    play_audio();
}

function previous_song() {
    if(current_song_index == 0) 
        current_song_index = songs.length-1;
    else
        current_song_index--;

    // pause previos song 
    audio.pause();

    // may be this obj is in mai player btn 
    // so, don't make obj again
    if(audio.id != current_song_index) {
        audio = new Audio(songs[current_song_index].file_path);
        audio.id = current_song_index;
        audio_event();
    }

    // play current audio 
    play_audio();
}

play_btn.addEventListener('click', () => {
    if(audio.paused || audio.currentTime <= 0) {
        play_audio();
    }
    else {
        pause_audio();
    }
});

previous_btn.addEventListener('click', () => {
    previous_song();
});

next_btn.addEventListener('click', () => {
    next_song();
});
