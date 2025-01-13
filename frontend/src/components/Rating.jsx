import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (

    <div className='rating'>

      {/**
        * Displays the first start based on the prop value passed in the component.
        * 1. If the value is greater than or equal to 1, display a full star.
        * 2. If the value is greater than or equal to 0.5, display a half star.
        * 3. If the value is less than 0.5, display an empty star.
       */}
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/**
        * Displays the second start based on the prop value passed in the component.
        * 1. If the value is greater than or equal to 2, display a full star.
        * 2. If the value is greater than or equal to 1.5, display a half star.
        * 3. If the value is less than 1.5, display an empty star.
       */}
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/**
        * Displays the third start based on the prop value passed in the component.
        * 1. If the value is greater than or equal to 3, display a full star.
        * 2. If the value is greater than or equal to 2.5, display a half star.
        * 3. If the value is less than 2.5, display an empty star.
       */}
      <span>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/**
        * Displays the fourth start based on the prop value passed in the component.
        * 1. If the value is greater than or equal to 4, display a full star.
        * 2. If the value is greater than or equal to 3.5, display a half star.
        * 3. If the value is less than 3.5, display an empty star.
       */}
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/**
        * Displays the fifth start based on the prop value passed in the component.
        * 1. If the value is greater than or equal to 5, display a full star.
        * 2. If the value is greater than or equal to 4.5, display a half star.
        * 3. If the value is less than 4.5, display an empty star.
       */}
      <span>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/**
        Displays the text passed in the component 
        {text && text} is a short-circuit operator that checks if the text prop is passed in the component. If it is, it displays the text. Otherwise, it does nothing.
      */}
      <span className='rating-text'>{text && text}</span>

    </div>
  );
};

export default Rating;