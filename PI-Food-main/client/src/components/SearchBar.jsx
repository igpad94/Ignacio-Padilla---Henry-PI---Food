import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { getRecipeByName } from '../actions';

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
    }
    else{
        alert("please enter a valid recipe name")
    }
}   

return (
    <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Search recipes..."
        value={recipe}
        onChange={handleChange}
         />
         <input type="submit" value="search"/>
    </form>
)
}

export default SearchBar