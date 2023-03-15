/* eslint-disable indent */

// eslint-disable-next-line no-undef
const h4 = document.querySelector('h4');
// eslint-disable-next-line no-undef
const div = document.querySelector('div');




fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        console.log(data.meals[0]);
        h4.innerHTML = data.meals[0].strMeal;
        div.innerHTML = `<img id="randomimg" src="${data.meals[0].strMealThumb}">`;

    });




