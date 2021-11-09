import axios from "axios"
import { GET_RECIPES, GET_DIETS, GET_RECIPE_BY_NAME, FILTERED_RECIPES_BY_DIET, FILTER_ORIGINAL_RECIPES, ORDER_RECIPES, GET_DETAILS, EMPTY_RECIPES, CREATE_RECIPE, SET_DIET_FILTER, SET_ORIGIN_FILTER } from "./types";


export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: GET_RECIPES,
            payload: json.data,
        })
    }
}

export function createRecipe(payload){
    return async function(){
        let json = await axios.post("http://localhost:3001/recipe",payload);
        return {
            type: CREATE_RECIPE,
            json
    }
}}

export function getRecipeByName(name){
    return async function(dispatch){
        try {let json = await axios.get("http://localhost:3001/recipes?name=" + name);
        return dispatch({
            type: GET_RECIPE_BY_NAME,
            payload: json.data,
        })
    }   catch (error) {
        alert ("Sorry, we couldn´t find the recipe you were looking for")
    }}
}
export function getDiets(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: GET_DIETS,
            payload: json.data,
        })
    }
}

export function filteredRecipesByDiets(payload){
    return {
        type: FILTERED_RECIPES_BY_DIET,
        payload
        }
}

export function filterOriginalRecipes(payload){
    return {
        type: FILTER_ORIGINAL_RECIPES,
        payload
        }
}

export function OrderRecipes(payload){
    return {
        type: ORDER_RECIPES,
        payload
        }
}
export function setDietFilter(payload){
    return {
        type: SET_DIET_FILTER,
        payload
        }
}
export function setOriginFilter(payload){
    return {
        type: SET_ORIGIN_FILTER,
        payload
        }
}

export function getDetails(id){
    return async function(dispatch){
        try {let json = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: GET_DETAILS,
            payload: json.data,
        })
    }   catch (error) {
        alert ("Sorry, we couldn´t find the recipe you were looking for")
    }}
}

export function emptyRecipes(){
    return {
        type: EMPTY_RECIPES,
        }
}