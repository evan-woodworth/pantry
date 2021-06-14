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
  let userRecipes = []
  // let userPantries = []
  const pantId = '';
  let userShoppingLists = []
  let allIngredients = []
  let recipesCookNow = []
  console.log('****************************')
  console.log(props)
  let userID = props.user
  console.log(userID);
  console.log('===================')
  
  console.log('===================')
  //let id = userID.id
  console.log('userID.id ' + userID.id);
  //const payload = {notUser: props.user}
  axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`)
     .then(response => {
      userRecipes = response.data 
      console.log(response.data)
     })
  axios.get(`${REACT_APP_SERVER_URL}/api/users/pantries`)
    .then(response => {
    //  = response.data
    pantId = response.data.pantryList[0]
    console.log(response.data)
    })   
  axios.get(`${REACT_APP_SERVER_URL}/api/users/shoppingLists`)
    .then(response => {
    userShoppingLists = response.data
    console.log(response.data)
    })  
  let userIngs = []
  const payload = {
    id: pantId
  }
   axios.put(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, payload)
   .then(response => {
    userIngs = response.data
    console.log(response.data)
    })   

  

  userRecipes.forEach((oneRecipe) => {
    let haveIngredients = true
    oneRecipe.ingredients.forEach((recipeIngredient) => {
      if (!userIngs.includes(recipeIngredient.name)) {
        haveIngredients = false;
      }
      if (haveIngredients) {
        recipesCookNow.push(oneRecipe);
      }
    })
  })

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

