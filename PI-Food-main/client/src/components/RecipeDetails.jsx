import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from '../actions';
import {Link} from "react-router-dom";
import defaultimage from "./styles/assets/Default.jpg";
import loading from "./styles/assets/loading.gif";

function RecipeDetails({recipeId}) {
    
const dispatch = useDispatch();

useEffect (() =>{
    dispatch(getDetails(recipeId));
}, [dispatch, recipeId]);

const recipeById = useSelector (state => state.recipeById)

    return (
        <div>
        {recipeById.length ? (
            <div>
              <h1>{recipeById[0].title}</h1>
                <div>
                    {
                     recipeById[0].createdInDb === true ?
                     <div>Diets: {recipeById[0].diets.map(e => e.name)}</div>
                     :
                     <div>Diets: {recipeById[0].diets}</div>
                    }
                    <img src={recipeById[0].image ? recipeById[0].image : defaultimage} alt="img not found" widht="150px" height="200"/>
                    <div>Summary: {recipeById[0].summary}</div>
                    <div>Score: {recipeById[0].score}</div>
                    <div>Health Score: {recipeById[0].healthScore}</div>
                    <div>Steps:</div>
                    {
                    recipeById[0].createdInDb === true ?
                    <div> {recipeById[0].analyzedInstructions} </div> :
                    recipeById[0].analyzedInstructions && recipeById[0].analyzedInstructions.steps.map(e => {
                        return (
                        <p key={e.number}>{e.number} : {e.step}</p>
                    )})
                }
                </div>     
            </div>
        ) : 
        <div>
        Gathering Ingredients..
        <img src={loading} alt="img not found" widht="150px" height="200" />
        </div>
        }
        <Link to="/home">
        <button>Return Home</button>
        </Link>
        </div>
    )
}

export default RecipeDetails
