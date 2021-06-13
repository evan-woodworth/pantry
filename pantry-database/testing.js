const {User, Recipe, Pantry, Ingredient} = require('./models') 

const testFunction = async () => {
    console.log('###############################')
    const user = await User.findOne({email: 'test8@hotmail.com'})
    console.log(user)
    const newPantry = new Pantry({
        name: "dumbPantry",
        type: "Personal"
    })
    newPantry.users.push({
        user, 
        access: true,
        admin: true
    })
    const savedNewPantry = await newPantry.save()
    console.log(savedNewPantry)
    console.log('****************')
    console.log(newPantry)
    user.pantries.push(savedNewPantry)
    const savedUser = await user.save()
    console.log(savedUser)
    const newShoppingList = savedNewPantry.shoppingLists.push({
        name: "dumberShoppingList"
    }) 
    
    console.log(newShoppingList)
    const savedAnotherNewShoppingList = await savedNewPantry.save()
    console.log(savedAnotherNewShoppingList)
    console.log(newShoppingList) 

}

testFunction();