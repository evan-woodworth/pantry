const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoppingListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"},
        note: String
    }],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    shoppers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
module.exports = ShoppingList;