import React from "react";
import {Link} from "react-router-dom";


const Search = (props) => {
  console.log('SEARCH PROPS: ', props);
  const data = props.location.state;
  const user = props.location.user;

  if (data) {
    var searchList = data.map((item, index) => {
      let location = {
        pathname: `/recipe/`,
        state: item, user
      };
      return(
        <article className="meal" key={index}>
          <div className="img-container">
            <img src={item.strMealThumb} alt={item.strMeal} />
          </div>
          <div className="meal-footer">  
            <h3>{item.strMeal}</h3>
            <p>{item.strCategory}</p>
            <Link to={location} user={user}className="btn btn-primary btn-details"> Details </Link>
          </div>
        </article>
      );
    })
  } else {
    return <p>No search matches.</p>
  };

  return (
    <section>
      <h2 className='section-title'>Search Result</h2>
      <div className='meals-center'>
        {data.length ? searchList : <p> ...Loading... </p>}
      </div>
    </section>
  );
};

export default Search;