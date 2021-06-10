// The purpose of this file is to get some data from mealdb to use for our API.
const axios = require('axios');
// const mongoose = require('mongoose');
const {Ingredient} = require('./models')

// mongoose.connect('mongodb://localhost/pantry_test', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// const db = mongoose.connection;
// db.once('open', () => {
//     console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
// });

//const database = mongoose.db("pantry_test");
//const ingredients = mongoose.collection("ingredients")

axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
.then(response => {
    ingredientsData = response.data;
    //console.log(response.data);
    let ingredientArray = [];
    ingredientsData.meals.forEach(item => {
        ingredientArray.push ({
            name: item.strIngredient,
            description: item.strDescription,
            type: item.strType
        })
    });
    Ingredient.create(ingredientArray, (error, results) => {
        if (error) console.log("Error", error);
        console.log("Results", results);
    })
    //const ingredientsInserted = ingredientsData.insertMany(ingredientsData);
});