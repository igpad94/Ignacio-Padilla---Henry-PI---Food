import React, { useEffect }  from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { getRecipes, getDiets, emptyRecipes,  setDietFilter, setOriginFilter  } from '../actions';
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
    dispatch(setOriginFilter("All"))
    dispatch(setDietFilter("All"))
}

    return (
        <div id={s.home}>
            <h1 id={s.hometitle}>Home</h1>
            <div className={s.nav}>
            <Link to= "/recipe">
                <button className={s.navitems}>
                Create your own recipe!
                </button>
            </Link>  
            <SearchBar/>
            <button className={s.navitems} onClick={handleClick}>
                Reload all recipes
            </button>
            </div>
            { allRecipes.length > 0 ?
            <Cards/> : 
            <div id={s.loading}>
            Gathering Ingredients..
            <img id={s.loadingImg} src={loading} alt="img not found" />
            </div>
            }
        </div>
    )
}

export default Home
