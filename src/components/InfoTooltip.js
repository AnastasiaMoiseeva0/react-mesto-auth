import Popup from "./Popup";

function InfoTooltip({imageUrl, title, isOpen, onClose}) {
  return (
    <Popup
        isOpen={isOpen}
        onClose={onClose}
    >
      <div  className="info-popup">
        <img className="info-popup__image" src={imageUrl} />
        <h2 className="info-popup__title">{title}</h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
