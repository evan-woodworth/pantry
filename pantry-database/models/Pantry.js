const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    nonAdminRights: String
})

const Pantry = mongoose.model('Pantry', pantrySchema);
module.exports = Pantry;