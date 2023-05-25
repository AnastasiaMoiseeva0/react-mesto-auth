import { useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "../hooks/useForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const isLoading = useContext(AppContext);
  const { values, handleChange } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
      
        onAddPlace({
          name: values.namePlace,
          link: values.linkPlace
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
          name="namePlace"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
          value={values.namePlace}
        />
        <span className="placeTitleInput-error"></span>
        <input
          id="urlInput"
          className="edit-form__field edit-form__field_url-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="linkPlace"
          required
          onChange={handleChange}
          value={values.linkPlace}
        />
        <span className="urlInput-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup