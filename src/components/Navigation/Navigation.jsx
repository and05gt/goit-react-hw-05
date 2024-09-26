import { NavLink } from "react-router-dom";
import clsx from "clsx";
import style from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(style.link, isActive && style.active);
};

const Navigation = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink to="/" className={buildLinkClass}>
          HomePage
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          MoviesPage
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
