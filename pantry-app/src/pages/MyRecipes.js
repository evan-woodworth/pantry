import React from 'react'

// Display a user’s favorited recipes

const MyRecipes = () => {
  return (
    <div>
      <h1>My Saved Recipes</h1>
      <p>
        Write a function that grabs data from "mongoDB" and uses the collection
        "MyRecipes" to list all the users saved recipes on this page. Link this page to 'RecipeInfo.js' to see ingredients in recipe.
      </p>
      <li>User should have a way to add recipes</li>
      <li>User should have a way to edit recipes</li>
      <li>User should be able to remove recipes</li>
      <li>User should be able to view all ingredients in recipe</li>
    </div>
  )
}
export default MyRecipes
