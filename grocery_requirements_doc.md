# Summary
Our application enables users to record ingredients they have, meals they want to make, and generates a shopping list for them. They will input their ingredients, input the meals they want to make, and have a shopping list they can export. 

# User Stories
## User edits existing ingredients
Bill is getting ready to do his weekly grocery shopping. In preparation he takes account of the ingredients he already has. He logs in to his account. He can see the ingredients he reported the last time he updated them. He is able to remove any ingredients he's used, and add any ingredients he's purchased. When he navigates away from the view with ingredients, his changes are saved. 

## User edits existing recipes
Bill is making his meal plan for the coming week. When he logs into his recipes he can see the recipes he used last shopping trip. He is able to add or remove recipes. 

## User's shopping list is auto generated
Bill has a shopping section that is auto updated whenever he makes changes to his recipes and his ingredients. Bill is able to navigate to this list. 

# Data Architecture
1. Ingredients
2. Recipes


# Data Relationships
1. Recipes have many ingredients
2. Users have many ingredients
3. Usrs have many recipes

# Routes
| Route | Description |
|-------|-------------|
| / | loads on homepage, shows current shopping list |
| /ingredients | editable list of current ingredients |
| /recipes | editable list of current recipes |
| /shoppinglist | viewable list of current shopping list |

# High level tasks
1. Populate database with recipes
2. Populate database with ingredients
3. Home view 
4. Ingredients view
5. Recipes view
6. shopping list view
7. home route
8. ingredients route
9. recipes route
10. shopping list route

# Stretch goals
1. Seperate recipes into current and archived. Archived would be recipes you have used in the past and might want to use in the future, but aren't on your current meal plan. 
2. If users don't like their shopping list they can make changes from the shopping list rather than navigating back to ingredients.
3. Export shopping list?