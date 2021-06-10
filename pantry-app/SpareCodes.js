// ========================================
// SEARCHBAR WORKING EXAMPLE
// ========================================
import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    searchValue: "",
    meals: []
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
    console.log(event.target.value);
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
    console.log(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    console.log('SEARCHINPUT >>>> ', searchInput)
    var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ meals: jsonData.meals });
      });
  };

  render() {
    return (
      <div className="form-group">
        <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.searchValue} className="form-control"/>
        <button onClick={this.handleSearch}>Search</button>

        {this.state.meals ? (
          <div id="meals-container">
            {this.state.meals.map((meal, index) => (
              <div key={index}>
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt="meal-thumbnail" />
              </div>
            ))}
          </div>
        ) : (
          <p>Try searching for a meal</p>
        )}
      </div>
    );
  }
}

export default SearchBar;



// ===============================
// WORKING ORIGINAL SEARCH-BAR CODE
// ===============================
import axios from 'axios';
import React, {useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Search from '../pages/Search';
const KEY = process.env.REACT_APP_KEY

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        fetchData(search);
    };

    const fetchData = async (searchInput) => {
        console.log('Search Input:', searchInput);
        const URL = `https://www.themealdb.com/api/json/v2/${KEY}/filter.php?i=${searchInput}`;
        try {
            let response = await axios.get(URL)
            let data = response.data.meals
            console.log(data);
            setResult(data);
        } catch (error) {
            console.log('---------------- ERROR ----------------');
            console.log(error);
        };
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="search" />
                    <input type="text" name="search" value={search.value} onChange={handleInput} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
        
            <div>
                <Route path='/search' render={(props) => <Search  {...props} result={result}/>} />
            </div>
        </div>
    )
};

export default SearchBar;