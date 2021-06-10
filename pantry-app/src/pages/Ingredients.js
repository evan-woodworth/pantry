import React from 'react'
import { ingredientData } from '../ingredientData'
const UseStateArray = () => {
  const [ingredient, setIngredient] = React.useState(ingredientData)

  const removeItem = (idIngredient) => {
    let newIngredient = ingredient.filter(
      (meal) => meal.idIngredient !== idIngredient
    )
    setIngredient(newIngredient)
  }
  return (
    <>
      <div className='item'>
        <article className='overflowTest'>
          {ingredient.map((meal) => {
            const { idIngredient, strIngredient } = meal
            return (
              <div key={idIngredient} className='item'>
                <p>{strIngredient}</p>
                <button onClick={() => removeItem(idIngredient)}>remove</button>
              </div>
            )
          })}
          <button className='btn' onClick={() => setIngredient([])}>
            clear items
          </button>
        </article>
      </div>
    </>
  )
}

export default UseStateArray
