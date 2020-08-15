const add = document.querySelector("#add");
const double = document.querySelector("#double");
const show = document.querySelector("#show");
const sort = document.querySelector("#sort");
const right = document.querySelector("#right");

const calculate = document.querySelector("#calculate");
let data = [];

add.addEventListener("click", getUser);
double.addEventListener("click", doubleMoney);
show.addEventListener("click", showMillionaries);
sort.addEventListener("click", sorting);
calculate.addEventListener("click", total);

function displayUsers(users = data) {
  right.innerHTML = `<p ><strong>
    Person</strong>
      Wealth</p>`;
  users.forEach((item) => {
    const element = document.createElement("div");

    element.innerHTML = ` <p ><strong>
          ${item.name}</strong>
            ${item.money}</p>`;
    right.appendChild(element);
  });
}
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: 2 * item.money };
  });
 
  displayUsers(data);
}
async function getUser() {
  let res = await fetch("https://randomuser.me/api");
  let response = await res.json();
  let data = response.results[0];
  addNewUser({
    name: `${data.name.first} ${data.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  });
}
function addNewUser(person) {
  data.push(person);
  displayUsers(this.data);
}

function showMillionaries() {
    data = data.filter((item) => {
        if(item.money>10000000)
      return true;
    });
   
    displayUsers(data);
    console.log(data)
  }

  function sorting() {
    data = data.sort((a,b)=>b.money-a.money)
    displayUsers(data);
    console.log(data)
  }
  function total(){
     value= data.reduce((current,user)=>{
          return current+user.money;
      },0)
      alert(value);
  }