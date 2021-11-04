import React, { useEffect }  from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { getRecipes, getDiets, emptyRecipes } from '../actions';
import Cards from './Cards';
import SearchBar from './SearchBar';
import s from './styles/home.module.css';
import loading from "./styles/assets/loading.gif";

function Home() {

const dispatch = useDispatch();
const allDiets = useSelector (state => state.diets)
const recipeById = useSelector (state => state.recipeById)
const allRecipes = useSelector (state => state.fullRecipes)

useEffect (() =>{
    if(allRecipes.length === 0){
    dispatch(getRecipes())};
    if(recipeById.length > 0){
    dispatch(emptyRecipes())};
    if(allDiets.length === 0){
    dispatch(getDiets())};
})


const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
}

    return (
        <div id={s.home}>
            <h1>Home</h1>
            <Link to= "/recipe">Create your own recipe</Link>  
            <button onClick={handleClick}>
                Reload all recipes
            </button>
            <SearchBar/>
            { allRecipes.length > 0 ?
            <Cards/> : 
            <div>
            Gathering Ingredients..
            <img src={loading} alt="img not found" widht="150px" height="200" />
            </div>
            }
        </div>
    )
}

export default Home
