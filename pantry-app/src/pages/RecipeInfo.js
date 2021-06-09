import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import userEvent from '@testing-library/user-event';
import Search from './Search'





const RecipeInfo = (props) => {



   ///  To treat any API
  // const [query, setQuery] = useState("")
  // const [recipes, setRecipes] = useState([])

  // const url = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=52772`

  // const getData = async () => {
  //   const result = await axios.get(url).query
  //   console.log(result)
  //   setRecipes(result.data.meals)
  //   setQuery(" ")
  // };


  // const onChange = (e) => {
  //   setQuery(e.target.value)
  // }


  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   getData();
  // }

  
const [recipes, setRecipes] = useState([])


   useEffect(() => {
   getRecipes();
  }, [])

  useEffect(() => {
   console.log(recipes)
   }, [recipes])
 


  const getRecipes =  () => {
    axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=52772`)
    .then((response) => {
      const allRecipe = response.data.meals
      console.log(allRecipe)
      setRecipes(allRecipe)

      let ingArra = []
       for (i = 0; i < 20; i++) {
         
       }
    })
  };


  //map over recipes   map()
  // console.log(props)
  //   let allRecipes = props.recipes.map((p, idx) =>{
  //       return <p key={idx}>{p}</p>
  //   })

  //   console.log(props)





  return (

   
    <div>
       <h1>hello</h1>
       {/* {allRecipes} */}
       <button onClick={props.history.goBack}>GO Back</button>

    </div>

    // <div className="App">
    //   <h1 onClick={getData}>Recipe Info</h1>
    //   <form className="serch-form" onSubmit={onSubmit}>
    //     <label htmlFor="recipeCard" >Recipes and Ingredients: </label>
    //     <input name="recipeCard" onChange={onChange} value={query}></input>

    //     <hr />
    //     <label htmlFor="addIngredients">Pantry: </label>
    //     <textarea name="pantry" rows={5} ></textarea>
    //     <hr />

    //     <input type="submit" value="add Ingredient" />
    //     <textarea value="add Ingredient" name="addIngredient" rows={5} ></textarea>
    //     <hr />

    //     <button>Return back to Recipes</button>


    //   </form>

    // </div>
    // 



    //
    //   </p>
    //   <li>User should see a recipe card displaying recipe and ingredients</li>
    //   <li>User should have a way to add ingredient(s) to shopping list</li>
    //   <li>User should be able to see if ingredient exists in pantry</li>
    //   <li>User should be able to click back to MyRecipes</li>
    // </div>
  )
}
export default RecipeInfo
