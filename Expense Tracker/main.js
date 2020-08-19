const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");

const list = document.querySelector(".list");

const name = document.querySelector("#name");

const amount = document.querySelector("#amount");
const submitButton = document.querySelector("#sub");

dummyTransactions = [];
function remove(id) {
  if (dummyTransactions.length > 0) {
    const transactions = dummyTransactions.filter((item) => {
      if (item.id == id) {
        return false;
      } else return true;
    });
    dummyTransactions = transactions;
    console.log(transactions);
    display();
    updateData();
  }
}

submitButton.addEventListener("click", (e) => {
  if (name.value == "" || amount.value == "") {
    alert("Enter required details");
  } else {
    console.log(e);
    const transaction = {
      id: Math.random * 100000,
      text: name.value,
      amount: parseInt(amount.value),
    };
    dummyTransactions.push(transaction);
    display();
    updateData();
  }
});

console.log(submitButton);

function display() {
    balance.innerText = "$0";
    moneyPlus.innerText = "$0";
    moneyMinus.innerText = "$0";
  if (dummyTransactions.length > 0) {
    list.innerHTML = "";
    
    dummyTransactions.map((transaction) => {
      const li = document.createElement("li");
      const signClass = transaction.amount < 0 ? "minus" : "plus";
      const sign = transaction.amount < 0 ? "-" : "+";

      li.classList.add(signClass);
      li.innerHTML = `${transaction.text}<span>${sign}$${Math.abs(
        transaction.amount
      )}<button id="close" onclick="remove(${
        transaction.id
      })">X</button></li></span>  `;
      list.appendChild(li);
    });
  }
}
function updateData() {
  if (dummyTransactions.length > 0) {
    console.log(dummyTransactions);
    balance.innerText = "";
    moneyPlus.innerText = "";
    moneyMinus.innerText = "";
    const expense = dummyTransactions.reduce((current, item) => {
      if (item.amount < 0) {
        current = current + item.amount;
      }
      return current;
    }, 0);
    console.log(expense);

    const income = dummyTransactions.reduce((current, item) => {
      if (item.amount > 0) {
        current = current + item.amount;
      }
      return current;
    }, 0);

    console.log(income);
    const bal = income + expense;
    balance.innerText = `$${bal}`;
    moneyPlus.innerText = `+$${income}`;
    moneyMinus.innerText = ` -$${Math.abs(expense)}`;
  }
}

display();
updateData();
