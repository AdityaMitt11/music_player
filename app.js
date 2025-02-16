const music = new Audio('audio/1.mp3');
//music.play(); 

const songs = [
    {
        id: 1,
        songName :`On My Way`,
        poster:"img/1.jpg"
    },
    {
        id: 2,
        songName :`Alan Walker-Fade`,
        poster:"img/2.jpg"
    },
    {
        id: 3,
        songName :`Cartoon - On & On`,
        poster:"img/3.jpg"
    },
    {
        id: 4,
        songName :`Warriyo - Mortals`,
        poster:"img/4.jpg"
    },
    {
        id: 5,
        songName :`Ertugrul Gazi`,
        poster:"img/5.jpg"
    },
    {
        id: 6,
        songName :`Electronic Music`,
        poster:"img/6.jpg"
    },
    {
        id: 7,
        songName :`Agar Tum Sath Ho`,
        poster:"img/7.jpg"
    },
    {
        id: 8,
        songName :`Suna Hai`,
        poster:"img/8.jpg"
    },
    {
        id: 9,
        songName :`Dilber`,
        poster:"img/9.jpg"
    },
    {
        id: 10,
        songName :`Duniya`,
        poster:"img/10.jpg"
    },
    {
        id: 11,
        songName :`Lgdi Lahore Di`,
        poster:"img/11.jpg"
    },
    {
        id: 12,
        songName :`Putt Jatt Da`,
        poster:"img/12.jpg"
    },
    {
        id: 13,
        songName :`Baarishein`,
        poster:"img/13.jpg"
    },
    {
        id: 14,
        songName :`Vasste`,
        poster:"img/14.jpg"
    },
    {
        id: 15,
        songName :`Lut Gaye`,
        poster:"img/15.jpg"
    },
    {
        id: 16,
        songName :`Tu Meri Jindgi Hai Tu`,
        poster:"img/16.jpg"
    },
    {
        id: 17,
        songName :`Bat ao yaad Hai Tumko wo Jab Dil KO Churaya Tha`,
        poster:"img/17.jpg"
    },
    {
        id: 18,
        songName :`Mere Dhol Judaiyan>`,
        poster:"img/18.jpg"
    },
    {
        id: 19,
        songName :`Eh Munde Pagal Ne Saare`,
        poster:"img/19.jpg"
    },
    {
        id: 20,
        songName :`Dunny 82K`,
        poster:"img/20.jpg"
    },
]

//For name and song display
Array.from(document.getElementsByClassName('songItem')).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});

//play
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click',()=>{
    if(music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});



const makeAllplays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
};
const makeAllBackground = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
        el.style.background = 'rgb(105, 105, 105, .0)';
    })
}  
//tell which music to be play next increase id by 1
let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index = el.target.id;
        // console.log(index);
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href=`audio/${index}.mp3`;

        let songTitles = songs.filter((els)=>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    });
});


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementById('dot');

music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur / 60);
    let sec1 =Math.floor(music_dur % 60);


    if(sec1 <10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if(sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;


    let progressBar = parseInt((music_curr / music_dur)*100);
    seek.value = progressBar;

    let seekbar =seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.querySelector('.vol_bar');
let vol_dot = document.querySelector('.vol_dot');

vol.addEventListener('input', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    } else if (vol.value > 0 && vol.value <= 50) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    } else if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});



let back = document.getElementById('back');
let next = document.getElementById('next');


back.addEventListener('click',()=>{
    index -=1;
    if(index <1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href=`audio/${index}.mp3`;

        let songTitles = songs.filter((els)=>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
});
next.addEventListener('click',()=>{
    index++;
    if(index >Array.from(document.getElementsByClassName('songItem')).length)
    {
        index=1;
    }
    music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href=`audio/${index}.mp3`;

        let songTitles = songs.filter((els)=>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
});



let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click',()=>{
    pop_song.scrollleft += 300;
});

pop_song_left.addEventListener('click',()=>{
    pop_song.scrollLeft -=300;
});


























let shuffle =document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click',()=>{
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
        
        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';

        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';

    }
});

const next_music = () => {
        index++;
        music.src = `audio/${index}.mp3`;
        poster_master_play = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href=`audio/${index}.mp3`;

        let songTitles = songs.filter((els)=>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .0)";
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');

}

const repeat_music = ()=> {
        index;
        music.src = `audio/${index}.mp3`;
        poster_master_play = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href=`audio/${index}.mp3`;

        let songTitles = songs.filter((els)=>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .0)";
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
}


const random_music = ()=> {
    if (index == songs.length) {
        index=1;
    } else {
        index = Math.floor ((Math.random()*songlength)+1);
    }
    music.src = `audio/${index}.mp3`;
        poster_master_play = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href=`audio/${index}.mp3`;

        let songTitles = songs.filter((els)=>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .0)";
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
}



music.addEventListener('ended',()=>{
    let b = shuffle.innerHTML;

    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;
        default:
            break;
    }
});


