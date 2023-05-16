import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, user]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch(error => {
      console.log(error)
    });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function handleCardDelete(card) {
    api
    .deleteCard(card._id)
    .then(() => {
      setCards((cards) =>
        cards.filter((item) => item._id !== card._id));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .setNewAvatar(newAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
    .createCards(newCard)
    .then((card) => {
      setCards([card, ...cards]);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      closeAllPopups();
    });
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
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
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
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
