import Header from "./Header";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import failRegister from "../images/fail-registration-icon.svg";
import successfulRegister from "../images/successful-registration-icon.svg";
import { useState } from "react";
import * as auth from "../utils/auth.js";

function Register() {
  const [isSuccessfulRegisterPopupOpen, setSuccessfulRegisterPopupOpen] =
    useState(false);
  const [isFailRegisterPopupOpen, setFailRegisterPopupOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function closeAllPopup() {
    setSuccessfulRegisterPopupOpen(false);
    setFailRegisterPopupOpen(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function onRegister(event) {
    event.preventDefault();
    if ((formValue.password, formValue.email)) {
      auth.register(formValue.password, formValue.email).then(
        (res) => {
          setSuccessfulRegisterPopupOpen(true);
        },
        (err) => {
          setFailRegisterPopupOpen(true);
        }
      );
    }
  }

  return (
    <div className="page">
      <Header>
        <div>
          <Link to="/sign-in" className="header__link">
            Вход
          </Link>
        </div>
      </Header>
      <div className="login">
        <h1 className="login__title">Регистрация</h1>
        <form className="login__form" onSubmit={onRegister} noValidate>
          <input
            className="login__field"
            placeholder="Email"
            type="email"
            required
            name="email"
            onChange={handleChange}
            value={formValue.email}
          />
          <input
            className="login__field"
            placeholder="Пароль"
            type="password"
            required
            name="password"
            onChange={handleChange}
            value={formValue.password}
          />
          <button type="submit" className="login__submit button">
            Зарегистрироваться
          </button>
          <div className="login__signin">
            <p className="login__signin-title">Уже зарегистрированы?</p>
            <Link to="/sign-in" className="login__login-link">
              Войти
            </Link>
          </div>
        </form>
      </div>
      <InfoTooltip
        title="Вы успешно зарегистрировались!"
        imageUrl={successfulRegister}
        onClose={closeAllPopup}
        isOpen={isSuccessfulRegisterPopupOpen}
      />
      <InfoTooltip
        title="Что-то пошло не так! Попробуйте еще раз."
        imageUrl={failRegister}
        onClose={closeAllPopup}
        isOpen={isFailRegisterPopupOpen}
      />
    </div>
  );
}

export default Register;
