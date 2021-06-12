import React from 'react';


const Recipe = (props) => {
  const recipe = props.location.state
  console.log(recipe)

  let video = '';
  if (!recipe.strYouTube === true) {
    video = <a href={recipe.strYoutube}>Instructional Video</a>
  } else {
    video = <p>No video instructions</p>
  };

  return (
    <div>
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} style={{height: "500px", width: "500px"}} alt={recipe.strMeal}/>
      <h5>Instructions</h5>
      <p>{recipe.strInstructions}</p>
      {video}
      <hr/>
      <h6>Ingredients Needed</h6>
      <ul>
        <li>{recipe.strIngredient1}</li>
        <li>{recipe.strIngredient2}</li>
        <li>{recipe.strIngredient3}</li>
        <li>{recipe.strIngredient4}</li>
        <li>{recipe.strIngredient5}</li>
        <li>{recipe.strIngredient6}</li>
        <li>{recipe.strIngredient7}</li>
        <li>{recipe.strIngredient8}</li>
        <li>{recipe.strIngredient9}</li>
      </ul>
      <button onClick={props.history.goBack} className="btn btn-primary">Back</button>
    </div>
  )
};

export default Recipe;