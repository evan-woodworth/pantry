import axios from "axios";
import React, { useState } from "react";
import {Route, withRouter, Redirect} from "react-router-dom";
import Search from "../pages/Search";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const SearchBar = (props) => {
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
    }).then(response => {
        props.history.push('/search', result);
    });
      // setRedirect(true);
    // }).catch(error => {
    //   console.log('------------ SEARCH ERROR ------------')
    //   console.log(error);
    // })
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="search" />
        <input type="text" name="search" value={search.value} onChange={handleInput}/>
        <button type="submit" className="btn btn-secondary"> Search </button>
      </form>
    </div>
  );
};

export default withRouter(SearchBar);