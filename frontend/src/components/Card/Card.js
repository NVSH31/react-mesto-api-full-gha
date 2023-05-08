import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({card, onCardLike, onCardClick, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some(user => user._id === currentUser._id);


  return (
      <div className="element">
        <img className="element__mask-group"
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick(card)}
        />
        <div className="element__text-like">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button
              className={`element__like ${isLiked ? 'element__like_active' : ''}`}
              type="button"
              onClick={() => onCardLike(card)}
            >
            </button>
            <p className="element__like-counter">{card.likes.length > 0 ? card.likes.length : ''}</p>
          </div>
          {card.owner._id === currentUser._id ?
            <button
              className="element__trash"
              type="button"
              onClick={() => onCardDelete(card)}
            >
            </button> : null
          }
        </div>
      </div>
  );
}

export default Card;
