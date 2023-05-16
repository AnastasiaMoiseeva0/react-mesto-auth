import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const namePlace = useRef(null);
    const linkPlace = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
      
        onAddPlace({
          name: namePlace.current.value,
          link: linkPlace.current.value,
        });
    } 

    return(
        <PopupWithForm
        title="Новое место"
        name="newCardPopup"
        buttonText="Создать"
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
          ref={namePlace}
        />
        <span className="placeTitleInput-error"></span>
        <input
          id="urlInput"
          className="edit-form__field edit-form__field_url-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="urlInput"
          required
          ref={linkPlace}
        />
        <span className="urlInput-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup