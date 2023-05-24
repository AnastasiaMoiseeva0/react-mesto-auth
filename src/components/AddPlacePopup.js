import { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { AppContext } from "../contexts/AppContext";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const isLoading = useContext(AppContext);
  const [namePlace, setNamePlace] = useState('');
  const [linkPlace, setLinkPlace] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
      
        onAddPlace({
          name: namePlace,
          link: linkPlace,
        });
    } 

    return(
        <PopupWithForm
        title="Новое место"
        name="newCardPopup"
        buttonText={isLoading? 'Создание...' : 'Создать'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="placeTitleInput"
          className="edit-form__field edit-form__field_title-input"
          type="text"
          placeholder="Название"
          name="titleInput"
          minLength="2"
          maxLength="30"
          required
          onChange={(e) => setNamePlace(e.target.value)}
        />
        <span className="placeTitleInput-error"></span>
        <input
          id="urlInput"
          className="edit-form__field edit-form__field_url-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="urlInput"
          required
          onChange={(e) => setLinkPlace(e.target.value)}
        />
        <span className="urlInput-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup