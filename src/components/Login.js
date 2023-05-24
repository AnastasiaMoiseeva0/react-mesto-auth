import Header from "./Header.js";
import failRegister from "../images/fail-registration-icon.svg";
import * as auth from "../utils/auth.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import { useForm } from "../hooks/useForm.js";

function Login({ handleLogin }) {
  const [isFailRegisterPopupOpen, setFailRegisterPopupOpen] = useState(false);
  const {values, handleChange, setValues} = useForm({});


  const navigate = useNavigate();

  function onLogin(event) {
    event.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.password, values.email)
      .then((data) => {
        if (data.token) {
          setValues({ password: "", email: "" });
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
        <form className="login__form" onSubmit={onLogin}>
          <input
            className="login__field"
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            className="login__field"
            placeholder="Пароль"
            type="password"
            name="password"
            value={values.password}
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
        imageName={"Неуспешная регистрация"}
        imageUrl={failRegister}
        onClose={closePopup}
        isOpen={isFailRegisterPopupOpen}
      />
    </div>
  );
}

export default Login;
