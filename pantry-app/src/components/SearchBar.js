import React, {useState} from 'react';


const SearchBar = () => {
    const [state, setState] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(state);
    };

    const handleInput = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    return (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="search" />
                <input type="text" name="search" value={state.value} onChange={handleInput} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    )
};

export default SearchBar;

// import React, { Component } from "react";

// class SearchBar extends Component {
//   state = {
//     searchValue: "",
//     meals: []
//   };

//   handleOnChange = event => {
//     this.setState({ searchValue: event.target.value });
//   };

//   handleSearch = () => {
//     this.makeApiCall(this.state.searchValue);
//   };

//   makeApiCall = searchInput => {
//     var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
//     fetch(searchUrl)
//       .then(response => {
//         return response.json();
//       })
//       .then(jsonData => {
//         this.setState({ meals: jsonData.meals });
//       });
//   };

//   render() {
//     return (
//       <div className="form-group">
//         <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.searchValue} className="form-control"/>
//         <button onClick={this.handleSearch}>Search</button>

//         {this.state.meals ? (
//           <div id="meals-container">
//             {this.state.meals.map((meal, index) => (
//               <div key={index}>
//                 <h2>{meal.strMeal}</h2>
//                 <img src={meal.strMealThumb} alt="meal-thumbnail" />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>Try searching for a meal</p>
//         )}
//       </div>
//     );
//   }
// }

// export default SearchBar;