import { useEffect, useState, KeyboardEvent } from 'react'

import { RatingProps } from './Rating.props'
import styles from './Rating.module.css'
import Star from './Star'

const Rating = ({
  isEditable = false,
  rating,
  setRating,
  className,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  )

  const constructRating = (currentRating: number) => {
    const flooredRating = Math.floor(currentRating)

    const updatedArray = ratingArray.map(
      (ratingItem: JSX.Element, idx: number) => {
        return (
          <Star
            isFilled={idx < flooredRating}
            key={idx}
            className={`${className || ''} ${
              isEditable ? 'cursor-pointer' : ''
            }`}
            // tabIndex={isEditable ? 0 : -1}
          />
        )
      }
    )
    setRatingArray(updatedArray)
  }

  useEffect(() => {
    constructRating(rating)
  }, [rating])

  return (
    <div className={styles.rating} {...props}>
      {ratingArray.map((r: JSX.Element, idx) => (
        <span key={idx}>{r}</span>
      ))}
    </div>
  )
}
export default Rating
