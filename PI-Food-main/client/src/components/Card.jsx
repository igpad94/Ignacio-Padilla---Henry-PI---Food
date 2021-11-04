import React from 'react'
import s from './styles/card.module.css';

function Card({title, image, diets}) {
    return (
        <div className={s.card}>
            <h3 className={s.title}>{title}</h3>
            <p className={s.diets}>
            {
                diets.map(e => {
                    return(
                        `*${e} `
                        )
                    })
                }
            </p>
            <img src={image} alt="img not found" widht="150px" height="200" className={s.image}/>
            <p>(Click for details)</p>
        </div>
    )
}

export default Card
