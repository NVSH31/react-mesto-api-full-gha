import React from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Main({
    cards,
    onCardLike,
    onCardClick,
    onCardDelete,
    onEditProfile,
    onAddPlace,
    onEditAvatar
  }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img className="profile__image"
           src={currentUser.avatar}
           alt="Аватар"
          />
          <div className="profile__overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__top-string">
            <h1 className="profile__name">
              {currentUser.name}
            </h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">
            {currentUser.about}
          </p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <li className="elements__item" key={card._id}>
                <Card
                  card={card}
                  onCardLike={onCardLike}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                />
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
