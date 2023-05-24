import Popup from "./Popup";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({imageUrl, imageName, title, isOpen, onClose}) {
  usePopupClose(isOpen, onClose);
  return (
    <Popup
        isOpen={isOpen}
        onClose={onClose}
    >
      <div  className="info-popup">
        <img className="info-popup__image" alt={imageName} src={imageUrl} />
        <h2 className="info-popup__title">{title}</h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
