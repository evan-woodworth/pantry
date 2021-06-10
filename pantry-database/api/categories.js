// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Category } = require('../models')

// controllers
// testing
const test = async (req, res) => {
    res.json({ message: 'Categories endpoint OK!'});
}
// fetch one by Id
const fetchOneById = async (req, res) => {
    const { id } = req.params;
    console.log('--- Inside of Categories fetchOneById ---');
    console.log(`Searching for ${id}`);
    try {
        let theCategory = await Category.findById(id);
        res.json({ theCategory });
    } catch (error) {
        console.log("Error inside of /categories/id/:id");
        console.log(error);
        return res.status(400).json({message:'Category not found, please try again.'})
    }
}
// fetch all by name
const fetchAllByName = async (req, res) => {
    const { name } = req.params;
    console.log('--- Inside of Categories fetchOneByName ---');
    console.log(`Searching for ${name}`);
    try {
        let theCategories = await Category.find({ name: { $regex: `${name}`, $options: 'i' } });
        res.json({ theCategories });
    } catch (error) {
        console.log("Error inside of /categories/name/:name");
        console.log(error);
        return res.status(400).json({message:'Categories not found, please try again.'})
    }
}
// fetch all categories
const fetchAll = async (req, res) => {
    console.log('--- Inside of Categories fetchAll ---');
    console.log(`Searching for all categories`);
    try {
        let theCategories = await Category.find();
        res.json({ theCategories });
    } catch (error) {
        console.log("Error inside of /categories/");
        console.log(error);
        return res.status(400).json({message:'Categories not found, please try again.'})
    }
}

// routes
router.get('/test', test)
router.get('/id/:id', fetchOneById)
router.get('/name/:name', fetchAllByName)
router.get('/', fetchAll)

module.exports = router; 