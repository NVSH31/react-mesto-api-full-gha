import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../images/logoheader.svg';
// import { NoMorePartiesUserContext } from "../../contexts/NoMorePartiesUserContext";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header({loggedIn, handleLogOut}) {

  // const value = useContext(NoMorePartiesUserContext);
  const currentUser = useContext(CurrentUserContext);
  const [hideMenu, setHideMenu] = useState(true);

  const handleCloseClick = () => {
    setHideMenu(!hideMenu);
  }

  return (
    <header className="header">
      <div className='header__container'>
        <img className="header__logo" src={logoPath} alt="Логотип Mesto Russia" />
        <div className= {`header__authorize-container ${hideMenu && 'header__authorize-container_hide'} `} >
          <p className="header__email">
            { loggedIn && currentUser.email }
          </p>
            { (loggedIn &&
                <button className='header__button' onClick={handleLogOut}>Выйти</button>
              ) ||
              (window.location.pathname === '/signin' &&
                <Link className='header__link' to="/signup">Регистрация</Link>
              ) ||
              (window.location.pathname === '/signup' &&
                <Link className='header__link' to="/signin">Войти</Link>
              )
            }
        </div>
        <button className={`header__mobile-button ${hideMenu && 'header__mobile-button_burger'}`} onClick={handleCloseClick}/>
      </div>
    </header>
  );
}

export default Header;
