import React from "react";


const Search = (props) => {
  console.log('Search Page Props: ', props)
  const data = props.history.location.state
  console.log(data);
  
  if (data) {
    var searchList = data.map((item, index) => {
      return(
        <ul key={index}>
        <img src={item.strMealThumb} />
        {item.strMeal}<br/>
        {item.strCategory}
        </ul>
      );
    })
  } else {
    return <p>Please enter a search...</p>
  };

  return (
    <section>
      <h2 className='section-title'>Search Result</h2>
      <div className='meals-center'>
        {data.length ? (searchList) : (<p className="text-center"> ...Loading... </p>)}
      </div>
    </section>
  );
};

export default Search;