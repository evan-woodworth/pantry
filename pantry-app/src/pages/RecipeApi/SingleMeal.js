import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function SingleMeal() {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [meal, setMeal] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    async function getMeal() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
        )
        const data = await response.json()
        if (data.meals) {
          const {
            strMeal: name,
            strMealThumb: image,
            strArea: info,
            strCategory: category,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.meals[0]
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newMeal = {
            name,
            image,
            info,
            category,
            instructions,
            ingredients,
          }
          setMeal(newMeal)
        } else {
          setMeal(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getMeal()
  }, [id])
  if (!meal) {
    return <h2 className='section-title'>no meal to display</h2>
  } else {
    const { name, image, category, info, instructions, ingredients } = meal
    return (
      <section className='section meal-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='food'>
          <img src={image} alt={name}></img>
          <div className='food-info'>
            <p>
              <span className='food-data'>name :</span> {name}
            </p>
            <p>
              <span className='food-data'>category :</span> {category}
            </p>
            <p>
              <span className='food-data'>info :</span> {info}
            </p>
            <p>
              <span className='food-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='food-data'>ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}
