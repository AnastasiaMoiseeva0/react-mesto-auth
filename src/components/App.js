import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function tokenCheck() {
    auth
      .getCurrentUser()
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/cards", { replace: true });
        } else {
          navigate("/sign-in", { replace: true });
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(user) {
    function makeRequest() {
      return api.setUserInfo(user).then((user) => setCurrentUser(user));
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(newAvatar) {
    function makeRequest() {
      return api
        .setNewAvatar(newAvatar)
        .then((newAvatar) => setCurrentUser(newAvatar));
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(newCard) {
    function makeRequest() {
      return api
        .createCards(newCard)
        .then((card) => setCards([card, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/cards" replace />
          ) : (
            <Navigate to="/sign-in" replace />
          )
        }
      />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/cards"
        element={
          <ProtectedRoute
            loggedIn={loggedIn}
            element={
              <div className="page">
                <AppContext.Provider value={isLoading}>
                  <CurrentUserContext.Provider value={currentUser}>
                    <Header isLoggedIn={false}>
                      <div className="header__navigation">
                        <div className="header__email">{userEmail}</div>
                        <button
                          className="header__link button"
                          onClick={onSignOut}
                        >
                          Выйти
                        </button>
                      </div>
                    </Header>
                    <Main
                      cards={cards}
                      onEditAvatar={() => handleEditAvatarClick()}
                      onEditProfile={() => handleEditProfileClick()}
                      onAddPlace={() => handleAddPlaceClick()}
                      onCardClick={(card) => handleCardClick(card)}
                      onCardLike={(card) => handleCardLike(card)}
                      onCardDelete={(card) => handleCardDelete(card)}
                    />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                    />
                    <PopupWithForm
                      title="Вы уверены"
                      name="deleteCard"
                      buttonText="Да"
                      onClose={closeAllPopups}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                  </CurrentUserContext.Provider>
                </AppContext.Provider>
                <Footer />
              </div>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
