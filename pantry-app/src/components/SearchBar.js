import axios from "axios";
import React, { useState, useEffect } from "react";
import {Redirect, withRouter} from "react-router-dom";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const SearchBar = (props) => {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (e) => {
    setSearch(e.target.value);
    setSearchType(e.target.name);
  };

  
  useEffect(() => {
    if (props.location.state == false) {
      return <Redirect to='/' />
    } else if (result) {
      props.history.push('/search', result);
    }
  }, [props.history, result]);


  const submitForm = (e) => {
    e.preventDefault();
    console.log('User Input:', search)
    console.log('Search Type:', searchType)
    axios.get(`${REACT_APP_SERVER_URL}/api/mealdb/${searchType}/${search}`)
    .then(response => {
      setResult(response.data.meals);
    }).catch(error => {
      console.log('------------ SEARCH ERROR ------------')
      console.log(error);
    });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" name="name" value={search.value} onChange={handleInput}/>
        <select>
          <option name="firstLetter">All</option>
          <option name="name">Recipe</option>
          <option name="filterIngredient">Ingredient</option>
          <option name="filterCategory">Categories</option>
          <option name="filterArea">Area</option>
        </select>
        <button type="submit" className="btn btn-secondary"> Search </button>
      </form>
    </div>
  );
};

export default withRouter(SearchBar);