import Header from "./Header";
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="page">
      <Header />
      <div className="login">
        <h1 className="login__title">Регистрация</h1>
      <form
        className="login__form"
        noValidate
      >
        <input
        className="login__field"
        placeholder="Email"
        type="email"
        required
      />
      <input
        className="login__field"
        placeholder="Пароль"
        type="password"
        required
      />
        <button type="submit" className="login__submit button">
          Зарегистрироваться
        </button>
        <div className="login__signin">
          <p className="login__signin-title">Уже зарегистрированы?</p>
          <Link to="/login" className="login__login-link">Войти</Link>
        </div>
      </form>
      </div>
    </div>
  );
  }
  
  export default Register;