document.addEventListener('DOMContentLoaded',() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(setImage)
})
function setImage(meal){
    const meanPic = document.querySelector('img')
    meanPic.src = meal.meals[0].strMealThumb
}
fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()).then(console.log)