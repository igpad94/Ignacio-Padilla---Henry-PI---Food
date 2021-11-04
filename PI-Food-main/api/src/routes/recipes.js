const express = require("express");
const { getAllRecipes } = require("../controllers/recipes");
const router = express.Router();


router.get("/", async (req, res) => {
    const name = req.query.name
    let recipesTotal = await getAllRecipes();
    if (name) {
        let recipeName = await recipesTotal.filter(e => e.title.toLowerCase().includes(name))
        recipeName.length ?
        res.status(200).send(recipeName) :
        res.status(400).send("Sorry, we couldn´t find the recipe you were looking for :(")
    } else {
        res.status(200).send(recipesTotal)
    }
})

router.get("/:recipeId", async (req, res) => {
    const { recipeId } = req.params;
    let recipesTotal = await getAllRecipes();
    if ( recipeId ) {
        let recipeById = await recipesTotal.filter(e => e.id == recipeId);
        recipeById.length ?
        res.status(200).send(recipeById) :
        res.status(400).send("Sorry, we couldn´t find the recipe you were looking for :(")
    }
})


module.exports = router