import React from 'react'
import s from './styles/pagination.module.css';

function Pagination({recipesPerPage, allRecipes, pagination, currentPage}) {
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <div className={s.pagination}>
                {pageNumbers && currentPage > 1 ? <button className={s.navigate} onClick={() => pagination(currentPage -1)}> Prev. </button> : null}
                {pageNumbers && pageNumbers.map(number =>{
                    return (
                    <button className={currentPage === number ? s.pageSelected : s.page} key={number} onClick={() => pagination(number)}>{number}</button>
                    )
                })}
                {pageNumbers && currentPage <= pageNumbers.length -1 ? <button className={s.navigate} onClick={() => pagination(currentPage + 1)}> Next </button> : null}
        </div>
    )
}

export default Pagination
