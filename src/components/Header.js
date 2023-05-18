import { Link } from "react-router-dom";
import mestoLogo from "../images/mesto-logo.svg"; 

function Header({ isLoggedIn, linkTitle, linkUrl }) {
  return (
    <header className="header">
        <img
          className="header__logo"
          src={mestoLogo}
          alt="Логотип Mesto Russia"
        />
        {isLoggedIn
          ? <div> logged in</div>
          : linkUrl && linkTitle
            ? <Link className="header__link" to={linkUrl} >{linkTitle}</Link>
            : []}
      </header>
  );
}

export default Header;