import React from 'react'
import Meal from './Meal'

import { useGlobalContext } from '../../context'

export default function MealList() {
  const { meal } = useGlobalContext()

  if (meal.length < 1) {
    return (
      <h2 className='section-title'>no meals matched your search criteria</h2>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>meals</h2>
      <div className='meals-center'>
        {meal.map((item) => {
          return <Meal key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}
