import React from 'react'

// Query your favorited recipes to determine what you can make 
// with the ingredients in your pantry

const CookNow = () => {
  return (
    <div>
      <h1>Recipes that have all the Ingredients in the Pantry</h1>
      <p>
        Write a function that takes the data from the "MyRecipes" collecion and
        compares it to to the data in the "pantry" collection to determin if
        each ingredient exists in both places.
      </p>
      <li>
        User should be able to click recipe and is redirected to "RecipeInfo"
      </li>
      <li>User should be able to view all ingredients in recipe</li>
    </div>
  )
}
export default CookNow
