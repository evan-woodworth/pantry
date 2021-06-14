const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mealId: String,
    category: String,
    area: String,
    thumbnail: String,
    tags: [String],
    instruction: String,
    ingredients: [{
        ingredient: {type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"},
        name: String,
        measurement: String
    }],
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    public: Boolean,
    youtubeUrl: String
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;