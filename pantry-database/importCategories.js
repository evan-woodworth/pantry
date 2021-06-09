// The purpose of this file is to get some data from mealdb to use for our API.
const axios = require('axios');
const {Category} = require('./models')

axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
.then(response => {
    categoriesData = response.data;
    //console.log(response.data);
    let categoryArray = [];
    categoriesData.meals.forEach(item => {
        categoryArray.push ({
            name: item.strCategory,
        })
    });
    Category.create(categoryArray, (error, results) => {
        if (error) console.log("Error", error);
        console.log("Results", results);
    })
    //const ingredientsInserted = ingredientsData.insertMany(ingredientsData);
});
