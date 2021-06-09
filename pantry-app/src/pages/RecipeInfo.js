import React from 'react'

// Display a recipe and its details and ingredients

const RecipeInfo = () => {
  return (
    <div>
      <h1>Recipe Card Showing Ingredients and any other Recipe Specific Info</h1>
      <p>
        Write a function that goes into "mongoDB" and uses the collection
        "MyRecipes" to list all the ingredients for a specific recipe.
      </p>
      <li>User should see a recipe card displaying recipe and ingredients</li>
      <li>User should have a way to add ingredient(s) to shopping list</li>
      <li>User should be able to see if ingredient exists in pantry</li>
      <li>User should be able to click back to MyRecipes</li>
    </div>
  )
}
export default RecipeInfo
