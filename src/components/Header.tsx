import { Link } from "react-router";
import pokeball from "@/assets/pokeball.svg";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/dream-team" className="link">
              Dream team
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
