import React, {useState } from 'react'
import {Link} from "react-router-dom";
import Card from './Card';
import Pagination from './Pagination';
import { useSelector, useDispatch } from "react-redux";
import {  filteredRecipesByDiets, filterOriginalRecipes, OrderRecipes, setDietFilter, setOriginFilter } from '../actions';
import s from './styles/cards.module.css';
import defaultimage from "./styles/assets/Default.jpg";


function Cards() {

const dispatch = useDispatch();
const allDiets = useSelector (state => state.diets)
const allRecipes = useSelector ((state) => state.recipes)

const [currentPage, setCurrentPage] = useState(1);
const [recipesPerPage] = useState(9);
const indexOfLastRecipe = currentPage * recipesPerPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

const [currentOrder, setCurrentOrder] = useState("100 to 0");
const currentOrigin = useSelector((state) => state.activeOriginFilter)
const currentDiet = useSelector((state) => state.activeDietFilter)


const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)}
    
const handleFilterDiets = (e) => {
        e.preventDefault()
        dispatch(filteredRecipesByDiets(e.target.value))
        dispatch(setDietFilter(e.target.value))
        dispatch(setOriginFilter("All"))
    } 
    
const handleFilterOriginals = (e) => {
        e.preventDefault()
        dispatch(filterOriginalRecipes(e.target.value))
        dispatch(setOriginFilter(e.target.value))
        dispatch(setDietFilter("All"))
    } 
const handleOrder = (e) => {
        e.preventDefault()
        dispatch(OrderRecipes(e.target.value))
        setCurrentPage(1)
        setCurrentOrder(e.target.value)
    }
    return (
            <div >
                <div className={s.options}>
                <select value={currentOrder} className={s.orders} onChange={(e) => handleOrder(e)}>
                    <option value= "100 to 0">By score 100 to 0</option>
                    <option value= "0 to 100">By score 0 to 100</option>
                    <option value= "A to Z">From A to Z</option>
                    <option value= "Z to A">From Z to A</option>
                </select>
                <select value={currentDiet} className={s.orders} onChange={(e) => handleFilterDiets(e)}>
                    <option value="All">All</option>
                    {
                        allDiets && allDiets.map(e => {
                            return(
                            <option key={e.id} value={e.name}>{e.name}</option>)
                        })
                    }
                </select>
                <select value={currentOrigin} className={s.orders} onChange={(e) => handleFilterOriginals(e)}>
                    <option value="All">All</option>
                    <option value="API Recipes">API Recipes</option>
                    <option value="Original Recipes">Original Recipes</option>
                </select>
                </div>
                <div>
                <Pagination
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                pagination = {pagination}
                currentPage = {currentPage}
                />
                </div>
            <div className={s.cards}>
            {
                currentRecipes && currentRecipes.map(e => {
                    return(
                    <Link to={`/recipes/${e.id}`} key={e.id}>
                    <Card 
                    title={e.title}
                    image={e.image ? e.image : defaultimage}
                    diets={e.createdInDb === true ? e.diets.map(e => e.name) : e.diets}
                    />
                    </Link>
                )})
            }
            </div>
            </div>
    )
}

export default Cards
