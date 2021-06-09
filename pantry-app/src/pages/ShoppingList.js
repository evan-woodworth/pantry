import React from 'react'

// Generate a shopping list from recipe’s ingredients

// When a shopping list is generated:
// A shopping list generated locally in an object
// - if user is signed in, they can save the shopping list (list is created in the database and associated with a pantry)

// Shopping list generation:
// Pull ingredients from recipe -> recipeIngredients
// Create an empty shopping list -> shoppingList
// If the user is signed in
// pull ingredients from a pantry -> pantryIngredients
// Iterate through recipeIngredients
// If recipeIngredient is in pantryIngredients, add recipeIngredient to shoppingList
// If user is not signed in, all recipeIngredients are added to shoppingList


const ShoppingList = () => {
  return (
    <div>
      <h1>My Shopping List</h1>
      <p>
        Write a function that uses the "ShoppingList" collection to list all the needed items.
      </p>
      <li>User should have a way to add items</li>
      <li>User should have a way to edit items</li>
      <li>User should be able to remove items</li>
    </div>
  )
}
export default ShoppingList
