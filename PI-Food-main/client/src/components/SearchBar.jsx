import React, { useState } from "react";
import {useDispatch } from "react-redux";
import { getRecipeByName, setDietFilter, setOriginFilter } from '../actions';
import s from './styles/searchBar.module.css';

function SearchBar () {

const dispatch = useDispatch();


const [recipe, setRecipe] = useState();

const handleChange = (e) => {
    setRecipe(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault();
    if (recipe) {
        dispatch(getRecipeByName(recipe.toLowerCase()));
        setRecipe("")
        dispatch(setDietFilter("All"))
        dispatch(setOriginFilter("All"))
    }
    else{
        alert("please enter a valid recipe name")
    }
}   

return (
    <form  onSubmit={handleSubmit}>
        <input className={s.searchinput} 
        type="text"
        placeholder="Search recipes..."
        value={recipe}
        onChange={handleChange}
         />
         <input className={s.searchbutton} type="submit" value="search"/>
    </form>
)
}

export default SearchBar