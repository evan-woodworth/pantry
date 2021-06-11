import React from "react";


const Search = (props) => {
  console.log('Search Page Props: ', props)
  const data = props.history.location.state
  console.log('SEARCH PAGE DATA >>>> ', data);

  const searchList = data.map((item, index) => {
    return <ul key={index}>{item.strMeal}</ul>
  })

  return (
    <div>
      <p>Search Results Page</p>
      {data.length ? searchList : <p>...Loading</p>}
    </div>
  );
};

export default Search;