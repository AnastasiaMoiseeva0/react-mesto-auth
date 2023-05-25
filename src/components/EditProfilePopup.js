import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "../hooks/useForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoading = useContext(AppContext);
  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues(currentUser?.name ?? '');
    setValues(currentUser?.about ?? '');
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  } 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfilePopup"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="edit-form__field edit-form__field_name-input"
        placeholder="Имя"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className="nameInput-error"></span>
      <input
        className="edit-form__field edit-form__field_job-input"
        placeholder="О себе"
        type="text"
        name="description"
        minLength="2"
        maxLength="200"
        required
        value={values.description}
        onChange={handleChange}
      />
      <span className="jobInput-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
