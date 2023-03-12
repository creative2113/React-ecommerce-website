//rating component

import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating, onClick, style }) => {

    /**
     * here suppose currentRating = 3
     * so we want 3 filled start (AiFillStar) and 2 empty star (AiOutlineStar)
     * so we are an empty array, and we will be taking the index i
     * if rating > i, then filled start else empty star, simple! 
     * like this we will get 5 stars each wrapped in a span tag with 3 filled and 2 empty starts
     */
  return (
    <>
        {
            [...Array(5)].map((_, i) => ( //i = index
                <span key={ i } onClick={() => onClick(i)} style={ style }>
                    {
                        rating > i ? (
                            <AiFillStar fontSize='15px' />
                        ) : (
                            <AiOutlineStar fontSize='15px' />
                        )
                    }
                </span>
            ))
        }
    </>
  )
}

export default Rating