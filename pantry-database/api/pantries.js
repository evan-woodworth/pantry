// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Pantry, User, Ingredient } = require('../models')

// controllers
// testing
const test = async (req, res) => {
    res.json({ message: 'Pantries endpoint OK!'});
}
// fetch one by Id
const fetchOneById = async (req, res) => {
    const { id } = req.params;
    console.log('--- Inside of Pantry fetchOneById ---');
    console.log(`Searching for ${id}`);
    try {
        let thePantry = await Pantry.findById(id);
        res.json({ thePantry });
    } catch (error) {
        console.log("Error inside of /pantries/id/:id");
        console.log(error);
        return res.status(400).json({message:'Pantry not found, please try again.'})
    }
}
// fetch all by name
const fetchAllByName = async (req, res) => {
    const { name } = req.params;
    console.log('--- Inside of Pantry fetchOneByName ---');
    console.log(`Searching for ${name}`);
    try {
        let thePantries = await Pantry.find({ name: { $regex: `${name}`, $options: 'i' } });
        res.json({ thePantries });
    } catch (error) {
        console.log("Error inside of /pantries/name/:name");
        console.log(error);
        return res.status(400).json({message:'Pantries not found, please try again.'})
    }
}
// fetch all pantries
const fetchAll = async (req, res) => {
    console.log('--- Inside of Pantry fetchAll ---');
    console.log(`Searching for all pantries`);
    try {
        let thePantries = await Pantry.find();
        res.json({ thePantries });
    } catch (error) {
        console.log("Error inside of /pantries/");
        console.log(error);
        return res.status(400).json({message:'Pantries not found, please try again.'})
    }
}

const createPantry = async (req,res) => {
    console.log('--- Inside of create pantry ---')
    console.log('req.body ==>', req.body)

    try {
        // fetch user
        const user = await User.findById(req.user.id);
        const {name, type} = req.body;
        console.log('Creating new pantry');
        const newPantry = new Pantry({
            name,
            type
        })
        newPantry.users.push({
            user,
            access: true,
            admin: true
        })
        const savedNewPantry = await newPantry.save();
        user.pantries.push(savedNewPantry);
        const savedUser = user.save();
        res.json(savedNewPantry);
    } catch (error) {
        console.log('Error inside of /api/pantries/create');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

const createShoppingList = async (req,res) => {
    console.log('--- Inside of New Shopping List route ---')
    const { pantryId, name, ingredients } = req.body;

    try {
        const pantry = await Pantry.findById(pantryId);
        const user = await User.findById(req.user.id);
        const newShoppingList = pantry.shoppingLists.push({
            name
        })
        ingredients.forEach(async ing => {
            let addIng = Ingredient.findOne({name:ing.name});
            newShoppingList.ingredients.push({
                addIng,
                note
            })
        })
        const savedPantry = await pantry.save();
        res.json(savedNewShoppingList);
    } catch (error) {
        console.log('Error inside of /api/pantries/shoppinglist/new');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}
// fetch all ingredients from pantry
const fetchIngredients = async (req, res) => {
    console.log('--- Inside of Pantry fetchIngredients ---');
    console.log(`Searching for ingredients from pantry`);
    console.log(req.body)
    const { id } = req.body;
    try {
        Pantry.findById(id).populate("ingredients.ingredient")
        .exec((err, pantry)=>{
            if (err) console.log("there was an error.");
            console.log('pantry',pantry)
            const ingredientList = [];
            console.log(pantry.ingredients);
            pantry.ingredients.forEach(ing=>ingredientList.push(ing.ingredient.name))
            console.log('----- ingredient list -----')
            console.log(ingredientList)
            console.log('----- end of ingredient list -----')
            res.json({ingredientList});
        })
    } catch (error) {
        console.log('Error inside of /api/pantries/ingredients');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

const addIngredient = async (req,res) => {
    console.log('--- Inside of Pantry Add Ingredient ---');
    const { name, id } = req.body;
    
    try {
        const thePantry = await Pantry.findById(id);
        const ingredient = await Ingredient.findOne({name});
        thePantry.ingredients.push({
            ingredient
        })
        const savedPantry = await thePantry.save();
        console.log(savedPantry)
        res.json(savedPantry);
    } catch (error) {
        console.log('Error inside of /api/pantries/addIngredient');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

const deleteIngredient = async (req,res) => {
    console.log('--- Inside of Pantry Delete Ingredient ---');
    const { name, id } = req.body;
    
    try {
        const ingredient = await Ingredient.findOne({name});
        let refId = '';
        Pantry.findById(id).populate("ingredients.ingredient")
        .exec((err, pantry)=>{
            if (err) console.log("error, y'all");
            pantry.ingredients.forEach(ing=>{
                if (ing.ingredient.name === name) refId = ing._id;
            })
            // console.log("pantry ingredients",pantry.ingredients)
            console.log("Removing Ingredient: ",pantry.ingredients.id(refId));
            pantry.ingredients.id(refId).remove();
            pantry.save();
        })
        // thePantry.ingredients.id(ingredient).remove();
        // console.log('removed ingredient')
        // const savedPantry = await thePantry.save();
        // res.json(savedPantry);
    } catch (error) {
        console.log('Error inside of /api/pantries/deleteIngredient');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

// routes
// get
router.get('/test', passport.authenticate('jwt', { session: false }), test)
router.get('/id/:id', passport.authenticate('jwt', { session: false }), fetchOneById)
router.get('/name/:name', passport.authenticate('jwt', { session: false }), fetchAllByName)
router.put('/ingredients', passport.authenticate('jwt', { session: false }), fetchIngredients)
router.get('/', passport.authenticate('jwt', { session: false }), fetchAll)

// post
router.post('/create', passport.authenticate('jwt', { session: false }), createPantry)
router.post('/shoppinglist/new', passport.authenticate('jwt', { session: false }), createShoppingList)

// put
router.put('/addIngredient', passport.authenticate('jwt', { session: false }), addIngredient)

// delete
router.put('/deleteIngredient', passport.authenticate('jwt', { session: false }), deleteIngredient)

// export
module.exports = router; 