import mestoLogo from "../images/mesto-logo.svg"; 

function Header() {
  return (
    <header className="header">
        <img
          className="header__logo"
          src={mestoLogo}
          alt="Логотип Mesto Russia"
        />
      </header>
  );
}

export default Header;