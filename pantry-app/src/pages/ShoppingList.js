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

import React, { useState, useEffect } from 'react'

function App() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('-------BOOM---------')
  }

  const List = () => {
    return <h2>list component</h2>
  }

  return (
    <section className=''>
      <form action='' onSubmit={handleSubmit}>
        <h2>Shopping List</h2>
        <div className=''>
          <input type='text' placeholder='Add item here' />
          <button type='submit' className=''>
            submit
          </button>
        </div>
      </form>
      <div className=''>
        <List />
        <button type='submit' className=''>
          clear list
        </button>
      </div>
    </section>
  )
}

export default App
