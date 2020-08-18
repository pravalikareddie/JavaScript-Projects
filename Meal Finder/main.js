const keyword = document.querySelector("#keyword");
const search = document.querySelector("#search");
const random = document.querySelector("#random-btn");
const resultHeading = document.querySelector("#result-heading");
const meals = document.querySelector("#meals");
const singleMeals = document.querySelector("#single-meal");


random.addEventListener('click',()=>{
  singleMeals.innerHTML='';
  resultHeading.innerHTML='';
  meals.innerHTML=''
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php
  `)
    .then((res) => res.json())
    .then((data) => {
      addMeal(data.meals[0]);
    });
})
function getMeals() {
  const searchValue = keyword.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(searchValue);
      if (data.meals == null) {
        resultHeading.innerHTML = `<h1>No results for ${searchValue}</h1>`;
      } else {
        resultHeading.innerHTML = `<h1>Search results for ${searchValue}</h1>`;

        console.log(data.meals);
        meals.innerHTML = data.meals
          .map(
            (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `
          )
          .join("");
      }
    });
  keyword.value = "";
}

search.addEventListener("click", getMeals);

meals.addEventListener("click", (e) => {
  const info = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (info) {
    getMealByID(info.getAttribute("data-mealid"));
  }
});
function getMealByID(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      addMeal(data.meals[0]);
    });
}

function addMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <=20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeals.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}"/>
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
  </ul>
  </div>
  </div>
  
  
  `;
  console.log(ingredients)
}
