import Header from "./Header.js";
import failRegister from "../images/fail-registration-icon.svg";
import * as auth from "../utils/auth.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login({ handleLogin }) {
  const [isFailRegisterPopupOpen, setFailRegisterPopupOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const navigate = useNavigate();

  function onLogin(event) {
    event.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({ password: "", email: "" });
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch(() => setFailRegisterPopupOpen(true));
  }

  function closePopup() {
    setFailRegisterPopupOpen(false);
  }

  return (
    <div className="page">
      <Header>
        <div>
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </div>
      </Header>
      <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="login__form" noValidate onSubmit={onLogin}>
          <input
            className="login__field"
            placeholder="Email"
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="login__field"
            placeholder="Пароль"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login__submit button">
            Войти
          </button>
        </form>
      </div>
      <InfoTooltip
        title="Что-то пошло не так! Попробуйте еще раз."
        imageUrl={failRegister}
        onClose={closePopup}
        isOpen={isFailRegisterPopupOpen}
      />
    </div>
  );
}

export default Login;
