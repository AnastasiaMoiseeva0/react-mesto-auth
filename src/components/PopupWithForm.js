import Popup from "./Popup";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) {
usePopupClose(isOpen, onClose);
return (
  <Popup 
  isOpen={isOpen}
  onClose={onClose}
  >
    <form
      className="edit-form"
      name={name}
      onSubmit={onSubmit}
    >
      <h2 className="edit-form__title">{title}</h2>
      {children}
      <button type="submit" className="edit-form__submit button">
        {buttonText || "Сохранить"}
      </button>
    </form>
  </Popup>
)
}

export default PopupWithForm