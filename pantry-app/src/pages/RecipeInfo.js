import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import userEvent from '@testing-library/user-event';
import Search from './Search'





const RecipeInfo = (props) => {


  const [recipes, setRecipes] = useState([])


  useEffect(() => {
    getRecipes();
  }, [])

  useEffect(() => {
    console.log(recipes)
    console.log(recipes)
  }, [])



  const getRecipes = () => {
    axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=52772`)
      .then((response) => {
        const allRecipe = response.data.meals[0]
        console.log(allRecipe)
        setRecipes(allRecipe)
      })
      .catch((error) => {
        console.log(`Hers's the error you made: ${error}`)
      })
  };








  return (


    <div>
      <h1>Recipe</h1>
      <h1>{recipes.strMeal}</h1>
      <h5>Instructions:</h5>
      <p>{recipes.strInstructions}</p>
      <h5>Ingredients:</h5>
      <ul>
        <li>{recipes.strIngredient1}</li>
        <li>{recipes.strIngredient2}</li>
        <li>{recipes.strIngredient3}</li>
        <li>{recipes.strIngredient4}</li>
        <li>{recipes.strIngredient5}</li>
        <li>{recipes.strIngredient6}</li>
        <li>{recipes.strIngredient7}</li>
        <li>{recipes.strIngredient8}</li>
        <li>{recipes.strIngredient9}</li>
      </ul>


      
       <a href="{recipes[0].strYoutube}" target="_blank">Youtube</a>
       <br />
      <button onClick={props.history.goBack}>GO Back</button>

    </div>

   
  )
}
export default RecipeInfo
