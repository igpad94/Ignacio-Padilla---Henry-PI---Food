import { GET_RECIPES, GET_DIETS, GET_RECIPE_BY_NAME, FILTERED_RECIPES_BY_DIET, FILTER_ORIGINAL_RECIPES, ORDER_RECIPES, GET_DETAILS, EMPTY_RECIPES, CREATE_RECIPE, SET_DIET_FILTER, SET_ORIGIN_FILTER } from "../actions/types";

const initialState = {
    recipes : [],
    diets : [],
    fullRecipes: [],
    recipeById: [],
    activeDietFilter: "All",
    activeOriginFilter: "All"
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                fullRecipes: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
            }
        case EMPTY_RECIPES:
            return {
                ...state,
                recipeById: [] 
            }
        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                recipeById: action.payload
            }
        case ORDER_RECIPES:
        let sortedRecipes = state.recipes;
        if(action.payload === "A to Z") {
            sortedRecipes.sort((a,b) => {
                if(a.title.toUpperCase() > b.title.toUpperCase()) {
                    return 1;
                }
                if(b.title.toUpperCase() > a.title.toUpperCase()) {
                    return -1;
                }
                return 0
            })
        }
        if(action.payload === "Z to A") {
            sortedRecipes.sort((a,b) => {
                if(a.title.toUpperCase() > b.title.toUpperCase()) {
                    return -1;
                }
                if(b.title.toUpperCase() > a.title.toUpperCase()) {
                    return 1;
                }
                return 0
            })
        }
        if(action.payload === "0 to 100") {
            sortedRecipes.sort((a,b) => {
                if(a.score > b.score) {
                    return 1;
                }
                if(b.score > a.score) {
                    return -1;
                }
                return 0
            })
        }
        if(action.payload === "100 to 0") {
            sortedRecipes.sort((a,b) => {
                if(a.score > b.score) {
                    return -1;
                }
                if(b.score > a.score) {
                    return 1;
                }
                return 0
            })
        }
            return {
                ...state,
                recipes: sortedRecipes,
            }
        case FILTERED_RECIPES_BY_DIET:
            const allRecipes = state.fullRecipes
            const dietFiltered = action.payload === "All" ? allRecipes : allRecipes.filter(e => e.diets.includes(action.payload) || e.diets.map(e => e.name).includes(action.payload))
            return {
                ...state,
                recipes: dietFiltered
            }
        case FILTER_ORIGINAL_RECIPES:
            const originalFiltered = action.payload === "Original Recipes" ? state.fullRecipes.filter(e => e.createdInDb) : state.fullRecipes.filter(e => !e.createdInDb)
            return {
                ...state,
                recipes: action.payload === "All" ? state.fullRecipes : originalFiltered
            }
        case SET_DIET_FILTER:
            return {
                ...state,
                activeDietFilter: action.payload
            }
        case SET_ORIGIN_FILTER:
            return {
                ...state,
                activeOriginFilter: action.payload
            }
            default:
                return state;
    }
}