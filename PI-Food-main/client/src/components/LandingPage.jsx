import React, { useEffect }  from 'react';
import {Link} from "react-router-dom"
import { getRecipes, getDiets } from '../actions';
import {useDispatch, useSelector} from "react-redux";
import s from './styles/landingPage.module.css';
import vid from "./styles/assets/LandingVid.mp4";

function LandingPage() {


const dispatch = useDispatch();
const allDiets = useSelector (state => state.diets)
const allRecipes = useSelector (state => state.fullRecipes)   
    
useEffect (() =>{
    if(allRecipes.length === 0){
    dispatch(getRecipes())};
    if(allDiets.length === 0){
    dispatch(getDiets())};
    })
    
    return (
        <div>
            <video autoPlay loop muted id={s.myVideo}>
                <source src={vid} type='video/mp4' />
            </video>
            <div id={s.welcome}>
            <h1>Welcome to our kitchen!</h1>
            <Link to ="/home">
            <button className={s.button}>Start</button>
            </Link>
            <h4>SoyHenry PI by Ignacio Padilla</h4>
            </div>
        </div>
    )
}

export default LandingPage
