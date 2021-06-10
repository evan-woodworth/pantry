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
    // fetch user
    const user = await User.findById(req.user.id);
    const {name, type} = req.body;

    try {
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
        const newShoppingList = pantry.shoppingLists.create({
            name
        })
        ingredients.forEach(async ing => {
            let addIng = Ingredient.findOne({name:ing.name});
            newShoppingList.ingredients.push({
                addIng,
                note
            })
        })
        newShoppingList.owner.push(user);
        const savedNewShoppingList = await newShoppingList.save();
        res.json(savedNewShoppingList);
    } catch (error) {
        console.log('Error inside of /api/pantries/shoppinglist/new');
        console.log(error);
        return res.status(400).json({message: 'Error occurred, please try again...'})
    }
}

// routes
// get
router.get('/test', passport.authenticate('jwt', { session: false }), test)
router.get('/id/:id', passport.authenticate('jwt', { session: false }), fetchOneById)
router.get('/name/:name', passport.authenticate('jwt', { session: false }), fetchAllByName)
router.get('/', passport.authenticate('jwt', { session: false }), fetchAll)

// post
router.post('/create', passport.authenticate('jwt', { session: false }), createPantry)
router.post('/shoppinglist/new', passport.authenticate('jwt', { session: false }), createShoppingList)

// put


// export
module.exports = router; 