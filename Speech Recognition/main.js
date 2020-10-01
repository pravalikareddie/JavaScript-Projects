const recogntion=window.SpeechRecognition || window.webkitSpeechRecognition;
let outputContainer=document.getElementById("output");
const speechRecognition=new recogntion();

speechRecognition.start()
const random=(()=>{
    return Math.floor(Math.random()*100)+1;
})();
console.log(random)
speechRecognition.addEventListener('result',(e)=>{
    console.log(e.results[0][0].transcript)
    const message=e.results[0][0].transcript
    showOutput(message);
    checkInput(message)
}
)
function showOutput(message)
{
   
    outputContainer.innerHTML=`<h2 class="msg">You said</h2>
    <h3 class="msg">${message}</h3>
    `;
}
function checkInput(msg){
    let message=+msg;
    if(!(message<100 && message>1)){
        outputContainer.innerHTML+=`<h3>Enter between 1 to 100</h3>`
    }
    else if(message<random){
        outputContainer.innerHTML+=`<h3>Go Higher</h3>`
    }
    else if(message>random){
        outputContainer.innerHTML+=`<h3>Go Lower</h3>`
    }
    else if(message==random){
        outputContainer.innerHTML=`<h3>Yay!!!Correct</h3>
        <button id="play" class="play">Play Again</button>`
    }

    else if(Number.isNaN(message)){
        outputContainer.innerHTML+=`<h3>Enter a valid number</h3>`
    }
}
speechRecognition.addEventListener('end',()=>{
    speechRecognition.start()
})
document.body.addEventListener('click',(e)=>{
    if(e.target.classList.contains('play')){
        window.location.reload();
    }
    
})