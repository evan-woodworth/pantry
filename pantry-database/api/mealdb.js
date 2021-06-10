// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;

const getURL = (searchType, searchParam = '') => {
    const searchURL = {
        name: 'search.php?s=',
        firstLetter: 'search.php?f=',
        id: 'lookup.php?i=',
        random: 'random.php',
        randomSelection: 'randomselection.php',
        categories: 'categories.php',
        latest: 'latest.php',
        listCategories: 'list.php?c=list',
        listAreas: 'list.php?a=list',
        listIngredients: 'list.php?i=list',
        filterIngredient: 'filter.php?i=',
        filterCategory: 'filter.php?c=',
        filterArea: 'filter.php?a='
    }
    let theURL = `https://www.themealdb.com/api/json/v2/${API_KEY}/${searchURL[searchType]}${searchParam}`;
    return theURL;
}

const externalData = async (req,res) => {
    console.log('--- Inside of mealdb route ---')
    const { searchType, searchParam } = req.params;
    theURL = getURL( searchType, searchParam );
    try {
        const results = await axios.get(theURL);
        res.json(results.data);
    } catch (error) {
        console.log("Error inside of mealdb route");
        console.log(error);
        return res.status(400).json({ message: 'mealdb could not be queried, please try again.' });
    }
}

router.get('/:searchType/:searchParam', externalData);

module.exports = router; 