import React from 'react'

const Rating = ({value}) => {
    return (
        <span>
            <i className={`${value === 1 ? 'fas fa-star' : value === 0.5 ? 'fas fa-star-half-alt':'far fa-star'} `} />
        </span>
    )
}

export default Rating
