import React, { useEffect, useState } from 'react';
import axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;



// Query your favorited recipes to determine what you can make 
// with the ingredients in your pantry


// function CookNow()) {
//   let [recipes, setRecipes] = useState([]);
//   useEffect(() => {
//     axios.get('https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=52772')
//     .then(response => {
//       console.log(response)
//       setRecipes(response.data.meals)
//     })
  
// }, [])

function CookNow(props) {
  const [userRecipes, setUserRecipes] = useState([])
  const [recipesCookNow, setRecipesCookNow] = useState([]);
  const [allIngs, setAllIngs] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(async ()=>{
    const recipeResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`);
    const recipeList = recipeResponse.data;
    console.log("user recipes",recipeList);
    setUserRecipes(recipeList)

    const allIngResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/ingredients`);
    const allIngData = allIngResponse.data.theIngredients;
    console.log('allIngData',allIngData)
    setAllIngs(allIngData);

    const pantryResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/pantries`);
    const pantId = pantryResponse.data.pantryList[0]._id;
    console.log("pantId",pantId);
    const payload = {
      id: pantId
    }
    const ingListResponse = await axios.put(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, payload);
    const ingList = ingListResponse.data.ingredientList;
    console.log("pantry ingredients",ingList);
    let cookRecipeList = [];

    recipeList.forEach((oneRecipe) => {
      let haveIngredients = true;
      oneRecipe.ingredients.forEach((recipeIngredient) => {
        console.log(recipeIngredient)
        if (!ingList.includes(recipeIngredient.name)) {
          haveIngredients = false;
        }
        if (haveIngredients) {
          cookRecipeList.push(oneRecipe);
        }
      })
    })
    console.log("Recipe cook list", cookRecipeList)
    setRecipesCookNow(cookRecipeList);
    setFinishedLoading(true);


    // axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`)
    // .then(response => {
    //   let recipeList = response.data;
    //   setUserRecipes(recipeList);
    //   console.log("user recipes",response.data)
    //   axios.get(`${REACT_APP_SERVER_URL}/api/users/pantries`)
    //   .then(response => {
    //     const pantId = response.data.pantryList[0]._id;
    //     console.log("pantId",pantId)
    //     const payload = {
    //       id: pantId
    //     }
    //     axios.put(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, payload)
    //     .then(response => {
    //       const ingList = response.data.ingredientList;
    //       console.log("pantry ingredients",ingList);
    //       let cookRecipeList = []
    //       userRecipes.forEach((oneRecipe) => {
    //         let haveIngredients = true;
    //         oneRecipe.ingredients.forEach((recipeIngredient) => {
    //           if (!ingList.includes(recipeIngredient.name)) {
    //             haveIngredients = false;
    //           }
    //           if (haveIngredients) {
    //             cookRecipeList.push(oneRecipe);
    //           }
    //         })
    //       })
    //       setRecipesCookNow(cookRecipeList);
    //       setFinishedLoading(true);
    //     })
    //   })
    // })
  },[])



  // userPantries.forEach(pantPant => {
  //   const payload = {
  //     id: pantPant.id
  //   }
  //     axios.post(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, payload)
  //     .then(response => {
  //       userIng = response.data
  //       console.log(response.data)
  //       })  
  // })
 
  
  if (!finishedLoading) {
    return (<p>...Loading</p>)
  }
  return (
    <div>
      <h1>Cook Now</h1>
      <ul>
        {recipesCookNow.map((recipe) => <li>{recipe.name}</li>)}
      </ul>
    </div>
  )
};


//CookNow();

export default CookNow;
//req.user.id

//props.userId

// get the users recipes (comes from database, for now assuming its an array)

// const fetchUserRecipes = async () => {
//   const response = async axios.get()
//   // axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`)
// }

// get the users pantry (comes from database, as an array of objects)
  // axios.get(`${REACT_APP_SERVER_URL}/api/users/pantires`)
  // axios.get(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`) (need to pass in the ID of the pantry)

// get the ingredients associated with those recipes
  // ingredients are included in the users/recipes call
  // for loop to iterate through recipes, and a for loop nested inside it to loop through ingredients
  // pantry of ingredients is not just an array of ingredients, its an object that also includes measurement and note


// for each ingredient in the recipe, is it in the users pantry. If atleast one is not, don't post it. 

// let haveAllIngredients = (userPantry, recipeIngreients) => recipeIngredients.every(ingredient => userPantry.includes(ingredient))


// return(
//   <div>
//     <p>{recipes[0].strMeal}</p>
//   </div>
// )
// }


// const CookNow = (props) => {
//   return (
//     <div>
//       <h1>Cook Now</h1>
//       <h2>You have all the ingredients for these recipes</h2>
//       <div>

//       </div>
      
//       <p>
//         Write a function that takes the data from the "MyRecipes" collecion and
//         compares it to to the data in the "pantry" collection to determin if
//         each ingredient exists in both places.
//       </p>
//       <li>
//         User should be able to click recipe and is redirected to "RecipeInfo"
//       </li>
//       <li>User should be able to view all ingredients in recipe</li>
//     </div>
//   )
// }

