import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe, getRecipes } from '../actions';

export function validate(input) {
    let errors = {};
    if (!input.title) {
        errors.title = 'Title is required';
    } else if (!/^[a-zA-Z\s]*$/.test(input.title)) {
        errors.title = 'Title is invalid, should contain only letters';
    }
    if (!input.summary) {
        errors.summary = 'Summary is required';}
    if (!input.score) {
        errors.score = 'Score is required';
    } else if (!/^[1-9][0-9]?$|^100$/.test(input.score)) {
        errors.score = 'Score is invalid, should contain only numbers from 1 to 100';
    }
    if (!input.healthScore) {
        errors.healthScore = 'Health score is required';
    } else if (!/^[1-9][0-9]?$|^100$/.test(input.healthScore)) {
        errors.healthScore = 'Health score is invalid, should contain only numbers from 1 to 100';
    }
    if (!input.analyzedInstructions) {
        errors.analyzedInstructions = 'Instructions are required';}
    return errors;
  };



function RecipeCreation() {

const { push } = useHistory();
const dispatch = useDispatch();
const allDiets = useSelector (state => state.diets)

useEffect (() =>{
    if(allDiets.length === 0){
    dispatch(getDiets())};
})

const [input, setInput] = useState({
    title: "",
    summary: "",
    score: "",
    healthScore: "",
    analyzedInstructions: "",
    image: "",
    diets: []
})
const [errors, setErrors] = useState({
    title: "",
    summary: "",
    score: "",
    healthScore: "",
    analyzedInstructions: "",
})

const handleChange = (e) => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}

const handleChecked = (e) => {
    let dietName = e.target.name
    if(input.diets.includes(dietName)){
    setInput({
        ...input,
        diets: input.diets.filter(e => e !== (dietName))
    })
    } else {
    setInput({
        ...input,
        diets: input.diets.concat(dietName)
    })
}}

const handleClick = (e) => {
    e.preventDefault();
    dispatch(createRecipe(input))
    alert("recipe created successfully")
    setInput({
        title: "",
        summary: "",
        score: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "",
        diets: []
    })
    dispatch(getRecipes())
    push("/home");
};

    return (
        <div>
            <span> Create your own Recipe: </span>
            <div>
            <label>Title:</label>
            <input name="title" type="text" onChange={handleChange} value={input.title} />
            {errors.title &&  (
            <p>{errors.title}</p>
            )}
            </div>
            <div>
            <label>Summary:</label>
            <input name="summary" type="text" onChange={handleChange} value={input.summary}/>
            {errors.summary &&  (
            <p>{errors.summary}</p>
            )}
            </div>
            <div>
            <label>Score:</label>
            <input name="score" type="number" onChange={handleChange} value={input.score} />
            {errors.score &&  (
            <p>{errors.score}</p>
            )}
            </div>
            <div>
            <label>Health Score:</label>
            <input name="healthScore" type="number"onChange={handleChange}  value={input.healthScore} />
            {errors.healthScore &&  (
            <p>{errors.healthScore}</p>
            )}
            </div>
            <div>
            <label>Instructions:</label>
            <textarea name="analyzedInstructions" type="text" onChange={e =>handleChange(e)} value={input.analyzedInstructions}/>
            {errors.analyzedInstructions &&  (
            <p>{errors.analyzedInstructions}</p>
            )}
            </div>
            <div>
            <label>Image URL (optional):</label>
            <input name="image" type="text" onChange={handleChange} value={input.image} />
            </div>
            <div>
            <label>Diets:</label>
            {
                allDiets.map(e => {
                    return (
                        <span key={e.id}>
                        <input type="checkbox" name={e.name} onClick={handleChecked}/>
                        {e.name}
                        </span>
                    )
                })
            }
            </div>
            <button onClick={e =>handleClick(e)} 
            disabled={!input.title ||errors.title || errors.summary || errors.score || errors.healthScore || errors.analyzedInstructions }>
                CREATE!
            </button>
            <Link to="/home">
            <button>Return Home</button>
            </Link>
        </div>
    )
}

export default RecipeCreation
