/* eslint-disable indent */
const h4 = document.querySelector('h4');

fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        h4.innerHTML = data.idMeal;
    });

console.log('test');