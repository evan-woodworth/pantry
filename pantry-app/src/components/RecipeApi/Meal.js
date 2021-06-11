import React from 'react'
import { Link } from 'react-router-dom'

export default function Meal({ image, name, id, info }) {
  return (
    <article className='meal'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='meal-footer'>
        <h3>{name}</h3>
        <p>{info}</p>
        <Link to={`/meal/${id}`} className='btn btn-primary btn-details'>
          details
        </Link>
      </div>
    </article>
  )
}
