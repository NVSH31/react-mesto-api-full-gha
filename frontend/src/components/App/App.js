import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import DeletePlacePopup from '../DeletePlacePopup/DeletePlacePopup';
import api from '../../utils/api';
import * as auth from '../../utils/auth';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);

  const [isRegisterSucces, setIsRegisterSucces] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      Promise.all([auth.checkToken(jwt), api.getMe(), api.getInitialCards()])
        .then(([currentUserProfile, profile, cards]) => {
          if (currentUserProfile) {
            setLoggedIn(true);
            setCurrentUser(currentUserProfile);
            navigate('/', { replace: true });
          }
          setCurrentUser(profile);
          setCards(cards);
        })
        .catch(Error => console.log(Error));
    }
  }, [loggedIn]);


  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(Error => console.log(Error));
    } else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(Error => console.log(Error));
    }
  }

  const handleCardDelete = (deletedCard) => {
    setDeletedCard(deletedCard);
    setIsDeleteCardPopupOpen(true);
  }

  const handleCardClick = (selectedCard) => {
    setIsImagePopupOpen(true);
    setSelectedCard(selectedCard);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleUpdateUser = (inputData) => {
    setIsLoading(true);
    api.editMe(inputData.name, inputData.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(() => setIsLoading(false));
  }


  const handleUpdateAvatar = (inputData) => {
    setIsLoading(true);
    api.editAvatar(inputData.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(() => setIsLoading(false));
  }

  const handleAddPlaceSubmit = (inputData) => {
    setIsLoading(true);
    api.addCard(inputData.name, inputData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(() => setIsLoading(false));
  }

  const handleRegister = (registerData) => {
    setIsLoading(true);
    auth.register(registerData.password, registerData.email)
    .then((data) => {
      navigate('/signin', {replace: true});
      setIsRegisterSucces(true);
    })
    .catch((Error) => {
      console.log(Error);
      setIsRegisterSucces(false);
    })
    .finally(() => {
      setInfoTooltipPopupOpen(true)
      setIsLoading(false);
    });
  }

  const handleLogIn = (loginData) => {
    setIsLoading(true);
    auth.authorize(loginData.password, loginData.email)
    .then((data) => {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
          }
          setLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch(Error => console.log(Error))
        .finally(() => setIsLoading(false));
  }

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  const handleOffLoading = () => {
    setIsLoading(false);
  }

  const handleDeletePlaceSubmit = (card) => {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(handleOffLoading);
  }

  const closeAllPopups = () => {
    setSelectedCard(null);
    setDeletedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div>
        <Header
          loggedIn={loggedIn}
          handleLogOut={handleLogOut}
        />
        <Routes>
          <Route path='/signin' element={
            <Login
              handleLogIn={handleLogIn}
              isLoading={isLoading}
            />
          } />
          <Route path='/signup' element={
            <Register
              handleRegister={handleRegister}
              isLoading={isLoading}
            />
          } />
          <Route path='/' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
            />
          } replace />
          <Route path='*'
            element={
              loggedIn ? <Navigate to="/" replace={true} /> : <Navigate to="/signin" replace={true} />
            }
          />
        </Routes>
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          popupType={'popup_image'}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <DeletePlacePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeletePlace={handleDeletePlaceSubmit}
          card={deletedCard}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegisterSucces={isRegisterSucces}
          popupType={'popup_infotooltip'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
