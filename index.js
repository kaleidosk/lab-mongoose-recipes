const mongoose = require('mongoose');
mongoose.set('strictQuery',false)

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const titlesArray = data.map (recipe => recipe.title )

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const newRecipe = {
title: "Asian Glazed Chicken",
level: "Amateur Chef",
ingredients: [
  "1/2 cup rice vinegar",
  "5 tablespoons honey",
  "1/3 cup soy sauce (such as Silver Swan®)",
  "1/4 cup Asian (toasted) sesame oil",
  "3 tablespoons Asian chili garlic sauce",
  "3 tablespoons minced garlic",
  "salt to taste",
  "8 skinless, boneless chicken thighs"
],
cuisine: "Asian",
dishType: "main_course",
image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
duration: 40,
creator: "Chef LePapu",
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create (newRecipe)
  })
  .then(()=> console.log `${newRecipe.title}`)
  .then(()=> Recipe.insertMany(data))
  .then(()=>console.log (titlesArray))
  .then (()=> Recipe.findOneAndUpdate({title:'Rigatoni Alla Genovese'},{duration:100},{new:true}))
  .then (()=> console.log("Recipe's duration updated successfully"))
  .then (()=> Recipe.deleteOne({title:'Carrpot Cake'}))
  .then (()=>console.log ("Carrot cake deleted successfully"))
  .then(()=> mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
