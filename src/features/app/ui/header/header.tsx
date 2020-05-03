import React from "react";
import { NavLink } from "react-router-dom";
import { bind } from "../../../../utils/bind";
import styles from "./header.module.css";
import { routes } from "../../../../routes/index";

const cx = bind(styles);

export const Header: React.FC = () => {
  return (
    <header>
      <NavLink to={routes.login} activeClassName={cx("active")}>
        Login
      </NavLink>
      <NavLink to={routes.settings} activeClassName={cx("active")}>
        Settings
      </NavLink>
      <NavLink to={routes.events} activeClassName={cx("active")}>
        Events
      </NavLink>
      <NavLink to={routes.favorites} activeClassName={cx("active")}>
        Favorites
      </NavLink>
      <NavLink to={routes.logout} activeClassName={cx("active")}>
        Salir
      </NavLink>
    </header>
  );
};
