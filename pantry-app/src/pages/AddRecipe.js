import React from 'react'


// Creating a new recipe

const AddRecipe = () => {
  return (
    <div>
      <h1>Use the Form to Add a Recipe to MyRecipes</h1>
      <p>
        Write a function that allows user to add a recipe manually.
      </p>
      <li>User should be able to fill out a form to add recipe manually to MyRecipes collection</li>
      <li>User should return to MyRecipes page onSubmit</li>
      <form>
        <label for="strMeal">Recipe Name:</label>
        <input type="text" id="strMeal" name="strMeal"></input>
        <label for="strCategory">Category</label>
        <select id="strCategory" name="strCategory">
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
          <option value="Lamb">Lamb</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Pasta">Pasta</option>
          <option value="Pork">Pork</option>
          <option value="Seafood">Seafood</option>
          <option value="Side">Side</option>
          <option value="Starter">Starter</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Goat">Goat</option>
        </select>
        <label for="strArea">Region:</label>
        <input type="text" id="strArea" name="strArea"></input>
        <label for="strInstructions">Instructions:</label>
        <input type="text" id="strInstructions" name="strInstructions"></input>
        <label for="strMealThumb">Thumbnail Address:</label>
        <input type="text" id="strMealThumb" name="strMealThumb" value="https://static.wikia.nocookie.net/clubpenguin/images/8/85/Place_Setting_icon.png/revision/latest?cb=20171129210847"></input>
        <label for="strTags">Tags</label>
        <input type="text" id="strTags" name="strTags"></input>
        <label for="strYoutube">Instructional Video Address</label>
        <input type="text" id="strYoutube" name="strYoutube" value="https://www.youtube.com/watch?v=iik25wqIuFo"></input>
        <label for="strIngredient">Ingredient</label>
        <input type="text" id="strIngredient" name="strIngredient"></input>
        <label for="strMeasure">Measure</label>
        <input type="text" id="strMeasure" name="strMeasure"></input>
      </form>
    </div>
  )
}

export default AddRecipe