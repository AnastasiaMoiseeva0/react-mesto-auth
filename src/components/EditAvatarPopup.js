import { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { AppContext } from "../contexts/AppContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const newAvatar = useRef(null);
    const isLoading = useContext(AppContext);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: newAvatar.current.value,
        });
    } 


  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatar"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarInput"
        className="edit-form__field edit-form__field_url-input"
        placeholder="Ссылка на картинку"
        type="url"
        name="avatarInput"
        required
        ref={newAvatar}
      />
      <span className="avatarInput-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
