const toggle=document.querySelector("#toggle");

const signup=document.querySelector("#signup");

const close=document.querySelector("#close");
const modal=document.querySelector("#modal");


toggle.addEventListener('click',()=>{
    document.body.classList.toggle('show-nav')
})

signup.addEventListener('click',()=>{
    modal.classList.add('show-modal')
})


close.addEventListener('click',()=>{
    modal.classList.remove('show-modal')
})

window.addEventListener('click',(e)=>{
    console.log(e.target)
  e.target==modal?  modal.classList.remove('show-modal'):false
})
