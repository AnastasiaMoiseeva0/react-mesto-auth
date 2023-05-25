import { usePopupClose } from "../hooks/usePopupClose";

function Popup({isOpen, children, onClose}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div
        className="popup__container popup__container_white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="button button_background_transparent popup__close"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;