const word = document.querySelector(".word");
const wrongLettersContainer = document.querySelector(
  "#wrong-letters-container"
);
const play = document.querySelector("#play");
const popup = document.querySelector(".popup-container");
const notification = document.querySelector(".notification");
const message = document.querySelector("#message");
const figurePart = document.querySelectorAll(".figure-part");
const words = ["apple", "banana", "pears"];
let selected = words[Math.floor(Math.random() * words.length)];
console.log(selected);
correctLetters = [];
wrongLetters = [];

function display() {
  word.innerHTML = `
    ${selected
      .split("")
      .map(
        (letter) =>
          `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>`
      )
      .join("")}`;
  const innerWord = word.innerText.replace(/\n/g, "");
  if (innerWord === selected) {
    message.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selected.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        display();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

function updateWrongLetters() {
  wrongLettersContainer.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  figurePart.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (wrongLetters.length == figurePart.length) {
    message.innerText = "Unfortunately, you lost!";
    popup.style.display = "flex";
  }
}
function showNotification() {
  notification.classList.add("show-notification");
  setTimeout(() => {
    notification.classList.remove("show-notification");
  }, 2000);
}
display();
play.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selected = words[Math.floor(Math.random() * words.length)];
  display();
  updateWrongLetters();
  popup.style.display = "none";
});
