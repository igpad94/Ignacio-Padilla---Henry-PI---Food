import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from '../actions';
import {Link} from "react-router-dom";
import defaultimage from "./styles/assets/Default.jpg";
import loading from "./styles/assets/loading.gif";
import s from './styles/recipeDetails.module.css';

function RecipeDetails({recipeId}) {
    
const dispatch = useDispatch();

useEffect (() =>{
    dispatch(getDetails(recipeId));
}, [dispatch, recipeId]);

const recipeById = useSelector (state => state.recipeById)

    return (
        <div id={s.recipeDetails}>
        {recipeById.length ? (
            <div>
              <h1 id={s.title}>{recipeById[0].title}</h1>
                <div>
                    <img id={s.image}src={recipeById[0].image ? recipeById[0].image : defaultimage} alt="img not found" widht="200px" height="300"/>
                    {
                     recipeById[0].createdInDb === true ?
                     <div>
                     <div className={s.titles}>Diets:</div>
                      {recipeById[0].diets.map(e => " *" + e.name)}
                     </div>
                     :
                     <div>
                     <div className={s.titles}>Diets:</div>
                     {recipeById[0].diets.map(e => " *" + e)}
                     </div>
                    }
                    <div> 
                    <div className={s.titles}>Summary:</div>
                    <div id={s.summary}> 
                    {recipeById[0].summary.replace(/<\/?[^>]+(>|$)/g, "")}
                    </div>
                    </div>
                    <div>
                    <div className={s.titles}>Score:</div>
                     {recipeById[0].score}
                     </div>
                     <div>
                    <div className={s.titles}>Health Score:</div>
                    {recipeById[0].healthScore}
                    </div>
                    <div className={s.titles}>Steps:</div>
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
        <div id={s.loading}>
        Gathering Ingredients..
        <img id={s.loadingImg} src={loading} alt="img not found" />
        </div>
        }
        <Link to="/home">
        <button id={s.button}>Return Home</button>
        </Link>
        </div>
    )
}

export default RecipeDetails
