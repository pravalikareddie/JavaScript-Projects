const video=document.querySelector('#video');
const play=document.querySelector('#play');
const stopV=document.querySelector('#stop');
const timestamp=document.querySelector('#timestamp');
const progress=document.querySelector('#progress');

toggleVideoStatus=()=>{
    if(video.paused)
        video.play();
    else
    video.pause()
}
updateIcon=()=>{
    if(video.paused){
        play.innerHTML= `  <i class="fa fa-play fa-2x"></i>`
    }
    else{
        play.innerHTML= `  <i class="fa fa-pause fa-2x"></i>`

    }
}
updateProgess=()=>{
    
    progress.value=(video.currentTime/video.duration)*100;

    let mins= Math.floor(video.currentTime/60)
    if(mins<10){
        mins='0'+String(mins);
    }
    let seconds=  Math.floor(video.currentTime%60);
    if(seconds<10){
        seconds='0'+String(seconds);
    }
    timestamp.innerHTML=   `${mins}:${seconds}`;
  
}
stopVideoPlay=()=>{
    video.currentTime=0;
    video.pause();

}
setProgress=()=>{

    video.currentTime=    (progress.value*video.duration)/100;
    console.log(progress.value)
    console.log( video.currentTime)


}
video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updateIcon);
video.addEventListener('play',updateIcon);
video.addEventListener('timeupdate',updateProgess);

play.addEventListener('click',toggleVideoStatus);
stopV.addEventListener('click',stopVideoPlay);
progress.addEventListener('change',setProgress);


