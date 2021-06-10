// Imports
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT || 8000;

// API
const users = require('./api/users');
const ingredients = require('./api/ingredients');
const categories = require('./api/categories');
const mealdb = require('./api/mealdb');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize Passport and use config file
app.use(passport.initialize());
require('./config/passport')(passport);

// Home route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'The Database Home route' });
});

// Routes
app.use('/api/users', users);
app.use('/api/ingredients', ingredients)
app.use('/api/categories', categories)

// External API routes
app.use('/api/mealdb', mealdb)

app.get('/*', (req, res) => {
    res.status(404).json({ message: 'Data not found' });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
