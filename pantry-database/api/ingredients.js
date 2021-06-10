// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Ingredient } = require('../models')

// controllers
// testing
const test = async (req, res) => {
    res.json({ message: 'Ingredient endpoint OK!'});
}
// fetch one by Id
const fetchOneById = async (req, res) => {
    const { id } = req.params;
    console.log('--- Inside of Ingredient fetchOneById ---');
    console.log(`Searching for ${id}`);
    try {
        let theIngredient = await Ingredient.findById(id);
        res.json({ theIngredient });
    } catch (error) {
        console.log("Error inside of /ingredients/id/:id");
        console.log(error);
        return res.status(400).json({message:'Ingredient not found, please try again.'})
    }
}
// fetch one by name
const fetchOneByName = async (req, res) => {
    const { name } = req.params;
    console.log('--- Inside of Ingredient fetchOneByName ---');
    console.log(`Searching for ${name}`);
    try {
        let theIngredient = await Ingredient.findOne({ name: name });
        res.json({ theIngredient });
    } catch (error) {
        console.log("Error inside of /ingredients/name/:name");
        console.log(error);
        return res.status(400).json({message:'Ingredient not found, please try again.'})
    }
}
// fetch all ingredients
const fetchAll = async (req, res) => {
    console.log('--- Inside of Ingredient fetchAll ---');
    console.log(`Searching for all ingredients`);
    try {
        let theIngredients = await Ingredient.find();
        res.json({ theIngredients });
    } catch (error) {
        console.log("Error inside of /ingredients/");
        console.log(error);
        return res.status(400).json({message:'Ingredients not found, please try again.'})
    }
}

// routes
router.get('/test', test)
router.get('/id/:id', fetchOneById)
router.get('/name/:name', fetchOneByName)
router.get('/', fetchAll)

module.exports = router; 