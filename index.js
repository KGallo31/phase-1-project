<<<<<<< HEAD
document.addEventListener('DOMContentLoaded',() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(setIngredients)
    // fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => console.log('1')).then((m) => console.log('0') )
})

document.querySelector('#newRecipe').addEventListener('click',(e) => {
    while (ingredients.firstChild) {
        ingredients.removeChild(ingredients.firstChild);
    }
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(setIngredients)
})
document.querySelector('form').addEventListener('submit',(e) => {
    e.preventDefault()
    getNewRecipe(e)
    while (ingredients.firstChild) {
        ingredients.removeChild(ingredients.firstChild);
    }
    newIngredients(e)
})
const ingredients = document.querySelector("ul")
function setIngredients(meal){
    const mealPic = document.querySelector('img')
    mealPic.id = 'mainPic'
    const ingredients = document.querySelector("ul")
    mealPic.src = meal.meals[0].strMealThumb
    for(let i = 1;i<20;i++){
        const list = document.createElement('li')
        let ing = `strIngredient${i}`
        let currentMeal = meal.meals[0][ing]
        let mes = `strMeasure${i}`
        let currentMes = meal.meals[0][mes]
        list.textContent = currentMes + ' ' + currentMeal
        if(currentMeal === '' || currentMeal === null)
        {
            break
        }
        ingredients.appendChild(list)
    }
    const desc = meal.meals[0].strInstructions
    const mealName = meal.meals[0].strMeal
    document.querySelector('#comment-display').textContent = desc
    document.querySelector('.name').textContent = mealName
    document.querySelector('img').addEventListener('click',() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        // ,{
        //     method:'POST',
        //     headers:{
        //       "Content-Type": "application/json",
        //       Accept: "application/json"
        //     },
        //     body: JSON.stringify({
        //       "name": document.querySelector('.name').textContent,
        //       "desc" : document.querySelector('#comment-display').textContent,
        //       "image" : mealPic.src
        //     })
        // }
        ).then(r => r.json()).then(console.log)
    })
    console.log(meal)
    // console.log(ingredidents,list)
}
function getNewRecipe(event){
    const newName = event.target["new-name"].value;
    document.querySelector('.name').textContent = newName
    const newIng = event.target['new-ingredients'].value
    ingredients.textContent = newIng
    const newDesc = event.target["new-desc"].value;
    document.querySelector('#comment-display').textContent = newDesc
    const newImg = event.target["new-img"].value;
    document.querySelector('img').src = newImg
}
function newIngredients(event){
    const newIng = event.target['new-ingredients'].value
    const arr = newIng.split(',')
    for(ing of arr){
        const list = document.createElement('li')
        list.textContent = ing.trim()
        ingredients.appendChild(list)
    }
}
//fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(console.log)
=======
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((r) => r.json())
    .then(setIngredents);
});
document.querySelector("button").addEventListener("click", (e) => {
  while (ingredidents.firstChild) {
    ingredidents.removeChild(ingredidents.firstChild);
  }
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((r) => r.json())
    .then(setIngredents);
});
document.querySelector("#new-recipe").addEventListener("submit", (e) => {
  e.preventDefault();
  getNewRecipe(e);
});
const ingredidents = document.querySelector("ul");
function setIngredents(meal) {
  const meanPic = document.querySelector("img");
  const ingredidents = document.querySelector("ul");
  meanPic.src = meal.meals[0].strMealThumb;
  for (let i = 1; i < 20; i++) {
    const list = document.createElement("li");
    let ing = `strIngredient${i}`;
    let currentMeal = meal.meals[0][ing];
    let mes = `strMeasure${i}`;
    let currentMes = meal.meals[0][mes];
    list.textContent = currentMes + " " + currentMeal;
    if (currentMeal === "" || currentMeal === null) {
      break;
    }
    ingredidents.appendChild(list);
  }
  const desc = meal.meals[0].strInstructions;
  const mealName = meal.meals[0].strMeal;
  document.querySelector("#description").textContent = desc;
  document.querySelector(".name").textContent = mealName;
  console.log(meal);
  // console.log(ingredidents,list)
}
function getNewRecipe(event) {
  const newName = event.target["new-name"].value;
  document.querySelector(".name").textContent = newName;
  const newIng = event.target["new-ingredients"].value;
  ingredidents.textContent = newIng;
  const newDesc = event.target["new-desc"].value;
  document.querySelector("#description").textContent = newDesc;
  const newImg = event.target["new-img"].value;
  document.querySelector("img").src = newImg;
}
//fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(console.log)
>>>>>>> 7584dfbff7bc70625e03bdf0d4c489b54c579eca
