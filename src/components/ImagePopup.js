import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) {
  usePopupClose(card?.link, onClose);
  return (
    <div className={`popup popup_background-dark popup_image ${card ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_wide" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="button button_background_transparent popup__close"
          onClick={onClose}
        ></button>
        <div className="popup__photo-wrapper">
          <img className="popup__photo" alt={card?.name} src={`${card?.link}`}/>
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;