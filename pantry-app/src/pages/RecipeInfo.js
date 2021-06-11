import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import userEvent from '@testing-library/user-event';


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




  let ingredients = [];

  for (let i = 0; i < 20; i++) {
    let arrayIngredient = recipes[`strIngredient${i}`]
    let arrayMeasurement = recipes[`strMeasure${i}`]
    if (arrayIngredient) {
      ingredients.push({
        name: arrayIngredient,
        measurement: arrayMeasurement
      })
    }


  }
  //  function for ingredients and measurement
  const ingredientsList = ingredients.map(index => (
    <li>{index.name}, {index.measurement}</li>
  ))


  //   const newTag = recipes.strTags.slice()
  //   recipes.strTags
  // }






  const handleSubmit = (e) => {
    e.preventDefault();
    let strMeal = e.target.strMeal.value
    let strInstructions = e.target.strInstructions.value
    let strTags = e.target.strTags;
    // reset();

  }





  return (


    <div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="name" value={recipes.strMeal} />
        <input type="hidden" name="instructions" value={recipes.strInstructions} />
        <input type="hidden" name="mealId" value={recipes.idMeal} />
        <input type="hidden" name="ingredients" value={ingredients} />
        <input type="hidden" name="public" value="true" />


        {/* //// display the label and inputs elements */}
        <label for="favorites">Add to Favorites :</label>

        <select name="favorites" id="favorites">
          <option value="yesFavorite">Add to Favorites</option>
          <option value="noFavorites">just checking</option>
        </select>
        <input type="submit" value="Add to Fovorites" />

        <hr />

        <h2 id="strMeal" >{recipes.strMeal}</h2>
        <label id="strInstructions"  >{recipes.strInstructions}</label>
        <h5>Ingredients:</h5>
        <ul >

          {ingredientsList}

        </ul>
        <h5 id="strTags" >{recipes.strTags}</h5>
        <br />
        <img src={recipes.strMealThumb} />
        <br />
        <a href="{recipes.strYoutube}" target="_blank">Youtube</a>
        <br />





      </form>
      <button onClick={props.history.goBack}>Return </button>
    </div >


  )
}
export default RecipeInfo
