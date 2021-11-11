import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe, getRecipes, setDietFilter, setOriginFilter } from '../actions';
import s from './styles/recipeCreation.module.css';

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
    dispatch(setOriginFilter("All"))
    dispatch(setDietFilter("All"))
    push("/home");
};

    return (
        <div className={s.recipeCreation}>
            <span id={s.createTitle}> Create your own Recipe: </span>
            <div >
            <label className={s.itemTitle}>Title:</label>
            <input className={errors.title ? s.errorInput : s.itemInput} name="title" type="text" onChange={handleChange} value={input.title} />
            {errors.title &&  (
            <p className={s.error}>{errors.title}</p>
            )}
            </div>
            <div >
            <label className={s.itemTitle}>Summary:</label>
            <input className={errors.summary ? s.errorInput : s.itemInput}name="summary" type="text" onChange={handleChange} value={input.summary}/>
            {errors.summary &&  (
            <p className={s.error}>{errors.summary}</p>
            )}
            </div>
            <div>
            <label className={s.itemTitle}>Score:</label>
            <input className={errors.score ? s.errorInput : s.itemInput}name="score" type="number" onChange={handleChange} value={input.score} />
            {errors.score &&  (
            <p className={s.error}>{errors.score}</p>
            )}
            </div>
            <div >
            <label className={s.itemTitle}>Health Score:</label>
            <input className={errors.healthScore ? s.errorInput : s.itemInput}name="healthScore" type="number"onChange={handleChange}  value={input.healthScore} />
            {errors.healthScore &&  (
            <p className={s.error}>{errors.healthScore}</p>
            )}
            </div>
            <div >
            <label className={s.itemTitle}>Instructions:</label>
            <textarea rows="10" cols="45" className={errors.analyzedInstructions ? s.errorInput : s.itemInput}name="analyzedInstructions" type="text" onChange={e =>handleChange(e)} value={input.analyzedInstructions}/>
            {errors.analyzedInstructions &&  (
            <p className={s.error}>{errors.analyzedInstructions}</p>
            )}
            </div>
            <div >
            <label className={s.itemTitle}>Image URL (optional):</label>
            <input className={s.itemInput}name="image" type="text" onChange={handleChange} value={input.image} />
            </div>
            <div>
            <label className={s.itemTitle}>Diets:</label>
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
            <button className={!input.title ||errors.title || errors.summary || errors.score || errors.healthScore || errors.analyzedInstructions ? s.disabledButton : s.button} onClick={e =>handleClick(e)} 
            disabled={!input.title ||errors.title || errors.summary || errors.score || errors.healthScore || errors.analyzedInstructions }>
                CREATE!
            </button>
            <Link to="/home">
            <button className={s.button}>Return Home</button>
            </Link>
        </div>
    )
}

export default RecipeCreation
