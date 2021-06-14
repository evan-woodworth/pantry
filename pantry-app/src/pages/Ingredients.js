import { useState, useEffect } from 'react'
import axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const IngredientContainer = () => {
  const [ingredient, setIngredient] = useState([])
  const fetchIngredients = async () => {
    const response = await axios.get(`${REACT_APP_SERVER_URL}/api/ingredients`)
    const data = response.data.theIngredients // array
    // console.log('--HERE--')
    // console.log(data)
    setIngredient(data)
  }
  useEffect(() => {
    // console.log('---HERE---HERE---')
    fetchIngredients()
  }, [])

  console.log(ingredient)
  console.log('---HERE---HERE---HERE---')

  const ingredientList = ingredient.map((ingredient, index) => {
    return <li key={index}>{ingredient.name}</li>
  })

  return (
    <div className='item'>
      <article className='overflowTest'>
        <ul>{ingredient ? ingredientList : <p>loading...</p>}</ul>
      </article>
    </div>
  )
}

export default IngredientContainer
