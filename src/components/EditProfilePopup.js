import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser?.name ?? '');
    setDescription(currentUser?.about ?? '');
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfilePopup"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="nameInput"
        className="edit-form__field edit-form__field_name-input"
        placeholder="Имя"
        type="text"
        name="nameInput"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <span className="nameInput-error"></span>
      <input
        id="jobInput"
        className="edit-form__field edit-form__field_job-input"
        placeholder="О себе"
        type="text"
        name="jobInput"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <span className="jobInput-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
