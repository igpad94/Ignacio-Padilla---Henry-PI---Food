const express = require("express");
const router = express.Router();
const { Recipe, Diet } = require('../db.js');

router.post("/", async(req,res) => {
let{
    title,
    summary,
    score,
    healthScore,
    analyzedInstructions,
    diets,
    image,
    createdInDb
} = req.body

let recipeCreated = await Recipe.create({
    title,
    summary,
    score,
    healthScore,
    analyzedInstructions,
    image,
    createdInDb
})

let dietDb = await Diet.findAll({
    where: {name: diets}
})
recipeCreated.addDiet(dietDb);
res.send("Recipe created successfully")
})

module.exports = router