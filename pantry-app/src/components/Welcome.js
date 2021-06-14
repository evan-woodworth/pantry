import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const SearchBar = (props) => {
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [result, setResult] = useState(null)

<<<<<<< HEAD
  const handleInput = (e) => {
    setSearch(e.target.value)
  }

  const handleSelection = (e) => {
    setSearchType(e.target.value)
  }

  useEffect(() => {
    if (props.history.location.state === false) {
      console.log('Nothing!')
      alert('No search match.')
    } else if (result) {
      props.history.push('/search', result)
    }
  }, [props.history, result])

  const submitForm = (e) => {
    e.preventDefault()
    // console.log('User Input:', search)
    // console.log('Search Type:', searchType)
    axios
      .get(`${REACT_APP_SERVER_URL}/api/mealdb/${searchType}/${search}`)
      .then((response) => {
        setResult(response.data.meals)
      })
      .catch((error) => {
        console.log('------------ SEARCH ERROR ------------')
        console.log(error)
      })
  }

  return (
    <div className='search'>
      <form onSubmit={submitForm}>
        <select onChange={handleSelection} className='selector-btn'>
          <option value='name'>Recipe</option>
          <option value='filterIngredient'>Main Ingredient</option>
          <option value='filterCategory'>Categories</option>
          <option value='filterArea'>Area</option>
        </select>
        <input
          type='text'
          value={search.value}
          onChange={handleInput}
          className='search-input'
          placeholder='...Me Hungry...'
        />
        <button type='submit' className='search-btn'>
          {/* Magnifying Glass Icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-search'
            viewBox='0 0 16 16'
          >
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
          {/* --- Icon End --- */}
        </button>
      </form>
    </div>
  )
=======
const Welcome = (props) => {
    return (
        <div>
            <h1>Pantry</h1>
            <h3>Your kitchen is waiting...</h3>
        </div>
    )
>>>>>>> dd8b3d2fe10d23c6484218957884c41a4f2d52f0
}

export default withRouter(SearchBar)
