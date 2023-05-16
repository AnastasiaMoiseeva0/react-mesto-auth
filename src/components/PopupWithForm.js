function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) {

return (
  <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
  <div className="popup__container popup__container_white" onClick={e => e.stopPropagation()}>
    <button
      type="button"
      className="button button_background_transparent popup__close"
      onClick={onClose}
    ></button>
    <form
      className="edit-form edit-form_profile"
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      <h2 className="edit-form__title">{title}</h2>
      {children}
      <button type="submit" className="edit-form__submit button">
        {buttonText || "Сохранить"}
      </button>
    </form>
  </div>
</div>
)
}

export default PopupWithForm