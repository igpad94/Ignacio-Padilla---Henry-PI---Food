import React from 'react'
import s from './styles/pagination.module.css';

function Pagination({recipesPerPage, allRecipes, pagination}) {
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <div className={s.pagination}>
                {pageNumbers && pageNumbers.map(number =>{
                    return (
                    <button className={s.page} key={number} onClick={() => pagination(number)}>{number}</button>
                    )
                })}
        </div>
    )
}

export default Pagination
