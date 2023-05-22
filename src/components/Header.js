import mestoLogo from "../images/mesto-logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={mestoLogo}
        alt="Логотип Mesto Russia"
      />
      {children}
    </header>
  );
}

export default Header;
