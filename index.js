document.addEventListener('DOMContentLoaded',() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(setIngredents)
})
document.querySelector('button').addEventListener('click',(e) => {
    while (ingredidents.firstChild) {
        ingredidents.removeChild(ingredidents.firstChild);
    }
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(setIngredents)
})
document.querySelector('#new-ramen').addEventListener('submit',(e) => {
    e.preventDefault()
    getNewRecipe(e)
})
const ingredidents = document.querySelector("ul")
function setIngredents(meal){
    const meanPic = document.querySelector('img')
    const ingredidents = document.querySelector("ul")
    meanPic.src = meal.meals[0].strMealThumb
    for(let i = 1;i<20;i++){
        const list = document.createElement('li')
        let ing = `strIngredient${i}`
        let currentMeal = meal.meals[0][ing]
        let mes = `strMeasure${i}`
        let currentMes = meal.meals[0][mes]
        list.textContent = currentMes + ' ' + currentMeal
        if(currentMeal === '')
        {
            break
        }
        ingredidents.appendChild(list)
    }
    const desc = meal.meals[0].strInstructions
    const mealName = meal.meals[0].strMeal
    document.querySelector('#comment-display').textContent = desc
    document.querySelector('.name').textContent = mealName
    console.log(meal)
    // console.log(ingredidents,list)
}
function getNewRecipe(event){
    const newName = event.target["new-name"].value;
    document.querySelector('.name').textContent = newName
    const newIng = event.target['new-ingredients'].value
    ingredidents.textContent = newIng
    const newDesc = event.target["new-desc"].value;
    document.querySelector('#comment-display').textContent = newDesc
    const newImg = event.target["new-img"].value;
    document.querySelector('img').src = newImg
}
//fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(console.log)