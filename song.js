let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

let track = document.createElement('audio');

let All_song = [
    {
        name:"First song",
        path:"music/song1.mp3",
        img:"http://pic.5tu.cn/uploads/allimg/1905/pic_5tu_big_2019050601001168045.jpg",
        singer:"First singer"
    },
    {
        name:"Second song",
        path:"music/song2.mp3",
        img:"https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000276/img/basic/a0000276_main.jpg?20170427165412&q=80&rw=750&rh=536",
        singer:"Second singer"
    },
    {
        name:"Third song",
        path:"music/song3.mp3",
        img:"https://coolhdwall.com/storage/202103/sky-city-scenery-horizon-landscape-anime-4K-wallpaper-pc-preview.jpg",
        singer:"Third singer"
    },
    {
        name:"Fourth song",
        path:"music/song4.mp3",
        img:"https://img.xintp.com/c2022/02/15/uvoncoioxid.jpg",
        singer:"Fourth singer"
    },
    {
        name:"Fifth song",
        path:"music/song5.mp3",
        img:"music/j5.jpg",
        singer:"Fifth singer"
    },
];

function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);


//mute soound
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}


//reset song slider
function reset_slider(){
    slider.value = 0;
}


function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

// playsong
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

// pausesong
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

// nextsong
function next_song(){
    if(index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

// previous song
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

// change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// change slider position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function
function autoplay_switch(){
    if(autoplay == 1){
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}


 function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    if(track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>';
        if(autoplay==1){
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
 }