document.addEventListener('DOMContentLoaded',() => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(meal => setPage(meal.meals[0]))
  fetch('http://localhost:3000/meals').then(r => r.json()).then(savedMeals => savedMeals.forEach(setSavedImages))
})
document.querySelector('#newRecipe').addEventListener('click',(e) => {
  while (ingredients.firstChild) {
      ingredients.removeChild(ingredients.firstChild);
  }
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(meal => setPage(meal.meals[0]))
})
document.querySelector('form').addEventListener('submit',(e) => {
  e.preventDefault()
  getNewRecipe(e)
  while (ingredients.firstChild) {
      ingredients.removeChild(ingredients.firstChild);
  }
  newIngredients(e)
})
document.querySelector('.detail-image').addEventListener('click',() => {
  const mealName = document.querySelector('#recipe-detail').querySelector('img').id
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`).then(r => r.json()).then(newObj)
})
const ingredients = document.querySelector("ul")
const savedLocation = document.querySelector('header')
const saved = document.createElement('div')
savedLocation.append(saved)
function getNewRecipe(event){
  const newName = event.target["new-name"].value;
  document.querySelector('.name').textContent = newName
  const newIng = event.target['new-ingredients'].value
  ingredients.textContent = newIng
  const newDesc = event.target["new-desc"].value;
  document.querySelector('#description').textContent = newDesc
  const newImg = event.target["new-img"].value;
  document.querySelector('.detail-image').src = newImg
  // console.log(document.querySelector('#recipe-detail'))
  // document.querySelector('#recipe-detail').addEventListener('click',() => 
  // {
  //   setSavedImages()
  // })
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
function setPage(meal){
  const mealPic = document.querySelector('.detail-image')
      mealPic.id = meal.strMeal
      mealPic.src = meal.strMealThumb
      for(let i = 1;i<20;i++){
          const list = document.createElement('li')
          let ing = `strIngredient${i}`
          let currentMeal = meal[ing]
          let mes = `strMeasure${i}`
          let currentMes = meal[mes]
          list.textContent = currentMes + ' ' + currentMeal
          if(currentMeal === '' || currentMeal === null)
          {
              break
          }
          ingredients.appendChild(list)
      }
      const desc = meal.strInstructions
      const mealName = meal.strMeal
      document.querySelector('#description').textContent = desc
      document.querySelector('.name').textContent = mealName
}
function newObj(meal){
  const recipeObj = {}
  const keys = Object.keys(meal.meals[0])
  keys.forEach(key => 
  {
    const addIng  = key.includes('strIngredient') ? meal.meals[0][key] : key.includes('strMeasure') ? meal.meals[0][key] : '' 
    recipeObj[key] = addIng
  })
  recipeObj.strMealThumb = meal.meals[0].strMealThumb
  recipeObj.strMeal = meal.meals[0].strMeal
  recipeObj.strInstructions = meal.meals[0].strInstructions
  fetch('http://localhost:3000/meals',  
  {
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify( recipeObj)
    })
    setSavedImages(recipeObj)
  // console.log(recipeObj)
}
function setSavedImages(meals){
  const savedImg = document.createElement('img')
    savedImg.src = meals.strMealThumb
    savedImg.className = 'saved-img'
    savedImg.style.width = '100px'
    savedImg.style.height = '100px'
    saved.appendChild(savedImg)
    savedImg.addEventListener('click',() => 
    {
      const ingredients = document.querySelector("ul")
      while (ingredients.firstChild) {
        ingredients.removeChild(ingredients.firstChild);
      }
      setPage(meals)
    })
} 