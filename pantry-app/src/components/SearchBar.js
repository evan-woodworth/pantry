import axios from "axios";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Search from "../pages/Search";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(search);
    axios.get(`${REACT_APP_SERVER_URL}/api/mealdb/filterIngredient/${search}`)
    .then(response => {
      console.log(response.data.meals);
      setResult(response.data.meals);
      return (
        <Redirect to='/search' render={(props) => <Search {...props} result={result}/>} />
      )
    }).catch(error => {
      console.log('------------ SEARCH ERROR ------------')
      console.log(error);
    })
  };

  return (
      <form onSubmit={submitForm}>
        <label htmlFor="search" />
        <input type="text" name="search" value={search.value} onChange={handleInput}/>
        <button type="submit" className="btn btn-secondary"> Search </button>
      </form>
  );
};

export default SearchBar;
