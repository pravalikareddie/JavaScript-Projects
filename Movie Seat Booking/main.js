const count=document.querySelector(".count");
const price=document.querySelector(".price");
const container=document.querySelector(".container");
const seats=document.querySelectorAll(".row .seat:not(.occupied)");

const savedSeats=JSON.parse(localStorage.getItem("seats"));
if(savedSeats!=null && savedSeats.length>0){
    seats.forEach((seat,index)=>{
        if(savedSeats.indexOf(index)>-1){
            seat.classList.add('selected')
        }
    })
    
}

document.querySelector("select").selectedIndex=localStorage.getItem("movieIndex");
let ticketPrice=document.querySelector("select").value;
updateData();

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ){
        e.target.classList.toggle('selected');
    }
    updateData();

})
function updateData(){
    const seat=document.querySelectorAll(".row .seat.selected");

    count.innerText=seat.length;
    price.innerHTML=seat.length* ticketPrice;

    const seatIndices=[...seat].map(seat=>
        {return [...seats].indexOf(seat)});
        localStorage.setItem("seats",JSON.stringify(seatIndices));

}

movie.addEventListener('change',(e)=>{
    ticketPrice=+e.target.value;
    updateData();
    localStorage.setItem("movieIndex",e.target.selectedIndex);
    localStorage.setItem("moviePrice",ticketPrice)



})
