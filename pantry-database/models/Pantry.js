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

const pantrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    ingredients: [{
        ingredient: {type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"},
        note: String
    }],
    users: {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        access: Boolean,
        admin: Boolean
    },
    shoppingLists: [shoppingListSchema],
    nonAdminRights: String
})

const Pantry = mongoose.model('Pantry', pantrySchema);
module.exports = Pantry;