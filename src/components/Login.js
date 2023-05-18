import Header from "./Header.js";

function Login() {
  return (
    <div className="page">
      <Header linkTitle={'Регистрация'} linkUrl={'/sign-up'}/>
      <div className="login">
        <h1 className="login__title">Вход</h1>
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
            Войти
        </button>
      </form>
      </div>
    </div>
  );
}

export default Login;
