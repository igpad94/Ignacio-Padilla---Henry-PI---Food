const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require("./recipe.js")
const recipesRouter = require("./recipes.js")
const typesRouter = require("./types.js")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRouter);
router.use("/recipe", recipeRouter);
router.use("/types", typesRouter);



module.exports = router;
