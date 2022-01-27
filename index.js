//Sets page with a random recipe when the page first loads
document.addEventListener('DOMContentLoaded',() => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(meal => setPage(meal.meals[0]))
  fetch('http://localhost:3000/meals').then(r => r.json()).then(savedMeals => savedMeals.forEach(setSavedImages))
})

//First clears the ingridents list then sets the page with a new random recipe
document.querySelector('#newRecipe').addEventListener('click',(e) => {
  clearIngredients()
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(meal => setPage(meal.meals[0]))
})

//Allows the user to add their own recipe to the page
document.querySelector('form').addEventListener('submit',(e) => {
  e.preventDefault()
  getNewRecipe(e)
  clearIngredients()
  newIngredients(e)
})

//Allows the user to save the current shown recipe to a seperate DB
document.querySelector('.detail-image').addEventListener('click',() => {
  const mealName = document.querySelector('#recipe-detail').querySelector('img').id
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`).then(r => r.json()).then(newObj)
})

//Global Variables
const ingredients = document.querySelector("ul")
const savedLocation = document.querySelector('header')
const saved = document.createElement('div')
savedLocation.append(saved)

//This functions sets the users own recipe to the page
function getNewRecipe(event){
  const newName = event.target["new-name"].value;
  document.querySelector('.name').textContent = newName
  const newIng = event.target['new-ingredients'].value
  ingredients.textContent = newIng
  const newDesc = event.target["new-desc"].value;
  document.querySelector('#description').textContent = newDesc
  const newImg = event.target["new-img"].value
  document.querySelector('.detail-image').src = newImg
  // console.log(document.querySelector('#recipe-detail'))
  // document.querySelector('#recipe-detail').addEventListener('click',() => 
  // {
  //   setSavedImages()
  // })
}

//This function helps format the ingridents list given by the user
function newIngredients(event){
  const newIng = event.target['new-ingredients'].value
  const arr = newIng.split(',')
  for(ing of arr){
      const list = document.createElement('li')
      list.textContent = ing.trim()
      ingredients.appendChild(list)
  }
}

//This function sets the page when given a recipe 
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

//This function creates a new object that holds a recipe the user wants to save
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
  //This sends the object to the saved receipe DB
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

//This function sets all the saved recipes to the top of the page while adding an event listener to each image
function setSavedImages(meals){
  const savedImg = document.createElement('img')
    savedImg.src = meals.strMealThumb
    savedImg.className = 'saved-img'
    savedImg.style.width = '100px'
    savedImg.style.height = '100px'
    saved.appendChild(savedImg)
    savedImg.addEventListener('click',() => {
      clearIngredients()
      setPage(meals)
    })
} 

//This function helps to clear the current ingredient list
function clearIngredients(){
  while (ingredients.firstChild) {
    ingredients.removeChild(ingredients.firstChild);
}
}