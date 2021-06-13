import React, {useState, useEffect} from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const Recipe = (props) => {
  const data = props.location.state
  const [recipe, setRecipe] = useState(data);

  useEffect(() => {
    let mealId = data.idMeal
    axios.get(`${REACT_APP_SERVER_URL}/api/mealdb/id/${mealId}`)
    .then(response => {
      let meal = response.data.meals[0];
      setRecipe(meal);
      console.log(meal)
    }).catch(error => {
      console.log('------------ RECIPE ERROR ------------');
      console.log(error)
    });
  }, []);
  
  let video = '';
  if (recipe.strYoutube) {
    video = <a href={recipe.strYoutube}>Instructional Video</a>
  } else if (recipe.strYoutube === "" || [] || false) {
    // video = <p>No video instructions</p>
    video = 'No video instructions'
  };

  return (
    // <div>
    //   <h3>{recipe.strMeal}</h3>
    //   <img src={recipe.strMealThumb} alt={recipe.strMeal} className="meals-center" style={{height: "500px", width: "500px"}}/>
    //   <h5>Instructions</h5>
    //   <p>{recipe.strInstructions}</p>
    //   {video}
    //   <hr/>
    //   <h6>Ingredients Needed</h6>
    //   <ul>
    //     <li>{recipe.strIngredient1}</li>
    //     <li>{recipe.strIngredient2}</li>
    //     <li>{recipe.strIngredient3}</li>
    //     <li>{recipe.strIngredient4}</li>
    //     <li>{recipe.strIngredient5}</li>
    //     <li>{recipe.strIngredient6}</li>
    //     <li>{recipe.strIngredient7}</li>
    //     <li>{recipe.strIngredient8}</li>
    //     <li>{recipe.strIngredient9}</li>
    //   </ul>
    //   <button onClick={props.history.goBack} className="btn btn-primary">Back</button>
    // </div>

    <section className='section meal-section'>
      <h2 className='section-title'>{recipe.strMeal}</h2>
      <div className='food'>
        <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
        <div className='food-info'>
          <p><span className='food-data'> Name:</span>{recipe.strMeal}</p>
          <p><span className='food-data'> Category:</span>{recipe.strCategory}</p>
          <p><span className='food-data'> Info:</span>{recipe.strArea}</p>
          <p><span className='food-data'> Instructions:</span>{recipe.strInstructions}</p>
          <p><span className='food-data'> Video Instructions:</span>{video}</p>
          <button onClick={props.history.goBack} className="btn btn-primary">Back</button>
        </div>
      </div>
    </section>
  )
};

export default Recipe;