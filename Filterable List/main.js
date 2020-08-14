const items=['penny','messy','sheldon','leonard','bernadette']
const wrapper=document.querySelector("ul");

items.forEach((item)=>{
   const li= document.createElement("li");
   li.appendChild(document.createTextNode(item));
   wrapper.appendChild( li);
   li.className="item";
 
})

const search=document.querySelector('#search');
search.addEventListener('keyup',()=>{
   const items= Array.from(document.querySelectorAll("li"))
   const value=search.value.toLowerCase();
   console.log(search.value);
   items.forEach((item)=>{
        if(item.innerText.toLowerCase().indexOf(value)!=-1){
            item.style.display='';
        }
        else{
            item.style.display='none';

        }
   })
    
})