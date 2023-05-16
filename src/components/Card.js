import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button button_background_transparent place__icon-like ${
    isLiked && "place__icon-like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="place">
      {isOwn && 
        <button
          type="button"
          className="button button_background_transparent button_size_small place__icon-trash"
          onClick={handleDeleteClick}
        ></button>
      }
      <div
        className="place__photo place_url"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
            {card.like}
          </button>
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
