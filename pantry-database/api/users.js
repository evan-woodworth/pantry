// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const { User, Recipe, Pantry, Ingredient } = require('../models')

// Controllers
const test = async (req, res) => {
    res.json({ message: 'User endpoint OK!'});
}

const signup = async (req,res) => {
    console.log('--- INSIDE OF SIGNUP ---');
    console.log('req.body ==>', req.body);
    const {name, email, password} = req.body;

    try {
        // see if user exists in database, by email
        const user = await User.findOne({ email });

        // if user exists, return 400 error and message
        if (user) {
            return res.status(400).json({message: 'Email already exists'});
        } else {
            console.log('creating new user');
            let saltRounds = 12;
            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                email,
                password: hash
            })

            const savedNewUser = await newUser.save();
            
            res.json(savedNewUser);
        }
    } catch (error) {
        console.log('Error inside of /api/users/signup');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

const login = async (req,res) => {
    const {email, password} = req.body;

    try {
        // find user via email
        const user = await User.findOne({email});
        console.log(user);

        if (!user) {
            return res.status(400).json({message:'Username or password is incorrect.'});
        } else {
            let isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // create a token payload
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    expiredToken: Date.now()
                }

                try {
                    // token generation
                    let token = await jwt.sign(payload, JWT_SECRET, {expiresIn: 3600});
                    console.log("token", token);
                    let legit = await jwt.verify(token, JWT_SECRET, {expiresIn: 60});

                    res.json({
                        success: true,
                        token: `Bearer ${token}`,
                        userData: legit
                    })
                } catch (error) {
                    console.log('Error inside of isMatch conditional');
                    console.log(error);
                    return res.status(400).json({message:'Session has ended. Please log in again.'})
                }

                // add (1) to timesLoggedIn
                let logs = user.timesLoggedIn + 1;
                user.timesLoggedIn = logs;
                const savedUser = await user.save()
            } else {
                return res.status(400).json({message:'Username or password is incorrect.'});
            }
        }
    } catch (error) {
        console.log('Error inside of /api/users/login');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

const profile = async (req,res) => {
    console.log("Inside of profile route");
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}

const recipes = async (req,res) => {
    console.log("Inside of users/recipes route");
    console.log(req.user)
    console.log(req.notUser)
    //retrieve user details
    let user = await User.findById(req.user.id);

    // retrieve recipes associated with user
    let recipeList = [];
    user.recipes.forEach(async item=>{
        let theRecipe = await Recipe.findById(item.id);
        recipeList.push(theRecipe);
    })
     
    // display recipes
    res.json(recipeList);
}

const fetchAuthorizedPantries = async (user) => {
    // retrieve pantries associated with user
    let pantryList = [];

    user.pantries.forEach(async item=>{
        let thePantry = await Pantry.findById(item.id);
        pantryList.push(thePantry);
    })

    // sort for authorized pantries
    let authorizedPantries = [];
    pantryList.forEach(pantry=>{
        pantry.users.forEach(pantryUser=>{
            if ( pantryUser.user.id === user.id ) authorizedPantries.push(pantry);
        })
    })

    return authorizedPantries;
}

const pantries = async (req,res) => {
    console.log("Inside of users/pantries route");

    // retrieve user details
    let user = await User.findById(req.user.id);

    // retrieve authorized pantries
    let authorizedPantries = await fetchAuthorizedPantries(user);

    // display pantries
    res.json(authorizedPantries);
}
const fetchShoppingLists = async (req,res) => {
    console.log("Inside of users/shoppingLists route");

    // retrieve user details
    let user = await User.findById(req.user.id);

    // retrieve authorized pantries
    let authorizedPantries = await fetchAuthorizedPantries(user);

    // retrieve user's shopping lists from pantries
    userLists = [];
    authorizedPantries.forEach(pantry=>{
        pantry.shoppingLists.forEach(list=>{
            if ( user.id === list.owner.id ) {
                userLists.push(list);
            } else {
                list.shoppers.forEach(shopper=>{
                    if ( user.id === shopper.id ) userLists.push(list);
                })
            }
        })
    })
    // display lists
    res.json(userLists);
}

const addRecipe = async (req,res) => {
    console.log( "Inside of put users/recipes route" );
    const { name, mealId, category, area, thumbnail, tags, 
        instructions, ingredients, public, youtubeUrl } = req.body;

    try {
        // retrieve user
        let user = await User.findById(req.user.id);

        // retrieve recipe by id
        let recipe = await Recipe.findOne({ mealId });

        // if no recipe, create recipe
        if (!recipe) {
            console.log('creating recipe')
            recipe = new Recipe({
                name, mealId, category, area, thumbnail, tags,
                instructions, public, youtubeUrl
            })
            recipe.author = user;
            ingredients.forEach(async ing => {
                let addIng = Ingredient.findOne({name:ing.name});
                recipe.ingredients.push({
                    addIng,
                    measurement: ing.measurement
                })
            })
            const savedRecipe = recipe.save();
            res.json(savedRecipe)
        }
        // add recipe to user
        user.recipes.push(recipe);

        // save user
        user.save()

    } catch (error) {
        console.log("Error inside of put users/recipes route");
        console.log(error);
        return res.status(400).json({ message: 'Recipe could not be added, please try again.' });
    }
}

const addPantry = async (req,res) => {
    const { id } = req.params;
    console.log( "Inside of put users/pantries route" );

    try {
        // retrieve user
        let user = await User.findById(req.user.id);

        // retrieve recipe by id
        let pantry = await Pantry.findById(id);

        // add pantry to user
        user.pantries.push(pantry);

        // save user
        user.save()

    } catch (error) {
        console.log("Error inside of put users/pantries route");
        console.log(error);
        return res.status(400).json({ message: 'Pantry could not be added, please try again.' });
    }
}

// routes
// get
router.get('/test', test);
// GET api/users/profile (Private)
router.get('/profile', passport.authenticate('jwt', { session: false }), profile);
// GET api/users/recipes (Private)
router.get('/recipes', passport.authenticate('jwt', { session: false }), recipes);
// GET api/users/pantries (Private)
router.get('/pantries', passport.authenticate('jwt', { session: false }), pantries);
// GET api/users/shoppingLists (Private)
router.get('/shoppingLists', passport.authenticate('jwt', { session: false }), fetchShoppingLists);

// post
// POST api/users/register (Public)
router.post('/signup', signup);
// POST api/users/login (Public)
router.post('/login', login);

// put
// PUT api/users/recipes/:id (Private)
router.put('/recipes', addRecipe)
// PUT api/users/pantries/:id (Private)
router.put('/pantries/:id', addPantry)

module.exports = router; 