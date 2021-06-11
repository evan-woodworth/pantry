const { Recipe } = require('./models');

Recipe.create([
    {
        name: 'Split Pea Soup',
        mealID: '52925',
        category: 'Side',
        area: 'Canadian',
        thumbnail: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        tags: ['pea', 'soup'],
        instruction: 'Preheat the oven to 200C/180C Fan/Gas 6.\r\nPut the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.\r\nCream together the butter and sugar until light and fluffy. You can do this in a food processor if you have one. Process for 2-3 minutes. Mix in the eggs, then add the ground almonds and almond extract and blend until well combined.\r\nPeel the apples, and cut thin slices of apple. Do this at the last minute to prevent the apple going brown. Arrange the slices over the biscuit base. Spread the frangipane filling evenly on top. Level the surface and sprinkle with the flaked almonds.\r\nBake for 20-25 minutes until golden-brown and set.\r\nRemove from the oven and leave to cool for 15 minutes. Remove the sides of the tin. An easy way to do this is to stand the tin on a can of beans and push down gently on the edges of the tin.\r\nTransfer the tart, with the tin base attached, to a serving plate. Serve warm with cream, crème fraiche or ice cream.',
        ingredients: [{ingredient: '60c0f38a2d7a0f1216a0cfa8', measurement: '1kg'}],
        author: null,
        public: true,
        youtubeURL: "https://www.youtube.com/watch?v=rp8Slv4INLk"
    },
    {
        name: 'Apple & Blackberry Crumble',
        mealID: '52893',
        category: 'Dessert',
        area: 'British',
        thumbnail: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        tags: ['crumble', 'apple'],
        instruction: 'Heat oven to 190C/170C fan/gas 5. Tip the flour and sugar into a large bowl. Add the butter, then rub into the flour using your fingertips to make a light breadcrumb texture. Do not overwork it or the crumble will become heavy. Sprinkle the mixture evenly over a baking sheet and bake for 15 mins or until lightly coloured.\r\nMeanwhile, for the compote, peel, core and cut the apples into 2cm dice.',
        ingredients: [{ingredient: '60c0f38a2d7a0f1216a0cfac', measurement: '1kg'}],
        author: null,
        public: true,
        youtubeURL: "https://www.youtube.com/watch?v=4vhcOwVBDO4"
    }
])

