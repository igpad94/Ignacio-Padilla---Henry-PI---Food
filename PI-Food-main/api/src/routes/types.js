const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Diet } = require('../db.js');
const apiKey = process.env.FOOD_APIKEY6;  


router.get("/", async (req, res) => {
    const apiDiets = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${apiKey}&addRecipeInformation=true`)
    const diets = await apiDiets.data.results.map(e => e.diets)
    const dietsList = diets.flat()
    // const dietsList = ["gluten free", "ketogenix", "vegetarian", "lacto-vegetarian", "ovo-vegetarian", "vegan", 
    //                     "pescetarian", "paleo", "primal", "low fodmap", "whole30"]
    dietsList.forEach(e => {
        Diet.findOrCreate({
            where: {name: e}
        })
    })
    const allDiets = await Diet.findAll();
    res.send(allDiets);
})

module.exports = router