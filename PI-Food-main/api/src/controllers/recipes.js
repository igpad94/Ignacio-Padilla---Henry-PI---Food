const axios = require("axios");
const { Diet, Recipe } = require('../db.js');
const apiKey = process.env.FOOD_APIKEY2;

const getApiRecipes = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${apiKey}&addRecipeInformation=true`)
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            diets: e.diets.map(e => e),
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            analyzedInstructions: e.analyzedInstructions[0]
        }
    });
    return apiInfo;
}

const getDbRecipes = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const AllInfo = apiInfo.concat(dbInfo);

    return AllInfo;
}

module.exports = {
    getAllRecipes
};